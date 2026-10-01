// SourceTransparency renders the per-article references block.
//
// Note: a visible "Verified archival source" badge per item is deferred
// to sub-phase 5.3, which will define a source-type taxonomy on the
// data model (e.g., institutional | encyclopedic | primary). The current
// shape only carries title/url?/publisher?, which is insufficient to
// determine which entries qualify for the badge without further input.
//
// The one distinction the data model does carry is `kind: "product"`: a
// product's own website, store listing or documentation. When an entry cites
// any, those are listed apart from the historical and technical sources, so
// a reader can see which claims rest on independent evidence and which rest
// on what a product says about itself.
import Link from "next/link";
import type { SourceRef } from "@/lib/content/types";
import { isProductSource, resolveSourceUrl } from "@/lib/content/sources";

interface SourceTransparencyProps {
  sources: SourceRef[];
}

// Product material keeps the repository's external-product-link policy
// (see relForLink in lib/ecosystem/product-registry.ts), so a store URL is
// never followed in the source list while nofollowed in the product block.
const PRODUCT_REL = "noopener noreferrer nofollow";
const SOURCE_REL = "noopener noreferrer";

function SourceList({ items, rel }: { items: SourceRef[]; rel: string }) {
  return (
    <ul className="mt-3 space-y-3 text-sm leading-6 text-ink-soft">
      {items.map((s, i) => {
        const url = resolveSourceUrl(s);
        return (
          <li key={i}>
            {url ? (
              <a href={url} rel={rel}>
                {s.title}
              </a>
            ) : (
              s.title
            )}
            {s.publisher && (
              <span className="text-ink-faint"> — {s.publisher}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function SourceTransparency({ sources }: SourceTransparencyProps) {
  if (sources.length === 0) return null;
  const count = sources.length;
  const product = sources.filter(isProductSource);
  const historical = sources.filter((s) => !isProductSource(s));
  const split = product.length > 0;

  return (
    <section
      aria-labelledby="source-transparency"
      className="mt-14 border-t border-rule pt-8"
    >
      <h2
        id="source-transparency"
        className="font-serif text-3xl leading-tight text-ink-display"
      >
        Source transparency{" "}
        <span className="font-sans text-sm font-semibold text-ink-faint">
          ({count} {count === 1 ? "source" : "sources"})
        </span>
      </h2>
      {split ? (
        <p className="mt-3 text-sm leading-6 text-ink-soft text-pretty">
          These references support claims made in this entry, in two kinds.
          Historical and technical claims rest on institutional and
          public-domain sources; see{" "}
          <Link href="/source-policy">Source policy</Link>. Product claims rest
          only on the product&rsquo;s own website, documentation and store
          listings, which are listed separately and describe what the product
          says about itself.
        </p>
      ) : (
        <p className="mt-3 text-sm leading-6 text-ink-soft text-pretty">
          These references support claims made in this entry. The archive uses
          verified institutional and public-domain sources only; see{" "}
          <Link href="/source-policy">Source policy</Link>.
        </p>
      )}
      <details className="premium-card-sm mt-5 p-5">
        <summary className="cursor-pointer font-sans text-sm font-semibold text-ink-display hover:text-accent">
          Sources consulted ({count})
        </summary>
        {split ? (
          <>
            {historical.length > 0 ? (
              <div className="mt-4">
                <h3 className="tech-label">
                  Historical and technical sources ({historical.length})
                </h3>
                <SourceList items={historical} rel={SOURCE_REL} />
              </div>
            ) : null}
            <div className="mt-6 border-t border-rule pt-4">
              <h3 className="tech-label">
                Product sources — the product&rsquo;s own material ({product.length})
              </h3>
              <SourceList items={product} rel={PRODUCT_REL} />
            </div>
          </>
        ) : (
          <div className="mt-1">
            <SourceList items={sources} rel={SOURCE_REL} />
          </div>
        )}
      </details>
    </section>
  );
}
