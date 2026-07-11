import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — BiblioGabon" },
      {
        name: "description",
        content: "Protection des données personnelles des membres BiblioGabon.",
      },
      { property: "og:title", content: "Confidentialité — BiblioGabon" },
      { property: "og:description", content: "Comment nous protégeons vos données personnelles." },
    ],
  }),
  component: Confidentialite,
});

const SECTIONS = [
  { id: "donnees-collectees", titre: "1. Données collectées" },
  { id: "finalites", titre: "2. Finalités du traitement" },
  { id: "partage", titre: "3. Partage des données" },
  { id: "conservation", titre: "4. Durée de conservation" },
  { id: "securite", titre: "5. Sécurité" },
  { id: "droits", titre: "6. Vos droits" },
  { id: "cookies", titre: "7. Cookies" },
  { id: "contact-dpo", titre: "8. Nous contacter" },
];

function Confidentialite() {
  return (
    <SiteLayout>
      <PageHeader
        Icon={ShieldCheck}
        accent="green"
        image="/heroes/hero-legal.jpg"
        eyebrow="Légal"
        title="Politique de confidentialité."
        description="Dernière mise à jour : janvier 2026."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Confidentialité" }]}
      />
      <section>
        <div className="container-editorial py-12 grid lg:grid-cols-[280px_1fr] gap-12">
          <nav
            aria-label="Sommaire de la politique de confidentialité"
            className="lg:sticky lg:top-24 self-start rounded-2xl border border-border bg-muted/40 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green mb-4">
              Sommaire
            </p>
            <ul className="space-y-2.5 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-foreground/75 hover:text-navy transition-colors"
                  >
                    {s.titre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-3xl space-y-12 text-foreground/85 leading-[1.75] text-[17px]">
            <section id="donnees-collectees" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                1. Données collectées
              </h2>
              <p>
                BiblioGabon collecte uniquement les données nécessaires à l'usage de la plateforme :
                nom, prénom, e-mail universitaire, établissement de rattachement et, pour les
                enseignants, spécialité.
              </p>
            </section>

            <section id="finalites" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                2. Finalités du traitement
              </h2>
              <p>
                Ces données servent exclusivement à la création et à la gestion de votre compte, à
                la personnalisation de votre espace membre (favoris, historique, téléchargements) et
                à l'amélioration continue du service.
              </p>
            </section>

            <section id="partage" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                3. Partage des données
              </h2>
              <p>
                Vos données ne sont ni revendues ni cédées à des tiers. Elles sont hébergées dans le
                respect du cadre juridique gabonais et africain de protection des données
                personnelles.
              </p>
            </section>

            <section id="conservation" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                4. Durée de conservation
              </h2>
              <p>
                Les données sont conservées pendant toute la durée d'activité de votre compte, puis
                archivées ou supprimées conformément aux obligations légales applicables.
              </p>
            </section>

            <section id="securite" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                5. Sécurité
              </h2>
              <p>
                Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour
                protéger vos données contre tout accès, altération ou divulgation non autorisés.
              </p>
            </section>

            <section id="droits" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                6. Vos droits
              </h2>
              <p>
                Vous disposez d'un droit d'accès, de rectification et de suppression de vos données
                en écrivant à{" "}
                <a
                  href="mailto:contact@biblio-gabon.ga"
                  className="text-navy underline decoration-gold/60 underline-offset-2 hover:text-gold"
                >
                  contact@biblio-gabon.ga
                </a>
                .
              </p>
            </section>

            <section id="cookies" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                7. Cookies
              </h2>
              <p>
                BiblioGabon utilise des cookies strictement nécessaires au fonctionnement de la
                plateforme (session, préférences d'affichage). Aucun cookie publicitaire ou de
                traçage tiers n'est utilisé.
              </p>
            </section>

            <section id="contact-dpo" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                8. Nous contacter
              </h2>
              <p>
                Pour toute question relative à la protection de vos données, contactez-nous à
                l'adresse{" "}
                <a
                  href="mailto:contact@biblio-gabon.ga"
                  className="text-navy underline decoration-gold/60 underline-offset-2 hover:text-gold"
                >
                  contact@biblio-gabon.ga
                </a>{" "}
                ou via notre page{" "}
                <a
                  href="/contact"
                  className="text-navy underline decoration-gold/60 underline-offset-2 hover:text-gold"
                >
                  Contact
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
