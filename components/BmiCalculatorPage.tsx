import { useMemo, useState, type FormEvent } from 'react'
import { GOOGLE_PLAY_URL } from '../lib/app-links'
import { SITE_URL } from '../lib/seo'
import SeoHead from './SeoHead'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

type UnitSystem = 'metric' | 'us'

interface BmiCategory {
  label: string
  detail: string
  min: number
  max: number
  tone: string
}

const BMI_CATEGORIES: BmiCategory[] = [
  {
    label: 'Underweight',
    detail: 'Below the healthy-weight range',
    min: 0,
    max: 18.5,
    tone: '#69a8e6',
  },
  {
    label: 'Healthy weight',
    detail: 'Within the healthy-weight range',
    min: 18.5,
    max: 25,
    tone: '#00d448',
  },
  {
    label: 'Overweight',
    detail: 'Above the healthy-weight range',
    min: 25,
    max: 30,
    tone: '#f4bc3f',
  },
  {
    label: 'Obesity class 1',
    detail: 'BMI from 30 to 34.9',
    min: 30,
    max: 35,
    tone: '#f58a42',
  },
  {
    label: 'Obesity class 2',
    detail: 'BMI from 35 to 39.9',
    min: 35,
    max: 40,
    tone: '#ef5b4c',
  },
  {
    label: 'Obesity class 3',
    detail: 'BMI of 40 or above',
    min: 40,
    max: Number.POSITIVE_INFINITY,
    tone: '#ca3645',
  },
]

const FAQS = [
  {
    question: 'What is a healthy BMI?',
    answer:
      'For adults age 20 and older, the CDC defines a healthy-weight BMI as 18.5 to less than 25. BMI is a screening measure, so it should be considered alongside other health information.',
  },
  {
    question: 'How is BMI calculated?',
    answer:
      'BMI is weight in kilograms divided by height in meters squared. With US units, the equivalent formula is weight in pounds divided by height in inches squared, multiplied by 703.',
  },
  {
    question: 'Is BMI accurate for everyone?',
    answer:
      'BMI does not directly measure body fat or distinguish fat from muscle. It can be less informative for some athletes, older adults, pregnant people, and people with certain medical conditions.',
  },
  {
    question: 'Can children use this calculator?',
    answer:
      'No. This calculator uses adult categories for people age 20 and older. Children and teens need age- and sex-specific BMI percentiles.',
  },
] as const

function round(value: number, precision = 1) {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

function getCategory(bmi: number) {
  return BMI_CATEGORIES.find((category) => bmi >= category.min && bmi < category.max) ?? BMI_CATEGORIES[0]
}

function formatWeight(value: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value)
}

export default function BmiCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric')
  const [heightCm, setHeightCm] = useState(170)
  const [weightKg, setWeightKg] = useState(68)
  const [feet, setFeet] = useState(5)
  const [inches, setInches] = useState(7)
  const [weightLb, setWeightLb] = useState(150)
  const [error, setError] = useState('')

  const result = useMemo(() => {
    const totalHeightCm = unitSystem === 'metric' ? heightCm : (feet * 12 + inches) * 2.54
    const totalWeightKg = unitSystem === 'metric' ? weightKg : weightLb * 0.45359237
    const heightM = totalHeightCm / 100
    const bmi = totalWeightKg / heightM ** 2
    const category = getCategory(bmi)
    const healthyMinKg = 18.5 * heightM ** 2
    const healthyMaxKg = 24.9 * heightM ** 2
    const scaleMin = 12
    const scaleMax = 45
    const markerPosition = Math.min(98, Math.max(2, ((bmi - scaleMin) / (scaleMax - scaleMin)) * 100))

    return {
      bmi: round(bmi),
      category,
      healthyMin: unitSystem === 'metric' ? healthyMinKg : healthyMinKg / 0.45359237,
      healthyMax: unitSystem === 'metric' ? healthyMaxKg : healthyMaxKg / 0.45359237,
      markerPosition,
    }
  }, [feet, heightCm, inches, unitSystem, weightKg, weightLb])

  const validate = () => {
    if (unitSystem === 'metric') {
      if (heightCm < 100 || heightCm > 250) return 'Enter a height between 100 and 250 cm.'
      if (weightKg < 25 || weightKg > 350) return 'Enter a weight between 25 and 350 kg.'
    } else {
      if (feet < 3 || feet > 8 || inches < 0 || inches > 11) {
        return 'Enter a height between 3 and 8 feet, using 0 to 11 inches.'
      }
      if (weightLb < 55 || weightLb > 770) return 'Enter a weight between 55 and 770 lb.'
    }

    return ''
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(validate())
  }

  const selectUnitSystem = (nextUnitSystem: UnitSystem) => {
    setUnitSystem(nextUnitSystem)
    setError('')
  }

  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'BMI Calculator',
      description:
        'Calculate adult BMI, see the corresponding BMI category, and estimate the healthy weight range for your height.',
      url: `${SITE_URL}/bmi-calculator/`,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: 'Calkilo', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Calkilo BMI Calculator',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Any',
      url: `${SITE_URL}/bmi-calculator/`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: ['Metric and US units', 'Adult BMI category', 'Healthy weight range'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ] as const

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features/' },
        { label: 'Pricing', href: '/pricing/' },
        { label: 'BMI Calculator', href: '/bmi-calculator/' },
        { label: 'Calorie Calculator', href: '/calorie-calculator/' },
      ],
    },
    {
      title: 'Guides',
      links: [
        { label: 'AI Calorie Tracker', href: '/ai-calorie-tracker/' },
        { label: 'Photo Calorie Calculator', href: '/photo-calorie-calculator/' },
        { label: 'Macro Tracker', href: '/macro-tracker/' },
        { label: 'FAQ', href: '/faq/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy/' },
        { label: 'Terms of Service', href: '/terms-of-service/' },
        { label: 'Account Deletion', href: '/account-deletion/' },
        { label: 'Contact', href: '/contact/' },
      ],
    },
  ] as const

  return (
    <div className="lp-page lp-page--light lp-static-page lp-calculator-page lp-bmi-page" lang="en">
      <SeoHead
        title="Free BMI Calculator & Healthy Weight Range | Calkilo"
        description="Calculate your adult BMI using metric or US units. See your BMI category and a healthy weight range for your height in seconds."
        path="/bmi-calculator/"
        keywords={[
          'BMI calculator',
          'body mass index calculator',
          'healthy weight calculator',
          'BMI chart',
          'adult BMI calculator',
        ]}
        imagePath="/assets/hero-main.png"
        imageAlt="Calkilo BMI calculator"
        jsonLd={pageJsonLd}
      />

      <SiteHeader
        ctaHref="/#download"
        ctaLabel="Try for free"
        homeAriaLabel="Calkilo home"
        homeHref="/"
        language="en"
        languageLabel="Language"
        navAriaLabel="Main navigation"
        navItems={[
          { key: 'home', href: '/', label: 'Home' },
          { key: 'bmi', href: '/bmi-calculator/', label: 'BMI Calculator', isActive: true },
          { key: 'calories', href: '/calorie-calculator/', label: 'Calorie Calculator' },
          { key: 'pricing', href: '/pricing/', label: 'Choose Plan' },
        ]}
        onLanguageChange={(language) => {
          if (language !== 'en') window.location.assign(`/${language}/`)
        }}
      />

      <main className="lp-static-main">
        <section className="lp-section lp-calculator-hero lp-bmi-hero">
          <div className="lp-container lp-calculator-hero-grid">
            <div className="lp-calculator-hero-copy">
              <p className="lp-kicker">Free adult health tool</p>
              <h1>Know your BMI. Understand the number.</h1>
              <p>
                Enter your height and weight to calculate your body mass index, see your adult BMI
                category, and get a healthy-weight reference range for your height.
              </p>
              <div className="lp-calculator-benefits" aria-label="Calculator benefits">
                <span>Instant result</span>
                <span>Metric and US units</span>
                <span>Healthy-weight range</span>
              </div>
            </div>

            <aside className="lp-bmi-hero-stat" aria-label="Healthy BMI reference range">
              <span>Healthy range</span>
              <strong>18.5–24.9</strong>
              <p>Adult BMI reference range according to CDC categories.</p>
            </aside>
          </div>
        </section>

        <section className="lp-calculator-tool-section" aria-labelledby="bmi-calculator-heading">
          <div className="lp-container">
            <div className="lp-bmi-tool">
              <form className="lp-bmi-form" onSubmit={handleSubmit}>
                <header className="lp-bmi-form-header">
                  <div>
                    <p className="lp-calculator-eyebrow">BMI calculator</p>
                    <h2 id="bmi-calculator-heading">Enter your measurements</h2>
                  </div>
                  <div className="lp-calculator-units" aria-label="Unit system">
                    <button
                      type="button"
                      className={unitSystem === 'metric' ? 'is-active' : undefined}
                      aria-pressed={unitSystem === 'metric'}
                      onClick={() => selectUnitSystem('metric')}
                    >
                      Metric
                    </button>
                    <button
                      type="button"
                      className={unitSystem === 'us' ? 'is-active' : undefined}
                      aria-pressed={unitSystem === 'us'}
                      onClick={() => selectUnitSystem('us')}
                    >
                      US
                    </button>
                  </div>
                </header>

                <p className="lp-calculator-step-copy">
                  This calculator is intended for adults age 20 and older.
                </p>

                <div className="lp-calculator-field-grid">
                  {unitSystem === 'metric' ? (
                    <>
                      <label>
                        <span>Height</span>
                        <div className="lp-calculator-input-wrap">
                          <input
                            type="number"
                            inputMode="decimal"
                            min="100"
                            max="250"
                            step="0.1"
                            value={heightCm}
                            onChange={(event) => {
                              setHeightCm(Number(event.target.value))
                              setError('')
                            }}
                            required
                          />
                          <span>cm</span>
                        </div>
                      </label>
                      <label>
                        <span>Weight</span>
                        <div className="lp-calculator-input-wrap">
                          <input
                            type="number"
                            inputMode="decimal"
                            min="25"
                            max="350"
                            step="0.1"
                            value={weightKg}
                            onChange={(event) => {
                              setWeightKg(Number(event.target.value))
                              setError('')
                            }}
                            required
                          />
                          <span>kg</span>
                        </div>
                      </label>
                    </>
                  ) : (
                    <>
                      <label>
                        <span>Height</span>
                        <div className="lp-bmi-height-inputs">
                          <div className="lp-calculator-input-wrap">
                            <input
                              aria-label="Height in feet"
                              type="number"
                              inputMode="numeric"
                              min="3"
                              max="8"
                              value={feet}
                              onChange={(event) => {
                                setFeet(Number(event.target.value))
                                setError('')
                              }}
                              required
                            />
                            <span>ft</span>
                          </div>
                          <div className="lp-calculator-input-wrap">
                            <input
                              aria-label="Additional height in inches"
                              type="number"
                              inputMode="decimal"
                              min="0"
                              max="11"
                              step="0.1"
                              value={inches}
                              onChange={(event) => {
                                setInches(Number(event.target.value))
                                setError('')
                              }}
                              required
                            />
                            <span>in</span>
                          </div>
                        </div>
                      </label>
                      <label>
                        <span>Weight</span>
                        <div className="lp-calculator-input-wrap">
                          <input
                            type="number"
                            inputMode="decimal"
                            min="55"
                            max="770"
                            step="0.1"
                            value={weightLb}
                            onChange={(event) => {
                              setWeightLb(Number(event.target.value))
                              setError('')
                            }}
                            required
                          />
                          <span>lb</span>
                        </div>
                      </label>
                    </>
                  )}
                </div>

                {error ? <p className="lp-calculator-error" role="alert">{error}</p> : null}

                <button type="submit" className="lp-calculator-next lp-bmi-submit">
                  Calculate BMI
                </button>
                <p className="lp-bmi-privacy">Your measurements stay on this device.</p>
              </form>

              <section
                className="lp-bmi-result"
                aria-live="polite"
                style={{ '--bmi-tone': result.category.tone } as React.CSSProperties}
              >
                <p>Your BMI is</p>
                <div className="lp-bmi-number-row">
                  <strong>{Number.isFinite(result.bmi) ? result.bmi : '—'}</strong>
                  <span>{result.category.label}</span>
                </div>
                <p className="lp-bmi-result-detail">{result.category.detail}</p>

                <div className="lp-bmi-scale" aria-label={`BMI category: ${result.category.label}`}>
                  <div className="lp-bmi-scale-track">
                    <span className="is-under" />
                    <span className="is-healthy" />
                    <span className="is-over" />
                    <span className="is-obesity" />
                  </div>
                  <span
                    className="lp-bmi-scale-marker"
                    style={{ left: `${result.markerPosition}%` }}
                    aria-hidden="true"
                  />
                  <div className="lp-bmi-scale-labels" aria-hidden="true">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40+</span>
                  </div>
                </div>

                <div className="lp-bmi-healthy-range">
                  <span>Healthy-weight range for your height</span>
                  <strong>
                    {formatWeight(result.healthyMin)}–{formatWeight(result.healthyMax)}{' '}
                    {unitSystem === 'metric' ? 'kg' : 'lb'}
                  </strong>
                </div>

                <p className="lp-bmi-screening-note">
                  BMI is a screening measure, not a diagnosis. A healthcare professional can interpret it
                  alongside body composition, medical history, and other factors.
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="lp-section lp-calculator-content-section">
          <div className="lp-container lp-calculator-content-wrap">
            <section className="lp-calculator-intro-card">
              <div>
                <p className="lp-calculator-eyebrow">A useful starting point</p>
                <h2>What your BMI result means</h2>
              </div>
              <p>
                BMI compares weight with height to estimate a weight category. It is quick and widely
                used, but it does not directly measure body fat or overall health. Treat your result as
                one piece of a bigger health picture.
              </p>
            </section>

            <section className="lp-bmi-category-card" aria-labelledby="bmi-categories-heading">
              <div>
                <p className="lp-calculator-eyebrow">Adult BMI chart</p>
                <h2 id="bmi-categories-heading">BMI categories at a glance</h2>
              </div>
              <div className="lp-bmi-category-list">
                {BMI_CATEGORIES.slice(0, 4).map((category, index) => (
                  <article key={category.label}>
                    <span style={{ background: category.tone }} />
                    <div>
                      <strong>{index === 3 ? 'Obesity' : category.label}</strong>
                      <small>
                        {index === 0 && 'Below 18.5'}
                        {index === 1 && '18.5 to 24.9'}
                        {index === 2 && '25.0 to 29.9'}
                        {index === 3 && '30.0 or above'}
                      </small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="lp-calculator-content-card lp-calculator-two-column">
              <div>
                <p className="lp-calculator-eyebrow">Use the result with context</p>
                <h2>BMI cannot tell the whole story</h2>
                <p>
                  BMI does not distinguish muscle from fat, show where body fat is stored, or account
                  for every difference in age and body composition. Athletes with more muscle may have a
                  higher BMI without the same health profile as someone with less muscle.
                </p>
              </div>
              <div className="lp-calculator-callout">
                <strong>For adults only</strong>
                <p>
                  People under 20 need a child and teen BMI calculator. Pregnancy can also make adult BMI
                  categories inappropriate.
                </p>
                <a href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" target="_blank" rel="noreferrer">
                  Review CDC adult BMI categories
                </a>
              </div>
            </section>

            <section className="lp-calculator-content-card">
              <p className="lp-calculator-eyebrow">Common questions</p>
              <h2>BMI calculator FAQ</h2>
              <div className="lp-calculator-faq-grid">
                {FAQS.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="lp-calculator-app-cta">
              <div>
                <p className="lp-calculator-eyebrow">Move beyond a single number</p>
                <h2>Build habits you can actually track</h2>
                <p>
                  Use Calkilo to log meals, understand calories and macros, and follow your nutrition
                  patterns over time.
                </p>
              </div>
              <a className="lp-btn lp-btn--solid" href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
                Try Calkilo free
              </a>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter
        copyright={`© ${new Date().getFullYear()} Calkilo. All rights reserved.`}
        description="AI-powered calorie tracking that makes everyday nutrition simpler."
        homeAriaLabel="Calkilo home"
        homeHref="/"
        sections={footerSections}
        socialLinksLabel="Calkilo social links"
      />
    </div>
  )
}
