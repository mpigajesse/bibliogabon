import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, ArrowRight, Sparkles, Quote, GraduationCap, BookMarked, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DocumentCard } from "@/components/site/DocumentCard";
import { ContributorCard } from "@/components/site/ContributorCard";
import { Button } from "@/components/ui/button";
import { CONTRIBUTEURS } from "@/data/contributeurs";
import { DOCUMENTS, documentsByType } from "@/data/documents";
import { STATS_ACCUEIL, STATS_VISION } from "@/data/stats";
import { DOMAINES } from "@/data/domaines";
import logoAsset from "@/assets/bibliogabon-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BiblioGabon — La Grande Source documentaire du Gabon" },
      { name: "description", content: "Bibliothèque numérique des universités gabonaises : livres, cours, thèses et articles scientifiques en accès libre." },
      { property: "og:title", content: "BiblioGabon — La Grande Source documentaire du Gabon" },
      { property: "og:description", content: "La bibliothèque numérique nationale des universités du Gabon." },
    ],
  }),
  component: Home,
});

const HERO_FILTRES = ["Tout", "Livres", "Cours", "Articles", "Examens", "TD/TP", "Thèses"] as const;

function Home() {
  const articles = documentsByType("article").slice(0, 4);
  const coursSciences = DOCUMENTS.filter((d) => d.type === "cours" && (d.domaineSlug === "sciences-technologies" || d.domaineSlug === "informatique-numerique" || d.domaineSlug === "medecine-sante")).slice(0, 4);
  const coursEco = DOCUMENTS.filter((d) => d.type === "cours" && d.domaineSlug === "sciences-economiques-gestion").slice(0, 4);

  return (
    <SiteLayout>
      <Hero />
      <StatsBand />
      <FeaturedSection eyebrow="À la une" title="Articles scientifiques" viewAll="/articles" docs={articles} />
      <FeaturedSection eyebrow="Cours" title="Sciences & Technologies" viewAll="/cours" docs={coursSciences} tone="muted" />
      <FeaturedSection eyebrow="Cours" title="Économie & Gestion" viewAll="/cours" docs={coursEco} />
      <Contributors />
      <VisionTeaser />
      <JoinCTA />
    </SiteLayout>
  );
}

function Hero() {
  const [filter, setFilter] = useState<(typeof HERO_FILTRES)[number]>("Tout");
  return (
    <section className="relative overflow-hidden hero-gradient border-b border-border">
      <div className="absolute inset-0 pixel-grid-bg opacity-40 pointer-events-none" />
      <div className="container-editorial relative py-16 md:py-24 lg:py-28 grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-green/25 bg-green-soft px-3 py-1 text-xs font-semibold text-green">
            <span className="size-1.5 rounded-full bg-green animate-pulse" />
            République Gabonaise · Accès 100 % Libre 🇬🇦
          </div>
          <h1 className="mt-6 font-display font-bold text-navy leading-[1.02] tracking-tighter" style={{ fontSize: "clamp(2.75rem, 5.4vw, 5.25rem)" }}>
            La Grande Source
            <br />
            <span className="italic text-green">documentaire</span> du Gabon.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Des milliers de livres, cours, thèses et articles scientifiques pour les étudiants et enseignants des universités gabonaises.
          </p>

          <div className="mt-8 max-w-2xl">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {HERO_FILTRES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    filter === f
                      ? "bg-navy text-white"
                      : "bg-white/70 border border-border text-foreground/70 hover:text-navy hover:border-gold"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 h-14 rounded-full border border-border bg-background pl-5 pr-2 shadow-editorial focus-within:ring-2 focus-within:ring-gold"
            >
              <Search className="size-5 text-muted-foreground shrink-0" />
              <input
                type="search"
                placeholder={`Chercher dans ${filter.toLowerCase()}…`}
                className="flex-1 h-full bg-transparent outline-none text-[15px] placeholder:text-muted-foreground"
              />
              <Button type="submit" size="lg" className="bg-navy text-white hover:bg-navy-deep rounded-full h-10 px-5">
                Chercher
              </Button>
            </form>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-navy text-white hover:bg-navy-deep">
              <Link to="/domaines">Explorer le catalogue <ArrowRight className="size-4 ml-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy/20 hover:border-gold hover:text-navy hover:bg-gold/5">
              <Link to="/inscription">Créer un compte gratuit</Link>
            </Button>
          </div>
        </div>

        <HeroArtwork />
      </div>
    </section>
  );
}

function HeroArtwork() {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-navy/5 via-transparent to-gold/10 blur-2xl" />
      <div className="relative aspect-square rounded-[2rem] border border-border bg-white/70 backdrop-blur shadow-editorial-lg overflow-hidden">
        <div className="absolute inset-0 pixel-grid-bg opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <img src={logoAsset.url} alt="Logo BiblioGabon" className="w-full max-w-sm object-contain drop-shadow-xl" />
        </div>
        <div className="absolute top-5 left-5 rounded-xl bg-white/95 backdrop-blur px-3 py-2 shadow-editorial text-[11px]">
          <p className="font-display font-semibold text-navy text-sm">17</p>
          <p className="text-muted-foreground">domaines académiques</p>
        </div>
        <div className="absolute bottom-5 right-5 rounded-xl bg-navy text-white px-3 py-2 shadow-editorial-lg text-[11px]">
          <p className="font-display font-semibold text-gold text-sm">📚 Libre</p>
          <p className="text-white/80">accès étudiant</p>
        </div>
        <div className="absolute bottom-5 left-5 rounded-xl bg-green text-white px-3 py-2 shadow-editorial text-[11px]">
          <p className="font-display font-semibold text-sm">🇬🇦 MESRI</p>
          <p className="text-white/80">2023</p>
        </div>
        <PixelDance />
      </div>
    </div>
  );
}

function PixelDance() {
  const cells = Array.from({ length: 18 });
  return (
    <div className="absolute top-8 right-8 grid grid-cols-6 gap-1" aria-hidden>
      {cells.map((_, i) => {
        const c = i % 3 === 0 ? "var(--gold)" : i % 3 === 1 ? "var(--green)" : "var(--navy)";
        return (
          <span
            key={i}
            className="block size-2 rounded-[2px] animate-pixel-drift"
            style={{ background: c, animationDelay: `${(i % 6) * 0.15}s` }}
          />
        );
      })}
    </div>
  );
}

function StatsBand() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="border-b border-border bg-background">
      <div className="container-editorial py-14">
        <div className="grid gap-8 md:grid-cols-[1.2fr_2fr] items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">Chiffres clés</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy leading-tight">La bibliothèque en un regard.</h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              Mode visiteur — parcourez librement. Pour lire et télécharger, connectez-vous ou inscrivez-vous gratuitement.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS_ACCUEIL.map((s, i) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-6 shadow-editorial"
                style={{ animation: visible ? `count-in 0.6s ease-out ${i * 0.08}s both` : undefined }}
              >
                <p className="font-display text-4xl font-bold text-navy">{s.valeur}{s.suffixe}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedSection({
  eyebrow,
  title,
  viewAll,
  docs,
  tone,
}: {
  eyebrow: string;
  title: string;
  viewAll: string;
  docs: typeof DOCUMENTS;
  tone?: "muted";
}) {
  return (
    <section className={tone === "muted" ? "bg-muted/50 border-y border-border" : ""}>
      <div className="container-editorial py-16 md:py-20">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">{eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight">{title}</h2>
          </div>
          <Link to={viewAll} className="group inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold transition">
            Voir tout <ChevronRight className="size-4 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {docs.map((d) => <DocumentCard key={d.id} doc={d} />)}
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">Nos contributeurs</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight">
              Les enseignants qui enrichissent la bibliothèque.
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed self-end max-w-xl">
            Des professeurs, ingénieurs, docteurs, maîtres-assistants et maîtres de conférences des universités
            gabonaises qui partagent leurs ressources pédagogiques librement.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {CONTRIBUTEURS.slice(0, 3).map((c) => <ContributorCard key={c.id} c={c} />)}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline" className="border-navy/15 hover:border-gold hover:text-navy hover:bg-gold/5">
            <Link to="/enseignants">Tous les enseignants <ArrowRight className="size-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function VisionTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 pixel-grid-bg opacity-20 pointer-events-none" />
      <div className="container-editorial py-20 relative">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Vision & Impact</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Un pays qui <span className="italic text-gold">produit</span>,{" "}
              <span className="italic text-gold">publie</span> et <span className="italic text-gold">maîtrise</span> son savoir.
            </h2>
            <figure className="mt-8 max-w-xl">
              <Quote className="size-6 text-gold mb-3" />
              <blockquote className="font-display text-xl italic text-white/90 leading-relaxed">
                « L'accès au savoir n'est pas un luxe : c'est un droit. BiblioGabon en fait une réalité concrète. »
              </blockquote>
            </figure>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90">
                <Link to="/vision">Découvrir notre vision <ArrowRight className="size-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {STATS_VISION.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
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
      <div className="container-editorial py-20 text-center">
        <Sparkles className="mx-auto size-6 text-gold mb-4" />
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy tracking-tight max-w-3xl mx-auto">
          Rejoignez la bibliothèque nationale.
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
          Étudiants et enseignants des universités gabonaises — accès 100 % gratuit à toutes les ressources académiques.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-navy text-white hover:bg-navy-deep">
            <Link to="/inscription"><GraduationCap className="size-4 mr-1.5" /> Je suis étudiant</Link>
          </Button>
          <Button asChild size="lg" className="bg-green text-white hover:bg-green/90">
            <Link to="/inscription"><BookMarked className="size-4 mr-1.5" /> Je suis enseignant</Link>
          </Button>
        </div>
        <div className="mt-14 grid sm:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
          {DOMAINES.slice(0, 3).map((d) => (
            <Link key={d.slug} to="/domaines/$slug" params={{ slug: d.slug }} className="group rounded-xl border border-border p-5 hover:border-gold hover:shadow-editorial transition">
              <p className="text-xs uppercase tracking-wider text-green font-semibold">{d.documents} documents</p>
              <p className="mt-2 font-display font-semibold text-navy group-hover:text-gold transition">{d.nom}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
