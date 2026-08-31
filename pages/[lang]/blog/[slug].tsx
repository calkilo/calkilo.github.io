import { GetStaticPaths, GetStaticProps } from 'next'
import BlogDetailPage from '../../../components/BlogDetailPage'
import LegacyRedirectPage from '../../../components/LegacyRedirectPage'
import {
  getBlogBuildAlternateLanguagePaths,
  getBlogBuildLanguageData,
  getBlogBuildPost,
  getBlogBuildRedirect,
} from '../../../lib/blog-build-data'
import { getBlogPostPath, normalizeBlogLanguage, type BlogPost } from '../../../lib/blog'
import { LOCALIZED_LANGUAGES } from '../../../lib/site-language'

interface LangBlogPostPageProps {
  alternateLanguagePaths?: Array<{ lang: string; path: string }>
  initialPost?: BlogPost | null
  lang?: string
  redirectSlug?: string | null
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: LOCALIZED_LANGUAGES.flatMap((lang) =>
      getBlogBuildLanguageData(lang).allSlugs.map((slug) => ({ params: { lang, slug } })),
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

  const redirectSlug = getBlogBuildRedirect(lang, slug)
  if (redirectSlug) {
    return {
      props: {
        lang,
        redirectSlug,
        slug,
      },
    }
  }

  const initialPost = getBlogBuildPost(lang, slug)
  if (initialPost) {
    return {
      props: {
        alternateLanguagePaths: getBlogBuildAlternateLanguagePaths(initialPost),
        initialPost,
        lang,
        slug,
      },
    }
  }

  return { notFound: true }
}

export default function LangBlogPostPage({ alternateLanguagePaths, initialPost, lang, redirectSlug, slug }: LangBlogPostPageProps) {
  if (redirectSlug) {
    const language = normalizeBlogLanguage(lang)
    return <LegacyRedirectPage title="Article moved" toPath={getBlogPostPath(redirectSlug, language)} />
  }

  return <BlogDetailPage alternateLanguagePaths={alternateLanguagePaths} initialPost={initialPost} lang={lang} slug={slug} />
}
