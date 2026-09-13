import names from '../data/food-reference-names-fa.json'
import { SITE_URL } from './seo'
import { REFERENCE_NUTRIENTS, type ReferenceFood } from './food-reference'
export const formatFoodNumber = (n: number) => new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 }).format(n)
export function foodDisplayName(food: Pick<ReferenceFood, 'id'|'name'>) { return (names as Record<string,string>)[food.id] || food.name }
export function foodBreadcrumbSchema(items: { name: string; path: string }[]) {
  return { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement: items.map((item,i) => ({ '@type':'ListItem', position:i+1, name:item.name, item:`${SITE_URL}${item.path}` })) }
}

export function foodDatasetSchema(food: ReferenceFood, name: string, path: string, description: string) {
  return {
    '@context':'https://schema.org', '@type':'Dataset', '@id':`${SITE_URL}${path}#nutrition`, name:`${name} — USDA ${food.id}`, description,
    url:`${SITE_URL}${path}`, inLanguage:['fa','en'], isBasedOn:`https://fdc.nal.usda.gov/food-details/${food.id}/nutrients`, identifier:`USDA FDC ${food.id}`,
    measurementTechnique:'USDA SR Legacy؛ مقادیر گزارش‌شده برای ۱۰۰ گرم بخش خوراکی نمونه',
    variableMeasured:REFERENCE_NUTRIENTS.filter(([key])=>food[key] !== null).map(([key,label,unit])=>({ '@type':'PropertyValue', name:label, value:food[key], unitText:unit, description:'در ۱۰۰ گرم' })),
  }
}
