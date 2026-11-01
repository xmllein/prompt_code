# 第三方动效资源

动效词典使用固定 npm 发布包，自托管必要浏览器资源，不向演示网站或 CDN 请求动画脚本。中文说明、场景选择与预览编排为本项目原创。

## Animate.css 4.1.1

安装制品：`animate.css@4.1.1`，[npm发布元数据](https://registry.npmjs.org/animate.css/4.1.1)。此发布物的 `LICENSE`、CSS文件头和npm元数据均为MIT；构建复制原始许可到 `vendor/animate.LICENSE.txt`，CSS版权标识保持不变。

官方GitHub主分支当前存在不同许可，不能因版本字符串相同而混用。本项目只使用lockfile锁定的npm发布物。[许可差异核查](research/motion-sources.md)

## GSAP 3.15.0

安装制品：`gsap@3.15.0`，[npm发布元数据](https://registry.npmjs.org/gsap/3.15.0)。GSAP使用[Standard no-charge专用许可](https://gsap.com/standard-license)，并非MIT。

本项目仅用固定代码展示GSAP核心、ScrollTrigger和Flip概念。脚本中的GreenSock版权、许可与来源标识原样保留，另提供 `vendor/GSAP-NOTICE.txt` 指向完整条款。此画廊不是可视化无代码动画构建器；如果将来扩展为类似产品，应重新检查适用条款。

## 分发与构建

`npm ci`安装锁定依赖；`scripts/sync-motion-assets.mjs`校验版本并复制资源及许可标识；静态构建包含这些必要文件。生成的 `web/vendor/` 与 `dist/` 不提交Git，由构建重建。

## 组件工具集收录说明

`data/toolkit-library.json` 与 `docs/toolkit-guide.md` 是人工整理的项目介绍、选型说明和官方注册表元数据快照，仅链接第三方项目，没有将其 UI 实现、图片、商标图形或源码捆绑到站点。各项目名称、商标及第三方实现属于其权利人；实际使用需核对具体版本的 LICENSE、NOTICE、字体和商业扩展条款。Forui 的许可快照同时记录 MIT 与 OFL-1.1。包版本、许可标签不构成兼容或授权保证。
