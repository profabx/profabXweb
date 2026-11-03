import test from 'node:test';
import assert from 'node:assert/strict';
import {createProject,validatePart} from '../src/project/schema.js';
test('emptyProjectStartsAtQuote',()=>{
 const p=createProject(); assert.equal(p.stage,'报价'); assert.deepEqual(p.parts,[]);
 assert.ok(Object.values(p.connections).every(x=>x.state==='disconnected'));
});
test('quantity and final manufacturing process are mandatory',()=>{
 for(const quantity of ['',0,-1,1.5,NaN,Infinity]) assert.ok(validatePart({quantity,finalProcess:'CNC'}).length);
 assert.ok(validatePart({quantity:1,finalProcess:''}).length);
 assert.deepEqual(validatePart({quantity:2,finalProcess:'注塑'}),[]);
});
