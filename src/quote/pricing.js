import {materialById,materials} from './catalog.js';
import {pricingRule,projectSchedules,tierPrice,pricingVersion} from './pricingStandards.js';
export function moneyFen(value,label='价格'){if(value===''||value===null||value===undefined||!Number.isFinite(Number(value))||Number(value)<0)throw Error(label+'必须为有限非负数');const result=Math.round(Number(value)*100);if(!Number.isSafeInteger(result))throw Error('金额超出精度范围');return result;}
export function weightDiagnostics(part,rule){
 const m=part.measurement,material=materials.find(item=>item.id===part.config.materialId),density=rule?.density??material?.density;
 const geometryOk=m?.volumeReliable===true,volumeOk=Number.isFinite(m?.volumeMm3)&&m.volumeMm3>0,densityOk=Number.isFinite(density)&&density>0;
 const diagnostics=[
 {id:'geometry',label:'模型体积检查',ok:geometryOk,detail:geometryOk?'网格检查通过':!m?'尚无模型测量数据':(m.issues||[]).join('；')||'模型未通过闭合 / 实体检查',remedy:'在建模或切片软件中检查并修复破面、非流形边及面方向，再重新导入；不要只封住设计开口。'},
 {id:'volume',label:'零件净体积',ok:geometryOk&&volumeOk,detail:geometryOk&&volumeOk?`${Number((m.volumeMm3/1000).toPrecision(7))} cm³（已按模型单位换算）`:'未取得可靠的正值净体积',remedy:'确认模型单位；空心零件应包含有效壁厚的内外表面，修复后重新导入。'},
 {id:'density',label:'材料密度',ok:densityOk,detail:densityOk?`${density} g/cm³`:`${material?.name||part.config.materialId||'未选择材料'}：缺少有效材料密度`,remedy:'选择有密度数据的正确材料；密度未收录时按切片或称重结果填写单件重量。'}
 ];
 return {diagnostics,density,automaticError:diagnostics.filter(d=>!d.ok).map(d=>d.detail).join('；')};
}
export function pricingWeight(part,rule){const input=part.config.pricingWeightG;if(input!==''&&input!==null&&input!==undefined){const weight=Number(input);if(!Number.isFinite(weight)||weight<=0)throw Error('计价重量必须大于0');return {weight,weightSource:'录入计价重量'};}const check=weightDiagnostics(part,rule),m=part.measurement;if(check.automaticError)throw Error('请录入可靠的单件计价重量；原因：'+check.automaticError);return {weight:m.volumeMm3/1000*check.density,weightSource:m.cavityCount>0?'空心净体积估重（已扣除内腔；未含支撑、填充；需复核）':'几何估重（未含支撑、填充；需复核）'};}

function pricePart(part,settings,projectQuantities){
 const c=part.config,rule=pricingRule(c.process,c.materialId),production=settings.pricingProduction||'sample',legacy=!Object.hasOwn(c,'pricingMode'),scheme=c.pricingScheme||'material';
 if(!['sample','batch'].includes(production))throw Error('请选择打样或批量报价');
 const quantity=Number(c.quantity);if(!Number.isSafeInteger(quantity)||quantity<1)throw Error('数量必须为正整数');
 const common={version:pricingVersion,rule,legacy,quantity,scheme,production,minimumTopupFen:0,autoPostFen:0,pieceMinFen:0,orderMinFen:0,weight:null};
 if(legacy)return {...common,unitFen:moneyFen(c.unitBaseYuan),label:'历史手工报价（未自动改价）',groupKey:'legacy:'+part.id};
 if(!['standard','manual'].includes(c.pricingMode))throw Error('未知报价模式');
 if(scheme!=='material'){
  if(!projectSchedules[scheme])throw Error('未知项目报价方案');const unit=c.pricingMode==='manual'?c.unitBaseYuan:tierPrice(scheme,projectQuantities[scheme]);
  return {...common,unitFen:moneyFen(unit),label:projectSchedules[scheme].name+(c.pricingMode==='manual'?' · 手工单价':' · 阶梯单价'),review:true,groupKey:'project:'+scheme,projectQuantity:projectQuantities[scheme]};
 }
 const pieceMin=production==='batch'?(rule?.batchPieceMin??rule?.pieceMin??0):(rule?.pieceMin??0),orderMin=production==='batch'?(rule?.batchOrderMin??rule?.orderMin??0):(rule?.orderMin??0);
 let unitFen,weightInfo={},rate=null,label='';
 if(c.pricingMode==='manual'){unitFen=moneyFen(c.unitBaseYuan);label='人工核价';}
 else{
  if(!rule)throw Error('暂无该工艺/材料标准，请录入人工报价');
  const standard=production==='batch'?rule.batchRate:rule.sampleRate;if(standard===null)throw Error('按难度/项目人工报价，请录入核价金额');
  if(Array.isArray(standard)){rate=Number(c.pricingRateYuan);if(c.pricingRateYuan===''||c.pricingRateYuan==null||!Number.isFinite(rate)||rate<standard[0]||rate>standard[1])throw Error(`请在区间 ${standard[0]}–${standard[1]} 元/g 内核定批量单价`);label='区间单价 · 人工核定';}else{rate=standard;label=production==='batch'?'批量标准':'打样标准';}
  weightInfo=pricingWeight(part,rule);unitFen=moneyFen(weightInfo.weight*rate);
 }

 let autoPostFen=0;if(c.pricingTransparent){if(!rule?.transparentRate)throw Error('当前材料未提供透明处理单价，请取消或人工核价');if(!weightInfo.weight)weightInfo=pricingWeight(part,rule);autoPostFen=moneyFen(weightInfo.weight*rule.transparentRate);}
 return {...common,...weightInfo,unitFen,rate,label,autoPostFen,autoPostRawYuan:c.pricingTransparent?weightInfo.weight*rule.transparentRate:0,pieceMinFen:moneyFen(pieceMin),orderMinFen:moneyFen(orderMin),groupKey:c.process+':'+c.materialId,review:c.pricingMode==='manual'||!!rule?.risk||Array.isArray(production==='batch'?rule?.batchRate:rule?.sampleRate)||rule?.sampleRate===null||!rule};
}
export function priceParts(parts,settings={}){const totals={};for(const p of parts){const scheme=p.config.pricingScheme||'material';if(scheme!=='material')totals[scheme]=(totals[scheme]||0)+Number(p.config.quantity);}return parts.map(part=>{try{return pricePart(part,settings,totals);}catch(e){return {error:e.message,rule:pricingRule(part.config.process,part.config.materialId),label:'待人工核价',review:true};}});}

export function standardPricingChange(change={}){return {...change,pricingMode:'standard',pricingScheme:'material',pricingWeightG:'',pricingRateYuan:'',pricingTransparent:false};}

export function billingWeightState(part,rule){const diagnosis=weightDiagnostics(part,rule),raw=part.config.pricingWeightG,manual=raw!==''&&raw!==null&&raw!==undefined;let automatic=null,automaticError='';try{automatic=pricingWeight({...part,config:{...part.config,pricingWeightG:''}},rule);}catch(error){automaticError=error.message;}try{const info=manual?pricingWeight(part,rule):automatic;if(!info)throw Error(automaticError);const value=manual?raw:info.weight>=.001?Number(info.weight.toFixed(3)):Number(info.weight.toPrecision(3));return {...info,...diagnosis,manual,available:true,value,source:info.weightSource,autoAvailable:!!automatic,automaticWeight:automatic?.weight};}catch(error){return {...diagnosis,manual,available:false,value:manual&&Number.isFinite(Number(raw))?raw:'',source:error.message,error:error.message,autoAvailable:!!automatic,automaticWeight:automatic?.weight};}}
