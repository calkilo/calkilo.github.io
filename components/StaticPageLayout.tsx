import Link from 'next/link'
import { type ReactNode } from 'react'
import SeoHead from './SeoHead'

type StaticNavItem = 'privacy' | 'contact' | 'terms'
type JsonLdSchema = Record<string, unknown>

interface StaticPageLayoutProps {
  title: string
  description: string
  path: string
  heading: string
  intro: string
  activeNav: StaticNavItem
  keywords?: ReadonlyArray<string>
  noindex?: boolean
  ogType?: 'website' | 'article'
  imagePath?: string
  jsonLd?: JsonLdSchema | ReadonlyArray<JsonLdSchema>
  children: ReactNode
}

const FOOTER_SECTIONS = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
] as const

function BrandLogo() {
  return (
    <span className="lp-brand" aria-label="CalKilo logo">
      <span className="lp-brand-mark" aria-hidden="true">
        CK
      </span>
      <span className="lp-brand-text">
        <span>Cal</span>
        <span>Kilo</span>
      </span>
    </span>
  )
}

export default function StaticPageLayout({
  title,
  description,
  path,
  heading,
  intro,
  activeNav,
  keywords,
  noindex,
  ogType,
  imagePath,
  jsonLd,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className="lp-page lp-page--light lp-static-page">
      <SeoHead
        title={title}
        description={description}
        path={path}
        keywords={keywords}
        noindex={noindex}
        ogType={ogType}
        imagePath={imagePath}
        jsonLd={jsonLd}
      />

      <header className="lp-topbar">
        <div className="lp-container lp-topbar-inner lp-static-topbar-inner">
          <Link className="lp-logo" href="/" aria-label="CalKilo home">
            <BrandLogo />
          </Link>

          <nav className="lp-nav lp-static-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/privacy-policy" className={activeNav === 'privacy' ? 'is-active' : undefined}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className={activeNav === 'terms' ? 'is-active' : undefined}>
              Terms
            </Link>
            <Link href="/contact" className={activeNav === 'contact' ? 'is-active' : undefined}>
              Contact
            </Link>
          </nav>

          <div className="lp-topbar-actions lp-static-topbar-actions">
            <Link className="lp-btn lp-btn--solid lp-static-cta" href="/#download">
              Try for free
            </Link>
          </div>
        </div>
      </header>

      <main className="lp-static-main">
        <section className="lp-section lp-static-hero">
          <div className="lp-container">
            <div className="lp-static-hero-inner">
              <p className="lp-kicker">Calkilo</p>
              <h1>{heading}</h1>
              <p>{intro}</p>
            </div>
          </div>
        </section>

        <section className="lp-section lp-static-content">
          <div className="lp-container lp-static-content-wrap">{children}</div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-container lp-footer-grid lp-static-footer-grid">
          <section>
            <Link className="lp-logo" href="/" aria-label="CalKilo home">
              <BrandLogo />
            </Link>
            <p>Revolutionizing nutrition tracking with AI-powered calorie calculation.</p>
            <div className="lp-socials" aria-label="Social links">
              <a href="#" aria-label="X">
                X
              </a>
              <a href="#" aria-label="Telegram">
                Tg
              </a>
              <a href="#" aria-label="LinkedIn">
                In
              </a>
              <a href="#" aria-label="Instagram">
                Ig
              </a>
            </div>
          </section>

          {FOOTER_SECTIONS.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section>
            <h3>Get in Touch</h3>
            <ul>
              <li>
                <a href="mailto:support@calkilo.app">support@calkilo.app</a>
              </li>
              <li>
                <Link href="/contact">Request support</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy requests</Link>
              </li>
            </ul>
          </section>
        </div>
        <p className="lp-copyright">(c) {new Date().getFullYear()} Calkilo. All rights reserved.</p>
      </footer>
    </div>
  )
}
