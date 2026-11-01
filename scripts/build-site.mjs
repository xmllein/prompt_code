import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

async function listFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(path.join(directory, entry.name), name));
    else files.push(name);
  }
  return files.sort();
}

// This static site uses quoted root-relative URLs and ./module imports. Rewrite
// only references to known assets; page routes, data URIs and license links stay intact.
export async function buildSite(root, destination) {
  const sources = new Map();
  for (const [folder, prefix] of [['web', ''], ['data', 'data/']]) {
    for (const file of await listFiles(path.join(root, folder))) {
      sources.set(`/${prefix}${file}`, await readFile(path.join(root, folder, file), 'utf8'));
    }
  }
  const assets = new Set([...sources.keys()].filter(name => /\.(js|css|svg|json)$/.test(name)));
  const manifest = new Map();
  const output = new Map();
  const visiting = new Set();

  function rewrite(text, name) {
    return text.replace(/(["'])(\.?\.?\/[^"'\s]+)\1/g, (match, quote, url) => {
      const target = path.posix.resolve(path.posix.dirname(name), url);
      return assets.has(target) ? `${quote}${emit(target)}${quote}` : match;
    });
  }

  function emit(name) {
    if (manifest.has(name)) return manifest.get(name);
    if (visiting.has(name)) throw new Error(`资源存在循环引用：${name}`);
    visiting.add(name);
    const source = sources.get(name);
    const content = name.endsWith('.json') ? JSON.stringify(JSON.parse(source)) : rewrite(source, name);
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 16);
    const { name: stem, ext } = path.posix.parse(name);
    const url = `/assets/${stem}.${hash}${ext}`;
    manifest.set(name, url);
    output.set(url, content);
    visiting.delete(name);
    return url;
  }

  for (const asset of assets) emit(asset);
  for (const [name, content] of sources) {
    if (!assets.has(name)) output.set(name, name.endsWith('.html') ? rewrite(content, name) : content);
  }
  await rm(destination, { recursive: true, force: true });
  for (const [url, content] of output) {
    const target = path.join(destination, url);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content);
  }
  // Keep the documented JSON endpoints available to external readers. The UI
  // uses fingerprinted copies so it can safely cache data across deployments.
  await cp(path.join(root, 'data'), path.join(destination, 'data'), { recursive: true });
  return manifest;
}
