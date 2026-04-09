import { GetStaticPaths, GetStaticProps } from 'next'
import AccountDeletionPage from '../account-deletion'
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

export default AccountDeletionPage
