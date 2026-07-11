import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EmptyState } from "@/components/site/EmptyState";
import { Button } from "@/components/ui/button";
import { documentById } from "@/data/documents";
import { domaineBySlug } from "@/data/domaines";
import { genererSections, genererHtml, slugifier } from "@/lib/document-content";
import { useAuth } from "@/components/auth/AuthProvider";
import { ArrowLeft, Download, Lock, BookOpenText } from "lucide-react";

export const Route = createFileRoute("/lecture/$id")({
  loader: ({ params }) => {
    const doc = documentById(params.id);
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Lecture — ${loaderData?.doc.titre ?? "Document"} — BiblioGabon` }],
  }),
  component: Lecteur,
});

function Lecteur() {
  const { doc } = Route.useLoaderData();
  const dom = domaineBySlug(doc.domaineSlug);
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

  if (!initialise) {
    return (
      <SiteLayout>
        <div className="container-editorial py-24 text-center text-muted-foreground">
          Ouverture du lecteur…
        </div>
      </SiteLayout>
    );
  }

  if (!compte) {
    return (
      <SiteLayout>
        <div className="h-1 gabon-stripe" aria-hidden />
        <section>
          <div className="container-editorial py-16">
            <EmptyState
              title="Lecture réservée aux membres"
              description="Connectez-vous avec un compte étudiant ou enseignant pour lire ce document en ligne."
            />
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-navy text-white hover:bg-navy-deep">
                <Link to="/connexion">
                  <Lock className="size-4 mr-1.5" /> Se connecter
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-navy/20">
                <Link to="/document/$id" params={{ id: doc.id }}>
                  Retour au document
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const sections = genererSections(doc);
  const estLivre = Boolean(doc.fichier);

  return (
    <SiteLayout>
      <div className="h-1 gabon-stripe" aria-hidden />
      <div className="border-b border-border bg-surface-alt">
        <div className="container-editorial flex flex-wrap items-center justify-between gap-3 py-4">
          <Link
            to="/document/$id"
            params={{ id: doc.id }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy transition"
          >
            <ArrowLeft className="size-4" /> Retour au document
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpenText className="size-4 text-green" />
            Connecté : <span className="font-medium text-foreground">{compte.nom}</span>
          </div>
          <Button size="sm" onClick={telecharger} className="bg-navy text-white hover:bg-navy-deep">
            <Download className="size-4 mr-1.5" /> Télécharger{estLivre ? " (EPUB)" : ""}
          </Button>
        </div>
      </div>

      <article className="container-editorial max-w-3xl py-12 md:py-16">
        {dom && (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green">{dom.nom}</p>
        )}
        <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy tracking-tight leading-tight">
          {doc.titre}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {doc.auteur} · {doc.annee}
          {doc.niveau ? ` · ${doc.niveau}` : ""}
          {doc.pages ? ` · ${doc.pages} pages` : ""}
        </p>
        <div className="mt-4 h-1 w-16 gabon-rule" aria-hidden />

        {estLivre && (
          <div className="mt-8 rounded-xl border border-green/25 bg-green-soft/60 p-4 text-sm text-green">
            Ouvrage complet disponible au format EPUB. Utilisez le
            bouton « Télécharger » pour l'obtenir. Ci-dessous, une présentation de l'ouvrage.
          </div>
        )}

        <div className="mt-8 space-y-8">
          {sections.map((s) => (
            <section key={s.titre}>
              <h2 className="font-display text-xl font-semibold text-navy">{s.titre}</h2>
              <div className="mt-2 space-y-3 text-[1.0625rem] leading-relaxed text-foreground/90">
                {s.paragraphes.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-6">
          <Button onClick={telecharger} className="bg-navy text-white hover:bg-navy-deep">
            <Download className="size-4 mr-1.5" /> Télécharger{estLivre ? " (EPUB)" : " (HTML)"}
          </Button>
          <Button asChild variant="outline" className="border-navy/20">
            <Link to="/document/$id" params={{ id: doc.id }}>
              Retour au document
            </Link>
          </Button>
        </div>
      </article>
    </SiteLayout>
  );
}
