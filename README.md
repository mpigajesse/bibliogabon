# BiblioGabon

Bibliothèque numérique de l'enseignement supérieur gabonais : cours, livres, articles, sujets d'examen et thèses produits par les universités du pays, réunis en un seul catalogue consultable en ligne.

**Démo en ligne : [bibliogabon.eu.cc](https://bibliogabon.eu.cc)**
Le catalogue, les contributeurs et les comptes sont fictifs. Les comptes de démonstration (étudiant, étudiante, enseignant) sont affichés sur la page de connexion. La démo met environ 50 secondes à se réveiller au premier accès.

---

## Ce que l'on peut faire

- **Parcourir le catalogue** par type de document — cours, livres, articles, examens, thèses — ou par domaine, parmi 17 (droit, médecine, informatique, sciences de la Terre, économie, rapports de master…).
- **Rechercher** un document, un auteur ou un sujet depuis la barre de navigation.
- **Lire en ligne** un document dans une liseuse, ou le télécharger — réservé aux étudiants et enseignants connectés.
- **Consulter les enseignants** contributeurs, leurs spécialités et leurs publications.
- **Retrouver ses documents** une fois connecté : favoris, récemment consultés, téléchargements.

## Pile technique

| Couche | Choix |
| --- | --- |
| Application | TanStack Start (React 19, rendu serveur), TanStack Router — routage par fichiers |
| Données | TanStack Query ; catalogue et comptes en modules TypeScript (`src/data/`) |
| Interface | Tailwind CSS 4, composants Radix / shadcn |
| Outillage | Vite, TypeScript, ESLint, Bun |
| Déploiement | Vercel (preset Nitro) |

Au build, `scripts/couvertures.mjs` dresse la liste des couvertures réellement présentes dans `public/` : une carte ne demande jamais une image absente.

## Lancer le projet

```bash
bun install
bun run dev          # serveur de développement
bun run build        # liste des couvertures + build de production
bun run preview
```

## Arborescence

```
src/
├── routes/        une page par fichier (livres, cours, lecture.$id, domaines.$slug…)
├── components/    site (navigation, catalogue), auth, ui
├── data/          documents, domaines, contributeurs, comptes de démonstration
└── lib/           couvertures, contenu des documents, utilitaires
```

## Auteur

Jesse MPIGA-ODOUMBA — [portfolio](https://mpj.indevs.in) · [GitHub](https://github.com/mpigajesse)
