function cellText(v){if(v==null)return '';if(typeof v==='object')return v.text||v.result||v.richText?.map(t=>t.text).join('')||'';return v;}
export async function extractAttachment(file){
 const ext=file.name.split('.').pop().toLowerCase(),rows=[],warnings=[];
 if(file.size>30*1024*1024)throw new Error('附件超过 30 MB 限制');
 if(ext==='xlsx'){
 const {default:ExcelJS}=await import('exceljs');const wb=new ExcelJS.Workbook();await wb.xlsx.load(await file.arrayBuffer());
 wb.eachSheet(sheet=>{const table=[];sheet.eachRow(row=>table.push(row.values.slice(1).map(cellText)));const aliases={name:['零件','零件名','零件名称','名称','name','part','part name'],quantity:['数量','qty','quantity'],material:['材料','材质','material'],process:['工艺','process']};let header=-1,cols={};for(let i=0;i<Math.min(20,table.length);i++){const row=table[i].map(x=>String(x).trim().toLowerCase());const next={};for(const [k,names]of Object.entries(aliases)){const j=row.findIndex(s=>names.includes(s));if(j>=0)next[k]=j;}if(next.name!==undefined){header=i;cols=next;break;}}
 if(header<0){warnings.push(`${sheet.name}：未识别到零件名称列`);return;}for(const row of table.slice(header+1)){if(!row[cols.name])continue;const r={source:`${file.name} / ${sheet.name}`,confidence:'按列名提取，需确认'};for(const [k,i]of Object.entries(cols))r[k]=row[i];rows.push(r);}});
 }else if(ext==='pdf'){
 const pdf=await import('pdfjs-dist');const worker=await import('pdfjs-dist/build/pdf.worker.min.mjs?url');pdf.GlobalWorkerOptions.workerSrc=worker.default;
 const doc=await pdf.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;let text='';for(let i=1;i<=Math.min(doc.numPages,50);i++){const page=await doc.getPage(i),content=await page.getTextContent();text+=content.items.map(x=>x.str+(x.hasEOL?'\n':' ')).join('')+'\n';}await doc.destroy();
 if(!text.trim())warnings.push('未检测到可提取文字：扫描 PDF 需要 OCR，本版不提供。');else{warnings.push('PDF 仅按文本尝试识别；请确认匹配，无法推断图纸标注。');for(const line of text.split('\n')){const n=line.match(/(?:数量|qty|quantity)\s*[:：]?\s*(\d+)/i);if(n)rows.push({source:file.name,name:line.trim().slice(0,100),quantity:Number(n[1]),material:line.match(/PLA|ABS|PETG|PA12|TPU|6061/i)?.[0]||'',process:line.match(/FDM|LCD|SLA|CNC|SLM|SLS|MJF/i)?.[0]||'',confidence:'低：PDF 文本，需手动匹配'});}if(!rows.length)warnings.push(`已提取文字但未识别数量字段：${text.slice(0,300)}`);}
 }else warnings.push('此附件作为原文件归档；字段提取支持 .xlsx 和文本型 .pdf。旧版 .xls 请先另存为 .xlsx。');
 return {rows,warnings};
}
export function matchRows(rows,parts){return rows.map(row=>{const matches=parts.filter(p=>p.name.replace(/\.[^.]+$/,'').toLowerCase()===String(row.name).replace(/\.[^.]+$/,'').toLowerCase());return {...row,partId:matches.length===1?matches[0].id:'',ambiguous:matches.length>1};});}
