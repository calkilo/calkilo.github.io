import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'
import { SITE_URL } from '../lib/seo'

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
const REQUEST_LINK = `mailto:${REQUEST_EMAIL}?subject=${encodeURIComponent(REQUEST_SUBJECT)}&body=${encodeURIComponent(REQUEST_BODY)}`

const ACCOUNT_DELETION_PAGE_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: ACCOUNT_DELETION_PAGE_TITLE,
    description: ACCOUNT_DELETION_PAGE_DESCRIPTION,
    url: `${SITE_URL}/account-deletion`,
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Account Deletion',
        item: `${SITE_URL}/account-deletion`,
      },
    ],
  },
] as const

export default function AccountDeletionPage() {
  return (
    <StaticPageLayout
      title={ACCOUNT_DELETION_PAGE_TITLE}
      description={ACCOUNT_DELETION_PAGE_DESCRIPTION}
      path="/account-deletion"
      heading="Request Account & Data Deletion"
      intro="Use this page to request permanent deletion of your Calkilo account and associated personal data."
      activeNav="deletion"
      keywords={ACCOUNT_DELETION_PAGE_KEYWORDS}
      jsonLd={ACCOUNT_DELETION_PAGE_JSON_LD}
    >
      <section className="lp-static-card">
        <h2>Submit Your Request</h2>
        <p>
          Send your request to our privacy team and we will process it after account ownership verification.
        </p>
        <a className="lp-contact-submit" href={REQUEST_LINK}>
          Email deletion request
        </a>
        <p className="lp-contact-note">
          This opens your email app with a pre-filled message to {REQUEST_EMAIL}.
        </p>
      </section>

      <section className="lp-static-card">
        <h2>Information to Include</h2>
        <ul className="lp-policy-list">
          <li>Account email address used in Calkilo.</li>
          <li>Optional account ID if available.</li>
          <li>Any context needed to identify the account if you use multiple emails.</li>
        </ul>
      </section>

      <section className="lp-static-card">
        <h2>What Happens Next</h2>
        <ul className="lp-policy-list">
          <li>We will confirm your identity before deletion to protect account security.</li>
          <li>After verification, your account and associated personal data will be deleted.</li>
          <li>Data we must retain for legal, fraud prevention, or compliance reasons may be kept as required by law.</li>
        </ul>
        <p>
          For other privacy requests, visit <Link href="/privacy-policy">Privacy Policy</Link> or{' '}
          <Link href="/contact">Contact</Link>.
        </p>
      </section>
    </StaticPageLayout>
  )
}
