import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from '../../hooks/useTranslation'

const validLocales = ['en', 'fa', 'zh', 'ru', 'it', 'fr', 'de', 'ar', 'es', 'nl']

export default function TermsOfServiceLocale() {
  const router = useRouter()
  const { locale } = router.query
  const localeStr = typeof locale === 'string' ? locale : 'en'
  const { t, isLoading } = useTranslation('terms-of-service')
  
  // Set locale in localStorage when component mounts or locale changes
  useEffect(() => {
    if (typeof window !== 'undefined' && localeStr && validLocales.includes(localeStr)) {
      localStorage.setItem('preferred-language', localeStr)
      document.documentElement.setAttribute('lang', localeStr)
      if (localeStr === 'ar' || localeStr === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl')
      } else {
        document.documentElement.setAttribute('dir', 'ltr')
      }
    }
  }, [localeStr])

  if (isLoading) {
    return (
      <Layout>
        <main className="legal-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div>Loading...</div>
        </main>
      </Layout>
    )
  }

  const basePath = localeStr && localeStr !== 'en' ? `/${localeStr}` : ''
  const canonicalUrl = `https://calkilo.com${basePath}/terms-of-service`

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout>
        <main className="legal-content">
          <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
            <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
              <li>
                <Link href={basePath || '/'} style={{ color: '#6366f1', textDecoration: 'none' }}>
                  {t('breadcrumb.home')}
                </Link>
              </li>
              <li aria-hidden="true" style={{ color: '#9ca3af' }}>
                /
              </li>
              <li aria-current="page" style={{ color: '#6b7280' }}>
                {t('breadcrumb.current')}
              </li>
            </ol>
          </nav>

          <Link href={basePath || '/'} className="back-link">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            {t('backToHome')}
          </Link>

          <h1>{t('breadcrumb.current')}</h1>
          <p className="last-updated">{t('lastUpdated')}</p>

          <p>{t('content.intro')}</p>

          <h2>{t('content.sections.acceptanceOfTerms.title')}</h2>
          <p>{t('content.sections.acceptanceOfTerms.description')}</p>

          <h2>{t('content.sections.descriptionOfService.title')}</h2>
          <p>{t('content.sections.descriptionOfService.description')}</p>
          <ul>
            <li>{t('content.sections.descriptionOfService.items.0')}</li>
            <li>{t('content.sections.descriptionOfService.items.1')}</li>
            <li>{t('content.sections.descriptionOfService.items.2')}</li>
            <li>{t('content.sections.descriptionOfService.items.3')}</li>
          </ul>

          <h2>{t('content.sections.healthDisclaimer.title')}</h2>
          <p>
            <strong>{t('content.sections.healthDisclaimer.important')}</strong> {t('content.sections.healthDisclaimer.description')}
          </p>
          <ul>
            <li>{t('content.sections.healthDisclaimer.items.0')}</li>
            <li>{t('content.sections.healthDisclaimer.items.1')}</li>
            <li>{t('content.sections.healthDisclaimer.items.2')}</li>
            <li>{t('content.sections.healthDisclaimer.items.3')}</li>
          </ul>

          <h2>{t('content.sections.limitationOfLiability.title')}</h2>
          <p>{t('content.sections.limitationOfLiability.description')}</p>

          <h2>{t('content.sections.contactInformation.title')}</h2>
          <p>{t('content.sections.contactInformation.description')}</p>
          <ul>
            <li>
              <strong>{t('content.sections.contactInformation.email').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactInformation.email').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.contactInformation.address').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactInformation.address').split(':').slice(1).join(':')}
            </li>
          </ul>
        </main>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = validLocales.map((locale) => ({
    params: { locale },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string

  if (!locale || !validLocales.includes(locale)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}

