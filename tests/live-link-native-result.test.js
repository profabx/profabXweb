import test from 'node:test';import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
test('native result advertisements are bound to verified owner and generation, and invalidation clears them',()=>{
 const {acceptNativeResult}=require('../scripts/live-link/native-result.cjs');
 const h={owner:'web-a',generation:2,pendingContext:null},body={bindingReady:true,bindingSession:'web-a',slice:{revision:'result-42'}};
 acceptNativeResult(h,body);assert.deepEqual(h.nativeResult,{revision:'result-42',sessionId:'web-a',generation:2});
 acceptNativeResult(h,{...body,bindingSession:'old'});assert.equal(h.nativeResult,null);
 acceptNativeResult(h,body);acceptNativeResult(h,{...body,slice:null});assert.equal(h.nativeResult,null);
 h.pendingContext={};acceptNativeResult(h,body);assert.equal(h.nativeResult,null);
 h.pendingContext=null;acceptNativeResult(h,{...body,slice:{revision:'x'.repeat(201)}});assert.equal(h.nativeResult,null);
});
