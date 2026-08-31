export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://calkilo.com').replace(/\/+$/u, '')

export const SITE_LANGUAGES = ['en', 'nl', 'ru', 'zh', 'ar', 'fa', 'it']

const localizedCorePaths = [
  '/',
  '/contact/',
  '/account-deletion/',
  '/privacy-policy/',
  '/terms-of-service/',
  '/terms-and-conditions/',
]

function localize(path, language) {
  if (language === 'en') return path
  return path === '/' ? `/${language}/` : `/${language}${path}`
}

const englishProductPages = [
  '/features/',
  '/pricing/',
  '/ai-calorie-tracker/',
  '/calorie-calculator/',
  '/bmi-calculator/',
  '/photo-calorie-calculator/',
  '/macro-tracker/',
  '/faq/',
  '/about/',
  '/best-calorie-counter-for-persian-food/',
  '/ai-meal-planner-for-weight-loss/',
  '/calkilo-vs-myfitnesspal/',
  '/uber-eats-nutrition-calculator/',
]

const persianPages = [
  '/fa/ai-calorie-tracker/',
  '/fa/photo-calorie-calculator/',
  '/fa/calorie-counter-with-photo/',
  '/fa/free-photo-calorie-calculator/',
  '/fa/ai-calorie-calculator/',
  '/fa/food-calorie-scanner/',
  '/fa/calories/pizza/',
  '/fa/calories/hamburger/',
  '/fa/calories/kebab/',
  '/fa/calories/rice/',
  '/fa/calories/falafel/',
  '/fa/examples/pizza-scan/',
  '/fa/examples/kebab-scan/',
  '/fa/examples/burger-scan/',
  '/fa/macro-tracker/',
]

const italianPages = [
  '/it/ai-calorie-tracker/',
  '/it/photo-calorie-calculator/',
  '/it/calcolo-calorie-con-foto-gratis/',
  '/it/intelligenza-artificiale-calorie/',
]

export const STATIC_INDEXABLE_PATHS = Array.from(new Set([
  ...SITE_LANGUAGES.flatMap((language) => localizedCorePaths.map((path) => localize(path, language))),
  ...englishProductPages,
  ...persianPages,
  ...italianPages,
]))

export const LLMS_SECTIONS = [
  {
    title: 'Official product pages',
    links: [
      ['Home', '/', 'Overview of the Calkilo nutrition app and its photo-first food logging workflow.'],
      ['About Calkilo', '/about/', 'Product purpose, audience, workflow, and important limitations.'],
      ['Features', '/features/', 'Photo calorie estimates, macro tracking, meal planning, and integrations.'],
      ['Pricing', '/pricing/', 'Current monthly and yearly premium plans.'],
      ['FAQ', '/faq/', 'Subscriptions, privacy, device sync, AI food logging, and support.'],
      ['Blog', '/blog/', 'Localized nutrition and product education articles.'],
    ],
  },
  {
    title: 'Calculators and tools',
    links: [
      ['Daily calorie calculator', '/calorie-calculator/', 'Estimate daily calories, TDEE, and a weight-goal timeline.'],
      ['BMI calculator', '/bmi-calculator/', 'Calculate adult BMI and understand the limits of the measurement.'],
      ['Photo calorie calculator', '/photo-calorie-calculator/', 'How to estimate meal calories and macros from a food photo.'],
      ['Uber Eats nutrition calculator', '/uber-eats-nutrition-calculator/', 'Estimate nutrition from an Uber Eats menu-item URL.'],
    ],
  },
  {
    title: 'Product guides',
    links: [
      ['AI calorie tracker', '/ai-calorie-tracker/', 'Calkilo AI-assisted food logging and nutrition tracking.'],
      ['Macro tracker', '/macro-tracker/', 'Track protein, carbohydrates, fat, and calories together.'],
      ['AI meal planner for weight loss', '/ai-meal-planner-for-weight-loss/', 'Connect targets, meal logging, and practical planning.'],
      ['Calorie counter for Persian food', '/best-calorie-counter-for-persian-food/', 'Tracking Iranian mixed dishes and portions.'],
      ['Calkilo vs MyFitnessPal', '/calkilo-vs-myfitnesspal/', 'A workflow-focused comparison with explicit estimate limitations.'],
    ],
  },
  {
    title: 'Persian resources',
    links: [
      ['Persian homepage', '/fa/', 'Persian-language product overview.'],
      ['Persian photo calorie calculator', '/fa/photo-calorie-calculator/', 'Persian guide to photo calorie estimation.'],
      ['Persian AI calorie calculator', '/fa/ai-calorie-calculator/', 'How AI creates an editable nutrition estimate.'],
      ['Persian food calorie scanner', '/fa/food-calorie-scanner/', 'Food-camera workflow and its limitations.'],
      ['Kebab calorie example', '/fa/calories/kebab/', 'Example nutrition ranges and portion factors for kebab.'],
      ['Rice calorie example', '/fa/calories/rice/', 'Example nutrition ranges and portion factors for rice.'],
    ],
  },
  {
    title: 'Support and policies',
    links: [
      ['Contact support', '/contact/', 'Product, billing, and privacy support.'],
      ['Account deletion', '/account-deletion/', 'How to request account and data deletion.'],
      ['Privacy policy', '/privacy-policy/', 'How Calkilo processes personal and AI-feature data.'],
      ['Terms of service', '/terms-of-service/', 'Terms governing use of Calkilo.'],
    ],
  },
]

export function absoluteUrl(path) {
  return `${SITE_URL}${path}`
}

