const fs=require('node:fs/promises'),path=require('node:path');
module.exports=async projectRoot=>{
 const link=path.resolve(projectRoot,'../ProFabXLink');let directory='runtime';
 try{const selected=JSON.parse(await fs.readFile(path.join(link,'active-runtime.json'),'utf8'));if(!['runtime','runtime-support-v2','runtime-native-result-v3'].includes(selected.directory))throw Error('联动运行目录未通过校验');directory=selected.directory;}catch(e){if(e.code!=='ENOENT')throw e;}
 return path.join(link,directory);
};
