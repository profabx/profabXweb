const button=document.getElementById('cmf-directory-toggle');
function closeMenu(){document.documentElement.removeAttribute('data-mobile-menu-expanded');button.setAttribute('aria-expanded','false');}
button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';document.documentElement.toggleAttribute('data-mobile-menu-expanded',open);button.setAttribute('aria-expanded',String(open));});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const main=document.querySelector('main'),overview=document.createElement('div');
overview.className='cmf-overview';while(main.firstChild)overview.append(main.firstChild);main.append(overview);
const viewer=document.createElement('section');viewer.className='cmf-inline-viewer';viewer.hidden=true;viewer.setAttribute('aria-label','CMF 资料阅读');
const toolbar=document.createElement('div');toolbar.className='cmf-reader-toolbar';
const back=document.createElement('button');back.type='button';back.textContent='← 返回总览';
const heading=document.createElement('strong');const source=document.createElement('a');source.textContent='在新窗口查看原页 ↗';source.target='_blank';source.rel='noopener noreferrer';source.dataset.readerSource='true';
const note=document.createElement('p');note.className='cmf-reader-note';note.textContent='正在加载资料；如内容未显示，可使用右上方原页入口。';note.setAttribute('role','status');
const article=document.createElement('article');article.className='cmf-reader-article sl-markdown-content';
toolbar.append(back,heading,source);viewer.append(toolbar,note,article);main.append(viewer);
const articlesReady=Promise.resolve(window.__cmfArticles||{});let reading=0;
async function showArticle(url){const ticket=++reading;article.replaceChildren();try{const articles=await articlesReady;if(ticket!==reading)return;const path=new URL(url).pathname.replace(/\/+$/,''),entry=articles[path]||Object.entries(articles).find(([key])=>key.toLowerCase()===path.toLowerCase())?.[1];if(!entry){note.textContent='该条目的原站链接暂不可用，尚无可展示的正文。可通过原页入口核实。';return;}const title=document.createElement('h1');title.textContent=entry.title;const body=document.createElement('div');body.innerHTML=entry.html;article.append(title,body);note.textContent='ProFabX 资料正文 · 本地收录于 2026-10-31';}catch{if(ticket===reading)note.textContent='资料加载失败，请刷新页面重试，或通过原页入口查看。';}}
const normalize=value=>new URL(value,location.href).pathname.replace(/\/+$/,'')||'/';
function activate(url,label){const path=normalize(url);let matched=false;document.querySelectorAll('.sidebar a').forEach(a=>{const selected=!matched&&normalize(a.href)===path;if(selected)matched=true;a.classList.toggle('cmf-current',selected);if(selected){a.setAttribute('aria-current','page');let parent=a.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}}else a.removeAttribute('aria-current');});
 const selected=document.querySelector('.sidebar a.cmf-current');if(selected)selected.scrollIntoView({block:'nearest'});
 overview.hidden=true;viewer.hidden=false;heading.textContent=label||selected?.textContent.trim()||'资料详情';source.href=url;note.textContent='正在加载资料；如内容未显示，可使用右上方原页入口。';showArticle(url);closeMenu();main.scrollIntoView({block:'start'});
}
back.addEventListener('click',()=>{location.hash='';});
function route(){if(location.hash.startsWith('#read=')){try{const path=decodeURIComponent(location.hash.slice(6)),url=new URL(path,'https://profabx.com');if(url.origin==='https://profabx.com'&&url.pathname.startsWith('/prototype/')){activate(url.href);return;}}catch{}}
 viewer.hidden=true;overview.hidden=false;reading++;article.replaceChildren();document.querySelectorAll('.sidebar a.cmf-current').forEach(a=>{a.classList.remove('cmf-current');a.removeAttribute('aria-current');});closeMenu();}
window.addEventListener('hashchange',route);
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||a.dataset.readerSource||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;let url;try{url=new URL(a.href);}catch{return;}if(url.origin!=='https://profabx.com'||!url.pathname.startsWith('/prototype/'))return;e.preventDefault();const hash='#read='+encodeURIComponent(url.pathname+url.search+url.hash);if(location.hash===hash)activate(url.href,a.textContent.trim());else location.hash=hash;});
document.querySelector('starlight-theme-select select')?.addEventListener('change',e=>{document.documentElement.dataset.theme=e.target.value==='auto'?(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):e.target.value;});
route();
