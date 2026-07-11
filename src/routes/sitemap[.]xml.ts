import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { DOMAINES } from "@/data/domaines";
import { DOCUMENTS } from "@/data/documents";
import { CONTRIBUTEURS } from "@/data/contributeurs";

const BASE_URL = "";

interface SitemapEntry { path: string; changefreq?: string; priority?: string }

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/domaines", changefreq: "weekly", priority: "0.9" },
          { path: "/livres", changefreq: "weekly", priority: "0.8" },
          { path: "/articles", changefreq: "weekly", priority: "0.8" },
          { path: "/examens", changefreq: "weekly", priority: "0.8" },
          { path: "/cours", changefreq: "weekly", priority: "0.8" },
          { path: "/theses", changefreq: "weekly", priority: "0.8" },
          { path: "/enseignants", changefreq: "monthly", priority: "0.7" },
          { path: "/vision", changefreq: "monthly", priority: "0.7" },
          { path: "/apropos", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/connexion", changefreq: "yearly", priority: "0.3" },
          { path: "/inscription", changefreq: "yearly", priority: "0.5" },
          { path: "/confidentialite", changefreq: "yearly", priority: "0.2" },
          { path: "/cgu", changefreq: "yearly", priority: "0.2" },
          ...DOMAINES.map((d) => ({ path: `/domaines/${d.slug}`, changefreq: "weekly", priority: "0.7" })),
          ...DOCUMENTS.map((d) => ({ path: `/document/${d.id}`, changefreq: "monthly", priority: "0.6" })),
          ...CONTRIBUTEURS.map((c) => ({ path: `/enseignant/${c.id}`, changefreq: "monthly", priority: "0.5" })),
        ];
        const urls = entries.map((e) =>
          `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
