/**
 * Comptes simulés (données mockées) pour la démonstration du site.
 * Mots de passe factices en clair : usage démo uniquement, jamais en production.
 */
export type RoleCompte = "etudiant" | "enseignant";

export interface Compte {
  id: string;
  nom: string;
  email: string;
  motDePasse: string;
  role: RoleCompte;
  universite: string;
  filiere?: string;
  initiales: string;
  /** IDs de documents (voir data/documents.ts). */
  favoris: string[];
  historique: string[];
  telechargements: string[];
}

export const COMPTES: Compte[] = [
  {
    id: "user-neville",
    nom: "Neville MBADINGA",
    email: "etudiant@bibliogabon.ga",
    motDePasse: "demo1234",
    role: "etudiant",
    universite: "Université Omar Bongo (UOB)",
    filiere: "Master 2 — Communication",
    initiales: "NM",
    favoris: ["doc-006", "doc-103", "doc-009"],
    historique: ["doc-101", "doc-004", "doc-020", "doc-102"],
    telechargements: ["doc-101", "doc-103"],
  },
  {
    id: "user-aline",
    nom: "Aline NZE OYONO",
    email: "etudiante@bibliogabon.ga",
    motDePasse: "demo1234",
    role: "etudiant",
    universite: "Université des Sciences et Techniques de Masuku (USTM)",
    filiere: "Licence 3 — Informatique",
    initiales: "AN",
    favoris: ["doc-001", "doc-018", "doc-021"],
    historique: ["doc-001", "doc-020", "doc-018", "doc-013"],
    telechargements: ["doc-107"],
  },
  {
    id: "user-loemba",
    nom: "Sylvère Yannick LOEMBA MOUANDZA",
    email: "enseignant@bibliogabon.ga",
    motDePasse: "demo1234",
    role: "enseignant",
    universite: "Université des Sciences et Techniques de Masuku (USTM)",
    filiere: "Physique nucléaire",
    initiales: "SL",
    favoris: ["doc-010", "doc-008", "doc-030"],
    historique: ["doc-002", "doc-003", "doc-015"],
    telechargements: ["doc-102", "doc-103"],
  },
];

export const compteByEmail = (email: string) =>
  COMPTES.find((c) => c.email.toLowerCase() === email.trim().toLowerCase());

/** Vérifie un couple email / mot de passe. Renvoie le compte si valide. */
export const verifierIdentifiants = (email: string, motDePasse: string): Compte | null => {
  const compte = compteByEmail(email);
  if (compte && compte.motDePasse === motDePasse) return compte;
  return null;
};
