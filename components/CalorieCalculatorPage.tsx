import Link from 'next/link'
import { useMemo, useState, type FormEvent } from 'react'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../lib/app-links'
import { SITE_URL } from '../lib/seo'
import SeoHead from './SeoHead'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

type UnitSystem = 'metric' | 'us'
type Sex = 'male' | 'female'
type Goal = 'lose' | 'maintain' | 'gain'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'

interface CalculatorValues {
  unitSystem: UnitSystem
  sex: Sex
  age: number
  height: number
  currentWeight: number
  activity: ActivityLevel
  goal: Goal
  targetWeight: number
  weeks: number
}

const ACTIVITY_OPTIONS: Array<{
  value: ActivityLevel
  label: string
  description: string
  multiplier: number
}> = [
  {
    value: 'sedentary',
    label: 'Sedentary',
    description: 'Mostly sitting, with little structured exercise',
    multiplier: 1.2,
  },
  {
    value: 'light',
    label: 'Lightly active',
    description: 'Light exercise or active movement 1-3 days a week',
    multiplier: 1.375,
  },
  {
    value: 'moderate',
    label: 'Moderately active',
    description: 'Moderate exercise 3-5 days a week',
    multiplier: 1.55,
  },
  {
    value: 'very',
    label: 'Very active',
    description: 'Hard exercise 6-7 days a week',
    multiplier: 1.725,
  },
  {
    value: 'extra',
    label: 'Extra active',
    description: 'Very hard training or a highly physical job',
    multiplier: 1.9,
  },
]

const GOAL_OPTIONS: Array<{ value: Goal; label: string; description: string }> = [
  { value: 'lose', label: 'Lose weight', description: 'Create an estimated calorie deficit' },
  { value: 'maintain', label: 'Maintain weight', description: 'Estimate calories to stay near your current weight' },
  { value: 'gain', label: 'Gain weight', description: 'Create an estimated calorie surplus' },
]

const FAQS = [
  {
    question: 'How many calories should I eat a day?',
    answer:
      'Your estimated daily calorie needs depend on age, height, weight, sex, and activity level. This calculator estimates resting energy needs, applies an activity factor, and then adjusts the result for your weight goal and timeline.',
  },
  {
    question: 'What is the difference between BMR and TDEE?',
    answer:
      'BMR estimates the energy your body uses at rest. TDEE estimates total daily energy expenditure by adding an activity adjustment. Your maintenance calories are based on the TDEE estimate, not BMR alone.',
  },
  {
    question: 'How does the calorie deficit calculator use my goal date?',
    answer:
      'It compares your current and target weight, spreads that change across the number of weeks you selected, and estimates the average daily calorie adjustment. Real weight change is not perfectly linear, so the result is a planning estimate.',
  },
  {
    question: 'Is losing 1 to 2 pounds per week realistic?',
    answer:
      'The CDC says people who lose weight gradually, at about 1 to 2 pounds per week, are more likely to keep it off. Faster requested timelines should be reviewed with a qualified health professional.',
  },
  {
    question: 'Can I use this calculator to gain or maintain weight?',
    answer:
      'Yes. Choose maintain to see estimated maintenance calories, or gain to estimate a daily calorie surplus based on your target weight and timeline.',
  },
  {
    question: 'Is this calorie goal medical advice?',
    answer:
      'No. It is an educational estimate for adults. Pregnancy, breastfeeding, medical conditions, medications, athletic training, and eating disorder history can change calorie needs. Discuss those situations with a clinician or registered dietitian.',
  },
] as const

const INITIAL_VALUES: CalculatorValues = {
  unitSystem: 'metric',
  sex: 'female',
  age: 30,
  height: 165,
  currentWeight: 72,
  activity: 'moderate',
  goal: 'lose',
  targetWeight: 65,
  weeks: 14,
}

function round(value: number, precision = 0) {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(value))
}

function kilograms(value: number, unitSystem: UnitSystem) {
  return unitSystem === 'metric' ? value : value * 0.45359237
}

function centimeters(value: number, unitSystem: UnitSystem) {
  return unitSystem === 'metric' ? value : value * 2.54
}

function convertWeight(value: number, nextUnitSystem: UnitSystem) {
  return nextUnitSystem === 'metric' ? round(value * 0.45359237, 1) : round(value / 0.45359237, 1)
}

function convertHeight(value: number, nextUnitSystem: UnitSystem) {
  return nextUnitSystem === 'metric' ? round(value * 2.54, 1) : round(value / 2.54, 1)
}

function goalLabel(goal: Goal) {
  if (goal === 'lose') return 'loss'
  if (goal === 'gain') return 'gain'
  return 'maintenance'
}

export default function CalorieCalculatorPage() {
  const [step, setStep] = useState(1)
  const [values, setValues] = useState<CalculatorValues>(INITIAL_VALUES)
  const [error, setError] = useState('')

  const results = useMemo(() => {
    const weightKg = kilograms(values.currentWeight, values.unitSystem)
    const heightCm = centimeters(values.height, values.unitSystem)
    const targetKg = values.goal === 'maintain' ? weightKg : kilograms(values.targetWeight, values.unitSystem)
    const activity = ACTIVITY_OPTIONS.find((option) => option.value === values.activity) ?? ACTIVITY_OPTIONS[2]
    const sexAdjustment = values.sex === 'male' ? 5 : -161
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * values.age + sexAdjustment
    const maintenance = bmr * activity.multiplier
    const weightChangeKg = targetKg - weightKg
    const requestedWeeklyKg = values.goal === 'maintain' ? 0 : Math.abs(weightChangeKg) / values.weeks
    const dailyAdjustment = values.goal === 'maintain' ? 0 : (weightChangeKg * 7700) / (values.weeks * 7)
    const rawDailyTarget = maintenance + dailyAdjustment
    const dailyTarget = Math.max(1000, rawDailyTarget)
    const requestedWeeklyLb = requestedWeeklyKg * 2.2046226218
    const timelineNeedsReview =
      values.goal === 'lose' && (requestedWeeklyLb > 2 || rawDailyTarget < 1000)
    const directionMatches =
      values.goal === 'maintain' ||
      (values.goal === 'lose' && targetKg < weightKg) ||
      (values.goal === 'gain' && targetKg > weightKg)
    const goalDate = new Date()
    goalDate.setDate(goalDate.getDate() + values.weeks * 7)
    const weightDifferenceLb = Math.abs(weightChangeKg) * 2.2046226218
    const gradualRange =
      values.goal === 'lose'
        ? {
            fastest: Math.max(1, Math.ceil(weightDifferenceLb / 2)),
            slowest: Math.max(1, Math.ceil(weightDifferenceLb)),
          }
        : null

    return {
      activity,
      bmr,
      dailyAdjustment,
      dailyTarget,
      directionMatches,
      goalDate,
      gradualRange,
      maintenance,
      rawDailyTarget,
      requestedWeeklyKg,
      requestedWeeklyLb,
      targetKg,
      timelineNeedsReview,
      weightChangeKg,
      weightKg,
    }
  }, [values])

  const weightUnit = values.unitSystem === 'metric' ? 'kg' : 'lb'
  const heightUnit = values.unitSystem === 'metric' ? 'cm' : 'in'

  const updateValue = <Key extends keyof CalculatorValues>(key: Key, value: CalculatorValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }))
    setError('')
  }

  const selectUnitSystem = (unitSystem: UnitSystem) => {
    if (unitSystem === values.unitSystem) return

    setValues((current) => ({
      ...current,
      unitSystem,
      currentWeight: convertWeight(current.currentWeight, unitSystem),
      targetWeight: convertWeight(current.targetWeight, unitSystem),
      height: convertHeight(current.height, unitSystem),
    }))
    setError('')
  }

  const validateStep = () => {
    if (step === 1) {
      const minimumHeight = values.unitSystem === 'metric' ? 120 : 47
      const maximumHeight = values.unitSystem === 'metric' ? 230 : 91
      const minimumWeight = values.unitSystem === 'metric' ? 35 : 77
      const maximumWeight = values.unitSystem === 'metric' ? 300 : 661

      if (values.age < 18 || values.age > 100) {
        return 'This calculator is designed for adults ages 18 to 100.'
      }
      if (values.height < minimumHeight || values.height > maximumHeight) {
        return `Enter a height between ${minimumHeight} and ${maximumHeight} ${heightUnit}.`
      }
      if (values.currentWeight < minimumWeight || values.currentWeight > maximumWeight) {
        return `Enter a current weight between ${minimumWeight} and ${maximumWeight} ${weightUnit}.`
      }
    }

    if (step === 3 && values.goal !== 'maintain') {
      if (values.targetWeight <= 0) return 'Enter a valid target weight.'
      if (values.weeks < 1 || values.weeks > 104) return 'Choose a timeline between 1 and 104 weeks.'
      if (!results.directionMatches) {
        return values.goal === 'lose'
          ? 'For a weight-loss goal, target weight must be lower than current weight.'
          : 'For a weight-gain goal, target weight must be higher than current weight.'
      }
    }

    return ''
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationError = validateStep()

    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setStep((current) => Math.min(4, current + 1))
  }

  const resetCalculator = () => {
    setValues(INITIAL_VALUES)
    setStep(1)
    setError('')
  }

  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Calorie Calculator by Goal Date',
      description:
        'Estimate daily calories for weight loss, maintenance, or gain from body details, activity level, target weight, and goal timeline.',
      url: `${SITE_URL}/calorie-calculator/`,
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Calkilo',
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Calkilo Calorie Calculator',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Any',
      url: `${SITE_URL}/calorie-calculator/`,
      description:
        'A free daily calorie, TDEE, calorie deficit, and goal timeline calculator for adults.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Daily calorie needs estimate',
        'TDEE and BMR estimate',
        'Calorie deficit or surplus estimate',
        'Target weight timeline estimate',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Calorie Calculator',
          item: `${SITE_URL}/calorie-calculator/`,
        },
      ],
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
        { label: 'Calorie Calculator', href: '/calorie-calculator/' },
        { label: 'Contact', href: '/contact/' },
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
    <div className="lp-page lp-page--light lp-static-page lp-calculator-page" lang="en">
      <SeoHead
        title="Calorie Calculator by Goal Date | Calkilo"
        description="Calculate daily calories for weight loss, maintenance, or gain using your weight, age, gender, height, activity level, target weight, and goal timeline."
        path="/calorie-calculator/"
        keywords={[
          'calorie calculator',
          'calorie deficit calculator',
          'weight loss calculator',
          'TDEE calculator',
          'daily calorie needs',
          'calories to lose weight',
          'calorie calculator by goal date',
          'how many calories should I eat a day',
        ]}
        imagePath="/assets/hero-main.png"
        imageAlt="Calkilo daily calorie calculator"
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
          { key: 'calculator', href: '/calorie-calculator/', label: 'Calculator', isActive: true },
          { key: 'features', href: '/features/', label: 'Features' },
          { key: 'pricing', href: '/pricing/', label: 'Choose Plan' },
        ]}
        onLanguageChange={(language) => {
          if (language !== 'en') window.location.assign(`/${language}/`)
        }}
      />

      <main className="lp-static-main">
        <section className="lp-section lp-calculator-hero">
          <div className="lp-container lp-calculator-hero-grid">
            <div className="lp-calculator-hero-copy">
              <p className="lp-kicker">Free calorie planning tool</p>
              <h1>Daily Calorie Calculator for Your Weight Goal</h1>
              <p>
                Estimate how many calories you should eat per day to lose, maintain, or gain weight.
                Add your current weight, age, height, gender, activity level, target weight, and goal
                timeline for a personalized starting point.
              </p>
              <div className="lp-calculator-benefits" aria-label="Calculator benefits">
                <span>Daily calorie target</span>
                <span>BMR and TDEE estimate</span>
                <span>Goal date check</span>
              </div>
            </div>

            <aside className="lp-calculator-hero-note">
              <span className="lp-calculator-note-icon" aria-hidden="true">01</span>
              <p>Answer three short steps. Your entries stay in this browser and are not submitted.</p>
            </aside>
          </div>
        </section>

        <section className="lp-calculator-tool-section" aria-labelledby="calculator-heading">
          <div className="lp-container">
            <div className="lp-calculator-shell">
              <header className="lp-calculator-tool-header">
                <div>
                  <p className="lp-calculator-eyebrow">Calorie, BMR and TDEE calculator</p>
                  <h2 id="calculator-heading">Build your daily calorie target</h2>
                </div>
                <div className="lp-calculator-units" aria-label="Unit system">
                  <button
                    type="button"
                    className={values.unitSystem === 'metric' ? 'is-active' : undefined}
                    onClick={() => selectUnitSystem('metric')}
                  >
                    Metric
                  </button>
                  <button
                    type="button"
                    className={values.unitSystem === 'us' ? 'is-active' : undefined}
                    onClick={() => selectUnitSystem('us')}
                  >
                    US
                  </button>
                </div>
              </header>

              <ol className="lp-calculator-progress" aria-label="Calculator progress">
                {['Your body', 'Activity', 'Goal', 'Results'].map((label, index) => {
                  const itemStep = index + 1
                  return (
                    <li
                      key={label}
                      className={`${itemStep === step ? 'is-current' : ''}${itemStep < step ? ' is-complete' : ''}`}
                      aria-current={itemStep === step ? 'step' : undefined}
                    >
                      <span>{itemStep < step ? '✓' : itemStep}</span>
                      <strong>{label}</strong>
                    </li>
                  )
                })}
              </ol>

              {step < 4 ? (
                <form className="lp-calculator-form" onSubmit={handleSubmit}>
                  {step === 1 ? (
                    <fieldset>
                      <legend>Tell us about your body</legend>
                      <p className="lp-calculator-step-copy">
                        These details are used to estimate resting calorie needs with the Mifflin-St Jeor equation.
                      </p>
                      <div className="lp-calculator-field-grid">
                        <label>
                          <span>Sex used by the equation</span>
                          <select value={values.sex} onChange={(event) => updateValue('sex', event.target.value as Sex)}>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                          </select>
                        </label>
                        <label>
                          <span>Age</span>
                          <div className="lp-calculator-input-wrap">
                            <input
                              type="number"
                              inputMode="numeric"
                              min="18"
                              max="100"
                              value={values.age}
                              onChange={(event) => updateValue('age', Number(event.target.value))}
                              required
                            />
                            <span>years</span>
                          </div>
                        </label>
                        <label>
                          <span>Height</span>
                          <div className="lp-calculator-input-wrap">
                            <input
                              type="number"
                              inputMode="decimal"
                              step="0.1"
                              value={values.height}
                              onChange={(event) => updateValue('height', Number(event.target.value))}
                              required
                            />
                            <span>{heightUnit}</span>
                          </div>
                        </label>
                        <label>
                          <span>Current weight</span>
                          <div className="lp-calculator-input-wrap">
                            <input
                              type="number"
                              inputMode="decimal"
                              step="0.1"
                              value={values.currentWeight}
                              onChange={(event) => updateValue('currentWeight', Number(event.target.value))}
                              required
                            />
                            <span>{weightUnit}</span>
                          </div>
                        </label>
                      </div>
                    </fieldset>
                  ) : null}

                  {step === 2 ? (
                    <fieldset>
                      <legend>Choose your typical activity level</legend>
                      <p className="lp-calculator-step-copy">
                        Include normal daily movement and exercise. Choose the lower option if you are between two levels.
                      </p>
                      <div className="lp-calculator-option-grid lp-calculator-option-grid--activity">
                        {ACTIVITY_OPTIONS.map((option) => (
                          <label key={option.value} className={values.activity === option.value ? 'is-selected' : undefined}>
                            <input
                              type="radio"
                              name="activity"
                              value={option.value}
                              checked={values.activity === option.value}
                              onChange={() => updateValue('activity', option.value)}
                            />
                            <span className="lp-calculator-option-check" aria-hidden="true" />
                            <strong>{option.label}</strong>
                            <small>{option.description}</small>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}

                  {step === 3 ? (
                    <fieldset>
                      <legend>Set your weight goal and timeline</legend>
                      <p className="lp-calculator-step-copy">
                        Your goal date changes the estimated daily calorie deficit or surplus.
                      </p>
                      <div className="lp-calculator-option-grid lp-calculator-option-grid--goal">
                        {GOAL_OPTIONS.map((option) => (
                          <label key={option.value} className={values.goal === option.value ? 'is-selected' : undefined}>
                            <input
                              type="radio"
                              name="goal"
                              value={option.value}
                              checked={values.goal === option.value}
                              onChange={() => updateValue('goal', option.value)}
                            />
                            <span className="lp-calculator-option-check" aria-hidden="true" />
                            <strong>{option.label}</strong>
                            <small>{option.description}</small>
                          </label>
                        ))}
                      </div>

                      {values.goal !== 'maintain' ? (
                        <div className="lp-calculator-field-grid lp-calculator-goal-fields">
                          <label>
                            <span>Target weight</span>
                            <div className="lp-calculator-input-wrap">
                              <input
                                type="number"
                                inputMode="decimal"
                                min="1"
                                step="0.1"
                                value={values.targetWeight}
                                onChange={(event) => updateValue('targetWeight', Number(event.target.value))}
                                required
                              />
                              <span>{weightUnit}</span>
                            </div>
                          </label>
                          <label>
                            <span>Time to reach your goal</span>
                            <div className="lp-calculator-input-wrap">
                              <input
                                type="number"
                                inputMode="numeric"
                                min="1"
                                max="104"
                                value={values.weeks}
                                onChange={(event) => updateValue('weeks', Number(event.target.value))}
                                required
                              />
                              <span>weeks</span>
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="lp-calculator-maintain-note">
                          We will calculate the estimated calories needed to maintain your current weight.
                        </div>
                      )}
                    </fieldset>
                  ) : null}

                  {error ? <p className="lp-calculator-error" role="alert">{error}</p> : null}

                  <div className="lp-calculator-form-actions">
                    {step > 1 ? (
                      <button type="button" className="lp-calculator-back" onClick={() => setStep((current) => current - 1)}>
                        Back
                      </button>
                    ) : <span />}
                    <button type="submit" className="lp-calculator-next">
                      {step === 3 ? 'Calculate my calories' : 'Continue'}
                    </button>
                  </div>
                </form>
              ) : (
                <section className="lp-calculator-results" aria-live="polite">
                  <div className="lp-calculator-result-hero">
                    <p>Your estimated daily calorie target</p>
                    <strong>{formatNumber(results.dailyTarget)}</strong>
                    <span>calories per day</span>
                    <small>
                      For weight {goalLabel(values.goal)} based on your current entries
                    </small>
                  </div>

                  <div className="lp-calculator-result-grid">
                    <article>
                      <span>Maintenance calories</span>
                      <strong>{formatNumber(results.maintenance)}</strong>
                      <small>Estimated TDEE per day</small>
                    </article>
                    <article>
                      <span>Resting calories</span>
                      <strong>{formatNumber(results.bmr)}</strong>
                      <small>Estimated BMR per day</small>
                    </article>
                    <article>
                      <span>Daily adjustment</span>
                      <strong>
                        {results.dailyAdjustment > 0 ? '+' : ''}{formatNumber(results.dailyAdjustment)}
                      </strong>
                      <small>{values.goal === 'maintain' ? 'No planned adjustment' : `Calorie ${values.goal === 'lose' ? 'deficit' : 'surplus'}`}</small>
                    </article>
                    <article>
                      <span>{values.goal === 'maintain' ? 'Activity level' : 'Goal date'}</span>
                      <strong className="lp-calculator-result-text">
                        {values.goal === 'maintain'
                          ? results.activity.label
                          : results.goalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </strong>
                      <small>
                        {values.goal === 'maintain'
                          ? `${results.activity.multiplier} activity factor`
                          : `${round(results.requestedWeeklyLb, 1)} lb per week requested`}
                      </small>
                    </article>
                  </div>

                  {results.timelineNeedsReview ? (
                    <div className="lp-calculator-warning" role="status">
                      <strong>Your timeline needs more room.</strong>
                      <p>
                        This goal requests a faster pace than the commonly cited gradual range of 1-2 lb per week
                        or would push the estimate below 1,000 calories. Extend your timeline before using this as a plan.
                        {results.gradualRange
                          ? ` A gradual range for this weight change is roughly ${results.gradualRange.fastest}-${results.gradualRange.slowest} weeks.`
                          : ''}
                      </p>
                    </div>
                  ) : (
                    <div className="lp-calculator-summary">
                      <strong>What this estimate means</strong>
                      <p>
                        Start near this average, track your weight trend for two to four weeks, and adjust based on real results.
                        Water, sleep, training, medication, and normal metabolic variation can change the outcome.
                      </p>
                    </div>
                  )}

                  <div className="lp-calculator-result-actions">
                    <button type="button" className="lp-calculator-back" onClick={() => setStep(3)}>
                      Edit goal
                    </button>
                    <button type="button" className="lp-calculator-reset" onClick={resetCalculator}>
                      Start over
                    </button>
                    <a href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer" className="lp-calculator-next">
                      Track it in Calkilo
                    </a>
                  </div>
                </section>
              )}

              <p className="lp-calculator-disclaimer">
                For adults 18+. Not for pregnancy or breastfeeding. This is an educational estimate, not medical advice.
                Calorie needs can differ because of health conditions, medications, body composition, and training load.
              </p>
            </div>
          </div>
        </section>

        <section className="lp-section lp-calculator-content-section">
          <div className="lp-container lp-calculator-content-wrap">
            <section className="lp-calculator-intro-card">
              <div>
                <p className="lp-calculator-eyebrow">Daily calorie needs explained</p>
                <h2>How many calories should I eat a day?</h2>
              </div>
              <p>
                There is no single daily calorie number that works for everyone. A useful estimate starts with
                your resting energy expenditure, then accounts for physical activity and your goal. This page
                works as a calorie calculator, TDEE calculator, calorie deficit calculator, and weight goal
                timeline calculator in one guided flow.
              </p>
            </section>

            <section className="lp-calculator-info-grid" aria-label="How the calorie calculator works">
              <article>
                <span>01</span>
                <h2>Estimate BMR</h2>
                <p>
                  The Mifflin-St Jeor equation uses current weight, height, age, and sex to estimate resting
                  energy expenditure. BMR is not a daily eating target by itself.
                </p>
              </article>
              <article>
                <span>02</span>
                <h2>Estimate TDEE</h2>
                <p>
                  Your activity selection applies a standard multiplier to BMR. The result is estimated total
                  daily energy expenditure, often called maintenance calories.
                </p>
              </article>
              <article>
                <span>03</span>
                <h2>Adjust for your goal date</h2>
                <p>
                  The calculator spreads the requested weight change across your timeline to estimate a daily
                  calorie deficit or surplus and flag an overly aggressive weight-loss pace.
                </p>
              </article>
            </section>

            <section className="lp-calculator-content-card lp-calculator-two-column">
              <div>
                <p className="lp-calculator-eyebrow">Calorie deficit calculator</p>
                <h2>Calories to lose weight safely and steadily</h2>
                <p>
                  Weight loss requires an average energy deficit, but a shorter goal timeline is not always a
                  better plan. The CDC notes that people who lose weight gradually, around 1 to 2 pounds per
                  week, are more likely to keep it off than people who lose weight faster.
                </p>
                <p>
                  If your result shows a timeline warning, add more weeks, choose a smaller first target, or
                  discuss the goal with a registered dietitian or clinician. A calculator cannot account for
                  every health factor or predict a perfectly linear weight change.
                </p>
              </div>
              <div className="lp-calculator-callout">
                <strong>Use the number as a starting point</strong>
                <p>Track a two-to-four-week trend before making a small adjustment.</p>
                <Link href="/ai-calorie-tracker/">See how AI calorie tracking works</Link>
              </div>
            </section>

            <section className="lp-calculator-content-card">
              <p className="lp-calculator-eyebrow">Activity level guide</p>
              <h2>Choose an activity level that reflects a normal week</h2>
              <div className="lp-calculator-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Activity level</th>
                      <th>Typical pattern</th>
                      <th>Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ACTIVITY_OPTIONS.map((option) => (
                      <tr key={option.value}>
                        <th scope="row">{option.label}</th>
                        <td>{option.description}</td>
                        <td>{option.multiplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="lp-calculator-table-note">
                Activity multipliers are broad estimates. If your work and workouts vary, start with the lower
                reasonable level and compare the estimate with your real weight trend.
              </p>
            </section>

            <section className="lp-calculator-content-card">
              <p className="lp-calculator-eyebrow">Method and sources</p>
              <h2>What this calculator is based on</h2>
              <div className="lp-calculator-source-grid">
                <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noreferrer">
                  <strong>Mifflin-St Jeor research</strong>
                  <span>Original resting energy expenditure equation published in 1990</span>
                </a>
                <a href="https://www.niddk.nih.gov/bwp" target="_blank" rel="noreferrer">
                  <strong>NIDDK Body Weight Planner</strong>
                  <span>Government guidance on weight, activity, goal dates, and calorie planning</span>
                </a>
                <a href="https://www.cdc.gov/healthy-weight-growth/losing-weight/index.html" target="_blank" rel="noreferrer">
                  <strong>CDC weight-loss guidance</strong>
                  <span>Gradual goals, realistic timelines, and healthy weight habits</span>
                </a>
              </div>
            </section>

            <section className="lp-calculator-content-card">
              <p className="lp-calculator-eyebrow">Calorie calculator FAQ</p>
              <h2>Questions about daily calories, TDEE, and goal timelines</h2>
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
                <p className="lp-calculator-eyebrow">Turn the estimate into a daily habit</p>
                <h2>Track calories, meals, and macros with Calkilo</h2>
                <p>
                  A calorie target only becomes useful when you can follow it consistently. Log meals from
                  photos, review calories and macros, and watch your progress over time in the Calkilo app.
                </p>
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
          </div>
        </section>
      </main>

      <SiteFooter
        copyright={`© ${new Date().getFullYear()} Calkilo. All rights reserved.`}
        description="Revolutionizing nutrition tracking with AI-powered calorie calculation."
        homeAriaLabel="Calkilo home"
        homeHref="/"
        sections={footerSections}
        socialLinksLabel="Social links"
      />
    </div>
  )
}
