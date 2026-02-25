import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'
import { SITE_URL } from '../lib/seo'

const CONTACT_PAGE_TITLE = 'Contact Calkilo'
const CONTACT_PAGE_DESCRIPTION = 'Contact Calkilo support for product, billing, and privacy requests.'
const CONTACT_PAGE_KEYWORDS = [
  'calkilo contact',
  'nutrition app support',
  'ai calorie tracker support',
  'privacy request support',
]

const CONTACT_PAGE_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: CONTACT_PAGE_TITLE,
    url: `${SITE_URL}/contact`,
    description: CONTACT_PAGE_DESCRIPTION,
    inLanguage: 'en',
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
        url: `${SITE_URL}/contact`,
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'privacy inquiries',
        email: 'privacy@calkilo.app',
        url: `${SITE_URL}/privacy-policy`,
        availableLanguage: ['English'],
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
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: `${SITE_URL}/contact`,
      },
    ],
  },
] as const

const SUPPORT_CHANNELS = [
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
    title: 'Response Window',
    description: 'We typically respond to support inquiries within one business day.',
    actionLabel: 'View Privacy Policy',
    actionHref: '/privacy-policy',
  },
] as const

export default function ContactPage() {
  return (
    <StaticPageLayout
      title={CONTACT_PAGE_TITLE}
      description={CONTACT_PAGE_DESCRIPTION}
      path="/contact"
      heading="Contact Us"
      intro="Need help with Calkilo? Send us a message and our support team will get back to you as soon as possible."
      activeNav="contact"
      keywords={CONTACT_PAGE_KEYWORDS}
      jsonLd={CONTACT_PAGE_JSON_LD}
    >
      <section className="lp-contact-grid">
        <article className="lp-static-card lp-contact-card">
          <h2>Send a Message</h2>
          <p>
            Share as much detail as possible so we can resolve your issue quickly. For urgent requests, email
            support@calkilo.app directly.
          </p>

          <form className="lp-contact-form" action="mailto:support@calkilo.app" method="post" encType="text/plain">
            <div className="lp-form-row">
              <label>
                Full Name
                <input type="text" name="fullName" placeholder="Your full name" required />
              </label>
              <label>
                Email Address
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
            </div>

            <div className="lp-form-row">
              <label>
                Topic
                <select name="topic" defaultValue="general">
                  <option value="general">General question</option>
                  <option value="technical">Technical issue</option>
                  <option value="billing">Billing</option>
                  <option value="privacy">Privacy request</option>
                </select>
              </label>
              <label>
                Account ID (Optional)
                <input type="text" name="accountId" placeholder="Example: CK-10294" />
              </label>
            </div>

            <label>
              Message
              <textarea
                name="message"
                placeholder="Describe your request, issue steps, and expected result."
                rows={7}
                required
              />
            </label>

            <button className="lp-contact-submit" type="submit">
              Send message
            </button>
            <p className="lp-contact-note">
              Submitting this form opens your email app with pre-filled details for support@calkilo.app.
            </p>
          </form>
        </article>

        <aside className="lp-contact-aside">
          {SUPPORT_CHANNELS.map((channel) => (
            <article key={channel.title} className="lp-static-card lp-contact-method">
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              {channel.actionHref.startsWith('mailto:') ? (
                <a href={channel.actionHref}>{channel.actionLabel}</a>
              ) : (
                <Link href={channel.actionHref}>{channel.actionLabel}</Link>
              )}
            </article>
          ))}
        </aside>
      </section>

      <section className="lp-static-card lp-contact-faq">
        <h2>Before You Send</h2>
        <ul className="lp-policy-list">
          <li>Include screenshots for UI bugs or error messages when possible.</li>
          <li>For billing requests, mention the subscription plan and purchase date.</li>
          <li>For privacy requests, include the account email used in Calkilo.</li>
        </ul>
      </section>
    </StaticPageLayout>
  )
}
