import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from '../hooks/useTranslation'

export default function PrivacyPolicy() {
  const { t, isLoading } = useTranslation('privacy-policy')

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
        <link rel="canonical" href="https://calkilo.com/privacy-policy" />
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

          <h2>{t('content.sections.informationWeCollect.title')}</h2>
          <h3>{t('content.sections.informationWeCollect.personalInfo.title')}</h3>
          <p>{t('content.sections.informationWeCollect.personalInfo.description')}</p>
          <ul>
            <li>
              <strong>{t('content.sections.informationWeCollect.personalInfo.items.accountInfo').split(':')[0]}:</strong>{' '}
              {t('content.sections.informationWeCollect.personalInfo.items.accountInfo').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.informationWeCollect.personalInfo.items.profileInfo').split(':')[0]}:</strong>{' '}
              {t('content.sections.informationWeCollect.personalInfo.items.profileInfo').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.informationWeCollect.personalInfo.items.healthData').split(':')[0]}:</strong>{' '}
              {t('content.sections.informationWeCollect.personalInfo.items.healthData').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.informationWeCollect.personalInfo.items.usageData').split(':')[0]}:</strong>{' '}
              {t('content.sections.informationWeCollect.personalInfo.items.usageData').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.informationWeCollect.personalInfo.items.deviceInfo').split(':')[0]}:</strong>{' '}
              {t('content.sections.informationWeCollect.personalInfo.items.deviceInfo').split(':').slice(1).join(':')}
            </li>
          </ul>

          <h2>{t('content.sections.howWeUse.title')}</h2>
          <p>{t('content.sections.howWeUse.description')}</p>
          <ul>
            <li>
              <strong>{t('content.sections.howWeUse.items.coreServices').split(':')[0]}:</strong>{' '}
              {t('content.sections.howWeUse.items.coreServices').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.howWeUse.items.personalization').split(':')[0]}:</strong>{' '}
              {t('content.sections.howWeUse.items.personalization').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.howWeUse.items.improvement').split(':')[0]}:</strong>{' '}
              {t('content.sections.howWeUse.items.improvement').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.howWeUse.items.communication').split(':')[0]}:</strong>{' '}
              {t('content.sections.howWeUse.items.communication').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.howWeUse.items.analytics').split(':')[0]}:</strong>{' '}
              {t('content.sections.howWeUse.items.analytics').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.howWeUse.items.legalCompliance').split(':')[0]}:</strong>{' '}
              {t('content.sections.howWeUse.items.legalCompliance').split(':').slice(1).join(':')}
            </li>
          </ul>

          <h2>{t('content.sections.dataSecurity.title')}</h2>
          <p>{t('content.sections.dataSecurity.description')}</p>
          <ul>
            <li>
              <strong>{t('content.sections.dataSecurity.items.encryption').split(':')[0]}:</strong>{' '}
              {t('content.sections.dataSecurity.items.encryption').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.dataSecurity.items.accessControls').split(':')[0]}:</strong>{' '}
              {t('content.sections.dataSecurity.items.accessControls').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.dataSecurity.items.regularAudits').split(':')[0]}:</strong>{' '}
              {t('content.sections.dataSecurity.items.regularAudits').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.dataSecurity.items.secureInfrastructure').split(':')[0]}:</strong>{' '}
              {t('content.sections.dataSecurity.items.secureInfrastructure').split(':').slice(1).join(':')}
            </li>
          </ul>

          <h2>{t('content.sections.yourRights.title')}</h2>
          <p>{t('content.sections.yourRights.description')}</p>
          <ul>
            <li>{t('content.sections.yourRights.items.0')}</li>
            <li>{t('content.sections.yourRights.items.1')}</li>
            <li>{t('content.sections.yourRights.items.2')}</li>
            <li>{t('content.sections.yourRights.items.3')}</li>
            <li>{t('content.sections.yourRights.items.4')}</li>
          </ul>

          <h2>{t('content.sections.contactUs.title')}</h2>
          <p>{t('content.sections.contactUs.description')}</p>
          <ul>
            <li>
              <strong>{t('content.sections.contactUs.email').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactUs.email').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.contactUs.address').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactUs.address').split(':').slice(1).join(':')}
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
