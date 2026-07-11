import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, AlertCircle, UserRound, GraduationCap } from "lucide-react";
import { connecter } from "@/lib/auth";
import { COMPTES } from "@/data/comptes";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion — BiblioGabon" },
      {
        name: "description",
        content: "Connectez-vous à votre compte BiblioGabon pour accéder aux documents.",
      },
      { property: "og:title", content: "Connexion — BiblioGabon" },
      { property: "og:description", content: "Accédez à la bibliothèque numérique nationale." },
    ],
  }),
  component: Connexion,
});

function Connexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const compte = connecter(email, motDePasse);
    if (compte) {
      setErreur(null);
      navigate({ to: "/tableau-de-bord" });
    } else {
      setErreur("E-mail ou mot de passe incorrect. Essayez un compte de démonstration ci-dessous.");
    }
  };

  const connexionRapide = (demoEmail: string, demoPwd: string) => {
    setEmail(demoEmail);
    setMotDePasse(demoPwd);
    setErreur(null);
    const compte = connecter(demoEmail, demoPwd);
    if (compte) navigate({ to: "/tableau-de-bord" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-navy text-white pixel-grid-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-deep to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1 gabon-stripe" aria-hidden="true" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-gold"
          >
            <ArrowLeft className="size-4" /> Retour à l'accueil
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3">
              République Gabonaise 🇬🇦
            </p>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight max-w-md">
              La Grande Source documentaire du Gabon.
            </h2>
            <p className="mt-4 text-white/70 max-w-md">
              Retrouvez vos favoris, votre historique de lecture et vos téléchargements en un
              instant.
            </p>
          </div>
          <p className="text-xs text-white/50">© 2026 BiblioGabon · v2.0.0</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <Logo size={56} />
            <div className="mx-auto mt-5 h-1 w-10 gabon-rule" aria-hidden="true" />
            <h1 className="mt-5 font-display text-3xl font-semibold text-navy tracking-tight">
              Connexion
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Accédez à votre bibliothèque personnelle.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {erreur && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
              >
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <span>{erreur}</span>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Adresse e-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="prenom.nom@univ-ln.ac.ga"
                  className="pl-9 h-11"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-xs text-green hover:text-gold">
                  Oublié ?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 h-11"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 bg-navy text-white hover:bg-navy-deep">
              Se connecter
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Pas encore membre ?{" "}
              <Link to="/inscription" className="text-navy font-medium hover:text-gold">
                Créer un compte gratuit
              </Link>
            </p>
          </form>

          <div className="mt-8 rounded-xl border border-border bg-surface-alt p-4">
            <p className="text-xs font-semibold text-navy uppercase tracking-wide">
              Comptes de démonstration
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Cliquez sur un compte pour vous connecter instantanément.
            </p>
            <div className="mt-3 space-y-2">
              {COMPTES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => connexionRapide(c.email, c.motDePasse)}
                  className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 text-left transition hover:border-gold hover:shadow-editorial"
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                      c.role === "enseignant"
                        ? "bg-green-soft text-green"
                        : "bg-navy-soft text-navy"
                    }`}
                  >
                    {c.role === "enseignant" ? (
                      <GraduationCap className="size-4" />
                    ) : (
                      <UserRound className="size-4" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {c.nom}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{c.email}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
