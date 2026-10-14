import { site, href, quoteHref } from './data/site.mjs';
import { escape, button, photo, prepare, quoteForm, contactCallout } from './components.mjs';

const services = {
  transport: { name: 'Transport routier', title: 'Transport<br>routier.', image: 'transport', secondary: 'hero', intro: 'Présentez vos marchandises, le lieu de départ et la destination pour préparer votre transport.',
    description: 'Acheminement de marchandises et d’équipements : départ, destination et contraintes sont à préciser.',
    topics: [
      ['La marchandise', 'Décrivez la nature de la charge, la quantité, le poids et les dimensions connus. Signalez les informations restant à préciser.'],
      ['Le trajet', 'Indiquez les lieux d’enlèvement et de livraison, les accès et les possibilités de chargement ou de déchargement.'],
      ['Le calendrier', 'Précisez la date souhaitée, les créneaux imposés et les contraintes de coordination de votre opération.']
    ],
    bridgeTitle: 'Une charge<br>particulière ?', bridge: 'Votre chargement présente des dimensions ou un poids particuliers ? Indiquez ses caractéristiques et le trajet envisagé pour étudier les conditions de prise en charge.',
    faq: [['Quelles informations préparer ?', 'Départ, destination, marchandise et date souhaitée. Le poids, les dimensions et les accès permettent de préciser l’étude.'], ['Et si des détails manquent ?', 'Indiquez les éléments inconnus dans votre demande. Un échange pourra permettre de les compléter avant le devis.'], ['Les zones sont-elles confirmées ?', 'Présentez le trajet envisagé. Les zones desservies et la prise en charge doivent être confirmées avec l’entreprise.']]
  },
  levage: { name: 'Levage & manutention', title: 'Levage &amp;<br>manutention.', image: 'levage', secondary: 'hero', intro: 'Décrivez la charge, les accès et l’emplacement final pour préparer votre opération.',
    description: 'Déplacement et mise en place d’équipements selon la charge, les accès et l’emplacement final.',
    topics: [
      ['La charge', 'Nature de l’équipement, poids, dimensions et points de prise connus. Ces informations contribuent à l’étude des moyens nécessaires.'],
      ['Le site', 'Précisez les accès, l’espace disponible, les obstacles et la position finale. Signalez les contraintes de circulation ou d’installation.'],
      ['Le calendrier', 'Date souhaitée, créneaux imposés et autres intervenants : indiquez les contraintes de coordination de votre opération.']
    ],
    bridgeTitle: 'Transport et<br>mise en place.', bridge: 'Votre projet peut associer l’acheminement d’un équipement à sa manutention. Présentez l’ensemble de l’opération pour étudier les prestations nécessaires.',
    faq: [['Quelles informations transmettre ?', 'Décrivez l’équipement, son emplacement actuel et sa position finale. Ajoutez le poids, les dimensions, les accès et la date souhaitée.'], ['Et si le poids est inconnu ?', 'Précisez ce qui reste à vérifier. La charge et les conditions d’accès doivent être étudiées avant toute décision de faisabilité.'], ['Le formulaire confirme-t-il la faisabilité ?', 'Non. La demande permet de présenter le projet ; la prise en charge reste soumise à l’étude des moyens et des contraintes de l’opération.']]
  },
  stockage: { name: 'Stockage & logistique', title: 'Stockage &amp;<br>logistique.', image: 'stockage', secondary: 'hero', intro: 'Décrivez vos marchandises, le volume et les mouvements prévus pour préparer votre besoin de stockage.',
    description: 'Entreposage, manutention et préparation des marchandises selon le volume, la durée et les mouvements.',
    topics: [
      ['Les marchandises', 'Nature, conditionnement, volume ou nombre de palettes : précisez les caractéristiques et les contraintes connues.'],
      ['La durée', 'Indiquez la date d’entrée souhaitée, la durée de stockage envisagée et les échéances de sortie.'],
      ['Les mouvements', 'Réception, déchargement, palettisation, préparation, enlèvement et livraison : indiquez les prestations dont votre projet a besoin.']
    ],
    bridgeTitle: 'Stockage et<br>mouvements.', bridge: 'Votre demande peut associer entreposage et préparation de marchandises. Décrivez la fréquence des entrées et des sorties ainsi que les besoins de transport.',
    faq: [['Quels renseignements préparer ?', 'Nature des marchandises, conditionnement, volume, dates et durée souhaitée. Précisez les mouvements et les prestations complémentaires attendus.'], ['Les conditions de stockage sont-elles fixées ?', 'Elles dépendent de la marchandise et du projet. Les conditions, capacités et disponibilités devront être confirmées avec l’entreprise.'], ['Peut-on associer stockage et transport ?', 'Présentez l’ensemble de votre besoin afin d’étudier les prestations à mobiliser. Une demande ne vaut pas confirmation de prise en charge.']]
  }
};

function address() {
  return `<div class="tile address"><h3 data-enter>CIAM-PIE</h3><address>${site.address.map(escape).join('<br>')}</address>
    <a class="lead" href="${site.phoneHref}">${escape(site.phone)}</a>
    <a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(site.address.join(', '))}" target="_blank" rel="noopener noreferrer">Voir l’itinéraire <span class="sr-only">(nouvel onglet)</span></a>
    <p>Coordonnées issues du site actuel, à confirmer avant publication.</p></div>`;
}

function serviceRows() {
  return `<section class="services board" id="services"><div class="tile services-intro">
    <h2 data-enter>Quel est votre<br>besoin ?</h2><div><p data-enter>Un équipement à acheminer, une charge à positionner, des marchandises à stocker : choisissez la prestation correspondant à votre projet.</p><a href="#preparer">Préparer ma demande</a></div>
    </div><div class="service-rows">${Object.entries(services).map(([key, item]) => `<article>
      <h3 data-enter>${escape(item.name)}</h3><p data-enter>${escape(item.description)}</p>
      <a href="${href(key)}" data-enter>Découvrir la prestation</a></article>`).join('')}</div></section>`;
}

function companyBlock(images) {
  return `<section class="company board" id="entreprise"><div class="tile company-copy">
    <h2 data-enter>Au départ<br>de Vitrolles.</h2><div><p class="lead" data-enter>CIAM-PIE à Vitrolles : transport, manutention et stockage.</p><p data-enter>Présentez les caractéristiques de votre projet pour préciser les prestations à mobiliser. La prise en charge reste soumise à l’étude de l’opération.</p><a href="${href('entreprise')}">Découvrir l’entreprise</a></div>
  </div>${photo('stockage', 'Marchandises palettisées dans un entrepôt', images, 'warehouse')}${address()}</section>`;
}

function home(images) {
  return `<section class="hero board"><div class="tile hero-copy"><h1 data-enter>Transport &amp;<br>logistique.</h1>
    <p class="lead" data-enter>Transport routier, levage et stockage depuis Vitrolles.</p>
    ${button('Demander un devis', quoteHref(), 'hero-cta')}</div>
    ${photo('hero', 'Camion-grue vert dans un dépôt industriel', images, 'hero-photo shutter', true)}
    ${photo('levage', 'Camion-grue vert et charge industrielle', images, 'hero-detail')}
    <a class="tile hero-link" href="${href('levage')}"><span class="lead">Levage &amp;<br>manutention</span><span>Découvrir la prestation</span></a>
  </section>${serviceRows()}${prepare(images)}${companyBlock(images)}${contactCallout()}`;
}

function related(key, images) {
  const others = Object.entries(services).filter(([id]) => id !== key);
  return `<section class="related board"><div class="tile related-copy"><h2 data-enter>D’autres<br>besoins ?</h2><p>Votre opération peut associer plusieurs prestations. Présentez le projet dans son ensemble.</p></div>
    ${others.map(([id, item]) => `<div class="related-item">${photo(item.image, item.name, images)}<a href="${href(id)}">${escape(item.name)}</a></div>`).join('')}</section>`;
}

function servicePage(key, images) {
  const item = services[key];
  return `<section class="hero board service-hero"><div class="tile hero-copy"><h1 data-enter>${item.title}</h1><p class="lead" data-enter>${escape(item.intro)}</p>
    ${button('Demander un devis', quoteHref(key))}<a href="/#services">Toutes les prestations</a></div>
    ${photo(item.image, item.name, images, 'hero-photo shutter', true)}${photo(item.secondary, 'Camion-grue vert dans un dépôt', images, 'hero-detail')}
  </section><section class="services board service-topic"><div class="tile services-intro"><h2 data-enter>Les détails<br>qui comptent.</h2><div><p>Chaque projet a ses contraintes. Indiquez ce que vous connaissez et ce qui reste à préciser.</p>${button('Demander un devis', quoteHref(key))}</div></div>
    <div class="service-rows">${item.topics.map(([title, text]) => `<article><h3 data-enter>${escape(title)}</h3><p data-enter>${escape(text)}</p></article>`).join('')}</div>
  </section><section class="board bridge"><div class="tile"><h2 data-enter>${item.bridgeTitle}</h2></div><div class="tile"><p class="lead" data-enter>${escape(item.bridge)}</p><p>Les moyens nécessaires, les conditions et les possibilités de prise en charge devront être étudiés avec l’entreprise.</p></div></section>
  <section class="questions board"><div class="tile"><h2 data-enter>Avant<br>l’échange.</h2></div><div class="tile">${item.faq.map(([question, answer]) => `<details><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join('')}</div></section>
  ${related(key, images)}${contactCallout(key)}`;
}

function company(images) {
  return `<section class="hero board service-hero"><div class="tile hero-copy"><h1 data-enter>CIAM-PIE,<br>à Vitrolles.</h1><p class="lead" data-enter>Transport, manutention et stockage : présentez votre projet à CIAM-PIE depuis son implantation à Vitrolles.</p>${button()}</div>
    ${photo('hero', 'Camion-grue vert dans un dépôt', images, 'hero-photo shutter', true)}${photo('levage', 'Illustration d’une opération de levage', images, 'hero-detail')}</section>
    ${companyBlock(images)}<section class="prepare board"><div class="tile prepare-copy"><h2 data-enter>Votre projet,<br>ses contraintes.</h2><p>Un transport peut nécessiter une manutention, un stockage ou des mouvements complémentaires. Présentez les différents besoins et les contraintes pour préparer un échange utile.</p><p>Nous n’affichons pas de capacités chiffrées ni de zones d’intervention non confirmées dans cette version de travail.</p><a href="/#services">Voir les prestations</a></div>
    ${photo('transport', 'Camion vert transportant un équipement industriel', images)}</section>${contactCallout()}`;
}

function quote() {
  return `<section class="contact board quote-layout"><div class="tile contact-copy"><h1 data-enter>Demander<br>un devis.</h1><p class="lead" data-enter>Décrivez votre besoin et préparez les informations utiles au premier échange.</p>
    <div class="contact-bottom"><p>Vous préférez échanger par téléphone ?</p><a class="lead" href="${site.phoneHref}">${escape(site.phone)}</a><address>${site.address.map(escape).join('<br>')}</address></div></div>${quoteForm()}</section>
    <section class="board quote-result" id="recapitulatif" hidden><div class="tile"><h2>Votre demande<br>est préparée.</h2><p role="status" id="result-status">Aucune demande n’a été envoyée. Téléchargez le récapitulatif ou contactez CIAM-PIE par téléphone.</p></div><div class="tile"><label for="summary">Récapitulatif<textarea id="summary" readonly></textarea></label><a class="button" id="download-summary" download> Télécharger ma demande</a><a class="text-link" id="email-summary" hidden>Ouvrir ma messagerie</a></div></section>`;
}

export function renderPage(key, images) {
  if (key === 'home') return home(images);
  if (Object.hasOwn(services, key)) return servicePage(key, images);
  if (key === 'entreprise') return company(images);
  if (key === 'devis') return quote();
  throw new Error(`Contenu inconnu : ${key}`);
}
