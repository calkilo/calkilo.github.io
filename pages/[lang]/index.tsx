import { GetStaticPaths, GetStaticProps } from 'next'
import LandingPage from '../../components/LandingPage'
import { SUPPORTED_LANGUAGES } from '../../lib/site-language'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = SUPPORTED_LANGUAGES.map((lang) => ({
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

interface LangHomePageProps {
  lang?: string
}

export default function LangHomePage({ lang }: LangHomePageProps) {
  return <LandingPage lang={lang} variant="light" />
}
