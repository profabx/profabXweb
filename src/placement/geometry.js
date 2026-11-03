import {Box3,Euler,Matrix4,Quaternion,Vector3,MathUtils} from 'three';
import {unitScale} from '../model/measure.js';
const finite=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;
export function normalizePose(pose={}){return {position:[0,1,2].map(i=>finite(pose.position?.[i])),rotation:[0,1,2].map(i=>finite(pose.rotation?.[i]))};}
export function constrainEditPose(pose={}){const normalized=normalizePose(pose);normalized.position[2]=Math.max(0,normalized.position[2]);return normalized;}
export function canPlaceIndividually(parts){if(!parts.length)return false;const counts=new Map();for(const p of parts){if(!p.sourcePath||p.sourceObjectCount>1)return false;counts.set(p.sourcePath,(counts.get(p.sourcePath)||0)+1);}return [...counts.values()].every(n=>n===1);}
export function centeredGeometry(part){
 const geometry=part.geometry.clone().applyMatrix4(part.originalTransform||new Matrix4()),scale=unitScale[part.unit];if(!scale){geometry.dispose();throw new Error('Unknown model unit');}
 geometry.scale(scale,scale,scale);geometry.computeBoundingBox();const center=geometry.boundingBox.getCenter(new Vector3());geometry.translate(-center.x,-center.y,-center.z);return geometry;
}
export function originalPose(part){const g=part.geometry.clone().applyMatrix4(part.originalTransform||new Matrix4()),s=unitScale[part.unit]||1;g.scale(s,s,s);g.computeBoundingBox();const center=g.boundingBox.getCenter(new Vector3()),pose={position:[center.x,center.y,g.boundingBox.min.z],rotation:[0,0,0]};g.dispose();return pose;}
export function poseQuaternion(rotation){return new Quaternion().setFromEuler(new Euler(...rotation.map(MathUtils.degToRad),'XYZ'));}
export function localPlacementBounds(part,rotation=[0,0,0]){const g=centeredGeometry(part);g.applyQuaternion(poseQuaternion(rotation));g.computeBoundingBox();const box=g.boundingBox.clone();g.dispose();return box;}
export function placementBounds(part,pose){const p=normalizePose(pose),box=localPlacementBounds(part,p.rotation);return box.translate(new Vector3(p.position[0],p.position[1],p.position[2]-box.min.z));}
export function placedGeometry(part,pose){const p=normalizePose(pose),g=centeredGeometry(part);g.applyQuaternion(poseQuaternion(p.rotation));g.computeBoundingBox();g.translate(p.position[0],p.position[1],p.position[2]-g.boundingBox.min.z);return g;}
export function rotationForFace(rotation,normal){const q=poseQuaternion(rotation),world=new Vector3(...normal).normalize().applyQuaternion(q);const delta=new Quaternion().setFromUnitVectors(world,new Vector3(0,0,-1));q.premultiply(delta);return new Euler().setFromQuaternion(q,'XYZ').toArray().slice(0,3).map(MathUtils.radToDeg);}
export function validPlate(plate){if(plate?.unbounded)return Number.isFinite(Number(plate.gap))&&Number(plate.gap)>=0;const s=plate?.size;return Array.isArray(s)&&s.length===3&&s.every(v=>Number.isFinite(Number(v))&&Number(v)>0&&Number(v)<=10000)&&Number.isFinite(Number(plate.margin))&&Number(plate.margin)>=0&&Number(plate.margin)*2<Math.min(Number(s[0]),Number(s[1]))&&Number.isFinite(Number(plate.gap))&&Number(plate.gap)>=0;}
export function arrangeOnPlate(parts,poses={},plate){
 if(!validPlate(plate))return {poses,unplaced:parts.map(p=>p.id)};
 const items=parts.map(part=>{const pose=normalizePose(poses[part.id]),box=localPlacementBounds(part,pose.rotation);return {part,pose,box,size:box.getSize(new Vector3())};}).sort((a,b)=>b.size.y-a.size.y||b.size.x-a.size.x);
 const gap=Number(plate.gap),margin=plate.unbounded?0:Number(plate.margin),area=items.reduce((n,i)=>n+(i.size.x+gap)*(i.size.y+gap),0),width=plate.unbounded?Math.max(Math.sqrt(area),...items.map(i=>i.size.x),1):Number(plate.size[0]),depth=plate.unbounded?Infinity:Number(plate.size[1]),height=plate.unbounded?Infinity:Number(plate.size[2]),next={...poses},unplaced=[];
 let x=margin,y=margin,rowDepth=0;
 for(const {part,pose,box,size}of items){
  if(size.x>width-2*margin+1e-5||size.y>depth-2*margin+1e-5||size.z>height+1e-5){unplaced.push(part.id);continue;}
  if(x+size.x>width-margin+1e-5){x=margin;y+=rowDepth+gap;rowDepth=0;}
  if(y+size.y>depth-margin+1e-5){unplaced.push(part.id);continue;}
  next[part.id]={rotation:pose.rotation,position:[x-box.min.x,y-box.min.y,0]};x+=size.x+gap;rowDepth=Math.max(rowDepth,size.y);
 }
 return {poses:next,unplaced};
}
export function checkPlacement(parts,poses,plate){
 const findings=[];if(!validPlate(plate))return [{type:'invalid-plate',ids:[]}];
 const [width,depth,height]=plate.unbounded?[Infinity,Infinity,Infinity]:plate.size.map(Number),margin=Number(plate.margin),gap=Number(plate.gap),eps=.001;
 if(!plate.unbounded&&!plate.verified)findings.push({type:'unverified-plate',ids:[]});
 if(new Set(parts.map(p=>`${p.config.process}/${p.config.materialId}`)).size>1)findings.push({type:'mixed',ids:[]});
 const boxes=parts.map(part=>({part,box:placementBounds(part,poses?.[part.id])}));
 for(const {part,box}of boxes){
  if(!part.unitConfirmed)findings.push({type:'units',ids:[part.id]});
  if(!plate.unbounded&&(box.min.x<margin-eps||box.max.x>width-margin+eps||box.min.y<margin-eps||box.max.y>depth-margin+eps||box.min.z<-eps||box.max.z>height+eps))findings.push({type:'outside',ids:[part.id]});
  if(box.min.z>eps)findings.push({type:'floating',ids:[part.id]});
 }
 for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
  const a=boxes[i],b=boxes[j],overlapX=Math.min(a.box.max.x,b.box.max.x)-Math.max(a.box.min.x,b.box.min.x),overlapY=Math.min(a.box.max.y,b.box.max.y)-Math.max(a.box.min.y,b.box.min.y);
  if(overlapX>eps&&overlapY>eps)findings.push({type:'overlap',ids:[a.part.id,b.part.id]});
  else{const dx=Math.max(a.box.min.x-b.box.max.x,b.box.min.x-a.box.max.x,0),dy=Math.max(a.box.min.y-b.box.max.y,b.box.min.y-a.box.max.y,0);if(Math.hypot(dx,dy)<gap-eps)findings.push({type:'clearance',ids:[a.part.id,b.part.id]});}
 }
 return findings;
}
