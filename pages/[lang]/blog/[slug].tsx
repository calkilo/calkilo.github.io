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
  const paths: Array<{ params: { lang: string; slug: string } }> = []

  await Promise.all(
    LOCALIZED_LANGUAGES.map(async (lang) => {
      try {
        const posts = await fetchBlogPosts(lang)
        posts.forEach((post) => {
          paths.push({
            params: { lang, slug: post.slug },
          })
        })
      } catch {
        // Keep static export resilient if the blog API is temporarily unavailable.
      }
    }),
  )

  return {
    paths,
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

  let initialPost: BlogPost | null = null

  try {
    initialPost = await fetchBlogPost(slug, lang)
  } catch {
    initialPost = null
  }

  return {
    props: {
      initialPost,
      lang,
      slug,
    },
  }
}

export default function LangBlogPostPage({ initialPost, lang, slug }: LangBlogPostPageProps) {
  return <BlogDetailPage initialPost={initialPost} lang={lang} slug={slug} />
}
