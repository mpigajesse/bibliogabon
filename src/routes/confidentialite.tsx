import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({ meta: [
    { title: "Politique de confidentialité — BiblioGabon" },
    { name: "description", content: "Protection des données personnelles des membres BiblioGabon." },
    { property: "og:title", content: "Confidentialité — BiblioGabon" },
    { property: "og:description", content: "Comment nous protégeons vos données personnelles." },
  ] }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Légal" title="Politique de confidentialité." crumbs={[{ label: "Accueil", to: "/" }, { label: "Confidentialité" }]} />
      <section><div className="container-editorial py-12 max-w-3xl prose-editorial space-y-5 text-foreground/85 leading-[1.75]">
        <p>BiblioGabon collecte uniquement les données nécessaires à l'usage de la plateforme : nom, prénom, e-mail universitaire, établissement de rattachement et, pour les enseignants, spécialité.</p>
        <p>Vos données ne sont ni revendues ni cédées à des tiers. Elles sont hébergées dans le respect du cadre juridique gabonais et africain de protection des données.</p>
        <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données en écrivant à <a href="mailto:contact@biblio-gabon.ga" className="text-navy underline">contact@biblio-gabon.ga</a>.</p>
      </div></section>
    </SiteLayout>
  ),
});
