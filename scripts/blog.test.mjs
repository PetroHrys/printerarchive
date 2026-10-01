// Unit tests for the editorial Blog layer: the content-integrity rules that
// guard inline links and blog posts, and the deterministic reading estimate.
//
// Runs under Node type-stripping alongside the other suites:
//   node --test --experimental-strip-types

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// Modules are loaded by path because only type-only "@/" imports survive
// Node's type-stripping — the same approach the other suites use. The post
// modules themselves are read straight from content/blog, which is also how
// scripts/check-content.mjs loads them.
const root = join(import.meta.dirname, "..");
const load = (rel) => import(pathToFileURL(join(root, rel)).href);

const { findContentIssues } = await load("lib/content/integrity.ts");
const { readingMinutes } = await load("lib/blog/reading-time.ts");

const postFiles = readdirSync(join(root, "content/blog"))
  .filter((f) => f.endsWith(".ts"))
  .sort();
const allPosts = [];
for (const f of postFiles) {
  const mod = await load(`content/blog/${f}`);
  allPosts.push(mod.default);
}

const basePost = (over = {}) => ({
  section: "blog",
  slug: "test-post",
  title: "Test post",
  description: "A test post.",
  summary: "A test post summary.",
  category: "Digital Publishing",
  body: [{ kind: "paragraph", text: "Body text." }],
  published: "2026-01-01",
  updated: "2026-01-01",
  author: "PrinterArchive Editorial",
  editor: "PrinterArchive Editorial",
  keywords: ["test"],
  sources: [{ title: "A source", url: "https://example.org" }],
  ...over,
});

test("a well-formed blog post passes integrity", () => {
  assert.deepEqual(findContentIssues([basePost()]), []);
});

test("a blog post must declare a category", () => {
  const issues = findContentIssues([basePost({ category: "" })]);
  assert.ok(issues.some((i) => i.includes("must declare a category")));
});

test("a blog post must cite at least one source", () => {
  const issues = findContentIssues([basePost({ sources: [] })]);
  assert.ok(issues.some((i) => i.includes("must cite at least one source")));
});

test("factsVerified must be an ISO date when present", () => {
  const issues = findContentIssues([basePost({ factsVerified: "Sept 2026" })]);
  assert.ok(issues.some((i) => i.includes("factsVerified is not an ISO date")));
});

test("an inline anchor missing from the paragraph text is an error", () => {
  const issues = findContentIssues([
    basePost({
      body: [
        {
          kind: "paragraph",
          text: "Body text.",
          links: [{ anchor: "not present", href: "/tools/what-is-pdf" }],
        },
      ],
    }),
  ]);
  assert.ok(issues.some((i) => i.includes("occurs 0x in text")));
});

test("an ambiguous inline anchor (appearing twice) is an error", () => {
  const issues = findContentIssues([
    basePost({
      body: [
        {
          kind: "paragraph",
          text: "PDF and PDF again.",
          links: [{ anchor: "PDF", href: "/tools/what-is-pdf" }],
        },
      ],
    }),
  ]);
  assert.ok(issues.some((i) => i.includes("occurs 2x in text")));
});

test("an internal inline link to a non-existent route is an error", () => {
  const issues = findContentIssues([
    basePost({
      body: [
        {
          kind: "paragraph",
          text: "See the widget page.",
          links: [{ anchor: "widget page", href: "/guides/no-such-widget" }],
        },
      ],
    }),
  ]);
  assert.ok(issues.some((i) => i.includes("internal link does not resolve")));
});

test("an internal inline link to a static route resolves", () => {
  const issues = findContentIssues([
    basePost({
      body: [
        {
          kind: "paragraph",
          text: "See the timeline.",
          links: [{ anchor: "timeline", href: "/timeline" }],
        },
      ],
    }),
  ]);
  assert.deepEqual(issues, []);
});

test("an off-site link must be marked external and use https", () => {
  const unmarked = findContentIssues([
    basePost({
      body: [
        {
          kind: "paragraph",
          text: "See elsewhere.",
          links: [{ anchor: "elsewhere", href: "https://example.org" }],
        },
      ],
    }),
  ]);
  assert.ok(unmarked.some((i) => i.includes("not marked external")));

  const insecure = findContentIssues([
    basePost({
      body: [
        {
          kind: "paragraph",
          text: "See elsewhere.",
          links: [
            { anchor: "elsewhere", href: "http://example.org", external: true },
          ],
        },
      ],
    }),
  ]);
  assert.ok(insecure.some((i) => i.includes("must be https")));
});

test("readingMinutes is deterministic and at least one minute", () => {
  const short = basePost();
  assert.equal(readingMinutes(short), readingMinutes(short));
  assert.equal(readingMinutes(short), 1);

  const long = basePost({
    body: [{ kind: "paragraph", text: "word ".repeat(440).trim() }],
  });
  // 440 body words + 4 summary words at 220 wpm rounds up to 3 minutes.
  assert.equal(readingMinutes(long), 3);
});

test("every registered post is unique by slug and has a body", () => {
  const slugs = allPosts.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate blog slug");
  for (const p of allPosts) {
    assert.equal(p.section, "blog", `${p.slug}: section must be "blog"`);
    assert.ok(p.body.length > 0, `${p.slug}: empty body`);
  }
});

test("at most one post is featured", () => {
  const featuredCount = allPosts.filter((p) => p.featured).length;
  assert.ok(featuredCount <= 1, "at most one post may be featured");
});

test("every post file is registered in the blog registry", async () => {
  const registry = readFileSync(join(root, "lib/blog/registry.ts"), "utf8");
  for (const f of postFiles) {
    const slug = f.replace(/\.ts$/, "");
    assert.ok(
      registry.includes(`@/content/blog/${slug}`),
      `content/blog/${slug}.ts is not imported by lib/blog/registry.ts`,
    );
  }
});

test("every cross-register reference in a post points at a real content file", () => {
  // findContentIssues resolves refs against whatever set it is handed, and the
  // real gate (scripts/check-content.mjs, plus the build gate in app/sitemap.ts)
  // hands it the whole corpus. Here the same targets are checked directly
  // against the content tree, so a post can never ship a dangling cross-link.
  const exists = (section, slug) =>
    existsSync(join(root, "content", section, `${slug}.ts`));

  for (const post of allPosts) {
    for (const ref of post.related ?? []) {
      assert.ok(
        exists(ref.section, ref.slug),
        `${post.slug}: related -> ${ref.section}/${ref.slug} does not exist`,
      );
    }
    for (const item of post.deepReading ?? []) {
      assert.ok(
        exists(item.ref.section, item.ref.slug),
        `${post.slug}: deepReading -> ${item.ref.section}/${item.ref.slug} does not exist`,
      );
    }
    for (const b of post.body) {
      for (const l of b.links ?? []) {
        if (l.external) continue;
        const parts = l.href.replace(/^\//, "").split("/");
        if (parts.length !== 2) continue; // section hub or static route
        assert.ok(
          exists(parts[0], parts[1]),
          `${post.slug}: inline link -> ${l.href} does not exist`,
        );
      }
    }
  }
});

test("external links in posts are https and restrained in number", () => {
  for (const post of allPosts) {
    const external = post.body.flatMap((b) =>
      (b.links ?? []).filter((l) => l.external),
    );
    for (const l of external) {
      assert.ok(
        l.href.startsWith("https://"),
        `${post.slug}: external link is not https -> ${l.href}`,
      );
    }
    assert.ok(
      external.length <= 5,
      `${post.slug}: ${external.length} external links is not restrained`,
    );
  }
});

test("no ChatGPT-style citation or markdown artefacts leak into post prose", () => {
  const forbidden = [
    /【[^】]*】/, // 【…】 citation brackets
    /\[\d+\]/, // [1] style inline citations
    /\]\(https?:\/\//, // markdown links
    /(^|\s)\*\*\S/, // bold markers
    /(^|\n)#{1,6}\s/, // markdown headings
    /`{1,3}/, // code fences / inline code
  ];
  const strings = [];
  const walk = (v) => {
    if (typeof v === "string") strings.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  for (const p of allPosts) {
    walk({ ...p, sources: undefined, footnotes: p.footnotes });
  }
  for (const s of strings) {
    if (s.startsWith("http")) continue;
    for (const re of forbidden) {
      assert.ok(!re.test(s), `artefact ${re} found in: ${s.slice(0, 90)}`);
    }
  }
});

// ------------------------------------------------- publisher-product stories
//
// Posts about the publisher's own products carry extra obligations: the
// product is presented once, through the registry, with its ownership
// disclosure; its claims rest on its own material, listed apart from the
// history; and the prose never borrows the vocabulary of an independent
// endorsement.

const { comparePosts } = await load("lib/blog/order.ts");
const { resolveSourceUrl, isProductSource, sourceCounts, sourceCountLabel } = await load(
  "lib/content/sources.ts",
);
const { publisherDisclosures } = await load("lib/blog/disclosure.ts");
const { getProduct, platformLinks, ECOSYSTEM_PRODUCTS } = await load(
  "lib/ecosystem/product-registry.ts",
);

const productBlock = (over = {}) => ({
  kind: "productAvailability",
  product: "fax-app",
  summary: "Sends and receives faxes.",
  disclosure: "Fax is made by HELPERG LLC, the company that publishes PrinterArchive.",
  ...over,
});

test("a product block with an unknown product id is an error", () => {
  const issues = findContentIssues([
    basePost({
      body: [productBlock({ product: "no-such-app" })],
      sources: [{ title: "Listing", kind: "product", url: "https://example.org" }],
    }),
  ]);
  assert.ok(issues.some((i) => i.includes("product does not resolve")));
});

test("a product block with an unknown platform key is an error", () => {
  const issues = findContentIssues([
    basePost({
      body: [productBlock({ platforms: { windows: { detail: "x" } } })],
      sources: [{ title: "Listing", kind: "product", url: "https://example.org" }],
    }),
  ]);
  assert.ok(issues.some((i) => i.includes('unknown platform "windows"')));
});

test("a post with a product block must cite the product's own sources", () => {
  const without = findContentIssues([basePost({ body: [productBlock()] })]);
  assert.ok(
    without.some((i) => i.includes("must cite the product's own sources")),
  );
  const withRegistry = findContentIssues([
    basePost({
      body: [productBlock()],
      sources: [
        { title: "History", url: "https://example.org" },
        {
          title: "App Store listing",
          kind: "product",
          registry: { product: "fax-app", platform: "ios" },
        },
      ],
    }),
  ]);
  assert.deepEqual(withRegistry, []);
});

test("a registry source may not restate its URL or skip kind", () => {
  const restated = findContentIssues([
    basePost({
      sources: [
        {
          title: "App Store listing",
          kind: "product",
          url: "https://apps.apple.com/app/id6760895885",
          registry: { product: "fax-app", platform: "ios" },
        },
      ],
    }),
  ]);
  assert.ok(restated.some((i) => i.includes("restates a URL")));

  const unkinded = findContentIssues([
    basePost({
      sources: [
        { title: "Listing", registry: { product: "fax-app", platform: "ios" } },
      ],
    }),
  ]);
  assert.ok(unkinded.some((i) => i.includes('must be kind "product"')));
});

test("registry sources resolve only to available registry URLs", () => {
  const ios = resolveSourceUrl({
    title: "x",
    kind: "product",
    registry: { product: "fax-app", platform: "ios" },
  });
  assert.equal(ios, getProduct("fax-app").iosUrl);
  // Smart Printer has no verified website: a citation cannot invent one.
  const none = resolveSourceUrl({
    title: "x",
    kind: "product",
    registry: { product: "smart-printer", platform: "website" },
  });
  assert.equal(none, undefined);
  assert.equal(isProductSource({ title: "History" }), false);
});

test("every product block and product source in a post resolves through the registry", () => {
  for (const post of allPosts) {
    for (const b of post.body) {
      if (b.kind !== "productAvailability") continue;
      const entry = getProduct(b.product);
      assert.ok(entry, `${post.slug}: product block -> unknown ${b.product}`);
      const available = new Set(platformLinks(entry).map((l) => l.platform));
      for (const platform of Object.keys(b.platforms ?? {})) {
        assert.ok(
          available.has(platform),
          `${post.slug}: ${b.product} block names ${platform}, which the registry does not mark available`,
        );
      }
    }
    for (const s of post.sources ?? []) {
      if (!s.registry) continue;
      assert.ok(
        resolveSourceUrl(s),
        `${post.slug}: source "${s.title}" does not resolve to an available registry URL`,
      );
    }
  }
});

test("a post presents a publisher product at most once, in one product block", () => {
  for (const post of allPosts) {
    const blocks = post.body.filter((b) => b.kind === "productAvailability");
    assert.ok(blocks.length <= 1, `${post.slug}: ${blocks.length} product blocks`);
  }
});

test("post files hard-code no registry URL", () => {
  // Store listings and product websites live only in the ecosystem registry;
  // posts reach them through product blocks and registry-backed sources.
  const registryUrls = ECOSYSTEM_PRODUCTS.filter((p) => p.category === "application")
    .flatMap((p) => [p.websiteUrl, p.webAppUrl, p.iosUrl, p.androidUrl])
    .filter(Boolean);
  for (const f of postFiles) {
    const source = readFileSync(join(root, "content/blog", f), "utf8");
    for (const url of registryUrls) {
      const quoted = new RegExp(`["']${url.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")}/?["']`);
      assert.ok(!quoted.test(source), `content/blog/${f} hard-codes ${url}`);
    }
  }
});

test("posts never use the vocabulary of an independent endorsement", () => {
  const banned = [
    /printerarchive recommends/i,
    /editor'?s choice/i,
    /\bbest (fax|printing|printer|mobile)[\w ]* app\b/i,
    /#1\b/,
    /\bnumber one\b/i,
    /industry[- ]leading/i,
    /award[- ]winning/i,
    /trusted by/i,
    /eye strain/i,
    /saves? (the )?battery/i,
  ];
  const strings = [];
  const walk = (v) => {
    if (typeof v === "string") strings.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  for (const p of allPosts) walk(p);
  for (const s of strings) {
    for (const re of banned) {
      assert.ok(!re.test(s), `endorsement wording ${re} in: ${s.slice(0, 90)}`);
    }
  }
});

test("same-day posts order featured first, then by slug; dates still lead", () => {
  const posts = [
    { slug: "b-story", published: "2026-10-01" },
    { slug: "a-story", published: "2026-10-01" },
    { slug: "z-lead", published: "2026-10-01", featured: true },
    { slug: "older", published: "2026-09-12", featured: false },
    { slug: "newest", published: "2026-10-02" },
  ];
  assert.deepEqual(
    [...posts].sort(comparePosts).map((p) => p.slug),
    ["newest", "z-lead", "a-story", "b-story", "older"],
  );
  // A consistent comparator: reversing the input never changes the result.
  assert.deepEqual(
    [...posts].reverse().sort(comparePosts).map((p) => p.slug),
    [...posts].sort(comparePosts).map((p) => p.slug),
  );
});

test("a product block must carry a disclosure", () => {
  const issues = findContentIssues([
    basePost({
      body: [productBlock({ disclosure: "  " })],
      sources: [{ title: "Listing", kind: "product", url: "https://example.org" }],
    }),
  ]);
  assert.ok(issues.some((i) => i.includes("disclosure missing")));
});

test("publisher disclosures come from product blocks and ecosystem-site links", () => {
  const fromBlock = publisherDisclosures({ body: [productBlock()] });
  assert.deepEqual(
    fromBlock.map((d) => [d.id, d.name]),
    [["fax-app", "Fax"]],
  );
  assert.match(fromBlock[0].text, /HELPERG LLC/);

  const fromLink = publisherDisclosures({
    body: [
      {
        kind: "paragraph",
        text: "See Global City Intelligence.",
        links: [
          {
            anchor: "Global City Intelligence",
            href: "https://globalcityintelligence.com/methodology",
            external: true,
          },
        ],
      },
    ],
  });
  assert.deepEqual(fromLink.map((d) => d.id), ["globalcityintelligence"]);

  // Store hosts are shared by every app, so they identify none of them; and
  // PrinterArchive itself is never "disclosed" as a sibling.
  const neutral = publisherDisclosures({
    body: [
      {
        kind: "paragraph",
        text: "An app and this site.",
        links: [
          { anchor: "An app", href: "https://apps.apple.com/app/id6760895885", external: true },
          { anchor: "this site", href: "https://printerarchive.net/blog", external: true },
        ],
      },
    ],
  });
  assert.deepEqual(neutral, []);
});

test("every registered post that presents an ecosystem product or site discloses it", () => {
  // The Global City Intelligence story predates product blocks but features an
  // ecosystem site; it must be caught by link detection, not left unmarked.
  const bySlug = Object.fromEntries(allPosts.map((p) => [p.slug, p]));
  const names = (slug) => publisherDisclosures(bySlug[slug]).map((d) => d.name);
  assert.deepEqual(names("from-fax-machine-to-phone-introducing-fax"), ["Fax"]);
  assert.deepEqual(names("from-printer-drivers-to-phone-smart-printer"), ["Smart Printer"]);
  assert.deepEqual(
    names("from-printed-city-guides-to-global-city-intelligence"),
    ["Global City Intelligence"],
  );
});

test("source counts keep a product's own material apart from the evidence", () => {
  const sources = [
    { title: "A" , url: "https://example.org/a" },
    { title: "B" , url: "https://example.org/b" },
    { title: "Listing", kind: "product", registry: { product: "fax-app", platform: "ios" } },
  ];
  assert.deepEqual(sourceCounts(sources), { independent: 2, product: 1 });
  assert.equal(sourceCountLabel(sources), "2 sources + 1 product source");
  assert.equal(sourceCountLabel([{ title: "A" }]), "1 source");
});
