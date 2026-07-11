import logoAsset from "@/assets/bibliogabon-logo.png.asset.json";
import { Link } from "@tanstack/react-router";

interface LogoProps {
  className?: string;
  size?: number;
  withWordmark?: boolean;
  variant?: "default" | "light";
  asLink?: boolean;
}

export function Logo({ className, size = 40, withWordmark = false, variant = "default", asLink = true }: LogoProps) {
  const img = (
    <img
      src={logoAsset.url}
      alt="BiblioGabon — Bibliothèque numérique des universités du Gabon"
      width={size}
      height={size}
      style={{ height: size, width: "auto" }}
      className="block object-contain"
      loading="eager"
      decoding="async"
    />
  );

  const content = (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      {img}
      {withWordmark && (
        <span
          className="font-display text-lg font-semibold tracking-tight"
          style={{ color: variant === "light" ? "white" : "var(--navy)" }}
        >
          Biblio<span style={{ color: "var(--green)" }}>Gabon</span>
        </span>
      )}
    </span>
  );

  if (!asLink) return content;
  return (
    <Link to="/" aria-label="BiblioGabon — Accueil" className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md">
      {content}
    </Link>
  );
}
