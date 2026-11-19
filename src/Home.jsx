import Icon from './ui/Icon.jsx';
import ProductShowcase from './ProductShowcase.jsx';
import './home-single-screen.css';

export default function Home({t}){
 return <main className="home single-screen">
  <section className="hero">
   <div className="hero-copy"><span className="home-eyebrow">DIGITAL MANUFACTURING SERVICE</span><h1>{t('从设计概念，')}<br/><em>{t('到实体产品。')}</em></h1><p>{t('为研发与工业企业、高校科研及创新项目，提供设计优化、工程模型开发与小批量制造服务。')}</p><div className="hero-actions"><a className="button primary" href="./prototype.html">{t('开始工程报价')}<Icon name="ArrowRight" size={21}/></a><a className="button secondary" href="./about.html#intro-processes">{t('了解制造服务')}</a></div></div>
   <ProductShowcase t={t}/>
  </section>
  <footer className="home-footer"><div id="partners" className="partners"><a className="footer-section-link" href="./partners.html">{t('合作伙伴')}</a><a href="https://sophigo.com" target="_blank" rel="noreferrer">Sophigo<Icon name="ArrowUpRight" size={14}/></a><a href="https://sophicar.com" target="_blank" rel="noreferrer">Sophicar<Icon name="ArrowUpRight" size={14}/></a></div><div id="about" className="about"><a className="footer-section-link" href="./about.html">{t('关于ProFabX')}</a><p>{t('用数字化与工程能力，连接创意与制造。')}</p></div><small>© {new Date().getFullYear()} ProFabX</small></footer>
 </main>;
}
