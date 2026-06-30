import { useRouter } from 'next/router'
import { type CSSProperties, type FormEvent, type ReactNode, useState } from 'react'
import { RESOURCE_LINKS } from '../lib/resource-pages'
import {
  LANGUAGE_DISPLAY_FONT_FAMILIES,
  LANGUAGE_FONT_FAMILIES,
  type SiteLanguage,
} from '../lib/site-language'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import SeoHead from './SeoHead'

const API_BASE_URL = 'https://api.calkilo.com'
const ANALYZE_ENDPOINT = `${API_BASE_URL}/food-page-analyze/`
const LANGUAGE: SiteLanguage = 'en'

const ACCESS_TOKEN_STORAGE_KEYS = [
  'access_token',
  'accessToken',
  'jwt_access_token',
  'jwtAccessToken',
  'calkilo_access_token',
  'calkiloAccessToken',
  'CALKILO_ACCESS_TOKEN',
  'auth_token',
  'authToken',
  'jwt',
  'token',
] as const

const TOKEN_OBJECT_FIELDS = [
  'access_token',
  'accessToken',
  'access',
  'jwt_access_token',
  'jwtAccessToken',
  'jwt',
  'token',
] as const

interface MealType {
  key?: string
  string?: string
}

interface MacroSummary {
  calories?: number | string | null
  health_score?: string | null
  protein?: string | null
  carbs?: string | null
  fat?: string | null
  [key: string]: unknown
}

interface FoodListItem {
  id?: string
  name?: string
  calories?: number | string | null
  [key: string]: unknown
}

interface NutritionFact {
  name?: string
  value?: string | number | boolean | null
  bold?: boolean
  [key: string]: unknown
}

interface SourcePage {
  url?: string
  title?: string
  description?: string
  image_url?: string
  used_image_url?: string
  source_type?: string
  restaurant_name?: string
  price?: string | number | null
  item_uuid?: string
  item_uuids?: string[]
  options?: unknown
  customizations?: unknown
  [key: string]: unknown
}

interface FoodPageAnalysisResponse {
  status?: string
  meal_type?: MealType | null
  quantity?: number | string | null
  unit?: string | null
  name?: string | null
  summary?: MacroSummary | null
  food_list?: FoodListItem[] | null
  nutrition_facts?: NutritionFact[] | null
  source_page?: SourcePage | null
  meal?: unknown
  coins_charged?: number | string | null
  coin_balance?: number | string | null
  message?: unknown
  details?: unknown
  [key: string]: unknown
}

interface ApiErrorState {
  title: string
  message: string
  details?: unknown
}

type JsonLdSchema = Record<string, unknown>

export interface FoodPageAnalyzerScreenProps {
  path: string
  seoTitle: string
  seoDescription: string
  keywords?: ReadonlyArray<string>
  jsonLd?: JsonLdSchema | ReadonlyArray<JsonLdSchema>
  noindex?: boolean
  nofollow?: boolean
  kicker: string
  heading: string
  intro?: string
  inputLabel: string
  placeholder: string
  emptyTitle: string
  emptyDescription: string
  validateUrl?: (rawUrl: string) => string | undefined
  requireAuth?: boolean
  authMessage?: string
  saveMealWhenAuthenticated?: boolean
  saveMealWhenAnonymous?: boolean
  footerDescription?: string
  children?: ReactNode
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function looksLikeJwt(value: string) {
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(value)
}

function cleanTokenCandidate(value: string) {
  const trimmed = value.trim()
  return trimmed.replace(/^Bearer\s+/i, '').trim()
}

function findTokenInParsedValue(value: unknown, depth = 0): string | undefined {
  if (depth > 4) {
    return undefined
  }

  if (typeof value === 'string') {
    const candidate = cleanTokenCandidate(value)
    return looksLikeJwt(candidate) ? candidate : undefined
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const candidate = findTokenInParsedValue(item, depth + 1)
      if (candidate) {
        return candidate
      }
    }
    return undefined
  }

  if (!isRecord(value)) {
    return undefined
  }

  for (const field of TOKEN_OBJECT_FIELDS) {
    const fieldValue = value[field]
    if (typeof fieldValue === 'string') {
      const candidate = cleanTokenCandidate(fieldValue)
      if (looksLikeJwt(candidate)) {
        return candidate
      }
    }
  }

  for (const [fieldName, fieldValue] of Object.entries(value)) {
    if (/refresh|id_token|idToken/i.test(fieldName)) {
      continue
    }

    const candidate = findTokenInParsedValue(fieldValue, depth + 1)
    if (candidate) {
      return candidate
    }
  }

  return undefined
}

function extractAccessToken(rawValue: string | null | undefined): string | undefined {
  if (!rawValue) {
    return undefined
  }

  const directCandidate = cleanTokenCandidate(rawValue)
  if (looksLikeJwt(directCandidate)) {
    return directCandidate
  }

  try {
    return findTokenInParsedValue(JSON.parse(rawValue))
  } catch {
    return undefined
  }
}

function findTokenInStorage(storage: Storage) {
  for (const key of ACCESS_TOKEN_STORAGE_KEYS) {
    const token = extractAccessToken(storage.getItem(key))
    if (token) {
      return token
    }
  }

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index)
    if (!key || !/(calkilo|auth|token|jwt)/i.test(key)) {
      continue
    }

    const token = extractAccessToken(storage.getItem(key))
    if (token) {
      return token
    }
  }

  return undefined
}

function readCookieToken() {
  if (typeof document === 'undefined') {
    return undefined
  }

  const cookies = document.cookie.split(';')

  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split('=')
    if (!name || !ACCESS_TOKEN_STORAGE_KEYS.includes(name as (typeof ACCESS_TOKEN_STORAGE_KEYS)[number])) {
      continue
    }

    const token = extractAccessToken(decodeURIComponent(valueParts.join('=')))
    if (token) {
      return token
    }
  }

  return undefined
}

function readAccessTokenFromBrowser() {
  if (typeof window === 'undefined') {
    return undefined
  }

  const storageSources = [window.localStorage, window.sessionStorage]

  for (const storage of storageSources) {
    try {
      const token = findTokenInStorage(storage)
      if (token) {
        return token
      }
    } catch {
      // Storage may be unavailable in strict privacy modes.
    }
  }

  return readCookieToken()
}

function formatScalar(value: unknown, fallback = 'Not returned') {
  if (value === null || typeof value === 'undefined' || value === '') {
    return fallback
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return JSON.stringify(value)
}

function formatCalories(value: unknown) {
  if (value === null || typeof value === 'undefined' || value === '') {
    return 'Not returned'
  }

  if (typeof value === 'string' && /cal|kcal/i.test(value)) {
    return value
  }

  return `${formatScalar(value)} kcal`
}

function formatDetails(details: unknown) {
  if (details === null || typeof details === 'undefined' || details === '') {
    return undefined
  }

  if (typeof details === 'string') {
    return details
  }

  try {
    return JSON.stringify(details, null, 2)
  } catch {
    return String(details)
  }
}

function getBackendText(payload: unknown, key: string) {
  if (!isRecord(payload)) {
    return undefined
  }

  const value = payload[key]

  if (typeof value === 'string') {
    return value
  }

  if (value === null || typeof value === 'undefined') {
    return undefined
  }

  return formatScalar(value)
}

function getBackendDetails(payload: unknown) {
  if (!isRecord(payload)) {
    return undefined
  }

  return payload.details ?? payload.detail
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}

function buildApiError(response: Response, payload: unknown): ApiErrorState {
  const message =
    getBackendText(payload, 'message') ||
    getBackendText(payload, 'error') ||
    getBackendText(payload, 'detail') ||
    (response.status === 402
      ? 'You do not have enough coins to analyze this page.'
      : response.statusText || 'The request failed.')

  return {
    title: response.status === 402 ? 'Insufficient coins' : 'Analysis failed',
    message,
    details: getBackendDetails(payload),
  }
}

function getMealTypeLabel(mealType?: MealType | null) {
  return mealType?.string || mealType?.key || 'Not returned'
}

function hasSourcePage(sourcePage?: SourcePage | null) {
  return Boolean(
    sourcePage &&
      (sourcePage.title ||
        sourcePage.description ||
        sourcePage.image_url ||
        sourcePage.used_image_url ||
        sourcePage.url ||
        sourcePage.restaurant_name ||
        sourcePage.price ||
        sourcePage.item_uuid ||
        sourcePage.source_type),
  )
}

function hasMealData(meal: unknown) {
  return meal !== null && typeof meal !== 'undefined'
}

function isSuccessPayload(payload: unknown): payload is FoodPageAnalysisResponse {
  return isRecord(payload)
}

function defaultValidateUrl(rawUrl: string) {
  const trimmedUrl = rawUrl.trim()

  if (!trimmedUrl) {
    return 'Enter a restaurant or food page URL.'
  }

  if (!/^https?:\/\//i.test(trimmedUrl)) {
    return 'Enter a URL that starts with http:// or https://.'
  }

  try {
    new URL(trimmedUrl)
  } catch {
    return 'Enter a valid URL.'
  }

  return undefined
}

function SourceMetadata({ sourcePage }: { sourcePage: SourcePage }) {
  const itemUuid = sourcePage.item_uuid || sourcePage.item_uuids?.[0]
  const rows = [
    { label: 'Source', value: sourcePage.source_type },
    { label: 'Restaurant', value: sourcePage.restaurant_name },
    { label: 'Price', value: sourcePage.price },
    { label: 'Item UUID', value: itemUuid },
  ].filter((row) => row.value !== null && typeof row.value !== 'undefined' && row.value !== '')

  if (rows.length === 0) {
    return null
  }

  return (
    <dl className="fp-source-meta">
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>{formatScalar(row.value)}</dd>
        </div>
      ))}
    </dl>
  )
}

function SourceOptionDetails({ sourcePage }: { sourcePage: SourcePage }) {
  const optionDetails = sourcePage.customizations ?? sourcePage.options
  const formattedDetails = formatDetails(optionDetails)

  if (!formattedDetails) {
    return null
  }

  return (
    <section className="fp-card fp-source-card" aria-label="Source options and customizations">
      <div className="fp-card-head">
        <p className="lp-kicker">Options</p>
        <h2>Visible customizations</h2>
      </div>
      <pre className="fp-json">{formattedDetails}</pre>
    </section>
  )
}

function FoodPageAnalysisResult({ result }: { result: FoodPageAnalysisResponse }) {
  const summary = result.summary ?? {}
  const sourcePage = result.source_page ?? null
  const sourceImageUrl = sourcePage?.used_image_url || sourcePage?.image_url
  const foodItems = result.food_list ?? []
  const nutritionFacts = result.nutrition_facts ?? []
  const returnedCoinData =
    typeof result.coins_charged !== 'undefined' || typeof result.coin_balance !== 'undefined'

  return (
    <>
      <section className="fp-card fp-summary-card" aria-label="Analysis summary">
        <div className="fp-card-head">
          <p className="lp-kicker">Food</p>
          <h2>{formatScalar(result.name, 'Unnamed food')}</h2>
        </div>

        <dl className="fp-stat-grid">
          <div>
            <dt>Meal type</dt>
            <dd>{getMealTypeLabel(result.meal_type)}</dd>
          </div>
          <div>
            <dt>Quantity</dt>
            <dd>
              {formatScalar(result.quantity)}
              {result.unit ? ` ${result.unit}` : ''}
            </dd>
          </div>
          <div>
            <dt>Calories</dt>
            <dd>{formatCalories(summary.calories)}</dd>
          </div>
          <div>
            <dt>Health score</dt>
            <dd>{formatScalar(summary.health_score)}</dd>
          </div>
        </dl>
      </section>

      <section className="fp-card" aria-label="Macro summary">
        <div className="fp-card-head">
          <p className="lp-kicker">Macros</p>
          <h2>Protein, carbs, and fat</h2>
        </div>

        <dl className="fp-macro-grid">
          <div>
            <dt>Protein</dt>
            <dd>{formatScalar(summary.protein)}</dd>
          </div>
          <div>
            <dt>Carbs</dt>
            <dd>{formatScalar(summary.carbs)}</dd>
          </div>
          <div>
            <dt>Fat</dt>
            <dd>{formatScalar(summary.fat)}</dd>
          </div>
        </dl>
      </section>

      {sourcePage && hasSourcePage(sourcePage) ? (
        <section className="fp-card fp-source-card" aria-label="Source page">
          <div className="fp-card-head">
            <p className="lp-kicker">Source page</p>
            <h2>{sourcePage?.title || 'Returned page metadata'}</h2>
          </div>

          <div className="fp-source-layout">
            {sourceImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sourceImageUrl} alt={sourcePage?.title || result.name || 'Source page food'} />
            ) : null}
            <div className="fp-source-copy">
              <SourceMetadata sourcePage={sourcePage} />
              {sourcePage?.description ? <p>{sourcePage.description}</p> : null}
              {sourcePage?.url ? (
                <a href={sourcePage.url} target="_blank" rel="noreferrer">
                  Open source URL
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {sourcePage ? <SourceOptionDetails sourcePage={sourcePage} /> : null}

      {foodItems.length > 0 ? (
        <section className="fp-card" aria-label="Food list">
          <div className="fp-card-head">
            <p className="lp-kicker">Food list</p>
            <h2>Returned items</h2>
          </div>

          <ul className="fp-row-list">
            {foodItems.map((item, index) => (
              <li key={item.id || `${item.name || 'food'}-${index}`}>
                <span>{formatScalar(item.name, 'Unnamed item')}</span>
                <strong>{formatCalories(item.calories)}</strong>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {nutritionFacts.length > 0 ? (
        <section className="fp-card" aria-label="Nutrition facts">
          <div className="fp-card-head">
            <p className="lp-kicker">Nutrition facts</p>
            <h2>Additional nutrients</h2>
          </div>

          <ul className="fp-row-list fp-row-list--facts">
            {nutritionFacts.map((fact, index) => (
              <li key={`${fact.name || 'fact'}-${index}`}>
                <span className={fact.bold ? 'is-bold' : undefined}>{formatScalar(fact.name, 'Nutrient')}</span>
                <strong>{formatScalar(fact.value)}</strong>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {hasMealData(result.meal) ? (
        <section className="fp-card" aria-label="Saved meal data">
          <div className="fp-card-head">
            <p className="lp-kicker">Saved meal</p>
            <h2>Meal data</h2>
          </div>
          <pre className="fp-json">{formatDetails(result.meal)}</pre>
        </section>
      ) : null}

      {returnedCoinData ? (
        <section className="fp-card fp-coin-card" aria-label="Coin usage">
          <dl className="fp-stat-grid">
            <div>
              <dt>Coins charged</dt>
              <dd>{formatScalar(result.coins_charged)}</dd>
            </div>
            <div>
              <dt>Coin balance</dt>
              <dd>{formatScalar(result.coin_balance)}</dd>
            </div>
          </dl>
        </section>
      ) : null}
    </>
  )
}

export default function FoodPageAnalyzerScreen({
  path,
  seoTitle,
  seoDescription,
  keywords,
  jsonLd,
  noindex,
  nofollow,
  kicker,
  heading,
  intro,
  inputLabel,
  placeholder,
  emptyTitle,
  emptyDescription,
  validateUrl = defaultValidateUrl,
  requireAuth = true,
  authMessage = 'Sign in to Calkilo in this browser before analyzing a food page.',
  saveMealWhenAuthenticated = true,
  saveMealWhenAnonymous = false,
  footerDescription = 'AI-powered calorie and nutrition tracking for real meals.',
  children,
}: FoodPageAnalyzerScreenProps) {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<FoodPageAnalysisResponse | null>(null)
  const [error, setError] = useState<ApiErrorState | null>(null)

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '/features/' },
        { label: 'Pricing', href: '/pricing/' },
        { label: 'Contact', href: '/contact/' },
      ],
    },
    {
      title: 'Guides',
      links: RESOURCE_LINKS.slice(0, 4).map((link) => ({ label: link.label, href: link.href })),
    },
    {
      title: 'Support',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy/' },
        { label: 'Terms of Service', href: '/terms-of-service/' },
        { label: 'Account Deletion', href: '/account-deletion/' },
        { label: 'FAQ', href: '/faq/' },
      ],
    },
  ] as const

  const handleLanguageChange = (nextLanguage: SiteLanguage) => {
    if (nextLanguage === LANGUAGE) {
      return
    }

    void router.push(nextLanguage === 'en' ? path : `/${nextLanguage}/`)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationError = validateUrl(url)

    if (validationError) {
      setResult(null)
      setError({ title: 'Invalid URL', message: validationError })
      return
    }

    const accessToken = readAccessTokenFromBrowser()

    if (requireAuth && !accessToken) {
      setResult(null)
      setError({
        title: 'Authentication required',
        message: authMessage,
      })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
      }

      const response = await fetch(ANALYZE_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          url: url.trim(),
          save_meal: accessToken ? saveMealWhenAuthenticated : saveMealWhenAnonymous,
        }),
      })

      const payload = await readResponsePayload(response)

      if (!response.ok) {
        setResult(null)
        setError(buildApiError(response, payload))
        return
      }

      if (!isSuccessPayload(payload)) {
        setResult(null)
        setError({
          title: 'Analysis failed',
          message: 'The API returned an unexpected response.',
          details: payload,
        })
        return
      }

      if (payload.status && payload.status !== 'success') {
        setResult(null)
        setError({
          title: 'Analysis failed',
          message:
            getBackendText(payload, 'message') ||
            getBackendText(payload, 'error') ||
            getBackendText(payload, 'detail') ||
            'The backend did not return a successful analysis.',
          details: getBackendDetails(payload),
        })
        return
      }

      setResult(payload)
    } catch (requestError) {
      setResult(null)
      setError({
        title: 'Analysis failed',
        message: requestError instanceof Error ? requestError.message : 'Unable to analyze this food page.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="lp-page lp-page--light fp-page"
      dir="ltr"
      lang={LANGUAGE}
      style={
        {
          '--lp-language-font': LANGUAGE_FONT_FAMILIES[LANGUAGE],
          '--lp-display-font': LANGUAGE_DISPLAY_FONT_FAMILIES[LANGUAGE],
        } as CSSProperties
      }
    >
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path={path}
        keywords={keywords}
        jsonLd={jsonLd}
        noindex={noindex}
        nofollow={nofollow}
      />

      <SiteHeader
        ctaHref="/#download"
        ctaLabel="Try for free"
        homeAriaLabel="Calkilo home"
        homeHref="/"
        language={LANGUAGE}
        languageLabel="Language"
        navAriaLabel="Main navigation"
        navItems={[
          { key: 'home', href: '/', label: 'Home' },
          { key: 'features', href: '/features/', label: 'Features' },
          { key: 'pricing', href: '/pricing/', label: 'Pricing' },
          { key: 'contact', href: '/contact/', label: 'Contact' },
        ]}
        onLanguageChange={handleLanguageChange}
      />

      <main className="fp-main">
        <section className="lp-section fp-workspace">
          <div className="lp-container fp-stack">
            <section className="fp-tool-panel">
              <div className="fp-tool-copy">
                <p className="lp-kicker">{kicker}</p>
                <h1>{heading}</h1>
                {intro ? <p>{intro}</p> : null}
              </div>

              <form className="fp-form" onSubmit={handleSubmit} noValidate>
                <label className="fp-field" htmlFor="food-page-url">
                  <span>{inputLabel}</span>
                  <input
                    id="food-page-url"
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    placeholder={placeholder}
                    value={url}
                    disabled={isLoading}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </label>

                <button className="fp-submit" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="fp-spinner" aria-hidden="true" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze'
                  )}
                </button>
              </form>
            </section>

            {error ? (
              <section className="fp-alert" role="alert" aria-live="polite">
                <h2>{error.title}</h2>
                <p>{error.message}</p>
                {formatDetails(error.details) ? <pre>{formatDetails(error.details)}</pre> : null}
              </section>
            ) : null}

            {result ? (
              <div className="fp-result-grid" aria-live="polite">
                <FoodPageAnalysisResult result={result} />
              </div>
            ) : (
              <section className="fp-card fp-empty-state" aria-live="polite">
                <p className="lp-kicker">Result</p>
                <h2>{emptyTitle}</h2>
                <p>{emptyDescription}</p>
              </section>
            )}
          </div>
        </section>

        {children ? (
          <section className="lp-section fp-seo-content">
            <div className="lp-container fp-stack">{children}</div>
          </section>
        ) : null}
      </main>

      <SiteFooter
        copyright={`Copyright ${new Date().getFullYear()} Calkilo. All rights reserved.`}
        description={footerDescription}
        homeAriaLabel="Calkilo home"
        homeHref="/"
        sections={footerSections}
        socialLinksLabel="Social links"
      />

      <style jsx>{`
        .fp-page {
          --fp-danger: #b42318;
          --fp-danger-bg: #fff4f2;
          --fp-success-bg: #effaf3;
          min-height: 100vh;
        }

        .fp-main {
          min-height: 60vh;
        }

        .fp-workspace {
          padding-top: 36px;
        }

        .fp-seo-content {
          padding-top: 0;
        }

        .fp-stack {
          display: grid;
          gap: 16px;
        }

        .fp-tool-panel {
          align-items: end;
          background: var(--lp-card);
          border: 1px solid var(--lp-border);
          border-radius: 22px;
          box-shadow: var(--lp-shadow);
          display: grid;
          gap: 24px;
          grid-template-columns: minmax(260px, 0.72fr) minmax(320px, 1fr);
          padding: clamp(18px, 3vw, 30px);
        }

        .fp-tool-copy h1 {
          font-family: var(--lp-display-font);
          font-size: clamp(2rem, 3vw, 3rem);
          line-height: 1.08;
          margin: 0;
        }

        .fp-tool-copy > p:not(.lp-kicker) {
          color: var(--lp-muted);
          font-size: 1rem;
          line-height: 1.55;
          margin: 12px 0 0;
          max-width: 660px;
        }

        .fp-form {
          align-items: end;
          display: grid;
          gap: 12px;
          grid-template-columns: minmax(0, 1fr) auto;
        }

        .fp-field {
          color: var(--lp-muted);
          display: grid;
          font-size: 0.86rem;
          font-weight: 700;
          gap: 8px;
        }

        .fp-field input {
          background: var(--lp-surface-soft);
          border: 1px solid var(--lp-border);
          border-radius: 14px;
          color: var(--lp-text);
          font-size: 1rem;
          min-height: 54px;
          outline: 0;
          padding: 14px 16px;
          width: 100%;
        }

        .fp-field input:focus {
          border-color: rgba(0, 212, 72, 0.48);
          box-shadow: 0 0 0 3px rgba(0, 212, 72, 0.15);
        }

        .fp-field input:disabled {
          cursor: wait;
          opacity: 0.72;
        }

        .fp-submit {
          align-items: center;
          background: linear-gradient(180deg, var(--lp-accent) 0%, var(--lp-accent-dark) 100%);
          border: 0;
          border-radius: 14px;
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          font-family: var(--lp-display-font);
          font-size: 1rem;
          font-weight: 800;
          gap: 10px;
          justify-content: center;
          min-height: 54px;
          min-width: 136px;
          padding: 14px 22px;
        }

        .fp-submit:disabled {
          cursor: wait;
          opacity: 0.72;
        }

        .fp-spinner {
          animation: fpSpin 0.8s linear infinite;
          border: 2px solid rgba(255, 255, 255, 0.42);
          border-top-color: #fff;
          border-radius: 999px;
          display: inline-block;
          height: 16px;
          width: 16px;
        }

        .fp-alert {
          background: var(--fp-danger-bg);
          border: 1px solid rgba(180, 35, 24, 0.24);
          border-radius: 18px;
          color: var(--fp-danger);
          padding: 18px;
        }

        .fp-alert h2 {
          font-family: var(--lp-display-font);
          font-size: 1.2rem;
          margin: 0;
        }

        .fp-alert p {
          font-size: 0.96rem;
          line-height: 1.5;
          margin: 8px 0 0;
        }

        .fp-alert pre,
        .fp-json {
          background: rgba(18, 18, 18, 0.04);
          border: 1px solid var(--lp-border);
          border-radius: 14px;
          color: var(--lp-text);
          font-size: 0.86rem;
          line-height: 1.45;
          margin: 14px 0 0;
          max-height: 360px;
          overflow: auto;
          padding: 14px;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .fp-result-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .fp-card {
          background: var(--lp-card);
          border: 1px solid var(--lp-border);
          border-radius: 22px;
          padding: clamp(18px, 3vw, 26px);
        }

        .fp-summary-card,
        .fp-source-card,
        .fp-empty-state {
          grid-column: 1 / -1;
        }

        .fp-card-head {
          margin-bottom: 18px;
        }

        .fp-card h2 {
          font-family: var(--lp-display-font);
          font-size: clamp(1.35rem, 2vw, 1.85rem);
          line-height: 1.18;
          margin: 0;
        }

        .fp-card p {
          color: var(--lp-muted);
          font-size: 0.97rem;
          line-height: 1.58;
          margin: 10px 0 0;
        }

        .fp-stat-grid,
        .fp-macro-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          margin: 0;
        }

        .fp-stat-grid div,
        .fp-macro-grid div {
          background: var(--lp-surface-soft);
          border: 1px solid var(--lp-border);
          border-radius: 16px;
          min-height: 110px;
          padding: 16px;
        }

        .fp-stat-grid dt,
        .fp-macro-grid dt {
          color: var(--lp-muted);
          font-size: 0.82rem;
          font-weight: 700;
          line-height: 1.35;
          margin: 0 0 10px;
        }

        .fp-stat-grid dd,
        .fp-macro-grid dd {
          color: var(--lp-text);
          font-family: var(--lp-display-font);
          font-size: clamp(1.25rem, 2vw, 1.65rem);
          font-weight: 800;
          line-height: 1.1;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .fp-source-layout {
          align-items: start;
          display: grid;
          gap: 18px;
          grid-template-columns: minmax(180px, 280px) minmax(0, 1fr);
        }

        .fp-source-layout img {
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          object-fit: cover;
          width: 100%;
        }

        .fp-source-copy a {
          color: var(--lp-accent-dark);
          display: inline-flex;
          font-weight: 800;
          margin-top: 14px;
        }

        .fp-source-meta {
          display: grid;
          gap: 8px;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          margin: 0 0 12px;
        }

        .fp-source-meta div {
          background: var(--lp-surface-soft);
          border: 1px solid var(--lp-border);
          border-radius: 14px;
          padding: 12px;
        }

        .fp-source-meta dt {
          color: var(--lp-muted);
          font-size: 0.76rem;
          font-weight: 800;
          margin: 0 0 6px;
        }

        .fp-source-meta dd {
          color: var(--lp-text);
          font-size: 0.9rem;
          font-weight: 800;
          line-height: 1.25;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .fp-row-list {
          display: grid;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .fp-row-list li {
          align-items: center;
          background: var(--lp-surface-soft);
          border: 1px solid var(--lp-border);
          border-radius: 14px;
          display: flex;
          gap: 14px;
          justify-content: space-between;
          min-height: 54px;
          padding: 12px 14px;
        }

        .fp-row-list span {
          color: var(--lp-text);
          font-size: 0.95rem;
          line-height: 1.35;
        }

        .fp-row-list span.is-bold {
          font-weight: 800;
        }

        .fp-row-list strong {
          color: var(--lp-accent-dark);
          flex: 0 0 auto;
          font-size: 0.92rem;
          line-height: 1.35;
        }

        .fp-empty-state {
          min-height: 210px;
        }

        .fp-coin-card {
          background: var(--fp-success-bg);
        }

        @keyframes fpSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 960px) {
          .fp-tool-panel,
          .fp-form,
          .fp-result-grid,
          .fp-source-layout {
            grid-template-columns: minmax(0, 1fr);
          }

          .fp-submit {
            width: 100%;
          }
        }

        @media (max-width: 760px) {
          .fp-workspace {
            padding-top: 24px;
          }

          .fp-tool-panel {
            border-radius: 18px;
          }

          .fp-row-list li {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
