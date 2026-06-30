import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  type BlogListStatus,
  fetchBlogPosts,
  getBlogArchivePath,
  normalizeBlogLanguage,
  sortBlogPostsForHome,
  type BlogPost,
} from '../lib/blog'
import { getBlogCopy } from '../lib/blog-copy'
import { type SiteLanguage } from '../lib/site-language'
import BlogCard from './BlogCard'

interface BlogLatestSectionProps {
  initialPosts?: BlogPost[]
  initialStatus?: BlogListStatus
  language: SiteLanguage
  postsLanguage?: SiteLanguage
}

export default function BlogLatestSection({
  initialPosts = [],
  initialStatus,
  language,
  postsLanguage,
}: BlogLatestSectionProps) {
  const normalizedLanguage = normalizeBlogLanguage(language)
  const copy = getBlogCopy(normalizedLanguage)
  const hasStaticSnapshot =
    Boolean(initialStatus) && (!postsLanguage || postsLanguage === normalizedLanguage)
  const [clientPosts, setClientPosts] = useState<BlogPost[]>([])
  const [clientStatus, setClientStatus] = useState<BlogListStatus>('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const posts = hasStaticSnapshot ? sortBlogPostsForHome(initialPosts).slice(0, 3) : clientPosts
  const status: BlogListStatus = hasStaticSnapshot ? initialStatus ?? 'loading' : clientStatus

  useEffect(() => {
    if (hasStaticSnapshot) {
      return undefined
    }

    const controller = new AbortController()

    setClientStatus('loading')

    fetchBlogPosts(normalizedLanguage, { signal: controller.signal })
      .then((nextPosts) => {
        const visiblePosts = sortBlogPostsForHome(nextPosts).slice(0, 3)
        setClientPosts(visiblePosts)
        setClientStatus(visiblePosts.length > 0 ? 'ready' : 'empty')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setClientPosts([])
        setClientStatus('error')
      })

    return () => controller.abort()
  }, [hasStaticSnapshot, normalizedLanguage, reloadKey])

  return (
    <section className="lp-section lp-blog-latest" aria-labelledby="latest-blog-title">
      <div className="lp-container lp-blog-latest-wrap">
        <header className="lp-section-head lp-blog-section-head lp-reveal">
          <p className="lp-kicker">{copy.latestKicker}</p>
          <h2 id="latest-blog-title">
            {copy.latestTitleA} <span>{copy.latestTitleB}</span>
          </h2>
          <p>{copy.latestIntro}</p>
        </header>

        {status === 'loading' ? (
          <div className="lp-blog-grid" aria-label={copy.loading}>
            {[0, 1, 2].map((item) => (
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
        ) : null}

        {status === 'error' ? (
          <div className="lp-blog-state" role="status">
            <h3>{copy.errorTitle}</h3>
            <p>{copy.errorText}</p>
            {!hasStaticSnapshot ? (
              <button type="button" onClick={() => setReloadKey((key) => key + 1)}>
                {copy.retry}
              </button>
            ) : null}
          </div>
        ) : null}

        {status === 'empty' ? (
          <div className="lp-blog-state" role="status">
            <h3>{copy.emptyTitle}</h3>
            <p>{copy.emptyText}</p>
          </div>
        ) : null}

        {status === 'ready' ? (
          <>
            <div className="lp-blog-grid">
              {posts.map((post, index) => (
                <BlogCard key={post.id} language={normalizedLanguage} post={post} priority={index === 0} variant="compact" />
              ))}
            </div>
            <div className="lp-blog-section-actions">
              <Link className="lp-blog-view-all" href={getBlogArchivePath(normalizedLanguage)}>
                {copy.viewAll}
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
