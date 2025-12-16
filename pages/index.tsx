import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Hero from '../components/sections/Hero'
import HowItWorks from '../components/sections/HowItWorks'
import Screenshots from '../components/sections/Screenshots'
import Integrations from '../components/sections/Integrations'
import MealPlanning from '../components/sections/MealPlanning'
import Community from '../components/sections/Community'
import FAQ from '../components/sections/FAQ'
import Download from '../components/sections/Download'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Calkilo - AI Calorie Calculator App | Track Nutrition with AI Technology</title>
        <meta
          name="description"
          content="Calkilo is the most accurate AI-powered calorie calculator app. Simply take a photo of your food and get instant calorie counts, macronutrients, and nutrition tracking. Download free for iOS and Android."
        />
        <meta name="keywords" content="AI calorie calculator, calorie counter app, nutrition tracking, food photo analysis, diet app, calorie tracker, AI nutrition, mobile health app, food recognition, macro tracking" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://calkilo.com/" />
      </Head>
      <Layout>
        <Hero />
        <HowItWorks />
        <Screenshots />
        <Integrations />
        <MealPlanning />
        <Community />
        <FAQ />
        <Download />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
