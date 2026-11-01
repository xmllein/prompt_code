import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { kinds, describeTool, maintenanceLabel } from '../web/toolkit-utils.js';

export function renderToolkitGuide(catalog) {
  return `# 开源组件工具集\n\n收录 ${catalog.items.length} 项：${Object.entries(kinds).map(([key, name]) => `${name} ${catalog.items.filter(item => item.kind === key).length} 项`).join('、')}。人工整理日期 ${catalog.curated_on}；注册表元数据快照 ${catalog.metadata_checked_on}。\n\n网页入口为站点的 /toolkit.html，支持搜索、来源 / 用途 / 技术栈筛选、场景组合、收藏、安装命令与选型信息复制、筛选结果 JSON 导出。\n\n版本与许可为采集快照，不代表永久最新。只建立目录，没有安装或运行第三方库。平台分析标签不等于实际编译验证，缺少标签不代表不支持。完整 UI 库、专项组件、源码组件和历史示例在用途与说明中区分；已归档、暂停或停止维护的条目默认隐藏。\n\nFlutter 自带的 Material / Cupertino 请参阅 [官方组件目录](https://docs.flutter.dev/ui/widgets)，无需第三方包。\n\n## 场景组合\n\n${catalog.recipes.map(recipe => `### ${recipe.name}\n\n${recipe.description}。${recipe.note}\n\n${recipe.items.map(id => { const item = catalog.items.find(item => item.id === id); return `- [${item.name}](${item.homepage})`; }).join('\n')}`).join('\n\n')}\n\n${Object.entries(kinds).map(([kind, title]) => `## ${title}\n\n${catalog.items.filter(item => item.kind === kind).map(item => `### ${item.name}\n\n${maintenanceLabel(item, catalog.metadata_checked_on) ? `**${maintenanceLabel(item, catalog.metadata_checked_on)}**\n\n` : ''}${describeTool(item).split('\n').slice(1).map(line => '- ' + line).join('\n')}`).join('\n\n')}`).join('\n\n')}\n\n## 维护\n\n唯一目录数据源为 data/toolkit-library.json。修改选型说明后运行 npm run docs:toolkit。需要主动刷新 npm / pub.dev 官方元数据时运行 npm run refresh:toolkit，再审阅差异并运行 npm run build。刷新不安装任何第三方包，不修改人工用途说明；失败保留原快照并记录错误。源码项目的归档状态及企业归属需要人工复核。\n\n第三方实现、商标与资源归各自所有；具体使用以发布物及附带资源 LICENSE 为准。\n`;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const catalog = JSON.parse(await readFile(new URL('../data/toolkit-library.json', import.meta.url), 'utf8'));
  await writeFile(new URL('../docs/toolkit-guide.md', import.meta.url), renderToolkitGuide(catalog));
  console.log(`已生成 ${catalog.items.length}项组件工具集文档。`);
}
