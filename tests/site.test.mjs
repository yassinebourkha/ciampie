import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site, pages, href, quoteHref } from '../src/data/site.mjs';
import { requests, normalizeService, createSummary } from '../src/data/requests.mjs';
import { escape } from '../src/components.mjs';
import { build, dist, root } from '../scripts/build.mjs';
import { check } from '../scripts/check.mjs';

test('six pages distinctes et liens de devis cohérents', () => {
  assert.equal(pages.length, 6);
  assert.equal(new Set(pages.map(page => page.slug)).size, 6);
  assert.equal(href('home'), '/');
  assert.equal(quoteHref('levage'), '/demande-de-devis/?prestation=levage');
  assert.throws(() => href('inconnue'));
});

test('le domaine du site public et l’absence de destinataire de devis sont configurés', () => {
  assert.equal(site.indexable, true);
  assert.equal(site.siteUrl, 'https://ciampie-demo.wittysmile32.chatgpt.site');
  assert.equal(site.quoteEmail, '');
});

test('une prestation non reconnue retombe sur le transport', () => {
  assert.equal(normalizeService('levage'), 'levage');
  assert.equal(normalizeService('__proto__'), 'transport');
  assert.equal(normalizeService('<script>'), 'transport');
});

test('le récapitulatif contient les champs propres au service et ne simule pas un envoi', () => {
  const text = createSummary({ prestation: 'stockage', nom: 'Test', telephone: '0601020304', message: 'Besoin de stockage.', 'detail-0': '12 palettes', 'detail-1': 'Un mois' });
  assert.match(text, /Stockage et logistique/);
  assert.match(text, /Volume ou nombre de palettes : 12 palettes/);
  assert.match(text, /Durée et mouvements prévus : Un mois/);
  assert.match(text, /Aucune demande envoyée/);
  assert.doesNotMatch(text, /Poids et dimensions connus/);
  assert.equal(requests.autre.fields.length, 1);
});

test('les valeurs rendues dans le HTML sont échappées', () => {
  assert.equal(escape('<img src="x" onerror="alert(1)">'), '&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;');
});

test('build complet, métadonnées, assets et navigation sans liens cassés', async () => {
  await build();
  await check();
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/ciampie-demo\.wittysmile32\.chatgpt\.site\/sitemap\.xml/);
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, pages.length);
  const home = await readFile(join(dist, 'index.html'), 'utf8');
  assert.match(home, /<meta name="robots" content="index,follow">/);
  assert.match(home, /<link rel="canonical" href="https:\/\/ciampie-demo\.wittysmile32\.chatgpt\.site\//);
  const html = await readFile(join(dist, 'demande-de-devis/index.html'), 'utf8');
  assert.match(html, /type="submit" disabled/);
  assert.match(html, /id="recapitulatif" hidden/);
  const js = await readFile(join(root, 'src/scripts/app.js'), 'utf8');
  assert.doesNotMatch(js, /localStorage|sessionStorage|fetch\(|sendBeacon/);
});
