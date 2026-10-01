import type { HistoryEntry } from "@/lib/content/types";

const entry: HistoryEntry = {
  section: "history",
  slug: "early-computer-printing",
  title: "Early Computer Printing",
  description:
    "How early computers produced printed output, from line printers to the move toward page-oriented printing.",
  summary:
    "Before page-oriented desktop printers, computer output was dominated by impact and line-based devices. This overview describes that era and the shift toward the page model.",
  era: "From line-based output to page printing",
  body: [
    {
      kind: "keyTakeaways",
      items: [
        "Early computer output was largely impact and line-oriented.",
        "Output was often continuous fan-fold paper rather than cut sheets.",
        "The shift to page-oriented printing changed how documents were composed.",
      ],
    },
    {
      kind: "paragraph",
      text: "Early computer printing looked very different from today's page-at-a-time model. Output was frequently produced a line at a time onto continuous fan-fold paper, prioritising throughput and reliability over typographic refinement.",
    },
    {
      kind: "heading",
      level: 2,
      text: "Line-oriented output",
    },
    {
      kind: "paragraph",
      text: "Many early printers worked line by line and were mechanical and impact-based. They were built for volume and durability in computing environments rather than for fine graphics.",
    },
    {
      kind: "figure",
      image: {
        src: "/images/history/early-computer-printing--ibm-1401-restoration-lab.jpg",
        alt: "Restored IBM 1401 installation at the Computer History Museum: IBM 026 card punches and stacks of punched cards in the foreground, an IBM 1403 line printer with fan-fold paper at the back left, tape drives along the rear wall",
        width: 1600,
        height: 1066,
        caption:
          "The mainframe-era document-processing ecosystem — IBM 1403 line printer, IBM 026 keypunches, and IBM 729 tape drives in a single frame — preserved at the Computer History Museum.",
        credit: {
          source: "Marcin Wichary, Computer History Museum (via Wikimedia Commons / Flickr)",
          url: "https://commons.wikimedia.org/wiki/File:IBM_1401_lab.jpg",
          license: "CC BY 2.0",
        },
      },
    },
    {
      kind: "heading",
      level: 2,
      text: "Continuous paper",
    },
    {
      kind: "paragraph",
      text: "Continuous fan-fold paper with tractor-feed holes was common, suited to long, uninterrupted runs of reports and data rather than individual cut sheets.",
    },
    {
      kind: "figure",
      image: {
        src: "/images/history/early-computer-printing--1940-census-keypunch.jpg",
        alt: "Black-and-white photograph of a 1940 US Census keypunch operator seated at a Hollerith pantograph machine with hands at the keys",
        width: 1600,
        height: 1260,
        caption:
          "1940 US Census keypunch operator at a Hollerith pantograph — the pre-electronic data-entry workforce whose punched output fed the line printer and defined the document pipeline before electronic printing.",
        credit: {
          source: "U.S. Bureau of the Census (via NARA, Wikimedia Commons)",
          url: "https://commons.wikimedia.org/wiki/File:Card_puncher_-_NARA_-_513295.jpg",
          license: "Public domain (U.S. Federal Government work)",
        },
      },
    },
    {
      kind: "heading",
      level: 2,
      text: "Toward the page model",
    },
    {
      kind: "paragraph",
      text: "As non-impact printing and page description approaches matured, output became page-oriented. Documents could be composed as full pages with mixed text and graphics, which reshaped how people designed and produced printed material.",
    },
  ],
  faqs: [
    {
      q: "Why did early printers use continuous paper?",
      a: "Continuous fan-fold paper with tractor feed suited long, uninterrupted runs of reports and data, which was the common need.",
    },
    {
      q: "How was early computer printing different from today?",
      a: "It was largely line-oriented and impact-based, focused on throughput, rather than the page-at-a-time model with rich graphics that came later.",
    },
    {
      q: "What changed with page-oriented printing?",
      a: "Treating output as full pages allowed mixed text and graphics composed as a page, changing how documents were designed.",
    },
  ],
  related: [
    { section: "history", slug: "dot-matrix-printers-explained" },
    { section: "history", slug: "history-of-printers" },
    { section: "history", slug: "office-printing-in-the-1990s" },
  ],
  published: "2026-05-18",
  updated: "2026-05-20",
  author: "PrinterArchive Editorial",
  editor: "PrinterArchive Editorial",
  keywords: [
    "early computer printing",
    "line printer",
    "fan-fold paper",
    "printing history",
  ],
  cluster: "printing-history",
};

export default entry;
