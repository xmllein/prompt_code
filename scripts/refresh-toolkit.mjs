// Refresh official registry metadata; never installs or executes collected packages.
import { readFile, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const target = new URL('../data/toolkit-library.json', import.meta.url);
const catalog = JSON.parse(await readFile(target, 'utf8'));
const checkedOn = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Singapore', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'PromptCode-resource-catalog/1.0' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
const normalizeRepository = value => {
  const url = (typeof value === 'string' ? value : value?.url) || '';
  return url.replace(/^git\+/, '').replace(/^git:\/\//, 'https://').replace(/\.git$/, '');
};
const pending = [...catalog.items];
let failed = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (pending.length) {
    const item = pending.shift();
    if (!['pub', 'npm'].includes(item.manager)) continue;
    try {
      const source = item.manager === 'pub' ? `https://pub.dev/api/packages/${item.package}` : `https://registry.npmjs.org/${encodeURIComponent(item.package)}/latest`;
      const data = await get(source);
      let snapshot;
      if (item.manager === 'pub') {
        let score = null;
        try { score = await get(`${source}/score`); } catch { /* analysis may be unavailable */ }
        const spec = data.latest.pubspec;
        const tags = score?.tags || [];
        const licenses = tags.filter(tag => /^license:/.test(tag) && !['license:fsf-libre', 'license:osi-approved'].includes(tag)).map(tag => tag.slice(8).toUpperCase());
        snapshot = { checked_on: checkedOn, source, score_source: score ? `${source}/score` : null, version: data.latest.version, published: data.latest.published, license: licenses.join(', ') || item.license_review?.label || '待核对 LICENSE', sdk: spec.environment?.sdk || '', flutter_sdk: spec.environment?.flutter || '', platforms: tags.filter(tag => tag.startsWith('platform:')).map(tag => tag.slice(9)), discontinued: data.isDiscontinued === true || tags.includes('is:discontinued'), unlisted: tags.includes('is:unlisted'), registry_description: spec.description || '' };
        if (!item.repository) item.repository = normalizeRepository(spec.repository || (spec.homepage?.includes('github.com/') ? spec.homepage : ''));
      } else {
        snapshot = { checked_on: checkedOn, source, version: data.version, license: typeof data.license === 'string' ? data.license : data.license?.type || item.license_review?.label || '待核对 LICENSE', peer_dependencies: data.peerDependencies || {}, deprecated: data.deprecated || '', registry_description: data.description || '' };
      }
      item.snapshot = snapshot;
      delete item.refresh_error;
      console.log(`✓ ${item.package} ${snapshot.version}${snapshot.discontinued ? ' [discontinued]' : ''}`);
    } catch (error) {
      failed++;
      item.refresh_error = `${checkedOn}: ${error.message}`;
      console.log(`! ${item.package}: ${error.message}（保留原快照）`);
    }
  }
}));
catalog.metadata_checked_on = checkedOn;
const temp = `${fileURLToPath(target)}.tmp`;
await writeFile(temp, `${JSON.stringify(catalog, null, 2)}\n`);
await rename(temp, target);
console.log(`元数据刷新完成：${catalog.items.length}项，${failed}项失败。`);
if (failed) process.exitCode = 1;
