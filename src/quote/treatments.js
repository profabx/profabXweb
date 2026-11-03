// Conditional engineering routes, not solver output or heat-treatment recipes.
export const treatmentSources={
 polymer:{name:'Prusa · Annealing',url:'https://blog.prusa3d.com/ja/howtoimproveyour3dprintswithannealing_31088/'},
 resin:{name:'Formlabs · Post-curing',url:'https://formlabs.com/support/Introduction-to-Post-Curing-Prints/'},
 aluminum:{name:'Hydro · 6061 tempers',url:'https://www.hydro.com/us/us/aluminum/products/extruded-profiles/north-america-resources/extruded-aluminum-products/aluminum-extrusion-alloys/6061-aluminum/'},
 metal:{name:'EOS · Metal post-processing',url:'https://www.eos.info/metal-solutions/metal-periphery'}
};
export function treatmentText(value,locale='zh'){return Array.isArray(value)?value[locale==='en'?1:locale==='ja'?2:0]:value;}
const card=(id,title,reason,action,caution,checks,source)=>({id,title,reason,action,caution,checks,source,parameterStatus:'engineering-review'});
export function recommendTreatments(part){
 if(!part)return [];const {process,materialId}=part.config,result=[];
 const add=(...args)=>result.push(card(...args));
 if(process==='CNC'&&materialId==='al')add('aging',
 ['时效 / 去应力路线评估','Aging / stress-relief assessment','時効・応力除去の評価'],
 ['铝合金6061的交付状态影响后续热处理与尺寸稳定性。','The supplied temper of 6061 affects heat treatment and dimensional stability.','6061の納入調質が熱処理と寸法安定性に影響します。'],
 ['先核对材质证明及O/T4/T6/T651状态；大余量去除或精度要求高时，由供应商评估粗加工、稳定化处理与精加工的顺序。','Verify the material certificate and O/T4/T6/T651 temper; have the supplier review roughing, stabilization and finishing for precision parts.','材料証明とO/T4/T6/T651を確認し、精密部品は粗加工・安定化・仕上げの順序を業者と検討します。'],
 ['T6/T651材料不默认追加时效或退火；重复热处理可能改变强度、硬度和尺寸。自然放置不等同于已验证的去应力。','Do not routinely re-age or anneal T6/T651 stock. Reheating may alter strength, hardness and dimensions; waiting alone is not validated stress relief.','T6/T651への追加時効や焼鈍は既定としません。再加熱で強度・硬度・寸法が変わり、放置だけでは応力除去を保証できません。'],
 ['复测关键尺寸、平面度与硬度；保存材料状态及处理记录。','Recheck critical dimensions, flatness and hardness; retain temper and treatment records.','重要寸法・平面度・硬度を再測定し、調質と処理記録を保存。'],'aluminum');
 if(process==='SLM')add('metal-relief',
 ['去应力热处理与支撑去除','Stress relief and support removal','応力除去熱処理と支持材除去'],
 ['金属增材的热历史可能产生残余应力与脱板变形。','Metal AM thermal history can produce residual stress and distortion on release.','金属積層造形の熱履歴で残留応力や切離し変形が生じる場合があります。'],
 ['确认金属牌号、粉末批次和交付性能；与厂商确定去应力、脱板、去支撑及精加工顺序。','Confirm alloy, powder batch and delivery properties; agree the stress-relief, plate release, support removal and finishing sequence.','合金・粉末ロット・要求性能を確認し、応力除去・切離し・支持材除去・仕上げ順序を合意。'],
 ['不锈钢不是单一热处理牌号；固溶、时效和HIP并非通用必选项，须按牌号和用途评估。','Stainless steel is not a single heat-treatment grade. Solution treatment, aging and HIP are conditional, alloy-specific routes.','ステンレスは単一の熱処理材種ではありません。固溶化・時効・HIPは材種と用途によって判断します。'],
 ['检查尺寸、变形、表面及规定的力学性能；必要时安排无损检测。','Inspect dimensions, distortion, surfaces and specified mechanical properties; assess NDT needs.','寸法・変形・表面・要求機械特性を確認し、必要に応じ非破壊検査。'],'metal');
 if(['LCD','SLA'].includes(process))add('resin-cure',
 ['清洗、干燥与后固化','Washing, drying and post-curing','洗浄・乾燥・後硬化'],
 ['光敏树脂的最终性能受清洗与后固化影响，固化也可能引起收缩。','Final resin properties depend on washing and post-curing; curing may cause shrinkage.','樹脂の最終特性は洗浄と後硬化に依存し、硬化で収縮する場合があります。'],
 ['按实际树脂品牌和版本的TDS完成清洗、干燥、支撑处理与后固化；确认适用光源及夹持方式。','Use the exact resin brand/version TDS for washing, drying, supports and post-curing; verify the light source and fixturing.','実際の樹脂ブランド・版のTDSに従い、洗浄・乾燥・支持材処理・後硬化と光源・治具を確認。'],
 ['后固化不同于热塑性材料退火；不能直接套用其他品牌树脂的温度、时间或光照参数。','Post-curing differs from thermoplastic annealing. Do not transfer another resin brand’s temperature, time or light settings.','後硬化は熱可塑性材のアニールと異なります。他社樹脂の温度・時間・光条件は流用しません。'],
 ['冷却后检查关键尺寸、支撑痕、表面状态及固化记录。','After cooling, inspect critical dimensions, support marks, surface condition and curing records.','冷却後に重要寸法・支持痕・表面と硬化記録を確認。'],'resin');
 if(process==='FDM'&&['pla','petg'].includes(materialId))add('anneal',
 ['退火小样验证（条件适用）','Annealing trial — conditional','アニール試験（条件付き）'],
 ['若有耐热或尺寸稳定性要求，可评估材料专用退火路线。','For heat resistance or dimensional stability requirements, evaluate a material-specific annealing route.','耐熱性や寸法安定性の要求がある場合、材料専用アニールを検討します。'],
 ['先确认具体线材料号与厂家允许的退火方法；用同批次小样验证，记录处理前后XYZ变化，再确定是否用于零件。','Confirm filament grade and an approved supplier procedure; trial same-batch coupons and measure XYZ changes before treating parts.','フィラメント品番とメーカー許容手順を確認し、同ロット試験片でXYZ変化を測定して採否を判断。'],
 ['退火可能收缩或翘曲，不能保证增强；未验证时不对装配尺寸敏感件直接热处理。','Annealing may shrink or warp parts and does not guarantee strengthening; avoid unvalidated treatment of dimension-critical parts.','アニールで収縮・反りが生じ、強化を保証しません。寸法重要部品への未検証処理は避けます。'],
 ['验证尺寸、装配、耐热目标与批次一致性。','Validate dimensions, assembly, heat-resistance targets and batch consistency.','寸法・組立・耐熱目標・ロット一貫性を検証。'],'polymer');
 if(process==='FDM'&&materialId==='abs')add('abs-stability',
 ['受控冷却与尺寸稳定性复核','Controlled cooling and stability review','管理冷却と寸法安定性確認'],
 ['ABS需关注翘曲、收缩和层间应力。','ABS requires attention to warping, shrinkage and interlayer stress.','ABSは反り・収縮・層間応力の確認が必要です。'],
 ['先优化腔温、方向和均匀冷却；按检验计划复测尺寸。只有材料厂家提供适用方法时才评估去应力热处理。','First review chamber conditions, orientation and uniform cooling; remeasure per the inspection plan. Evaluate thermal relief only with an applicable supplier procedure.','庫内条件・向き・均一冷却を見直して再測定し、メーカー適用手順がある場合のみ熱的応力除去を検討。'],
 ['不默认推荐ABS退火；加热可能加剧变形，不能用放置时间替代尺寸验证。','ABS annealing is not a default recommendation; heating may increase distortion. Elapsed time does not replace dimensional checks.','ABSのアニールは標準推奨しません。加熱で変形が増す場合があり、経過時間だけで寸法を保証しません。'],
 ['检查平面度、孔距、装配与层间缺陷。','Check flatness, hole spacing, fit and interlayer defects.','平面度・穴間距離・組付け・層間欠陥を確認。'],'polymer');
 if(['SLS','MJF'].includes(process)&&materialId==='nylon')add('nylon',
 ['冷却、清粉与状态调节','Cooling, depowdering and conditioning','冷却・除粉・状態調節'],
 ['PA12的检验结果需关联冷却、清粉及环境状态。','PA12 inspection should record cooling, depowdering and environmental condition.','PA12の検査は冷却・除粉・環境状態と関連付けます。'],
 ['按粉末供应商工艺完成冷却及清粉；约定干态或调湿状态，染色和涂层前先进行样件验证。','Follow the powder supplier’s cooling and depowdering process; agree dry or conditioned inspection state and trial dye/coatings first.','粉末メーカー手順で冷却・除粉し、乾燥または調湿の検査状態を合意して染色・塗装を試験。'],
 ['未提供具体粉末牌号，不自动推荐退火、时效或固定调湿时间。','Without the powder grade, no automatic annealing, aging or fixed conditioning time is recommended.','粉末品番がない場合、アニール・時効・固定調湿時間は自動推奨しません。'],
 ['记录环境状态、尺寸、表面和装配结果。','Record environmental condition, dimensions, surface and fit.','環境状態・寸法・表面・組付けを記録。']);
 if(process==='硅胶复模')add('pu-cure',
 ['脱模与后熟化确认','Demolding and post-cure review','離型・後硬化の確認'],
 ['PU浇注材料的脱模和最终性能取决于实际配方。','PU demolding and final properties depend on the actual formulation.','PUの離型と最終性能は実配合に依存します。'],
 ['按树脂体系TDS确认混配、脱模、后熟化与稳定后检验的流程。','Use the resin system TDS to confirm mixing, demolding, post-cure and stabilized inspection.','樹脂系のTDSで混合・離型・後硬化・安定後検査を確認。'],
 ['不将热塑性退火或金属时效参数用于PU复模件。','Do not apply thermoplastic annealing or metal aging recipes to PU castings.','熱可塑性アニールや金属時効の条件をPUに流用しません。'],
 ['检查硬度、尺寸、气泡与外观。','Check hardness, dimensions, voids and appearance.','硬度・寸法・気泡・外観を確認。']);
 if(process==='激光切割')add('cut-edge',
 ['切边与热影响区复核','Cut edge and heat-affected zone review','切断端・熱影響部の確認'],
 ['切割边缘、毛刺和热影响需结合用途检查。','Cut edges, burrs and thermal effects require application-specific checks.','切断端・バリ・熱影響は用途に応じた確認が必要です。'],
 ['检查去毛刺和边缘质量；涉及耐蚀或承载时，由供应商按钢种评估表面处理及进一步检验。','Check deburring and edge quality; for corrosive or loaded service, have the supplier assess finishing and inspection for the steel grade.','バリ・端面品質を確認し、腐食・荷重用途では鋼種に応じた表面処理・検査を業者と検討。'],
 ['不根据“不锈钢”名称自动指定退火或时效制度。','Do not specify annealing or aging from the generic name “stainless steel.”','「ステンレス」の名称だけで焼鈍・時効条件を指定しません。'],
 ['检查边缘、尺寸与规定的表面性能。','Inspect edges, dimensions and specified surface properties.','端面・寸法・要求表面性能を確認。']);
 if(!result.length)add('supplier-review',
 ['材料与后处理路线确认','Material and finishing route review','材料・後処理ルートの確認'],
 ['现有材料名称不足以确定热处理制度。','The current material name does not define a heat-treatment procedure.','現在の材料名だけでは熱処理条件を決定できません。'],
 ['补充牌号、使用温度、载荷及尺寸要求；供应商确认去支撑、打磨或其他适用处理。','Add grade, service temperature, loads and tolerances; confirm support removal, sanding or other applicable finishing with the supplier.','品番・使用温度・荷重・公差を追加し、支持材除去・研磨などを業者と確認。'],
 ['未确认前不默认追加退火或时效。','Do not add annealing or aging by default without confirmation.','未確認のアニール・時効は標準追加しません。'],
 ['按图纸和供应商工艺验证尺寸及性能。','Verify dimensions and performance against drawings and supplier procedures.','図面と業者手順に基づき寸法・性能を検証。']);
 return result;
}
