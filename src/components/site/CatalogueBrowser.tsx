import { useState } from "react";
import { DOMAINES } from "@/data/domaines";
import type { Document, DocumentType } from "@/data/documents";
import { DocumentCard } from "./DocumentCard";
import { EmptyState } from "./EmptyState";
import { Reveal } from "./Reveal";

const TYPES: { value: DocumentType | "all"; label: string }[] = [
  { value: "all", label: "Tous types" },
  { value: "livre", label: "Livres" },
  { value: "article", label: "Articles" },
  { value: "cours", label: "Cours" },
  { value: "examen", label: "Examens" },
  { value: "td-tp", label: "TD / TP" },
  { value: "these", label: "Thèses" },
];

const TRIS = [
  { value: "recent", label: "Plus récents" },
  { value: "vues", label: "Plus consultés" },
  { value: "az", label: "Titre A→Z" },
] as const;

export function CatalogueBrowser({
  documents,
  lockedType,
  lockedDomaine,
}: {
  documents: Document[];
  lockedType?: DocumentType;
  lockedDomaine?: string;
}) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<DocumentType | "all">(lockedType ?? "all");
  const [dom, setDom] = useState<string>(lockedDomaine ?? "all");
  const [annee, setAnnee] = useState<string>("all");
  const [tri, setTri] = useState<(typeof TRIS)[number]["value"]>("recent");

  const years = Array.from(new Set(documents.map((d) => d.annee))).sort((a, b) => b - a);

  let list = documents.filter((d) => {
    if (
      q &&
      !d.titre.toLowerCase().includes(q.toLowerCase()) &&
      !d.auteur.toLowerCase().includes(q.toLowerCase())
    )
      return false;
    if (type !== "all" && d.type !== type) return false;
    if (dom !== "all" && d.domaineSlug !== dom) return false;
    if (annee !== "all" && d.annee !== Number(annee)) return false;
    return true;
  });
  if (tri === "recent") list = [...list].sort((a, b) => b.annee - a.annee);
  if (tri === "vues") list = [...list].sort((a, b) => b.vues - a.vues);
  if (tri === "az") list = [...list].sort((a, b) => a.titre.localeCompare(b.titre));

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-6 rounded-2xl border border-border bg-card p-5 shadow-editorial lg:sticky lg:top-24 lg:self-start">
        <div className="h-[3px] w-10 rounded-full gabon-stripe" aria-hidden />
        <FacetGroup label="Recherche">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Titre, auteur…"
            className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </FacetGroup>
        {!lockedType && (
          <FacetGroup label="Type de document">
            {TYPES.map((t) => (
              <FacetRadio
                key={t.value}
                name="type"
                value={t.value}
                label={t.label}
                checked={type === t.value}
                onChange={() => setType(t.value)}
              />
            ))}
          </FacetGroup>
        )}
        {!lockedDomaine && (
          <FacetGroup label="Domaine">
            <select
              value={dom}
              onChange={(e) => setDom(e.target.value)}
              className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
            >
              <option value="all">Tous les domaines</option>
              {DOMAINES.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.nom}
                </option>
              ))}
            </select>
          </FacetGroup>
        )}
        <FacetGroup label="Année">
          <FacetRadio
            name="annee"
            value="all"
            label="Toutes"
            checked={annee === "all"}
            onChange={() => setAnnee("all")}
          />
          {years.map((y) => (
            <FacetRadio
              key={y}
              name="annee"
              value={String(y)}
              label={String(y)}
              checked={annee === String(y)}
              onChange={() => setAnnee(String(y))}
            />
          ))}
        </FacetGroup>
        <FacetGroup label="Trier">
          {TRIS.map((t) => (
            <FacetRadio
              key={t.value}
              name="tri"
              value={t.value}
              label={t.label}
              checked={tri === t.value}
              onChange={() => setTri(t.value)}
            />
          ))}
        </FacetGroup>
      </aside>
      <div>
        <div className="mb-6 flex items-baseline justify-between border-b border-border pb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-display font-semibold text-navy text-base">{list.length}</span>{" "}
            résultat{list.length > 1 ? "s" : ""} trouvé{list.length > 1 ? "s" : ""}
          </p>
        </div>
        {list.length === 0 ? (
          <EmptyState
            title="Aucun document ne correspond"
            description="Ajustez vos filtres ou explorez d'autres domaines."
          />
        ) : (
          <Reveal className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((d) => (
              <DocumentCard key={d.id} doc={d} />
            ))}
          </Reveal>
        )}
      </div>
    </div>
  );
}

function FacetGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-navy mb-3">
        {label}
      </h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function FacetRadio({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer group">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-[var(--navy)]"
      />
      <span
        className={
          checked ? "text-navy font-medium" : "text-muted-foreground group-hover:text-foreground"
        }
      >
        {label}
      </span>
    </label>
  );
}
