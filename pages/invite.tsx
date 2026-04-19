import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import SeoHead from '../components/SeoHead'
import {
  APP_STORE_URL,
  CALKILO_WEB_URL,
  GOOGLE_PLAY_URL,
  buildAppDeepLink,
  detectDevicePlatform,
  getQueryValue,
} from '../lib/app-links'

const APP_OPEN_TIMEOUT_MS = 1600

type RedirectStatus = 'opening' | 'fallback' | 'ready'
type DevicePlatform = 'ios' | 'android' | 'desktop'

export default function InvitePage() {
  const router = useRouter()
  const [platform, setPlatform] = useState<DevicePlatform>('desktop')
  const [status, setStatus] = useState<RedirectStatus>('opening')

  const linkQuery = useMemo(() => {
    return {
      code: getQueryValue(router.query.code),
      store: getQueryValue(router.query.store),
      source: getQueryValue(router.query.source),
      campaign: getQueryValue(router.query.campaign),
    }
  }, [router.query.code, router.query.store, router.query.source, router.query.campaign])

  const inviteCode = (linkQuery.code || '').trim().toUpperCase()
  const deepLink = useMemo(() => buildAppDeepLink('invite', linkQuery), [linkQuery])
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
      <SeoHead
        title="Open Calkilo Invite"
        description="Open a Calkilo invite link, install the app, and keep the referral code attached."
        path="/invite/"
        noindex
        nofollow
        imageAlt="Open a Calkilo invite"
      />
      <Head>
        <meta name="theme-color" content="#00d448" />
      </Head>

      <main style={pageStyle}>
        <section style={cardStyle}>
          <div style={badgeStyle}>Referral invite</div>
          <h1 style={titleStyle}>
            {inviteCode ? `Opening invite ${inviteCode}` : 'Opening your Calkilo invite'}
          </h1>
          <p style={copyStyle}>
            {inviteCode
              ? 'We are opening your referral invite and keeping the code attached.'
              : 'We are opening the invite link and sending you to the right install path if needed.'}
          </p>

          {inviteCode ? (
            <div style={codeBoxStyle}>
              <span style={codeLabelStyle}>Referral code</span>
              <strong style={codeValueStyle}>{inviteCode}</strong>
            </div>
          ) : null}

          <div style={statusStyle} aria-live="polite">
            <span style={statusDotStyle} />
            <span>{statusText}</span>
          </div>

          <div style={actionsStyle}>
            <a style={primaryButtonStyle} href={primaryHref}>
              {primaryLabel}
            </a>
            <a style={secondaryButtonStyle} href={APP_STORE_URL}>
              iPhone app
            </a>
            <a style={secondaryButtonStyle} href={GOOGLE_PLAY_URL}>
              Android app
            </a>
            <a style={ghostButtonStyle} href={CALKILO_WEB_URL}>
              Go to calkilo.com
            </a>
          </div>
        </section>
      </main>
    </>
  )
}

const pageStyle: React.CSSProperties = {
  alignItems: 'center',
  background:
    'radial-gradient(circle at top left, rgba(0, 212, 72, 0.14), transparent 30%), radial-gradient(circle at bottom right, rgba(255, 186, 84, 0.12), transparent 28%), linear-gradient(180deg, #f7fbf8 0%, #ffffff 100%)',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '32px 20px',
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.92)',
  border: '1px solid rgba(12, 18, 28, 0.08)',
  borderRadius: 28,
  boxShadow: '0 28px 70px rgba(0, 0, 0, 0.12)',
  maxWidth: 640,
  padding: 32,
  width: '100%',
}

const badgeStyle: React.CSSProperties = {
  color: '#0a7d34',
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: '0.08em',
  marginBottom: 16,
  textTransform: 'uppercase',
}

const titleStyle: React.CSSProperties = {
  color: '#0d1622',
  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
  lineHeight: 1,
  margin: '0 0 16px',
}

const copyStyle: React.CSSProperties = {
  color: 'rgba(13, 22, 34, 0.72)',
  fontSize: '1.05rem',
  lineHeight: 1.7,
  margin: '0 0 20px',
}

const codeBoxStyle: React.CSSProperties = {
  alignItems: 'center',
  background: 'rgba(9, 15, 25, 0.05)',
  border: '1px solid rgba(9, 15, 25, 0.08)',
  borderRadius: 18,
  display: 'inline-flex',
  gap: 12,
  marginBottom: 18,
  padding: '14px 16px',
}

const codeLabelStyle: React.CSSProperties = {
  color: 'rgba(13, 22, 34, 0.64)',
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
}

const codeValueStyle: React.CSSProperties = {
  color: '#0d1622',
  fontSize: '1.05rem',
  letterSpacing: '0.08em',
}

const statusStyle: React.CSSProperties = {
  alignItems: 'center',
  color: 'rgba(13, 22, 34, 0.7)',
  display: 'inline-flex',
  fontSize: '0.95rem',
  gap: 10,
  marginBottom: 22,
}

const statusDotStyle: React.CSSProperties = {
  background: '#00d448',
  borderRadius: 999,
  boxShadow: '0 0 0 6px rgba(0, 212, 72, 0.14)',
  height: 12,
  width: 12,
}

const actionsStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
}

const baseButtonStyle: React.CSSProperties = {
  alignItems: 'center',
  borderRadius: 999,
  display: 'inline-flex',
  fontWeight: 700,
  justifyContent: 'center',
  minHeight: 48,
  padding: '0 18px',
  textDecoration: 'none',
}

const primaryButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  background: 'linear-gradient(135deg, #00d448, #23b14d)',
  color: '#fff',
}

const secondaryButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  background: 'rgba(255, 255, 255, 0.86)',
  border: '1px solid rgba(12, 18, 28, 0.12)',
  color: '#0d1622',
}

const ghostButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  background: 'transparent',
  border: '1px solid rgba(12, 18, 28, 0.12)',
  color: '#0d1622',
}
