import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/connexion")({
  head: () => ({ meta: [
    { title: "Connexion — BiblioGabon" },
    { name: "description", content: "Connectez-vous à votre compte BiblioGabon pour accéder aux documents." },
    { property: "og:title", content: "Connexion — BiblioGabon" },
    { property: "og:description", content: "Accédez à la bibliothèque numérique nationale." },
  ] }),
  component: Connexion,
});

function Connexion() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-navy text-white pixel-grid-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-deep to-transparent" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-gold"><ArrowLeft className="size-4" /> Retour à l'accueil</Link>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3">République Gabonaise 🇬🇦</p>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight max-w-md">La Grande Source documentaire du Gabon.</h2>
            <p className="mt-4 text-white/70 max-w-md">Retrouvez vos favoris, votre historique de lecture et vos téléchargements en un instant.</p>
          </div>
          <p className="text-xs text-white/50">© 2026 BiblioGabon · v2.0.0</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <Logo size={56} />
            <h1 className="mt-6 font-display text-3xl font-semibold text-navy tracking-tight">Connexion</h1>
            <p className="mt-2 text-sm text-muted-foreground">Accédez à votre bibliothèque personnelle.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Adresse e-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="prenom.nom@univ-ln.ac.ga" className="pl-9 h-11" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-xs text-green hover:text-gold">Oublié ?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-9 h-11" />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 bg-navy text-white hover:bg-navy-deep">Se connecter</Button>
            <p className="text-center text-sm text-muted-foreground">
              Pas encore membre ? <Link to="/inscription" className="text-navy font-medium hover:text-gold">Créer un compte gratuit</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
