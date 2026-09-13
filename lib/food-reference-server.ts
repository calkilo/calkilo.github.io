// Build-time access only. Import exclusively from getStaticPaths/getStaticProps.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import categories from '../data/food-categories.json'
import { type ReferenceFood } from './food-reference'
import { referenceFoodSlug, FOOD_CATEGORY_PAGE_SIZE } from './food-reference-routes.mjs'

export const referenceFoods: ReferenceFood[] = JSON.parse(readFileSync(join(process.cwd(), 'public/data/usda-foods.json'), 'utf8')).foods
const bySlug = new Map(referenceFoods.map(food => [referenceFoodSlug(food), food]))
export const referenceCategories = categories.map(category => ({ ...category, count: referenceFoods.filter(food => food.category === category.name).length }))
const byCategory = new Map(referenceCategories.map(category => [category.slug, referenceFoods.filter(food => food.category === category.name)]))
export function getReferenceFood(slug: string) { return bySlug.get(slug) }
export function getCategoryFoods(slug: string) { return byCategory.get(slug) || [] }
export function getCategoryPages() {
  return referenceCategories.flatMap(category => Array.from({ length: Math.ceil(category.count / FOOD_CATEGORY_PAGE_SIZE) }, (_,i) => ({ category, page: i+1 })))
}
export function relatedReferenceFoods(food: ReferenceFood) {
  const category = referenceCategories.find(c => c.name === food.category)!
  const foods = getCategoryFoods(category.slug)
  const root = food.name.split(',')[0].toLowerCase()
  return [...foods.filter(f => f.id !== food.id && f.name.split(',')[0].toLowerCase() === root), ...foods.filter(f => f.id !== food.id && f.name.split(',')[0].toLowerCase() !== root)].slice(0,6)
}
