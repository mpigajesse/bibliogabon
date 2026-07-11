import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { ContributorCard } from "@/components/site/ContributorCard";
import { CONTRIBUTEURS } from "@/data/contributeurs";

export const Route = createFileRoute("/enseignants")({
  head: () => ({
    meta: [
      { title: "Enseignants contributeurs — BiblioGabon" },
      { name: "description", content: "Annuaire des enseignants-chercheurs qui contribuent à la bibliothèque nationale des universités du Gabon." },
      { property: "og:title", content: "Nos contributeurs — BiblioGabon" },
      { property: "og:description", content: "Les enseignants qui enrichissent la bibliothèque numérique nationale." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Communauté"
        title="Nos enseignants contributeurs."
        description="Professeurs, ingénieurs, docteurs et maîtres-assistants des universités gabonaises qui partagent leurs ressources pédagogiques librement."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Enseignants" }]}
      />
      <section>
        <div className="container-editorial py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CONTRIBUTEURS.map((c) => <ContributorCard key={c.id} c={c} />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  ),
});
