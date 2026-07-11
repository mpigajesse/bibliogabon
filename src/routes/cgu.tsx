import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/cgu")({
  head: () => ({
    meta: [
      { title: "Conditions générales d'utilisation — BiblioGabon" },
      {
        name: "description",
        content: "Conditions générales d'utilisation de la plateforme BiblioGabon.",
      },
      { property: "og:title", content: "CGU — BiblioGabon" },
      {
        property: "og:description",
        content: "Règles d'usage de la bibliothèque numérique nationale.",
      },
    ],
  }),
  component: Cgu,
});

const SECTIONS = [
  { id: "objet", titre: "1. Objet" },
  { id: "acces", titre: "2. Accès et inscription" },
  { id: "contenus", titre: "3. Contenus et propriété intellectuelle" },
  { id: "usage", titre: "4. Usage autorisé" },
  { id: "responsabilite", titre: "5. Responsabilité" },
  { id: "suspension", titre: "6. Suspension et résiliation" },
  { id: "modification", titre: "7. Modification des CGU" },
  { id: "droit-applicable", titre: "8. Droit applicable" },
];

function Cgu() {
  return (
    <SiteLayout>
      <PageHeader
        Icon={FileText}
        accent="navy"
        eyebrow="Légal"
        title="Conditions générales d'utilisation."
        description="Dernière mise à jour : janvier 2026."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "CGU" }]}
      />
      <section>
        <div className="container-editorial py-12 grid lg:grid-cols-[280px_1fr] gap-12">
          <nav
            aria-label="Sommaire des CGU"
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
            <section id="objet" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                1. Objet
              </h2>
              <p>
                Les présentes conditions générales d'utilisation (« CGU ») régissent l'accès et
                l'usage de la plateforme BiblioGabon, bibliothèque numérique nationale destinée aux
                étudiants et enseignants des universités et grandes écoles du Gabon.
              </p>
            </section>

            <section id="acces" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                2. Accès et inscription
              </h2>
              <p>
                L'accès à BiblioGabon est réservé aux étudiants et enseignants des universités et
                grandes écoles gabonaises. L'inscription est gratuite et nécessite une adresse
                e-mail universitaire ou une preuve de rattachement à un établissement reconnu.
              </p>
            </section>

            <section id="contenus" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                3. Contenus et propriété intellectuelle
              </h2>
              <p>
                Les documents publiés sur la plateforme restent la propriété intellectuelle de leurs
                auteurs. Toute reproduction commerciale sans autorisation est strictement interdite.
                Les sources ouvertes référencées demeurent soumises à leurs licences respectives.
              </p>
            </section>

            <section id="usage" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                4. Usage autorisé
              </h2>
              <p>
                Les ressources sont mises à disposition à des fins strictement académiques et
                personnelles : consultation, citation avec attribution, et usage pédagogique. Toute
                utilisation détournée de cet objectif est prohibée.
              </p>
            </section>

            <section id="responsabilite" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                5. Responsabilité
              </h2>
              <p>
                BiblioGabon s'efforce d'assurer l'exactitude et la disponibilité des contenus, sans
                garantir l'exhaustivité des informations publiées. L'équipe ne saurait être tenue
                responsable d'un usage non conforme des documents par un membre.
              </p>
            </section>

            <section id="suspension" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                6. Suspension et résiliation
              </h2>
              <p>
                BiblioGabon se réserve le droit de suspendre tout compte utilisant la plateforme à
                des fins contraires à sa mission académique, sans préavis en cas de manquement grave
                aux présentes CGU.
              </p>
            </section>

            <section id="modification" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                7. Modification des CGU
              </h2>
              <p>
                Les présentes conditions peuvent être mises à jour périodiquement. Les membres
                seront informés de toute modification substantielle par notification sur la
                plateforme.
              </p>
            </section>

            <section id="droit-applicable" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-navy tracking-tight mb-4">
                8. Droit applicable
              </h2>
              <p>
                Les présentes CGU sont soumises au droit gabonais. Tout litige relève de la
                compétence exclusive des juridictions de Libreville, République Gabonaise.
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
