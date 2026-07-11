import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { documentsByType } from "@/data/documents";

export const Route = createFileRoute("/examens")({
  head: () => ({
    meta: [
      { title: "Examens & annales — BiblioGabon" },
      { name: "description", content: "Annales d'examens des universités gabonaises avec corrigés détaillés." },
      { property: "og:title", content: "Examens — BiblioGabon" },
      { property: "og:description", content: "Annales et sujets d'examens universitaires du Gabon." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Catalogue"
        title="Examens & annales."
        description="Sujets d'examens, épreuves écrites et corrigés partagés par les enseignants."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Examens" }]}
      />
      <section><div className="container-editorial py-12"><CatalogueBrowser documents={documentsByType("examen")} lockedType="examen" /></div></section>
    </SiteLayout>
  ),
});
