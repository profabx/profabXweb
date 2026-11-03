const MAX_CODES=2000000;
export function encodeFacets(facets,triangleCount){
 if(!Number.isSafeInteger(triangleCount)||triangleCount<0||triangleCount>2000000)throw Error('Invalid triangle count');
 let count=0;
 const encode=(node,depth)=>{if(++count>MAX_CODES||depth>14)throw Error('Support painting exceeds limits');if(Number.isInteger(node)&&node>=0&&node<=2)return String(node*4);if(!node?.children||node.children.length!==4)throw Error('Invalid support facet');return node.children.map(n=>encode(n,depth+1)).join('')+'3';};
 for(const key of Object.keys(facets))if(!/^\d+$/.test(key)||Number(key)>=triangleCount)throw Error('Invalid support face index');
 return Array.from({length:triangleCount},(_,i)=>facets[i]===undefined?'':encode(facets[i],0));
}
export function decodeFacets(strings,triangleCount){
 if(!Array.isArray(strings)||strings.length!==triangleCount||triangleCount>2000000)throw Error('Support triangle count mismatch');
 const facets={};let count=0;
 strings.forEach((str,i)=>{if(typeof str!=='string'||str.length>MAX_CODES||!/^[0348]*$/.test(str))throw Error('Invalid support facet encoding');if(!str)return;let cursor=str.length-1;
  const read=depth=>{if(depth>14||cursor<0||++count>MAX_CODES)throw Error('Invalid support facet tree');const code=str[cursor--];if(code==='3'){const children=new Array(4);for(let j=3;j>=0;j--)children[j]=read(depth+1);return {children};}return Number(code)/4;};
  const node=read(0);if(cursor!==-1)throw Error('Trailing support facet data');if(node!==0)facets[i]=node;
 });return facets;
}
export function validatePaint(paint,triangleCount,expectedDigest){if(!paint)return;if(paint.version!==1||typeof paint.meshDigest!=='string'||paint.meshDigest.length>200||paint.meshDigest!==expectedDigest||!Number.isSafeInteger(paint.revision)||paint.revision<0)throw Error('Support geometry or revision mismatch');return decodeFacets(paint.triangles,triangleCount);}
