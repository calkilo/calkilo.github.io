import FoodPageAnalyzerScreen from '../components/FoodPageAnalyzerScreen'
import { SITE_URL } from '../lib/seo'

const PAGE_PATH = '/uber-eats-nutrition-calculator/'

const PAGE_TITLE = 'Uber Eats Nutrition Facts Calculator | Calkilo'
const PAGE_DESCRIPTION =
  'Paste an Uber Eats share link or menu item URL to estimate calories, macros, nutrition facts, restaurant details, price, and item options.'

const KEYWORDS = [
  'uber eats nutrition facts',
  'uber eats calorie calculator',
  'uber eats calories',
  'uber eats nutrition calculator',
  'restaurant nutrition facts',
]

const FAQ_ITEMS = [
  {
    question: 'Can this page analyze an Uber Eats share link?',
    answer:
      'Yes. Paste an Uber Eats share link or item URL and the analyzer sends it to Calkilo for menu item extraction and nutrition estimation.',
  },
  {
    question: 'What Uber Eats fields can be shown?',
    answer:
      'When available, the result can include the menu item title, restaurant name, price, item UUID, food image, visible options or customizations, calories, macros, and nutrition facts.',
  },
  {
    question: 'Are the nutrition facts official Uber Eats data?',
    answer:
      'No. The analyzer estimates nutrition from the menu item data and visible page details returned by the extraction service.',
  },
] as const

function isUberEatsHost(hostname: string) {
  const normalizedHost = hostname.toLowerCase().replace(/^www\./u, '')

  return (
    normalizedHost === 'ubereats.com' ||
    normalizedHost.endsWith('.ubereats.com') ||
    normalizedHost === 'eats.uber.com' ||
    normalizedHost.endsWith('.eats.uber.com') ||
    normalizedHost === 'ubereats.app.link' ||
    normalizedHost.endsWith('.ubereats.app.link')
  )
}

function validateUberEatsUrl(rawUrl: string) {
  const trimmedUrl = rawUrl.trim()

  if (!trimmedUrl) {
    return 'Enter an Uber Eats share link or menu item URL.'
  }

  if (!/^https?:\/\//i.test(trimmedUrl)) {
    return 'Enter a URL that starts with http:// or https://.'
  }

  try {
    const parsedUrl = new URL(trimmedUrl)

    if (!isUberEatsHost(parsedUrl.hostname)) {
      return 'Paste a valid Uber Eats link from ubereats.com, eats.uber.com, or ubereats.app.link.'
    }
  } catch {
    return 'Enter a valid Uber Eats URL.'
  }

  return undefined
}

export default function UberEatsNutritionCalculatorPage() {
  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: PAGE_TITLE,
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      url: `${SITE_URL}${PAGE_PATH}`,
      description: PAGE_DESCRIPTION,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
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
          name: 'Uber Eats Nutrition Calculator',
          item: `${SITE_URL}${PAGE_PATH}`,
        },
      ],
    },
  ] as const

  return (
    <FoodPageAnalyzerScreen
      path={PAGE_PATH}
      seoTitle={PAGE_TITLE}
      seoDescription={PAGE_DESCRIPTION}
      keywords={KEYWORDS}
      jsonLd={pageJsonLd}
      kicker="Uber Eats nutrition"
      heading="Uber Eats nutrition facts from a share link"
      intro="Paste an Uber Eats menu item or share link to estimate nutrition from the extracted item title, restaurant, image, price, and options."
      inputLabel="Uber Eats link"
      placeholder="https://www.ubereats.com/store/example/item/example"
      emptyTitle="Paste an Uber Eats link"
      emptyDescription="The result will show the menu item name, restaurant, food image, calories, health score, macros, nutrition facts, visible options, and coin usage when returned by the API."
      validateUrl={validateUberEatsUrl}
      requireAuth={false}
      saveMealWhenAnonymous={false}
      footerDescription="Estimate calories, macros, and nutrition facts from Uber Eats menu item links."
    >
      <section className="lp-static-card">
        <h2>Uber Eats nutrition facts from menu item data</h2>
        <p>
          This page is built for Uber Eats item links. When the backend detects an Uber Eats store item, it extracts
          the real menu item title, restaurant name, price, food image, item UUID, and visible customizations before
          generating the nutrition estimate.
        </p>
        <ul className="lp-policy-list">
          <li>Supports Uber Eats item URLs and common Uber Eats share-link hosts.</li>
          <li>Shows calories, health score, protein, carbs, fat, and nutrition facts when returned.</li>
          <li>Displays source fields such as restaurant name, price, item UUID, and visible options.</li>
        </ul>
      </section>

      <section className="lp-resource-card-grid">
        <article className="lp-static-card">
          <h2>Menu item extraction</h2>
          <p>
            The analyzer can use Uber Eats page fields such as menu item title and menu item image instead of generic
            Open Graph metadata.
          </p>
        </article>
        <article className="lp-static-card">
          <h2>Nutrition estimate</h2>
          <p>
            Calkilo returns the food name, calories, meal type, quantity, unit, macro summary, food list, and nutrition
            facts in one result view.
          </p>
        </article>
        <article className="lp-static-card">
          <h2>Saved meal details</h2>
          <p>
            If the API saves a meal, the saved meal payload appears in the result with coin charge and remaining
            balance when provided.
          </p>
        </article>
      </section>

      <section className="lp-static-card">
        <h2>Questions about Uber Eats nutrition analysis</h2>
        <div className="lp-resource-faq-grid">
          {FAQ_ITEMS.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
        <p>
          Uber Eats is a third-party service. Calkilo is not affiliated with or endorsed by Uber Eats, and estimates
          should be reviewed as nutrition guidance rather than official restaurant nutrition data.
        </p>
      </section>
    </FoodPageAnalyzerScreen>
  )
}
