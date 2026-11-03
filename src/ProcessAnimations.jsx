import {useEffect,useRef,useState} from 'react';
import {iso} from '../scripts/anatomy/iso-kit.mjs';
import './process-animations.css';
import details from './process-details.json';
const projection={origin:[280,226],scale:1.15,azimuth:45,elevation:28};
const pt=(x,y,z)=>iso([x,y,z],projection).join(',');
const poly=(points)=>points.map(p=>pt(...p)).join(' ');
function Box({x=-65,y=-55,z=0,w=130,d=110,h=8,blue=false}){return <g className={blue?'pa-blue':'pa-solid'}><polygon points={poly([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]])}/><polygon className="pa-side" points={poly([[x,y+d,z+h],[x+w,y+d,z+h],[x+w,y+d,z],[x,y+d,z]])}/><polygon className="pa-edge" points={poly([[x+w,y,z+h],[x+w,y+d,z+h],[x+w,y+d,z],[x+w,y,z]])}/></g>;}
function Ring({z=0,r=38,stroke='#0054ff',width=2,dash}){const points=Array.from({length:65},(_,i)=>pt(Math.cos(i*Math.PI/32)*r,Math.sin(i*Math.PI/32)*r,z)).join(' ');return <polyline points={points} fill="none" stroke={stroke} strokeWidth={width} strokeDasharray={dash}/>;}
const processes=[['resin','SLA / LCD 光固化','液态树脂逐层曝光固化，平台抬升；动画展示 LCD 面曝光原理'],['fdm','FDM 熔融沉积','喷嘴沿轮廓移动并逐层挤出材料'],['mjf','MJF 多射流熔融','铺粉后喷射融合剂，再经热能作用融合'],['sls','SLS 激光烧结','铺粉后，激光选择性扫描粉末截面'],['slm','SLM 金属打印','金属粉床铺粉，激光熔化截面并逐层成形'],['cnc','CNC 精密加工','旋转刀具沿工件移动，去除多余材料'],['casting','硅胶复模','向已制成的硅胶模具注入树脂，固化后开模'],['finish','后处理 · 喷涂','喷枪均匀移动，在零件表面沉积涂层']];
function Scene({type,label,replay}){
 const ref=useRef(null),[t,setT]=useState(0);
 useEffect(()=>{const el=ref.current,mq=matchMedia('(prefers-reduced-motion: reduce)');let frame=0,last=0,elapsed=0,previous=null,visible=false,done=false;
 setT(0);el.dataset.state='idle';
 const tick=now=>{if(!visible||document.hidden||done)return;if(previous!==null)elapsed+=Math.min(now-previous,100);previous=now;const progress=Math.min(elapsed/8000,1);if(now-last>33||progress===1){setT(progress);last=now;}if(progress===1){done=true;el.dataset.state='finished';el.dataset.playing='false';return;}frame=requestAnimationFrame(tick);};
 const sync=()=>{cancelAnimationFrame(frame);frame=0;previous=null;if(mq.matches&&replay===0){setT(1);done=true;el.dataset.state='finished';}if(visible&&!document.hidden&&!done){el.dataset.playing='true';el.dataset.state='playing';frame=requestAnimationFrame(tick);}else el.dataset.playing='false';};
 const obs=new IntersectionObserver(e=>{visible=e[0].isIntersecting;sync();},{threshold:.15});obs.observe(el);document.addEventListener('visibilitychange',sync);mq.addEventListener('change',sync);return()=>{cancelAnimationFrame(frame);obs.disconnect();document.removeEventListener('visibilitychange',sync);mq.removeEventListener('change',sync);};},[replay]);
 const phase=t===1?1:t*4%1,pass=(1-Math.cos(phase*Math.PI*2))/2,x=-49+98*pass,layers=3+Math.floor(t*23),height=layers*2;
 const powder=['sls','slm'].includes(type),laser=type==='sls'||type==='slm',angle=phase*Math.PI*2;
 return <svg ref={ref} viewBox="0 0 560 340" role="img" aria-label={label} data-process={type}>
 <defs><pattern id={'grid-'+type} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#0054ff" strokeOpacity=".045"/></pattern></defs>
 <rect width="560" height="340" fill={'url(#grid-'+type+')'}/>
 <path d="M20 38V18H40 M520 18H540V38 M20 302V322H40 M520 322H540V302" fill="none" stroke="#b5caff"/>
 <Box x={-96} y={-80} w={192} d={160} z={-12} h={12}/>
 {Array.from({length:9},(_,i)=><path key={i} d={`M${pt(-88+i*22,-72,.2)} L${pt(-88+i*22,72,.2)} M${pt(-88,-72+i*18,.2)} L${pt(88,-72+i*18,.2)}`} stroke="#dce6f7" strokeWidth=".6"/>)}
 {type==='fdm'&&<><path d="M122 50V260 M438 50V260 M122 72H438" fill="none" stroke="#c5d3e7" strokeWidth="5"/>{Array.from({length:layers},(_,i)=><Ring key={i} z={i*2} r={39+5*Math.sin(i/6)} stroke={i===layers-1?'#0054ff':'#7da6ff'} width={2}/>)}<g transform={`translate(${pt(Math.cos(angle)*(39+5*Math.sin((layers-1)/6)),Math.sin(angle)*(39+5*Math.sin((layers-1)/6)),height)})`}><path d="M-150 -52H150" stroke="#d5e0f2" strokeWidth="4"/><rect x="-16" y="-48" width="32" height="25" rx="4" fill="white" stroke="#8ba7cd"/><path d="M-7 -23H7L0 -4Z" fill="#0054ff"/><circle r="3" fill="#53bfff"/></g></>}
 {type==='resin'&&<><Box x={-75} y={-65} w={150} d={130} h={13}/><polygon points={poly([[-68,-58,15],[68,-58,15],[68,58,15],[-68,58,15]])} fill="#8dd5ff" fillOpacity=".28" stroke="#68a7fa"/><polygon points={poly([[-45,-42,-1],[45,-42,-1],[45,42,-1],[-45,42,-1]])} fill="#0054ff" opacity={.2+.5*Math.sin(phase*Math.PI)**2}/><g transform={`translate(0 ${-t*40})`}><Box x={-47} y={-43} w={94} d={86} z={60} h={6}/>{Array.from({length:18},(_,i)=><Ring key={i} z={20+i*2} r={26} stroke="#5288ed"/>)}<path d={`M${pt(0,0,66)}L${pt(0,0,112)}`} stroke="#a4b9d7" strokeWidth="7"/></g><path d={`M${pt(0,0,-12)}L${pt(0,0,20)}`} stroke="#5fb9ff" strokeWidth="35" opacity={.12+.15*Math.sin(phase*Math.PI)**2}/></>}
 {type==='mjf'&&<MjfScene t={t}/>}
 {powder&&<><Box x={-75} y={-65} w={150} d={130} h={8}/><polygon points={poly([[-70,-60,9],[70,-60,9],[70,60,9],[-70,60,9]])} fill="#eff4ff"/>{Array.from({length:90},(_,i)=><circle key={i} cx={iso([-67+(i*37%134),-57+(i*23%114),10],projection)[0]} cy={iso([-67+(i*37%134),-57+(i*23%114),10],projection)[1]} r=".8" fill="#9ab5dc"/>)}<Ring z={10} r={36} width={9} stroke={type==='slm'?'#4c6da2':'#4c82ea'}/>{phase<.3?<Box x={-65+phase/.3*130} y={-68} w={7} d={136} z={13} h={10}/>:laser?<><path d={`M${pt(-30,-12,122)}L${pt(Math.cos(angle)*36,Math.sin(angle)*36,11)}`} stroke="#0054ff" strokeWidth="1.8"/><circle cx={iso([Math.cos(angle)*36,Math.sin(angle)*36,11],projection)[0]} cy={iso([Math.cos(angle)*36,Math.sin(angle)*36,11],projection)[1]} r="6" fill="#72cfff" opacity=".7"/><Box x={-44} y={-25} w={28} d={25} z={122} h={10}/></>:<><Box x={x} y={-70} w={12} d={140} z={45} h={12}/><polygon points={poly([[x,-60,44],[x+12,-60,44],[x+12,60,11],[x,60,11]])} fill={phase<.65?'#0054ff':'#75c7ff'} opacity=".25"/>{phase>.65&&<path d={`M${pt(x,-60,24)}L${pt(x,60,24)}`} stroke="#64bfff" strokeWidth="8" opacity=".6"/>}</>}</>}
 {type==='cnc'&&<><Box x={-61} y={-48} w={122} d={96} h={30} blue/><path d={`M${pt(-45,-10,31)}L${pt(x,-10,31)}`} stroke="#fff" strokeWidth="14"/><g transform={`translate(${pt(x,-10,32)})`}><rect x="-13" y="-91" width="26" height="48" rx="4" fill="#e9f0fc" stroke="#88a5cf"/><path d="M-5 -43V0H5V-43" fill="#0054ff"/><path d={`M-5 -${6+phase*30}l10 -9 M-5 -${22+phase*20}l10 -9`} stroke="white" strokeWidth="2"/></g>{[0,1,2,3,4].map(i=><circle key={i} cx={iso([x+8+i*4,-10+Math.sin(phase*15+i)*20,30-i*3],projection)[0]} cy={iso([x+8+i*4,-10+Math.sin(phase*15+i)*20,30-i*3],projection)[1]} r="1.8" fill="#6a98ea"/>)}</>}
 {type==='casting'&&<><g transform={`translate(${-Math.max(0,t-.7)*100} 0)`}><Box x={-65} y={-48} w={65} d={96} h={40}/></g><g transform={`translate(${Math.max(0,t-.7)*100} 0)`}><Box x={0} y={-48} w={65} d={96} h={40}/></g>{Array.from({length:Math.max(1,Math.floor(Math.min(t/.65,1)*17))},(_,i)=><Ring key={i} z={i*2+5} r={23} width={2.5}/>)}{t<.7&&<><path d={`M${pt(0,0,103)}L${pt(0,0,39)}`} stroke="#0054ff" strokeWidth="4" strokeDasharray="5 5" strokeDashoffset={-phase*15}/><path d={`M${pt(-20,-15,115)}L${pt(20,-15,115)}L${pt(0,0,99)}Z`} fill="#dbe8ff" stroke="#83a7e2"/></>}</>}
 {type==='finish'&&<><Box x={-48} y={-39} w={96} d={78} h={46}/><polygon points={poly([[-48,39,46],[-48+96*t,39,46],[-48+96*t,39,0],[-48,39,0]])} fill="#0054ff"/><g transform={`translate(${pt(x,63,75)})`}><path d="M-8 -12H18V0H3L-8 -5Z" fill="#0054ff"/><path d="M3 0L8 18" stroke="#8ca4ca" strokeWidth="6"/>{Array.from({length:13},(_,i)=><path key={i} d={`M-8 -5l${-18-(i%3)*6} ${8+i*1.8}`} stroke="#74b6ff" opacity={.2+phase*.4} strokeDasharray="2 4"/>)}</g></>}
 </svg>;
}
// Blue is a schematic accent; the thermal source is infrared, not a blue laser.
function MjfScene({t}){
 const cycle=Math.min(t*3,2.9999),layer=Math.floor(cycle),p=cycle-layer;
 const stage=t===1?4:p<.24?0:p<.58?1:p<.88?2:3;
 const sweep=stage===0?-80+160*p/.24:stage===1?-80+160*(p-.24)/.34:stage===2?80-160*(p-.58)/.30:0;
 const bedZ=9-(stage===3?(p-.88)/.12*2:0);
 const rings=Array.from({length:12},(_,i)=>({x:-48+(i%4)*32,y:-36+Math.floor(i/4)*36}));
 return <g data-mjf-stage={stage}>
 <Box x={-79} y={-69} w={158} d={138} h={9}/>
 <polygon points={poly([[-74,-64,bedZ],[74,-64,bedZ],[74,64,bedZ],[-74,64,bedZ]])} fill="#edf2fa"/>
 {Array.from({length:110},(_,i)=><circle key={i} cx={iso([-70+(i*31%140),-60+(i*19%120),bedZ+.2],projection)[0]} cy={iso([-70+(i*31%140),-60+(i*19%120),bedZ+.2],projection)[1]} r=".7" fill="#aac0dd"/>)}
 {rings.map((r,i)=>{const applied=stage>1||stage===1&&r.x<sweep;return <g key={i} transform={`translate(${iso([r.x,r.y,bedZ+1],projection)[0]-280} ${iso([r.x,r.y,bedZ+1],projection)[1]-226})`}><Ring r={9} z={0} width={5} stroke={stage===4?'#0054ff':applied?'#4477cc':'#d4deed'}/>{applied&&<Ring r={13} z={0} width={1.5} stroke="#76ceff"/>}</g>})}
 <path d={`M${pt(-84,-74,18)}L${pt(84,-74,18)} M${pt(-84,74,18)}L${pt(84,74,18)}`} stroke="#b0c4df" strokeWidth="4"/>
 {stage===0&&<><Box x={sweep-4} y={-72} w={8} d={144} z={13} h={9}/><path d={`M${pt(sweep,-68,12)}L${pt(sweep,68,12)}`} stroke="#adc2df" strokeWidth="5"/></>}
 {(stage===1||stage===2)&&<><Box x={sweep-8} y={-72} w={16} d={144} z={42} h={17}/><Box x={sweep-3} y={-70} w={6} d={140} z={40} h={2} blue/>{stage===1?Array.from({length:18},(_,i)=><path key={i} d={`M${pt(sweep,-59+i*7,36)}L${pt(sweep,-59+i*7,16)}`} stroke={i%3?'#0054ff':'#76ceff'} strokeWidth="1.8" strokeDasharray="2 6" strokeDashoffset={-p*40}/>):<><polygon points={poly([[sweep-9,-66,39],[sweep+9,-66,39],[sweep+18,66,10],[sweep-18,66,10]])} fill="#91c9ff" opacity=".3"/><path d={`M${pt(sweep,-65,13)}L${pt(sweep,65,13)}`} stroke="#69b8ff" strokeWidth="9" opacity=".5"/></>}</>}
 {stage===4&&rings.map((r,i)=><g key={i} transform={`translate(${iso([r.x,r.y,0],projection)[0]-280} ${iso([r.x,r.y,0],projection)[1]-226})`}>{Array.from({length:layer+2},(_,j)=><Ring key={j} r={9} z={j*2+10} width={2.5}/>)}</g>)}
 </g>;
}
const links={resin:'/prototype/manufacture/add/lcddlp/',fdm:'/prototype/manufacture/add/fdm/',mjf:'/prototype/manufacture/add/mjf/',sls:'/prototype/manufacture/add/sls/',slm:'/prototype/manufacture/add/slm/',cnc:'/prototype/manufacture/substractive/cnc/',casting:'/prototype/manufacture/equal/siliconemold/',finish:'/prototype/postprocess/surface/coating/'};
const detailIndex={resin:0,fdm:1,mjf:2,sls:2,slm:3,cnc:4,casting:4,finish:5};
function ProcessCard({id,title,label}){const [replay,setReplay]=useState(0),d=details[detailIndex[id]];return <article className="process-animation-card" data-process-card={id}>
 <a className="process-card-link" href={'./cmf.html#read='+encodeURIComponent(links[id])} aria-label={title+'，查看 CMF 工艺资料'}><h3>{title}</h3><div className="process-card-scene"><Scene type={id} label={label} replay={replay}/></div><div className="process-card-details"><p>{d.summary}</p><ul>{d.items.map(item=><li key={item}>{item}</li>)}</ul><span className="process-card-more">查看工艺资料 ↗</span></div></a>
 <button type="button" className="process-replay" aria-label={'播放'+title+'动画'} onClick={e=>{e.stopPropagation();setReplay(v=>v+1);}}>▷ 播放</button>
 </article>;}
export default function ProcessAnimations(){return <div className="process-animation-section"><div className="sec-head"><h2>自主制造为核心，整合多工艺交付能力</h2></div><div className="process-animation-grid">{processes.map(([id,title,label])=><ProcessCard key={id} id={id} title={title} label={label}/>)}</div></div>;}
