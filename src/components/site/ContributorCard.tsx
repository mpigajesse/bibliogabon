import { Link } from "@tanstack/react-router";
import { Eye, Download, FileStack, Landmark } from "lucide-react";
import type { Contributeur } from "@/data/contributeurs";

export function ContributorCard({ c }: { c: Contributeur }) {
  return (
    <Link
      to="/enseignant/$id"
      params={{ id: c.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-editorial hover:shadow-editorial-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-all p-6"
    >
      <span
        className="absolute top-0 inset-x-0 h-[3px] gabon-stripe scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
        aria-hidden
      />
      <div className="flex items-start gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold text-white shadow-editorial"
          style={{ background: "linear-gradient(135deg, var(--navy), var(--green))" }}
          aria-hidden
        >
          {c.initiales}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold text-navy leading-tight group-hover:text-green transition-colors">
            {c.nom}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-green">{c.titre}</p>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{c.specialite}</p>
          <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground/80">
            <Landmark className="size-3 shrink-0" />
            <span className="line-clamp-1">{c.universite}</span>
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <FileStack className="size-3.5" />
          {c.docs} Docs
        </span>
        <span className="inline-flex items-center gap-1">
          <Download className="size-3.5" />
          {c.telechargements} DL
        </span>
        <span className="inline-flex items-center gap-1">
          <Eye className="size-3.5" />
          {c.vues} Vues
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.types.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
