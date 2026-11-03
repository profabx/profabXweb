import {analyzeShells} from './shells.js';
import {Box3,Vector3,Matrix4} from 'three';
export const measurementVersion='closed-shell-nesting-2026-11-01-v4';
export const unitScale={mm:1,cm:10,m:1000,in:25.4};
export function measureGeometry(geometry,worldMatrix=new Matrix4(),unit='mm'){
 const scale=unitScale[unit];if(!scale)throw new Error('未知模型单位');
 const g=geometry.clone().applyMatrix4(worldMatrix);g.scale(scale,scale,scale);
 // Remove only numerical zero-area tessellation fragments; the remaining mesh
 // must still pass every closure, winding and shell-intersection check below.
 const positions=g.attributes.position,originalIndices=g.index?.array,retained=[];let ignoredDegenerateFaces=0;
 const ca=new Vector3(),cb=new Vector3(),cc=new Vector3(),u=new Vector3(),v=new Vector3();
 for(let i=0;i+2<(originalIndices?.length||positions?.count||0);i+=3){const ids=[originalIndices?originalIndices[i]:i,originalIndices?originalIndices[i+1]:i+1,originalIndices?originalIndices[i+2]:i+2];ca.fromBufferAttribute(positions,ids[0]);cb.fromBufferAttribute(positions,ids[1]);cc.fromBufferAttribute(positions,ids[2]);if(u.subVectors(cb,ca).cross(v.subVectors(cc,ca)).lengthSq()<1e-16){ignoredDegenerateFaces++;continue;}retained.push(...ids);}
 if(ignoredDegenerateFaces)g.setIndex(retained);
 const pos=g.attributes.position,indices=g.index?.array;const count=indices?.length??pos?.count??0;
 const issues=[],edges=new Map(),box=new Box3(),parents=[],faceVolumes=[];let signed=0,degenerate=false;
 const root=n=>{while(parents[n]!==n){parents[n]=parents[parents[n]];n=parents[n];}return n;};
 const a=new Vector3(),b=new Vector3(),c=new Vector3(),cross=new Vector3(),ab=new Vector3(),ac=new Vector3();
 const key=v=>`${Math.round(v.x*1e5)},${Math.round(v.y*1e5)},${Math.round(v.z*1e5)}`;
 for(let i=0;i<count;i+=3){if(i+2>=count)break;
  a.fromBufferAttribute(pos,indices?indices[i]:i);b.fromBufferAttribute(pos,indices?indices[i+1]:i+1);c.fromBufferAttribute(pos,indices?indices[i+2]:i+2);
  box.expandByPoint(a);box.expandByPoint(b);box.expandByPoint(c);
  ab.subVectors(b,a);ac.subVectors(c,a);if(cross.crossVectors(ab,ac).lengthSq()<1e-16)degenerate=true;
  const face=i/3;parents[face]=face;faceVolumes[face]=a.dot(cross.crossVectors(b,c))/6;signed+=faceVolumes[face];
  const keys=[key(a),key(b),key(c)];for(let j=0;j<3;j++){const from=keys[j],to=keys[(j+1)%3],id=from<to?`${from}|${to}`:`${to}|${from}`;const e=edges.get(id)||{count:0,balance:0,face};if(e.count)parents[root(face)]=root(e.face);e.count++;e.balance+=from<to?1:-1;edges.set(id,e);}
 }
 if(!count||box.isEmpty())issues.push('模型无有效三角面');
 if(degenerate)issues.push('存在退化三角面');
 if([...edges.values()].some(e=>e.count!==2))issues.push('网格未闭合或存在非流形边');
 if([...edges.values()].some(e=>e.count===2&&e.balance!==0))issues.push('面方向不一致，需要修复或工程复核');
 const shells=new Map();for(let i=0;i<faceVolumes.length;i++){const id=root(i),shell=shells.get(id)||{volume:0,faces:[]};shell.volume+=faceVolumes[i];shell.faces.push(i);shells.set(id,shell);}let net={volumeMm3:Number.isFinite(signed)?Math.abs(signed):null,cavityCount:0,issues:[]};if(!issues.length){net=analyzeShells(pos,indices,shells);issues.push(...net.issues);}
 if(!Number.isFinite(signed)||Math.abs(signed)<1e-9)issues.push('实体体积无法确定');
 const size=box.getSize(new Vector3()).toArray();g.dispose();
 return {version:measurementVersion,ignoredDegenerateFaces,sizeMm:size,volumeMm3:net.volumeMm3,shellCount:shells.size,cavityCount:net.cavityCount,volumeReliable:issues.length===0,issues};
}
export function estimateMassG(m,density){return m.volumeReliable&&Number.isFinite(density)&&density>0?m.volumeMm3/1000*density:null;}

export function refreshPartMeasurement(part){if(part.measurement?.version===measurementVersion)return part;try{return {...part,measurement:measureGeometry(part.geometry,part.originalTransform||new Matrix4().fromArray(part.matrix||new Matrix4().toArray()),part.unit)};}catch(error){return {...part,measurement:{...part.measurement,version:measurementVersion,volumeReliable:false,issues:[...new Set([...(part.measurement?.issues||[]),'无法重新测量：'+error.message])]}};}}
