const copy={
 zh:{tag:'核心能力',title:'把设计、工艺与交付放在一起',intro:'懂产品，才能正确使用制造技术。以设计、工艺、制造与交付为底座，通过仿真分析和实物验证降低试错成本。',cards:[
 ['设计','从产品目标出发，在制造之前先把设计做对。',['需求拆解','结构优化','可制造性分析','轻量化设计']],
 ['工艺','工艺不是越先进越好，匹配产品目标才是关键。',['精度匹配','外观与强度','数量与周期','成本优化']],
 ['制造','以自主制造为核心，整合多种增材制造与后处理能力。',['光固化、熔融沉积自主加工','树脂、尼龙与金属增材制造','数控加工、硅胶复模与钣金','五十余种材料体系']],
 ['交付','从打样、试装、迭代到小批量与测试，用完整交付路径兑现品质承诺。',['打样、试装与迭代','小批量生产','全流程质量管控','出货文件齐全']]],extra:[
 ['仿真分析，预判风险','用数字仿真提前发现设计风险，覆盖结构、热流体、打印工艺及装配运动，让问题停留在屏幕而非产线。'],
 ['实物验证，确认结果','通过尺寸检测、装配功能、环境可靠性与材料性能测试，用实体样件验证结论。'],
 ['可制造性报告，决策有据','整理问题清单与修改建议，对比工艺、成本和周期，标注风险与预期收益，支持工程决策。']]},
 en:{tag:'Our capability',title:'Bringing design, process and delivery together',intro:'Start with the product. Connect design, process planning, manufacturing and delivery, then validate through simulation and physical testing to reduce trial and error.',cards:[
 ['Design','Get the design right before manufacturing, guided by the product requirements.',['Requirements analysis','Structural optimization','Design for manufacturing','Lightweight design']],
 ['Process','Choose the process that fits the product, rather than technology for its own sake.',['Precision requirements','Appearance and strength','Quantity and lead time','Cost optimization']],
 ['Manufacturing','Combine in-house production with a supplier network across additive manufacturing and finishing.',['In-house resin and filament printing','Resin, nylon and metal printing','Machining, silicone molding and sheet metal','Over fifty material options']],
 ['Delivery','Connect prototyping, trial assembly, iteration and small-batch production with testing.',['Prototyping and trial assembly','Small-batch production','Quality control throughout','Complete delivery documentation']]],extra:[
 ['Simulation to anticipate risks','Identify design risks through structural, thermal, fluid, printing and assembly simulations before they reach production.'],
 ['Physical testing to verify results','Validate samples through dimensional inspection, assembly and function tests, environmental reliability and material testing.'],
 ['Manufacturability reports for informed decisions','Compare issues, design changes, process options, costs and lead times, with risks and expected benefits clearly identified.']]},
 ja:{tag:'私たちの強み',title:'設計・工程・納品を一つにつなぐ',intro:'製品の目的を理解し、設計・工程計画・製造・納品を連携。シミュレーションと実物検証を組み合わせ、試行錯誤のコストを抑えます。',cards:[
 ['設計','製品の要件を起点に、製造に入る前に設計の完成度を高めます。',['要件の整理','構造の最適化','製造性の検討','軽量化設計']],
 ['工程','技術の先進性だけでなく、製品の目的に適した工程を選びます。',['精度への適合','外観と強度','数量と納期','コストの最適化']],
 ['製造','自社設備と供給ネットワークを組み合わせ、積層造形から仕上げまで対応します。',['樹脂・フィラメントの自社造形','樹脂・ナイロン・金属の積層造形','切削・シリコーン型・板金加工','五十種類以上の材料']],
 ['納品','試作・仮組み・改良から少量生産と試験まで、一貫した工程で品質を支えます。',['試作・仮組み・改良','少量生産','全工程の品質管理','納品書類の整備']]],extra:[
 ['シミュレーションでリスクを予測','構造・熱流体・造形工程・組立動作の解析により、生産前に設計上の課題を見つけます。'],
 ['実物検証で結果を確認','寸法検査、組立・機能試験、環境信頼性試験や材料試験で、試作品の結果を確かめます。'],
 ['製造性の報告で判断を支援','課題と修正案を整理し、工程・コスト・納期を比較。リスクと期待効果を示し、技術判断を支えます。']]}
};
export default function CapabilitySection({locale='zh'}){const c=copy[locale]||copy.zh;return <div className="wrap" lang={locale==='zh'?'zh-CN':locale}><div className="sec-head"><div className="tag">{c.tag}</div><h2>{c.title}</h2><p className="sub">{c.intro}</p></div><div className="cap-grid">{c.cards.map(([title,description,tags],i)=><div className="cap" key={i}><div className="no">{String(i+1).padStart(2,'0')}</div><h3>{title}</h3><p>{description}</p><div className="tags">{tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>)}</div><div className="cards">{c.extra.map(([title,description])=><div className="card" key={title}><h3>{title}</h3><p>{description}</p></div>)}</div></div>;}
