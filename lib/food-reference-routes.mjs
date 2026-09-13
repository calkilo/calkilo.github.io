// Shared by browser links, static routes and sitemap generation.
export const FOOD_CATEGORY_PAGE_SIZE = 48
export function referenceFoodSlug(food) {
  const name = food.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80).replace(/-$/g, '')
  return `${name}-${food.id}`
}
export const LEGACY_REFERENCE_PAGES = { 168878:'rice', 172455:'falafel', 173292:'pizza' }
export function referenceFoodPath(food) {
  if (LEGACY_REFERENCE_PAGES[food.id]) return `/fa/calories/${LEGACY_REFERENCE_PAGES[food.id]}/`
  return `/fa/calories/reference/${referenceFoodSlug(food)}/`
}
export function foodCategoryPath(slug, page = 1) {
  return `/fa/calories/category/${slug}/${page === 1 ? '' : `page/${page}/`}`
}
