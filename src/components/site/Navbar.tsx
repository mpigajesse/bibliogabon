import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { DOMAINES } from "@/data/domaines";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";

const NAV_CATALOG = [
  { to: "/livres", label: "Livres" },
  { to: "/articles", label: "Articles" },
  { to: "/examens", label: "Examens" },
  { to: "/cours", label: "Cours" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDom, setOpenDom] = useState(false);
  const [openMob, setOpenMob] = useState(false);
  const { compte, initialise, deconnecter } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    deconnecter();
    setOpenMob(false);
    navigate({ to: "/" });
  };

  // Menu Domaines : ouverture immédiate, fermeture avec un léger délai
  // pour laisser le temps d'atteindre le panneau sans qu'il disparaisse.
  const closeTimer = useRef<number | null>(null);
  const ouvrirDomaines = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenDom(true);
  };
  const fermerDomaines = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenDom(false), 160);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "glass-surface border-b border-border shadow-[0_1px_0_rgba(6,39,81,0.04)]"
          : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <span className="block h-[3px] w-full gabon-stripe" aria-hidden />
      <div className="container-editorial flex h-16 items-center gap-6">
        <Logo size={36} withWordmark animateWordmark />
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <NavItem to="/">Accueil</NavItem>
          <div className="relative" onMouseEnter={ouvrirDomaines} onMouseLeave={fermerDomaines}>
            <button
              type="button"
              onClick={() => setOpenDom((v) => !v)}
              className="px-3 py-2 rounded-md font-medium text-foreground/80 hover:text-navy hover:bg-muted transition inline-flex items-center gap-1"
              aria-expanded={openDom}
              aria-haspopup="true"
            >
              Domaines
              <ChevronDown
                className={`size-3.5 transition-transform ${openDom ? "rotate-180" : ""}`}
              />
            </button>
            {openDom && (
              <div className="absolute left-0 top-full z-50 pt-2">
                <div className="w-[720px] rounded-2xl border border-border bg-popover shadow-editorial-lg p-5 grid grid-cols-2 gap-x-6 gap-y-1 text-left">
                  <div className="col-span-2 flex items-center justify-between pb-3 mb-1 border-b border-border">
                  <span className="font-display text-sm font-semibold text-navy">
                    17 domaines académiques
                  </span>
                  <Link
                    to="/domaines"
                    className="text-xs font-medium text-green hover:text-gold transition"
                    onClick={() => setOpenDom(false)}
                  >
                    Tout parcourir →
                  </Link>
                </div>
                {DOMAINES.map((d) => (
                  <Link
                    key={d.slug}
                    to="/domaines/$slug"
                    params={{ slug: d.slug }}
                    className="group flex items-start gap-2 py-1.5 px-2 rounded-md hover:bg-muted transition text-sm"
                    onClick={() => setOpenDom(false)}
                  >
                    <span
                      className="mt-1.5 size-1.5 rounded-full shrink-0"
                      style={{
                        background:
                          d.couleur === "navy"
                            ? "var(--navy)"
                            : d.couleur === "green"
                              ? "var(--green)"
                              : "var(--gold)",
                      }}
                    />
                    <span className="text-foreground/90 group-hover:text-navy">{d.nom}</span>
                  </Link>
                ))}
                </div>
              </div>
            )}
          </div>
          {NAV_CATALOG.map((n) => (
            <NavItem key={n.to} to={n.to}>
              {n.label}
            </NavItem>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 max-w-md ml-auto">
          <SearchInline />
        </div>

        <div className="hidden md:flex items-center gap-2 ml-auto lg:ml-0">
          {initialise && compte ? (
            <>
              <Button asChild variant="ghost" size="sm" className="text-navy hover:bg-muted">
                <Link to="/tableau-de-bord" className="inline-flex items-center gap-1.5">
                  <span className="grid size-6 place-items-center rounded-full bg-navy text-[10px] font-semibold text-white">
                    {compte.initiales}
                  </span>
                  Mon espace
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-border hover:border-gold"
                aria-label="Se déconnecter"
              >
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="text-navy hover:bg-muted">
                <Link to="/connexion">Connexion</Link>
              </Button>
              <Button asChild size="sm" className="bg-navy text-white hover:bg-navy-deep">
                <Link to="/inscription">S'inscrire</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="ml-auto md:hidden inline-flex items-center justify-center rounded-md p-2 text-navy hover:bg-muted"
          onClick={() => setOpenMob((v) => !v)}
          aria-label="Menu"
        >
          {openMob ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {openMob && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-editorial py-4 space-y-1">
            <SearchInline />
            <div className="pt-2">
              <MobLink to="/" onClick={() => setOpenMob(false)}>
                Accueil
              </MobLink>
              <MobLink to="/domaines" onClick={() => setOpenMob(false)}>
                Domaines
              </MobLink>
              {NAV_CATALOG.map((n) => (
                <MobLink key={n.to} to={n.to} onClick={() => setOpenMob(false)}>
                  {n.label}
                </MobLink>
              ))}
              <MobLink to="/theses" onClick={() => setOpenMob(false)}>
                Thèses
              </MobLink>
              <MobLink to="/enseignants" onClick={() => setOpenMob(false)}>
                Enseignants
              </MobLink>
              <MobLink to="/vision" onClick={() => setOpenMob(false)}>
                Vision
              </MobLink>
            </div>
            {initialise && compte ? (
              <div className="grid grid-cols-2 gap-2 pt-3">
                <Button asChild size="sm" className="bg-navy text-white">
                  <Link to="/tableau-de-bord" onClick={() => setOpenMob(false)}>
                    <LayoutDashboard className="size-4 mr-1" />
                    Mon espace
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="size-4 mr-1" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/connexion" onClick={() => setOpenMob(false)}>
                    <BookOpen className="size-4 mr-1" />
                    Connexion
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-navy text-white">
                  <Link to="/inscription" onClick={() => setOpenMob(false)}>
                    <GraduationCap className="size-4 mr-1" />
                    S'inscrire
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 rounded-md font-medium text-foreground/80 hover:text-navy hover:bg-muted transition [&.active]:text-navy [&.active]:bg-muted"
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}

function MobLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-3 py-2.5 rounded-md text-sm font-medium text-foreground/90 hover:bg-muted [&.active]:bg-muted [&.active]:text-navy"
    >
      {children}
    </Link>
  );
}

function SearchInline() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full items-center gap-2 h-10 rounded-full border border-border bg-muted/50 px-4 focus-within:ring-2 focus-within:ring-gold focus-within:bg-background transition"
    >
      <Search className="size-4 text-muted-foreground shrink-0" />
      <input
        type="search"
        placeholder="Rechercher un document, un auteur, un domaine…"
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
    </form>
  );
}
