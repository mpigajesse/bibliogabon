import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SOURCES_LIBRES } from "@/data/documents";
import { BookOpen, ShieldCheck, HandHeart, Sparkles, ExternalLink, Landmark } from "lucide-react";

export const Route = createFileRoute("/apropos")({
  head: () => ({
    meta: [
      { title: "À propos — BiblioGabon" },
      {
        name: "description",
        content:
          "BiblioGabon : la bibliothèque numérique nationale des universités gabonaises. Notre histoire, notre mission, nos valeurs.",
      },
      { property: "og:title", content: "À propos — BiblioGabon" },
      {
        property: "og:description",
        content: "Notre histoire, notre mission, nos partenaires de ressources ouvertes.",
      },
    ],
  }),
  component: Apropos,
});

const VALEURS = [
  {
    Icon: BookOpen,
    titre: "Accès libre",
    texte:
      "Le savoir universitaire gabonais doit circuler sans barrière financière pour les étudiants et enseignants du pays.",
  },
  {
    Icon: ShieldCheck,
    titre: "Rigueur académique",
    texte:
      "Chaque document publié est vérifié, référencé et attribué à son auteur avec exactitude.",
  },
  {
    Icon: HandHeart,
    titre: "Solidarité intellectuelle",
    texte:
      "Les enseignants-chercheurs partagent leurs travaux pour faire progresser toute une génération.",
  },
  {
    Icon: Sparkles,
    titre: "Excellence numérique",
    texte: "Une plateforme moderne, rapide et fiable, à la hauteur des standards internationaux.",
  },
];

const UNIVERSITES = [
  { sigle: "UOB", nom: "Université Omar Bongo", ville: "Libreville" },
  { sigle: "USTM", nom: "Université des Sciences et Techniques de Masuku", ville: "Franceville" },
  { sigle: "USS", nom: "Université des Sciences de la Santé", ville: "Libreville" },
];

function Apropos() {
  return (
    <SiteLayout>
      <div className="h-1 gabon-stripe" aria-hidden="true" />
      <PageHeader
        Icon={Landmark}
        accent="navy"
        image="/heroes/hero-apropos.png"
        eyebrow="Institution"
        title="À propos de BiblioGabon."
        description="Une initiative académique gabonaise pour rassembler, préserver et diffuser le savoir universitaire du pays."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "À propos" }]}
      />

      {/* Histoire */}
      <section className="border-b border-border">
        <div className="container-editorial py-16 grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green mb-4">
              Notre histoire
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight leading-tight">
              Né d'un projet étudiant, devenu une ambition nationale.
            </h2>
          </div>
          <div className="space-y-6 text-foreground/85 leading-[1.75] text-[17px]">
            <p>
              BiblioGabon est né d'un constat simple : moins de{" "}
              <strong className="text-navy">5 %</strong> des publications des chercheurs gabonais
              sont accessibles en ligne, tandis que plus de{" "}
              <strong className="text-navy">100 000 étudiants</strong> du pays cherchent chaque jour
              des ressources académiques adaptées à leur contexte.
            </p>
            <p>
              Le projet a d'abord pris forme au sein de l'
              <strong className="text-navy">EAU-TECH</strong> (École des Applications Universitaires
              et Technologiques), avant d'être porté et développé par des ingénieurs et enseignants
              formés à l'<strong className="text-navy">EMIG</strong> (École Militaire d'Ingénierie
              du Gabon). De cette rencontre entre rigueur d'ingénierie et exigence académique est
              née une plateforme pensée pour durer : rapide, sobre, et résolument gabonaise.
            </p>
            <p>
              Notre plateforme regroupe livres, cours, thèses, mémoires, articles scientifiques et
              sujets d'examens produits par les enseignants des universités et grandes écoles
              gabonaises. L'accès y est <strong className="text-navy">100 % gratuit</strong> pour
              les étudiants et enseignants, dans une logique de{" "}
              <strong className="text-navy">souveraineté documentaire</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Mission — 3 universités */}
      <section className="bg-muted/40 border-b border-border section-halo">
        <div className="container-editorial py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-4">
            Notre mission
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight max-w-2xl">
            Archiver et faire rayonner le savoir des grandes universités du Gabon.
          </h2>
          <p className="mt-5 max-w-2xl text-foreground/80 leading-relaxed">
            BiblioGabon s'engage à archiver durablement les productions académiques des trois
            grandes universités du pays, en partenariat avec leurs enseignants-chercheurs.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {UNIVERSITES.map((u) => (
              <div
                key={u.sigle}
                className="rounded-2xl border border-border bg-card p-6 shadow-editorial"
              >
                <p className="font-display text-2xl font-bold text-navy">{u.sigle}</p>
                <p className="mt-2 text-sm font-medium text-foreground/90">{u.nom}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {u.ville}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="border-b border-border">
        <div className="container-editorial py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green mb-4">
            Nos valeurs
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight mb-10 max-w-2xl">
            Les principes qui guident chaque décision.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALEURS.map((v) => (
              <div
                key={v.titre}
                className="group rounded-2xl border border-border p-7 hover:shadow-editorial-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-green-soft text-green group-hover:bg-green group-hover:text-white transition-colors">
                  <v.Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy">{v.titre}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources libres — partenaires */}
      <section>
        <div className="container-editorial py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-4">
            Partenaires de ressources ouvertes
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight mb-3 max-w-2xl">
            Nous nous appuyons sur les meilleures plateformes éducatives libres.
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            En complément des productions locales, BiblioGabon référence des ressources pédagogiques
            ouvertes issues d'institutions reconnues à l'international.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOURCES_LIBRES.map((s) => (
              <a
                key={s.nom}
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-xl border border-border bg-card p-5 hover:border-gold/60 hover:shadow-editorial transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="flex items-start justify-between">
                  <p className="font-display font-semibold text-navy">{s.nom}</p>
                  <ExternalLink className="size-4 text-muted-foreground group-hover:text-gold transition-colors shrink-0" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
