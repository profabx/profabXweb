const {spawnSync}=require('child_process'),path=require('path'),fs=require('fs');
const root=path.resolve(__dirname,'..');
const env={...process.env,PROFABX_ADMIN:'1'};
const pathKey=process.platform==='win32' ? Object.keys(env).find(key=>key.toUpperCase()==='PATH') || 'Path' : 'PATH';
// esbuild-wasm starts its worker by name, even when Vite is started with an absolute Node path.
env[pathKey]=[path.dirname(process.execPath),env[pathKey]].filter(Boolean).join(path.delimiter);
const result=spawnSync(process.execPath,[path.join(root,'node_modules/vite/bin/vite.js'),'build'],{cwd:root,env,stdio:'inherit'});
process.exitCode=result.status??1;
if(result.status===0){
 const dist=path.join(root,'dist-admin');
 fs.copyFileSync(path.join(__dirname,'admin-view.js'),path.join(dist,'admin-view.js'));
 for(const file of fs.readdirSync(dist).filter(name=>name.endsWith('.html'))){const target=path.join(dist,file),html=fs.readFileSync(target,'utf8');fs.writeFileSync(target,html.replace(/<\/body>/i,'<script src="./admin-view.js" defer></script></body>'));}
}
