import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  getBlogPostPath,
  normalizeBlogLanguage,
  type BlogListSnapshot,
  type BlogPost,
} from './blog'
import { type SiteLanguage } from './site-language'

interface BlogBuildLanguageData {
  posts: BlogPost[]
  redirects: Record<string, string>
  allSlugs: string[]
}

interface BlogBuildManifest {
  generatedAt: string
  source: string
  languages: Record<SiteLanguage, BlogBuildLanguageData>
}

let cachedManifest: BlogBuildManifest | null = null

function readManifest(): BlogBuildManifest {
  if (cachedManifest) return cachedManifest

  const manifestPath = join(process.cwd(), 'data', 'blog-manifest.json')
  let payload: unknown

  try {
    payload = JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch (error) {
    throw new Error(
      `Blog build manifest is missing or invalid at ${manifestPath}. Run npm run prebuild before next build.`,
      { cause: error },
    )
  }

  if (!payload || typeof payload !== 'object' || !('languages' in payload)) {
    throw new Error('Blog build manifest has an unexpected shape.')
  }

  cachedManifest = payload as BlogBuildManifest
  return cachedManifest
}

export function getBlogBuildLanguageData(language: SiteLanguage): BlogBuildLanguageData {
  const normalizedLanguage = normalizeBlogLanguage(language)
  const data = readManifest().languages[normalizedLanguage]

  if (!data || !Array.isArray(data.posts) || !Array.isArray(data.allSlugs)) {
    throw new Error(`Blog build manifest has no valid data for ${normalizedLanguage}.`)
  }

  return data
}

export function getBlogBuildSnapshot(language: SiteLanguage, limit?: number): BlogListSnapshot {
  const allPosts = getBlogBuildLanguageData(language).posts
  const posts = allPosts
    .slice(0, limit ?? allPosts.length)
    .map((post) => ({ ...post, content: null }))

  return {
    posts,
    status: posts.length > 0 ? 'ready' : 'empty',
  }
}

export function getBlogBuildPost(language: SiteLanguage, slug: string): BlogPost | null {
  return getBlogBuildLanguageData(language).posts.find((post) => post.slug === slug) ?? null
}

export function getBlogBuildRedirect(language: SiteLanguage, slug: string): string | null {
  return getBlogBuildLanguageData(language).redirects[slug] ?? null
}

function normalizeTopic(value: string | null | undefined): string {
  return String(value || '')
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
}

export function getBlogBuildAlternateLanguagePaths(
  post: BlogPost,
): Array<{ lang: SiteLanguage; path: string }> {
  const manifest = readManifest()
  const sourceTopic = normalizeTopic(post.topic)
  return (Object.keys(manifest.languages) as SiteLanguage[]).flatMap((language) => {
    const languageData = manifest.languages[language]
    const topicMatch = sourceTopic
      ? languageData.posts.find((candidate) => normalizeTopic(candidate.topic) === sourceTopic)
      : null
    const directSlug = languageData.redirects[post.slug] ?? post.slug
    const targetPost = topicMatch ?? languageData.posts.find((candidate) => candidate.slug === directSlug)

    return targetPost
      ? [{ lang: language, path: getBlogPostPath(targetPost.slug, language) }]
      : []
  })
}
