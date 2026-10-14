// Données partagées par les contenus, le formulaire et les tests.
export const requests = {
  transport: {
    label: 'Transport routier', title: 'Pour votre transport',
    requirements: ['Lieu de départ et destination', 'Nature, poids et dimensions de la marchandise', 'Date souhaitée et contraintes d’accès'],
    fields: ['Départ et destination', 'Poids et dimensions connus'],
    placeholder: 'Marchandise, lieux, date souhaitée…'
  },
  levage: {
    label: 'Levage et manutention', title: 'Pour votre levage',
    requirements: ['Lieu et position finale de l’équipement', 'Poids et dimensions connus de la charge', 'Accès, espace disponible et date souhaitée'],
    fields: ['Lieu et emplacement final', 'Poids, dimensions et contraintes d’accès'],
    placeholder: 'Équipement, lieu, accès, date souhaitée…'
  },
  stockage: {
    label: 'Stockage et logistique', title: 'Pour votre stockage',
    requirements: ['Nature et volume des marchandises', 'Durée de stockage souhaitée', 'Déchargement, préparation et mouvements prévus'],
    fields: ['Volume ou nombre de palettes', 'Durée et mouvements prévus'],
    placeholder: 'Marchandises, volume, durée souhaitée…'
  },
  autre: {
    label: 'Autre demande', title: 'Pour votre projet',
    requirements: ['Nature de votre besoin', 'Lieu et calendrier envisagés'],
    fields: ['Informations complémentaires'], placeholder: 'Présentez votre besoin…'
  }
};

export function normalizeService(value) {
  return Object.hasOwn(requests, value) ? value : 'transport';
}

export function createSummary(values) {
  const service = requests[normalizeService(values.prestation)];
  const rows = [
    'Demande à préparer pour CIAM-PIE', `Prestation : ${service.label}`,
    `Nom : ${values.nom || ''}`, `Société : ${values.societe || 'Non précisée'}`,
    `E-mail : ${values.email || 'Non précisé'}`, `Téléphone : ${values.telephone || 'Non précisé'}`,
    '', 'Projet :', values.message || ''
  ];
  service.fields.forEach((label, index) => {
    if (values[`detail-${index}`]?.trim()) rows.push('', `${label} : ${values[`detail-${index}`].trim()}`);
  });
  rows.push('', 'Document préparatoire. Aucune demande envoyée ; faisabilité à étudier avec l’entreprise.');
  return rows.join('\n');
}
