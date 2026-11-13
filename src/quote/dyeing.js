export const dyeingPending = part => part.config.postProcess === '染色' && dyeingPrice(part.config) === null;

export function dyeingPrice(config) {
 const value = config.dyeUnitYuan;
 if (value === '' || value == null || (typeof value !== 'number' && typeof value !== 'string')) return null;
 const price = Number(value);
 return String(value).trim() && Number.isFinite(price) && price >= 0 && price <= 1e8 ? price : null;
}

export function dyeingRequest(project) {
 const parts = project.parts.map(({id,name,measurement,config})=>{
  const {dyeUnitYuan,reviewNote,...pricing} = config;
  return {id,name,measurement,config:pricing};
 });
 return {type:'profabx-dye-request',version:1,projectId:project.id,parts,quoteSettings:project.quoteSettings};
}

export async function requestKey(request) {
 const data = new TextEncoder().encode(JSON.stringify(request));
 const hash = await crypto.subtle.digest('SHA-256',data);
 return Array.from(new Uint8Array(hash),byte=>byte.toString(16).padStart(2,'0')).join('');
}

export function applyDyeingPrices(parts, prices) {
 const required=parts.filter(part=>part.config.postProcess==='染色');
 if (!required.length || !prices || Object.keys(prices).length!==required.length || required.some(part=>!Object.hasOwn(prices,part.id)||dyeingPrice({dyeUnitYuan:prices[part.id]})===null)) {
  throw Error('请为每个染色零件填写有效的单件费用，免费请输入 0。');
 }
 return parts.map(part=>part.config.postProcess==='染色'
  ? {...part,config:{...part.config,dyeUnitYuan:Number(prices[part.id])}}
  : part);
}

export function invalidateDyeingPrice(previous, config) {
 if (['postProcess','process','materialId','quantity','color','customColor'].some(key=>config[key]!==previous[key])) delete config.dyeUnitYuan;
 return config;
}
