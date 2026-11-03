import test from 'node:test';import assert from 'node:assert/strict';import http from 'node:http';import fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';import {createRequire} from 'node:module';import {EventEmitter} from 'node:events';
const require=createRequire(import.meta.url),{createLiveHandler}=require('../scripts/live-link/service.cjs'),{make3mf}=require('../scripts/slicing/core.cjs');
test('reconnect before first host binding acknowledgement queues a new project binding',async t=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'pfx-first-reconnect-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
 const jobId='11111111-1111-4111-8111-111111111111',dir=path.join(root,'.slicing/jobs',jobId),hostDir=path.join(root,'host');await fs.mkdir(dir,{recursive:true});
 await fs.writeFile(path.join(dir,'job.json'),JSON.stringify({status:'complete',engine:'bambu',files:{project:'editable.3mf'}}));await fs.writeFile(path.join(dir,'editable.3mf'),await make3mf({parts:[{id:'part-a',name:'PFXLIVE:part-a:Cube',vertices:[0,0,0,10,0,0,0,10,0],triangles:[0,1,2]}]},{machine:{},process:{},filament:{}}));
 let launches=0;const handler=createLiveHandler(root,{hostDirectory:hostDir,runtime:async()=>({available:true,exe:'test.exe',persistentHost:true}),launch:()=>{launches++;const child=new EventEmitter();child.pid=process.pid;child.unref=()=>{};queueMicrotask(()=>child.emit('spawn'));return child;}}),server=http.createServer((req,res)=>handler(req,res,new URL(req.url,'http://localhost').pathname));await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>server.close(r)));
 const base='http://127.0.0.1:'+server.address().port,post=async(route,body,token)=>{const r=await fetch(base+'/api/live-link/'+route,{method:'POST',headers:{'X-ProFabX-Local':'live-link','Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:JSON.stringify(body)});assert.equal(r.status,200,await r.clone().text());return r.json();},body={jobId,projectId:'project',geometryKey:'same',baseline:{'part-a':{position:[0,0,0],rotation:[0,0,0]}}};
 const a=await post('sessions',body);const config=JSON.parse(await fs.readFile(path.join(hostDir,'host-descriptor.json')));
 await post('sessions/'+a.id+'/exchange',{seq:1,ready:true,ids:['part-a'],updates:[]},config.initial.token);
 const waiting=await post('sessions/'+a.id+'/exchange',{seq:1,updates:[]},a.token);assert.equal(waiting.nativeConnected,false,'pose readiness alone cannot confirm host model mapping');
 await post('sessions/'+a.id+'/close',{},a.token);const b=await post('sessions',body);
 const result=await post('hosts/'+config.hostId+'/exchange',{seq:1,epoch:config.epoch,bindingReady:true,bindingSession:a.id},config.token);
 assert.equal(launches,1);assert.equal(result.commands.length,1);assert.equal(result.commands[0].type,'load-project');assert.equal(result.commands[0].sessionId,b.id);
});
