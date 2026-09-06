# SEO and AI-search rollout runbook

Use this after review. Do not deploy, submit sitemaps, change crawler policy, or alter Cloudflare settings as part of a routine build.

## 1. Pre-deployment

1. Confirm the live app behavior with product owners:
   - macro goals are view-only in the release being promoted;
   - the app is free to download and includes in-app purchases;
   - the number of unpaid scans, account requirement, and premium gates for every market;
   - USD and Iranian prices and billing periods shown by the current storefronts.
2. Run:
   - `npm ci`
   - `npm run build`
   - `npm run seo:audit`
   - `npm run seo:route-map`
   - `npm run lint`
3. Review `docs/seo-route-map.csv`, especially any unexpected canonical, non-self hreflang, noindex sitemap URL, or redirect source.
4. Inspect the staged homepage, Persian homepage, pricing, FAQ, an article, the calorie calculator, and the three Persian photo-intent pages on mobile and desktop.

## 2. Deployment and HTTP checks

After the normal owner-approved GitHub Pages deployment:

1. Confirm representative URLs return 200 and the current HTML, not a cached prior build.
2. Confirm `/features` redirects directly to `/features/` and tracking parameters retain a clean canonical.
3. Confirm an arbitrary path returns 404.
4. Confirm utility routes remain `noindex` and absent from both sitemaps.
5. Confirm `robots.txt`, `sitemap.xml`, `blog-sitemap.xml`, and `llms.txt` return 200 with correct content types.
6. Compare fetched source HTML with browser DOM for title, description, canonical, hreflang, H1, primary text, and JSON-LD.

## 3. Cloudflare owner actions

These are confirmed production gaps and cannot be enforced by GitHub Pages’ checked-in `_headers`/`_redirects` files:

1. Enable one-hop HTTP → HTTPS redirection for the apex host. Re-test `http://calkilo.com/` without `-L`; expect 301 or 308 to the same HTTPS path.
2. Resolve `www` deliberately:
   - configure it as a valid custom hostname with a matching certificate and redirect it one hop to the apex; or
   - remove the unused `www` DNS record.
3. Configure response headers at Cloudflare:
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - HSTS only after every required subdomain is confirmed HTTPS-capable. Do not add `includeSubDomains` or `preload` prematurely.
4. For bot allow rules, combine the expected user agent with the provider’s published current IP ranges. Never trust a user-agent string by itself.
5. Check firewall and rate-limit logs for verified Googlebot, Bingbot, OAI-SearchBot, and PerplexityBot requests to public pages and discovery files.

## 4. Crawler policy

Search crawling and model training are separate decisions.

- Keep OAI-SearchBot allowed for ChatGPT Search unless the owner explicitly opts out.
- Keep PerplexityBot allowed for Perplexity search unless the owner explicitly opts out.
- Preserve the existing GPTBot and Google-Extended decisions unless the owner explicitly changes training permissions.
- Review [OpenAI’s crawler/IP documentation](https://developers.openai.com/api/docs/bots) and [Perplexity’s current IP endpoints](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) before editing WAF rules.

The current user-agent simulation returned 200, but only provider-IP verification plus logs can confirm genuine crawler access.

## 5. Search Console and Bing Webmaster Tools

Owner-only steps:

1. Verify the domain property using DNS if not already verified.
2. Submit `https://calkilo.com/sitemap.xml` and `https://calkilo.com/blog-sitemap.xml`.
3. Inspect `/`, `/fa/`, `/fa/photo-calorie-calculator/`, `/photo-calorie-calculator/`, `/pricing/`, and one current blog article after deployment.
4. Record declared canonical, selected canonical, last crawl, indexing status, rendered screenshot, and blocking resources.
5. In Search Console, keep branded/nonbranded, page, language/country, and device views separate. Review the Generative AI performance report where available.
6. In Bing Webmaster Tools, submit the same sitemaps and inspect Bingbot crawl/index coverage.
7. Do not request indexing repeatedly; use URL Inspection only for important changed pages.

## 6. Persian consolidation decision gate

Do not redirect any established Persian photo page until evidence passes this gate:

1. Export 90 days of query × page data for:
   - `/fa/photo-calorie-calculator/`
   - `/fa/calorie-counter-with-photo/`
   - `/fa/free-photo-calorie-calculator/`
   - `/fa/ai-calorie-calculator/`
   - `/fa/food-calorie-scanner/`
2. Compare queries, clicks, impressions, CTR, position, conversions, and backlinks.
3. Keep pages whose intent and qualified conversions are distinct.
4. If two pages are demonstrably redundant, prepare a reversible mapping, merge valuable content into the closest equivalent, add one 301 hop, and update internal links, sitemap, canonical, and hreflang in the same release.
5. Never redirect these pages to the homepage merely because their keywords overlap.

## 7. Measurement

Analytics events added by this change:

- `store_click`: store, language, landing page.
- `pricing_plan_click`: plan name, language, landing page.
- `calculator_complete`: calculator identifier only.

Do not add age, sex, height, weight, goal, meal URL, photo, chat, account identifier, or calculated health output to analytics, URLs, or logs. Validate consent behavior and DebugView on staging before relying on these events.

Track organic landing → store click → install/signup/paid conversion where technically and legally available. AI referral sessions are useful directional data but are not a complete count of citations or impressions.

## 8. Performance

Run Lighthouse with a launchable local Chrome outside the managed environment:

```sh
npm run build
python3 -m http.server 4173 -d out
npx lighthouse http://127.0.0.1:4173/ --only-categories=performance,accessibility,seo --output=json --output-path=docs/seo-artifacts/lighthouse-home-mobile.json
npx lighthouse http://127.0.0.1:4173/ --preset=desktop --only-categories=performance,accessibility,seo --output=json --output-path=docs/seo-artifacts/lighthouse-home-desktop.json
```

Repeat for one blog article and `/calorie-calculator/`. Record Chrome/Lighthouse versions, hardware, throttling, viewport, and median of at least three runs. Keep lab results separate from CrUX/RUM field data. Field targets at the 75th percentile are LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1.

## 9. Optional IndexNow

The repository already contains a deduplicated batch submission script and a host verification file. Do not run it on every page view.

1. Confirm the key file is publicly reachable and its content matches the configured key.
2. Set the explicit changed canonical URLs.
3. Run `npm run indexnow:submit` only after an owner-approved deployment.
4. Log response status and retry transient failures with backoff; submission is discovery, not an indexing guarantee.

## 10. Rollback

If product facts or pricing are wrong, revert the content release immediately and correct `lib/product-facts.ts` or `lib/pricing.ts` from authoritative product/store evidence. If indexing or traffic drops materially, restore the prior page content and annotations as one release, clear only the affected Cloudflare cache paths, and annotate the date in Search Console. Do not mass-redirect, deindex a language, or alter robots rules as an emergency shortcut.

