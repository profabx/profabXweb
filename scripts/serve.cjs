const {createSlicingHandler}=require('./slicing/service.cjs');
const {createLiveHandler}=require('./live-link/service.cjs');
// Built-in Node HTTP server: no npm installation required for the built site.
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const pages=['index','prototype','cmf','partners','about'];
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.wasm':'application/wasm','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};

function projectKey(projectRoot){let resolved=path.resolve(projectRoot);if(process.platform==='win32')resolved=resolved.toLowerCase();return crypto.createHash('sha256').update(resolved).digest('hex').slice(0,20);}
function validateBuild(projectRoot){
 const root=path.resolve(projectRoot,'dist');
 const required=[...pages.map(p=>p+'.html'),'assets/hero.png','cad/occt-import-js.js','cad/occt-import-js.wasm'];
 const check=relative=>{const file=path.resolve(root,relative);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile())throw new Error(`缺少预览文件：${relative}。请恢复完整项目，或运行 pnpm install 与 pnpm build。`);};
 for(const relative of required)check(relative);
 for(const page of pages){const html=fs.readFileSync(path.join(root,page+'.html'),'utf8');for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const resource=match[1];if(/^(?:[a-z]+:|\/\/)/i.test(resource))continue;check(resource.replace(/^\//,'').split('?')[0]);}}
 return root;
}
function createPreviewServer(projectRoot,{prefix='/'}={}){
 const root=validateBuild(projectRoot),key=projectKey(projectRoot),slicing=createSlicingHandler(projectRoot),live=createLiveHandler(projectRoot);
 prefix=('/'+String(prefix).replace(/^\/+|\/+$/g,'')+'/').replace(/\/+/g,'/');
 return http.createServer((req,res)=>{
  if(req.url?.startsWith('/api/live-link/')){void live(req,res,new URL(req.url,'http://localhost').pathname);return;}
  if(req.url?.startsWith('/api/slicing/')){const apiPath=new URL(req.url,'http://localhost').pathname;void slicing(req,res,apiPath).catch(error=>{if(!res.headersSent){res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({error:error.message}));}else res.destroy();});return;}

  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end('Method not allowed');return;}
  try{
   let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   if(pathname==='/__profabx_health'){
    const body=JSON.stringify({service:'ProFabXweb',projectKey:key,pid:process.pid,ready:true,slicingApi:1,pages:pages.map(p=>p+'.html')});
    res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Content-Length':Buffer.byteLength(body)});res.end(req.method==='HEAD'?undefined:body);return;
   }
   if(!pathname.startsWith(prefix)){res.writeHead(404);res.end('Not found');return;}
   pathname=pathname.slice(prefix.length)||'index.html';const file=path.resolve(root,pathname);
   if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
   fs.stat(file,(error,stat)=>{
    if(error||!stat.isFile()){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':stat.size,'Cache-Control':path.extname(file)==='.html'?'no-store':'no-cache','X-Content-Type-Options':'nosniff'});
    if(req.method==='HEAD'){res.end();return;}const stream=fs.createReadStream(file);stream.on('error',()=>res.destroy());stream.pipe(res);
   });
  }catch{res.writeHead(400);res.end('Bad request');}
 });
}
if(require.main===module){
 try{const port=Number(process.argv[2]||4173);if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Invalid port');const server=createPreviewServer(path.resolve(__dirname,'..'),{prefix:process.argv[3]||'/'});server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Port ${port} is occupied. Run the preview launcher to choose an available port.`:error.message);process.exitCode=1;});server.listen(port,'127.0.0.1',()=>console.log(`ProFabX: http://127.0.0.1:${port}/`));}catch(error){console.error(error.message);process.exitCode=1;}
}
module.exports={createPreviewServer,validateBuild,projectKey};
