import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Hero from '../components/sections/Hero'
import MealPlanning from '../components/sections/MealPlanning'
import NutrientReplenishment from '../components/sections/NutrientReplenishment'
import HowItWorks from '../components/sections/HowItWorks'
import DarkMode from '../components/sections/DarkMode'
import Integrations from '../components/sections/Integrations'
import Testimonials from '../components/sections/Testimonials'
import Pricing from '../components/sections/Pricing'
import Community from '../components/sections/Community'
import ReadyToTransform from '../components/sections/ReadyToTransform'
import FAQ from '../components/sections/FAQ'
import Head from 'next/head'

export default function Home() {
  const siteUrl = 'https://calkilo.com'
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
    sameAs: [
      // Add social media links when available
    ],
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
        <meta name="language" content="English" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Calkilo AI Calorie Calculator App Logo" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
