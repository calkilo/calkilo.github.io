import {
  DEFAULT_LANGUAGE,
  isSiteLanguage,
  normalizeSiteLanguage,
  toLocalizedPath,
  type SiteLanguage,
} from './site-language'

const DEFAULT_BLOG_API_BASE_URL = 'https://api.calkilo.com'
const MAX_PAGINATED_REQUESTS = 12
const MAX_REQUEST_RETRIES = 4

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

function resolvePaginatedUrl(value: string, language: SiteLanguage): string {
  const url = value.startsWith('http://') || value.startsWith('https://')
    ? new URL(value)
    : new URL(value, `${BLOG_API_BASE_URL}/`)

  // Pagination links can omit request filters. Keep the selected site language on
  // every page so a localized blog never falls back to the API's default language.
  url.searchParams.set('language', normalizeBlogLanguage(language))

  return url.toString()
}

function buildBlogApiUrl(path: string, language: SiteLanguage): string {
  const url = new URL(path, `${BLOG_API_BASE_URL}/`)
  url.searchParams.set('language', normalizeBlogLanguage(language))

  return url.toString()
}

function parseRetryAfter(value: string | null): number | null {
  if (!value) return null

  const seconds = Number(value)
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000)

  const timestamp = Date.parse(value)
  return Number.isFinite(timestamp) ? Math.max(0, timestamp - Date.now()) : null
}

function waitForRetry(milliseconds: number, signal?: AbortSignal | null): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('The operation was aborted.', 'AbortError'))
      return
    }

    const timeout = setTimeout(resolve, milliseconds)
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timeout)
        reject(new DOMException('The operation was aborted.', 'AbortError'))
      },
      { once: true },
    )
  })
}

async function requestJson(url: string, init?: RequestInit): Promise<unknown> {
  const headers = new Headers(init?.headers)

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  for (let attempt = 0; attempt <= MAX_REQUEST_RETRIES; attempt += 1) {
    const response = await fetch(url, {
      ...init,
      cache: init?.cache ?? 'no-store',
      headers,
    })

    if (response.ok) {
      return response.json()
    }

    const retriable = response.status === 429 || response.status >= 500
    if (!retriable || attempt === MAX_REQUEST_RETRIES) {
      throw new Error(`Blog API request failed with ${response.status}.`)
    }

    const retryAfter = parseRetryAfter(response.headers.get('retry-after'))
    const backoff = Math.min(8_000, 500 * (2 ** attempt))
    const jitter = Math.floor(Math.random() * 250)
    await waitForRetry(Math.min(15_000, retryAfter ?? backoff) + jitter, init?.signal)
  }

  throw new Error('Blog API request failed after retries.')
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

function normalizeBlogTitle(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
}

function numericSlugSuffix(slug: string): number {
  const match = slug.match(/-(\d+)$/u)
  return match ? Number(match[1]) : 0
}

export function deduplicateBlogPosts(posts: ReadonlyArray<BlogPost>): BlogPost[] {
  const canonicalPosts = new Map<string, BlogPost>()
  const slugFamilyCounts = new Map<string, number>()

  posts.forEach((post) => {
    const slugFamily = post.slug.replace(/-\d+$/u, '')
    slugFamilyCounts.set(slugFamily, (slugFamilyCounts.get(slugFamily) ?? 0) + 1)
  })

  posts.forEach((post) => {
    const slugFamily = post.slug.replace(/-\d+$/u, '')
    const topic = normalizeBlogTitle(post.topic ?? '')
    const key = topic
      ? `topic:${topic}`
      : (slugFamilyCounts.get(slugFamily) ?? 0) > 1
        ? `slug:${slugFamily}`
        : `title:${normalizeBlogTitle(post.title)}`
    const current = canonicalPosts.get(key)

    const postSuffix = numericSlugSuffix(post.slug)
    const currentSuffix = current ? numericSlugSuffix(current.slug) : Number.POSITIVE_INFINITY
    const postTimestamp = getPostTimestamp(post)
    const currentTimestamp = current ? getPostTimestamp(current) : Number.POSITIVE_INFINITY
    const shouldReplace = !current
      || postSuffix < currentSuffix
      || (postSuffix === currentSuffix && postTimestamp < currentTimestamp)
      || (postSuffix === currentSuffix && postTimestamp === currentTimestamp && post.slug.localeCompare(current.slug) < 0)

    if (shouldReplace) {
      canonicalPosts.set(key, post)
    }
  })

  return sortBlogPostsByNewest(Array.from(canonicalPosts.values()))
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
    nextUrl = page.next ? resolvePaginatedUrl(page.next, language) : null
  }

  return deduplicateBlogPosts(posts)
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

export function getBlogPostAlternateLanguagePaths(
  post: BlogPost,
): Array<{ lang: SiteLanguage; path: string }> {
  const languages = new Set<SiteLanguage>()

  post.available_languages.forEach((language) => {
    if (isSiteLanguage(language)) {
      languages.add(language)
    }
  })

  if (isSiteLanguage(post.language)) {
    languages.add(post.language)
  }

  return Array.from(languages).map((language) => ({
    lang: language,
    path: getBlogPostPath(post.slug, language),
  }))
}

export function formatBlogDate(post: BlogPost, language: SiteLanguage): string {
  const sourceDate = post.published_at || post.created_at || post.updated_at

  return formatBlogDateValue(sourceDate, language)
}

export function formatBlogDateValue(sourceDate: string | null | undefined, language: SiteLanguage): string {

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
