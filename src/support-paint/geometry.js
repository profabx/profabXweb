import {Vector3,Matrix3} from 'three';
import {centeredGeometry} from '../placement/geometry.js';
import {meshDigest} from './model.js';
const cache=new WeakMap();
export function paintMesh(part){const existing=cache.get(part.geometry),key=part.unit+JSON.stringify(part.originalTransform?.elements);if(existing?.key===key)return existing.mesh;const g=centeredGeometry(part);try{const vertices=Array.from(g.attributes.position.array),triangles=g.index?Array.from(g.index.array):Array.from({length:g.attributes.position.count},(_,i)=>i),mesh={vertices,triangles,meshDigest:meshDigest(vertices,triangles)};cache.set(part.geometry,{key,mesh});return mesh;}finally{g.dispose();}}
export function localPaintSample(worldPoint,worldDirection,matrixWorld,faceIndex){const inverse=matrixWorld.clone().invert(),p=worldPoint.clone().applyMatrix4(inverse),d=new Vector3(...worldDirection).transformDirection(inverse);return {faceIndex,localPoint:p.toArray(),viewDirection:d.toArray(),localNormal:[0,0,1]};}
