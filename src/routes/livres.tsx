import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Layers3, GraduationCap, Globe2, Library } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { documentsByType } from "@/data/documents";

export const Route = createFileRoute("/livres")({
  head: () => ({
    meta: [
      { title: "Livres — BiblioGabon" },
      {
        name: "description",
        content: "Catalogue des livres et manuels académiques des universités gabonaises.",
      },
      { property: "og:title", content: "Livres — BiblioGabon" },
      {
        property: "og:description",
        content: "Livres et manuels académiques des universités du Gabon.",
      },
    ],
  }),
  component: LivresPage,
});

function LivresPage() {
  const docs = documentsByType("livre");
  const domainesCount = new Set(docs.map((d) => d.domaineSlug)).size;
  const niveaux = Array.from(new Set(docs.map((d) => d.niveau).filter(Boolean)));
  const sources = Array.from(
    new Map(docs.filter((d) => d.source).map((d) => [d.source!.nom, d.source!])).values(),
  );

  return (
    <SiteLayout>
      <PageHeader
        Icon={Library}
        accent="navy"
        image="/heroes/hero-livres.jpg"
        eyebrow="Catalogue"
        title="Livres & manuels."
        description="Manuels universitaires, précis, ouvrages de référence produits ou sélectionnés par les enseignants gabonais."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Livres" }]}
      />
      <CatalogueStatsStrip
        stats={[
          { icon: BookOpen, value: docs.length, label: "Ouvrages référencés" },
          { icon: Layers3, value: domainesCount, label: "Domaines couverts" },
          { icon: GraduationCap, value: niveaux.length, label: "Niveaux disponibles" },
          { icon: Globe2, value: sources.length, label: "Sources ouvertes mobilisées" },
        ]}
        sources={sources}
      />
      <section>
        <div className="container-editorial py-12">
          <CatalogueBrowser documents={docs} lockedType="livre" />
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
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy-soft text-navy">
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
