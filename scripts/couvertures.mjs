// Génère src/data/couvertures.generated.ts : la liste des images présentes
// dans public/covers. Les cartes ne demandent ainsi que des fichiers qui
// existent — avant, chaque carte essayait .png puis .jpg (document, puis
// domaine) et la page déclenchait des centaines de 404 dans la console.
// Lancé automatiquement par `bun run build` ; relancer après ajout d'images.
import { readdirSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const racine = "public";
const fichiers = [];
const parcourir = (dossier) => {
  for (const nom of readdirSync(join(racine, dossier))) {
    const chemin = join(dossier, nom);
    if (statSync(join(racine, chemin)).isDirectory()) parcourir(chemin);
    else if (/\.(png|jpe?g|webp)$/i.test(nom)) fichiers.push("/" + chemin.split("\\").join("/"));
  }
};
parcourir("covers");
fichiers.sort();
writeFileSync(
  "src/data/couvertures.generated.ts",
  "// Fichier généré par scripts/couvertures.mjs — ne pas modifier à la main.\n" +
    "export const COUVERTURES_PRESENTES: ReadonlySet<string> = new Set([\n" +
    fichiers.map((f) => `  ${JSON.stringify(f)},`).join("\n") +
    "\n]);\n",
);
console.log(`couvertures : ${fichiers.length} image(s) recensée(s)`);
