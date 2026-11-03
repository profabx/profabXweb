import test from 'node:test';import assert from 'node:assert/strict';
import {applyStroke,createPaintState,undoPaint,redoPaint} from '../src/support-paint/model.js';
// Non-indexed STL-style triangles: two coplanar faces, a 90-degree fold, isolated face.
const mesh={meshDigest:'fill-fixture',vertices:[0,0,0,1,0,0,0,1,0, 1,0,0,1,1,0,0,1,0, 1,0,0,1,0,1,1,1,0, 5,0,0,6,0,0,5,1,0],triangles:Array.from({length:12},(_,i)=>i)};
const stroke={mode:'enforce',shape:'smart-fill',angleDeg:30,radiusMm:3,samples:[{faceIndex:0,localPoint:[.1,.1,0],viewDirection:[0,0,-1]}]};
test('smart fill crosses welded shared edges and stops at sharp fold',()=>{
 const state=applyStroke(createPaintState(mesh.meshDigest),stroke,mesh);assert.deepEqual(state.facets,{0:1,1:1});assert.equal(state.undo.length,1);
});
test('connected fill includes fold but never disconnected island, supports undo redo erase',()=>{
 const state=applyStroke(createPaintState(mesh.meshDigest),{...stroke,shape:'connected-fill',mode:'block'},mesh);assert.deepEqual(state.facets,{0:2,1:2,2:2});assert.deepEqual(undoPaint(state).facets,{});assert.deepEqual(redoPaint(undoPaint(state)).facets,state.facets);
 const erased=applyStroke(state,{...stroke,shape:'connected-fill',mode:'erase'},mesh);assert.deepEqual(erased.facets,{});
});
test('fill rejects invalid angles, keeps triangle codec identity and ignores repeated drag samples',()=>{
 assert.throws(()=>applyStroke(createPaintState(mesh.meshDigest),{...stroke,angleDeg:NaN},mesh),/brush/i);
 const s=applyStroke(createPaintState(mesh.meshDigest),{...stroke,samples:[...stroke.samples,{...stroke.samples[0],faceIndex:3}]},mesh);assert.deepEqual(s.facets,{0:1,1:1});
 assert.equal(applyStroke(s,stroke,mesh),s);
});
