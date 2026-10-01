import type { SectionId } from "@/lib/site";

export interface ArchiveImage {
  src: string; // /images/<section>/<file>.<ext> committed under public/
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit: { source: string; url?: string; license: string };
}

export interface ContentRef {
  section: SectionId;
  slug: string;
}

/** Platforms a product block or product source can point at. */
export type ProductPlatform = "website" | "ios" | "android";

/**
 * A reference in an entry's source list.
 *
 * Historical and technical sources are the default register. A source marked
 * `kind: "product"` is a product's own material — its website, store listing
 * or documentation — cited only for what the product says about itself, and
 * rendered apart from the historical sources so a reader can tell the two
 * kinds of evidence apart.
 *
 * A product source that IS a registry destination (a store listing, a
 * product's website) names it through `registry` instead of restating the
 * URL, so every HELPERG product URL still lives only in
 * lib/ecosystem/product-registry.ts. `registry` and `url` are exclusive.
 */
export interface SourceRef {
  title: string;
  url?: string;
  publisher?: string;
  kind?: "product";
  registry?: {
    product: import("@/lib/products").ProductId;
    platform: ProductPlatform;
  };
}

/**
 * A contextual link rendered inside a paragraph. `anchor` must appear verbatim
 * exactly once in the paragraph's `text`; the renderer splits on it, so no
 * markup is ever stored in content and the body stays plain, escapable text.
 * Internal hrefs are site-relative ("/tools/postscript") and resolve through
 * next/link; `external: true` opens in a new tab with an accessible label.
 */
export interface InlineLink {
  anchor: string;
  href: string;
  external?: boolean;
}

export type ContentBlock =
  | { kind: "heading"; level: 2 | 3; text: string; id?: string }
  | { kind: "paragraph"; text: string; links?: InlineLink[] }
  | { kind: "list"; ordered?: boolean; items: string[] }
  | {
      kind: "callout";
      tone: "note" | "tip" | "warning";
      title?: string;
      text: string;
    }
  | { kind: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { kind: "keyTakeaways"; items: string[] }
  | { kind: "timeline"; events: { period: string; text: string }[] }
  | { kind: "steps"; steps: { title: string; text: string }[] }
  | { kind: "figure"; image: ArchiveImage }
  | { kind: "pullquote"; text: string; attribution?: string }
  | { kind: "footnoteRef"; n: number }
  | {
      kind: "sourceCallout";
      text: string;
      attribution: string;
      source?: { title: string; url?: string };
    }
  | { kind: "editorialAside"; title?: string; text: string }
  | { kind: "timelineBreak"; era: string; year?: string }
  | {
      kind: "quotePlate";
      text: string;
      attribution: string;
      citation?: string;
    }
  | {
      kind: "figurePair";
      left: ArchiveImage;
      right: ArchiveImage;
      caption?: string;
    }
  | {
      kind: "archivalTable";
      caption: string;
      headers: string[];
      rows: string[][];
      sources?: string[];
      figureNumber?: string;
    }
  | { kind: "researchInset"; title: string; items: string[] }
  | {
      /**
       * Where a product can be used, rendered once, in place, inside the
       * article. Destinations come from the ecosystem registry — the block
       * stores no URL — and only platforms the registry marks "available"
       * render as links. The ownership disclosure is part of the block, so a
       * post cannot present a publisher product without it.
       */
      kind: "productAvailability";
      product: import("@/lib/products").ProductId;
      /** What the product does, in verified claims only. */
      summary: string;
      /**
       * Who makes the product and how that relates to PrinterArchive's
       * publisher, naming the companies the product's own listings or terms
       * name. Required: the block cannot render without it, and the article
       * masthead repeats it before any product claim is made.
       */
      disclosure: string;
      /** Optional per-platform label override and detail line. */
      platforms?: Partial<
        Record<ProductPlatform, { label?: string; detail?: string }>
      >;
    };

export interface BaseEntry {
  section: SectionId;
  slug: string;
  title: string;
  description: string; // <=160 chars, SEO meta
  summary: string; // lede paragraph
  body: ContentBlock[];
  hero?: ArchiveImage;
  published: string; // ISO date (YYYY-MM-DD)
  updated: string; // ISO date (YYYY-MM-DD)
  author: string;
  editor: string;
  keywords: string[];
  cluster?: string;
  related?: ContentRef[];
  faqs?: { q: string; a: string }[];
  sources?: SourceRef[];
  footnotes?: { n: number; text: string }[];
  essayLead?: {
    kicker?: string;
    standfirst: string;
    byline?: string;
  };
  deepReading?: { ref: ContentRef; note?: string }[];
  modernTools?: import("@/lib/products").ProductId[];
}

export interface GuideEntry extends BaseEntry {
  section: "guides" | "mobile-printing" | "fax";
  difficulty: "introductory" | "intermediate" | "advanced";
  estimatedTime: string;
}

export interface TroubleshootingEntry extends BaseEntry {
  section: "troubleshooting";
  symptom: string;
  appliesTo: string[];
}

export interface HistoryEntry extends BaseEntry {
  section: "history" | "fax";
  era: string;
}

export interface GlossaryEntry extends BaseEntry {
  section: "glossary";
  term: string;
  shortDefinition: string;
  seeAlso: ContentRef[];
}

export interface BrandEntry extends BaseEntry {
  section: "brands";
  brand: string;
  focusAreas: string[];
}

export interface WorkflowEntry extends BaseEntry {
  section: "workflows";
  goal: string;
  toolsUsed: string[];
}

export interface ToolEntry extends BaseEntry {
  section: "tools";
  purpose: string;
}

/**
 * A reference page for a specific printer or fax machine model. Every spec-like
 * field is OPTIONAL so a page can omit anything it cannot verify against an
 * authoritative source — the source policy forbids inventing specifications.
 * The only field made mandatory beyond BaseEntry is `sources`.
 */
export interface ModelEntry extends BaseEntry {
  section: "models";
  /** Manufacturer as printed on the device / spec sheet. Omit if unverified. */
  manufacturer?: string;
  /** Device class, e.g. "Laser printer", "Dot-matrix printer", "Fax machine". */
  category?: string;
  /** Operational-era label (e.g. "Early laser era"). Source-backed only. */
  era?: string;
  /** Market-introduction year/date — include ONLY if source-backed. */
  introduced?: string;
  /** Discontinuation year/date — include ONLY if source-backed. */
  discontinued?: string;
  /** Other names / model numbers the same machine shipped under. */
  alsoKnownAs?: string[];
  /**
   * Flexible, self-citing spec list — preferred over fixed spec columns so any
   * unknown spec is simply omitted. Every pair names its own source; never
   * fabricate a value to fill a column.
   */
  specs?: { label: string; value: string; source: string }[];
  /** Mandatory on model pages: at least one authoritative source. */
  sources: SourceRef[];
}

export type ContentEntry =
  | GuideEntry
  | TroubleshootingEntry
  | HistoryEntry
  | GlossaryEntry
  | BrandEntry
  | WorkflowEntry
  | ToolEntry
  | ModelEntry;

/**
 * An editorial article in the Blog — PrinterArchive's publishing layer, as
 * distinct from the encyclopedia's reference sections.
 *
 * Blog posts deliberately sit OUTSIDE `SectionId`. The section list is the
 * encyclopedia's taxonomy: it drives the section grid, the entry totals, the
 * knowledge-graph section mirror, and the reference listing in llms.txt.
 * Folding an editorial narrative into that taxonomy would mix the two
 * registers the archive keeps apart. Everything else is reused verbatim —
 * `ContentBlock`, `ArchiveImage`, `ContentRef`, and the whole longform
 * component set — so a post renders through the same machinery as an entry.
 */
export interface BlogEntry extends Omit<BaseEntry, "section"> {
  section: "blog";
  /** Primary editorial category, e.g. "Digital Publishing". Shown as kicker. */
  category: string;
  /**
   * Shorter headline used for <title>, Open Graph and Twitter. The full
   * editorial `title` stays on the page as the H1; this keeps the search
   * result from being truncated mid-clause. Falls back to `title`.
   */
  seoTitle?: string;
  /** Secondary topics, shown as tags on the hub and article. */
  topics?: string[];
  /** Marks the hub's lead story. At most one post should set this. */
  featured?: boolean;
  /**
   * Image for hub and homepage cards, when the article's own plate does not
   * survive a landscape crop (a tall portrait, a scan border). Falls back to
   * the hero, then the first figure.
   */
  cardImage?: ArchiveImage;
  /**
   * ISO date on which the post's time-sensitive external claims were last
   * checked against their primary source. Rendered in the editorial note.
   */
  factsVerified?: string;
}

/**
 * Everything the content-integrity gate validates: encyclopedia entries and
 * editorial posts share one validator so neither register can drift.
 */
export type ArchiveEntry = ContentEntry | BlogEntry;
