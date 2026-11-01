export const kinds = { web: 'Web UI', flutter: 'Flutter UI', package: 'Flutter 常用包' };
export const origins = { tencent: '腾讯', bytedance: '字节跳动', alibaba: '阿里系 / 蚂蚁', jd: '京东', international: '国际生态', community: '其他社区' };

export function isHistorical(item) {
  return ['archived', 'paused'].includes(item.status) || item.snapshot?.discontinued === true || Boolean(item.snapshot?.deprecated);
}
export function maintenanceLabel(item, asOf) {
  if (item.status === 'archived') return '已归档 · 历史参考';
  if (item.status === 'paused') return '暂停维护 · 学习示例';
  if (item.snapshot?.discontinued || item.snapshot?.deprecated) return '停止维护 · 历史参考';
  const age = Date.parse(`${asOf}T00:00:00Z`) - Date.parse(item.snapshot?.published);
  if (age > 730 * 86400000) return '发布较早 · 先验证';
  return '';
}
const normalize = value => String(value || '').normalize('NFKC').toLowerCase().replace(/[_\-/]+/g, ' ').replace(/\s+/g, ' ').trim();
export function filterTools(catalog, filters = {}, favorites = new Set()) {
  const words = normalize(filters.query).split(' ').filter(Boolean);
  const recipe = filters.recipe ? catalog.recipes.find(item => item.id === filters.recipe) : null;
  return catalog.items.filter(item => {
    if (!filters.historical && isHistorical(item)) return false;
    if (filters.kind === 'favorites' && !favorites.has(item.id)) return false;
    if (filters.kind && !['all', 'favorites'].includes(filters.kind) && item.kind !== filters.kind) return false;
    if (filters.origin && filters.origin !== 'all' && item.origin !== filters.origin) return false;
    if (filters.category && filters.category !== 'all' && item.category !== filters.category) return false;
    if (filters.framework && filters.framework !== 'all' && !item.frameworks.includes(filters.framework)) return false;
    if (recipe && !recipe.items.includes(item.id)) return false;
    const haystack = normalize([item.name, item.package, item.description, item.best_for, item.category, item.owner, origins[item.origin], kinds[item.kind], ...item.tags, ...item.frameworks].join(' '));
    return words.every(word => haystack.includes(word));
  });
}
export function describeTool(item) {
  const snapshot = item.snapshot || {};
  return [
    `${item.name} · ${kinds[item.kind]}`,
    `归属：${item.owner}`,
    `用途：${item.description}`,
    `适合：${item.best_for}`,
    `注意：${item.caution}`,
    `技术栈：${item.frameworks.join(' / ')}`,
    item.install && !isHistorical(item) ? `安装起点：${item.install}` : '',
    snapshot.version ? `注册表版本快照：${snapshot.version}（核查 ${snapshot.checked_on}，不代表永久最新）` : '',
    snapshot.license ? `许可快照：${snapshot.license}；以具体发布物及附带资源许可为准。` : '',
    `官网 / 文档：${item.homepage}`,
    item.repository ? `源码：${item.repository}` : '',
    item.manager === 'pub' ? `pub.dev：https://pub.dev/packages/${item.package}` : '',
    snapshot.source ? `元数据来源：${snapshot.source}` : '',
  ].filter(Boolean).join('\n');
}
