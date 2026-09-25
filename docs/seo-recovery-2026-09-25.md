# Search recovery implementation — 25 September 2026

The June 24–September 23 export records 3,243 clicks and 84,574 impressions. The latest 28 days fell from 1,436 to 662 clicks and from 37,440 to 18,453 impressions versus the preceding 28 days. Impression-weighted average position moved from 7.43 to 9.16. Query and page tables are separate aggregates; they do not prove which page lost a given query or establish cannibalization as the cause.

## Canonical page roles

| Page | Purpose |
| --- | --- |
| `/fa/` | Free browser food/portion calculator, meal totals, links to nutrition tables and daily calorie calculator |
| `/fa/photo-calorie-calculator/` | Photo capture, AI estimate review, free-download limits, and app handoff |
| `/fa/ai-calorie-tracker/` | Daily food diary and macro tracking |
| `/fa/calories/` | Food discovery and serving-level nutrition |
| `/it/` | Branded product overview |
| `/it/photo-calorie-calculator/` | Photo calculation, practical examples, limitations and pricing boundaries |
| `/it/ai-calorie-tracker/` | Daily calorie and macro diary |

Six retired guides are mapped in `data/seo-redirects.json`. Both slash and no-slash requests have permanent redirect rules, consumed by the existing Nginx deployment helper. Static preview and client-navigation fallback pages are noindex with destination canonicals. Discovery files and internal links point to retained pages. Keep the redirects indefinitely; review performance across the entire old-plus-new URL group.

The photo destinations incorporate the useful camera, free-access and AI-method sections of the retired guides. Italian copy distinguishes free download from paid scan access. Falafel and pizza pages give explicit example piece/slice weights using existing cited nutrition data; these weights are illustrative, not asserted standard servings. The Persian hub retains entries only in page memory, labels reference/recipe uncertainty, supports Persian digits and links to original food sources. The existing daily calorie/TDEE calculator remains in English and is labeled accordingly.

The responsive hero now has AVIF variants with matching preload and intrinsic dimensions. Existing eager hero loading, lazy secondary imagery, immutable asset delivery and immediate hero rendering are retained.

## Search Console measurement

The supplied performance ZIP cannot reveal selected canonicals, indexing coverage, real-user Core Web Vitals, or page-by-query losses. No account credentials or Search Console connection were supplied.

1. In Performance → Search results, select Web and compare **2026-08-27–2026-09-23** against **2026-07-30–2026-08-26**. Export Pages and Queries with comparison columns.
2. Filter to each leading page, starting with `/fa/photo-calorie-calculator/`, and export Queries for the same comparison. Repeat for Persian daily tracker, Italian photo/free-photo/daily tracker, and falafel.
3. Filter each leading query, then inspect Pages across the two periods to identify URL switching or simultaneous competing results. Prioritize `کالری شمار`, `کالری شمار غذا انلاین`, `کالری شمار رایگان`, and `کالری شمار با عکس رایگان`.
4. Inspect both retained and retired URLs after deployment. Confirm Google-selected canonical and sitemap status. Check Page indexing, Crawl stats, Manual actions and Security issues before attributing losses to content or algorithms.
5. Check Core Web Vitals for mobile field data; local lab scores alone cannot establish field LCP or INP.
6. Record the actual deployment date. Compare full 28-day post-deployment windows, allowing for recrawl. Track combined clicks/impressions for merged groups, query positions, CTR, browser calculator use and store click-through. Check Iran/mobile and Italy separately.

Do not interpret zero traffic on a redirected URL as failure when the destination gains its traffic. Do not infer a Google update, penalty, or backlink problem from this export alone. Further changes should follow query-by-page evidence.

## Verification

Run lint, tests, production build, `seo:audit`, `seo:food-audit`, and `seo:route-map`. The consolidation audit checks discovery exclusion, permanent rules, canonical fallbacks, lack of chains and retired internal links. Preview `/fa/`, the two retained Italian guides, both food examples, and old aliases. Validate mobile and desktop, Persian numeric input, invalid weights, addition/removal and arithmetic totals.

Production publication uses the repository's existing deployment workflow. Local fallback redirects are not evidence that Nginx has received the new redirect map.

## Results from local verification

- Lint, TypeScript production build and the existing three food-search/two redirect tests passed.
- Export SEO audit: 8,108 canonical URLs passed. Consolidation audit: six merged guides and 102 canonical static pages passed. Food audit: 7,969 pages passed.
- Browser sample: seven important pages at 390px and 1440px, with one H1 each, no horizontal overflow or broken loaded images. After refreshing the completed build there were no local HTTP errors in this matrix. Earlier preview requests during a rebuild produced stale-chunk 404s; they were not reproduced on the completed export.
- Calculator: Persian digits, 200g rice = 260 kcal, 30g falafel = 99.9 kcal, sum = 359.9 kcal; removal, negative weight and over-limit weight passed. All six static fallback redirects reached their retained guide. The compressed preview also returned 301 with preserved query strings for Persian and Italian aliases.
- Hero AVIF delivery is 38–47% smaller than the prior WebP at the four responsive sizes (520, 700, 960 and 1400 pixels). This establishes byte savings, not a measured live ranking or LCP improvement.
- Three local compressed mobile Lighthouse 13.4.1 runs are stored in `reports/seo-recovery-2026-09-25/`. This preview includes gzip to approximate production delivery. Analytics was blocked. The initial uncompressed Python preview gave an unrepresentative 6.5s LCP; it is retained for transparency and is not compared to production.
- Compressed results (Chrome 153): performance 93/100 and Lighthouse SEO 100/100 on all three runs; LCP 3.175s, 3.207s and 3.181s (median 3.181s); CLS zero. LCP remains above the 2.5s target. These local simulated mobile measurements are not live field results or proof of improvement over the older production benchmark.
- Search Console comparisons, Google-selected canonicals and field Core Web Vitals remain unverified without account access. Italian edits have not received an independent native-speaker review. No production publication was performed as part of these local checks.
