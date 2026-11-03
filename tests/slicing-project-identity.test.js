import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{make3mf}=require('../scripts/slicing/core.cjs'),JSZip=require('../scripts/vendor/jszip.cjs');
test('Bambu project identity retains supplied world coordinates instead of triggering generic-model recentering',async()=>{
 const part={id:'cube',name:'PFXLIVE:cube:Cube',vertices:[33,33,0,43,33,0,33,43,10],triangles:[0,1,2]};
 const zip=await JSZip.loadAsync(await make3mf({engine:'bambu',parts:[part]}, {machine:{name:'P1S'},process:{name:'Process'},filament:{name:'PLA'}}));
 const model=await zip.file('3D/3dmodel.model').async('string');
 const application=model.match(/<metadata name="Application">([^<]+)<\/metadata>/)?.[1];
 // Bambu v02.08.02.61 _handle_end_metadata only recognizes this prefix as a native project.
 assert.match(application,/^BambuStudio-\d+\.\d+\.\d+/);
 assert.match(model,/<vertex x="33" y="33" z="0"\/>/);
 assert.match(model,/<metadata name="ProFabX:Generator">ProFabXweb<\/metadata>/);
});
