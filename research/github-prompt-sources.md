# AI 编程提示词与工程规则：来源核查

检索日期：2026-11-01。通过 GitHub 连接器读取仓库 README、具体规则/技能文件及许可文件；通过联网检索读取性能、缓存和任务调度的第一方文档。本文件是选材研究，不代表已经安装这些资源，也不代表这些规则经过当前项目验证。

## 结论

对开发加速最有价值的材料，是围绕具体工作建立的工程规则、技能和验收流程。通用“扮演资深工程师”提示词可以作为开头，但不够约束接口、缓存一致性、并发行为和视觉稳定性。以下优先级是根据本次需求做出的编辑判断，并非仓库效果排名。

| 建议优先级 | 来源 | 最适合借鉴的内容 | 主要局限 |
| --- | --- | --- | --- |
| 高 | [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) | React/Next.js 性能、交互可用性、动效检查 | React/Next.js 与 Vercel 倾向明显；需检查项目版本 |
| 高 | [Awesome GitHub Copilot](https://github.com/github/awesome-copilot) | 按技术和任务划分的工程 instructions、skills、agents | Copilot 文件格式和工具约定需要转译 |
| 高 | [Anthropic Skills](https://github.com/anthropics/skills) | 设计 brief、视觉自检、浏览器验证流程 | 新视觉设计的默认倾向不应覆盖已有产品风格 |
| 中 | [Awesome Cursor Rules](https://github.com/PatrickJS/awesome-cursorrules) | 按技术栈组织的规则目录、团队规范组织方式 | 各规则深度不同，有些只是角色和主题清单 |
| 补充 | [prompts.chat](https://github.com/f/prompts.chat) | 通用提示词分类、跨模型文本模板、浏览和复制入口 | 不能直接替代工程规范和实测验收 |

## 1. Vercel Agent Skills

**核实内容。** README 包含 `react-best-practices`、`web-design-guidelines`、React Native 等技能。具体 React 技能按优先级排列请求瀑布、包体积、服务端性能、客户端数据请求、重渲染等主题，适合改写成“先测量，再按影响排序优化”的提示词。[README](https://github.com/vercel-labs/agent-skills/blob/main/README.md)、[React 技能正文](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md)

**前端可借鉴。** 把“流畅、不抖动、不突兀”拆成图片占位、主题首屏一致性、显式动画属性、可中断动效、减弱动效偏好、焦点可见、异步反馈等检查项。`web-design-guidelines` 本身主要是取最新规则并检查文件的工作流；真正的规则在另一个仓库，不应误以为复制这个短技能文件就包含全部 UI 标准。[技能入口](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md)、[实际规则 command.md](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)

**后端可借鉴。** 数据获取并行化、避免请求瀑布、减少跨边界序列化等对 Next.js 服务端有帮助；它不是覆盖数据库事务、队列语义和领域拆分的完整后端架构规范。[React 技能正文](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md)

**使用局限。** 部分规则是项目取舍而非所有应用的强制标准，例如列表虚拟化阈值、URL 同步范围、字体和预加载策略。应改写为根据数据规模、交互和实测选择，避免所有项目机械套用。README 和具体技能的规则数量也可能不同，不以数量判断质量。

**许可核查。** React 技能 frontmatter 明确声明 `MIT`。本次读取根目录未发现 `LICENSE`，且读取该路径返回 404；因此不能据此宣布整个仓库和外部规则均采用 MIT。`web-design-guidelines` 及外部规则的完整许可本次未核实，若要复制再分发应单独检查。[React 许可声明](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md)

## 2. Awesome GitHub Copilot

**核实内容。** GitHub 组织下的社区集合，包含 agents、instructions、skills、hooks、workflows、plugins 和 cookbook。`instructions` 文档区分仓库级正文与带文件匹配 frontmatter 的指令文件。[README](https://github.com/github/awesome-copilot/blob/main/README.md)、[Instructions 目录说明](https://github.com/github/awesome-copilot/blob/main/docs/README.instructions.md)

**前端可借鉴。** 按无障碍、框架、测试等维度拆规则，避免每次给模型粘贴整个知识库；常驻项目规则和一次性任务说明分开维护。[Instructions 目录说明](https://github.com/github/awesome-copilot/blob/main/docs/README.instructions.md)

**后端可借鉴。** 已读取 `aspnet-rest-apis.instructions.md`，其覆盖资源 URL、HTTP 方法、接口结构、验证、认证授权、统一错误、OpenAPI、日志、测试与性能，适合提取成后端功能设计检查表。[ASP.NET API 规则](https://github.com/github/awesome-copilot/blob/main/instructions/aspnet-rest-apis.instructions.md)

**使用局限。** 示例 ASP.NET 规则明确围绕 ASP.NET Core 10，并强调教学解释；若当前目标是修改已有 Java/Go/Node 项目，应借鉴检查结构，不能复制其版本与实现要求。Copilot 的 `applyTo` 和安装按钮也不会因为文本被粘贴进其他模型就自动生效。

**许可核查。** 根目录 LICENSE 为 MIT；复制实质性内容时保留许可及版权说明，并检查具体资源是否附带额外条款。[LICENSE](https://github.com/github/awesome-copilot/blob/main/LICENSE)

## 3. Anthropic Skills

**核实内容。** README 将技能定义为包含说明、脚本和资源的目录。本次具体读取 `frontend-design` 和 `webapp-testing`。[README](https://github.com/anthropics/skills/blob/main/README.md)

**前端可借鉴。** `frontend-design` 要求从产品、受众和任务出发选择颜色、字型与布局，先形成简短设计方案，构建后自检；也强调动效回应用户操作、减少无目的装饰和核查截图。这有助于把“高级感”“智能感”转成具体设计决策。[frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)

**交互验证可借鉴。** `webapp-testing` 提供本地 Web 应用的 Playwright 工作流、服务启动辅助工具、DOM/截图观察与操作验证。适合补到提示词末尾，要求模型实际检查关键流程并汇报证据。[webapp-testing](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md)

**后端可借鉴。** 更适合参考“操作流程 + 支撑资源”的技能封装方式；上述两个技能本身不提供完整缓存、任务调度或数据库设计规范。

**使用局限。** `frontend-design` 对新作品有鲜明视觉方向的要求，在已有产品中必须由当前产品设计系统约束。测试示例中的 `networkidle` 也不是所有页面的可靠就绪信号；存在轮询、长连接时，应改用目标元素或业务就绪状态断言。后一句是本次工程判断，不能直接当成该仓库原文结论。

**许可核查。** 所读取的 `frontend-design/LICENSE.txt` 和 `webapp-testing/LICENSE.txt` 均为 Apache-2.0。不能把整个仓库统一标为 Apache-2.0：README 明确说明 docx/pdf/pptx/xlsx 等文档技能是 source-available、并非开源，具体条款应分别查看。[设计技能许可](https://github.com/anthropics/skills/blob/main/skills/frontend-design/LICENSE.txt)、[测试技能许可](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/LICENSE.txt)、[仓库许可说明](https://github.com/anthropics/skills/blob/main/README.md)

## 4. Awesome Cursor Rules

**核实内容。** 当前 README 介绍 `.cursor/rules/*.mdc`，目录覆盖前端框架、后端与全栈、数据库/API、测试、部署、安全等分类。旧文章可能仍围绕单一 `.cursorrules` 文件描述，使用时以当前来源为准。[README](https://github.com/PatrickJS/awesome-cursorrules/blob/main/README.md)

**前后端可借鉴。** 适合参考按技术栈和职责组织提示词的方式，并从与当前依赖版本一致的规则中选择少量内容。[规则目录](https://github.com/PatrickJS/awesome-cursorrules/tree/main/rules)

**使用局限。** 本次读取的 `go-backend-scalability` 主要列出数据库、API、缓存、微服务等能力范围，以及回答结构；它的名称不意味着已经给出可直接落地的高并发设计。需要补上 QPS、数据量、延迟目标、幂等性和失败恢复等输入。也不应继承其中“不具备实时信息”等与实际工具环境不符的假设。[已读取的 Go 规则](https://github.com/PatrickJS/awesome-cursorrules/blob/main/rules/go-backend-scalability-cursorrules-prompt-file.mdc)

**许可核查。** 根目录 LICENSE 为 CC0 1.0 Universal。[LICENSE](https://github.com/PatrickJS/awesome-cursorrules/blob/main/LICENSE)

## 5. prompts.chat（原 Awesome ChatGPT Prompts）

**核实内容。** 旧仓库 `f/awesome-chatgpt-prompts` 的 GitHub API 返回迁移信息；进一步搜索和读取确认当前为 `f/prompts.chat`。README 保留旧名称说明，提供网站浏览、`prompts.csv` 和 `PROMPTS.md` 等入口，并说明面向多种聊天模型。[当前 README](https://github.com/f/prompts.chat/blob/main/README.md)

**可借鉴。** 适合作为通用提示词目录、分类和浏览复制体验的参考；可搜索需求分析、工程师和产品设计等主题。本次核实了 README 与许可，但 `PROMPTS.md` 的文件读取返回空内容，未据此验证或推荐某个具体工程提示词条目。

**使用局限。** 通用提示词和角色说明不能证明模型会执行测试、理解代码库或正确设计缓存；工程模板仍需自行补充技术版本、项目文件、验收条件和不确定性处理。

**许可核查。** 根 LICENSE 明确采用双许可：源代码及站点编写内容为 MIT；提示词内容和数据（包括 `prompts.csv`、`PROMPTS.md` 以及用户提交文本）为 CC0 1.0。不能简单说整个仓库都是 CC0。[LICENSE](https://github.com/f/prompts.chat/blob/main/LICENSE)

## 6. 性能、缓存和任务调度的第一方资料

这些资料不是提示词仓库。它们用于给模板提供能验证的技术依据。

| 资料 | 可写进模板的具体要求 | 适用限制 |
| --- | --- | --- |
| [web.dev：Web Vitals](https://web.dev/articles/vitals) | 关注加载 LCP、交互 INP、稳定性 CLS；良好阈值分别为 2.5 秒、200 毫秒、0.1，在真实用户第 75 百分位、按移动/桌面区分衡量 | 单次本地 Lighthouse 测试不能证明真实用户指标达标 |
| [web.dev：Optimize CLS](https://web.dev/articles/optimize-cls) | 给图片/嵌入内容预留尺寸，检查动态插入、字体变化以及加载后的布局偏移 | CLS 无法覆盖所有闪烁、抖动和不顺畅，仍需场景验证 |
| [web.dev：高性能 CSS 动画](https://web.dev/articles/animations-guide) | 优先 transform/opacity；其他动画属性需要评估布局、绘制成本 | 不等于所有布局动画都应禁止，应看实际必要性与测量结果 |
| [Redis：Cache-aside](https://redis.io/docs/latest/develop/use-cases/cache-aside/) | 以数据库为事实来源，缓存未命中再读取；明确 TTL、写入失效及击穿防护 | Cache-aside 不自动提供数据库与缓存的强一致性 |
| [Redis：Key eviction](https://redis.io/docs/latest/develop/reference/eviction/) | 缓存设计需要内存上限、淘汰策略及运行指标，不能只写 TTL | 适用于可重建缓存副本；队列、锁或关键状态不能随意按缓存淘汰 |
| [BullMQ：Job Schedulers](https://docs.bullmq.io/guide/job-schedulers/) | 区分调度器和实际任务执行；定义固定间隔/cron、稳定调度 ID 与重复配置更新 | 按实际安装版本核对 API，调度时间不等于任务保证准时开始 |
| [BullMQ：Idempotent jobs](https://docs.bullmq.io/patterns/idempotent-jobs) | 设计可重试任务时确保重复执行不改变正确业务结果，把复杂作业拆成可恢复步骤 | 队列去重不能代替数据库唯一约束和业务幂等 |

上表“适用限制”结合第一方文档和工程判断整理。模板中不要把示例指标、固定 TTL 或并发数写成全项目通用的硬编码默认值。

## 7. 如何转成自己的提示词库

建议将内容分为三层：项目上下文（技术栈、版本、设计系统、负载和现有架构）、单任务模板（如防闪烁、缓存设计、定时任务）、验收要求（测试步骤、指标、截图或日志证据）。这是一种根据本次需求提出的组织方案，不是上述仓库共同规定的标准。

选用外部规则时，先提取其解决的问题和验证方法，再改写为与项目有关的约束。对于会执行脚本、访问账号或部署的技能，需要单独检查其工具行为；本次任务仅研究和编写提示词，不执行这些安装与部署步骤。
