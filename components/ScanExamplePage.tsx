import Link from 'next/link'
import { type CSSProperties } from 'react'
import { APP_STORE_URL, getAndroidStoreLinks, getStoreSameAs } from '../lib/app-links'
import { SITE_URL } from '../lib/seo'
import { CALORIE_RELATED_LINKS_FA } from '../lib/seo-landing-pages'
import { SCAN_EXAMPLE_PAGES, type ScanExamplePageData } from '../lib/scan-example-pages'
import { LANGUAGE_DISPLAY_FONT_FAMILIES, LANGUAGE_FONT_FAMILIES, type SiteLanguage } from '../lib/site-language'
import SeoHead from './SeoHead'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

interface ScanExamplePageProps {
  example: ScanExamplePageData
}

const language: SiteLanguage = 'fa'
const macroFormatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 })
const androidStoreLinks = getAndroidStoreLinks(language)
const storeSameAs = getStoreSameAs(language)

export default function ScanExamplePage({ example }: ScanExamplePageProps) {
  const path = `/fa/examples/${example.slug}/`
  const title = `نمونه اسکن کالری ${example.foodNameFa} با هوش مصنوعی | Calkilo`
  const description = `نمونه تخمین کالری ${example.foodNameFa} با Calkilo: کالری، پروتئین، چربی و کربوهیدرات را ببینید و غذای خودتان را با عکس اسکن کنید.`
  const heading = `نمونه اسکن کالری ${example.foodNameFa}`
  const faqItems = [
    {
      question: `آیا نتیجه اسکن ${example.foodNameFa} دقیق است؟`,
      answer:
        'این صفحه یک نمونه آموزشی است. نتیجه واقعی به عکس، اندازه وعده، روش پخت، سس‌ها و مواد پنهان بستگی دارد.',
    },
    {
      question: 'چطور غذای خودم را اسکن کنم؟',
      answer:
        'Calkilo را باز کنید، از غذای خود عکس بگیرید یا تصویر را آپلود کنید و تخمین کالری و ماکروها را بررسی کنید.',
    },
  ]
  const jsonLd = [
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
      '@type': 'WebApplication',
      name: 'Calkilo',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android',
      url: `${SITE_URL}${path}`,
      description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: `${SITE_URL}${path}`,
      inLanguage: language,
      isPartOf: {
        '@type': 'WebSite',
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
          name: 'خانه',
          item: `${SITE_URL}/fa/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: heading,
          item: `${SITE_URL}${path}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: language,
      mainEntity: faqItems.map((faq) => ({
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
      title: 'محصول',
      links: [
        { label: 'خانه', href: '/fa/' },
        { label: 'ویژگی‌ها', href: '/fa/#features' },
        { label: 'انتخاب طرح', href: '/fa/#pricing' },
        { label: 'تماس', href: '/fa/contact/' },
      ],
    },
    {
      title: 'راهنماهای کالری',
      links: CALORIE_RELATED_LINKS_FA.map((link) => ({ label: link.label, href: link.href })),
    },
    {
      title: 'نمونه‌های اسکن',
      links: SCAN_EXAMPLE_PAGES.map((item) => ({
        label: `اسکن ${item.foodNameFa}`,
        href: `/fa/examples/${item.slug}/`,
      })),
    },
  ] as const

  return (
    <div
      className="lp-page lp-page--light lp-static-page lp-scan-page"
      dir="rtl"
      lang={language}
      style={
        {
          '--lp-language-font': LANGUAGE_FONT_FAMILIES[language],
          '--lp-display-font': LANGUAGE_DISPLAY_FONT_FAMILIES[language],
        } as CSSProperties
      }
    >
      <SeoHead
        title={title}
        description={description}
        path={path}
        keywords={[
          `اسکن کالری ${example.foodNameFa}`,
          `نمونه اسکن ${example.foodNameFa}`,
          `کالری ${example.foodNameFa} با عکس`,
          'اسکن کالری غذا',
        ]}
        imagePath="/assets/hero-main.png"
        imageAlt={heading}
        jsonLd={jsonLd}
        language={language}
      />

      <SiteHeader
        ctaHref="/fa/#download"
        ctaLabel="رایگان امتحان کنید"
        homeAriaLabel="Calkilo home"
        homeHref="/fa/"
        language={language}
        languageLabel="زبان"
        navAriaLabel="Main navigation"
        navItems={[
          { key: 'home', href: '/fa/', label: 'خانه' },
          { key: 'photo', href: '/fa/photo-calorie-calculator/', label: 'کالری با عکس' },
          { key: 'scanner', href: '/fa/food-calorie-scanner/', label: 'اسکن غذا' },
          { key: 'contact', href: '/fa/contact/', label: 'تماس' },
        ]}
        onLanguageChange={(nextLanguage) => {
          if (nextLanguage !== language) window.location.assign(nextLanguage === 'en' ? '/' : `/${nextLanguage}/`)
        }}
      />

      <main className="lp-static-main">
        <section className="lp-section lp-static-hero">
          <div className="lp-container">
            <div className="lp-static-hero-inner">
              <p className="lp-kicker">نمونه نتیجه Calkilo</p>
              <h1>{heading}</h1>
              <p>{example.description}</p>
              <div className="lp-resource-actions">
                {androidStoreLinks.map((store, index) => (
                  <a
                    key={store.href}
                    className={index === 0 ? 'lp-btn lp-btn--solid' : 'lp-btn lp-resource-btn-secondary'}
                    href={store.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {index === 0 ? 'اسکن در Cafe Bazaar' : 'اسکن در Myket'}
                  </a>
                ))}
                <Link className="lp-btn lp-resource-btn-secondary" href="/fa/food-calorie-scanner/">
                  راهنمای اسکن غذا
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-static-content">
          <div className="lp-container lp-static-content-wrap">
            <section className="lp-static-card">
              <h2>نتیجه تخمینی نمونه</h2>
              <div className="lp-food-stat-grid" aria-label={`نمونه اسکن ${example.foodNameFa}`}>
                <article>
                  <span>کالری تخمینی</span>
                  <strong>{example.estimatedCalories}</strong>
                  <small>کیلوکالری</small>
                </article>
                <article>
                  <span>پروتئین</span>
                  <strong>{macroFormatter.format(example.protein)} گرم</strong>
                  <small>تخمینی</small>
                </article>
                <article>
                  <span>چربی</span>
                  <strong>{macroFormatter.format(example.fat)} گرم</strong>
                  <small>تخمینی</small>
                </article>
                <article>
                  <span>کربوهیدرات</span>
                  <strong>{macroFormatter.format(example.carbs)} گرم</strong>
                  <small>تخمینی</small>
                </article>
              </div>
            </section>

            <section className="lp-static-card">
              <h2>این نتیجه فقط یک تخمین است</h2>
              <p>
                مقدار واقعی کالری و ماکروها می‌تواند با اندازه وعده، روش پخت، مواد پنهان، سس‌ها و کیفیت عکس تغییر کند.
                Calkilo نتیجه را به عنوان نقطه شروع نمایش می‌دهد تا بتوانید آن را بررسی و برای ثبت روزانه استفاده کنید.
              </p>
              <ul className="lp-policy-list">
                {example.estimateNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>

            <section className="lp-static-card lp-food-cta-card">
              <div>
                <h2>غذای خودتان را اسکن کنید</h2>
                <p>
                  عکس غذای واقعی شما از هر نمونه آماده مهم‌تر است. برای محاسبه دقیق‌تر، از وعده خود عکس بگیرید و نتیجه
                  را در Calkilo بررسی کنید.
                </p>
              </div>
              <div className="lp-resource-actions lp-food-cta-actions">
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
              </div>
            </section>

            <section className="lp-static-card">
              <h2>پرسش‌های رایج</h2>
              <div className="lp-resource-faq-grid">
                {faqItems.map((faq) => (
                  <article key={faq.question}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="lp-static-card">
              <h2>صفحه‌های مرتبط کالری با عکس</h2>
              <div className="lp-resource-related-grid">
                {CALORIE_RELATED_LINKS_FA.map((link) => (
                  <article key={link.href} className="lp-resource-related-card">
                    <h3>
                      <Link href={link.href}>{link.label}</Link>
                    </h3>
                    <p>{link.description}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter
        copyright={`© ${new Date().getFullYear()} Calkilo. تمام حقوق محفوظ است.`}
        description="انقلابی در پیگیری تغذیه با محاسبه کالری مبتنی بر هوش مصنوعی."
        homeAriaLabel="Calkilo home"
        homeHref="/fa/"
        sections={footerSections}
        socialLinksLabel="Social links"
      />
    </div>
  )
}
