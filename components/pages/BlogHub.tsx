import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  BLOG,
  getPosts,
  getFeaturedPost,
  getBlogBreadcrumbs,
  readingMinutes,
} from "@/lib/blog/queries";
import { getEntry } from "@/lib/content/queries";
import type {
  ArchiveImage,
  BlogEntry,
  ContentBlock,
  ContentRef,
} from "@/lib/content/types";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, blogSchema } from "@/lib/seo/schema";
import { MetaList } from "@/components/content/MetaList";
import { publisherDisclosures } from "@/lib/blog/disclosure";
import { formatDate } from "@/lib/blog/format";
import { sourceCountLabel } from "@/lib/content/sources";

/**
 * Editorial territories the journal covers.
 *
 * These are NOT placeholder article cards. Each one names a subject the
 * journal writes about and sends the reader to the encyclopedia section that
 * already holds the underlying reference material — so the page is useful
 * today, and gains posts without changing shape.
 */
const THEMES: { title: string; note: string; href: string; hub: string }[] = [
  {
    title: "Printing & publishing",
    note: "How pages get made, and what each production model displaced.",
    href: "/history",
    hub: "Printing history",
  },
  {
    title: "Document systems",
    note: "Capture, indexing, retrieval and retention as designed processes.",
    href: "/workflows",
    hub: "Document workflows",
  },
  {
    title: "Historical transitions",
    note: "The moments a technology stopped being infrastructure.",
    href: "/fax",
    hub: "Fax technology",
  },
  {
    title: "Modern workflows",
    note: "Formats, protocols and standards documents actually travel on.",
    href: "/tools",
    hub: "Tools & formats",
  },
];

/**
 * Encyclopedia entries that pair with the journal's current subject matter —
 * the reference reading behind each published story, two per story.
 */
const FROM_ARCHIVE: ContentRef[] = [
  { section: "history", slug: "history-of-fax-machines" },
  { section: "fax", slug: "internet-fax-t37-and-t38" },
  { section: "guides", slug: "driverless-printing" },
  { section: "tools", slug: "ipp" },
  { section: "history", slug: "history-of-desktop-publishing" },
  { section: "history", slug: "enterprise-document-management" },
];

export function blogHubMetadata(): Metadata {
  return buildMetadata({
    title: BLOG.title,
    description: BLOG.description,
    path: BLOG.path,
  });
}

export function BlogHub() {
  const posts = getPosts();
  const featured = getFeaturedPost();
  const rest = posts.filter((p) => p.slug !== featured?.slug);
  const crumbs = getBlogBreadcrumbs();
  const archive = FROM_ARCHIVE.map((r) => getEntry(r.section, r.slug)).flatMap(
    (e) => (e ? [e] : []),
  );
  const categories = categoryCounts(posts);

  return (
    <>
      <JsonLd
        data={[
          blogSchema(posts, BLOG.title, BLOG.description),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* Masthead. No image plate: the journal's identity is typographic, and
          the previous motif tile floated in an empty column. */}
      <div className="border-b border-rule bg-paper-raised">
        <Container width="wide" className="pt-6">
          <Breadcrumbs items={crumbs} />
        </Container>
        <Container width="wide" className="pb-12 pt-8 lg:pb-14">
          <p className="kicker-accent">Blog / Journal</p>
          <h1 className="mt-4 max-w-[16ch] text-display text-balance">
            PrinterArchive Blog
          </h1>
          <p className="mt-6 max-w-2xl standfirst text-pretty">{BLOG.lede}</p>
          <p className="mt-7 meta-line">
            <MetaList
              items={[
                `${posts.length} ${posts.length === 1 ? "story" : "stories"}`,
                "Essays, not encyclopedia entries",
                "Every claim cited",
              ]}
            />
          </p>
          {categories.length > 1 ? (
            <p className="mt-2 meta-line">
              <span className="sr-only">Categories: </span>
              <MetaList
                items={categories.map(([name, n]) => (
                  <span key={name}>
                    {name}{" "}
                    <span className="tabular-nums text-ink-soft">({n})</span>
                  </span>
                ))}
              />
            </p>
          ) : null}
        </Container>
      </div>

      {featured ? <FeaturedStory post={featured} /> : null}

      {rest.length > 0 ? (
        <section
          aria-labelledby="latest-stories"
          className="border-t border-rule"
        >
          <Container width="wide" className="py-[var(--band)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kicker">Latest stories</p>
                <h2 id="latest-stories" className="mt-2 text-section text-balance">
                  More from the journal
                </h2>
              </div>
            </div>
            <ul
              className={`mt-9 grid gap-x-10 gap-y-12 ${
                rest.length > 1 ? "md:grid-cols-2" : ""
              }`}
            >
              {rest.map((post) => (
                <li key={post.slug} className="min-w-0">
                  <StoryCard post={post} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* Editorial territories */}
      <section aria-labelledby="blog-themes" className="band-sunken">
        <Container width="wide" className="py-[var(--band)]">
          <p className="kicker">What the journal covers</p>
          <h2 id="blog-themes" className="mt-2 text-display-sm text-balance">
            Four editorial territories
          </h2>
          <p className="mt-4 max-w-2xl standfirst">
            Each one already has an encyclopedia section behind it. Stories are
            added as the research warrants, not to fill a grid.
          </p>
          <ul className="mt-9 grid gap-x-10 gap-y-0 sm:grid-cols-2">
            {THEMES.map((t) => (
              <li key={t.title}>
                <Link href={t.href} className="editorial-row group">
                  <span className="block font-sans text-base font-semibold text-ink-display group-hover:text-accent">
                    {t.title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-6 text-ink-soft text-pretty">
                    {t.note}
                  </span>
                  <span className="mt-2 block meta-line">
                    Reference: {t.hub} <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Supporting reading from the encyclopedia */}
      {archive.length > 0 ? (
        <Container width="wide" className="py-[var(--band)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">From the archive</p>
              <h2 className="mt-2 text-display-sm text-balance">
                Reference reading behind the stories
              </h2>
            </div>
          </div>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {archive.map((e) => (
              <li key={`${e.section}/${e.slug}`}>
                <Link
                  href={`/${e.section}/${e.slug}`}
                  className="editorial-row group"
                >
                  <span className="tech-label">{e.section}</span>
                  <span className="mt-2 block font-sans text-[0.95rem] font-semibold leading-6 text-ink-display group-hover:text-accent">
                    {e.title}
                  </span>
                  <span className="mt-1.5 line-clamp-2 block text-sm leading-6 text-ink-soft">
                    {e.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}
    </>
  );
}

/**
 * The lead story. The plate is the larger column, so the lead outranks the
 * cards below it; on narrow screens the plate comes first, as in the cards.
 */
function FeaturedStory({ post }: { post: BlogEntry }) {
  const minutes = readingMinutes(post);
  const plate = cardPlate(post);
  const href = `${BLOG.path}/${post.slug}`;
  const ecosystem = publisherDisclosures(post).length > 0;

  return (
    <section aria-labelledby="featured-story">
      <Container width="wide" className="py-[var(--band)]">
        <p id="featured-story" className="kicker">
          Featured story
        </p>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <StoryLabels category={post.category} ecosystem={ecosystem} />
            <h2 className="mt-3 text-display-sm text-balance">
              <Link href={href} className="text-ink-display no-underline hover:text-accent">
                {post.title}
              </Link>
            </h2>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-ink-soft text-pretty">
              {post.summary}
            </p>
            {post.topics?.length ? (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
                {post.topics.map((t) => (
                  <li key={t} className="tech-label">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-6 border-t border-rule pt-4 meta-line">
              <MetaList
                items={[
                  `By ${post.author}`,
                  <time key="d" dateTime={post.published}>
                    {formatDate(post.published)}
                  </time>,
                  `${minutes} min read`,
                  sourceCountLabel(post.sources),
                ]}
              />
            </p>
            <p className="mt-7">
              <Link
                href={href}
                aria-label={`Read story: ${post.title}`}
                className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-sans text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
              >
                Read story <span aria-hidden>→</span>
              </Link>
            </p>
          </div>

          {plate ? (
            <figure className="max-lg:order-first">
              {/* The title is the story's link; the plate repeats it, so it is
                  not a second tab stop. */}
              <Link href={href} className="block no-underline" tabIndex={-1} aria-hidden>
                <span className="block aspect-[3/2] overflow-hidden border border-rule bg-paper-sunken">
                  <Image
                    src={plate.src}
                    alt={plate.alt}
                    width={plate.width}
                    height={plate.height}
                    preload
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="h-full w-full object-cover"
                  />
                </span>
              </Link>
              <figcaption className="mt-3 caption text-pretty">
                {plate.caption}
                <span className="mt-1 block text-ink-faint">
                  {plate.credit.source} · {plate.credit.license}
                </span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

/**
 * A secondary story. The image, labels and title read as one unit and the
 * whole card is a single link (the title, stretched over the card), so a
 * keyboard or screen-reader user meets each story once, not three times.
 */
function StoryCard({ post }: { post: BlogEntry }) {
  const href = `${BLOG.path}/${post.slug}`;
  const plate = cardPlate(post);
  const dek = post.essayLead?.standfirst ?? post.description;
  const ecosystem = publisherDisclosures(post).length > 0;

  return (
    <article className="group relative flex h-full flex-col">
      {plate ? (
        <div className="aspect-[3/2] overflow-hidden border border-rule bg-paper-sunken">
          <Image
            src={plate.src}
            alt={plate.alt}
            width={plate.width}
            height={plate.height}
            sizes="(max-width: 768px) 100vw, 46vw"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <StoryLabels category={post.category} ecosystem={ecosystem} className="mt-5" />
      <h3 className="mt-2 font-serif text-[1.5rem] leading-[1.22] text-ink-display text-balance">
        <Link
          href={href}
          className="text-ink-display no-underline after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mb-5 mt-3 text-[0.98rem] leading-7 text-ink-soft text-pretty">
        {dek}
      </p>
      <p className="mt-auto border-t border-rule pt-3 meta-line">
        <MetaList
          items={[
            <time key="d" dateTime={post.published}>
              {formatDate(post.published)}
            </time>,
            `${readingMinutes(post)} min read`,
            sourceCountLabel(post.sources),
          ]}
        />
      </p>
    </article>
  );
}

/**
 * Category, plus a plain label when the story presents a product or site of
 * the publisher's own ecosystem — the article itself carries the disclosure.
 */
function StoryLabels({
  category,
  ecosystem,
  className = "",
}: {
  category: string;
  ecosystem: boolean;
  className?: string;
}) {
  return (
    <p className={`flex flex-wrap gap-x-4 gap-y-1 ${className}`}>
      <span className="tech-label">{category}</span>
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

/** Categories in use, most stories first — labels, not routes. */
function categoryCounts(posts: BlogEntry[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function firstFigure(body: ContentBlock[]): ArchiveImage | undefined {
  for (const b of body) if (b.kind === "figure") return b.image;
  return undefined;
}
