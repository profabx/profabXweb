import test from 'node:test';import assert from 'node:assert/strict';
import {recommendTreatments} from '../src/quote/treatments.js';
const part=(process,materialId)=>({config:{process,materialId},measurement:{sizeMm:[100,50,10],volumeReliable:true,issues:[]}});
test('aluminum aging requires checking supplied temper; no universal recipe',()=>{
 const advice=recommendTreatments(part('CNC','al'));assert.ok(advice.some(a=>a.id==='aging'));
 assert.ok(advice.every(a=>a.parameterStatus==='engineering-review'));assert.match(advice.find(a=>a.id==='aging').caution[0],/T6|T651/);
});
test('resin receives post curing rather than thermoplastic annealing',()=>{
 const advice=recommendTreatments(part('LCD','resin'));assert.ok(advice.some(a=>a.id==='resin-cure'));assert.ok(!advice.some(a=>a.id==='anneal'));
});
test('ABS does not receive routine annealing; PLA uses a conditional trial',()=>{
 assert.ok(recommendTreatments(part('FDM','abs')).some(a=>a.id==='abs-stability'));
 assert.ok(!recommendTreatments(part('FDM','abs')).some(a=>a.id==='anneal'));
 assert.ok(recommendTreatments(part('FDM','pla')).some(a=>a.id==='anneal'));
});
test('metal printing, nylon and casting get process-specific routes',()=>{
 for(const [process,material,id] of [['SLM','steel','metal-relief'],['SLS','nylon','nylon'],['MJF','nylon','nylon'],['硅胶复模','pu','pu-cure'],['激光切割','steel','cut-edge']])assert.ok(recommendTreatments(part(process,material)).some(a=>a.id===id));
 assert.deepEqual(recommendTreatments(null),[]);
});
