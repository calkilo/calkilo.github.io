export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.calkilo.mobile&hl=fa'
export const APP_STORE_URL = 'https://apps.apple.com/us/app/calkilo-ai-calorie-counter/id6755718411'
export const CALKILO_WEB_URL = 'https://calkilo.com'
export const CALKILO_APP_SCHEME = 'calkilo'

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

export function detectDevicePlatform(userAgent: string) {
  const normalized = userAgent.toLowerCase()

  if (/iphone|ipad|ipod/.test(normalized)) {
    return 'ios' as const
  }

  if (/android/.test(normalized)) {
    return 'android' as const
  }

  return 'desktop' as const
}

export function buildAppDeepLink(path: string, query: Record<string, LinkQueryValue> = {}) {
  const normalizedPath = path.replace(/^\/+/, '')
  return withQueryParams(`${CALKILO_APP_SCHEME}://${normalizedPath}`, query)
}

export function buildOpenMealDeepLink(query: Record<string, LinkQueryValue> = {}) {
  return buildAppDeepLink('open-meal', query)
}
