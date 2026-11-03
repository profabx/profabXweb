import {Euler,Quaternion,Vector3,MathUtils} from 'three';
import {sectionSegments,bridgeAt,layerScreen} from './raster.js';
export function screenGeometry({positions,validatedClosed,process='FDM',rotation=[0,0,0],zOffset=0,gridLimit=96,timeBudgetMs=5000,orientationTrusted=true}){
 const started=Date.now(),out={status:'complete',method:'当前朝向的表面/分层几何初筛',exhaustive:false,checks:{overhang:true,bridge:true,lcd:false,slice:false},overhang:{exists:false,minAngle:null},bridge:{exists:false,maxLength:null},lcd:{islands:false,cup:false,trapped:false}};
 if(!validatedClosed)return {...out,status:'unavailable',checks:{},reason:'模型闭合/完整性检查未通过，请修复后检测'};
 if(!positions?.length||positions.length%9||positions.length/9>250000)return {...out,status:'unavailable',checks:{},reason:'网格为空、无效或超过 25 万面的初筛范围'};
 if(!Number.isFinite(zOffset)||zOffset<0)return {...out,status:'unavailable',checks:{},reason:'零件位于工作平面以下，请先调整摆放'};
 const q=new Quaternion().setFromEuler(new Euler(...rotation.map(MathUtils.degToRad),'XYZ')),p=new Float64Array(positions.length),v=new Vector3(),bounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
 for(let i=0;i<p.length;i+=3){v.fromArray(positions,i).applyQuaternion(q);if(!v.toArray().every(Number.isFinite))return {...out,status:'unavailable',checks:{},reason:'网格坐标无效'};p.set(v.toArray(),i);for(let a=0;a<3;a++){bounds[a]=Math.min(bounds[a],p[i+a]);bounds[a+3]=Math.max(bounds[a+3],p[i+a]);}}
 const shift=zOffset-bounds[2];for(let i=2;i<p.length;i+=3)p[i]+=shift;bounds[5]+=shift;bounds[2]=zOffset;
 let volume=0;for(let j=0;j<p.length;j+=9)volume+=p[j]*(p[j+4]*p[j+8]-p[j+5]*p[j+7])+p[j+1]*(p[j+5]*p[j+6]-p[j+3]*p[j+8])+p[j+2]*(p[j+3]*p[j+7]-p[j+4]*p[j+6]);if(Math.abs(volume)<1e-10)return {...out,status:'unavailable',checks:{},reason:'网格体积无法可靠判断'};const orientation=Math.sign(volume),eps=Math.max(1e-6,(bounds[5]-bounds[2])*1e-7),cache=new Map();let processed=0;
 if(!orientationTrusted){out.status='limited';out.checks.overhang=false;out.checks.bridge=false;out.reason='闭合壳体方向混合，悬垂与桥接需切片复核';}
 for(let j=0;orientationTrusted&&j<p.length;j+=9){if(j%576===0&&Date.now()-started>timeBudgetMs){out.status='limited';out.checks.overhang=false;out.checks.bridge=false;out.reason='表面初筛达到时间预算';break;}const a=new Vector3().fromArray(p,j),b=new Vector3().fromArray(p,j+3),c=new Vector3().fromArray(p,j+6),n=b.clone().sub(a).cross(c.clone().sub(a));if(n.length()<1e-12)continue;n.normalize().multiplyScalar(orientation);if(n.z>=-1e-8)continue;const center=a.clone().add(b).add(c).multiplyScalar(1/3);if(Math.max(a.z,b.z,c.z)<=eps)continue;processed++;const angle=MathUtils.radToDeg(Math.acos(Math.min(1,Math.abs(n.z))));let bridge=null;
  if(angle<.1){const level=center.z-eps,key=level.toFixed(6);if(!cache.has(key)){if(cache.size>=64){out.status='limited';out.checks.bridge=false;out.checks.overhang=false;continue;}cache.set(key,sectionSegments(p,level));}const dirs=[[1,0],[0,1]];for(const e of [b.clone().sub(a),c.clone().sub(b),a.clone().sub(c)]){const len=Math.hypot(e.x,e.y);if(len>eps)dirs.push([e.x/len,e.y/len]);}bridge=bridgeAt(cache.get(key),[center.x,center.y],dirs);}
  if(bridge!==null){out.bridge.exists=true;out.bridge.maxLength=Math.max(out.bridge.maxLength||0,bridge);}else{out.overhang.exists=true;out.overhang.minAngle=Math.min(out.overhang.minAngle??90,angle);}
 }
 out.downwardFaces=processed;
 if(process==='LCD'){const layers=layerScreen(p,bounds,{gridLimit,budget:()=>Date.now()-started>timeBudgetMs});out.checks.lcd=!!layers.checks?.lcd;out.checks.slice=!!layers.checks?.slice;if(layers.lcd)out.lcd={...layers.lcd,islands:layers.lcd.islands||zOffset>eps};Object.assign(out,{resolution:layers.resolution,layers:layers.layers,grid:layers.grid,counts:layers.counts,sliceDefect:layers.sliceDefect});if(layers.status!=='complete'){out.status='limited';out.reason=layers.reason;}}
 out.elapsedMs=Date.now()-started;return out;
}
