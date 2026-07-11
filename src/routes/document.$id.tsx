import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { DocumentCard } from "@/components/site/DocumentCard";
import { DocumentCover } from "@/components/site/DocumentCover";
import { DomainBadge } from "@/components/site/DomainBadge";
import { EmptyState } from "@/components/site/EmptyState";
import { Button } from "@/components/ui/button";
import {
  documentById,
  documentsSimilaires,
  type Document,
  type DocumentType,
} from "@/data/documents";
import { domaineBySlug } from "@/data/domaines";
import { contributeurById } from "@/data/contributeurs";
import { useAuth } from "@/components/auth/AuthProvider";
import { genererHtml, slugifier } from "@/lib/document-content";
import {
  Lock,
  Download,
  Eye,
  Calendar,
  FileText,
  User,
  BookOpen,
  GraduationCap,
  ScrollText,
  FlaskConical,
  ClipboardList,
  ExternalLink,
  ShieldCheck,
  Languages,
  Layers,
  Info,
} from "lucide-react";

const TYPE_META: Record<DocumentType, { label: string; Icon: typeof BookOpen }> = {
  article: { label: "Article", Icon: FlaskConical },
  cours: { label: "Cours", Icon: GraduationCap },
  livre: { label: "Livre", Icon: BookOpen },
  examen: { label: "Examen", Icon: ClipboardList },
  these: { label: "Thèse", Icon: ScrollText },
  "td-tp": { label: "TD / TP", Icon: FileText },
};

export const Route = createFileRoute("/document/$id")({
  loader: ({ params }) => {
    const doc = documentById(params.id);
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.doc.titre ?? "Document"} — BiblioGabon` },
      { name: "description", content: loaderData?.doc.resume ?? "Document académique." },
      { property: "og:title", content: `${loaderData?.doc.titre} — BiblioGabon` },
      { property: "og:description", content: loaderData?.doc.resume ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Catalogue"
        title="Document introuvable"
        description="Cette référence n'existe pas — ou plus — dans notre catalogue."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Document" }]}
      />
      <section>
        <div className="container-editorial py-12">
          <EmptyState
            title="Aucun document à cette adresse"
            description="Le document que vous cherchez a peut-être été déplacé ou retiré du catalogue."
          />
          <div className="mt-6">
            <Button asChild variant="outline" className="border-navy/20">
              <Link to="/">← Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <PageHeader title="Erreur de chargement" description={error.message} />
    </SiteLayout>
  ),
  component: DocumentDetail,
});

function DocumentDetail() {
  const { doc } = Route.useLoaderData();
  const dom = domaineBySlug(doc.domaineSlug);
  const auteur = contributeurById(doc.auteurId);
  const similaires = documentsSimilaires(doc, 3);
  const meta = TYPE_META[doc.type];
  const TypeIcon = meta.Icon;

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border hero-gradient">
        <div className="absolute inset-x-0 top-0 gabon-stripe h-1" aria-hidden />
        <div className="container-editorial py-12 md:py-16 grid lg:grid-cols-[minmax(0,320px)_1fr] gap-10 lg:gap-14">
          <div className="mx-auto w-full max-w-[320px] lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-editorial-lg">
              <DocumentCover doc={doc} showTitle={false} />
              <span className="absolute top-0 inset-x-0 z-10 h-1 gabon-stripe" aria-hidden />
              <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy">
                <TypeIcon className="size-3.5" aria-hidden /> {meta.label}
              </span>
              <span className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-center gap-1.5 rounded-full bg-black/45 backdrop-blur px-3 py-1.5 text-[11px] font-medium text-white">
                <Lock className="size-3.5" aria-hidden /> Accès réservé
              </span>
            </div>
          </div>

          <div className="min-w-0">
            {dom && <DomainBadge domaine={dom} size="md" />}
            <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold text-navy tracking-tight leading-[1.1]">
              {doc.titre}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <Link
                to="/enseignant/$id"
                params={{ id: doc.auteurId }}
                className="inline-flex items-center gap-1.5 font-medium text-navy hover:text-green transition-colors underline-offset-4 hover:underline"
              >
                <User className="size-4" aria-hidden /> {doc.auteur}
              </Link>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" aria-hidden /> {doc.annee}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye className="size-4" aria-hidden /> {doc.vues} vues
              </span>
              {doc.pages && (
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="size-4" aria-hidden /> {doc.pages} pages
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {doc.niveau && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green/25 bg-green-soft px-3 py-1 text-xs font-medium text-green">
                  <Layers className="size-3.5" aria-hidden /> {doc.niveau}
                </span>
              )}
              {doc.langue && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-navy-soft px-3 py-1 text-xs font-medium text-navy">
                  <Languages className="size-3.5" aria-hidden />{" "}
                  {doc.langue === "fr" ? "Français" : "Anglais"}
                </span>
              )}
            </div>

            <p className="mt-6 text-lg text-foreground/85 leading-relaxed max-w-3xl">
              {doc.resume}
            </p>

            <AccesDocument doc={doc} />

            {doc.source && (
              <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-surface-alt p-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-soft text-navy">
                    <Info className="size-4.5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Source documentaire — à titre informatif
                    </p>
                    <p className="mt-1 font-display font-semibold text-navy">{doc.source.nom}</p>
                    {doc.source.licence && (
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        Licence : {doc.source.licence}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Cette référence est fournie à titre indicatif. La consultation se fait
                      directement sur BiblioGabon après connexion.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {auteur && (
        <section>
          <div className="container-editorial py-12 md:py-14">
            <h2 className="font-display text-2xl font-semibold text-navy">À propos de l'auteur</h2>
            <Link
              to="/enseignant/$id"
              params={{ id: auteur.id }}
              className="mt-5 flex items-start gap-4 max-w-3xl rounded-2xl border border-border p-6 shadow-editorial hover:shadow-editorial-lg hover:-translate-y-0.5 transition-all"
            >
              <div
                className="size-14 shrink-0 rounded-xl flex items-center justify-center font-display font-bold text-white"
                style={{ background: "linear-gradient(135deg, var(--navy), var(--green))" }}
                aria-hidden
              >
                {auteur.initiales}
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-navy">{auteur.nom}</p>
                <p className="text-sm text-green">
                  {auteur.titre} · {auteur.specialite}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{auteur.bio}</p>
                <span className="mt-3 inline-block text-sm font-medium text-navy">
                  Voir son profil →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {similaires.length > 0 && (
        <section className="border-t border-border section-halo">
          <div className="container-editorial py-12 md:py-14">
            <h2 className="font-display text-2xl font-semibold text-navy mb-6">
              Documents similaires
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {similaires.map((d) => (
                <DocumentCard key={d.id} doc={d} />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

function AccesDocument({ doc }: { doc: Document }) {
  const { compte, initialise } = useAuth();

  const telecharger = () => {
    if (doc.fichier) {
      const a = document.createElement("a");
      a.href = doc.fichier;
      a.download = "";
      a.click();
      return;
    }
    const blob = new Blob([genererHtml(doc)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugifier(doc.titre)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const estLivre = Boolean(doc.fichier);

  if (!initialise) {
    return <div className="mt-8 h-12 w-64 animate-pulse rounded-lg bg-muted" aria-hidden />;
  }

  if (!compte) {
    return (
      <>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-navy text-white hover:bg-navy-deep">
            <Link to="/connexion">
              <Lock className="size-4 mr-1.5" aria-hidden /> Lire — Connexion requise
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-navy/20">
            <Link to="/connexion">
              <Download className="size-4 mr-1.5" aria-hidden /> Télécharger
            </Link>
          </Button>
        </div>
        <div className="mt-6 rounded-xl border border-gold/30 bg-[oklch(0.98_0.05_88)] p-4 text-sm text-[oklch(0.35_0.12_60)]">
          La lecture et le téléchargement sont réservés aux étudiants et
          enseignants inscrits.{" "}
          <Link
            to="/inscription"
            className="font-semibold underline hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
          >
            Créer un compte gratuit
          </Link>
          .
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg" className="bg-navy text-white hover:bg-navy-deep">
          <Link to="/lecture/$id" params={{ id: doc.id }}>
            <Eye className="size-4 mr-1.5" aria-hidden /> Lire en ligne
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="border-navy/20" onClick={telecharger}>
          <Download className="size-4 mr-1.5" aria-hidden /> Télécharger{estLivre ? " (EPUB)" : ""}
        </Button>
      </div>
      <div className="mt-6 rounded-xl border border-green/25 bg-green-soft/60 p-4 text-sm text-green">
        Connecté en tant que{" "}
        <span className="font-semibold">{compte.nom}</span> — lecture et téléchargement débloqués.
      </div>
    </>
  );
}
