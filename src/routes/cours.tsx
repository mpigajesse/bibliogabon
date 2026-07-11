import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { DOCUMENTS } from "@/data/documents";

export const Route = createFileRoute("/cours")({
  head: () => ({
    meta: [
      { title: "Cours & TD/TP — BiblioGabon" },
      { name: "description", content: "Cours magistraux, travaux dirigés et travaux pratiques des universités gabonaises." },
      { property: "og:title", content: "Cours & TD/TP — BiblioGabon" },
      { property: "og:description", content: "Support de cours des enseignants gabonais." },
    ],
  }),
  component: () => {
    const docs = DOCUMENTS.filter((d) => d.type === "cours" || d.type === "td-tp");
    return (
      <SiteLayout>
        <PageHeader
          eyebrow="Catalogue"
          title="Cours & travaux dirigés."
          description="Supports de cours, TD et TP produits par les enseignants des universités gabonaises."
          crumbs={[{ label: "Accueil", to: "/" }, { label: "Cours" }]}
        />
        <section><div className="container-editorial py-12"><CatalogueBrowser documents={docs} /></div></section>
      </SiteLayout>
    );
  },
});
