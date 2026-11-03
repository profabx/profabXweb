    Json m_host,m_host_acks=Json::array(),m_host_seen=Json::object(),m_slice_command;
    Http::Ptr m_host_request;bool m_host_busy=false;uint64_t m_host_seq=0;long long m_host_last=0,m_slice_started=0;
    std::string m_slice_fingerprint,m_active_host_session;uint64_t m_host_generation=0;
    std::string native_slice_revision(){
        if(!m_bound||m_stopped||!m_slice_command.is_null()||m_plater->is_background_process_slicing()||m_plater->get_view3D_canvas3D()->is_dragging())return "";
        for(const auto& pair:m_bindings)object(pair.second);
        auto* plate=m_plater->get_partplate_list().get_curr_plate();
        if(!plate||!plate->is_slice_result_valid()||!plate->is_valid_gcode_file())return "";
        const auto file=plate->get_gcode_filename();if(file.empty()||!boost::filesystem::is_regular_file(file))return "";
        return std::to_string(plate->get_index())+":"+std::to_string(plate->get_gcode_result()->id)+":"+std::to_string(boost::filesystem::file_size(file))+":"+std::to_string(boost::filesystem::last_write_time(file))+":"+std::to_string(std::hash<std::string>{}(model_fingerprint()));
    }
    static bool valid_session_config(const Json& c){return c.value("protocol",0)==1 && std::regex_match(c.value("endpoint",std::string()),std::regex("http://(127\\.0\\.0\\.1|localhost):[0-9]{1,5}/api/live-link/sessions/[a-f0-9-]{36}/exchange")) && std::regex_match(c.value("token",std::string()),std::regex("[a-f0-9]{64}"));}
    void host_ack(const Json& command,const std::string& status,const std::string& error="") {Json ack={{"commandId",command.at("commandId")},{"status",status},{"error",error}};m_host_seen[command.at("commandId").get<std::string>()]=ack;m_host_acks.push_back(ack);}
    std::string model_fingerprint(){std::string out;for(const auto& item:m_bindings){auto* obj=object(item.second);out+=matrix_json(obj->instances[0]->get_transformation().get_matrix()).dump();out+=matrix_json(obj->volumes[0]->get_transformation().get_matrix()).dump();const auto& annotation=obj->volumes[0]->supported_facets.get_data();for(const auto& index:annotation.first)out+=std::to_string(index.first)+":"+std::to_string(index.second)+",";for(const auto bit:annotation.second)out+=bit?'1':'0';}const auto config=wxGetApp().preset_bundle->full_config();for(const auto& key:config.keys())out+=key+"="+config.opt_serialize(key)+";";return out;}
    void attach_host_session(const Json& config,bool reuse){
        if(!valid_session_config(config))throw std::runtime_error("Invalid session descriptor");
        if(reuse){std::set<std::string> requested;for(const auto& item:config.at("bindings")){const auto id=item.at("id").get<std::string>();if(!requested.insert(id).second||!m_bindings.count(id))throw std::runtime_error("Requested native binding identity mismatch");const auto& b=m_bindings.at(id);if(b.name!=item.at("name").get<std::string>()||b.mesh_digest!=item.value("meshDigest",std::string())||b.triangles!=item.at("triangleCount").get<size_t>())throw std::runtime_error("Requested native geometry differs; refusing reuse");}if(!m_bound||m_bindings.size()!=config.at("bindings").size())throw std::runtime_error("Native project mapping changed; explicit new project required");for(auto& pair:m_bindings){object(pair.second);auto& b=pair.second;b.pending=ProFabX::PendingPose();b.dirty=false;b.owner.clear();b.revision=0;}}
        else {m_bindings.clear();m_bound=false;}
        ++m_session_generation;if(m_request)m_request->cancel();m_request.reset();m_busy=false;m_config=config;m_endpoint=config.at("endpoint").get<std::string>();m_token=config.at("token").get<std::string>();m_sequence=0;m_stopped=false;m_fatal.clear();
    }
    static void validate_paint_tree(const std::string& code){size_t cursor=code.size(),count=0;std::function<void(int)> read=[&](int depth){if(depth>14||!cursor||++count>2000000)throw std::runtime_error("Invalid support facet tree");char c=code[--cursor];if(c=='3'){for(int i=0;i<4;i++)read(depth+1);}else if(c!='0'&&c!='4'&&c!='8')throw std::runtime_error("Invalid support facet state");};if(!code.empty()){read(0);if(cursor)throw std::runtime_error("Invalid support facet length");}}
    void apply_host_paint(const Json& parts){
        if(!parts.is_array()||parts.size()!=m_bindings.size())throw std::runtime_error("Support paint object count mismatch");
        std::set<std::string> ids;size_t total=0;
        for(const auto& part:parts){const auto id=part.at("id").get<std::string>();if(!ids.insert(id).second||!m_bindings.count(id))throw std::runtime_error("Unknown painted object");auto& binding=m_bindings.at(id);auto* volume=object(binding)->volumes[0];if(!ProFabX::canApplySupportPaint(binding.paint_observed,volume->supported_facets.get_data()))throw std::runtime_error("Native support painting changed; preserving native edits. Use the slicer result or reconnect with a new project.");const auto& triangles=part.at("triangles");if(!triangles.is_array()||triangles.size()!=volume->mesh().its.indices.size())throw std::runtime_error("Support paint triangle order/count mismatch");for(const auto& code:triangles){const auto text=code.get<std::string>();total+=text.size();if(total>2000000)throw std::runtime_error("Support painting too large");validate_paint_tree(text);}}
        m_plater->take_snapshot("ProFabX support painting");
        for(const auto& part:parts){auto* volume=object(m_bindings.at(part.at("id").get<std::string>()))->volumes[0];volume->supported_facets.reset();int i=0;for(const auto& code:part.at("triangles")){const auto text=code.get<std::string>();if(!text.empty())volume->supported_facets.set_triangle_from_string(i,text);i++;}volume->supported_facets.shrink_to_fit();m_bindings.at(part.at("id").get<std::string>()).paint_observed=volume->supported_facets.get_data();}
        m_plater->set_plater_dirty(true);m_plater->update(false,true);
    }
    void handle_host_command(const Json& command){
        const std::string id=command.at("commandId"),type=command.at("type");
        if(command.at("epoch")!=m_host.at("epoch")||command.value("generation",uint64_t(0))!=m_host_generation||command.value("sessionId",std::string())!=m_active_host_session)return;
        if(m_host_seen.contains(id)){m_host_acks.push_back(m_host_seen.at(id));return;}
        if(!m_slice_command.is_null()&&m_slice_command.at("commandId")==id)return;
        try{const auto payload=command.value("payload",Json::object());if((type=="slice"||type=="apply-paint")&&(m_stopped||command.value("sessionId",std::string())!=m_config.value("sessionId",std::string())))throw std::runtime_error("Stale native session; command refused");
            if(type=="inspect"){host_ack(command,"complete");return;}
            if(type=="capture-result"){
                if(m_stopped||command.value("sessionId",std::string())!=m_config.value("sessionId",std::string()))throw std::runtime_error("Stale native session; result preserved");
                const auto revision=native_slice_revision();if(revision.empty()||revision!=payload.at("revision").get<std::string>())throw std::runtime_error("Native result changed; waiting for the latest slice");
                for(const auto& pair:m_bindings)if(!matrices_near(read_matrix(payload.at("expected").at(pair.first)),displayed(object(pair.second),m_plater->get_view3D_canvas3D(),pair.second,false)))throw std::runtime_error("Pose synchronization pending; result preserved");
                const bool dirty=m_plater->is_project_dirty();
                if(m_plater->export_3mf(boost::filesystem::path(payload.at("projectOutput").get<std::string>()),SaveStrategy::Silence|SaveStrategy::WithGcode)<0)throw std::runtime_error("Cannot export native result");
                if(m_plater->is_project_dirty()!=dirty||native_slice_revision()!=revision)throw std::runtime_error("Native result changed during capture; project preserved");
                host_ack(command,"complete");return;
            }
            if(type=="attach"){attach_host_session(payload.at("config"),true);host_ack(command,"complete");return;}
            if(type=="load-project"){
                if(m_plater->is_project_dirty()||m_plater->is_background_process_slicing()||m_plater->get_view3D_canvas3D()->is_dragging())throw std::runtime_error("dirty-project: save or handle the current native project first");
                if(!valid_session_config(payload.at("config")))throw std::runtime_error("Invalid session descriptor");
                if(m_plater->new_project(false,true)==wxID_CANCEL)throw std::runtime_error("Project switch cancelled");
                m_plater->load_files(std::vector<std::string>{payload.at("project").get<std::string>()});attach_host_session(payload.at("config"),false);host_ack(command,"complete");return;
            }
            if(type=="cancel-slice"){if(!m_slice_command.is_null()){m_plater->background_process().stop();host_ack(m_slice_command,"cancelled");m_slice_command=nullptr;}host_ack(command,"complete");return;}
            if(type=="apply-paint"){if(!m_slice_command.is_null())throw std::runtime_error("Native slicing is busy");apply_host_paint(payload.at("parts"));host_ack(command,"complete");return;}
            if(type=="slice"){
                for(const auto& pair:m_bindings){const auto expected=read_matrix(payload.at("expected").at(pair.first));const auto actual=displayed(object(pair.second),m_plater->get_view3D_canvas3D(),pair.second,false);if(!matrices_near(expected,actual))throw std::runtime_error("Pose changed before slice; wait for synchronization and retry");}
                if(!m_slice_command.is_null()||m_plater->is_background_process_slicing()||m_plater->get_view3D_canvas3D()->is_dragging())throw std::runtime_error("Native editing or slicing is busy");
                const auto effective_config=wxGetApp().preset_bundle->full_config();const auto* support=effective_config.option("enable_support");if(!support||support->serialize()!="1")throw std::runtime_error("Enable supports in ProFabX Live before generating");
                apply_host_paint(payload.at("parts"));m_slice_command=command;m_slice_fingerprint=model_fingerprint();m_slice_started=wxGetUTCTimeMillis().GetValue();m_plater->reslice();return;
            }
            throw std::runtime_error("Unsupported host command");
        }catch(const std::exception& e){host_ack(command,"failed",e.what());}
    }
    void check_host_slice(){if(m_slice_command.is_null())return;try{
        if(model_fingerprint()!=m_slice_fingerprint)throw std::runtime_error("Native model, paint or settings changed; result is stale");
        auto* plate=m_plater->get_partplate_list().get_curr_plate();
        if(wxGetUTCTimeMillis().GetValue()-m_slice_started>1500&&!m_plater->is_background_process_slicing()&&plate->is_slice_result_valid()&&plate->is_valid_gcode_file()){
            const auto payload=m_slice_command.at("payload");const bool dirty=m_plater->is_project_dirty();
            if(m_plater->export_3mf(boost::filesystem::path(payload.at("projectOutput").get<std::string>()),SaveStrategy::Silence|SaveStrategy::WithGcode)<0)throw std::runtime_error("Cannot export native slice result");
            if(m_plater->is_project_dirty()!=dirty)throw std::runtime_error("Native dirty state changed during export");
            host_ack(m_slice_command,"complete");m_slice_command=nullptr;
        }else if(wxGetUTCTimeMillis().GetValue()-m_slice_started>180000)throw std::runtime_error("Native slice timed out; project preserved");
    }catch(const std::exception& e){host_ack(m_slice_command,"failed",e.what());m_slice_command=nullptr;}}
    void poll_host(){if(m_host.is_null())return;check_host_slice();const auto now=wxGetUTCTimeMillis().GetValue();if(m_host_busy||now-m_host_last<500)return;m_host_busy=true;m_host_last=now;
        bool binding_ready=m_bound;try{if(m_bound)for(const auto& pair:m_bindings)object(pair.second);}catch(...){binding_ready=false;}
        Json slice=nullptr;try{const auto revision=native_slice_revision();if(!revision.empty())slice=Json{{"revision",revision}};}catch(...){}
        Json data={{"bindingReady",binding_ready},{"bindingSession",m_config.value("sessionId",std::string())},{"slice",slice},{"epoch",m_host.at("epoch")},{"seq",++m_host_seq},{"dirty",m_plater->is_project_dirty()},{"acks",m_host_acks}};const size_t sent_acks=m_host_acks.size();auto weak=weak_from_this();
        m_host_request=Http::post(m_host.at("endpoint").get<std::string>()).header("Content-Type","application/json").header("X-ProFabX-Local","live-link").header("Authorization","Bearer "+m_host.at("token").get<std::string>()).set_post_body(data.dump()).timeout_connect(1).timeout_max(5).size_limit(16*1024*1024)
        .on_complete([weak,sent_acks](std::string body,unsigned){if(wxTheApp)wxTheApp->CallAfter([weak,sent_acks,body=std::move(body)]{if(auto self=weak.lock()){self->m_host_busy=false;self->m_host_request.reset();try{const auto data=Json::parse(body);if(data.at("epoch")!=self->m_host.at("epoch"))return;self->m_host_generation=data.value("generation",uint64_t(0));self->m_active_host_session=data.at("activeSession").is_string()?data.at("activeSession").get<std::string>():"";const size_t n=std::min(sent_acks,self->m_host_acks.size());self->m_host_acks.erase(self->m_host_acks.begin(),self->m_host_acks.begin()+n);for(const auto& c:data.at("commands"))self->handle_host_command(c);}catch(const std::exception& e){self->log(std::string("Host protocol paused: ")+e.what());}}});})
        .on_error([weak](std::string,std::string,unsigned){if(wxTheApp)wxTheApp->CallAfter([weak]{if(auto self=weak.lock()){self->m_host_busy=false;self->m_host_request.reset();}});}).perform();
    }
