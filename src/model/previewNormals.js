import {BufferAttribute, Vector3} from 'three';

const minimumSmoothDot = Math.cos(Math.PI / 6);
const normalCache = new WeakMap();
const maxSmoothNeighbors = 128;

function creaseNormals(geometry) {
 const position = geometry.getAttribute('position');
 const index = geometry.index;
 const cornerCount = index.count;
 const faceNormals = new Float32Array(cornerCount);
 const cornerNormals = new Float32Array(cornerCount * 3);
 const firstCorner = new Int32Array(position.count).fill(-1);
 const nextCorner = new Int32Array(cornerCount);
 const incidentCount = new Uint8Array(position.count);
 const a = new Vector3(), b = new Vector3(), c = new Vector3();
 const faceNormal = new Vector3(), neighbor = new Vector3(), sum = new Vector3();

 for (let corner = 0; corner < cornerCount; corner += 3) {
  a.fromBufferAttribute(position, index.getX(corner));
  b.fromBufferAttribute(position, index.getX(corner + 1));
  c.fromBufferAttribute(position, index.getX(corner + 2));
  faceNormal.crossVectors(b.sub(a), c.sub(a)).normalize().toArray(faceNormals, corner);
  for (let offset = 0; offset < 3; offset++) {
   const id = index.getX(corner + offset);
   nextCorner[corner + offset] = firstCorner[id];
   firstCorner[id] = corner + offset;
   if (incidentCount[id] <= maxSmoothNeighbors) incidentCount[id]++;
  }
 }

 for (let corner = 0; corner < cornerCount; corner++) {
  faceNormal.fromArray(faceNormals, corner - corner % 3);
  const id = index.getX(corner);
  // Bound smoothing work on exceptional or damaged triangle fans.
  if (incidentCount[id] > maxSmoothNeighbors) {
   faceNormal.toArray(cornerNormals, corner * 3);
   continue;
  }
  sum.set(0, 0, 0);
  // Only smooth faces that share this exact 3MF vertex and meet at a shallow angle.
  for (let adjacent = firstCorner[id]; adjacent !== -1; adjacent = nextCorner[adjacent]) {
   neighbor.fromArray(faceNormals, adjacent - adjacent % 3);
   if (faceNormal.dot(neighbor) >= minimumSmoothDot) sum.add(neighbor);
  }
  sum.normalize().toArray(cornerNormals, corner * 3);
 }
 return new BufferAttribute(cornerNormals, 3);
}

/** Apply display normals to an owned geometry clone, preserving triangle order. */
export function withPreviewNormals(part, geometry) {
 if (!geometry.index || !(part.sourceFormat === '3mf' || /\.3mf$/i.test(part.sourcePath || ''))) return geometry;
 const transform = part.originalTransform?.elements.join(',') || '';
 let cached = normalCache.get(part.geometry);
 if (!cached || cached.transform !== transform) {
  cached = {transform, normals: creaseNormals(geometry)};
  normalCache.set(part.geometry, cached);
 }
 geometry.deleteAttribute('normal');
 const preview = geometry.toNonIndexed();
 preview.setAttribute('normal', cached.normals.clone());
 geometry.dispose();
 return preview;
}
