# Requested landing-page fixes — 2026-09-13

- Align feature headings and descriptions to the start of the writing direction; isolate the Latin product name.
- Center the single supported integration card at desktop, tablet and mobile widths.
- Display ۲۸۹٬۰۰۰ تومان monthly and ۵۸۹٬۰۰۰ تومان annually from the existing shared price constants, including Persian structured offers.
- Add locally hosted official Bazaar and Myket logos to download links.
- Add 7,793 official USDA SR Legacy records with Persian ingredient search aliases, 25 populated categories, sorting, pagination, source links, 15 nutrient fields, and a weight calculator. Original English sample descriptions and missing values are retained. Existing Persian recipe pages remain available in a separate catalogue choice.

Validation passed:
- `npx tsc --noEmit`
- `npm run lint`
- `CALKILO_OFFLINE_BUILD=1 npm run build` (352 generated static pages; checked-in blog snapshot)
- `git diff --check`
- Browser verification against both development and the exported production site: 390, 853 and 1723 px, feature alignment, integration centering, both prices, loaded logos, no horizontal overflow, Persian search, pagination, zero calorie values, empty results, Persian numerals, invalid weights, and no page errors.
- Importer checks record count, complete energy data, nonnegative measurements; rice, pizza and falafel match the existing independently sourced reference values.

Reproduce browser checks with a server serving `out/` on port 3011 and:
`CALKILO_QA_RUNTIME=/path/to/node_modules node scripts/verify-requested-fixes.cjs`
The runtime must contain Playwright and Chrome must be installed. Override the base URL with `CALKILO_QA_URL`.

This is a local website update; no deployment or mobile backend database migration was performed.
