import {fingerprintFile,makeOrderRecord,saveOrder} from './history.js';
import {calculateQuote} from '../quote/calculate.js';
export async function extractSearchText(file){
 const ext=file.name.split('.').pop().toLowerCase();
 if(['txt','md','csv','json'].includes(ext))return (await file.text()).slice(0,100000);
 if(ext==='pdf'){
  const pdf=await import('pdfjs-dist'),worker=await import('pdfjs-dist/build/pdf.worker.min.mjs?url');pdf.GlobalWorkerOptions.workerSrc=worker.default;
  const doc=await pdf.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;try{let text='';for(let i=1;i<=Math.min(doc.numPages,30);i++){const page=await doc.getPage(i),content=await page.getTextContent();text+=content.items.map(x=>x.str).join(' ')+'\n';if(text.length>=100000)break;}return text.slice(0,100000);}finally{await doc.destroy();}
 }
 if(ext==='xlsx'){
  const {default:ExcelJS}=await import('exceljs'),book=new ExcelJS.Workbook();await book.xlsx.load(await file.arrayBuffer());let text='';book.eachSheet(sheet=>sheet.eachRow((row,i)=>{if(i<=1000&&text.length<100000)text+=row.values.slice(1).map(v=>typeof v==='object'?(v?.text||v?.result||v?.richText?.map(r=>r.text).join('')||''):v).join(' ')+'\n';}));return text.slice(0,100000);
 }
 return '';
}
export async function describeFile(file,path=file.name){const signature=await fingerprintFile(file);signature.name=path;try{signature.text=await extractSearchText(file);}catch{signature.textUnavailable=true;}return signature;}
export async function indexOrder(project,sourceFiles,totalFen){
 const files=[],warnings=[];
 for(const source of sourceFiles){try{const file=new File([source.file],source.path.split('/').pop(),{type:source.file.type});const description=await describeFile(file,source.path);files.push(description);if(description.textUnavailable)warnings.push(source.path);}catch{warnings.push(source.path);}}
 const order=makeOrderRecord(project,files,totalFen);order.indexWarnings=warnings;await saveOrder(order);return order;
}
export async function importArchivedOrder(file){
 if(file.size>30*1024*1024)throw new Error('ZIP最大30 MB / ZIP limit: 30 MB');
 const {default:JSZip}=await import('jszip'),zip=await JSZip.loadAsync(await file.arrayBuffer());
 const entries=Object.values(zip.files).filter(e=>!e.dir);if(entries.length>500||entries.reduce((sum,e)=>sum+(e._data?.uncompressedSize||0),0)>100*1024*1024)throw new Error('归档过大 / Archive too large');
 const data=zip.file('project.json');if(!data||data._data.uncompressedSize>5*1024*1024)throw new Error('请选择含project.json的交易ZIP / Select a transaction ZIP containing project.json');
 const project=JSON.parse(await data.async('string'));makeOrderRecord(project,[],null);
 const sources=[];for(const entry of entries.filter(e=>e.name.startsWith('design/'))){if(entry._data.uncompressedSize<=30*1024*1024)sources.push({path:entry.name.slice(7),file:new File([await entry.async('uint8array')],entry.name.split('/').pop())});}
 let total=null;try{total=calculateQuote(project.parts,project.quoteSettings).totalFen;}catch{}
 return indexOrder(project,sources,total);
}
