import {BufferGeometry,Float32BufferAttribute,Matrix4} from 'three';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {defaultConfig} from '../project/schema.js';
import {measureGeometry} from './measure.js';
import {suggestUnitPrice} from '../quote/catalog.js';
let kernel;
async function cadKernel(){
 if(!kernel)kernel=(async()=>{if(typeof window==='undefined'){const module='occt-import-js';const m=await import(/* @vite-ignore */ module);return m.default();}
 if(!window.occtimportjs)await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=`${import.meta.env.BASE_URL}cad/occt-import-js.js`;s.onload=resolve;s.onerror=()=>reject(new Error('CAD 内核加载失败，请检查本地 CAD 资源'));document.head.append(s);});return window.occtimportjs({locateFile:f=>`${import.meta.env.BASE_URL}cad/${f}`});})();
 try{return await kernel;}catch(e){kernel=null;throw e;}
}
export function makePart(name,path,geometry,matrix=new Matrix4(),unit='mm',assemblyPath=''){
 if(!geometry.attributes.position?.count)throw new Error('未找到有效网格');geometry.computeVertexNormals();
 const measurement=measureGeometry(geometry,matrix,unit);const config={...defaultConfig};config.unitBaseYuan=suggestUnitPrice(measurement,config.process,config.materialId);
 return {id:crypto.randomUUID(),name,sourcePath:path,assemblyPath,geometry,originalTransform:matrix.clone(),unit,unitConfirmed:/\.(step|stp|igs|iges)$/i.test(path),measurement,config};
}
export async function importModels(files,onProgress=()=>{}){
 const parts=[],errors=[],sourceFiles=[];let done=0;
 for(const file of files){const path=file.webkitRelativePath||file.name,ext=file.name.split('.').pop().toLowerCase();
 if(!['stl','obj','step','stp','iges','igs'].includes(ext))continue;
 try{if(file.size>150*1024*1024)throw new Error('文件超过本版 150 MB 单文件限制，请简化或拆分');const data=await file.arrayBuffer(),added=[];
 if(ext==='stl')added.push(makePart(file.name,path,new STLLoader().parse(data)));
 else if(ext==='obj'){const object=new OBJLoader().parse(new TextDecoder().decode(data));object.updateMatrixWorld(true);object.traverse(child=>{if(child.isMesh)added.push(makePart(child.name||file.name,path,child.geometry.clone(),child.matrixWorld));});}
 else {const occt=await cadKernel(),result=ext==='stp'||ext==='step'?occt.ReadStepFile(new Uint8Array(data),{linearUnit:'millimeter'}):occt.ReadIgesFile(new Uint8Array(data),{linearUnit:'millimeter'});if(!result.success||!result.meshes?.length)throw new Error('CAD 转换失败：未找到可三角化实体');
 const paths=new Map();function walk(node,parents=[]){const here=[...parents,node.name||'Assembly'];for(const i of node.meshes||[])paths.set(i,here.join(' / '));for(const c of node.children||[])walk(c,here);}if(result.root)walk(result.root);
 for(const [i,mesh] of result.meshes.entries()){const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(mesh.attributes.position.array,3));g.setIndex(mesh.index.array);added.push(makePart(mesh.name||`${file.name} #${i+1}`,path,g,new Matrix4(),'mm',paths.get(i)||''));}}
 if(!added.length)throw new Error('文件中没有可显示的零件');for(const p of added)p.sourceObjectCount=added.length;parts.push(...added);sourceFiles.push({path,file});
 }catch(e){errors.push({path,message:e.message});}onProgress(++done,files.length,file.name);
 }return {parts,errors,sourceFiles};
}
