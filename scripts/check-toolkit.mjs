import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderToolkitGuide } from './export-toolkit.mjs';
import { kinds, origins } from '../web/toolkit-utils.js';

export async function validateToolkitCatalog() {
  const read = relative => readFile(new URL(`../${relative}`, import.meta.url), 'utf8');
  const catalog = JSON.parse(await read('data/toolkit-library.json'));
  assert.equal(catalog.schema_version, 1);
  const ids = new Set(catalog.items.map(item => item.id));
  assert.equal(ids.size, catalog.items.length, '组件 ID 重复');
  const secure = url => assert.equal(new URL(url).protocol, 'https:', `外链必须为 HTTPS：${url}`);
  for (const item of catalog.items) {
    for (const field of ['id', 'name', 'owner', 'category', 'description', 'best_for', 'caution']) assert.ok(item[field]?.trim(), `${item.id}缺少${field}`);
    assert.ok(Object.hasOwn(kinds, item.kind));
    assert.ok(Object.hasOwn(origins, item.origin));
    assert.ok(item.frameworks?.length && item.tags?.length);
    secure(item.homepage);
    if (item.repository) secure(item.repository);
    assert.ok(item.snapshot?.checked_on, `${item.id}缺少来源快照`);
    secure(item.snapshot.source);
    assert.ok(item.snapshot.license?.trim());
    if (['pub', 'npm'].includes(item.manager)) {
      assert.ok(item.package && item.snapshot.version);
      assert.match(item.install, item.manager === 'pub' ? /^flutter pub add (?:--dev )?[a-z][a-z0-9_]*$/ : /^(npm install |npx shadcn@latest init)/);
    } else assert.equal(item.install, '', '源码示例不能伪造安装命令');
    if (item.manager === 'pub') assert.equal(item.snapshot.source, `https://pub.dev/api/packages/${item.package}`);
  }
  const recipes = new Set();
  for (const recipe of catalog.recipes) {
    assert.ok(!recipes.has(recipe.id)); recipes.add(recipe.id);
    assert.ok(recipe.note && recipe.items.length);
    for (const id of recipe.items) assert.ok(ids.has(id), `场景中不存在${id}`);
  }
  assert.equal(await read('docs/toolkit-guide.md'), renderToolkitGuide(catalog), '工具集文档与数据不同步，运行 npm run docs:toolkit');
  for (const file of ['web/index.html', 'web/motion.html']) assert.ok((await read(file)).includes('href="/toolkit.html"'), `${file}缺少工具集导航`);
  return catalog;
}
