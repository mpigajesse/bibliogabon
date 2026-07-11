import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { DOMAINES } from "@/data/domaines";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/domaines/")({
  head: () => ({
    meta: [
      { title: "Domaines académiques — BiblioGabon" },
      { name: "description", content: "Parcourez les 17 domaines académiques de BiblioGabon : sciences, médecine, droit, économie, ingénierie et plus." },
      { property: "og:title", content: "17 domaines académiques — BiblioGabon" },
      { property: "og:description", content: "Toutes les disciplines couvertes par la bibliothèque numérique des universités gabonaises." },
    ],
  }),
  component: DomainesIndex,
});

function DomainesIndex() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Catalogue"
        title="17 domaines académiques."
        description="De l'agriculture à la logistique : toutes les disciplines couvertes par les universités et grandes écoles gabonaises."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Domaines" }]}
      />
      <section>
        <div className="container-editorial py-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINES.map((d) => {
              const dot = d.couleur === "navy" ? "var(--navy)" : d.couleur === "green" ? "var(--green)" : "var(--gold)";
              return (
                <Link
                  key={d.slug}
                  to="/domaines/$slug"
                  params={{ slug: d.slug }}
                  className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-editorial-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                    <span className="size-2 rounded-full" style={{ background: dot }} />
                    <span style={{ color: dot }}>{d.documents} documents</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-navy leading-tight group-hover:text-gold transition">
                    {d.nom}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                  <ArrowUpRight className="absolute top-5 right-5 size-4 text-muted-foreground group-hover:text-gold transition" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
