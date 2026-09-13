import { writeFoodSitemap } from './food-seo-catalogue.mjs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { LLMS_SECTIONS, SITE_LANGUAGES, SITE_URL, STATIC_INDEXABLE_PATHS, absoluteUrl } from './site-content.mjs'

const apiUrl = (
  process.env.NEXT_PUBLIC_BLOG_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://api.calkilo.com'
).replace(/\/+$/u, '')
const dataDirectory = fileURLToPath(new URL('../data', import.meta.url))
const manifestPath = fileURLToPath(new URL('../data/blog-manifest.json', import.meta.url))
const legacyManifestPath = fileURLToPath(new URL('../.cache/blog-manifest.json', import.meta.url))
const blogSitemapPath = fileURLToPath(new URL('../public/blog-sitemap.xml', import.meta.url))
const staticSitemapPath = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url))
const llmsPath = fileURLToPath(new URL('../public/llms.txt', import.meta.url))
const redirectsPath = fileURLToPath(new URL('../public/_redirects', import.meta.url))
const MAX_PAGES = 20
const MAX_RETRIES = 8
const DETAIL_CONCURRENCY = 1

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function parseRetryAfter(value) {
  if (!value) return null
  const seconds = Number(value)
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000)
  const timestamp = Date.parse(value)
  return Number.isFinite(timestamp) ? Math.max(0, timestamp - Date.now()) : null
}

async function requestJson(url, label, maxRetries = MAX_RETRIES, maxRetryDelay = 30_000) {
  let lastError

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { Accept: 'application/json' } })
      if (response.ok) return response.json()

      const retriable = response.status === 429 || response.status >= 500
      if (!retriable || attempt === maxRetries) {
        throw new Error(`${label} returned HTTP ${response.status}`)
      }

      const retryAfter = parseRetryAfter(response.headers.get('retry-after'))
      const backoff = Math.min(16_000, 750 * (2 ** attempt))
      const jitter = Math.floor(Math.random() * 350)
      await sleep(Math.min(maxRetryDelay, retryAfter ?? backoff) + jitter)
    } catch (error) {
      lastError = error
      if (attempt === maxRetries) break
      await sleep(Math.min(maxRetryDelay, 750 * (2 ** attempt)) + Math.floor(Math.random() * 350))
    }
  }

  throw lastError instanceof Error ? lastError : new Error(`Unable to fetch ${label}`)
}

async function fetchPostList(language, maxRetries) {
  const posts = []
  const visited = new Set()
  let nextUrl = new URL('/blog/', `${apiUrl}/`)
  nextUrl.searchParams.set('language', language)

  while (nextUrl && visited.size < MAX_PAGES) {
    const requestUrl = nextUrl.toString()
    if (visited.has(requestUrl)) break
    visited.add(requestUrl)

    const payload = await requestJson(requestUrl, `blog list for ${language}`, maxRetries, 3_000)
    const results = Array.isArray(payload) ? payload : payload?.results
    if (!Array.isArray(results)) throw new Error(`Unexpected blog list payload for ${language}`)
    posts.push(...results.filter((post) => post?.slug && post?.title))

    nextUrl = !Array.isArray(payload) && payload?.next ? new URL(payload.next, `${apiUrl}/`) : null
    if (nextUrl) nextUrl.searchParams.set('language', language)
  }

  if (nextUrl) throw new Error(`Blog pagination exceeded ${MAX_PAGES} requests for ${language}`)
  if (posts.length === 0) throw new Error(`Blog API returned no posts for ${language}`)
  return Array.from(new Map(posts.map((post) => [post.slug, post])).values())
}

function normalizedTitle(value) {
  return String(value)
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
}

function numericSlugSuffix(slug) {
  const match = String(slug).match(/-(\d+)$/u)
  return match ? Number(match[1]) : 0
}

function canonicalPostComparator(a, b) {
  const suffixDifference = numericSlugSuffix(a.slug) - numericSlugSuffix(b.slug)
  if (suffixDifference !== 0) return suffixDifference

  const aDate = Date.parse(a.published_at || a.created_at || a.updated_at || '') || 0
  const bDate = Date.parse(b.published_at || b.created_at || b.updated_at || '') || 0
  if (aDate !== bDate) return aDate - bDate
  return String(a.slug).localeCompare(String(b.slug))
}

function deduplicatePosts(posts) {
  const slugFamilyCounts = new Map()
  for (const post of posts) {
    const family = String(post.slug).replace(/-\d+$/u, '')
    slugFamilyCounts.set(family, (slugFamilyCounts.get(family) || 0) + 1)
  }

  const byTitle = new Map()
  for (const post of posts) {
    const slugFamily = String(post.slug).replace(/-\d+$/u, '')
    const topic = normalizedTitle(post.topic || '')
    const key = topic
      ? `topic:${topic}`
      : slugFamilyCounts.get(slugFamily) > 1
        ? `slug:${slugFamily}`
        : `title:${normalizedTitle(post.title)}`
    const group = byTitle.get(key) || []
    group.push(post)
    byTitle.set(key, group)
  }

  const canonicalPosts = []
  const redirects = {}
  for (const group of byTitle.values()) {
    const sorted = [...group].sort(canonicalPostComparator)
    const canonical = sorted[0]
    canonicalPosts.push(canonical)
    for (const duplicate of sorted.slice(1)) redirects[duplicate.slug] = canonical.slug
  }

  canonicalPosts.sort((a, b) => {
    const aDate = Date.parse(a.published_at || a.created_at || a.updated_at || '') || 0
    const bDate = Date.parse(b.published_at || b.created_at || b.updated_at || '') || 0
    return bDate - aDate
  })

  return { canonicalPosts, redirects }
}

function resolveRedirectTarget(redirects, slug) {
  let target = slug
  const visited = new Set()

  while (redirects[target] && !visited.has(target)) {
    visited.add(target)
    target = redirects[target]
  }

  return target
}

function consolidateLanguageData(languageData) {
  if (!languageData?.posts?.length) return languageData

  const { canonicalPosts, redirects: topicRedirects } = deduplicatePosts(languageData.posts)
  const canonicalSlugs = new Set(canonicalPosts.map((post) => post.slug))
  const redirectGraph = { ...(languageData.redirects || {}), ...topicRedirects }
  const allSlugs = Array.from(new Set([
    ...(languageData.allSlugs || []),
    ...canonicalPosts.map((post) => post.slug),
    ...Object.keys(redirectGraph),
  ]))
  const redirects = {}

  for (const slug of allSlugs) {
    if (canonicalSlugs.has(slug)) continue
    const target = resolveRedirectTarget(redirectGraph, slug)
    if (canonicalSlugs.has(target)) redirects[slug] = target
  }

  return { posts: canonicalPosts, redirects, allSlugs }
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await mapper(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()))
  return results
}

async function fetchPostDetail(post, language) {
  const url = new URL(`/blog/${encodeURIComponent(post.slug)}/`, `${apiUrl}/`)
  url.searchParams.set('language', language)
  const detail = await requestJson(url.toString(), `blog post ${language}/${post.slug}`)
  if (!detail?.slug || !detail?.title) throw new Error(`Unexpected blog detail for ${language}/${post.slug}`)
  return detail
}

function escapeXml(value) {
  return String(value)
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&apos;')
}

function localizedBlogPath(slug, language) {
  const prefix = language === 'en' ? '' : `/${language}`
  return `${prefix}/blog/${encodeURIComponent(slug)}/`
}

function resolveCanonicalPost(manifestLanguages, language, sourcePost) {
  const languageData = manifestLanguages[language]
  if (!languageData) return null

  const topic = normalizedTitle(sourcePost.topic || '')
  if (topic) {
    const topicMatch = languageData.posts.find((post) => normalizedTitle(post.topic || '') === topic)
    if (topicMatch) return topicMatch
  }

  const canonicalSlug = languageData.redirects?.[sourcePost.slug] || sourcePost.slug
  return languageData.posts.find((post) => post.slug === canonicalSlug) || null
}

function buildBlogSitemap(manifestLanguages) {
  const entries = []

  for (const language of SITE_LANGUAGES) {
    const archivePath = language === 'en' ? '/blog/' : `/${language}/blog/`
    entries.push([
      '  <url>',
      `    <loc>${escapeXml(absoluteUrl(archivePath))}</loc>`,
      '  </url>',
    ].join('\n'))
  }

  for (const language of SITE_LANGUAGES) {
    for (const post of manifestLanguages[language].posts) {
      const availableLanguages = SITE_LANGUAGES.filter((alternateLanguage) =>
        resolveCanonicalPost(manifestLanguages, alternateLanguage, post),
      )

      const alternates = availableLanguages
        .map((alternateLanguage) => ({
          language: alternateLanguage,
          post: resolveCanonicalPost(manifestLanguages, alternateLanguage, post),
        }))
        .filter((alternate) => alternate.post)
      const alternateLines = alternates.map((alternate) =>
        `    <xhtml:link rel="alternate" hreflang="${alternate.language}" href="${escapeXml(absoluteUrl(localizedBlogPath(alternate.post.slug, alternate.language)))}" />`,
      )
      const xDefaultLanguage = availableLanguages.includes('en') ? 'en' : availableLanguages[0]
      if (xDefaultLanguage) {
        const xDefaultPost = resolveCanonicalPost(manifestLanguages, xDefaultLanguage, post)
        if (xDefaultPost) {
          alternateLines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(localizedBlogPath(xDefaultPost.slug, xDefaultLanguage)))}" />`)
        }
      }

      const lastModified = post.updated_at || post.published_at || post.created_at
      entries.push([
        '  <url>',
        `    <loc>${escapeXml(absoluteUrl(localizedBlogPath(post.slug, language)))}</loc>`,
        ...alternateLines,
        lastModified ? `    <lastmod>${escapeXml(String(lastModified).slice(0, 10))}</lastmod>` : null,
        '  </url>',
      ].filter(Boolean).join('\n'))
    }
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')
}

function buildStaticSitemap() {
  const entries = STATIC_INDEXABLE_PATHS.map((path) => [
    '  <url>',
    `    <loc>${escapeXml(absoluteUrl(path))}</loc>`,
    '  </url>',
  ].join('\n'))

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')
}

function buildLlmsText() {
  const sections = LLMS_SECTIONS.flatMap((section) => [
    `## ${section.title}`,
    '',
    ...section.links.map(([label, path, description]) => `- [${label}](${absoluteUrl(path)}): ${description}`),
    '',
  ])

  return [
    '# Calkilo',
    '',
    '> Calkilo is an AI calorie counter and nutrition assistant for editable food-photo estimates, macro tracking, daily food logs, and meal planning.',
    '',
    'Calkilo is available for iOS and Android. It supports English, Persian, Italian, Dutch, Russian, Chinese, and Arabic public landing content.',
    '',
    ...sections,
    '## Important limitations',
    '',
    '- Food-photo analysis produces estimates, not laboratory measurements.',
    '- Portion size, oils, sauces, hidden ingredients, recipes, and image quality can change an estimate.',
    '- Users should review and correct results before saving them.',
    '- Calkilo is not a substitute for medical advice or a prescribed therapeutic diet.',
    '',
    '## Official store listings',
    '',
    '- [Google Play](https://play.google.com/store/apps/details?id=com.calkilo.mobile): Official Android app listing.',
    '- [Apple App Store](https://apps.apple.com/us/app/calkilo-ai-calorie-counter/id6755718411): Official iOS app listing.',
    '',
  ].join('\n')
}

function buildRedirects(manifestLanguages) {
  const redirects = [
    '/index.html / 301',
    '/contact /contact/ 301',
    '/contact.html /contact/ 301',
    '/faq.html /faq/ 301',
  ]

  for (const language of SITE_LANGUAGES) {
    for (const [fromSlug, toSlug] of Object.entries(manifestLanguages[language].redirects)) {
      redirects.push(`${localizedBlogPath(fromSlug, language)} ${localizedBlogPath(toSlug, language)} 301`)
    }
  }

  return `${redirects.join('\n')}\n`
}

async function readPreviousManifest() {
  for (const path of [manifestPath, legacyManifestPath]) {
    try {
      return JSON.parse(await readFile(path, 'utf8'))
    } catch {
      // Continue to the next snapshot location.
    }
  }

  return null
}

await writeFoodSitemap(SITE_URL)
const previousManifest = await readPreviousManifest()
if (process.env.CALKILO_OFFLINE_BUILD === '1') {
  if (!previousManifest || SITE_LANGUAGES.some(language => !previousManifest.languages?.[language]?.posts?.length)) {
    throw new Error('Offline build requires a complete checked-in blog snapshot.')
  }
  await writeFile(staticSitemapPath, buildStaticSitemap(), 'utf8')
  await writeFile(llmsPath, buildLlmsText(), 'utf8')
  console.log('Offline review build: retaining checked-in blog data and regenerating static discovery files.')
  process.exit(0)
}

const listPostsByLanguage = {}
for (const language of SITE_LANGUAGES) {
  try {
    const listRetries = previousManifest?.languages?.[language] ? 2 : MAX_RETRIES
    listPostsByLanguage[language] = await fetchPostList(language, listRetries)
    console.log(`Fetched ${listPostsByLanguage[language].length} ${language} blog summaries.`)
  } catch (error) {
    if (!previousManifest?.languages?.[language]) throw error
    listPostsByLanguage[language] = null
    console.warn(`Using the previous ${language} snapshot because the blog list could not be refreshed: ${error instanceof Error ? error.message : error}`)
  }
}

const manifestLanguages = {}
for (const language of SITE_LANGUAGES) {
  const allPosts = listPostsByLanguage[language]
  const previousLanguageData = previousManifest?.languages?.[language]

  if (!allPosts) {
    manifestLanguages[language] = consolidateLanguageData(previousLanguageData)
    continue
  }

  const previousSlugCount = previousLanguageData?.allSlugs?.length || 0
  if (previousSlugCount > 0 && allPosts.length < Math.ceil(previousSlugCount * 0.8)) {
    manifestLanguages[language] = consolidateLanguageData(previousLanguageData)
    console.warn(`Using the previous ${language} snapshot because the API count dropped unexpectedly from ${previousSlugCount} to ${allPosts.length}.`)
    continue
  }

  const { canonicalPosts, redirects } = deduplicatePosts(allPosts)
  const previousPostsBySlug = new Map(
    (previousLanguageData?.posts || []).map((post) => [post.slug, post]),
  )

  let detailedPosts
  try {
    detailedPosts = await mapWithConcurrency(
      canonicalPosts,
      DETAIL_CONCURRENCY,
      (post) => {
        const previousPost = previousPostsBySlug.get(post.slug)
        if (previousPost && previousPost.updated_at === post.updated_at) return previousPost
        return fetchPostDetail(post, language)
      },
    )
  } catch (error) {
    if (!previousLanguageData) throw error
    manifestLanguages[language] = consolidateLanguageData(previousLanguageData)
    console.warn(`Using the previous complete ${language} snapshot because article refresh failed: ${error instanceof Error ? error.message : error}`)
    continue
  }

  const canonicalSlugs = new Set(detailedPosts.map((post) => post.slug))
  for (const [historicalSlug, historicalTarget] of Object.entries(previousLanguageData?.redirects || {})) {
    let currentTarget = redirects[historicalTarget] || historicalTarget
    const visitedTargets = new Set()
    while (redirects[currentTarget] && !visitedTargets.has(currentTarget)) {
      visitedTargets.add(currentTarget)
      currentTarget = redirects[currentTarget]
    }

    if (!canonicalSlugs.has(historicalSlug) && canonicalSlugs.has(currentTarget)) {
      redirects[historicalSlug] = currentTarget
    }
  }

  manifestLanguages[language] = {
    posts: detailedPosts,
    redirects,
    allSlugs: Array.from(new Set([...allPosts.map((post) => post.slug), ...Object.keys(redirects)])),
  }
  console.log(`Prepared ${detailedPosts.length} canonical ${language} posts and ${Object.keys(redirects).length} redirects.`)
}

const manifest = {
  generatedAt: new Date().toISOString(),
  source: apiUrl,
  languages: manifestLanguages,
}

await mkdir(dataDirectory, { recursive: true })
await Promise.all([
  writeFile(manifestPath, `${JSON.stringify(manifest)}\n`, 'utf8'),
  writeFile(staticSitemapPath, buildStaticSitemap(), 'utf8'),
  writeFile(blogSitemapPath, buildBlogSitemap(manifestLanguages), 'utf8'),
  writeFile(llmsPath, buildLlmsText(), 'utf8'),
  writeFile(redirectsPath, buildRedirects(manifestLanguages), 'utf8'),
])

const canonicalCount = Object.values(manifestLanguages).reduce((sum, data) => sum + data.posts.length, 0)
const redirectCount = Object.values(manifestLanguages).reduce((sum, data) => sum + Object.keys(data.redirects).length, 0)
console.log(`Generated site discovery data with ${STATIC_INDEXABLE_PATHS.length} static URLs, ${canonicalCount} blog URLs, and ${redirectCount} blog redirects.`)
