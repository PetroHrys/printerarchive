import type { BlogEntry } from "@/lib/content/types";

/**
 * Newest published first. Posts published on the same day are ordered
 * featured-first, then by slug, so the hub, the homepage and llms.txt list
 * them identically on every build — a bare date comparison is not a
 * consistent comparator once two posts share a date.
 *
 * Kept in its own module with only a type-only import so it loads directly
 * under `node --test --experimental-strip-types`, like reading-time.ts.
 */
export function comparePosts(
  a: Pick<BlogEntry, "published" | "featured" | "slug">,
  b: Pick<BlogEntry, "published" | "featured" | "slug">,
): number {
  return (
    b.published.localeCompare(a.published) ||
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    a.slug.localeCompare(b.slug)
  );
}
