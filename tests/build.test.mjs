import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { buildSite } from '../scripts/build-site.mjs';

test('构建压缩目录并为依赖生成内容指纹，预加载与运行时使用同一URL', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'promptcode-build-'));
  try {
    await mkdir(path.join(root, 'web/vendor'), { recursive: true });
    await mkdir(path.join(root, 'data'));
    const data = { items: [{ name: '中文内容', body: '保留\n换行与空格' }] };
    await writeFile(path.join(root, 'data/catalog.json'), JSON.stringify(data, null, 2));
    await writeFile(path.join(root, 'web/index.html'), '<link rel="preload" href="/data/catalog.json" as="fetch" crossorigin><script type="module" src="/app.js"></script>');
    await writeFile(path.join(root, 'web/app.js'), "import { load } from './engine.js'; fetch('/data/catalog.json'); load();");
    await writeFile(path.join(root, 'web/engine.js'), "export const load = () => new URL('./vendor/demo.js', import.meta.url);");
    await writeFile(path.join(root, 'web/vendor/demo.js'), 'window.demo = 1;');
    await writeFile(path.join(root, 'web/vendor/NOTICE.txt'), 'License notice');
    const build = () => buildSite(root, path.join(root, 'dist'));
    const first = await build();
    const html = await readFile(path.join(root, 'dist/index.html'), 'utf8');
    const content = url => readFile(path.join(root, 'dist', url), 'utf8');
    assert.match(first.get('/app.js'), /^\/assets\/app\.[a-f0-9]{16}\.js$/);
    assert.ok(html.includes(first.get('/app.js')));
    assert.ok(html.includes(first.get('/data/catalog.json')));
    assert.ok((await content(first.get('/app.js'))).includes(first.get('/data/catalog.json')));
    assert.ok((await content(first.get('/app.js'))).includes(first.get('/engine.js')));
    assert.ok((await content(first.get('/engine.js'))).includes(first.get('/vendor/demo.js')));
    assert.equal(await content(first.get('/data/catalog.json')), JSON.stringify(data));
    assert.equal(await content('/vendor/NOTICE.txt'), 'License notice');
    assert.deepEqual(await build(), first, '相同输入应生成相同URL');
    await writeFile(path.join(root, 'web/vendor/demo.js'), 'window.demo = 2;');
    const updated = await build();
    for (const name of ['/vendor/demo.js', '/engine.js', '/app.js']) {
      assert.notEqual(updated.get(name), first.get(name), `${name}应随依赖更新`);
    }
    assert.equal(updated.get('/data/catalog.json'), first.get('/data/catalog.json'));
    await assert.rejects(content(first.get('/app.js')), { code: 'ENOENT' });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
