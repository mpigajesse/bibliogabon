import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { DocumentCard } from "@/components/site/DocumentCard";
import { DomainBadge } from "@/components/site/DomainBadge";
import { Button } from "@/components/ui/button";
import { DOCUMENTS, documentById } from "@/data/documents";
import { domaineBySlug } from "@/data/domaines";
import { contributeurById } from "@/data/contributeurs";
import { Lock, Download, Eye, Calendar, FileText, User } from "lucide-react";

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
    <SiteLayout><PageHeader title="Document introuvable" description="Cette référence n'existe pas dans notre catalogue." /></SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout><PageHeader title="Erreur de chargement" description={error.message} /></SiteLayout>
  ),
  component: DocumentDetail,
});

function DocumentDetail() {
  const { doc } = Route.useLoaderData();
  const dom = domaineBySlug(doc.domaineSlug);
  const auteur = contributeurById(doc.auteurId);
  const similaires = DOCUMENTS.filter((d) => d.domaineSlug === doc.domaineSlug && d.id !== doc.id).slice(0, 3);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-muted/50">
        <div className="container-editorial py-12 grid lg:grid-cols-[1fr_1.5fr] gap-10">
          <div className="rounded-2xl bg-gradient-to-br from-navy via-navy-deep to-navy pixel-grid-bg aspect-[3/4] shadow-editorial-lg flex items-center justify-center">
            <FileText className="size-24 text-white/25" strokeWidth={1} />
          </div>
          <div>
            {dom && <DomainBadge domaine={dom} size="md" />}
            <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold text-navy tracking-tight leading-tight">{doc.titre}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <Link to="/enseignant/$id" params={{ id: doc.auteurId }} className="inline-flex items-center gap-1.5 hover:text-navy transition">
                <User className="size-4" /> {doc.auteur}
              </Link>
              <span className="inline-flex items-center gap-1.5"><Calendar className="size-4" /> {doc.annee}</span>
              <span className="inline-flex items-center gap-1.5"><Eye className="size-4" /> {doc.vues} vues</span>
              {doc.pages && <span className="inline-flex items-center gap-1.5"><FileText className="size-4" /> {doc.pages} pages</span>}
            </div>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">{doc.resume}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-navy text-white hover:bg-navy-deep"><Lock className="size-4 mr-1.5" /> Lire — Connexion requise</Button>
              <Button size="lg" variant="outline" className="border-navy/15"><Download className="size-4 mr-1.5" /> Télécharger</Button>
            </div>
            <div className="mt-6 rounded-xl border border-gold/30 bg-[oklch(0.98_0.05_88)] p-4 text-sm text-[oklch(0.35_0.12_60)]">
              🔒 L'accès au fichier complet est réservé aux étudiants et enseignants inscrits.{" "}
              <Link to="/inscription" className="font-semibold underline hover:text-navy">Créer un compte gratuit</Link>.
            </div>
          </div>
        </div>
      </section>

      {auteur && (
        <section>
          <div className="container-editorial py-12">
            <h2 className="font-display text-2xl font-semibold text-navy">À propos de l'auteur</h2>
            <div className="mt-5 rounded-2xl border border-border p-6 flex items-start gap-4 max-w-3xl">
              <div className="size-14 rounded-xl flex items-center justify-center font-display font-bold text-white" style={{ background: "linear-gradient(135deg, var(--navy), var(--green))" }}>
                {auteur.initiales}
              </div>
              <div>
                <p className="font-display font-semibold text-navy">{auteur.nom}</p>
                <p className="text-sm text-green">{auteur.titre} · {auteur.specialite}</p>
                <p className="mt-2 text-sm text-muted-foreground">{auteur.bio}</p>
                <Link to="/enseignant/$id" params={{ id: auteur.id }} className="mt-3 inline-block text-sm font-medium text-navy hover:text-gold">Voir son profil →</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {similaires.length > 0 && (
        <section className="bg-muted/40 border-t border-border">
          <div className="container-editorial py-12">
            <h2 className="font-display text-2xl font-semibold text-navy mb-6">Documents similaires</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {similaires.map((d) => <DocumentCard key={d.id} doc={d} />)}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
