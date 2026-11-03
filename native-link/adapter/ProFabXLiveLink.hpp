#pragma once
#include <memory>
namespace Slic3r { namespace GUI {
class Plater;
class ProFabXLiveLink;
std::shared_ptr<ProFabXLiveLink> start_profabx_live_link(Plater* plater);
}}
