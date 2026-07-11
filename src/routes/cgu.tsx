import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/cgu")({
  head: () => ({ meta: [
    { title: "Conditions générales d'utilisation — BiblioGabon" },
    { name: "description", content: "Conditions générales d'utilisation de la plateforme BiblioGabon." },
    { property: "og:title", content: "CGU — BiblioGabon" },
    { property: "og:description", content: "Règles d'usage de la bibliothèque numérique nationale." },
  ] }),
  component: () => (
    <SiteLayout>
      <PageHeader eyebrow="Légal" title="Conditions générales d'utilisation." crumbs={[{ label: "Accueil", to: "/" }, { label: "CGU" }]} />
      <section><div className="container-editorial py-12 max-w-3xl space-y-5 text-foreground/85 leading-[1.75]">
        <p>L'accès à BiblioGabon est réservé aux étudiants et enseignants des universités et grandes écoles gabonaises. L'inscription est gratuite.</p>
        <p>Les documents publiés sur la plateforme restent la propriété intellectuelle de leurs auteurs. Toute reproduction commerciale sans autorisation est strictement interdite.</p>
        <p>BiblioGabon se réserve le droit de suspendre tout compte utilisant la plateforme à des fins contraires à sa mission académique.</p>
      </div></section>
    </SiteLayout>
  ),
});
