import type { ArchiveEntry } from "@/lib/content/types";

function imageIssues(
  key: string,
  label: string,
  img: {
    src?: unknown;
    alt?: unknown;
    width?: unknown;
    height?: unknown;
    credit?: { source?: unknown; license?: unknown } | undefined;
  },
): string[] {
  const out: string[] = [];
  const nonEmpty = (v: unknown) => typeof v === "string" && v.trim().length > 0;
  const posInt = (v: unknown) =>
    typeof v === "number" && Number.isInteger(v) && v > 0;
  if (!nonEmpty(img.src)) out.push(`${key}: ${label} image src missing`);
  if (!nonEmpty(img.alt)) out.push(`${key}: ${label} image alt missing`);
  if (!posInt(img.width))
    out.push(`${key}: ${label} image width must be a positive integer`);
  if (!posInt(img.height))
    out.push(`${key}: ${label} image height must be a positive integer`);
  if (!nonEmpty(img.credit?.source))
    out.push(`${key}: ${label} image credit.source missing`);
  if (!nonEmpty(img.credit?.license))
    out.push(`${key}: ${label} image credit.license missing`);
  return out;
}

/**
 * Site-relative routes an inline link may target that are not entry pages.
 * Keep in sync with the static routes in app/sitemap.ts.
 */
const STATIC_ROUTES = new Set([
  "/",
  "/about",
  "/contact",
  "/editorial-policy",
  "/source-policy",
  "/archive-methodology",
  "/changelog",
  "/cookie-policy",
  "/knowledge-graph",
  "/timeline",
  "/blog",
  "/history",
  "/guides",
  "/troubleshooting",
  "/brands",
  "/workflows",
  "/tools",
  "/glossary",
  "/mobile-printing",
  "/fax",
  "/models",
]);

// Keep VALID_PRODUCT_IDS in sync with ProductId in lib/products.ts.
const VALID_PRODUCT_IDS = new Set([
  "zip-rar",
  "smart-printer",
  "fax-app",
  "pdf-editor",
  "cv-resume",
  "invoice-maker",
  "pocket-manager",
  "esimky",
]);

const PRODUCT_PLATFORMS = new Set(["website", "ios", "android"]);

/**
 * Pure content-integrity check. Returns a list of human-readable problems;
 * an empty array means the content set is valid. Validates encyclopedia
 * entries and editorial blog posts alike. Used by the content check script
 * and enforced at build time so `next build` fails on violations.
 */
export function findContentIssues(entries: ArchiveEntry[]): string[] {
  const issues: string[] = [];
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  const keys = new Set(entries.map((e) => `${e.section}/${e.slug}`));
  const seen = new Set<string>();

  for (const e of entries) {
    const key = `${e.section}/${e.slug}`;

    if (seen.has(key)) issues.push(`Duplicate entry: ${key}`);
    seen.add(key);

    for (const field of [
      "title",
      "description",
      "summary",
      "author",
      "editor",
    ] as const) {
      if (!e[field] || String(e[field]).trim().length === 0) {
        issues.push(`${key}: missing ${field}`);
      }
    }

    if (e.description && e.description.length > 165) {
      issues.push(
        `${key}: description too long (${e.description.length} > 165)`,
      );
    }

    if (!isoDate.test(e.published)) {
      issues.push(`${key}: published is not an ISO date (${e.published})`);
    }
    if (!isoDate.test(e.updated)) {
      issues.push(`${key}: updated is not an ISO date (${e.updated})`);
    }

    if (!Array.isArray(e.body) || e.body.length === 0) {
      issues.push(`${key}: body is empty`);
    }

    if (e.hero) {
      issues.push(...imageIssues(key, "hero", e.hero));
    }
    if (Array.isArray(e.body)) {
      e.body.forEach((b, idx) => {
        if (b && (b as { kind?: string }).kind === "figure") {
          const img = (b as { image?: Record<string, unknown> }).image ?? {};
          issues.push(...imageIssues(key, `figure[${idx}]`, img));
        }
        if (b && (b as { kind?: string }).kind === "figurePair") {
          const left = (b as { left?: Record<string, unknown> }).left ?? {};
          const right = (b as { right?: Record<string, unknown> }).right ?? {};
          issues.push(...imageIssues(key, `figurePair[${idx}].left`, left));
          issues.push(...imageIssues(key, `figurePair[${idx}].right`, right));
        }
        if (b && (b as { kind?: string }).kind === "paragraph") {
          const links = (b as { links?: unknown }).links;
          const text = (b as { text?: unknown }).text;
          if (links !== undefined) {
            if (!Array.isArray(links)) {
              issues.push(`${key}: paragraph[${idx}] links must be an array`);
            } else {
              const anchors = new Set<string>();
              for (const l of links) {
                const anchor = (l as { anchor?: unknown })?.anchor;
                const href = (l as { href?: unknown })?.href;
                if (typeof anchor !== "string" || !anchor.trim()) {
                  issues.push(
                    `${key}: paragraph[${idx}] link anchor must be a non-empty string`,
                  );
                  continue;
                }
                if (anchors.has(anchor)) {
                  issues.push(
                    `${key}: paragraph[${idx}] duplicate link anchor "${anchor}"`,
                  );
                }
                anchors.add(anchor);
                if (typeof text !== "string") continue;
                const occurrences = text.split(anchor).length - 1;
                if (occurrences !== 1) {
                  issues.push(
                    `${key}: paragraph[${idx}] anchor "${anchor}" occurs ${occurrences}x in text (must be exactly 1)`,
                  );
                }
                if (typeof href !== "string" || !href.trim()) {
                  issues.push(
                    `${key}: paragraph[${idx}] link "${anchor}" has no href`,
                  );
                  continue;
                }
                const external = (l as { external?: unknown })?.external === true;
                if (external) {
                  if (!href.startsWith("https://")) {
                    issues.push(
                      `${key}: paragraph[${idx}] external link "${anchor}" must be https -> ${href}`,
                    );
                  }
                } else if (!href.startsWith("/")) {
                  issues.push(
                    `${key}: paragraph[${idx}] link "${anchor}" is not site-relative and not marked external -> ${href}`,
                  );
                } else if (
                  !STATIC_ROUTES.has(href) &&
                  !keys.has(href.replace(/^\//, ""))
                ) {
                  issues.push(
                    `${key}: paragraph[${idx}] internal link does not resolve -> ${href}`,
                  );
                }
              }
            }
          }
        }
        if (b && (b as { kind?: string }).kind === "archivalTable") {
          const caption = (b as { caption?: unknown }).caption;
          if (typeof caption !== "string" || caption.trim().length === 0) {
            issues.push(`${key}: archivalTable[${idx}] caption missing or empty`);
          }
        }
        if (b && (b as { kind?: string }).kind === "productAvailability") {
          const pb = b as {
            product?: unknown;
            summary?: unknown;
            disclosure?: unknown;
            platforms?: unknown;
          };
          if (typeof pb.disclosure !== "string" || !pb.disclosure.trim()) {
            issues.push(`${key}: productAvailability[${idx}] disclosure missing`);
          }
          if (typeof pb.product !== "string" || !VALID_PRODUCT_IDS.has(pb.product)) {
            issues.push(
              `${key}: productAvailability[${idx}] product does not resolve -> ${String(pb.product)}`,
            );
          }
          if (typeof pb.summary !== "string" || !pb.summary.trim()) {
            issues.push(`${key}: productAvailability[${idx}] summary missing`);
          }
          if (pb.platforms !== undefined) {
            if (!pb.platforms || typeof pb.platforms !== "object") {
              issues.push(`${key}: productAvailability[${idx}] platforms must be an object`);
            } else {
              for (const p of Object.keys(pb.platforms)) {
                if (!PRODUCT_PLATFORMS.has(p)) {
                  issues.push(
                    `${key}: productAvailability[${idx}] unknown platform "${p}"`,
                  );
                }
              }
            }
          }
        }
      });
    }

    // Source shape: a product source names either a URL or a registry
    // destination, never both; registry destinations must be real ids.
    const sourceList = (e as { sources?: unknown }).sources;
    if (Array.isArray(sourceList)) {
      sourceList.forEach((s, i) => {
        const src = (s ?? {}) as {
          title?: unknown;
          url?: unknown;
          kind?: unknown;
          registry?: { product?: unknown; platform?: unknown };
        };
        if (typeof src.title !== "string" || !src.title.trim()) {
          issues.push(`${key}: source[${i}] title missing`);
        }
        if (src.kind !== undefined && src.kind !== "product") {
          issues.push(`${key}: source[${i}] unknown kind "${String(src.kind)}"`);
        }
        if (src.registry !== undefined) {
          if (src.kind !== "product") {
            issues.push(`${key}: source[${i}] registry source must be kind "product"`);
          }
          if (src.url !== undefined) {
            issues.push(
              `${key}: source[${i}] restates a URL the registry already holds`,
            );
          }
          const rp = src.registry?.product;
          const rf = src.registry?.platform;
          if (typeof rp !== "string" || !VALID_PRODUCT_IDS.has(rp)) {
            issues.push(`${key}: source[${i}] registry product does not resolve -> ${String(rp)}`);
          }
          if (typeof rf !== "string" || !PRODUCT_PLATFORMS.has(rf)) {
            issues.push(`${key}: source[${i}] registry platform is invalid -> ${String(rf)}`);
          }
        } else if (src.kind === "product" && typeof src.url !== "string") {
          issues.push(`${key}: source[${i}] product source has neither url nor registry`);
        }
      });
    }

    for (const ref of e.related ?? []) {
      if (!keys.has(`${ref.section}/${ref.slug}`)) {
        issues.push(
          `${key}: related ref does not resolve -> ${ref.section}/${ref.slug}`,
        );
      }
    }

    const deep = (e as { deepReading?: { ref?: { section?: string; slug?: string } }[] })
      .deepReading;
    if (Array.isArray(deep)) {
      for (const item of deep) {
        const r = item.ref;
        const refKey = `${r?.section}/${r?.slug}`;
        if (!r || !keys.has(refKey)) {
          issues.push(`${key}: deepReading ref does not resolve -> ${refKey}`);
        }
      }
    }

    // Footnotes integrity: collect refs from body, footnotes from entry-level field.
    const refs: number[] = [];
    const fnIndex = new Map<number, number>(); // n -> count, for uniqueness check
    if (Array.isArray(e.body)) {
      e.body.forEach((b) => {
        if (b && (b as { kind?: string }).kind === "footnoteRef") {
          const n = (b as { n?: unknown }).n;
          if (typeof n === "number" && Number.isInteger(n) && n > 0) refs.push(n);
          else issues.push(`${key}: footnoteRef n must be a positive integer`);
        }
      });
    }
    const fns = (e as { footnotes?: { n?: unknown; text?: unknown }[] }).footnotes;
    if (Array.isArray(fns)) {
      fns.forEach((f) => {
        const n = f.n;
        if (typeof n !== "number" || !Number.isInteger(n) || n <= 0) {
          issues.push(`${key}: footnote n must be a positive integer`);
          return;
        }
        fnIndex.set(n, (fnIndex.get(n) ?? 0) + 1);
        if (typeof f.text !== "string" || f.text.trim().length === 0) {
          issues.push(`${key}: footnote ${n} text missing`);
        }
      });
      // Duplicates
      for (const [n, count] of fnIndex) {
        if (count > 1) issues.push(`${key}: duplicate footnote ${n} (x${count})`);
      }
    }
    // Dangling refs (ref without matching footnote)
    for (const n of refs) {
      if (!fnIndex.has(n)) {
        issues.push(`${key}: footnoteRef ${n} has no matching footnote`);
      }
    }
    // Orphan footnotes (footnote without matching ref)
    for (const [n] of fnIndex) {
      if (!refs.includes(n)) {
        issues.push(`${key}: orphan footnote ${n} (no footnoteRef in body)`);
      }
    }

    // modernTools integrity: each id must be a known product.
    const mt = (e as { modernTools?: unknown }).modernTools;
    if (mt !== undefined) {
      if (!Array.isArray(mt)) {
        issues.push(`${key}: modernTools must be an array`);
      } else {
        for (const id of mt) {
          if (typeof id !== "string" || !VALID_PRODUCT_IDS.has(id)) {
            issues.push(
              `${key}: modernTools id does not resolve -> ${String(id)}`,
            );
          }
        }
      }
    }

    if (e.section === "glossary") {
      for (const ref of e.seeAlso ?? []) {
        if (!keys.has(`${ref.section}/${ref.slug}`)) {
          issues.push(
            `${key}: seeAlso ref does not resolve -> ${ref.section}/${ref.slug}`,
          );
        }
      }
    }

    if (e.section === "blog") {
      const category = (e as { category?: unknown }).category;
      if (typeof category !== "string" || !category.trim()) {
        issues.push(`${key}: blog post must declare a category`);
      }
      const src = (e as { sources?: unknown }).sources;
      if (!Array.isArray(src) || src.length === 0) {
        issues.push(`${key}: blog post must cite at least one source`);
      }
      const verified = (e as { factsVerified?: unknown }).factsVerified;
      if (verified !== undefined && !isoDate.test(String(verified))) {
        issues.push(
          `${key}: factsVerified is not an ISO date (${String(verified)})`,
        );
      }
      const topics = (e as { topics?: unknown }).topics;
      if (topics !== undefined && !Array.isArray(topics)) {
        issues.push(`${key}: topics must be an array`);
      }
      // A post that presents a publisher product must show its evidence: at
      // least one of the product's own sources, separated from the history.
      const presentsProduct =
        Array.isArray(e.body) &&
        e.body.some(
          (b) => (b as { kind?: string })?.kind === "productAvailability",
        );
      const citesProduct =
        Array.isArray(src) &&
        src.some(
          (s) =>
            (s as { kind?: unknown })?.kind === "product" ||
            (s as { registry?: unknown })?.registry !== undefined,
        );
      if (presentsProduct && !citesProduct) {
        issues.push(
          `${key}: a post with a product block must cite the product's own sources`,
        );
      }
    }

    if (e.section === "models") {
      const src = (e as { sources?: unknown }).sources;
      if (!Array.isArray(src) || src.length === 0) {
        issues.push(`${key}: models entry must cite at least one source`);
      }
      const specs = (e as { specs?: unknown }).specs;
      if (specs !== undefined) {
        if (!Array.isArray(specs)) {
          issues.push(`${key}: specs must be an array`);
        } else {
          for (const s of specs) {
            if (
              !s ||
              typeof s !== "object" ||
              typeof (s as { label?: unknown }).label !== "string" ||
              typeof (s as { value?: unknown }).value !== "string" ||
              typeof (s as { source?: unknown }).source !== "string" ||
              !(s as { source: string }).source.trim()
            ) {
              issues.push(
                `${key}: each spec must have non-empty label, value, and source`,
              );
              break;
            }
          }
        }
      }
    }
  }

  return issues;
}
