const fs=require('node:fs');
const path=require('node:path');
const net=require('node:net');
const {spawn}=require('node:child_process');
const {validateBuild,projectKey}=require('./serve.cjs');

async function readHealth(port){
 try{const response=await fetch(`http://127.0.0.1:${port}/__profabx_health`,{signal:AbortSignal.timeout(600)});if(!response.ok)return null;return await response.json();}catch{return null;}
}
async function available(port){return new Promise(resolve=>{const probe=net.createServer();probe.once('error',()=>resolve(false));probe.listen(port,'127.0.0.1',()=>probe.close(()=>resolve(true)));});}
async function ensurePreview({projectRoot=path.resolve(__dirname,'..'),port=4173,fallbackAttempts=8}={}){
 validateBuild(projectRoot);
 const key=projectKey(projectRoot),script=path.join(projectRoot,'scripts/serve.cjs');
 if(!fs.existsSync(script))throw new Error('缺少 scripts/serve.cjs，请恢复完整项目。');
 for(let attempt=0;attempt<=fallbackAttempts;attempt++){
  const candidate=port+attempt;if(!Number.isInteger(candidate)||candidate<1||candidate>65535)throw new Error('Invalid preview port');
  const existing=await readHealth(candidate);
  if(existing?.service==='ProFabXweb'&&existing.projectKey===key&&existing.ready)return {url:`http://127.0.0.1:${candidate}/`,port:candidate,pid:existing.pid,started:false};
  if(!await available(candidate))continue;
  const logs=path.join(projectRoot,'.preview');fs.mkdirSync(logs,{recursive:true});
  const out=fs.openSync(path.join(logs,'server.log'),'a'),err=fs.openSync(path.join(logs,'server-error.log'),'a');
  let child;try{child=spawn(process.execPath,[script,String(candidate)],{cwd:projectRoot,detached:true,windowsHide:true,stdio:['ignore',out,err]});}finally{fs.closeSync(out);fs.closeSync(err);}
  let spawnError;child.once('error',error=>{spawnError=error;});child.unref();
  const deadline=Date.now()+8000;
  while(Date.now()<deadline){
   if(spawnError)throw spawnError;
   const health=await readHealth(candidate);
   if(health?.service==='ProFabXweb'&&health.projectKey===key&&health.ready){fs.writeFileSync(path.join(logs,'server.pid'),String(health.pid));fs.writeFileSync(path.join(logs,'url.txt'),`http://127.0.0.1:${candidate}/\n`);return {url:`http://127.0.0.1:${candidate}/`,port:candidate,pid:health.pid,started:true};}
   if(child.exitCode!==null)break;
   await new Promise(resolve=>setTimeout(resolve,100));
  }
  throw new Error(`预览服务未能启动，请查看 ${path.join(logs,'server-error.log')}。`);
 }
 throw new Error(`端口 ${port} 已被其他服务占用。请释放端口，或运行 node scripts/start-preview.cjs --port=其他端口。`);
}
function openBrowser(url){
 if(process.platform!=='win32')return;
 const executable=path.join(process.env.WINDIR||'C:/Windows','System32/rundll32.exe');
 const child=spawn(executable,['url.dll,FileProtocolHandler',url],{detached:true,windowsHide:true,stdio:'ignore'});child.on('error',()=>console.log('请复制上方地址到浏览器。'));child.unref();
}
if(require.main===module){
 const portArgument=process.argv.find(arg=>arg.startsWith('--port='));
 ensurePreview({port:portArgument?Number(portArgument.slice(7)):4173}).then(result=>{
  console.log(`ProFabX ${result.started?'预览已启动':'预览已在运行'}\n${result.url}`);
  if(result.port!==4173)console.log(`4173端口被占用，本次使用 ${result.port}；请使用上方实际地址。`);
  if(!process.argv.includes('--no-open'))openBrowser(result.url);
 }).catch(error=>{console.error(error.message);process.exitCode=1;});
}
module.exports={ensurePreview,readHealth};
