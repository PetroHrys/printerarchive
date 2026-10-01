import type { BlogEntry } from "@/lib/content/types";
// Relative import with the .ts extension, like lib/products.ts: this module is
// loaded directly by `node --test`, which resolves neither the "@/" alias nor
// an extensionless specifier.
import {
  CURRENT_PRODUCT_ID,
  ECOSYSTEM_PRODUCTS,
  getProduct,
} from "../ecosystem/product-registry.ts";

export interface PublisherDisclosure {
  /** Registry id of the publisher-ecosystem product or site. */
  id: string;
  name: string;
  /** The sentence shown to readers. */
  text: string;
}

const hostOf = (url: string | null | undefined): string | null => {
  if (!url) return null;
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
};

/**
 * Every product or site of the publisher's own ecosystem that a post presents,
 * each with the disclosure to show for it.
 *
 * A product block supplies its own wording (it names the companies behind the
 * product). An inline link to an ecosystem site's own domain produces a
 * generic sentence, so a story that features a sibling property can never ship
 * without a disclosure just because it has no product block. Store hosts
 * (apps.apple.com, play.google.com) are deliberately not matched: they are
 * shared by every app and identify none of them.
 */
export function publisherDisclosures(
  post: Pick<BlogEntry, "body">,
): PublisherDisclosure[] {
  const out: PublisherDisclosure[] = [];
  const seen = new Set<string>();

  for (const b of post.body) {
    if (b.kind !== "productAvailability" || seen.has(b.product)) continue;
    seen.add(b.product);
    out.push({
      id: b.product,
      name: getProduct(b.product)?.name ?? b.product,
      text: b.disclosure,
    });
  }

  for (const b of post.body) {
    if (b.kind !== "paragraph") continue;
    for (const link of b.links ?? []) {
      if (!link.external) continue;
      const host = hostOf(link.href);
      if (!host) continue;
      const product = ECOSYSTEM_PRODUCTS.find(
        (p) =>
          p.id !== CURRENT_PRODUCT_ID &&
          [
            p.websiteUrl,
            p.webAppUrl,
            ...(p.currentSiteDomains ?? []).map((d) => `https://${d}`),
          ].some((u) => hostOf(u) === host),
      );
      if (!product || seen.has(product.id)) continue;
      seen.add(product.id);
      out.push({
        id: product.id,
        name: product.name,
        text: `${product.name} is part of the HELPERG ecosystem, which also publishes PrinterArchive.`,
      });
    }
  }

  return out;
}
