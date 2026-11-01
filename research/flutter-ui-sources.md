# Flutter UI 组件来源核查

核查日期：2026-11-01（Asia/Singapore）。本记录只依据项目官网、项目官方 GitHub、pub.dev 包元数据 API 与分析标签。版本与发布日期为核查时快照，不代表永远最新；本次没有安装这些包或编译其示例，不能把平台标签或分析结果当作实际兼容性验收。

## 可纳入工具集的主要组件

| 名称 / 包名 | 归属与用途 | 官方入口 / 源码 | 许可核查 | 维护证据与选型边界 |
| --- | --- | --- | --- | --- |
| TDesign Flutter / `tdesign_flutter` | 腾讯 TDesign 官方；移动端设计系统、表单、导航、反馈等基础组件 | [官网](https://tdesign.tencent.com/flutter/overview)、[腾讯仓库](https://github.com/Tencent/tdesign-flutter)、[pub.dev](https://pub.dev/packages/tdesign_flutter) | MIT；[LICENSE](https://github.com/Tencent/tdesign-flutter/blob/develop/LICENSE) | [包 API](https://pub.dev/api/packages/tdesign_flutter)：1.1.0，发布 2026-10-28；Flutter 最低 3.32.0、Dart 最低 3.8.0。最新 score 暂只返回 publisher 标签，不能据此推断不支持平台；应以实际组件与项目目标平台验证。 |
| Forui / `forui` | Duobase 社区维护；受 shadcn/ui 启发的简洁组件，适合桌面与触屏界面 | [官网](https://forui.dev/)、[仓库](https://github.com/duobaseio/forui)、[pub.dev](https://pub.dev/packages/forui) | 组件 MIT；随包 Inter 字体 OFL-1.1，不能只标成单一 MIT；[包 LICENSE](https://github.com/duobaseio/forui/blob/main/forui/LICENSE) | [包 API](https://pub.dev/api/packages/forui)：0.27.7，发布 2026-10-26；当前最低 Flutter `>=3.47.0-0`。版本迭代较快，应先核对项目 SDK 与迁移指南。 |
| Flutter shadcn UI / `shadcn_ui` | nank1ro / mariuti 社区移植；shadcn 风格的可定制 UI，并非 Web shadcn/ui 作者的 Flutter 官方版本 | [文档](https://mariuti.com/flutter-shadcn-ui)、[仓库](https://github.com/nank1ro/flutter-shadcn-ui)、[pub.dev](https://pub.dev/packages/shadcn_ui) | MIT；[仓库](https://github.com/nank1ro/flutter-shadcn-ui)许可证 | [包 API](https://pub.dev/api/packages/shadcn_ui)：0.57.4，发布 2026-10-30；最低 Flutter 3.41.0、Dart 3.11.0。不要与 `shadcn_flutter` 混为同一个包。最新 score 尚缺完整分析标签。 |
| shadcn_flutter / `shadcn_flutter` | sunarya-thito 社区；另一个独立的 shadcn 风格 Flutter 组件生态 | [仓库与文档入口](https://github.com/sunarya-thito/shadcn_flutter)、[pub.dev](https://pub.dev/packages/shadcn_flutter) | BSD-3-Clause；[仓库](https://github.com/sunarya-thito/shadcn_flutter)许可证 | [包 API](https://pub.dev/api/packages/shadcn_flutter)：0.0.55，发布 2026-10-01；最低 Flutter 3.47.0、Dart 3.13.0。与 `shadcn_ui` 是不同维护者与 API，不能直接替换。 |
| Fluent UI / `fluent_ui` | bdlukaa 社区实现 Windows / WinUI 3 视觉；不是微软官方 Flutter 库 | [演示](https://bdlukaa.github.io/fluent_ui/#/)、[仓库](https://github.com/bdlukaa/fluent_ui)、[pub.dev](https://pub.dev/packages/fluent_ui) | BSD-3-Clause；[仓库](https://github.com/bdlukaa/fluent_ui)许可证 | [包 API](https://pub.dev/api/packages/fluent_ui)：4.17.0，发布 2026-10-19；[分析标签](https://pub.dev/api/packages/fluent_ui/score)含 Flutter Favorite 与六平台。适合 Windows 风格桌面应用；组件为 Flutter 绘制，不等于原生 WinUI 控件。 |
| macOS UI / `macos_ui` | GroovinChip 社区维护，macOS 设计语言的 Flutter 控件和主题；不是 Apple 官方库 | [官网](https://macosui.dev)、[仓库](https://github.com/GroovinChip/macos_ui)、[pub.dev](https://pub.dev/packages/macos_ui) | MIT；[仓库](https://github.com/GroovinChip/macos_ui)许可证 | [包 API](https://pub.dev/api/packages/macos_ui)：2.2.2，发布 2025-10-19；[分析标签](https://pub.dev/api/packages/macos_ui/score)平台为 macOS，含 Flutter Favorite。适合 macOS 桌面，不应当作通用移动端套件推荐。 |
| GetWidget / `getwidget` | GetWidget 团队；按钮、卡片、轮播、表单等通用 UI 集合 | [仓库](https://github.com/ionicfirebaseapp/getwidget)、[pub.dev](https://pub.dev/packages/getwidget) | MIT；[仓库](https://github.com/ionicfirebaseapp/getwidget)许可证 | [包 API](https://pub.dev/api/packages/getwidget)：7.0.2，发布 2026-05-24；[分析标签](https://pub.dev/api/packages/getwidget/score)覆盖六平台。是现成组件集合；组件外观与交互需结合品牌规范评估。 |
| Bruno / `bruno` | 贝壳 / 链家 LianjiaTech；面向移动端业务应用的企业级 Flutter 设计系统 | [官网](https://bruno.ke.com/)、[仓库](https://github.com/LianjiaTech/bruno)、[pub.dev](https://pub.dev/packages/bruno) | MIT；[仓库](https://github.com/LianjiaTech/bruno)许可证 | [包 API](https://pub.dev/api/packages/bruno)：3.4.3，发布 2023-09-13；[仓库 API](https://api.github.com/repos/LianjiaTech/bruno)最后 push 2025-01-10、未归档。发布较旧，需验证当前 Flutter SDK 和依赖约束；不能因企业归属就默认持续维护。 |
| Smart Dialog / `flutter_smart_dialog` | FlutterCandies 社区；Toast、Loading、Dialog 与弹层管理专项 UI | [仓库](https://github.com/fluttercandies/flutter_smart_dialog)、[pub.dev](https://pub.dev/packages/flutter_smart_dialog) | MIT；[仓库](https://github.com/fluttercandies/flutter_smart_dialog)许可证 | [包 API](https://pub.dev/api/packages/flutter_smart_dialog)：5.3.0，发布 2026-08-23；当前最低 Flutter 3.44.0、Dart 3.12.0。是弹层专项库，不是一套完整设计系统；需验证返回键、导航生命周期、键盘和无障碍。 |

上述「适合」「需验证」是基于组件定位、API 约束和维护证据的编辑判断，不是官方质量保证。对于 Flutter 自带的 Material、Cupertino，优先参阅 [Flutter 官方组件目录](https://docs.flutter.dev/ui/widgets)，无需额外添加 pub 包。

## 有出处但应标记历史参考的候选

| 名称 / 包名 | 来源与归属 | 许可与事实 | 建议处理 |
| --- | --- | --- | --- |
| Flukit / `flukit` | FlutterChina 社区；ScaleView、Swiper、水印、进度指示器等；[仓库](https://github.com/flutterchina/flukit)、[包](https://pub.dev/packages/flukit) | [包 API](https://pub.dev/api/packages/flukit)明确 `isDiscontinued: true`，最新 3.0.1 发布于 2022-06-21；[分析 API](https://pub.dev/api/packages/flukit/score)含 `is:discontinued`、`is:unlisted`、`has:error`、`license:mit`。仓库根路径 LICENSE 未找到，许可标签依据 pub 发布物分析，不推断仓库全部文件授权。 | 展示「已停止维护 / 历史参考」，不作为新项目默认候选。SDK 上限 `<3.0.0` 本身不能单独证明 Dart 3 不兼容；不把它写成唯一否定证据。 |
| Platform Widgets / `flutter_platform_widgets` | stryder-dev 社区；统一封装 Material 与 Cupertino 组件；[仓库](https://github.com/stryder-dev/flutter_platform_widgets)、[包](https://pub.dev/packages/flutter_platform_widgets) | MIT；[包 API](https://pub.dev/api/packages/flutter_platform_widgets)明确 `isDiscontinued: true`，最新 10.0.1 发布 2026-01-14；[分析 API](https://pub.dev/api/packages/flutter_platform_widgets/score)含 `is:discontinued`、`is:unlisted`，也含 `is:dart3-compatible`。 | 发布新近与停止维护可以同时成立。应标记已停用，不仅按发布日期排序后推荐。 |
| ScrollKit / `scroll_kit` | 字节跳动官方 bytedance 组织；列表按索引跳转、滚动、双向加载和复用；[仓库](https://github.com/bytedance/scroll_kit)、[包](https://pub.dev/packages/scroll_kit) | [LICENSE](https://github.com/bytedance/scroll_kit/blob/main/LICENSE)含 ByteDance 和来源项目的 MIT 许可；GitHub 页面明确 2025-04-08 归档。[包 API](https://pub.dev/api/packages/scroll_kit)：0.1.0，发布 2022-09-19；[分析标签](https://pub.dev/api/packages/scroll_kit/score)含 `is:dart3-compatible`。 | 可满足「了解字节 Flutter 开源」的历史检索需求；必须显示已归档。它是滚动专项组件，不是 Arco / Semi 的 Flutter 版本，不推荐直接作为新项目基础。 |
| FlutterGo / 无通用组件包 | 阿里巴巴官方 alibaba 组织；Flutter 组件示例与中文学习 App；[仓库](https://github.com/alibaba/flutter-go) | [README](https://github.com/alibaba/flutter-go/blob/master/README.md)明确因团队调整「暂停维护」；[LICENSE](https://github.com/alibaba/flutter-go/blob/master/LICENSE)是 BSD 风格三条款文本。它不是可直接依赖的完整 UI 组件库。 | 仅放学习参考或研究记录；不能伪造 `flutter pub add flutter_go` 的通用安装方案，不能与 TDesign Flutter 等价呈现为持续维护的 UI 套件。 |

## 字节与阿里归属边界

本次检查了字节官方 ScrollKit、[Arco Design React 仓库](https://github.com/arco-design/arco-design)、[Arco Design Vue 仓库](https://github.com/arco-design/arco-design-vue)、[Semi Design 仓库](https://github.com/DouyinFE/semi-design)以及相关 Flutter pub 包。Arco / Semi 的上述官方仓库分别定位为 React / Vue 或 React；本核查没有找到它们对应的官方 Flutter 全套组件发布证据。这个结论只限本次检索范围，不是声称字节从未发布其他 Flutter 工具。

阿里 FlutterGo 是真实官方学习项目，但已暂停维护；不能因为阿里 Web 有 Ant Design / Ant Design Web3，就把名称含 Ant Design 的第三方 Flutter 包标成蚂蚁官方。微软 Fluent 与 Apple macOS 的视觉复刻库同样需要显示社区身份。

## 维护与兼容性解释

- 包版本、发布日期、环境约束使用 `https://pub.dev/api/packages/<name>`；维护停止标记优先看该响应的 `isDiscontinued`。
- 平台、许可证、Dart 3 分析标签使用 `https://pub.dev/api/packages/<name>/score`。新发布物可能尚未得到完整分析，缺标签不能推断不支持。
- GitHub 仓库是否归档、最后 push 使用对应 `https://api.github.com/repos/<owner>/<repo>`；push 时间不是稳定版本发布日期，也不代表修复承诺。
- 许可优先读实际 LICENSE。Forui 的字体单独许可，以及 ScrollKit 保留第三方来源许可，都说明「包使用某开源许可」不应被解释成可以忽略附带 NOTICE、字体与其他文件的授权。
- 本次只建立选型目录，不安装第三方组件，不复制 UI 库实现，不对当前 SDK 的编译结果作未经运行的保证。
