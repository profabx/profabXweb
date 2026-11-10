import {useState} from 'react';
import Icon from '../ui/Icon.jsx';
import {downloadBlob} from './quotation.js';
import {buildSlicerProject,slicerTargets} from './slicerProject.js';
export default function ExportTools({project,quote,busy,onQuote,notify,t}){
 const [exporting,setExporting]=useState(false),[target,setTarget]=useState('bambu'),parts=project.parts;
 async function exportSlicer(){setExporting(true);try{const bytes=await buildSlicerProject(project,target);downloadBlob(new Blob([bytes],{type:'model/3mf'}),`ProFabX-${project.id}.3mf`);notify(t('已导出可编辑3MF，请在拓竹切片软件中打开；切片参数使用软件中的设置。'));}catch(error){notify(error.message);}finally{setExporting(false);}}
 return <section className="confirmation-export-tools" aria-label={t('导出工具')}><h3><Icon name="Download" size={18}/>{t('导出工具')}</h3><div className="confirmation-export-buttons"><button className="button primary" disabled={!quote||!parts.length||busy||exporting} onClick={onQuote}><Icon name="Download"/>{t('导出报价')}</button>{slicerTargets.length>1&&<select aria-label={t('导出目标软件')} value={target} onChange={e=>setTarget(e.target.value)}>{slicerTargets.map(item=><option key={item.id} value={item.id}>{t(item.label)}</option>)}</select>}<button className="button secondary" disabled={!parts.length||busy||exporting||parts.some(p=>!p.unitConfirmed)} onClick={exportSlicer}><Icon name={exporting?'LoaderCircle':'Printer'}/>{t('导出零件至')}{t(slicerTargets.find(item=>item.id===target).label)}</button></div></section>;
}
