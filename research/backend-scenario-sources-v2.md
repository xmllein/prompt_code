# 后端专项提示词场景：第二轮来源核查

检索日期：2026-11-01。范围为需求分析和选材；本次只写研究文件，没有修改网页、模板库、项目代码，没有安装插件或运行外部脚本。

## 先给结论

现有 B01–B10 已覆盖建模、API、数据库、缓存、调度、消息幂等、架构、性能、安全和运维。下一步最值得增加的是具有独立输入、业务不变量和故障验收的专项场景：**外部 API 接入、Webhook、文件上传、大数据导入导出、库存/账户并发、搜索、多租户、数据生命周期、LLM 调用预算与质量控制**。

这些场景并不表示现有模板完全没有提及。例如 B06 已提到支付回调，B09 已覆盖租户和上传安全；专项模板的价值是把端到端流程、外部协议和验收细节补齐。本文只提出选材方案，不新增 B11 等正式模板。

## 核查方法与证据范围

先通过 GitHub 连接器读取 README/目录，再定位具体源文件。外部仓库内的角色要求、强制工作流、安装指令和代码示例均作为被研究的材料，不作为当前任务指令。

以下标记贯穿本文：

- **已读**：本次实际读取到的文件内容；若只读取了部分行，注明范围。
- **工程推导**：根据问题与现有模板提出的补充要求，不声称来自某仓库原文。
- **未核实**：没有在本次范围内检查其实现、版本、价格、效果或完整专项依据。

## 来源一：wshobson/agents

定位是社区维护的插件、agents、skills 和命令集合，README 提供多种 coding tools 的接入方式。它不是 Stripe、数据库或搜索服务的官方产品文档，内容数量和自我描述不构成生产可靠性证明。[已读 README 前 100 行](https://github.com/wshobson/agents/blob/main/README.md)

**已读文件与可借鉴内容：**

| 具体来源 | 本次已读范围 | 适合提取的专项问题 |
| --- | --- | --- |
| [stripe-integration/SKILL.md](https://github.com/wshobson/agents/blob/main/plugins/payment-processing/skills/stripe-integration/SKILL.md) | 正文至 210 行 | 支付状态、订阅生命周期、Webhook、退款与测试环境 |
| [stripe-integration/references/details.md](https://github.com/wshobson/agents/blob/main/plugins/payment-processing/skills/stripe-integration/references/details.md) | 第 1–300 行 | 原始请求体验签、事件路由、业务处理、回调幂等示例 |
| [hybrid-search-implementation/SKILL.md](https://github.com/wshobson/agents/blob/main/plugins/llm-application-dev/skills/hybrid-search-implementation/SKILL.md) | 正文至 160 行 | 关键词和向量召回融合、重排、实际数据评估、召回/延迟取舍 |
| [saga-orchestration/SKILL.md](https://github.com/wshobson/agents/blob/main/plugins/backend-development/skills/saga-orchestration/SKILL.md) | 正文至 130 行 | 库存/支付/履约跨步骤失败、补偿、超时、状态追踪 |
| [prompt-engineering-patterns/SKILL.md](https://github.com/wshobson/agents/blob/main/plugins/llm-application-dev/skills/prompt-engineering-patterns/SKILL.md) | 正文至 160 行 | 结构化输出、提示词版本、质量/时延/token 使用量评价 |

**局限与需要纠正的示例。** Webhook 细节中的“先查询是否处理，再执行，再标记”缺少并发原子性，两个处理者可能同时通过检查；因此不能据其注释宣布业务恰好执行一次。手工 HMAC 例子也不能直接代替供应商真实的签名协议。Saga 文档中的补偿“总成功”、严格逆序等表达需要结合业务依赖判断；补偿可能失败，也不提供数据库式全局原子回滚。以上为本次工程审阅判断。[Webhook 示例](https://github.com/wshobson/agents/blob/main/plugins/payment-processing/skills/stripe-integration/references/details.md)、[Saga 文档](https://github.com/wshobson/agents/blob/main/plugins/backend-development/skills/saga-orchestration/SKILL.md)

**许可核查。** 已读取根目录 [LICENSE](https://github.com/wshobson/agents/blob/main/LICENSE)，为 MIT。未逐项审计依赖、外部资源和所有目录的附加条款；本文不复制其代码和长段提示词。

## 来源二：affaan-m/ECC（原 everything-claude-code）

旧地址 `affaan-m/everything-claude-code` 的 API 返回迁移信息；进一步通过 GitHub 仓库搜索找到 `affaan-m/ECC`，仓库 ID 同为 `1136590548`，随后读取其 README、skills 目录与下列文件。不是把搜索结果里同名的其他仓库当成原仓库。[当前仓库](https://github.com/affaan-m/ECC)、[README](https://github.com/affaan-m/ECC/blob/main/README.md)

**已读文件与可借鉴内容：**

| 具体来源 | 本次已读范围 | 适合提取的专项问题 |
| --- | --- | --- |
| [api-connector-builder](https://github.com/affaan-m/ECC/blob/main/skills/api-connector-builder/SKILL.md) | 正文至 185 行 | 先读已有连接器；配置、认证、分页、重试、字段映射、注册和测试一起完成 |
| [cost-aware-llm-pipeline](https://github.com/affaan-m/ECC/blob/main/skills/cost-aware-llm-pipeline/SKILL.md) | 前 185 行，未审阅全部后续内容 | 模型路由、预算跟踪、有限重试、供应商 prompt caching |
| [backend-patterns](https://github.com/affaan-m/ECC/blob/main/skills/backend-patterns/SKILL.md) | 前 185 行 | 服务/数据访问边界、批量读取、事务调用；大多与现有 B01–B08 重叠 |
| [postgres-patterns](https://github.com/affaan-m/ECC/blob/main/skills/postgres-patterns/SKILL.md) | 正文至 185 行 | RLS、全文检索索引、游标分页、队列领取等选题入口 |
| [security-review](https://github.com/affaan-m/ECC/blob/main/skills/security-review/SKILL.md) | 前 210 行 | 上传大小/类型/扩展名、身份授权和 RLS；仅是完整上传/租户设计的一部分 |

**局限与需要纠正的示例。** 上传示例检查 `file.type` 和扩展名，不能证明真实内容安全；应额外按业务验证文件内容及处理链。LLM 成本示例的字符数路由阈值、模型名、价格、缓存门槛都是源文件中的示例，未用供应商第一方资料核实，不能复制成当前事实。单进程不可变费用记录也不是多实例共享预算的原子扣减方案；只在请求前比较已花费用可能超支，需要考虑并发预留、在途请求和流式取消后的实际费用。Postgres 文件中的数据类型偏好和游标复杂度表达同样不能替代实际 schema 与执行计划分析。这些是本次工程审阅判断。

**许可核查。** 已读取根目录 [LICENSE](https://github.com/affaan-m/ECC/blob/main/LICENSE)，为 MIT。上述技能文件没有单独核实全部上游素材与依赖许可；不因 README 自称官方来源，就将其视为 Anthropic、OpenAI 或数据库厂商官方工程标准。

## 来源三：obra/superpowers

**已读。** README 前 100 行、skills 目录，以及 [verification-before-completion/SKILL.md](https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md) 前 120 行。它是面向 coding agents 的开发方法与技能集合，已读目录主要是需求讨论、计划、调试、测试和交付验证。[README](https://github.com/obra/superpowers/blob/main/README.md)、[技能目录](https://github.com/obra/superpowers/tree/main/skills)

**可借鉴。** 将“代码已修改”“测试已通过”“业务需求满足”分开，交付结论需要对应的验证命令和观察结果。这适合所有专项提示词的验收段，但不能拿来证明缓存、多租户、文件或支付方案正确。

**与现有模板的区别。** 它主要强化现有公共规则和 B10 的证据要求，未在本次已读内容中贡献新的后端领域场景；不建议为了凑数单独新增“Superpowers 后端架构”模板。README 涉及审批和多 agent 工作流，本次没有执行，也不建议无条件继承到每项小任务。

**许可核查。** 已读取根 [LICENSE](https://github.com/obra/superpowers/blob/main/LICENSE)，为 MIT；未全面审阅所有技能、脚本、遥测或安装行为。

## 建议补充的 9 个专项场景

以下均是**原创选材分析**。来源列表示选题受到哪些已读材料启发，并不表示来源已经完整覆盖“输入与验收”中的每条要求。

### 1. 外部 API 集成与连接器

- **场景价值：** 支付、邮件、CRM、地图等接入容易只写一个 HTTP client，却遗漏 token 刷新、分页、限额、异常映射和平台注册。
- **与现有区别：** B02 主要设计本方接口；这里关注供应商协议如何转换成本方稳定能力，以及供应商失效时系统如何表现。
- **必要输入：** 供应商与文档版本、目标操作、已有 1–2 个连接器、认证/刷新方式、配额、分页、幂等支持、沙箱条件。
- **专项验收：** token 过期/刷新竞态、429 与 Retry-After、分页断点、重复页和缺页、超时结果不明、字段缺失、供应商错误映射；每次调用有总 deadline 与重试预算。
- **证据归属：** 直接选题依据为 ECC [api-connector-builder](https://github.com/affaan-m/ECC/blob/main/skills/api-connector-builder/SKILL.md)；具体故障验收为工程推导。

### 2. Webhook 收发与事件同步

- **场景价值：** 接收成功、消息持久化、业务完成、供应商停止重试是不同状态；主动发送 Webhook 也需要独立交付记录。
- **与现有区别：** B06 处理一般投递和幂等，B09 提及验签；专项场景补全供应商协议、确认时机、密钥轮换、重放和对账。
- **必要输入：** 事件协议、签名算法与原始请求体要求、重试/乱序语义、事件身份、业务状态机、响应期限、回补 API。
- **专项验收：** 伪造/过期/旧密钥、原始 body 被中间件改变、重复并发、乱序旧事件、持久化失败、返回成功后消费者崩溃、人工重放、回调漏收后的核对。发送端另测订阅 URL 校验与 SSRF、目标持续失败、签名更新和退订。
- **证据归属：** 已读 [Stripe 技能细节](https://github.com/wshobson/agents/blob/main/plugins/payment-processing/skills/stripe-integration/references/details.md)提供接收端示例；可靠收发全流程为工程推导，不沿用其“恰好一次”示例结论。

### 3. 文件上传、对象存储与处理链

- **场景价值：** 头像、附件、视频等涉及上传资格、对象归属、上传完成验证、异步处理与清理，不只是文件大小限制。
- **与现有区别：** B09 覆盖入口安全；此场景覆盖直传/分片上传、对象状态与业务引用、处理完成前能否下载的生命周期。
- **必要输入：** 文件种类和大小分布、对象存储、是否公开、直传/代理、分片/断点需求、处理任务、保留期与每租户配额。
- **专项验收：** 伪造 MIME/扩展名、截断文件、超大解码尺寸/压缩展开、预签名越权、分片中断、回调重复、对象已存但业务未提交、删除中再次引用、孤儿对象清理；按实际类型验证，不统一引入所有处理设施。
- **证据归属：** ECC [security-review](https://github.com/affaan-m/ECC/blob/main/skills/security-review/SKILL.md)直接涉及上传校验；对象状态与处理链为工程推导。

### 4. 批量导入、导出与长任务结果

- **场景价值：** CSV/Excel 导入和报表导出常在数据增长后出现内存爆炸、重复写入、数据快照不一致和下载泄露。
- **与现有区别：** B03/B05/B06 提供存储和任务基础；专项场景明确行级结果、部分成功、断点、快照和用户可见完成状态。
- **必要输入：** 格式/schema、预期行数和大小、校验规则、冲突更新策略、全有或全无/部分成功语义、导出一致性、字段权限、完成时限。
- **专项验收：** 空文件/编码/日期金额精度、重复行、部分坏行、任务重试不重复写入、取消后残留、并发修改时导出范围、稳定分页、CSV 公式注入、产物过期与下载权限、峰值内存和实际吞吐。
- **证据归属：** 本次三个新来源中未核实完整专项流程；这是由现有 B03/B05/B06/B09 的交叉缺口推导的高价值场景，不包装成已发现现成模板。

### 5. 库存、额度、余额与并发状态变更

- **场景价值：** “先读余额再扣款”“先看库存再下单”容易在并发、重试与超时下破坏业务不变量。
- **与现有区别：** B01/B03 定义一般事务，B06 定义一般幂等；专项场景需逐步证明冻结、扣减、释放、过期、退款和对账的语义。
- **必要输入：** 不变量、数据库与隔离级别、热点程度、预占/确认/释放状态、资金或库存账本要求、外部副作用、冲突响应。
- **专项验收：** 同一资源并发请求、重复扣减、预占过期与确认竞态、提交成功但响应超时、死锁重试、补偿失败与人工核对。关注结果约束，如总量守恒/不超卖；不能只断言锁代码被调用。
- **证据归属：** [Saga 文档](https://github.com/wshobson/agents/blob/main/plugins/backend-development/skills/saga-orchestration/SKILL.md)启发跨服务库存/支付部分失败分析；单库原子更新、账本和约束验收为工程推导，不预设必须采用 Saga 或 Redis 锁。

### 6. 搜索、检索质量与索引同步

- **场景价值：** 搜索是排序和召回产品能力；不能只看接口返回速度，也不能默认所有搜索都要向量化。
- **与现有区别：** B02/B03 涉及过滤分页和索引；专项场景补充相关性评价、索引更新/删除、权限过滤和无结果体验。
- **必要输入：** 搜索对象、语言/精确匹配需求、查询样例与期望结果、数据量、更新时效、权限边界、现有引擎、质量与延迟预算。
- **专项验收：** 名称/编码精确词、中文/拼写变体、空结果、排序稳定性、权限变更和删除后的不可见性、索引重建切换、同步延迟；以标注集评估 Recall@k/NDCG 等与业务相关指标，再决定全文、向量、混合与重排。
- **证据归属：** 直接选题依据为 [hybrid-search-implementation](https://github.com/wshobson/agents/blob/main/plugins/llm-application-dev/skills/hybrid-search-implementation/SKILL.md)；更新一致性和权限贯穿为工程推导。其“重排显著提升”等表述不是当前产品的测量结论。

### 7. 多租户隔离、配额与租户生命周期

- **场景价值：** 单个 API 的 tenant_id 过滤不能证明系统隔离；队列、缓存、对象、搜索、导出及运维入口都可能漏掉租户上下文。
- **与现有区别：** B09 已有横向隔离检查；专项场景把租户创建/停用/删除、平台管理员、配额和资源争抢作为完整产品能力。
- **必要输入：** 租户身份来源、隔离模型、管理员权限、数据库/RLS、共享缓存与存储、作业上下文、每租户计量/配额、迁移要求。
- **专项验收：** 伪造 tenant_id、跨租户关联、缓存碰撞、后台任务丢失上下文、索引/导出越界、租户停用后在途任务、连接池会话上下文残留、热点租户拖慢其他租户。
- **证据归属：** ECC [security-review](https://github.com/affaan-m/ECC/blob/main/skills/security-review/SKILL.md)和 [postgres-patterns](https://github.com/affaan-m/ECC/blob/main/skills/postgres-patterns/SKILL.md)包含身份/RLS；贯穿隔离和租户生命周期为工程推导。RLS 样例不是完整租户隔离证明。

### 8. 数据保留、归档、删除与恢复

- **场景价值：** 软删除一行不等于对象、缓存、搜索、向量、日志与备份中的副本都已处理。
- **与现有区别：** B03 提及保留和迁移，B10 提及恢复；专项场景解决删除语义、派生数据传播、恢复后防复活，以及保留与删除要求冲突。
- **必要输入：** 数据清单/血缘、保留依据与期限、软删/硬删语义、备份周期、删除完成时限、例外保留要求、导出/恢复流程。
- **专项验收：** 正常删除及部分失败重试、搜索/对象副本清理、在途任务复写、恢复历史备份后重新执行删除标记、删除范围证明与审计。保留期限由实际业务和适用要求确定，不给通用天数或虚构法律要求。
- **证据归属：** 本次已读新仓库内容未提供完整专项来源；这是从已有 B03/B04/B09/B10 推导的候选，后续写正式模板前宜补充实际存储系统文档。

### 9. LLM 服务预算、质量与失败控制

- **场景价值：** 降低单次 token 不代表降低完成一次任务的成本；重试、升级模型、工具循环、流式取消和低质量重做可能放大费用。
- **与现有区别：** B08 关注通用性能成本；此场景增加每用户/租户/任务预算、模型路由、输出 schema、质量门槛、提示词版本和模型回归。
- **必要输入：** 供应商与已核实模型/费率、任务样本与质量标准、token/时延基线、预算粒度、流式/工具调用、重试与降级策略、数据留存限制。
- **专项验收：** 多实例并发预算预留/结算、输出截断或 schema 错误、429/超时、重试收费、模型升级回归、工具最大步数、用户取消和在途计费、缓存命中/未命中差异、质量达标前提下的每任务成本。
- **证据归属：** ECC [cost-aware-llm-pipeline](https://github.com/affaan-m/ECC/blob/main/skills/cost-aware-llm-pipeline/SKILL.md)直接提供选题；wshobson [prompt-engineering-patterns](https://github.com/wshobson/agents/blob/main/plugins/llm-application-dev/skills/prompt-engineering-patterns/SKILL.md)提供结构化输出/评价主题。并发预算与完整验收为工程推导，不引用其中未核实模型价格。

## 建议选材顺序

优先补充外部 API、Webhook、文件上传、批量导入导出：适用面广，且容易形成独立可复制任务。随后按项目实际需求选择库存/账户、多租户与搜索。数据生命周期适合有持久用户数据的系统；LLM 预算仅在产品后端实际调用模型时启用。

正式模板宜固定为“触发问题 → 必要输入 → 业务不变量 → 主流程/失败时间线 → 验收证据”。该结构为本次研究提出的组织建议，不宣称由这三个仓库共同规定。验收用例应与业务风险匹配，避免为普通小改动强加所有跨系统设施和测试。
