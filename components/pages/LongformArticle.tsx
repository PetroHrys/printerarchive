import type { ReactNode } from "react";
import type { ArchiveEntry, ContentBlock, ContentEntry } from "@/lib/content/types";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArchivePlate } from "@/components/content/ArchivePlate";
import { ArticleBody } from "@/components/content/ArticleBody";
import { FaqList } from "@/components/content/FaqList";
import { SourceTransparency } from "@/components/content/SourceTransparency";
import { ArchiveFootnotes } from "@/components/content/ArchiveFootnotes";
import { DeepReadingLinks } from "@/components/content/DeepReadingLinks";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { ModernTools } from "@/components/content/ModernTools";
import { JsonLd } from "@/components/seo/JsonLd";
import { sourceCountLabel, sourceCounts } from "@/lib/content/sources";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type LevelTwoHeading = { kind: "heading"; level: 2; text: string; id?: string };

function isLevelTwoHeading(block: ContentBlock): block is LevelTwoHeading {
  return block.kind === "heading" && block.level === 2;
}

export interface LongformArticleProps {
  entry: ArchiveEntry;
  crumbs: { name: string; href: string }[];
  /** Eyebrow above the H1, already composed by the caller. */
  kicker: string;
  schemas: object[];
  related: ContentEntry[];
  /** Rows in the sticky rail, above the auto-added Updated/Sources rows. */
  railRows?: { term: string; value: ReactNode }[];
  badge?: string;
  /** Byline / date line rendered under the masthead. */
  metaLine?: ReactNode;
  tags?: string[];
  /**
   * Extra block rendered inside the masthead, under the meta line — used by
   * model pages for their identity strip.
   */
  mastheadExtra?: ReactNode;
  /** Rendered between the masthead and the body, full content width. */
  beforeBody?: ReactNode;
  /** `standfirst` uses the entry's own essayLead when present. */
  variant?: "editorial" | "reference";
}

/**
 * The archive's longform reading surface.
 *
 * Structure: a masthead on a raised surface (so the title block reads as a
 * masthead rather than as the first paragraph), then a measured body column
 * with a sticky contents rail, then the source apparatus.
 *
 * Both the encyclopedia's ArticlePage and the Blog's article route render
 * through this component, so an editorial post and a reference entry share
 * typography, measure and furniture. Register-specific material — section
 * labels, reading time, schema shape, spec strips — is composed by the caller.
 */
export function LongformArticle({
  entry: e,
  crumbs,
  kicker,
  schemas,
  related,
  railRows,
  badge = "Verified",
  metaLine,
  tags,
  mastheadExtra,
  beforeBody,
  variant = "reference",
}: LongformArticleProps) {
  const toc = e.body
    .filter(isLevelTwoHeading)
    .map((b) => ({ id: b.id ?? slugify(b.text), text: b.text }))
    .slice(0, 12);

  const standfirst = e.essayLead?.standfirst ?? e.summary;
  const titleClass =
    variant === "editorial" ? "text-display-sm" : "text-masthead";

  return (
    <>
      <JsonLd data={schemas} />

      {/* Masthead */}
      <div className="border-b border-rule bg-paper-raised">
        <Container width="wide" className="pt-6">
          <Breadcrumbs items={crumbs} />
        </Container>
        <Container width="wide" className="pb-10 pt-6 lg:pb-12">
          <div className="max-w-4xl">
            <p className={variant === "editorial" ? "kicker-accent" : "kicker"}>
              {kicker}
            </p>
            <h1 className={`mt-3.5 ${titleClass} text-balance`}>{e.title}</h1>
            <p
              className={`mt-5 max-w-3xl standfirst text-pretty ${
                e.essayLead ? "italic" : ""
              }`}
            >
              {standfirst}
            </p>
            {tags?.length ? (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
                {tags.map((t) => (
                  <li key={t} className="tech-label">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            {metaLine}
          </div>
          {mastheadExtra}
        </Container>
      </div>

      <Container width="wide" className="py-10 lg:py-12">
        {beforeBody}
        {/* The body column is capped at the reading measure and the rail is
            pushed to the far edge, rather than letting a 1fr column leave ~330px
            of dead space between the last word and the rail. */}
        <div className="grid gap-10 xl:grid-cols-[minmax(0,48rem)_15rem] xl:items-start xl:justify-between xl:gap-16">
          <article className="min-w-0 fade-up">
            {e.hero ? (
              <div className="mb-10">
                <ArchivePlate
                  image={e.hero}
                  preload
                  sizes="(max-width: 1280px) 100vw, 860px"
                  raised
                />
              </div>
            ) : null}
            <div className="max-w-[var(--measure-longform)] font-serif text-[1.075rem] leading-[1.78] text-ink">
              <ArticleBody blocks={e.body} />
            </div>
            <div className="max-w-[var(--measure-longform)]">
              {e.faqs?.length ? <FaqList faqs={e.faqs} /> : null}
              {e.sources?.length ? <SourceTransparency sources={e.sources} /> : null}
              {e.footnotes?.length ? <ArchiveFootnotes footnotes={e.footnotes} /> : null}
              {e.deepReading?.length ? <DeepReadingLinks items={e.deepReading} /> : null}
            </div>
            <RelatedLinks items={related} />
            {e.modernTools?.length ? <ModernTools products={e.modernTools} /> : null}
          </article>

          <aside className="hidden xl:block">
            {/* Offset by the ecosystem banner on top of the header allowance,
                so the rail never slides under either sticky element. */}
            <div className="sticky top-[calc(var(--site-header-height)+var(--ecosystem-banner-height)+1.5rem)] space-y-7">
              {toc.length ? (
                <nav aria-labelledby="article-toc">
                  <p id="article-toc" className="tech-label">
                    On this page
                  </p>
                  <ol className="mt-3.5 space-y-0.5 border-l border-rule font-sans text-[0.8125rem]">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="-ml-px block border-l border-transparent py-1.5 pl-4 text-ink-soft no-underline transition-colors hover:border-l-accent hover:text-accent"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}

              <div>
                <p className="inline-flex items-center gap-1.5 border border-[#bfe3cb] bg-verified-wash px-2 py-1 font-sans text-[0.6875rem] font-semibold uppercase tracking-wide text-verified">
                  {badge}
                </p>
                <dl className="mt-4 space-y-3.5">
                  {railRows?.map((row) => (
                    <div key={row.term}>
                      <dt className="tech-label">{row.term}</dt>
                      <dd className="mt-1 font-sans text-sm text-ink-display">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="tech-label">Updated</dt>
                    <dd className="mt-1 font-sans text-sm text-ink-display">
                      <time dateTime={e.updated}>{e.updated}</time>
                    </dd>
                  </div>
                  {e.sources?.length ? (
                    <div>
                      <dt className="tech-label">Sources</dt>
                      <dd className="mt-1 font-sans text-sm text-ink-display tabular-nums">
                        {/* Split only when product material is cited, so
                            reference pages keep their bare count. */}
                        {sourceCounts(e.sources).product > 0
                          ? sourceCountLabel(e.sources)
                          : e.sources.length}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
