# PromptCode · 开发提示词工作台

**54 个中文开发场景：通用协作 6 个、前端 24 个、后端 24 个。** 搜索场景，补充项目背景与任务信息，预览后把完整提示词复制给 ChatGPT、Claude Code 等 AI 开发搭档。

纯静态网页，不调用模型接口、不需要账号或数据库。动效词典使用锁定版本的Animate.css与GSAP，并随站点自托管必要资源。项目背景、收藏、工作模式和填写内容保存在当前浏览器。浏览器不会把填写内容发送给本项目服务或模型；复制后的内容由用户决定如何使用。

## 快速开始

首次使用先准备依赖与动效资源（Node.js 22、npm、Python 3）：

```bash
npm ci
npm run dev
```

默认打开 [http://127.0.0.1:8765](http://127.0.0.1:8765)。服务只监听本机；端口占用时尝试后续 9 个端口，以终端打印的地址为准。按 `Ctrl+C` 停止。指定端口：

```bash
python3 scripts/serve.py --port 9000
```

依赖安装后，`npm run dev`准备动效资源并启动本地服务；也可以先运行 `node scripts/sync-motion-assets.mjs`，再运行 `python3 scripts/serve.py`。

## 网页使用

1. 选择前端、后端、通用协作或收藏，使用关键词和任务模式筛选。
2. 点击卡片的「复制提示词」直接复制；或点击「填写 / 预览」补充任务信息。
3. 按需要切换「分析设计 / 直接实施」；分析模式先给方案，实施模式在可用代码与工具范围内完成修改和验证。
4. 设置共同项目背景后，复制时自动加入。未填写的字段保留 `{{占位信息}}`，可在粘贴后补充。

复制的内容始终包括共同工作约束、工作模式和任务正文；设置了项目背景时一并合成。保留原 C01–C06、F01–F10、B01–B10 及其原字段键，已有收藏与填写内容可以继续使用。

`Cmd/Ctrl + K` 聚焦搜索。剪贴板 API 不可用时尝试选择复制，再提供手动全选入口。

本地设置以浏览器和访问地址为边界：更换浏览器、域名、端口，或清理浏览器数据后不会自动迁移。不要在共同背景中填写密钥等敏感内容。

## 动效词典

打开 [本地动效词典](http://127.0.0.1:8765/motion.html)，或从侧栏进入。包含 **97个Animate.css预设、16个GSAP概念演示、24个术语/对比条目**。每项展示准确英文名、中文解释、适用场景、注意点、示意代码，并可一键复制成动效要求。

默认静止、最多同时播放一个示例；支持停止复位与系统减少动态效果。ScrollTrigger、scrub、pin在卡片局部滚动区实际运行；GSAP Flip与Animate.css三维flip分别说明。时长滑块用于教学观察，不代表产品标准时长。

[动效词典文档](docs/motion-guide.md)与页面共用 `data/motion-library.json`。修改数据后运行 `npm run docs:motion`。Animate.css固定npm4.1.1的MIT发布物；GSAP3.15.0使用专用标准许可，不是MIT，详情见[第三方说明](THIRD_PARTY_NOTICES.md)和[来源核查](research/motion-sources.md)。

## 开源组件工具集

从侧栏打开「组件工具集」，页面路径为 `/toolkit.html`。收录 **94 项**资源：**27 个 Web UI、13 个 Flutter UI / 专项组件及历史参考、54 个 Flutter 常用包**，包括用户指定的 Ant Design Web3、TDesign Flutter 和 Fluro。

支持中英文包名与用途搜索、来源 / 技术栈 / 用途组合筛选、四组场景入口、浏览器收藏、安装命令复制、选型资料复制、筛选结果 JSON 导出。详情附官方文档、源码、npm / pub.dev 元数据、版本与许可快照。默认隐藏 4 个停止维护、归档或暂停维护的条目；发布较早但未明确停用的包（如 Fluro）保留并提示核对。

Flutter 常用包覆盖路由、状态管理、依赖注入、网络、数据模型、存储、文件、媒体、图表、表单、国际化、权限、定位、分享、通知、后台任务、WebView、扫码、地图、测试、监控和布局。Flutter 自带 Material / Cupertino 组件也在说明中提供官方入口。

「React 企业后台」展示备选设计体系，不建议全部混装；字节 ScrollKit 是已归档的滚动专项库，阿里 FlutterGo 是暂停维护的学习 App，不冒充完整、持续维护的 Flutter UI 库。Flutter 的 Fluent UI / macOS UI 是社区实现，分别与微软 / Apple 官方库区分。

唯一数据源为 [data/toolkit-library.json](data/toolkit-library.json)，可阅读生成的 [组件工具集文档](docs/toolkit-guide.md)。[Flutter UI 来源核查](research/flutter-ui-sources.md)记录企业归属、许可和历史项目边界；[工具集来源与维护说明](research/toolkit-sources.md)记录 Web UI 与通用包核查方式。

```bash
npm run docs:toolkit       # 人工编辑目录后同步 Markdown
npm run refresh:toolkit    # 主动采集官方注册表元数据，再同步文档
npm run build             # 校验、测试并生成静态站点
```

元数据刷新不会安装或执行所收录的包；采集失败保留原快照并标注错误。注册表版本来自 npm `latest` / pub.dev `latest`，不保证均为稳定版或适配当前项目。包内字体、商业扩展与云服务可能另有许可 / 费用。没有逐一安装或编译这些第三方组件，选型仍应根据目标 SDK 和平台验证。收藏按浏览器及访问地址分别保存；筛选条件写入 URL，不会自动上传。

## 模板内容

| 分类 | 数量 | 文档与主要场景 |
| --- | --- | --- |
| 通用协作 | 6 | [完整模板](prompts/common.md)：接手项目、需求拆分、调试、审查、前后端联调、交付验收 |
| 前端开发 | 24 | [完整模板](prompts/frontend.md)：UI/设计系统、布局、交互、动效、防闪烁、性能、架构、AI体验、无障碍，以及表格、分步表单、搜索、上传、图表、路由、实时订阅、离线、多语言、富文本、拖拽、E2E、升级、SEO |
| 后端开发 | 24 | [完整模板](prompts/backend.md)：建模、API、数据库、缓存、调度、队列、架构、性能、安全、运维，以及会话、第三方API、Webhook、对象存储、导入导出、并发变更、多租户、检索、数据生命周期、工作流、AI预算、通知、报表、功能开关 |

新增专项为 F11–F24、B11–B24。另补强现有模板中的主题首屏、弹层焦点、资源清理、SSR边界、多级缓存、调度治理、事件重放和背压预算。

每个模板都说明：适用场景、必要输入、关键约束、交付物与验收。使用时优先选择一个任务模板；需要组合时按阶段选择，不把所有模板一次性粘贴。具体方案仍需结合业务、版本、负载和实际证据判断。

模板文本跨模型可复用，不代表各模型具有相同工具、上下文或执行效果。模型不能访问仓库或运行验证时，应明确限制，不能将建议执行描述成已经执行。

## 构建与检查

部署构建只需要 Node.js 22 和 npm，无需 Python；`npm ci`按lockfile安装两个动效依赖：

```bash
npm ci
npm run build
```

构建会执行数据/引用/文档检查、JavaScript语法检查和内置测试，然后生成 `dist/`：

```text
dist/
  index.html
  motion.html / toolkit.html
  assets/  # 脚本、样式、图标与紧凑JSON，文件名带内容指纹
  vendor/  # 第三方许可标识
  data/prompt-library.json
  data/motion-library.json
  data/toolkit-library.json
```

静态产物可以单独托管，浏览器直接读取 JSON，不依赖本地 `/health` 或 Python API。

页面提前请求当前目录数据与模块依赖，避免等脚本执行后才开始下载。Animate.css 在首次播放 CSS 示例时加载；GSAP、ScrollTrigger 和 Flip 仅在对应演示需要时加载。首次播放可能短暂等待资源下载，后续播放复用资源。

构建为资源及其依赖生成内容指纹，并同步替换 HTML、模块导入和数据请求地址。`vercel.json` 对 `/assets/` 设置一年不可变缓存，页面与兼容的 `/data/` 地址每次校验；数据更新后会生成新资源地址。其他静态托管平台也应采用相同缓存策略，不能给无指纹的页面设置长期不可变缓存。开发服务继续校验源码，刷新即可看到修改。

本地预览与单独检查：

```bash
npm run preview
npm run check
npm test
```

预览默认是 [http://127.0.0.1:4173](http://127.0.0.1:4173)，运行预览命令前先构建。开发服务与预览服务的用途不同：前者直接读取源码，后者验证可部署产物。

## 后续部署到 Vercel

仓库：[xmllein/prompt_code](https://github.com/xmllein/prompt_code)。已提供 `vercel.json`，导入仓库时使用：

| 设置 | 值 |
| --- | --- |
| Root Directory | 仓库根目录 |
| Framework Preset | Other |
| Node.js | 22.x |
| Install Command | `npm ci`（或自动识别） |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| 环境变量 | 无 |

本次准备了配置与可部署产物；不会因此自动创建 Vercel 项目或执行部署。Vercel 构建不需要启动 Python 服务。

参考：[Vercel 项目配置](https://vercel.com/docs/project-configuration)、[配置构建](https://vercel.com/docs/builds/configure-a-build)。

## 文档与命令行复制

三个分类文档里的每个代码块都已合成完整提示词，可以独立复制。命令行复制使用 Python 标准库：

```bash
python3 scripts/export_prompts.py --list
python3 scripts/export_prompts.py --show B13
python3 scripts/export_prompts.py --copy F11
python3 scripts/export_prompts.py --copy B17 --mode implementation
```

macOS 使用系统 `pbcopy`；其他平台尝试已有剪贴板工具。没有可用工具时使用 `--show` 或复制 Markdown 代码块。脚本不会自动发送给模型。

## 数据与维护

唯一模板来源是 [data/prompt-library.json](data/prompt-library.json)。其中包含 `shared_instruction`、`modes`、`sources`、`repositories` 和 `prompts`。每个模板保留 `id`、`category`、`title`、`tags`、`use_when`、`default_mode`、`related`、`sources`、`body`。

网页按以下顺序合成：

```text
shared_instruction + modes[所选模式] + 可选项目背景 + 替换占位字段后的 body
```

修改 JSON 后，同步 Markdown 再验证构建：

```bash
python3 scripts/export_prompts.py
npm run build
```

网页开发服务刷新即可读取数据变更；线上部署使用新构建的 `dist/`。`dist/` 不提交 Git，避免与源数据分叉。

项目目录：

```text
web/          页面、样式、交互与可测试的合成/搜索函数
data/         唯一模板数据源
prompts/      从数据生成的完整 Markdown 模板
scripts/      本地服务、静态构建、资源同步、文档生成与数据检查
tests/        搜索、筛选、字段替换与兼容性测试
research/     来源核查和扩展分析的历史记录
docs/         与网页共用数据生成的动效词典
artifacts/    本地验收图（不提交Git）
vercel.json   Vercel 静态部署配置
```

## 来源与适用边界

模板为原创整理。外部资料用于发现工程问题与校核语义，没有大段搬运第三方代码或提示词，也没有安装或执行外部技能。

- [第一轮 GitHub 与工程资料核查](research/github-prompt-sources.md)
- [第二轮场景扩展分析](research/prompt-expansion-analysis-v2.md)
- [后端专项来源核查](research/backend-scenario-sources-v2.md)

研究记录按当时范围保留，提到的“26个现有模板”“候选未上线”描述的是扩展前的分析阶段；当前可用数据为54个。来源仓库的具体条目可能有框架版本、浏览器能力、许可或质量限制，应看具体文件。社区样例中的Webhook幂等、Saga补偿、模型价格和单进程预算不能直接作为生产保证。

## 验证范围

自动检查覆盖54个模板的ID/分类/关联/来源、占位符、Markdown与JSON一致性、文档本地链接；内置测试覆盖完整合成、特殊字符、多行与重复占位、旧填写兼容、模式校验、搜索相关性和组合筛选。

提示词工作台已验证54个卡片、前后端各24个场景、搜索与完整复制、字段合成、模式切换、收藏及刷新保存。动效词典已验证CSS预设和GSAP实际播放、交错、连续操作接管、播放头、布局Flip、局部滚动联动、pin占位回收及术语搜索。手机宽度、真实系统偏好切换、实际Vercel托管及所有浏览器兼容性未在本次环境完成实测。
