import { mkdir, readFile, copyFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function syncMotionAssets() {
  const catalog = JSON.parse(await readFile(path.join(root, 'data/motion-library.json'), 'utf8'));
  for (const [pkg, version] of [['animate.css', catalog.versions.animate], ['gsap', catalog.versions.gsap]]) {
    const installed = JSON.parse(await readFile(path.join(root, 'node_modules', pkg, 'package.json'), 'utf8'));
    if (installed.version !== version) throw new Error(`${pkg}版本与动效资料不一致，请先npm ci`);
  }
  const vendor = path.join(root, 'web/vendor');
  await mkdir(vendor, { recursive: true });
  for (const [source, target] of [
    ['animate.css/animate.min.css', 'animate.min.css'],
    ['animate.css/LICENSE', 'animate.LICENSE.txt'],
    ['gsap/dist/gsap.min.js', 'gsap.min.js'],
    ['gsap/dist/ScrollTrigger.min.js', 'ScrollTrigger.min.js'],
    ['gsap/dist/Flip.min.js', 'Flip.min.js'],
  ]) await copyFile(path.join(root, 'node_modules', source), path.join(vendor, target));
  await writeFile(path.join(vendor, 'GSAP-NOTICE.txt'), `GSAP ${catalog.versions.gsap}\nCopyright 2026 GreenSock. All rights reserved.\nLicensed under the GSAP Standard no-charge license, not MIT.\nFull applicable terms: https://gsap.com/standard-license\nThe distributed scripts retain their original copyright and license notices.\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await syncMotionAssets();
  console.log('已准备固定版本动效资源与许可标识。');
}
