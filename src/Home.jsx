import Icon from './ui/Icon.jsx';

const values=[
 ['01','Scan','更早发现问题','从结构、装配与使用场景出发，在制造前识别需要调整的设计。'],
 ['02','Layers','更快完成验证','用实体样件验证外观、手感与功能，让每一轮迭代都有依据。'],
 ['03','Box','灵活推进小批量','按数量、性能与交付需求匹配工艺，连接打样、试装与小批量制造。']
];
const steps=[
 ['确认需求','明确场景、数量与性能目标'],
 ['设计优化','结构优化与可制造性分析'],
 ['选择工艺','匹配材料、精度与外观要求'],
 ['制造验证','打样、试装与迭代'],
 ['后处理交付','表面处理、装配与检验']
];
export default function Home({t}){
 return <main className="home">
  <section className="hero">
   <div className="hero-copy"><span className="home-eyebrow">DIGITAL MANUFACTURING SERVICE</span><h1>{t('从设计概念，')}<br/><em>{t('到实体产品。')}</em></h1><p>{t('为研发与工业企业、高校科研及创新项目，提供设计优化、工程模型开发与小批量制造服务。')}</p><div className="hero-actions"><a className="button primary" href="./prototype.html">{t('开始工程报价')}<Icon name="ArrowRight" size={21}/></a><a className="button secondary" href="#manufacturing">{t('了解制造服务')}</a></div></div>
   <div className="hero-art"><img src="./assets/hero.png" alt={t('数字制造零件与装配结构示意')} fetchPriority="high" width="1536" height="1024"/></div>
  </section>
  <div className="home-divider" aria-hidden="true"/>
  <section id="manufacturing" className="manufacturing"><h2>{t('让产品验证，')}<em>{t('更早向前一步。')}</em></h2><div className="capabilities">{values.map(([n,icon,title,copy])=><div className="capability" key={n}><span className="cap-number">{n}</span><Icon name={icon} size={45}/><div><h3>{t(title)}</h3><p>{t(copy)}</p></div></div>)}</div></section>
  <section className="home-workflow" aria-labelledby="home-workflow-title"><div className="home-section-heading"><div><span className="home-eyebrow">OUR PROCESS</span><h2 id="home-workflow-title">{t('把每一步，连接成一条交付路径。')}</h2></div><p>{t('围绕产品目标，让设计、工艺与制造共同推进。')}</p></div><ol>{steps.map(([title,copy],i)=><li key={title}><span className="home-step-number">{String(i+1).padStart(2,'0')}</span><h3>{t(title)}</h3><p>{t(copy)}</p></li>)}</ol></section>
  <section className="home-owned" aria-labelledby="home-owned-title"><div className="home-section-heading"><div><span className="home-eyebrow">IN-HOUSE MANUFACTURING</span><h2 id="home-owned-title">{t('自主加工，快速响应。')}</h2></div><p>{t('以 FDM 与 LCD 为核心，直接把控打样节奏与制造质量。')}</p></div><div className="home-owned-grid"><article><span className="home-owned-label">{t('自主加工')}</span><h3>FDM <span>{t('熔融沉积')}</span></h3><p>{t('从 PLA、PETG 到工程与复合材料，支持结构验证、工装夹具和功能原型。按用途选择材料与摆放方案，兼顾性能与制造成本。')}</p></article><article><span className="home-owned-label">{t('自主加工')}</span><h3>LCD <span>{t('光固化成型')}</span></h3><p>{t('以光敏树脂逐层成型，适用于精细外观件、展示模型与细节验证。结合清洗、固化及表面处理，为试装与外观评估做好准备。')}</p></article></div><div className="home-partner-processes"><div><h3>{t('工程统筹，多工艺协同。')}</h3><p>{t('按项目需要协同 SLA、MJF、SLS、金属打印、CNC 与硅胶复模，由 ProFabX 负责工艺判断、品质验收和交付协调。')}</p><small>{t('协同工艺及特殊后处理需经人工核价，具体方案与周期按项目确认。')}</small></div><a className="text-link" href="./cmf.html">{t('查看材料与表面工艺')}<Icon name="ArrowUpRight" size={16}/></a></div></section>
  <footer className="home-footer"><div id="partners" className="partners"><a className="footer-section-link" href="./partners.html">{t('合作伙伴')}</a><a href="https://sophigo.com" target="_blank" rel="noreferrer">Sophigo<Icon name="ArrowUpRight" size={14}/></a><a href="https://sophicar.com" target="_blank" rel="noreferrer">Sophicar<Icon name="ArrowUpRight" size={14}/></a></div><div id="about" className="about"><a className="footer-section-link" href="./about.html">{t('关于ProFabX')}</a><p>{t('用数字化与工程能力，连接创意与制造。')}</p></div><small>© {new Date().getFullYear()} ProFabX</small></footer>
 </main>;
}
