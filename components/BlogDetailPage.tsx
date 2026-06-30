import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  fetchBlogPost,
  formatBlogDate,
  getBlogArchivePath,
  normalizeBlogLanguage,
  type BlogPost,
} from '../lib/blog'
import { getBlogCopy } from '../lib/blog-copy'
import { SITE_URL } from '../lib/seo'
import BlogImage from './BlogImage'
import BlogMarkdown from './BlogMarkdown'
import StaticPageLayout from './StaticPageLayout'

type BlogDetailStatus = 'error' | 'loading' | 'ready'

interface BlogDetailPageProps {
  initialPost?: BlogPost | null
  lang?: string
  slug: string
}

export default function BlogDetailPage({ initialPost = null, lang, slug }: BlogDetailPageProps) {
  const language = normalizeBlogLanguage(lang)
  const copy = getBlogCopy(language)
  const hasInitialPost = Boolean(initialPost)
  const [post, setPost] = useState<BlogPost | null>(initialPost)
  const [status, setStatus] = useState<BlogDetailStatus>(initialPost ? 'ready' : 'loading')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (hasInitialPost && initialPost) {
      setPost(initialPost)
      setStatus('ready')
    }

    const controller = new AbortController()

    if (!hasInitialPost) {
      setStatus('loading')
    }

    fetchBlogPost(slug, language, { signal: controller.signal })
      .then((nextPost) => {
        setPost(nextPost)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        if (hasInitialPost && initialPost) {
          setPost(initialPost)
          setStatus('ready')
          return
        }

        setStatus('error')
      })

    return () => controller.abort()
  }, [hasInitialPost, initialPost, language, reloadKey, slug])

  const pageTitle = post?.title || copy.detailLoadingTitle
  const pageDescription = post?.excerpt || copy.detailLoadingIntro
  const basePath = `/blog/${post?.slug || slug}`
  const publishedDate = post ? formatBlogDate(post, language) : ''
  const articleUrl = `${SITE_URL}${language === 'en' ? basePath : `/${language}${basePath}`}/`

  const jsonLd = useMemo(() => {
    if (!post) {
      return undefined
    }

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.image_url ? [post.image_url] : undefined,
        datePublished: post.published_at || post.created_at || undefined,
        dateModified: post.updated_at || post.published_at || undefined,
        inLanguage: language,
        url: articleUrl,
        author: {
          '@type': 'Organization',
          name: 'Calkilo',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Calkilo',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/assets/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Blog',
            item: `${SITE_URL}${getBlogArchivePath(language)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ]
  }, [articleUrl, language, post])

  return (
    <StaticPageLayout
      title={pageTitle}
      description={pageDescription}
      path={basePath}
      heading={pageTitle}
      intro={pageDescription}
      activeNav="blog"
      lang={language}
      ogType="article"
      imagePath={post?.image_url || undefined}
      jsonLd={jsonLd}
    >
      <article className="lp-static-card lp-blog-detail-card">
        <div className="lp-blog-detail-cover">
          <BlogImage
            alt={post?.image_alt_text || post?.title || copy.fallbackImageAlt}
            className="lp-blog-detail-image"
            loading="eager"
            src={post?.image_url}
          />
        </div>

        <div className="lp-blog-detail-body">
          <Link className="lp-blog-back-link" href={getBlogArchivePath(language)}>
            {copy.backToBlog}
          </Link>

          {status === 'error' ? (
            <div className="lp-blog-state lp-blog-state--inline" role="alert">
              <h2>{copy.detailErrorTitle}</h2>
              <p>{copy.detailErrorText}</p>
              <button type="button" onClick={() => setReloadKey((key) => key + 1)}>
                {copy.retry}
              </button>
            </div>
          ) : null}

          {status === 'loading' ? (
            <div className="lp-blog-state lp-blog-state--inline" role="status">
              <h2>{copy.detailLoadingTitle}</h2>
              <p>{copy.detailLoadingIntro}</p>
            </div>
          ) : null}

          {post ? (
            <>
              <div className="lp-blog-detail-meta">
                {publishedDate ? (
                  <time dateTime={post.published_at || post.created_at || undefined}>
                    {copy.published}: {publishedDate}
                  </time>
                ) : null}
                {post.topic ? <span>{post.topic}</span> : null}
              </div>

              {post.tags.length > 0 ? (
                <ul className="lp-blog-tags lp-blog-detail-tags" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}

              <div className="lp-blog-prose">
                <BlogMarkdown content={post.content} emptyLabel={copy.contentUnavailable} />
              </div>
            </>
          ) : null}
        </div>
      </article>
    </StaticPageLayout>
  )
}
