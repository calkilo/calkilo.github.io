import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../lib/app-links'
import { GUIDE_LINKS } from '../lib/resource-pages'
import { SITE_URL } from '../lib/seo'
import { CORE_SITE_LINKS } from '../lib/site-pages'

const PRICING_PAGE_TITLE = 'Calkilo Pricing | Free Start and Premium Plans'
const PRICING_PAGE_DESCRIPTION =
  'See Calkilo pricing, what the free experience includes, and what premium unlocks for meal planning, AI support, and deeper nutrition insights.'
const PRICING_PAGE_KEYWORDS = [
  'calkilo pricing',
  'calkilo premium',
  'ai calorie tracker pricing',
  'macro tracker subscription',
]

const PRICING_CARDS = [
  {
    title: 'Free start',
    subtitle: 'Start using the core experience without a card',
    body: 'Best for evaluating the app, trying food-photo logging, and seeing whether the product fits your daily routine.',
  },
  {
    title: 'Premium 1 Month',
    subtitle: '$7.99',
    body: 'A short commitment for people who want to test premium planning and AI support before going longer.',
  },
  {
    title: 'Premium 3 Months',
    subtitle: '$21.99',
    body: 'The main mid-range option for people who want enough time to build consistency and compare progress.',
  },
  {
    title: 'Premium 6 Months',
    subtitle: '$59.99',
    body: 'The longer plan for users who already know they want meal planning, deeper tracking, and a sustained routine.',
  },
] as const

const PRICING_FAQS = [
  {
    question: 'Can someone start using Calkilo without paying first?',
    answer:
      'Yes. The homepage messaging positions Calkilo as a free start, with premium plans unlocking more advanced features over time.',
  },
  {
    question: 'What premium value is emphasized most strongly?',
    answer:
      'Premium is framed around personalized meal plans, deeper analytics, AI coaching, and a broader nutrition workflow than basic logging alone.',
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
    { name: 'Premium 1 Month', price: '7.99' },
    { name: 'Premium 3 Months', price: '21.99' },
    { name: 'Premium 6 Months', price: '59.99' },
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
      heading="Calkilo pricing for free use and premium upgrades"
      intro="This page gives Google and users a direct branded destination for pricing intent instead of relying on the homepage pricing section alone."
      activeNav="none"
      keywords={PRICING_PAGE_KEYWORDS}
      jsonLd={pageJsonLd}
    >
      <section className="lp-static-card">
        <h2>How to read the plans</h2>
        <p>
          The public pricing structure is simple: start free, then upgrade when meal planning, AI help, and deeper
          tracking become part of your routine.
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
        <h2>What the free experience is for</h2>
        <p>
          Free access lowers the barrier to trying the product. That matters for branded search because many people
          want pricing confirmation before downloading, even when they are open to a later upgrade.
        </p>
        <ul className="lp-policy-list">
          <li>Try the core tracking flow without a credit card</li>
          <li>Evaluate whether photo-based logging fits daily use</li>
          <li>Decide later whether premium planning features are worth it</li>
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
        <h2>How to choose between the premium plans</h2>
        <p>
          The one-month plan is the least commitment. The three-month plan is the most balanced for habit-building.
          The six-month plan is better for users who already know they want a longer runway for consistent nutrition
          work.
        </p>
        <p>
          A dedicated pricing URL also gives Google a much clearer candidate for a brand-query sitelink than a single
          anchor inside the homepage.
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
