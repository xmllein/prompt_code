import { kinds, origins, filterTools, isHistorical, maintenanceLabel, describeTool } from './toolkit-utils.js';

const $ = selector => document.querySelector(selector);
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const safeURL = url => { try { return new URL(url).protocol === 'https:' ? escape(url) : ''; } catch { return ''; } };
const external = (url, label) => safeURL(url) ? `<a href="${safeURL(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} ↗</a>` : '';
const defaults = { kind: 'all', query: '', category: 'all', origin: 'all', framework: 'all', recipe: '', historical: false };
const filters = { ...defaults };
let catalog, favorites = new Set(), shown = 24, currentItem, toastTimer, matches = [];
let storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem('promptcode:toolkit:favorites') || '[]');
  if (Array.isArray(saved)) favorites = new Set(saved.filter(value => typeof value === 'string'));
} catch { storageAvailable = false; }

function notify(message) {
  clearTimeout(toastTimer);
  $('#toast-text').textContent = message;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 2800);
}
function updateStorageStatus() {
  $('#storage-status').textContent = storageAvailable ? '收藏保存在当前浏览器' : '浏览器存储不可用 · 收藏仅本次有效';
}
async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    notify('已复制到剪贴板');
  } catch {
    $('#toolkit-copy-text').value = text;
    $('#toolkit-copy-dialog').showModal();
    $('#toolkit-copy-text').focus();
    $('#toolkit-copy-text').select();
  }
}
function loadURL() {
  const params = new URL(location.href).searchParams;
  for (const key of ['kind', 'query', 'category', 'origin', 'framework', 'recipe']) if (params.has(key)) filters[key] = params.get(key);
  filters.historical = params.get('historical') === '1';
  if (!['all', 'favorites', ...Object.keys(kinds)].includes(filters.kind)) filters.kind = 'all';
  if (!['all', ...Object.keys(origins)].includes(filters.origin)) filters.origin = 'all';
  if (!catalog.items.some(item => item.category === filters.category)) filters.category = 'all';
  if (!catalog.items.some(item => item.frameworks.includes(filters.framework))) filters.framework = 'all';
  if (!catalog.recipes.some(recipe => recipe.id === filters.recipe)) filters.recipe = '';
}
function syncURL() {
  const url = new URL(location.href);
  for (const [key, value] of Object.entries(filters)) {
    if (value === defaults[key]) url.searchParams.delete(key);
    else url.searchParams.set(key, key === 'historical' ? '1' : value);
  }
  history.replaceState(null, '', url);
}
function renderCard(item) {
  const snapshot = item.snapshot || {};
  const health = maintenanceLabel(item, catalog.metadata_checked_on || catalog.curated_on);
  const historical = isHistorical(item);
  const mark = item.kind === 'web' ? 'W' : item.kind === 'flutter' ? 'F' : 'P';
  return `<article class="tool-card" data-id="${escape(item.id)}" data-kind="${escape(item.kind)}">
    <div class="tool-card-top"><span class="tool-mark" aria-hidden="true">${mark}</span><div><span class="tool-kind">${kinds[item.kind]} · ${escape(item.category)}</span><span class="tool-owner">${escape(item.owner)}</span></div><button class="tool-favorite" data-favorite="${escape(item.id)}" aria-label="收藏 ${escape(item.name)}" aria-pressed="${favorites.has(item.id)}">${favorites.has(item.id) ? '★' : '☆'}</button></div>
    <h3><button data-detail="${escape(item.id)}">${escape(item.name)}</button></h3><p class="tool-description">${escape(item.description)}</p>
    <div class="tool-tags">${[...item.frameworks, item.category].map(tag => `<span class="tool-tag">${escape(tag)}</span>`).join('')}</div>
    ${health ? `<div class="tool-health">${escape(health)}</div>` : ''}
    <div class="tool-version"><span>${snapshot.version ? `v${escape(snapshot.version)}` : '源码参考'}${item.refresh_error ? ' · 刷新失败' : ''}</span><span>${escape(snapshot.license || '许可见发布物')}</span></div>
    <div class="tool-footer"><div>${external(item.homepage, '文档')}<button class="preview-button" data-detail="${escape(item.id)}">详情</button></div>${item.install && !historical ? `<button class="copy-button" data-install="${escape(item.id)}" aria-label="复制 ${escape(item.name)} 安装命令">复制安装</button>` : '<span class="source-label">历史资料</span>'}</div>
  </article>`;
}
function render() {
  matches = filterTools(catalog, filters, favorites);
  $('#toolkit-grid').innerHTML = matches.slice(0, shown).map(renderCard).join('');
  $('#toolkit-grid').setAttribute('aria-busy', 'false');
  $('#toolkit-empty').hidden = matches.length > 0;
  const hiddenMatches = filters.historical ? 0 : filterTools(catalog, { ...filters, historical: true }, favorites).length - matches.length;
  $('#toolkit-empty p').textContent = hiddenMatches > 0 ? `另有 ${hiddenMatches} 项历史参考。勾选「包含历史参考」可查看其来源和维护状态。` : filters.kind === 'favorites' ? '点击组件卡片上的 ☆ 加入收藏，或清除当前筛选。' : '试试包名或更宽泛的用途，也可以清除筛选。';
  $('#load-more').hidden = matches.length <= shown;
  $('#load-more').textContent = `显示更多 · 还有 ${Math.max(0, matches.length - shown)} 项`;
  const hiddenCount = catalog.items.filter(isHistorical).length;
  $('#toolkit-count').textContent = `${matches.length} 项匹配 · 已展示 ${Math.min(shown, matches.length)} 项${filters.historical ? '' : ` · ${hiddenCount} 项历史参考已隐藏`}`;
  for (const button of document.querySelectorAll('[data-kind]')) {
    if (button.tagName !== 'BUTTON') continue;
    const kind = button.dataset.kind;
    button.setAttribute('aria-pressed', filters.kind === kind);
    button.querySelector('span').textContent = catalog.items.filter(item => (filters.historical || !isHistorical(item)) && (kind === 'all' || (kind === 'favorites' ? favorites.has(item.id) : item.kind === kind))).length;
  }
  for (const button of document.querySelectorAll('[data-recipe]')) button.setAttribute('aria-pressed', filters.recipe === button.dataset.recipe);
  const recipe = catalog.recipes.find(item => item.id === filters.recipe);
  $('#recipe-note').hidden = !recipe;
  $('#recipe-note').textContent = recipe ? `${recipe.name}：${recipe.note}` : '';
  for (const key of ['origin', 'category', 'framework']) $(`#toolkit-${key}`).value = filters[key];
  $('#toolkit-search').value = filters.query;
  $('#include-historical').checked = filters.historical;
  $('#export-tools').disabled = matches.length === 0;
  syncURL();
}
function reset() {
  Object.assign(filters, defaults);
  shown = 24;
  render();
}
function openDetail(item) {
  currentItem = item;
  const snapshot = item.snapshot || {};
  const health = maintenanceLabel(item, catalog.metadata_checked_on || catalog.curated_on);
  const details = [
    ['维护者 / 归属', item.owner],
    ['技术栈', item.frameworks.join(' / ')],
    ['包名', item.package || '无通用组件包（示例应用）'],
    ['版本快照', snapshot.version || '不适用'],
    ['发布日期', snapshot.published?.slice(0, 10) || '注册表未提供'],
    ['核查日期', snapshot.checked_on || '尚未核查'],
    ['许可快照', snapshot.license || '请核对具体发布物 LICENSE'],
    ...(item.manager === 'pub' ? [['Dart SDK 约束', snapshot.sdk || '未提供'], ['Flutter 约束', snapshot.flutter_sdk || '未单独声明'], ['平台分析标签', snapshot.platforms?.join(' / ') || '分析暂未返回；不代表不支持']] : []),
    ...(snapshot.peer_dependencies ? [['依赖约束', Object.entries(snapshot.peer_dependencies).map(([name, range]) => `${name}: ${range}`).join('；') || '未声明 peerDependencies']] : []),
  ];
  $('#detail-title').textContent = item.name;
  $('#detail-eyebrow').textContent = `${kinds[item.kind]} / ${item.category}`;
  $('#detail-content').innerHTML = `${health ? `<p class="detail-notice">${escape(health)}</p>` : ''}<h3>用来做什么</h3><p>${escape(item.description)}</p><h3>适合的场景</h3><p>${escape(item.best_for)}</p><h3>选型前留意</h3><p>${escape(item.caution)}</p>${item.refresh_error ? `<p class="detail-notice">最近刷新失败，以下可能为旧快照：${escape(item.refresh_error)}</p>` : ''}${item.install && !isHistorical(item) ? `<h3>安装起点</h3><div class="detail-install"><code>${escape(item.install)}</code><button class="copy-button" data-install="${escape(item.id)}">复制</button></div><p><small>命令只复制，不执行。注册表会按项目约束解析版本；代码生成、主题和平台权限按官方指南继续配置。</small></p>` : ''}<h3>官方元数据快照</h3><dl>${details.map(([key, value]) => `<dt>${escape(key)}</dt><dd>${escape(value)}</dd>`).join('')}</dl><p><small>许可标签不替代 LICENSE；Forui 等包内字体和资源可能单独授权。SDK 约束、平台标签不等于已在本项目完成兼容测试。</small></p><div class="detail-links">${external(item.homepage, '官方文档 / 项目入口')}${external(item.repository, '源码仓库')}${item.manager === 'pub' ? external(`https://pub.dev/packages/${item.package}`, 'pub.dev') : ''}${external(snapshot.source, '元数据来源')}${external(snapshot.score_source, '平台 / 许可分析')}${external(item.license_review?.source, '源码 LICENSE')}</div>`;
  $('#tool-detail').showModal();
}

document.addEventListener('click', event => {
  const close = event.target.closest('[data-close]');
  if (close) $(`#${close.dataset.close}`).close();
  const install = event.target.closest('[data-install]');
  if (install) {
    const item = catalog?.items.find(item => item.id === install.dataset.install);
    if (item?.install && !isHistorical(item)) copy(item.install);
  }
  const detail = event.target.closest('[data-detail]');
  if (detail) {
    const item = catalog?.items.find(item => item.id === detail.dataset.detail);
    if (item) openDetail(item);
  }
  const favorite = event.target.closest('[data-favorite]');
  if (favorite && catalog) {
    const id = favorite.dataset.favorite;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    try { localStorage.setItem('promptcode:toolkit:favorites', JSON.stringify([...favorites])); } catch { storageAvailable = false; }
    updateStorageStatus();
    const wasFocused = document.activeElement === favorite;
    const previousIndex = matches.findIndex(item => item.id === id);
    render();
    if (wasFocused) {
      const next = [...document.querySelectorAll('[data-favorite]')];
      (next.find(button => button.dataset.favorite === id) || next[Math.min(previousIndex, next.length - 1)] || $('#empty-reset')).focus();
    }
    notify(storageAvailable ? (favorites.has(id) ? '已加入收藏' : '已取消收藏') : '浏览器存储不可用，收藏仅本次页面有效');
  }
});
$('#about-button').addEventListener('click', () => $('#toolkit-about').showModal());
$('#detail-copy').addEventListener('click', () => currentItem && copy(describeTool(currentItem)));
$('#toolkit-copy-select').addEventListener('click', () => { $('#toolkit-copy-text').focus(); $('#toolkit-copy-text').select(); });
$('#kind-filters').addEventListener('click', event => {
  const button = event.target.closest('[data-kind]');
  if (!button || !catalog) return;
  filters.kind = button.dataset.kind;
  // Starting a resource type is a fresh browse, without a previous recipe constraining it.
  filters.recipe = ''; filters.category = 'all'; filters.framework = 'all';
  shown = 24; render();
});
$('#recipe-list').addEventListener('click', event => {
  const button = event.target.closest('[data-recipe]');
  if (!button || !catalog) return;
  const recipe = filters.recipe === button.dataset.recipe ? '' : button.dataset.recipe;
  Object.assign(filters, defaults, { recipe });
  shown = 24; render();
});
$('#toolkit-search').addEventListener('input', event => { if (catalog) { filters.query = event.target.value; shown = 24; render(); } });
for (const key of ['origin', 'category', 'framework']) $(`#toolkit-${key}`).addEventListener('change', event => { if (catalog) { filters[key] = event.target.value; shown = 24; render(); } });
$('#include-historical').addEventListener('change', event => { if (catalog) { filters.historical = event.target.checked; shown = 24; render(); } });
$('#clear-filters').addEventListener('click', () => catalog && reset());
$('#empty-reset').addEventListener('click', reset);
$('#load-more').addEventListener('click', () => { shown += 24; render(); });
$('#export-tools').addEventListener('click', () => {
  if (!catalog || !matches.length) return;
  const blob = new Blob([JSON.stringify({ title: catalog.title, curated_on: catalog.curated_on, metadata_checked_on: catalog.metadata_checked_on, filters, items: matches }, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'promptcode-toolkit.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify(`已导出 ${matches.length} 项资源`);
});
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !document.querySelector('dialog[open]')) { event.preventDefault(); $('#toolkit-search').focus(); }
});
window.addEventListener('popstate', () => { if (catalog) { Object.assign(filters, defaults); loadURL(); shown = 24; render(); } });
for (const dialog of document.querySelectorAll('dialog')) dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

async function start() {
  updateStorageStatus();
  try {
    const response = await fetch('/data/toolkit-library.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    catalog = await response.json();
    favorites = new Set([...favorites].filter(id => catalog.items.some(item => item.id === id)));
    for (const [key, label] of Object.entries(origins)) $('#toolkit-origin').insertAdjacentHTML('beforeend', `<option value="${key}">${label}</option>`);
    for (const category of [...new Set(catalog.items.map(item => item.category))]) $('#toolkit-category').insertAdjacentHTML('beforeend', `<option value="${escape(category)}">${escape(category)}</option>`);
    for (const framework of [...new Set(catalog.items.flatMap(item => item.frameworks))]) $('#toolkit-framework').insertAdjacentHTML('beforeend', `<option value="${escape(framework)}">${escape(framework)}</option>`);
    $('#recipe-list').innerHTML = catalog.recipes.map((recipe, index) => `<button class="recipe-button" data-recipe="${escape(recipe.id)}" aria-pressed="false"><span>0${index + 1}</span><strong>${escape(recipe.name)}</strong><small>${escape(recipe.description)}</small><i aria-hidden="true">↗</i></button>`).join('');
    $('#snapshot-date').textContent = `收录 ${catalog.items.length} 项 · 元数据快照 ${catalog.metadata_checked_on || catalog.curated_on}`;
    loadURL(); render();
  } catch (error) {
    $('#toolkit-grid').innerHTML = '<div class="loading-state"><p>组件目录暂时无法载入。</p><button class="secondary-button" id="retry-load">重新载入</button></div>';
    $('#toolkit-grid').setAttribute('aria-busy', 'false');
    $('#toolkit-count').textContent = `载入失败：${error.message}`;
    $('#snapshot-date').textContent = '目录暂时无法读取';
    $('#retry-load').addEventListener('click', () => location.reload());
  }
}
start();
