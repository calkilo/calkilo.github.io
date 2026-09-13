# Calkilo website audit — 13 September 2026

## Delivered

The Persian homepage now renders the same landing component, section order, imagery, feature controls, pricing-card layout, community content, blog section, download area, and FAQs as English. Persian text stays RTL, uses locally hosted Vazir 30.1.0 (regular and bold), and retains Iranian Android store links. Persian subscription cards direct visitors to the price in the app; the earlier product audit found conflicting currency data, so this change does not reinstate an unverified price.

Added `/fa/calories/`, a searchable directory of 37 foods, including 32 new Iranian food detail pages. Category filters, calorie sorting, no-results recovery, breadcrumbs, and calculators for custom portion weights are included. Calculators accept Western, Persian, and Arabic digits and reject empty, negative, nonnumeric, and excessive weights. Directory data is shared with static route generation and the sitemap.

## Findings and fixes

| Finding | Result |
| --- | --- |
| Persian landing replaced the English composition entirely | Removed the separate rendering branch; section parity is browser-tested. |
| Requested Vazir was not the actual configured font; optional loading could leave fallback text | Bundled licensed Vazir, preloaded regular weight, enabled font swapping, and applied it to Persian text and controls. |
| Persian-only automatic dark styles produced a different design and conflicting colors | Removed those overrides; the shared explicit light/dark landing variants remain. |
| Mobile Persian menu differed from desktop | Both menus use the same navigation items; the food directory is accessible from each. |
| Language picker only offered abbreviations | Options show full language names. |
| Persian FAQ and static footer links could send users to English | Corrected relevant Persian destinations and added food-directory discovery links. |
| Bright green text and some gray text failed contrast checks | Added a separate readable accent-text color for light/dark surfaces and corrected muted labels. |
| BMI scale used an inaccessible label on a generic element | Assigned an image role to the labeled scale. |
| Feature selector did not expose its selected state | Added `aria-pressed`. |
| Mobile hero artwork was cropped | Changed mobile fit to contain. |
| Image priority attribute produced React 18 development warnings | Emit the supported lowercase DOM attribute. |
| Kebab page advertised calories without providing a number | Displays an explicitly attributed koobideh estimate, specifying that other kebabs differ. |
| Food pages lacked a central index and custom portions | Added the directory, detail pages, and live portion calculator. |
| Adding foods would make every food-page footer excessively long | Limited footer recommendations and linked the full directory. |
| Offline builds retained an outdated sitemap | Regenerate static discovery files while preserving the existing blog snapshot. |

## Verification

- Production static build succeeded: 352 generated pages, including the 404 output.
- Browser visited all **351 directory-style exported routes** at 390 px. No horizontal overflow, observed broken images, or uncaught JavaScript errors after loading/redirects. The explicit `/404/` route is expected to be a not-found page; other route responses passed. See [routes.json](./routes.json).
- **26 accessibility cases**: 13 representative routes at 390 and 1440 px, including English/Persian homepages, both dark variants, directory/detail, contact, blog, features, pricing, both calculators, and the URL analyzer. Final automated WCAG A/AA checks reported **zero violations**. This is not a manual accessibility certification.
- **30 interaction/responsive checks passed**, including menu/Escape/focus, download anchor clearance, language direction, identical landing section classes, Persian search, filtering, sorting, empty-state reset, portion math and invalid entries, BMI, calorie wizard, URL validation, and overflow at 320/768/1440 px. See [interactions.json](./interactions.json).
- ESLint, TypeScript through the production build, `git diff --check`, and SEO export audit passed. SEO audit checked 149 canonical URLs and internal asset/link references.
- Screenshots in this directory show the final locally served production export. Initial findings are retained in [initial-browser-findings.json](./initial-browser-findings.json); its early redirect layout readings occurred before CSS settled and were corrected in the final audit.
- The live English/Persian homepages and kebab page were inspected before editing. Comprehensive route and interaction testing was performed on the local production export, not on an already-deployed release.

## Food data and scope

Existing pizza, hamburger, rice, and falafel reference data retain their source links. New composite-food values are attributed to the [Meals Cook culinary table](https://mealscook.net/blog/calories-in-persian-food/), accessed 13 September 2026. They are labeled as recipe-dependent culinary estimates, not laboratory measurements; macros were not invented for those entries. The koobideh estimate is also explicitly identified. The directory covers common dishes, not every regional recipe. A dietitian-reviewed recipe database with ingredient weights and cooking yields would improve accuracy.

Vazir comes from [Saber Rastikerdar's font repository](https://github.com/rastikerdar/vazir-font); the OFL license is included beside the font files.

## Remaining production dependencies

1. **Hosting:** HTTPS for `www.calkilo.com` fails certificate hostname validation. HTTP for `calkilo.com` returns 200 instead of redirecting to HTTPS. Configure a certificate covering both hostnames, then redirect HTTP and www to `https://calkilo.com/` while retaining path/query. Verified with fresh requests during this audit. Static page code cannot repair TLS.
2. **Blog service:** Online prebuild could not refresh the public blog API in this environment. The successful review build uses the complete checked-in snapshot. Existing blog content was preserved.
3. **Release:** Changes are local and have not been committed, pushed, or deployed. The existing GitHub Pages workflow publishes on main/master push.
4. **External flows:** No support message, purchase, app installation, authenticated meal save, or paid API analysis was performed. Contact remains an explicitly labeled email-draft flow; URL validation was tested without submitting an analysis.
5. **Performance:** No field Core Web Vitals or throttled performance claim is made. Restoring the shared hero and product imagery changes the Persian page's asset workload; assess production LCP on representative Iranian connections after release.

## Reproduce

```sh
CALKILO_OFFLINE_BUILD=1 npm run build
npm run lint
npm run seo:audit
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
# In another terminal, point this variable at a runtime containing playwright and @axe-core/playwright:
CALKILO_QA_RUNTIME=/path/to/node_modules node scripts/site-browser-audit.cjs
CALKILO_QA_RUNTIME=/path/to/node_modules node scripts/site-interaction-checks.cjs
```
