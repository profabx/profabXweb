import rows from './cmf-matrix.json';
import Icon from './ui/Icon.jsx';
import './cmf-matrix.css';

const labels={
 '数字制造':['Digital fabrication','デジタル製造'],'查看原页面':['View source page','参照ページを見る'],'查看Wiki':['Open Wiki','Wikiを開く'],
 '塑料':['Polymers','樹脂'],'复合材料':['Composites','複合材料'],'金属':['Metals','金属'],'陶瓷 / 玻璃':['Ceramics / glass','セラミックス・ガラス'],'木材':['Wood','木材'],
 '树脂':['Resin','光硬化樹脂'],'尼龙':['Nylon','ナイロン'],'钢':['Steel','鋼'],'陶瓷':['Ceramics','セラミックス'],'铝合金':['Aluminum alloy','アルミニウム合金'],'钛合金':['Titanium alloy','チタン合金'],'钨合金':['Tungsten alloy','タングステン合金'],'铜合金':['Copper alloy','銅合金'],
 '注塑':['Injection molding','射出成形'],'硅胶覆膜':['Silicone molding','シリコーン成形'],'硅胶':['Silicone','シリコーン'],'钣金':['Sheet metal','板金'],'数控加工':['CNC machining','CNC加工'],'铣':['Milling','フライス加工'],'车':['Turning','旋削'],'激光切割':['Laser cutting','レーザー切断'],
 '镀锌板':['Galvanized sheet','亜鉛めっき鋼板'],'冷轧板':['Cold-rolled sheet','冷間圧延鋼板'],'亚克力':['Acrylic','アクリル'],'玻璃':['Glass','ガラス'],'胡桃木':['Walnut','ウォールナット'],'樱桃木':['Cherry wood','チェリー'],
 '我们提供批量生产前的相关服务！':['Services for every step before volume production.','量産前の各工程をサポートします。']
};
function kind(color){return color.includes('63, 81, 181')?'polymer':color.includes('52, 168, 83')?'composite':color.includes('128, 134, 139')?'metal':color.includes('138, 180, 248')?'ceramic':'wood';}
const url=path=>'https://profabx.com'+path;
export default function CmfMatrix({locale}){
 const text=value=>locale==='en'?(labels[value]?.[0]||value):locale==='ja'?(labels[value]?.[1]||value):value;
 const materials=(items,side)=><div className={'cmf-matrix-materials '+side}>{items.map((item,i)=><a key={item.path+i} href={url(item.path)} target="_blank" rel="noreferrer" className={'cmf-material-tile '+kind(item.color)}>{text(item.name)}</a>)}</div>;
 return <section className="cmf-matrix" aria-labelledby="cmf-matrix-title"><div className="cmf-matrix-heading"><h2 id="cmf-matrix-title">{text('数字制造')}</h2></div><div className="cmf-matrix-legend">{[['polymer','塑料'],['composite','复合材料'],['metal','金属'],['ceramic','陶瓷 / 玻璃'],['wood','木材']].map(([id,label])=><span key={id}><i className={id}/>{text(label)}</span>)}</div><div className="cmf-matrix-rows">{rows.map(row=><div className="cmf-matrix-row" key={row.id} data-process={row.name}>{materials(row.left,'left')}<a href={url(row.path)} target="_blank" rel="noreferrer" className={'cmf-process-tile '+(row.color.includes('234, 67, 53')||row.color.includes('244, 67, 54')?'forming':'')}><span>{text(row.name)}</span><Icon name="ArrowUpRight" size={16}/></a>{materials(row.right,'right')}</div>)}</div><p className="cmf-matrix-closing">{text('我们提供批量生产前的相关服务！')}</p></section>;
}

