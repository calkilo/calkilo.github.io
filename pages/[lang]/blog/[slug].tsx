import { GetServerSideProps } from 'next'
import BlogDetailPage from '../../../components/BlogDetailPage'
import { fetchBlogPost, normalizeBlogLanguage, type BlogPost } from '../../../lib/blog'

interface LangBlogPostPageProps {
  initialPost?: BlogPost | null
  lang?: string
  slug: string
}

export const getServerSideProps: GetServerSideProps<LangBlogPostPageProps> = async ({ params, res }) => {
  const lang = normalizeBlogLanguage(params?.lang)
  const slug = typeof params?.slug === 'string' ? params.slug : ''

  if (!slug) {
    return {
      notFound: true,
    }
  }

  try {
    const initialPost = await fetchBlogPost(slug, lang)

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400')

    return {
      props: {
        initialPost,
        lang,
        slug,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default function LangBlogPostPage({ initialPost, lang, slug }: LangBlogPostPageProps) {
  return <BlogDetailPage initialPost={initialPost} lang={lang} slug={slug} />
}
