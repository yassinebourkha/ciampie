# État de la première base du site

## Réalisé

Dossier indépendant des maquettes ; six pages rendues en HTML statique ; composants et données partagés ; design anthracite/vert repris de Taste ; menu mobile avec fermeture par Échap et indication de la page active ; liens d'appel et d'itinéraire ; prestation présélectionnée depuis les pages de service ; renseignements complémentaires adaptés ; validation d'un moyen de réponse ; récapitulatif et téléchargement local.

Images optimisées en variantes WebP 640/1280, attributs de dimensions, srcset, chargement différé sauf image principale. Les photos maîtres restent dans source-images. Polices locales, pas de suivi, pas de bibliothèques de production, pas d'appels réseau pour le formulaire. Titres, descriptions, langue et métadonnées propres aux pages ; robots et noindex pour éviter de présenter un brouillon comme un site public.

Build, contrôle des liens et tests Node sans dépendances. Serveur de développement limité à 127.0.0.1 et au dossier dist, réponses GET/HEAD, contrôle de chemins et en-têtes de sécurité. La reconstruction relance un processus pour recharger aussi les templates et données, pas seulement CSS/JS.

## Vérifié

Six tests Node réussis, contrôles des liens et images des six pages, syntaxe JavaScript et lint Taste sur dist : 0 FAIL, 0 WARN. Vérification navigateur des six pages à 1440, 768, 390 et 320 px ; titres sur deux lignes maximum et aucun débordement horizontal constaté après correction des petits écrans. Menu mobile testé et label de prestation exact corrigé.

Parcours Levage → devis avec présélection ; sélection interactive depuis l'accueil ; formulaire sans moyen de réponse refusé ; formulaire avec téléphone seul accepté ; détails de stockage repris dans le récapitulatif ; téléchargement réel de ciam-pie-demande-stockage.txt puis rangement du fichier de test dans previews. Rien n'a été envoyé à l'entreprise. Vérification HTTP : 200 sur l'accueil et le devis, 404 sur une route absente, 405 sur POST.

Les mesures et captures sont dans previews. Les étapes pré-correction sont gardées dans mesures-navigateur.json afin de ne pas masquer les constats initiaux. Les éléments cachés du récapitulatif avant soumission ne sont pas comptés comme des titres visibles.

## Limites de cette étape

Ce n'est pas encore un site prêt à publier. Offre, moyens, coordonnées et zones à faire confirmer ; photos IA à remplacer ; réalisations à documenter ; mentions légales et confidentialité à finaliser ; destinataire et véritable envoi à définir. Pas de CRM, de pièces jointes, de CMS, de tarifs ou de réservation ajoutés sans cadrage.

L'e-mail configurable ouvre une messagerie et n'est pas un backend. Il est désactivé. Le serveur fourni sert à développer, pas à héberger le site en production. Il faudra appliquer les réglages d'hébergement choisis et valider les traitements avant publication. Aucun domaine touché, aucun service externe créé, aucune publication.

L'inspecteur autonome inspect.mjs n'est pas utilisé car le navigateur est contrôlé via l'interface autorisée. Les captures sont des vues par écran ; pas de certification de conformité ou de mesure exhaustive des performances. Réduction de mouvement et fallback sans JS implémentés, non testés par émulation dans le navigateur.

## Critique des captures

ROUND 1
Seen in one second: transport et logistique, camions verts, devis ; quelques titres dépassent deux lignes à 320 px.
Idea (one sentence): les prestations de CIAM-PIE autour de Vitrolles deviennent un tableau de préparation d'opération.
Live thing: choix de prestation et préparation d'un récapitulatif téléchargeable.
Layout words by section: hero=photo board / services=statement and rows / préparation=interactive split / implantation=mosaic / contact=callout / devis=form.
Scores: design 7.5 · usability 7 · creativity 6.5 · content 7 → overall 6.5
Caps applied: dépassement de deux lignes à 320 px ; note arithmétique avant plafond 7.1.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Accueil étroit : élargir le texte avec des marges internes de 20 px et adapter les tailles à 320 px.
2. Stockage mobile : « Du stockage aux mouvements » déborde ; raccourcir en « Stockage et mouvements ».
3. Formulaire : le libellé de prestation contient les options pour certains outils d'accessibilité ; séparer le label du select, puis vérifier sa sélection exacte.

ROUND 2
Seen in one second: transport et logistique ; vert d'action et anthracite ; navigation vers les prestations.
Idea (one sentence): les prestations de CIAM-PIE autour de Vitrolles deviennent un tableau de préparation d'opération.
Live thing: sélection, présélection et téléchargement vérifiés ; pas de confirmation fictive.
Layout words by section: hero=photo board / services=statement and rows / préparation=interactive split / implantation=mosaic / contact=callout / devis=form.
Scores: design 7.5 · usability 8 · creativity 6.5 · content 7 → overall 7.4
Caps applied: concept encore transposable ; auto-évaluation de l'accueil et des pages commerciales, pas une note de jury. La page devis privilégie la saisie, sans galerie de quatre images : elle ne respecte pas le plancher d'images des pages marketing Taste et ne reçoit pas ce score visuel.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. accueil-ordinateur.jpg : photos IA et preuves métier insuffisantes ; remplacer et compléter avec le propriétaire.
2. stockage-ordinateur.jpg : capacités et conditions réelles inconnues ; ne pas inventer de chiffres, les collecter avant publication.
3. devis-ordinateur.jpg : l'envoi commercial n'est pas raccordé ; valider le destinataire et construire cette étape avant lancement.

Direction conservée : The well-kept board, seed 807684877. Aucun nouveau tirage ; adoption de l'identité validée et de composants partagés. Quatre illustrations IA héritées des maquettes, dont trois camions verts. Aucun stock photo, aucune vidéo ni crédit inventé ; logo original et Jost OFL conservés.
