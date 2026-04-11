import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import BrandLogo from '../components/BrandLogo'
import {
  APP_STORE_URL,
  CALKILO_WEB_URL,
  GOOGLE_PLAY_URL,
  buildOpenMealDeepLink,
  detectDevicePlatform,
  getQueryValue,
} from '../lib/app-links'

const APP_OPEN_TIMEOUT_MS = 1600

type RedirectStatus = 'opening' | 'fallback' | 'ready'
type DevicePlatform = 'ios' | 'android' | 'desktop'

function getMealLabel(mealType?: string) {
  switch ((mealType || '').toLowerCase()) {
    case 'breakfast':
      return 'breakfast logging'
    case 'lunch':
      return 'lunch logging'
    case 'dinner':
      return 'dinner logging'
    case 'snack':
      return 'snack logging'
    default:
      return 'meal logging'
  }
}

function getFallbackCopy(platform: DevicePlatform) {
  if (platform === 'ios') {
    return 'If the app does not open, the App Store will open next.'
  }

  if (platform === 'android') {
    return 'If the app does not open, Google Play will open next.'
  }

  return 'Use this link on your phone to open Calkilo, or install the app from the store links below.'
}

export default function OpenMealPage() {
  const router = useRouter()
  const [platform, setPlatform] = useState<DevicePlatform>('desktop')
  const [status, setStatus] = useState<RedirectStatus>('opening')

  const linkQuery = useMemo(() => {
    const mealType =
      getQueryValue(router.query.meal_type) || getQueryValue(router.query.mealType)
    const source = getQueryValue(router.query.source)
    const campaign = getQueryValue(router.query.campaign)

    return {
      meal_type: mealType,
      source,
      campaign,
    }
  }, [router.query])

  const mealLabel = useMemo(
    () => getMealLabel(linkQuery.meal_type),
    [linkQuery.meal_type],
  )

  const deepLink = useMemo(() => buildOpenMealDeepLink(linkQuery), [linkQuery])
  const primaryHref = platform === 'desktop' ? CALKILO_WEB_URL : deepLink
  const primaryLabel = platform === 'desktop' ? 'Go to calkilo.com' : 'Open Calkilo'

  useEffect(() => {
    if (!router.isReady || typeof window === 'undefined') {
      return
    }

    const nextPlatform = detectDevicePlatform(window.navigator.userAgent)
    setPlatform(nextPlatform)

    if (nextPlatform === 'desktop') {
      setStatus('ready')
      return
    }

    const fallbackUrl = nextPlatform === 'ios' ? APP_STORE_URL : GOOGLE_PLAY_URL
    let appOpened = false

    const markAsOpened = () => {
      if (document.visibilityState === 'hidden') {
        appOpened = true
      }
    }

    const openTimer = window.setTimeout(() => {
      window.location.href = deepLink
    }, 120)

    const fallbackTimer = window.setTimeout(() => {
      if (appOpened || document.visibilityState === 'hidden') {
        return
      }

      setStatus('fallback')
      window.location.replace(fallbackUrl)
    }, APP_OPEN_TIMEOUT_MS)

    document.addEventListener('visibilitychange', markAsOpened)
    window.addEventListener('pagehide', markAsOpened)

    return () => {
      window.clearTimeout(openTimer)
      window.clearTimeout(fallbackTimer)
      document.removeEventListener('visibilitychange', markAsOpened)
      window.removeEventListener('pagehide', markAsOpened)
    }
  }, [deepLink, router.isReady])

  const statusText =
    status === 'fallback'
      ? 'Redirecting to the best install option...'
      : platform === 'desktop'
        ? 'Desktop browsers cannot open the mobile app directly.'
        : 'Trying to open the Calkilo app now...'

  return (
    <>
      <Head>
        <title>Open Calkilo Meal Logging</title>
        <meta
          name="description"
          content="Open Calkilo meal logging from your email reminder or install the app."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="lp-page om-page">
        <div className="om-shell">
          <div className="om-orb om-orb--lime" aria-hidden="true" />
          <div className="om-orb om-orb--amber" aria-hidden="true" />
          <section className="om-card">
            <div className="om-brand">
              <BrandLogo />
            </div>
            <span className="om-kicker">Email reminder</span>
            <h1>Opening {mealLabel} in Calkilo</h1>
            <p className="om-copy">
              {getFallbackCopy(platform)}
            </p>
            <div className="om-status" aria-live="polite">
              <span className="om-status-dot" aria-hidden="true" />
              <span>{statusText}</span>
            </div>
            <div className="om-actions">
              <a className="om-btn om-btn--primary" href={primaryHref}>
                {primaryLabel}
              </a>
              <a className="om-btn" href={APP_STORE_URL}>
                iPhone app
              </a>
              <a className="om-btn" href={GOOGLE_PLAY_URL}>
                Android app
              </a>
              <a className="om-btn om-btn--ghost" href={CALKILO_WEB_URL}>
                Go to calkilo.com
              </a>
            </div>
          </section>
        </div>
      </main>
      <style jsx>{`
        .om-page {
          min-height: 100vh;
          position: relative;
        }

        .om-shell {
          align-items: center;
          display: flex;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
          padding: 32px 20px;
          position: relative;
        }

        .om-orb {
          border-radius: 999px;
          filter: blur(14px);
          pointer-events: none;
          position: absolute;
        }

        .om-orb--lime {
          background: rgba(0, 212, 72, 0.22);
          height: 340px;
          left: -80px;
          top: -40px;
          width: 340px;
        }

        .om-orb--amber {
          background: rgba(255, 186, 84, 0.2);
          bottom: -80px;
          height: 280px;
          right: -60px;
          width: 280px;
        }

        .om-card {
          backdrop-filter: blur(18px);
          background:
            radial-gradient(circle at top left, rgba(0, 212, 72, 0.08), transparent 42%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.92));
          border: 1px solid rgba(18, 18, 18, 0.08);
          border-radius: 32px;
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.14);
          max-width: 620px;
          padding: 32px;
          position: relative;
          width: min(100%, 620px);
          z-index: 1;
        }

        .om-brand {
          display: flex;
          justify-content: center;
          margin-bottom: 18px;
        }

        .om-kicker {
          background: rgba(0, 212, 72, 0.1);
          border-radius: 999px;
          color: #04733b;
          display: inline-flex;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 8px 12px;
          text-transform: uppercase;
        }

        h1 {
          color: #111111;
          font-family: var(--lp-display-font);
          font-size: clamp(2rem, 4vw, 3.2rem);
          letter-spacing: -0.04em;
          line-height: 0.96;
          margin: 18px 0 16px;
        }

        .om-copy {
          color: #454545;
          font-size: 1rem;
          line-height: 1.7;
          margin: 0 0 18px;
          max-width: 52ch;
        }

        .om-status {
          align-items: center;
          background: rgba(18, 18, 18, 0.04);
          border-radius: 18px;
          color: #1f1f1f;
          display: inline-flex;
          gap: 12px;
          margin-bottom: 22px;
          padding: 12px 14px;
        }

        .om-status-dot {
          animation: omPulse 1.2s ease-in-out infinite;
          background: #00d448;
          border-radius: 999px;
          display: inline-block;
          height: 10px;
          width: 10px;
        }

        .om-actions {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .om-btn {
          align-items: center;
          background: rgba(18, 18, 18, 0.04);
          border: 1px solid rgba(18, 18, 18, 0.08);
          border-radius: 18px;
          color: #111111;
          display: inline-flex;
          font-size: 0.98rem;
          font-weight: 600;
          justify-content: center;
          min-height: 56px;
          padding: 14px 18px;
          text-align: center;
          transition:
            transform 0.18s ease,
            border-color 0.18s ease,
            background-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .om-btn:hover {
          border-color: rgba(18, 18, 18, 0.16);
          transform: translateY(-1px);
        }

        .om-btn--primary {
          background: linear-gradient(135deg, #00d448, #07a53e);
          border-color: transparent;
          box-shadow: 0 18px 32px rgba(0, 212, 72, 0.22);
          color: #ffffff;
          grid-column: 1 / -1;
        }

        .om-btn--ghost {
          grid-column: 1 / -1;
        }

        @keyframes omPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.45;
            transform: scale(0.84);
          }
        }

        @media (max-width: 640px) {
          .om-card {
            border-radius: 28px;
            padding: 24px;
          }

          .om-actions {
            grid-template-columns: minmax(0, 1fr);
          }

          .om-btn,
          .om-btn--primary,
          .om-btn--ghost {
            grid-column: auto;
          }
        }
      `}</style>
    </>
  )
}
