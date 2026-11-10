// Included only in the loopback management build, never in the public build.
(()=>{
 const key='profabx-admin-public-preview',event='profabx-admin-preview-change';
 if(document.getElementById('profabx-admin-view-toggle'))return;
 let preview=false;try{preview=localStorage.getItem(key)==='true';}catch{}
 const style=document.createElement('style');style.textContent=`#profabx-admin-view-toggle{position:fixed;right:max(14px,env(safe-area-inset-right));bottom:max(14px,env(safe-area-inset-bottom));z-index:2147483646;display:flex;align-items:center;gap:7px;min-height:42px;margin:0;padding:9px 13px;border:1px solid #b8cbef;border-radius:8px;background:#fff;color:#0054ff;box-shadow:0 3px 15px #23436624;font:13px/1.4 system-ui;cursor:pointer}#profabx-admin-view-toggle[aria-pressed=true]{background:#edf3ff}#profabx-admin-view-toggle:focus-visible{outline:3px solid #96b5ff;outline-offset:2px}@media print{#profabx-admin-view-toggle{display:none!important}}`;document.head.append(style);
 const button=document.createElement('button');button.id='profabx-admin-view-toggle';button.className='admin-preview-corner';button.type='button';
 function render(){button.textContent=preview?'↥ 恢复管理视图':'↧ 收起 · 公开版预览';button.setAttribute('aria-label',preview?'恢复内部管理视图':'收起内部管理内容，模拟公开版');button.setAttribute('aria-pressed',String(preview));button.title=preview?'当前为公开版预览，点击恢复管理版':'当前为管理版，点击模拟公开版';document.documentElement.dataset.adminPublicPreview=String(preview);document.dispatchEvent(new CustomEvent(event,{detail:preview}));const editor=document.getElementById('admin-rule-editor'),notice=document.getElementById('admin-rule-preview-notice');if(editor)editor.hidden=preview;if(notice)notice.hidden=!preview;}
 button.onclick=()=>{preview=!preview;try{localStorage.setItem(key,String(preview));}catch{}render();};
 function mount(){(document.fullscreenElement||document.body).append(button);}
 document.addEventListener('fullscreenchange',mount);
 window.addEventListener('storage',e=>{if(e.key===key){preview=e.newValue==='true';render();}});
 mount();render();
})();
