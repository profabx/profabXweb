function openFolders(){return new Promise((resolve,reject)=>{const r=indexedDB.open('profabx-local-folders-v1',1);r.onupgradeneeded=()=>r.result.createObjectStore('handles');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function rememberFolder(handle){const db=await openFolders();try{await new Promise((resolve,reject)=>{const tx=db.transaction('handles','readwrite');tx.objectStore('handles').put(handle,'transactions');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}finally{db.close();}}
export async function recalledFolder(){const db=await openFolders();try{return await new Promise((resolve,reject)=>{const r=db.transaction('handles').objectStore('handles').get('transactions');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}finally{db.close();}}
export async function listFolderEntries(handle){const entries=[];for await(const [name,item]of handle.entries())entries.push({name,kind:item.kind});return entries.sort((a,b)=>(a.kind===b.kind?0:a.kind==='directory'?-1:1)||a.name.localeCompare(b.name));}
export async function deleteFolderEntries(handle,names){
 if(!Array.isArray(names)||!names.length||names.some(name=>typeof name!=='string'||!name||name==='.'||name==='..'||/[\\/\u0000]/.test(name)))throw new Error('Invalid file selection');
 const current=new Map((await listFolderEntries(handle)).map(e=>[e.name,e.kind])),results=[];
 for(const name of new Set(names)){if(!current.has(name)){results.push({name,status:'missing'});continue;}try{await handle.removeEntry(name,{recursive:current.get(name)==='directory'});results.push({name,status:'deleted'});}catch(e){results.push({name,status:'failed',message:e.message});}}
 return results;
}
