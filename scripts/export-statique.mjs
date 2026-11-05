// Export statique de BiblioGabon pour un hébergement sans serveur.
//
// Le catalogue est entièrement dans src/data/ : aucune page n'a besoin d'un
// serveur au moment de la visite. Publié en site statique sur Render, le site
// ne s'endort jamais et ne consomme aucune des 750 h gratuites de l'espace
// (un service Node gratuit s'endort après 15 min et met ~50 s à se réveiller).
//
// Le prérendu intégré de TanStack Start ne s'accorde pas avec la configuration
// Lovable (serveur d'aperçu attendu dans dist/, sortie Nitro dans .output/).
// Ce script fait la même chose à la main : il lance le serveur construit par
// `bun run build` (preset node-server), parcourt les liens internes depuis
// l'accueil et écrit chaque page dans .output/public/<chemin>/index.html.
//
// Usage : NITRO_PRESET=node-server bun run build && node scripts/export-statique.mjs

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const PORT = 4789;
const BASE = `http://127.0.0.1:${PORT}`;
const SORTIE = ".output/public";
// Pages qu'aucun lien public n'atteint (accessibles après connexion).
const PAGES_SUPPLEMENTAIRES = ["/tableau-de-bord", "/connexion", "/inscription"];
// Fichiers servis par des routes serveur, à figer eux aussi.
const FICHIERS = ["/sitemap.xml"];

const serveur = spawn("node", [".output/server/index.mjs"], {
  env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1", NITRO_HOST: "127.0.0.1" },
  stdio: ["ignore", "inherit", "inherit"],
});

async function attendreServeur() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE + "/");
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Le serveur ne répond pas sur " + BASE);
}

function liensInternes(html) {
  const liens = new Set();
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const chemin = m[1];
    // Fichiers déjà présents dans public/ (images, PDF, assets) : rien à rendre.
    if (/\.[a-z0-9]{2,5}$/i.test(chemin) || chemin.startsWith("/assets/")) continue;
    liens.add(chemin.replace(/\/+$/, "") || "/");
  }
  return liens;
}

async function exporter() {
  await attendreServeur();
  const aVisiter = ["/", ...PAGES_SUPPLEMENTAIRES];
  const vus = new Set(aVisiter);
  const echecs = [];

  while (aVisiter.length) {
    const chemin = aVisiter.shift();
    const r = await fetch(BASE + chemin);
    if (!r.ok) {
      echecs.push(`${r.status} ${chemin}`);
      continue;
    }
    const html = await r.text();
    const fichier = chemin === "/" ? join(SORTIE, "index.html") : join(SORTIE, chemin, "index.html");
    await mkdir(dirname(fichier), { recursive: true });
    await writeFile(fichier, html);
    for (const lien of liensInternes(html)) {
      if (!vus.has(lien)) {
        vus.add(lien);
        aVisiter.push(lien);
      }
    }
  }

  for (const chemin of FICHIERS) {
    const r = await fetch(BASE + chemin);
    if (r.ok) await writeFile(join(SORTIE, chemin), await r.text());
  }

  // Page 404 : le rendu d'une adresse inconnue, servi par Render en repli.
  const r404 = await fetch(BASE + "/page-introuvable-export");
  await writeFile(join(SORTIE, "404.html"), await r404.text());

  console.log(`Export statique : ${vus.size - echecs.length} pages écrites dans ${SORTIE}`);
  if (echecs.length) {
    console.error("Pages en échec :\n" + echecs.join("\n"));
    process.exitCode = 1;
  }
}

exporter()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => serveur.kill());
