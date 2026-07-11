import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { ContributorCard } from "@/components/site/ContributorCard";
import { EmptyState } from "@/components/site/EmptyState";
import { CONTRIBUTEURS } from "@/data/contributeurs";
import { Search, X, Users } from "lucide-react";

export const Route = createFileRoute("/enseignants")({
  head: () => ({
    meta: [
      { title: "Enseignants contributeurs — BiblioGabon" },
      {
        name: "description",
        content:
          "Annuaire des enseignants-chercheurs qui contribuent à la bibliothèque nationale des universités du Gabon.",
      },
      { property: "og:title", content: "Nos contributeurs — BiblioGabon" },
      {
        property: "og:description",
        content: "Les enseignants qui enrichissent la bibliothèque numérique nationale.",
      },
    ],
  }),
  component: EnseignantsAnnuaire,
});

function EnseignantsAnnuaire() {
  const [query, setQuery] = useState("");

  const resultats = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CONTRIBUTEURS;
    return CONTRIBUTEURS.filter(
      (c) =>
        c.nom.toLowerCase().includes(q) ||
        c.specialite.toLowerCase().includes(q) ||
        c.universite.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <SiteLayout>
      <PageHeader
        Icon={Users}
        accent="gold"
        image="/heroes/hero-enseignants.png"
        eyebrow="Communauté"
        title="Nos enseignants contributeurs."
        description="Professeurs, ingénieurs, docteurs et maîtres-assistants des universités gabonaises qui partagent librement leurs ressources pédagogiques avec toute la communauté académique nationale."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Enseignants" }]}
      >
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom, spécialité ou université…"
            aria-label="Rechercher un enseignant par nom ou spécialité"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-10 text-sm shadow-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-shadow"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Effacer la recherche"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>
      </PageHeader>

      <section>
        <div className="container-editorial py-12">
          <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
            {resultats.length} enseignant{resultats.length > 1 ? "s" : ""} trouvé
            {resultats.length > 1 ? "s" : ""}
          </p>
          {resultats.length === 0 ? (
            <EmptyState
              title="Aucun enseignant ne correspond à votre recherche"
              description="Essayez un autre nom, une autre spécialité ou une autre université."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resultats.map((c) => (
                <ContributorCard key={c.id} c={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
