import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../lib/app-links'
import { GUIDE_LINKS } from '../lib/resource-pages'
import { SITE_URL } from '../lib/seo'
import { CORE_SITE_LINKS } from '../lib/site-pages'

const FEATURES_PAGE_TITLE = 'Calkilo Features | AI Calorie Tracking, Macros & Meal Plans'
const FEATURES_PAGE_DESCRIPTION =
  'Explore Calkilo features including photo calorie tracking, macro tracking, AI meal planning, progress views, and health app integrations.'
const FEATURES_PAGE_KEYWORDS = [
  'calkilo features',
  'ai calorie tracker features',
  'macro tracking app features',
  'photo calorie app',
]

const FEATURE_CARDS = [
  {
    title: 'Photo calorie tracking',
    description: 'Turn a food photo into a meal entry faster than a manual search-only workflow.',
  },
  {
    title: 'Macro goals and daily logs',
    description: 'Track calories, protein, carbs, and fats in one place with progress over time.',
  },
  {
    title: 'AI meal planning',
    description: 'Use goal-aware suggestions, recipe support, and meal-planning help inside the app.',
  },
  {
    title: 'Device integrations',
    description: 'Connect Calkilo with Apple Health, Google Fit, Fitbit, and Samsung Health.',
  },
] as const

const FEATURE_FAQS = [
  {
    question: 'Does Calkilo only show calories?',
    answer:
      'No. Meal results and daily tracking include protein, carbohydrates, and fat alongside calories.',
  },
  {
    question: 'Is the app built around manual food search or photos?',
    answer:
      'Photos are the fastest starting point: take a clear picture, review the estimate, correct any portion or hidden-ingredient details, and save the meal.',
  },
  {
    question: 'Can Calkilo help after the meal is logged?',
    answer:
      'Yes. The feature set extends beyond one-off estimates into progress tracking, planning, and ongoing nutrition decisions.',
  },
  {
    question: 'Which devices and platforms does Calkilo support?',
    answer:
      'Calkilo is available on iPhone and Android, and the public product messaging includes Apple Health, Google Fit, Fitbit, and Samsung Health integrations.',
  },
] as const

export default function FeaturesPage() {
  const relatedPages = [...CORE_SITE_LINKS.filter((link) => link.href !== '/features/'), GUIDE_LINKS[1], GUIDE_LINKS[2]]
  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: FEATURES_PAGE_TITLE,
      description: FEATURES_PAGE_DESCRIPTION,
      url: `${SITE_URL}/features/`,
      inLanguage: 'en',
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'Calkilo',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android',
      description: FEATURES_PAGE_DESCRIPTION,
      url: SITE_URL,
      sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
      publisher: { '@id': `${SITE_URL}/#organization` },
      featureList: FEATURE_CARDS.map((card) => card.title),
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
          name: 'Features',
          item: `${SITE_URL}/features/`,
        },
      ],
    },
  ] as const

  return (
    <StaticPageLayout
      title={FEATURES_PAGE_TITLE}
      description={FEATURES_PAGE_DESCRIPTION}
      path="/features/"
      heading="Calkilo features for faster calorie and macro tracking"
      intro="See how Calkilo handles food-photo logging, calorie and macro tracking, meal planning, progress views, and supported device integrations."
      activeNav="none"
      keywords={FEATURES_PAGE_KEYWORDS}
      jsonLd={pageJsonLd}
      hasLocalizedVersions={false}
    >
      <section className="lp-static-card">
        <h2>What this page covers</h2>
        <p>
          Start with a food photo, review the nutrition estimate, and save the corrected meal to your daily log.
          The sections below explain what happens after a scan and which connected features are available.
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
        {FEATURE_CARDS.map((card) => (
          <article key={card.title} className="lp-static-card">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>

      <section className="lp-static-card">
        <h2>Faster meal capture from food photos</h2>
        <p>
          Calkilo is built around reducing logging friction. The fastest route from a real meal to a useful record is
          a photo, not a long ingredient search.
        </p>
        <p>
          A clear photo works best. Review the portion and add context for oils, sauces, drinks, or ingredients that
          are not visible before you save the result.
        </p>
        <ul className="lp-policy-list">
          <li>Photo-first meal capture instead of manual-only entry</li>
          <li>Clear calorie and nutrition estimates as a starting point</li>
          <li>Saved meal history for repeat use instead of one-time calculations</li>
        </ul>
      </section>

      <section className="lp-static-card">
        <h2>Daily calorie and macro tracking</h2>
        <p>
          The product value is broader than a single calorie number. Users need an app that can show calories,
          protein, carbohydrates, and fats together so each meal fits the rest of the day.
        </p>
        <p>
          Calkilo keeps those nutrients next to meal history so you can compare a meal with the rest of your day.
        </p>
        <ul className="lp-policy-list">
          <li>Daily logs for calories and macros</li>
          <li>Progress views tied to goals and consistency</li>
          <li>Practical tracking for weight loss, maintenance, or macro targets</li>
        </ul>
      </section>

      <section className="lp-static-card">
        <h2>Meal planning, recipes, and AI guidance</h2>
        <p>
          Calkilo connects tracking with next actions. Meal planning and recipe support make the app more useful than a
          passive diary that only reports what already happened.
        </p>
        <p>
          That helps people move from recording a meal to choosing a useful next step instead of treating the app as
          a passive diary.
        </p>
        <ul className="lp-policy-list">
          <li>Goal-aware meal suggestions</li>
          <li>Recipe support tied to nutrition goals</li>
          <li>AI assistance that extends beyond the first scan</li>
        </ul>
      </section>

      <section className="lp-static-card">
        <h2>Integrations and connected health data</h2>
        <p>
          People often want to know whether an app fits the rest of their health setup before they install or upgrade.
        </p>
        <ul className="lp-policy-list">
          <li>Apple Health</li>
          <li>Google Fit</li>
          <li>Fitbit</li>
          <li>Samsung Health</li>
        </ul>
      </section>

      <section className="lp-static-card">
        <h2>Questions people ask</h2>
        <div className="lp-resource-faq-grid">
          {FEATURE_FAQS.map((item) => (
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
