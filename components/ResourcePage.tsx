import Link from 'next/link'
import { useRouter } from 'next/router'
import { type CSSProperties } from 'react'
import { APP_STORE_URL, getAndroidStoreLinks, getStoreSameAs } from '../lib/app-links'
import { SITE_URL } from '../lib/seo'
import {
  DEFAULT_LANGUAGE,
  isRtlLanguage,
  LANGUAGE_DISPLAY_FONT_FAMILIES,
  LANGUAGE_FONT_FAMILIES,
  normalizeSiteLanguage,
  type SiteLanguage,
  toLocalizedPath,
} from '../lib/site-language'
import {
  getLocalizedResourceLinks,
  getResourceAlternateLanguages,
  getResourcePathForLanguage,
  type ResourcePageDefinition,
  type ResourcePageKey,
} from '../lib/resource-pages'
import { CORE_SITE_LINKS } from '../lib/site-pages'
import { translateStaticPageText } from '../lib/static-page-translations'
import SeoHead from './SeoHead'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

interface ResourcePageProps {
  page: ResourcePageDefinition
  pageKey?: ResourcePageKey
  lang?: string
}

export default function ResourcePage({ page, pageKey, lang }: ResourcePageProps) {
  const router = useRouter()
  const language = page.language ?? normalizeSiteLanguage(lang) ?? DEFAULT_LANGUAGE
  const languageDisplayFontFamily = LANGUAGE_DISPLAY_FONT_FAMILIES[language]
  const t = (text: string) => translateStaticPageText(language, text)
  const featuresHref = language === 'en' ? '/features/' : toLocalizedPath('/#features', language)
  const pricingHref = language === 'en' ? '/pricing/' : toLocalizedPath('/#pricing', language)
  const localizedResourceLinks = getLocalizedResourceLinks(language)
  const androidStoreLinks = getAndroidStoreLinks(language)
  const storeSameAs = getStoreSameAs(language)
  const alternateLanguages = pageKey ? getResourceAlternateLanguages(pageKey) : undefined
  const localizedCorePages = CORE_SITE_LINKS.map((link) => {
    if (link.href === '/features/') {
      return {
        ...link,
        href: featuresHref,
        label: t(link.label),
        description: t(link.description),
      }
    }

    if (link.href === '/pricing/') {
      return {
        ...link,
        href: pricingHref,
        label: t(link.label),
        description: t(link.description),
      }
    }

    if (link.href === '/contact/') {
      return {
        ...link,
        href: toLocalizedPath('/contact', language),
        label: t(link.label),
        description: t(link.description),
      }
    }

    return {
      ...link,
      label: t(link.label),
      description: t(link.description),
    }
  })
  const relatedPagesByHref = new Map(
    [...localizedCorePages, ...localizedResourceLinks]
      .filter((resource) => resource.href !== page.path)
      .map((resource) => [resource.href, resource]),
  )
  const relatedPages = Array.from(relatedPagesByHref.values())
  const footerSections = [
    {
      title: t('Product'),
      links: [
        { label: t('Features'), href: featuresHref },
        { label: t('Pricing'), href: pricingHref },
        { label: localizedResourceLinks[0]?.label ?? 'AI Calorie Tracker', href: localizedResourceLinks[0]?.href ?? '/ai-calorie-tracker/' },
        { label: t('Contact'), href: toLocalizedPath('/contact', language) },
      ],
    },
    {
      title: t('Guides'),
      links: localizedResourceLinks.map((resource) => ({
        label: resource.label,
        href: resource.href,
      })),
    },
    {
      title: t('Support'),
      links: [
        { label: t('Privacy Policy'), href: toLocalizedPath('/privacy-policy', language) },
        { label: t('Terms of Service'), href: toLocalizedPath('/terms-of-service', language) },
        { label: t('Account Deletion'), href: toLocalizedPath('/account-deletion', language) },
        { label: t('Contact'), href: toLocalizedPath('/contact', language) },
      ],
    },
  ] as const
  const navItems = [
    { key: 'home', href: toLocalizedPath('/', language), label: t('Home') },
    { key: 'features', href: featuresHref, label: t('Features') },
    { key: 'pricing', href: pricingHref, label: t('Choose Plan') },
    { key: 'contact', href: toLocalizedPath('/contact', language), label: t('Contact') },
  ]
  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Calkilo',
      url: SITE_URL,
      logo: `${SITE_URL}/assets/logo.png`,
      sameAs: storeSameAs,
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
      '@type': 'WebApplication',
      name: 'Calkilo',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android',
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      sameAs: storeSameAs,
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
          name: t('Home'),
          item: `${SITE_URL}${toLocalizedPath('/', language)}`,
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
      inLanguage: language,
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

  const handleLanguageChange = (nextLanguage: SiteLanguage) => {
    const nextPath = pageKey ? getResourcePathForLanguage(pageKey, nextLanguage) : null

    void router.push(nextPath ?? toLocalizedPath('/', nextLanguage))
  }

  return (
    <div
      className="lp-page lp-page--light lp-static-page"
      dir={isRtlLanguage(language) ? 'rtl' : 'ltr'}
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
        alternateLanguages={alternateLanguages}
      />

      <SiteHeader
        ctaHref={toLocalizedPath('/#download', language)}
        ctaLabel={t('Try for free')}
        homeAriaLabel="Calkilo home"
        homeHref={toLocalizedPath('/', language)}
        language={language}
        languageLabel={t('Language')}
        navAriaLabel="Main navigation"
        navItems={navItems}
        onLanguageChange={handleLanguageChange}
      />

      <main className="lp-static-main">
        <section className="lp-section lp-static-hero">
          <div className="lp-container">
            <div className="lp-static-hero-inner">
              <p className="lp-kicker">{t('Calkilo Guide')}</p>
              <h1>{page.heading}</h1>
              <p>{page.intro}</p>
              <div className="lp-resource-actions">
                {androidStoreLinks.map((store, index) => (
                  <a
                    key={store.href}
                    className={index === 0 ? 'lp-btn lp-btn--solid' : 'lp-btn lp-resource-btn-secondary'}
                    href={store.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {store.label}
                  </a>
                ))}
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
              <h2>{t('Questions people ask')}</h2>
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
              <h2>{t('Related pages')}</h2>
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
        copyright={`© ${new Date().getFullYear()} Calkilo. ${t('All rights reserved.')}`}
        description={t('Revolutionizing nutrition tracking with AI-powered calorie calculation.')}
        homeAriaLabel="Calkilo home"
        homeHref={toLocalizedPath('/', language)}
        sections={footerSections}
        socialLinksLabel="Social links"
      />
    </div>
  )
}
