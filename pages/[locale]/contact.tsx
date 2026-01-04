import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from '../../hooks/useTranslation'

const validLocales = ['en', 'fa', 'zh', 'ru', 'it', 'fr', 'de', 'ar', 'es', 'nl']

export default function ContactLocale() {
  const router = useRouter()
  const { locale } = router.query
  const localeStr = typeof locale === 'string' ? locale : 'en'
  const { t, isLoading } = useTranslation('contact')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      alert(t('form.success'))
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  if (isLoading) {
    return (
      <Layout>
        <main className="contact-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div>Loading...</div>
        </main>
      </Layout>
    )
  }

  const basePath = localeStr && localeStr !== 'en' ? `/${localeStr}` : ''
  const canonicalUrl = `https://calkilo.com${basePath}/contact`

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout>
        <main className="contact-content">
          <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
            <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
              <li>
                <Link href={basePath || '/'} style={{ color: '#6366f1', textDecoration: 'none' }}>
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

          <Link href={basePath || '/'} className="back-link">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            {t('backToHome')}
          </Link>

          <div className="contact-header">
            <h1>{t('header.title')}</h1>
            <p>{t('header.subtitle')}</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h2>{t('contactInfo.title')}</h2>
              <div className="contact-item">
                <i className="bi bi-envelope" aria-hidden="true"></i>
                <div className="contact-item-content">
                  <h3>{t('contactInfo.generalSupport.title')}</h3>
                  <p>
                    <a href={`mailto:${t('contactInfo.generalSupport.email')}`}>{t('contactInfo.generalSupport.email')}</a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-headset" aria-hidden="true"></i>
                <div className="contact-item-content">
                  <h3>{t('contactInfo.technicalSupport.title')}</h3>
                  <p>
                    <a href={`mailto:${t('contactInfo.technicalSupport.email')}`}>{t('contactInfo.technicalSupport.email')}</a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-shield-check" aria-hidden="true"></i>
                <div className="contact-item-content">
                  <h3>{t('contactInfo.privacyLegal.title')}</h3>
                  <p>
                    <a href={`mailto:${t('contactInfo.privacyLegal.email')}`}>{t('contactInfo.privacyLegal.email')}</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h2>{t('form.title')}</h2>
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">{t('form.firstName')} {t('form.required')}</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">{t('form.lastName')} {t('form.required')}</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('form.email')} {t('form.required')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{t('form.subject')} {t('form.required')}</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">{t('form.subjectPlaceholder')}</option>
                    <option value="general">{t('form.subjectOptions.general')}</option>
                    <option value="technical">{t('form.subjectOptions.technical')}</option>
                    <option value="billing">{t('form.subjectOptions.billing')}</option>
                    <option value="feature">{t('form.subjectOptions.feature')}</option>
                    <option value="bug">{t('form.subjectOptions.bug')}</option>
                    <option value="privacy">{t('form.subjectOptions.privacy')}</option>
                    <option value="other">{t('form.subjectOptions.other')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t('form.message')} {t('form.required')}</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t('form.messagePlaceholder')}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  <i className="bi bi-send" aria-hidden="true"></i>
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </button>
              </form>
            </div>
          </div>
        </main>
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

