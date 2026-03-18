import { GetStaticPaths, GetStaticProps } from 'next'
import TermsAndConditionsPage from '../terms-and-conditions'
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

export default TermsAndConditionsPage
