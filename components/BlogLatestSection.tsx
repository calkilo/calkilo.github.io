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

const EMPTY_BLOG_POSTS: BlogPost[] = []

interface BlogLatestSectionProps {
  initialPosts?: BlogPost[]
  initialStatus?: BlogListStatus
  language: SiteLanguage
  postsLanguage?: SiteLanguage
}

export default function BlogLatestSection({
  initialPosts = EMPTY_BLOG_POSTS,
  initialStatus,
  language,
  postsLanguage,
}: BlogLatestSectionProps) {
  const normalizedLanguage = normalizeBlogLanguage(language)
  const copy = getBlogCopy(normalizedLanguage)
  const hasInitialSnapshot =
    Boolean(initialStatus) && (!postsLanguage || postsLanguage === normalizedLanguage)
  const initialVisiblePosts = hasInitialSnapshot ? sortBlogPostsForHome(initialPosts).slice(0, 3) : []
  const [posts, setPosts] = useState<BlogPost[]>(initialVisiblePosts)
  const [status, setStatus] = useState<BlogListStatus>(hasInitialSnapshot ? initialStatus ?? 'loading' : 'loading')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const snapshotPosts = hasInitialSnapshot ? sortBlogPostsForHome(initialPosts).slice(0, 3) : []
    const hasUsableSnapshot = snapshotPosts.length > 0 && initialStatus === 'ready'

    setPosts(snapshotPosts)
    setStatus(hasInitialSnapshot ? initialStatus ?? 'loading' : 'loading')

    if (!hasUsableSnapshot) {
      setStatus('loading')
    }

    if (hasUsableSnapshot && reloadKey === 0) {
      return
    }

    const controller = new AbortController()

    fetchBlogPosts(normalizedLanguage, { signal: controller.signal })
      .then((nextPosts) => {
        const visiblePosts = sortBlogPostsForHome(nextPosts).slice(0, 3)
        setPosts(visiblePosts)
        setStatus(visiblePosts.length > 0 ? 'ready' : 'empty')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        if (hasUsableSnapshot) {
          setPosts(snapshotPosts)
          setStatus('ready')
          return
        }

        setPosts([])
        setStatus('error')
      })

    return () => controller.abort()
  }, [hasInitialSnapshot, initialPosts, initialStatus, normalizedLanguage, reloadKey])

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
            <button type="button" onClick={() => setReloadKey((key) => key + 1)}>
              {copy.retry}
            </button>
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
              {posts.map((post) => (
                <BlogCard key={post.id} language={normalizedLanguage} post={post} variant="compact" />
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
