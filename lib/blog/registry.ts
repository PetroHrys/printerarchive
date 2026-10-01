import type { BlogEntry } from "@/lib/content/types";

// Editorial posts, newest first is derived at query time — this list is the
// single place a new post is registered. Adding a story is two steps: write
// content/blog/<slug>.ts, import it here, and it appears on the hub, in the
// sitemap, in the RSS feed, and in llms.txt with no further wiring.
import fromPrintedCityGuides from "@/content/blog/from-printed-city-guides-to-global-city-intelligence";
import fromFaxMachineToPhone from "@/content/blog/from-fax-machine-to-phone-introducing-fax";
import fromPrinterDriversToPhone from "@/content/blog/from-printer-drivers-to-phone-smart-printer";

export const allPosts: BlogEntry[] = [
  fromPrintedCityGuides,
  fromFaxMachineToPhone,
  fromPrinterDriversToPhone,
];
