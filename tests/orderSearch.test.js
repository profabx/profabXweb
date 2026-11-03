import test from 'node:test';import assert from 'node:assert/strict';
import {searchOrders,makeOrderRecord,fingerprintFile} from '../src/orders/history.js';
const order={id:'record',orderId:'PFX-001',name:'蓝色外壳',parts:[{name:'支架',process:'CNC',material:'铝合金 6061'}],files:[{name:'reference.png',hash:'abc',text:''}]};
test('image matching uses content hashes and survives a renamed upload',()=>{
 const found=searchOrders([order],{file:{name:'renamed.png',hash:'abc',text:''}});assert.equal(found[0].reasons.includes('exact-file'),true);
 assert.equal(searchOrders([order],{file:{name:'different.png',hash:'other',text:''}}).length,0);
});
test('matches order id, part and material plus document text',()=>{
 for(const query of ['PFX-001','支架','6061'])assert.equal(searchOrders([order],{query}).length,1);
 assert.equal(searchOrders([order],{file:{name:'notes.txt',hash:'other',text:'蓝色外壳'}}).length,1);
 assert.equal(searchOrders([order],{query:'不存在'}).length,0);
});
test('filename matches are distinct from exact file matches',()=>{
 const result=searchOrders([order],{file:{name:'reference.png',hash:'different'}})[0];assert.ok(result.reasons.includes('filename'));assert.ok(!result.reasons.includes('exact-file'));
});
test('record contains metadata without geometry and fingerprints use SHA256',async()=>{
 const record=makeOrderRecord({id:'PFX-2',name:'订单',parts:[{name:'零件',config:{process:'FDM',materialId:'pla',quantity:2},measurement:{sizeMm:[1,2,3]}}],confirmation:{time:'2026-10-20T00:00:00Z'}},[],100);
 assert.equal(record.parts[0].quantity,2);assert.equal(record.totalFen,100);assert.ok(!('geometry' in record.parts[0]));
 const file=new File(['hello'],'a.txt');const renamed=new File(['hello'],'b.txt');assert.equal((await fingerprintFile(file)).hash,(await fingerprintFile(renamed)).hash);
});
