import {useState,useCallback} from 'react';
import {paintMesh} from './geometry.js';
import {createPaintState,applyStroke,undoPaint,redoPaint,clearPaint} from './model.js';
export default function useSupportPaint({project,setProject,selectedId,notify}){
 const [brush,setBrush]=useState({mode:'enforce',shape:'circle',radiusMm:3,angleDeg:30}),[error,setError]=useState('');
 const selected=project.parts.find(p=>p.id===selectedId),state=selected?.supportPaint;
 const onStroke=useCallback((id,stroke,isVisible)=>{setError('');setProject(p=>{try{const part=p.parts.find(x=>x.id===id);if(!part)return p;const mesh=paintMesh(part),base=part.supportPaint||createPaintState(mesh.meshDigest),next=applyStroke(base,stroke,{...mesh,isVisible});if(next===base)return p;return {...p,parts:p.parts.map(x=>x.id===id?{...x,supportPaint:next}:x)};}catch(e){queueMicrotask(()=>{setError(e.message);notify?.(e.message);});return p;}});},[setProject,notify]);
 const change=operation=>{if(!selectedId)return;setProject(p=>({...p,parts:p.parts.map(part=>part.id===selectedId&&part.supportPaint?{...part,supportPaint:operation(part.supportPaint)}:part)}));};
 return {brush,setBrush,onStroke,state,error,onUndo:()=>change(undoPaint),onRedo:()=>change(redoPaint),onClear:()=>change(clearPaint)};
}
