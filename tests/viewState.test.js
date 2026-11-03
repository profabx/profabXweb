import test from 'node:test';import assert from 'node:assert/strict';
import {groupColor,deriveVisibility} from '../src/model/viewState.js';
test('sameProcessMaterialShareColor',()=>assert.equal(groupColor('FDM','pla'),groupColor('FDM','pla')));
test('isolateAndRestore',()=>{assert.deepEqual([...deriveVisibility(['a','b'],'b')],['b']);assert.deepEqual([...deriveVisibility(['a','b'],null)],['a','b']);});
