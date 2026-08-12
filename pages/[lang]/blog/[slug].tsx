import { GetStaticPaths, GetStaticProps } from 'next'
import BlogDetailPage from '../../../components/BlogDetailPage'
import { fetchBlogPost, fetchBlogPosts, normalizeBlogLanguage, type BlogPost } from '../../../lib/blog'
import { LOCALIZED_LANGUAGES } from '../../../lib/site-language'

interface LangBlogPostPageProps {
  initialPost?: BlogPost | null
  lang?: string
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const localizedPosts = await Promise.all(
    LOCALIZED_LANGUAGES.map(async (lang) => ({ lang, posts: await fetchBlogPosts(lang) })),
  )

  return {
    paths: localizedPosts.flatMap(({ lang, posts }) =>
      posts.map((post) => ({ params: { lang, slug: post.slug } })),
    ),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<LangBlogPostPageProps> = async ({ params }) => {
  const lang = normalizeBlogLanguage(params?.lang)
  const slug = typeof params?.slug === 'string' ? params.slug : ''

  if (!slug) {
    return {
      notFound: true,
    }
  }

  try {
    const initialPost = await fetchBlogPost(slug, lang)

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
