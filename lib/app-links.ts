import { type SiteLanguage } from './site-language'

export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.calkilo.mobile&hl=fa'
export const CAFE_BAZAAR_URL = 'https://cafebazaar.ir/app/com.calkilo.mobile'
export const MYKET_URL = 'https://myket.ir/app/com.calkilo.mobile'
export const APP_STORE_URL = 'https://apps.apple.com/us/app/calkilo-ai-calorie-counter/id6755718411'
export const CALKILO_WEB_URL = 'https://calkilo.com'
export const CALKILO_APP_SCHEME = 'calkilo'
export const CALKILO_ANDROID_PACKAGE = 'com.calkilo.mobile'

export const PERSIAN_ANDROID_STORE_LINKS = [
  { label: 'Cafe Bazaar', href: CAFE_BAZAAR_URL },
  { label: 'Myket', href: MYKET_URL },
] as const

export function getAndroidStoreLinks(language: SiteLanguage | string = 'en') {
  if (language === 'fa') {
    return PERSIAN_ANDROID_STORE_LINKS
  }

  return [{ label: 'Google Play', href: GOOGLE_PLAY_URL }] as const
}

export function getStoreSameAs(language: SiteLanguage | string = 'en') {
  return [...getAndroidStoreLinks(language).map((store) => store.href), APP_STORE_URL]
}

type LinkQueryValue = string | undefined

function withQueryParams(baseUrl: string, query: Record<string, LinkQueryValue>) {
  const url = new URL(baseUrl)

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    }
  })

  return url.toString()
}

export function getQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export function detectDevicePlatform(userAgent: string, maxTouchPoints = 0) {
  const normalized = userAgent.toLowerCase()

  if (/iphone|ipad|ipod/.test(normalized) || (/macintosh/.test(normalized) && maxTouchPoints > 1)) {
    return 'ios' as const
  }

  if (/android/.test(normalized)) {
    return 'android' as const
  }

  return 'desktop' as const
}

export function buildAppDeepLink(path: string, query: Record<string, LinkQueryValue> = {}) {
  const normalizedPath = path.replace(/^\/+/, '')
  return withQueryParams(`${CALKILO_APP_SCHEME}://open/${normalizedPath}`, query)
}

export function buildAndroidIntentLink(
  path: string,
  query: Record<string, LinkQueryValue> = {},
  fallbackUrl = GOOGLE_PLAY_URL,
) {
  const deepLink = buildAppDeepLink(path, query).replace(`${CALKILO_APP_SCHEME}://`, '')

  return `intent://${deepLink}#Intent;scheme=${CALKILO_APP_SCHEME};package=${CALKILO_ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`
}

export function buildOpenMealDeepLink(query: Record<string, LinkQueryValue> = {}) {
  return buildAppDeepLink('open-meal', query)
}
