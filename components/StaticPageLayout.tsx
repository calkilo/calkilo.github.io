import { useRouter } from 'next/router'
import { type ReactNode } from 'react'
import { translateStaticPageText } from '../lib/static-page-translations'
import {
  buildAlternateLanguagePaths,
  isRtlLanguage,
  normalizeSiteLanguage,
  switchLanguagePath,
  toLocalizedPath,
} from '../lib/site-language'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import SeoHead from './SeoHead'

type StaticNavItem = 'privacy' | 'contact' | 'terms' | 'deletion'
type JsonLdSchema = Record<string, unknown>

interface StaticPageLayoutProps {
  title: string
  description: string
  path: string
  heading: string
  intro: string
  activeNav: StaticNavItem
  lang?: string
  keywords?: ReadonlyArray<string>
  noindex?: boolean
  ogType?: 'website' | 'article'
  imagePath?: string
  jsonLd?: JsonLdSchema | ReadonlyArray<JsonLdSchema>
  children: ReactNode
}

export default function StaticPageLayout({
  title,
  description,
  path,
  heading,
  intro,
  activeNav,
  lang,
  keywords,
  noindex,
  ogType,
  imagePath,
  jsonLd,
  children,
}: StaticPageLayoutProps) {
  const router = useRouter()
  const language = normalizeSiteLanguage(lang)
  const t = (text: string) => translateStaticPageText(language, text)
  const localizedPath = toLocalizedPath(path, language)
  const footerSections = [
    {
      title: t('Feature'),
      links: [
        { label: t('Download'), href: toLocalizedPath('/#download', language) },
        { label: t('How it Works?'), href: toLocalizedPath('/#how-it-works', language) },
        { label: t('Blog'), href: '#' },
      ],
    },
    {
      title: t('Support'),
      links: [
        { label: t('Privacy Policy'), href: toLocalizedPath('/privacy-policy', language) },
        { label: t('Terms of Service'), href: toLocalizedPath('/terms-of-service', language) },
        { label: t('Delete Account & Data'), href: toLocalizedPath('/account-deletion', language) },
        { label: t('Terms & Conditions'), href: toLocalizedPath('/terms-and-conditions', language) },
        { label: t('FAQ'), href: toLocalizedPath('/#faq', language) },
      ],
    },
    {
      title: t('Get in Touch'),
      links: [
        { label: t('Contact'), href: toLocalizedPath('/contact', language) },
        { label: t('About Us'), href: '#' },
        { label: t('Our Team'), href: '#' },
      ],
    },
  ] as const
  const headerItems = [
    {
      key: 'home',
      href: toLocalizedPath('/', language),
      label: t('Home'),
    },
    {
      key: 'features',
      href: toLocalizedPath('/#features', language),
      label: t('Features'),
    },
    {
      key: 'pricing',
      href: toLocalizedPath('/#pricing', language),
      label: t('Choose Plan'),
    },
    {
      key: 'contact',
      href: toLocalizedPath('/contact', language),
      label: t('Contact'),
      isActive: activeNav === 'contact',
    },
  ] as const

  const handleLanguageChange = (nextLanguage: Parameters<typeof switchLanguagePath>[1]) => {
    if (nextLanguage === language) {
      return
    }

    void router.push(switchLanguagePath(router.asPath || localizedPath, nextLanguage))
  }

  return (
    <div className="lp-page lp-page--light lp-static-page" dir={isRtlLanguage(language) ? 'rtl' : 'ltr'} lang={language}>
      <SeoHead
        title={title}
        description={description}
        path={localizedPath}
        keywords={keywords}
        noindex={noindex}
        ogType={ogType}
        imagePath={imagePath}
        jsonLd={jsonLd}
        language={language}
        alternateLanguages={buildAlternateLanguagePaths(path)}
      />

      <SiteHeader
        ctaHref={toLocalizedPath('/#download', language)}
        ctaLabel={t('Try for free')}
        homeAriaLabel="CalKilo home"
        homeHref={toLocalizedPath('/', language)}
        language={language}
        languageLabel={t('Language')}
        navAriaLabel="Main navigation"
        navItems={headerItems}
        onLanguageChange={handleLanguageChange}
      />

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

      <SiteFooter
        copyright={`© ${new Date().getFullYear()} Calkilo. ${t('All rights reserved.')}`}
        description={t('Revolutionizing nutrition tracking with AI-powered calorie calculation.')}
        homeAriaLabel="CalKilo home"
        homeHref={toLocalizedPath('/', language)}
        sections={footerSections}
        socialLinksLabel="Social links"
      />
    </div>
  )
}
