import { referenceFoods } from '../../../lib/food-reference-server'
import { LEGACY_REFERENCE_PAGES } from '../../../lib/food-reference-routes.mjs'
import type { ReferenceFood } from '../../../lib/food-reference'
import { GetStaticPaths, GetStaticProps } from 'next'
import FoodCaloriePage from '../../../components/FoodCaloriePage'
import { FOOD_CALORIE_PAGES, getFoodCaloriePage, type FoodCaloriePageData } from '../../../lib/food-calorie-pages'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: FOOD_CALORIE_PAGES.map((food) => ({
    params: { foodSlug: food.slug },
  })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<FoodCaloriePageProps> = async ({ params }) => {
  const food = getFoodCaloriePage(String(params?.foodSlug || ''))

  if (!food) {
    return { notFound: true }
  }

  return {
    props: {
      food,
      reference: referenceFoods.find(item=>LEGACY_REFERENCE_PAGES[item.id] === food.slug) ?? null,
    },
  }
}

interface FoodCaloriePageProps {
  food: FoodCaloriePageData
  reference: ReferenceFood | null
}

export default function PersianFoodCalorieRoute({ food, reference }: FoodCaloriePageProps) {
  return <FoodCaloriePage food={food} reference={reference} />
}

