#pragma once
#include <array>
#include <cstdint>
#include <cmath>
namespace ProFabX {
using Matrix=std::array<double,16>;
struct PendingPose {
    bool active=false,dragging=false;uint64_t base=0;Matrix matrix{};
    void capture(const Matrix& value,uint64_t revision,bool in_drag){matrix=value;base=revision;dragging=in_drag;active=true;}
    void acknowledge(const Matrix& value,uint64_t revision,bool conflict){if(!active)return;if(conflict){active=false;return;}bool same=true;for(size_t i=0;i<16;i++)if(std::abs(matrix[i]-value[i])>0.00001)same=false;if(same&&revision>=base)active=false;}
};
}
