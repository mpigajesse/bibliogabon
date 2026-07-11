export type DocumentType = "article" | "cours" | "livre" | "examen" | "these" | "td-tp";

export interface Document {
  id: string;
  titre: string;
  type: DocumentType;
  domaineSlug: string;
  annee: number;
  auteurId: string;
  auteur: string;
  vues: number;
  resume: string;
  pages?: number;
}

export const DOCUMENTS: Document[] = [
  { id: "doc-001", titre: "Cybersécurité — Fondamentaux et menaces modernes", type: "cours", domaineSlug: "informatique-numerique", annee: 2026, auteurId: "essone-ulrich", auteur: "Ulrich ESSONE AUBAME", vues: 214, resume: "Panorama des menaces contemporaines, cryptographie appliquée, sécurité des réseaux et hygiène numérique en contexte gabonais.", pages: 148 },
  { id: "doc-002", titre: "Biophysique : Radioprotection et applications médicales", type: "cours", domaineSlug: "medecine-sante", annee: 2025, auteurId: "loemba-sylvere", auteur: "Sylvère Yannick LOEMBA MOUANDZA", vues: 178, resume: "Physique des rayonnements ionisants, dosimétrie clinique et principes de radioprotection en milieu hospitalier.", pages: 210 },
  { id: "doc-003", titre: "Électromagnétisme 2ᵉ année — Ondes et propagation", type: "cours", domaineSlug: "sciences-technologies", annee: 2025, auteurId: "loemba-sylvere", auteur: "Sylvère Yannick LOEMBA MOUANDZA", vues: 132, resume: "Équations de Maxwell, propagation guidée, antennes et applications aux télécommunications tropicales.", pages: 184 },
  { id: "doc-004", titre: "Histoire de la pensée économique", type: "cours", domaineSlug: "sciences-economiques-gestion", annee: 2026, auteurId: "nso-fils", auteur: "FILS Emmanuel Le Roi NSO", vues: 96, resume: "Des mercantilistes aux néo-institutionnels : lectures africaines des grandes doctrines économiques.", pages: 132 },
  { id: "doc-005", titre: "Analyse qualitative des données en sciences sociales", type: "cours", domaineSlug: "sciences-economiques-gestion", annee: 2026, auteurId: "nso-fils", auteur: "FILS Emmanuel Le Roi NSO", vues: 88, resume: "Méthodologie, codage thématique, logiciels d'analyse et éthique de la recherche.", pages: 96 },
  { id: "doc-006", titre: "Efficacité des investissements publics en éducation dans la CEMAC", type: "article", domaineSlug: "revues-articles", annee: 2020, auteurId: "nso-fils", auteur: "FILS Emmanuel Le Roi NSO", vues: 312, resume: "Analyse économétrique de l'impact des dépenses publiques d'éducation sur la croissance en zone CEMAC (2000-2018).", pages: 24 },
  { id: "doc-007", titre: "Ressources naturelles et développement humain en Afrique subsaharienne", type: "article", domaineSlug: "revues-articles", annee: 2020, auteurId: "nso-fils", auteur: "FILS Emmanuel Le Roi NSO", vues: 267, resume: "Malédiction des ressources revisitée : rôle de la gouvernance dans la trajectoire du développement.", pages: 28 },
  { id: "doc-008", titre: "Évaluation du radon et thoron dans l'habitat gabonais", type: "article", domaineSlug: "revues-articles", annee: 2025, auteurId: "loemba-sylvere", auteur: "Sylvère Yannick LOEMBA MOUANDZA", vues: 154, resume: "Mesures in situ des concentrations de radon-222 et thoron-220 dans les habitations de Libreville et Franceville.", pages: 18 },
  { id: "doc-009", titre: "Linking Water Access and Education in the SDGs in Sub-Saharan Africa", type: "article", domaineSlug: "revues-articles", annee: 2020, auteurId: "nso-fils", auteur: "FILS Emmanuel Le Roi NSO", vues: 205, resume: "Approche intégrée ODD 4 & ODD 6 : impact de l'accès à l'eau sur la scolarisation.", pages: 22 },
  { id: "doc-010", titre: "Particules bosoniques : introduction à la physique quantique moderne", type: "article", domaineSlug: "sciences-technologies", annee: 2025, auteurId: "loemba-sylvere", auteur: "Sylvère Yannick LOEMBA MOUANDZA", vues: 141, resume: "Statistique de Bose-Einstein, condensats et applications récentes.", pages: 20 },
  { id: "doc-011", titre: "Administration Linux avancée pour serveurs universitaires", type: "cours", domaineSlug: "informatique-numerique", annee: 2025, auteurId: "ossene-raoul", auteur: "OSSENE NDONG L. Raoul", vues: 189, resume: "Systèmes, sécurité, virtualisation et déploiement d'infrastructures académiques.", pages: 172 },
  { id: "doc-012", titre: "Santé publique vétérinaire et zoonoses en Afrique centrale", type: "these", domaineSlug: "theses-doctorales", annee: 2024, auteurId: "sevidzem-silas", auteur: "SEVIDZEM Silas Lendzele", vues: 98, resume: "Surveillance épidémiologique et prévention des zoonoses émergentes.", pages: 286 },
  { id: "doc-013", titre: "Examen final — Algorithmique & Structures de données", type: "examen", domaineSlug: "informatique-numerique", annee: 2025, auteurId: "essone-ulrich", auteur: "Ulrich ESSONE AUBAME", vues: 402, resume: "Épreuve L2 informatique, session juin 2025 avec corrigé détaillé.", pages: 8 },
  { id: "doc-014", titre: "TD Statistique descriptive et probabilités", type: "td-tp", domaineSlug: "sciences-economiques-gestion", annee: 2025, auteurId: "nso-fils", auteur: "FILS Emmanuel Le Roi NSO", vues: 231, resume: "Série de 12 travaux dirigés avec exercices corrigés.", pages: 46 },
  { id: "doc-015", titre: "Nuclear Engineering and Technology — Applications au Gabon", type: "article", domaineSlug: "revues-articles", annee: 2024, auteurId: "loemba-sylvere", auteur: "Sylvère Yannick LOEMBA MOUANDZA", vues: 87, resume: "Prospective sur les applications civiles du nucléaire en contexte gabonais.", pages: 16 },
  { id: "doc-016", titre: "Droit OHADA des sociétés commerciales — Précis", type: "livre", domaineSlug: "droit-sciences-politiques", annee: 2024, auteurId: "nso-fils", auteur: "FILS Emmanuel Le Roi NSO", vues: 176, resume: "Manuel à jour de la réforme OHADA, cas pratiques et jurisprudence.", pages: 342 },
  { id: "doc-017", titre: "Géologie du bassin sédimentaire côtier gabonais", type: "these", domaineSlug: "theses-doctorales", annee: 2023, auteurId: "loemba-sylvere", auteur: "Sylvère Yannick LOEMBA MOUANDZA", vues: 122, resume: "Stratigraphie et hydrocarbures : synthèse doctorale.", pages: 318 },
  { id: "doc-018", titre: "Introduction au développement web moderne", type: "cours", domaineSlug: "informatique-numerique", annee: 2026, auteurId: "essone-ulrich", auteur: "Ulrich ESSONE AUBAME", vues: 267, resume: "HTML sémantique, CSS moderne, JavaScript et frameworks React.", pages: 156 },
  { id: "doc-019", titre: "Mémoire — Optimisation logistique du Port d'Owendo", type: "livre", domaineSlug: "transport-logistique", annee: 2024, auteurId: "ossene-raoul", auteur: "OSSENE NDONG L. Raoul", vues: 143, resume: "Analyse opérationnelle et propositions d'optimisation du hub portuaire.", pages: 128 },
];

export const documentsByType = (type: DocumentType) => DOCUMENTS.filter((d) => d.type === type);
export const documentsByDomaine = (slug: string) => DOCUMENTS.filter((d) => d.domaineSlug === slug);
export const documentById = (id: string) => DOCUMENTS.find((d) => d.id === id);
