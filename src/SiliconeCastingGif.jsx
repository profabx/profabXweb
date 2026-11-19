import {useEffect,useRef,useState} from 'react';
const folder='./assets/processes/';
export default function SiliconeCastingGif({replay=0}){
 const image=useRef(null),[playing,setPlaying]=useState(false);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');let visible=false;const sync=()=>setPlaying(visible&&!document.hidden&&!mq.matches);const observer=new IntersectionObserver(entries=>{visible=entries[entries.length-1].isIntersecting;sync();},{threshold:.15});observer.observe(image.current);document.addEventListener('visibilitychange',sync);mq.addEventListener('change',sync);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);mq.removeEventListener('change',sync);};},[]);
 return <img ref={image} className="casting-gif" width="840" height="510" src={folder+(playing?'silicone-vacuum-casting-3d.gif?v=3&replay='+replay:'silicone-vacuum-casting-3d-poster.png')} alt="硅胶复模立体动画：原型制模、取出原型、合模真空浇注树脂、固化、开模取件与去浇口" data-process="casting" data-format="gif" data-playing={playing?'true':'false'}/>;
}
