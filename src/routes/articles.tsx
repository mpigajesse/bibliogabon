import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Layers3, GraduationCap, Globe2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { documentsByType } from "@/data/documents";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles scientifiques — BiblioGabon" },
      {
        name: "description",
        content:
          "Articles scientifiques et revues à comité de lecture des chercheurs des universités gabonaises.",
      },
      { property: "og:title", content: "Articles scientifiques — BiblioGabon" },
      { property: "og:description", content: "Articles scientifiques des chercheurs gabonais." },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const docs = documentsByType("article");
  const domainesCount = new Set(docs.map((d) => d.domaineSlug)).size;
  const niveaux = Array.from(new Set(docs.map((d) => d.niveau).filter(Boolean)));
  const sources = Array.from(
    new Map(docs.filter((d) => d.source).map((d) => [d.source!.nom, d.source!])).values(),
  );

  return (
    <SiteLayout>
      <PageHeader
        Icon={FlaskConical}
        accent="green"
        eyebrow="Catalogue"
        title="Articles scientifiques."
        description="Publications à comité de lecture, revues indexées et communications de nos enseignants-chercheurs."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Articles" }]}
      />
      <CatalogueStatsStrip
        stats={[
          { icon: FlaskConical, value: docs.length, label: "Articles référencés" },
          { icon: Layers3, value: domainesCount, label: "Domaines couverts" },
          { icon: GraduationCap, value: niveaux.length, label: "Niveaux disponibles" },
          { icon: Globe2, value: sources.length, label: "Sources ouvertes mobilisées" },
        ]}
        sources={sources}
      />
      <section>
        <div className="container-editorial py-12">
          <CatalogueBrowser documents={docs} lockedType="article" />
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
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-soft text-green">
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
