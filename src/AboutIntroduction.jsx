import ProcessAnimations from './ProcessAnimations.jsx';
import CmfFeatureCards from './CmfFeatureCards.jsx';
import AboutPartners from './AboutPartners.jsx';
import {visibleAboutContent} from './about-section-visibility.js';
import CapabilitySection from './CapabilitySection.jsx';
import {useEffect,useRef,useState,useMemo} from 'react';
import {createPortal} from 'react-dom';
import content from './about-content.json';
import BusinessFigure from './BusinessFigure.jsx';
import './about-introduction.css';
import './about-content-layout.css';
// Original process specifications remain in about-content.json for future restoration.
const html=visibleAboutContent(content.html).replace(/<section id="intro-processes"[\s\S]*?<\/section>/,'<section id="intro-processes"><div data-process-animations></div></section>').replace(/<section id="intro-business"[\s\S]*?<\/section>/,'<section id="intro-business"><div data-business-figure></div></section>').replace(/<section id="intro-capability"[\s\S]*?<\/section>/,'<section id="intro-capability"><div data-capability-section></div></section>').replace(/<section id="intro-auto"[\s\S]*?<\/section>/,'<section id="intro-auto"><div data-about-partners></div></section>').replace(/<section id="intro-bob"[\s\S]*?<\/section>/,'').replace(/<section id="intro-cmf"[\s\S]*?<\/section>/,'<section id="intro-cmf"><div data-cmf-features></div></section>');
export default function AboutIntroduction({t,footer,locale}){
 const article=useRef(null),[slot,setSlot]=useState(null);
 useEffect(()=>{setSlot({processes:article.current?.querySelector('[data-process-animations]'),business:article.current?.querySelector('[data-business-figure]'),capability:article.current?.querySelector('[data-capability-section]'),partners:article.current?.querySelector('[data-about-partners]'),cmf:article.current?.querySelector('[data-cmf-features]')});},[]);
 const body=useMemo(()=>(<article ref={article} className="about-introduction-article" lang="zh-CN" aria-label="ProFabX 介绍" dangerouslySetInnerHTML={{__html:html}}/>),[]);
 return <main className="company-page about-page about-introduction">
  <header className="about-introduction-heading"><h1>{t('关于ProFabX')}</h1><div className="about-introduction-wordmark" aria-hidden="true">ProFab<span>X</span></div></header>
  {body}
  {slot?.processes&&createPortal(<ProcessAnimations/>,slot.processes)}
  {slot?.business&&createPortal(<BusinessFigure/>,slot.business)}
  {slot?.capability&&createPortal(<CapabilitySection locale={locale}/>,slot.capability)}
  {slot?.partners&&createPortal(<AboutPartners locale={locale}/>,slot.partners)}
  {slot?.cmf&&createPortal(<CmfFeatureCards locale={locale}/>,slot.cmf)}
  {footer}
 </main>;
}
