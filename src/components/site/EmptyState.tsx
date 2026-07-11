import { FileSearch } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-12 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-background border border-border">
        <FileSearch className="size-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-navy">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">{description}</p>}
    </div>
  );
}
