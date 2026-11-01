import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const cell = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');

export function renderMotionGuide(catalog) {
  const animate = catalog.effects.filter(effect => effect.library === 'animate');
  const gsap = catalog.effects.filter(effect => effect.library === 'gsap');
  const lines = ['# 动效词典：名称、含义与使用场景', '',
    `更新：${catalog.updated_at}。本文件从 data/motion-library.json 生成，与网页共用数据。包含 ${animate.length} 个 Animate.css 预设、${gsap.length} 个 GSAP 概念演示、${catalog.glossary.length} 个术语/对比条目。`, '',
    '网页入口：[动效词典](../web/motion.html)（请通过本地服务或静态站点打开，以运行预览）。', '',
    '## 先分清两类工具', '',
    '| 工具 | 你在选择什么 | 怎样写进提示词 |', '| --- | --- | --- |',
    '| Animate.css | 已命名的 CSS 预设效果 | 指明准确效果名、对象、触发时机和强度；v4 需要 animate__animated 与具体 animate__ 前缀类。 |',
    '| GSAP | 可组合的 API、配置、对象和插件 | 描述端点、时序、缓动、交错、滚动范围及中断/清理；卡片是教学编排，不是官方预设。 |', '',
    '**容易混淆：** Animate.css `flip` 是三维翻牌；GSAP `Flip` 是布局状态过渡。ScrollTrigger 触发播放、scrub 滚动联动和 pin 区间固定也不是同一个行为。', '',
    '## 术语速查', '', '| 术语 | 中文与类型 | 含义 | 注意 |', '| --- | --- | --- | --- |'];
  for (const term of catalog.glossary) lines.push(`| ${cell(term.term)} | ${cell(term.zh)} · ${cell(term.type)} | ${cell(term.definition)} | ${cell(term.pitfall)} |`);
  lines.push('', '## GSAP 概念与场景', '', '| 名称 | 中文 | 适用场景 | 边界 | 来源 |', '| --- | --- | --- | --- | --- |');
  for (const effect of gsap) lines.push(`| ${cell(effect.name)} | ${cell(effect.zh)} | ${cell(effect.scene)} | ${cell(effect.caution)} | [文档](${effect.source}) |`);
  lines.push('', '## Animate.css 完整名称', '', '以下名称来自锁定的 npm 4.1.1 发布 CSS，区分大小写；不收录发布文件中没有的旧 shake 别名。中文解释、场景与提示为原创教学建议。', '');
  for (const group of catalog.groups) {
    lines.push(`### ${group.zh} · ${group.en}`, '', group.scene, '', '| 效果名 | 中文理解 | 准确 CSS 类 |', '| --- | --- | --- |');
    for (const effect of animate.filter(effect => effect.group === group.id)) lines.push(`| ${cell(effect.name)} | ${cell(effect.zh)} | ${effect.className} |`);
    lines.push('', group.caution, '');
  }
  lines.push('## 时长、播放与无障碍', '',
    '- 画廊默认静止，最多同时播放一个演示；退出效果完成后可手动复位。教学演示的时长不代表产品建议或库默认。',
    '- Animate.css 4.1.1 的基准时长为1秒，但部分效果有倍率；预览显式指定 animation-duration 便于比较。flash 预览不短于1200ms，不自动循环。',
    '- GSAP 的 duration/delay 通常用秒；本页控件用毫秒。repeat 是首次之后的额外次数；yoyo 需要与 repeat 配合。',
    '- 系统请求减少动态效果时，不启动位移/缩放/闪烁演示，仍可阅读说明、复制描述或代码。GSAP不会因加载库就自动落实此偏好。',
    '- 滚动示例只在卡片自己的滚动舞台运行。重新播放、筛选或离开页面会回收旧补间、时间线、触发器与事件。', '',
    '## 在开发任务中使用', '',
    '选择效果后复制动效描述，填入目标组件与触发操作，再结合 [F05 自然动效模板](../prompts/frontend.md#f05--自然动效与流畅状态衔接) 使用。说明目的、端点、节奏、连续操作、中断、焦点与 reduced motion，不能只给一个效果名。', '',
    '## 版本、许可与第一方资料', '',
    `- Animate.css：固定 npm ${catalog.versions.animate} 发布物，许可证为 MIT；对应 GitHub main 的许可可能不同，不能混同。`,
    `- GSAP：固定 npm ${catalog.versions.gsap}，适用 GSAP Standard no-charge 专用许可，并非 MIT；脚本保留原始版权标识。`,
    '- [Animate.css 官网](https://animate.style/)、[GSAP 文档](https://gsap.com/docs/v3/)、[GSAP 标准许可](https://gsap.com/standard-license)。',
    '- [来源核查与语义细节](../research/motion-sources.md)、[第三方许可说明](../THIRD_PARTY_NOTICES.md)。', '');
  return lines.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const catalog = JSON.parse(await readFile(path.join(root, 'data/motion-library.json'), 'utf8'));
  await mkdir(path.join(root, 'docs'), { recursive: true });
  await writeFile(path.join(root, 'docs/motion-guide.md'), renderMotionGuide(catalog));
  console.log('已同步动效词典文档。');
}
