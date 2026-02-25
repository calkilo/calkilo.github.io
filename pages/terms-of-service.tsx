import StaticPageLayout from '../components/StaticPageLayout'
import { SITE_URL } from '../lib/seo'

interface TermsSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

const EFFECTIVE_DATE = 'February 25, 2026'
const EFFECTIVE_DATE_ISO = '2026-02-25'
const TERMS_PAGE_TITLE = 'Calkilo Terms of Service'
const TERMS_PAGE_DESCRIPTION =
  'Read Calkilo terms of service for account usage, subscriptions, and legal conditions.'
const TERMS_PAGE_KEYWORDS = [
  'calkilo terms of service',
  'calkilo terms',
  'nutrition app legal terms',
  'ai calorie tracker terms',
]

const TERMS_PAGE_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TERMS_PAGE_TITLE,
    description: TERMS_PAGE_DESCRIPTION,
    url: `${SITE_URL}/terms-of-service`,
    inLanguage: 'en',
    datePublished: EFFECTIVE_DATE_ISO,
    dateModified: EFFECTIVE_DATE_ISO,
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
        name: 'Terms of Service',
        item: `${SITE_URL}/terms-of-service`,
      },
    ],
  },
] as const

const TERMS_SECTIONS: TermsSection[] = [
  {
    title: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or using Calkilo, you agree to these Terms of Service and our Privacy Policy.',
      'If you do not agree to these terms, do not use the service.',
    ],
  },
  {
    title: '2. Eligibility and Accounts',
    paragraphs: [
      'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.',
      'You must provide accurate account information and promptly update it when your details change.',
    ],
    bullets: [
      'You must be at least 13 years old to use Calkilo.',
      'You may not impersonate another person or entity.',
      'You may not share account access in a way that violates these terms.',
    ],
  },
  {
    title: '3. Service Description',
    paragraphs: [
      'Calkilo provides nutrition tracking, AI-powered food analysis, and related wellness features.',
      'Features may change over time, and some capabilities may require a paid subscription.',
    ],
  },
  {
    title: '4. Subscriptions and Billing',
    paragraphs: [
      'Paid plans are billed according to the plan selected at checkout. Unless canceled, subscriptions may auto-renew based on the applicable billing cycle.',
      'You are responsible for all applicable taxes, fees, and payment method updates needed to keep your subscription active.',
    ],
  },
  {
    title: '5. Acceptable Use',
    paragraphs: [
      'You agree to use Calkilo only for lawful purposes and in compliance with all applicable laws.',
      'You may not misuse the platform, interfere with service operations, or attempt unauthorized access to systems or data.',
    ],
    bullets: [
      'No reverse engineering or attempts to extract source code where prohibited by law.',
      'No uploading malicious code, spam, or abusive content.',
      'No use of the service to violate intellectual property or privacy rights.',
    ],
  },
  {
    title: '6. Intellectual Property',
    paragraphs: [
      'All content, trademarks, and software in Calkilo are owned by Calkilo or its licensors and are protected by intellectual property laws.',
      'You receive a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes.',
    ],
  },
  {
    title: '7. Health and Accuracy Disclaimer',
    paragraphs: [
      'Calkilo provides informational and educational content only and is not a medical service. It does not replace professional medical advice, diagnosis, or treatment.',
      'Nutritional estimates and AI outputs may vary and should be used as guidance, not guaranteed measurements.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, Calkilo is not liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.',
      'Our total liability for any claim related to the service is limited to the amount you paid to Calkilo in the 12 months before the event giving rise to the claim.',
    ],
  },
  {
    title: '9. Termination',
    paragraphs: [
      'You may stop using the service at any time. We may suspend or terminate access if you violate these terms or if required for security, legal, or operational reasons.',
      'Upon termination, rights granted to you under these terms will end, while provisions that should survive termination will remain in effect.',
    ],
  },
  {
    title: '10. Changes to Terms',
    paragraphs: [
      'We may revise these Terms of Service from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.',
      `These terms are effective as of ${EFFECTIVE_DATE}.`,
    ],
  },
  {
    title: '11. Contact Information',
    paragraphs: [
      'If you have questions about these Terms of Service, contact us at support@calkilo.app.',
      'For privacy-related matters, contact privacy@calkilo.app.',
    ],
  },
] as const

export default function TermsOfServicePage() {
  return (
    <StaticPageLayout
      title={TERMS_PAGE_TITLE}
      description={TERMS_PAGE_DESCRIPTION}
      path="/terms-of-service"
      heading="Terms of Service"
      intro="These terms explain the rules, rights, and responsibilities that apply when you use Calkilo."
      activeNav="terms"
      keywords={TERMS_PAGE_KEYWORDS}
      ogType="article"
      jsonLd={TERMS_PAGE_JSON_LD}
    >
      <article className="lp-static-card">
        <h2>Summary</h2>
        <p>
          By using Calkilo, you agree to use the service lawfully, maintain accurate account information, and follow
          subscription and acceptable-use rules. Calkilo content is provided for informational purposes and not as
          medical advice.
        </p>
        <p className="lp-policy-date">
          <strong>Effective date:</strong> {EFFECTIVE_DATE}
        </p>
      </article>

      {TERMS_SECTIONS.map((section) => (
        <section key={section.title} className="lp-static-card">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.bullets ? (
            <ul className="lp-policy-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </StaticPageLayout>
  )
}
