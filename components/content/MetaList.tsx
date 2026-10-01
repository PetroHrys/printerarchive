import type { ReactNode } from "react";

/**
 * A run of metadata (byline, date, reading time, counts) separated by middle
 * dots.
 *
 * Each dot belongs to the item after it and sits in a fixed-width slot; the
 * run is shifted left by one slot inside a clipping box, so when the run wraps,
 * the dot that would start a line falls into the clipped margin instead of
 * dangling at a line edge. Dots are hidden from assistive technology, and a
 * visually hidden comma keeps the items from running together when the list
 * sits inside a link's accessible name.
 */
export function MetaList({
  items,
  className = "",
}: {
  items: ReactNode[];
  className?: string;
}) {
  const shown = items.filter((i) => i !== null && i !== undefined && i !== false);
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span className="-ml-5 flex flex-wrap gap-y-1">
        {shown.map((item, i) => (
          <span key={i} className="inline-flex">
            <span aria-hidden="true" className="inline-block w-5 shrink-0 text-center">
              ·
            </span>
            <span>
              {item}
              {i < shown.length - 1 ? <span className="sr-only">, </span> : null}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
