import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/apropos")({
  head: () => ({ meta: [
    { title: "À propos — BiblioGabon" },
    { name: "description", content: "BiblioGabon : la bibliothèque numérique nationale des universités gabonaises." },
    { property: "og:title", content: "À propos — BiblioGabon" },
    { property: "og:description", content: "Notre histoire, notre équipe, nos partenaires." },
  ] }),
  component: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Institution"
        title="À propos de BiblioGabon."
        description="Une initiative académique gabonaise pour rassembler, préserver et diffuser le savoir universitaire du pays."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "À propos" }]}
      />
      <section>
        <div className="container-editorial py-12 max-w-3xl space-y-6 text-foreground/85 leading-[1.75] text-[17px]">
          <p>BiblioGabon est né d'un constat simple : moins de 5 % des publications des chercheurs gabonais sont accessibles en ligne, tandis que plus de 100 000 étudiants du pays cherchent chaque jour des ressources académiques adaptées à leur contexte.</p>
          <p>Notre plateforme regroupe livres, cours, thèses, mémoires, articles scientifiques et sujets d'examens produits par les enseignants des universités et grandes écoles gabonaises — l'Université Omar Bongo, l'Université des Sciences et Techniques de Masuku, l'Université des Sciences de la Santé, l'INPTIC et bien d'autres.</p>
          <p>L'accès y est <strong className="text-navy">100 % gratuit</strong> pour les étudiants et enseignants, dans une logique de <strong className="text-navy">souveraineté documentaire</strong>.</p>
        </div>
      </section>
    </SiteLayout>
  ),
});
