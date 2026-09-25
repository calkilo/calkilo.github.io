import ReferenceFoodNutrition from './ReferenceFoodNutrition'
import { foodDatasetSchema } from '../lib/food-seo'
import type { ReferenceFood } from '../lib/food-reference'
import StoreLogo from './StoreLogo'
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
  reference?: ReferenceFood | null
}

const language: SiteLanguage = 'fa'
const macroFormatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 })
const androidStoreLinks = getAndroidStoreLinks(language)
const storeSameAs = getStoreSameAs(language)

function formatMacro(value: number) {
  return macroFormatter.format(value)
}

export default function FoodCaloriePage({ food, reference }: FoodCaloriePageProps) {
  const nutrition = food.nutrition
  const estimate = food.estimate
  const calories = nutrition?.caloriesPer100g ?? estimate?.caloriesPer100g
  const path = `/fa/calories/${food.slug}/`
  const title = `کالری ${food.nameFa} در ۱۰۰ گرم و هر وعده | کالکیلو`
  const description = `کالری ${food.nameFa}: ${formatMacro(calories ?? 0)} کیلوکالری در ۱۰۰ گرم ${nutrition ? 'نمونه مرجع؛ جدول پروتئین، چربی و کربوهیدرات' : 'بر اساس تخمین آشپزی؛ وابسته به دستور غذا'}. محاسبه وزن وعده، روش آماده‌سازی و منبع عدد را ببینید.`
  const heading = `کالری ${food.nameFa} چقدر است؟`
  const portions = food.slug === 'falafel'
    ? [{ label: 'یک عدد با وزن فرضی ۲۰ گرم', grams: 20 }, { label: 'یک عدد با وزن فرضی ۳۰ گرم', grams: 30 }, { label: '۴ عدد ۲۵ گرمی، بدون نان و سس', grams: 100 }]
    : food.slug === 'pizza'
      ? [{ label: 'یک برش با وزن فرضی ۸۰ گرم', grams: 80 }, { label: 'یک برش با وزن فرضی ۱۲۰ گرم', grams: 120 }, { label: 'دو برش ۱۰۰ گرمی', grams: 200 }]
      : []
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
    ...(reference ? [foodDatasetSchema(reference, food.nameFa, path, description)] : []),
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
          name: 'بانک کالری غذا',
          item: `${SITE_URL}/fa/calories/`,
        },
        {
          '@type': 'ListItem',
          position: 3,
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
          { key: 'foods', href: '/fa/calories/', label: 'بانک غذا' },
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
              {nutrition && portions.length > 0 && <section className="lp-food-answer" aria-label="کالری هر عدد یا برش">
                <h2>{food.slug === 'falafel' ? 'هر عدد فلافل چند کالری دارد؟' : 'هر برش پیتزا چند کالری دارد؟'}</h2>
                <p>در ۱۰۰ گرم نمونه مرجع، {formatMacro(nutrition.caloriesPer100g)} کیلوکالری وجود دارد. وزن‌های زیر مثال محاسباتی هستند؛ اندازه استاندارد هر قطعه یا برش نیستند.</p>
                <ul className="lp-policy-list">{portions.map(portion => <li key={portion.grams}>{portion.label}: <strong>{formatMacro(Math.round(nutrition.caloriesPer100g * portion.grams / 100))} کیلوکالری</strong></li>)}</ul>
                <p>فرمول: کالری در ۱۰۰ گرم × وزن مصرفی ÷ ۱۰۰. نان، نوشیدنی و سس اضافه جدا محاسبه می‌شوند. برای وزن واقعی، از جدول محاسبه وعده در ادامه استفاده کنید.</p>
                <p><a href={nutrition.sourceUrl}>{nutrition.sourceLabel}</a> · مثال‌های وزن محاسبه‌شده در ۳ مهر ۱۴۰۵ (۲۵ سپتامبر ۲۰۲۶).</p>
              </section>}
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
              <p><Link href="/fa/calories/sources/">منابع بانک غذا و روش محاسبه ارزش غذایی</Link></p>
              {reference ? <section className="food-nutrition-page"><h2>جدول کامل ارزش غذایی در ۱۰۰ گرم و وزن دلخواه</h2><p dir="ltr" lang="en">{reference.name}</p><ReferenceFoodNutrition food={reference} /><noscript><p>جدول مقدارهای ۱۰۰ گرم را نشان می‌دهد. برای وزن دلخواه، مقدار را در وزن ضرب و بر ۱۰۰ تقسیم کنید.</p></noscript></section> : calories !== undefined && <FoodPortionCalculator caloriesPer100g={calories} />}

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
                    <StoreLogo href={store.href} />{store.label}
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
                    <StoreLogo href={store.href} />{store.label}
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

            <section className="lp-static-card"><h2>کالری غذاهای مرتبط</h2><div className="food-directory-grid">{FOOD_CALORIE_PAGES.filter(item => item.slug !== food.slug).sort((a,b) => Number(b.category === food.category)-Number(a.category === food.category)).slice(0,6).map(item => <Link className="food-directory-card" key={item.slug} href={`/fa/calories/${item.slug}/`}><h3>کالری {item.nameFa}</h3><p>{formatMacro(item.nutrition?.caloriesPer100g ?? item.estimate?.caloriesPer100g ?? 0)} کیلوکالری در ۱۰۰ گرم</p></Link>)}</div><p><Link href="/fa/calories/">همه گروه‌ها و جست‌وجوی غذا ←</Link></p></section>
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
