import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { documentsByType } from "@/data/documents";

export const Route = createFileRoute("/livres")({
  head: () => ({
    meta: [
      { title: "Livres — BiblioGabon" },
      { name: "description", content: "Catalogue des livres et manuels académiques des universités gabonaises." },
      { property: "og:title", content: "Livres — BiblioGabon" },
      { property: "og:description", content: "Livres et manuels académiques des universités du Gabon." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Catalogue"
        title="Livres & manuels."
        description="Manuels universitaires, précis, ouvrages de référence produits ou sélectionnés par les enseignants gabonais."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Livres" }]}
      />
      <section><div className="container-editorial py-12"><CatalogueBrowser documents={documentsByType("livre")} lockedType="livre" /></div></section>
    </SiteLayout>
  ),
});
