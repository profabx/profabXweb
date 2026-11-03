// Included in the private executable only. Runs before GUI initialization.
static int profabx_paint_test(const char* input, const char* output) {
    try {
        std::ifstream in(input); nlohmann::json request; in >> request;
        indexed_triangle_set its;
        its.vertices = {Slic3r::Vec3f(0,0,0),Slic3r::Vec3f(100,0,0),Slic3r::Vec3f(0,100,0)};
        its.indices = {Slic3r::Vec3i(0,1,2)};
        Slic3r::TriangleMesh mesh(its); Slic3r::Model model;
        auto* volume = model.add_object()->add_volume(mesh, false);
        nlohmann::json results=nlohmann::json::array();
        volume->supported_facets.set_triangle_from_string(0,"4");
        const auto expected_paint=volume->supported_facets.get_data();
        volume->supported_facets.reset();volume->supported_facets.set_triangle_from_string(0,"8");
        if(ProFabX::canApplySupportPaint(expected_paint,volume->supported_facets.get_data()))throw std::runtime_error("Native local painting was not protected");
        for (const auto& item : request) {
            volume->supported_facets.reset();
            const std::string code=item.get<std::string>();
            if (!code.empty())volume->supported_facets.set_triangle_from_string(0,code);
            Slic3r::TriangleSelector selector(mesh);
            selector.deserialize(volume->supported_facets.get_data(),true);
            nlohmann::json areas=nlohmann::json::array();
            for(int type=1;type<=2;type++) {
                auto facets=selector.get_facets(static_cast<Slic3r::EnforcerBlockerType>(type));
                double area=0;
                for(const auto& f:facets.indices)area+=0.5*(facets.vertices[f[1]]-facets.vertices[f[0]]).cross(facets.vertices[f[2]]-facets.vertices[f[0]]).norm();
                areas.push_back(area);
            }
            volume->supported_facets.set(selector);
            results.push_back({{"code",volume->supported_facets.get_triangle_as_string(0)},{"areas",areas}});
        }
        std::ofstream out(output);out<<results.dump();return 0;
    } catch(const std::exception& e) {std::ofstream out(output);out<<nlohmann::json{{"error",e.what()}}.dump();return 2;}
}

