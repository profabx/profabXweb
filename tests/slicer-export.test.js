import test from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import {BoxGeometry,Matrix4} from 'three';
import {buildSlicerProject} from '../src/export/slicerProject.js';
const part=(id)=>({id,name:`零件<&"${id}`,sourcePath:id+'.stl',geometry:new BoxGeometry(10,20,30),originalTransform:new Matrix4(),unit:'mm',unitConfirmed:true,config:{quantity:5}});
test('3MF keeps separate editable objects and the displayed rotated placement without mutating meshes',async()=>{
 const a=part('a'),b=part('b'),before=Array.from(a.geometry.attributes.position.array),project={parts:[a,b],placement:{poses:{a:{position:[40,50,0],rotation:[0,0,90]},b:{position:[80,90,3],rotation:[0,0,0]}}}};
 const zip=await JSZip.loadAsync(await buildSlicerProject(project)),model=await zip.file('3D/3dmodel.model').async('string');
 assert.ok(zip.file('[Content_Types].xml'));assert.match(await zip.file('_rels/.rels').async('string'),/3D\/3dmodel.model/);
 assert.equal((model.match(/<object /g)||[]).length,2);assert.equal((model.match(/<item /g)||[]).length,2);assert.match(model,/unit="millimeter"/);assert.match(model,/零件&lt;&amp;&quot;a/);
 const objects=model.split('<object ').slice(1),coords=objects.map(o=>[...o.matchAll(/<vertex x="([^"]+)" y="([^"]+)" z="([^"]+)"/g)].map(v=>v.slice(1).map(Number)));
 const bounds=coords.map(v=>[0,1,2].map(i=>[Math.min(...v.map(p=>p[i])),Math.max(...v.map(p=>p[i]))]));
 assert.deepEqual(bounds[0],[[30,50],[45,55],[0,30]]);assert.deepEqual(bounds[1],[[75,85],[80,100],[3,33]]);
 assert.deepEqual(Array.from(a.geometry.attributes.position.array),before);assert.equal(zip.file('Metadata/project_settings.config'),null);
 a.geometry.dispose();b.geometry.dispose();
});
test('export refuses unknown software, empty models and unconfirmed units',async()=>{
 await assert.rejects(buildSlicerProject({parts:[]}),/导入零件/);const p=part('a');p.unitConfirmed=false;
 await assert.rejects(buildSlicerProject({parts:[p]}),/确认模型单位/);await assert.rejects(buildSlicerProject({parts:[p]},'unknown'),/暂不支持/);p.geometry.dispose();
});
