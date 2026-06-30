import { useEffect, useMemo, useState } from 'react'
import { type BlogListStatus, fetchBlogPosts, normalizeBlogLanguage, type BlogPost } from '../lib/blog'
import { getBlogCopy } from '../lib/blog-copy'
import { SITE_URL } from '../lib/seo'
import BlogCard from './BlogCard'
import StaticPageLayout from './StaticPageLayout'

interface BlogArchivePageProps {
  initialPosts?: BlogPost[]
  initialStatus?: BlogListStatus
  lang?: string
}

export default function BlogArchivePage({ initialPosts = [], initialStatus, lang }: BlogArchivePageProps) {
  const language = normalizeBlogLanguage(lang)
  const copy = getBlogCopy(language)
  const hasStaticSnapshot = Boolean(initialStatus)
  const [clientPosts, setClientPosts] = useState<BlogPost[]>([])
  const [clientStatus, setClientStatus] = useState<BlogListStatus>('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const posts = hasStaticSnapshot ? initialPosts : clientPosts
  const status: BlogListStatus = hasStaticSnapshot ? initialStatus ?? 'loading' : clientStatus

  useEffect(() => {
    if (hasStaticSnapshot) {
      return undefined
    }

    const controller = new AbortController()

    setClientStatus('loading')

    fetchBlogPosts(language, { signal: controller.signal })
      .then((nextPosts) => {
        setClientPosts(nextPosts)
        setClientStatus(nextPosts.length > 0 ? 'ready' : 'empty')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setClientPosts([])
        setClientStatus('error')
      })

    return () => controller.abort()
  }, [hasStaticSnapshot, language, reloadKey])

  const pageJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: copy.archiveSeoTitle,
      description: copy.archiveSeoDescription,
      url: `${SITE_URL}${language === 'en' ? '/blog/' : `/${language}/blog/`}`,
      inLanguage: language,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Calkilo',
        url: SITE_URL,
      },
    }),
    [copy.archiveSeoDescription, copy.archiveSeoTitle, language],
  )

  return (
    <StaticPageLayout
      title={copy.archiveSeoTitle}
      description={copy.archiveSeoDescription}
      path="/blog"
      heading={copy.archiveHeading}
      intro={copy.archiveIntro}
      activeNav="blog"
      lang={language}
      jsonLd={pageJsonLd}
    >
      {status === 'loading' ? (
        <section className="lp-blog-archive-state" aria-label={copy.loading}>
          <div className="lp-blog-grid lp-blog-grid--archive">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <article className="lp-blog-card lp-blog-skeleton" key={item}>
                <div className="lp-blog-card-media" />
                <div className="lp-blog-card-body">
                  <span />
                  <strong />
                  <p />
                  <small />
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {status === 'error' ? (
        <section className="lp-blog-state" role="alert">
          <h2>{copy.errorTitle}</h2>
          <p>{copy.errorText}</p>
          {!hasStaticSnapshot ? (
            <button type="button" onClick={() => setReloadKey((key) => key + 1)}>
              {copy.retry}
            </button>
          ) : null}
        </section>
      ) : null}

      {status === 'empty' ? (
        <section className="lp-blog-state" role="status">
          <h2>{copy.emptyTitle}</h2>
          <p>{copy.emptyText}</p>
        </section>
      ) : null}

      {status === 'ready' ? (
        <section className="lp-blog-grid lp-blog-grid--archive" aria-label={copy.archiveHeading}>
          {posts.map((post, index) => (
            <BlogCard key={post.id} language={language} post={post} priority={index < 2} />
          ))}
        </section>
      ) : null}
    </StaticPageLayout>
  )
}
