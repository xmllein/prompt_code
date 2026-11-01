import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { composeMotionPrompt, filterMotion, motionCode, normalizeDuration } from '../web/motion-utils.js';
import { validateMotionCatalog } from '../scripts/check-motion.mjs';

const catalog = JSON.parse(await readFile(new URL('../data/motion-library.json', import.meta.url), 'utf8'));
const effect = id => catalog.effects.find(item => item.id === id);

test('完整动效名称匹配实际安装CSS，概念、术语与生成文档一致', async () => {
  await validateMotionCatalog();
  assert.equal(catalog.effects.filter(item => item.library === 'animate').length, 97);
  assert.equal(catalog.effects.filter(item => item.library === 'gsap').length, 16);
  assert.equal(catalog.glossary.length, 24);
});

test('中英文动作与库/分类筛选可组合，不把Flip概念混成CSS类', () => {
  assert.ok(filterMotion(catalog, { query: '淡入' }).some(item => item.name === 'fadeIn'));
  assert.equal(filterMotion(catalog, { library: 'gsap', query: 'Flip' })[0].id, 'gsap-flip');
  assert.ok(filterMotion(catalog, { library: 'animate', group: 'flippers' }).some(item => item.name === 'flip'));
  assert.equal(filterMotion(catalog, { query: '没有这个效果_xyz' }).length, 0);
});

test('复制描述保留准确类名、场景与必要上下文及减少动态效果约束', () => {
  const text = composeMotionPrompt(effect('animate-fadeInUp'), 600);
  assert.ok(text.includes('animate__animated animate__fadeInUp'));
  assert.ok(text.includes('{{目标组件与触发操作}}'));
  assert.ok(text.includes('600ms'));
  assert.ok(text.includes('prefers-reduced-motion'));
  assert.ok(composeMotionPrompt(effect('gsap-flip')).includes('不是Animate.css flip'));
});

test('预览参数有边界，flash不能被全局时长滑块加速为高频闪烁', () => {
  assert.equal(normalizeDuration(100, effect('animate-fadeIn')), 300);
  assert.equal(normalizeDuration(5000, effect('animate-fadeIn')), 1800);
  assert.equal(normalizeDuration('invalid'), 800);
  assert.equal(normalizeDuration(300, effect('animate-flash')), 1200);
  assert.ok(motionCode(effect('animate-flash'), 300).includes('1200ms'));
});
