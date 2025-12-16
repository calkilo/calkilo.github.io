import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I download and install Calkilo?',
      answer:
        'Calkilo is available for free download on both iOS and Android devices. Visit the App Store for iOS or Google Play Store for Android, search for "Calkilo", or click the download button on our website.',
    },
    {
      category: 'getting-started',
      question: 'Do I need to create an account to use Calkilo?',
      answer:
        'While you can use some basic features without an account, creating a free account allows you to save your nutrition history, sync data across devices, set personalized health goals, and access advanced AI features.',
    },
    {
      category: 'features',
      question: 'What features does Calkilo offer?',
      answer:
        'Calkilo offers AI photo analysis, macronutrient tracking, nutrition history, goal setting, progress tracking, extensive food database, export options, and offline mode for basic features.',
    },
    {
      category: 'accuracy',
      question: 'How accurate is Calkilo\'s AI calorie calculation?',
      answer:
        'Calkilo\'s AI achieves 99.2% accuracy in calorie calculation through advanced computer vision and machine learning trained on millions of food images.',
    },
    {
      category: 'privacy',
      question: 'Is my food photo data private and secure?',
      answer:
        'Yes! Your photos are processed with end-to-end encryption and automatically deleted after analysis. We never share or sell your data, and you can delete your account anytime.',
    },
    {
      category: 'technical',
      question: 'What devices and operating systems are supported?',
      answer:
        'Calkilo supports iPhone and iPad running iOS 12.0 or later, and Android phones and tablets running Android 8.0 or later.',
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>FAQ - Frequently Asked Questions | Calkilo AI Calorie Calculator</title>
        <meta
          name="description"
          content="Find answers to common questions about Calkilo AI calorie calculator app. Learn about features, accuracy, privacy, and how to use the app effectively."
        />
        <link rel="canonical" href="https://calkilo.com/faq" />
      </Head>
      <Layout>
        <main className="faq-content">
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
                FAQ
              </li>
            </ol>
          </nav>

          <Link href="/" className="back-link">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to Home
          </Link>

          <div className="faq-header">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about Calkilo and how to make the most of our AI-powered calorie calculator.</p>
          </div>

          <div className="faq-search">
            <i className="bi bi-search" aria-hidden="true"></i>
            <input
              type="text"
              id="searchInput"
              placeholder="Search FAQ..."
              aria-label="Search frequently asked questions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="faq-sections">
            <div className="faq-section">
              <h2>All Questions</h2>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className={`faq-question ${openIndex === index ? 'active' : ''}`}
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                      {faq.question}
                      <i className="bi bi-plus faq-icon" aria-hidden="true"></i>
                    </button>
                    {openIndex === index && (
                      <div className="faq-answer active">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <i className="bi bi-search" aria-hidden="true"></i>
                  <h3>No results found</h3>
                  <p>Try searching with different keywords.</p>
                </div>
              )}
            </div>
          </div>
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
