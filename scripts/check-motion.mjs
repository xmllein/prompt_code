import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderMotionGuide } from './export-motion.mjs';

const read = relative => readFile(new URL(`../${relative}`, import.meta.url), 'utf8');
export async function validateMotionCatalog() {
  const catalog = JSON.parse(await read('data/motion-library.json'));
  assert.equal(catalog.schema_version, 1);
  const ids = new Set(catalog.effects.map(effect => effect.id));
  assert.equal(ids.size, catalog.effects.length, '动效ID重复');
  const groups = new Set(catalog.groups.map(group => group.id));
  const css = await read('node_modules/animate.css/animate.css');
  const demos = new Set(['tween', 'to', 'from', 'fromTo', 'timeline', 'position', 'ease', 'stagger', 'repeat', 'yoyo', 'overwrite', 'playback', 'scrollTrigger', 'scrub', 'pin', 'flip']);
  for (const effect of catalog.effects) {
    for (const field of ['id', 'name', 'zh', 'kind', 'description', 'scene', 'caution']) assert.ok(typeof effect[field] === 'string' && effect[field].trim(), `${effect.id}缺少${field}`);
    assert.equal(new URL(effect.source).protocol, 'https:');
    if (effect.library === 'animate') {
      assert.match(effect.name, /^\w+$/);
      assert.ok(groups.has(effect.group));
      assert.ok(new RegExp(`\\.animate__${effect.name}(?=[\\s.{:#])`).test(css), `发布CSS中没有${effect.name}`);
      assert.equal(effect.className, `animate__animated animate__${effect.name}`);
    } else {
      assert.equal(effect.library, 'gsap');
      assert.ok(demos.has(effect.demo), `未实现的GSAP演示：${effect.demo}`);
      assert.ok(effect.code);
    }
  }
  const terms = new Set(catalog.glossary.map(term => term.term));
  assert.equal(terms.size, catalog.glossary.length);
  for (const term of catalog.glossary) for (const field of ['term', 'zh', 'type', 'definition', 'pitfall']) assert.ok(term[field]?.trim());
  for (const [name, version] of [['animate.css', catalog.versions.animate], ['gsap', catalog.versions.gsap]]) {
    const pkg = JSON.parse(await read(`node_modules/${name}/package.json`));
    assert.equal(pkg.version, version);
  }
  assert.equal(await read('docs/motion-guide.md'), renderMotionGuide(catalog), '动效文档与数据不同步，请运行npm run docs:motion');
  return catalog;
}
