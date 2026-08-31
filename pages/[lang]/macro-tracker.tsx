import { GetStaticPaths, GetStaticProps } from 'next'
import ResourcePage from '../../components/ResourcePage'
import { getResourceLocalizedLanguages, getResourcePage } from '../../lib/resource-pages'
import { normalizeSiteLanguage } from '../../lib/site-language'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getResourceLocalizedLanguages('macro-tracker').map((lang) => ({
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

export default function LocalizedMacroTrackerPage({ lang }: LocalizedResourcePageProps) {
  const language = normalizeSiteLanguage(lang)

  return <ResourcePage page={getResourcePage('macro-tracker', language)} pageKey="macro-tracker" lang={language} />
}
