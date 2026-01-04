import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import Hero from '../../components/sections/Hero'
import MealPlanning from '../../components/sections/MealPlanning'
import NutrientReplenishment from '../../components/sections/NutrientReplenishment'
import HowItWorks from '../../components/sections/HowItWorks'
import DarkMode from '../../components/sections/DarkMode'
import Integrations from '../../components/sections/Integrations'
import Testimonials from '../../components/sections/Testimonials'
import Pricing from '../../components/sections/Pricing'
import Community from '../../components/sections/Community'
import ReadyToTransform from '../../components/sections/ReadyToTransform'
import FAQ from '../../components/sections/FAQ'
import Head from 'next/head'

const validLocales = ['en', 'fa', 'zh', 'ru', 'it', 'fr', 'de', 'ar', 'es', 'nl']

export default function HomeLocale() {
  const router = useRouter()
  const { locale } = router.query
  const localeStr = typeof locale === 'string' ? locale : 'en'
  
  // Set locale in localStorage when component mounts or locale changes
  useEffect(() => {
    if (typeof window !== 'undefined' && localeStr && validLocales.includes(localeStr)) {
      localStorage.setItem('preferred-language', localeStr)
      document.documentElement.setAttribute('lang', localeStr)
      if (localeStr === 'ar' || localeStr === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl')
      } else {
        document.documentElement.setAttribute('dir', 'ltr')
      }
    }
  }, [localeStr])

  const siteUrl = 'https://calkilo.com'
  const basePath = localeStr && localeStr !== 'en' ? `/${localeStr}` : ''
  const canonicalUrl = `${siteUrl}${basePath}`
  const siteName = 'Calkilo'
  const title = 'Calkilo - AI Calorie Calculator App | Track Nutrition with AI Technology'
  const description = 'Calkilo is the most accurate AI-powered calorie calculator app. Simply take a photo of your food and get instant calorie counts, macronutrients, and nutrition tracking. Download free for iOS and Android.'
  const ogImage = `${siteUrl}/assest/CalKilo-logo.svg`

  // Structured Data for Google
  const mobileAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Calkilo',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '5000',
      bestRating: '5',
      worstRating: '1'
    },
    description: description,
    screenshot: [
      `${siteUrl}/assest/screenshot-1.jpg`,
      `${siteUrl}/assest/screenshot2.jpg`,
      `${siteUrl}/assest/screenshot3.jpg`
    ],
    featureList: [
      'AI-powered food recognition',
      'Instant calorie calculation',
      'Macronutrient tracking',
      'Photo-based nutrition analysis',
      'Meal planning',
      'Multi-language support'
    ]
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calkilo',
    url: siteUrl,
    logo: `${siteUrl}/assest/CalKilo-logo.svg`,
    description: 'AI-powered calorie calculator and nutrition tracking app',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${siteUrl}/contact`
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calkilo',
    url: siteUrl,
    description: description,
    publisher: {
      '@type': 'Organization',
      name: 'Calkilo'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content="AI calorie calculator, calorie counter app, nutrition tracking, food photo analysis, diet app, calorie tracker, AI nutrition, mobile health app, food recognition, macro tracking, Calkilo" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Calkilo" />
        <meta name="language" content={localeStr} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Calkilo AI Calorie Calculator App Logo" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content={localeStr === 'fa' ? 'fa_IR' : localeStr === 'ar' ? 'ar_SA' : `${localeStr}_${localeStr.toUpperCase()}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Calkilo AI Calorie Calculator App Logo" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </Head>
      <Layout>
        <Hero />
        <MealPlanning />
        <NutrientReplenishment />
        <HowItWorks />
        <DarkMode />
        <Integrations />
        <Testimonials />
        <Pricing />
        <Community />
        <ReadyToTransform />
        <FAQ />
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = validLocales.map((locale) => ({
    params: { locale },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string

  if (!locale || !validLocales.includes(locale)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}

