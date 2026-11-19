import {ProcessScene} from './ProcessAnimations.jsx';
import './business-figure.css';
const services=[
 {id:'fdm',title:'增材制造',copy:'以 FDM、LCD 自主加工为核心，按项目需求协同其他增材工艺，完成结构样件与功能零件制造。',label:'FDM 喷嘴逐层制造零件的循环示意'},
 {id:'cnc',title:'减材制造',copy:'根据材料、结构与装配要求，统筹 CNC 等加工路线，满足原型验证与小批量零件需求。',label:'CNC 刀具去除材料的循环加工示意'},
 {id:'casting',title:'等材制造',copy:'以原型制作硅胶软模，真空浇注树脂并固化，开模取件与修整浇口，适合小批量复制件制造。',label:'硅胶制模、真空浇注与开模取件的立体循环示意'}
];
export default function BusinessFigure(){return <div className="business-three manufacturing-services"><div className="sec-head"><div className="tag">Manufacturing Services</div><h2>围绕零件加工，连接制造与交付</h2><p className="sub">从数字制造、CNC 精密加工到硅胶复模，为每个零件匹配合适的制造路径。</p></div><div className="cards">{services.map(service=><article className="card" key={service.id}><h3>{service.title}</h3><div className="business-process-scene"><ProcessScene type={service.id} label={service.label}/></div><p>{service.copy}</p></article>)}</div></div>;}
