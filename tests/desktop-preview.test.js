import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {stopCommand}=require('../scripts/desktop-preview.cjs');
test('desktop restart targets only the validated preview PID and exact executable',()=>{
 const command=stopCommand({service:'ProFabXweb',projectKey:'expected',ready:true,pid:12345},'expected','C:\\Node\\node.exe',999);
 assert.match(command,/Get-Process -Id 12345/);
 assert.match(command,/\.Path -ne 'C:\\Node\\node.exe'/);
 assert.match(command,/Stop-Process -InputObject \$previewProcess -Force -ErrorAction Stop/);
 assert.doesNotMatch(command,/bambu|Stop-Process -Name|taskkill/i);
});
test('unrelated, invalid and own PIDs cannot be stopped',()=>{
 for(const patch of [{service:'other'},{projectKey:'other'},{pid:0},{pid:999},{pid:'12345'},{ready:false}])assert.throws(()=>stopCommand({service:'ProFabXweb',projectKey:'expected',ready:true,pid:12345,...patch},'expected','node.exe',999));
});
