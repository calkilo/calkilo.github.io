import { GetStaticPaths, GetStaticProps } from 'next'
import BlogDetailPage from '../../components/BlogDetailPage'
import LegacyRedirectPage from '../../components/LegacyRedirectPage'
import {
  getBlogBuildAlternateLanguagePaths,
  getBlogBuildLanguageData,
  getBlogBuildPost,
  getBlogBuildRedirect,
} from '../../lib/blog-build-data'
import { getBlogPostPath, type BlogPost } from '../../lib/blog'

interface BlogPostPageProps {
  alternateLanguagePaths?: Array<{ lang: string; path: string }>
  initialPost?: BlogPost | null
  redirectSlug?: string | null
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { allSlugs } = getBlogBuildLanguageData('en')

  return {
    paths: allSlugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : ''

  if (!slug) {
    return {
      notFound: true,
    }
  }

  const redirectSlug = getBlogBuildRedirect('en', slug)
  if (redirectSlug) {
    return {
      props: {
        redirectSlug,
        slug,
      },
    }
  }

  const initialPost = getBlogBuildPost('en', slug)
  if (initialPost) {
    return {
      props: {
        alternateLanguagePaths: getBlogBuildAlternateLanguagePaths(initialPost),
        initialPost,
        slug,
      },
    }
  }

  return { notFound: true }
}

export default function BlogPostPage({ alternateLanguagePaths, initialPost, redirectSlug, slug }: BlogPostPageProps) {
  if (redirectSlug) {
    return <LegacyRedirectPage title="Article moved" toPath={getBlogPostPath(redirectSlug, 'en')} />
  }

  return <BlogDetailPage alternateLanguagePaths={alternateLanguagePaths} initialPost={initialPost} lang="en" slug={slug} />
}
