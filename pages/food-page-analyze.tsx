import FoodPageAnalyzerScreen from '../components/FoodPageAnalyzerScreen'

const PAGE_PATH = '/food-page-analyze/'

export default function FoodPageAnalyzePage() {
  return (
    <FoodPageAnalyzerScreen
      path={PAGE_PATH}
      seoTitle="Food Page Analyzer | Calkilo"
      seoDescription="Analyze a restaurant or food item page URL with Calkilo."
      noindex
      nofollow
      kicker="Food URL analyzer"
      heading="Analyze a restaurant food page"
      inputLabel="Food page URL"
      placeholder="https://www.ubereats.com/store/example/item/example"
      emptyTitle="No analysis yet"
      emptyDescription="Paste a restaurant or food item URL and run an analysis to see calories, macros, source metadata, saved meal data, and coin usage."
    />
  )
}
