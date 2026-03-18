import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { isRtlLanguage, normalizeSiteLanguage } from '../lib/site-language'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const language = normalizeSiteLanguage((pageProps as { lang?: string }).lang)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRtlLanguage(language) ? 'rtl' : 'ltr'
  }, [language])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
