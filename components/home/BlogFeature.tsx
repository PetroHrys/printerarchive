import Link from "next/link";
import Image from "next/image";
import type { ArchiveImage, BlogEntry, ContentBlock } from "@/lib/content/types";
import {
  getFeaturedPost,
  getPosts,
  readingMinutes,
  BLOG,
} from "@/lib/blog/queries";
import { publisherDisclosures } from "@/lib/blog/disclosure";
import { formatDate } from "@/lib/blog/format";
import { sourceCountLabel } from "@/lib/content/sources";
import { Container } from "@/components/layout/Container";
import { MetaList } from "@/components/content/MetaList";

/** How many stories the homepage surfaces besides the lead. */
const SECONDARY_COUNT = 2;

/**
 * The journal's newest stories, on the homepage.
 *
 * Editorial discovery, not promotion: each story is framed by its own
 * argument, its category and its source count, with the same restraint the
 * articles use. The lead is one row whose plate stays smaller than the page's
 * hero; the other newest stories sit beneath it as compact rows. A story that
 * presents the publisher's own product or site is labelled as such. Only the
 * Blog hub and these stories are linked.
 */
export function BlogFeature() {
  const lead = getFeaturedPost();
  if (!lead) return null;
  const others = getPosts()
    .filter((p) => p.slug !== lead.slug)
    .slice(0, SECONDARY_COUNT);

  const minutes = readingMinutes(lead);
  const plate = cardPlate(lead);
  const href = `${BLOG.path}/${lead.slug}`;

  return (
    <section aria-labelledby="home-blog" className="band-sepia">
      <Container width="wide" className="py-[var(--band)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker-accent">From the blog</p>
            <h2 id="home-blog" className="mt-2 text-display-sm text-balance">
              Latest stories
            </h2>
          </div>
          <Link
            href={BLOG.path}
            className="relative font-sans text-sm font-semibold text-accent no-underline after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[''] hover:underline"
          >
            All stories <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Lead story */}
        <article className="mt-9 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-14">
          <div className="min-w-0">
            <StoryLabels post={lead} />
            <h3 className="mt-3 text-masthead text-balance">
              <Link
                href={href}
                className="scroll-mt-[calc(var(--site-header-height)+var(--ecosystem-banner-height)+1rem)] text-ink-display no-underline hover:text-accent"
              >
                {lead.title}
              </Link>
            </h3>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-ink-soft text-pretty">
              {lead.summary}
            </p>
            <p className="mt-6 meta-line">
              <MetaList
                items={[
                  <time key="d" dateTime={lead.published}>
                    {formatDate(lead.published)}
                  </time>,
                  `${minutes} min read`,
                  sourceCountLabel(lead.sources),
                ]}
              />
            </p>
            <p className="mt-6">
              <Link
                href={href}
                aria-label={`Read story: ${lead.title}`}
                className="relative inline-flex items-center gap-2 border-b-2 border-accent pb-1 font-sans text-sm font-semibold text-accent no-underline transition-colors after:absolute after:-inset-x-2 after:-inset-y-[9px] after:content-[''] hover:border-accent-hover hover:text-accent-hover"
              >
                Read story <span aria-hidden>→</span>
              </Link>
            </p>
          </div>

          {plate ? (
            <figure className="max-lg:order-first">
              <div className="aspect-[3/2] overflow-hidden border border-rule bg-paper-raised">
                <Image
                  src={plate.src}
                  alt={plate.alt}
                  width={plate.width}
                  height={plate.height}
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 meta-line">
                {plate.credit.source} · {plate.credit.license}
              </figcaption>
            </figure>
          ) : null}
        </article>

        {/* The other newest stories */}
        {others.length > 0 ? (
          <div className="mt-12">
            <p className="tech-label">Also in the journal</p>
            <ul className="mt-4 grid gap-x-14 lg:grid-cols-2">
              {others.map((post) => (
                <li key={post.slug} className="min-w-0">
                  <CompactStory post={post} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

/** A secondary story as a single link: labels, title, meta, thumbnail. */
function CompactStory({ post }: { post: BlogEntry }) {
  const plate = cardPlate(post);
  const ecosystem = publisherDisclosures(post).length > 0;
  return (
    <Link
      href={`${BLOG.path}/${post.slug}`}
      className="group grid scroll-mt-[calc(var(--site-header-height)+var(--ecosystem-banner-height)+1rem)] grid-cols-[minmax(0,1fr)_5.5rem] items-start gap-5 border-t border-rule-sepia py-6 no-underline sm:grid-cols-[minmax(0,1fr)_9rem]"
    >
      <span className="block min-w-0">
        <span className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="tech-label">{post.category}</span>
          {ecosystem ? (
            <span className="tech-label text-ink-soft">
              <span className="sr-only">, </span>Publisher&rsquo;s ecosystem
            </span>
          ) : null}
        </span>
        <span className="mt-2 block font-serif text-[1.0625rem] leading-[1.3] text-ink-display text-balance group-hover:text-accent sm:text-[1.25rem] sm:leading-[1.28]">
          {post.title}
        </span>
        <span className="mt-3 block meta-line">
          <MetaList
            items={[
              <time key="d" dateTime={post.published}>
                {formatDate(post.published)}
              </time>,
              `${readingMinutes(post)} min read`,
            ]}
          />
        </span>
      </span>
      {plate ? (
        <span className="block aspect-[4/3] overflow-hidden border border-rule bg-paper-raised">
          <Image
            src={plate.src}
            alt=""
            width={plate.width}
            height={plate.height}
            sizes="(max-width: 640px) 88px, 144px"
            className="h-full w-full object-cover"
          />
        </span>
      ) : null}
    </Link>
  );
}

/** Category, plus a plain label for stories about the publisher's own products. */
function StoryLabels({ post }: { post: BlogEntry }) {
  const ecosystem = publisherDisclosures(post).length > 0;
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1">
      <span className="tech-label">{post.category}</span>
      {ecosystem ? (
        <span className="tech-label text-ink-soft">Publisher&rsquo;s ecosystem</span>
      ) : null}
    </p>
  );
}

/** The image a card shows: the post's card image, hero, or first figure. */
function cardPlate(post: BlogEntry): ArchiveImage | undefined {
  return post.cardImage ?? post.hero ?? firstFigure(post.body);
}

function firstFigure(body: ContentBlock[]): ArchiveImage | undefined {
  for (const b of body) if (b.kind === "figure") return b.image;
  return undefined;
}
