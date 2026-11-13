import {SaxesParser} from 'saxes';

const limit = 2_000_000;

function triples(Type) {
 let data = new Type(12288), length = 0;
 return {
  push(a,b,c) {
   if(length>=limit*3)throw Error('网格超过 200 万个顶点或三角面');
   if(length===data.length){
    const next=new Type(Math.min(data.length*2,limit*3));
    next.set(data);data=next;
   }
   data[length++]=a;data[length++]=b;data[length++]=c;
  },
  finish:()=>data.subarray(0,length),
 };
}

/** Stream a production component without building an XML DOM for millions of tags. */
export function streamLargeModel(entry) {
 return new Promise((resolve,reject)=>{
  const parser=new SaxesParser({xmlns:true});
  const decoder=new TextDecoder('utf-8',{fatal:true});
  const stream=entry.internalStream('uint8array');
  const objects=new Map(),stack=[];
  let unit, current, count=0, failed=false;
  const fail=error=>{failed=true;stream.pause();reject(Error(`3MF 内部模型 ${entry.name}：${error.message}`));};
  parser.on('doctype',()=>{throw Error('不支持外部实体');});
  parser.on('opentag',tag=>{
   const {local,attributes}=tag,parent=stack.at(-1);
   const attr=name=>attributes[name]?.value;
   stack.push(local);
   if(stack.length===1){
    if(local!=='model')throw Error('模型 XML 无效');
    unit=attr('unit')||'millimeter';
   }else if(local==='object'&&parent==='resources'){
    const id=attr('id');
    if(!id||objects.has(id)||objects.size>=200)throw Error('对象 ID 无效或对象过多');
    current={id,name:attr('name'),vertices:triples(Float64Array),triangles:triples(Uint32Array),components:[]};
    objects.set(id,current);
   }else if(current&&local==='vertex'&&parent==='vertices'){
    const [x,y,z]=['x','y','z'].map(key=>attr(key)?.trim()?Number(attr(key)):NaN);
    if(![x,y,z].every(Number.isFinite))throw Error('顶点无效');
    current.vertices.push(x,y,z);
   }else if(current&&local==='triangle'&&parent==='triangles'){
    const values=['v1','v2','v3'].map(key=>attr(key)?.trim()?Number(attr(key)):NaN);
    if(!values.every(n=>Number.isInteger(n)&&n>=0&&n<limit))throw Error('三角面索引无效');
    current.triangles.push(...values);
   }else if(current&&local==='component'&&parent==='components'){
    const ref=Object.values(attributes).find(a=>a.local==='path'&&(a.uri===''||a.uri==='http://schemas.microsoft.com/3dmanufacturing/production/2015/06'));
    current.components.push({ref:ref?.value,id:attr('objectid'),transform:attr('transform')});
   }
  });
  parser.on('closetag',tag=>{stack.pop();if(tag.local==='object'&&stack.at(-1)==='resources')current=null;});
  stream.on('data',chunk=>{
   if(failed)return;
   try{
    count+=chunk.length;
    if(count>160*1024*1024)throw Error('内部模型解压后超过 160 MiB');
    parser.write(decoder.decode(chunk,{stream:true}));
   }catch(error){fail(error);}
  }).on('error',fail).on('end',()=>{
   if(failed)return;
   try{
    parser.write(decoder.decode()).close();
    for(const object of objects.values()){
     object.vertices=object.vertices.finish();
     object.triangles=object.triangles.finish();
     if(object.triangles.some(index=>index>=object.vertices.length/3))throw Error('三角面索引无效');
    }
    resolve({unit,objects});
   }catch(error){fail(error);}
  }).resume();
 });
}
