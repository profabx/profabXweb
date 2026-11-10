# 本机管理版

- 公开版：pnpm build，输出 dist，GitHub Pages 只发布此目录。
- 管理版：pnpm run build:admin，输出 dist-admin；pnpm admin 仅监听 127.0.0.1:4185。
- Windows：运行启动管理版.cmd；窗口需保持运行。该脚本不会启动或改动切片软件。
- 管理工作台：http://127.0.0.1:4185/prototype.html
- 规则编辑：http://127.0.0.1:4185/rules
- 默认文档目录 D:/PROFABX/web，仅允许 quotation.md、risk.md；可用 PROFABX_RULES_ROOT 为测试或迁移指定目录。
- 保存草稿后进行结构校验，再应用到正式文档。草稿和原文备份位于 .rule-drafts；内容变化或正式文件被外部修改后需要重新校验／读取合并。
- 文档结构校验不等同于业务逻辑校验。正式文档更新不会自动改写自然语言对应的计价／风险代码；后续应将确认规则同步实现、测试和发布。
- 仅本机访问，无跨站写入权限；Host、Origin、随机会话令牌、文件名白名单共同限制编辑请求。仅供受信任的本机用户使用，不作为公网认证系统。
