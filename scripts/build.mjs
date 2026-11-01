import path from 'node:path';
import { root, validateProject } from './check.mjs';
import { syncMotionAssets } from './sync-motion-assets.mjs';
import { buildSite } from './build-site.mjs';

const library = await validateProject();
await syncMotionAssets();
const destination = path.join(root, 'dist');
await buildSite(root, destination);
console.log(`已构建 ${library.prompts.length} 个模板到 dist/；可作为纯静态站点部署。`);
