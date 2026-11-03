import test from 'node:test';
import assert from 'node:assert/strict';
import {Vector3,Matrix4,Euler} from 'three';
import {fitRigidTransform} from '../src/slicing/projectLayout.js';
import {extrusionMesh} from '../src/slicing/extrusionMesh.js';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{parseSupportGcode}=require('../scripts/slicing/gcode.cjs');
test('native rigid placement matches all vertices and rejects scaling or changed meshes',()=>{
 const points=[[0,0,0],[10,0,0],[0,20,0],[0,0,30],[8,3,6]].map(p=>new Vector3(...p)),transform=new Matrix4().makeRotationFromEuler(new Euler(.5,-.3,1.2)).setPosition(90,110,40),target=points.map(p=>p.clone().applyMatrix4(transform)),fitted=fitRigidTransform(points,target);
 points.forEach((p,i)=>assert(p.clone().applyMatrix4(fitted).distanceTo(target[i])<1e-8));
 assert.throws(()=>fitRigidTransform(points,target.map(p=>p.clone().multiplyScalar(2))),/缩放/);
 assert.throws(()=>fitRigidTransform(points,target.slice(1)),/网格/);
});
test('preview uses G-code width and layer height, with a first layer resting on the bed',()=>{
 const preview=parseSupportGcode('G90\nM83\nG1 X10 Y20 Z.2\n; HEIGHT: 0.2\n; WIDTH: 0.5\n; TYPE: Support\nG1 X20 Y20 E.4');
 assert.deepEqual(preview.widths,[.5]);assert.deepEqual(preview.heights,[.2]);
 const mesh=extrusionMesh(preview.segments,preview.widths,preview.heights),box=mesh.boundingBox;
 assert(Math.abs(box.min.x-10)<1e-5);assert(Math.abs(box.max.x-20)<1e-5);
 assert(Math.abs(box.max.y-box.min.y-.5)<1e-5);assert(Math.abs(box.min.z)<1e-6);assert(Math.abs(box.max.z-.2)<1e-6);
 mesh.geometry.dispose();mesh.material.dispose();
});
test('inferred extrusion width is finite for native paths and arc subdivisions retain bead dimensions',()=>{
 const result=parseSupportGcode('G90\nM83\nG1 X10 Y0 Z.16\n; HEIGHT: 0.16\n; TYPE: Support\nG3 X0 Y10 I-10 J0 E.5');
 assert(result.count>10);assert.equal(result.widths.length,result.count);assert(result.widths.every(w=>Number.isFinite(w)&&w>0));assert(result.heights.every(h=>h===.16));
});
test('layout-only 3MF returns carry no fabricated toolpath',async()=>{
 const JSZip=require('jszip'),{readSlicedResult,ingestResult}=require('../scripts/slicing/returns.cjs'),fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path'),directory=await fs.mkdtemp(path.join(os.tmpdir(),'profabx-layout-'));
 try{const zip=new JSZip();zip.file('3D/3dmodel.model','<model/>');const bytes=await zip.generateAsync({type:'nodebuffer'}),result=await readSlicedResult(bytes,'3mf',{allowProject:true});assert.equal(result.code,null);assert.equal(result.preview,null);
 const job={directory,files:{gcode:'old.gcode',result:'old.3mf'},handoff:{state:'waiting'}};await ingestResult(job,bytes,'3mf',async()=>{});assert.equal(job.layoutOnly,true);assert.equal(job.files.gcode,undefined);assert.equal(job.files.result,undefined);assert.match(job.files.layout,/^returned-[a-f0-9-]+\.3mf$/);assert.equal(job.handoff.state,'received');
 }finally{await fs.rm(directory,{recursive:true,force:true});}
});
