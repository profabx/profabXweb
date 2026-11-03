const fs = require('node:fs');
const path = require('node:path');
const folder = path.join(__dirname, '../public/cad');
fs.mkdirSync(folder, {recursive:true});
for (const name of ['occt-import-js.js','occt-import-js.wasm']) fs.copyFileSync(require.resolve('occt-import-js/dist/'+name), path.join(folder,name));
fs.copyFileSync(path.join(path.dirname(require.resolve('occt-import-js/package.json')),'LICENSE.md'),path.join(folder,'LICENSE.md'));
