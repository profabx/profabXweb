import {withPreviewNormals} from './model/previewNormals.js';
import {memo,useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {centeredGeometry,poseQuaternion} from './placement/geometry.js';
import {groupColor} from './model/viewState.js';
import './part-thumbnail.css';

// One offscreen renderer serves the visible rows; rows only retain PNG images.
let renderer,frame=0;
const pending=new Set(),cache=new WeakMap();
function schedule(task){
 pending.add(task);
 function next(){frame=0;const item=pending.values().next().value;if(!item)return;pending.delete(item);item();if(pending.size)frame=requestAnimationFrame(next);}
 if(!frame)frame=requestAnimationFrame(next);
 return ()=>pending.delete(task);
}
function snapshot(part,rotation,color,key){
 let images=cache.get(part.geometry);if(images?.has(key))return images.get(key);
 if(!renderer){renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setSize(128,128,false);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;}
 const geometry=withPreviewNormals(part,centeredGeometry(part)),material=new THREE.MeshStandardMaterial({color,metalness:.15,roughness:.55,side:THREE.DoubleSide});
 try{
  geometry.applyQuaternion(poseQuaternion(rotation));geometry.computeBoundingBox();const box=geometry.boundingBox,center=box.getCenter(new THREE.Vector3()),span=box.getSize(new THREE.Vector3()).length();
  if(!Number.isFinite(span)||span<=0)throw new Error('Empty part geometry');
  geometry.translate(-center.x,-center.y,-center.z);
  const scene=new THREE.Scene(),mesh=new THREE.Mesh(geometry,material);scene.add(mesh);scene.add(new THREE.HemisphereLight(0xffffff,0xa8b7cf,3));const light=new THREE.DirectionalLight(0xffffff,4);light.position.set(80,-100,300);scene.add(light);
  const camera=new THREE.PerspectiveCamera(38,1,Math.max(span/1000,.00001),span*30);camera.up.set(0,0,1);camera.position.copy(new THREE.Vector3(1,-1.3,1.2).normalize().multiplyScalar(span/(2*Math.sin(THREE.MathUtils.degToRad(19)))*1.12));camera.lookAt(0,0,0);camera.updateProjectionMatrix();
  renderer.setClearColor(0x000000,0);renderer.render(scene,camera);const image=renderer.domElement.toDataURL('image/png');renderer.renderLists.dispose();
  if(!images){images=new Map();cache.set(part.geometry,images);}if(images.size>=16)images.delete(images.keys().next().value);images.set(key,image);return image;
 }finally{geometry.dispose();material.dispose();}
}
export default memo(function PartThumbnail({part,rotation=[0,0,0],selected=false}){
 const host=useRef(),[visible,setVisible]=useState(false),[src,setSrc]=useState(''),[failed,setFailed]=useState(false);
 const color=selected?'#0054ff':groupColor(part.config.process,part.config.materialId),angles=rotation.map(v=>Number(v)||0),key=JSON.stringify([part.unit,part.originalTransform?.elements,angles,color]);
 useEffect(()=>{if(!globalThis.IntersectionObserver){setVisible(true);return;}const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setVisible(true);observer.disconnect();}},{rootMargin:'160px'});observer.observe(host.current);return ()=>observer.disconnect();},[]);
 useEffect(()=>{if(!visible||!part.geometry)return;let active=true,cancel;const timer=setTimeout(()=>{cancel=schedule(()=>{try{const image=snapshot(part,angles,color,key);if(active){setSrc(image);setFailed(false);}}catch{if(active){setSrc('');setFailed(true);}}});},120);return ()=>{active=false;clearTimeout(timer);cancel?.();};},[visible,part.geometry,key]);
 return <span ref={host} className="part-thumbnail" title={part.name} data-thumbnail-state={src?'ready':failed?'unavailable':'loading'}>{src?<img src={src} alt="" aria-hidden="true" draggable="false"/>:<span className={`part-thumbnail-placeholder ${failed?'unavailable':''}`} aria-hidden="true"/>}</span>;
});

// Export images on demand using the same isolated-part renderer as the list.
export async function prepareQuoteImages(project){const images={};for(const part of project.parts){if(!part.geometry)continue;const rotation=project.placement?.poses?.[part.id]?.rotation||[0,0,0],color=groupColor(part.config.process,part.config.materialId),angles=rotation.map(v=>Number(v)||0),key=JSON.stringify([part.unit,part.originalTransform?.elements,angles,color]);await new Promise(resolve=>schedule(()=>{try{images[part.id]=snapshot(part,angles,color,key);}catch{/* Export retains the row with an explicit no-preview label. */}resolve();}));}return images;}
