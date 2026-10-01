import type { ContentBlock } from "@/lib/content/types";
import { groupAdjacentFigures } from "@/lib/content/blocks";
import { Callout } from "./Callout";
import { KeyTakeaways } from "./KeyTakeaways";
import { StepList } from "./StepList";
import { Timeline } from "./Timeline";
import { Pullquote } from "./Pullquote";
import { FootnoteRef } from "./FootnoteRef";
import { SourceCallout } from "./SourceCallout";
import { EditorialAside } from "./EditorialAside";
import { TimelineBreak } from "./TimelineBreak";
import { QuotePlate } from "./QuotePlate";
import { FigurePair } from "./FigurePair";
import { ArchivalTable } from "./ArchivalTable";
import { ResearchInset } from "./ResearchInset";
import { Figure } from "./Figure";
import { RichText } from "./RichText";
import { ImageGroup } from "./ImageGroup";
import { ProductAvailability } from "./ProductAvailability";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  const processed = groupAdjacentFigures(blocks);
  return (
    <>
      {processed.map((b, i) => {
        if (b.kind === "figure-group") {
          const cols: 2 | 3 = b.figures.length >= 3 ? 3 : 2;
          return (
            <ImageGroup key={i} columns={cols}>
              {b.figures.map((f, j) => (
                <Figure key={j} image={f.image} />
              ))}
            </ImageGroup>
          );
        }
        switch (b.kind) {
          case "heading": {
            const id = b.id ?? slugify(b.text);
            return b.level === 2 ? (
              <h2
                key={i}
                id={id}
                className="mt-16 mb-4 scroll-mt-32 font-serif text-3xl leading-tight text-ink-display text-balance"
              >
                {b.text}
              </h2>
            ) : (
              <h3
                key={i}
                id={id}
                className="mt-9 mb-3 scroll-mt-32 font-serif text-2xl leading-tight text-ink-display text-balance"
              >
                {b.text}
              </h3>
            );
          }
          case "paragraph":
            return (
              <p
                key={i}
                className={`my-5 text-pretty ${i === 0 ? "dropcap" : ""}`}
              >
                <RichText text={b.text} links={b.links} />
              </p>
            );
          case "list":
            return b.ordered ? (
              <ol
                key={i}
                className="my-5 list-decimal space-y-1.5 pl-6 text-pretty"
              >
                {b.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ol>
            ) : (
              <ul
                key={i}
                className="my-5 list-disc space-y-1.5 pl-6 text-pretty"
              >
                {b.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <Callout key={i} tone={b.tone} title={b.title} text={b.text} />
            );
          case "keyTakeaways":
            return <KeyTakeaways key={i} items={b.items} />;
          case "steps":
            return <StepList key={i} steps={b.steps} />;
          case "timeline":
            return <Timeline key={i} events={b.events} />;
          case "pullquote":
            return (
              <Pullquote key={i} text={b.text} attribution={b.attribution} />
            );
          case "footnoteRef":
            return <FootnoteRef key={i} n={b.n} />;
          case "sourceCallout":
            return (
              <SourceCallout
                key={i}
                text={b.text}
                attribution={b.attribution}
                source={b.source}
              />
            );
          case "editorialAside":
            return <EditorialAside key={i} title={b.title} text={b.text} />;
          case "timelineBreak":
            return <TimelineBreak key={i} era={b.era} year={b.year} />;
          case "quotePlate":
            return (
              <QuotePlate
                key={i}
                text={b.text}
                attribution={b.attribution}
                citation={b.citation}
              />
            );
          case "figurePair":
            return (
              <FigurePair
                key={i}
                left={b.left}
                right={b.right}
                caption={b.caption}
              />
            );
          case "archivalTable":
            return (
              <ArchivalTable
                key={i}
                caption={b.caption}
                headers={b.headers}
                rows={b.rows}
                sources={b.sources}
                figureNumber={b.figureNumber}
              />
            );
          case "researchInset":
            return <ResearchInset key={i} title={b.title} items={b.items} />;
          case "figure":
            return <Figure key={i} image={b.image} />;
          case "productAvailability":
            return (
              <ProductAvailability
                key={i}
                product={b.product}
                summary={b.summary}
                disclosure={b.disclosure}
                platforms={b.platforms}
              />
            );
          case "table":
            return (
              <figure key={i} className="premium-card-sm my-8 overflow-x-auto p-3">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {b.headers.map((h, j) => (
                        <th
                          key={j}
                          className="border border-rule bg-sepia px-3 py-2 text-left font-sans"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k} className="border border-rule px-3 py-2">
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {b.caption && (
                  <figcaption className="mt-2 font-sans text-xs text-ink-faint">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          default: {
            const _exhausted: never = b;
            return _exhausted;
          }
        }
      })}
    </>
  );
}
