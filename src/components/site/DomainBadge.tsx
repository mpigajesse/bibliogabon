import type { Domaine } from "@/data/domaines";

const STYLES: Record<Domaine["couleur"], string> = {
  navy: "bg-navy-soft text-navy border-navy/15",
  green: "bg-green-soft text-green border-green/20",
  gold: "bg-[oklch(0.96_0.06_88)] text-[oklch(0.42_0.13_82)] border-gold/30",
};

export function DomainBadge({ domaine, size = "sm" }: { domaine: Domaine; size?: "sm" | "md" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${STYLES[domaine.couleur]} ${
        size === "md" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[11px]"
      }`}
    >
      {domaine.nom}
    </span>
  );
}
