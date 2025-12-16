import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Calkilo AI Calorie Calculator App</title>
        <meta
          name="description"
          content="Calkilo Privacy Policy - Learn how we protect your personal data and health information in our AI-powered calorie calculator app. GDPR and CCPA compliant."
        />
        <link rel="canonical" href="https://calkilo.com/privacy-policy" />
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
                Privacy Policy
              </li>
            </ol>
          </nav>

          <Link href="/" className="back-link">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to Home
          </Link>

          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: January 15, 2024</p>

          <p>
            At Calkilo, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered calorie calculator mobile application (&quot;App&quot;) and related services.
          </p>

          <h2>1. Information We Collect</h2>
          <h3>1.1 Personal Information</h3>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> Email address, username, and password when you create an account
            </li>
            <li>
              <strong>Profile Information:</strong> Age, gender, height, weight, activity level, and health goals
            </li>
            <li>
              <strong>Health Data:</strong> Food photos, calorie counts, nutritional information, and dietary preferences
            </li>
            <li>
              <strong>Usage Data:</strong> App usage patterns, features used, and interaction data
            </li>
            <li>
              <strong>Device Information:</strong> Device type, operating system, unique device identifiers, and IP address
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>
              <strong>Core Services:</strong> To provide AI-powered calorie calculation and nutrition tracking
            </li>
            <li>
              <strong>Personalization:</strong> To customize your experience and provide relevant recommendations
            </li>
            <li>
              <strong>Improvement:</strong> To enhance our AI algorithms and app functionality
            </li>
            <li>
              <strong>Communication:</strong> To send you important updates, notifications, and support
            </li>
            <li>
              <strong>Analytics:</strong> To understand usage patterns and improve our services
            </li>
            <li>
              <strong>Legal Compliance:</strong> To comply with applicable laws and regulations
            </li>
          </ul>

          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your information:</p>
          <ul>
            <li>
              <strong>Encryption:</strong> All data is encrypted in transit and at rest using AES-256 encryption
            </li>
            <li>
              <strong>Access Controls:</strong> Strict access controls and authentication protocols
            </li>
            <li>
              <strong>Regular Audits:</strong> Regular security audits and vulnerability assessments
            </li>
            <li>
              <strong>Secure Infrastructure:</strong> Hosted on secure, SOC 2 compliant cloud infrastructure
            </li>
          </ul>

          <h2>4. Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Delete your account and associated data</li>
            <li>Export your data in a portable format</li>
            <li>Opt-out of certain data processing activities</li>
          </ul>

          <h2>5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
          <ul>
            <li>
              <strong>Email:</strong> privacy@calkilo.app
            </li>
            <li>
              <strong>Address:</strong> Calkilo Privacy Team, 123 Health Tech Street, San Francisco, CA 94105
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
