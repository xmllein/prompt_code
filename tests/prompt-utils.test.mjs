import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { composePrompt, getPlaceholders, getRemainingFieldCount, searchPrompts } from '../web/prompt-utils.js';

const library = JSON.parse(await readFile(new URL('../data/prompt-library.json', import.meta.url), 'utf8'));
const get = id => library.prompts.find(p => p.id === id);

test('扩展后原ID和新增专项完整保留，关联与分类由检查器验证', () => {
  assert.equal(library.prompts.length, 54);
  assert.equal(library.prompts.filter(p => p.category === 'common').length, 6);
  for (const prefix of ['F', 'B']) for (let i = 1; i <= 24; i++) assert.ok(get(`${prefix}${String(i).padStart(2, '0')}`));
});

test('默认复制独立包含工作约束、正确模式和完整任务', () => {
  for (const prompt of library.prompts) assert.equal(composePrompt(library, prompt), [library.shared_instruction, library.modes[prompt.default_mode], prompt.body].join('\n\n'));
});

test('合成保留特殊字符和多行文本，不把用户输入当替换表达式再执行', () => {
  const prompt = { default_mode: 'analysis', body: '目标：{{目标}}\n确认：{{目标}}\n其他：{{其他}}' };
  const value = '$& $1 `code`\n{{字面内容}}';
  const text = composePrompt(library, prompt, { mode: 'implementation', fields: { 目标: value, 其他: '  ' } }, '  项目上下文  ');
  assert.ok(text.includes(library.modes.implementation));
  assert.ok(!text.includes(library.modes.analysis));
  assert.ok(text.includes('项目补充上下文：\n项目上下文'));
  assert.ok(text.includes(`目标：${value}\n确认：${value}\n其他：{{其他}}`));
  assert.deepEqual(getPlaceholders(prompt), ['目标', '其他']);
  assert.equal(getRemainingFieldCount(prompt, { fields: { 目标: value } }), 1);
});

test('已有用户填写和模式覆盖在扩展后仍按原字段键生效', () => {
  const prompt = get('F01');
  const key = getPlaceholders(prompt)[0];
  const text = composePrompt(library, prompt, { mode: 'analysis', fields: { [key]: '保留的项目目标' } });
  assert.ok(text.includes('页面目标：保留的项目目标'));
  assert.ok(text.includes(library.modes.analysis));
  assert.ok(!text.includes(`{{${key}}}`));
});

test('未知模式拒绝合成，避免复制undefined', () => {
  assert.throws(() => composePrompt(library, get('F11'), { mode: 'wrong' }), /未知工作模式/);
});

test('专项、ID与多关键词能检索到对应场景，标题相关性优先', () => {
  assert.equal(searchPrompts(library, { query: 'Webhook' })[0].id, 'B13');
  assert.equal(searchPrompts(library, { query: 'f11' })[0].id, 'F11');
  assert.ok(searchPrompts(library, { query: '批量 导出' }).some(p => p.id === 'B15'));
  assert.equal(searchPrompts(library, { query: '不存在的场景_xyz' }).length, 0);
});

test('分类、收藏和覆盖后的模式筛选可以组合使用', () => {
  const favorite = new Set(['F11', 'B13']);
  const results = searchPrompts(library, { category: 'favorites', favorites: favorite, modeFilter: 'analysis', drafts: { F11: { mode: 'analysis' } } });
  assert.deepEqual(results.map(p => p.id), ['F11']);
  assert.ok(searchPrompts(library, { category: 'backend' }).every(p => p.category === 'backend'));
  assert.equal(searchPrompts(library, { category: 'frontend' }).length, 24);
});
