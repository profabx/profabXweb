#include "../adapter/PendingPose.hpp"
#include <cassert>
int main(){using namespace ProFabX;Matrix identity={1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1},moved=identity;moved[12]=25;PendingPose state;state.capture(moved,0,false);assert(state.active); // A failed HTTP request does not acknowledge or erase this operation.
state.acknowledge(identity,0,false);assert(state.active);assert(state.matrix[12]==25);assert(state.base==0);state.acknowledge(moved,1,false);assert(!state.active);
state.capture(identity,1,true);state.acknowledge(moved,2,true);assert(!state.active); // A real competing edit wins explicitly, rather than replaying over it.
state.capture(identity,2,false);state.acknowledge(moved,2,false);assert(state.active);state.acknowledge(identity,3,false);assert(!state.active);return 0;}
