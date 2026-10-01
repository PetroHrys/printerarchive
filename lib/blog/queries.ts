import type { BlogEntry, ContentEntry } from "@/lib/content/types";
import { allPosts } from "@/lib/blog/registry";
import { getEntry } from "@/lib/content/queries";
import { readingMinutes } from "@/lib/blog/reading-time";
import { comparePosts } from "@/lib/blog/order";

export const BLOG = {
  path: "/blog",
  kicker: "Blog / Journal",
  title: "PrinterArchive Blog",
  description:
    "Editorial stories about printing, documents, publishing, information systems and the technologies that changed how knowledge moves.",
  lede: "Stories about printing, documents, publishing, information systems, and the technologies that changed how knowledge moves.",
} as const;

/** Every post, newest published first (same-day ties: see comparePosts). */
export const getPosts = (): BlogEntry[] => [...allPosts].sort(comparePosts);

export const getPost = (slug: string): BlogEntry | undefined =>
  allPosts.find((p) => p.slug === slug);

/**
 * The hub's lead story: the post flagged `featured`, else the newest one.
 * Always defined while at least one post exists.
 */
export const getFeaturedPost = (): BlogEntry | undefined => {
  const posts = getPosts();
  return posts.find((p) => p.featured) ?? posts[0];
};

export const getBlogBreadcrumbs = (slug?: string) => {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: BLOG.path },
  ];
  if (slug) {
    const post = getPost(slug);
    if (post) crumbs.push({ name: post.title, href: `${BLOG.path}/${slug}` });
  }
  return crumbs;
};

/** Encyclopedia entries a post explicitly points at, in declared order. */
export const getPostRelated = (post: BlogEntry): ContentEntry[] =>
  (post.related ?? []).flatMap((ref) => {
    const entry = getEntry(ref.section, ref.slug);
    return entry ? [entry] : [];
  });

export { readingMinutes };
