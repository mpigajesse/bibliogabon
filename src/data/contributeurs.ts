export interface Contributeur {
  id: string;
  nom: string;
  titre: string;
  specialite: string;
  universite: string;
  bio: string;
  docs: number;
  telechargements: number;
  vues: number;
  types: string[];
  initiales: string;
}

export const CONTRIBUTEURS: Contributeur[] = [
  {
    id: "loemba-sylvere",
    nom: "Sylvère Yannick LOEMBA MOUANDZA",
    titre: "Maître-assistant",
    specialite: "Physique nucléaire",
    universite: "Université des Sciences et Techniques de Masuku",
    bio: "Enseignant-chercheur en physique nucléaire, spécialisé en radioprotection et instrumentation. Coordonne le laboratoire de mesures ionisantes de l'USTM.",
    docs: 11, telechargements: 42, vues: 17, types: ["Article", "Cours"], initiales: "SL",
  },
  {
    id: "nso-fils",
    nom: "FILS Emmanuel Le Roi NSO",
    titre: "Maître-assistant",
    specialite: "Économie & outils statistiques",
    universite: "Université Omar Bongo",
    bio: "Économiste appliqué, ses travaux portent sur l'évaluation des politiques publiques et l'économie du développement en zone CEMAC.",
    docs: 5, telechargements: 18, vues: 2, types: ["Article", "Cours"], initiales: "FN",
  },
  {
    id: "essone-ulrich",
    nom: "Ulrich ESSONE AUBAME",
    titre: "Ingénieur",
    specialite: "Systèmes, réseaux & développement web",
    universite: "INPTIC",
    bio: "Ingénieur en systèmes d'information, il enseigne les fondamentaux du web moderne, la cybersécurité et l'administration Linux.",
    docs: 3, telechargements: 12, vues: 8, types: ["Cours"], initiales: "UE",
  },
  {
    id: "ossene-raoul",
    nom: "OSSENE NDONG L. Raoul",
    titre: "Ingénieur",
    specialite: "Réseaux & systèmes",
    universite: "INPTIC",
    bio: "Architecte réseau et enseignant à l'INPTIC, il forme les futurs administrateurs d'infrastructures critiques gabonaises.",
    docs: 4, telechargements: 22, vues: 11, types: ["Cours", "Article"], initiales: "OR",
  },
  {
    id: "sevidzem-silas",
    nom: "SEVIDZEM Silas Lendzele",
    titre: "Docteur",
    specialite: "Santé publique vétérinaire",
    universite: "Université de Libreville",
    bio: "Chercheur en épidémiologie vétérinaire, expert des zoonoses tropicales et de la santé unique (One Health) en Afrique centrale.",
    docs: 6, telechargements: 27, vues: 14, types: ["Thèse", "Article"], initiales: "SS",
  },
  {
    id: "patrimoine-africain",
    nom: "Fonds patrimonial africain",
    titre: "Collection ouverte",
    specialite: "Littérature & patrimoine du domaine public",
    universite: "BiblioGabon — Fonds patrimonial",
    bio: "Sélection d'œuvres africaines et afro-descendantes du domaine public, numérisées et librement téléchargeables : récits fondateurs, essais panafricains et grands classiques littéraires. Sources : Project Gutenberg, African Storybook, AJOL.",
    docs: 9, telechargements: 0, vues: 2508, types: ["Livre", "Article"], initiales: "FP",
  },
];

export const contributeurById = (id: string) => CONTRIBUTEURS.find((c) => c.id === id);
