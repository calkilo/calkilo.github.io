import { GetStaticPaths, GetStaticProps } from 'next'
import ResourcePage from '../../components/ResourcePage'
import { getResourceLocalizedLanguages, getResourcePage } from '../../lib/resource-pages'
import { normalizeSiteLanguage } from '../../lib/site-language'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getResourceLocalizedLanguages('ai-calorie-tracker').map((lang) => ({
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
