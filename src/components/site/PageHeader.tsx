import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, BookOpen, type LucideIcon } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
  params?: Record<string, string>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  tone = "default",
  Icon = BookOpen,
  accent = "navy",
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  tone?: "default" | "muted";
  /** Icône de couverture reflétant la page. */
  Icon?: LucideIcon;
  /** Couleur d'accent du visuel de couverture. */
  accent?: "navy" | "green" | "gold";
  /** Image de couverture du hero (repli sur l'icône si absente). */
  image?: string;
}) {
  const accentText =
    accent === "green" ? "text-green" : accent === "gold" ? "text-gold" : "text-navy";
  const [src, setSrc] = useState(image);
  const [triedAlt, setTriedAlt] = useState(false);
  const [failed, setFailed] = useState(false);

  const onImgError = () => {
    if (src && !triedAlt) {
      const alt = src.endsWith(".png")
        ? src.replace(/\.png$/, ".jpg")
        : src.replace(/\.jpe?g$/, ".png");
      if (alt !== src) {
        setTriedAlt(true);
        setSrc(alt);
        return;
      }
    }
    setFailed(true);
  };
  const imgOk = Boolean(image) && !failed;

  return (
    <section
      className={`relative overflow-hidden ${
        tone === "muted"
          ? "bg-muted/60 border-b border-border"
          : "bg-background border-b border-border"
      }`}
    >
      <div className="container-editorial relative py-12 md:py-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
        <div className="min-w-0">
          {crumbs && crumbs.length > 0 && (
            <nav
              aria-label="Fil d'Ariane"
              className="mb-5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
            >
              {crumbs.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-1">
                  {c.to ? (
                    <Link
                      to={c.to}
                      params={c.params as never}
                      className="hover:text-navy transition"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-foreground/80">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="size-3" />}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && (
            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-3 w-6 rounded-full gabon-stripe" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">
                {eyebrow}
              </p>
            </div>
          )}
          <h1 className="font-display text-4xl md:text-5xl font-bold text-navy tracking-tight max-w-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>

        <div className="hidden lg:block relative h-48 w-72 shrink-0">
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-surface-alt shadow-editorial-lg">
            {imgOk ? (
              <>
                <img
                  src={src}
                  alt=""
                  onError={onImgError}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"
                  aria-hidden
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                <Icon className={`size-24 ${accentText} opacity-80`} strokeWidth={1.1} />
              </div>
            )}
            <span className="absolute top-0 inset-x-0 h-1 gabon-stripe" aria-hidden />
            <span className="absolute bottom-3 right-4 font-display text-xs font-semibold text-navy/50">
              BiblioGabon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
