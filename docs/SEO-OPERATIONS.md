# Calkilo search and AI discovery operations

The repository now generates canonical sitemaps, `llms.txt`, IndexNow submissions, duplicate-blog move pages, and crawler directives. The remaining controls live at the CDN or account level and cannot be enforced by a GitHub Pages artifact.

## Cloudflare rules

Create a Redirect Rule with this source expression:

```text
http.host eq "calkilo.com" and http.request.uri.path eq "/index.html"
```

Use a static `301` destination of `https://calkilo.com/` and preserve the query string. Test both `https://calkilo.com/index.html` and a query-string variant after publishing the rule.

Import the generated mappings in `public/_redirects` into Cloudflare Bulk Redirects when duplicate blog URLs change. GitHub Pages does not interpret the `_redirects` file; each old blog URL also contains a `noindex` canonical move page as a safe fallback, but an edge `301` is the preferred signal.

Create response-header transform rules for all HTTPS responses:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

Only enable HSTS preload after confirming every current and planned subdomain supports HTTPS. Create cache rules with a one-year edge/browser TTL for `/_next/static/*` and fingerprinted assets. Avoid immutable caching for HTML, XML, `robots.txt`, and `llms.txt`.

Ensure Cloudflare security rules do not challenge documented crawler IP ranges. The intended repository policy is:

- allow `OAI-SearchBot` for ChatGPT search;
- allow `GPTBot` for potential OpenAI model training;
- allow `Claude-SearchBot`, `Claude-User`, and `ClaudeBot`;
- allow major search and answer-engine crawlers.

If training access is no longer desired, disallow `GPTBot` and `ClaudeBot` specifically while leaving the search/user agents allowed. See the [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots) and [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

## Google Search Console

1. Verify the `calkilo.com` domain property with DNS.
2. Submit `https://calkilo.com/sitemap.xml` and `https://calkilo.com/blog-sitemap.xml`.
3. After the next deployment, use URL Inspection for `/`, `/fa/`, `/pricing/`, `/about/`, and `/uber-eats-nutrition-calculator/`.
4. Confirm `/index.html` is reported as redirected and that removed duplicate blog URLs converge on their canonical destinations.
5. Review Page Indexing, Core Web Vitals, Enhancements, and the Search Console AI/search appearance reporting regularly.

Do not request indexing for every URL individually; use sitemaps for bulk discovery.

## Bing and IndexNow

Verify the domain in Bing Webmaster Tools and submit both sitemaps. The deployment workflow automatically submits the generated canonical URL set to IndexNow after a successful GitHub Pages deployment. The public verification key is intentionally stored at:

```text
https://calkilo.com/e61d4bd78a471d760d7acf510125a6c0.txt
```

IndexNow notification failures do not fail the deployment; check the post-deploy workflow log if notification monitoring is needed.

## Content governance

- Use one maintained article per topic and language. The build consolidates posts that share normalized topic metadata and preserves retired URLs as permanent redirects; semantic overlap across differently labeled topics still requires editorial review.
- Add a real named credentialed reviewer when one is available; never invent a reviewer or testimonial.
- Cite primary or official sources for material health and nutrition claims.
- Update visible modified dates only after meaningful content changes.
- Publish original evidence—meal-photo benchmarks, error ranges, correction examples, and Persian-food coverage methodology—when validated data becomes available.
- Keep price display, FAQ copy, and structured data generated from the same values.
