#!/usr/bin/env ts-node

/**
 * title-to-amazon.ts
 *
 * Convert a movie title to an Amazon search page URL.
 *
 * Usage (with ts-node):
 *   ts-node title-to-amazon.ts "The Conjuring" --locale=us
 *
 * Or compile to JS and run with node:
 *   tsc title-to-amazon.ts
 *   node title-to-amazon.js "The Conjuring" --locale=uk
 *
 * Optional flags:
 *   --locale  two- or three-letter locale (us, uk, ca, de, fr, jp, it, es, in, com.mx)
 *   --category  optional Amazon category ('movies', 'dvd', 'prime video', 'all')
 */

type LocaleKey =
  | "us" | "com"
  | "uk" | "co.uk"
  | "ca" | "com.ca"
  | "de" | "fr" | "it" | "es" | "jp" | "in"
  | "mx" | "com.mx";

interface Options {
  locale?: LocaleKey;
  category?: "movies" | "dvd" | "prime-video" | "all";
  title: string;
}

/**
 * Map friendly locale keys to Amazon hostnames.
 * Add more mappings as needed.
 */
const LOCALE_HOST: Record<LocaleKey, string> = {
  us: "www.amazon.com",
  com: "www.amazon.com",
  uk: "www.amazon.co.uk",
  "co.uk": "www.amazon.co.uk",
  ca: "www.amazon.ca",
  "com.ca": "www.amazon.ca",
  de: "www.amazon.de",
  fr: "www.amazon.fr",
  it: "www.amazon.it",
  es: "www.amazon.es",
  jp: "www.amazon.co.jp",
  in: "www.amazon.in",
  mx: "www.amazon.com.mx",
  "com.mx": "www.amazon.com.mx",
};

/**
 * Optional category param -> Amazon search index or keywords.
 * For many Amazon sites, the simple "k" query works well; for specific
 * categories we can append a search index or keywords to improve results.
 */
function buildCategoryQuery(category?: Options["category"]) {
  if (!category || category === "all") return "";
  switch (category) {
    case "movies":
      // generic movie results (includes physical & digital)
      return "&i=movies-tv";
    case "dvd":
      // DVD/Blu-ray physical media
      return "&i=videogames&rh=n%3A2625373011"; // note: category indices can vary by locale
    case "prime-video":
      // Prime Video search path is different on some locales; best-effort:
      return "&i=instant-video";
    default:
      return "";
  }
}

/**
 * Convert a title into an Amazon search URL.
 *
 * Example:
 *   toAmazonSearchUrl("The Conjuring", { locale: "us", category: "prime-video" })
 *   -> "https://www.amazon.com/s?k=The%20Conjuring&i=instant-video"
 */
export function toAmazonSearchUrl(title: string, opts?: Omit<Options, "title"> & { locale?: string }) {
  if (!title || title.trim().length === 0) {
    throw new Error("title is required");
  }

  // Normalize locale input (accept things like "uk" or "co.uk" or "com")
  const rawLocale = (opts?.locale ?? "us").toString().toLowerCase() as LocaleKey;
  const localeKey: LocaleKey = (LOCALE_HOST[rawLocale as LocaleKey] ? rawLocale : "us") as LocaleKey;
  const host = LOCALE_HOST[localeKey] ?? LOCALE_HOST.us;

  // Clean and encode title; include quotes for phrase searching?
  // Most reliable: simple encodeURIComponent of title
  const q = encodeURIComponent(title.trim());

  const categoryQuery = buildCategoryQuery(opts?.category as Options["category"]);

  // Example canonical Amazon search path: /s?k=SEARCHTERM
  const url = `https://${host}/s?k=${q}${categoryQuery}`;

  return url;
}

/* -------------------------
   CLI wrapper (simple)
   ------------------------- */
function parseArgs(argv: string[]): { title: string; locale?: string; category?: Options["category"] } {
  // Skip node and script path
  const args = argv.slice(2);
  const parsed: { title: string; locale?: string; category?: Options["category"] } = {
    title: "",
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith("--locale=")) {
      parsed.locale = a.split("=")[1];
      continue;
    }
    if (a.startsWith("--category=")) {
      const cat = a.split("=")[1] as Options["category"];
      parsed.category = cat;
      continue;
    }
    // if argument starts with dash and isn't recognized, skip
    if (a.startsWith("-")) continue;

    // first non-flag text arguments are assumed to be the title; join remaining as title
    parsed.title = [a, ...args.slice(i + 1).filter(x => !x.startsWith("--"))].join(" ");
    break;
  }

  return parsed;
}

if (require.main === module) {
  try {
    const { title, locale, category } = parseArgs(process.argv);
    if (!title) {
      console.error("Usage: title-to-amazon.ts \"Movie Title\" [--locale=us] [--category=prime-video]");
      process.exit(2);
    }
    const url = toAmazonSearchUrl(title, { locale: locale as LocaleKey | undefined, category });
    console.log(url);
  } catch (err: any) {
    console.error("Error:", err?.message ?? err);
    process.exit(1);
  }
}

/* Example usages (programmatic):
import { toAmazonSearchUrl } from './title-to-amazon';

console.log(toAmazonSearchUrl("The Conjuring", { locale: "us", category: "prime-video" }));
console.log(toAmazonSearchUrl("Train to Busan", { locale: "uk", category: "all" }));
*/
