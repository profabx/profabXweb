import {materialById} from '../quote/catalog.js';
const normalize=value=>String(value||'').normalize('NFKC').toLowerCase().trim();
export async function fingerprintFile(file){
 if(file.size>30*1024*1024)throw new Error('单个检索文件最大30 MB / Search file limit: 30 MB');
 const hash=await crypto.subtle.digest('SHA-256',await file.arrayBuffer());
 return {name:file.name||'unnamed',size:file.size,hash:Array.from(new Uint8Array(hash),v=>v.toString(16).padStart(2,'0')).join(''),text:''};
}
export function makeOrderRecord(project,files,totalFen){
 if(!project||typeof project.id!=='string'||!Array.isArray(project.parts)||!project.parts.length||project.parts.length>10000)throw new Error('无有效订单数据 / Invalid order data');
 const time=project.confirmation?.time||new Date().toISOString();
 return {id:`${project.id}:${time}`,orderId:project.id,name:String(project.name||project.id),time,stage:String(project.stage||'确定'),totalFen:Number.isSafeInteger(totalFen)?totalFen:null,
 parts:project.parts.map(p=>({name:String(p.name||''),process:String(p.config?.process||''),material:materialById(p.config?.materialId).name,quantity:Number(p.config?.quantity)||0,sizeMm:Array.isArray(p.measurement?.sizeMm)?p.measurement.sizeMm.slice(0,3):[]})),files};
}
export function searchOrders(orders,{query='',file=null}={}){
 const q=normalize(query),tokens=q.split(/\s+/).filter(Boolean);return orders.map(order=>{
  let score=0;const reasons=[];const files=order.files||[];
  const corpus=normalize([order.orderId,order.name,...order.parts.flatMap(p=>[p.name,p.process,p.material]),...files.flatMap(f=>[f.name,f.text])].join(' '));
  if(tokens.length){if(!tokens.every(token=>corpus.includes(token)))return null;score+=30;reasons.push('keyword');}
  if(file){
   if(file.hash&&files.some(f=>f.hash===file.hash)){score+=100;reasons.push('exact-file');}
   if(file.name&&files.some(f=>normalize(f.name.split('/').pop())===normalize(file.name.split('/').pop()))){score+=25;reasons.push('filename');}
   const text=normalize(file.text),meaningful=text.split(/[\s,，;；:：]+/).filter(s=>s.length>=3&&s.length<=100).slice(0,100);
   if(text.length>=3&&(corpus.includes(text.slice(0,200))||meaningful.some(token=>corpus.includes(token)))){score+=15;reasons.push('document-text');}
   if(!reasons.some(r=>r!=='keyword'))return null;
  }
  return {order,score,reasons};
 }).filter(Boolean).sort((a,b)=>b.score-a.score||String(b.order.time).localeCompare(String(a.order.time)));
}
function openHistory(){return new Promise((resolve,reject)=>{const request=indexedDB.open('profabx-order-history-v1',1);request.onupgradeneeded=()=>request.result.createObjectStore('orders',{keyPath:'id'});request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
async function transact(mode,run){const db=await openHistory();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('orders',mode);let value;const request=run(tx.objectStore('orders'));request.onsuccess=()=>{value=request.result;};tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}finally{db.close();}}
export const listOrders=()=>transact('readonly',store=>store.getAll());
export async function saveOrder(order){await transact('readwrite',store=>store.put(order));if(typeof window!=='undefined')window.dispatchEvent(new Event('profabx-orders-changed'));}
export async function deleteOrder(id){await transact('readwrite',store=>store.delete(id));if(typeof window!=='undefined')window.dispatchEvent(new Event('profabx-orders-changed'));}
