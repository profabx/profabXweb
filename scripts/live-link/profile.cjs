const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto');
// Caller supplies only the private --datadir, never the installed Bambu profile.
async function disableParameterTip(directory){
 await fs.mkdir(directory,{recursive:true});const file=path.join(directory,'ProFabXLive.conf');let config={};
 try{const stat=await fs.lstat(file);if(stat.isSymbolicLink())throw Error('Private profile cannot be a symlink');const text=await fs.readFile(file,'utf8');config=JSON.parse(text.slice(0,text.lastIndexOf('}')+1));}catch(e){if(e.code!=='ENOENT')throw e;}
 if(!config||typeof config!=='object'||Array.isArray(config))throw Error('Invalid private profile');
 if(config.app?.show_wrapping_detect_dialog===false)return;
 if(config.app&&typeof config.app!=='object')throw Error('Invalid private profile app settings');
 config.app={...config.app,show_wrapping_detect_dialog:false};
 const body=JSON.stringify(config,null,4),checksum=crypto.createHash('md5').update(body).digest('hex').toUpperCase(),tmp=file+'.'+crypto.randomUUID()+'.tmp';
 try{await fs.writeFile(tmp,body+'\n# MD5 checksum '+checksum+'\n',{mode:0o600});await fs.rename(tmp,file);}finally{await fs.unlink(tmp).catch(()=>{});}
}
module.exports={disableParameterTip};
