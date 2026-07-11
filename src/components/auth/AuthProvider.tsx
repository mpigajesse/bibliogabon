import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { COMPTES, verifierIdentifiants, type Compte } from "@/data/comptes";

const CLE_SESSION = "bibliogabon.session";

interface AuthContexte {
  /** Compte connecté, ou null. */
  compte: Compte | null;
  /** Passe à true une fois le localStorage lu (évite le flash « non connecté »). */
  initialise: boolean;
  /** Tente une connexion ; renvoie le compte si valide. */
  connecter: (email: string, motDePasse: string) => Compte | null;
  /** Déconnecte le compte courant. */
  deconnecter: () => void;
}

const Contexte = createContext<AuthContexte | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [compte, setCompte] = useState<Compte | null>(null);
  const [initialise, setInitialise] = useState(false);

  useEffect(() => {
    try {
      const id = window.localStorage.getItem(CLE_SESSION);
      if (id) setCompte(COMPTES.find((c) => c.id === id) ?? null);
    } catch {
      /* localStorage indisponible */
    }
    setInitialise(true);
  }, []);

  const connecter = (email: string, motDePasse: string): Compte | null => {
    const c = verifierIdentifiants(email, motDePasse);
    if (c) {
      try {
        window.localStorage.setItem(CLE_SESSION, c.id);
      } catch {
        /* ignore */
      }
      setCompte(c);
    }
    return c;
  };

  const deconnecter = () => {
    try {
      window.localStorage.removeItem(CLE_SESSION);
    } catch {
      /* ignore */
    }
    setCompte(null);
  };

  return (
    <Contexte.Provider value={{ compte, initialise, connecter, deconnecter }}>
      {children}
    </Contexte.Provider>
  );
}

export function useAuth(): AuthContexte {
  const ctx = useContext(Contexte);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  return ctx;
}
