import { Link } from "@tanstack/react-router";
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
}) {
  const accentText =
    accent === "green" ? "text-green" : accent === "gold" ? "text-gold" : "text-navy";

  return (
    <section
      className={`relative overflow-hidden ${
        tone === "muted" ? "bg-muted/60 border-b border-border" : "bg-background border-b border-border"
      }`}
    >
      <div className="absolute inset-0 section-halo pointer-events-none" aria-hidden />
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

        <div className="hidden lg:block relative h-48 w-72 shrink-0" aria-hidden>
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-navy/5 via-transparent to-gold/10 blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-white/70 backdrop-blur shadow-editorial-lg hero-gradient">
            <div className="absolute inset-0 pixel-grid-bg opacity-60" />
            <span className="absolute top-0 inset-x-0 h-1 gabon-stripe" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className={`size-24 ${accentText} opacity-80`} strokeWidth={1.1} />
            </div>
            <span className="absolute bottom-3 right-4 font-display text-xs font-semibold text-navy/40">
              BiblioGabon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
