import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../lib/app-links'
import { SITE_URL } from '../lib/seo'

const PAGE_TITLE = 'About Calkilo | AI Calorie Counter and Nutrition Assistant'
const PAGE_DESCRIPTION =
  'Calkilo is an AI calorie counter and nutrition assistant for photo food logging, macro tracking, meal planning, and daily nutrition progress.'

const PAGE_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Calkilo',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.png`,
    description: PAGE_DESCRIPTION,
    email: 'support@calkilo.com',
    sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/about/`,
    inLanguage: 'en',
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Calkilo',
      url: SITE_URL,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#app`,
    name: 'Calkilo',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, Android',
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    isAccessibleForFree: true,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
    featureList: [
      'Photo calorie estimation',
      'Calorie and macro tracking',
      'Daily food logging',
      'Meal planning',
      'Progress tracking',
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
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About Calkilo',
        item: `${SITE_URL}/about/`,
      },
    ],
  },
] as const

export default function AboutPage() {
  return (
    <StaticPageLayout
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      path="/about/"
      heading="Calkilo is an AI calorie counter and nutrition assistant"
      intro="Calkilo helps people estimate meal calories from food photos, track calories and macros, keep a daily nutrition log, and plan meals on iPhone and Android."
      activeNav="none"
      keywords={[
        'about Calkilo',
        'Calkilo AI calorie counter',
        'nutrition assistant app',
        'photo calorie tracker',
      ]}
      jsonLd={PAGE_JSON_LD}
      hasLocalizedVersions={false}
    >
      <section className="lp-static-card">
        <h2>What Calkilo does</h2>
        <p>
          Calkilo turns a food photo into an estimated meal entry that users can review before saving. The app connects
          that faster capture step to daily calorie totals, protein, carbohydrates, fat, progress views, and meal
          planning.
        </p>
        <p>
          The product is designed for practical everyday tracking. It reduces manual entry while keeping the user
          responsible for reviewing portions, oils, sauces, and ingredients that may not be visible in an image.
        </p>
      </section>

      <section className="lp-resource-card-grid">
        <article className="lp-static-card">
          <h2>Photo food logging</h2>
          <p>Use a meal photo as the starting point for an editable calorie and nutrition estimate.</p>
        </article>
        <article className="lp-static-card">
          <h2>Calories and macros</h2>
          <p>Track calories with protein, carbohydrates, and fat instead of relying on one number alone.</p>
        </article>
        <article className="lp-static-card">
          <h2>Planning and progress</h2>
          <p>Connect daily logs to meal-planning support, nutrition goals, and progress over time.</p>
        </article>
      </section>

      <section className="lp-static-card">
        <h2>Who Calkilo is for</h2>
        <ul className="lp-policy-list">
          <li>People who want a faster alternative to manual-only food logging</li>
          <li>People tracking weight, portions, calories, protein, or other macro goals</li>
          <li>People who eat mixed, homemade, restaurant, Iranian, or Persian meals</li>
          <li>People who want meal planning connected to the food they actually log</li>
        </ul>
      </section>

      <section className="lp-static-card">
        <h2>Accuracy and health limitations</h2>
        <p>
          Food-photo analysis produces an estimate. Image quality, portion size, recipe differences, cooking oil,
          sauces, fillings, and hidden ingredients can change the result.
        </p>
        <p>
          Calkilo is a nutrition tracking tool, not a medical device or a replacement for a qualified clinician or
          dietitian. People with medical conditions, eating disorders, pregnancy-related needs, or prescribed diets
          should seek professional guidance.
        </p>
      </section>

      <section className="lp-static-card">
        <h2>Official Calkilo pages</h2>
        <div className="lp-resource-related-grid">
          <article className="lp-resource-related-card">
            <h3>
              <Link href="/features/">Features</Link>
            </h3>
            <p>Review photo tracking, macros, meal planning, progress, and integrations.</p>
          </article>
          <article className="lp-resource-related-card">
            <h3>
              <Link href="/pricing/">Pricing</Link>
            </h3>
            <p>See current monthly and yearly premium options.</p>
          </article>
          <article className="lp-resource-related-card">
            <h3>
              <Link href="/faq/">FAQ</Link>
            </h3>
            <p>Find product, subscription, privacy, and device answers.</p>
          </article>
          <article className="lp-resource-related-card">
            <h3>
              <Link href="/contact/">Contact</Link>
            </h3>
            <p>Reach support for product, billing, privacy, or account questions.</p>
          </article>
        </div>
        <div className="lp-resource-actions">
          <a className="lp-btn lp-btn--solid" href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
            Google Play
          </a>
          <a className="lp-btn lp-resource-btn-secondary" href={APP_STORE_URL} target="_blank" rel="noreferrer">
            App Store
          </a>
        </div>
      </section>
    </StaticPageLayout>
  )
}
