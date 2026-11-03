import test from 'node:test';import assert from 'node:assert/strict';
import {BoxGeometry,Matrix4,Vector3} from 'three';
import {canPlaceIndividually,placementBounds,arrangeOnPlate,checkPlacement,rotationForFace,normalizePose,constrainEditPose} from '../src/placement/geometry.js';
import {createProject,confirmationSignature,withValidConfirmation} from '../src/project/schema.js';
const part=(id,w=20,d=10,h=5)=>({id,name:id,sourcePath:`folder/${id}.stl`,geometry:new BoxGeometry(w,d,h),originalTransform:new Matrix4().makeTranslation(150,20,70),unit:'mm',unitConfirmed:true,config:{process:'FDM',materialId:'pla'}});
test('placement is available only for one parsed object per source file',()=>{
 const a=part('a'),b=part('b');assert.equal(canPlaceIndividually([a,b]),true);assert.equal(canPlaceIndividually([a,{...b,sourcePath:a.sourcePath}]),false);assert.equal(canPlaceIndividually([{...a,sourceObjectCount:2}]),false);assert.equal(canPlaceIndividually([]),false);
});
test('placements normalize original coordinates, preserve source and rotate true bounds',()=>{
 const p=part('a'),matrix=p.originalTransform.toArray(),before=Array.from(p.geometry.attributes.position.array);
 const box=placementBounds(p,{position:[30,40,0],rotation:[90,0,0]});const size=box.getSize(new Vector3());assert.ok(Math.abs(box.min.z)<1e-6);assert.ok(Math.abs(size.y-5)<1e-5);assert.ok(Math.abs(size.z-10)<1e-5);assert.deepEqual(p.originalTransform.toArray(),matrix);assert.deepEqual(Array.from(p.geometry.attributes.position.array),before);
});
test('auto arrange respects current rotations, border and gap without silent scaling',()=>{
 const parts=[part('a'),part('b')],plate={size:[60,40,30],margin:3,gap:5},result=arrangeOnPlate(parts,{},plate);
 assert.deepEqual(result.unplaced,[]);const findings=checkPlacement(parts,result.poses,plate);assert.equal(findings.some(f=>['outside','overlap','clearance'].includes(f.type)),false);
 const impossible=arrangeOnPlate([part('big',80,20,5)],{},plate);assert.deepEqual(impossible.unplaced,['big']);
});
test('reports platform overflow, floating, collisions and unconfirmed units',()=>{
 const parts=[part('a'),part('b')],plate={size:[40,40,20],margin:2,gap:3};const findings=checkPlacement(parts,{a:{position:[0,0,0]},b:{position:[0,0,5]}},plate);
 assert.ok(findings.some(f=>f.type==='outside'));assert.ok(findings.some(f=>f.type==='floating'));assert.ok(findings.some(f=>f.type==='overlap'));
 assert.ok(checkPlacement([{...parts[0],unitConfirmed:false}],{},plate).some(f=>f.type==='units'));
});
test('face alignment points the chosen normal down and invalid pose values are sanitized',()=>{
 const rotation=rotationForFace([0,0,0],[1,0,0]);const p=part('a');const b=placementBounds(p,{rotation,position:[20,20,0]});assert.ok(Math.abs(b.min.z)<1e-5);
 assert.deepEqual(normalizePose({position:[NaN,3,Infinity],rotation:[0,0,NaN]}),{position:[0,3,0],rotation:[0,0,0]});
});
test('changing placement invalidates a quote confirmation but recording analysis does not',()=>{
 const project=createProject();project.confirmation={signature:confirmationSignature(project)};project.stage='确定';
 assert.equal(withValidConfirmation({...project,riskAnalysis:{sample:{time:'now'}}}).stage,'确定');
 const changed=withValidConfirmation({...project,placement:{plate:{size:[200,200,200]},poses:{}}});assert.equal(changed.confirmation,null);assert.equal(changed.stage,'报价');
});
test('manual position edits stop at the platform while source poses remain unrestricted',()=>{const p=part('floor'),source={position:[30,40,-8],rotation:[25,50,10]};assert.equal(normalizePose(source).position[2],-8);const edited=constrainEditPose(source);assert.deepEqual(edited.position,[30,40,0]);assert.ok(Math.abs(placementBounds(p,edited).min.z)<1e-5);assert.deepEqual(source.position,[30,40,-8]);assert.equal(constrainEditPose({position:[1,2,7]}).position[2],7);});
