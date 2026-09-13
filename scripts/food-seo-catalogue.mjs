import { readFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { referenceFoodPath, foodCategoryPath, FOOD_CATEGORY_PAGE_SIZE } from '../lib/food-reference-routes.mjs'
const foods = JSON.parse(readFileSync(new URL('../public/data/usda-foods.json', import.meta.url), 'utf8')).foods
const categories = JSON.parse(readFileSync(new URL('../data/food-categories.json', import.meta.url), 'utf8'))
export const FOOD_SEO_PATHS = [
  ...foods.map(referenceFoodPath).filter(path=>path.includes('/reference/')),
  ...categories.flatMap(category => Array.from({ length:Math.ceil(foods.filter(food=>food.category===category.name).length/FOOD_CATEGORY_PAGE_SIZE) },(_,i)=>foodCategoryPath(category.slug,i+1))),
]
if (new Set(FOOD_SEO_PATHS).size !== FOOD_SEO_PATHS.length) throw new Error('Duplicate food SEO paths')
if (foods.some(food=>!categories.some(category=>category.name===food.category))) throw new Error('A food is missing its crawlable category')
export async function writeFoodSitemap(siteUrl) {
  const xml = ['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...FOOD_SEO_PATHS.map(path=>`  <url><loc>${`${siteUrl}${path}`.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</loc></url>`),'</urlset>',''].join('\n')
  await writeFile(new URL('../public/food-sitemap.xml', import.meta.url),xml,'utf8')
}
