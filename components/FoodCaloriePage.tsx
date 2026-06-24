import Link from 'next/link'
import { type CSSProperties } from 'react'
import { APP_STORE_URL, getAndroidStoreLinks, getStoreSameAs } from '../lib/app-links'
import { FOOD_CALORIE_PAGES, type FoodCaloriePageData } from '../lib/food-calorie-pages'
import { SITE_URL } from '../lib/seo'
import { CALORIE_RELATED_LINKS_FA } from '../lib/seo-landing-pages'
import { LANGUAGE_DISPLAY_FONT_FAMILIES, LANGUAGE_FONT_FAMILIES, type SiteLanguage } from '../lib/site-language'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import SeoHead from './SeoHead'

interface FoodCaloriePageProps {
  food: FoodCaloriePageData
}

const language: SiteLanguage = 'fa'
const macroFormatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 })
const androidStoreLinks = getAndroidStoreLinks(language)
const storeSameAs = getStoreSameAs(language)

function formatMacro(value: number) {
  return macroFormatter.format(value)
}

export default function FoodCaloriePage({ food }: FoodCaloriePageProps) {
  const path = `/fa/calories/${food.slug}/`
  const title = `کالری ${food.nameFa} چقدر است؟ | ارزش غذایی و محاسبه با عکس`
  const description = `کالری ${food.nameFa} در هر 100 گرم و هر وعده را ببینید؛ پروتئین، چربی و کربوهیدرات را بررسی کنید و برای تخمین دقیق‌تر از غذای خود در Calkilo عکس بگیرید.`
  const heading = `کالری ${food.nameFa} چقدر است؟`
  const faqItems = [
    {
      question: `کالری ${food.nameFa} در هر 100 گرم چقدر است؟`,
      answer: `به طور تخمینی، هر 100 گرم ${food.nameFa} حدود ${food.caloriesPer100g} کالری دارد. مقدار واقعی می‌تواند با روش پخت، اندازه وعده و مواد اضافه تغییر کند.`,
    },
    {
      question: `یک وعده ${food.nameFa} چند کالری دارد؟`,
      answer: `یک وعده معمولی شامل ${food.servingLabel} حدود ${food.servingCalories} کالری دارد. برای وعده‌های بزرگ‌تر یا همراه با سس و کنارغذا، عدد نهایی بالاتر می‌رود.`,
    },
    {
      question: `آیا Calkilo کالری ${food.nameFa} را از روی عکس تخمین می‌زند؟`,
      answer:
        'بله. می‌توانید از غذای خود عکس بگیرید و Calkilo کالری، پروتئین، چربی و کربوهیدرات را به صورت تخمینی نمایش می‌دهد.',
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
      title: 'کالری غذاها',
      links: FOOD_CALORIE_PAGES.map((item) => ({
        label: `کالری ${item.nameFa}`,
        href: `/fa/calories/${item.slug}/`,
      })),
    },
  ] as const

  return (
    <div
      className="lp-page lp-page--light lp-static-page lp-food-page"
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
          `کالری ${food.nameFa}`,
          `کالری ${food.nameFa} چقدر است`,
          `ارزش غذایی ${food.nameFa}`,
          `محاسبه کالری ${food.nameFa} با عکس`,
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
              <p className="lp-kicker">راهنمای کالری غذا</p>
              <h1>{heading}</h1>
              <p>{food.intro}</p>
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
            <section className="lp-static-card">
              <h2>ارزش غذایی تخمینی {food.nameFa}</h2>
              <div className="lp-food-stat-grid" aria-label={`ارزش غذایی ${food.nameFa}`}>
                <article>
                  <span>کالری در 100 گرم</span>
                  <strong>{food.caloriesPer100g}</strong>
                  <small>کیلوکالری</small>
                </article>
                <article>
                  <span>کالری هر وعده</span>
                  <strong>{food.servingCalories}</strong>
                  <small>{food.servingLabel}</small>
                </article>
                <article>
                  <span>پروتئین</span>
                  <strong>{formatMacro(food.protein)} گرم</strong>
                  <small>در هر وعده</small>
                </article>
                <article>
                  <span>چربی</span>
                  <strong>{formatMacro(food.fat)} گرم</strong>
                  <small>در هر وعده</small>
                </article>
                <article>
                  <span>کربوهیدرات</span>
                  <strong>{formatMacro(food.carbs)} گرم</strong>
                  <small>در هر وعده</small>
                </article>
              </div>
            </section>

            <section className="lp-static-card">
              <h2>چرا کالری {food.nameFa} ثابت نیست؟</h2>
              {food.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
              <ul className="lp-policy-list">
                {food.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>

            <section className="lp-static-card lp-food-cta-card">
              <div>
                <h2>برای محاسبه دقیق‌تر، از غذای خود عکس بگیرید.</h2>
                <p>
                  اعداد این صفحه میانگین آموزشی هستند. اندازه واقعی وعده، روش پخت و مواد اضافه می‌تواند نتیجه را
                  تغییر دهد. برای تخمین دقیق‌تر، عکس {food.nameFa} خود را در Calkilo آپلود کنید.
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
