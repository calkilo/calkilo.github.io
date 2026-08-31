import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from './site-content.mjs'

const INDEXNOW_KEY = 'e61d4bd78a471d760d7acf510125a6c0'
const sitemapPaths = [
  fileURLToPath(new URL('../public/sitemap.xml', import.meta.url)),
  fileURLToPath(new URL('../public/blog-sitemap.xml', import.meta.url)),
]

const sitemapContents = await Promise.all(sitemapPaths.map((path) => readFile(path, 'utf8')))
const urlList = Array.from(new Set(
  sitemapContents.flatMap((content) =>
    Array.from(content.matchAll(/<loc>([^<]+)<\/loc>/gu), (match) => match[1]
      .replace(/&amp;/gu, '&')
      .replace(/&lt;/gu, '<')
      .replace(/&gt;/gu, '>')),
  ),
))

if (urlList.length === 0) throw new Error('No sitemap URLs were found for IndexNow submission.')

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  }),
})

if (!response.ok) {
  const responseText = await response.text()
  throw new Error(`IndexNow returned HTTP ${response.status}: ${responseText.slice(0, 500)}`)
}

console.log(`Submitted ${urlList.length} canonical URLs to IndexNow.`)

