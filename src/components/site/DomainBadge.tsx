import type { Domaine } from "@/data/domaines";

const STYLES: Record<Domaine["couleur"], string> = {
  navy: "bg-navy-soft text-navy border-navy/15",
  green: "bg-green-soft text-green border-green/20",
  gold: "bg-[oklch(0.96_0.06_88)] text-[oklch(0.42_0.13_82)] border-gold/30",
};

const DOT_STYLES: Record<Domaine["couleur"], string> = {
  navy: "bg-navy",
  green: "bg-green",
  gold: "bg-gold",
};

export function DomainBadge({
  domaine,
  size = "sm",
  withDot = true,
}: {
  domaine: Domaine;
  size?: "sm" | "md";
  /** Affiche un point de couleur devant le nom du domaine (par défaut activé). */
  withDot?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium backdrop-blur ${STYLES[domaine.couleur]} ${
        size === "md" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[11px]"
      }`}
    >
      {withDot && (
        <span
          className={`size-1.5 rounded-full shrink-0 ${DOT_STYLES[domaine.couleur]}`}
          aria-hidden
        />
      )}
      {domaine.nom}
    </span>
  );
}
