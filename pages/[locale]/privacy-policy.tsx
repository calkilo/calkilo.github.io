import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from '../../hooks/useTranslation'

const validLocales = ['en', 'fa', 'zh', 'ru', 'it', 'fr', 'de', 'ar', 'es', 'nl']

export default function PrivacyPolicyLocale() {
  const router = useRouter()
  const { locale } = router.query
  const localeStr = typeof locale === 'string' ? locale : 'en'
  const { t, isLoading } = useTranslation('privacy-policy')
  
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
  const canonicalUrl = `https://calkilo.com${basePath}/privacy-policy`

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

          <h2>1. Introduction</h2>
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
              <strong>{t('content.sections.informationWeCollect.personalInfo.items.authenticationData').split(':')[0]}:</strong>{' '}
              {t('content.sections.informationWeCollect.personalInfo.items.authenticationData').split(':').slice(1).join(':')}
            </li>
          </ul>

          <h3>{t('content.sections.informationWeCollect.healthNutritionData.title')}</h3>
          <p>{t('content.sections.informationWeCollect.healthNutritionData.description')}</p>
          <ul>
            <li>{t('content.sections.informationWeCollect.healthNutritionData.items.foodEntries')}</li>
            <li>{t('content.sections.informationWeCollect.healthNutritionData.items.calorieData')}</li>
            <li>{t('content.sections.informationWeCollect.healthNutritionData.items.exerciseData')}</li>
            <li>{t('content.sections.informationWeCollect.healthNutritionData.items.weightTracking')}</li>
            <li>{t('content.sections.informationWeCollect.healthNutritionData.items.bodyMeasurements')}</li>
            <li>{t('content.sections.informationWeCollect.healthNutritionData.items.aiAnalysis')}</li>
          </ul>

          <h3>{t('content.sections.informationWeCollect.usageData.title')}</h3>
          <p>{t('content.sections.informationWeCollect.usageData.description')}</p>
          <ul>
            <li>{t('content.sections.informationWeCollect.usageData.items.appUsage')}</li>
            <li>{t('content.sections.informationWeCollect.usageData.items.featuresAccessed')}</li>
            <li>{t('content.sections.informationWeCollect.usageData.items.deviceInfo')}</li>
            <li>{t('content.sections.informationWeCollect.usageData.items.ipLocation')}</li>
            <li>{t('content.sections.informationWeCollect.usageData.items.cameraAccess')}</li>
          </ul>

          <h3>{t('content.sections.informationWeCollect.paymentInfo.title')}</h3>
          <p>{t('content.sections.informationWeCollect.paymentInfo.description')}</p>
          <ul>
            <li>{t('content.sections.informationWeCollect.paymentInfo.items.purchaseHistory')}</li>
            <li>{t('content.sections.informationWeCollect.paymentInfo.items.paymentMethod')}</li>
            <li>{t('content.sections.informationWeCollect.paymentInfo.items.transactions')}</li>
          </ul>

          <h3>{t('content.sections.informationWeCollect.socialFeaturesData.title')}</h3>
          <p>{t('content.sections.informationWeCollect.socialFeaturesData.description')}</p>
          <ul>
            <li>{t('content.sections.informationWeCollect.socialFeaturesData.items.inviteCodes')}</li>
            <li>{t('content.sections.informationWeCollect.socialFeaturesData.items.leaderboard')}</li>
            <li>{t('content.sections.informationWeCollect.socialFeaturesData.items.challenges')}</li>
            <li>{t('content.sections.informationWeCollect.socialFeaturesData.items.gamification')}</li>
          </ul>

          <h2>{t('content.sections.howWeUse.title')}</h2>
          <p>{t('content.sections.howWeUse.description')}</p>

          <h3>{t('content.sections.howWeUse.serviceProvision.title')}</h3>
          <ul>
            <li>{t('content.sections.howWeUse.serviceProvision.items.provideService')}</li>
            <li>{t('content.sections.howWeUse.serviceProvision.items.personalize')}</li>
            <li>{t('content.sections.howWeUse.serviceProvision.items.processScans')}</li>
            <li>{t('content.sections.howWeUse.serviceProvision.items.trackProgress')}</li>
            <li>{t('content.sections.howWeUse.serviceProvision.items.calculateGoals')}</li>
          </ul>

          <h3>{t('content.sections.howWeUse.communication.title')}</h3>
          <ul>
            <li>{t('content.sections.howWeUse.communication.items.notifications')}</li>
            <li>{t('content.sections.howWeUse.communication.items.customerSupport')}</li>
            <li>{t('content.sections.howWeUse.communication.items.serviceCommunications')}</li>
          </ul>

          <h3>{t('content.sections.howWeUse.analytics.title')}</h3>
          <ul>
            <li>{t('content.sections.howWeUse.analytics.items.analyzeUsage')}</li>
            <li>{t('content.sections.howWeUse.analytics.items.developFeatures')}</li>
            <li>{t('content.sections.howWeUse.analytics.items.research')}</li>
          </ul>

          <h3>{t('content.sections.howWeUse.legalCompliance.title')}</h3>
          <ul>
            <li>{t('content.sections.howWeUse.legalCompliance.items.complyLaws')}</li>
            <li>{t('content.sections.howWeUse.legalCompliance.items.enforceTerms')}</li>
            <li>{t('content.sections.howWeUse.legalCompliance.items.preventFraud')}</li>
          </ul>

          <h2>{t('content.sections.informationSharing.title')}</h2>
          <p>{t('content.sections.informationSharing.description')}</p>

          <h3>{t('content.sections.informationSharing.serviceProviders.title')}</h3>
          <p>{t('content.sections.informationSharing.serviceProviders.description')}</p>
          <ul>
            <li>{t('content.sections.informationSharing.serviceProviders.items.cloudStorage')}</li>
            <li>{t('content.sections.informationSharing.serviceProviders.items.analytics')}</li>
            <li>{t('content.sections.informationSharing.serviceProviders.items.paymentProcessors')}</li>
            <li>{t('content.sections.informationSharing.serviceProviders.items.authentication')}</li>
          </ul>

          <h3>{t('content.sections.informationSharing.legalRequirements.title')}</h3>
          <p>{t('content.sections.informationSharing.legalRequirements.description')}</p>

          <h3>{t('content.sections.informationSharing.businessTransfers.title')}</h3>
          <p>{t('content.sections.informationSharing.businessTransfers.description')}</p>

          <h3>{t('content.sections.informationSharing.withConsent.title')}</h3>
          <p>{t('content.sections.informationSharing.withConsent.description')}</p>

          <h2>{t('content.sections.dataSecurity.title')}</h2>
          <p>{t('content.sections.dataSecurity.description')}</p>
          <ul>
            <li>{t('content.sections.dataSecurity.items.encryption')}</li>
            <li>{t('content.sections.dataSecurity.items.authentication')}</li>
            <li>{t('content.sections.dataSecurity.items.securityAssessments')}</li>
            <li>{t('content.sections.dataSecurity.items.limitedAccess')}</li>
          </ul>
          <p><em>{t('content.sections.dataSecurity.disclaimer')}</em></p>

          <h2>{t('content.sections.yourRights.title')}</h2>
          <p>{t('content.sections.yourRights.description')}</p>

          <h3>{t('content.sections.yourRights.accessPortability.title')}</h3>
          <ul>
            <li>{t('content.sections.yourRights.accessPortability.items.requestAccess')}</li>
            <li>{t('content.sections.yourRights.accessPortability.items.requestCopy')}</li>
          </ul>

          <h3>{t('content.sections.yourRights.correctionDeletion.title')}</h3>
          <ul>
            <li>{t('content.sections.yourRights.correctionDeletion.items.updateInfo')}</li>
            <li>{t('content.sections.yourRights.correctionDeletion.items.requestDeletion')}</li>
            <li><em>{t('content.sections.yourRights.correctionDeletion.items.deletionNote')}</em></li>
          </ul>

          <h3>{t('content.sections.yourRights.optOut.title')}</h3>
          <ul>
            <li>{t('content.sections.yourRights.optOut.items.disableNotifications')}</li>
            <li>{t('content.sections.yourRights.optOut.items.adjustSettings')}</li>
            <li>{t('content.sections.yourRights.optOut.items.withdrawConsent')}</li>
          </ul>

          <h3>{t('content.sections.yourRights.dataRetention.title')}</h3>
          <p>{t('content.sections.yourRights.dataRetention.description')}</p>

          <h2>{t('content.sections.childrensPrivacy.title')}</h2>
          <p>{t('content.sections.childrensPrivacy.description')}</p>

          <h2>{t('content.sections.internationalTransfers.title')}</h2>
          <p>{t('content.sections.internationalTransfers.description')}</p>

          <h2>{t('content.sections.thirdPartyServices.title')}</h2>
          <p>{t('content.sections.thirdPartyServices.description')}</p>

          <h3>{t('content.sections.thirdPartyServices.authenticationProviders.title')}</h3>
          <p>{t('content.sections.thirdPartyServices.authenticationProviders.description')}</p>

          <h3>{t('content.sections.thirdPartyServices.paymentProcessors.title')}</h3>
          <p>{t('content.sections.thirdPartyServices.paymentProcessors.description')}</p>

          <h2>{t('content.sections.californiaPrivacyRights.title')}</h2>
          <p>{t('content.sections.californiaPrivacyRights.description')}</p>
          <ul>
            <li>{t('content.sections.californiaPrivacyRights.items.rightToKnow')}</li>
            <li>{t('content.sections.californiaPrivacyRights.items.rightToDelete')}</li>
            <li>{t('content.sections.californiaPrivacyRights.items.rightToOptOut')}</li>
            <li>{t('content.sections.californiaPrivacyRights.items.rightToNonDiscrimination')}</li>
          </ul>

          <h2>{t('content.sections.changesToPolicy.title')}</h2>
          <p>{t('content.sections.changesToPolicy.description')}</p>

          <h2>{t('content.sections.contactUs.title')}</h2>
          <p>{t('content.sections.contactUs.description')}</p>
          <ul>
            <li>
              <strong>{t('content.sections.contactUs.email').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactUs.email').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.contactUs.website').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactUs.website').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.contactUs.address').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactUs.address').split(':').slice(1).join(':')}
            </li>
          </ul>

          <h2>{t('content.sections.dataController.title')}</h2>
          <p>{t('content.sections.dataController.description')}</p>
          <ul>
            <li><strong>{t('content.sections.dataController.companyName')}</strong></li>
            <li>{t('content.sections.dataController.companyAddress')}</li>
            <li>{t('content.sections.dataController.contactInfo')}</li>
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

