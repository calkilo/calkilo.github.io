# Calkilo Landing Site

Public website for [Calkilo](https://calkilo.com), an AI-assisted calorie and nutrition tracking application.

The site is built with Next.js and exported as static HTML served by Nginx on the Calkilo server. It includes localized product pages, nutrition tools, SEO landing pages, food examples, and blog content fetched from the Calkilo API during the build.

## Technology

- Next.js 16 Pages Router
- React 18
- TypeScript
- Static HTML export
- SSH deployment through GitHub Actions
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

- Node.js 22
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
.github/workflows/       Server deployment workflow
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
- A blog post is not available on the server until a new build is deployed.
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

## Server deployment

Pushes to `main` or `master`, or a manual workflow dispatch, run `.github/workflows/deploy.yml`.
The workflow installs dependencies, lints, builds the static export, and runs both SEO audits.
Only a successful build is uploaded over SSH to the production server. No Node.js process is
needed on the server.

Repository configuration in **Settings → Secrets and variables → Actions**:

| Type | Name | Value |
| --- | --- | --- |
| Variable | `DEPLOY_HOST` | Public server IP, currently `65.109.193.193` (the local alias `calkilo` will not resolve on GitHub runners) |
| Secret | `DEPLOY_SSH_KEY` | Dedicated Ed25519 private key authorized for `calkilo-web` |
| Secret | `DEPLOY_KNOWN_HOSTS` | Verified SSH host key line for the server IP |

Deployments use the `production` GitHub environment. The deployment user owns only
`/var/www/calkilo-landing` and does not need sudo. SSH host verification is mandatory;
the workflow never uses a root password.

### Server layout and activation

- `incoming/`: uploads in progress.
- `releases/`: complete versioned exports; the latest five plus the previous release are retained.
- `current`: atomically replaced symlink to the active release.
- `assets/`: retained immutable Next.js chunks, allowing already-open pages to keep working after deployment. Monitor disk usage; these assets are not automatically deleted.

`deploy/activate-release.sh` verifies the upload, switches the symlink, then checks the origin's
homepage, contact page, Persian homepage, robots file, and release marker. A failed health
check restores the previous symlink and fails the workflow. Upload failures leave the active
release untouched. IndexNow notification runs after a successful deployment.

### Nginx, DNS, and HTTPS

`deploy/nginx.conf` is the initial HTTP configuration, installed at
`/etc/nginx/sites-available/calkilo-landing` and enabled in `sites-enabled`.
It serves trailing-slash routes, real 404 responses, and long-lived hashed assets.
The API's existing Nginx configuration stays separate.

Point the Cloudflare A record for `calkilo.com` to `65.109.193.193`, and point `www` to
the same origin if used. Remove conflicting GitHub Pages A/AAAA/CNAME records. For initial
certificate issuance, use DNS-only mode and ensure port 80 is reachable, then run:

```bash
ssh root@calkilo 'certbot --nginx --no-redirect -d calkilo.com -d www.calkilo.com'
```

Omit `www` if it is not configured. Keep HTTP available for local deployment health checks.
After HTTPS works, Cloudflare proxying can be enabled with **Full (strict)** SSL/TLS and
**Always Use HTTPS**. Certbot manages certificate renewal. Do not overwrite its resulting
TLS configuration with the initial HTTP template on subsequent deployments.

`public/CNAME` is a historical static file and does not control server routing.
GitHub Pages can be disabled in repository settings after the DNS migration is verified.

### Verification and rollback

```bash
npm run lint
npm run build
npm run seo:audit
npm run seo:food-audit
curl --fail https://calkilo.com/deployment.txt
```

Check localized pages, `/_next/` assets, sitemap files, and a nonexistent route (HTTP 404).
The deployment marker contains the commit SHA, workflow run ID, and attempt number.

For manual rollback, select a directory from `/var/www/calkilo-landing/releases`, then
run as `calkilo-web` on the server, replacing `RELEASE_ID` with that directory name:

```bash
cd /var/www/calkilo-landing
flock .deploy.lock bash -c 'ln -s "$PWD/releases/RELEASE_ID" current.rollback && mv -Tf current.rollback current'
```

### Troubleshooting

If SSH fails, check the repository secrets, host IP, authorized key, and port 22 reachability.
If the build fails, inspect the lint or SEO audit output and blog API connectivity.
New blog posts require another static build and deployment.
If origin health checks fail, inspect the Nginx site configuration and `current` symlink;
HTTP requests with `Host: calkilo.com` to `127.0.0.1` must serve the site without a redirect.

## Contribution notes

- Preserve existing localization and RTL behavior when editing shared components.
- Do not introduce server-only routes; this deployment serves a static export.
- Keep unrelated generated or user changes intact.
- Run lint and a full static build before opening a pull request or pushing to production.
