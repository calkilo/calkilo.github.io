import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions - Calkilo AI Calorie Calculator App</title>
        <meta
          name="description"
          content="Calkilo Terms & Conditions - Read our terms and conditions for using the AI-powered calorie calculator app. User agreement and usage terms."
        />
        <link rel="canonical" href="https://calkilo.com/terms-and-conditions" />
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
                Terms & Conditions
              </li>
            </ol>
          </nav>

          <Link href="/" className="back-link">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to Home
          </Link>

          <h1>Terms & Conditions</h1>
          <p className="last-updated">Last updated: January 15, 2024</p>

          <p>
            Welcome to Calkilo! These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of our AI-powered calorie calculator mobile application (&quot;App&quot;), website, and related services (collectively, the &quot;Services&quot;) provided by Calkilo (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using Calkilo, you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree with any of these Terms, you are prohibited from using or accessing the Services.
          </p>

          <h2>2. Use License</h2>
          <h3>2.1 Permission to Use</h3>
          <p>Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to:</p>
          <ul>
            <li>Download and install the App on your personal mobile device</li>
            <li>Access and use the Services for your personal, non-commercial use</li>
            <li>Use the App&apos;s features and functionality as intended</li>
          </ul>

          <h2>3. Health and Medical Disclaimer</h2>
          <p>
            <strong>IMPORTANT MEDICAL DISCLAIMER:</strong>
          </p>
          <p>
            Calkilo is a nutrition tracking tool and is not intended to diagnose, treat, cure, or prevent any disease or medical condition. The information provided by our App is for general informational purposes only and should not be considered as medical advice.
          </p>
          <ul>
            <li>Always consult with qualified healthcare professionals before making dietary changes</li>
            <li>Our calorie and nutrition calculations are estimates and may not be 100% accurate</li>
            <li>Individual nutritional needs vary based on health conditions, medications, age, and other factors</li>
            <li>We are not responsible for any health outcomes resulting from use of our Services</li>
          </ul>

          <h2>4. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CALKILO AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
          </p>

          <h2>5. Contact Information</h2>
          <p>If you have any questions about these Terms & Conditions, please contact us:</p>
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
