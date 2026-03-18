import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'
import { SITE_URL } from '../lib/seo'
import { translateStaticPageText } from '../lib/static-page-translations'
import { normalizeSiteLanguage, toLocalizedPath } from '../lib/site-language'

const CONTACT_PAGE_TITLE = 'Contact Calkilo'
const CONTACT_PAGE_DESCRIPTION = 'Contact Calkilo support for product, billing, and privacy requests.'
const CONTACT_PAGE_KEYWORDS = [
  'calkilo contact',
  'nutrition app support',
  'ai calorie tracker support',
  'privacy request support',
]

interface ContactPageProps {
  lang?: string
}

export default function ContactPage({ lang }: ContactPageProps) {
  const language = normalizeSiteLanguage(lang)
  const localizedPath = toLocalizedPath('/contact', language)
  const t = (text: string) => translateStaticPageText(language, text)
  const pageTitle = t(CONTACT_PAGE_TITLE)
  const pageDescription = t(CONTACT_PAGE_DESCRIPTION)
  const supportChannels = [
    {
      title: 'Email Support',
      description: 'For account, billing, and technical questions.',
      actionLabel: 'support@calkilo.app',
      actionHref: 'mailto:support@calkilo.app',
    },
    {
      title: 'Privacy Requests',
      description: 'For data access, deletion, and policy-related inquiries.',
      actionLabel: 'privacy@calkilo.app',
      actionHref: 'mailto:privacy@calkilo.app',
    },
    {
      title: 'Account Deletion',
      description: 'Use the dedicated page to request account and associated data deletion.',
      actionLabel: 'Open account deletion page',
      actionHref: toLocalizedPath('/account-deletion', language),
    },
    {
      title: 'Response Window',
      description: 'We typically respond to support inquiries within one business day.',
      actionLabel: 'View Privacy Policy',
      actionHref: toLocalizedPath('/privacy-policy', language),
    },
  ] as const
  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: pageTitle,
      url: `${SITE_URL}${localizedPath}`,
      description: pageDescription,
      inLanguage: language,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Calkilo',
      url: SITE_URL,
      email: 'support@calkilo.app',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@calkilo.app',
          url: `${SITE_URL}${localizedPath}`,
          availableLanguage: [language],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'privacy inquiries',
          email: 'privacy@calkilo.app',
          url: `${SITE_URL}${toLocalizedPath('/privacy-policy', language)}`,
          availableLanguage: [language],
        },
      ],
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
          name: t('Contact'),
          item: `${SITE_URL}${localizedPath}`,
        },
      ],
    },
  ] as const

  return (
    <StaticPageLayout
      title={pageTitle}
      description={pageDescription}
      path="/contact"
      heading={t('Contact Us')}
      intro={t('Need help with Calkilo? Send us a message and our support team will get back to you as soon as possible.')}
      activeNav="contact"
      lang={language}
      keywords={CONTACT_PAGE_KEYWORDS}
      jsonLd={pageJsonLd}
    >
      <section className="lp-contact-grid">
        <article className="lp-static-card lp-contact-card">
          <h2>{t('Send a Message')}</h2>
          <p>{t('Share as much detail as possible so we can resolve your issue quickly. For urgent requests, email support@calkilo.app directly.')}</p>

          <form className="lp-contact-form" action="mailto:support@calkilo.app" method="post" encType="text/plain">
            <div className="lp-form-row">
              <label>
                {t('Full Name')}
                <input type="text" name="fullName" placeholder={t('Your full name')} required />
              </label>
              <label>
                {t('Email Address')}
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
            </div>

            <div className="lp-form-row">
              <label>
                {t('Topic')}
                <select name="topic" defaultValue="general">
                  <option value="general">{t('General question')}</option>
                  <option value="technical">{t('Technical issue')}</option>
                  <option value="billing">{t('Billing')}</option>
                  <option value="privacy">{t('Privacy request')}</option>
                </select>
              </label>
              <label>
                {t('Account ID (Optional)')}
                <input type="text" name="accountId" placeholder={t('Example: CK-10294')} />
              </label>
            </div>

            <label>
              {t('Message')}
              <textarea
                name="message"
                placeholder={t('Describe your request, issue steps, and expected result.')}
                rows={7}
                required
              />
            </label>

            <button className="lp-contact-submit" type="submit">
              {t('Send message')}
            </button>
            <p className="lp-contact-note">{t('Submitting this form opens your email app with pre-filled details for support@calkilo.app.')}</p>
          </form>
        </article>

        <aside className="lp-contact-aside">
          {supportChannels.map((channel) => (
            <article key={channel.title} className="lp-static-card lp-contact-method">
              <h3>{t(channel.title)}</h3>
              <p>{t(channel.description)}</p>
              {channel.actionHref.startsWith('mailto:') ? (
                <a href={channel.actionHref}>{channel.actionLabel}</a>
              ) : (
                <Link href={channel.actionHref}>{t(channel.actionLabel)}</Link>
              )}
            </article>
          ))}
        </aside>
      </section>

      <section className="lp-static-card lp-contact-faq">
        <h2>{t('Before You Send')}</h2>
        <ul className="lp-policy-list">
          <li>{t('Include screenshots for UI bugs or error messages when possible.')}</li>
          <li>{t('For billing requests, mention the subscription plan and purchase date.')}</li>
          <li>{t('For privacy requests, include the account email used in Calkilo.')}</li>
        </ul>
      </section>
    </StaticPageLayout>
  )
}
