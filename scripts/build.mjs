import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { root, validateProject } from './check.mjs';

const library = await validateProject();
const destination = path.join(root, 'dist');
await rm(destination, { recursive: true, force: true });
await cp(path.join(root, 'web'), destination, { recursive: true });
await mkdir(path.join(destination, 'data'), { recursive: true });
await cp(path.join(root, 'data/prompt-library.json'), path.join(destination, 'data/prompt-library.json'));
console.log(`已构建 ${library.prompts.length} 个模板到 dist/；可作为纯静态站点部署。`);
