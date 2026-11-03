import test from 'node:test';
import assert from 'node:assert/strict';
import {billingWeightState} from '../src/quote/pricing.js';
const part=(materialId='pla',measurement={volumeReliable:true,volumeMm3:1000})=>({unit:'mm',config:{materialId,pricingWeightG:''},measurement});
test('reports exact mesh failures and missing density together',()=>{const s=billingWeightState(part('peba',{volumeReliable:false,volumeMm3:1000,issues:['网格未闭合或存在非流形边']}));assert.equal(s.available,false);assert.match(s.source,/网格未闭合/);assert.match(s.source,/密度/);assert(s.diagnostics.some(d=>d.id==='geometry'&&!d.ok));assert(s.diagnostics.some(d=>d.id==='density'&&!d.ok));});
test('unknown material does not silently use PLA density',()=>{const s=billingWeightState(part('deleted-material'));assert.equal(s.available,false);assert.match(s.source,/材料/);});
test('invalid net volume and unmeasured geometry have distinct remedies',()=>{assert.match(billingWeightState(part('pla',{volumeReliable:true,volumeMm3:0})).source,/净体积/);assert.match(billingWeightState(part('pla',null)).source,/测量/);});
test('known volume and density explain automatic formula',()=>{const s=billingWeightState(part());assert.equal(s.value,1.24);assert(s.diagnostics.every(d=>d.ok));assert.match(s.diagnostics.find(d=>d.id==='density').detail,/1.24/);assert.match(s.diagnostics.find(d=>d.id==='volume').detail,/1/);});
test('manual weight remains usable while automatic blockers remain visible',()=>{const p=part('peba',{volumeReliable:false,issues:['面方向不一致']});p.config.pricingWeightG='7.5';const s=billingWeightState(p);assert.equal(s.value,'7.5');assert.equal(s.available,true);assert.equal(s.autoAvailable,false);assert.match(s.automaticError,/面方向/);});
