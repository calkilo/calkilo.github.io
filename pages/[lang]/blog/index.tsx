import { GetStaticPaths, GetStaticProps } from 'next'
import BlogArchivePage from '../../../components/BlogArchivePage'
import { fetchBlogListSnapshot, normalizeBlogLanguage, type BlogListSnapshot } from '../../../lib/blog'
import { LOCALIZED_LANGUAGES } from '../../../lib/site-language'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = LOCALIZED_LANGUAGES.map((lang) => ({
    params: { lang },
  }))

  return {
    paths,
    fallback: false,
  }
}

interface LangBlogPageProps {
  blogSnapshot?: BlogListSnapshot
  lang?: string
}

export const getStaticProps: GetStaticProps<LangBlogPageProps> = async ({ params }) => {
  const lang = normalizeBlogLanguage(params?.lang)
  const blogSnapshot = await fetchBlogListSnapshot(lang)

  return {
    props: {
      blogSnapshot,
      lang,
    },
  }
}

export default function LangBlogPage({ blogSnapshot, lang }: LangBlogPageProps) {
  return <BlogArchivePage initialPosts={blogSnapshot?.posts} initialStatus={blogSnapshot?.status} lang={lang} />
}
