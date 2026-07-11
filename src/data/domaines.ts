export interface Domaine {
  slug: string;
  nom: string;
  couleur: "navy" | "green" | "gold";
  description: string;
  documents: number;
}

export const DOMAINES: Domaine[] = [
  { slug: "agriculture-environnement", nom: "Agriculture & Environnement", couleur: "green", description: "Agronomie, forêt tropicale, biodiversité et gestion durable.", documents: 18 },
  { slug: "architecture-urbanisme", nom: "Architecture & Urbanisme", couleur: "navy", description: "Théorie de l'architecture, urbanisme tropical, patrimoine.", documents: 9 },
  { slug: "communication-medias", nom: "Communication et Médias", couleur: "gold", description: "Journalisme, médias numériques, communication institutionnelle.", documents: 12 },
  { slug: "droit-sciences-politiques", nom: "Droit & Sciences Politiques", couleur: "navy", description: "Droit OHADA, droit constitutionnel, sciences politiques.", documents: 22 },
  { slug: "informatique-numerique", nom: "Informatique & Numérique", couleur: "navy", description: "Développement, cybersécurité, réseaux, IA.", documents: 27 },
  { slug: "lettres-langues-shs", nom: "Lettres, Langues & Sciences Humaines", couleur: "gold", description: "Littérature, linguistique, sociologie, histoire.", documents: 15 },
  { slug: "medecine-sante", nom: "Médecine & Santé", couleur: "green", description: "Médecine tropicale, santé publique, biomédical.", documents: 20 },
  { slug: "rapports-licences", nom: "Rapports de licence", couleur: "navy", description: "Rapports de stage et projets de licence.", documents: 41 },
  { slug: "rapports-masters", nom: "Rapports de master", couleur: "navy", description: "Mémoires et rapports de fin d'études master.", documents: 33 },
  { slug: "revues-articles", nom: "Revues scientifiques & Articles", couleur: "gold", description: "Articles à comité de lecture et revues indexées.", documents: 46 },
  { slug: "sciences-technologies", nom: "Sciences & Technologies", couleur: "navy", description: "Physique, chimie, mathématiques appliquées.", documents: 29 },
  { slug: "sciences-ingenieur", nom: "Sciences de l'Ingénieur", couleur: "green", description: "Mécanique, électrique, génie civil, industriel.", documents: 24 },
  { slug: "sciences-terre", nom: "Sciences de la Terre", couleur: "green", description: "Géologie, mines, pétrole, hydrogéologie.", documents: 17 },
  { slug: "sciences-economiques-gestion", nom: "Sciences Économiques & Gestion", couleur: "gold", description: "Économie, finance, management, comptabilité.", documents: 31 },
  { slug: "theses-doctorales", nom: "Thèses doctorales", couleur: "navy", description: "Thèses soutenues dans les universités gabonaises.", documents: 14 },
  { slug: "tourisme-hotellerie", nom: "Tourisme, Hôtellerie, Restauration", couleur: "gold", description: "Filières hôtelières, tourisme culturel et écotourisme.", documents: 8 },
  { slug: "transport-logistique", nom: "Transport, Logistique, Commerce", couleur: "green", description: "Supply chain, logistique portuaire, commerce international.", documents: 11 },
];

export const domaineBySlug = (slug: string) => DOMAINES.find((d) => d.slug === slug);
