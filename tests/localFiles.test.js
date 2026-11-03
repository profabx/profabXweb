import test from 'node:test';import assert from 'node:assert/strict';import {deleteFolderEntries} from '../src/storage/localFiles.js';
test('local file deletion stays inside the explicitly selected folder and exact names',async()=>{
 const removed=[],handle={async *entries(){yield ['old.zip',{kind:'file'}];yield ['old-order',{kind:'directory'}];yield ['keep.zip',{kind:'file'}];},async removeEntry(name,options){removed.push([name,options.recursive]);}};
 await assert.rejects(deleteFolderEntries(handle,['../outside']));assert.deepEqual(removed,[]);
 const results=await deleteFolderEntries(handle,['old.zip','old-order']);assert.deepEqual(removed,[['old.zip',false],['old-order',true]]);assert.ok(results.every(r=>r.status==='deleted'));
});
test('partial deletion failure remains visible and does not affect unrelated files',async()=>{
 const handle={async *entries(){yield ['locked.zip',{kind:'file'}];},async removeEntry(){throw new Error('permission denied');}};const result=await deleteFolderEntries(handle,['locked.zip','missing']);assert.equal(result[0].status,'failed');assert.equal(result[1].status,'missing');
});
