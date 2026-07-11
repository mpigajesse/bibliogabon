import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, BookMarked } from "lucide-react";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription — BiblioGabon" },
      {
        name: "description",
        content:
          "Créez votre compte gratuit BiblioGabon — étudiants et enseignants des universités gabonaises.",
      },
      { property: "og:title", content: "Inscription — BiblioGabon" },
      {
        property: "og:description",
        content: "Accès 100 % gratuit à la bibliothèque numérique nationale.",
      },
    ],
  }),
  component: Inscription,
});

function Inscription() {
  const [role, setRole] = useState<"etudiant" | "enseignant">("etudiant");
  return (
    <div className="min-h-screen bg-muted/40 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Logo size={52} />
          <div className="mx-auto mt-5 h-1 w-10 gabon-rule" aria-hidden="true" />
          <h1 className="mt-5 font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight">
            Rejoindre la bibliothèque nationale.
          </h1>
          <p className="mt-2 text-muted-foreground">Créez votre compte gratuit en 30 secondes.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-editorial-lg">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <RoleChoice
              active={role === "etudiant"}
              onClick={() => setRole("etudiant")}
              Icon={GraduationCap}
              title="Étudiant"
              tone="navy"
            />
            <RoleChoice
              active={role === "enseignant"}
              onClick={() => setRole("enseignant")}
              Icon={BookMarked}
              title="Enseignant"
              tone="green"
            />
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field id="prenom" label="Prénom" placeholder="Jean" />
              <Field id="nom" label="Nom" placeholder="MBA" />
            </div>
            <Field
              id="email"
              type="email"
              label="E-mail universitaire"
              placeholder="prenom.nom@univ-ln.ac.ga"
            />
            <div className="space-y-1.5">
              <Label htmlFor="univ">Université</Label>
              <select
                id="univ"
                className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
              >
                <option>Université Omar Bongo (UOB)</option>
                <option>Université des Sciences et Techniques de Masuku (USTM)</option>
                <option>Université des Sciences de la Santé (USS)</option>
                <option>INPTIC</option>
                <option>Autre établissement gabonais</option>
              </select>
            </div>
            {role === "enseignant" && (
              <Field
                id="specialite"
                label="Spécialité / discipline"
                placeholder="Ex : Physique nucléaire"
              />
            )}
            <Field
              id="pwd"
              type="password"
              label="Mot de passe"
              placeholder="8 caractères minimum"
            />
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="mt-0.5 accent-[var(--navy)]" />
              J'accepte les{" "}
              <Link to="/cgu" className="underline hover:text-navy">
                CGU
              </Link>{" "}
              et la{" "}
              <Link to="/confidentialite" className="underline hover:text-navy">
                politique de confidentialité
              </Link>
              .
            </label>
            <Button
              type="submit"
              className={`w-full h-11 text-white ${role === "etudiant" ? "bg-navy hover:bg-navy-deep" : "bg-green hover:bg-green/90"}`}
            >
              Créer mon compte {role === "etudiant" ? "étudiant" : "enseignant"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Déjà inscrit ?{" "}
              <Link to="/connexion" className="text-navy font-medium hover:text-gold">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function RoleChoice({
  active,
  onClick,
  Icon,
  title,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  Icon: typeof GraduationCap;
  title: string;
  tone: "navy" | "green";
}) {
  const color = tone === "navy" ? "var(--navy)" : "var(--green)";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition ${active ? "shadow-editorial" : "border-border hover:border-gold/60"}`}
      style={
        active
          ? {
              borderColor: color,
              background: tone === "navy" ? "var(--navy-soft)" : "var(--green-soft)",
            }
          : undefined
      }
    >
      <span
        className="flex size-10 items-center justify-center rounded-lg text-white"
        style={{ background: color }}
      >
        <Icon className="size-5" />
      </span>
      <div>
        <p className="font-display font-semibold text-navy">{title}</p>
        <p className="text-xs text-muted-foreground">Je suis {title.toLowerCase()}</p>
      </div>
    </button>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} className="h-10" />
    </div>
  );
}
