import Icon from './ui/Icon.jsx';
import CmfReference from './CmfReference.jsx';
import AboutIntroduction from './AboutIntroduction.jsx';
import './partner-backgrounds.css';

function PageFooter({t}){
 return <footer className="company-footer"><a className="brand" href="./index.html">ProFab<span>X</span></a><p>{t('用数字化与工程能力，连接创意与制造。')}</p><a className="text-link" href="./prototype.html">{t('开始工程报价')}<Icon name="ArrowUpRight"/></a><small>© {new Date().getFullYear()} ProFabX</small></footer>;
}

function CmfPage(){return <CmfReference/>;}

function PartnersPage({t}){
 const partners=[{id:'sophigo',name:'SophiGo',logo:'sophigo.png'},{id:'sophicar',name:'Sophicar',logo:'sophicar-icon.ico'}];
 return <main className="company-page partners-page"><section className="company-hero partners-page-hero"><div><h1>{t('合作伙伴')}</h1><p>{t('访问合作伙伴网站，了解更多产品与服务。')}</p></div><Icon name="ArrowUpRight" size={120}/></section><section className="partner-logo-grid" aria-label={t('合作伙伴')}>{partners.map((partner,i)=><a key={partner.id} id={partner.id} className={'partner-logo-card partner-background-'+partner.id} href={'https://'+partner.id+'.com/'} target="_blank" rel="noreferrer" aria-label={partner.name+' · '+t('访问官网')}><span className="company-index">0{i+1}</span><div className="partner-logo-frame"><img src={'./assets/partners/'+partner.logo} alt={partner.name+' Logo'} width="180" height="180"/><h2>{partner.name}</h2></div><div className="partner-card-footer"><span>{partner.id}.com</span><span className="partner-card-visit">{t('访问官网')}<Icon name="ArrowUpRight" size={20}/></span></div></a>)}</section><div className="company-bottom-link"><a className="text-link" href="./about.html">{t('关于ProFabX')}<Icon name="ArrowRight"/></a></div><PageFooter t={t}/></main>;
}

function AboutPage({t,locale}){return <AboutIntroduction t={t} locale={locale} footer={<PageFooter t={t}/>}/>;}

export default function CompanyPages({page,t,locale}){return page==='cmf'?<CmfPage t={t} locale={locale}/>:page==='partners'?<PartnersPage t={t}/>:<AboutPage t={t} locale={locale}/>;}

