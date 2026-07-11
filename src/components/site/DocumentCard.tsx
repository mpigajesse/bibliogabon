import { Link } from "@tanstack/react-router";
import { Eye, Lock, FileText, BookOpen, GraduationCap, ScrollText, FlaskConical, ClipboardList } from "lucide-react";
import type { Document, DocumentType } from "@/data/documents";
import { domaineBySlug } from "@/data/domaines";
import { DomainBadge } from "./DomainBadge";

const TYPE_META: Record<DocumentType, { label: string; Icon: typeof BookOpen }> = {
  article: { label: "Article", Icon: FlaskConical },
  cours: { label: "Cours", Icon: GraduationCap },
  livre: { label: "Livre", Icon: BookOpen },
  examen: { label: "Examen", Icon: ClipboardList },
  these: { label: "Thèse", Icon: ScrollText },
  "td-tp": { label: "TD / TP", Icon: FileText },
};

export function DocumentCard({ doc }: { doc: Document }) {
  const dom = domaineBySlug(doc.domaineSlug);
  const meta = TYPE_META[doc.type];
  const Icon = meta.Icon;

  return (
    <Link
      to="/document/$id"
      params={{ id: doc.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-editorial hover:shadow-editorial-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-navy pixel-grid-bg">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="size-14 text-white/25" strokeWidth={1.2} />
        </div>
        <div className="absolute top-3 left-3">
          {dom && <DomainBadge domaine={dom} />}
        </div>
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/40 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white">
          <Lock className="size-3" /> Connexion requise
        </div>
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-navy">
          <Icon className="size-3" /> {meta.label}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-navy leading-snug line-clamp-2 group-hover:text-green transition-colors">
          {doc.titre}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-1">{doc.auteur}</p>
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">{doc.annee}</span>
          <span className="inline-flex items-center gap-1"><Eye className="size-3.5" /> {doc.vues} vues</span>
        </div>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
    </Link>
  );
}
