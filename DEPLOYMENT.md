# 后续发布约定

用户于 2026-11-10 明确要求：之后每次网站改动都同步更新到 https://profabx.com/ 。

- 官网仓库：https://github.com/profabx/profabXweb；分支 main。
- 当前克隆：D:\C Pan\github克隆\profabXweb。
- 本地预览工程：D:\PROFABX\web\outputs\ProFabXweb；预览 http://127.0.0.1:4173/。
- 每次改动完成后运行与变更相称的验证、构建，更新 CHANGELOG.md，提交并推送官网仓库，检查对应 GitHub Actions 成功及线上页面版本。
- 用户已授权上述每次改动的发布，无需重复请求业务确认。操作系统权限仍需遵守。
- 工具账户不能访问 Git 元数据或 Windows 凭据时，准备好具体发布脚本，交由桌面账号执行，随后检查部署；不得将准备完成表述为上线完成。
- 仅提交网站所需内容；不提交客户原始案例、账号配置、本地缓存或切片软件二进制，不修改原版 Bambu。
