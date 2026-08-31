import { GetStaticPaths, GetStaticProps } from 'next'
import DarkPage from '../dark'
import { getBlogBuildSnapshot } from '../../lib/blog-build-data'
import { normalizeBlogLanguage, type BlogListSnapshot } from '../../lib/blog'
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
  const blogSnapshot = getBlogBuildSnapshot(lang, 3)

  return {
    props: {
      blogSnapshot,
      lang,
    },
  }
}

export default DarkPage
