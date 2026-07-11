import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { DOMAINES, type Domaine } from "@/data/domaines";
import { ArrowUpRight, LayoutGrid, FileStack } from "lucide-react";

export const Route = createFileRoute("/domaines/")({
  head: () => ({
    meta: [
      { title: "Domaines académiques — BiblioGabon" },
      {
        name: "description",
        content:
          "Parcourez les 17 domaines académiques de BiblioGabon : sciences, médecine, droit, économie, ingénierie et plus.",
      },
      { property: "og:title", content: "17 domaines académiques — BiblioGabon" },
      {
        property: "og:description",
        content:
          "Toutes les disciplines couvertes par la bibliothèque numérique des universités gabonaises.",
      },
    ],
  }),
  component: DomainesIndex,
});

const DOT_COLOR: Record<Domaine["couleur"], string> = {
  navy: "var(--navy)",
  green: "var(--green)",
  gold: "var(--gold)",
};

function DomainesIndex() {
  const totalDocuments = DOMAINES.reduce((sum, d) => sum + d.documents, 0);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Catalogue"
        title="17 domaines académiques."
        description="De l'agriculture à la logistique : toutes les disciplines couvertes par les universités et grandes écoles gabonaises."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Domaines" }]}
      >
        <div className="flex flex-wrap items-center gap-6 border-t border-border pt-6">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <LayoutGrid className="size-4 text-navy" aria-hidden="true" />
            <strong className="font-display text-navy">{DOMAINES.length}</strong> domaines
            répertoriés
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <FileStack className="size-4 text-navy" aria-hidden="true" />
            <strong className="font-display text-navy">{totalDocuments}</strong> documents indexés
          </span>
        </div>
      </PageHeader>
      <section className="section-halo">
        <div className="container-editorial py-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINES.map((d, i) => (
              <DomaineCard key={d.slug} domaine={d} index={i} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function DomaineCard({ domaine, index }: { domaine: Domaine; index: number }) {
  const dot = DOT_COLOR[domaine.couleur];
  const numero = String(index + 1).padStart(2, "0");

  return (
    <Link
      to="/domaines/$slug"
      params={{ slug: domaine.slug }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:shadow-editorial-lg focus:outline-none focus:ring-2 focus:ring-gold"
    >
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: dot }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -top-3 right-2 select-none font-display text-7xl font-bold text-navy/5 transition-colors duration-300 group-hover:text-navy/10"
        aria-hidden="true"
      >
        {numero}
      </span>
      <div className="relative">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <span className="size-2 rounded-full" style={{ background: dot }} aria-hidden="true" />
          <span style={{ color: dot }}>{domaine.documents} documents</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-navy transition-colors group-hover:text-gold">
          {domaine.nom}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{domaine.description}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-navy">
          Explorer
          <ArrowUpRight
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
