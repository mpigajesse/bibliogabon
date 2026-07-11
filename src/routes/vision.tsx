import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { STATS_VISION } from "@/data/stats";
import { Award, Users, Cpu, Landmark, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Vision & Impact — BiblioGabon" },
      {
        name: "description",
        content:
          "La vision d'une bibliothèque nationale numérique souveraine pour les universités gabonaises.",
      },
      { property: "og:title", content: "Vision & Impact — BiblioGabon" },
      {
        property: "og:description",
        content:
          "Souveraineté documentaire, qualité académique et visibilité des chercheurs gabonais.",
      },
    ],
  }),
  component: Vision,
});

const PILIERS = [
  {
    Icon: Award,
    titre: "Qualité académique",
    texte: "Références locales certifiées, reconnues par les encadreurs et jurys.",
  },
  {
    Icon: Users,
    titre: "Visibilité des chercheurs",
    texte: "+500 enseignants-chercheurs gabonais valorisés et cités durablement.",
  },
  {
    Icon: Cpu,
    titre: "Économie numérique",
    texte: "Emplois tech créés, économies substantielles sur les photocopies.",
  },
  {
    Icon: Landmark,
    titre: "Souveraineté documentaire",
    texte: "Le Gabon produit, publie et maîtrise son propre savoir académique.",
  },
];

function Vision() {
  return (
    <SiteLayout>
      <div className="h-1 gabon-stripe" aria-hidden="true" />
      <PageHeader
        eyebrow="Vision & Impact"
        title="Une bibliothèque nationale à la hauteur des ambitions du Gabon."
        description="Faire de BiblioGabon la plateforme de référence documentaire de toutes les universités gabonaises."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Vision" }]}
      />

      <section className="border-b border-border section-halo">
        <div className="container-editorial py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green mb-4">
            Contexte MESRI 2023
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {STATS_VISION.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-8 shadow-editorial"
              >
                <p className="font-display text-6xl font-bold text-navy leading-none">{s.valeur}</p>
                <div className="mt-4 h-px w-10 gabon-rule" aria-hidden="true" />
                <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{s.label}</p>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 border-b border-border">
        <div className="container-editorial py-16 md:py-20 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-4">
            Notre mission
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight">
            Faire de BiblioGabon la plateforme de référence documentaire de toutes les universités
            du Gabon.
          </h2>
          <p className="mt-6 text-lg text-foreground/85 leading-[1.75]">
            Valoriser les travaux des enseignants-chercheurs, archiver les meilleurs mémoires et
            thèses, et offrir à chaque étudiant un accès abordable à une documentation locale de
            qualité — c'est l'engagement quotidien de BiblioGabon.
          </p>
        </div>
      </section>

      <section>
        <div className="container-editorial py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green mb-3">
            Impact
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight mb-10">
            Nos piliers d'impact.
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {PILIERS.map((p) => (
              <div
                key={p.titre}
                className="group rounded-2xl border border-border p-7 hover:shadow-editorial-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-navy-soft text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                  <p.Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy">{p.titre}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white pixel-grid-bg relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 gabon-stripe" aria-hidden="true" />
        <div className="container-editorial py-20 text-center relative max-w-3xl">
          <Quote className="mx-auto size-8 text-gold mb-6" />
          <blockquote className="font-display text-3xl md:text-4xl italic text-white leading-snug tracking-tight">
            « L'accès au savoir n'est pas un luxe : c'est un droit. BiblioGabon en fait une réalité
            concrète. »
          </blockquote>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90">
              <Link to="/inscription">Rejoindre la bibliothèque</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
