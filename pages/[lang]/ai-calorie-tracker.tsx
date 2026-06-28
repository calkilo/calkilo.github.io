import { GetStaticPaths, GetStaticProps } from 'next'
import ResourcePage from '../../components/ResourcePage'
import { getResourcePage } from '../../lib/resource-pages'
import { LOCALIZED_LANGUAGES, normalizeSiteLanguage } from '../../lib/site-language'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = LOCALIZED_LANGUAGES.map((lang) => ({
    params: { lang },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      lang: params?.lang || 'en',
    },
  }
}

interface LocalizedResourcePageProps {
  lang?: string
}

export default function LocalizedAiCalorieTrackerPage({ lang }: LocalizedResourcePageProps) {
  const language = normalizeSiteLanguage(lang)

  return (
    <ResourcePage
      page={getResourcePage('ai-calorie-tracker', language)}
      pageKey="ai-calorie-tracker"
      lang={language}
    />
  )
}
