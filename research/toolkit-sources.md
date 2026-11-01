# 开源组件工具集：来源与维护说明

人工核查与注册表采集日期：2026-11-01（Asia/Singapore）。本轮将既有 PromptCode 站点扩展为开发资源工具集，目录保存在 data/toolkit-library.json，Markdown 由同一数据生成，避免网页和文档分别维护。

## 收录范围与官方来源

本次共 94 项：Web UI 27 项、Flutter UI / 专项组件和历史示例 13 项、Flutter 常用包 54 项。目录条目的用途、适合场景和注意事项为原创选型判断；版本、约束、许可和平台为来源快照，没有安装、执行或编译收录的组件。

| 体系 / 来源 | 本次条目与依据 |
| --- | --- |
| [Ant Design](https://ant.design/)、[Web3](https://web3.ant.design/)、[ProComponents](https://procomponents.ant.design/)、[Mobile](https://mobile.ant.design/) | 蚂蚁 / Ant Design 生态，分别是 React 通用组件、DApp 组件、业务封装和移动 Web。Web3 首页明确由 ZAN Team 与 Ant Design Community 制作，不将所有 Ant Design 周边包描述成单一厂商独立维护。[Web3 LICENSE](https://github.com/ant-design/ant-design-web3/blob/main/LICENSE)为 MIT；其 npm 最新包未声明 license 字段，保留人工 LICENSE 核查作为补充。 |
| [腾讯 TDesign](https://github.com/Tencent/tdesign) | React 桌面、Vue 3、React 移动端分别使用 tdesign-react、tdesign-vue-next、tdesign-mobile-react。Flutter 单独收录，不把 Web 包当跨端 Flutter 包。 |
| [Arco React](https://github.com/arco-design/arco-design)、[Arco Vue](https://github.com/arco-design/arco-design-vue)、[Semi](https://github.com/DouyinFE/semi-design) | 字节生态；Arco 的 React / Vue 是独立实现，Semi 为 React。没有可靠证据支持将它们描述为官方 Flutter 完整 UI 库。 |
| [Alibaba Fusion](https://github.com/alibaba-fusion/next) | @alifd/next 是 Fusion 的 React 实现；与 Ant Design 区分。 |
| [Element Plus](https://element-plus.org/)、[Naive UI](https://www.naiveui.com/)、[Vant](https://vant-ui.github.io/vant/)、[NutUI](https://nutui.jd.com/) | Vue 企业 / 通用与移动组件。Nuxt、React、Taro、小程序等其他实现不自动包含在当前包中。NutUI 的 npm latest 当前指向 beta，页面只写注册表快照，不宣称稳定版。 |
| [MUI](https://mui.com/material-ui/)、[Chakra](https://chakra-ui.com/)、[Mantine](https://mantine.dev/) | 国际 React 通用组件；MUI 基础库和 X 的部分商业功能区分。 |
| [Radix](https://www.radix-ui.com/primitives)、[shadcn/ui](https://ui.shadcn.com/)、[Reka](https://reka-ui.com/) | 分别是 React 交互原语、按源码引入的组件、Vue 交互原语。shadcn npm 包是 CLI，使用 npx 初始化，不伪装成运行时组件依赖。 |
| [Fluent React](https://react.fluentui.dev/)、[Carbon](https://carbondesignsystem.com/)、[Primer React](https://primer.style/product/components/) | 分别由 Microsoft、IBM、GitHub 设计体系提供；Flutter 中同名风格移植不据此获得官方身份。 |
| [Vuetify](https://vuetifyjs.com/)、[daisyUI](https://daisyui.com/)、[Bootstrap](https://getbootstrap.com/) | Vue Material 与 CSS 组件路线，按实际技术栈归类。CSS 外观类不等于完整交互行为。 |

各条目的确切 npm 包名、官网与仓库链接在目录和 docs/toolkit-guide.md 中保留。Flutter UI 的企业归属、许可及历史状态详见 [专项核查](flutter-ui-sources.md)。

## Flutter 常用包的采集依据

从 [pub.dev](https://pub.dev/) 为 54 个用途明确的包分别获取第一方 API，不以聚合导航的热度、下载量或营销文字代替包本身定位。包括用户给定的 [Fluro](https://pub.dev/packages/fluro)，同时列出 [go_router](https://pub.dev/packages/go_router)与 [auto_route](https://pub.dev/packages/auto_route)供路由选型比较。

覆盖路由、状态、依赖注入、网络、模型生成、持久化、文件、媒体、图表、表单、国际化、平台能力、后台任务、WebView、扫码地图、测试和监控等。Flutter 官方 SDK 自带 Material / Cupertino 和测试工具不伪造为需下载安装的第三方包，提供 [官方组件目录](https://docs.flutter.dev/ui/widgets)入口。

## 元数据字段的含义与局限

- npm：逐包请求 `https://registry.npmjs.org/<encoded-package-name>/latest`，记录注册表版本、license、peerDependencies。这里的 latest 是发布者指定的标签，不额外声称为稳定发行版，也不将 npm 包版本与文档主版本混为一谈。
- pub.dev：逐包请求 `https://pub.dev/api/packages/<name>`，记录 latest.version、latest.published、pubspec.environment 与 isDiscontinued。Dart 旧上限 `<3.0.0` 不能单独证明不兼容 Dart 3，目录只忠实呈现约束。
- pub.dev 分析：逐包请求 `https://pub.dev/api/packages/<name>/score`，使用 platform 与 license 标签及 is:discontinued / is:unlisted。未返回分析标签不等于没有平台支持或没有开源许可。TDesign、shadcn_ui 的 MIT 已另读官方源码 LICENSE；go_router、flutter_svg、lottie、mobile_scanner 的分析暂缺许可标签，补充核对各包 pub.dev 的 License 页面；Forui 包含 MIT 与 OFL-1.1 字体许可，保留二者。
- SDK 下限、Flutter 版本和平台能力会变；安装命令仅作为官方包的接入起点，不锁定旧快照版本，不执行命令，不代表已通过目标项目编译。
- 默认隐藏停止维护 / 弃用、已归档、暂停维护条目。本轮 4 项为 Flukit、flutter_platform_widgets、字节 ScrollKit、阿里 FlutterGo。Fluro、Bruno 发布较旧只提示核对，不将「旧发布」等同于「已停止维护」。
- 各来源网址随条目保留，人工检查的 license_review 另有原始 LICENSE 链接；运行 `npm run refresh:toolkit` 主动更新注册表数据，遇到失败保留原快照、写入 refresh_error 并以非零状态退出。
- 只导引到官方项目与原作者源码，不捆绑第三方组件实现。服务 SDK、商业扩展、字体、地图瓦片和 SaaS 的授权及计费需要分别看实际条款。
