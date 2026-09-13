export const FOOD_CATEGORY_PAGE_SIZE: number
export function referenceFoodSlug(food: { name: string; id: number }): string
export function referenceFoodPath(food: { name: string; id: number }): string
export function foodCategoryPath(slug: string, page?: number): string
export const LEGACY_REFERENCE_PAGES: Record<number, string>
