import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { STATIC_INDEXABLE_PATHS } from './site-content.mjs'

const redirects = JSON.parse(await readFile('data/seo-redirects.json', 'utf8'))
const rules = await readFile('out/_redirects', 'utf8')
const discovery = (await Promise.all(['sitemap.xml', 'llms.txt'].map(file => readFile(`out/${file}`, 'utf8')))).join('\n')
for (const [from, to] of Object.entries(redirects)) {
  assert(!STATIC_INDEXABLE_PATHS.includes(from), `${from} must not be indexable`)
  assert(!discovery.includes(from), `${from} remains in discovery files`)
  for (const alias of [from, from.slice(0, -1)]) assert(rules.split('\n').includes(`${alias} ${to} 301`), `Missing permanent redirect: ${alias}`)
  assert(!redirects[to], `Redirect chain: ${from}`)
  const html = await readFile(`out${from}index.html`, 'utf8')
  assert(html.includes('content="noindex,follow"'), `${from} needs static fallback noindex`)
  assert(html.includes(`href="https://calkilo.com${to}"`), `${from} canonical mismatch`)
}
for (const path of STATIC_INDEXABLE_PATHS) {
  const html = await readFile(`out${path}index.html`, 'utf8')
  for (const from of Object.keys(redirects)) assert(!html.includes(`href="${from}"`), `Retired internal link on ${path}: ${from}`)
}
console.log(`SEO consolidation audit passed: ${Object.keys(redirects).length} merged pages and ${STATIC_INDEXABLE_PATHS.length} canonical static pages.`)
