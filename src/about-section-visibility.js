// 2026-11-01：按要求临时隐藏，非删除。原文完整保留于 about-content.json。
// 独立备份：D:/PROFABX/web/work/about-hidden-sections-20261101/before.zip 与 sections.json。
// 恢复：将需要显示的开关设为 true，然后重新构建网站；两个区块可以分别恢复。
export const aboutSectionVisibility={
 qualityControl:false, // 全流程质量管控（intro-quality）
 history:false // 发展历程（intro-history）
};
export function visibleAboutContent(html,visibility=aboutSectionVisibility){
 return [['qualityControl','intro-quality'],['history','intro-history']].reduce((content,[key,id])=>visibility[key]?content:content.replace(new RegExp('<section id="'+id+'"[\\s\\S]*?</section>'),'<!-- '+id+' temporarily hidden; see about-section-visibility.js -->'),html);
}
