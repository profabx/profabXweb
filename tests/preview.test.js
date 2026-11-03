import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {createPreviewServer,validateBuild,projectKey}=require('../scripts/serve.cjs');
const {ensurePreview}=require('../scripts/start-preview.cjs');

async function fixture(){
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'ProFabX-preview-'));
 await fs.mkdir(path.join(root,'dist/assets'),{recursive:true});
 await fs.mkdir(path.join(root,'dist/cad'),{recursive:true});
 await fs.mkdir(path.join(root,'scripts'),{recursive:true});
 for(const name of ['index','prototype','cmf','partners','about'])await fs.writeFile(path.join(root,'dist',name+'.html'),'<html><head><script type="module" src="./assets/main.js"></script></head><body>ProFabX</body></html>');
 for(const name of ['assets/main.js','assets/hero.png','cad/occt-import-js.js','cad/occt-import-js.wasm'])await fs.writeFile(path.join(root,'dist',name),'fixture');
 await fs.copyFile(new URL('../scripts/serve.cjs',import.meta.url),path.join(root,'scripts/serve.cjs'));
 await fs.cp(new URL('../scripts/slicing',import.meta.url),path.join(root,'scripts/slicing'),{recursive:true});
 await fs.cp(new URL('../scripts/live-link',import.meta.url),path.join(root,'scripts/live-link'),{recursive:true});
 return root;
}
async function listen(server){await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});return server.address().port;}
test('missing production files fail with a clear recovery instruction',async()=>{const root=await fixture();await fs.unlink(path.join(root,'dist/assets/main.js'));assert.throws(()=>validateBuild(root),/main\.js/);});
test('serves all pages, WASM and identifying health status',async t=>{const root=await fixture();const server=createPreviewServer(root);const port=await listen(server);t.after(()=>new Promise(resolve=>server.close(resolve)));for(const name of ['index','prototype','cmf','partners','about']){const r=await fetch(`http://127.0.0.1:${port}/${name}.html`);assert.equal(r.status,200);assert.match(r.headers.get('cache-control'),/no-store/);}const wasm=await fetch(`http://127.0.0.1:${port}/cad/occt-import-js.wasm`);assert.equal(wasm.headers.get('content-type'),'application/wasm');const health=await(await fetch(`http://127.0.0.1:${port}/__profabx_health`)).json();assert.equal(health.service,'ProFabXweb');assert.equal(health.projectKey,projectKey(root));assert.equal(health.ready,true);});
test('launcher starts a detached preview and reuses its healthy instance',async t=>{const root=await fixture();const reserve=http.createServer();const port=await listen(reserve);await new Promise(resolve=>reserve.close(resolve));const first=await ensurePreview({projectRoot:root,port,fallbackAttempts:0});t.after(()=>{try{process.kill(first.pid);}catch{}});assert.equal(first.started,true);assert.equal((await fetch(first.url)).status,200);const second=await ensurePreview({projectRoot:root,port,fallbackAttempts:0});assert.equal(second.started,false);assert.equal(second.pid,first.pid);});
test('occupied port reports the conflict without killing another service',async t=>{const root=await fixture();const unrelated=http.createServer((req,res)=>res.end('unrelated'));const port=await listen(unrelated);t.after(()=>new Promise(resolve=>unrelated.close(resolve)));await assert.rejects(()=>ensurePreview({projectRoot:root,port,fallbackAttempts:0}),/端口|port/i);assert.equal(await(await fetch(`http://127.0.0.1:${port}/`)).text(),'unrelated');});
test('launcher selects a free fallback port while preserving the occupied service',async t=>{const root=await fixture();const unrelated=http.createServer((req,res)=>res.end('original'));const port=await listen(unrelated);t.after(()=>new Promise(resolve=>unrelated.close(resolve)));const result=await ensurePreview({projectRoot:root,port,fallbackAttempts:8});t.after(()=>{try{process.kill(result.pid);}catch{}});assert.ok(result.port>port&&result.port<=port+8);assert.equal((await fetch(result.url)).status,200);assert.equal(await(await fetch(`http://127.0.0.1:${port}/`)).text(),'original');});
