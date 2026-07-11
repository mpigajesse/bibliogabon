import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Quote,
  GraduationCap,
  BookMarked,
  ChevronRight,
  Globe2,
  BookOpen,
  Users,
  Layers,
  Library,
  MapPin,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DocumentCard } from "@/components/site/DocumentCard";
import { ContributorCard } from "@/components/site/ContributorCard";
import { Button } from "@/components/ui/button";
import { CONTRIBUTEURS } from "@/data/contributeurs";
import { DOCUMENTS, documentsByType, SOURCES_LIBRES } from "@/data/documents";
import { STATS_ACCUEIL, STATS_VISION } from "@/data/stats";
import { DOMAINES } from "@/data/domaines";
import logoUrl from "@/assets/bibliogabon-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BiblioGabon — La Grande Source documentaire du Gabon" },
      {
        name: "description",
        content:
          "Bibliothèque numérique des universités gabonaises : livres, cours, thèses et articles scientifiques en accès libre.",
      },
      { property: "og:title", content: "BiblioGabon — La Grande Source documentaire du Gabon" },
      {
        property: "og:description",
        content: "La bibliothèque numérique nationale des universités du Gabon.",
      },
    ],
  }),
  component: Home,
});

const UNIVERSITES = [
  "Université Omar Bongo",
  "Université des Sciences et Techniques de Masuku",
  "Université de Libreville",
  "INPTIC",
  "EMIG",
];

const DOMAINES_VEDETTE = [
  "informatique-numerique",
  "medecine-sante",
  "sciences-technologies",
  "droit-sciences-politiques",
  "sciences-economiques-gestion",
  "agriculture-environnement",
  "lettres-langues-shs",
];

/** Image de couverture avec repli d'extension (.png → .jpg) puis dégradé. */
function CoverImg({ slug, alt }: { slug: string; alt: string }) {
  const [i, setI] = useState(0);
  const cands = [`/covers/domaines/${slug}.png`, `/covers/domaines/${slug}.jpg`];
  if (i >= cands.length) return null;
  return (
    <img
      src={cands[i]}
      alt={alt}
      onError={() => setI((v) => v + 1)}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
      decoding="async"
    />
  );
}

function Home() {
  const articles = documentsByType("article").slice(0, 4);
  const coursSciences = DOCUMENTS.filter(
    (d) =>
      d.type === "cours" &&
      (d.domaineSlug === "sciences-technologies" ||
        d.domaineSlug === "informatique-numerique" ||
        d.domaineSlug === "medecine-sante"),
  ).slice(0, 4);
  const livres = documentsByType("livre").slice(0, 4);

  return (
    <SiteLayout>
      <Hero />
      <TrustStrip />
      <StatsBand />
      <DomainesBento />
      <FeaturedSection
        eyebrow="À la une"
        title="Articles scientifiques"
        description="Les publications récentes des chercheurs gabonais et africains."
        viewAll="/articles"
        docs={articles}
      />
      <FeaturedSection
        eyebrow="Cours"
        title="Sciences, technologies & santé"
        description="Supports pédagogiques des enseignants des universités du Gabon."
        viewAll="/cours"
        docs={coursSciences}
        tone="muted"
      />
      <FeaturedSection
        eyebrow="Patrimoine"
        title="Livres & grands classiques"
        description="Ouvrages de référence et patrimoine littéraire africain."
        viewAll="/livres"
        docs={livres}
      />
      <SourcesLibres />
      <Contributors />
      <VisionTeaser />
      <JoinCTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative border-b border-border bg-surface-alt">
      <div className="container-editorial relative py-16 md:py-24 lg:py-28 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div>
          <h1
            className="font-display font-bold text-navy leading-[1.02] tracking-tighter"
            style={{ fontSize: "clamp(2.75rem, 5.4vw, 5.25rem)" }}
          >
            La Grande Source
            <br />
            <span className="italic text-green">documentaire</span> du Gabon.
          </h1>
          <div className="mt-5 h-1 w-24 gabon-rule" aria-hidden />
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Des milliers de livres, cours, thèses et articles scientifiques pour les étudiants et
            enseignants des universités gabonaises.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="bg-navy text-white hover:bg-navy-deep">
              <Link to="/domaines">
                Explorer le catalogue <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
            <Link
              to="/enseignants"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold transition"
            >
              Découvrir nos enseignants
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </div>

        <HeroArtwork />
      </div>
    </section>
  );
}

function HeroArtwork() {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="relative hidden lg:block">
      <div className="relative aspect-[4/5] rounded-2xl border border-border bg-navy shadow-editorial-lg overflow-hidden">
        {imgOk ? (
          <img
            src="/heroes/hero-accueil.png"
            alt="Étudiants des universités gabonaises"
            onError={() => setImgOk(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy via-navy-deep to-navy p-12">
            <img src={logoUrl} alt="BiblioGabon" className="w-full max-w-xs object-contain" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
        <span className="absolute top-0 inset-x-0 h-1.5 gabon-stripe" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-display text-lg font-semibold text-white leading-tight">
            Les étudiants des universités du Gabon
          </p>
          <p className="mt-1 text-sm text-white/70">
            Libreville, Franceville, Masuku — réunis autour d'une bibliothèque nationale.
          </p>
        </div>
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-border bg-navy text-white">
      <div className="container-editorial py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          <MapPin className="size-3.5" /> Au service des universités gabonaises
        </span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
          {UNIVERSITES.map((u) => (
            <span key={u} className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-green" />
              {u}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const STAT_ICONS = [BookOpen, Users, Layers, Globe2];

function StatsBand() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="border-b border-border bg-background">
      <div className="container-editorial py-14 md:py-16">
        <div className="grid gap-8 md:grid-cols-[1.2fr_2fr] items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-green">
              <span className="h-3 w-6 rounded-full gabon-stripe" /> Chiffres clés
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-navy leading-tight tracking-tight">
              La bibliothèque en un regard.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              Mode visiteur — parcourez librement. Pour lire et télécharger, connectez-vous ou
              inscrivez-vous gratuitement.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS_ACCUEIL.map((s, i) => {
              const Icon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <div
                  key={s.label}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-editorial hover:shadow-editorial-lg hover:-translate-y-0.5 transition-all"
                  style={{
                    animation: visible ? `count-in 0.6s ease-out ${i * 0.08}s both` : undefined,
                  }}
                >
                  <span className="inline-grid size-9 place-items-center rounded-lg bg-navy-soft text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                    <Icon className="size-4" />
                  </span>
                  <p className="mt-4 font-display text-4xl font-bold text-navy">
                    {s.valeur}
                    {s.suffixe}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DomainesBento() {
  const vedettes = DOMAINES_VEDETTE.map((slug) => DOMAINES.find((d) => d.slug === slug)).filter(
    (d): d is (typeof DOMAINES)[number] => Boolean(d),
  );
  return (
    <section className="border-b border-border bg-background">
      <div className="container-editorial py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-green">
              <Library className="size-3.5" /> Le savoir gabonais par domaine
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-semibold text-navy tracking-tight leading-[1.05]">
              Toutes les disciplines des universités du Gabon.
            </h2>
          </div>
          <Link
            to="/domaines"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold transition shrink-0"
          >
            Voir les 17 domaines
            <ChevronRight className="size-4 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] gap-4">
          {vedettes.map((d, i) => (
            <Link
              key={d.slug}
              to="/domaines/$slug"
              params={{ slug: d.slug }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-navy shadow-editorial hover:shadow-editorial-lg transition-all ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <CoverImg slug={d.slug} alt={d.nom} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-navy/10 group-hover:from-navy-deep/80 transition-colors" />
              <span className="absolute top-0 inset-x-0 h-1 gabon-stripe opacity-90" aria-hidden />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                  {d.documents} documents
                </p>
                <p
                  className={`mt-1 font-display font-semibold text-white leading-tight ${
                    i === 0 ? "text-2xl" : "text-base"
                  }`}
                >
                  {d.nom}
                </p>
                {i === 0 && (
                  <p className="mt-2 text-sm text-white/80 max-w-sm line-clamp-2">
                    {d.description}
                  </p>
                )}
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white/90 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                  Explorer <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSection({
  eyebrow,
  title,
  description,
  viewAll,
  docs,
  tone,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  viewAll: string;
  docs: typeof DOCUMENTS;
  tone?: "muted";
}) {
  return (
    <section className={tone === "muted" ? "bg-muted/50 border-y border-border" : ""}>
      <div className="container-editorial py-16 md:py-20">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-green">
              <span className="h-3 w-6 rounded-full gabon-stripe" /> {eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              {title}
            </h2>
            {description && <p className="mt-2 text-muted-foreground max-w-xl">{description}</p>}
          </div>
          <Link
            to={viewAll}
            className="group hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-navy hover:border-gold hover:text-gold transition shrink-0"
          >
            Voir tout <ChevronRight className="size-4 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {docs.map((d) => (
            <DocumentCard key={d.id} doc={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SourcesLibres() {
  return (
    <section className="border-t border-border bg-surface-alt">
      <div className="container-editorial py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-green">
              <Globe2 className="size-3.5" /> Ressources ouvertes
            </p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-navy tracking-tight">
              Adossé aux grandes plateformes du savoir ouvert.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Chaque document indique, à titre informatif, la source ouverte dont il s'inspire — MOOC,
            archives ouvertes ou manuels sous licence Creative Commons.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SOURCES_LIBRES.map((s) => (
            <div
              key={s.nom}
              className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4 shadow-editorial"
            >
              <span className="font-display text-sm font-semibold text-navy">{s.nom}</span>
              <span className="text-xs text-muted-foreground leading-snug">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contributors() {
  return (
    <section className="border-t border-border">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-10">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-green">
              <span className="h-3 w-6 rounded-full gabon-stripe" /> Nos contributeurs
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              Les enseignants qui enrichissent la bibliothèque.
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed self-end max-w-xl">
            Des professeurs, ingénieurs, docteurs, maîtres-assistants et maîtres de conférences des
            universités gabonaises qui partagent leurs ressources pédagogiques librement.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {CONTRIBUTEURS.slice(0, 3).map((c) => (
            <ContributorCard key={c.id} c={c} />
          ))}
        </div>
        <div className="mt-8">
          <Button
            asChild
            variant="outline"
            className="border-navy/15 hover:border-gold hover:text-navy hover:bg-gold/5"
          >
            <Link to="/enseignants">
              Tous les enseignants <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function VisionTeaser() {
  const [imgOk, setImgOk] = useState(true);
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {imgOk && (
        <img
          src="/heroes/hero-vision.png"
          alt=""
          onError={() => setImgOk(false)}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy/95 to-navy/70" />
      <div className="container-editorial py-20 md:py-24 relative">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-3 w-6 rounded-full gabon-stripe" /> Vision & Impact
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Un pays qui <span className="italic text-gold">produit</span>,{" "}
              <span className="italic text-gold">publie</span> et{" "}
              <span className="italic text-gold">maîtrise</span> son savoir.
            </h2>
            <figure className="mt-8 max-w-xl">
              <Quote className="size-6 text-gold mb-3" />
              <blockquote className="font-display text-xl md:text-2xl italic text-white/90 leading-relaxed">
                « L'accès au savoir n'est pas un luxe : c'est un droit. BiblioGabon en fait une
                réalité concrète. »
              </blockquote>
            </figure>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90">
                <Link to="/vision">
                  Découvrir notre vision <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {STATS_VISION.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition-colors"
              >
                <p className="font-display text-5xl font-bold text-gold leading-none">{s.valeur}</p>
                <p className="mt-3 text-sm text-white/85 leading-relaxed">{s.label}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-white/40">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  return (
    <section className="border-t border-border">
      <div className="container-editorial py-20 md:py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy tracking-tight max-w-3xl mx-auto leading-[1.05]">
          Rejoignez la bibliothèque nationale.
        </h2>
        <div className="mx-auto mt-5 h-1 w-20 gabon-rule" aria-hidden />
        <p className="mt-5 max-w-xl mx-auto text-lg text-muted-foreground">
          Étudiants et enseignants des universités gabonaises — accès 100 % gratuit à toutes les
          ressources académiques.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-navy text-white hover:bg-navy-deep">
            <Link to="/inscription">
              <GraduationCap className="size-4 mr-1.5" /> Je suis étudiant
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-green text-white hover:bg-green/90">
            <Link to="/inscription">
              <BookMarked className="size-4 mr-1.5" /> Je suis enseignant
            </Link>
          </Button>
        </div>
        <div className="mt-14 grid sm:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
          {DOMAINES.slice(0, 3).map((d) => (
            <Link
              key={d.slug}
              to="/domaines/$slug"
              params={{ slug: d.slug }}
              className="group rounded-xl border border-border p-5 hover:border-gold hover:shadow-editorial transition"
            >
              <p className="text-xs uppercase tracking-wider text-green font-semibold">
                {d.documents} documents
              </p>
              <p className="mt-2 font-display font-semibold text-navy group-hover:text-gold transition">
                {d.nom}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
