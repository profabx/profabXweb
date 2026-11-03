import test from 'node:test';import assert from 'node:assert/strict';
import {sliceReadiness} from '../src/live-link/readiness.js';
test('lost connection is distinguished from unverified runtime and loading capabilities',()=>{
 assert.equal(sliceReadiness(null,null),'正在读取联动能力，请稍后重试。');
 assert.equal(sliceReadiness({supportsPainting:true},{nativeConnected:false}),'软件连接已中断，请重新连接联动版；当前工程和涂刷已保留。');
 assert.equal(sliceReadiness({supportsPainting:false},{nativeConnected:true}),'当前联动版本不支持支撑回传，请更新联动版。');
 assert.equal(sliceReadiness({supportsPainting:true},{nativeConnected:true,paused:false}),null);
});
