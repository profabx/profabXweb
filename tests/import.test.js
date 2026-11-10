import test from 'node:test';import assert from 'node:assert/strict';
import {importModels} from '../src/model/import.js';
import {matchRows} from '../src/attachments/extract.js';
const triangle='solid test\nfacet normal 0 0 1\nouter loop\nvertex 0 0 0\nvertex 10 0 0\nvertex 0 10 0\nendloop\nendfacet\nendsolid test';
const f=(path,content=triangle)=>({name:path.split('/').at(-1),webkitRelativePath:path,arrayBuffer:async()=>new TextEncoder().encode(content).buffer,text:async()=>content});
test('duplicateNamesKeepSourcePaths',async()=>{const r=await importModels([f('a/cube.stl'),f('b/cube.stl')]);assert.equal(r.parts.length,2);assert.notEqual(r.parts[0].id,r.parts[1].id);assert.notEqual(r.parts[0].sourcePath,r.parts[1].sourcePath);});
test('oneFailurePreservesValidImports',async()=>{const r=await importModels([f('a/cube.stl'),f('bad.step','not CAD')]);assert.equal(r.parts.length,1);assert.equal(r.errors.length,1);});
test('ambiguousAttachmentNameNeverSelectsFirstPart',()=>{const rows=matchRows([{name:'cube',quantity:2}],[{id:'a',name:'cube.stl',sourcePath:'a/cube.stl'},{id:'b',name:'cube.stl',sourcePath:'b/cube.stl'}]);assert.equal(rows[0].partId,'');});

test('damaged 3MF reports an import error without discarding a valid STL',async()=>{const result=await importModels([f('models/good.stl'),f('models/bad.3mf','not a zip')]);assert.equal(result.parts.length,1);assert.equal(result.errors.length,1);assert.equal(result.errors[0].path,'models/bad.3mf');assert.equal(result.sourceFiles.length,1);result.parts[0].geometry.dispose();});
