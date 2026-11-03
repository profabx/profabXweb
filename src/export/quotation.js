import {company,quoteDocument,quoteColumns,quoteColumnWidths} from './quoteDocument.js';
import {pricingRules,exportProjectSchedules} from '../quote/pricingStandards.js';
import {materialById,isOutsourced,processLabel} from '../quote/catalog.js';
export async function makeQuoteWorkbook(project,quote,{images={}}={}){
 const {default:ExcelJS}=await import('exceljs');const wb=new ExcelJS.Workbook();wb.creator='ProFabX';
 addContractSheet(wb,project,quote,images);
 const summary=wb.addWorksheet('报价汇总');summary.addRows([['ProFabX 工程估算报价'],['项目号',project.id],['项目名称',project.name],['生成日期',new Date().toLocaleString('zh-CN',{timeZone:'Asia/Shanghai'})],['基础报价',quote.baseFen/100],['折扣金额',quote.discountFen/100],['税额',quote.taxFen/100],['含税合计',quote.totalFen/100],['说明','人民币；制造费执行分组起步标准，后处理与设置费另加；风险/项目报价需复核'],['折后金额',quote.netFen/100],['折扣 %',Number(project.quoteSettings.discountPercent)],['税率 %',Number(project.quoteSettings.taxPercent)]]);
 summary.columns=[{width:22},{width:76}];
 const detail=wb.addWorksheet('报价明细');detail.addRows([['ProFabX 零件明细'],['项目号',project.id],['价格仅作工程估算，未核实规则不能替代供应商正式报价'],['序号','零件名称','工艺','材料','数量','基础单价','后处理单价','设置费','小计','最终工艺','外包','外观需求']]);
 project.parts.forEach((p,i)=>{const c=p.config,l=quote.lines.find(x=>x.partId===p.id);detail.addRow([i+1,p.name,processLabel(c.process),materialById(c.materialId).name,Number(c.quantity),(l?.unitFen??Math.round(Number(c.unitBaseYuan)*100))/100,(l?.postFen??Math.round(Number(c.postUnitYuan)*100))/100,(l?.setupFen??Math.round(Number(c.setupYuan)*100))/100,(l?.amountFen||0)/100,c.finalProcess?processLabel(c.finalProcess):'',isOutsourced(c)?'是':'否',[c.color,c.matte?'哑光':'',c.customColor,c.reviewNote].filter(Boolean).join('；')]);});
 detail.getRow(4).getCell(13).value='材料厂商';detail.getRow(4).getCell(14).value='公差要求';project.parts.forEach((p,i)=>{detail.getRow(i+5).getCell(13).value=p.config.materialSupplier||'拓竹';detail.getRow(i+5).getCell(14).value=p.config.toleranceRequirements||'';});
 const extraHeaders=['计价规则','单件计价重量g','核定元/g','组起步补差','人工复核标记','重量来源','专用方案合计数量','补差前制造费','后处理总费'];extraHeaders.forEach((label,i)=>detail.getRow(4).getCell(15+i).value=label);
 project.parts.forEach((p,i)=>{const l=quote.lines.find(x=>x.partId===p.id),d=l?.pricing;const values=[d?.label||'人工报价',d?.weight??'',d?.rate??'',(l?.minimumTopupFen||0)/100,d?.review?'需人工复核':'',d?.weightSource||'',d?.projectQuantity??'',(l?.manufacturingFen||0)/100,(l?.postTotalFen||0)/100];values.forEach((value,j)=>detail.getRow(i+5).getCell(15+j).value=value);});
 detail.columns=[10,45,16,24,10,16,18,16,18,18,12,42,20,28,28,20,18,18,22,42,22,22,22].map(width=>({width}));
 summary.addRows([['报价标准版本',quote.pricingVersion||'历史手工报价'],['生产方式',project.quoteSettings.pricingProduction==='batch'?'批量':'打样'],['起步规则','同工艺、同材料分别取件起步费与组起步价；后处理/设置费另加，折后计税']]);
 const reference=wb.addWorksheet('报价标准');reference.addRow(['来源：用户提供截图标准；手柄采用20260302版。专用项目按列明单价，不再叠加近似折扣。']);reference.addRow(['工艺','材料','打样元/g','批量元/g','件起步','组起步','批量件起步','批量组起步','时效','已含后处理','复核说明']);
 const formatRate=r=>r==null?'按难度/项目人工核价':Array.isArray(r)?r.join('–'):r;
 for(const r of pricingRules)reference.addRow([r.process,r.name,formatRate(r.sampleRate),formatRate(r.batchRate),r.pieceMin,r.orderMin,r.batchPieceMin??r.pieceMin,r.batchOrderMin??r.orderMin,r.lead,r.finishing||'',r.note||(Array.isArray(r.batchRate)?'批量区间需核定':'')]);reference.columns=[14,28,24,28,14,14,18,18,34,46,70].map(width=>({width}));reference.views=[{state:'frozen',ySplit:2}];
 const minimums=wb.addWorksheet('起步补差');minimums.addRow(['分组','原表组起步价','件起步汇总','有效起步价','补差前制造费','起步补差']);for(const group of quote.groups||[])minimums.addRow([group.key,group.orderMinimumFen/100,group.pieceMinimumFen/100,group.minimumFen/100,group.baseFen/100,group.topupFen/100]);minimums.columns=[40,22,22,22,24,22].map(width=>({width}));
 const activeSchedules=exportProjectSchedules(project.parts);if(activeSchedules.length){const projects=wb.addWorksheet('专用项目阶梯');for(const schedule of activeSchedules){projects.addRow([schedule.name,'参考单件重量g',schedule.weight]);projects.addRow(['数量范围','单价元/件']);schedule.tiers.forEach(([max,price],i)=>projects.addRow([max===Infinity?'401及以上':`${i?schedule.tiers[i-1][0]+1:1}–${max}`,price]));projects.addRow(['口径',schedule.note]);projects.addRow(['QC',schedule.qc.join('；')]);projects.addRow([]);}projects.columns=[{width:40},{width:100},{width:20}];}


 for(const s of [summary,detail]){s.getRow(s===detail?4:1).font={bold:true,color:{argb:'FFFFFFFF'}};s.getRow(s===detail?4:1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF0054FF'}};s.eachRow(row=>{row.alignment={vertical:'middle',wrapText:true};row.height=Math.min(100,Math.max(24,Math.ceil(String(row.getCell(2).value||'').length/35)*18));});s.views=[{state:'frozen',ySplit:s===detail?4:1}];}return new Uint8Array(await wb.xlsx.writeBuffer());
}
export function downloadBlob(blob,filename){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}

function addContractSheet(wb,project,quote,images){
 const doc=quoteDocument(project,quote),d=doc.details,s=wb.addWorksheet('报价单',{pageSetup:{paperSize:9,orientation:'portrait',fitToPage:true,fitToWidth:1,fitToHeight:0,margins:{left:.35,right:.35,top:.45,bottom:.45,header:.15,footer:.15}}});
 s.columns=quoteColumnWidths.map(w=>({width:w*1.2}));
 const spans=[];const span=(row,a,b,value)=>{spans.push({row,a,b,value});if(a!==b)s.mergeCells(row,a,row,b);s.getCell(row,a).value=value;};
 span(1,1,12,company.name+'报价合同');
 span(2,1,2,'订单编号');span(2,3,6,project.id);span(2,7,7,'下单时间');span(2,8,9,d.orderDate);span(2,10,10,'计划交付时间');span(2,11,12,d.deliveryDate);
 for(const [r,left,value,right,other]of [[3,'甲方',d.buyer,'乙方',company.name],[4,'甲方联系人',d.buyerContact,'乙方联系人',company.contact],[5,'联系电话',d.buyerPhone,'联系电话',company.phone]]){span(r,1,2,left);span(r,3,6,value);span(r,7,8,right);span(r,9,12,other);}
 span(6,1,12,'项目信息：'+project.name);s.addRow(quoteColumns);
 for(const item of doc.rows){const r=s.addRow([item.index,item.name,'',item.process,item.material,item.finishing,item.weight,item.rate??'按项目 / 人工核价',item.quantity,item.unit,item.amount,item.remarks]);r.height=Math.max(62,Math.ceil(item.remarks.length/14)*10,Math.ceil(item.name.length/9)*10);for(const col of [7,8])r.getCell(col).numFmt='0.000';for(const col of [10,11])r.getCell(col).numFmt='0.00';if(images[item.id]){const id=wb.addImage({base64:images[item.id],extension:'png'});s.addImage(id,{tl:{col:2.1,row:r.number-1+.1},ext:{width:44,height:44},editAs:'oneCell'});}}
 let r=8+doc.rows.length;
 span(r,1,6,'总计数量：'+doc.quantity+' 件');span(r,7,10,'折前金额');span(r++,11,12,doc.base);
 span(r,1,6,`折扣：¥${doc.discount.toFixed(2)}；折后金额：¥${doc.net.toFixed(2)}`);span(r,7,10,`税额（${project.quoteSettings.taxPercent}%）`);span(r++,11,12,doc.tax);
 span(r,1,10,'含税总价');span(r++,11,12,doc.total);
 span(r++,1,12,'备注：'+d.notes);
 span(r++,1,12,'原材料单价为本次报价的元/g计价标准；单价为制造基础单价，小计另含组起步补差、后处理及设置费，详见行备注。重量为单件计价重量，几何估重不含支撑、填充，需复核。');
 for(const [i,term]of doc.terms.entries())span(r++,1,12,`${i+1}. ${term}`);
 span(r++,1,12,'按录入标准与人工核价计算，工程估算待复核；正式确认后生成交易归档。');
 for(const [label,value,label2,value2]of [['公司名称',company.name,'联系人',company.contact],['网站',company.website,'邮箱',company.email],['公司地址',company.address,'联系电话',company.phone]]){span(r,1,1,label);span(r,2,6,value);span(r,7,7,label2);span(r++,8,12,value2);}
 s.eachRow(row=>{if(!row.height)row.height=row.number===1?30:row.number===6?28:26;row.eachCell({includeEmpty:true},cell=>{cell.font={name:'Microsoft YaHei',size:9,color:{argb:'FF111111'}};cell.alignment={vertical:'middle',wrapText:true};cell.border=Object.fromEntries(['top','bottom','left','right'].map(side=>[side,{style:'thin',color:{argb:'FF222222'}}]));});});
 s.getCell('A1').font={name:'Microsoft YaHei',size:16,bold:true};s.getCell('A1').alignment={horizontal:'center',vertical:'middle'};s.getCell('A6').alignment={horizontal:'center',vertical:'middle'};s.getRow(7).font={name:'Microsoft YaHei',size:9,bold:true};s.getRow(7).height=32;s.getRow(12+doc.rows.length).height=42;
 // Excel does not auto-fit wrapped merged cells; size using the actual merged width.
 for(const {row,a,b,value}of spans){const width=Array.from({length:b-a+1},(_,i)=>s.getColumn(a+i).width).reduce((n,w)=>n+w,0)-2;const lines=String(value??'').split('\n').reduce((n,line)=>n+Math.max(1,Math.ceil([...line].reduce((count,ch)=>count+(ch.charCodeAt(0)>255?2:1),0)/width)),0);s.getRow(row).height=Math.max(s.getRow(row).height,lines*13+8);}

 s.pageSetup.printArea=`A1:L${r-1}`;s.pageSetup.printTitlesRow='7:7';s.headerFooter.oddFooter='第 &P 页 / 共 &N 页';s.views=[{state:'frozen',ySplit:7}];
}
