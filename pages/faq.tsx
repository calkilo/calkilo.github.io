import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function FAQ() {
  const { t, isLoading } = useTranslation('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [faqs, setFaqs] = useState<Array<{ category: string; question: string; answer: string }>>([])

  useEffect(() => {
    const loadFaqs = async () => {
      if (typeof window !== 'undefined' && !isLoading) {
        try {
          const lang = localStorage.getItem('preferred-language') || 'en'
          const response = await fetch(`/locales/${lang}/faq.json`)
          if (response.ok) {
            const data = await response.json()
            if (data.faqs && Array.isArray(data.faqs)) {
              setFaqs(data.faqs)
            }
          } else if (lang !== 'en') {
            // Fallback to English
            const enResponse = await fetch(`/locales/en/faq.json`)
            if (enResponse.ok) {
              const enData = await enResponse.json()
              if (enData.faqs && Array.isArray(enData.faqs)) {
                setFaqs(enData.faqs)
              }
            }
          }
        } catch (e) {
          console.error('Failed to load FAQs:', e)
        }
      }
    }
    loadFaqs()
  }, [isLoading])

  const filteredFaqs = faqs.filter(
    (faq) => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <Layout>
        <main className="faq-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div>Loading...</div>
        </main>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="canonical" href="https://calkilo.com/faq" />
      </Head>
      <Layout>
        <main className="faq-content">
          <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
            <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
              <li>
                <Link href="/" style={{ color: '#6366f1', textDecoration: 'none' }}>
                  {t('breadcrumb.home')}
                </Link>
              </li>
              <li aria-hidden="true" style={{ color: '#9ca3af' }}>
                /
              </li>
              <li aria-current="page" style={{ color: '#6b7280' }}>
                {t('breadcrumb.current')}
              </li>
            </ol>
          </nav>

          <Link href="/" className="back-link">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            {t('backToHome')}
          </Link>

          <div className="faq-header">
            <h1>{t('header.title')}</h1>
            <p>{t('header.subtitle')}</p>
          </div>

          <div className="faq-search">
            <i className="bi bi-search" aria-hidden="true"></i>
            <input
              type="text"
              id="searchInput"
              placeholder={t('search.placeholder')}
              aria-label={t('search.label')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="faq-sections">
            <div className="faq-section">
              <h2>{t('section.allQuestions')}</h2>
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
                  <h3>{t('noResults.title')}</h3>
                  <p>{t('noResults.message')}</p>
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
