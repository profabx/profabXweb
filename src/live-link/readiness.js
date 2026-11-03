export function sliceReadiness(capabilities,session){
 if(!capabilities)return '正在读取联动能力，请稍后重试。';
 if(!capabilities.supportsPainting)return '当前联动版本不支持支撑回传，请更新联动版。';
 if(!session?.nativeConnected||session.paused)return '软件连接已中断，请重新连接联动版；当前工程和涂刷已保留。';
 return null;
}
