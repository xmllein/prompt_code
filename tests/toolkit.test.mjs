import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { filterTools, isHistorical, maintenanceLabel, describeTool } from '../web/toolkit-utils.js';

const catalog = JSON.parse(await readFile(new URL('../data/toolkit-library.json', import.meta.url), 'utf8'));
const byId = id => catalog.items.find(item => item.id === id);
test('default excludes stopped/archived references, without excluding old but supported packages', () => {
  const results = filterTools(catalog);
  assert.ok(results.some(item => item.id === 'fluro'));
  for (const id of ['flukit', 'flutter-platform-widgets', 'scroll-kit', 'fluttergo']) {
    assert.ok(!results.some(item => item.id === id));
    assert.ok(filterTools(catalog, { historical: true }).some(item => item.id === id));
  }
});
test('Chinese scenes, npm scopes, underscored Dart names and multiword queries can be found', () => {
  assert.ok(filterTools(catalog, { query: '字节 React' }).some(item => item.id === 'semi'));
  assert.ok(filterTools(catalog, { query: 'go_router' }).some(item => item.id === 'go-router'));
  assert.ok(filterTools(catalog, { query: '@ant-design/web3' }).some(item => item.id === 'ant-web3'));
  assert.ok(filterTools(catalog, { query: '路由' }).length >= 3);
  assert.equal(filterTools(catalog, { query: '<script>alert(1)</script>' }).length, 0);
});
test('type, origin, category, framework, recipe and favorites combine by intersection', () => {
  assert.deepEqual(filterTools(catalog, { kind: 'web', origin: 'tencent', framework: 'Vue', category: '企业后台' }).map(item => item.id), ['td-vue']);
  assert.deepEqual(filterTools(catalog, { recipe: 'web3-dapp', query: '钱包' }).map(item => item.id), ['ant-web3']);
  assert.deepEqual(filterTools(catalog, { kind: 'favorites', origin: 'tencent' }, new Set(['tdesign-flutter', 'go-router'])).map(item => item.id), ['tdesign-flutter']);
  assert.deepEqual(filterTools(catalog, { recipe: 'web3-dapp', framework: 'Flutter' }), []);
});
test('published age is distinct from discontinued state; zero or missing analysis is not failure', () => {
  assert.equal(isHistorical(byId('fluro')), false);
  assert.equal(maintenanceLabel(byId('fluro'), '2026-11-01'), '发布较早 · 先验证');
  assert.match(maintenanceLabel(byId('flutter-platform-widgets'), '2026-11-01'), /停止维护/);
  assert.equal(isHistorical({ snapshot: { platforms: [] } }), false);
});
test('copied selection preserves source and caveats; historical references have no install shortcut', () => {
  const content = describeTool(byId('ant-web3'));
  assert.ok(content.includes('https://web3.ant.design/'));
  assert.ok(content.includes('合约审计'));
  assert.ok(content.includes('核查'));
  assert.ok(!describeTool(byId('scroll-kit')).includes('flutter pub add'));
  assert.ok(!describeTool(byId('fluttergo')).includes('flutter pub add'));
  assert.ok(describeTool(byId('freezed')).includes('flutter pub add --dev freezed'));
});
