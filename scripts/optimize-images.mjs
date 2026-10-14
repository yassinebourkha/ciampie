import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
let sharp;
try { sharp = require(process.env.SHARP_MODULE || 'sharp'); }
catch { throw new Error('Optimisation facultative : installer sharp ou définir SHARP_MODULE. Les images livrées sont déjà optimisées.'); }
await mkdir(join(root, 'public/assets/images'), { recursive: true });
const manifest = {};
for (const key of ['hero', 'transport', 'levage', 'stockage']) {
  const input = join(root, 'source-images', `${key}-ia.png`);
  for (const width of [640, 1280]) {
    const output = join(root, 'public/assets/images', `${key}-${width}.webp`);
    const info = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 85 }).toFile(output);
    if (width === 1280) manifest[key] = { width: info.width, height: info.height };
    console.log(`${key}-${width}.webp : ${Math.round(info.size / 1024)} Ko`);
  }
}
await writeFile(join(root, 'src/data/images.json'), JSON.stringify(manifest, null, 2) + '\n');
