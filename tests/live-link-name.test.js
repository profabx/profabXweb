import {test} from 'node:test';
import assert from 'node:assert/strict';
import {linkedObjectName} from '../src/live-link/objectName.js';
test('linked names survive XML attribute whitespace normalization',()=>{
 const name=linkedObjectName({id:'part-123',name:'笔身_内 \r\n(1)\t'});
 assert.equal(name,'PFXLIVE:part-123:笔身_内 (1)');
 assert.equal(name.replace(/[\t\r\n]/g,' '),name);
});
test('keeps identity prefix and original source data intact',()=>{
 const part={id:'123',name:'外壳\u0000 A'};
 assert.equal(linkedObjectName(part),'PFXLIVE:123:外壳 A');
 assert.equal(part.name,'外壳\u0000 A');
 assert.equal(linkedObjectName({id:'123',name:'长'.repeat(400)}).length,300);
});
