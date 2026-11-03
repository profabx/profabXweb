// Upstream's single-config Windows install omits its dependency DLL copy step.
const fs=require('node:fs'),path=require('node:path');
function stageRuntime({source,prefix,runtime}){
 fs.mkdirSync(runtime,{recursive:true});let count=0;
 function copy(file){const bytes=fs.readFileSync(file);if(bytes.toString('ascii',0,2)!=='MZ')throw Error('Invalid dependency DLL: '+file);const dest=path.join(runtime,path.basename(file));if(!fs.existsSync(dest)||!bytes.equals(fs.readFileSync(dest)))fs.writeFileSync(dest,bytes);count++;}
 function scan(dir){if(!fs.existsSync(dir))return;for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())scan(file);else if(entry.isFile()&&/\.dll$/i.test(entry.name))copy(file);}}
 scan(path.join(prefix,'bin'));
 for(const file of ['deps/GMP/gmp/lib/win64/libgmp-10.dll','deps/MPFR/mpfr/lib/win64/libmpfr-4.dll','deps/WebView2/lib/win64/WebView2Loader.dll'])copy(path.join(source,file));
 return count;
}
module.exports={stageRuntime};

