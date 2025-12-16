import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Set RTL for Arabic and Persian based on saved preference
      const savedLang = localStorage.getItem('preferred-language') || 'en'
      if (savedLang === 'ar' || savedLang === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl')
      } else {
        document.documentElement.setAttribute('dir', 'ltr')
      }
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
