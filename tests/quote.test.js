import test from 'node:test';import assert from 'node:assert/strict';
import {calculateQuote} from '../src/quote/calculate.js';
import {validatePart} from '../src/project/schema.js';
const parts=[{id:'1',config:{quantity:2,finalProcess:'CNC',unitBaseYuan:100,postUnitYuan:10,setupYuan:20}}];
test('quoteUsesDiscountBeforeTax',()=>{const q=calculateQuote(parts,{discountPercent:10,taxPercent:13});assert.equal(q.baseFen,24000);assert.equal(q.netFen,21600);assert.equal(q.taxFen,2808);assert.equal(q.totalFen,24408);});
test('invalidNumbersBlockConfirmation',()=>{for(const n of ['',0,-1,1.5,NaN])assert.ok(validatePart({quantity:n,finalProcess:'CNC'}).length);for(const n of [-1,101,NaN,Infinity,''])assert.throws(()=>calculateQuote(parts,{discountPercent:n,taxPercent:13}));assert.throws(()=>calculateQuote(parts,{discountPercent:0,taxPercent:-1}));});
test('negativeOrNonFiniteCostsCannotCreateQuote',()=>{for(const n of [-1,NaN,Infinity])assert.throws(()=>calculateQuote([{config:{...parts[0].config,unitBaseYuan:n}}],{discountPercent:0,taxPercent:0}));});
