# Food database SEO — 2026-09-13

The previous global food browser fetched its records after a button click and had no crawlable sample URLs. It now has a static HTML discovery path from `/fa/calories/` through 25 categories and 174 category/pagination pages to all 7,793 records.

## Changes

- 7,790 new source-specific pages with stable descriptive URLs ending in the original FDC identifier.
- Existing `/fa/calories/rice/`, `/pizza/`, and `/falafel/` URLs preserved and expanded with the full reference table. Category/search links use these URLs, avoiding duplicate pages for the same existing sample.
- Nutrition tables rendered in the initial HTML. The portion calculator progressively updates them after hydration, preserving missing values and the source's per-100-g basis.
- Unique titles/descriptions, self-referencing canonicals, native anchor pagination, three-click maximum discovery depth, and related sample comparisons.
- Original English sample names preserved; 15 common sample names also have curated Persian labels. No invented full translations or claims that every sample is an Iranian food.
- Matching `WebPage`, `Dataset`, `CollectionPage`, `ItemList`, and `BreadcrumbList` markup. No fabricated recipe instructions, ratings, reviews, or medical authorship.
- Visible historical USDA provenance, direct record links, a Persian methodology/source page, and internal links from existing food pages.
- Dedicated `food-sitemap.xml` with 7,964 URLs (7,790 new records + 174 category pages), declared in robots.txt. Legacy URLs and the source page remain in the primary sitemap.
- Food sitemap included in route-map generation and the existing post-deployment IndexNow workflow. No submission was made during this task; the dry run found 8,114 canonical URLs.
- CI now runs the dedicated food audit before deployment.

## Validation

- Production static build passes: 8,317 generated pages including existing redirects and non-indexable routes.
- Whole-site SEO export audit passes for 8,114 canonical URLs.
- Food audit verifies 7,969 food/hub/source URLs, all 7,793 source records, all table values, unique metadata, canonicals, truthful schemas, pagination, and absence of orphan pages. Details are in `audit.json`.
- Chrome checks pass at 390 and 1440 px; no horizontal overflow or page errors. With JavaScript disabled, category navigation, next-page links, original sample names, and all 15 nutrition rows remain usable.
- Persian-number portion calculation, invalid weight handling, and out-of-range category 404s pass.
- TypeScript, ESLint and whitespace checks pass.

Reproduce after building and serving `out/`:

```sh
npm run seo:audit
npm run seo:food-audit
CALKILO_QA_RUNTIME=/path/to/node_modules node scripts/verify-food-seo-browser.cjs
INDEXNOW_DRY_RUN=1 node scripts/submit-indexnow.mjs
```

Set `CALKILO_QA_URL` to override `http://localhost:3011`. The browser runtime requires Playwright and Chrome. The build used `CALKILO_OFFLINE_BUILD=1` to retain the existing blog snapshot.

## Publication

Changes are local and ready for the normal deployment workflow. Indexing is not confirmed by local tests. After deployment, inspect the food sitemap and representative category/detail URLs in Search Console. Search Console ownership and live indexing were not accessed in this task.

## References used

- [Google pagination and incremental loading](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading): real links, independently canonical pagination, crawlable content.
- [Google structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): markup must reflect the visible content.
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): canonical URL discovery.
