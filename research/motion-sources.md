# 动效名称、概念与实现：第一方来源核查

检索日期：2026-11-01。仅阅读官网、官方仓库和 npm 发布元数据；为核对许可，以内存方式读取 npm tarball 的文本文件，没有安装包或运行包脚本。以下“事实”来自来源，“演示建议/场景”是原创教学设计。

## 版本与静态演示分发

| 对象 | 本次核实事实 | 实现判断 |
| --- | --- | --- |
| Animate.css npm 发布物 | `animate.css@4.1.1` 是 registry 的 latest；该版本 npm 元数据标 MIT，tarball 的 `package/LICENSE` 为 MIT，`animate.css` 文件头也标 MIT。[版本元数据](https://registry.npmjs.org/animate.css/4.1.1)、[对应 tarball](https://registry.npmjs.org/animate.css/-/animate.css-4.1.1.tgz) | 可固定此 npm 发布物自托管用于静态教学演示，保留其版权和 MIT 许可文本。不要把这个判断扩展到 GitHub 当前主分支。 |
| Animate.css GitHub main | 当前 `package.json` 仍写 4.1.1，但许可字段为 Hippocratic-2.1，根 LICENSE 也是 Hippocratic 2.1。[package.json](https://github.com/animate-css/animate.css/blob/main/package.json)、[LICENSE](https://github.com/animate-css/animate.css/blob/main/LICENSE) | **发布物与主分支存在差异**；不能从 main 取代码后只依据同版本号宣称 MIT。 |
| GSAP npm 发布物 | `gsap@3.15.0` 是 registry 的 latest；许可字段为 Standard “no charge” license。[版本元数据](https://registry.npmjs.org/gsap/3.15.0)、[官方 package.json](https://github.com/greensock/GSAP/blob/master/package.json) | 固定 3.15.0，保留原有版权/专有标识与适用许可说明。**GSAP 不是 MIT。** |
| GSAP 许可 | 标准许可允许网站、Web 应用和数字界面使用，包括商业项目；限制帮助构建与 Webflow 动画构建能力竞争的可视化无代码动画工具，并禁止移除专有标识。现行页面注明生效 2025-04-30、修改 2025-05-30。[标准许可与 FAQ](https://gsap.com/community/standard-license/) | 只播放预置代码、解释术语的静态教学画廊属于普通网站用途的实现判断；若以后转成可视化动画编辑器，应重新检查产品能力是否落入限制。免费商用不等于没有使用条件。 |

## Animate.css：已核实的分类和准确名称

官方站点展示的是效果名称；v4 实际使用需要基础类 `animate__animated` 加 `animate__` 前缀，例如 `animate__animated animate__fadeInUp`。效果名大小写有意义，`heartBeat`、`jackInTheBox`、`lightSpeedInRight` 不能随意改写。[官网](https://animate.style/)、[官方效果导入清单](https://github.com/animate-css/animate.css/blob/main/source/animate.css)

| 官方分类 | 中文理解 | 准确名称示例/家族 |
| --- | --- | --- |
| Attention seekers | 引起注意 | `bounce`, `flash`, `pulse`, `rubberBand`, `shakeX`, `shakeY`, `headShake`, `swing`, `tada`, `wobble`, `jello`, `heartBeat` |
| Back entrances | 带回缩感的进入 | `backInDown`, `backInLeft`, `backInRight`, `backInUp` |
| Back exits | 带回缩感的退出 | `backOutDown`, `backOutLeft`, `backOutRight`, `backOutUp` |
| Bouncing entrances | 弹跳进入 | `bounceIn` 与 `bounceInDown/Left/Right/Up` |
| Bouncing exits | 弹跳退出 | `bounceOut` 与 `bounceOutDown/Left/Right/Up` |
| Fading entrances | 渐显进入 | `fadeIn`, `fadeInUp`, `fadeInLeftBig`, `fadeInTopLeft` 等 |
| Fading exits | 渐隐退出 | `fadeOut`, `fadeOutDown`, `fadeOutRightBig`, `fadeOutBottomRight` 等 |
| Flippers | 三维翻转 | `flip`, `flipInX`, `flipInY`, `flipOutX`, `flipOutY` |
| Lightspeed | 倾斜快速出入 | `lightSpeedInRight/Left`, `lightSpeedOutRight/Left` |
| Rotating entrances | 旋转进入 | `rotateIn` 与 `rotateInDownLeft/DownRight/UpLeft/UpRight` |
| Rotating exits | 旋转退出 | `rotateOut` 与 `rotateOutDownLeft/DownRight/UpLeft/UpRight` |
| Specials | 特殊动作 | `hinge`, `jackInTheBox`, `rollIn`, `rollOut` |
| Zooming entrances | 缩放进入 | `zoomIn` 与 `zoomInDown/Left/Right/Up` |
| Zooming exits | 缩放退出 | `zoomOut` 与 `zoomOutDown/Left/Right/Up` |
| Sliding entrances | 滑入 | `slideInDown`, `slideInLeft`, `slideInRight`, `slideInUp` |
| Sliding exits | 滑出 | `slideOutDown`, `slideOutLeft`, `slideOutRight`, `slideOutUp` |

表格中的 `/` 是家族简写，例如 `slideInDown/Left` 指 `slideInDown` 与 `slideInLeft`，不能原样作为类名。完整效果清单以实际发布 CSS 为准。

**时间事实。** 4.1.1 基准 `--animate-duration: 1s`；`animate__faster/fast/slow/slower` 分别使用基准的 0.5/0.8/2/3 倍。部分效果另有倍率，例如 `bounceIn/bounceOut` 为 0.75 倍、`heartBeat` 为 1.3 倍、`hinge` 为 2 倍，不能说全部效果默认都是 1 秒。延时由 `--animate-delay` 配合 `animate__delay-1s` 等类控制。来源为实际 4.1.1 发布 CSS，以及官方 [基础规则](https://github.com/animate-css/animate.css/blob/main/source/_base.css)。

**无障碍事实。** 4.1.1 在 `prefers-reduced-motion: reduce` 或打印模式下把动画/过渡压缩为 1ms、迭代次数设为 1；带 `Out` 的退出效果设置透明度为 0。它不是简单删除所有效果；自定义覆盖不应破坏此行为。[发布物](https://registry.npmjs.org/animate.css/-/animate.css-4.1.1.tgz)、[基础规则](https://github.com/animate-css/animate.css/blob/main/source/_base.css)

## GSAP：建议演示的 16 个概念

“缓动、错峰、补间、FLIP”等本身也有通用动画含义；表内明确哪些是 GSAP API、配置或插件。右列全部为原创演示建议，并非官方效果名。

| 概念 | 类型与已核实语义 | 演示建议与场景 |
| --- | --- | --- |
| Tween / 补间 | 通用概念 + GSAP `Tween` 实例：随时间改变属性。[核心文档](https://gsap.com/docs/v3/) | 一个方块的位置/透明度变化，展示“起点→中间值→终点”。 |
| `gsap.to()` | 核心 API：指定终点，从当前状态动画过去。[to](https://gsap.com/docs/v3/GSAP/gsap.to()/) | 按钮点击后卡片移到目标位。 |
| `gsap.from()` | 核心 API：指定起点，动画到已有状态。[from](https://gsap.com/docs/v3/GSAP/gsap.from()/) | 内容从下方淡入到 CSS 正常位置。 |
| `gsap.fromTo()` | 核心 API：明确起点和终点；duration 等控制参数写在终点配置。[fromTo](https://gsap.com/docs/v3/GSAP/gsap.fromTo()/) | 同一方块稳定重播固定两端。 |
| Timeline / 时间线 | 核心对象：组织多个动画，统一控制播放。[Timeline](https://gsap.com/docs/v3/GSAP/Timeline/) | 标题、正文、按钮依次出现。 |
| Position / Label | 时间线参数与标签：控制串行、重叠和命名时间点。[Timeline](https://gsap.com/docs/v3/GSAP/Timeline/) | 对比依次播放、同时播放和部分重叠。 |
| Easing / 缓动 | 通用概念 + `ease` 配置：改变时间进度与属性变化的关系；如 `none`, `power2.out`, `back.out`。[缓动文档](https://gsap.com/docs/v3/Eases/) | 相同距离和时长，对比匀速、减速、回弹；不能称为三个不同插件。 |
| Stagger / 错峰 | 通用概念 + `stagger` 配置：分配多个目标的开始时间；`each` 为间隔，`amount` 为总体分布时长。[Staggers](https://gsap.com/resources/getting-started/Staggers/) | 列表依次出现或从网格中心扩散。 |
| `repeat` | 配置：首次之后再重复几次；`repeat: 1` 总共两次，`-1` 无限。[to 配置](https://gsap.com/docs/v3/GSAP/gsap.to()/) | 用有限循环展示加载提示，标注总次数。 |
| `yoyo` | 配置：有 repeat 时交替正向/反向；只写 yoyo 不代表自动往返。[to 配置](https://gsap.com/docs/v3/GSAP/gsap.to()/) | 指示点去程与回程对比；提供停止。 |
| `overwrite` | 配置：默认 false；true 立即取消相同目标的其他补间，`"auto"` 在首次渲染时只处理活动补间中的同属性冲突。[to 配置](https://gsap.com/docs/v3/GSAP/gsap.to()/) | 连点左右按钮，观察新意图接管；不是防抖节流，也不是自动修复全部抖动。 |
| Playback control | 核心方法：`play/pause/reverse/restart/progress` 等控制播放头。[Timeline](https://gsap.com/docs/v3/GSAP/Timeline/) | 播放、暂停、倒放、重播按钮与 0–1 进度条。 |
| ScrollTrigger | 插件：根据滚动范围触发行为或关联动画。[插件文档](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | 内容进入演示滚动区时出现；注明 scroller。 |
| `scrub` | ScrollTrigger 配置：把滚动进度关联到动画；true 直接关联，数字为播放头追赶耗时（秒）。[插件文档](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | 对比触发后自行播放与滚多少走多少；scrub 不是平滑滚动本身。 |
| `pin` | ScrollTrigger 配置：在激活范围固定一个元素，true 固定 trigger；通常有占位间距。[插件文档](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | 面板在一段滚动里停驻，其他内容继续走；不等同于全站滚动劫持。 |
| Flip | 插件：记录前状态→改变布局/DOM→从前状态向新布局补间；常用 `Flip.getState`、`Flip.from`。[Flip](https://gsap.com/docs/v3/Plugins/Flip/) | 网格切列表、卡片重排。**不是 Animate.css 的 `flip` 三维翻牌效果。** |

MotionPath 可作为后续按需扩展：它是路径运动插件，可让元素沿 SVG 路径/坐标运动；不是基础位移的必选依赖。[MotionPathPlugin](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/)

## 原创落地建议与限制

- 先展示“名称 + 中文解释 + 最小演示 + 适用任务 + 可复制描述”，不要让用户必须理解代码才能识别效果。Animate.css 以预设效果检索，GSAP 以可组合概念学习。
- 默认静止，点击播放；避免几十个注意力效果一起自动运行。退出演示完成后给显式复位，不让容器塌陷。`flash` 等示例也不应高频自动循环。
- 时长单位分清：GSAP duration/delay 等主要用秒；产品提示词可用毫秒。150–300ms 等交互时长只能标为本项目建议，不能伪称库默认。
- 动效画廊可用便于观察的稍长时间，实际产品按信息层级和操作节奏缩短。弹跳、强旋转和大位移适合强调示例，不自动推荐给所有业务界面。
- GSAP 不会因为加载核心就自动为全部动画实现 reduced motion。用 [`gsap.matchMedia()`](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) 区分偏好，为 reduce 提供静态结果或弱化版本，保留内容和操作可用性。
- 反复播放前清理旧 tween/timeline/ScrollTrigger；组件卸载回收监听和样式。滚动 demo 的 pin 要作用在限定舞台，避免改变整页布局；真实效果、无障碍和流畅程度仍需在浏览器实际验证。
