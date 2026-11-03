// Build-only compatibility for restricted Windows account lookup.
// tsx uses the username solely to namespace its temporary directory.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(process.argv[2],'node_modules/.pnpm');
if(fs.existsSync(root))for(const entry of fs.readdirSync(root)){
 if(!entry.startsWith('tsx@'))continue;
 const dist=path.join(root,entry,'node_modules/tsx/dist');
 if(!fs.existsSync(dist))continue;
 for(const name of fs.readdirSync(dist)){
  if(!/^temporary-directory-.*\.mjs$/.test(name))continue;
  const file=path.join(dist,name),before=fs.readFileSync(file,'utf8');
  const after=before.replace('o.userInfo().username','(()=>{try{return o.userInfo().username}catch{return process.env.USERNAME||"profabx-build"}})()');
  if(after!==before&&!before.includes('profabx-build'))fs.writeFileSync(file,after);
 }
}
