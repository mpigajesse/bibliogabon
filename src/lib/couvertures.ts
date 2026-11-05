import { COUVERTURES_PRESENTES } from "@/data/couvertures.generated";

/**
 * Ne garde que les couvertures réellement présentes dans public/covers.
 * Les URL externes (jaquettes de livres) sont conservées telles quelles.
 */
export function couverturesExistantes(candidats: Array<string | undefined | null>): string[] {
  return candidats.filter(
    (c): c is string => Boolean(c) && (!c!.startsWith("/covers/") || COUVERTURES_PRESENTES.has(c!)),
  );
}
