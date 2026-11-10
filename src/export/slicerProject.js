import JSZip from 'jszip';
import {arrangeOnPlate,canPlaceIndividually,originalPose,placedGeometry} from '../placement/geometry.js';
import {plateForPrinter} from '../placement/printers.js';

// Add future slicer targets here; the confirmation UI consumes this registry.
export const slicerTargets=[{id:'bambu',label:'拓竹切片软件',extension:'3mf'}];
const xml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
export async function buildSlicerProject(project,targetId='bambu'){
 if(!slicerTargets.some(target=>target.id===targetId))throw Error('暂不支持此切片软件');
 const parts=project.parts;
 if(!parts.length||parts.some(p=>!p.unitConfirmed))throw Error('请先导入零件并确认模型单位');
 const independent=canPlaceIndividually(parts),plate=project.placement?.plate||plateForPrinter(parts[0]?.config.deviceId||''),poses=independent?(project.placement?.poses||arrangeOnPlate(parts,{},plate).poses):{};
 const objects=parts.map((part,index)=>{
  const geometry=placedGeometry(part,poses[part.id]||originalPose(part));
  try{
   const position=geometry.getAttribute('position'),vertices=[];
   for(let i=0;i<position.count;i++){
    const coordinates=[position.getX(i),position.getY(i),position.getZ(i)];
    if(!coordinates.every(Number.isFinite))throw Error('模型存在无效坐标，请修复后导出');
    vertices.push(`<vertex x="${coordinates[0]}" y="${coordinates[1]}" z="${coordinates[2]}"/>`);
   }
   const count=geometry.index?.count??position.count,triangles=[];
   if(count%3)throw Error('模型三角网格不完整');
   for(let i=0;i<count;i+=3){const at=n=>geometry.index?geometry.index.getX(n):n;triangles.push(`<triangle v1="${at(i)}" v2="${at(i+1)}" v3="${at(i+2)}"/>`);}
   return `<object id="${index+1}" name="${xml(part.name)}" type="model"><mesh><vertices>${vertices.join('')}</vertices><triangles>${triangles.join('')}</triangles></mesh></object>`;
  }finally{geometry.dispose();}
 });
 const zip=new JSZip();
 zip.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>');
 zip.file('_rels/.rels','<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="model" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>');
 zip.file('3D/3dmodel.model',`<?xml version="1.0" encoding="UTF-8"?><model unit="millimeter" xml:lang="zh-CN" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"><metadata name="Application">ProFabX</metadata><resources>${objects.join('')}</resources><build>${parts.map((_,i)=>`<item objectid="${i+1}"/>`).join('')}</build></model>`);
 // A geometry-only 3MF deliberately keeps the user's slicer presets independent.
 return zip.generateAsync({type:'uint8array',compression:'DEFLATE'});
}
