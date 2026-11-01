export const DEFAULT_PRIORITY = ['F01', 'F11', 'F12', 'F13', 'F14', 'F06', 'F07', 'B12', 'B13', 'B14', 'B15', 'B16', 'B07', 'B04', 'B05'];

export function getPlaceholders(prompt) {
  return [...new Set([...prompt.body.matchAll(/\{\{([^{}]+)\}\}/g)].map(match => match[1]))];
}

export function getRemainingFieldCount(prompt, draft = {}) {
  return getPlaceholders(prompt).filter(key => !draft.fields?.[key]?.trim()).length;
}

export function composePrompt(library, prompt, draft = {}, context = '') {
  const mode = draft.mode || prompt.default_mode;
  if (!Object.hasOwn(library.modes, mode)) throw new Error(`未知工作模式：${mode}`);
  const body = prompt.body.replace(/\{\{([^{}]+)\}\}/g, (match, key) => draft.fields?.[key]?.trim() || match);
  const parts = [library.shared_instruction, library.modes[mode]];
  if (context.trim()) parts.push(`项目补充上下文：\n${context.trim()}`);
  return [...parts, body].join('\n\n');
}

export function searchPrompts(library, { query = '', category = 'all', modeFilter = 'all', favorites = new Set(), drafts = {} } = {}) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const categoryNames = { frontend: '前端开发', backend: '后端开发', common: '通用协作' };
  const scores = new Map();
  const matches = library.prompts.filter(prompt => {
    if (category === 'favorites' && !favorites.has(prompt.id)) return false;
    if (!['all', 'favorites'].includes(category) && prompt.category !== category) return false;
    if (modeFilter !== 'all' && (drafts[prompt.id]?.mode || prompt.default_mode) !== modeFilter) return false;
    const title = `${prompt.id} ${prompt.title}`.toLocaleLowerCase();
    const tags = prompt.tags.join(' ').toLocaleLowerCase();
    const useWhen = prompt.use_when.toLocaleLowerCase();
    const haystack = `${title} ${tags} ${useWhen} ${prompt.body} ${categoryNames[prompt.category]}`.toLocaleLowerCase();
    if (!terms.every(term => haystack.includes(term))) return false;
    scores.set(prompt.id, terms.reduce((score, term) => score + (prompt.id.toLocaleLowerCase() === term ? 32 : 0) + (title.includes(term) ? 8 : 0) + (tags.includes(term) ? 4 : 0) + (useWhen.includes(term) ? 2 : 0), 0));
    return true;
  });
  const rank = id => { const i = DEFAULT_PRIORITY.indexOf(id); return i < 0 ? 100 : i; };
  return matches.sort((a, b) => scores.get(b.id) - scores.get(a.id) || rank(a.id) - rank(b.id) || a.id.localeCompare(b.id));
}
