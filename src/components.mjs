import { site, pages, href, quoteHref } from './data/site.mjs';
import { requests } from './data/requests.mjs';

export function escape(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

export function button(label = 'Demander un devis', url = quoteHref(), classes = '') {
  return `<a class="button ${classes}" href="${escape(url)}">${escape(label)}</a>`;
}

export function photo(key, alt, images, classes = '', priority = false) {
  const { width, height } = images[key];
  return `<figure class="tile image-tile ${classes}">
    <div class="image-window"><img src="/assets/images/${key}-1280.webp"
      srcset="/assets/images/${key}-640.webp 640w, /assets/images/${key}-1280.webp 1280w"
      sizes="(max-width: 900px) 100vw, 60vw" width="${width}" height="${height}"
      ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"
      alt="${escape(alt)}, illustration IA"></div>
    <figcaption>Illustration IA · visuel provisoire</figcaption>
  </figure>`;
}

export function header(current) {
  const items = pages.filter(page => ['transport', 'levage', 'stockage', 'entreprise'].includes(page.key));
  return `<a class="skip" href="#contenu">Aller au contenu</a>
  <header class="navigation"><a href="/" aria-label="CIAM-PIE, accueil"><img class="logo"
    src="/assets/images/logo-original.png" width="154" height="88" alt="CIAM-PIE"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation">Menu</button>
    <nav id="navigation" aria-label="Navigation principale">
      ${items.map(page => `<a href="${href(page.key)}"${current === page.key ? ' aria-current="page"' : ''}>${page.nav}</a>`).join('\n')}
      <a href="${site.phoneHref}">${escape(site.phone)}</a>
      ${button('Demander un devis', current === 'devis' ? '#formulaire' : quoteHref())}
    </nav>
  </header>`;
}

export function footer() {
  return `<footer class="footer board">
    <div class="tile footer-brand"><span class="brand-name">CIAM-PIE</span><p>Transport, levage et logistique.</p></div>
    <nav class="tile footer-nav" aria-label="Navigation secondaire">
      ${pages.filter(page => page.key !== 'home').map(page => `<a href="${href(page.key)}">${page.nav === 'Devis' ? 'Demander un devis' : escape(page.nav)}</a>`).join('\n')}
    </nav>
    <div class="tile footer-note"><address>${site.address.map(escape).join('<br>')}</address>
      <a href="${site.phoneHref}">${escape(site.phone)}</a>
      <p>Version de travail locale. Textes, coordonnées et prestations à valider avant publication. Images IA illustratives.</p>
      <a href="#contenu">Retour en haut</a>
    </div>
  </footer>`;
}

export function contactCallout(service = '') {
  return `<section class="board contact-callout"><div class="tile">
    <h2 data-enter>Parlons de<br>votre projet.</h2><p data-enter>Indiquez la prestation souhaitée et les informations connues pour préparer le premier échange.</p>
  </div><div class="tile callout-action">${button('Demander un devis', quoteHref(service))}
    <p>Vous préférez appeler ?<br><a href="${site.phoneHref}">${escape(site.phone)}</a></p></div></section>`;
}

export function prepare(images) {
  return `<section class="prepare board" id="preparer"><div class="tile prepare-copy">
    <h2 data-enter>Préparer<br>votre demande.</h2><p data-enter>Choisissez votre prestation pour retrouver les informations utiles au premier échange.</p>
    <div class="service-picker" role="group" aria-label="Prestation à préparer">
      ${['transport', 'levage', 'stockage'].map(key => `<button type="button" data-pick="${key}" aria-pressed="${key === 'transport'}">${key === 'transport' ? 'Transport' : key === 'levage' ? 'Levage' : 'Stockage'}</button>`).join('')}
    </div><div class="requirements" aria-live="polite"><h3 id="require-title">${requests.transport.title}</h3>
      <ul id="require-list">${requests.transport.requirements.map(text => `<li>${escape(text)}</li>`).join('')}</ul></div>
    <a class="button" id="prepare-link" href="${quoteHref('transport')}">Demander un devis</a>
    <noscript><p>Levage : charge, position finale et accès. Stockage : volume, durée et mouvements.</p></noscript>
  </div>${photo('transport', 'Camion vert transportant un équipement industriel arrimé', images)}</section>`;
}

export function quoteForm() {
  return `<form class="tile project-form" id="formulaire">
    <p class="full form-intro">Les champs marqués * sont obligatoires. Indiquez au moins un moyen de réponse : e-mail ou téléphone.</p>
    <div class="full field"><label for="prestation">Votre besoin</label><select id="prestation" name="prestation">
      ${Object.entries(requests).map(([key, item]) => `<option value="${key}">${escape(item.label)}</option>`).join('')}
    </select></div>
    <label for="nom">Votre nom *<input id="nom" name="nom" required autocomplete="name" maxlength="120"></label>
    <label for="societe">Votre société<input id="societe" name="societe" autocomplete="organization" maxlength="160"></label>
    <label for="email">Votre e-mail<input id="email" name="email" type="email" autocomplete="email" maxlength="254" aria-describedby="contact-help"></label>
    <label for="telephone">Votre téléphone<input id="telephone" name="telephone" type="tel" autocomplete="tel" maxlength="40" aria-describedby="contact-help"></label>
    <p id="contact-help" class="full form-note">Un e-mail ou un numéro de téléphone suffit pour préparer le premier contact.</p>
    <label class="full" for="message">Votre projet *<textarea id="message" name="message" required maxlength="5000" placeholder="Marchandise, lieux, date souhaitée…"></textarea></label>
    <details class="full"><summary>Ajouter des précisions</summary><div id="details-prestation">
      ${requests.transport.fields.map((label, index) => `<label for="detail-${index}">${escape(label)}<input id="detail-${index}" name="detail-${index}" maxlength="500"></label>`).join('')}
    </div></details>
    <p class="full form-note" id="submission-note">Version de travail : aucun envoi pour l’instant. Vous pouvez préparer et télécharger votre demande sans transmettre vos coordonnées.</p>
    <button class="button full" type="submit" disabled>Préparer ma demande</button>
    <noscript><p class="full">Pour préparer une demande sans JavaScript, contactez CIAM-PIE par téléphone.</p></noscript>
    <p class="full form-error" role="alert" hidden></p>
  </form>`;
}

export function layout(page, content) {
  const canonical = site.siteUrl ? `<link rel="canonical" href="${escape(new URL(href(page.key), site.siteUrl).href)}">` : '';
  return `<!doctype html>
<html lang="fr"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}">
  <meta name="robots" content="${site.indexable ? 'index,follow' : 'noindex,nofollow'}">
  <meta name="theme-color" content="#292929">${canonical}
  <meta property="og:type" content="website"><meta property="og:title" content="${escape(page.title)}">
  <meta property="og:description" content="${escape(page.description)}">
  <link rel="icon" href="/assets/images/logo-original.png" type="image/png">
  <link rel="preload" href="/assets/fonts/jost-700.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/assets/css/site.css"><script type="module" src="/assets/js/app.js"></script>
</head><body data-page="${page.key}">${header(page.key)}
<main id="contenu">${content}</main>${footer()}</body></html>`;
}
