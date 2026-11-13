import {useRef,useState} from 'react';
import {calculateQuote,yuan} from './calculate.js';
import {applyDyeingPrices,dyeingPending,dyeingPrice,dyeingRequest,requestKey} from './dyeing.js';
import {downloadBlob} from '../export/quotation.js';
import Modal from '../ui/Modal.jsx';

function save(data,name){
 downloadBlob(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),name+'.json');
}

export default function DyeingReview({project,quote,canManage,prompt,onOpen,onClose,onApply,notify,t}){
 const [request,setRequest]=useState(null),[prices,setPrices]=useState({}),[message,setMessage]=useState('');
 const [received,setReceived]=useState(null);
 const input=useRef();
 const dyed=project.parts.filter(part=>part.config.postProcess==='染色');
 const pending=dyed.filter(dyeingPending);
 const target=request?.parts.filter(part=>part.config.postProcess==='染色')||dyed;
 const showEditor=canManage&&(prompt||request);
 const updatePrices=(id,value)=>setPrices(previous=>({...previous,[id]:value}));
 const read=async event=>{
  const file=event.target.files?.[0];event.target.value='';
  if(!file)return;
  try{
   if(file.size>2*1024*1024)throw Error('核价文件过大。');
   const data=JSON.parse(await file.text());
   if(data.version!==1)throw Error('不支持的核价文件版本。');
   if(canManage){
    if(data.type!=='profabx-dye-request'||typeof data.projectId!=='string'||!Array.isArray(data.parts)||data.parts.length>500||data.parts.some(part=>!part||typeof part.id!=='string'||typeof part.name!=='string'||!part.config)||new Set(data.parts.map(part=>part.id)).size!==data.parts.length||!data.parts.some(part=>part.config.postProcess==='染色'))throw Error('请选择公开版导出的染色核价请求。');
    calculateQuote(data.parts,data.quoteSettings);
    setRequest(data);setPrices({});setMessage('');
   }else{
    const current=dyeingRequest(project);
    if(data.type!=='profabx-dye-reply'||data.projectId!==project.id||data.requestKey!==await requestKey(current))throw Error('复报价与当前项目或参数不匹配。请按当前项目重新提交核价请求。');
    const next=applyDyeingPrices(project.parts,data.prices);
    const result=calculateQuote(next,project.quoteSettings);
    if(data.totalFen!==result.totalFen)throw Error('复报价金额校验失败。');
    onApply(data.prices,current);
    setReceived(result.totalFen);
    notify('已收到染色复报价，请查收。');
   }
  }catch(error){notify(error.message);}
 };
 const submit=async()=>{
  try{
   const data=request||dyeingRequest(project);
   const amounts=Object.fromEntries(target.map(part=>[part.id,prices[part.id]??dyeingPrice(part.config)??'']));
   const next=applyDyeingPrices(data.parts,amounts);
   const result=calculateQuote(next,data.quoteSettings);
   save({type:'profabx-dye-reply',version:1,projectId:data.projectId,requestKey:await requestKey(data),prices:amounts,totalFen:result.totalFen},data.projectId+'-染色复报价');
   if(!request)onApply(amounts,data);
   setMessage('复报价文件已下载，请将文件交给客户在公开版导入。');
  }catch(error){setMessage(error.message);}
 };
 return <>
  {(dyed.length>0||canManage)&&<section className="dye-review" aria-label="染色核价">
   {dyed.length>0&&<p>{pending.length
    ? `外包染色需人工核价，当前预估价不含染色零件的后处理费。待补充 ${pending.length} 项。`
    : '染色费用已计入报价。'} {quote&&yuan(quote.totalFen)}</p>}
   <div className="dye-review-actions">
    {canManage?<><button className="button secondary small" onClick={()=>input.current.click()}>导入染色核价请求</button>{dyed.length>0&&<button className="button secondary small" onClick={()=>{setRequest(null);setPrices({});setMessage('');onOpen();}}>填写染色单价</button>}</>
    : dyed.length>0&&<><button className="button secondary small" disabled={!quote||!pending.length} onClick={()=>save(dyeingRequest(project),project.id+'-染色核价请求')}>下载染色核价请求</button><button className="button secondary small" onClick={()=>input.current.click()}>导入染色复报价</button></>}
   </div>
   <input ref={input} type="file" accept=".json" hidden onChange={read}/>
  </section>}
  {showEditor&&<Modal title="外包染色 · 补充人工核价" t={t} onClose={()=>{setRequest(null);setPrices({});setMessage('');onClose();}}>
   <div className="modal-body">
    <p>请填写每个零件的染色单价（元/件）。免费请输入 0。</p>
    {target.map(part=><label key={part.id} className="field-row"><span>{part.name}</span><input type="number" min="0" max="100000000" step="0.01" aria-label={part.name+' 染色单价（元/件）'} value={prices[part.id]??dyeingPrice(part.config)??''} onChange={e=>updatePrices(part.id,e.target.value)}/></label>)}
    {message&&<p role="status">{message}</p>}
   </div>
   <div className="modal-footer"><button className="button primary" onClick={submit}>生成并下载复报价</button></div>
  </Modal>}
  {!canManage&&prompt&&<Modal title="染色需人工核价" t={t} onClose={onClose}><div className="modal-body"><p>当前先按无后处理价格预估染色零件。请下载核价请求交给管理人员，收到复报价文件后在此导入。</p></div><div className="modal-footer"><button className="button primary" onClick={onClose}>知道了</button></div></Modal>}
  {received!==null&&<Modal title="请查收染色复报价" t={t} onClose={()=>setReceived(null)}><div className="modal-body"><p>已导入复报价，含税合计 {yuan(received)}。</p></div><div className="modal-footer"><button className="button primary" onClick={()=>setReceived(null)}>查收</button></div></Modal>}
 </>;
}
