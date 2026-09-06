import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from './site-content.mjs'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const outputRoot = join(projectRoot, 'out')
const docsRoot = join(projectRoot, 'docs')
const sitemapFiles = ['sitemap.xml', 'blog-sitemap.xml']

function decodeHtml(value = '') {
  return value
    .replace(/&quot;/gu, '"')
    .replace(/&#x27;|&#39;/gu, "'")
    .replace(/&amp;/gu, '&')
    .replace(/&lt;/gu, '<')
    .replace(/&gt;/gu, '>')
}

function csv(value) {
  return `"${String(value ?? '').replace(/"/gu, '""')}"`
}

function outputPath(pathname) {
  return pathname === '/' ? join(outputRoot, 'index.html') : join(outputRoot, pathname.slice(1), 'index.html')
}

function first(html, pattern) {
  return decodeHtml(html.match(pattern)?.[1]?.trim() || '')
}

function localeFor(pathname, html) {
  return first(html, /<html[^>]+lang=["']([^"']+)["']/iu) || pathname.split('/').filter(Boolean)[0] || 'en'
}

function intentFor(pathname) {
  if (pathname === '/' || /^\/(?:nl|ru|zh|ar|fa|it)\/$/u.test(pathname)) return 'Product overview and app download'
  if (pathname.includes('/blog/')) return pathname.endsWith('/blog/') ? 'Nutrition article discovery' : 'Nutrition education article'
  if (pathname.includes('/calories/')) return 'Persian food calorie reference'
  if (pathname.includes('/examples/')) return 'Illustrative Persian scan example'
  if (pathname.includes('free-photo') || pathname.includes('calcolo-calorie-con-foto-gratis')) return 'Free-download and photo-scan limits'
  if (pathname.includes('food-calorie-scanner')) return 'Camera scanning workflow'
  if (pathname.includes('ai-calorie-calculator') || pathname.includes('intelligenza-artificiale-calorie')) return 'How AI food estimation works'
  if (pathname.includes('photo-calorie-calculator') || pathname.includes('calorie-counter-with-photo')) return 'Photo calorie estimation workflow'
  if (pathname.includes('macro-tracker')) return 'Daily calorie and macro tracking'
  if (pathname.includes('calorie-calculator')) return 'Daily calorie and TDEE calculator'
  if (pathname.includes('bmi-calculator')) return 'Adult BMI calculator'
  if (pathname.includes('pricing')) return 'Premium pricing and billing periods'
  if (pathname.includes('features')) return 'Verified product capabilities'
  if (pathname.includes('faq')) return 'Product and support questions'
  if (pathname.includes('contact')) return 'Product, billing, and privacy support'
  if (pathname.includes('about')) return 'Product identity, workflow, and limitations'
  if (pathname.includes('privacy') || pathname.includes('terms') || pathname.includes('account-deletion')) return 'Policy and account support'
  if (pathname.includes('calkilo-vs-')) return 'Dated product comparison'
  return 'Product guide'
}

const sitemapText = (await Promise.all(
  sitemapFiles.map((file) => readFile(join(projectRoot, 'public', file), 'utf8')),
)).join('\n')
const urls = Array.from(new Set(Array.from(sitemapText.matchAll(/<loc>([^<]+)<\/loc>/gu), (match) => decodeHtml(match[1])))).sort()
const redirectText = await readFile(join(projectRoot, 'public', '_redirects'), 'utf8')
const redirectsByTarget = new Map()

for (const line of redirectText.split(/\r?\n/u)) {
  const [source, target, status] = line.trim().split(/\s+/u)
  if (!source || !target || !/^30[18]$/u.test(status || '')) continue
  const sources = redirectsByTarget.get(target) || []
  sources.push(source)
  redirectsByTarget.set(target, sources)
}

const rows = []
for (const url of urls) {
  const pathname = new URL(url).pathname
  const html = await readFile(outputPath(pathname), 'utf8')
  const canonical = first(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/iu)
  const robots = first(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/iu)
  const hreflang = Array.from(html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/giu), (match) => `${match[1]}=${decodeHtml(match[2])}`).join(' | ')
  const schemas = new Set()
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)) {
    try {
      const data = JSON.parse(decodeHtml(match[1]))
      const values = Array.isArray(data) ? data : [data]
      values.forEach((item) => {
        const type = item?.['@type']
        if (Array.isArray(type)) type.forEach((value) => schemas.add(value))
        else if (type) schemas.add(type)
      })
    } catch {
      schemas.add('INVALID_JSON_LD')
    }
  }
  const internalLinks = new Set(Array.from(html.matchAll(/\shref=["'](\/[^"'#?]*)/giu), (match) => match[1]))
  const redirectSources = redirectsByTarget.get(pathname) || []
  rows.push([
    url,
    localeFor(pathname, html),
    intentFor(pathname),
    200,
    robots.includes('noindex') ? 'noindex' : 'index',
    canonical,
    hreflang,
    first(html, /<title[^>]*>([\s\S]*?)<\/title>/iu),
    first(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/iu),
    first(html, /<h1[^>]*>([\s\S]*?)<\/h1>/iu).replace(/<[^>]+>/gu, ' ').replace(/\s+/gu, ' ').trim(),
    Array.from(schemas).join(' | '),
    internalLinks.size,
    'Next.js static export (SSG/prerendered HTML)',
    redirectSources.join(' | '),
    'Keep; no consolidation proposed without query-by-page evidence',
  ])
}

const headings = ['url', 'locale', 'search_intent', 'local_status', 'indexability', 'canonical', 'hreflang_cluster', 'title', 'description', 'h1', 'schema_types', 'crawlable_internal_link_count', 'rendering_mode', 'existing_redirect_sources', 'proposed_consolidation']
await mkdir(docsRoot, { recursive: true })
await writeFile(
  join(docsRoot, 'seo-route-map.csv'),
  [headings, ...rows].map((row) => row.map(csv).join(',')).join('\n') + '\n',
  'utf8',
)

console.log(`Generated docs/seo-route-map.csv for ${rows.length} canonical URLs at ${SITE_URL}.`)
