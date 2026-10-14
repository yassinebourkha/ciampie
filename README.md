# CIAM-PIE — base du site web

Première version du code, créée dans un dossier indépendant des maquettes. HTML/CSS/JavaScript et générateur statique Node, sans dépendances de production ni abonnement. Design Taste anthracite/vert, logo et photos IA validés dans les maquettes.

## Lancer

Node.js 20 ou plus récent est nécessaire. Depuis ce dossier :

```text
npm run dev
```

Ouvrir `http://127.0.0.1:4173/`. Les modifications de src/ et public/ reconstruisent le site ; recharger le navigateur. Arrêter le serveur avec Ctrl+C. Aucune installation npm n'est nécessaire pour démarrer les sources livrées.

```text
npm run build
npm run check
npm test
```

Le build génère dist/, le dossier à héberger ultérieurement. Ne pas modifier directement dist/ : les changements seront écrasés au prochain build. Le serveur local ne reçoit aucune demande commerciale et ne sert que dist/.

## Organisation

- `src/data/site.mjs` : identité, coordonnées, titres, descriptions et configuration de publication.
- `src/data/requests.mjs` : prestations, champs et préparation du récapitulatif.
- `src/views.mjs` : textes et sections des six pages.
- `src/components.mjs` : en-tête, pied de page, images, boutons, formulaire et métadonnées communs.
- `src/styles/site.css` : design et responsive.
- `src/scripts/app.js` : menu, choix de prestation, formulaire et animations.
- `public/assets/` : polices locales, logo et photos WebP optimisées.
- `source-images/` : originaux IA, non servis par le site.
- `scripts/` : build, serveur local et contrôles.
- `tests/` : tests automatisés Node.
- `docs/` et `previews/` : conception, limites et captures de vérification.

## Pages

Accueil, transport routier, levage/manutention, stockage/logistique, entreprise, demande de devis. Navigation avec URLs descriptives et présélection du service sur la page devis. Les contenus et coordonnées restent à confirmer avec le propriétaire.

Le formulaire valide les renseignements, prépare un récapitulatif et permet de le télécharger. Aucun envoi, aucune confirmation de réception fictive, aucun stockage automatique sur serveur ni suivi publicitaire. Le fichier téléchargé est conservé sur l'appareil du visiteur à son initiative. Le destinataire est vide dans la configuration. Une fois confirmé, `quoteEmail` peut permettre d'ouvrir la messagerie du visiteur ; ce n'est pas un backend d'envoi. Le branchement réel sera une étape distincte.

## Avant une mise en ligne

Valider prestations, zones, coordonnées, textes et entité éditrice ; fournir des photos autorisées ; compléter mentions légales et confidentialité ; configurer et tester l'envoi ; choisir domaine et hébergement. L'indexation est désactivée et aucun domaine n'est inventé. Pas de réalisations fictives : la rubrique attend des cas et photos autorisés. Les pages légales ne sont pas simulées.

Les photos de camions verts et de stockage sont illustratives. Jost est distribué sous licence SIL OFL, jointe. Le logo original n'a pas été redessiné. Pour remplacer les photos, modifier source-images puis utiliser le script d'optimisation facultatif avec sharp disponible (`SHARP_MODULE` peut pointer vers un module local) ; le site livré fonctionne sans ce module.
