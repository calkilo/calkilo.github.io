import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toAbsoluteUrl } from '../lib/seo'

interface LegacyRedirectPageProps {
  title: string
  toPath: string
}

export default function LegacyRedirectPage({ title, toPath }: LegacyRedirectPageProps) {
  const router = useRouter()

  useEffect(() => {
    void router.replace(toPath)
  }, [router, toPath])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta httpEquiv="refresh" content={`0;url=${toPath}`} />
        <link rel="canonical" href={toAbsoluteUrl(toPath)} />
        <meta name="robots" content="noindex,follow" />
      </Head>

      <main
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '24px',
          fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <p style={{ margin: 0, textAlign: 'center', lineHeight: 1.6 }}>
          This page has moved. Continue to the{' '}
          <Link href={toPath}>
            current page
          </Link>
          .
        </p>
      </main>
    </>
  )
}
