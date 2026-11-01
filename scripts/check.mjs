import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { composePrompt, getPlaceholders } from '../web/prompt-utils.js';

export const root = fileURLToPath(new URL('../', import.meta.url));

export async function validateProject() {
  const library = JSON.parse(await readFile(path.join(root, 'data/prompt-library.json'), 'utf8'));
  assert.equal(library.schema_version, 1, '未知数据版本');
  assert.ok(typeof library.shared_instruction === 'string' && library.shared_instruction.trim());
  assert.ok(Array.isArray(library.prompts) && library.prompts.length > 0);
  const ids = new Set(library.prompts.map(p => p.id));
  assert.equal(ids.size, library.prompts.length, '模板ID重复');
  const categories = { common: 'C', frontend: 'F', backend: 'B' };
  for (const prompt of library.prompts) {
    assert.match(prompt.id, new RegExp(`^${categories[prompt.category]}\\d{2}$`), '分类或ID错误');
    for (const key of ['title', 'use_when', 'body']) assert.ok(typeof prompt[key] === 'string' && prompt[key].trim(), `${prompt.id} 缺少${key}`);
    assert.ok(Object.hasOwn(library.modes, prompt.default_mode), `${prompt.id} 模式无效`);
    assert.ok(Array.isArray(prompt.tags) && prompt.tags.length > 0);
    for (const related of prompt.related) assert.ok(ids.has(related), `${prompt.id} 无效关联${related}`);
    for (const source of prompt.sources) assert.ok(Object.hasOwn(library.sources, source), `${prompt.id} 无效来源${source}`);
    const keys = getPlaceholders(prompt);
    assert.ok(keys.length > 0, `${prompt.id} 没有上下文占位`);
    assert.equal(prompt.body.replace(/\{\{[^{}]+\}\}/g, '').match(/\{\{|\}\}/g), null, `${prompt.id} 占位符不成对`);
  }
  for (const source of Object.values(library.sources)) assert.equal(new URL(source.url).protocol, 'https:');
  assert.ok(Array.isArray(library.repositories));
  for (const repo of library.repositories) assert.match(repo.name, /^[\w.-]+\/[\w.-]+$/);
  for (const category of Object.keys(categories)) {
    const markdown = await readFile(path.join(root, 'prompts', `${category}.md`), 'utf8');
    const blocks = [...markdown.matchAll(/```text\n([\s\S]*?)\n```/g)].map(match => match[1]);
    const prompts = library.prompts.filter(p => p.category === category);
    assert.deepEqual(blocks, prompts.map(p => composePrompt(library, p)), `${category} 文档与JSON不同步，请运行 python3 scripts/export_prompts.py`);
  }
  // Local documentation links should survive a fresh clone, not just this workspace.
  const docs = ['README.md'];
  for (const folder of ['prompts', 'research']) for (const file of await readdir(path.join(root, folder))) if (file.endsWith('.md')) docs.push(`${folder}/${file}`);
  for (const doc of docs) {
    const text = await readFile(path.join(root, doc), 'utf8');
    for (const [, link] of text.matchAll(/\]\(([^)]+)\)/g)) {
      if (link.includes('://') || link.startsWith('#')) continue;
      await readFile(path.resolve(root, path.dirname(doc), link.split('#')[0]));
    }
  }
  return library;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const library = await validateProject();
  const counts = Object.fromEntries(Object.keys({ common: 0, frontend: 0, backend: 0 }).map(category => [category, library.prompts.filter(p => p.category === category).length]));
  console.log(`验证通过：${library.prompts.length}个模板、引用、占位与Markdown一致性。`, counts);
}
