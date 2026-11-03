import {sourceTriangle,splitTriangle,triangleDistance,facing,leafTriangles} from './selection.js';
import {fillFacetIndices} from './fill.js';
export const createPaintState=meshDigest=>({version:1,meshDigest,revision:0,facets:{},undo:[],redo:[]});
const validPoint=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
function commit(state,facets){if(JSON.stringify(facets)===JSON.stringify(state.facets))return state;return {...state,facets,revision:state.revision+1,undo:[...(state.undo||[]).slice(-29),state.facets],redo:[]};}
export function applyStroke(state,stroke,mesh){
 if(state.meshDigest!==mesh.meshDigest)throw Error('Model geometry changed; clear incompatible painting.');
 const fill=['smart-fill','connected-fill'].includes(stroke.shape);
 if(!['enforce','block','erase'].includes(stroke.mode)||!['circle','sphere','smart-fill','connected-fill'].includes(stroke.shape)||!Number.isFinite(stroke.radiusMm)||stroke.radiusMm<.1||stroke.radiusMm>100||!Array.isArray(stroke.samples)||!stroke.samples.length||stroke.samples.length>2000||!stroke.samples.every(s=>Number.isInteger(s.faceIndex)&&s.faceIndex>=0&&s.faceIndex<mesh.triangles.length/3&&validPoint(s.localPoint)&&validPoint(s.viewDirection))||(fill&&(!Number.isFinite(stroke.angleDeg)||stroke.angleDeg<0||stroke.angleDeg>90)))throw Error('Invalid support brush.');
 const target={erase:0,enforce:1,block:2}[stroke.mode],facets={...state.facets};let visited=0;
 if(fill){for(const index of fillFacetIndices(mesh,stroke.samples[0].faceIndex,stroke.shape,stroke.angleDeg)){if(target===0)delete facets[index];else facets[index]=target;}return commit(state,facets);}
 const paint=(node,vertices,sample,depth,faceIndex)=>{
  if(++visited>1000000)throw Error('Painting too complex; reduce brush area.');
  if(triangleDistance(vertices,sample.localPoint)>stroke.radiusMm)return node;
  if(stroke.shape==='circle'&&!facing(vertices,sample.viewDirection))return node;
  const inside=vertices.every(v=>Math.hypot(...v.map((x,i)=>x-sample.localPoint[i]))<=stroke.radiusMm);
  if(inside&&(stroke.shape==='sphere'||!mesh.isVisible))return target;
  const edges=vertices.map((v,i)=>Math.hypot(...v.map((x,j)=>x-vertices[(i+1)%3][j])));
  if(depth>=14)throw Error('Painting detail limit reached; use a larger brush.');
  if(Math.max(...edges)<=Math.max(.15,stroke.radiusMm/4)){if(stroke.shape==='circle'&&mesh.isVisible&&!mesh.isVisible(vertices,faceIndex,sample))return node;const center=vertices[0].map((_,j)=>vertices.reduce((s,v)=>s+v[j],0)/3);return Math.hypot(...center.map((x,i)=>x-sample.localPoint[i]))<=stroke.radiusMm?target:node;}
  const children=splitTriangle(vertices).map((v,i)=>paint(typeof node==='number'?node:node.children[i],v,sample,depth+1,faceIndex));
  return children.every(n=>typeof n==='number'&&n===children[0])?children[0]:{children};
 };
 for(const sample of stroke.samples)for(let i=0;i<mesh.triangles.length/3;i++){const next=paint(facets[i]||0,sourceTriangle(mesh,i),sample,0,i);if(next===0)delete facets[i];else facets[i]=next;}
 return commit(state,facets);
}
export function undoPaint(state){if(!state.undo?.length)return state;return {...state,facets:state.undo.at(-1),undo:state.undo.slice(0,-1),redo:[...(state.redo||[]),state.facets],revision:state.revision+1};}
export function redoPaint(state){if(!state.redo?.length)return state;return {...state,facets:state.redo.at(-1),redo:state.redo.slice(0,-1),undo:[...(state.undo||[]),state.facets],revision:state.revision+1};}
export const clearPaint=state=>commit(state,{});
export function paintTriangles(state,mesh){if(!state||state.meshDigest!==mesh.meshDigest)return [];return Object.entries(state.facets).flatMap(([i,node])=>leafTriangles(node,sourceTriangle(mesh,Number(i))));}
export function meshDigest(vertices,triangles){let a=2166136261,b=5381;const data=new DataView(new ArrayBuffer(8));for(const values of [vertices,triangles])for(const value of values){data.setFloat64(0,value,true);for(let j=0;j<8;j++){const v=data.getUint8(j);a=Math.imul(a^v,16777619);b=Math.imul(b,33)^v;}}return `mesh1-${(a>>>0).toString(16)}-${(b>>>0).toString(16)}-${vertices.length}-${triangles.length}`;}
export function serializablePaint(state){if(!state)return undefined;const {undo,redo,...saved}=state;return saved;}
