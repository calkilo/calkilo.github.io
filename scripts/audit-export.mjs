import { access, readFile, readdir } from 'node:fs/promises'
import { constants } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_LANGUAGES, SITE_URL } from './site-content.mjs'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const outputRoot = join(projectRoot, 'out')
const manifestPath = join(projectRoot, 'data', 'blog-manifest.json')
const sitemapPaths = [join(projectRoot, 'public', 'sitemap.xml'), join(projectRoot, 'public', 'blog-sitemap.xml')]
const errors = []
const warnings = []

function decodeHtml(value) {
  return value
    .replace(/&quot;/gu, '"')
    .replace(/&#x27;|&#39;/gu, "'")
    .replace(/&amp;/gu, '&')
    .replace(/&lt;/gu, '<')
    .replace(/&gt;/gu, '>')
}

function normalizePathname(urlOrPath) {
  const url = new URL(urlOrPath, SITE_URL)
  return decodeURIComponent(url.pathname)
}

function outputFileForPath(pathname) {
  if (pathname === '/') return join(outputRoot, 'index.html')
  if (pathname.endsWith('/')) return join(outputRoot, pathname.slice(1), 'index.html')
  if (/\.[a-z0-9]+$/iu.test(pathname)) return join(outputRoot, pathname.slice(1))
  return join(outputRoot, pathname.slice(1), 'index.html')
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || ''
}

const sitemapContents = await Promise.all(sitemapPaths.map((path) => readFile(path, 'utf8')))
const sitemapUrls = Array.from(new Set(
  sitemapContents.flatMap((content) =>
    Array.from(content.matchAll(/<loc>([^<]+)<\/loc>/gu), (match) => decodeHtml(match[1])),
  ),
))

const titleGroups = new Map()
const alternateMap = new Map()
const sitemapUrlSet = new Set(sitemapUrls)

for (const url of sitemapUrls) {
  const pathname = normalizePathname(url)
  const htmlPath = outputFileForPath(pathname)
  if (!(await fileExists(htmlPath))) {
    errors.push(`${url}: exported HTML is missing (${htmlPath})`)
    continue
  }

  const html = await readFile(htmlPath, 'utf8')
  const title = decodeHtml(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/iu))
  const description = decodeHtml(firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/iu))
  const canonical = decodeHtml(firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/iu))
  const robots = decodeHtml(firstMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/iu))
  const language = firstMatch(html, /<html[^>]+lang=["']([^"']+)["']/iu)
  const h1Count = (html.match(/<h1(?:\s|>)/giu) || []).length

  if (!title) errors.push(`${url}: missing title`)
  if (!description) errors.push(`${url}: missing meta description`)
  if (canonical !== url) errors.push(`${url}: canonical is ${canonical || 'missing'}`)
  if (/noindex/iu.test(robots)) errors.push(`${url}: sitemap URL is noindex`)
  if (!language) errors.push(`${url}: missing html lang`)
  if (h1Count !== 1) errors.push(`${url}: expected one H1, found ${h1Count}`)

  if (pathname.includes('/blog/') && !pathname.endsWith('/blog/')) {
    const key = `${language}:${title.normalize('NFKC').toLocaleLowerCase('en').replace(/\s+/gu, ' ').trim()}`
    const groupedUrls = titleGroups.get(key) || []
    groupedUrls.push(url)
    titleGroups.set(key, groupedUrls)
  }

  const alternates = new Set(
    Array.from(
      html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["'](?!x-default)[^"']+["'][^>]+href=["']([^"']+)["'][^>]*>/giu),
      (match) => decodeHtml(match[1]),
    ),
  )
  alternateMap.set(url, alternates)
  for (const alternate of alternates) {
    if (alternate.startsWith(SITE_URL) && !sitemapUrlSet.has(alternate)) {
      errors.push(`${url}: hreflang points to non-canonical or non-sitemap URL ${alternate}`)
    }
  }

  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)) {
    try {
      JSON.parse(decodeHtml(match[1]))
    } catch (error) {
      errors.push(`${url}: invalid JSON-LD (${error instanceof Error ? error.message : 'parse error'})`)
    }
  }

}

for (const [url, alternates] of alternateMap) {
  for (const alternate of alternates) {
    if (!alternate.startsWith(SITE_URL) || !sitemapUrlSet.has(alternate)) continue
    if (!alternateMap.get(alternate)?.has(url)) {
      errors.push(`${url}: hreflang relationship is not reciprocal with ${alternate}`)
    }
  }
}

const exportedFiles = await readdir(outputRoot, { recursive: true })
for (const relativePath of exportedFiles.filter((path) => path.endsWith('.html'))) {
  const html = await readFile(join(outputRoot, relativePath), 'utf8')
  const robots = decodeHtml(firstMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/iu))
  const canonical = decodeHtml(firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/iu))
  const pathname = relativePath === 'index.html'
    ? '/'
    : relativePath.endsWith('/index.html')
      ? `/${relativePath.slice(0, -'index.html'.length)}`
      : `/${relativePath}`
  const exportedUrl = `${SITE_URL}${pathname}`

  if (relativePath !== '404.html' && !/noindex/iu.test(robots)) {
    if (canonical !== exportedUrl) {
      errors.push(`${relativePath}: indexable export is not self-canonical (${canonical || 'missing'})`)
    }
    if (!sitemapUrlSet.has(exportedUrl)) {
      errors.push(`${relativePath}: indexable self-canonical page is missing from both sitemaps`)
    }
  }

  const internalReferences = Array.from(html.matchAll(/\s(?:href|src)=["'](\/[^"']*)["']/giu), (match) => match[1])
  for (const reference of internalReferences) {
    if (reference.startsWith('//')) continue
    const referencePath = normalizePathname(reference)
    if (!(await fileExists(outputFileForPath(referencePath)))) {
      errors.push(`${relativePath}: unresolved internal reference ${reference}`)
    }
  }
}

const checkedAssetReferences = new Set()
for (const relativePath of exportedFiles.filter((path) => /\.(?:css|html|js|json)$/iu.test(path))) {
  const content = await readFile(join(outputRoot, relativePath), 'utf8')
  const assetReferences = Array.from(
    content.matchAll(/\/assets\/[^\s"'`)<>\\]+/gu),
    (match) => match[0].split(/[?#]/u)[0].replace(/,+$/u, ''),
  )

  for (const reference of assetReferences) {
    if (checkedAssetReferences.has(reference)) continue
    checkedAssetReferences.add(reference)
    const referencePath = normalizePathname(reference)
    if (!(await fileExists(outputFileForPath(referencePath)))) {
      errors.push(`${relativePath}: unresolved generated asset reference ${reference}`)
    }
  }
}

for (const urls of titleGroups.values()) {
  if (urls.length > 1) errors.push(`Duplicate blog title in one language: ${urls.join(', ')}`)
}

if (await fileExists(join(outputRoot, '[lang]'))) {
  errors.push('Literal out/[lang] placeholder directory was exported.')
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
for (const language of SITE_LANGUAGES) {
  const data = manifest.languages?.[language]
  if (!data || !Array.isArray(data.posts) || data.posts.length === 0) {
    errors.push(`Blog manifest contains no canonical ${language} posts.`)
    continue
  }
  const redirectCount = Object.keys(data.redirects || {}).length
  if (data.posts.length + redirectCount !== data.allSlugs.length) {
    errors.push(`Blog manifest count mismatch for ${language}: ${data.posts.length} posts + ${redirectCount} redirects != ${data.allSlugs.length} source slugs.`)
  }

  const topics = new Map()
  for (const post of data.posts) {
    const topic = String(post.topic || '')
      .normalize('NFKC')
      .toLocaleLowerCase('en')
      .replace(/[\p{P}\p{S}]+/gu, ' ')
      .replace(/\s+/gu, ' ')
      .trim()
    if (!topic) continue
    const existingSlug = topics.get(topic)
    if (existingSlug) {
      errors.push(`Duplicate evergreen blog topic for ${language}: ${existingSlug} and ${post.slug}`)
    } else {
      topics.set(topic, post.slug)
    }
  }

  const canonicalSlugs = new Set(data.posts.map((post) => post.slug))
  for (const [source, target] of Object.entries(data.redirects || {})) {
    if (!canonicalSlugs.has(target)) errors.push(`Blog redirect ${language}/${source} does not resolve directly to a canonical post.`)
  }
}

const persianHome = await readFile(join(outputRoot, 'fa', 'index.html'), 'utf8')
if (!persianHome.includes('۲۸۹٬۰۰۰ تومان') || !persianHome.includes('۵۸۹٬۰۰۰ تومان')) {
  errors.push('Persian visible pricing is missing from the exported homepage.')
}
if (!persianHome.includes('"price":"2890000"') || !persianHome.includes('"price":"5890000"')) {
  errors.push('Persian IRR structured pricing does not match the visible toman prices.')
}
if (persianHome.includes('۲۸۹٬۰۰۰٬۰۰۰ تومان') || persianHome.includes('۵۸۹٬۰۰۰٬۰۰۰ تومان')) {
  errors.push('The obsolete 1000x Persian FAQ prices are still present.')
}

if (warnings.length > 0) warnings.forEach((warning) => console.warn(`WARN ${warning}`))
if (errors.length > 0) {
  errors.forEach((error) => console.error(`ERROR ${error}`))
  throw new Error(`SEO export audit failed with ${errors.length} error(s).`)
}

console.log(`SEO export audit passed for ${sitemapUrls.length} canonical URLs.`)
