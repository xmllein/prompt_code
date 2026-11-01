# 动效词典：名称、含义与使用场景

更新：2026-11-01。本文件从 data/motion-library.json 生成，与网页共用数据。包含 97 个 Animate.css 预设、16 个 GSAP 概念演示、24 个术语/对比条目。

网页入口：[动效词典](../web/motion.html)（请通过本地服务或静态站点打开，以运行预览）。

## 先分清两类工具

| 工具 | 你在选择什么 | 怎样写进提示词 |
| --- | --- | --- |
| Animate.css | 已命名的 CSS 预设效果 | 指明准确效果名、对象、触发时机和强度；v4 需要 animate__animated 与具体 animate__ 前缀类。 |
| GSAP | 可组合的 API、配置、对象和插件 | 描述端点、时序、缓动、交错、滚动范围及中断/清理；卡片是教学编排，不是官方预设。 |

**容易混淆：** Animate.css `flip` 是三维翻牌；GSAP `Flip` 是布局状态过渡。ScrollTrigger 触发播放、scrub 滚动联动和 pin 区间固定也不是同一个行为。

## 术语速查

| 术语 | 中文与类型 | 含义 | 注意 |
| --- | --- | --- | --- |
| duration | 时长 · 通用参数 | 一次动画持续多久。CSS常写ms/s，GSAP通常使用秒。 | 0.8秒 = 800毫秒；画廊时长便于观察，不等于产品推荐时长。 |
| delay | 延迟 · 通用参数 | 动作开始前等待多久。 | 延迟过长会让用户以为点击没有生效。 |
| easing | 缓动 · 通用概念 | 时间进度如何映射为属性变化的节奏。 | ease-out先快后慢；back/elastic可能越过终点。 |
| transform | 变换 · CSS属性 | 通过translate、scale、rotate等改变视觉呈现。 | 优先考虑位移和透明度，但合成动画不等于没有成本。 |
| opacity | 透明度 · CSS属性 | 从不可见到可见的程度。 | opacity:0不会自动移除布局、焦点或点击命中。 |
| transform-origin | 变换支点 · CSS属性 | 旋转与缩放围绕哪个位置发生。 | 围绕角落旋转和围绕中心旋转有不同观感。 |
| fill-mode | 前后状态保留 · CSS参数 | 动画开始前与结束后是否应用关键帧状态。 | Animate.css通常使用both；退出后元素仍需由业务正确卸载。 |
| keyframes | 关键帧 · 通用概念 | 描述动画途中若干时刻的状态。 | CSS的@keyframes与GSAP关键帧语法不同。 |
| prefers-reduced-motion | 减少动态效果 · 用户偏好 | 用户希望减少非必要位移、缩放等动态刺激。 | 本页遵从系统偏好，保留文字说明与复制功能。 |
| iteration-count | 播放次数 · CSS参数 | CSS动画的总播放次数。 | 与GSAP repeat不同：CSS次数1是总共1遍，GSAP repeat:1是额外再播1遍。 |
| Tween | 补间 · GSAP对象 / 通用概念 | 计算属性从一个状态到另一个状态的中间值。 | 多个补间可放入Timeline组织。 |
| to / from / fromTo | 端点定义 · GSAP核心API | 分别只指定终点、只指定起点、明确指定两端。 | 选择方式取决于现有状态与是否需要重复复位。 |
| Timeline | 时间线 · GSAP核心对象 | 统一安排多个补间的顺序和播放控制。 | 可串行、重叠、加标签，而非多个独立延时。 |
| position / label | 位置参数 / 标签 · GSAP编排 | 控制补间在时间线上的开始时点。 | 标签表示时间，不是HTML元素。 |
| stagger | 交错 / 错峰 · GSAP配置 / 通用概念 | 分配多个目标的开始时间。 | each是相邻间隔，amount是开始时点分布的总跨度。 |
| repeat / yoyo | 重复 / 往返 · GSAP配置 | repeat增加播放次数，yoyo让重复的方向交替。 | yoyo需要repeat；不要无理由无限循环。 |
| overwrite | 覆盖冲突 · GSAP配置 | 处理同一目标上并存补间的冲突。 | 默认false；auto针对活动补间的同属性冲突。 |
| play / pause / reverse / progress | 播放头控制 · GSAP方法 | 播放、暂停、倒放或设置0到1之间的进度。 | 暂停、结束与销毁资源是不同动作。 |
| ScrollTrigger | 滚动触发器 · GSAP插件 | 把滚动范围与动画或回调关联。 | 使用前需注册插件并明确scroller、start与end。 |
| scrub | 滚动联动 · ScrollTrigger配置 | 让滚动进度推动播放头。 | 数字值是追赶耗时，不是动画总时长。 |
| pin | 区间固定 · ScrollTrigger配置 | 在激活的滚动范围中固定元素。 | pin的占位、父容器与结束边界会影响页面布局。 |
| Flip / FLIP | 布局状态过渡 · GSAP插件 / 技术思路 | First、Last、Invert、Play：从布局前后状态构建视觉过渡。 | 不等于三维翻牌，也不是禁止一切布局计算。 |
| entrance / exit | 入场 / 离场 · 通用分类 | 帮助用户理解内容出现和消失的状态变化。 | 动画结束与DOM挂载/卸载、焦点恢复要协调。 |
| stagger vs delay | 错峰与延迟的区别 · 概念对比 | delay是等待，stagger是为一组目标分配不同开始时间。 | 一个元素延迟500ms，不等于列表逐项交错。 |

## GSAP 概念与场景

| 名称 | 中文 | 适用场景 | 边界 | 来源 |
| --- | --- | --- | --- | --- |
| Tween | 补间动画 | 理解位置、缩放、透明度随时间变化。 | 补间是通用概念，Tween也是GSAP对象；不是某一个视觉预设。 | [文档](https://gsap.com/docs/v3/GSAP/Tween/) |
| gsap.to() | 从当前状态到终点 | 按钮反馈、卡片移动、连续状态变化。 | 重播前复位是画廊行为；真实交互应从当前状态衔接。 | [文档](https://gsap.com/docs/v3/GSAP/gsap.to()/) |
| gsap.from() | 从指定起点进入 | 标题或内容从下方淡入。 | 注意初始渲染与immediateRender，避免先出现再闪回起点。 | [文档](https://gsap.com/docs/v3/GSAP/gsap.from()/) |
| gsap.fromTo() | 明确起点和终点 | 已知两端的转场或受控状态变化。 | duration、ease等控制参数放终点配置；不是所有交互都要强制重设起点。 | [文档](https://gsap.com/docs/v3/GSAP/gsap.fromTo()/) |
| Timeline | 时间线编排 | 标题、说明、按钮按顺序进入。 | 串行、同时与重叠应有清晰节奏；不依赖多个任意setTimeout。 | [文档](https://gsap.com/docs/v3/GSAP/Timeline/) |
| Position / Label | 重叠时序与标签 | 让正文在标题尚未结束时进入，减少机械等待。 | 标签是命名时间点，不是DOM标签；"<"与"-=0.2"语义不同。 | [文档](https://gsap.com/docs/v3/GSAP/Timeline/) |
| Easing / ease | 缓动曲线对比 | 比较none、power2.out、back.out和elastic.out。 | 回弹可能超过终点；缓动不是时长，也不能自动解决布局抖动。 | [文档](https://gsap.com/docs/v3/Eases/) |
| Stagger | 交错 / 错峰出现 | 列表、网格、文字块逐项出现。 | each是相邻间隔，amount是整体开始时间的分布跨度；限制总等待。 | [文档](https://gsap.com/resources/getting-started/Staggers/) |
| repeat | 有限重复 | 有限的强调或可停止的状态指示。 | repeat: 2总共播放3遍；-1才是无限循环，本页不采用无限循环。 | [文档](https://gsap.com/docs/v3/GSAP/gsap.to()/) |
| yoyo | 往返播放 | 引导点去程与回程、来回状态示意。 | 需要配合repeat；只写yoyo:true不会自动增加一次反向播放。 | [文档](https://gsap.com/docs/v3/GSAP/gsap.to()/) |
| overwrite | 新意图接管 | 快速切换目标位置，平滑跟随最新操作。 | auto只处理活动同属性补间冲突；不是防抖，也不是所有抖动的万能修复。 | [文档](https://gsap.com/docs/v3/GSAP/gsap.to()/) |
| Playback control | 暂停、倒放与进度 | 可暂停演示、产品讲解和交互式转场。 | 倒放从当前播放头开始；取消时还需回收动画和监听。 | [文档](https://gsap.com/docs/v3/GSAP/Timeline/) |
| ScrollTrigger | 滚动触发 | 内容进入视口后出现一次。 | 触发后可按时间自行播放；并不等于滚多少走多少。 | [文档](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| scrub | 滚动进度联动 | 随滚动推进的进度、产品故事和局部视差。 | scrub:true直接关联；数字表示追赶耗时（秒），不是动画总时长或平滑滚动。 | [文档](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| pin | 滚动区间固定 | 局部说明、对照或分步骤滚动叙事。 | 需要规划占位与结束边界；本页只固定演示区，不劫持整页滚动。 | [文档](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| Flip | 布局 FLIP 过渡 | 网格转列表、卡片重排和容器位置变化。 | 这是GSAP布局插件，不是Animate.css flip的三维翻牌；仍需评估布局成本。 | [文档](https://gsap.com/docs/v3/Plugins/Flip/) |

## Animate.css 完整名称

以下名称来自锁定的 npm 4.1.1 发布 CSS，区分大小写；不收录发布文件中没有的旧 shake 别名。中文解释、场景与提示为原创教学建议。

### 强调与提醒 · Attention seekers

短暂提示新内容、状态或操作反馈。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| bounce | 弹跳 | animate__animated animate__bounce |
| flash | 闪烁 | animate__animated animate__flash |
| headShake | 轻摇强调 | animate__animated animate__headShake |
| heartBeat | 心跳缩放 | animate__animated animate__heartBeat |
| jello | 果冻形变 | animate__animated animate__jello |
| pulse | 脉冲缩放 | animate__animated animate__pulse |
| rubberBand | 橡皮筋拉伸 | animate__animated animate__rubberBand |
| shakeX | 水平摇动 | animate__animated animate__shakeX |
| shakeY | 垂直摇动 | animate__animated animate__shakeY |
| swing | 摆动 | animate__animated animate__swing |
| tada | 欢呼强调 | animate__animated animate__tada |
| wobble | 左右晃动 | animate__animated animate__wobble |

强调动作不适合反复播放；错误应同时有文字，不能只抖动。

### 回缩进入 · Back entrances

带缩放回拉感的内容进入。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| backInDown | 回缩进入 · 上方 → 下移 | animate__animated animate__backInDown |
| backInLeft | 回缩进入 · 左侧 → 右移 | animate__animated animate__backInLeft |
| backInRight | 回缩进入 · 右侧 → 左移 | animate__animated animate__backInRight |
| backInUp | 回缩进入 · 下方 → 上移 | animate__animated animate__backInUp |

风格较鲜明，克制使用；不是页面默认过渡。

### 回缩退出 · Back exits

带缩放回拉感的内容离场。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| backOutDown | 回缩退出 · 向下 | animate__animated animate__backOutDown |
| backOutLeft | 回缩退出 · 向左 | animate__animated animate__backOutLeft |
| backOutRight | 回缩退出 · 向右 | animate__animated animate__backOutRight |
| backOutUp | 回缩退出 · 向上 | animate__animated animate__backOutUp |

离场完成后再按业务需要卸载，预留区域避免布局跳动。

### 弹跳进入 · Bouncing entrances

活泼的奖励卡、引导或活动内容。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| bounceIn | 弹跳进入 | animate__animated animate__bounceIn |
| bounceInDown | 弹跳进入 · 上方 → 下移 | animate__animated animate__bounceInDown |
| bounceInLeft | 弹跳进入 · 左侧 → 右移 | animate__animated animate__bounceInLeft |
| bounceInRight | 弹跳进入 · 右侧 → 左移 | animate__animated animate__bounceInRight |
| bounceInUp | 弹跳进入 · 下方 → 上移 | animate__animated animate__bounceInUp |

常规管理界面优先更克制的渐显；弹跳幅度需匹配风格。

### 弹跳退出 · Bouncing exits

活泼风格下的内容退出。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| bounceOut | 弹跳退出 | animate__animated animate__bounceOut |
| bounceOutDown | 弹跳退出 · 向下 | animate__animated animate__bounceOutDown |
| bounceOutLeft | 弹跳退出 · 向左 | animate__animated animate__bounceOutLeft |
| bounceOutRight | 弹跳退出 · 向右 | animate__animated animate__bounceOutRight |
| bounceOutUp | 弹跳退出 · 向上 | animate__animated animate__bounceOutUp |

不要让退出动画拖慢连续操作。

### 渐显进入 · Fading entrances

内容加载完成、轻量提示与面板出现。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| fadeIn | 渐显进入 | animate__animated animate__fadeIn |
| fadeInBottomLeft | 渐显进入 · 左下方向 | animate__animated animate__fadeInBottomLeft |
| fadeInBottomRight | 渐显进入 · 右下方向 | animate__animated animate__fadeInBottomRight |
| fadeInDown | 渐显进入 · 上方 → 下移 | animate__animated animate__fadeInDown |
| fadeInDownBig | 渐显进入 · 上方 → 下移 · 大位移 | animate__animated animate__fadeInDownBig |
| fadeInLeft | 渐显进入 · 左侧 → 右移 | animate__animated animate__fadeInLeft |
| fadeInLeftBig | 渐显进入 · 左侧 → 右移 · 大位移 | animate__animated animate__fadeInLeftBig |
| fadeInRight | 渐显进入 · 右侧 → 左移 | animate__animated animate__fadeInRight |
| fadeInRightBig | 渐显进入 · 右侧 → 左移 · 大位移 | animate__animated animate__fadeInRightBig |
| fadeInTopLeft | 渐显进入 · 左上方向 | animate__animated animate__fadeInTopLeft |
| fadeInTopRight | 渐显进入 · 右上方向 | animate__animated animate__fadeInTopRight |
| fadeInUp | 渐显进入 · 下方 → 上移 | animate__animated animate__fadeInUp |
| fadeInUpBig | 渐显进入 · 下方 → 上移 · 大位移 | animate__animated animate__fadeInUpBig |

方向变体也包含位移；首屏内容不应长期隐藏等待动画。

### 渐隐退出 · Fading exits

Toast、提示或辅助内容退出。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| fadeOut | 渐隐退出 | animate__animated animate__fadeOut |
| fadeOutBottomLeft | 渐隐退出 · 左下方向 | animate__animated animate__fadeOutBottomLeft |
| fadeOutBottomRight | 渐隐退出 · 右下方向 | animate__animated animate__fadeOutBottomRight |
| fadeOutDown | 渐隐退出 · 向下 | animate__animated animate__fadeOutDown |
| fadeOutDownBig | 渐隐退出 · 向下 · 大位移 | animate__animated animate__fadeOutDownBig |
| fadeOutLeft | 渐隐退出 · 向左 | animate__animated animate__fadeOutLeft |
| fadeOutLeftBig | 渐隐退出 · 向左 · 大位移 | animate__animated animate__fadeOutLeftBig |
| fadeOutRight | 渐隐退出 · 向右 | animate__animated animate__fadeOutRight |
| fadeOutRightBig | 渐隐退出 · 向右 · 大位移 | animate__animated animate__fadeOutRightBig |
| fadeOutTopLeft | 渐隐退出 · 左上方向 | animate__animated animate__fadeOutTopLeft |
| fadeOutTopRight | 渐隐退出 · 右上方向 | animate__animated animate__fadeOutTopRight |
| fadeOutUp | 渐隐退出 · 向上 | animate__animated animate__fadeOutUp |
| fadeOutUpBig | 渐隐退出 · 向上 · 大位移 | animate__animated animate__fadeOutUpBig |

透明不等于不可交互；退出完成后管理焦点与点击命中。

### 三维翻转 · Flippers

翻牌、正反面内容揭示。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| flip | 三维翻牌 | animate__animated animate__flip |
| flipInX | 绕X轴翻入 | animate__animated animate__flipInX |
| flipInY | 绕Y轴翻入 | animate__animated animate__flipInY |
| flipOutX | 绕X轴翻出 | animate__animated animate__flipOutX |
| flipOutY | 绕Y轴翻出 | animate__animated animate__flipOutY |

这是三维旋转；与GSAP Flip布局过渡插件不同。

### 倾斜快速出入 · Lightspeed

品牌化的小元素快速入场或离场。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| lightSpeedInLeft | 倾斜快速出入 · 左侧 → 右移 | animate__animated animate__lightSpeedInLeft |
| lightSpeedInRight | 倾斜快速出入 · 右侧 → 左移 | animate__animated animate__lightSpeedInRight |
| lightSpeedOutLeft | 倾斜快速出入 · 向左 | animate__animated animate__lightSpeedOutLeft |
| lightSpeedOutRight | 倾斜快速出入 · 向右 | animate__animated animate__lightSpeedOutRight |

大位移与倾斜较强，不建议给整页内容使用。

### 旋转进入 · Rotating entrances

徽章、装饰或特定风格内容入场。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| rotateIn | 旋转进入 | animate__animated animate__rotateIn |
| rotateInDownLeft | 旋转进入 · DownLeft 支点变体 | animate__animated animate__rotateInDownLeft |
| rotateInDownRight | 旋转进入 · DownRight 支点变体 | animate__animated animate__rotateInDownRight |
| rotateInUpLeft | 旋转进入 · UpLeft 支点变体 | animate__animated animate__rotateInUpLeft |
| rotateInUpRight | 旋转进入 · UpRight 支点变体 | animate__animated animate__rotateInUpRight |

变体包含不同旋转支点；不适合大量正文反复旋转。

### 旋转退出 · Rotating exits

装饰或特殊场景内容退出。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| rotateOut | 旋转退出 | animate__animated animate__rotateOut |
| rotateOutDownLeft | 旋转退出 · DownLeft 支点变体 | animate__animated animate__rotateOutDownLeft |
| rotateOutDownRight | 旋转退出 · DownRight 支点变体 | animate__animated animate__rotateOutDownRight |
| rotateOutUpLeft | 旋转退出 · UpLeft 支点变体 | animate__animated animate__rotateOutUpLeft |
| rotateOutUpRight | 旋转退出 · UpRight 支点变体 | animate__animated animate__rotateOutUpRight |

保持阅读方向与操作位置可预测。

### 特殊动效 · Specials

活动、奖励或演示性内容。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| hinge | 铰链掉落 | animate__animated animate__hinge |
| jackInTheBox | 弹盒式出现 | animate__animated animate__jackInTheBox |
| rollIn | 滚动旋转进入 | animate__animated animate__rollIn |
| rollOut | 滚动旋转退出 | animate__animated animate__rollOut |

表演性较强，使用前确认产品风格与用户任务。

### 缩放进入 · Zooming entrances

卡片、徽章、轻量面板出现。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| zoomIn | 缩放进入 | animate__animated animate__zoomIn |
| zoomInDown | 缩放进入 · 上方 → 下移 | animate__animated animate__zoomInDown |
| zoomInLeft | 缩放进入 · 左侧 → 右移 | animate__animated animate__zoomInLeft |
| zoomInRight | 缩放进入 · 右侧 → 左移 | animate__animated animate__zoomInRight |
| zoomInUp | 缩放进入 · 下方 → 上移 | animate__animated animate__zoomInUp |

缩放不改变布局占位；保持文字在完成后清晰。

### 缩放退出 · Zooming exits

移除卡片、关闭辅助内容。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| zoomOut | 缩放退出 | animate__animated animate__zoomOut |
| zoomOutDown | 缩放退出 · 向下 | animate__animated animate__zoomOutDown |
| zoomOutLeft | 缩放退出 · 向左 | animate__animated animate__zoomOutLeft |
| zoomOutRight | 缩放退出 · 向右 | animate__animated animate__zoomOutRight |
| zoomOutUp | 缩放退出 · 向上 | animate__animated animate__zoomOutUp |

卸载时机与视觉退出协调，避免保留透明点击层。

### 滑动进入 · Sliding entrances

抽屉、侧栏或方向明确的内容进入。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| slideInDown | 滑动进入 · 上方 → 下移 | animate__animated animate__slideInDown |
| slideInLeft | 滑动进入 · 左侧 → 右移 | animate__animated animate__slideInLeft |
| slideInRight | 滑动进入 · 右侧 → 左移 | animate__animated animate__slideInRight |
| slideInUp | 滑动进入 · 下方 → 上移 | animate__animated animate__slideInUp |

位移较大，实际抽屉可能更适合自定义小距离过渡。

### 滑动退出 · Sliding exits

抽屉、侧栏或内容滑出。

| 效果名 | 中文理解 | 准确 CSS 类 |
| --- | --- | --- |
| slideOutDown | 滑动退出 · 向下 | animate__animated animate__slideOutDown |
| slideOutLeft | 滑动退出 · 向左 | animate__animated animate__slideOutLeft |
| slideOutRight | 滑动退出 · 向右 | animate__animated animate__slideOutRight |
| slideOutUp | 滑动退出 · 向上 | animate__animated animate__slideOutUp |

离场与路由、焦点恢复同步；舞台裁剪不是性能保证。

## 时长、播放与无障碍

- 画廊默认静止，最多同时播放一个演示；退出效果完成后可手动复位。教学演示的时长不代表产品建议或库默认。
- Animate.css 4.1.1 的基准时长为1秒，但部分效果有倍率；预览显式指定 animation-duration 便于比较。flash 预览不短于1200ms，不自动循环。
- GSAP 的 duration/delay 通常用秒；本页控件用毫秒。repeat 是首次之后的额外次数；yoyo 需要与 repeat 配合。
- 系统请求减少动态效果时，不启动位移/缩放/闪烁演示，仍可阅读说明、复制描述或代码。GSAP不会因加载库就自动落实此偏好。
- 滚动示例只在卡片自己的滚动舞台运行。重新播放、筛选或离开页面会回收旧补间、时间线、触发器与事件。

## 在开发任务中使用

选择效果后复制动效描述，填入目标组件与触发操作，再结合 [F05 自然动效模板](../prompts/frontend.md#f05--自然动效与流畅状态衔接) 使用。说明目的、端点、节奏、连续操作、中断、焦点与 reduced motion，不能只给一个效果名。

## 版本、许可与第一方资料

- Animate.css：固定 npm 4.1.1 发布物，许可证为 MIT；对应 GitHub main 的许可可能不同，不能混同。
- GSAP：固定 npm 3.15.0，适用 GSAP Standard no-charge 专用许可，并非 MIT；脚本保留原始版权标识。
- [Animate.css 官网](https://animate.style/)、[GSAP 文档](https://gsap.com/docs/v3/)、[GSAP 标准许可](https://gsap.com/standard-license)。
- [来源核查与语义细节](../research/motion-sources.md)、[第三方许可说明](../THIRD_PARTY_NOTICES.md)。
