import test from 'node:test';
import assert from 'node:assert/strict';
import {BufferGeometry, Float32BufferAttribute} from 'three';
import {withPreviewNormals} from '../src/model/previewNormals.js';

function mesh(positions, indices) {
 const geometry = new BufferGeometry();
 geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
 geometry.setIndex(indices);
 geometry.computeVertexNormals();
 return geometry;
}

test('3MF preview keeps shared flat triangles uniformly shaded at a sharp wall', () => {
 const source = mesh([0,0,0, 2,0,0, 2,2,0, 0,2,0, 2,0,1], [0,1,2, 0,2,3, 1,4,2]);
 const preview = withPreviewNormals({geometry:source,sourcePath:'restored.3MF'}, source.clone());
 const normals = preview.getAttribute('normal');
 for (let i=0; i<6; i++) assert.equal(normals.getZ(i), 1);
 for (let i=6; i<9; i++) assert.equal(normals.getX(i), -1);
 const expanded = source.toNonIndexed();
 assert.deepEqual(preview.getAttribute('position').array, expanded.getAttribute('position').array);
 assert.deepEqual([...source.index.array], [0,1,2,0,2,3,1,4,2]);
 for (const geometry of [source,preview,expanded]) geometry.dispose();
});

test('3MF preview blends a shallow bend and isolates cached normals from thumbnail rotation', () => {
 const source = mesh([0,0,0, 1,0,0, 0,1,0, 0,-1,0.3], [0,1,2, 1,0,3]);
 const part = {geometry:source,sourceFormat:'3mf'};
 const preview = withPreviewNormals(part,source.clone());
 const normal = preview.getAttribute('normal');
 assert(normal.getY(0)>0 && normal.getY(0)<0.3);
 assert.equal(normal.getY(0),normal.getY(4));
 const originalZ = normal.getZ(0);
 preview.rotateX(Math.PI / 2);
 const next = withPreviewNormals(part,source.clone());
 assert.equal(next.getAttribute('normal').getZ(0),originalZ);
 for (const geometry of [source,preview,next]) geometry.dispose();
});
