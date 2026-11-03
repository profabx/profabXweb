import {Shape,Path,ExtrudeGeometry,Matrix4} from 'three';import {makePart} from './import.js';
function rect(w,h,r=4){const s=new Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s;}
export function demoParts(){const lid=rect(120,80);for(const x of [-51,51])for(const y of [-31,31]){const p=new Path();p.absarc(x,y,2,0,Math.PI*2,true);lid.holes.push(p);}const ring=rect(120,80);const hole=rect(112,72,3);ring.holes.push(new Path(hole.getPoints().reverse()));
 const make=(shape,depth)=>new ExtrudeGeometry(shape,{depth,bevelEnabled:false,curveSegments:12});
 const defs=[['01 · 上盖','lid.stl',make(lid,3),new Matrix4().makeTranslation(0,0,31)],['02 · 外壳','body.stl',make(ring,26),new Matrix4().makeTranslation(0,0,3)],['03 · 底板','base.stl',make(rect(120,80),3),new Matrix4()]];
 return defs.map(([name,path,g,m])=>({...makePart(name,`示例装配/${path}`,g,m),demo:true,unitConfirmed:true}));
}
