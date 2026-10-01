import type { ArchiveImage as ArchiveImageData } from "@/lib/content/types";
import { ArchiveImage, CreditLine } from "./ArchiveImage";

interface FigurePairProps {
  left: ArchiveImageData;
  right: ArchiveImageData;
  caption?: string;
}

const sameCredit = (a: ArchiveImageData["credit"], b: ArchiveImageData["credit"]) =>
  a.source === b.source && a.license === b.license && a.url === b.url;

/**
 * Two images read as one comparison.
 *
 * Two portrait images (phone screens) stay side by side at every width:
 * stacked on a phone they would run to more than two screens. Landscape pairs
 * stack below the small breakpoint. When both images carry the same credit it
 * is printed once, under the shared caption, rather than twice.
 */
export function FigurePair({ left, right, caption }: FigurePairProps) {
  const portrait = left.height > left.width && right.height > right.width;
  const shared = sameCredit(left.credit, right.credit);
  const sizes = portrait
    ? "(max-width: 640px) 50vw, 310px"
    : "(max-width: 640px) 100vw, 310px";

  return (
    <figure className="my-8">
      <div className={`grid gap-4 ${portrait ? "grid-cols-2" : "sm:grid-cols-2"}`}>
        <ArchiveImage image={left} noMargin sizes={sizes} hideCredit={shared} />
        <ArchiveImage image={right} noMargin sizes={sizes} hideCredit={shared} />
      </div>
      {caption || shared ? (
        <figcaption className="mt-3 px-1 font-sans text-xs leading-5 text-ink-faint text-pretty">
          {caption ? <span className="block text-ink-soft">{caption}</span> : null}
          {shared ? (
            <span className={caption ? "mt-0.5 block" : "block"}>
              <CreditLine credit={left.credit} />
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
