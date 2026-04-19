const DEFAULT_SITE_URL = 'https://calkilo.com'

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, '')
}

export const SITE_NAME = 'Calkilo'
export const SITE_URL = trimTrailingSlashes(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL)
export const DEFAULT_OG_IMAGE_PATH = '/assets/hero-main.png'
export const DEFAULT_OG_IMAGE_WIDTH = 950
export const DEFAULT_OG_IMAGE_HEIGHT = 600
export const DEFAULT_OG_IMAGE_TYPE = 'image/png'

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
