import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const validLocales = ['en', 'fa', 'zh', 'ru', 'it', 'fr', 'de', 'ar', 'es', 'nl']

export default function TermsAndConditionsLocale() {
  const router = useRouter()
  const { locale } = router.query
  const localeStr = typeof locale === 'string' ? locale : 'en'
  const { t, isLoading, translationData } = useTranslation('terms-and-conditions')
  const [, forceUpdate] = useState(0)
  
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
  
  // Force re-render when translations load
  useEffect(() => {
    if (translationData) {
      forceUpdate(prev => prev + 1)
    }
  }, [translationData])

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
  const canonicalUrl = `https://calkilo.com${basePath}/terms-and-conditions`

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

          <p style={{ whiteSpace: 'pre-line' }}>{t('content.intro')}</p>

          <h2>{t('content.sections.agreementToTerms.title')}</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{t('content.sections.agreementToTerms.description')}</p>

          <h2>{t('content.sections.eligibility.title')}</h2>
          <h3>{t('content.sections.eligibility.ageRequirement.title')}</h3>
          <p>{t('content.sections.eligibility.ageRequirement.description')}</p>
          
          <h3>{t('content.sections.eligibility.accountRegistration.title')}</h3>
          <p>{t('content.sections.eligibility.accountRegistration.description')}</p>
          <ul>
            <li>{t('content.sections.eligibility.accountRegistration.items.0')}</li>
            <li>{t('content.sections.eligibility.accountRegistration.items.1')}</li>
            <li>{t('content.sections.eligibility.accountRegistration.items.2')}</li>
            <li>{t('content.sections.eligibility.accountRegistration.items.3')}</li>
            <li>{t('content.sections.eligibility.accountRegistration.items.4')}</li>
          </ul>

          <h2>{t('content.sections.descriptionOfService.title')}</h2>
          <p>{t('content.sections.descriptionOfService.description')}</p>
          <ul>
            <li>{t('content.sections.descriptionOfService.items.0')}</li>
            <li>{t('content.sections.descriptionOfService.items.1')}</li>
            <li>{t('content.sections.descriptionOfService.items.2')}</li>
            <li>{t('content.sections.descriptionOfService.items.3')}</li>
            <li>{t('content.sections.descriptionOfService.items.4')}</li>
            <li>{t('content.sections.descriptionOfService.items.5')}</li>
          </ul>

          <h2>{t('content.sections.userResponsibilities.title')}</h2>
          <h3>{t('content.sections.userResponsibilities.acceptableUse.title')}</h3>
          <p>{t('content.sections.userResponsibilities.acceptableUse.description')}</p>
          <ul>
            <li>{t('content.sections.userResponsibilities.acceptableUse.items.0')}</li>
            <li>{t('content.sections.userResponsibilities.acceptableUse.items.1')}</li>
            <li>{t('content.sections.userResponsibilities.acceptableUse.items.2')}</li>
            <li>{t('content.sections.userResponsibilities.acceptableUse.items.3')}</li>
            <li>{t('content.sections.userResponsibilities.acceptableUse.items.4')}</li>
            <li>{t('content.sections.userResponsibilities.acceptableUse.items.5')}</li>
            <li>{t('content.sections.userResponsibilities.acceptableUse.items.6')}</li>
          </ul>

          <h3>{t('content.sections.userResponsibilities.healthInformationDisclaimer.title')}</h3>
          <p>{t('content.sections.userResponsibilities.healthInformationDisclaimer.description')}</p>
          <p>{t('content.sections.userResponsibilities.healthInformationDisclaimer.notIntended.0')}</p>
          <p>{t('content.sections.userResponsibilities.healthInformationDisclaimer.notIntended.1')}</p>
          <p>{t('content.sections.userResponsibilities.healthInformationDisclaimer.notIntended.2')}</p>
          <p>{t('content.sections.userResponsibilities.healthInformationDisclaimer.acknowledgment')}</p>
          <ul>
            <li>{t('content.sections.userResponsibilities.healthInformationDisclaimer.acknowledgmentItems.0')}</li>
            <li>{t('content.sections.userResponsibilities.healthInformationDisclaimer.acknowledgmentItems.1')}</li>
            <li>{t('content.sections.userResponsibilities.healthInformationDisclaimer.acknowledgmentItems.2')}</li>
            <li>{t('content.sections.userResponsibilities.healthInformationDisclaimer.acknowledgmentItems.3')}</li>
          </ul>

          <h3>{t('content.sections.userResponsibilities.contentYouProvide.title')}</h3>
          <p>{t('content.sections.userResponsibilities.contentYouProvide.description')}</p>
          <p>{t('content.sections.userResponsibilities.contentYouProvide.represent')}</p>
          <ul>
            <li>{t('content.sections.userResponsibilities.contentYouProvide.representItems.0')}</li>
            <li>{t('content.sections.userResponsibilities.contentYouProvide.representItems.1')}</li>
            <li>{t('content.sections.userResponsibilities.contentYouProvide.representItems.2')}</li>
          </ul>

          <h2>{t('content.sections.premiumFeatures.title')}</h2>
          <h3>{t('content.sections.premiumFeatures.subscriptionPlans.title')}</h3>
          <p>{t('content.sections.premiumFeatures.subscriptionPlans.description')}</p>

          <h3>{t('content.sections.premiumFeatures.paymentTerms.title')}</h3>
          <ul>
            <li>{t('content.sections.premiumFeatures.paymentTerms.items.0')}</li>
            <li>{t('content.sections.premiumFeatures.paymentTerms.items.1')}</li>
            <li>{t('content.sections.premiumFeatures.paymentTerms.items.2')}</li>
            <li>{t('content.sections.premiumFeatures.paymentTerms.items.3')}</li>
          </ul>

          <h3>{t('content.sections.premiumFeatures.cancellationAndRefunds.title')}</h3>
          <ul>
            <li>{t('content.sections.premiumFeatures.cancellationAndRefunds.items.0')}</li>
            <li>{t('content.sections.premiumFeatures.cancellationAndRefunds.items.1')}</li>
            <li>{t('content.sections.premiumFeatures.cancellationAndRefunds.items.2')}</li>
            <li>{t('content.sections.premiumFeatures.cancellationAndRefunds.items.3')}</li>
          </ul>

          <h3>{t('content.sections.premiumFeatures.priceChanges.title')}</h3>
          <p>{t('content.sections.premiumFeatures.priceChanges.description')}</p>

          <h2>{t('content.sections.intellectualProperty.title')}</h2>
          <h3>{t('content.sections.intellectualProperty.ourRights.title')}</h3>
          <p>{t('content.sections.intellectualProperty.ourRights.description')}</p>

          <h3>{t('content.sections.intellectualProperty.limitedLicense.title')}</h3>
          <p>{t('content.sections.intellectualProperty.limitedLicense.description')}</p>

          <h3>{t('content.sections.intellectualProperty.restrictions.title')}</h3>
          <p>{t('content.sections.intellectualProperty.restrictions.description')}</p>
          <ul>
            <li>{t('content.sections.intellectualProperty.restrictions.items.0')}</li>
            <li>{t('content.sections.intellectualProperty.restrictions.items.1')}</li>
            <li>{t('content.sections.intellectualProperty.restrictions.items.2')}</li>
            <li>{t('content.sections.intellectualProperty.restrictions.items.3')}</li>
          </ul>

          <h2>{t('content.sections.privacy.title')}</h2>
          <p>{t('content.sections.privacy.description')}</p>

          <h2>{t('content.sections.disclaimers.title')}</h2>
          <h3>{t('content.sections.disclaimers.serviceAvailability.title')}</h3>
          <p>{t('content.sections.disclaimers.serviceAvailability.description')}</p>
          <ul>
            <li>{t('content.sections.disclaimers.serviceAvailability.items.0')}</li>
            <li>{t('content.sections.disclaimers.serviceAvailability.items.1')}</li>
            <li>{t('content.sections.disclaimers.serviceAvailability.items.2')}</li>
          </ul>

          <h3>{t('content.sections.disclaimers.accuracyOfInformation.title')}</h3>
          <p>{t('content.sections.disclaimers.accuracyOfInformation.description')}</p>

          <h3>{t('content.sections.disclaimers.thirdPartyContent.title')}</h3>
          <p>{t('content.sections.disclaimers.thirdPartyContent.description')}</p>

          <h2>{t('content.sections.limitationOfLiability.title')}</h2>
          <p>{t('content.sections.limitationOfLiability.description')}</p>
          <ul>
            <li>{t('content.sections.limitationOfLiability.items.0')}</li>
            <li>{t('content.sections.limitationOfLiability.items.1')}</li>
            <li>{t('content.sections.limitationOfLiability.items.2')}</li>
          </ul>

          <h2>{t('content.sections.indemnification.title')}</h2>
          <p>{t('content.sections.indemnification.description')}</p>
          <ul>
            <li>{t('content.sections.indemnification.items.0')}</li>
            <li>{t('content.sections.indemnification.items.1')}</li>
            <li>{t('content.sections.indemnification.items.2')}</li>
            <li>{t('content.sections.indemnification.items.3')}</li>
          </ul>

          <h2>{t('content.sections.accountTermination.title')}</h2>
          <h3>{t('content.sections.accountTermination.terminationByYou.title')}</h3>
          <p>{t('content.sections.accountTermination.terminationByYou.description')}</p>

          <h3>{t('content.sections.accountTermination.terminationByUs.title')}</h3>
          <p>{t('content.sections.accountTermination.terminationByUs.description')}</p>
          <ul>
            <li>{t('content.sections.accountTermination.terminationByUs.items.0')}</li>
            <li>{t('content.sections.accountTermination.terminationByUs.items.1')}</li>
            <li>{t('content.sections.accountTermination.terminationByUs.items.2')}</li>
            <li>{t('content.sections.accountTermination.terminationByUs.items.3')}</li>
          </ul>

          <h3>{t('content.sections.accountTermination.effectOfTermination.title')}</h3>
          <p>{t('content.sections.accountTermination.effectOfTermination.description')}</p>
          <ul>
            <li>{t('content.sections.accountTermination.effectOfTermination.items.0')}</li>
            <li>{t('content.sections.accountTermination.effectOfTermination.items.1')}</li>
            <li>{t('content.sections.accountTermination.effectOfTermination.items.2')}</li>
          </ul>

          <h2>{t('content.sections.disputeResolution.title')}</h2>
          <h3>{t('content.sections.disputeResolution.governingLaw.title')}</h3>
          <p>{t('content.sections.disputeResolution.governingLaw.description')}</p>

          <h3>{t('content.sections.disputeResolution.disputeResolutionProcess.title')}</h3>
          <p>{t('content.sections.disputeResolution.disputeResolutionProcess.description')}</p>
          <ul>
            <li>{t('content.sections.disputeResolution.disputeResolutionProcess.items.0')}</li>
            <li>{t('content.sections.disputeResolution.disputeResolutionProcess.items.1')}</li>
            <li>{t('content.sections.disputeResolution.disputeResolutionProcess.items.2')}</li>
          </ul>

          <h2>{t('content.sections.changesToTerms.title')}</h2>
          <p>{t('content.sections.changesToTerms.description')}</p>
          <ul>
            <li>{t('content.sections.changesToTerms.items.0')}</li>
            <li>{t('content.sections.changesToTerms.items.1')}</li>
            <li>{t('content.sections.changesToTerms.items.2')}</li>
          </ul>
          <p>{t('content.sections.changesToTerms.continuedUse')}</p>

          <h2>{t('content.sections.severability.title')}</h2>
          <p>{t('content.sections.severability.description')}</p>

          <h2>{t('content.sections.entireAgreement.title')}</h2>
          <p>{t('content.sections.entireAgreement.description')}</p>

          <h2>{t('content.sections.waiver.title')}</h2>
          <p>{t('content.sections.waiver.description')}</p>

          <h2>{t('content.sections.contactInformation.title')}</h2>
          <p>{t('content.sections.contactInformation.description')}</p>
          <ul>
            <li>
              <strong>{t('content.sections.contactInformation.email').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactInformation.email').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.contactInformation.website').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactInformation.website').split(':').slice(1).join(':')}
            </li>
            <li>
              <strong>{t('content.sections.contactInformation.address').split(':')[0]}:</strong>{' '}
              {t('content.sections.contactInformation.address').split(':').slice(1).join(':')}
            </li>
          </ul>

          <h2>{t('content.sections.acknowledgment.title')}</h2>
          <p>{t('content.sections.acknowledgment.description')}</p>
          <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>{t('content.sections.acknowledgment.footer')}</p>
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

