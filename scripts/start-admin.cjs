const fs = require('node:fs');
const path = require('node:path');
const net = require('node:net');
const {spawn, spawnSync} = require('node:child_process');
const {validateBuild, projectKey} = require('./serve.cjs');

async function managementReady(root) {
 try {
  const base = 'http://127.0.0.1:4185';
  const health = await fetch(base + '/__profabx_health', {signal:AbortSignal.timeout(800)}).then(r=>r.json());
  if (health.service !== 'ProFabXweb' || !health.ready || health.projectKey !== projectKey(root)) return false;
  const page = await fetch(base + '/prototype.html', {signal:AbortSignal.timeout(800)}).then(r=>r.text());
  return page.includes('admin-view.js');
 } catch { return false; }
}

async function ensureAdmin(root = path.resolve(__dirname, '..')) {
 if (await managementReady(root)) return 'http://127.0.0.1:4185/prototype.html';
 const available = await new Promise(resolve=>{
  const probe=net.createServer();
  probe.once('error',()=>resolve(false));
  probe.listen(4185,'127.0.0.1',()=>probe.close(()=>resolve(true)));
 });
 if (!available) throw Error('4185 端口已被其他服务占用，请查看该服务后重试。');
 try { validateBuild(root, 'dist-admin'); } catch {
  const result=spawnSync(process.execPath,[path.join(root,'scripts/build-admin.cjs')],{cwd:root,stdio:'inherit',windowsHide:true});
  if(result.status!==0)throw Error('管理版构建失败。');
 }
 const logs=path.join(root,'.preview');
 fs.mkdirSync(logs,{recursive:true});
 const output=fs.openSync(path.join(logs,'admin-start.log'),'a');
 let child, failure;
 try {
  child=spawn(process.execPath,[path.join(root,'scripts/admin-server.cjs')],{
   cwd:root,detached:true,windowsHide:true,stdio:['ignore',output,output]
  });
  child.on('error',error=>{failure=error;});
  child.unref();
 } finally {fs.closeSync(output);}
 const deadline=Date.now()+10000;
 while(Date.now()<deadline){
  if(failure)throw failure;
  if(await managementReady(root))return 'http://127.0.0.1:4185/prototype.html';
  await new Promise(resolve=>setTimeout(resolve,200));
 }
 throw Error('管理服务启动失败，请查看 .preview/admin-start.log。');
}
if(require.main===module)ensureAdmin().then(url=>console.log(url)).catch(error=>{
 console.error(error.message);process.exitCode=1;
});
module.exports={ensureAdmin};
