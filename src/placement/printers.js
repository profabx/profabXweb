// Published build volumes, checked 2026-10-21. Nozzle modes have different usable volumes.
export const printerProfiles={
 P1S:{source:'https://us.store.bambulab.com/collections/3d-printer/products/p1s',modes:[{id:'standard',name:'标准',size:[256,256,256]}]},
 P2S:{source:'https://blog.bambulab.com/the-icon-redefined-meet-the-p2s-a-completely-reengineered-version-of-the-ultra-productive-p1-series/',modes:[{id:'standard',name:'标准',size:[256,256,256]}]},
 X2D:{source:'https://blog.bambulab.com/xcellence-made-simple-bambu-lab-presents-the-x2d/',modes:[{id:'main',name:'主喷嘴',size:[256,256,260]},{id:'dual',name:'双喷嘴交集',size:[235.5,256,256]}]},
 H2D:{source:'https://cdn1.bambulab.com/documentation/h2d/en/H2D_Laser_Full_Combo_20250305.pdf',modes:[{id:'single',name:'单喷嘴',size:[325,320,325]},{id:'dual',name:'双喷嘴交集',size:[300,320,325]},{id:'union',name:'双喷嘴联合',size:[350,320,325]}]},
 H2S:{source:'https://us.store.bambulab.com/en/products/h2s',modes:[{id:'standard',name:'标准',size:[340,320,340]}]},
 'Reflex Turbo':{source:'https://store.heygears.com/products/reflex-turbo-3d-printer',modes:[{id:'standard',name:'标准',size:[191,121,220]}]}
};
export function plateForPrinter(deviceId='',previous={},modeId){const profile=printerProfiles[deviceId],mode=profile&&(profile.modes.find(m=>m.id===(modeId||(previous.deviceId===deviceId?previous.nozzleMode:undefined)))||profile.modes[0]);return {...previous,margin:Number.isFinite(Number(previous.margin))?Number(previous.margin):5,gap:Number.isFinite(Number(previous.gap))?Number(previous.gap):6,deviceId:profile?deviceId:'',nozzleMode:mode?.id||'',size:mode?[...mode.size]:null,unbounded:!mode,verified:Boolean(mode)};}
export function normalizePrinterPlate(plate){return plateForPrinter(plate?.deviceId||'',plate||{});}
