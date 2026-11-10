import {useSyncExternalStore} from 'react';
const key='profabx-admin-public-preview';
const snapshot=()=>{if(!__PROFABX_ADMIN__)return false;try{return localStorage.getItem(key)==='true';}catch{return false;}};
const subscribe=notify=>{if(!__PROFABX_ADMIN__)return()=>{};document.addEventListener('profabx-admin-preview-change',notify);return()=>document.removeEventListener('profabx-admin-preview-change',notify);};
export default function useAdminPreview(){return useSyncExternalStore(subscribe,snapshot,()=>false);}
