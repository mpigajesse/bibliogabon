import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye,
  Lock,
  FileText,
  BookOpen,
  GraduationCap,
  ScrollText,
  FlaskConical,
  ClipboardList,
  BadgeCheck,
} from "lucide-react";
import type { Document, DocumentType, Niveau } from "@/data/documents";
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

const NIVEAU_STYLE: Record<Niveau, string> = {
  Licence: "bg-green-soft text-green border-green/20",
  Master: "bg-[oklch(0.96_0.06_88)] text-[oklch(0.42_0.13_82)] border-gold/30",
  Doctorat: "bg-navy text-white border-navy/40",
  "Tous niveaux": "bg-white/95 text-navy border-navy/10",
};

const LANGUE_LABEL: Record<"fr" | "en", string> = { fr: "FR", en: "EN" };

const COVER_BG: Record<"navy" | "green" | "gold", string> = {
  navy: "bg-gradient-to-br from-[oklch(0.32_0.09_258)] via-navy to-navy-deep",
  green: "bg-gradient-to-br from-[oklch(0.5_0.13_152)] via-[oklch(0.4_0.11_155)] to-navy-deep",
  gold: "bg-gradient-to-br from-[oklch(0.6_0.14_74)] via-[oklch(0.45_0.13_78)] to-navy-deep",
};

export function DocumentCard({ doc }: { doc: Document }) {
  const dom = domaineBySlug(doc.domaineSlug);
  const meta = TYPE_META[doc.type];
  const Icon = meta.Icon;
  const coverBg = COVER_BG[dom?.couleur ?? "navy"];

  // Couverture réelle (livre) ou image thématique du domaine ; repli généré si absente.
  const isBookCover = Boolean(doc.cover);
  const [src, setSrc] = useState(doc.cover ?? `/covers/domaines/${doc.domaineSlug}.png`);
  const [triedAlt, setTriedAlt] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  const onImgError = () => {
    if (!triedAlt) {
      const alt = src.endsWith(".png")
        ? src.replace(/\.png$/, ".jpg")
        : src.replace(/\.jpe?g$/, ".png");
      if (alt !== src) {
        setTriedAlt(true);
        setSrc(alt);
        return;
      }
    }
    setImgOk(false);
  };

  return (
    <Link
      to="/document/$id"
      params={{ id: doc.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-editorial hover:shadow-editorial-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-all duration-200"
    >
      <div className={`relative aspect-[4/3] overflow-hidden pixel-grid-bg ${coverBg}`}>
        <span
          className="absolute top-0 inset-x-0 z-20 h-[3px] gabon-stripe opacity-90"
          aria-hidden
        />

        {imgOk ? (
          <>
            <img
              src={src}
              alt={`Couverture — ${doc.titre}`}
              onError={onImgError}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/10"
              aria-hidden
            />
            {!isBookCover && (
              <div className="absolute inset-x-0 bottom-0 p-4">
                <Icon className="mb-1.5 size-6 text-white/90" strokeWidth={1.6} aria-hidden />
                <p className="font-display text-[15px] font-semibold leading-snug text-white line-clamp-2 drop-shadow">
                  {doc.titre}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <Icon
              className="absolute -right-5 -bottom-5 size-36 text-white/10"
              strokeWidth={1}
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-center p-5">
              <Icon className="mb-2.5 size-8 text-white/80" strokeWidth={1.5} aria-hidden />
              <p className="font-display text-[15px] font-semibold leading-snug text-white line-clamp-3">
                {doc.titre}
              </p>
            </div>
          </>
        )}

        <div className="absolute top-4 left-3 z-10 flex flex-col items-start gap-1.5">
          {dom && <DomainBadge domaine={dom} />}
        </div>
        <div className="absolute top-4 right-3 z-10 flex flex-col items-end gap-1.5">
          {doc.niveau && (
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur ${NIVEAU_STYLE[doc.niveau]}`}
            >
              {doc.niveau}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-black/40 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white">
            <Lock className="size-3" /> Connexion requise
          </span>
        </div>
        <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-navy">
          <Icon className="size-3" /> {meta.label}
        </div>
        {doc.langue && (
          <span className="absolute bottom-3 right-3 z-10 inline-flex items-center rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold tracking-wider text-navy/70">
            {LANGUE_LABEL[doc.langue]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-navy leading-snug line-clamp-2 group-hover:text-green transition-colors">
          {doc.titre}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-1">{doc.auteur}</p>
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">{doc.annee}</span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" /> {doc.vues} vues
          </span>
        </div>
        {doc.source && (
          <div className="mt-3 -mx-5 -mb-5 flex items-center gap-1.5 border-t border-border bg-green-soft px-5 py-2.5 text-[11px] font-medium text-green">
            <BadgeCheck className="size-3.5 shrink-0" />
            <span className="truncate">Source · {doc.source.nom}</span>
          </div>
        )}
      </div>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
    </Link>
  );
}
