import test from 'node:test';import assert from 'node:assert/strict';import {createRequire} from 'node:module';const require=createRequire(import.meta.url),{make3mf}=require('../scripts/slicing/core.cjs'),Z=require('../scripts/vendor/jszip.cjs');
test('GUI project includes filament colors and variant indices required by native config loader',async()=>{
 const zip=await Z.loadAsync(await make3mf({engine:'bambu',parts:[]},{machine:{extruder_variant_list:['Direct Drive Standard,Direct Drive High Flow']},process:{},filament:{filament_extruder_variant:['Direct Drive Standard','Direct Drive High Flow']}}));
 const c=JSON.parse(await zip.file('Metadata/project_settings.config').async('string'));
 assert.deepEqual(c.filament_colour,['#00AE42']);assert.deepEqual(c.filament_self_index,['1','1']);assert.equal(c.filament_extruder_variant.length,c.filament_self_index.length);
});
test('saved native project colors and variant mapping remain authoritative',async()=>{
 const saved={filament_colour:['#FFFFFF'],extruder_variant_list:['Standard'],filament_extruder_variant:['Standard'],filament_self_index:['1']};
 const zip=await Z.loadAsync(await make3mf({engine:'bambu',parts:[]},{machine:{},process:{},filament:{},nativeConfig:saved}));const c=JSON.parse(await zip.file('Metadata/project_settings.config').async('string'));for(const k of Object.keys(saved))assert.deepEqual(c[k],saved[k]);
});
