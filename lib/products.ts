// App-store product data for the home page, footer, and end-of-article
// "Modern tools" blocks.
//
// Store URLs are NOT stored here. They are derived from the single ecosystem
// registry (lib/ecosystem/product-registry.ts) so that every external HELPERG
// URL exists in exactly one place. The relative import is deliberate: this
// module is loaded directly by `node --test`, which resolves neither the "@/"
// path alias nor an extensionless specifier.
import {
  ECOSYSTEM_PRODUCTS,
  type EcosystemProduct,
} from "./ecosystem/product-registry.ts";

export type ProductId =
  | "zip-rar"
  | "smart-printer"
  | "fax-app"
  | "pdf-editor"
  | "cv-resume"
  | "invoice-maker"
  | "pocket-manager"
  | "esimky";

export interface ProductLink {
  label: string;
  href: string;
}

export interface Product {
  id: ProductId;
  name: string;
  tagline: string;
  /** Optional square app icon under public/images/products/. */
  icon?: string;
  links: ProductLink[];
}

/**
 * Store links for a product, in the established display order:
 * Android, iOS, then the web entry point. Only platforms marked "available"
 * with a real URL are emitted, so an unknown platform can never render as an
 * active link.
 */
function linksFor(id: ProductId): ProductLink[] {
  // Searches every ecosystem product, not just the applications: a product
  // surfaced in a "Modern tools" block may be a web service with no app
  // (Esimky), and its single web entry point is still the honest link.
  const entry: EcosystemProduct | undefined = ECOSYSTEM_PRODUCTS.find(
    (p) => p.id === id,
  );
  if (!entry) {
    throw new Error(`No ecosystem registry entry for product "${id}".`);
  }
  const links: ProductLink[] = [];
  if (entry.androidStatus === "available" && entry.androidUrl) {
    links.push({ label: "Android", href: entry.androidUrl });
  }
  if (entry.iosStatus === "available" && entry.iosUrl) {
    links.push({ label: "iOS", href: entry.iosUrl });
  }
  if (entry.websiteStatus === "available" && entry.websiteUrl) {
    links.push({ label: "Open on the web", href: entry.websiteUrl });
  }
  return links;
}

export const PRODUCTS: Record<ProductId, Product> = {
  "zip-rar": {
    id: "zip-rar",
    name: "ZIP & RAR",
    tagline:
      "Open, create, and extract ZIP and RAR archives on a phone or tablet.",
    icon: "/images/products/zip-rar.jpg",
    links: linksFor("zip-rar"),
  },
  "smart-printer": {
    id: "smart-printer",
    name: "Smart Printer",
    tagline:
      "Print documents and photos from a phone or tablet to a connected printer.",
    icon: "/images/products/smart-printer-app-icon.jpg",
    links: linksFor("smart-printer"),
  },
  "fax-app": {
    id: "fax-app",
    // Matches the ecosystem registry's name: the record now spans the web
    // service and the phone app, so "Fax App" beside "Open on the web" would
    // describe a capability the app does not have.
    name: "Fax",
    tagline:
      "Send and receive faxes from a phone or a browser, without a fax machine.",
    icon: "/images/products/fax-app.jpg",
    links: linksFor("fax-app"),
  },
  "pdf-editor": {
    id: "pdf-editor",
    name: "PDF Editor & Convert",
    tagline: "Edit, convert, combine, and OCR PDF documents.",
    icon: "/images/products/pdf-editor.jpg",
    links: linksFor("pdf-editor"),
  },
  "cv-resume": {
    id: "cv-resume",
    name: "CV Resume",
    tagline: "Build and export a resume or CV as a PDF from a phone or tablet.",
    links: linksFor("cv-resume"),
  },
  "invoice-maker": {
    id: "invoice-maker",
    name: "Invoice Maker",
    tagline: "Create invoices and billing documents and export them as PDFs.",
    links: linksFor("invoice-maker"),
  },
  "pocket-manager": {
    id: "pocket-manager",
    name: "Pocket Manager",
    tagline: "Track receipts, expenses, and financial documents on a phone.",
    links: linksFor("pocket-manager"),
  },
  esimky: {
    id: "esimky",
    name: "Esimky",
    // Web service, not an app: the site states "No app" outright, so no store
    // link exists to claim. The tagline paraphrases the site's own copy.
    tagline:
      "Rent a travel eSIM and receive the activation QR by email, without a physical SIM.",
    links: linksFor("esimky"),
  },
};
