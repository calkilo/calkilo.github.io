# Calkilo Landing Site

Public website for [Calkilo](https://calkilo.com), an AI-assisted calorie and nutrition tracking application.

The site is built with Next.js and exported as static HTML for GitHub Pages. It includes localized product pages, nutrition tools, SEO landing pages, food examples, and blog content fetched from the Calkilo API during the build.

## Technology

- Next.js 14 Pages Router
- React 18
- TypeScript
- Static HTML export
- GitHub Pages deployment through GitHub Actions
- Google Analytics 4

## Supported languages

| Code | Language | URL prefix |
| --- | --- | --- |
| `en` | English | `/` |
| `fa` | فارسی | `/fa/` |
| `it` | Italiano | `/it/` |
| `nl` | Nederlands | `/nl/` |
| `ru` | Русский | `/ru/` |
| `zh` | 中文 | `/zh/` |
| `ar` | العربية | `/ar/` |

Persian and Arabic pages use right-to-left layout automatically.

## Local development

Requirements:

- Node.js 18 or newer
- npm
- Network access to the blog API when generating blog pages

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run lint` | Run the Next.js ESLint checks |
| `npm run build` | Generate the production static site in `out/` |

Because the production configuration uses `output: 'export'`, the deployable result is the `out/` directory. To preview that artifact locally:

```bash
npm run build
python3 -m http.server 8080 --directory out
```

Then open [http://localhost:8080](http://localhost:8080).

## Environment variables

All variables are optional because production defaults are defined in the codebase.

| Variable | Default | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://calkilo.com` | Canonical site origin used in metadata and sitemaps |
| `NEXT_PUBLIC_BLOG_API_BASE_URL` | `https://api.calkilo.com` | API origin used for blog archives and posts |
| `NEXT_PUBLIC_API_BASE_URL` | `https://api.calkilo.com` | Fallback API origin when the blog-specific value is absent |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-KSFK6RGGYG` | Google Analytics measurement ID |

For local overrides, create `.env.local`:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BLOG_API_BASE_URL=https://api.calkilo.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-KSFK6RGGYG
```

Do not commit secrets. Values prefixed with `NEXT_PUBLIC_` are embedded in client-visible output and must never contain private credentials.

## Project structure

```text
components/              Shared page and UI components
lib/                     SEO, localization, content, API, and route helpers
pages/                   Next.js routes
public/                  Static assets, CNAME, robots.txt, and sitemaps
scripts/                 Build-time scripts, including blog sitemap generation
styles/                  Global site styles
reports/                 SEO analysis and operational runbooks
.github/workflows/       GitHub Pages deployment workflow
```

Important content sources:

- `components/LandingPage.tsx` — localized homepage copy and product presentation
- `lib/resource-pages.ts` — core localized resource-page content
- `lib/seo-landing-pages.ts` — intent-specific Persian and Italian SEO pages
- `lib/site-language.ts` — supported languages, RTL rules, and localized paths
- `lib/blog.ts` — blog API client and normalization

## Blog generation

Blog archives and detail pages are statically generated during `npm run build`. The build queries the blog API for every supported language and writes one HTML page for every available post.

The `prebuild` script also regenerates `public/blog-sitemap.xml`. As a result:

- New posts appear after the next successful deployment.
- The build environment must be able to reach the blog API.
- A blog post is not available on GitHub Pages until a new build is deployed.
- Changes to `public/blog-sitemap.xml` after a build are expected when the API contains new or updated posts.

## SEO conventions

- Every indexable page should have one canonical URL.
- Localized equivalents should provide reciprocal `hreflang` links and an `x-default` URL.
- English is served without a language prefix; other languages use their locale prefix.
- Public routes use trailing slashes.
- Structured data is generated through the shared SEO components.
- Generic Persian calorie-counter intent belongs to `/fa/`.
- Persian photo-calorie intent belongs to `/fa/photo-calorie-calculator/`.
- Keep titles, H1s, opening copy, and internal-link anchors aligned with each page's assigned search intent.

See [the Search Console optimization runbook](reports/gsc-optimization-runbook-2026-08-11.md) for post-deployment measurement and cannibalization checks.

## GitHub Pages deployment

Pushes to `main` or `master` trigger `.github/workflows/deploy.yml`.

The workflow:

1. Installs dependencies with `npm ci`.
2. Runs the production build.
3. Adds `out/.nojekyll` so GitHub Pages serves `_next` assets.
4. Verifies the root document, 404 page, custom domain, assets, and key routes.
5. Uploads `out/` as the Pages artifact.
6. Deploys the artifact to the `github-pages` environment.

The custom domain is declared in `public/CNAME` and must contain exactly:

```text
calkilo.com
```

In repository settings, **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**.

## Pre-deployment checklist

Run these checks before pushing:

```bash
npm run lint
npm run build
touch out/.nojekyll
test -f out/index.html
test -f out/404.html
test -f out/CNAME
grep -qx 'calkilo.com' out/CNAME
test -d out/_next
test -f out/contact/index.html
test -f out/faq/index.html
```

After deployment, verify:

- `https://calkilo.com/` returns HTTP 200.
- CSS and JavaScript under `/_next/` load successfully.
- `https://calkilo.com/robots.txt` and both sitemaps are accessible.
- English, Persian, and Italian canonical and `hreflang` tags are correct.
- The latest GitHub Actions deployment completed successfully.

## Troubleshooting

### GitHub Pages shows “File not found”

Confirm that the workflow completed and that the uploaded artifact contains `out/index.html`. A normal server-mode Next.js build only produces `.next/`; this repository must retain `output: 'export'` in `next.config.mjs`.

### Pages build fails before upload

Review the failed workflow step. If `out/` is missing, the static export did not complete. If generation fails on a blog route, verify blog API availability and ensure dynamic pages use `getStaticPaths` and `getStaticProps` rather than server-side rendering.

### A new blog post returns 404

Run and deploy a new build. GitHub Pages cannot render new dynamic routes at request time.

### The custom domain stops resolving

Check `public/CNAME`, the repository Pages settings, and the DNS records for `calkilo.com`. Avoid deleting the custom domain from Pages settings while a deployment is in progress.

## Contribution notes

- Preserve existing localization and RTL behavior when editing shared components.
- Do not introduce server-only routes; GitHub Pages supports static files only.
- Keep unrelated generated or user changes intact.
- Run lint and a full static build before opening a pull request or pushing to production.
