import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'
import { SITE_URL } from '../lib/seo'

const PAGE_TITLE = 'Calkilo vs MyFitnessPal | Calorie Tracker Comparison'
const PAGE_DESCRIPTION =
  'Compare Calkilo and MyFitnessPal for photo food logging, macro tracking, meal planning, Persian food context, and everyday calorie-tracking workflow.'
const MYFITNESSPAL_PREMIUM_URL = 'https://www.myfitnesspal.com/premium'
const REVIEW_DATE = 'July 2, 2026'

const FAQS = [
  {
    question: 'Is Calkilo or MyFitnessPal better for photo food logging?',
    answer:
      'Both products publicly describe photo-based meal logging. Calkilo makes photo-first AI calorie estimation central to its product positioning, while MyFitnessPal lists Meal Scan within its paid logging features.',
  },
  {
    question: 'Which app is better for Persian or Iranian food?',
    answer:
      'Calkilo publishes Persian-language photo-calorie guides and Iranian food examples. Users should still test both apps with their own meals because recipe and portion differences affect every estimate.',
  },
  {
    question: 'Do both apps track macros?',
    answer:
      'Yes. Both products publicly describe calorie and macro tracking. Exact controls and plan requirements can change, so verify current details on each official pricing page.',
  },
  {
    question: 'Should I trust a meal photo as an exact calorie count?',
    answer:
      'No. Photo analysis is an estimate. Portion size, oils, sauces, cooking methods, and hidden ingredients may require review or correction.',
  },
] as const

const PAGE_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/calkilo-vs-myfitnesspal/`,
    datePublished: '2026-07-02',
    dateModified: '2026-07-02',
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: 'Calkilo',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calkilo',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logo.png`,
      },
    },
    about: [
      {
        '@type': 'SoftwareApplication',
        name: 'Calkilo',
        url: SITE_URL,
      },
      {
        '@type': 'SoftwareApplication',
        name: 'MyFitnessPal',
        url: 'https://www.myfitnesspal.com/',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
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
        name: 'Calkilo vs MyFitnessPal',
        item: `${SITE_URL}/calkilo-vs-myfitnesspal/`,
      },
    ],
  },
] as const

export default function CalkiloVsMyFitnessPalPage() {
  return (
    <StaticPageLayout
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      path="/calkilo-vs-myfitnesspal/"
      heading="Calkilo vs MyFitnessPal"
      intro="Both apps can support calorie and macro tracking. The practical choice depends on whether you prioritize Calkilo's photo-first workflow and Persian food content or MyFitnessPal's broader set of established logging methods and paid tools."
      activeNav="none"
      keywords={[
        'Calkilo vs MyFitnessPal',
        'MyFitnessPal alternative',
        'AI calorie tracker comparison',
        'photo calorie counter app',
      ]}
      ogType="article"
      jsonLd={PAGE_JSON_LD}
      hasLocalizedVersions={false}
    >
      <section className="lp-static-card">
        <h2>Short answer</h2>
        <p>
          Choose Calkilo when you want photo-first AI estimates, a simpler path from a meal photo to a daily log, and
          public Persian-language nutrition content. Consider MyFitnessPal when barcode scanning, voice logging, its
          established food-logging ecosystem, or its current paid feature set matters more to your routine.
        </p>
        <p>
          Neither app can infer every ingredient or exact portion from an image. Test the correction workflow with the
          meals you eat most often before choosing a long-term subscription.
        </p>
      </section>

      <section className="lp-resource-card-grid">
        <article className="lp-static-card">
          <h2>Calkilo strengths</h2>
          <ul className="lp-policy-list">
            <li>Photo-first AI calorie and macro estimates</li>
            <li>Persian-language guides and Iranian food examples</li>
            <li>Meal planning connected to daily nutrition tracking</li>
            <li>Public support for iPhone and Android</li>
          </ul>
        </article>
        <article className="lp-static-card">
          <h2>MyFitnessPal strengths</h2>
          <ul className="lp-policy-list">
            <li>Barcode scanning and Meal Scan in its paid logging experience</li>
            <li>Voice logging and custom macro controls in paid plans</li>
            <li>Meal planning offered through its Premium+ plan in supported countries</li>
            <li>A long-established food diary and tracking workflow</li>
          </ul>
        </article>
      </section>

      <section className="lp-static-card">
        <h2>Photo logging and correction</h2>
        <p>
          Calkilo makes food-photo analysis the main entry point: take a photo, review the estimated calories and
          macros, then save the meal to the daily log. MyFitnessPal also publicly offers photo meal logging through
          Meal Scan alongside barcode and voice logging.
        </p>
        <p>
          The important test is correction speed. Mixed dishes, restaurant meals, oils, sauces, and portions can be
          wrong in any automated estimate, so compare how quickly you can review and fix a normal meal.
        </p>
      </section>

      <section className="lp-static-card">
        <h2>Persian and Iranian food</h2>
        <p>
          Calkilo has a clearer public content advantage for Persian-speaking users because it publishes Persian
          photo-calorie pages, food-calorie examples, and scan examples for meals including rice, kebab, falafel,
          burgers, and pizza.
        </p>
        <p>
          Public content does not guarantee a perfect estimate. Iranian recipes vary by household and restaurant, so
          users should review rice portions, meat weight, cooking fat, bread, sauces, and side dishes in either app.
        </p>
      </section>

      <section className="lp-static-card">
        <h2>Meal planning and price</h2>
        <p>
          Both companies currently market meal-planning support, but plan names, availability, and pricing can change.
          MyFitnessPal states that its Meal Planner is part of Premium+ and is limited to selected countries. Calkilo
          lists its current monthly and yearly options on its own pricing page.
        </p>
        <div className="lp-resource-actions">
          <Link className="lp-btn lp-btn--solid" href="/pricing/">
            Calkilo pricing
          </Link>
          <a
            className="lp-btn lp-resource-btn-secondary"
            href={MYFITNESSPAL_PREMIUM_URL}
            target="_blank"
            rel="noreferrer"
          >
            MyFitnessPal plans
          </a>
        </div>
      </section>

      <section className="lp-static-card">
        <h2>Questions people ask</h2>
        <div className="lp-resource-faq-grid">
          {FAQS.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lp-static-card">
        <h2>Method and disclosure</h2>
        <p>
          This comparison was reviewed on {REVIEW_DATE} using Calkilo&apos;s public product pages and MyFitnessPal&apos;s
          official Premium page. Features, regional availability, and prices may change after that date.
        </p>
        <p>
          Calkilo is not affiliated with or endorsed by MyFitnessPal. Product names and trademarks belong to their
          respective owners.
        </p>
      </section>
    </StaticPageLayout>
  )
}
