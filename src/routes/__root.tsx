import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/components/auth/AuthProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-display text-8xl font-bold text-navy tracking-tighter">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-navy">Page introuvable</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette référence n'existe pas dans notre catalogue. Retournez à l'accueil pour reprendre
          votre exploration.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-deep transition"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/domaines"
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:border-gold hover:text-gold transition"
          >
            Parcourir les domaines
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold text-navy">
          Cette page n'a pas pu se charger
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Un incident est survenu. Vous pouvez réessayer ou revenir à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-deep transition"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:border-gold hover:text-gold transition"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BiblioGabon — La bibliothèque numérique des universités du Gabon" },
      {
        name: "description",
        content:
          "BiblioGabon rassemble livres, cours, thèses, examens et articles scientifiques pour les étudiants et enseignants des universités de la République Gabonaise. Accès 100 % libre.",
      },
      { name: "author", content: "BiblioGabon — République Gabonaise" },
      { name: "theme-color", content: "#062751" },
      { property: "og:title", content: "BiblioGabon — La Grande Source documentaire du Gabon" },
      {
        property: "og:description",
        content:
          "La bibliothèque numérique nationale des universités gabonaises. Livres, cours, thèses et articles scientifiques en accès libre.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}
