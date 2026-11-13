import {invalidateDyeingPrice} from './dyeing.js';
import {standardPricingChange} from './pricing.js';
import {materials,suggestUnitPrice,isExternalProcess} from './catalog.js';

export const sharedManufacturingFields=['process','deviceId','materialId','materialSupplier','toleranceRequirements','quantity','finalProcess','color','matte','customColor','postProcess','reviewNote'];

export function applySharedManufacturing(parts,selectedIds,change,sourceConfig){
 const ids=new Set(selectedIds),patch={...change};
 if(Object.hasOwn(patch,'materialId')&&!Object.hasOwn(patch,'process'))patch.process=sourceConfig.process;
 if(Object.hasOwn(patch,'deviceId')&&!Object.hasOwn(patch,'process')){patch.process=sourceConfig.process;patch.materialId=sourceConfig.materialId;}
 const recalculate=Object.hasOwn(patch,'process')||Object.hasOwn(patch,'materialId');
 return parts.map(part=>{
  if(!ids.has(part.id))return part;
  const config={...part.config,...patch};
  if(recalculate){
   Object.assign(config,standardPricingChange({}));
   if(!materials.some(m=>m.id===config.materialId&&m.processes.includes(config.process)))config.materialId=materials.find(m=>m.processes.includes(config.process))?.id||'pla';
   if(!Object.hasOwn(change,'deviceId'))config.deviceId='';
   config.deviceOverride=null;config.outsourced=isExternalProcess(config.process);
   config.unitBaseYuan=suggestUnitPrice(part.measurement,config.process,config.materialId);
  }
  return {...part,config:invalidateDyeingPrice(part.config,config)};
 });
}
