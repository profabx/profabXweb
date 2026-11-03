import test from 'node:test';import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';import {makeQuoteWorkbook} from '../src/export/quotation.js';import {createProject} from '../src/project/schema.js';import {calculateQuote} from '../src/quote/calculate.js';
test('workbook identifies external processes even with a stale manual flag',async()=>{
 const project=createProject();project.parts=[{id:'external',name:'外包零件',config:{process:'CNC',materialId:'al',quantity:1,finalProcess:'注塑',outsourced:false,unitBaseYuan:80,postUnitYuan:0,setupYuan:0}}];
 const quote=calculateQuote(project.parts,project.quoteSettings),book=new ExcelJS.Workbook();await book.xlsx.load(await makeQuoteWorkbook(project,quote));
 const sheet=book.getWorksheet('报价明细');assert.equal(sheet.getCell('C5').value,'CNC · 外包');assert.equal(sheet.getCell('J5').value,'注塑 · 外包');assert.equal(sheet.getCell('K5').value,'是');
});
test('workbookPreservesChineseNamesAndActualTotals',async()=>{const p=createProject();p.parts=[{id:'one',name:'中文超长电子外壳测试零件'.repeat(8),config:{process:'FDM',materialId:'pla',quantity:2,finalProcess:'注塑',unitBaseYuan:100,postUnitYuan:10,setupYuan:20}}];const q=calculateQuote(p.parts,{discountPercent:10,taxPercent:13}),bytes=await makeQuoteWorkbook(p,q);const wb=new ExcelJS.Workbook();await wb.xlsx.load(bytes);const sheet=wb.getWorksheet('报价明细');assert.equal(sheet.getCell('B5').value,p.parts[0].name);assert.equal(sheet.getCell('E5').value,2);assert.equal(wb.getWorksheet('报价汇总').getCell('B8').value,244.08);assert.equal(wb.getWorksheet('报价汇总').getCell('B2').value,p.id);});
