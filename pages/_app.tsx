import Head from 'next/head'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { isRtlLanguage, normalizeSiteLanguage } from '../lib/site-language'
import '../styles/globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || 'G-KSFK6RGGYG'

export default function App({ Component, pageProps, router }: AppProps) {
  const pathLanguage = router.asPath.split(/[/?#]/).filter(Boolean)[0]
  const language = normalizeSiteLanguage((pageProps as { lang?: string }).lang || pathLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRtlLanguage(language) ? 'rtl' : 'ltr'
  }, [language])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            id="google-analytics-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});
              `,
            }}
          />
        </>
      ) : null}
      <Component {...pageProps} />
    </>
  )
}
