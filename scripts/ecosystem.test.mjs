// Integrity tests for the HELPERG ecosystem registry (lib/ecosystem).
//
// The registry is the single source of truth for every external product URL
// surfaced by PrinterArchive, so these tests guard the things a reader would
// otherwise have to trust: that the timeline order is exactly the approved
// order, that no URL is duplicated or invented, that "available" always means a
// real URL exists, and that a platform we know nothing about can never be
// rendered as a working link.
//
// Runs under `npm run test:unit` (node --test --experimental-strip-types).

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = join(import.meta.dirname, "..");

const {
  ECOSYSTEM_WEBSITES,
  ECOSYSTEM_APPLICATIONS,
  ECOSYSTEM_PRODUCTS,
  CURRENT_PRODUCT_ID,
  timelineProducts,
  directoryWebsites,
  directoryApplications,
  platformLinks,
  missingPlatforms,
  resolveCurrentProductId,
  relForLink,
  getProduct,
} = await import(
  pathToFileURL(join(root, "lib/ecosystem/product-registry.ts")).href
);

const { PRODUCTS } = await import(
  pathToFileURL(join(root, "lib/products.ts")).href
);

/** The approved company-timeline order. */
const EXPECTED_TIMELINE = [
  "HELPERG",
  "PetroHrys",
  "WebmasterID",
  "Cash Workspace",
  "GeoBusinessIQ",
  "TalentPartnerID",
  "HRHelperG",
  "Twin Phone",
  "SocialSportHub",
  "AgricultureID",
  "AsteriaStar",
  "FaunaHub",
  "BuildDesignHub",
  "PrinterArchive",
  "Virtue & Power",
  "Global City Intelligence",
];

/** The approved website URLs, keyed by product id. */
const EXPECTED_WEBSITE_URLS = {
  helperg: "https://helperg.com",
  petrohrys: "https://petrohrys.com",
  webmasterid: "https://webmasterid.com",
  "cash-workspace": "https://www.cashworkspace.com",
  geobusinessiq: "https://geobusinessiq.com",
  talentpartnerid: "https://talentpartnerid.com",
  hrhelperg: "https://hrhelperg.com",
  "twin-phone": "https://twin-phone.com",
  socialsporthub: "https://socialsporthub.com",
  agricultureid: "https://agricultureid.com",
  asteriastar: "https://asteriastar.com",
  faunahub: "https://faunahub.com",
  builddesignhub: "https://builddesignhub.com",
  printerarchive: "https://printerarchive.net",
  "virtue-and-power": "https://virtueandpower.com",
  globalcityintelligence: "https://globalcityintelligence.com",
  esimky: "https://esimky.com",
};

/** The approved application links. Absent platform = no verified link. */
const EXPECTED_APPS = {
  "zip-rar": {
    ios: "https://apps.apple.com/app/id6753772583",
    android:
      "https://play.google.com/store/apps/details?id=com.ziparchivator.zip",
  },
  "smart-printer": {
    ios: "https://apps.apple.com/app/id6746067890",
    android:
      "https://play.google.com/store/apps/details?id=com.helperg.smart.printer",
  },
  "fax-app": {
    ios: "https://apps.apple.com/app/id6760895885",
    android: "https://play.google.com/store/apps/details?id=com.helperg.fax.app",
    website: "https://faxb2b.com",
  },
  "pdf-editor": {
    ios: "https://apps.apple.com/app/id6747341672",
    android:
      "https://play.google.com/store/apps/details?id=com.helperg.editor.documents",
    website: "https://www.pdfeditconvert.top",
  },
  "cv-resume": {
    ios: "https://apps.apple.com/app/id6745150815",
  },
  "invoice-maker": {
    ios: "https://apps.apple.com/app/id6747311276",
    android: "https://play.google.com/store/apps/details?id=com.helperg.invoicer",
  },
  "pocket-manager": {
    ios: "https://apps.apple.com/app/id6743084126",
    android: "https://play.google.com/store/apps/details?id=com.helperg.money",
  },
};

// ---------------------------------------------------------------- structure

test("registry has 17 websites and 7 applications", () => {
  assert.equal(ECOSYSTEM_WEBSITES.length, 17);
  assert.equal(ECOSYSTEM_APPLICATIONS.length, 7);
  assert.equal(ECOSYSTEM_PRODUCTS.length, 24);
});

test("product ids are unique", () => {
  const ids = ECOSYSTEM_PRODUCTS.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every product has the required display fields", () => {
  for (const p of ECOSYSTEM_PRODUCTS) {
    assert.ok(p.name.length > 0, `${p.id}: name`);
    assert.ok(p.shortName.length > 0, `${p.id}: shortName`);
    assert.ok(p.description.length > 0, `${p.id}: description`);
    assert.match(p.monogram, /^[A-Z]{2}$/, `${p.id}: monogram`);
    assert.ok(
      p.category === "website" || p.category === "application",
      `${p.id}: category`,
    );
  }
});

// ----------------------------------------------------------------- timeline

test("timeline order is contiguous 1..16 with no duplicates", () => {
  // Only websites that opt into the timeline carry an order. A website with a
  // verified URL but no verified launch date (Esimky) is directory-only rather
  // than inserted at a guessed position, so it holds no timelineOrder at all.
  const timelined = ECOSYSTEM_WEBSITES.filter((p) => p.showInTimeline);
  const orders = timelined.map((p) => p.timelineOrder);
  assert.equal(new Set(orders).size, orders.length, "duplicate timelineOrder");
  assert.deepEqual(
    [...orders].sort((a, b) => a - b),
    Array.from({ length: 16 }, (_, i) => i + 1),
  );
  for (const p of ECOSYSTEM_WEBSITES) {
    if (!p.showInTimeline) {
      assert.equal(p.timelineOrder, undefined, `${p.id} has timelineOrder`);
    }
  }
});

test("timeline renders in exactly the approved order", () => {
  assert.deepEqual(
    timelineProducts().map((p) => p.name),
    EXPECTED_TIMELINE,
  );
});

test("applications never enter the timeline", () => {
  for (const app of ECOSYSTEM_APPLICATIONS) {
    assert.equal(app.showInTimeline, false, `${app.id} in timeline`);
    assert.equal(app.timelineOrder, undefined, `${app.id} has timelineOrder`);
  }
  assert.ok(timelineProducts().every((p) => p.category === "website"));
});

// --------------------------------------------------------- URLs and status

test("website URLs are exactly the approved set", () => {
  const actual = Object.fromEntries(
    ECOSYSTEM_WEBSITES.map((p) => [p.id, p.websiteUrl]),
  );
  assert.deepEqual(actual, EXPECTED_WEBSITE_URLS);
});

test("all 17 websites are marked available", () => {
  for (const p of ECOSYSTEM_WEBSITES) {
    assert.equal(p.websiteStatus, "available", `${p.id}`);
  }
});

test("application store links are exactly the approved set", () => {
  for (const app of ECOSYSTEM_APPLICATIONS) {
    const expected = EXPECTED_APPS[app.id];
    assert.ok(expected, `unexpected application: ${app.id}`);
    assert.equal(app.iosUrl, expected.ios ?? null, `${app.id}: iOS`);
    assert.equal(app.androidUrl, expected.android ?? null, `${app.id}: Android`);
    assert.equal(
      app.websiteUrl,
      expected.website ?? null,
      `${app.id}: website`,
    );
  }
  assert.equal(
    ECOSYSTEM_APPLICATIONS.length,
    Object.keys(EXPECTED_APPS).length,
  );
});

test("status and URL always agree on every platform", () => {
  for (const p of ECOSYSTEM_PRODUCTS) {
    for (const platform of ["website", "webApp", "ios", "android"]) {
      const url = p[`${platform}Url`];
      const status = p[`${platform}Status`];
      assert.ok(
        ["available", "unavailable", "unknown"].includes(status),
        `${p.id}.${platform}: invalid status "${status}"`,
      );
      if (status === "available") {
        assert.ok(url, `${p.id}.${platform}: available but no URL`);
      } else {
        assert.equal(url, null, `${p.id}.${platform}: URL with status ${status}`);
      }
    }
  }
});

test("no URL is duplicated across the registry", () => {
  const urls = [];
  for (const p of ECOSYSTEM_PRODUCTS) {
    for (const key of ["websiteUrl", "webAppUrl", "iosUrl", "androidUrl"]) {
      if (p[key]) urls.push(p[key]);
    }
  }
  assert.equal(new Set(urls).size, urls.length, "duplicate URL in registry");
});

test("every URL is https, carries no share parameters, and leaks no local host", () => {
  for (const p of ECOSYSTEM_PRODUCTS) {
    for (const key of ["websiteUrl", "webAppUrl", "iosUrl", "androidUrl"]) {
      const url = p[key];
      if (!url) continue;
      assert.match(url, /^https:\/\//, `${p.id}.${key} is not https`);
      assert.ok(
        !url.includes("pcampaignid"),
        `${p.id}.${key} still carries a share parameter`,
      );
      assert.ok(
        !/localhost|127\.0\.0\.1/i.test(url),
        `${p.id}.${key} leaks a local host`,
      );
    }
  }
});

test("registry source contains no local-host strings (check:routes guard)", () => {
  const source = readFileSync(
    join(root, "lib/ecosystem/product-registry.ts"),
    "utf8",
  );
  assert.ok(!/localhost/i.test(source), "registry mentions a local host");
});

// ------------------------------------------------------- current resolution

test("the current product is PrinterArchive and it is a real timeline entry", () => {
  assert.equal(CURRENT_PRODUCT_ID, "printerarchive");
  const current = getProduct(CURRENT_PRODUCT_ID);
  assert.ok(current, "current product missing from registry");
  assert.equal(current.category, "website");
  assert.equal(current.showInTimeline, true);
  assert.equal(current.websiteUrl, "https://printerarchive.net");
  assert.equal(
    timelineProducts().filter((p) => p.id === CURRENT_PRODUCT_ID).length,
    1,
    "current product must appear exactly once",
  );
});

test("known PrinterArchive hosts resolve to PrinterArchive", () => {
  for (const host of [
    "printerarchive.net",
    "www.printerarchive.net",
    "PrinterArchive.net",
    "printerarchive.net.",
    "printerarchive.net:3000",
  ]) {
    assert.equal(resolveCurrentProductId(host), "printerarchive", host);
  }
});

test("unknown and preview hosts resolve to null, never a wrong product", () => {
  for (const host of [
    undefined,
    null,
    "",
    "localhost",
    "127.0.0.1",
    "deploy-preview-42--printerarchive.netlify.app",
    "printerarchive-preview.netlify.app",
    "printerarchive.net.evil.example",
    "myprinterarchive.net",
    "example.com",
  ]) {
    assert.equal(
      resolveCurrentProductId(host),
      null,
      `${host} should not resolve to a product`,
    );
  }
});

test("each sibling host resolves only to its own product", () => {
  for (const p of ECOSYSTEM_WEBSITES) {
    for (const domain of p.currentSiteDomains ?? []) {
      assert.equal(resolveCurrentProductId(domain), p.id, domain);
    }
  }
});

// ------------------------------------------------------------- link surface

test("platformLinks only ever returns verified, available URLs", () => {
  for (const p of ECOSYSTEM_PRODUCTS) {
    for (const link of platformLinks(p)) {
      assert.ok(link.url, `${p.id}: link without URL`);
      assert.equal(
        p[`${link.platform === "web-app" ? "webApp" : link.platform}Status`],
        "available",
      );
    }
  }
});

test("a product with no verified link for a platform exposes no link for it", () => {
  const cv = getProduct("cv-resume");
  assert.equal(cv.androidStatus, "unknown");
  assert.ok(
    !platformLinks(cv).some((l) => l.platform === "android"),
    "cv-resume must not render an Android link",
  );
  assert.ok(missingPlatforms(cv).includes("android"));
});

/** Source with comments removed, so guard prose is not mistaken for output. */
function codeOf(relativePath) {
  return readFileSync(join(root, relativePath), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .toLowerCase();
}

test("missing platforms are never described as planned or coming soon", () => {
  const sources = [
    "lib/ecosystem/product-registry.ts",
    "components/ecosystem/EcosystemDirectory.tsx",
    "components/ecosystem/EcosystemTimeline.tsx",
    "components/ecosystem/EcosystemPanel.tsx",
  ];
  for (const path of sources) {
    const code = codeOf(path);
    for (const banned of [
      "coming soon",
      "in development",
      "planned",
      "launching",
      "beta soon",
    ]) {
      assert.ok(!code.includes(banned), `${path} claims "${banned}"`);
    }
  }
});

test("rel policy: owned websites keep attribution, application links are nofollowed", () => {
  const site = { category: "website" };
  const app = { category: "application" };
  assert.equal(relForLink(site, "website"), "noopener");
  assert.equal(relForLink(site, "web-app"), "noopener");
  assert.equal(relForLink(app, "ios"), "noopener noreferrer nofollow");
  assert.equal(relForLink(app, "android"), "noopener noreferrer nofollow");
  // An application's own marketing site follows the application policy, so the
  // same href is never dofollow here and nofollow in the footer on one page.
  assert.equal(relForLink(app, "website"), "noopener noreferrer nofollow");
});

test("every application URL is nofollowed on every surface it appears", () => {
  for (const app of ECOSYSTEM_APPLICATIONS) {
    for (const link of platformLinks(app)) {
      assert.equal(
        relForLink(app, link.platform),
        "noopener noreferrer nofollow",
        `${app.id}.${link.platform}`,
      );
    }
  }
});

test("directory exposes every supplied product", () => {
  assert.equal(directoryWebsites().length, 17);
  assert.equal(directoryApplications().length, 7);
});

// ------------------------------------------------- single source of truth

test("lib/products.ts hard-codes no URLs of its own", () => {
  const source = readFileSync(join(root, "lib/products.ts"), "utf8");
  assert.ok(
    !/https?:\/\//.test(source),
    "lib/products.ts must derive every URL from the ecosystem registry",
  );
});

test("every lib/products.ts id resolves to a registry entry", () => {
  // PRODUCTS is a superset of the applications: a "Modern tools" block may
  // surface a web service that ships no app (Esimky). Every id must still
  // resolve to a real registry entry, and every application must appear.
  const registryIds = new Set(ECOSYSTEM_PRODUCTS.map((p) => p.id));
  for (const id of Object.keys(PRODUCTS)) {
    assert.ok(registryIds.has(id), `PRODUCTS id not in registry: ${id}`);
  }
  for (const app of ECOSYSTEM_APPLICATIONS) {
    assert.ok(PRODUCTS[app.id], `application missing from PRODUCTS: ${app.id}`);
  }
});

test("website-category products in PRODUCTS expose only their web link", () => {
  for (const id of Object.keys(PRODUCTS)) {
    const entry = ECOSYSTEM_PRODUCTS.find((p) => p.id === id);
    if (entry.category !== "website") continue;
    assert.deepEqual(PRODUCTS[id].links, [
      { label: "Open on the web", href: entry.websiteUrl },
    ]);
  }
});

test("derived product links match the registry exactly", () => {
  for (const app of ECOSYSTEM_APPLICATIONS) {
    const derived = PRODUCTS[app.id].links;
    const expected = [];
    if (app.androidUrl) expected.push({ label: "Android", href: app.androidUrl });
    if (app.iosUrl) expected.push({ label: "iOS", href: app.iosUrl });
    if (app.websiteUrl) {
      expected.push({ label: "Open on the web", href: app.websiteUrl });
    }
    assert.deepEqual(derived, expected, app.id);
  }
});
