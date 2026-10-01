# Blog product stories — image manifest

**Date:** 2026-10-01 · **Branch:** `feat/blog-printer-fax-launch-stories` · **Status:** verified, integrated.

Two Blog stories present products of the HELPERG ecosystem, the publisher ecosystem behind
PrinterArchive: *The Fax Machine Became Software* (`/blog/from-fax-machine-to-phone-introducing-fax`)
and *Printing Moved to the Phone* (`/blog/from-printer-drivers-to-phone-smart-printer`).

This manifest records two different kinds of image, because they rest on different permissions:

1. **Product imagery** — first-party screenshots of the publisher ecosystem's own products. These are
   not archival images and do not fall under the archival licence policy (PD / CC0 / CC BY / CC BY-SA);
   they are reproduced on the operator's instruction for these stories, from the products' official
   store listings or captured from the product's own live website. Every caption says so.
2. **Archival imagery** — reused from files already committed under `public/images/`, with the
   credit and licence recorded when they were first accepted. Nothing new was downloaded.

## Product imagery — 5 files, `public/images/blog/`

| ID | File | Source | Operator / rights holder | Retrieved | Dimensions | Derivative operations |
|---|---|---|---|---|---|---|
| BP-01 | `from-fax-machine-to-phone-introducing-fax--app-new-fax.jpg` | App Store listing for *FAX: send from phone* (id6760895885), screenshot 4 of 6; original `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/c4/5b/61/c45b6168-bf9a-e9ba-3f36-8375bd55116c/4.png` (1242×2688) | HELPERG LLC (App Store seller and developer) | 2026-10-01 | 900×1607 | Top 470 px cropped to remove the listing's marketing headline ("ADD / Scan, Photo, Docs"); scaled to 900 px wide; PNG → JPEG q84 |
| BP-02 | `from-fax-machine-to-phone-introducing-fax--app-fax-list.jpg` | Same listing, screenshot 3 of 6; original `…/7e/81/00/7e810090-4c3a-fe27-4bbb-49551cb1a6bb/3.png` (1242×2688) | HELPERG LLC | 2026-10-01 | 900×1607 | Top 470 px cropped to remove the headline ("TRACK / Status Faxes"); scaled; PNG → JPEG q84 |
| BP-03 | `from-fax-machine-to-phone-introducing-fax--web-light-illustration.jpg` | `https://faxb2b.com/`, captured by PrinterArchive in headless Chrome at 1280×800 CSS px, DPR 2, default state (`data-theme="light"`) | HELPERG LLC (operator of faxb2b.com per its Terms) | 2026-10-01 | 1100×960 | Cropped from the 2560×1600 capture to the homepage illustration (x 1330, y 560, 1100×960 device px); PNG → JPEG q84 |
| BP-04 | `from-fax-machine-to-phone-introducing-fax--web-dark-illustration.jpg` | `https://faxb2b.com/`, same capture with the site's own stored theme choice set to dark (`localStorage['faxb2b-theme'] = 'dark'`, the value its header switch writes) | HELPERG LLC | 2026-10-01 | 1100×960 | As BP-03 |
| BP-05 | `from-printer-drivers-to-phone-smart-printer--document-sources.jpg` | App Store listing for *Smart Printer: Scan Master Pro* (id6746067890), screenshot 2 of 7; original `…/3f/1a/ce/3f1aceec-76b8-46da-cb5c-a4717b53c4a8/45.png` (1287×2796) | HRHELPERG LLC (App Store developer); seller hrhelperg s.r.o. | 2026-10-01 | 900×1662 | Top 420 px cropped to remove the headline ("Print. Scan. Copy. One device"), whose "Copy" claim this article does not make; alpha removed; scaled; PNG → JPEG q84 |

### Replaced: the Smart Printer app icon

The previous icon, `public/images/products/smart-printer.jpg` (256×256, used by the footer,
"Modern tools" blocks and the new product block), was a mis-cropped screenshot of the icon: the
printer glyph was cut off on the left and a black band ran down the right edge, visible wherever the
icon renders. It was replaced with the App Store listing's own artwork (`artworkUrl512` from the
iTunes lookup API for id6746067890, retrieved 2026-10-01), scaled from 512×512 to 256×256, JPEG q90,
and saved under a new name, `smart-printer-app-icon.jpg`, so no image CDN or browser can keep
serving a cached copy of the old file under the old URL. `lib/products.ts` is the only reference.
The Fax icon (`fax-app.jpg`) was checked the same way and kept: its corners are baked into dark
artwork and do not show.

The same rule applies to the two faxb2b.com captures: their first, uncropped versions were never
committed, and the cropped files carry new names (`…--web-light-illustration.jpg`,
`…--web-dark-illustration.jpg`) rather than reusing a URL an optimiser may already have cached.

### Why these and not others

- **Headlines were cropped, not kept.** Store screenshots are advertisements: each carries a large
  marketing line. An editorial figure shows the product's working screen and lets the caption speak.
  The Smart Printer screenshot that opens its listing ("10,000+ printers supported") was rejected
  outright: the article does not repeat that compatibility figure, which it cannot verify.
- **The web captures were cropped to the illustration.** The first version used the full 1280×800
  homepage, which put four sign-up buttons and four store badges on the page beside the single
  product block, and shrank the header's theme switch to a few pixels at the column width. The crop
  keeps what the comparison is about, the same drawn fax machine on a light and a dark ground, and
  leaves out every call to action. The caption names the switch instead of showing it.
- **Light and dark were captured, not composed.** The web captures are the live site in its two real
  states. The dark state is set through the same stored choice the site's own sun-and-moon switch
  writes; no CSS was injected. Both states were confirmed by reading `data-theme` on `<html>` before
  capture.
- **No colour-theme imagery exists to show.** The brief asked for coloured themes if they are real.
  None were found: faxb2b.com defines exactly two themes (light, dark) in its stylesheets, and all
  six official app screenshots (identical on the App Store and Google Play) show one dark interface.
  The article therefore makes no claim about colour themes.
- **Google Play screenshots** for Fax are the same six images as the App Store set (they still read
  "mobile fax on iPhone"); the App Store originals were used because they are larger.

## Derived archival crop — 1 file

| ID | File | Source | Licence | Dimensions | Derivative operations |
|---|---|---|---|---|---|
| BA-01 | `from-printed-city-guides-to-global-city-intelligence--card-records-office-1938.jpg` | The repository's own `history/enterprise-document-management--ssb-records-office-1938.jpg` (Library of Congress, via Wikimedia Commons) | Public domain | 1200×800 | Cropped x 96, y 244, 1728×1152 from the 1920×2374 file, scaled to 1200 px. Used only as the Global City Intelligence story's `cardImage`: the centre crop of the full portrait cut through a clerk's head and showed the scan's white margin and black film edge. |

## Archival imagery — reused, nothing downloaded

Every file already existed in the repository with its credit and licence from the original
acceptance (see the manifests dated 2026-05-19 to 2026-08-26). Captions were rewritten for the
stories; credits are copied unchanged.

| Story | File | Use |
|---|---|---|
| Fax | `fax/history-of-business-faxing--panasonic-kx-f90.jpg` (CC BY-SA 4.0) | hero, hub and homepage plate |
| Fax | `history/history-of-fax-machines--caselli-pantelegraph.png` (public domain) | figure |
| Fax | `guides/pc-fax-modems-and-fax-boards--pci-v92-fax-modem-card.jpg` (CC BY-SA 3.0) | figure |
| Fax | `guides/fax-servers-and-inbound-routing--us6396597-fig1-server-mailboxes.png` (public domain, US patent drawing) | figure |
| Smart Printer | `history/early-computer-printing--ibm-1401-restoration-lab.jpg` (CC BY 2.0) | hero, hub card |
| Smart Printer | `history/print-servers-in-large-offices--line-printer-bank.jpg` (CC BY-SA 4.0) | figure |
| Smart Printer | `history/mobile-printing-before-airprint--docomo-infrared-port.jpg` (public domain) | figure |

The IBM 1401 photograph's alt text was corrected in both places it is used (this story and
`history/early-computer-printing`): the foreground is IBM 026 card punches and punched cards, with
the IBM 1403 line printer at the back left — not "a line printer in the foreground".

## Captions and credits for product imagery

Credits say what happened: store screenshots are "official App Store screenshot(s) (headline(s)
cropped)" with "Product screenshot(s) © HELPERG LLC" (Fax) or "© HRHELPERG LLC" (Smart Printer, its
App Store developer); the web captures say "captured by PrinterArchive on 1 October 2026 (cropped)".
None claims the files were supplied. When both images in a pair share a credit, the pair prints it
once.
