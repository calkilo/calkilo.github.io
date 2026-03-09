import { GetStaticPaths, GetStaticProps } from 'next'
import AccountDeletionPage from '../account-deletion'

const SUPPORTED_LANGUAGES = ['en', 'nl', 'ru', 'zh', 'ar', 'fa', 'it']

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

export default AccountDeletionPage
