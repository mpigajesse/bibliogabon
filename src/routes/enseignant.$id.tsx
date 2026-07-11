import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { DocumentCard } from "@/components/site/DocumentCard";
import { EmptyState } from "@/components/site/EmptyState";
import { Button } from "@/components/ui/button";
import { contributeurById } from "@/data/contributeurs";
import { DOCUMENTS } from "@/data/documents";
import { Eye, Download, FileStack, Building2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/enseignant/$id")({
  loader: ({ params }) => {
    const c = contributeurById(params.id);
    if (!c) throw notFound();
    return { c };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.c.nom ?? "Enseignant"} — BiblioGabon` },
      { name: "description", content: loaderData?.c.bio ?? "" },
      { property: "og:title", content: `${loaderData?.c.nom} — BiblioGabon` },
      { property: "og:description", content: loaderData?.c.bio ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Communauté"
        title="Profil introuvable"
        description="Cet enseignant-chercheur n'existe pas — ou plus — dans notre annuaire."
        crumbs={[
          { label: "Accueil", to: "/" },
          { label: "Enseignants", to: "/enseignants" },
          { label: "Profil" },
        ]}
      />
      <section>
        <div className="container-editorial py-12">
          <EmptyState
            title="Aucun profil à cette adresse"
            description="Retournez à l'annuaire pour retrouver nos enseignants contributeurs."
          />
          <div className="mt-6">
            <Button asChild variant="outline" className="border-navy/20">
              <Link to="/enseignants">
                <ArrowLeft className="size-4 mr-1.5" aria-hidden /> Retour à l'annuaire
              </Link>
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
  component: EnseignantProfil,
});

function EnseignantProfil() {
  const { c } = Route.useLoaderData();
  const docs = DOCUMENTS.filter((d) => d.auteurId === c.id);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 pixel-grid-bg opacity-20" aria-hidden />
        <div className="absolute inset-x-0 top-0 gabon-stripe h-1" aria-hidden />
        <div className="container-editorial py-16 relative grid md:grid-cols-[auto_1fr] gap-8 items-start">
          <div
            className="size-28 rounded-2xl flex items-center justify-center font-display text-4xl font-bold border-4 border-gold shadow-editorial-lg"
            style={{ background: "linear-gradient(135deg, var(--green), var(--navy-deep))" }}
            aria-hidden
          >
            {c.initiales}
          </div>
          <div>
            <Link
              to="/enseignants"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            >
              <ArrowLeft className="size-3.5" aria-hidden /> Tous les enseignants
            </Link>
            <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">
              {c.nom}
            </h1>
            <p className="mt-3 text-lg text-gold font-medium">
              {c.titre} · {c.specialite}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/70">
              <Building2 className="size-4" aria-hidden /> {c.universite}
            </p>
            <p className="mt-5 max-w-2xl text-white/85 leading-relaxed">{c.bio}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <StatPill Icon={FileStack} value={c.docs} label="Documents" />
              <StatPill Icon={Download} value={c.telechargements} label="Téléchargements" />
              <StatPill Icon={Eye} value={c.vues} label="Vues" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-halo">
        <div className="container-editorial py-12 md:py-14">
          <h2 className="font-display text-2xl font-semibold text-navy mb-6">
            Publications ({docs.length})
          </h2>
          {docs.length === 0 ? (
            <EmptyState
              title="Aucun document publié pour l'instant"
              description="Cet enseignant n'a pas encore partagé de ressource dans le catalogue."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((d) => (
                <DocumentCard key={d.id} doc={d} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function StatPill({ Icon, value, label }: { Icon: typeof Eye; value: number; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm">
      <Icon className="size-4 text-gold" aria-hidden />
      <span className="font-semibold">{value}</span>
      <span className="text-white/70">{label}</span>
    </div>
  );
}
