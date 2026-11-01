# 开源组件工具集

收录 94 项：Web UI 27 项、Flutter UI 13 项、Flutter 常用包 54 项。人工整理日期 2026-11-01；注册表元数据快照 2026-11-01。

网页入口为站点的 /toolkit.html，支持搜索、来源 / 用途 / 技术栈筛选、场景组合、收藏、安装命令与选型信息复制、筛选结果 JSON 导出。

版本与许可为采集快照，不代表永久最新。只建立目录，没有安装或运行第三方库。平台分析标签不等于实际编译验证，缺少标签不代表不支持。完整 UI 库、专项组件、源码组件和历史示例在用途与说明中区分；已归档、暂停或停止维护的条目默认隐藏。

Flutter 自带的 Material / Cupertino 请参阅 [官方组件目录](https://docs.flutter.dev/ui/widgets)，无需第三方包。

## 场景组合

### Flutter 应用起步

路由 · 状态 · 网络 · 数据模型 · 偏好存储。状态管理也可换用 flutter_bloc；Freezed 和 JSON 生成器需对应注解包。

- [TDesign Flutter](https://tdesign.tencent.com/flutter/overview)
- [go_router](https://pub.dev/packages/go_router)
- [flutter_riverpod](https://pub.dev/packages/flutter_riverpod)
- [dio](https://pub.dev/packages/dio)
- [freezed](https://pub.dev/packages/freezed)
- [json_serializable](https://pub.dev/packages/json_serializable)
- [build_runner](https://pub.dev/packages/build_runner)
- [shared_preferences](https://pub.dev/packages/shared_preferences)

### React 企业后台

从腾讯、字节与蚂蚁方案中选一个设计体系。这些是候选方案，不建议在同一应用混装多套完整组件体系。

- [Ant Design](https://ant.design/)
- [ProComponents](https://procomponents.ant.design/)
- [TDesign React](https://tdesign.tencent.com/react/overview)
- [Arco Design React](https://arco.design/react/docs/start)
- [Semi Design](https://semi.design/)

### Web3 DApp

以 Ant Design Web3 为起点。继续按目标链配置适配器与钱包；UI 不提供资金安全保证。

- [Ant Design Web3](https://web3.ant.design/)
- [Ant Design](https://ant.design/)

### Flutter 桌面工具

平台风格 · 文件 · 本地数据 · 布局适配。Fluent 与 macOS UI 是风格备选；插件平台支持需逐项核对。

- [Fluent UI for Flutter](https://pub.dev/packages/fluent_ui)
- [macOS UI](https://pub.dev/packages/macos_ui)
- [file_picker](https://pub.dev/packages/file_picker)
- [path_provider](https://pub.dev/packages/path_provider)
- [drift](https://pub.dev/packages/drift)
- [responsive_framework](https://pub.dev/packages/responsive_framework)

## Web UI

### Ant Design

- 归属：蚂蚁集团 / Ant Design
- 用途：企业级 React 组件体系，覆盖表格、表单、弹层与主题。
- 适合：中后台、数据密集型业务和已有 Ant Design 规范的团队。
- 注意：安装前确认 React 主版本；大版本升级需按迁移指南核对主题与 API。
- 技术栈：React
- 安装起点：npm install antd
- 注册表版本快照：6.6.8（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://ant.design/
- 源码：https://github.com/ant-design/ant-design
- 元数据来源：https://registry.npmjs.org/antd/latest

### Ant Design Web3

- 归属：Ant Design / ZAN 社区
- 用途：面向 DApp 的钱包连接、地址、代币与 NFT 等界面组件。
- 适合：使用 Ant Design 的 Web3 网站与多链钱包界面。
- 注意：UI 组件不承担钱包安全、链上交易确认或合约审计；需选对应链适配器。
- 技术栈：React
- 安装起点：npm install @ant-design/web3
- 注册表版本快照：1.26.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://web3.ant.design/
- 源码：https://github.com/ant-design/ant-design-web3
- 元数据来源：https://registry.npmjs.org/%40ant-design%2Fweb3/latest

### ProComponents

- 归属：Ant Design 社区
- 用途：在 Ant Design 上封装 ProTable、ProForm 等业务组件。
- 适合：搜索表格、复杂业务表单、管理后台。
- 注意：依赖 Ant Design；通用封装之外的业务行为仍需自行实现。
- 技术栈：React
- 安装起点：npm install @ant-design/pro-components
- 注册表版本快照：2.8.10（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://procomponents.ant.design/
- 源码：https://github.com/ant-design/pro-components
- 元数据来源：https://registry.npmjs.org/%40ant-design%2Fpro-components/latest

### Ant Design Mobile

- 归属：蚂蚁集团 / Ant Design
- 用途：适合触屏的 React 移动 Web 组件。
- 适合：H5 活动、移动业务系统和手机网页。
- 注意：这是 Web 组件，不是 Flutter 或 React Native 组件。
- 技术栈：React
- 安装起点：npm install antd-mobile
- 注册表版本快照：5.43.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://mobile.ant.design/
- 源码：https://github.com/ant-design/ant-design-mobile
- 元数据来源：https://registry.npmjs.org/antd-mobile/latest

### Fusion Design

- 归属：阿里巴巴 Fusion
- 用途：强调主题定制与设计开发协作的 React 组件库。
- 适合：阿里系技术栈、需要品牌主题配置的后台。
- 注意：核查 React 版本和主题构建方式；先做关键页面验证。
- 技术栈：React
- 安装起点：npm install @alifd/next
- 注册表版本快照：1.27.34（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://fusion.design/
- 源码：https://github.com/alibaba-fusion/next
- 元数据来源：https://registry.npmjs.org/%40alifd%2Fnext/latest

### TDesign React

- 归属：腾讯 TDesign
- 用途：腾讯 TDesign 的桌面 React 实现。
- 适合：企业应用、腾讯设计体系和统一品牌后台。
- 注意：桌面与移动端是不同包，按设备和框架选择。
- 技术栈：React
- 安装起点：npm install tdesign-react
- 注册表版本快照：1.18.6（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://tdesign.tencent.com/react/overview
- 源码：https://github.com/Tencent/tdesign-react
- 元数据来源：https://registry.npmjs.org/tdesign-react/latest

### TDesign Vue Next

- 归属：腾讯 TDesign
- 用途：TDesign 的 Vue 3 桌面组件库。
- 适合：Vue 3 企业后台与设计体系落地。
- 注意：Vue 2 的 tdesign-vue 与 Vue 3 的 tdesign-vue-next 不可混用。
- 技术栈：Vue
- 安装起点：npm install tdesign-vue-next
- 注册表版本快照：1.20.10（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://tdesign.tencent.com/vue-next/overview
- 源码：https://github.com/Tencent/tdesign-vue-next
- 元数据来源：https://registry.npmjs.org/tdesign-vue-next/latest

### TDesign Mobile React

- 归属：腾讯 TDesign
- 用途：TDesign 设计语言的 React 移动 Web 实现。
- 适合：移动端 H5 与腾讯设计体系。
- 注意：移动 Web 实现，不能直接用于 Flutter。
- 技术栈：React
- 安装起点：npm install tdesign-mobile-react
- 注册表版本快照：1.0.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://tdesign.tencent.com/mobile-react/overview
- 源码：https://github.com/Tencent/tdesign-mobile-react
- 元数据来源：https://registry.npmjs.org/tdesign-mobile-react/latest

### Arco Design React

- 归属：字节跳动 Arco Design
- 用途：支持主题与设计 Token 的 React 企业组件库。
- 适合：React 管理后台、统一设计语言与主题配置。
- 注意：React 与 Vue 是独立实现，API 和生态插件需分别确认。
- 技术栈：React
- 安装起点：npm install @arco-design/web-react
- 注册表版本快照：2.66.18（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://arco.design/react/docs/start
- 源码：https://github.com/arco-design/arco-design
- 元数据来源：https://registry.npmjs.org/%40arco-design%2Fweb-react/latest

### Arco Design Vue

- 归属：字节跳动 Arco Design
- 用途：Arco Design 的 Vue 3 企业组件实现。
- 适合：Vue 3 中后台与品牌主题。
- 注意：不要套用 React 版本的导入路径与 API。
- 技术栈：Vue
- 安装起点：npm install @arco-design/web-vue
- 注册表版本快照：2.59.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://arco.design/vue/docs/start
- 源码：https://github.com/arco-design/arco-design-vue
- 元数据来源：https://registry.npmjs.org/%40arco-design%2Fweb-vue/latest

### Semi Design

- 归属：抖音前端 DouyinFE
- 用途：React 设计系统，提供组件、设计 Token 与主题能力。
- 适合：需要设计协作、主题定制的企业产品。
- 注意：基于 React；设计工具能力与运行时组件的使用方式不同。
- 技术栈：React
- 安装起点：npm install @douyinfe/semi-ui
- 注册表版本快照：2.104.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://semi.design/
- 源码：https://github.com/DouyinFE/semi-design
- 元数据来源：https://registry.npmjs.org/%40douyinfe%2Fsemi-ui/latest

### Element Plus

- 归属：Element Plus 社区
- 用途：面向 Vue 3 的桌面业务组件库。
- 适合：Vue 3 管理台、表单与数据表格。
- 注意：与 Vue 2 的 Element UI 区分；大表格需单独评估虚拟化。
- 技术栈：Vue
- 安装起点：npm install element-plus
- 注册表版本快照：2.14.7（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://element-plus.org/
- 源码：https://github.com/element-plus/element-plus
- 元数据来源：https://registry.npmjs.org/element-plus/latest

### Naive UI

- 归属：TuSimple 发起 / 社区
- 用途：使用 TypeScript 的 Vue 3 组件库，支持主题定制。
- 适合：Vue 3 产品、偏好类型提示与可定制主题。
- 注意：确认主题覆盖方式及 SSR 样式接入。
- 技术栈：Vue
- 安装起点：npm install naive-ui
- 注册表版本快照：2.45.3（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://www.naiveui.com/
- 源码：https://github.com/tusen-ai/naive-ui
- 元数据来源：https://registry.npmjs.org/naive-ui/latest

### Vant

- 归属：有赞 / Vant 社区
- 用途：轻量的 Vue 移动端组件库。
- 适合：移动商城、H5 业务与触屏交互。
- 注意：版本与 Vue 主版本需对应；小程序是独立产品线。
- 技术栈：Vue
- 安装起点：npm install vant
- 注册表版本快照：4.10.2（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://vant-ui.github.io/vant/
- 源码：https://github.com/youzan/vant
- 元数据来源：https://registry.npmjs.org/vant/latest

### NutUI

- 归属：京东 NutUI
- 用途：京东风格的 Vue 移动端组件。
- 适合：电商 H5 与移动业务界面。
- 注意：Vue、React、Taro 方案的包名不同，当前收录 Vue 包。
- 技术栈：Vue
- 安装起点：npm install @nutui/nutui
- 注册表版本快照：4.3.15-beta.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://nutui.jd.com/
- 源码：https://github.com/jdf2e/nutui
- 元数据来源：https://registry.npmjs.org/%40nutui%2Fnutui/latest

### MUI Material UI

- 归属：MUI
- 用途：Material Design 风格的 React 组件体系。
- 适合：国际化产品、Material 风格与 React 应用。
- 注意：基础组件开源；MUI X 的部分高级能力需商业许可。
- 技术栈：React
- 安装起点：npm install @mui/material
- 注册表版本快照：9.5.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://mui.com/material-ui/
- 源码：https://github.com/mui/material-ui
- 元数据来源：https://registry.npmjs.org/%40mui%2Fmaterial/latest

### Chakra UI

- 归属：Chakra UI 社区
- 用途：以可组合组件、样式属性和无障碍为重点的 React UI。
- 适合：快速构建自有视觉风格的产品界面。
- 注意：v2/v3 组件 API 有差异，教程与安装版本应一致。
- 技术栈：React
- 安装起点：npm install @chakra-ui/react
- 注册表版本快照：3.37.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://chakra-ui.com/
- 源码：https://github.com/chakra-ui/chakra-ui
- 元数据来源：https://registry.npmjs.org/%40chakra-ui%2Freact/latest

### Mantine

- 归属：Mantine 社区
- 用途：覆盖表单、日期与 Hooks 的 React 组件生态。
- 适合：SaaS、仪表盘和需要配套 Hooks 的应用。
- 注意：核心与日期、图表等扩展包分开安装。
- 技术栈：React
- 安装起点：npm install @mantine/core
- 注册表版本快照：9.7.4（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://mantine.dev/
- 源码：https://github.com/mantinedev/mantine
- 元数据来源：https://registry.npmjs.org/%40mantine%2Fcore/latest

### Radix Primitives

- 归属：Radix / WorkOS
- 用途：提供弹层、菜单、对话框等交互原语。
- 适合：有自有设计系统、需要掌握样式的 React 团队。
- 注意：Primitives 通常不含成品视觉；仍需验证组合后的键盘与焦点体验。
- 技术栈：React
- 安装起点：npm install radix-ui
- 注册表版本快照：1.8.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://www.radix-ui.com/primitives
- 源码：https://github.com/radix-ui/primitives
- 元数据来源：https://registry.npmjs.org/radix-ui/latest

### shadcn/ui

- 归属：shadcn / 社区
- 用途：通过 CLI 将可修改的组件源码加入项目。
- 适合：希望持有组件源码、深度定制产品视觉。
- 注意：npm 的 shadcn 是 CLI，不是运行时 UI 包；组件升级由项目维护。
- 技术栈：React
- 安装起点：npx shadcn@latest init
- 注册表版本快照：4.23.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://ui.shadcn.com/
- 源码：https://github.com/shadcn-ui/ui
- 元数据来源：https://registry.npmjs.org/shadcn/latest

### Fluent UI React

- 归属：Microsoft
- 用途：微软 Fluent 设计体系的 React 组件。
- 适合：Microsoft 生态、企业工具与桌面感 Web 产品。
- 注意：不同 Fluent 主版本包与 API 不同，当前指向 v9 组件包。
- 技术栈：React
- 安装起点：npm install @fluentui/react-components
- 注册表版本快照：9.75.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://react.fluentui.dev/
- 源码：https://github.com/microsoft/fluentui
- 元数据来源：https://registry.npmjs.org/%40fluentui%2Freact-components/latest

### Carbon Design System

- 归属：IBM
- 用途：IBM 的企业设计系统与 React 实现。
- 适合：复杂企业应用、数据产品和统一交互规范。
- 注意：设计资产、图标与组件可能适用不同条款，按使用资源核对。
- 技术栈：React
- 安装起点：npm install @carbon/react
- 注册表版本快照：1.119.0（核查 2026-11-01，不代表永久最新）
- 许可快照：Apache-2.0；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://carbondesignsystem.com/
- 源码：https://github.com/carbon-design-system/carbon
- 元数据来源：https://registry.npmjs.org/%40carbon%2Freact/latest

### Primer React

- 归属：GitHub
- 用途：GitHub Primer 设计系统的 React 组件。
- 适合：开发者工具、GitHub 风格的产品界面。
- 注意：产品需要自有品牌规范时，需评估主题和样式适配。
- 技术栈：React
- 安装起点：npm install @primer/react
- 注册表版本快照：38.43.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://primer.style/product/components/
- 源码：https://github.com/primer/react
- 元数据来源：https://registry.npmjs.org/%40primer%2Freact/latest

### Vuetify

- 归属：Vuetify
- 用途：Vue 的 Material Design 组件体系。
- 适合：Material 风格的 Vue 应用和跨设备 Web。
- 注意：主版本与 Vue 版本需对应；部分模板与服务单独收费。
- 技术栈：Vue
- 安装起点：npm install vuetify
- 注册表版本快照：4.3.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://vuetifyjs.com/
- 源码：https://github.com/vuetifyjs/vuetify
- 元数据来源：https://registry.npmjs.org/vuetify/latest

### Reka UI

- 归属：Reka UI 社区
- 用途：Vue 的可访问、无样式交互原语。
- 适合：自定义设计系统、Vue 生态源码组件。
- 注意：原 Radix Vue 演进而来，旧教程需核对包名和迁移说明。
- 技术栈：Vue
- 安装起点：npm install reka-ui
- 注册表版本快照：2.11.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://reka-ui.com/
- 源码：https://github.com/unovue/reka-ui
- 元数据来源：https://registry.npmjs.org/reka-ui/latest

### daisyUI

- 归属：daisyUI 社区
- 用途：为 Tailwind CSS 提供语义化组件类和主题。
- 适合：快速搭建页面、偏好 CSS 类的团队。
- 注意：确认 Tailwind 与 daisyUI 主版本；交互行为需要自行接入。
- 技术栈：CSS
- 安装起点：npm install daisyui
- 注册表版本快照：5.7.50（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://daisyui.com/
- 源码：https://github.com/saadeghi/daisyui
- 元数据来源：https://registry.npmjs.org/daisyui/latest

### Bootstrap

- 归属：Bootstrap 社区
- 用途：提供栅格、样式组件与 JavaScript 交互插件。
- 适合：传统 Web、服务端渲染页面与快速原型。
- 注意：组件 JavaScript 与框架封装的状态管理不要混用。
- 技术栈：CSS / JavaScript
- 安装起点：npm install bootstrap
- 注册表版本快照：5.3.8（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://getbootstrap.com/
- 源码：https://github.com/twbs/bootstrap
- 元数据来源：https://registry.npmjs.org/bootstrap/latest

## Flutter UI

### TDesign Flutter

- 归属：腾讯 TDesign
- 用途：腾讯 TDesign 的 Flutter 组件实现。
- 适合：中文业务应用、腾讯设计语言和移动界面。
- 注意：按具体组件检查桌面与 Web 行为；设计规范需与产品统一。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add tdesign_flutter
- 注册表版本快照：1.1.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://tdesign.tencent.com/flutter/overview
- 源码：https://github.com/Tencent/tdesign-flutter
- pub.dev：https://pub.dev/packages/tdesign_flutter
- 元数据来源：https://pub.dev/api/packages/tdesign_flutter

### Forui

- 归属：Duobase / 社区
- 用途：受 shadcn/ui 风格启发的 Flutter 组件体系。
- 适合：希望统一主题、搭建现代产品界面的应用。
- 注意：社区维护；嵌入字体等资源可能有独立许可证。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add forui
- 注册表版本快照：0.27.7（核查 2026-11-01，不代表永久最新）
- 许可快照：OFL-1.1, MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://forui.dev/
- 源码：https://github.com/duobaseio/forui/tree/main/forui
- pub.dev：https://pub.dev/packages/forui
- 元数据来源：https://pub.dev/api/packages/forui

### Flutter shadcn UI

- 归属：Flutter 社区
- 用途：将 shadcn/ui 视觉风格带到 Flutter 的社区实现。
- 适合：简洁产品界面、可定制主题和组件。
- 注意：不是 Web shadcn/ui 官方跨端版本；勿混用不同 Flutter 移植包。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add shadcn_ui
- 注册表版本快照：0.57.4（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/shadcn_ui
- 源码：https://github.com/nank1ro/flutter-shadcn-ui
- pub.dev：https://pub.dev/packages/shadcn_ui
- 元数据来源：https://pub.dev/api/packages/shadcn_ui

### shadcn_flutter

- 归属：sunarya-thito / 社区
- 用途：另一套 shadcn 风格 Flutter 组件体系。
- 适合：偏好完整统一主题的 Flutter 产品。
- 注意：与 shadcn_ui 是不同项目，API 和升级路线不通用。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add shadcn_flutter
- 注册表版本快照：0.0.55（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/shadcn_flutter
- 源码：https://github.com/sunarya-thito/shadcn_flutter
- pub.dev：https://pub.dev/packages/shadcn_flutter
- 元数据来源：https://pub.dev/api/packages/shadcn_flutter

### Fluent UI for Flutter

- 归属：bdlukaa / 社区
- 用途：Flutter 社区实现的 Fluent Design 组件。
- 适合：Windows 风格的桌面应用。
- 注意：不是微软官方 Flutter UI 包；各平台需验证窗口和输入行为。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add fluent_ui
- 注册表版本快照：4.17.0（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/fluent_ui
- 源码：https://github.com/bdlukaa/fluent_ui
- pub.dev：https://pub.dev/packages/fluent_ui
- 元数据来源：https://pub.dev/api/packages/fluent_ui

### macOS UI

- 归属：macos_ui 社区
- 用途：Flutter 社区实现的 macOS 风格组件。
- 适合：macOS 应用或需要 macOS 视觉的桌面工具。
- 注意：不是 Apple 官方库，原生窗口能力可能需要额外插件。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add macos_ui
- 注册表版本快照：2.2.2（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/macos_ui
- 源码：https://github.com/GroovinChip/macos_ui
- pub.dev：https://pub.dev/packages/macos_ui
- 元数据来源：https://pub.dev/api/packages/macos_ui

### Bruno

**发布较早 · 先验证**

- 归属：贝壳 LianjiaTech
- 用途：贝壳开源的业务型 Flutter 组件库。
- 适合：中文移动业务、表单和复杂业务组件参考。
- 注意：pub 发布较早，集成前核查 SDK、依赖与维护情况。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add bruno
- 注册表版本快照：3.4.3（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/bruno
- 源码：https://github.com/LianjiaTech/bruno
- pub.dev：https://pub.dev/packages/bruno
- 元数据来源：https://pub.dev/api/packages/bruno

### flukit

**停止维护 · 历史参考**

- 归属：FlutterChina 社区
- 用途：FlutterChina 社区的常用组件与示例集合。
- 适合：学习组件实现、查找现成基础交互。
- 注意：pub.dev 已标记停止维护，仅保留历史参考；不要作为新项目默认基础。
- 技术栈：Flutter / Dart
- 注册表版本快照：3.0.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flukit
- 源码：https://github.com/flutterchina/flukit
- pub.dev：https://pub.dev/packages/flukit
- 元数据来源：https://pub.dev/api/packages/flukit

### GetWidget

- 归属：GetWidget 社区
- 用途：提供大量预制 Flutter 视觉组件。
- 适合：快速原型、展示页面和通用移动界面。
- 注意：组件多不等于全部适合项目，先验证主题与无障碍。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add getwidget
- 注册表版本快照：7.0.2（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://www.getwidget.dev/
- 源码：https://github.com/ionicfirebaseapp/getwidget
- pub.dev：https://pub.dev/packages/getwidget
- 元数据来源：https://pub.dev/api/packages/getwidget

### flutter_platform_widgets

**停止维护 · 历史参考**

- 归属：社区
- 用途：在 Material 与 Cupertino 组件间做平台适配。
- 适合：希望按 iOS / Android 平台呈现不同控件的应用。
- 注意：pub.dev 已标记停止维护；较新的发布日期不代表仍在维护。
- 技术栈：Flutter / Dart
- 注册表版本快照：10.0.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_platform_widgets
- 源码：https://github.com/stryder-dev/flutter_platform_widgets
- pub.dev：https://pub.dev/packages/flutter_platform_widgets
- 元数据来源：https://pub.dev/api/packages/flutter_platform_widgets

### Smart Dialog

- 归属：FlutterCandies 社区
- 用途：提供 Toast、Loading、Dialog 等弹层管理。
- 适合：全局反馈、加载态和业务弹层。
- 注意：专项组件，不是完整 UI；测试返回键、焦点和路由生命周期。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_smart_dialog
- 注册表版本快照：5.3.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_smart_dialog
- 源码：https://github.com/fluttercandies/flutter_smart_dialog
- pub.dev：https://pub.dev/packages/flutter_smart_dialog
- 元数据来源：https://pub.dev/api/packages/flutter_smart_dialog

### ScrollKit

**已归档 · 历史参考**

- 归属：字节跳动
- 用途：字节开源的按索引定位、双向加载等滚动专项组件。
- 适合：了解字节 Flutter 开源与历史滚动实现。
- 注意：仓库已于 2025-04-08 归档，仅供历史参考，不作为新项目默认依赖。
- 技术栈：Flutter / Dart
- 注册表版本快照：0.1.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/scroll_kit
- 源码：https://github.com/bytedance/scroll_kit
- pub.dev：https://pub.dev/packages/scroll_kit
- 元数据来源：https://pub.dev/api/packages/scroll_kit

### FlutterGo

**暂停维护 · 学习示例**

- 归属：阿里巴巴
- 用途：阿里开源的 Flutter 中文组件示例与学习 App。
- 适合：阅读历史组件示例，了解早期 Flutter 应用组织。
- 注意：README 明确暂停维护；这是示例应用，不能当成可直接安装的通用 UI 包。
- 技术栈：Flutter / Dart
- 许可快照：BSD-3-Clause；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://github.com/alibaba/flutter-go
- 源码：https://github.com/alibaba/flutter-go
- 元数据来源：https://github.com/alibaba/flutter-go/blob/master/README.md

## Flutter 常用包

### go_router

- 归属：Flutter 团队
- 用途：基于 Router API 的声明式路由，支持 URL 与深层链接。
- 适合：新项目、Web URL 同步、登录重定向与嵌套路由。
- 注意：大版本升级核对重定向和 ShellRoute 行为。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add go_router
- 注册表版本快照：18.1.2（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-Clause；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/go_router
- 源码：https://github.com/flutter/packages/tree/main/packages/go_router
- pub.dev：https://pub.dev/packages/go_router
- 元数据来源：https://pub.dev/api/packages/go_router

### auto_route

- 归属：pub.dev 开源社区
- 用途：以代码生成为核心的类型安全路由方案。
- 适合：路由较多、需要参数类型检查的应用。
- 注意：通常需配套 auto_route_generator 与 build_runner。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add auto_route
- 注册表版本快照：11.2.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/auto_route
- 源码：https://github.com/Milad-Akarie/auto_route_library
- pub.dev：https://pub.dev/packages/auto_route
- 元数据来源：https://pub.dev/api/packages/auto_route

### fluro

**发布较早 · 先验证**

- 归属：Luke Pighetti
- 用途：基于命名路径、参数与处理器的 Flutter 路由库。
- 适合：维护已有 Fluro 项目、学习路径匹配与转场。
- 注意：发布较早；新项目先比较 go_router / auto_route，并用目标 Flutter SDK 实测。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add fluro
- 注册表版本快照：2.0.5（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/fluro
- 源码：https://github.com/lukepighetti/fluro
- pub.dev：https://pub.dev/packages/fluro
- 元数据来源：https://pub.dev/api/packages/fluro

### flutter_riverpod

- 归属：Riverpod 社区
- 用途：以 Provider 和响应式依赖管理异步数据与状态。
- 适合：需要异步缓存、依赖组合与可测试状态的应用。
- 注意：代码生成是可选路线；注意主版本 API 与生命周期差异。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_riverpod
- 注册表版本快照：3.4.3（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_riverpod
- 源码：https://github.com/rrousselGit/riverpod
- pub.dev：https://pub.dev/packages/flutter_riverpod
- 元数据来源：https://pub.dev/api/packages/flutter_riverpod

### flutter_bloc

- 归属：Bloc 社区
- 用途：使用 Bloc / Cubit 分离业务状态与视图。
- 适合：多人协作、事件流清晰、强调可测试业务逻辑的项目。
- 注意：Bloc 与 Cubit 的复杂度不同，按业务选择。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_bloc
- 注册表版本快照：9.1.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_bloc
- 源码：https://github.com/felangel/bloc/tree/master/packages/flutter_bloc
- pub.dev：https://pub.dev/packages/flutter_bloc
- 元数据来源：https://pub.dev/api/packages/flutter_bloc

### provider

- 归属：pub.dev 开源社区
- 用途：对 InheritedWidget 的轻量封装，用于状态共享与依赖提供。
- 适合：较简单的状态共享、已有 ChangeNotifier 项目。
- 注意：避免全局大状态与过宽监听造成额外重建。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add provider
- 注册表版本快照：6.1.5+1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/provider
- 源码：https://github.com/rrousselGit/provider
- pub.dev：https://pub.dev/packages/provider
- 元数据来源：https://pub.dev/api/packages/provider

### get_it

- 归属：pub.dev 开源社区
- 用途：Dart 服务定位器，用于注册与查找依赖。
- 适合：服务解耦、测试替换与业务对象装配。
- 注意：不是响应式状态管理；注意作用域和资源释放。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add get_it
- 注册表版本快照：9.3.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/get_it
- 源码：https://github.com/flutter-it/get_it
- pub.dev：https://pub.dev/packages/get_it
- 元数据来源：https://pub.dev/api/packages/get_it

### dio

- 归属：Dart / Flutter 社区
- 用途：支持拦截器、取消、上传下载等能力的 HTTP 客户端。
- 适合：统一鉴权、错误处理与文件传输。
- 注意：重试写请求需考虑幂等；不要在日志中记录令牌。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add dio
- 注册表版本快照：5.11.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/dio
- 源码：https://github.com/cfug/dio/blob/main/dio
- pub.dev：https://pub.dev/packages/dio
- 元数据来源：https://pub.dev/api/packages/dio

### http

- 归属：Dart 团队
- 用途：Dart 官方生态的可组合 HTTP 客户端。
- 适合：轻量 REST、可替换客户端与 Dart 共享代码。
- 注意：复杂拦截器、重试和上传进度需自行组合。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add http
- 注册表版本快照：1.6.0（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/http
- 源码：https://github.com/dart-lang/http/tree/master/pkgs/http
- pub.dev：https://pub.dev/packages/http
- 元数据来源：https://pub.dev/api/packages/http

### retrofit

- 归属：pub.dev 开源社区
- 用途：为 Dio 提供基于注解的 HTTP API 代码生成。
- 适合：API 较多、希望用声明描述请求的项目。
- 注意：需要 retrofit_generator；与 Dio 版本保持兼容。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add retrofit
- 注册表版本快照：4.10.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/retrofit
- 源码：https://github.com/trevorwang/retrofit.dart/
- pub.dev：https://pub.dev/packages/retrofit
- 元数据来源：https://pub.dev/api/packages/retrofit

### web_socket_channel

- 归属：Dart 团队
- 用途：提供跨平台 WebSocket 通道抽象。
- 适合：聊天、实时通知与状态推送。
- 注意：心跳、重连、背压和消息确认需要业务实现。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add web_socket_channel
- 注册表版本快照：3.0.3（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/web_socket_channel
- 源码：https://github.com/dart-lang/http/tree/master/pkgs/web_socket_channel
- pub.dev：https://pub.dev/packages/web_socket_channel
- 元数据来源：https://pub.dev/api/packages/web_socket_channel

### connectivity_plus

- 归属：pub.dev 开源社区
- 用途：检测设备网络连接类型及其变化。
- 适合：网络提示、离线体验与重连触发。
- 注意：有 Wi-Fi / 蜂窝连接不代表互联网可达。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add connectivity_plus
- 注册表版本快照：7.3.2（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/connectivity_plus
- 源码：https://github.com/fluttercommunity/plus_plugins/tree/main/packages/connectivity_plus/connectivity_plus
- pub.dev：https://pub.dev/packages/connectivity_plus
- 元数据来源：https://pub.dev/api/packages/connectivity_plus

### freezed

- 归属：pub.dev 开源社区
- 用途：通过代码生成实现不可变模型、联合类型等。
- 适合：复杂业务状态和不可变数据模型。
- 注意：这是开发依赖，配套 freezed_annotation 与 build_runner。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add --dev freezed
- 注册表版本快照：4.0.3（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/freezed
- 源码：https://github.com/rrousselGit/freezed
- pub.dev：https://pub.dev/packages/freezed
- 元数据来源：https://pub.dev/api/packages/freezed

### json_serializable

- 归属：pub.dev 开源社区
- 用途：按注解生成 JSON 编解码代码。
- 适合：REST 数据模型与序列化。
- 注意：这是开发依赖，运行时通常使用 json_annotation。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add --dev json_serializable
- 注册表版本快照：6.15.2（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/json_serializable
- 源码：https://github.com/google/json_serializable.dart/tree/master/json_serializable
- pub.dev：https://pub.dev/packages/json_serializable
- 元数据来源：https://pub.dev/api/packages/json_serializable

### build_runner

- 归属：pub.dev 开源社区
- 用途：Dart 的代码生成任务执行器。
- 适合：运行模型、路由和数据库生成器。
- 注意：作为开发依赖；生成器版本需要协调。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add --dev build_runner
- 注册表版本快照：2.17.1（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/build_runner
- 源码：https://github.com/dart-lang/build/tree/master/build_runner
- pub.dev：https://pub.dev/packages/build_runner
- 元数据来源：https://pub.dev/api/packages/build_runner

### drift

- 归属：Drift 社区
- 用途：基于 SQLite 的类型安全持久化与响应式查询。
- 适合：关系数据、离线优先业务与复杂查询。
- 注意：原生与 Web 数据库接入不同，迁移需独立验证。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add drift
- 注册表版本快照：2.35.3（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/drift
- 源码：https://github.com/simolus3/drift
- pub.dev：https://pub.dev/packages/drift
- 元数据来源：https://pub.dev/api/packages/drift

### sqflite

- 归属：pub.dev 开源社区
- 用途：Flutter 的 SQLite 访问插件。
- 适合：移动端关系数据存储与现有 SQL 迁移。
- 注意：桌面和 Web 支持需对应扩展，不能默认覆盖全平台。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add sqflite
- 注册表版本快照：2.4.5（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-2-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/sqflite
- 源码：https://github.com/tekartik/sqflite/tree/master/sqflite
- pub.dev：https://pub.dev/packages/sqflite
- 元数据来源：https://pub.dev/api/packages/sqflite

### shared_preferences

- 归属：Flutter 团队
- 用途：存储少量键值偏好与简单设置。
- 适合：主题、语言、用户界面偏好。
- 注意：不用于密钥、关键事务数据或大型数据集。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add shared_preferences
- 注册表版本快照：2.5.6（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/shared_preferences
- 源码：https://github.com/flutter/packages/tree/main/packages/shared_preferences/shared_preferences
- pub.dev：https://pub.dev/packages/shared_preferences
- 元数据来源：https://pub.dev/api/packages/shared_preferences

### flutter_secure_storage

- 归属：pub.dev 开源社区
- 用途：使用各平台安全存储能力保存敏感键值。
- 适合：登录令牌等少量敏感数据。
- 注意：各平台密钥链、备份与浏览器安全边界不同。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_secure_storage
- 注册表版本快照：11.2.0（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_secure_storage
- 源码：https://github.com/mogol/flutter_secure_storage/tree/develop/flutter_secure_storage
- pub.dev：https://pub.dev/packages/flutter_secure_storage
- 元数据来源：https://pub.dev/api/packages/flutter_secure_storage

### path_provider

- 归属：Flutter 团队
- 用途：查找应用文档、缓存等系统目录。
- 适合：文件保存路径、缓存与应用数据目录。
- 注意：平台支持不同；Web 没有原生文件目录语义。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add path_provider
- 注册表版本快照：2.1.6（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/path_provider
- 源码：https://github.com/flutter/packages/tree/main/packages/path_provider/path_provider
- pub.dev：https://pub.dev/packages/path_provider
- 元数据来源：https://pub.dev/api/packages/path_provider

### file_picker

- 归属：pub.dev 开源社区
- 用途：调用平台文件选择器，选择文件或目录。
- 适合：附件上传、文件导入和桌面文件操作。
- 注意：大文件避免全量读入内存；目录选择支持需看平台。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add file_picker
- 注册表版本快照：13.3.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/file_picker
- 源码：https://github.com/vicajilau/flutter_file_picker/tree/main/packages/file_picker
- pub.dev：https://pub.dev/packages/file_picker
- 元数据来源：https://pub.dev/api/packages/file_picker

### image_picker

- 归属：Flutter 团队
- 用途：调用系统相机或相册获取图片与视频。
- 适合：头像、拍照与媒体上传。
- 注意：配置相机 / 相册权限，并处理活动恢复与用户取消。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add image_picker
- 注册表版本快照：1.2.4（核查 2026-11-01，不代表永久最新）
- 许可快照：APACHE-2.0, BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/image_picker
- 源码：https://github.com/flutter/packages/tree/main/packages/image_picker/image_picker
- pub.dev：https://pub.dev/packages/image_picker
- 元数据来源：https://pub.dev/api/packages/image_picker

### cached_network_image

- 归属：pub.dev 开源社区
- 用途：展示网络图片并提供缓存、占位和错误视图。
- 适合：列表缩略图、头像与图片浏览。
- 注意：Web 缓存语义不同；注意图片解码内存。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add cached_network_image
- 注册表版本快照：4.0.6（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/cached_network_image
- 源码：https://github.com/Baseflow/flutter_cached_network_image
- pub.dev：https://pub.dev/packages/cached_network_image
- 元数据来源：https://pub.dev/api/packages/cached_network_image

### flutter_svg

- 归属：pub.dev 开源社区
- 用途：在 Flutter 中解析和绘制 SVG 图形。
- 适合：矢量图标、插画与品牌图形。
- 注意：不支持全部浏览器 SVG 特性，复杂 SVG 需实测。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_svg
- 注册表版本快照：2.3.2（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_svg
- 源码：https://github.com/flutter/packages/tree/main/third_party/packages/flutter_svg
- pub.dev：https://pub.dev/packages/flutter_svg
- 元数据来源：https://pub.dev/api/packages/flutter_svg

### video_player

- 归属：Flutter 团队
- 用途：调用平台视频播放能力。
- 适合：短视频、课程和基础视频播放。
- 注意：控制条需自行实现；编解码和自动播放能力因平台而异。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add video_player
- 注册表版本快照：2.14.1（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/video_player
- 源码：https://github.com/flutter/packages/tree/main/packages/video_player/video_player
- pub.dev：https://pub.dev/packages/video_player
- 元数据来源：https://pub.dev/api/packages/video_player

### just_audio

- 归属：pub.dev 开源社区
- 用途：提供音频播放、播放列表和音频流支持。
- 适合：音乐、播客与语音播放。
- 注意：后台播放和媒体通知需额外集成；桌面可能需要平台后端。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add just_audio
- 注册表版本快照：0.10.6（核查 2026-11-01，不代表永久最新）
- 许可快照：APACHE-2.0, MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/just_audio
- 源码：https://github.com/ryanheise/just_audio/tree/minor/just_audio
- pub.dev：https://pub.dev/packages/just_audio
- 元数据来源：https://pub.dev/api/packages/just_audio

### lottie

- 归属：pub.dev 开源社区
- 用途：播放 Lottie JSON 矢量动画。
- 适合：引导页、加载与轻量动效。
- 注意：复杂动画会影响性能；确认设计导出特性受支持。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add lottie
- 注册表版本快照：3.8.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/lottie
- 源码：https://github.com/xvrh/lottie-flutter
- pub.dev：https://pub.dev/packages/lottie
- 元数据来源：https://pub.dev/api/packages/lottie

### flutter_animate

- 归属：pub.dev 开源社区
- 用途：用可组合 API 添加补间与序列动画。
- 适合：入场、交错和界面微交互。
- 注意：根据系统偏好减少动态效果，避免列表同时播放过多动画。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_animate
- 注册表版本快照：4.5.2（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_animate
- 源码：https://github.com/gskinner/flutter_animate
- pub.dev：https://pub.dev/packages/flutter_animate
- 元数据来源：https://pub.dev/api/packages/flutter_animate

### fl_chart

- 归属：pub.dev 开源社区
- 用途：提供折线、柱状、饼图等 Flutter 图表。
- 适合：统计看板和数据展示。
- 注意：大数据量需抽样，日期轴与无障碍描述需自行完善。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add fl_chart
- 注册表版本快照：1.3.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/fl_chart
- 源码：https://github.com/imaNNeo/fl_chart
- pub.dev：https://pub.dev/packages/fl_chart
- 元数据来源：https://pub.dev/api/packages/fl_chart

### flutter_form_builder

- 归属：pub.dev 开源社区
- 用途：统一管理表单字段、校验与提交。
- 适合：动态表单、问卷和复杂输入。
- 注意：校验器常需配套 form_builder_validators；不要只依赖前端校验。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_form_builder
- 注册表版本快照：11.0.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_form_builder
- 源码：https://github.com/flutter-form-builder-ecosystem/flutter_form_builder
- pub.dev：https://pub.dev/packages/flutter_form_builder
- 元数据来源：https://pub.dev/api/packages/flutter_form_builder

### intl

- 归属：Dart 团队
- 用途：日期、数字、消息等国际化工具。
- 适合：多语言、区域格式和本地化展示。
- 注意：日期格式化不等于时区转换；与 Flutter SDK 的依赖版本协调。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add intl
- 注册表版本快照：0.20.3（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/intl
- 源码：https://github.com/dart-lang/i18n/tree/main/pkgs/intl
- pub.dev：https://pub.dev/packages/intl
- 元数据来源：https://pub.dev/api/packages/intl

### easy_localization

- 归属：pub.dev 开源社区
- 用途：用资源文件和扩展封装 Flutter 本地化。
- 适合：多语言切换与翻译文件管理。
- 注意：与 Flutter gen_l10n 路线比较后统一方案，避免重复消息体系。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add easy_localization
- 注册表版本快照：3.0.8（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/easy_localization
- 源码：https://github.com/aissat/easy_localization
- pub.dev：https://pub.dev/packages/easy_localization
- 元数据来源：https://pub.dev/api/packages/easy_localization

### url_launcher

- 归属：Flutter 团队
- 用途：按平台打开网址、电话或邮件等 URL。
- 适合：跳转浏览器、拨号与邮件。
- 注意：配置平台查询权限，并处理不能打开的 URL。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add url_launcher
- 注册表版本快照：6.3.3（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/url_launcher
- 源码：https://github.com/flutter/packages/tree/main/packages/url_launcher/url_launcher
- pub.dev：https://pub.dev/packages/url_launcher
- 元数据来源：https://pub.dev/api/packages/url_launcher

### permission_handler

- 归属：pub.dev 开源社区
- 用途：查询和请求平台运行时权限。
- 适合：相机、定位与通知权限引导。
- 注意：仍需配置 Manifest / Info.plist，避免一次申请无关权限。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add permission_handler
- 注册表版本快照：13.0.2（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/permission_handler
- 源码：https://github.com/baseflow/flutter-permission-handler
- pub.dev：https://pub.dev/packages/permission_handler
- 元数据来源：https://pub.dev/api/packages/permission_handler

### geolocator

- 归属：pub.dev 开源社区
- 用途：获取定位、定位权限和位置变化。
- 适合：地图定位、附近内容和轨迹采集。
- 注意：后台定位、精度和平台合规配置需要独立设计。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add geolocator
- 注册表版本快照：14.1.2（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/geolocator
- 源码：https://github.com/baseflow/flutter-geolocator/tree/main/geolocator
- pub.dev：https://pub.dev/packages/geolocator
- 元数据来源：https://pub.dev/api/packages/geolocator

### device_info_plus

- 归属：pub.dev 开源社区
- 用途：读取平台和设备信息。
- 适合：兼容性诊断与设备环境展示。
- 注意：信息字段因平台而异，不要把设备信息当稳定用户身份。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add device_info_plus
- 注册表版本快照：13.3.0（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/device_info_plus
- 源码：https://github.com/fluttercommunity/plus_plugins/tree/main/packages/device_info_plus/device_info_plus
- pub.dev：https://pub.dev/packages/device_info_plus
- 元数据来源：https://pub.dev/api/packages/device_info_plus

### package_info_plus

- 归属：pub.dev 开源社区
- 用途：读取应用名称、包名、版本与构建号。
- 适合：关于页、版本展示与问题反馈。
- 注意：构建号与商店版本更新检查是不同能力。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add package_info_plus
- 注册表版本快照：10.2.2（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/package_info_plus
- 源码：https://github.com/fluttercommunity/plus_plugins/tree/main/packages/package_info_plus/package_info_plus
- pub.dev：https://pub.dev/packages/package_info_plus
- 元数据来源：https://pub.dev/api/packages/package_info_plus

### share_plus

- 归属：pub.dev 开源社区
- 用途：调用平台原生分享界面。
- 适合：分享文字、链接或文件。
- 注意：不同平台文件支持与弹窗定位要求不同。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add share_plus
- 注册表版本快照：13.3.1（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/share_plus
- 源码：https://github.com/fluttercommunity/plus_plugins/tree/main/packages/share_plus/share_plus
- pub.dev：https://pub.dev/packages/share_plus
- 元数据来源：https://pub.dev/api/packages/share_plus

### flutter_local_notifications

- 归属：pub.dev 开源社区
- 用途：显示本地通知和定时提醒。
- 适合：本地提醒、下载完成与任务反馈。
- 注意：不是远程推送服务；需处理通知权限、时区和平台限制。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_local_notifications
- 注册表版本快照：22.3.3（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_local_notifications
- 源码：https://github.com/MaikuB/flutter_local_notifications/tree/master/flutter_local_notifications
- pub.dev：https://pub.dev/packages/flutter_local_notifications
- 元数据来源：https://pub.dev/api/packages/flutter_local_notifications

### firebase_messaging

- 归属：Firebase / FlutterFire
- 用途：Firebase Cloud Messaging 的 Flutter 接入。
- 适合：服务端推送、通知令牌与消息回调。
- 注意：需要 Firebase 配置；推送可达性受平台与服务可用性影响。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add firebase_messaging
- 注册表版本快照：17.0.1（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/firebase_messaging
- 源码：https://github.com/firebase/flutterfire/tree/main/packages/firebase_messaging/firebase_messaging
- pub.dev：https://pub.dev/packages/firebase_messaging
- 元数据来源：https://pub.dev/api/packages/firebase_messaging

### workmanager

- 归属：pub.dev 开源社区
- 用途：对接平台后台任务调度。
- 适合：周期同步与延迟后台工作。
- 注意：系统决定实际运行时机，不能保证准点或持续执行。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add workmanager
- 注册表版本快照：0.10.10（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/workmanager
- 源码：https://github.com/fluttercommunity/flutter_workmanager
- pub.dev：https://pub.dev/packages/workmanager
- 元数据来源：https://pub.dev/api/packages/workmanager

### webview_flutter

- 归属：Flutter 团队
- 用途：Flutter 官方生态的系统 WebView 插件。
- 适合：嵌入网页、帮助中心和已有 H5。
- 注意：核对支持平台；限制 JS 桥接和可导航域名。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add webview_flutter
- 注册表版本快照：4.14.1（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/webview_flutter
- 源码：https://github.com/flutter/packages/tree/main/packages/webview_flutter/webview_flutter
- pub.dev：https://pub.dev/packages/webview_flutter
- 元数据来源：https://pub.dev/api/packages/webview_flutter

### flutter_inappwebview

**发布较早 · 先验证**

- 归属：pub.dev 开源社区
- 用途：提供更多 WebView 配置、事件与浏览器能力。
- 适合：复杂 H5 集成、桥接与细粒度页面控制。
- 注意：原生配置较多；权限、URL 与 JS 桥接都需按场景约束。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_inappwebview
- 注册表版本快照：6.1.5（核查 2026-11-01，不代表永久最新）
- 许可快照：APACHE-2.0；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_inappwebview
- 源码：https://github.com/pichillilorenzo/flutter_inappwebview
- pub.dev：https://pub.dev/packages/flutter_inappwebview
- 元数据来源：https://pub.dev/api/packages/flutter_inappwebview

### mobile_scanner

- 归属：pub.dev 开源社区
- 用途：使用平台能力扫描二维码与条形码。
- 适合：扫码登录、商品码与信息录入。
- 注意：扫描结果不可信；需要相机权限与生命周期处理。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add mobile_scanner
- 注册表版本快照：7.4.3（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-Clause；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/mobile_scanner
- 源码：https://github.com/juliansteenbakker/mobile_scanner
- pub.dev：https://pub.dev/packages/mobile_scanner
- 元数据来源：https://pub.dev/api/packages/mobile_scanner

### flutter_map

- 归属：pub.dev 开源社区
- 用途：可扩展的 Flutter 地图组件。
- 适合：瓦片地图、标记与地理数据展示。
- 注意：组件开源不等于地图服务免费；遵守瓦片授权与署名规则。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add flutter_map
- 注册表版本快照：8.3.2（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_map
- 源码：https://github.com/fleaflet/flutter_map
- pub.dev：https://pub.dev/packages/flutter_map
- 元数据来源：https://pub.dev/api/packages/flutter_map

### google_maps_flutter

- 归属：Flutter 团队
- 用途：在 Flutter 中嵌入 Google Maps。
- 适合：依赖 Google 地图服务的移动 / Web 产品。
- 注意：需要 Google Maps 配置、API Key；地图服务可能计费。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add google_maps_flutter
- 注册表版本快照：2.19.0（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/google_maps_flutter
- 源码：https://github.com/flutter/packages/tree/main/packages/google_maps_flutter/google_maps_flutter
- pub.dev：https://pub.dev/packages/google_maps_flutter
- 元数据来源：https://pub.dev/api/packages/google_maps_flutter

### mocktail

- 归属：pub.dev 开源社区
- 用途：无需代码生成的 Dart Mock 工具。
- 适合：单元测试替身、业务依赖隔离。
- 注意：作为开发依赖；优先验证行为而非内部调用细节。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add --dev mocktail
- 注册表版本快照：1.0.5（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/mocktail
- 源码：https://github.com/felangel/mocktail
- pub.dev：https://pub.dev/packages/mocktail
- 元数据来源：https://pub.dev/api/packages/mocktail

### bloc_test

- 归属：pub.dev 开源社区
- 用途：为 Bloc / Cubit 提供状态流测试辅助。
- 适合：验证状态迁移和异常分支。
- 注意：作为开发依赖，版本需与 bloc / flutter_bloc 协调。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add --dev bloc_test
- 注册表版本快照：10.0.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/bloc_test
- 源码：https://github.com/felangel/bloc/tree/master/packages/bloc_test
- pub.dev：https://pub.dev/packages/bloc_test
- 元数据来源：https://pub.dev/api/packages/bloc_test

### patrol

- 归属：pub.dev 开源社区
- 用途：将 Flutter 测试与原生自动化结合。
- 适合：登录授权、系统弹窗和设备端集成测试。
- 注意：作为开发依赖；需要真机或模拟器及平台工具链。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add --dev patrol
- 注册表版本快照：4.10.0（核查 2026-11-01，不代表永久最新）
- 许可快照：APACHE-2.0；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/patrol
- 源码：https://github.com/leancodepl/patrol/tree/master/packages/patrol
- pub.dev：https://pub.dev/packages/patrol
- 元数据来源：https://pub.dev/api/packages/patrol

### flutter_lints

- 归属：Flutter 团队
- 用途：Flutter 推荐代码规范规则集。
- 适合：项目基础静态检查。
- 注意：作为开发依赖并在 analysis_options.yaml 启用。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add --dev flutter_lints
- 注册表版本快照：6.0.0（核查 2026-11-01，不代表永久最新）
- 许可快照：BSD-3-CLAUSE；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/flutter_lints
- 源码：https://github.com/flutter/packages/tree/main/packages/flutter_lints
- pub.dev：https://pub.dev/packages/flutter_lints
- 元数据来源：https://pub.dev/api/packages/flutter_lints

### sentry_flutter

- 归属：pub.dev 开源社区
- 用途：集成错误上报和性能观测。
- 适合：线上异常追踪、发布诊断。
- 注意：SDK 开源；托管服务独立计费，注意上报隐私和采样。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add sentry_flutter
- 注册表版本快照：10.2.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/sentry_flutter
- 源码：https://github.com/getsentry/sentry-dart
- pub.dev：https://pub.dev/packages/sentry_flutter
- 元数据来源：https://pub.dev/api/packages/sentry_flutter

### logger

- 归属：pub.dev 开源社区
- 用途：提供格式化的 Dart 日志输出。
- 适合：开发调试、可读日志与分级记录。
- 注意：生产日志需脱敏与控制开销，不应打印凭证。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add logger
- 注册表版本快照：2.8.0（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/logger
- 源码：https://github.com/SourceHorizon/logger
- pub.dev：https://pub.dev/packages/logger
- 元数据来源：https://pub.dev/api/packages/logger

### responsive_framework

**发布较早 · 先验证**

- 归属：pub.dev 开源社区
- 用途：提供断点与响应式布局辅助。
- 适合：手机、平板与桌面布局切换。
- 注意：缩放不能替代真正重排，仍需检查文字放大与可访问性。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add responsive_framework
- 注册表版本快照：1.5.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/responsive_framework
- 源码：https://github.com/Codelessly/ResponsiveFramework
- pub.dev：https://pub.dev/packages/responsive_framework
- 元数据来源：https://pub.dev/api/packages/responsive_framework

### gap

**发布较早 · 先验证**

- 归属：pub.dev 开源社区
- 用途：用可读组件声明 Flex 布局间距。
- 适合：行列间距与统一布局节奏。
- 注意：适合简单间距，不承担响应式布局。
- 技术栈：Flutter / Dart
- 安装起点：flutter pub add gap
- 注册表版本快照：3.0.1（核查 2026-11-01，不代表永久最新）
- 许可快照：MIT；以具体发布物及附带资源许可为准。
- 官网 / 文档：https://pub.dev/packages/gap
- 源码：https://github.com/letsar/gap
- pub.dev：https://pub.dev/packages/gap
- 元数据来源：https://pub.dev/api/packages/gap

## 维护

唯一目录数据源为 data/toolkit-library.json。修改选型说明后运行 npm run docs:toolkit。需要主动刷新 npm / pub.dev 官方元数据时运行 npm run refresh:toolkit，再审阅差异并运行 npm run build。刷新不安装任何第三方包，不修改人工用途说明；失败保留原快照并记录错误。源码项目的归档状态及企业归属需要人工复核。

第三方实现、商标与资源归各自所有；具体使用以发布物及附带资源 LICENSE 为准。
