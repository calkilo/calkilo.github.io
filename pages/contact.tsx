import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you within 24 hours.')
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Contact Us - Calkilo AI Calorie Calculator Support</title>
        <meta
          name="description"
          content="Contact Calkilo support team for help with our AI calorie calculator app. Get assistance with features, technical issues, and general inquiries."
        />
        <link rel="canonical" href="https://calkilo.com/contact" />
      </Head>
      <Layout>
        <main className="contact-content">
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
                Contact
              </li>
            </ol>
          </nav>

          <Link href="/" className="back-link">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to Home
          </Link>

          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>We&apos;re here to help! Get in touch with our support team for assistance with Calkilo or any questions you may have.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <div className="contact-item">
                <i className="bi bi-envelope" aria-hidden="true"></i>
                <div className="contact-item-content">
                  <h3>General Support</h3>
                  <p>
                    <a href="mailto:support@calkilo.app">support@calkilo.app</a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-headset" aria-hidden="true"></i>
                <div className="contact-item-content">
                  <h3>Technical Support</h3>
                  <p>
                    <a href="mailto:tech@calkilo.app">tech@calkilo.app</a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-shield-check" aria-hidden="true"></i>
                <div className="contact-item-content">
                  <h3>Privacy & Legal</h3>
                  <p>
                    <a href="mailto:privacy@calkilo.app">privacy@calkilo.app</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h2>Send us a Message</h2>
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
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
                    <label htmlFor="lastName">Last Name *</label>
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
                  <label htmlFor="email">Email Address *</label>
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
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="privacy">Privacy Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Please describe your inquiry in detail..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  <i className="bi bi-send" aria-hidden="true"></i>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
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
