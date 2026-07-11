/**
 * Authentification simulée côté client (localStorage).
 * Aucune sécurité réelle — démonstration frontend uniquement.
 */
import { COMPTES, verifierIdentifiants, type Compte } from "@/data/comptes";

const CLE_SESSION = "bibliogabon.session";

/** Récupère le compte connecté depuis le localStorage, ou null. */
export function getCompteCourant(): Compte | null {
  if (typeof window === "undefined") return null;
  try {
    const id = window.localStorage.getItem(CLE_SESSION);
    if (!id) return null;
    return COMPTES.find((c) => c.id === id) ?? null;
  } catch {
    return null;
  }
}

/** Tente une connexion. Renvoie le compte si les identifiants sont valides. */
export function connecter(email: string, motDePasse: string): Compte | null {
  const compte = verifierIdentifiants(email, motDePasse);
  if (compte && typeof window !== "undefined") {
    window.localStorage.setItem(CLE_SESSION, compte.id);
  }
  return compte;
}

/** Déconnecte le compte courant. */
export function deconnecter(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CLE_SESSION);
  }
}
