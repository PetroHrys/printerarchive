import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  BLOG,
  getPost,
  getBlogBreadcrumbs,
  getPostRelated,
  readingMinutes,
} from "@/lib/blog/queries";
import { LongformArticle } from "@/components/pages/LongformArticle";
import { MetaList } from "@/components/content/MetaList";
import { publisherDisclosures } from "@/lib/blog/disclosure";
import { formatDate } from "@/lib/blog/format";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo/schema";

export function blogArticleMetadata(slug: string): Metadata {
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    // SEO title: the short form, not the full editorial headline.
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `${BLOG.path}/${slug}`,
    type: "article",
    published: post.published,
    modified: post.updated,
    keywords: post.keywords,
  });
}

export function BlogArticlePage({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) notFound();
  const crumbs = getBlogBreadcrumbs(slug);
  // One Article-family node per page: BlogPosting replaces articleSchema here
  // rather than being emitted alongside it.
  const schemas: object[] = [blogPostingSchema(post), breadcrumbSchema(crumbs)];
  if (post.faqs?.length) schemas.push(faqSchema(post.faqs));
  const minutes = readingMinutes(post);
  const disclosures = publisherDisclosures(post);

  return (
    <LongformArticle
      entry={post}
      crumbs={crumbs}
      kicker={`Blog · ${post.category}`}
      schemas={schemas}
      related={getPostRelated(post)}
      variant="editorial"
      badge="Sources cited"
      tags={post.topics}
      railRows={[
        { term: "Category", value: post.category },
        { term: "Reading time", value: `${minutes} min` },
        ...(post.factsVerified
          ? [
              {
                term: "Facts verified",
                value: (
                  <time dateTime={post.factsVerified}>{post.factsVerified}</time>
                ),
              },
            ]
          : []),
      ]}
      metaLine={
        <>
          <p className="mt-6 border-t border-rule pt-4 font-sans text-xs text-ink-faint">
            <MetaList
              items={[
                `By ${post.author}`,
                `Edited by ${post.editor}`,
                <time key="published" dateTime={post.published}>
                  Published {formatDate(post.published)}
                </time>,
                `${minutes} min read`,
              ]}
            />
          </p>
          {/* Shown before any product claim is made: a post that presents
              the publisher's own product or property says so up front. */}
          {disclosures.length > 0 ? (
            <p className="mt-3 max-w-3xl font-sans text-xs leading-5 text-ink-soft text-pretty">
              <span className="font-semibold text-ink-display">Disclosure.</span>{" "}
              {disclosures.map((d) => d.text).join(" ")}
            </p>
          ) : null}
        </>
      }
    />
  );
}
