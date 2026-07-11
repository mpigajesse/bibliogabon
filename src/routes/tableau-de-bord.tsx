import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { DocumentCard } from "@/components/site/DocumentCard";
import { DOCUMENTS, documentById, type Document } from "@/data/documents";
import { Heart, Download, Clock, BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";

export const Route = createFileRoute("/tableau-de-bord")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — BiblioGabon" },
      {
        name: "description",
        content: "Vos favoris, votre historique de lecture et vos téléchargements sur BiblioGabon.",
      },
      { property: "og:title", content: "Tableau de bord — BiblioGabon" },
      { property: "og:description", content: "Votre espace membre BiblioGabon." },
    ],
  }),
  component: Dashboard,
});

const resoudre = (ids: string[]): Document[] =>
  ids.map((id) => documentById(id)).filter((d): d is Document => Boolean(d));

function Dashboard() {
  const navigate = useNavigate();
  const { compte, initialise, deconnecter } = useAuth();

  useEffect(() => {
    if (initialise && !compte) {
      navigate({ to: "/connexion" });
    }
  }, [initialise, compte, navigate]);

  if (!initialise || !compte) {
    return (
      <SiteLayout>
        <div className="container-editorial py-24 text-center text-muted-foreground">
          Chargement de votre espace…
        </div>
      </SiteLayout>
    );
  }

  const favoris = resoudre(compte.favoris);
  const historique = resoudre(compte.historique);
  const telecharges = resoudre(compte.telechargements);

  const handleLogout = () => {
    deconnecter();
    navigate({ to: "/" });
  };

  return (
    <SiteLayout>
      <div className="h-1 gabon-stripe" aria-hidden="true" />
      <PageHeader
        eyebrow={compte.role === "enseignant" ? "Espace enseignant" : "Espace étudiant"}
        title={`Bonjour ${compte.nom.split(" ")[0]}, bienvenue dans votre bibliothèque.`}
        description={`${compte.filiere ?? ""} · ${compte.universite}`}
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Tableau de bord" }]}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <StatCard Icon={Heart} value={favoris.length} label="Favoris" />
          <StatCard Icon={Clock} value={historique.length} label="Récemment lus" />
          <StatCard Icon={Download} value={telecharges.length} label="Téléchargés" />
          <StatCard Icon={BookOpen} value={compte.role === "enseignant" ? 6 : 2} label="En cours" />
        </div>
        <div className="mt-5">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-border hover:border-gold hover:text-navy"
          >
            <LogOut className="size-4 mr-1.5" /> Se déconnecter
          </Button>
        </div>
      </PageHeader>
      <Section title="Mes favoris" viewAll="Tous mes favoris" docs={favoris} />
      <Section
        title="Récemment consultés"
        viewAll="Voir l'historique"
        docs={historique}
        tone="muted"
      />
      <Section title="Mes téléchargements" viewAll="Tous mes téléchargements" docs={telecharges} />
      <section className="border-t border-border section-halo">
        <div className="container-editorial py-14 text-center">
          <p className="text-muted-foreground">Envie de découvrir de nouveaux documents ?</p>
          <Button asChild size="lg" className="mt-4 bg-navy text-white hover:bg-navy-deep">
            <Link to="/domaines">Explorer les 17 domaines</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}

function StatCard({ Icon, value, label }: { Icon: typeof Heart; value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3 shadow-editorial">
      <div className="flex size-10 items-center justify-center rounded-lg bg-navy-soft text-navy">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="font-display text-2xl font-bold text-navy leading-none">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Section({
  title,
  viewAll,
  docs,
  tone,
}: {
  title: string;
  viewAll: string;
  docs: typeof DOCUMENTS;
  tone?: "muted";
}) {
  return (
    <section className={tone === "muted" ? "bg-muted/40 border-y border-border" : ""}>
      <div className="container-editorial py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-navy">{title}</h2>
          <a href="#" className="text-sm text-navy hover:text-gold">
            {viewAll} →
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {docs.map((d) => (
            <DocumentCard key={d.id} doc={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
