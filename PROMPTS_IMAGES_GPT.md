# 🎨 Prompts d'images — BiblioGabon (GPT Image 2)

> Ce document contient tous les prompts pour générer les visuels du site avec **GPT Image 2** (génération d'images de ChatGPT).
> Chaque image doit être **sauvegardée au chemin exact indiqué** dans le projet. Le code détecte automatiquement l'image : si le fichier existe, il s'affiche ; sinon un visuel de repli s'affiche (aucune image cassée).

---

## 🧭 Mode d'emploi

1. Ouvre ChatGPT (GPT Image 2 / génération d'images).
2. Pour **chaque image**, colle d'abord le **STYLE DE BASE** ci-dessous, puis le **prompt spécifique**.
3. Choisis le **format** indiqué (Paysage `1536×1024` ou Carré `1024×1024`).
4. Télécharge l'image, **renomme-la exactement** comme indiqué, et place-la dans le dossier précisé.
5. Rafraîchis le site (Ctrl+F5) : l'image apparaît automatiquement.

**Dossiers du projet (déjà créés) :**
```
public/heroes/            → images de hero (en-tête de chaque page)
public/covers/domaines/   → couvertures par domaine académique (17)
public/covers/site/       → images diverses (partage social, auth…)
```

> ✅ **Formats acceptés : `.png` (sortie par défaut de GPT Image) ou `.jpg`** — le code essaie les deux.
> ⚠️ **Attention à 3 erreurs fréquentes :**
> 1. **Pas de double extension** : le fichier doit s'appeler `agriculture-environnement.png`, PAS `agriculture-environnement.jpg.png`.
> 2. **Le bon dossier** : les `hero-*` vont dans `public/heroes/` ; les couvertures de domaine (nommées par slug) vont dans `public/covers/domaines/`.
> 3. **Le nom exact** : respecte scrupuleusement le nom de fichier indiqué (le hero de la page Livres = `hero-livres`, la couverture Informatique = `informatique-numerique`, etc.).

---

## 🎯 STYLE DE BASE (à préfixer à CHAQUE prompt)

```
Style : photographie éditoriale premium et institutionnelle, lumière naturelle chaude d'Afrique équatoriale, ambiance moderne, digne et inspirante, qualité magazine. Sujet : l'enseignement supérieur et le savoir au GABON (Afrique centrale). Représente des personnes africaines/gabonaises (étudiants, enseignants-chercheurs) avec authenticité et dignité. Palette dominante harmonisée avec l'identité nationale gabonaise : bleu marine profond (#062751), vert forêt (#0A6E36) et or doux (#EBB10D), sur fonds clairs et neutres. Références visuelles subtiles au Gabon : forêt équatoriale luxuriante, fleuve Ogooué, architecture universitaire moderne de Libreville, lumière tropicale. Composition épurée avec de l'espace négatif pour superposer du texte. AUCUN texte, AUCun logo, AUCUNE typographie dans l'image. Rendu net, professionnel, non-cliché, pas de banque d'images générique.
```

> 💡 Astuce : garde ce bloc identique pour toutes les images afin d'obtenir une **série cohérente**.

---

## 1) 🖼️ Images de HERO (en-tête des pages)

**Format : Paysage `1536×1024`.** Prévoir de l'espace vide à gauche (le titre s'affiche à côté).
**Dossier : `public/heroes/`**

### `hero-accueil.jpg` *(optionnel — page d'accueil)*
```
Grande composition d'ouverture : une étudiante gabonaise souriante tenant des livres devant un campus universitaire moderne à Libreville, en arrière-plan flou la canopée de la forêt équatoriale et une silhouette de la carte du Gabon suggérée par la lumière. Atmosphère d'espoir et d'excellence académique. Profondeur de champ, lumière dorée du matin.
```

### `hero-livres.jpg`
```
Une bibliothèque universitaire moderne au Gabon : rayonnages élégants remplis de livres et manuels, un étudiant africain feuilletant un ouvrage près d'une grande fenêtre donnant sur la végétation tropicale. Chaleur du bois, calme studieux, lumière naturelle.
```

### `hero-articles.jpg`
```
Un chercheur gabonais en blouse consultant des articles scientifiques et des données sur un écran, dans un laboratoire universitaire lumineux. Éprouvettes et documents de recherche flous en avant-plan. Ambiance rigueur et innovation scientifique africaine.
```

### `hero-cours.jpg`
```
Un amphithéâtre universitaire moderne au Gabon pendant un cours : un enseignant africain devant un tableau, des étudiants attentifs prenant des notes. Lumière naturelle, énergie pédagogique, diversité des visages africains.
```

### `hero-examens.jpg`
```
Une salle d'examen universitaire au Gabon vue en plongée douce : rangées de pupitres, étudiants concentrés rédigeant, copies et stylos. Ambiance sérieuse et solennelle, lumière claire, sentiment d'effort et de mérite.
```

### `hero-theses.jpg`
```
Une soutenance de thèse dans une université gabonaise : un jeune docteur africain présentant devant un jury, robe académique, salle solennelle avec de grandes fenêtres. Moment de consécration intellectuelle, dignité et fierté.
```

### `hero-domaines.jpg`
```
Composition conceptuelle représentant la diversité des disciplines académiques au Gabon : mosaïque élégante d'objets symboliques (livre, molécule, engrenage, feuille tropicale, balance de la justice, circuit électronique) disposés harmonieusement sur un fond clair aux teintes bleu-vert-or. Illustration éditoriale raffinée, non chargée.
```

### `hero-enseignants.jpg`
```
Portrait de groupe chaleureux d'enseignants-chercheurs gabonais (hommes et femmes, différentes disciplines) dans le hall d'une université moderne de Libreville. Attitude bienveillante et professionnelle, transmission du savoir. Lumière douce, cadrage éditorial.
```

### `hero-vision.jpg`
```
Image inspirante et symbolique : une jeune génération d'étudiants gabonais regardant vers l'horizon depuis un campus surplombant la forêt équatoriale et la ville de Libreville au lever du soleil. Sentiment d'ambition nationale, de souveraineté du savoir et d'avenir. Lumière dorée épique mais sobre.
```

### `hero-apropos.jpg`
```
Vue architecturale élégante d'un bâtiment universitaire emblématique au Gabon, mêlant modernité et éléments culturels d'Afrique centrale, entouré de verdure tropicale. Ciel clair, composition institutionnelle et rassurante. Aucune personne au premier plan.
```

### `hero-contact.jpg`
```
Espace d'accueil lumineux et moderne d'une institution académique gabonaise : bureau épuré, plantes tropicales, lumière naturelle, ambiance accueillante et professionnelle. Beaucoup d'espace négatif clair pour poser un formulaire.
```

### `hero-legal.jpg`
```
Image sobre et institutionnelle : détail graphique abstrait aux couleurs bleu marine, vert et or, évoquant l'ordre, la confiance et la protection des données — motifs géométriques fins inspirés d'un filigrane officiel, sur fond clair. Aucun texte, très minimaliste.
```

---

## 2) 📚 COUVERTURES par DOMAINE (17 images)

**Format : Paysage `1536×1024`** (recadré en 4:3 à l'affichage).
**Dossier : `public/covers/domaines/`** — le nom du fichier doit correspondre **exactement** au slug.
Le titre du document se superpose en bas ; prévois donc une zone plus sombre ou calme en bas.

| Fichier | Prompt spécifique (après le STYLE DE BASE) |
|---------|--------------------------------------------|
| `agriculture-environnement.jpg` | Agronome gabonais examinant des cultures dans une plantation, forêt équatoriale et biodiversité en arrière-plan ; développement durable. |
| `architecture-urbanisme.jpg` | Maquette et plans d'architecture avec, en fond, un bâtiment moderne de Libreville mêlant béton et végétation tropicale. |
| `communication-medias.jpg` | Studio de média / radio universitaire au Gabon, micro et écrans, jeune journaliste africain en action. |
| `droit-sciences-politiques.jpg` | Bibliothèque juridique, marteau et balance de la justice, ambiance solennelle aux teintes bleu marine et or. |
| `informatique-numerique.jpg` | Étudiants gabonais programmant sur ordinateurs dans un laboratoire informatique moderne, code et réseaux en surimpression discrète. |
| `lettres-langues-shs.jpg` | Livres anciens et manuscrits africains, plume et papier, ambiance littéraire chaleureuse et intellectuelle. |
| `medecine-sante.jpg` | Étudiants en médecine gabonais en blouse dans un laboratoire clinique lumineux, stéthoscope et microscope. |
| `rapports-licences.jpg` | Étudiant en licence présentant un rapport de stage, dossiers et graphiques, ambiance de campus dynamique. |
| `rapports-masters.jpg` | Étudiante en master soutenant un mémoire, slides et documents professionnels, ton plus mûr et exigeant. |
| `revues-articles.jpg` | Empilement élégant de revues scientifiques et données de recherche, ambiance académique rigoureuse. |
| `sciences-technologies.jpg` | Laboratoire de physique/chimie moderne au Gabon, instruments scientifiques, formules discrètes, lumière bleutée. |
| `sciences-ingenieur.jpg` | Atelier d'ingénierie : engrenages, robotique, plans techniques, un ingénieur africain au travail. |
| `sciences-terre.jpg` | Géologue gabonais examinant des roches et carottes minérales, paysage de collines et fleuve Ogooué en fond. |
| `sciences-economiques-gestion.jpg` | Graphiques économiques et tableau de bord financier, jeune économiste africain analysant des données, ambiance bleu-or. |
| `theses-doctorales.jpg` | Robe et toque de docteur posées sur une pile de thèses reliées, ambiance solennelle et prestigieuse. |
| `tourisme-hotellerie.jpg` | Écotourisme au Gabon : parc national, faune (gorilles/éléphants de forêt au loin), hôtellerie élégante et nature. |
| `transport-logistique.jpg` | Port d'Owendo / logistique portuaire au Gabon : conteneurs, grues, navire, chaîne d'approvisionnement moderne. |

---

## 3) 🌐 Autres images du site (optionnelles)

**Dossier : `public/covers/site/`**

### `og-image.jpg` — image de partage social *(Format `1536×1024`)*
```
Bannière institutionnelle de BiblioGabon : composition élégante évoquant une bibliothèque numérique nationale gabonaise — livres, savoir, forêt équatoriale stylisée, aux couleurs bleu marine, vert et or. Grand espace négatif au centre pour un logo et un titre. Épuré, premium.
```
*(Pour l'utiliser : ajouter la balise `og:image` dans `src/routes/__root.tsx` — je peux le faire sur demande.)*

### `auth-side.jpg` — panneau latéral des pages connexion/inscription *(Format Portrait `1024×1536`)*
```
Composition verticale immersive : un(e) étudiant(e) gabonais(e) épanoui(e) dans une bibliothèque moderne baignée de lumière, vue latérale, beaucoup de profondeur. Teintes bleu marine dominantes pour laisser lire du texte blanc par-dessus. Inspirant, chaleureux.
```

### `motif-pixel.jpg` — texture de fond décorative *(Format `1024×1024`)*
```
Motif abstrait subtil et répétable évoquant des pixels et la carte du Gabon, en dégradés très légers de bleu marine, vert et or sur fond blanc cassé. Très discret, destiné à être un arrière-plan de section. Minimaliste.
```

---

## 4) ✅ Récapitulatif des fichiers à générer

**Heros (`public/heroes/`)** — 1536×1024 :
`hero-accueil.jpg` (opt.) · `hero-livres.jpg` · `hero-articles.jpg` · `hero-cours.jpg` · `hero-examens.jpg` · `hero-theses.jpg` · `hero-domaines.jpg` · `hero-enseignants.jpg` · `hero-vision.jpg` · `hero-apropos.jpg` · `hero-contact.jpg` · `hero-legal.jpg`

**Covers domaines (`public/covers/domaines/`)** — 1536×1024 — 17 fichiers nommés par slug (voir tableau).

**Divers (`public/covers/site/`)** : `og-image.jpg` · `auth-side.jpg` · `motif-pixel.jpg`

---

## 📌 Notes importantes

- **Cohérence** : génère toutes les images dans la même session en gardant le STYLE DE BASE → série homogène.
- **Pas de texte dans les images** : le site ajoute lui-même les titres par-dessus.
- **Poids** : privilégie des JPG < 300 Ko (compresse si besoin sur squoosh.app) pour la performance.
- **Repli automatique** : tant qu'une image n'est pas fournie, un visuel généré (dégradé + icône + titre) s'affiche — le site reste toujours propre.
- **Couvertures de livres du patrimoine** : les 7 livres du domaine public ont déjà leurs vraies couvertures ; inutile d'en générer.

*Charte issue du logo BiblioGabon — bleu marine #062751 · vert #0A6E36 · or #EBB10D.*
