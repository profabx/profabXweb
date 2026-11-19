# 硅胶复模立体 GIF 修正

用户要求联网核对工艺、使用 GIF，并与其他卡片统一立体风格。原 casting 分支把复模画成逐层叠环，且与 CNC 共用说明索引，需同时修正画面与说明。

依据 WACKER Vacuum casting with silicone molds 六步流程、Renishaw Vacuum casting systems 第 4 页及 Smooth-On 两片硅胶模视频。蓝白等轴测立体画面包含：原型与浇道准备、浇注硅胶并固化、分模取出原型、合模真空浇注树脂、树脂固化、开模取件并去浇口。

三维阴模具有与阶梯圆柱原型一致的真实半圆模腔、浇道、排气道。开模旋转展示两片阴模；合模时透视显示连续树脂液面，避免错误的逐层打印表现。时间压缩，不表示实际工艺参数。

生成：先运行 scripts/render-silicone-casting-3d.cjs，以 scripts/silicone-casting-render.html 离线渲染；再运行 scripts/render-silicone-casting.py 编码。272 个源画面合并为 165 个 GIF 帧，总时长 21.76 秒，840×510，loop=0。网站仅加载 GIF/PNG，不额外加载三维引擎。

交付 public/assets/processes/silicone-vacuum-casting-3d.gif 和 -3d-poster.png。来源、阶段时间及编码信息存于 silicone-casting-sources.json。离屏、后台及减少动态效果时使用静态图；独立重播按钮不触发跳转。

验证 GIF 格式、循环、时长与关键帧；双版本检查实际帧变化、独立重播、CMF 链接、离屏与减少动态效果、移动端排版；构建并发布官网。

制造服务三张卡片改为数字制造、CNC 精密加工、硅胶复模；第三张复用立体 GIF。取原型阶段 4.48 秒、最终开模取件阶段 7.68 秒，分别放慢开模与抬升动作，去浇口后保留成品对比。
