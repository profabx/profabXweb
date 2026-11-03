import {activityMarkdown} from '../project/activity.js';
import {serializeProject} from '../project/schema.js';
const encoder=new TextEncoder();
export function beginDirectorySelection(picker){try{return Promise.resolve(picker()).then(handle=>({handle}),error=>({error}));}catch(error){return Promise.resolve({error});}}
function safePath(path){return String(path).replaceAll('\\','/').split('/').filter(x=>x&&x!=='.'&&x!=='..').map(x=>x.replace(/[<>:"|?*\u0000-\u001f]/g,'_')).join('/')||'unnamed';}
export async function buildArchiveEntries(project,sourceFiles,quoteBytes){
 const snapshot=serializeProject(project),entries=[{path:'project.json',bytes:encoder.encode(JSON.stringify(snapshot,null,2))},{path:'log.md',bytes:encoder.encode(`# ${project.name}\n\n项目号：${project.id}\n\n${activityMarkdown(project.history)}\n\n## 讨论记录\n${Object.entries(project.threads).map(([k,v])=>`### ${k}\n${v.map(m=>`- ${m.time} ${m.author}: ${m.text}`).join('\n')}`).join('\n')}\n\n本地工程版；未连接外部服务。\n`)},{path:'报价.xlsx',bytes:quoteBytes}];const used=new Set(entries.map(e=>e.path));
 const mapping=[];for(const [i,s]of sourceFiles.entries()){const original=safePath(s.path);let path=`design/${original}`,suffix=i+1;while(used.has(path))path=`design/${suffix++}-${original}`;used.add(path);entries.push({path,bytes:new Uint8Array(await s.file.arrayBuffer())});mapping.push({sourcePath:s.path,archivePath:path});}entries.push({path:'source-manifest.json',bytes:encoder.encode(JSON.stringify(mapping,null,2))});return entries;
}
export async function saveTransaction(entries,{directoryPicker,filename='ProFabX-transaction.zip'}={}){
 try{if(directoryPicker){const dir=await directoryPicker();for(const entry of entries){const segments=entry.path.split('/');let parent=dir;for(const s of segments.slice(0,-1))parent=await parent.getDirectoryHandle(s,{create:true});const file=await parent.getFileHandle(segments.at(-1),{create:true}),w=await file.createWritable();await w.write(entry.bytes);await w.close();}return {status:'saved',method:'directory'};}
 const {default:JSZip}=await import('jszip');const {downloadBlob}=await import('./quotation.js');const zip=new JSZip();for(const e of entries)zip.file(e.path,e.bytes);downloadBlob(await zip.generateAsync({type:'blob'}),filename);return {status:'saved',method:'download'};
 }catch(e){return {status:e.name==='AbortError'?'cancelled':'failed',method:directoryPicker?'directory':'download',error:e.message};}
}
