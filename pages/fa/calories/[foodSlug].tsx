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
    },
  }
}

interface FoodCaloriePageProps {
  food: FoodCaloriePageData
}

export default function PersianFoodCalorieRoute({ food }: FoodCaloriePageProps) {
  return <FoodCaloriePage food={food} />
}

