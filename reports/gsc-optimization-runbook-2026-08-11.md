# Google Search optimization runbook — 2026-08-11

## Changes shipped from the 90-day export

- `/fa/` is the owner for generic Persian calorie-counter intent: `کالری شمار`, `کالری شمار آنلاین`, `کالری شمار رایگان`, and `کالری شمار غذا آنلاین`.
- `/fa/photo-calorie-calculator/` remains the owner for photo-specific Persian intent. Its established title/H1 were preserved.
- `/photo-calorie-calculator/` now explicitly describes food and meal photos to reduce ambiguity from the irrelevant `calorie counting recipes for photographers` query.
- Italian photo-calculator and AI-tracker titles/descriptions now match natural free/photo/app intent.
- Resource pages include visible product proof: a meal image, example calorie/macro output, correction workflow, and an explicit limitations note.
- Store links emit a GA4 `store_click` event with `store`, `language`, and `landing_page` parameters.

## Search Console checks that require dimensioned exports

Run these checks after deployment. Aggregate Queries.csv and Pages.csv files cannot prove which query ranked on which page.

### 1. Confirm Persian query ownership

In Search Console Performance, create an exact-query filter for each query below, open the Pages tab, and export the result:

- `کالری شمار`
- `کالری شمار غذا انلاین`
- `کالری شمار رایگان`
- `کالری شمار رایگان آنلاین`

Expected result: `/fa/` should become the stable owner for generic queries. `/fa/photo-calorie-calculator/` should remain strongest for queries containing `عکس`, `تصویر`, or `اسکن`.

If two URLs each receive more than 20% of impressions for the same generic query for two consecutive 28-day periods, review their title, H1, opening copy, and internal-link anchors again. Do not redirect or canonicalize a useful page solely because it occasionally appears for an adjacent query.

### 2. Diagnose the irrelevant photographer query

Filter the exact query `calorie counting recipes for photographers`, open Pages, and export it weekly for four weeks.

- If `/photo-calorie-calculator/` is the ranking page and impressions fall after recrawling, keep the current wording.
- If another page ranks, inspect that page for ambiguous combinations of photo, recipe, photography, or photographer language.
- Do not create a photographer-focused page; the query does not match the product.

### 3. Separate desktop ranking mix from UX

For desktop and mobile separately, export:

- Query × device for the top 25 queries
- Page × device for the top 10 landing pages
- Country × device for Iran, Italy, United States, Japan, Brazil, and United Kingdom

Only treat desktop as a snippet or UX problem when the same query/page/country combination has comparable position but substantially lower desktop CTR. When desktop position is worse, improve relevance and internal linking before redesigning the interface.

### 4. Evaluate the changes after 28 days

Compare 28 days after deployment with the preceding 28 days and record:

| Segment | Primary metric | Guardrail |
| --- | --- | --- |
| Generic Persian queries | CTR and clicks | Position must not materially decline |
| Persian photo queries | Clicks | Protect the established winner |
| `/photo-calorie-calculator/` | Irrelevant-query impressions and qualified clicks | Avoid broader irrelevant visibility |
| Italian photo + AI pages | CTR and clicks | Check Italy separately |
| Organic landing pages | GA4 `store_click` rate | Do not optimize for unqualified clicks |

Use a 28-day window to reduce weekday effects. Annotate the deployment date in GA4 and the tracking sheet. Avoid another major title/H1 change during the test window unless traffic drops sharply or indexing breaks.

## GA4 setup

Register `store`, `language`, and `landing_page` as event-scoped custom dimensions for the `store_click` event. Build an exploration with:

1. Session default channel group = Organic Search
2. Rows = Landing page + query string, language, store
3. Metrics = Sessions, engaged sessions, `store_click`, and `store_click` rate

If install/sign-up events become available from the app attribution provider, connect them to the same landing-page campaign context and use those as the final optimization metric.
