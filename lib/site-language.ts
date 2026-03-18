export const SUPPORTED_LANGUAGES = ['en', 'nl', 'ru', 'zh', 'ar', 'fa', 'it'] as const

export type SiteLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SiteLanguage = 'en'

export const LANGUAGE_LABELS: Record<SiteLanguage, string> = {
  en: 'English',
  nl: 'Nederlands',
  ru: 'Русский',
  zh: '中文',
  ar: 'العربية',
  fa: 'فارسی',
  it: 'Italiano',
}

export const LANGUAGE_SHORT_LABELS: Record<SiteLanguage, string> = {
  en: 'En',
  nl: 'Nl',
  ru: 'Ru',
  zh: 'Zh',
  ar: 'Ar',
  fa: 'Fa',
  it: 'It',
}

export const LANGUAGE_FONT_FAMILIES: Record<SiteLanguage, string> = {
  en: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  nl: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  it: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  ru: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  zh: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  ar: "'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif",
  fa: "'Vazirmatn', 'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif",
}

const RTL_LANGUAGES = new Set<SiteLanguage>(['ar', 'fa'])

function normalizeLeadingSlash(path: string): string {
  if (!path) {
    return '/'
  }

  return path.startsWith('/') ? path : `/${path}`
}

function splitPathSuffix(path: string): { pathname: string; suffix: string } {
  const queryIndex = path.indexOf('?')
  const hashIndex = path.indexOf('#')

  if (queryIndex === -1 && hashIndex === -1) {
    return { pathname: normalizeLeadingSlash(path), suffix: '' }
  }

  const suffixIndex =
    queryIndex === -1 ? hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex)

  return {
    pathname: normalizeLeadingSlash(path.slice(0, suffixIndex)),
    suffix: path.slice(suffixIndex),
  }
}

export function isSiteLanguage(value: unknown): value is SiteLanguage {
  return typeof value === 'string' && SUPPORTED_LANGUAGES.includes(value as SiteLanguage)
}

export function normalizeSiteLanguage(value?: unknown): SiteLanguage {
  if (isSiteLanguage(value)) {
    return value
  }

  return DEFAULT_LANGUAGE
}

export function isRtlLanguage(language: SiteLanguage): boolean {
  return RTL_LANGUAGES.has(language)
}

export function stripLanguagePrefix(path: string): { language: SiteLanguage; pathname: string } {
  const { pathname } = splitPathSuffix(path)
  const segments = pathname.split('/')
  const maybeLanguage = segments[1]

  if (isSiteLanguage(maybeLanguage)) {
    const remainder = segments.slice(2).join('/')

    return {
      language: maybeLanguage,
      pathname: remainder ? `/${remainder}` : '/',
    }
  }

  return {
    language: DEFAULT_LANGUAGE,
    pathname,
  }
}

export function toLocalizedPath(basePath: string, language: SiteLanguage): string {
  const { pathname, suffix } = splitPathSuffix(basePath)
  const normalizedPath = pathname === '' ? '/' : pathname

  if (language === DEFAULT_LANGUAGE) {
    return `${normalizedPath}${suffix}`
  }

  return normalizedPath === '/'
    ? `/${language}${suffix}`
    : `/${language}${normalizedPath}${suffix}`
}

export function switchLanguagePath(currentPath: string, language: SiteLanguage): string {
  const { pathname, suffix } = splitPathSuffix(currentPath)
  const { pathname: basePath } = stripLanguagePrefix(pathname)

  return toLocalizedPath(basePath, language) + suffix
}

export function buildAlternateLanguagePaths(basePath: string): Array<{ lang: SiteLanguage; path: string }> {
  return SUPPORTED_LANGUAGES.map((language) => ({
    lang: language,
    path: toLocalizedPath(basePath, language),
  }))
}
