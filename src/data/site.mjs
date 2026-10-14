// Informations de travail issues du site actuel, à confirmer avec le propriétaire.
export const site = {
  name: 'CIAM-PIE',
  phone: '04 42 46 16 96',
  phoneHref: 'tel:+33442461696',
  address: ['3 rue de la Glacière', 'ZI Bagnols', '13127 Vitrolles'],
  city: 'Vitrolles',
  // Aucun domaine de publication ni destinataire inventé.
  siteUrl: '',
  quoteEmail: '',
  indexable: false
};

export const pages = [
  { key: 'home', slug: '', nav: 'Accueil', title: 'Transport, levage et stockage à Vitrolles | CIAM-PIE', description: 'Découvrez les prestations de transport routier, levage et stockage de CIAM-PIE à Vitrolles. Préparez les informations utiles à votre projet.' },
  { key: 'transport', slug: 'transport-routier', nav: 'Transport', title: 'Transport routier à Vitrolles | CIAM-PIE', description: 'Préparez votre besoin de transport de marchandises et équipements : départ, destination, poids, dimensions, accès et calendrier.' },
  { key: 'levage', slug: 'levage-manutention', nav: 'Levage', title: 'Levage et manutention à Vitrolles | CIAM-PIE', description: 'Présentez votre charge et les contraintes de mise en place pour préparer une opération de levage ou de manutention.' },
  { key: 'stockage', slug: 'stockage-logistique', nav: 'Stockage', title: 'Stockage et logistique à Vitrolles | CIAM-PIE', description: 'Préparez votre besoin de stockage et de logistique : marchandises, volume, durée, réception et mouvements attendus.' },
  { key: 'entreprise', slug: 'entreprise', nav: 'Entreprise', title: 'CIAM-PIE, transport et logistique à Vitrolles', description: 'Retrouvez les activités de CIAM-PIE, son implantation à Vitrolles et les coordonnées utiles au premier échange.' },
  { key: 'devis', slug: 'demande-de-devis', nav: 'Devis', title: 'Préparer une demande de devis | CIAM-PIE', description: 'Décrivez votre besoin de transport, levage ou stockage et préparez un récapitulatif pour le premier échange.' }
];

export function href(key) {
  const page = pages.find(item => item.key === key);
  if (!page) throw new Error(`Page inconnue : ${key}`);
  return page.slug ? `/${page.slug}/` : '/';
}

export function quoteHref(service = '') {
  return `${href('devis')}${service ? `?prestation=${encodeURIComponent(service)}` : ''}`;
}
