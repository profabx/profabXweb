import {screenGeometry} from './geometry.js';import {simpleVersion} from './state.js';
self.onmessage=({data})=>{const {id,payload,sourceKey}=data;let result;try{result=screenGeometry(payload);}catch(error){result={status:'unavailable',checks:{},reason:error.message};}self.postMessage({id,result:{...result,sourceKey,version:simpleVersion,computedAt:new Date().toISOString()}});};
