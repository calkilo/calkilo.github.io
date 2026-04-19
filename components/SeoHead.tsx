import Head from 'next/head'
import {
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_TYPE,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  toAbsoluteUrl,
} from '../lib/seo'
import { DEFAULT_LANGUAGE } from '../lib/site-language'

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
  imageWidth?: number
  imageHeight?: number
  imageType?: string
  keywords?: ReadonlyArray<string>
  noindex?: boolean
  nofollow?: boolean
  jsonLd?: JsonLdInput
  themeColor?: string
  language?: string
  alternateLanguages?: ReadonlyArray<{ lang: string; path: string }>
}

const DEFAULT_THEME_COLOR = '#00d448'

function detectImageType(path: string): string | undefined {
  const normalizedPath = path.split('?')[0].toLowerCase()

  if (normalizedPath.endsWith('.png')) {
    return 'image/png'
  }

  if (normalizedPath.endsWith('.jpg') || normalizedPath.endsWith('.jpeg')) {
    return 'image/jpeg'
  }

  if (normalizedPath.endsWith('.webp')) {
    return 'image/webp'
  }

  if (normalizedPath.endsWith('.gif')) {
    return 'image/gif'
  }

  if (normalizedPath.endsWith('.svg')) {
    return 'image/svg+xml'
  }

  return undefined
}

function normalizeJsonLd(input?: JsonLdInput): string[] {
  if (!input) {
    return []
  }

  const schemas = Array.isArray(input) ? input : [input]
  return schemas.map((schema) => JSON.stringify(schema).replace(/</g, '\\u003c'))
}

const LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  nl: 'nl_NL',
  ru: 'ru_RU',
  zh: 'zh_CN',
  ar: 'ar_AR',
  fa: 'fa_IR',
  it: 'it_IT',
}

export default function SeoHead({
  title,
  description,
  path,
  canonicalPath,
  ogType = 'website',
  imagePath = DEFAULT_OG_IMAGE_PATH,
  imageAlt,
  imageWidth,
  imageHeight,
  imageType,
  keywords,
  noindex = false,
  nofollow = false,
  jsonLd,
  themeColor = DEFAULT_THEME_COLOR,
  language = 'en',
  alternateLanguages,
}: SeoHeadProps) {
  const canonicalUrl = toAbsoluteUrl(canonicalPath ?? path)
  const pageUrl = toAbsoluteUrl(path)
  const imageUrl = toAbsoluteUrl(imagePath)
  const resolvedImageType = imageType ?? detectImageType(imagePath) ?? DEFAULT_OG_IMAGE_TYPE
  const resolvedImageWidth =
    imageWidth ?? (imagePath === DEFAULT_OG_IMAGE_PATH ? DEFAULT_OG_IMAGE_WIDTH : undefined)
  const resolvedImageHeight =
    imageHeight ?? (imagePath === DEFAULT_OG_IMAGE_PATH ? DEFAULT_OG_IMAGE_HEIGHT : undefined)
  const serializedJsonLd = normalizeJsonLd(jsonLd)
  const alternateLocales = alternateLanguages?.filter((alt) => alt.lang !== language) ?? []
  const xDefaultPath =
    alternateLanguages?.find((alt) => alt.lang === DEFAULT_LANGUAGE)?.path ?? canonicalPath ?? path
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
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="default"
        key="apple-mobile-web-app-status-bar-style"
      />
      <meta name="mobile-web-app-capable" content="yes" key="mobile-web-app-capable" />
      <meta name="format-detection" content="telephone=no" key="format-detection" />
      <meta name="referrer" content="strict-origin-when-cross-origin" key="referrer" />
      <meta name="theme-color" content={themeColor} key="theme-color" />
      <meta name="msapplication-TileColor" content={themeColor} key="msapplication-TileColor" />

      <link rel="manifest" href="/manifest.webmanifest" key="manifest" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key="apple-touch-icon" />
      <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" key="favicon-svg" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" key="favicon-32x32" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" key="favicon-16x16" />
      <link rel="icon" href="/favicon.ico" key="favicon-ico" />
      <link rel="shortcut icon" href="/favicon.ico" key="favicon-shortcut" />

      <meta property="og:type" content={ogType} key="og:type" />
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
      <meta property="og:locale" content={LOCALE_MAP[language] || 'en_US'} key="og:locale" />
      <meta property="og:url" content={pageUrl} key="og:url" />
      {alternateLocales.map((alt) => (
        <meta property="og:locale:alternate" content={LOCALE_MAP[alt.lang]} key={`og:locale:${alt.lang}`} />
      ))}
      {alternateLanguages?.map((alt) => (
        <link rel="alternate" hrefLang={alt.lang} href={toAbsoluteUrl(alt.path)} key={`hreflang:${alt.lang}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={toAbsoluteUrl(xDefaultPath)} key="hreflang:x-default" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image" content={imageUrl} key="og:image" />
      <meta property="og:image:secure_url" content={imageUrl} key="og:image:secure_url" />
      <meta property="og:image:type" content={resolvedImageType} key="og:image:type" />
      {resolvedImageWidth ? (
        <meta property="og:image:width" content={String(resolvedImageWidth)} key="og:image:width" />
      ) : null}
      {resolvedImageHeight ? (
        <meta property="og:image:height" content={String(resolvedImageHeight)} key="og:image:height" />
      ) : null}
      <meta property="og:image:alt" content={imageAlt ?? title} key="og:image:alt" />

      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:url" content={pageUrl} key="twitter:url" />
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
