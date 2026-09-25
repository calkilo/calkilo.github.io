import Head from 'next/head'
import { useEffect } from 'react'
import redirects from '../data/seo-redirects.json'
import { SITE_URL } from '../lib/seo'

// Nginx supplies the 301; this fallback also supports static previews and old clients.
export default function ConsolidatedPage({ path }: { path: keyof typeof redirects }) {
  const target = redirects[path]
  const label = path.startsWith('/fa/') ? 'راهنمای محاسبه کالری با عکس' : 'Guida al calcolo delle calorie da foto'
  useEffect(() => { window.location.replace(target + window.location.search + window.location.hash) }, [target])
  return <>
    <Head><title>{label} | Calkilo</title><link rel="canonical" href={`${SITE_URL}${target}`} /><meta name="robots" content="noindex,follow" /><meta httpEquiv="refresh" content={`0;url=${target}`} /></Head>
    <main dir={path.startsWith('/fa/') ? 'rtl' : 'ltr'}><h1>{label}</h1><a href={target}>{label} →</a></main>
  </>
}
