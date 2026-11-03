import {refreshPartMeasurement} from '../model/measure.js';
import {recordActivity} from './activity.js';
import {useEffect,useState,useRef,useCallback} from 'react';
import {BufferGeometry,Float32BufferAttribute,Matrix4} from 'three';
import {createProject,serializeProject,withValidConfirmation} from './schema.js';
function openDb(){return new Promise((resolve,reject)=>{const r=indexedDB.open('profabx-local-v1',1);r.onupgradeneeded=()=>r.result.createObjectStore('projects');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export function useProject(){
 const [project,rawSetProject]=useState(createProject),[sourceFiles,setSourceFiles]=useState([]),[storageStatus,setStorageStatus]=useState('正在恢复本地项目'),[loaded,setLoaded]=useState(false);
 const ready=useRef(false),revision=useRef(0),savedRevision=useRef(0);
 const setProject=useCallback(change=>rawSetProject(previous=>withValidConfirmation(recordActivity(previous,typeof change==='function'?change(previous):change))),[]);
 useEffect(()=>{
  let cancelled=false;
  (async()=>{try{const db=await openDb();const data=await new Promise((resolve,reject)=>{const r=db.transaction('projects').objectStore('projects').get('current');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});db.close();if(cancelled)return;
   if(data){const p=data.project;if(!p.taxDefaultVersion&&!p.quoteSettings.taxDefaultVersion&&p.quoteSettings.taxPercent===13&&!p.confirmation&&p.stage==='报价')p.quoteSettings={...p.quoteSettings,taxPercent:1};p.taxDefaultVersion=2;p.parts=p.parts.map(part=>{const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(part.vertexData,3));if(part.indexData)g.setIndex(Array.from(part.indexData));g.computeVertexNormals();const {vertexData,indexData,...rest}=part;return refreshPartMeasurement({...rest,geometry:g,originalTransform:new Matrix4().fromArray(part.matrix)});});rawSetProject(withValidConfirmation(p));setSourceFiles(data.files||[]);}setStorageStatus('已恢复本地项目');
  }catch{if(!cancelled)setStorageStatus('浏览器存储不可用，请及时导出归档');}finally{ready.current=true;if(!cancelled)setLoaded(true);}})();
  const guard=e=>{if(revision.current!==savedRevision.current){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',guard);
  return()=>{cancelled=true;window.removeEventListener('beforeunload',guard);};
 },[setProject]);
 useEffect(()=>{
  if(!ready.current||!loaded)return;
  const currentRevision=++revision.current;setStorageStatus('正在保存本地项目');
  const timeout=setTimeout(async()=>{try{const p=serializeProject(project);p.parts=p.parts.map((part,i)=>({...part,vertexData:project.parts[i].geometry.attributes.position.array,indexData:project.parts[i].geometry.index?.array||null}));const db=await openDb();await new Promise((resolve,reject)=>{const tx=db.transaction('projects','readwrite');tx.objectStore('projects').put({project:p,files:sourceFiles},'current');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});db.close();if(currentRevision===revision.current){savedRevision.current=currentRevision;setStorageStatus('已保存至此浏览器');}
   }catch{if(currentRevision===revision.current)setStorageStatus('浏览器保存失败，请导出本地归档');}
  },600);return()=>clearTimeout(timeout);
 },[project,sourceFiles,loaded]);
 const updatePart=(id,change)=>setProject(p=>({...p,parts:p.parts.map(part=>part.id===id?{...part,config:{...part.config,...change}}:part)}));
 const log=message=>({time:new Date().toISOString(),message});
 return {project,setProject,sourceFiles,setSourceFiles,updatePart,storageStatus,loaded,log};
}

