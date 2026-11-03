import test from 'node:test';
import assert from 'node:assert/strict';
import {isExternalProcess,isOutsourced} from '../src/quote/catalog.js';
test('capability classification preserves current FDM and LCD ownership',()=>{
 for(const process of ['FDM','LCD'])assert.equal(isExternalProcess(process),false);
 for(const process of ['SLA','CNC','激光切割','SLM','SLS','MJF','硅胶复模','注塑'])assert.equal(isExternalProcess(process),true);
 assert.equal(isExternalProcess('无'),false);
});
test('outsourcing follows capability rather than the removed manual checkbox',()=>{
 assert.equal(isOutsourced({process:'CNC',outsourced:false}),true);
 assert.equal(isOutsourced({process:'FDM',outsourced:true}),false);
 assert.equal(isOutsourced({process:'FDM',outsourced:false}),false);
});
