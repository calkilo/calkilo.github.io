import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const languages = ['en', 'nl', 'ru', 'zh', 'ar', 'fa', 'it']
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://calkilo.com').replace(/\/+$/u, '')
const apiUrl = (process.env.NEXT_PUBLIC_BLOG_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.calkilo.com').replace(/\/+$/u, '')
const outputPath = fileURLToPath(new URL('../public/blog-sitemap.xml', import.meta.url))

function escapeXml(value) {
  return String(value)
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&apos;')
}

function localizedPath(path, language) {
  return `${language === 'en' ? '' : `/${language}`}${path}`
}

async function fetchPosts(language) {
  const posts = []
  const visited = new Set()
  let nextUrl = new URL('/blog/', `${apiUrl}/`)
  nextUrl.searchParams.set('language', language)

  while (nextUrl && visited.size < 20) {
    const requestUrl = nextUrl.toString()
    if (visited.has(requestUrl)) break
    visited.add(requestUrl)

    const response = await fetch(requestUrl, { headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`Blog API returned ${response.status} for ${language}`)

    const payload = await response.json()
    const results = Array.isArray(payload) ? payload : payload.results
    if (!Array.isArray(results)) throw new Error(`Unexpected blog response for ${language}`)
    posts.push(...results)

    nextUrl = payload && !Array.isArray(payload) && payload.next ? new URL(payload.next, `${apiUrl}/`) : null
    if (nextUrl) nextUrl.searchParams.set('language', language)
  }

  return posts
}

function alternateLinks(path, availableLanguages) {
  const supported = languages.filter((language) => availableLanguages.includes(language))
  const xDefaultLanguage = supported.includes('en') ? 'en' : supported[0]
  const links = supported.map((language) =>
    `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(`${siteUrl}${localizedPath(path, language)}`)}" />`,
  )

  if (xDefaultLanguage) {
    links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${siteUrl}${localizedPath(path, xDefaultLanguage)}`)}" />`)
  }

  return links.join('\n')
}

function urlEntry(path, language, availableLanguages, lastModified) {
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(`${siteUrl}${localizedPath(path, language)}`)}</loc>`,
    alternateLinks(path, availableLanguages),
  ]

  if (lastModified) lines.push(`    <lastmod>${escapeXml(lastModified.slice(0, 10))}</lastmod>`)
  lines.push('  </url>')
  return lines.filter(Boolean).join('\n')
}

const postsByLanguage = new Map()

await Promise.all(languages.map(async (language) => {
  postsByLanguage.set(language, await fetchPosts(language))
}))

const entries = languages.map((language) =>
  urlEntry('/blog/', language, languages),
)

for (const language of languages) {
  for (const post of postsByLanguage.get(language) || []) {
    if (!post?.slug) continue
    const availableLanguages = Array.isArray(post.available_languages)
      ? post.available_languages.filter((item) => languages.includes(item))
      : [language]
    if (!availableLanguages.includes(language)) availableLanguages.push(language)

    entries.push(urlEntry(
      `/blog/${encodeURIComponent(post.slug)}/`,
      language,
      availableLanguages,
      post.updated_at || post.published_at || post.created_at,
    ))
  }
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries,
  '</urlset>',
  '',
].join('\n')

await writeFile(outputPath, sitemap, 'utf8')
console.log(`Generated blog sitemap with ${entries.length} URLs.`)
