import StaticPageLayout from '../components/StaticPageLayout'
import { SITE_URL } from '../lib/seo'
import { translateStaticPageText } from '../lib/static-page-translations'
import { normalizeSiteLanguage, toLocalizedPath } from '../lib/site-language'

interface PolicySection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

const PRIVACY_PAGE_TITLE = 'Calkilo Privacy Policy'
const PRIVACY_PAGE_DESCRIPTION = "Read Calkilo's privacy policy and learn how we collect, use, and protect your data."
const EFFECTIVE_DATE = 'February 25, 2026'
const EFFECTIVE_DATE_ISO = '2026-02-25'
const PRIVACY_PAGE_KEYWORDS = ['calkilo privacy policy', 'nutrition app privacy', 'ai calorie app data policy']

const POLICY_SECTIONS: PolicySection[] = [
  {
    title: '1. Information We Collect',
    paragraphs: [
      'We collect information you provide directly to us, including account details such as your name, email address, and profile settings.',
      'When you use nutrition tracking features, we may process food photos, meal logs, body metrics, and activity information to provide calorie analysis and personalized recommendations.',
    ],
    bullets: [
      'Account information: name, email, login credentials, language preference',
      'Nutrition data: meal photos, food entries, calorie and macro logs',
      'Technical data: device type, browser details, IP address, app usage analytics',
      'Support data: messages and attachments sent through contact or support channels',
    ],
  },
  {
    title: '2. How We Use Your Information',
    paragraphs: [
      'We use your information to operate the Calkilo platform, deliver features, improve model accuracy, and provide customer support.',
      'We also use aggregated and de-identified data to analyze feature performance and improve the overall product experience.',
    ],
    bullets: [
      'Deliver AI-powered calorie and nutrition insights',
      'Personalize meal planning and in-app recommendations',
      'Respond to support requests and maintain service reliability',
      'Detect abuse, secure accounts, and prevent fraud',
    ],
  },
  {
    title: '3. Sharing and Disclosure',
    paragraphs: [
      'We do not sell your personal information. We only share data with trusted service providers that help us operate the platform, such as hosting, analytics, payment, and support tools.',
      'We may disclose information when required by law, to enforce our terms, or to protect the rights, safety, and security of Calkilo and its users.',
    ],
  },
  {
    title: '4. Data Retention',
    paragraphs: [
      'We retain personal information for as long as your account is active or as needed to provide services, resolve disputes, and comply with legal obligations.',
      'You can request deletion of your account and associated data on our account deletion page at /account-deletion or by emailing privacy@calkilo.app.',
    ],
  },
  {
    title: '5. Your Privacy Rights',
    paragraphs: [
      'Depending on your location, you may have rights to access, correct, delete, or export your personal data, and to object to certain processing activities.',
      'To submit a privacy request, email support@calkilo.app with the subject line "Privacy Request". We will verify your identity before processing your request.',
    ],
  },
  {
    title: "6. Children's Privacy",
    paragraphs: [
      'Calkilo is not directed to children under 13, and we do not knowingly collect personal information from children under 13 without appropriate consent.',
      'If you believe a child has provided personal information to us, contact support@calkilo.app so we can take appropriate action.',
    ],
  },
  {
    title: '7. Policy Updates',
    paragraphs: [
      'We may update this Privacy Policy periodically to reflect product, legal, or operational changes. When we make material updates, we will revise the effective date and provide notice where required.',
      `The current version of this policy became effective on ${EFFECTIVE_DATE}.`,
    ],
  },
]

interface PrivacyPolicyPageProps {
  lang?: string
}

export default function PrivacyPolicyPage({ lang }: PrivacyPolicyPageProps) {
  const language = normalizeSiteLanguage(lang)
  const localizedPath = toLocalizedPath('/privacy-policy', language)
  const t = (text: string) => translateStaticPageText(language, text)
  const pageTitle = t(PRIVACY_PAGE_TITLE)
  const pageDescription = t(PRIVACY_PAGE_DESCRIPTION)
  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'PrivacyPolicy',
      name: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}${localizedPath}`,
      inLanguage: language,
      datePublished: EFFECTIVE_DATE_ISO,
      dateModified: EFFECTIVE_DATE_ISO,
      publisher: {
        '@type': 'Organization',
        name: 'Calkilo',
        url: SITE_URL,
      },
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
          name: t('Privacy Policy'),
          item: `${SITE_URL}${localizedPath}`,
        },
      ],
    },
  ] as const

  return (
    <StaticPageLayout
      title={pageTitle}
      description={pageDescription}
      path="/privacy-policy"
      heading={t('Privacy Policy')}
      intro={t(
        'Your privacy matters to us. This page explains what data we collect, why we collect it, and how you can control your information.',
      )}
      activeNav="privacy"
      lang={language}
      keywords={PRIVACY_PAGE_KEYWORDS}
      ogType="article"
      jsonLd={pageJsonLd}
    >
      <article className="lp-static-card">
        <h2>{t('Summary')}</h2>
        <p>{t(
          'Calkilo uses account, nutrition, and technical data to provide AI-powered calorie tracking and improve the product. We do not sell personal data, and you can request access or deletion of your information at any time.',
        )}</p>
        <p className="lp-policy-date">
          <strong>{t('Effective date:')}</strong> {t(EFFECTIVE_DATE)}
        </p>
      </article>

      {POLICY_SECTIONS.map((section) => (
        <section key={section.title} className="lp-static-card">
          <h2>{t(section.title)}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{t(paragraph)}</p>
          ))}
          {section.bullets ? (
            <ul className="lp-policy-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{t(bullet)}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </StaticPageLayout>
  )
}
