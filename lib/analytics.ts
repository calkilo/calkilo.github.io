import { APP_STORE_URL, CAFE_BAZAAR_URL, MYKET_URL, GOOGLE_PLAY_URL } from './app-links'

const stores: Record<string, string> = {
  [APP_STORE_URL]: 'app_store', [CAFE_BAZAAR_URL]: 'cafe_bazaar',
  [MYKET_URL]: 'myket', [GOOGLE_PLAY_URL]: 'google_play',
}
export function queueAnalytics(...args: unknown[]) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  // gtag consumes Arguments objects, including while its remote script is blocked.
  if (!window.gtag) window.gtag = function () { window.dataLayer?.push(arguments) }
  window.gtag(...args)
}
export function pageType(path: string) {
  if (path.includes('/calories/')) return 'food'
  if (path.includes('/examples/')) return 'example'
  if (path.includes('/blog/')) return 'blog'
  if (path.includes('/contact/')) return 'contact'
  if (path.includes('photo-calorie')) return 'photo'
  if (/^\/(fa\/)?$/.test(path)) return 'home'
  return 'resource'
}
export function trackUiEvent(name: string, ctaLocation: string, extra: Record<string, string> = {}) {
  queueAnalytics('event', name, {
    language: document.documentElement.lang,
    // Only path, never query strings, form values or personal nutrition data.
    landing_page: window.location.pathname,
    page_type: pageType(window.location.pathname), cta_location: ctaLocation, ...extra,
  })
}
export function captureSiteClick(event: MouseEvent) {
  const target = event.target instanceof Element ? event.target : null
  const link = target?.closest<HTMLAnchorElement>('a[href]')
  if (!link) return
  const location = link.closest<HTMLElement>('[data-cta-location]')?.dataset.ctaLocation
    || (link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : link.closest('#download') ? 'download' : link.closest('.lp-static-hero,.lp-hero') ? 'hero' : 'content')
  const store = stores[link.href]
  if (store) trackUiEvent('store_click', location, {store})
  else if (link.hash === '#download') trackUiEvent(link.closest('#pricing') ? 'pricing_plan_click' : 'download_cta_click', location)
  else if (link.hash === '#pricing') trackUiEvent('pricing_click', location)
  else if (link.hash === '#sample') trackUiEvent('sample_interaction', location)
  // No preventDefault, callbacks, transport waits or navigation interception.
}
