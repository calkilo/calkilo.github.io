# Food catalogue

The existing Persian recipe estimates remain in `persian-food-estimates.json` and the existing source-specific pages remain in `lib/food-calorie-pages.ts`.

The additional reference catalogue in `public/data/usda-foods.json` contains all **7,793 SR Legacy records**, across 25 populated food groups, from the official USDA April 2018 CSV archive. It contains energy and up to 14 other nutrient measurements, preserving missing values as `null`, not zero. All values are per **100 g of the specific edible food described by the source**, with the original English description and FDC identifier retained. Foods and preparations are not interchangeable. This historical collection is the final SR Legacy release, not the latest branded-food collection.

- Source: https://fdc.nal.usda.gov/download-datasets/
- Archive: https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip
- Imported: 2026-09-13; archive SHA-256 is recorded in the generated JSON.
- Rebuild: `python3 scripts/import-usda-foods.py /path/to/archive.zip`

The browser loads the reference JSON only when the user opens the global catalogue. It renders 24 results per page, supports Persian aliases for common ingredients and preparations, and displays the precise original description rather than implying that every record is fully translated into Persian. Amounts are scaled by the entered weight, including Persian and Arabic digits. Missing values are explicitly shown as not recorded.

This expands the landing website's food directory. It does not migrate the separate mobile application's server database. Iranian regional recipes and current Iranian packaged products are not comprehensively represented by USDA; the pre-existing Iranian estimates retain their separate source labels.

## Static SEO discovery

All 7,793 records are reachable from the category links in `/fa/calories/`, without client-side search or JavaScript. Shared URL helpers in `lib/food-reference-routes.mjs` keep page links and sitemap generation consistent. Three records reuse the pre-existing rice, pizza and falafel URLs; the remaining records have standalone source-specific routes. Category pages contain at most 48 samples and link to every page in their category. Each food is at most three links from the hub.

Run `npm run seo:food-audit` after each build or data refresh. It checks the complete record set, source nutrition values, canonicals, duplicate metadata, link reachability and sitemap coverage. Source data is read only at build time for static pages; the full catalogue is not passed to every page's client bundle.
