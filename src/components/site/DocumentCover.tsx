import { useState } from "react";
import {
  FileText,
  BookOpen,
  GraduationCap,
  ScrollText,
  FlaskConical,
  ClipboardList,
} from "lucide-react";
import type { Document, DocumentType } from "@/data/documents";
import { domaineBySlug } from "@/data/domaines";

const TYPE_ICON: Record<DocumentType, typeof BookOpen> = {
  article: FlaskConical,
  cours: GraduationCap,
  livre: BookOpen,
  examen: ClipboardList,
  these: ScrollText,
  "td-tp": FileText,
};

const COVER_BG: Record<"navy" | "green" | "gold", string> = {
  navy: "bg-gradient-to-br from-[oklch(0.32_0.09_258)] via-navy to-navy-deep",
  green: "bg-gradient-to-br from-[oklch(0.5_0.13_152)] via-[oklch(0.4_0.11_155)] to-navy-deep",
  gold: "bg-gradient-to-br from-[oklch(0.6_0.14_74)] via-[oklch(0.45_0.13_78)] to-navy-deep",
};

/**
 * Rend la couverture d'un document en couches absolues (à placer dans un parent `relative`).
 * Chaîne de repli : jaquette explicite -> image du document -> image du domaine -> visuel généré.
 */
export function DocumentCover({
  doc,
  showTitle = true,
  titleClassName = "font-display text-[15px] font-semibold leading-snug text-white line-clamp-3",
}: {
  doc: Document;
  showTitle?: boolean;
  titleClassName?: string;
}) {
  const dom = domaineBySlug(doc.domaineSlug);
  const Icon = TYPE_ICON[doc.type];
  const bg = COVER_BG[dom?.couleur ?? "navy"];

  const candidats = [
    doc.cover,
    `/covers/docs/${doc.id}.png`,
    `/covers/docs/${doc.id}.jpg`,
    `/covers/domaines/${doc.domaineSlug}.png`,
    `/covers/domaines/${doc.domaineSlug}.jpg`,
  ].filter((c): c is string => Boolean(c));

  const [idx, setIdx] = useState(0);
  const imgOk = idx < candidats.length;
  const src = candidats[idx];
  const estJaquetteLivre = Boolean(doc.cover) && idx === 0;

  return (
    <>
      <div className={`absolute inset-0 ${bg}`} aria-hidden />
      {imgOk ? (
        <>
          <img
            src={src}
            alt={`Couverture — ${doc.titre}`}
            onError={() => setIdx((i) => i + 1)}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10"
            aria-hidden
          />
          {showTitle && !estJaquetteLivre && (
            <div className="absolute inset-x-0 bottom-0 p-5">
              <Icon className="mb-2 size-8 text-white/90" strokeWidth={1.5} aria-hidden />
              <p className={titleClassName}>{doc.titre}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <Icon
            className="absolute -right-6 -bottom-6 size-44 text-white/10"
            strokeWidth={1}
            aria-hidden
          />
          {showTitle && (
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <Icon className="mb-3 size-10 text-white/80" strokeWidth={1.4} aria-hidden />
              <p className={titleClassName}>{doc.titre}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
