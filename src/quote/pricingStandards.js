const rule=(process,materialId,name,sampleRate,batchRate,pieceMin,orderMin,lead,extra={})=>({process,materialId,name,sampleRate,batchRate,pieceMin,orderMin,lead,...extra});
export const pricingVersion='2026-10-26-screenshots-v1';
const plaRule=rule('FDM','pla','PLA',.4,.25,8,50,'12小时');
export const pricingRules=[
 plaRule,
 {...plaRule,materialId:'petg',name:'PETG'},
 rule('FDM','abs','ABS',.5,.3,8,50,'12小时'),
 rule('FDM','tpu','TPU',1.5,1.2,20,80,'12小时',{risk:true,note:'依项目风险评估上下浮动'}),
 rule('FDM','peba','PEBA',1.5,1.2,20,80,'12小时',{risk:true,note:'依项目风险评估上下浮动；未提供密度，需录入计价重量'}),
 rule('FDM','ppa_cf','PPA-CF',null,null,0,0,'72小时',{note:'按项目报价，需人工评估难度'}),
 rule('FDM','pps_cf','PPS-CF',null,null,0,0,'72小时',{note:'按项目报价，需人工评估难度'}),
 rule('FDM','pa_cf','PA-CF',2.5,2,20,100,'72小时',{risk:true,note:'依项目风险评估上下浮动'}),
 rule('FDM','pa_gf','PA-GF',2.5,2,20,100,'72小时',{risk:true,note:'依项目风险评估上下浮动'}),
 rule('SLA','resin','白色树脂',.7,[.3,.6],8,50,'24小时；加急12小时',{batchPieceMin:2,batchOrderMin:0,finishing:'打磨、去毛刺、简单喷砂',note:'批量不含增值后处理；丝印、喷漆按零件评估。推荐壁厚：外观1.0、强度2.5，按项目复核'}),
 rule('SLA','resin_black','黑色树脂',1,.8,10,100,'48–72小时；加急36小时',{batchPieceMin:4,batchOrderMin:0,finishing:'打磨去毛刺、喷表板蜡',note:'批量不含增值后处理；丝印、喷漆另评。推荐壁厚：外观1.0、强度2.5'}),
 rule('SLA','resin_translucent','半透明树脂',1,.7,10,100,'48–72小时；加急36小时',{batchPieceMin:4,batchOrderMin:0,finishing:'打磨去毛刺、简单喷砂',note:'细节喷砂、喷漆透明、透明色等按零件评估。推荐壁厚：外观1.0、强度2.5'}),
 rule('LCD','lcd_3280','3280陶瓷树脂',null,null,0,400,'96小时；加急96小时',{density:3,finishing:'去支撑、二次固化',note:'耐温280度；支撑点痕迹残留；按项目人工报价'}),
 rule('LCD','lcd_70a','70A（测试中）',null,null,0,0,'72小时；加急48小时',{density:1.3,finishing:'去支撑、固化',note:'软胶，部分代替硅胶复模；原表注明“会有0.5mm”，含义需项目核实'}),
 rule('LCD','pau20','PAU20（类PC黑色）',1.8,1.8,10,60,'24小时；加急12小时',{density:1.3,finishing:'去支撑、固化、打磨、喷砂、表板蜡',note:'高韧性工程件，耐久2–4年'}),
 rule('LCD','pat10','PAT10（高透）',1.5,1.5,0,80,'24小时；加急12小时',{density:1.3,finishing:'去支撑、固化、打磨、喷砂',transparentRate:3,note:'可选透明处理另加3元/g；耐久2–4年'}),
 rule('LCD','pau11','PAU11（类ABS灰色）',.9,.9,0,60,'24小时；加急12小时',{density:1.3,finishing:'去支撑、固化、打磨、喷砂',note:'手办玩具类型；喷漆另评'}),
 rule('LCD','cmyk','CMYK树脂',1.5,1.5,0,80,'24小时；加急12小时',{density:1.3,finishing:'精细打磨喷砂、表板蜡',note:'可调色，耐久2–4年'}),
 rule('LCD','pas10','PAS10（标准树脂）',.8,.8,0,60,'24小时；加急12小时',{density:1.3,finishing:'去支撑、固化、打磨、喷砂',note:'手办玩具类型；喷漆另评'}),
 rule('SLS','nylon','PA12',1.9,[1.3,1.9],5,100,'48小时'),
 rule('SLS','pa12gb','PA12GB',2.8,[1.6,2.2],15,100,'48小时'),
 rule('SLS','pa12cf','PA12CF',5,[3.5,4],20,100,'3天'),
 rule('SLS','pa11','PA11',4,[3,3.5],30,100,'3天'),
 rule('SLS','peek','PEEK',null,null,50,500,'视情况定',{note:'按项目人工报价'}),
 rule('MJF','nylon','PA12',2.5,[2,2.4],15,100,'48小时'),
 rule('MJF','tpu','TPU',null,null,20,300,'72小时',{note:'按项目人工报价'}),
 rule('MJF','pp','PP',null,null,20,300,'72小时',{risk:true,note:'按项目报价，依项目风险评估上下浮动'})
];
export function pricingRule(process,materialId){return pricingRules.find(r=>r.process===process&&r.materialId===materialId);}
export const projectSchedules={
 handle:{name:'手柄项目 · 20260302',weight:165,tiers:[[20,320],[100,308],[200,304],[300,300],[400,290],[Infinity,280]],qc:['与样件对比无色差；颜色均匀无色斑','无残留粉、凹坑、变形和划痕；表面平整','金属件装配顺畅，装入无明显阻力且不掉落'],note:'专用项目价；按明确单价执行，不叠加近似百分比。400件归301–400档，401件起末档。20251022旧版不参与计算。'},
 truffle:{name:'Truffle 专用项目',weight:450,tiers:[[20,450],[100,430],[200,420],[300,415],[400,405],[Infinity,400]],qc:['结构完整，无破损、崩角、缺料','喷砂后无肉眼可见毛刺、披锋；层纹细腻','上下壳间隙均匀，无干涉或难装配','颜色均匀无色差色斑；表面洁净无指纹、汗渍、油污'],note:'专用项目价；按列明单价执行，不叠加表内近似百分比。参考克重不用于缩放其他零件价格。'}
};
export function tierPrice(scheme,quantity){const schedule=projectSchedules[scheme];if(!schedule)throw Error('未知项目报价方案');if(!Number.isSafeInteger(quantity)||quantity<1)throw Error('数量必须为正整数');return schedule.tiers.find(([max])=>quantity<=max)[1];}

// Historical schedules remain readable so saved orders never change price silently.
export const selectablePricingSchemes=[{id:'material',name:'工艺 / 材料标准'}];
export function exportProjectSchedules(parts){const used=new Set(parts.map(p=>p.config?.pricingScheme));return Object.entries(projectSchedules).filter(([id])=>used.has(id)).map(([,schedule])=>schedule);}
