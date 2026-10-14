import { readFile, stat } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { build, dist } from './build.mjs';
import { pages, href } from '../src/data/site.mjs';

export async function check() {
  const failures = [];
  for (const page of pages) {
    const html = await readFile(join(dist, page.slug, 'index.html'), 'utf8');
    if ((html.match(/<h1\b/g) || []).length !== 1) failures.push(`${page.key} : un seul h1 attendu`);
    if (!html.includes('<html lang="fr">')) failures.push(`${page.key} : langue absente`);
    if (!html.includes('name="description"')) failures.push(`${page.key} : description absente`);
    if (/<(?:img|script)\b[^>]*(?:src=""|src="#")/.test(html)) failures.push(`${page.key} : source vide`);
    if (html.includes('Tester la demande') || html.includes('Maquette Taste')) failures.push(`${page.key} : ancien texte de maquette`);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const value = match[1].replaceAll('&amp;', '&');
      if (/^(https?:|tel:|mailto:)/.test(value)) continue;
      const url = new URL(value, `http://local.test${href(page.key)}`);
      let target = resolve(dist, `.${url.pathname}`);
      if (target !== dist && !target.startsWith(dist + sep)) { failures.push(`${page.key} : chemin hors site`); continue; }
      if (url.pathname.endsWith('/')) target = join(target, 'index.html');
      try {
        await stat(target);
        if (url.hash) {
          const linked = await readFile(target, 'utf8');
          if (!linked.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) failures.push(`${page.key} : ancre introuvable ${value}`);
        }
      } catch { failures.push(`${page.key} : lien cassé ${value}`); }
    }
    for (const image of html.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt="[^"]+"/.test(image[0])) failures.push(`${page.key} : alt absent`);
      if (!/\bwidth="\d+"/.test(image[0]) || !/\bheight="\d+"/.test(image[0])) failures.push(`${page.key} : dimensions absentes`);
    }
  }
  if (failures.length) throw new Error(failures.join('\n'));
  console.log(`Contrôles : ${pages.length} pages, liens et assets locaux valides.`);
}

if (process.argv[1]?.endsWith('check.mjs')) { await build(); await check(); }
