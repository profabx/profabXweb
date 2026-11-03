#pragma once
namespace ProFabX {
// A local edit must never be overwritten by a web-owned operation.
inline bool mustDetachForLocalEdit(bool localChanged, bool webOwnsPart) {
    return localChanged && webOwnsPart;
}
template<class Annotation> inline bool canApplySupportPaint(const Annotation& expected,const Annotation& current){return expected==current;}
}
