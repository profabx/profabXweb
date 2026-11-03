import {pricingRule} from './pricingStandards.js';
import {printerProfiles} from '../placement/printers.js';
export const processes=['FDM','LCD','SLA','CNC','激光切割','SLM','SLS','MJF','硅胶复模'];
// Preserve the existing process ownership configuration in one place.
export const inHouseProcesses=['FDM','LCD'];
export const isExternalProcess=process=>(process==='注塑'||processes.includes(process))&&!inHouseProcesses.includes(process);
export const isOutsourced=config=>isExternalProcess(config.process);
export function processLabel(process,t=value=>value){return `${t(process)}${isExternalProcess(process)?` · ${t('外包')}`:''}`;}
export const finalProcesses=['注塑','CNC',...processes.filter(p=>p!=='CNC')];
export const materials=[
 {id:'pla',name:'PLA',processes:['FDM'],density:1.24,priceG:0.45,note:'刚度较好，耐热性有限'},
 {id:'petg',name:'PETG',processes:['FDM'],density:1.27,priceG:0.6,note:'兼顾韧性，需关注表面拉丝'},
 {id:'abs',name:'ABS',processes:['FDM'],density:1.04,priceG:0.65,note:'关注收缩、翘曲与层间应力'},
 {id:'tpu',name:'TPU',processes:['FDM','MJF'],density:1.21,priceG:1.1,note:'柔性材料，尺寸与支撑需复核'},
 {id:'peba',name:'PEBA',processes:['FDM'],density:null,priceG:1.5,note:'弹性体；计价重量和风险需确认'},
 {id:'ppa_cf',name:'PPA-CF',processes:['FDM'],density:null,priceG:0,note:'按项目难度人工报价'},
 {id:'pps_cf',name:'PPS-CF',processes:['FDM'],density:null,priceG:0,note:'按项目难度人工报价'},
 {id:'pa_cf',name:'PA-CF',processes:['FDM'],density:null,priceG:2.5,note:'风险浮动；需录入计价重量'},
 {id:'pa_gf',name:'PA-GF',processes:['FDM'],density:null,priceG:2.5,note:'风险浮动；需录入计价重量'},
 {id:'pas10',name:'PAS10（标准树脂）',processes:['LCD'],density:1.3,priceG:.8,note:'截图密度1.3；手办玩具类型'},
 {id:'lcd_3280',name:'3280陶瓷树脂',processes:['LCD'],density:3,priceG:0,note:'截图密度3；按项目人工核价'},
 {id:'lcd_70a',name:'70A（测试中）',processes:['LCD'],density:1.3,priceG:0,note:'测试中软胶；按项目人工核价'},
 {id:'pau20',name:'PAU20（类PC黑色）',processes:['LCD'],density:1.3,priceG:1.8,note:'高韧性工程件，耐久2–4年'},
 {id:'pat10',name:'PAT10（高透）',processes:['LCD'],density:1.3,priceG:1.5,note:'透明处理可另加3元/g，耐久2–4年'},
 {id:'pau11',name:'PAU11（类ABS灰色）',processes:['LCD'],density:1.3,priceG:.9,note:'手办玩具类型'},
 {id:'cmyk',name:'CMYK树脂',processes:['LCD'],density:1.3,priceG:1.5,note:'可调色，耐久2–4年'},
 {id:'resin_black',name:'黑色树脂',processes:['SLA'],density:null,priceG:1,note:'增值后处理按零件评估；需录入计价重量'},
 {id:'resin_translucent',name:'半透明树脂',processes:['SLA'],density:null,priceG:1,note:'表面后处理多；需录入计价重量'},
 {id:'pa12gb',name:'PA12GB',processes:['SLS'],density:null,priceG:2.8,note:'批量区间需人工核定，录入计价重量'},
 {id:'pa12cf',name:'PA12CF',processes:['SLS'],density:null,priceG:5,note:'批量区间需人工核定，录入计价重量'},
 {id:'pa11',name:'PA11',processes:['SLS'],density:null,priceG:4,note:'韧性强；批量区间需人工核定'},
 {id:'peek',name:'PEEK',processes:['SLS'],density:null,priceG:0,note:'按项目难度人工报价'},
 {id:'pp',name:'PP',processes:['MJF'],density:null,priceG:0,note:'按项目报价，风险评估后浮动'},
 {id:'resin',name:'标准光敏树脂',processes:['LCD','SLA'],density:1.12,priceG:0.85,note:'关注脆性、支撑痕与后固化'},
 {id:'tough',name:'韧性光敏树脂',processes:['LCD','SLA'],density:1.15,priceG:1.4,note:'性能依赖树脂牌号及后固化'},
 {id:'al',name:'铝合金 6061',processes:['CNC'],density:2.7,priceG:0.3,note:'关注刀具可达性与装夹'},
 {id:'steel',name:'不锈钢',processes:['CNC','激光切割','SLM'],density:7.85,priceG:0.5,note:'需确认牌号与热处理'},
 {id:'nylon',name:'PA12 尼龙',processes:['SLS','MJF'],density:1.01,priceG:1.3,note:'关注吸湿、尺寸稳定及表面粗糙度'},
 {id:'pu',name:'PU 聚氨酯',processes:['硅胶复模'],density:1.1,priceG:1,note:'需确认母模、模具寿命与收缩率'}
];
export const devices=['P2S','P1S','X2D','H2D','H2S','Reflex Turbo'].map(id=>({id,name:id==='Reflex Turbo'?'黑格 Reflex Turbo':`拓竹 ${id}`,process:id==='Reflex Turbo'?'LCD':'FDM',verified:true,size:[...printerProfiles[id].modes[0].size],source:printerProfiles[id].source}));
export const postOptions=['无','去支撑 / 打磨','喷砂','喷漆','抛光','阳极氧化','染色','丝印'];
export function materialById(id){return materials.find(m=>m.id===id)||materials[0];}
export function suggestUnitPrice(m,process,materialId){const rule=pricingRule(process,materialId);if(!rule||typeof rule.sampleRate!=='number')return 0;const density=rule.density??materialById(materialId).density,mass=m?.volumeReliable&&Number.isFinite(density)&&density>0?m.volumeMm3/1000*density:0;return Math.round(Math.max(rule.pieceMin,mass*rule.sampleRate)*100)/100;}
