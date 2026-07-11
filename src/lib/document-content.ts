/**
 * Génère un contenu de lecture simulé pour un document (données mockées).
 * Sert à la fois pour la page lecteur et pour le fichier téléchargeable.
 */
import type { Document } from "@/data/documents";
import { domaineBySlug } from "@/data/domaines";

export interface Section {
  titre: string;
  paragraphes: string[];
}

export function slugifier(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

const TYPE_INTRO: Record<Document["type"], string> = {
  cours: "support de cours",
  article: "article scientifique",
  livre: "ouvrage",
  examen: "sujet d'examen",
  these: "thèse de doctorat",
  "td-tp": "travaux dirigés",
};

export function genererSections(doc: Document): Section[] {
  const dom = domaineBySlug(doc.domaineSlug)?.nom ?? "sciences";
  const nature = TYPE_INTRO[doc.type];
  const sections: Section[] = [
    {
      titre: "Présentation",
      paragraphes: [
        `Ce ${nature}, « ${doc.titre} », a été élaboré par ${doc.auteur} dans le cadre des enseignements de ${dom} au sein des universités de la République Gabonaise. Il s'adresse aux étudiants de niveau ${doc.niveau ?? "universitaire"} ainsi qu'aux enseignants-chercheurs souhaitant approfondir le sujet.`,
        doc.resume,
      ],
    },
    {
      titre: "Introduction",
      paragraphes: [
        `L'étude de ${dom.toLowerCase()} occupe une place centrale dans la formation académique au Gabon. Ce document propose une approche structurée, articulant les fondements théoriques et leurs applications concrètes, en tenant compte du contexte local et des enjeux du continent africain.`,
        `Après avoir posé le cadre conceptuel, nous examinerons les principales notions, avant d'en illustrer la portée à travers des exemples et des mises en situation adaptés aux réalités gabonaises.`,
      ],
    },
    {
      titre: "Développement",
      paragraphes: [
        `Les concepts abordés dans « ${doc.titre} » reposent sur un socle méthodologique rigoureux. Chaque notion est introduite progressivement, définie avec précision, puis reliée aux savoirs connexes du domaine de ${dom.toLowerCase()}.`,
        `Une attention particulière est portée à la démarche critique : il ne s'agit pas seulement de mémoriser, mais de comprendre les mécanismes sous-jacents et de développer une capacité d'analyse autonome, indispensable à la recherche et à la pratique professionnelle.`,
        `Des références aux travaux d'enseignants-chercheurs gabonais et africains viennent enrichir la réflexion et valoriser la production scientifique locale.`,
      ],
    },
    {
      titre: "Conclusion",
      paragraphes: [
        `Ce document constitue une ressource pédagogique de référence pour la communauté universitaire gabonaise. Il illustre l'ambition de BiblioGabon : centraliser, archiver et valoriser une documentation académique de qualité, accessible à tous.`,
        `Le lecteur est invité à poursuivre son exploration à travers les autres ressources du même domaine disponibles sur la plateforme.`,
      ],
    },
  ];
  return sections;
}

/** Document HTML autonome et imprimable, prêt à être téléchargé. */
export function genererHtml(doc: Document): string {
  const dom = domaineBySlug(doc.domaineSlug)?.nom ?? "";
  const sections = genererSections(doc);
  const corps = sections
    .map(
      (s) =>
        `<h2>${escape(s.titre)}</h2>` + s.paragraphes.map((p) => `<p>${escape(p)}</p>`).join(""),
    )
    .join("");

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(doc.titre)} — BiblioGabon</title>
<style>
  :root { --navy:#062751; --green:#0A6E36; --gold:#EBB10D; }
  * { box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; color:#1a2230; line-height:1.7; max-width:820px; margin:0 auto; padding:56px 32px; }
  .stripe { height:6px; background:linear-gradient(90deg,var(--green) 0 33%,var(--gold) 33% 66%,var(--navy) 66% 100%); border-radius:99px; }
  header { margin:24px 0 40px; }
  .eyebrow { color:var(--green); font-family:Arial,sans-serif; font-size:12px; letter-spacing:.18em; text-transform:uppercase; font-weight:700; }
  h1 { color:var(--navy); font-size:32px; line-height:1.15; margin:8px 0 12px; }
  .meta { color:#5A6B7B; font-family:Arial,sans-serif; font-size:14px; }
  h2 { color:var(--navy); font-size:20px; margin:32px 0 8px; }
  p { margin:0 0 14px; }
  footer { margin-top:48px; padding-top:16px; border-top:1px solid #e2e8f0; color:#5A6B7B; font-family:Arial,sans-serif; font-size:12px; }
  @media print { body { padding:0; } }
</style>
</head>
<body>
  <div class="stripe"></div>
  <header>
    <p class="eyebrow">BiblioGabon · République Gabonaise</p>
    <h1>${escape(doc.titre)}</h1>
    <p class="meta">${escape(doc.auteur)}${dom ? " · " + escape(dom) : ""} · ${doc.annee}${
      doc.niveau ? " · " + escape(doc.niveau) : ""
    }</p>
  </header>
  ${corps}
  <footer>
    Document généré par BiblioGabon — la bibliothèque numérique des universités du Gabon.<br>
    Contenu de démonstration. ${doc.source ? "Source documentaire (à titre informatif) : " + escape(doc.source.nom) + "." : ""}
  </footer>
</body>
</html>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
