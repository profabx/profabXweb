const cache=new WeakMap();
function topology(mesh){
 const old=cache.get(mesh.vertices);if(old?.triangles===mesh.triangles)return old;
 const count=mesh.triangles.length/3;if(count>250000)throw Error('Fill mesh too large; use a local brush.');
 const edges=new Map(),neighbors=Array.from({length:count},()=>new Set()),normals=[];
 const point=id=>mesh.vertices.slice(id*3,id*3+3),key=v=>v.map(x=>Math.round(x*100000)).join(',');
 for(let face=0;face<count;face++){
  const v=[0,1,2].map(j=>point(mesh.triangles[face*3+j])),u=v[1].map((x,j)=>x-v[0][j]),w=v[2].map((x,j)=>x-v[0][j]),n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]],length=Math.hypot(...n);
  normals.push(length>1e-12?n.map(x=>x/length):null);
  const keys=v.map(key);for(let j=0;j<3;j++){if(keys[j]===keys[(j+1)%3])continue;const edge=[keys[j],keys[(j+1)%3]].sort().join('|'),linked=edges.get(edge)||[];for(const other of linked){neighbors[face].add(other);neighbors[other].add(face);}linked.push(face);edges.set(edge,linked);}
 }
 const data={triangles:mesh.triangles,neighbors,normals};cache.set(mesh.vertices,data);return data;
}
export function fillFacetIndices(mesh,seed,shape,angleDeg){
 const {neighbors,normals}=topology(mesh),seen=new Set([seed]),queue=[seed],threshold=Math.cos(angleDeg*Math.PI/180);
 for(let cursor=0;cursor<queue.length;cursor++)for(const next of neighbors[queue[cursor]]){
  if(seen.has(next)||!normals[next])continue;
  const current=normals[queue[cursor]];if(shape==='smart-fill'&&(!current||current.reduce((s,v,i)=>s+v*normals[next][i],0)<threshold-1e-8))continue;
  seen.add(next);queue.push(next);
 }
 return queue;
}
