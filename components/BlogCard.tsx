import Link from 'next/link'
import { formatBlogDate, getBlogPostPath, type BlogPost } from '../lib/blog'
import { getBlogCopy } from '../lib/blog-copy'
import { type SiteLanguage } from '../lib/site-language'
import BlogImage from './BlogImage'

interface BlogCardProps {
  language: SiteLanguage
  post: BlogPost
  priority?: boolean
  variant?: 'compact' | 'archive'
}

export default function BlogCard({ language, post, priority = false, variant = 'archive' }: BlogCardProps) {
  const copy = getBlogCopy(language)
  const publishedDate = formatBlogDate(post, language)
  const detailPath = getBlogPostPath(post.slug, language)
  const imageAlt = post.image_alt_text || post.title || copy.fallbackImageAlt
  const visibleTags = post.tags.slice(0, 4)

  return (
    <article className={`lp-blog-card lp-blog-card--${variant}`}>
      <Link className="lp-blog-card-media" href={detailPath} aria-label={`${copy.readArticle}: ${post.title}`}>
        <BlogImage alt={imageAlt} className="lp-blog-card-image" loading={priority ? 'eager' : 'lazy'} src={post.image_url} />
        {post.is_featured ? <span className="lp-blog-featured">{copy.featured}</span> : null}
      </Link>

      <div className="lp-blog-card-body">
        <div className="lp-blog-card-meta">
          {publishedDate ? (
            <time dateTime={post.published_at || post.created_at || undefined}>
              {publishedDate}
            </time>
          ) : null}
          {post.topic ? <span>{post.topic}</span> : null}
        </div>

        <h3>
          <Link href={detailPath}>{post.title}</Link>
        </h3>

        {post.excerpt ? <p className="lp-blog-card-excerpt">{post.excerpt}</p> : null}

        {visibleTags.length > 0 ? (
          <ul className="lp-blog-tags" aria-label="Tags">
            {visibleTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        <Link className="lp-blog-card-link" href={detailPath}>
          {copy.readArticle}
        </Link>
      </div>
    </article>
  )
}
