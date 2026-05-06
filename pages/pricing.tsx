import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../lib/app-links'
import { GUIDE_LINKS } from '../lib/resource-pages'
import { SITE_URL } from '../lib/seo'
import { CORE_SITE_LINKS } from '../lib/site-pages'

const PRICING_PAGE_TITLE = 'Calkilo Pricing | Monthly and Yearly Plans'
const PRICING_PAGE_DESCRIPTION =
  'See Calkilo pricing for monthly and yearly premium access, including meal planning, AI support, and deeper nutrition insights.'
const PRICING_PAGE_KEYWORDS = [
  'calkilo pricing',
  'calkilo premium',
  'ai calorie tracker pricing',
  'macro tracker subscription',
]

const PRICING_CARDS = [
  {
    title: 'Monthly',
    subtitle: '$4.99',
    body: 'Best for flexible premium access when you want meal planning, AI support, and deeper tracking month to month.',
  },
  {
    title: 'Yearly',
    subtitle: '$14.99',
    body: 'Best value for users who already know they want premium nutrition support for the full year.',
  },
] as const

const PRICING_FAQS = [
  {
    question: 'What are the Calkilo pricing options?',
    answer:
      'Calkilo premium is available monthly for $4.99 or yearly for $14.99.',
  },
  {
    question: 'What premium value is emphasized most strongly?',
    answer:
      'Premium is framed around personalized meal plans, deeper analytics, AI coaching, and a broader nutrition workflow than basic logging alone.',
  },
  {
    question: 'Which plan is the best value?',
    answer:
      'The yearly plan is the best value for users who expect to keep using Calkilo premium throughout the year.',
  },
  {
    question: 'Why have a dedicated pricing page instead of only a homepage section?',
    answer:
      'A standalone pricing page gives search engines and users a direct destination for branded pricing intent, which is more sitelink-friendly than a fragment alone.',
  },
  {
    question: 'Where should users go if they still have billing questions?',
    answer:
      'The contact page is the best place for billing or account-specific questions that are not answered on the public pricing page.',
  },
] as const

export default function PricingPage() {
  const relatedPages = [
    ...CORE_SITE_LINKS.filter((link) => link.href !== '/pricing/'),
    GUIDE_LINKS[2],
  ]
  const offers = [
    { name: 'Monthly', price: '4.99' },
    { name: 'Yearly', price: '14.99' },
  ]
  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: PRICING_PAGE_TITLE,
      description: PRICING_PAGE_DESCRIPTION,
      url: `${SITE_URL}/pricing/`,
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Calkilo',
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Calkilo',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android',
      description: PRICING_PAGE_DESCRIPTION,
      url: `${SITE_URL}/pricing/`,
      sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
      offers: offers.map((offer) => ({
        '@type': 'Offer',
        name: offer.name,
        priceCurrency: 'USD',
        price: offer.price,
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing/`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Pricing',
          item: `${SITE_URL}/pricing/`,
        },
      ],
    },
  ] as const

  return (
    <StaticPageLayout
      title={PRICING_PAGE_TITLE}
      description={PRICING_PAGE_DESCRIPTION}
      path="/pricing/"
      heading="Calkilo pricing for monthly and yearly premium plans"
      intro="This page gives Google and users a direct branded destination for monthly and yearly pricing instead of relying on the homepage pricing section alone."
      activeNav="none"
      keywords={PRICING_PAGE_KEYWORDS}
      jsonLd={pageJsonLd}
    >
      <section className="lp-static-card">
        <h2>How to read the plans</h2>
        <p>
          The public pricing structure is simple: choose monthly premium access for flexibility, or yearly premium
          access for the best value.
        </p>
        <div className="lp-resource-actions">
          <a className="lp-btn lp-btn--solid" href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
            Google Play
          </a>
          <a className="lp-btn lp-resource-btn-secondary" href={APP_STORE_URL} target="_blank" rel="noreferrer">
            App Store
          </a>
        </div>
      </section>

      <section className="lp-resource-card-grid">
        {PRICING_CARDS.map((card) => (
          <article key={card.title} className="lp-static-card">
            <h2>{card.title}</h2>
            <p>{card.subtitle}</p>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section className="lp-static-card">
        <h2>When monthly makes sense</h2>
        <p>
          The monthly plan is the lighter commitment. It fits users who want premium meal planning, AI help, and deeper
          nutrition insights while keeping billing flexible.
        </p>
        <ul className="lp-policy-list">
          <li>$4.99 monthly premium access</li>
          <li>Useful for trying premium workflows before an annual commitment</li>
          <li>Includes the same premium feature set as the yearly plan</li>
        </ul>
      </section>

      <section className="lp-static-card">
        <h2>What premium unlocks</h2>
        <p>
          Premium is where Calkilo moves beyond simple logging into personalized guidance. That is the main commercial
          story the site needs to explain clearly for both search engines and users.
        </p>
        <ul className="lp-policy-list">
          <li>Personalized meal plans</li>
          <li>AI coaching and nutrition support</li>
          <li>Deeper analytics and progress visibility</li>
          <li>More complete planning around calorie and macro goals</li>
        </ul>
      </section>

      <section className="lp-static-card">
        <h2>How to choose between monthly and yearly</h2>
        <p>
          Monthly is best when flexibility matters most. Yearly is best when you already know you want consistent
          premium support for nutrition planning and progress tracking.
        </p>
        <p>
          The yearly plan is $14.99, making it the lower total cost for users who expect to keep Calkilo premium active
          beyond a few months.
        </p>
      </section>

      <section className="lp-static-card">
        <h2>Questions people ask</h2>
        <div className="lp-resource-faq-grid">
          {PRICING_FAQS.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lp-static-card">
        <h2>Related pages</h2>
        <div className="lp-resource-related-grid">
          {relatedPages.map((page) => (
            <article key={page.href} className="lp-resource-related-card">
              <h3>
                <Link href={page.href}>{page.label}</Link>
              </h3>
              <p>{page.description}</p>
            </article>
          ))}
        </div>
      </section>
    </StaticPageLayout>
  )
}
