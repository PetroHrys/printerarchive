import type { SourceRef } from "@/lib/content/types";
// Relative import with the .ts extension, like lib/products.ts: this module is
// loaded directly by `node --test`, which resolves neither the "@/" alias nor
// an extensionless specifier.
import { getProduct } from "../ecosystem/product-registry.ts";

/** A product's own material: website, store listing or documentation. */
export function isProductSource(s: SourceRef): boolean {
  return s.kind === "product" || s.registry !== undefined;
}

/**
 * Independent sources and the product's own material, counted apart, so a
 * source count shown as a trust signal never folds a product's description
 * of itself into the evidence.
 */
export function sourceCounts(sources: SourceRef[] = []): {
  independent: number;
  product: number;
} {
  const product = sources.filter(isProductSource).length;
  return { independent: sources.length - product, product };
}

/** "10 sources", or "10 sources + 6 product sources". */
export function sourceCountLabel(sources: SourceRef[] = []): string {
  const { independent, product } = sourceCounts(sources);
  const base = `${independent} ${independent === 1 ? "source" : "sources"}`;
  return product > 0
    ? `${base} + ${product} product ${product === 1 ? "source" : "sources"}`
    : base;
}

/**
 * The URL a source links to. A registry-backed source resolves through the
 * ecosystem registry and yields nothing unless that platform is "available",
 * so a citation can never point at a destination the registry does not vouch
 * for.
 */
export function resolveSourceUrl(s: SourceRef): string | undefined {
  if (!s.registry) return s.url;
  const p = getProduct(s.registry.product);
  if (!p) return undefined;
  switch (s.registry.platform) {
    case "website":
      return p.websiteStatus === "available" ? (p.websiteUrl ?? undefined) : undefined;
    case "ios":
      return p.iosStatus === "available" ? (p.iosUrl ?? undefined) : undefined;
    case "android":
      return p.androidStatus === "available" ? (p.androidUrl ?? undefined) : undefined;
    default:
      return undefined;
  }
}
