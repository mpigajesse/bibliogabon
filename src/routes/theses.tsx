import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { documentsByType } from "@/data/documents";

export const Route = createFileRoute("/theses")({
  head: () => ({
    meta: [
      { title: "Thèses doctorales — BiblioGabon" },
      { name: "description", content: "Thèses et mémoires soutenus dans les universités gabonaises." },
      { property: "og:title", content: "Thèses doctorales — BiblioGabon" },
      { property: "og:description", content: "Archives des thèses de doctorat des universités du Gabon." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Catalogue"
        title="Thèses doctorales."
        description="Archives des thèses soutenues dans les écoles doctorales des universités gabonaises."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Thèses" }]}
      />
      <section><div className="container-editorial py-12"><CatalogueBrowser documents={documentsByType("these")} lockedType="these" /></div></section>
    </SiteLayout>
  ),
});
