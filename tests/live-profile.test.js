import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{disableParameterTip}=require('../scripts/live-link/profile.cjs');
test('disables only introduction hint and preserves printer settings with valid checksum',async t=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'profabx-tip-'));t.after(()=>fs.rm(dir,{recursive:true,force:true}));
 const before={app:{show_wrapping_detect_dialog:true,printer:'P2S'},other:{enable_wrapping_detection:true}};
 await fs.writeFile(path.join(dir,'ProFabXLive.conf'),JSON.stringify(before)+'\n# MD5 checksum OLD\n');
 await disableParameterTip(dir);const text=await fs.readFile(path.join(dir,'ProFabXLive.conf'),'utf8'),body=text.slice(0,text.lastIndexOf('}')+1),after=JSON.parse(body);
 assert.deepEqual(after,{...before,app:{...before.app,show_wrapping_detect_dialog:false}});
 assert(text.includes(require('node:crypto').createHash('md5').update(body).digest('hex').toUpperCase()));
});
test('new private profiles skip hint; corrupted existing profile is preserved',async t=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'profabx-tip-'));t.after(()=>fs.rm(dir,{recursive:true,force:true}));await disableParameterTip(dir);
 const file=path.join(dir,'ProFabXLive.conf');assert((await fs.readFile(file,'utf8')).includes('"show_wrapping_detect_dialog": false'));
 await fs.writeFile(file,'broken');await assert.rejects(disableParameterTip(dir));assert.equal(await fs.readFile(file,'utf8'),'broken');
});
