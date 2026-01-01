import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from '../hooks/useTranslation'

export default function TermsAndConditions() {
  const { t, isLoading } = useTranslation('terms-and-conditions')

  if (isLoading) {
    return (
      <Layout>
        <main className="legal-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div>Loading...</div>
        </main>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="canonical" href="https://calkilo.com/terms-and-conditions" />
      </Head>
      <Layout>
        <main className="legal-content">
          <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
            <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
              <li>
                <Link href="/" style={{ color: '#6366f1', textDecoration: 'none' }}>
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

          <Link href="/" className="back-link">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            {t('backToHome')}
          </Link>

          <h1>{t('breadcrumb.current')}</h1>
          <p className="last-updated">{t('lastUpdated')}</p>

          <p>{t('content.intro')}</p>

          <h2>{t('content.sections.agreementToTerms.title')}</h2>
          <p>{t('content.sections.agreementToTerms.description')}</p>

          <h2>{t('content.sections.useLicense.title')}</h2>
          <h3>{t('content.sections.useLicense.permissionToUse.title')}</h3>
          <p>{t('content.sections.useLicense.permissionToUse.description')}</p>
          <ul>
            <li>{t('content.sections.useLicense.permissionToUse.items.0')}</li>
            <li>{t('content.sections.useLicense.permissionToUse.items.1')}</li>
            <li>{t('content.sections.useLicense.permissionToUse.items.2')}</li>
          </ul>

          <h2>{t('content.sections.healthDisclaimer.title')}</h2>
          <p>
            <strong>{t('content.sections.healthDisclaimer.important')}</strong>
          </p>
          <p>{t('content.sections.healthDisclaimer.description')}</p>
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
