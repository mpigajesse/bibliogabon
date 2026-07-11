import logoUrl from "@/assets/bibliogabon-logo.png";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  size?: number;
  withWordmark?: boolean;
  variant?: "default" | "light";
  asLink?: boolean;
  /** Anime le mot « BiblioGabon » en machine à écrire (s'écrit puis s'efface). */
  animateWordmark?: boolean;
}

const WORD = "BiblioGabon";
const SPLIT = 6; // « Biblio » (navy) | « Gabon » (vert)

function TypewriterWordmark({ variant }: { variant: "default" | "light" }) {
  const base = variant === "light" ? "#ffffff" : "var(--navy)";
  const reduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [count, setCount] = useState(WORD.length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let delay = deleting ? 55 : 120;
    if (!deleting && count === WORD.length) delay = 1900; // pause mot complet
    if (deleting && count === 0) delay = 650; // pause avant de réécrire
    const t = window.setTimeout(() => {
      if (!deleting) {
        if (count < WORD.length) setCount(count + 1);
        else setDeleting(true);
      } else {
        if (count > 0) setCount(count - 1);
        else setDeleting(false);
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [count, deleting, reduced]);

  const shown = reduced ? WORD : WORD.slice(0, count);
  const biblio = shown.slice(0, SPLIT);
  const gabon = shown.slice(SPLIT);

  return (
    <span
      className="font-display text-lg font-semibold tracking-tight whitespace-nowrap inline-flex items-center"
      style={{ minWidth: "8.3rem" }}
      aria-label="BiblioGabon"
    >
      <span aria-hidden style={{ color: base }}>
        {biblio}
      </span>
      <span aria-hidden style={{ color: "var(--green)" }}>
        {gabon}
      </span>
      {!reduced && (
        <span
          aria-hidden
          className="ml-[1px] inline-block h-[1.05em] w-[2px] animate-caret"
          style={{ background: "var(--gold)" }}
        />
      )}
    </span>
  );
}

export function Logo({
  className,
  size = 40,
  withWordmark = false,
  variant = "default",
  asLink = true,
  animateWordmark = false,
}: LogoProps) {
  const img = (
    <img
      src={logoUrl}
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
      {withWordmark &&
        (animateWordmark ? (
          <TypewriterWordmark variant={variant} />
        ) : (
          <span
            className="font-display text-lg font-semibold tracking-tight"
            style={{ color: variant === "light" ? "white" : "var(--navy)" }}
          >
            Biblio<span style={{ color: "var(--green)" }}>Gabon</span>
          </span>
        ))}
    </span>
  );

  if (!asLink) return content;
  return (
    <Link
      to="/"
      aria-label="BiblioGabon — Accueil"
      className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md"
    >
      {content}
    </Link>
  );
}
