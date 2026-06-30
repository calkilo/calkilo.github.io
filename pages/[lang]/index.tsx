import { GetStaticPaths, GetStaticProps } from 'next'
import LandingPage from '../../components/LandingPage'
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

interface LangHomePageProps {
  blogSnapshot?: BlogListSnapshot
  lang?: string
}

export const getStaticProps: GetStaticProps<LangHomePageProps> = async ({ params }) => {
  const lang = normalizeBlogLanguage(params?.lang)
  const blogSnapshot = await fetchBlogListSnapshot(lang)

  return {
    props: {
      blogSnapshot,
      lang,
    },
  }
}

export default function LangHomePage({ blogSnapshot, lang }: LangHomePageProps) {
  return (
    <LandingPage
      initialBlogPosts={blogSnapshot?.posts}
      initialBlogStatus={blogSnapshot?.status}
      lang={lang}
      variant="light"
    />
  )
}
