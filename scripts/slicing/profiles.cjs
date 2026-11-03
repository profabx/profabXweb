const fs=require('node:fs'),path=require('node:path');
const {resolvePreset,softwareRoots,nativeProfileSummary,presetRevision}=require('./software-presets.cjs');
const devices=['P1S','P2S','X2D','H2D','H2S'];
function findEngines(){const find=(paths)=>paths.find(p=>p&&fs.existsSync(p));const bambu=find([process.env.PROFABX_BAMBU_EXE,'C:/Bambu Studio/bambu-studio.exe',path.join(process.env.ProgramFiles||'C:/Program Files','Bambu Studio/bambu-studio.exe')]);const creality=find([process.env.PROFABX_CREALITY_EXE,'D:/Creality Print 7.3/CrealityPrint.exe',path.join(process.env.ProgramFiles||'C:/Program Files','Creality Print 7.3/CrealityPrint.exe')]);return {bambu:{id:'bambu',name:'Bambu Studio',exe:bambu,profileRoot:bambu&&path.join(path.dirname(bambu),'resources/profiles/BBL'),cli:!!bambu},creality:{id:'creality',name:'Creality Print',exe:creality,profileRoot:creality&&path.join(path.dirname(creality),'resources/profiles/BBL'),cli:false,reason:'本机 Creality Print 7.3 命令行未返回切片结果；请导出3MF，在软件中切片后导回G-code。'}};}
function loadProfile(root,category,name,seen=[]){if(typeof name!=='string'||name.includes('/')||name.includes('\\')||seen.includes(name))throw Error('Invalid or cyclic profile');const value=JSON.parse(fs.readFileSync(path.join(root,category,name+'.json'),'utf8'));let out=value.inherits?loadProfile(root,category,value.inherits,[...seen,name]):{};for(const include of Array.isArray(value.include)?value.include:[])out={...out,...loadProfile(root,category,include,[...seen,name])};out={...out,...value};delete out.inherits;delete out.include;return out;}
const materialPrefixes={pla:['Bambu PLA Basic','Generic PLA'],abs:['Bambu ABS','Generic ABS'],petg:['Bambu PETG HF','Generic PETG'],tpu:['Bambu TPU 95A','Generic TPU']};
function buildProfiles(engine,deviceId,materialId,settings={}){
 if(!engine?.profileRoot||!devices.includes(deviceId))throw Error('请选择支持的FDM打印机型号。');
 const {roots,userRoots,active}=softwareRoots(engine),allRoots=[...userRoots,...roots],machineName='Bambu Lab '+deviceId+' 0.4 nozzle',machine=resolvePreset(roots,'machine',machineName),names=[...new Set(roots.flatMap(root=>{try{return fs.readdirSync(path.join(root,'filament')).filter(n=>n.endsWith('.json')).map(n=>n.slice(0,-5));}catch{return [];}}))];
 let processName=machine.default_print_profile||'0.20mm Standard @BBL X1C',source='device-preset';
 if(active.process){try{const candidate=resolvePreset(allRoots,'process',active.process);if(active.machine===machineName||candidate.compatible_printers?.includes(machineName)){processName=active.process;source='saved-active-preset';}}catch{}}
 const processProfile=resolvePreset(allRoots,'process',processName);let filamentName;
 for(const prefix of materialPrefixes[materialId]||[]){filamentName=(active.machine===machineName?active.filaments||[]:[]).find(n=>n.startsWith(prefix+' @'))||names.find(n=>n.startsWith(prefix+' @BBL '+deviceId+' 0.4 nozzle'))||names.find(n=>n===prefix+' @BBL '+deviceId)||names.find(n=>n===prefix+' @base');if(filamentName)break;}
 if(!filamentName)throw Error('本机未找到该材料的切片预设，请在软件中保存兼容的材料配置。');const filament=resolvePreset(allRoots,'filament',filamentName);
 // The user requested support generation. Every other process value stays native.
 processProfile.enable_support='1';delete processProfile.post_process;
 const profiles={machine,process:processProfile,filament,names:{machine:machine.name,process:processName,filament:filamentName,source}};
 profiles.resultSettings=nativeProfileSummary(profiles);profiles.revision=presetRevision(profiles);return profiles;
}
module.exports={findEngines,loadProfile,buildProfiles,devices};
