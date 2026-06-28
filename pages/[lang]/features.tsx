import { GetStaticPaths, GetStaticProps } from 'next'
import LocalizedLandingSectionPage from '../../components/LocalizedLandingSectionPage'
import { LOCALIZED_LANGUAGES } from '../../lib/site-language'

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

interface LocalizedFeaturesPageProps {
  lang?: string
}

export default function LocalizedFeaturesPage({ lang }: LocalizedFeaturesPageProps) {
  return <LocalizedLandingSectionPage lang={lang} section="features" />
}
