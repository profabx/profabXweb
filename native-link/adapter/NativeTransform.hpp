#pragma once
#include <Eigen/Geometry>
namespace ProFabX {
using NativeTransform=Eigen::Transform<double,3,Eigen::Affine,Eigen::DontAlign>;
inline NativeTransform deltaFromNative(const NativeTransform& instance,const NativeTransform& volume,const NativeTransform& baseline){return instance*volume*baseline.inverse();}
inline NativeTransform instanceForDelta(const NativeTransform& delta,const NativeTransform& baseline,const NativeTransform& volume){return delta*baseline*volume.inverse();}
}
