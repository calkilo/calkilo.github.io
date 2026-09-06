# Performance and accessibility test notes

Date: 2026-09-06  
Build: Next.js 16.3.3 production static export  
Browser viewport checks: Codex in-app Chromium against `out/` served on `127.0.0.1:4173`

## Completed checks

| Route | Viewport | H1 | Forms | Unlabelled controls | Horizontal overflow |
|---|---:|---:|---:|---:|---|
| `/calorie-calculator/` | 390×844 | 1 | 1 | 0 | No |
| `/calorie-calculator/` | 1440×900 | 1 | 1 | 0 | No |
| `/fa/` | 390×844 | 1 | n/a | n/a | No observed overflow; HTML and page container are RTL |

The rendered homepage and Persian homepage were also compared with the exported source for title, canonical, H1, language/direction, and JSON-LD. Hydration did not replace the primary content or metadata.

## Lighthouse blocker

Attempted command and version:

```sh
npx lighthouse@13.0.1 http://127.0.0.1:4173/ \
  --only-categories=performance,accessibility,seo \
  --output=json \
  --output-path=docs/seo-artifacts/lighthouse-home-mobile.json
```

Lighthouse installed and reported version 13.0.1, but the managed environment could not launch/connect to the installed Google Chrome binary. A PageSpeed Insights API fallback returned HTTP 429 because the shared daily quota was exhausted. No score, LCP, INP, CLS, or Core Web Vitals pass is reported.

Run the commands in `docs/seo-ai-search-runbook.md` on a host where Chrome can launch. Lab Lighthouse cannot establish field INP or a real-user Core Web Vitals pass; use CrUX or first-party RUM for the 75th-percentile field result.

