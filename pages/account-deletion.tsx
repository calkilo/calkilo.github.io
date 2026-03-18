import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'
import { SITE_URL } from '../lib/seo'
import { translateStaticPageText } from '../lib/static-page-translations'
import { normalizeSiteLanguage, toLocalizedPath } from '../lib/site-language'

const ACCOUNT_DELETION_PAGE_TITLE = 'Request Account & Data Deletion | Calkilo'
const ACCOUNT_DELETION_PAGE_DESCRIPTION =
  'Use this page to request deletion of your Calkilo account and associated personal data.'
const ACCOUNT_DELETION_PAGE_KEYWORDS = [
  'calkilo account deletion',
  'delete calkilo account',
  'calkilo data deletion request',
  'privacy deletion request',
]

const REQUEST_EMAIL = 'privacy@calkilo.app'
const REQUEST_SUBJECT = 'Account Deletion Request'
const REQUEST_BODY = [
  'Please delete my Calkilo account and associated data.',
  '',
  'Account email:',
  'Optional account ID:',
  'Reason (optional):',
].join('\n')

interface AccountDeletionPageProps {
  lang?: string
}

export default function AccountDeletionPage({ lang }: AccountDeletionPageProps) {
  const language = normalizeSiteLanguage(lang)
  const localizedPath = toLocalizedPath('/account-deletion', language)
  const t = (text: string) => translateStaticPageText(language, text)
  const requestLink = `mailto:${REQUEST_EMAIL}?subject=${encodeURIComponent(t(REQUEST_SUBJECT))}&body=${encodeURIComponent(
    t(REQUEST_BODY),
  )}`
  const pageTitle = t(ACCOUNT_DELETION_PAGE_TITLE)
  const pageDescription = t(ACCOUNT_DELETION_PAGE_DESCRIPTION)
  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}${localizedPath}`,
      inLanguage: language,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('Home'),
          item: `${SITE_URL}${toLocalizedPath('/', language)}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('Account Deletion'),
          item: `${SITE_URL}${localizedPath}`,
        },
      ],
    },
  ] as const

  return (
    <StaticPageLayout
      title={pageTitle}
      description={pageDescription}
      path="/account-deletion"
      heading={t('Request Account & Data Deletion')}
      intro={t('Use this page to request permanent deletion of your Calkilo account and associated personal data.')}
      activeNav="deletion"
      lang={language}
      keywords={ACCOUNT_DELETION_PAGE_KEYWORDS}
      jsonLd={pageJsonLd}
    >
      <section className="lp-static-card">
        <h2>{t('Submit Your Request')}</h2>
        <p>{t('Send your request to our privacy team and we will process it after account ownership verification.')}</p>
        <a className="lp-contact-submit" href={requestLink}>
          {t('Email deletion request')}
        </a>
        <p className="lp-contact-note">{t('This opens your email app with a pre-filled message to privacy@calkilo.app.')}</p>
      </section>

      <section className="lp-static-card">
        <h2>{t('Information to Include')}</h2>
        <ul className="lp-policy-list">
          <li>{t('Account email address used in Calkilo.')}</li>
          <li>{t('Optional account ID if available.')}</li>
          <li>{t('Any context needed to identify the account if you use multiple emails.')}</li>
        </ul>
      </section>

      <section className="lp-static-card">
        <h2>{t('What Happens Next')}</h2>
        <ul className="lp-policy-list">
          <li>{t('We will confirm your identity before deletion to protect account security.')}</li>
          <li>{t('After verification, your account and associated personal data will be deleted.')}</li>
          <li>{t('Data we must retain for legal, fraud prevention, or compliance reasons may be kept as required by law.')}</li>
        </ul>
        <p>
          {t('For other privacy requests, visit')}{' '}
          <Link href={toLocalizedPath('/privacy-policy', language)}>{t('Privacy Policy')}</Link> {t('or')}{' '}
          <Link href={toLocalizedPath('/contact', language)}>{t('Contact')}</Link>.
        </p>
      </section>
    </StaticPageLayout>
  )
}
