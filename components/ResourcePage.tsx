import Link from 'next/link'
import { useRouter } from 'next/router'
import { type CSSProperties } from 'react'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../lib/app-links'
import { SITE_URL } from '../lib/seo'
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_DISPLAY_FONT_FAMILIES,
  LANGUAGE_FONT_FAMILIES,
  type SiteLanguage,
  toLocalizedPath,
} from '../lib/site-language'
import { type ResourcePageDefinition, RESOURCE_LINKS } from '../lib/resource-pages'
import { CORE_SITE_LINKS } from '../lib/site-pages'
import SeoHead from './SeoHead'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

interface ResourcePageProps {
  page: ResourcePageDefinition
}

export default function ResourcePage({ page }: ResourcePageProps) {
  const router = useRouter()
  const language = DEFAULT_LANGUAGE
  const languageDisplayFontFamily = LANGUAGE_DISPLAY_FONT_FAMILIES[language]
  const relatedPages = [
    ...CORE_SITE_LINKS.filter((link) => link.href !== page.path),
    ...RESOURCE_LINKS.filter((resource) => resource.href !== page.path),
  ]
  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Calkilo',
      url: SITE_URL,
      logo: `${SITE_URL}/assets/logo.png`,
      sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      inLanguage: language,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Calkilo',
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Calkilo',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android',
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
      featureList: page.highlights.map((highlight) => highlight.title),
      publisher: {
        '@type': 'Organization',
        name: 'Calkilo',
        url: SITE_URL,
      },
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
          name: page.heading,
          item: `${SITE_URL}${page.path}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ] as const

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features/' },
        { label: 'Pricing', href: '/pricing/' },
        { label: 'AI Calorie Tracker', href: '/ai-calorie-tracker/' },
        { label: 'Contact', href: '/contact/' },
      ],
    },
    {
      title: 'Guides',
      links: RESOURCE_LINKS.map((resource) => ({
        label: resource.label,
        href: resource.href,
      })),
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

  const handleLanguageChange = (nextLanguage: SiteLanguage) => {
    void router.push(toLocalizedPath('/', nextLanguage))
  }

  return (
    <div
      className="lp-page lp-page--light lp-static-page"
      dir="ltr"
      lang={language}
      style={
        {
          '--lp-language-font': LANGUAGE_FONT_FAMILIES[language],
          '--lp-display-font': languageDisplayFontFamily,
        } as CSSProperties
      }
    >
      <SeoHead
        title={page.title}
        description={page.description}
        path={page.path}
        keywords={page.keywords}
        imagePath="/assets/hero-main.png"
        imageAlt={page.heading}
        jsonLd={pageJsonLd}
        language={language}
      />

      <SiteHeader
        ctaHref="/#download"
        ctaLabel="Try for free"
        homeAriaLabel="Calkilo home"
        homeHref="/"
        language={language}
        languageLabel="Language"
        navAriaLabel="Main navigation"
        navItems={[
          { key: 'home', href: '/', label: 'Home' },
          { key: 'features', href: '/features/', label: 'Features' },
          { key: 'pricing', href: '/pricing/', label: 'Choose Plan' },
          { key: 'contact', href: '/contact/', label: 'Contact' },
        ]}
        onLanguageChange={handleLanguageChange}
      />

      <main className="lp-static-main">
        <section className="lp-section lp-static-hero">
          <div className="lp-container">
            <div className="lp-static-hero-inner">
              <p className="lp-kicker">Calkilo Guide</p>
              <h1>{page.heading}</h1>
              <p>{page.intro}</p>
              <div className="lp-resource-actions">
                <a className="lp-btn lp-btn--solid" href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
                  Google Play
                </a>
                <a className="lp-btn lp-resource-btn-secondary" href={APP_STORE_URL} target="_blank" rel="noreferrer">
                  App Store
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-static-content">
          <div className="lp-container lp-static-content-wrap">
            <section className="lp-resource-card-grid">
              {page.highlights.map((highlight) => (
                <article key={highlight.title} className="lp-static-card">
                  <h2>{highlight.title}</h2>
                  <p>{highlight.body}</p>
                </article>
              ))}
            </section>

            {page.sections.map((section) => (
              <section key={section.title} className="lp-static-card">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="lp-policy-list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className="lp-static-card">
              <h2>Questions people ask</h2>
              <div className="lp-resource-faq-grid">
                {page.faqs.map((faq) => (
                  <article key={faq.question}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="lp-static-card">
              <h2>Related pages</h2>
              <div className="lp-resource-related-grid">
                {relatedPages.map((resource) => (
                  <article key={resource.href} className="lp-resource-related-card">
                    <h3>
                      <Link href={resource.href}>{resource.label}</Link>
                    </h3>
                    <p>{resource.description}</p>
                  </article>
                ))}
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
