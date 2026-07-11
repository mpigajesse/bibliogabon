import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb { label: string; to?: string; params?: Record<string, string> }

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  tone?: "default" | "muted";
}) {
  return (
    <section className={tone === "muted" ? "bg-muted/60 border-b border-border" : "bg-background border-b border-border"}>
      <div className="container-editorial py-12 md:py-16">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Fil d'Ariane" className="mb-5 flex items-center gap-1 text-xs text-muted-foreground">
            {crumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {c.to ? (
                  <Link to={c.to} params={c.params as never} className="hover:text-navy transition">{c.label}</Link>
                ) : (
                  <span className="text-foreground/80">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="size-3" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green mb-4">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-navy tracking-tight max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
