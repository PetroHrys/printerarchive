import Image from "next/image";
import type { ProductPlatform } from "@/lib/content/types";
import { PRODUCTS, type ProductId } from "@/lib/products";
import {
  getProduct,
  platformLinks,
  relForLink,
  type EcosystemSurface,
} from "@/lib/ecosystem/product-registry";
import { ProductGlyph } from "./ProductGlyph";

const PLATFORM_ORDER: ProductPlatform[] = ["website", "ios", "android"];

const DEFAULT_LABEL: Record<ProductPlatform, string> = {
  website: "Website",
  ios: "iPhone",
  android: "Android",
};

// Literal class names, so Tailwind generates each variant.
const GRID_COLUMNS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

const SURFACE: EcosystemSurface = "article-product";

interface ProductAvailabilityProps {
  product: ProductId;
  summary: string;
  disclosure: string;
  platforms?: Partial<Record<ProductPlatform, { label?: string; detail?: string }>>;
}

/**
 * The one place an editorial post points readers at a publisher product.
 *
 * Every destination is resolved from the ecosystem registry, so the post
 * stores no URL and a platform the registry does not mark "available" can
 * never render as a link. Links are plain server-rendered anchors carrying the
 * registry's rel policy for applications. The ownership disclosure is a
 * required part of the block, so the product can't be presented without it.
 */
export function ProductAvailability({
  product,
  summary,
  disclosure,
  platforms,
}: ProductAvailabilityProps) {
  const entry = getProduct(product);
  if (!entry) {
    throw new Error(`No ecosystem registry entry for product "${product}".`);
  }
  const links = platformLinks(entry)
    .filter((l): l is typeof l & { platform: ProductPlatform } =>
      PLATFORM_ORDER.includes(l.platform as ProductPlatform),
    )
    .sort(
      (a, b) =>
        PLATFORM_ORDER.indexOf(a.platform) - PLATFORM_ORDER.indexOf(b.platform),
    );
  const icon = PRODUCTS[product]?.icon;
  const labelId = `product-${product}-label`;
  const nameId = `product-${product}`;
  // The evidence line names only material that exists for this product.
  const evidence = links.some((l) => l.platform === "website")
    ? "its own website and store listings"
    : "its official store listings";

  return (
    <aside
      aria-labelledby={`${labelId} ${nameId}`}
      className="premium-card-sm my-12 overflow-hidden font-sans"
    >
      <div className="flex items-center gap-4 border-b border-rule px-5 py-4 sm:px-6">
        {icon ? (
          <Image
            src={icon}
            alt=""
            width={52}
            height={52}
            className="h-[52px] w-[52px] shrink-0 rounded-xl border border-rule"
          />
        ) : (
          <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-rule bg-paper text-ink-soft">
            <ProductGlyph id={product} className="h-6 w-6" />
          </span>
        )}
        <div className="min-w-0">
          <p id={labelId} className="tech-label">
            Product
          </p>
          <p
            id={nameId}
            className="mt-0.5 text-xl font-semibold leading-tight text-ink-display"
          >
            {entry.name}
          </p>
        </div>
      </div>

      <div className="px-5 pb-6 pt-5 sm:px-6">
        <p className="text-[0.95rem] leading-7 text-ink-soft text-pretty">
          {summary}
        </p>
        <p className="tech-label mt-6">Available on</p>
        <ul className={`mt-3 grid gap-2.5 ${GRID_COLUMNS[links.length] ?? GRID_COLUMNS[3]}`}>
          {links.map((link) => {
            const custom = platforms?.[link.platform];
            const label = custom?.label ?? DEFAULT_LABEL[link.platform];
            return (
              <li key={link.platform} className="flex">
                <a
                  href={link.url}
                  target="_blank"
                  rel={relForLink(entry, link.platform)}
                  className="group flex min-h-[44px] w-full flex-col gap-1 rounded-md border border-rule bg-paper px-4 py-3 no-underline transition-colors hover:border-accent focus-visible:border-accent"
                  data-ecosystem-product-id={entry.id}
                  data-ecosystem-surface={SURFACE}
                  data-ecosystem-platform={link.platform}
                >
                  <span className="flex items-center justify-between gap-3 text-[0.95rem] font-semibold text-ink-display group-hover:text-accent">
                    <span>
                      {label}
                      {custom?.detail ? <span className="sr-only">, </span> : null}
                    </span>
                    <span aria-hidden className="text-ink-faint group-hover:text-accent">
                      ↗
                    </span>
                  </span>
                  {custom?.detail ? (
                    <span className="text-xs leading-5 text-ink-soft">
                      {custom.detail}
                    </span>
                  ) : null}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="border-t border-rule bg-paper-sunken px-5 py-3.5 text-xs leading-5 text-ink-soft text-pretty sm:px-6">
        <span className="font-semibold text-ink-display">Disclosure.</span>{" "}
        {disclosure} The product details in this article come from {evidence};
        this is not an independent review.
      </p>
    </aside>
  );
}
