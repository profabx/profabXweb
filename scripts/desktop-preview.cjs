// Run manually from Explorer so the bridge and GUI inherit the normal desktop context.
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const {validateBuild,projectKey}=require('./serve.cjs');
const {readHealth,ensurePreview}=require('./start-preview.cjs');
function stopCommand(health,key,node,ownPid=process.pid){
 if(health?.service!=='ProFabXweb'||health.projectKey!==key||health.ready!==true||!Number.isSafeInteger(health.pid)||health.pid<1||health.pid===ownPid)throw Error('Preview identity mismatch; no process was stopped.');
 const quoted="'"+node.replaceAll("'","''")+"'";
 return `$previewProcess=Get-Process -Id ${health.pid} -ErrorAction Stop;if($previewProcess.Path -ne ${quoted}){throw 'Executable identity mismatch'};Stop-Process -InputObject $previewProcess -Force -ErrorAction Stop`;
}
async function main(){
 const root=path.resolve(__dirname,'..');validateBuild(root);
 const jobs=path.join(root,'.slicing/jobs');
 for(const name of fs.existsSync(jobs)?fs.readdirSync(jobs):[]){try{const file=path.join(jobs,name,'job.json'),job=JSON.parse(fs.readFileSync(file,'utf8'));if(job.status==='running'&&Date.now()-fs.statSync(file).mtimeMs<240000)throw Error('ACTIVE_JOB');}catch(e){if(e.message==='ACTIVE_JOB')throw Error('A slicing job is active. Wait for it to finish before restarting the preview.');}}
 const health=await readHealth(4173);
 if(health){const command=stopCommand(health,projectKey(root),process.execPath);execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',command],{windowsHide:true,stdio:'inherit'});
  for(let n=0;n<50;n++){if(!await readHealth(4173))break;await new Promise(r=>setTimeout(r,100));}
 }
 const result=await ensurePreview({projectRoot:root,port:4173,fallbackAttempts:0});
 fs.writeFileSync(path.join(root,'.preview/desktop-launch.json'),JSON.stringify({pid:result.pid,url:result.url,launchedAt:new Date().toISOString()}));
 console.log(`Desktop preview ready: ${result.url}prototype.html\nRefresh the existing browser tab, then connect ProFabX Live. Original Bambu processes were not targeted.`);
}
module.exports={stopCommand};
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
