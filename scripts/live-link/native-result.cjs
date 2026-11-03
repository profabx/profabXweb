function acceptNativeResult(host,body){
 const revision=body.slice?.revision;
 host.nativeResult=host.owner&&!host.pendingContext&&body.bindingReady===true&&body.bindingSession===host.owner&&typeof revision==='string'&&revision.length>0&&revision.length<=200?{revision,sessionId:host.owner,generation:host.generation}:null;
}
module.exports={acceptNativeResult};
