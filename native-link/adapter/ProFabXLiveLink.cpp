// ProFabX adapter for Bambu Studio v02.08.02.61. GUI objects are accessed only on the GUI thread.
#include "ProFabXLiveLink.hpp"
#include "PendingPose.hpp"
#include "NativeTransform.hpp"
#include "NativeSafety.hpp"
#include <algorithm>
#include "Plater.hpp"
#include "GUI_App.hpp"
#include "libslic3r/PresetBundle.hpp"
#include "GLCanvas3D.hpp"
#include "3DScene.hpp"
#include "slic3r/Utils/Http.hpp"
#include "libslic3r/Model.hpp"
#include "nlohmann/json.hpp"
#include <wx/app.h>
#include <wx/timer.h>
#include <wx/filename.h>
#include <wx/file.h>
#include <wx/utils.h>
#include <fstream>
#include <map>
#include <regex>
#include <cmath>
#include <set>
#include "PartPlate.hpp"
#include "BackgroundSlicingProcess.hpp"
#include "libslic3r/Format/bbs_3mf.hpp"

namespace Slic3r { namespace GUI {
using Json = nlohmann::json;
static Json matrix_json(const Transform3d& matrix) { Json out=Json::array(); for(int c=0;c<4;c++)for(int r=0;r<4;r++)out.push_back(matrix.matrix()(r,c)); return out; }
static Transform3d read_matrix(const Json& values) {
    if(!values.is_array() || values.size()!=16)throw std::runtime_error("Invalid transform");
    Transform3d m=Transform3d::Identity();for(int c=0;c<4;c++)for(int r=0;r<4;r++){double v=values[c*4+r].get<double>();if(!std::isfinite(v)||std::abs(v)>100000)throw std::runtime_error("Invalid coordinate");m.matrix()(r,c)=v;}
    if((m.linear().transpose()*m.linear()-Eigen::Matrix3d::Identity()).norm()>0.001 || std::abs(m.linear().determinant()-1)>0.001 || std::abs(m.matrix()(3,0))+std::abs(m.matrix()(3,1))+std::abs(m.matrix()(3,2))+std::abs(m.matrix()(3,3)-1)>0.001)throw std::runtime_error("Non-rigid transform");return m;
}
static bool matrices_near(const Transform3d& a,const Transform3d& b){return (a.matrix()-b.matrix()).norm()<0.00001;}

class ProFabXLiveLink : public wxEvtHandler, public std::enable_shared_from_this<ProFabXLiveLink> {
    struct Binding {
        std::shared_ptr<const TriangleMesh> source_mesh;
        std::string id,name,mesh_digest;std::pair<std::vector<std::pair<int,int>>,std::vector<bool>> paint_observed; ObjectID object_id,instance_id,volume_id;
        size_t vertices=0,triangles=0; Transform3d initial=Transform3d::Identity(),volume=Transform3d::Identity(),observed=Transform3d::Identity(),server=Transform3d::Identity();
        ProFabX::PendingPose pending;uint64_t revision=0;std::string owner;bool dirty=false,remote_edit=false;
    };
    Plater* m_plater;wxTimer m_timer;Json m_config;std::map<std::string,Binding> m_bindings;
    std::string m_endpoint,m_token,m_fatal,m_log;uint64_t m_sequence=0,m_session_generation=0;bool m_bound=false,m_busy=false,m_stopped=false;Http::Ptr m_request;
    #include "ProFabXHost.inc"
    void log(const std::string& text){std::ofstream out(m_log,std::ios::app);out<<wxGetUTCTimeMillis().GetValue()<<" "<<text<<"\n";}
    ModelObject* object(const Binding& binding) {
        for(auto* obj:m_plater->model().objects)if(obj->id()==binding.object_id){
            if(obj->name!=binding.name || obj->instances.size()!=1 || obj->instances[0]->id()!=binding.instance_id || obj->volumes.size()!=1 || obj->volumes[0]->id()!=binding.volume_id || obj->volumes[0]->get_mesh_shared_ptr()!=binding.source_mesh || obj->volumes[0]->mesh().its.vertices.size()!=binding.vertices || obj->volumes[0]->mesh().its.indices.size()!=binding.triangles)throw std::runtime_error("Source mesh/volume changed; reconnect with a new project");return obj;
        }throw std::runtime_error("Linked model was replaced; reconnect");
    }
    bool bind_model(){
        auto& model=m_plater->model();if(model.objects.empty())return false;
        if(model.objects.size()!=m_config.at("bindings").size())throw std::runtime_error("Linked object count mismatch");
        for(const auto& item:m_config.at("bindings")) {
            const std::string name=item.at("name"),id=item.at("id");ModelObject* found=nullptr;
            for(auto* obj:model.objects)if(obj->name==name){if(found)throw std::runtime_error("Duplicate linked object");found=obj;}
            if(!found || found->instances.size()!=1 || found->volumes.size()!=1)throw std::runtime_error("Linked object identity mismatch");
            const auto box=found->instance_bounding_box(size_t(0));for(int i=0;i<3;i++)if(std::abs(box.min[i]-item.at("min").at(i).get<double>())>0.03 || std::abs(box.max[i]-item.at("max").at(i).get<double>())>0.03)throw std::runtime_error("Initial native placement differs from web; refusing an unsafe binding");
            Binding b;b.source_mesh=found->volumes[0]->get_mesh_shared_ptr();b.id=id;b.name=name;b.object_id=found->id();b.instance_id=found->instances[0]->id();b.volume_id=found->volumes[0]->id();b.initial=found->instances[0]->get_transformation().get_matrix();b.volume=found->volumes[0]->get_transformation().get_matrix();b.mesh_digest=item.value("meshDigest",std::string());b.paint_observed=found->volumes[0]->supported_facets.get_data();b.vertices=found->volumes[0]->mesh().its.vertices.size();b.triangles=found->volumes[0]->mesh().its.indices.size();m_bindings.emplace(id,std::move(b));
        }
        m_bound=true;log("bound "+std::to_string(m_bindings.size())+" objects; PROFABX_LIVE_PROTOCOL_1");return true;
    }
    Transform3d displayed(ModelObject* obj,GLCanvas3D* canvas,const Binding& binding,bool dragging){
        if(dragging)for(const auto* v:canvas->get_volumes().volumes)if(v->object_idx()>=0 && size_t(v->object_idx())<m_plater->model().objects.size() && m_plater->model().objects[v->object_idx()]==obj && v->instance_idx()==0)return ProFabX::deltaFromNative(v->get_instance_transformation().get_matrix(),v->get_volume_transformation().get_matrix(),binding.initial*binding.volume);
        return ProFabX::deltaFromNative(obj->instances[0]->get_transformation().get_matrix(),obj->volumes[0]->get_transformation().get_matrix(),binding.initial*binding.volume);
    }
    void detach(const std::string& reason){log(reason);if(m_host.is_null())m_timer.Stop();if(!m_busy)send(Json{{"updates",Json::array()},{"error",reason}});m_stopped=true;if(m_host.is_null())m_bindings.clear();}
    void reply(std::string body){m_busy=false;m_request.reset();if(m_stopped)return;try{auto data=Json::parse(body);if(data.contains("webConnected")&&!data.at("webConnected").get<bool>()){detach("Web disconnected. Native editing continues independently.");return;}if(data.contains("conflicts")&&!data.at("conflicts").empty()){detach("Native editing has priority. Link paused after concurrent edits; native placement is preserved.");return;}if(data.contains("error")&&!data.value("error",std::string()).empty()){detach(data.at("error").get<std::string>());return;}for(auto& pair:m_bindings){auto& b=pair.second;const auto& p=data.at("parts").at(b.id);b.server=read_matrix(p.at("matrix"));b.revision=p.at("revision").get<uint64_t>();b.owner=p.at("owner").is_null()?"":p.at("owner").get<std::string>();b.pending.acknowledge(p.at("matrix").get<ProFabX::Matrix>(),b.revision,std::find(data.at("conflicts").begin(),data.at("conflicts").end(),b.id)!=data.at("conflicts").end());b.dirty=true;}}catch(const std::exception& e){detach(std::string("Protocol error; native editing preserved: ")+e.what());}}
    void send(Json data){const auto generation=m_session_generation;m_busy=true;data["seq"]=++m_sequence;auto weak=weak_from_this();m_request=Http::post(m_endpoint).header("Content-Type","application/json").header("X-ProFabX-Local","live-link").header("Authorization","Bearer "+m_token).set_post_body(data.dump()).timeout_connect(1).timeout_max(2).size_limit(128*1024)
        .on_complete([weak,generation](std::string body,unsigned){if(wxTheApp)wxTheApp->CallAfter([weak,generation,body=std::move(body)]{if(auto self=weak.lock()){if(generation!=self->m_session_generation)return;self->reply(body);}});})
        .on_error([weak,generation](std::string,std::string,unsigned status){if(wxTheApp)wxTheApp->CallAfter([weak,generation,status]{if(auto self=weak.lock()){if(generation!=self->m_session_generation)return;self->m_busy=false;self->m_request.reset();if(self->m_host.is_null())self->m_timer.Stop();self->m_stopped=true;if(self->m_host.is_null())self->m_bindings.clear();self->log("Link request failed ("+std::to_string(status)+"). Native editing continues independently; explicit reconnection is required.");}});}).perform();}
    void tick(wxTimerEvent&){poll_host();if(m_busy||m_stopped)return;Json data={{"updates",Json::array()}};try{
        if(!m_fatal.empty()){data["error"]=m_fatal;send(std::move(data));return;}
        if(!m_bound&&!bind_model())return;if(m_plater->model().objects.size()!=m_bindings.size())throw std::runtime_error("Object count changed; reconnect");
        auto* canvas=m_plater->get_view3D_canvas3D();if(!canvas)return;const bool dragging=canvas->is_dragging();bool refresh=false,snapshot=false;data["ready"]=true;data["ids"]=Json::array();
        for(auto& pair:m_bindings){auto& b=pair.second;data["ids"].push_back(b.id);auto* obj=object(b);auto current=displayed(obj,canvas,b,dragging);read_matrix(matrix_json(current));const bool changed=!matrices_near(current,b.observed);if(ProFabX::mustDetachForLocalEdit(changed,b.owner=="web")){detach("Native local edit has priority; concurrent web update was not applied.");return;}
            if(b.dirty&&!dragging&&!changed&&!b.pending.active){if(!matrices_near(current,b.server)){if(!snapshot&&!b.remote_edit){m_plater->take_snapshot("ProFabX Live move / rotate");snapshot=true;}obj->instances[0]->set_transformation(Geometry::Transformation(ProFabX::instanceForDelta(b.server,b.initial*b.volume,obj->volumes[0]->get_transformation().get_matrix())));obj->invalidate_bounding_box();current=b.server;refresh=true;log("applied "+b.id+" revision "+std::to_string(b.revision));}b.remote_edit=b.owner=="web";b.dirty=false;}
            if((changed || b.owner=="native")&&b.owner!="web")b.pending.capture(matrix_json(current).get<ProFabX::Matrix>(),b.revision,dragging);if(b.pending.active){data["updates"].push_back({{"id",b.id},{"base",b.pending.base},{"matrix",b.pending.matrix},{"dragging",b.pending.dragging}});log("sent "+b.id+(dragging?" drag":" commit"));}b.observed=current;
        }
        if(refresh){m_plater->set_plater_dirty(true);m_plater->update(false,true);}send(std::move(data));
    }catch(const std::exception& e){detach(std::string("Link stopped to preserve native editing: ")+e.what());}}
public:
    explicit ProFabXLiveLink(Plater* plater):m_plater(plater),m_timer(this){}
    ~ProFabXLiveLink(){m_stopped=true;m_timer.Stop();if(m_request)m_request->cancel();if(m_host_request)m_host_request->cancel();}
    bool init(){wxString file;if(!wxGetEnv("PROFABX_LIVE_DESCRIPTOR",&file)||file.empty())return false;wxFile input(file);wxString text;if(!input.IsOpened()||input.Length()>128*1024||!input.ReadAll(&text))return false;m_config=Json::parse(text.ToUTF8().data());if(m_config.value("protocol",0)==2){m_host=m_config;if(!std::regex_match(m_host.value("endpoint",std::string()),std::regex("http://(127\\.0\\.0\\.1|localhost):[0-9]{1,5}/api/live-link/hosts/[a-f0-9-]{36}/exchange"))||!std::regex_match(m_host.value("token",std::string()),std::regex("[a-f0-9]{64}")))return false;m_config=m_host.at("initial");}if(m_config.at("protocol")!=1)return false;m_endpoint=m_config.at("endpoint").get<std::string>();m_token=m_config.at("token").get<std::string>();if(!std::regex_match(m_endpoint,std::regex("http://(127\\.0\\.0\\.1|localhost):[0-9]{1,5}/api/live-link/sessions/[a-f0-9-]{36}/exchange"))||!std::regex_match(m_token,std::regex("[a-f0-9]{64}")))return false;m_log=(wxFileName(file).GetPath()+"/native-live.log").ToStdString();Bind(wxEVT_TIMER,&ProFabXLiveLink::tick,this);m_timer.Start(100);log("adapter initialized");return true;}
};
std::shared_ptr<ProFabXLiveLink> start_profabx_live_link(Plater* plater){try{auto link=std::make_shared<ProFabXLiveLink>(plater);if(link->init())return link;}catch(...){ }return {};}
}}

