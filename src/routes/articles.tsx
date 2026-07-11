import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogueBrowser } from "@/components/site/CatalogueBrowser";
import { documentsByType } from "@/data/documents";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles scientifiques — BiblioGabon" },
      { name: "description", content: "Articles scientifiques et revues à comité de lecture des chercheurs des universités gabonaises." },
      { property: "og:title", content: "Articles scientifiques — BiblioGabon" },
      { property: "og:description", content: "Articles scientifiques des chercheurs gabonais." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Catalogue"
        title="Articles scientifiques."
        description="Publications à comité de lecture, revues indexées et communications de nos enseignants-chercheurs."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Articles" }]}
      />
      <section><div className="container-editorial py-12"><CatalogueBrowser documents={documentsByType("article")} lockedType="article" /></div></section>
    </SiteLayout>
  ),
});
