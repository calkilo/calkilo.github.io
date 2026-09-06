# Calkilo SEO and AI-search audit

Audit date: 2026-09-06  
Scope: repository production export plus bounded, read-only checks of `https://calkilo.com/`  
Framework: Next.js 16 Pages Router, React 18, static export hosted on GitHub Pages behind Cloudflare

## Outcome

The repository already had a sound static-rendering foundation: crawlable HTML, localized titles and descriptions, self-canonicals, one H1 on sitemap pages, reciprocal hreflang for genuine equivalents, XML sitemaps, a small `llms.txt`, noindex utility routes, real 404 responses, and an export audit. This change set hardens that foundation instead of changing frameworks.

Highest-impact fixes implemented:

- Centralized the verified macro-goal limitation and synchronized all seven homepage locales. The sibling mobile app contains an `adjust_macronutrients` screen and GET endpoint, but no update control or mutation; macro goals are currently view-only.
- Removed internal SEO-strategy language from `/features/`, `/photo-calorie-calculator/`, and `/faq/` source copy and replaced it with workflow instructions and limitations.
- Clarified free versus paid claims. The official Google Play listing confirms a free install with in-app purchases, but public evidence does not establish the number of unpaid scans, account requirements, or market/version-specific gates. The Persian and Italian “free photo” copy now says exactly that.
- Removed `FAQPage` JSON-LD across the site while retaining visible FAQs. Google stopped showing FAQ rich results on 2026-05-07 and removed the feature documentation in June 2026.
- Linked core structured-data entities with stable `#organization`, `#website`, and `#app` identifiers on the homepage and primary product pages.
- Changed homepage pricing controls from inert buttons to crawlable links to the download section and added non-sensitive pricing and calculator-completion events.
- Expanded deterministic regression checks and generated `docs/seo-route-map.csv` from the production export.

## Prioritized findings

| Priority | Classification | Finding and evidence | Resolution / next step |
|---|---|---|---|
| P0 | Confirmed | English said macro targets could be changed; Persian said manual adjustment was unavailable. Mobile source only fetches `/users/macronutrient-goals/` and renders values. | Fixed through `lib/product-facts.ts`; all locale answers now state that goals are visible but not manually editable. |
| P0 | Confirmed | Public copy exposed drafting strategy: “brand searches,” “strongest search pages and AI answers,” and “canonical public answer hub.” | Fixed with user-facing scan, correction, and support instructions. The export audit now rejects those phrases. |
| P0 | Confirmed | “Free” copy implied an unverified free scan entitlement. Google Play confirms install + in-app purchases, not a scan allowance. | Fixed. Copy distinguishes free download from unverified scan/account limits and directs users to the in-app terms for their version and market. Prices and entitlements were not changed. |
| P1 | Confirmed | `FAQPage` schema appeared on product, calculator, comparison, food, and example pages. Google no longer shows the FAQ rich-result feature. | Removed machine-readable FAQ markup; visible questions remain. Regression test rejects reintroduction. |
| P1 | Confirmed | Homepage pricing cards used non-functional `<button>` controls. | Replaced with real `#download` links and a privacy-safe `pricing_plan_click` event. |
| P1 | Confirmed | `http://calkilo.com/` returns HTTP 200 instead of redirecting to HTTPS. | Owner action: enable Cloudflare “Always Use HTTPS” or an equivalent redirect rule, then test for one hop. GitHub Pages `_redirects` is not an enforcement mechanism here. |
| P1 | Confirmed | `https://www.calkilo.com/` fails certificate hostname validation while DNS points to GitHub Pages. | Owner action: either configure `www` as a verified custom domain with a valid certificate and one-hop redirect, or remove the unused DNS record. Do not launch the host until TLS is valid. |
| P1 | Confirmed | `public/_headers` is not reflected in production: HSTS, `X-Content-Type-Options`, and `Referrer-Policy` were absent in sampled responses. | Configure these at Cloudflare; the GitHub Pages origin does not consume Netlify-style `_headers`. Stage and test before enabling HSTS preload. |
| P1 | Confirmed | Existing GSC export is highly concentrated: `/fa/photo-calorie-calculator/` produced 777 clicks and 15,736 impressions, 64.3% of clicks represented by the page export. | Preserve its title, H1, canonical, and URL. Monitor after deployment. |
| P2 | Unverified | Four additional Persian photo pages may overlap, but the available GSC artifact lacks query-by-page data for those URLs. Keyword similarity alone is insufficient evidence. | No consolidation or redirect added. Export query × page data before any URL mapping. Distinct intents are documented in the route map. |
| P2 | Confirmed | Production crawler user-agent simulations returned 200 for Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, and GPTBot. | No robots change. This is diagnostic only; verify genuine bot IPs and logs at Cloudflare. Training policy was preserved. |
| P2 | Confirmed | `robots.txt`, both sitemaps, and `llms.txt` return 200 with suitable text/XML content types. | Kept. `llms.txt` remains an optional generated reference, not a Google ranking mechanism. |
| P2 | Confirmed | Utility routes `/invite/`, `/open-meal/`, `/food-page-analyze/`, and `/dark/` are absent from sitemaps and exported with `noindex`; an arbitrary path returns 404. | Kept and covered by the export audit. |
| P2 | Suspected | Static sitemap `<lastmod>` is omitted while blog dates are derived from CMS timestamps. | Safe current state. Add static lastmod only when a reliable content date is available; do not stamp every build. |
| P2 | Unverified | Search Console’s current index coverage, URL Inspection, Generative AI report, Bing Webmaster status, production logs, CDN firewall rules, and real-user Web Vitals were not accessible. | Follow `docs/seo-ai-search-runbook.md` after deployment. |

## Production baseline

All requested HTML routes sampled on 2026-09-06 returned 200 without redirects: `/`, `/fa/`, `/features/`, `/pricing/`, `/faq/`, `/about/`, `/contact/`, `/blog/`, `/ai-calorie-tracker/`, `/photo-calorie-calculator/`, `/macro-tracker/`, `/calorie-calculator/`, `/best-calorie-counter-for-persian-food/`, `/calkilo-vs-myfitnesspal/`, `/fa/calorie-counter-with-photo/`, `/fa/free-photo-calorie-calculator/`, and `/fa/food-calorie-scanner/`.

Endpoint checks:

| Endpoint | Status | Content type | Observed cache-control |
|---|---:|---|---|
| `/robots.txt` | 200 | `text/plain; charset=utf-8` | `max-age=14400` |
| `/sitemap.xml` | 200 | `application/xml` | `max-age=600` |
| `/blog-sitemap.xml` | 200 | `application/xml` | `max-age=600` |
| `/llms.txt` | 200 | `text/plain; charset=utf-8` | `max-age=600` |
| random nonexistent URL | 404 | `text/html; charset=utf-8` | observed as a genuine error response |

`/features` redirects once to `/features/`. Tracking parameters such as `?utm_source=` leave the canonical clean. The route inventory contains title, description, H1, canonical, hreflang cluster, schema types, internal-link count, locale, indexability, redirect sources, and rendering mode for all 116 canonical sitemap URLs.

## Source HTML versus rendered DOM

Production and local-export pages were checked in a browser as well as from fetched HTML. Primary content and metadata were present in the initial export; hydration did not create a second H1 or change canonical/hreflang. The local English homepage rendered one H1 and Organization, WebSite, WebPage, and SoftwareApplication schema. The local Persian homepage rendered `lang="fa"`, `dir="rtl"`, a self-canonical, one H1, and the synchronized macro limitation.

This establishes rendering consistency, not Google indexing. Indexing must be verified in Search Console.

## Query-to-page map

| Need | Owner page | Evidence / boundary |
|---|---|---|
| Generic Persian calorie counter | `/fa/` | Existing August runbook assigns generic intent here. Validate with current query × page export. |
| Persian photo calorie estimation | `/fa/photo-calorie-calculator/` | Strongest landing page in July GSC export; protect. |
| Persian free-download and scan-limit question | `/fa/free-photo-calorie-calculator/` | Copy now distinguishes free install from unverified feature limits. |
| Persian camera workflow | `/fa/food-calorie-scanner/` | Focused on capture conditions, framing, and hidden ingredients. |
| Persian AI mechanism and uncertainty | `/fa/ai-calorie-calculator/` | Focused on how visible food, portion, and image quality affect the estimate. |
| Daily calorie and macro tracking | `/macro-tracker/`, `/fa/macro-tracker/` | Product tracking intent; no claim of manual target editing. |
| Support and product boundaries | `/faq/`, `/contact/`, `/pricing/` | Public facts first; account-specific questions go to support. |

## Multilingual architecture

Supported public locales are English, Dutch, Russian, Simplified Chinese, Arabic, Persian, and Italian. The export audit passed reciprocal, absolute hreflang annotations, self-references, and `x-default` for actual equivalents. Translated resource pages only advertise languages that exist; unique pages fall back to locale home when switching languages rather than inventing translated URLs.

Arabic and Persian exports use RTL at the `<html>` level. No forced locale redirect was observed or added.

## Structured data

Visible and machine-readable claims now agree on the sampled product pages. Stable identifiers are used for the organization, website, and app. Product pages use SoftwareApplication, while web calculators retain WebApplication. No ratings, reviews, people, credentials, medical validation, user totals, or accuracy percentages were invented.

The monthly/yearly offer values remain the repository’s existing centralized values. Their commercial accuracy still requires owner verification against each live in-app storefront before deployment; this audit did not alter them.

## Performance and accessibility

The local production export was tested at 390×844 and 1440×900. `/calorie-calculator/` had one H1, one form, no unlabelled form controls, and no horizontal overflow at either viewport. Persian rendered RTL without horizontal overflow in the browser check.

Lighthouse 13.0.1 was invoked against the local production export, but the managed environment could not launch/connect to headless Chrome. The PageSpeed Insights API fallback returned quota-exhausted (429). No Lighthouse score or Core Web Vitals pass is claimed. See `docs/seo-artifacts/performance-notes.md` for reproducibility and limitations.

## Verification results

- `npm run build` — passed; 340 static pages generated/exported.
- `npm run seo:audit` — passed for 116 canonical URLs.
- `npm run seo:route-map` — passed; generated the CSV route inventory.
- `npm run lint` — passed after removing one stale hook dependency warning.
- Bounded production HTTP checks — passed for sampled routes/endpoints except the confirmed scheme/`www` issues above.
- Browser checks — passed for source/rendered metadata, Persian locale direction, responsive overflow, form labels, and new pricing-link behavior.
- Lighthouse / PSI scores — not obtained; environment and API quota blockers documented.

## Official guidance rechecked

- [Google generative AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google localized versions guidance](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google software-app structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Google Search documentation updates](https://developers.google.com/search/updates)
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [IndexNow documentation](https://www.indexnow.org/documentation)

