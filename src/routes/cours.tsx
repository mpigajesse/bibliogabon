import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Layers3, BarChart3, Globe2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { DOCUMENTS } from "@/data/documents";

export const Route = createFileRoute("/cours")({
  head: () => ({
    meta: [
      { title: "Cours & TD/TP — BiblioGabon" },
      {
        name: "description",
        content:
          "Cours magistraux, travaux dirigés et travaux pratiques des universités gabonaises.",
      },
      { property: "og:title", content: "Cours & TD/TP — BiblioGabon" },
      { property: "og:description", content: "Support de cours des enseignants gabonais." },
    ],
  }),
  component: CoursPage,
});

function CoursPage() {
  const docs = DOCUMENTS.filter((d) => d.type === "cours" || d.type === "td-tp");
  const domainesCount = new Set(docs.map((d) => d.domaineSlug)).size;
  const niveaux = Array.from(new Set(docs.map((d) => d.niveau).filter(Boolean)));
  const sources = Array.from(
    new Map(docs.filter((d) => d.source).map((d) => [d.source!.nom, d.source!])).values(),
  );

  return (
    <SiteLayout>
      <PageHeader
        Icon={GraduationCap}
        accent="navy"
        image="/heroes/hero-cours.jpg"
        eyebrow="Catalogue"
        title="Cours & travaux dirigés."
        description="Supports de cours, TD et TP produits par les enseignants des universités gabonaises."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Cours" }]}
      />
      <CatalogueStatsStrip
        stats={[
          { icon: GraduationCap, value: docs.length, label: "Supports de cours & TD/TP" },
          { icon: Layers3, value: domainesCount, label: "Domaines couverts" },
          { icon: BarChart3, value: niveaux.length, label: "Niveaux disponibles" },
          { icon: Globe2, value: sources.length, label: "Sources ouvertes mobilisées" },
        ]}
        sources={sources}
      />
      <section>
        <div className="container-editorial py-12">
          <CatalogueBrowser documents={docs} />
        </div>
      </section>
    </SiteLayout>
  );
}

interface StatItem {
  icon: LucideIcon;
  value: number | string;
  label: string;
}

interface SourceRef {
  nom: string;
  url: string;
  licence?: string;
}

function CatalogueStatsStrip({ stats, sources }: { stats: StatItem[]; sources: SourceRef[] }) {
  return (
    <section className="section-halo border-b border-border">
      <div className="container-editorial py-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-[oklch(0.42_0.13_82)]">
                <s.icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold leading-none text-navy">
                  {s.value}
                </dd>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </dl>
        {sources.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sources libres mobilisées
            </p>
            <div className="flex flex-wrap gap-2">
              {sources.map((s) => (
                <a
                  key={s.nom}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:border-gold hover:text-navy focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {s.nom}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
