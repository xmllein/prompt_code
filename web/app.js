import { composePrompt, getPlaceholders, getRemainingFieldCount, searchPrompts } from './prompt-utils.js';

const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
  server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M16 6.5h2M16 17.5h2"/>',
  workflow: '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M6 9v6a3 3 0 0 0 3 3h6M9 6h6a3 3 0 0 1 3 3v6"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z"/>',
  sparkles: '<path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3ZM20 2v4M18 4h4"/>',
  book: '<path d="M12 5v15M3 4c4-1 6 0 9 1 3-1 5-2 9-1v15c-4-1-6 0-9 1-3-1-5-2-9-1Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  sliders: '<path d="M4 7h5m4 0h7M4 17h9m4 0h3"/><circle cx="11" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
};
const CATEGORIES = { frontend: { label: '前端开发', icon: 'layout' }, backend: { label: '后端开发', icon: 'server' }, common: { label: '通用协作', icon: 'workflow' } };
const STORAGE_KEY = 'promptcode.workspace.v1';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const state = { library: null, category: 'all', query: '', modeFilter: 'all', favorites: new Set(), drafts: {}, context: '', selected: null };
let storageAvailable = true;
let toastTimer;
let saveTimer;

function icon(name) {
  const span = document.createElement('span');
  span.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.code}</svg>`;
  return span;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function readSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!saved || typeof saved !== 'object') return;
    state.context = typeof saved.context === 'string' ? saved.context : '';
    state.favorites = new Set(Array.isArray(saved.favorites) ? saved.favorites.filter(id => typeof id === 'string') : []);
    const drafts = saved.drafts && typeof saved.drafts === 'object' ? saved.drafts : {};
    for (const [id, draft] of Object.entries(drafts)) {
      if (!draft || typeof draft !== 'object') continue;
      const fields = {};
      if (draft.fields && typeof draft.fields === 'object') {
        for (const [key, value] of Object.entries(draft.fields)) if (typeof value === 'string') fields[key] = value;
      }
      state.drafts[id] = { fields, mode: ['analysis', 'implementation'].includes(draft.mode) ? draft.mode : undefined };
    }
  } catch { storageAvailable = false; }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ context: state.context, favorites: [...state.favorites], drafts: state.drafts }));
  } catch {
    storageAvailable = false;
    $('#storage-note').textContent = '浏览器存储不可用；本次填写仍可复制，但刷新后可能丢失。';
  }
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveState, 250);
}

function placeholders(prompt) {
  return getPlaceholders(prompt);
}

function getDraft(prompt) {
  if (!state.drafts[prompt.id]) state.drafts[prompt.id] = { fields: {}, mode: prompt.default_mode };
  return state.drafts[prompt.id];
}

function compose(prompt) {
  return composePrompt(state.library, prompt, getDraft(prompt), state.context);
}

function remainingFields(prompt) {
  return getRemainingFieldCount(prompt, getDraft(prompt));
}

function showToast(message) {
  clearTimeout(toastTimer);
  $('#toast-text').textContent = message;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 3000);
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.cssText = 'position:fixed;top:0;left:-9999px;width:1px;height:1px;opacity:0';
  // A native modal makes the rest of the document inert. Keep the fallback inside it.
  const container = $$('dialog[open]').at(-1) || document.body;
  const focused = document.activeElement;
  container.append(textarea);
  textarea.focus();
  textarea.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch { /* Manual fallback below. */ }
  textarea.remove();
  focused?.focus({ preventScroll: true });
  return copied;
}

async function copyPrompt(prompt, button) {
  const text = compose(prompt);
  let copied = false;
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(text); copied = true; } catch { /* Try the selection API. */ }
  }
  if (!copied) copied = fallbackCopy(text);
  if (!copied) {
    $('#manual-copy-text').value = text;
    $('#manual-copy-dialog').showModal();
    $('#manual-copy-text').focus();
    $('#manual-copy-text').select();
    return;
  }
  const remaining = remainingFields(prompt);
  showToast(remaining ? `已复制 ${prompt.id} · ${remaining} 处信息可在粘贴后补充` : `已复制 ${prompt.id} · 完整提示词已就绪`);
  if (button?.classList.contains('copy-button') && !button.classList.contains('copied')) {
    button.classList.add('copied');
    button.replaceChildren(icon('check'), document.createTextNode('已复制'));
    setTimeout(() => {
      button.classList.remove('copied');
      button.replaceChildren(icon('copy'), document.createTextNode('复制提示词'));
    }, 1800);
  }
}

function updateCounts() {
  const prompts = state.library.prompts;
  const validIds = new Set(prompts.map(p => p.id));
  state.favorites = new Set([...state.favorites].filter(id => validIds.has(id)));
  $('[data-count="all"]').textContent = prompts.length;
  $('#total-count').textContent = prompts.length;
  $('.version').textContent = `v${state.library.release_version || '1.0.0'}`;
  for (const key of Object.keys(CATEGORIES)) $(`[data-count="${key}"]`).textContent = prompts.filter(p => p.category === key).length;
  $('[data-count="favorites"]').textContent = state.favorites.size;
}

function toggleFavorite(prompt, button) {
  const isFavorite = !state.favorites.has(prompt.id);
  if (isFavorite) state.favorites.add(prompt.id); else state.favorites.delete(prompt.id);
  button.setAttribute('aria-pressed', String(isFavorite));
  button.setAttribute('aria-label', `${isFavorite ? '取消收藏' : '收藏'}：${prompt.title}`);
  button.title = isFavorite ? '取消收藏' : '收藏';
  updateCounts();
  saveState();
  if (state.category === 'favorites') {
    const buttons = $$('.favorite-button');
    const index = buttons.indexOf(button);
    renderGrid();
    const next = $$('.favorite-button');
    (next[Math.min(index, next.length - 1)] || $('#reset-filters')).focus({ preventScroll: true });
  }
  showToast(isFavorite ? '已加入收藏' : '已取消收藏');
}

function createCard(prompt) {
  const category = CATEGORIES[prompt.category];
  const card = element('article', `prompt-card ${prompt.category}`);
  card.dataset.promptId = prompt.id;
  const top = element('div', 'card-top');
  const categoryIcon = icon(category.icon);
  categoryIcon.className = 'category-icon';
  const favorite = element('button', 'favorite-button');
  const isFavorite = state.favorites.has(prompt.id);
  favorite.setAttribute('aria-pressed', String(isFavorite));
  favorite.setAttribute('aria-label', `${isFavorite ? '取消收藏' : '收藏'}：${prompt.title}`);
  favorite.title = isFavorite ? '取消收藏' : '收藏';
  favorite.append(icon('star'));
  favorite.addEventListener('click', () => toggleFavorite(prompt, favorite));
  top.append(categoryIcon, element('span', 'card-category', category.label), element('span', 'card-id', prompt.id), favorite);
  const title = element('h3', 'card-title');
  const titleButton = element('button', '', prompt.title);
  titleButton.addEventListener('click', () => openEditor(prompt));
  title.append(titleButton);
  const tags = element('div', 'card-tags');
  prompt.tags.slice(0, 4).forEach(tag => tags.append(element('span', 'card-tag', tag)));
  const footer = element('div', 'card-footer');
  const mode = getDraft(prompt).mode || prompt.default_mode;
  const modeNote = element('span', `mode-note ${mode}`);
  modeNote.append(element('i'), document.createTextNode(mode === 'analysis' ? '分析设计' : '直接实施'));
  const actions = element('div', 'card-actions');
  const preview = element('button', 'preview-button', '填写 / 预览');
  preview.setAttribute('aria-label', `填写或预览：${prompt.title}`);
  preview.addEventListener('click', () => openEditor(prompt));
  const copy = element('button', 'copy-button');
  copy.append(icon('copy'), document.createTextNode('复制提示词'));
  copy.setAttribute('aria-label', `复制提示词：${prompt.title}`);
  copy.addEventListener('click', () => copyPrompt(prompt, copy));
  actions.append(preview, copy);
  footer.append(modeNote, actions);
  card.append(top, title, element('p', 'card-description', prompt.use_when), tags, footer);
  return card;
}

function renderGrid() {
  if (!state.library) return;
  const prompts = searchPrompts(state.library, state);
  $('#prompt-grid').replaceChildren(...prompts.map(createCard));
  $('#prompt-grid').setAttribute('aria-busy', 'false');
  $('#result-count').textContent = `${prompts.length} 个场景`;
  $('#empty-state').hidden = prompts.length > 0;
  $('#empty-description').textContent = state.category === 'favorites' && !state.favorites.size ? '点击提示词卡片右上角的星标，把常用场景放在这里。' : '试试其他关键词，或清除筛选。';
  $('#section-title').textContent = state.category === 'all' ? '全部提示词' : state.category === 'favorites' ? '我的收藏' : CATEGORIES[state.category].label;
  $$('.nav-item').forEach(button => {
    const active = button.dataset.category === state.category;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
  });
  $$('#quick-tags button').forEach(button => button.classList.toggle('active', button.dataset.query === state.query));
}

function refreshContext() {
  const hasContext = !!state.context.trim();
  $('#context-label').textContent = hasContext ? '已设置' : '未设置';
  $('#context-label').classList.toggle('is-set', hasContext);
  $('#context-summary').textContent = hasContext ? '复制时自动加入你的项目背景' : '填写一次，复制时自动带上';
  if (!storageAvailable) $('#storage-note').textContent = '浏览器存储不可用；本次填写仍可复制，但刷新后可能丢失。';
}

function refreshPreview() {
  if (!state.selected) return;
  const prompt = state.selected;
  const draft = getDraft(prompt);
  const mode = draft.mode || prompt.default_mode;
  const preview = $('#prompt-preview');
  const scrollTop = preview.scrollTop;
  preview.value = compose(prompt);
  preview.scrollTop = scrollTop;
  $('#preview-count').textContent = `${preview.value.length.toLocaleString()} 字符`;
  const remaining = remainingFields(prompt);
  $('#preview-hint').textContent = remaining ? `还有 ${remaining} 处信息可补充；也可以先复制，粘贴后再填写。` : '任务信息已补全，可直接复制。';
  $$('.mode-picker [data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
  $('#mode-description').textContent = mode === 'analysis' ? '先输出可评审方案、取舍和验收标准，本次不修改代码。' : '有仓库与工具时，完成代码修改和必要验证。';
  $('#editor-context-status').textContent = state.context.trim() ? '已自动加入你的项目背景。修改背景后，预览会同步更新。' : '尚未设置共同项目背景。本模板内的信息也可以独立使用。';
}

function openEditor(prompt) {
  state.selected = prompt;
  const draft = getDraft(prompt);
  $('#editor-title').textContent = prompt.title;
  $('#editor-eyebrow').textContent = `${prompt.id} / ${CATEGORIES[prompt.category].label}`;
  const fields = $('#placeholder-fields');
  fields.replaceChildren();
  const lines = prompt.body.split('\n');
  placeholders(prompt).forEach((key, index) => {
    const wrapper = element('div', 'field-group');
    const label = element('label', 'field-label');
    label.htmlFor = `field-${index}`;
    const line = lines.find(line => line.includes(`{{${key}}}`)) || '';
    label.append(document.createTextNode(line.split('：')[0] || `信息 ${index + 1}`));
    const textarea = element('textarea');
    textarea.id = `field-${index}`;
    textarea.name = key;
    textarea.rows = 2;
    textarea.placeholder = key;
    textarea.value = draft.fields[key] || '';
    textarea.addEventListener('input', () => {
      draft.fields[key] = textarea.value;
      scheduleSave();
      refreshPreview();
    });
    wrapper.append(label, textarea);
    fields.append(wrapper);
  });
  const related = $('#related-prompts');
  related.replaceChildren();
  if (prompt.related.length) related.append(element('span', '', '关联场景'));
  prompt.related.forEach(id => {
    const target = state.library.prompts.find(p => p.id === id);
    if (!target) return;
    const button = element('button', '', `${target.id} ${target.title}`);
    button.addEventListener('click', () => { openEditor(target); $('#editor-title').focus({ preventScroll: true }); });
    related.append(button);
  });
  refreshPreview();
  $('#prompt-preview').scrollTop = 0;
  $('#editor-title').tabIndex = -1;
  if (!$('#editor-dialog').open) $('#editor-dialog').showModal();
  $('#editor-title').focus({ preventScroll: true });
  $('.editor-config').scrollTop = 0;
  $('.editor-body').scrollTop = 0;
}

function renderSources() {
  for (const { name, description } of state.library.repositories || []) {
    const link = element('a', 'repo-link');
    link.href = `https://github.com/${name}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.append(element('strong', '', `${name} ↗`), element('span', '', description));
    $('#repo-list').append(link);
  }
  for (const source of Object.values(state.library.sources)) {
    const link = element('a', '', `${source.title} ↗`);
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    $('#source-list').append(link);
  }
}

function bindEvents() {
  $$('.nav-item').forEach(button => button.addEventListener('click', () => {
    state.category = button.dataset.category;
    renderGrid();
  }));
  $('#search').addEventListener('input', event => { state.query = event.target.value.trim(); renderGrid(); });
  $('#mode-filter').addEventListener('change', event => { state.modeFilter = event.target.value; renderGrid(); });
  $$('#quick-tags button').forEach(button => button.addEventListener('click', () => {
    state.query = state.query === button.dataset.query ? '' : button.dataset.query;
    $('#search').value = state.query;
    renderGrid();
  }));
  $('#reset-filters').addEventListener('click', () => {
    state.category = 'all'; state.query = ''; state.modeFilter = 'all';
    $('#search').value = ''; $('#mode-filter').value = 'all';
    renderGrid(); $('#search').focus();
  });
  $('#context-shortcut').addEventListener('click', () => {
    $('#context-panel').open = true;
    $('#project-context').focus();
    $('#context-panel').scrollIntoView({ block: 'center' });
  });
  $('#project-context').addEventListener('input', event => {
    state.context = event.target.value; scheduleSave(); refreshContext(); refreshPreview();
  });
  $('#clear-context').addEventListener('click', () => {
    state.context = ''; $('#project-context').value = ''; saveState(); refreshContext(); refreshPreview();
    showToast('已清空项目背景');
  });
  $('#sources-button').addEventListener('click', () => { if (state.library) $('#sources-dialog').showModal(); });
  $$('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  $('#editor-dialog').addEventListener('close', () => {
    const id = state.selected?.id;
    state.selected = null;
    renderGrid();
    const trigger = id ? $(`[data-prompt-id="${id}"] .preview-button`) : null;
    (trigger || $('#search')).focus({ preventScroll: true });
  });
  $$('.mode-picker [data-mode]').forEach(button => button.addEventListener('click', () => {
    if (!state.selected) return;
    getDraft(state.selected).mode = button.dataset.mode;
    saveState(); refreshPreview();
  }));
  $('#placeholder-fields').addEventListener('submit', event => event.preventDefault());
  $('#reset-draft').addEventListener('click', () => {
    if (!state.selected) return;
    const prompt = state.selected;
    state.drafts[prompt.id] = { fields: {}, mode: prompt.default_mode };
    saveState(); openEditor(prompt); showToast('已恢复模板默认内容');
  });
  $('#editor-copy').addEventListener('click', () => { if (state.selected) copyPrompt(state.selected, $('#editor-copy')); });
  $('#select-manual').addEventListener('click', () => { $('#manual-copy-text').focus(); $('#manual-copy-text').select(); });
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !$$('dialog[open]').length) {
      event.preventDefault(); $('#search').focus(); $('#search').select();
    }
  });
  window.addEventListener('pagehide', saveState);
}

async function init() {
  $$('[data-icon]').forEach(span => span.replaceChildren(icon(span.dataset.icon)));
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) $('#search-shortcut').textContent = 'Ctrl K';
  $('#runtime-status').textContent = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(location.hostname) ? '本地工作台' : '浏览器本地保存';
  readSavedState();
  $('#project-context').value = state.context;
  refreshContext();
  bindEvents();
  try {
    const response = await fetch('/data/prompt-library.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const library = await response.json();
    if (!Array.isArray(library.prompts) || !library.modes || !library.sources || !Array.isArray(library.repositories)) throw new Error('模板数据格式错误');
    state.library = library;
    updateCounts(); renderSources(); renderGrid();
  } catch (error) {
    $('#prompt-grid').setAttribute('aria-busy', 'false');
    const block = element('div', 'loading-state');
    block.append(element('p', '', '提示词暂时没有载入，请检查服务或网络后重试。'));
    const retry = element('button', 'secondary-button', '重新载入');
    retry.addEventListener('click', () => location.reload());
    block.append(retry); $('#prompt-grid').replaceChildren(block);
    $('#result-count').textContent = '载入失败';
    console.error('PromptCode 数据加载失败：', error);
  }
}

init();
