import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { isRtlLanguage, normalizeSiteLanguage } from '../lib/site-language'
import '../styles/globals.css'
import { captureSiteClick, queueAnalytics, trackUiEvent } from '../lib/analytics'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || 'G-KSFK6RGGYG'
const ANALYTICS_DELAY_MS = 10_000

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export default function App({ Component, pageProps, router }: AppProps) {
  const pagePath = router.asPath.split(/[?#]/)[0]
  const pathLanguage = router.asPath.split(/[/?#]/).filter(Boolean)[0]
  const language = normalizeSiteLanguage((pageProps as { lang?: string }).lang || pathLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRtlLanguage(language) ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
      return
    }

    queueAnalytics('js', new Date())
    queueAnalytics('config', GA_MEASUREMENT_ID, { send_page_view: false })
    let hasLoaded = false
    let timeoutId: number | undefined
    const interactionEvents = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const

    const cleanupInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, loadAnalytics)
      })
    }

    const loadAnalytics = () => {
      if (hasLoaded) {
        return
      }

      hasLoaded = true
      cleanupInteractionListeners()
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`
      document.head.append(script)
    }

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, loadAnalytics, { once: true, passive: true })
    })
    timeoutId = window.setTimeout(loadAnalytics, ANALYTICS_DELAY_MS)

    return () => {
      cleanupInteractionListeners()
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  useEffect(() => {
    queueAnalytics('event', 'page_view', { page_location: window.location.origin + pagePath, page_title: document.title })
    const onClick = (event: MouseEvent) => captureSiteClick(event)
    document.addEventListener('click', onClick, true)
    const sample = document.querySelector('[data-sample]')
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        trackUiEvent('sample_view', 'sample')
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    if (sample) observer.observe(sample)
    return () => { document.removeEventListener('click', onClick, true); observer.disconnect() }
  }, [pagePath])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
