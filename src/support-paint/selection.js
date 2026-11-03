import {Vector3,Triangle} from 'three';
export const midpoint=(a,b)=>a.map((v,i)=>(v+b[i])/2);
// TriangleSelector::perform_split, three split sides, special_side=0.
export function splitTriangle([a,b,c]){const ab=midpoint(a,b),bc=midpoint(b,c),ca=midpoint(c,a);return [[a,ab,ca],[ab,b,bc],[bc,c,ca],[ab,bc,ca]];}
export function sourceTriangle(mesh,index){return [0,1,2].map(j=>{const i=mesh.triangles[index*3+j]*3;return mesh.vertices.slice(i,i+3);});}
export function triangleDistance(vertices,point){const t=new Triangle(...vertices.map(v=>new Vector3(...v)));return t.closestPointToPoint(new Vector3(...point),new Vector3()).distanceTo(new Vector3(...point));}
export function facing(vertices,direction){const [a,b,c]=vertices.map(v=>new Vector3(...v));return new Vector3().subVectors(b,a).cross(new Vector3().subVectors(c,a)).dot(new Vector3(...direction))<0;}
export function leafTriangles(node,vertices,result=[]){if(typeof node==='number'){if(node)result.push({state:node,vertices});}else if(node?.children)node.children.forEach((child,i)=>leafTriangles(child,splitTriangle(vertices)[i],result));return result;}
