# 硅胶复模 GIF 修正

用户指出原硅胶复模动画错误，并要求联网查资料、使用 GIF。根因：原 casting 分支复用了逐层叠环图形，说明索引与 CNC 共用。

依据 WACKER Vacuum casting with silicone molds 六步流程、Renishaw Vacuum casting systems 第 4 页及 Smooth-On 两片硅胶模视频。原创剖面图使用完全相同的轮廓生成灰色原型、白色阴模模腔、蓝色树脂件；连续液面填充，单独呈现硅胶固化和树脂固化，模具张开后取件、修整浇口。GIF 时间压缩，不表示实际工艺参数。

生成脚本 scripts/render-silicone-casting.py；188 个原始帧合并为 138 个 GIF 帧，总时长 15.04 秒、840×510、loop=0。配套末帧 PNG 用于减少动态效果及离屏情况。来源与阶段帧索引存于 public/assets/processes/silicone-casting-sources.json。

验证文件格式、帧时长、循环信息、阶段图；双版本浏览器验证 GIF 加载、重播不跳转、CMF 链接、离屏与减少动态效果；构建并发布官网。
