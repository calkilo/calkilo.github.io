import assert from 'node:assert/strict'
import { readFile, access, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { referenceFoodPath, foodCategoryPath, FOOD_CATEGORY_PAGE_SIZE, LEGACY_REFERENCE_PAGES } from '../lib/food-reference-routes.mjs'
import { FOOD_SEO_PATHS } from './food-seo-catalogue.mjs'
import { SITE_URL } from './site-content.mjs'

const root = process.cwd()
const output = join(root,'out')
const source = JSON.parse(await readFile(join(root,'public/data/usda-foods.json'),'utf8'))
const categories = JSON.parse(await readFile(join(root,'data/food-categories.json'),'utf8'))
const nutrientKeys = ['calories','protein','carbs','fat','fiber','sugar','saturatedFat','sodium','calcium','iron','potassium','cholesterol','vitaminA','vitaminC','vitaminD']
const allPaths = new Set(['/fa/calories/','/fa/calories/sources/', ...FOOD_SEO_PATHS, ...source.foods.map(referenceFoodPath)])
const htmlByPath = new Map()
const edges = new Map()
const decode = s => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>')
const titles = new Set()
const descriptions = new Set()
for (const path of allPaths) {
  const html = await readFile(join(output,path,'index.html'),'utf8')
  htmlByPath.set(path,html)
  assert.equal(decode(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || ''),`${SITE_URL}${path}`,path)
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path)
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html),path)
  assert(!/hrefLang="(?:en|ar|it)"/i.test(html),`No invented translations: ${path}`)
  const title = decode(html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] || '')
  const description = decode(html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '')
  assert(title && !titles.has(title),`Duplicate/missing title: ${path}`); titles.add(title)
  assert(description && !descriptions.has(description),`Duplicate/missing description: ${path}`); descriptions.add(description)
  edges.set(path,Array.from(html.matchAll(/href="(\/fa\/calories\/[^"#?]*)"/g),m=>decode(m[1])))
}
for (const food of source.foods) {
  const path = referenceFoodPath(food)
  const html = htmlByPath.get(path)
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'')
  assert(visible.includes('<table>'),`SSR nutrition table missing: ${path}`)
  assert(decode(visible).includes(food.name),`Original sample missing: ${path}`)
  assert(visible.includes(`https://fdc.nal.usda.gov/food-details/${food.id}/nutrients`),`Source link missing: ${path}`)
  const schemas = Array.from(html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),m=>JSON.parse(m[1]))
  const dataset = schemas.find(s=>s['@type']==='Dataset')
  assert.equal(dataset.identifier,`USDA FDC ${food.id}`,path)
  assert.equal(dataset.url,`${SITE_URL}${path}`,path)
  assert.deepEqual(dataset.variableMeasured.map(m=>m.value),nutrientKeys.filter(k=>food[k]!==null).map(k=>food[k]),`Nutrition/source mismatch: ${path}`)
  assert(dataset.variableMeasured.every(m=>m.description==='در ۱۰۰ گرم'),`Mixed nutrient basis: ${path}`)
  assert(schemas.some(s=>s['@type']==='BreadcrumbList'),path)
  assert(!schemas.some(s=>['Recipe','Product','AggregateRating'].includes(s['@type'])),`Misleading schema: ${path}`)
}
let categoryPages = 0
for (const category of categories) {
  const foods = source.foods.filter(f=>f.category===category.name)
  const pages = Math.ceil(foods.length/FOOD_CATEGORY_PAGE_SIZE)
  for (let page=1;page<=pages;page++) {
    const path = foodCategoryPath(category.slug,page)
    const html = htmlByPath.get(path)
    const links = edges.get(path)
    for (const food of foods.slice((page-1)*FOOD_CATEGORY_PAGE_SIZE,page*FOOD_CATEGORY_PAGE_SIZE)) assert(links.includes(referenceFoodPath(food)),`Missing crawlable food: ${food.id}`)
    if (page>1) assert(html.includes(`rel="prev" href="${foodCategoryPath(category.slug,page-1)}"`),path)
    if (page<pages) assert(html.includes(`rel="next" href="${foodCategoryPath(category.slug,page+1)}"`),path)
    categoryPages++
  }
  for (const bad of [foodCategoryPath(category.slug) + 'page/1/',foodCategoryPath(category.slug,pages+1)]) {
    await assert.rejects(access(join(output,bad,'index.html')),`Unexpected duplicate/invalid page: ${bad}`)
  }
}
const reached = new Map([['/fa/calories/',0]])
const queue = ['/fa/calories/']
for (let i=0;i<queue.length;i++) for (const path of edges.get(queue[i])||[]) {
  if (allPaths.has(path) && !reached.has(path)) { reached.set(path,reached.get(queue[i])+1); queue.push(path) }
}
assert.equal(reached.size,allPaths.size,'Orphaned food/category page')
const maxDepth = Math.max(...source.foods.map(f=>reached.get(referenceFoodPath(f))))
assert(maxDepth<=3,`Food pages too deep: ${maxDepth}`)
const sitemap = await readFile(join(output,'food-sitemap.xml'),'utf8')
assert.equal((sitemap.match(/<loc>/g)||[]).length,FOOD_SEO_PATHS.length)
for (const path of FOOD_SEO_PATHS) assert(sitemap.includes(`${SITE_URL}${path}</loc>`),path)
for (const slug of Object.values(LEGACY_REFERENCE_PAGES)) assert(!sitemap.includes(`${SITE_URL}/fa/calories/${slug}/`),'Legacy canonical already in primary sitemap')
const report = { foods:source.count,newReferencePages:source.count-Object.keys(LEGACY_REFERENCE_PAGES).length,preservedLegacyPages:Object.values(LEGACY_REFERENCE_PAGES),categories:categories.length,categoryPages,checkedPages:allPaths.size,maxCrawlDepth:maxDepth,checks:['SSR tables and original sample names','Exact nutrient values and 100 g basis','Unique titles and descriptions','Self canonicals','Visible source links and truthful schemas','All categories and pagination links','No page/1 or out-of-range exports','No orphaned pages','Complete food sitemap without legacy duplicates'] }
await mkdir(join(root,'reports/food-seo'),{recursive:true})
await writeFile(join(root,'reports/food-seo/audit.json'),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify(report,null,2))
