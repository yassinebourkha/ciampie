import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, pages, href } from '../src/data/site.mjs';
import { layout, escape } from '../src/components.mjs';
import { renderPage } from '../src/views.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const dist = join(root, 'dist');

export async function build() {
  if (site.quoteEmail && !/^[^\s@:?]+@[^\s@:?]+\.[^\s@:?]+$/.test(site.quoteEmail)) {
    throw new Error('Adresse de devis invalide dans src/data/site.mjs.');
  }
  if (site.indexable && !site.siteUrl.startsWith('https://')) {
    throw new Error('Définir le domaine HTTPS validé avant d’activer l’indexation.');
  }
  const images = JSON.parse(await readFile(join(root, 'src/data/images.json'), 'utf8'));
  await mkdir(dist, { recursive: true });
  await cp(join(root, 'public'), dist, { recursive: true });
  await mkdir(join(dist, 'assets/css'), { recursive: true });
  await mkdir(join(dist, 'assets/js'), { recursive: true });
  await cp(join(root, 'src/styles/site.css'), join(dist, 'assets/css/site.css'));
  await cp(join(root, 'src/scripts/app.js'), join(dist, 'assets/js/app.js'));
  await cp(join(root, 'src/data/requests.mjs'), join(dist, 'assets/js/requests.mjs'));
  await writeFile(join(dist, 'assets/js/config.mjs'), `export const quoteEmail = ${JSON.stringify(site.quoteEmail)};\n`);
  for (const page of pages) {
    const directory = join(dist, page.slug);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'index.html'), layout(page, renderPage(page.key, images)));
  }
  await writeFile(join(dist, 'robots.txt'), site.indexable
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site.siteUrl).href}\n`
    : 'User-agent: *\nDisallow: /\n');
  if (site.siteUrl) {
    const urls = site.indexable ? pages.map(page => `<url><loc>${escape(new URL(href(page.key), site.siteUrl).href)}</loc></url>`).join('') : '';
    await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  }
  console.log(`Build : ${pages.length} pages générées dans dist/`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await build();
