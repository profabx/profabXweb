#include "../adapter/NativeSafety.hpp"
#include <cassert>
int main() {
    assert(ProFabX::mustDetachForLocalEdit(true, true));
    assert(!ProFabX::mustDetachForLocalEdit(false, true));
    assert(!ProFabX::mustDetachForLocalEdit(true, false));
    assert(!ProFabX::mustDetachForLocalEdit(false, false));
}
