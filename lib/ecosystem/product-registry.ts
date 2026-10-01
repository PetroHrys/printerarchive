// Single source of truth for the HELPERG ecosystem: every external product
// URL surfaced by PrinterArchive lives here and nowhere else.
//
// Consumers:
//   - components/ecosystem/*      (global banner, timeline, directory panel)
//   - lib/products.ts             (derives the app-store links used by the
//                                  home page, footer, and ModernTools blocks)
//
// HONESTY RULES (enforced by scripts/ecosystem.test.mjs):
//   - A URL is listed only when it has been verified to exist. Every website
//     below returned HTTP 200 on 2026-07-21; every store link is a supplied,
//     verified listing.
//   - "unknown" means we have no verified URL. It is NOT "coming soon",
//     "planned", or "in development", and must never be rendered as such.
//   - "unavailable" is reserved for platforms a product is known not to ship
//     on. We do not guess: absence of information is "unknown".
//   - Descriptions paraphrase each site's own published title/description.
//     No capability is asserted that the product does not itself claim.

export type PlatformStatus = "available" | "unavailable" | "unknown";

export type EcosystemCategory = "website" | "application";

export type EcosystemPlatform = "website" | "web-app" | "ios" | "android";

/** Analytics surface names. Vendor-neutral; no analytics provider is added. */
export type EcosystemSurface =
  | "timeline"
  | "directory-web"
  | "directory-app"
  | "banner-trigger"
  | "article-product";

export interface EcosystemProduct {
  id: string;
  name: string;
  /** Compact label used in the timeline, where horizontal space is scarce. */
  shortName: string;
  description: string;
  category: EcosystemCategory;
  /** Two-letter text monogram. We do not fabricate or copy product logos. */
  monogram: string;
  websiteUrl: string | null;
  websiteStatus: PlatformStatus;
  webAppUrl: string | null;
  webAppStatus: PlatformStatus;
  iosUrl: string | null;
  iosStatus: PlatformStatus;
  androidUrl: string | null;
  androidStatus: PlatformStatus;
  /** 1-based position in the company timeline; websites only. */
  timelineOrder?: number;
  showInTimeline: boolean;
  showInDirectory: boolean;
  /** Exact hostnames this product is served from (no substring matching). */
  currentSiteDomains?: string[];
}

/**
 * The ecosystem websites, in company-timeline order.
 *
 * Descriptions are paraphrased from each site's own <title>/meta description
 * as published on 2026-07-21.
 */
export const ECOSYSTEM_WEBSITES: EcosystemProduct[] = [
  {
    id: "helperg",
    name: "HELPERG",
    shortName: "HELPERG",
    description:
      "The operator: mobile apps and web tools for everyday document, finance, and productivity work.",
    category: "website",
    monogram: "HG",
    websiteUrl: "https://helperg.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 1,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["helperg.com", "www.helperg.com"],
  },
  {
    id: "petrohrys",
    name: "PetroHrys",
    shortName: "PetroHrys",
    description:
      "Independent research on search systems, AI architectures, and automation on the open web.",
    category: "website",
    monogram: "PH",
    websiteUrl: "https://petrohrys.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 2,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["petrohrys.com", "www.petrohrys.com"],
  },
  {
    id: "webmasterid",
    name: "WebmasterID",
    shortName: "WebmasterID",
    description:
      "Privacy-first analytics and AI-visibility platform for publishers and web ecosystems.",
    category: "website",
    monogram: "WI",
    websiteUrl: "https://webmasterid.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 3,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["webmasterid.com", "www.webmasterid.com"],
  },
  {
    id: "cash-workspace",
    name: "Cash Workspace",
    shortName: "Cash Workspace",
    description:
      "Finance templates for invoices, expenses, forecasts, and accountant-ready exports.",
    category: "website",
    monogram: "CW",
    websiteUrl: "https://www.cashworkspace.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 4,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["cashworkspace.com", "www.cashworkspace.com"],
  },
  {
    id: "geobusinessiq",
    name: "GeoBusinessIQ",
    shortName: "GeoBusinessIQ",
    description:
      "Business intelligence on country taxation, banking, company formation, and rankings.",
    category: "website",
    monogram: "GB",
    websiteUrl: "https://geobusinessiq.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 5,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["geobusinessiq.com", "www.geobusinessiq.com"],
  },
  {
    id: "talentpartnerid",
    name: "TalentPartnerID",
    shortName: "TalentPartnerID",
    description:
      "Employment and staffing agency based in Pardubice, Czech Republic; operated by TNT agency s.r.o.",
    category: "website",
    monogram: "TP",
    websiteUrl: "https://talentpartnerid.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 6,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["talentpartnerid.com", "www.talentpartnerid.com"],
  },
  {
    id: "hrhelperg",
    name: "HRHelperG",
    shortName: "HRHelperG",
    description:
      "HR resources, hiring guides, and workforce knowledge for employers and HR professionals.",
    category: "website",
    monogram: "HR",
    websiteUrl: "https://hrhelperg.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 7,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["hrhelperg.com", "www.hrhelperg.com"],
  },
  {
    id: "twin-phone",
    name: "Twin Phone",
    shortName: "Twin Phone",
    // The website and the iOS listing are NOT the same proposition: the site
    // sells browser calling ("no app, SIM, or contract"), while the App Store
    // listing is "TwinPhone: Second Phone Number" (published by HRHELPERG LLC).
    // The description therefore covers both and drops the site's "no app"
    // claim, which the existence of the iOS listing contradicts.
    description:
      "International calling from a browser, and a second phone number on iPhone.",
    category: "website",
    monogram: "TW",
    websiteUrl: "https://twin-phone.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: "https://apps.apple.com/app/id6792280945",
    iosStatus: "available",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 8,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["twin-phone.com", "www.twin-phone.com"],
  },
  {
    id: "socialsporthub",
    name: "SocialSportHub",
    shortName: "SocialSportHub",
    description:
      "Guides to sports, health, nutrition, habits, and clubs for a more active life.",
    category: "website",
    monogram: "SS",
    websiteUrl: "https://socialsporthub.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 9,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["socialsporthub.com", "www.socialsporthub.com"],
  },
  {
    id: "agricultureid",
    name: "AgricultureID",
    shortName: "AgricultureID",
    description:
      "Evidence-based reference on crops, soils, plant disease, pests, livestock, and farming systems.",
    category: "website",
    monogram: "AG",
    websiteUrl: "https://agricultureid.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 10,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["agricultureid.com", "www.agricultureid.com"],
  },
  {
    id: "asteriastar",
    name: "AsteriaStar",
    shortName: "AsteriaStar",
    description:
      "A knowledge platform for astronomy, space, the night sky, and celestial events.",
    category: "website",
    monogram: "AS",
    websiteUrl: "https://asteriastar.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 11,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["asteriastar.com", "www.asteriastar.com"],
  },
  {
    id: "faunahub",
    name: "FaunaHub",
    shortName: "FaunaHub",
    description:
      "Pet care guides, animal facts, and wildlife explainers for owners and curious readers.",
    category: "website",
    monogram: "FH",
    websiteUrl: "https://faunahub.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 12,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["faunahub.com", "www.faunahub.com"],
  },
  {
    id: "builddesignhub",
    name: "BuildDesignHub",
    shortName: "BuildDesignHub",
    description:
      "Practical guides and planning resources for construction, architecture, and design.",
    category: "website",
    monogram: "BD",
    websiteUrl: "https://builddesignhub.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 13,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["builddesignhub.com", "www.builddesignhub.com"],
  },
  {
    id: "printerarchive",
    name: "PrinterArchive",
    shortName: "PrinterArchive",
    description:
      "The internet archive of printing knowledge — printing, fax, scanning, and document workflows.",
    category: "website",
    monogram: "PA",
    websiteUrl: "https://printerarchive.net",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 14,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["printerarchive.net", "www.printerarchive.net"],
  },
  {
    id: "virtue-and-power",
    name: "Virtue & Power",
    shortName: "Virtue & Power",
    description:
      "Classical philosophy, leadership, and statecraft, grounded in primary sources.",
    category: "website",
    monogram: "VP",
    websiteUrl: "https://virtueandpower.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 15,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: ["virtueandpower.com", "www.virtueandpower.com"],
  },
  {
    id: "globalcityintelligence",
    name: "Global City Intelligence",
    shortName: "Global City",
    description:
      "City and country intelligence on affordability, air quality, safety, and resilience, attributed to official sources.",
    category: "website",
    monogram: "GC",
    websiteUrl: "https://globalcityintelligence.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    timelineOrder: 16,
    showInTimeline: true,
    showInDirectory: true,
    currentSiteDomains: [
      "globalcityintelligence.com",
      "www.globalcityintelligence.com",
    ],
  },
  {
    id: "esimky",
    name: "Esimky",
    shortName: "Esimky",
    // Paraphrased from the site's own published title/description on
    // 2026-08-26. The site states "No app" explicitly, so ios/android stay
    // "unknown" and can never render as links.
    description:
      "Travel eSIM rental: prepaid data plans compared by price per GB, with the QR delivered by email.",
    category: "website",
    monogram: "EK",
    websiteUrl: "https://esimky.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: null,
    iosStatus: "unknown",
    androidUrl: null,
    androidStatus: "unknown",
    // Deliberately NOT placed in the company timeline: no launch date has been
    // verified, and the timeline is an approved chronological order. Inserting
    // it at a guessed position would invent chronology. Directory only.
    showInTimeline: false,
    showInDirectory: true,
    currentSiteDomains: ["esimky.com", "www.esimky.com"],
  },
];

/**
 * The ecosystem applications.
 *
 * `id` values intentionally match `ProductId` in lib/products.ts — that module
 * derives its store links from here, so an app URL exists in exactly one place.
 * Apps are directory-only: they are not websites and do not enter the timeline.
 */
export const ECOSYSTEM_APPLICATIONS: EcosystemProduct[] = [
  {
    id: "zip-rar",
    name: "ZIP & RAR",
    shortName: "ZIP & RAR",
    // Deliberately does not assert create/compress capability: the supplied
    // brief flags those claims as unverified against store metadata.
    description: "An archive utility for ZIP and RAR files on phones and tablets.",
    category: "application",
    monogram: "ZR",
    websiteUrl: null,
    websiteStatus: "unknown",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: "https://apps.apple.com/app/id6753772583",
    iosStatus: "available",
    androidUrl:
      "https://play.google.com/store/apps/details?id=com.ziparchivator.zip",
    androidStatus: "available",
    showInTimeline: false,
    showInDirectory: true,
  },
  {
    id: "smart-printer",
    name: "Smart Printer",
    shortName: "Smart Printer",
    description:
      "Print documents and photos from a phone or tablet to a connected printer.",
    category: "application",
    monogram: "SP",
    websiteUrl: null,
    websiteStatus: "unknown",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: "https://apps.apple.com/app/id6746067890",
    iosStatus: "available",
    androidUrl:
      "https://play.google.com/store/apps/details?id=com.helperg.smart.printer",
    androidStatus: "available",
    showInTimeline: false,
    showInDirectory: true,
  },
  {
    id: "fax-app",
    name: "Fax",
    shortName: "Fax",
    // faxb2b.com verified 2026-10-01: HTTP 200, operated by HELPERG LLC per
    // its Terms, and its own pages link to exactly the two store listings
    // below as "our mobile fax app". It is the operator's chosen website for
    // this product, but it is a separate service (faxB2B): its Terms and
    // Privacy Policy state that they do not cover mobile apps. Anything that
    // presents this record must not imply a shared account or history. Both
    // the site and the listings describe sending and receiving, so the
    // description claims nothing beyond that.
    description:
      "Send and receive faxes from a phone or a browser, without a fax machine.",
    category: "application",
    monogram: "FX",
    websiteUrl: "https://faxb2b.com",
    websiteStatus: "available",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: "https://apps.apple.com/app/id6760895885",
    iosStatus: "available",
    androidUrl:
      "https://play.google.com/store/apps/details?id=com.helperg.fax.app",
    androidStatus: "available",
    showInTimeline: false,
    showInDirectory: true,
  },
  {
    id: "pdf-editor",
    name: "PDF Editor & Convert",
    shortName: "PDF Editor",
    description: "Edit, convert, combine, and OCR PDF documents.",
    category: "application",
    monogram: "PE",
    websiteUrl: "https://www.pdfeditconvert.top",
    websiteStatus: "available",
    // No separate web-app URL is verified; the website above is the web entry.
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: "https://apps.apple.com/app/id6747341672",
    iosStatus: "available",
    androidUrl:
      "https://play.google.com/store/apps/details?id=com.helperg.editor.documents",
    androidStatus: "available",
    showInTimeline: false,
    showInDirectory: true,
  },
  {
    id: "cv-resume",
    name: "CV Resume",
    shortName: "CV Resume",
    description: "Build and export a resume or CV as a PDF from a phone or tablet.",
    category: "application",
    monogram: "CV",
    websiteUrl: null,
    websiteStatus: "unknown",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: "https://apps.apple.com/app/id6745150815",
    iosStatus: "available",
    // No Android listing has been supplied or verified. "unknown", not
    // "unavailable": we do not know that it does not exist.
    androidUrl: null,
    androidStatus: "unknown",
    showInTimeline: false,
    showInDirectory: true,
  },
  {
    id: "invoice-maker",
    name: "Invoice Maker",
    shortName: "Invoice Maker",
    description:
      "Create invoices and billing documents and export them as PDFs.",
    category: "application",
    monogram: "IM",
    websiteUrl: null,
    websiteStatus: "unknown",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: "https://apps.apple.com/app/id6747311276",
    iosStatus: "available",
    androidUrl:
      "https://play.google.com/store/apps/details?id=com.helperg.invoicer",
    androidStatus: "available",
    showInTimeline: false,
    showInDirectory: true,
  },
  {
    id: "pocket-manager",
    name: "Pocket Manager",
    shortName: "Pocket Manager",
    description: "Track receipts, expenses, and financial documents on a phone.",
    category: "application",
    monogram: "PM",
    websiteUrl: null,
    websiteStatus: "unknown",
    webAppUrl: null,
    webAppStatus: "unknown",
    iosUrl: "https://apps.apple.com/app/id6743084126",
    iosStatus: "available",
    androidUrl:
      "https://play.google.com/store/apps/details?id=com.helperg.money",
    androidStatus: "available",
    showInTimeline: false,
    showInDirectory: true,
  },
];

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  ...ECOSYSTEM_WEBSITES,
  ...ECOSYSTEM_APPLICATIONS,
];

/**
 * The product this repository publishes.
 *
 * Explicit configuration, not runtime hostname sniffing: the value is identical
 * on production, Netlify previews, and local development, so there is no
 * hydration mismatch and no chance of highlighting the wrong product.
 */
export const CURRENT_PRODUCT_ID = "printerarchive";

/** Websites in timeline order (defensive sort; the array is already ordered). */
export function timelineProducts(): EcosystemProduct[] {
  return ECOSYSTEM_WEBSITES.filter((p) => p.showInTimeline).sort(
    (a, b) => (a.timelineOrder ?? 0) - (b.timelineOrder ?? 0),
  );
}

export function directoryWebsites(): EcosystemProduct[] {
  return ECOSYSTEM_WEBSITES.filter((p) => p.showInDirectory);
}

export function directoryApplications(): EcosystemProduct[] {
  return ECOSYSTEM_APPLICATIONS.filter((p) => p.showInDirectory);
}

export function getProduct(id: string): EcosystemProduct | undefined {
  return ECOSYSTEM_PRODUCTS.find((p) => p.id === id);
}

/**
 * Resolve which ecosystem product a hostname belongs to.
 *
 * Exact host or exact subdomain match only — a preview host that merely
 * *contains* a product string (e.g. "printerarchive-preview.netlify.app")
 * resolves to null rather than falsely claiming to be that product.
 * Unknown hosts return null; callers fall back to CURRENT_PRODUCT_ID.
 */
export function resolveCurrentProductId(hostname?: string | null): string | null {
  if (!hostname) return null;
  const host = hostname.trim().toLowerCase().replace(/\.$/, "").split(":")[0];
  if (!host) return null;
  for (const product of ECOSYSTEM_PRODUCTS) {
    for (const domain of product.currentSiteDomains ?? []) {
      const d = domain.toLowerCase();
      if (host === d || host.endsWith(`.${d}`)) return product.id;
    }
  }
  return null;
}

/** A platform entry that is safe to render as a real anchor. */
export interface EcosystemPlatformLink {
  platform: EcosystemPlatform;
  label: string;
  url: string;
}

const PLATFORM_LABELS: Record<EcosystemPlatform, string> = {
  website: "Website",
  "web-app": "Web app",
  ios: "iPhone",
  android: "Android",
};

/**
 * Only platforms with status "available" AND a URL are returned, so a missing
 * link can never be rendered as an active anchor.
 */
export function platformLinks(product: EcosystemProduct): EcosystemPlatformLink[] {
  const candidates: [EcosystemPlatform, string | null, PlatformStatus][] = [
    ["website", product.websiteUrl, product.websiteStatus],
    ["web-app", product.webAppUrl, product.webAppStatus],
    ["ios", product.iosUrl, product.iosStatus],
    ["android", product.androidUrl, product.androidStatus],
  ];
  return candidates
    .filter(([, url, status]) => status === "available" && !!url)
    .map(([platform, url]) => ({
      platform,
      label: PLATFORM_LABELS[platform],
      url: url as string,
    }));
}

/** Platforms with no verified link, for quiet "Not listed" annotations. */
export function missingPlatforms(product: EcosystemProduct): EcosystemPlatform[] {
  const out: EcosystemPlatform[] = [];
  if (product.iosStatus !== "available") out.push("ios");
  if (product.androidStatus !== "available") out.push("android");
  return out;
}

export function platformLabel(platform: EcosystemPlatform): string {
  return PLATFORM_LABELS[platform];
}

/**
 * `rel` policy, decided per product rather than per platform.
 *
 * Ecosystem *websites* are owned HELPERG properties and keep referral
 * attribution (`noopener` only). Everything belonging to an *application* —
 * its store listings and its own marketing site alike — keeps the repository's
 * existing, user-approved external-product-link policy of
 * `noopener noreferrer nofollow` (see
 * docs/superpowers/plans/2026-05-20-strategic-product-linking.md).
 *
 * Deciding on the product, not the platform, is what keeps a single URL
 * consistent across surfaces: pdfeditconvert.top is already nofollowed by the
 * footer and the home-page product grid, so the directory must not render the
 * same href as dofollow on the same page.
 */
export function relForLink(
  product: Pick<EcosystemProduct, "category">,
  platform: EcosystemPlatform,
): string {
  return product.category === "application" ||
    platform === "ios" ||
    platform === "android"
    ? "noopener noreferrer nofollow"
    : "noopener";
}
