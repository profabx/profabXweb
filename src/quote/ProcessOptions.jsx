import {isExternalProcess} from './catalog.js';
// Group ownership once in the menu; keep stored process values unchanged.
export default function ProcessOptions({items,t=value=>value}){
 const own=items.filter(p=>!isExternalProcess(p)),external=items.filter(isExternalProcess);
 return <>{own.length>0&&<optgroup label={t('自有能力')}>{own.map(p=><option key={p} value={p}>{t(p)}</option>)}</optgroup>}{own.length>0&&external.length>0&&<option disabled value="__process_separator" aria-hidden="true">────────────────</option>}{external.length>0&&<optgroup label={t('外包协作')}>{external.map(p=><option key={p} value={p}>{t(p)}</option>)}</optgroup>}</>;
}
