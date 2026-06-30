import { GetStaticPaths, GetStaticProps } from 'next'
import DarkPage from '../dark'
import { fetchBlogListSnapshot, normalizeBlogLanguage, type BlogListSnapshot } from '../../lib/blog'
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

interface LangDarkPageProps {
  blogSnapshot?: BlogListSnapshot
  lang?: string
}

export const getStaticProps: GetStaticProps<LangDarkPageProps> = async ({ params }) => {
  const lang = normalizeBlogLanguage(params?.lang)
  const blogSnapshot = await fetchBlogListSnapshot(lang)

  return {
    props: {
      blogSnapshot,
      lang,
    },
  }
}

export default DarkPage
