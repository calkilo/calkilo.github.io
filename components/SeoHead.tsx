import Head from 'next/head'
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME, toAbsoluteUrl } from '../lib/seo'

type OpenGraphType = 'website' | 'article'
type JsonLdSchema = Record<string, unknown>
type JsonLdInput = JsonLdSchema | ReadonlyArray<JsonLdSchema>

interface SeoHeadProps {
  title: string
  description: string
  path: string
  canonicalPath?: string
  ogType?: OpenGraphType
  imagePath?: string
  imageAlt?: string
  keywords?: ReadonlyArray<string>
  noindex?: boolean
  nofollow?: boolean
  jsonLd?: JsonLdInput
  themeColor?: string
}

const DEFAULT_THEME_COLOR = '#00d448'

function normalizeJsonLd(input?: JsonLdInput): string[] {
  if (!input) {
    return []
  }

  const schemas = Array.isArray(input) ? input : [input]
  return schemas.map((schema) => JSON.stringify(schema).replace(/</g, '\\u003c'))
}

export default function SeoHead({
  title,
  description,
  path,
  canonicalPath,
  ogType = 'website',
  imagePath = DEFAULT_OG_IMAGE_PATH,
  imageAlt,
  keywords,
  noindex = false,
  nofollow = false,
  jsonLd,
  themeColor = DEFAULT_THEME_COLOR,
}: SeoHeadProps) {
  const canonicalUrl = toAbsoluteUrl(canonicalPath ?? path)
  const pageUrl = toAbsoluteUrl(path)
  const imageUrl = toAbsoluteUrl(imagePath)
  const serializedJsonLd = normalizeJsonLd(jsonLd)
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-image-preview:large',
    'max-snippet:-1',
    'max-video-preview:-1',
  ].join(',')

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      {keywords && keywords.length > 0 ? (
        <meta name="keywords" content={keywords.join(', ')} key="keywords" />
      ) : null}

      <link rel="canonical" href={canonicalUrl} key="canonical" />
      <meta name="robots" content={robotsContent} key="robots" />
      <meta name="googlebot" content={robotsContent} key="googlebot" />
      <meta name="author" content={SITE_NAME} key="author" />
      <meta name="application-name" content={SITE_NAME} key="application-name" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} key="apple-mobile-web-app-title" />
      <meta name="apple-mobile-web-app-capable" content="yes" key="apple-mobile-web-app-capable" />
      <meta name="mobile-web-app-capable" content="yes" key="mobile-web-app-capable" />
      <meta name="format-detection" content="telephone=no" key="format-detection" />
      <meta name="theme-color" content={themeColor} key="theme-color" />

      <link rel="manifest" href="/manifest.webmanifest" key="manifest" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key="apple-touch-icon" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" key="favicon-32x32" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" key="favicon-16x16" />
      <link rel="icon" href="/favicon.ico" key="favicon-ico" />
      <link rel="shortcut icon" href="/favicon.ico" key="favicon-shortcut" />

      <meta property="og:type" content={ogType} key="og:type" />
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
      <meta property="og:locale" content="en_US" key="og:locale" />
      <meta property="og:url" content={pageUrl} key="og:url" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image" content={imageUrl} key="og:image" />
      <meta property="og:image:alt" content={imageAlt ?? title} key="og:image:alt" />

      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
      <meta name="twitter:image:alt" content={imageAlt ?? title} key="twitter:image:alt" />

      {serializedJsonLd.map((payload, index) => (
        <script
          key={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: payload }}
        />
      ))}
    </Head>
  )
}
