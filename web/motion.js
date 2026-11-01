import { composeMotionPrompt, filterMotion, motionCode, normalizeDuration } from './motion-utils.js';
import { createVisual, playGsap } from './motion-engine.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const state = { catalog: null, view: 'featured', library: 'all', group: 'all', query: '', duration: 800, active: null };
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let toastTimer;
const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; };

function toast(text) { clearTimeout(toastTimer); $('#toast-text').textContent = text; $('#toast').hidden = false; toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 2800); }

async function copy(text, label) {
  let done = false;
  try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); done = true; } } catch { /* Selection fallback. */ }
  if (!done) {
    const active = document.activeElement;
    const field = el('textarea'); field.value = text; field.readOnly = true; field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.append(field); field.select();
    try { done = document.execCommand('copy'); } catch { /* Manual fallback. */ }
    field.remove(); active?.focus({ preventScroll: true });
  }
  if (done) toast(`已复制${label}`);
  else { $('#motion-copy-text').value = text; $('#motion-copy-dialog').showModal(); $('#motion-copy-text').focus(); $('#motion-copy-text').select(); }
}

function resetStage(card, effect) {
  const stage = card.querySelector('.effect-stage');
  stage.replaceChildren(createVisual(effect));
  const label = el('span', 'stage-label', effect.library === 'animate' ? 'CSS PRESET' : 'GSAP CONCEPT');
  label.setAttribute('aria-hidden', 'true'); stage.append(label);
  return stage;
}

function stopActive(message = '已停止并复位，可选择其他示例。') {
  const run = state.active;
  if (run) {
    state.active = null;
    run.controller.abort();
    if (run.raf) cancelAnimationFrame(run.raf);
    run.cleanup?.();
    run.card.classList.remove('is-playing');
    resetStage(run.card, run.effect);
    run.card.querySelector('.effect-status').textContent = '等待播放';
  }
  $('#stop-all').disabled = true;
  if (message) $('#motion-status').textContent = message;
}

async function play(effect, card) {
  stopActive('');
  if (reducedMotion.matches) {
    card.querySelector('.effect-status').textContent = '系统已启用减少动态效果；保留静态说明。';
    $('#motion-status').textContent = '遵从减少动态效果偏好，未启动动画；仍可复制描述和代码。';
    return;
  }
  const run = { effect, card, controller: new AbortController(), cleanup: null, raf: null };
  state.active = run;
  const stage = resetStage(card, effect);
  const duration = normalizeDuration(state.duration, effect);
  const status = card.querySelector('.effect-status');
  const isCurrent = () => state.active === run;
  const onComplete = () => {
    if (!isCurrent()) return;
    card.classList.remove('is-playing');
    status.textContent = effect.isExit ? '已离场；复位或重播可再次查看。' : '播放完成；可以重播或复位。';
    $('#motion-status').textContent = `${effect.name} 播放完成。`;
  };
  card.classList.add('is-playing'); $('#stop-all').disabled = false;
  status.textContent = effect.library === 'gsap' && ['scrollTrigger', 'scrub', 'pin'].includes(effect.demo) ? '在上方舞台内滚动，观察不同的滚动行为。' : `演示时长参数 ${duration}ms · ${effect.demo === 'repeat' ? '共3遍' : effect.demo === 'yoyo' ? '去程 + 回程' : '按需播放'}`;
  $('#motion-status').textContent = `正在演示 ${effect.name}；播放新示例会回收旧动画。`;
  try {
    if (effect.library === 'animate') {
      const target = stage.querySelector('.demo-object');
      target.style.animationDuration = `${duration}ms`;
      target.style.animationIterationCount = '1';
      target.addEventListener('animationend', onComplete, { once: true, signal: run.controller.signal });
      run.raf = requestAnimationFrame(() => { if (isCurrent()) target.classList.add('animate__animated', `animate__${effect.name}`); });
    } else {
      const engine = await playGsap({ effect, stage, duration, onComplete, isCurrent, signal: run.controller.signal });
      if (isCurrent()) run.cleanup = engine?.cleanup;
      else engine?.cleanup();
    }
  } catch (error) {
    if (!isCurrent()) return;
    stopActive('演示暂时不可用，请刷新后重试；说明和复制仍可使用。');
    console.error('动效演示启动失败', error);
  }
}

function effectCard(effect) {
  const card = el('article', `effect-card ${effect.library === 'gsap' ? 'gsap-effect' : 'animate-effect'}`);
  card.dataset.effectId = effect.id;
  const stage = el('div', 'effect-stage'); card.append(stage); resetStage(card, effect);
  const info = el('div', 'effect-info');
  const meta = el('div', 'effect-meta'); meta.append(el('span', 'engine-label', effect.library === 'animate' ? 'Animate.css' : 'GSAP'), el('span', '', effect.kind));
  const scene = el('p', 'effect-scene'); scene.append(el('strong', '', '适合：'), document.createTextNode(effect.scene));
  const code = el('details', 'effect-code');
  const summary = el('summary', '', '接入示意代码'); const pre = el('pre'); const snippet = el('code', '', motionCode(effect, state.duration)); pre.append(snippet);
  const source = el('a', '', '第一方文档 ↗'); source.href = effect.source; source.target = '_blank'; source.rel = 'noopener noreferrer';
  code.append(summary, pre, source);
  const actions = el('div', 'effect-actions');
  const playButton = el('button', 'play-effect', '▷ 播放'); playButton.setAttribute('aria-label', `播放 ${effect.name}`); playButton.addEventListener('click', () => play(effect, card));
  const description = el('button', '', '复制描述'); description.setAttribute('aria-label', `复制 ${effect.name} 动效描述`); description.addEventListener('click', () => copy(composeMotionPrompt(effect, state.duration), `${effect.name}动效描述`));
  const copyCode = el('button', '', '复制代码'); copyCode.setAttribute('aria-label', `复制 ${effect.name} 示意代码`); copyCode.addEventListener('click', () => copy(motionCode(effect, state.duration), `${effect.name}示意代码`));
  actions.append(playButton, description, copyCode);
  info.append(meta, el('h3', 'effect-name', effect.name), el('p', 'effect-zh', effect.zh), el('p', 'effect-description', effect.description), scene, el('p', 'effect-caution', effect.caution), el('p', 'effect-status', '等待播放'), code, actions);
  card.append(info);
  return card;
}

function termCard(term) {
  const card = el('article', 'term-card');
  const button = el('button', '', '复制术语解释 ↗'); button.setAttribute('aria-label', `复制术语 ${term.term}`);
  button.addEventListener('click', () => copy(`${term.term} · ${term.zh}\n类型：${term.type}\n含义：${term.definition}\n注意：${term.pitfall}`, `${term.term}解释`));
  card.append(el('small', '', term.type), el('h3', '', term.term), el('h4', '', term.zh), el('p', '', term.definition), el('p', '', term.pitfall), button);
  return card;
}

function render() {
  if (!state.catalog) return;
  stopActive('默认静止。点击播放，最多同时运行一个示例。');
  const termsView = state.view === 'terms';
  $('#effects-panel').hidden = termsView; $('#terms-panel').hidden = !termsView; $('#effect-filters').hidden = termsView;
  $$('.view-tabs button').forEach(button => { const selected = button.dataset.view === state.view; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; });
  $('#effects-panel').setAttribute('aria-labelledby', state.view === 'featured' ? 'tab-featured' : 'tab-all');
  $$('.library-switch button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.library === state.library)));
  const terms = state.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const rows = termsView ? state.catalog.glossary.filter(term => terms.every(query => `${term.term} ${term.zh} ${term.type} ${term.definition} ${term.pitfall}`.toLowerCase().includes(query))) : filterMotion(state.catalog, { query: state.query, library: state.library, group: state.group, featured: state.view === 'featured' });
  if (termsView) $('#terms-grid').replaceChildren(...rows.map(termCard)); else $('#effects-grid').replaceChildren(...rows.map(effectCard));
  $('#effects-grid').setAttribute('aria-busy', 'false');
  $('#motion-result-count').textContent = `${rows.length} ${termsView ? '个术语' : '个演示'}`;
  $('#motion-empty').hidden = rows.length > 0;
}

function updateGroupOptions() {
  const select = $('#motion-group'); select.replaceChildren(new Option('全部分类', 'all'));
  if (state.library !== 'gsap') state.catalog.groups.forEach(group => select.add(new Option(group.zh, group.id)));
  if (state.library !== 'animate') [...new Set(state.catalog.effects.filter(effect => effect.library === 'gsap').map(effect => effect.kind))].forEach(kind => select.add(new Option(`GSAP · ${kind}`, kind)));
  select.value = state.group;
}

function setView(view) { state.view = view; render(); }

function events() {
  $$('.view-tabs button').forEach(button => {
    button.addEventListener('click', () => setView(button.dataset.view));
    button.addEventListener('keydown', event => {
      const tabs = $$('.view-tabs button'); const index = tabs.indexOf(button);
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      setView(tabs[next].dataset.view); tabs[next].focus();
    });
  });
  $$('.library-switch button').forEach(button => button.addEventListener('click', () => { state.library = button.dataset.library; state.group = 'all'; state.view = 'all'; updateGroupOptions(); render(); }));
  $('#motion-group').addEventListener('change', event => { state.group = event.target.value; state.view = 'all'; render(); });
  $('#motion-search').addEventListener('input', event => { state.query = event.target.value; if (state.view === 'featured' && state.query.trim()) state.view = 'all'; render(); });
  $('#motion-duration').addEventListener('input', event => {
    state.duration = Number(event.target.value); $('#duration-value').textContent = `${state.duration}ms`;
    // Keep the running example intact; the new value applies to the next play/copy.
    $$('.effect-card').forEach(card => { const effect = state.catalog.effects.find(item => item.id === card.dataset.effectId); card.querySelector('.effect-code code').textContent = motionCode(effect, state.duration); });
  });
  $('#stop-all').addEventListener('click', () => stopActive());
  $('#motion-reset').addEventListener('click', () => { state.view = 'all'; state.library = 'all'; state.group = 'all'; state.query = ''; $('#motion-search').value = ''; updateGroupOptions(); render(); });
  $('#motion-copy-close').addEventListener('click', () => $('#motion-copy-dialog').close());
  $('#motion-copy-select').addEventListener('click', () => { $('#motion-copy-text').focus(); $('#motion-copy-text').select(); });
  const reflectPreference = () => { $('#reduce-status').textContent = reducedMotion.matches ? '系统偏好：减少动态效果' : '支持减少动态效果'; if (reducedMotion.matches) stopActive('系统请求减少动态效果，已复位演示。'); };
  reducedMotion.addEventListener('change', reflectPreference); reflectPreference();
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopActive('页面隐藏，演示已停止。'); });
  window.addEventListener('pagehide', () => stopActive(''));
}

async function init() {
  try {
    const response = await fetch('/data/motion-library.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.catalog = await response.json();
    $('#effect-total').textContent = state.catalog.effects.length; $('#term-total').textContent = state.catalog.glossary.length;
    $('#animate-count').textContent = state.catalog.effects.filter(effect => effect.library === 'animate').length;
    $('#gsap-count').textContent = state.catalog.effects.filter(effect => effect.library === 'gsap').length;
    const library = new URLSearchParams(location.search).get('library');
    if (['animate', 'gsap'].includes(library)) { state.library = library; state.view = 'all'; }
    updateGroupOptions(); events(); render();
  } catch (error) {
    $('#effects-grid').setAttribute('aria-busy', 'false');
    const message = el('div', 'motion-error', '动效词典暂时没有载入，请刷新重试。'); const button = el('button', 'secondary-button', '重新载入'); button.addEventListener('click', () => location.reload()); message.append(button); $('#effects-grid').replaceChildren(message);
    $('#motion-result-count').textContent = '载入失败'; console.error('动效词典加载失败', error);
  }
}

init();
