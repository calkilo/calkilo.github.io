import Link from 'next/link'
import FoodPortionCalculator from './FoodPortionCalculator'
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
const macroFormatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 })
const androidStoreLinks = getAndroidStoreLinks(language)
const storeSameAs = getStoreSameAs(language)

function formatMacro(value: number) {
  return macroFormatter.format(value)
}

export default function FoodCaloriePage({ food }: FoodCaloriePageProps) {
  const nutrition = food.nutrition
  const estimate = food.estimate
  const calories = nutrition?.caloriesPer100g ?? estimate?.caloriesPer100g
  const path = `/fa/calories/${food.slug}/`
  const title = `کالری ${food.nameFa} چقدر است؟ | ارزش غذایی و محاسبه با عکس`
  const description = `کالری ${food.nameFa} در هر 100 گرم و هر وعده را ببینید؛ پروتئین، چربی و کربوهیدرات را بررسی کنید و برای بررسی وعده، از غذای خود در اپ کالکیلو عکس بگیرید.`
  const heading = `کالری ${food.nameFa} چقدر است؟`
  const faqItems = [
    {
      question: `کالری ${food.nameFa} در هر 100 گرم چقدر است؟`,
      answer: nutrition ? `در نمونه مرجع، هر ۱۰۰ گرم حدود ${formatMacro(nutrition.caloriesPer100g)} کیلوکالری دارد. این مقدار به ترکیب مشخص منبع مربوط است.` : `تخمین منبع آشپزی برای نمونه این صفحه ${formatMacro(calories || 0)} کیلوکالری در ۱۰۰ گرم است؛ مقدار واقعی با دستور غذا تغییر می‌کند.`,
    },
    {
      question: `یک وعده ${food.nameFa} چند کالری دارد؟`,
      answer: nutrition ? `نمونه ${formatMacro(nutrition.servingGrams)} گرمیِ منبع، ${formatMacro(nutrition.servingCalories)} کیلوکالری دارد. سس و کنارغذا جدا حساب می‌شوند.` : 'گوشت، نان یا برنج، کره و کنارغذا را با مقدار مصرفی مشخص کنید. وزن خام و پخته قابل جایگزینی نیستند.',
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
      links: [{ label: 'همه غذاها و جست‌وجو', href: '/fa/calories/' }, ...FOOD_CALORIE_PAGES.filter(item => item.slug !== food.slug).slice(0, 5).map((item) => ({
        label: `کالری ${item.nameFa}`,
        href: `/fa/calories/${item.slug}/`,
      }))],
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
              <nav className="food-breadcrumb" aria-label="مسیر صفحه"><Link href="/fa/">خانه</Link><span aria-hidden="true"> / </span><Link href="/fa/calories/">کالری غذاها</Link><span aria-hidden="true"> / </span><span>{food.nameFa}</span></nav>
              <h1>{heading}</h1>
              {nutrition ? <section className="lp-food-answer" aria-label="ارزش غذایی و منبع">
                <p className="lp-food-source">{nutrition.preparation}</p>
                <div className="lp-food-stat-grid">
                  <article><span>در ۱۰۰ گرم</span><strong>{formatMacro(nutrition.caloriesPer100g)}</strong><small>کیلوکالری</small></article>
                  <article><span>نمونه {formatMacro(nutrition.servingGrams)} گرمی</span><strong>{formatMacro(nutrition.servingCalories)}</strong><small>کیلوکالری</small></article>
                  <article><span>پروتئین</span><strong>{formatMacro(nutrition.protein)} گرم</strong><small>در نمونه مشخص‌شده</small></article>
                  <article><span>چربی</span><strong>{formatMacro(nutrition.fat)} گرم</strong><small>در نمونه مشخص‌شده</small></article>
                  <article><span>کربوهیدرات</span><strong>{formatMacro(nutrition.carbs)} گرم</strong><small>در نمونه مشخص‌شده</small></article>
                </div>
                <p className="lp-food-source"><a href={nutrition.sourceUrl} target="_blank" rel="noreferrer">{nutrition.sourceLabel}</a>{nutrition.mirrorUrl && <> · <a href={nutrition.mirrorUrl} target="_blank" rel="noreferrer">جدول قابل خواندن منبع</a></>}<br />{nutrition.basisNote}</p>
                <p className="fa-download-note">انرژی از مقدار گزارش‌شده منبع آمده است؛ محاسبه ساده ۴/۴/۹ با ماکروهای گرد‌شده ممکن است دقیقاً همان نتیجه را ندهد. این نمونه، اندازه‌گیری غذای شما نیست.</p>
              </section> : estimate ? <section className="lp-food-answer" aria-label="تخمین کالری و منبع">
                <p>{estimate.preparation}</p>
                <div className="lp-food-stat-grid"><article><span>تخمین در ۱۰۰ گرم</span><strong>{formatMacro(estimate.caloriesPer100g)}</strong><small>کیلوکالری</small></article></div>
                <p className="lp-food-source">منبع: <a href={estimate.sourceUrl} target="_blank" rel="noreferrer">{estimate.sourceLabel}</a>. این مقدار تخمینی از یک منبع آشپزی است، نه اندازه‌گیری آزمایشگاهی. مقدار روغن، آب و نسبت مواد در غذای شما می‌تواند متفاوت باشد.</p>
              </section> : null}
              {calories !== undefined && <FoodPortionCalculator caloriesPer100g={calories} />}

              <p>برای بررسی غذای خود، عکس را داخل اپ تحلیل کنید. دانلود رایگان؛ دارای خرید درون‌برنامه‌ای.</p>
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
              <h2>چرا کالری {food.nameFa} ثابت نیست؟</h2>
              <p>{food.intro}</p>
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
                <h2>از غذای خود عکس بگیرید و نتیجه را بررسی کنید.</h2>
                <p>
                  اعداد مرجع به غذا و وزن مشخص منبع مربوط‌اند. اندازه واقعی وعده، روش پخت و مواد اضافه می‌تواند نتیجه را
                  تغییر دهد. برای تخمین و بررسی وعده، عکس {food.nameFa} خود را در اپ کالکیلو تحلیل کنید.
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
