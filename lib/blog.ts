import {
  DEFAULT_LANGUAGE,
  normalizeSiteLanguage,
  toLocalizedPath,
  type SiteLanguage,
} from './site-language'

const DEFAULT_BLOG_API_BASE_URL = 'https://api.calkilo.com'
const MAX_PAGINATED_REQUESTS = 12

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/u, '')
}

export const BLOG_API_BASE_URL = trimTrailingSlashes(
  process.env.NEXT_PUBLIC_BLOG_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    DEFAULT_BLOG_API_BASE_URL,
)

export interface BlogPost {
  id: number | string
  title: string
  slug: string
  excerpt: string
  content: string | null
  image_url: string | null
  image_alt_text: string | null
  topic: string | null
  language: string
  source_language: string | null
  available_languages: string[]
  tags: string[]
  is_featured: boolean
  published_at: string | null
  created_at: string | null
  updated_at: string | null
}

export type BlogListStatus = 'empty' | 'error' | 'loading' | 'ready'

export interface BlogListSnapshot {
  posts: BlogPost[]
  status: Exclude<BlogListStatus, 'loading'>
}

interface BlogListPage {
  posts: BlogPost[]
  next: string | null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function getNullableString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null
}

function getStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function normalizeBlogPost(value: unknown): BlogPost | null {
  if (!isRecord(value)) {
    return null
  }

  const title = getString(value.title)
  const slug = getString(value.slug)

  if (!title || !slug) {
    return null
  }

  return {
    id:
      typeof value.id === 'number' || typeof value.id === 'string'
        ? value.id
        : slug,
    title,
    slug,
    excerpt: getString(value.excerpt),
    content: getNullableString(value.content),
    image_url: getNullableString(value.image_url),
    image_alt_text: getNullableString(value.image_alt_text),
    topic: getNullableString(value.topic),
    language: getString(value.language, DEFAULT_LANGUAGE),
    source_language: getNullableString(value.source_language),
    available_languages: getStringArray(value.available_languages),
    tags: getStringArray(value.tags),
    is_featured: value.is_featured === true,
    published_at: getNullableString(value.published_at),
    created_at: getNullableString(value.created_at),
    updated_at: getNullableString(value.updated_at),
  }
}

function normalizeBlogListPayload(payload: unknown): BlogListPage {
  if (Array.isArray(payload)) {
    return {
      posts: payload.map(normalizeBlogPost).filter((post): post is BlogPost => Boolean(post)),
      next: null,
    }
  }

  if (isRecord(payload) && Array.isArray(payload.results)) {
    return {
      posts: payload.results.map(normalizeBlogPost).filter((post): post is BlogPost => Boolean(post)),
      next: getNullableString(payload.next),
    }
  }

  throw new Error('Unexpected blog API response.')
}

function resolvePaginatedUrl(value: string): string {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  return new URL(value, `${BLOG_API_BASE_URL}/`).toString()
}

function buildBlogApiUrl(path: string, language: SiteLanguage): string {
  const url = new URL(path, `${BLOG_API_BASE_URL}/`)
  url.searchParams.set('language', normalizeBlogLanguage(language))

  return url.toString()
}

async function requestJson(url: string, init?: RequestInit): Promise<unknown> {
  const headers = new Headers(init?.headers)

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  const response = await fetch(url, {
    ...init,
    headers,
  })

  if (!response.ok) {
    throw new Error(`Blog API request failed with ${response.status}.`)
  }

  return response.json()
}

function getPostTimestamp(post: BlogPost): number {
  const timestamp = Date.parse(post.published_at || post.created_at || post.updated_at || '')

  return Number.isFinite(timestamp) ? timestamp : 0
}

export function normalizeBlogLanguage(value?: unknown): SiteLanguage {
  return normalizeSiteLanguage(value)
}

export function sortBlogPostsByNewest(posts: ReadonlyArray<BlogPost>): BlogPost[] {
  return [...posts].sort((a, b) => getPostTimestamp(b) - getPostTimestamp(a))
}

export function sortBlogPostsForHome(posts: ReadonlyArray<BlogPost>): BlogPost[] {
  return [...posts].sort((a, b) => {
    if (a.is_featured !== b.is_featured) {
      return a.is_featured ? -1 : 1
    }

    return getPostTimestamp(b) - getPostTimestamp(a)
  })
}

export async function fetchBlogPosts(language: SiteLanguage, init?: RequestInit): Promise<BlogPost[]> {
  const posts: BlogPost[] = []
  const visitedUrls = new Set<string>()
  let nextUrl: string | null = buildBlogApiUrl('/blog/', normalizeBlogLanguage(language))

  for (let requestCount = 0; nextUrl && requestCount < MAX_PAGINATED_REQUESTS; requestCount += 1) {
    if (visitedUrls.has(nextUrl)) {
      break
    }

    visitedUrls.add(nextUrl)
    const page = normalizeBlogListPayload(await requestJson(nextUrl, init))
    posts.push(...page.posts)
    nextUrl = page.next ? resolvePaginatedUrl(page.next) : null
  }

  return sortBlogPostsByNewest(posts)
}

export async function fetchBlogListSnapshot(language: SiteLanguage): Promise<BlogListSnapshot> {
  try {
    const posts = await fetchBlogPosts(language)

    return {
      posts,
      status: posts.length > 0 ? 'ready' : 'empty',
    }
  } catch {
    return {
      posts: [],
      status: 'error',
    }
  }
}

export async function fetchBlogPost(
  slug: string,
  language: SiteLanguage,
  init?: RequestInit,
): Promise<BlogPost> {
  const normalizedSlug = encodeURIComponent(slug)
  const payload = await requestJson(buildBlogApiUrl(`/blog/${normalizedSlug}/`, normalizeBlogLanguage(language)), init)
  const post = normalizeBlogPost(payload)

  if (!post) {
    throw new Error('Unexpected blog post API response.')
  }

  return post
}

export function getBlogArchivePath(language: SiteLanguage): string {
  return toLocalizedPath('/blog', normalizeBlogLanguage(language))
}

export function getBlogPostPath(slug: string, language: SiteLanguage): string {
  return toLocalizedPath(`/blog/${slug}`, normalizeBlogLanguage(language))
}

export function formatBlogDate(post: BlogPost, language: SiteLanguage): string {
  const sourceDate = post.published_at || post.created_at || post.updated_at

  if (!sourceDate) {
    return ''
  }

  const date = new Date(sourceDate)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat(normalizeBlogLanguage(language), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
