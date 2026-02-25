const DEFAULT_SITE_URL = 'https://calkilo.app'

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, '')
}

export const SITE_NAME = 'Calkilo'
export const SITE_URL = trimTrailingSlashes(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL)
export const DEFAULT_OG_IMAGE_PATH = '/assets/hero-main.png'

export function normalizePath(path = '/'): string {
  if (!path) {
    return '/'
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return path.startsWith('/') ? path : `/${path}`
}

export function toAbsoluteUrl(path = '/'): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return `${SITE_URL}${normalizePath(path)}`
}
