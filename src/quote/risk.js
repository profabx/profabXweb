import {simpleRisk} from '../simple-risk/state.js';
export function checkDevice(size,device){if(!Array.isArray(size)||size.length!==3||!size.every(x=>Number.isFinite(x)&&x>=0)||!device?.verified||device.size?.length!==3||!device.size.every(x=>Number.isFinite(x)&&x>0))return 'unverified';return size.some((x,i)=>x>device.size[i])?'exceeds':'fits';}
export function assessRisks(part,context={}){return simpleRisk(part,context).issues;}
