import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { DocumentCard } from "@/components/site/DocumentCard";
import { DOCUMENTS } from "@/data/documents";
import { Heart, Download, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tableau-de-bord")({
  head: () => ({ meta: [
    { title: "Tableau de bord — BiblioGabon" },
    { name: "description", content: "Vos favoris, votre historique de lecture et vos téléchargements sur BiblioGabon." },
    { property: "og:title", content: "Tableau de bord — BiblioGabon" },
    { property: "og:description", content: "Votre espace membre BiblioGabon." },
  ] }),
  component: Dashboard,
});

function Dashboard() {
  const favoris = DOCUMENTS.slice(0, 3);
  const historique = DOCUMENTS.slice(3, 6);
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Espace membre"
        title="Bienvenue dans votre bibliothèque personnelle."
        description="Retrouvez vos favoris, votre historique de lecture et vos téléchargements."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Tableau de bord" }]}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <StatCard Icon={Heart} value={3} label="Favoris" />
          <StatCard Icon={Clock} value={12} label="Récemment lus" />
          <StatCard Icon={Download} value={5} label="Téléchargés" />
          <StatCard Icon={BookOpen} value={2} label="En cours" />
        </div>
      </PageHeader>
      <Section title="Favoris" viewAll="Tous mes favoris" docs={favoris} />
      <Section title="Récemment consultés" viewAll="Voir l'historique" docs={historique} tone="muted" />
      <section className="border-t border-border">
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
    <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-lg bg-navy-soft text-navy"><Icon className="size-4" /></div>
      <div>
        <p className="font-display text-2xl font-bold text-navy leading-none">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Section({ title, viewAll, docs, tone }: { title: string; viewAll: string; docs: typeof DOCUMENTS; tone?: "muted" }) {
  return (
    <section className={tone === "muted" ? "bg-muted/40 border-y border-border" : ""}>
      <div className="container-editorial py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-navy">{title}</h2>
          <a href="#" className="text-sm text-navy hover:text-gold">{viewAll} →</a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {docs.map((d) => <DocumentCard key={d.id} doc={d} />)}
        </div>
      </div>
    </section>
  );
}
