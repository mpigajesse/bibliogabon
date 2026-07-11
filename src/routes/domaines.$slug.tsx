import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, FileStack, GraduationCap, Globe2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { EmptyState } from "@/components/site/EmptyState";
import { domaineBySlug, type Domaine } from "@/data/domaines";
import { documentsByDomaine } from "@/data/documents";

export const Route = createFileRoute("/domaines/$slug")({
  loader: ({ params }) => {
    const dom = domaineBySlug(params.slug);
    if (!dom) throw notFound();
    return { dom };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.dom.nom ?? "Domaine"} — BiblioGabon` },
      { name: "description", content: loaderData?.dom.description ?? "Domaine académique." },
      { property: "og:title", content: `${loaderData?.dom.nom} — BiblioGabon` },
      { property: "og:description", content: loaderData?.dom.description ?? "" },
    ],
  }),
  notFoundComponent: DomaineNotFound,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <PageHeader title="Erreur" description={error.message} />
    </SiteLayout>
  ),
  component: DomainDetail,
});

const BANNER_BG: Record<Domaine["couleur"], string> = {
  navy: "bg-navy-soft",
  green: "bg-green-soft",
  gold: "bg-gold-soft/40",
};

const ACCENT_TEXT: Record<Domaine["couleur"], string> = {
  navy: "text-navy",
  green: "text-green",
  gold: "text-[oklch(0.42_0.13_82)]",
};

function DomaineNotFound() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Domaine"
        title="Domaine introuvable"
        crumbs={[
          { label: "Accueil", to: "/" },
          { label: "Domaines", to: "/domaines" },
        ]}
      />
      <section>
        <div className="container-editorial py-14">
          <EmptyState
            title="Ce domaine n'existe pas dans notre catalogue"
            description="Il a peut-être été renommé ou déplacé. Retrouvez l'ensemble des disciplines depuis la page des domaines."
          />
          <div className="mt-6 flex justify-center">
            <Link
              to="/domaines"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-deep focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Retour aux domaines
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function DomainDetail() {
  const { dom } = Route.useLoaderData();
  const docs = documentsByDomaine(dom.slug);
  const niveaux = Array.from(new Set(docs.map((d) => d.niveau).filter(Boolean)));
  const sourcesCount = new Set(docs.filter((d) => d.source).map((d) => d.source!.nom)).size;

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Domaine"
        title={dom.nom}
        description={dom.description}
        crumbs={[
          { label: "Accueil", to: "/" },
          { label: "Domaines", to: "/domaines" },
          { label: dom.nom },
        ]}
      />
      <section className={`${BANNER_BG[dom.couleur]} border-b border-border`}>
        <div className="container-editorial py-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span
              className={`inline-flex items-center gap-2 text-sm font-medium ${ACCENT_TEXT[dom.couleur]}`}
            >
              <FileStack className="size-4" aria-hidden="true" />
              <strong className="font-display text-lg">{docs.length}</strong> document
              {docs.length > 1 ? "s" : ""} référencé{docs.length > 1 ? "s" : ""}
            </span>
            {niveaux.length > 0 && (
              <span
                className={`inline-flex items-center gap-2 text-sm font-medium ${ACCENT_TEXT[dom.couleur]}`}
              >
                <GraduationCap className="size-4" aria-hidden="true" />
                {niveaux.join(" · ")}
              </span>
            )}
            {sourcesCount > 0 && (
              <span
                className={`inline-flex items-center gap-2 text-sm font-medium ${ACCENT_TEXT[dom.couleur]}`}
              >
                <Globe2 className="size-4" aria-hidden="true" />
                {sourcesCount} source{sourcesCount > 1 ? "s" : ""} ouverte
                {sourcesCount > 1 ? "s" : ""} mobilisée{sourcesCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="container-editorial py-12">
          {docs.length === 0 ? (
            <EmptyState
              title="Aucun document dans ce domaine pour l'instant"
              description="Les enseignants et chercheurs contribuent régulièrement de nouvelles ressources. Revenez bientôt ou explorez un autre domaine."
            />
          ) : (
            <CatalogueBrowser documents={docs} lockedDomaine={dom.slug} />
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
