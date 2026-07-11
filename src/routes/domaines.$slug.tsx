import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { domaineBySlug } from "@/data/domaines";
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
  notFoundComponent: () => (
    <SiteLayout>
      <PageHeader title="Domaine introuvable" description="Ce domaine n'existe pas dans notre catalogue." />
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <PageHeader title="Erreur" description={error.message} />
    </SiteLayout>
  ),
  component: DomainDetail,
});

function DomainDetail() {
  const { dom } = Route.useLoaderData();
  const docs = documentsByDomaine(dom.slug);
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Domaine"
        title={dom.nom}
        description={dom.description}
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Domaines", to: "/domaines" }, { label: dom.nom }]}
      />
      <section>
        <div className="container-editorial py-12">
          <CatalogueBrowser documents={docs} lockedDomaine={dom.slug} />
        </div>
      </section>
    </SiteLayout>
  );
}
