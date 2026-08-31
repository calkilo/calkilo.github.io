import { GetStaticPaths, GetStaticProps } from 'next'
import ResourcePage from '../../components/ResourcePage'
import { getResourceLocalizedLanguages, getResourcePage } from '../../lib/resource-pages'
import { normalizeSiteLanguage } from '../../lib/site-language'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getResourceLocalizedLanguages('photo-calorie-calculator').map((lang) => ({
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

export default function LocalizedPhotoCalorieCalculatorPage({ lang }: LocalizedResourcePageProps) {
  const language = normalizeSiteLanguage(lang)

  return (
    <ResourcePage
      page={getResourcePage('photo-calorie-calculator', language)}
      pageKey="photo-calorie-calculator"
      lang={language}
    />
  )
}
