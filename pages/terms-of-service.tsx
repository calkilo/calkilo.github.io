import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - Calkilo AI Calorie Calculator App</title>
        <meta
          name="description"
          content="Calkilo Terms of Service - Read our terms and conditions for using the AI-powered calorie calculator app. User agreement and service terms."
        />
        <link rel="canonical" href="https://calkilo.com/terms-of-service" />
      </Head>
      <Layout>
        <main className="legal-content">
          <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
            <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
              <li>
                <Link href="/" style={{ color: '#6366f1', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true" style={{ color: '#9ca3af' }}>
                /
              </li>
              <li aria-current="page" style={{ color: '#6b7280' }}>
                Terms of Service
              </li>
            </ol>
          </nav>

          <Link href="/" className="back-link">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to Home
          </Link>

          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: January 15, 2024</p>

          <p>
            Welcome to Calkilo! These Terms of Service (&quot;Terms&quot;) govern your use of our AI-powered calorie calculator mobile application (&quot;App&quot;) and related services provided by Calkilo (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By downloading, installing, or using our App, you agree to be bound by these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our App, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our App. We reserve the right to modify these Terms at any time, and your continued use of the App constitutes acceptance of any changes.
          </p>

          <h2>2. Description of Service</h2>
          <p>Calkilo is an AI-powered mobile application that:</p>
          <ul>
            <li>Analyzes food photos to calculate calories and nutritional information</li>
            <li>Provides personalized nutrition tracking and goal setting</li>
            <li>Offers dietary recommendations based on your health goals</li>
            <li>Maintains a history of your food intake and nutritional data</li>
          </ul>

          <h2>3. Health and Medical Disclaimer</h2>
          <p>
            <strong>IMPORTANT:</strong> Calkilo is not a medical device or healthcare provider. Our App provides general nutritional information and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <ul>
            <li>Always consult with qualified healthcare professionals before making dietary changes</li>
            <li>Our calorie calculations are estimates and may not be 100% accurate</li>
            <li>Individual nutritional needs vary based on health conditions, medications, and other factors</li>
            <li>We are not responsible for any health outcomes resulting from use of our App</li>
          </ul>

          <h2>4. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, CALKILO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING FROM YOUR USE OF THE APP.
          </p>

          <h2>5. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <ul>
            <li>
              <strong>Email:</strong> legal@calkilo.app
            </li>
            <li>
              <strong>Address:</strong> Calkilo Legal Team, 123 Health Tech Street, San Francisco, CA 94105
            </li>
          </ul>
        </main>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
