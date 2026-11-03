import * as k from './anatomy/iso-kit.mjs';
import fs from 'node:fs';
const P=k.fitProjection([...k.boxCorners({x:-185,y:-65,w:370,d:155,r:6},-18,0),[-180,-45,130],[180,-45,130]],980,510,{pad:44,azimuth:36,elevation:30});
let count=0;
const slab=(x,y,w,d,z,h,tone='mid',cls='')=>{count++;return k.solidSvg(k.slabOf({x,y,w,d,r:Math.min(2,w/5,d/5)},z,h,P,5,.5),{tone,className:cls});};
const outline=(x,y,w,d,z)=>k.lineSvg(k.planOutline({x,y,w,d,r:1},z,P),{tone:'faint'});
const bolts=(x,y,w,d,z)=>k.dotsSvg(k.corners({x,y,w,d,r:1},4).map(([x,y])=>k.iso([x,y,z],P)),{size:1.2,tone:'mid'});
let base='';for(const x of [-166,153])for(const y of [-52,68])base+=slab(x,y,15,12,-18,7,'lo');
base+=slab(-185,-65,370,155,-11,11,'mid')+outline(-178,-58,356,141,.1)+bolts(-183,-63,366,151,.2);
base+=slab(-165,77,330,7,0,.6,'lo');const ticks=k.topTicks(-161,161,5,5,78,.6,[2,4],P);base+=k.lineSvg(ticks.minor,{tone:'lo'})+k.lineSvg(ticks.major,{tone:'mid'});
let back='';for(const x of [-174,158]){back+=slab(x-5,-53,26,30,0,8)+bolts(x-4,-52,24,28,8.1)+slab(x,-48,16,18,8,112);back+=outline(x+2,-46,12,14,120);}
back+=slab(-174,-48,348,18,120,12)+slab(-159,-29,318,5,118,6,'hi');for(const x of [-158,149])back+=slab(x,-31,9,10,117,9);
const stations=[];
for(let i=0;i<3;i++){const x=[-108,0,108][i];let body=slab(x-40,-7,80,75,0,5)+outline(x-36,-3,72,67,5.1)+bolts(x-38,-5,76,71,5.2);for(const dx of [-33,27])for(const y of [0,57])body+=slab(x+dx,y,6,9,5,6,'hi');
for(const dx of [-22,16])for(const y of [10,42])body+=slab(x+dx,y,6,6,5,18,'mid');
body+=slab(x-24,9,48,20,23,3,'hi','business-accent')+slab(x-24,29,48,20,23,3,'hi','business-accent');
stations.push({x,body});}
let head=slab(-12,-39,24,15,116,14,'hi')+bolts(-11,-38,22,13,130)+slab(-9,-35,18,65,108,8,'hi')+slab(-12,20,24,18,87,21,'hi')+slab(-7,24,14,10,68,19,'hi','business-accent')+slab(-2,27,4,4,29,39,'hi')+slab(-1,28,2,2,26,3,'hi');
const art={width:980,height:510,base,back,stations,head,axis:k.axisVector(P,[1,0,0]),parts:count,weldPoint:k.iso([0,29,26],P)};
fs.writeFileSync(new URL('../src/business-art.json',import.meta.url),JSON.stringify(art));console.log('Anatomy SVG built: '+count+' solids');
