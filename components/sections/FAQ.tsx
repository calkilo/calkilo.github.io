import Link from 'next/link'
import { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How accurate is the AI food recognition?',
      answer:
        "Calkilo's AI has 99.2% accuracy, trained on millions of food images. It recognizes thousands of foods, ingredients, and dishes from various cuisines worldwide.",
    },
    {
      question: 'Is my food photo data private and secure?',
      answer:
        'Yes! Your photos are processed with end-to-end encryption and automatically deleted after analysis. We never share or sell your data, and you can delete your account anytime.',
    },
    {
      question: 'Do I need internet connection to use the app?',
      answer:
        'The app works offline for manual logging. AI photo analysis requires internet connection for the best accuracy, but you can save photos and analyze them later when connected.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Absolutely! You can cancel your subscription anytime from your account settings. You\'ll continue to have access until the end of your billing period.',
    },
    {
      question: 'Does it work with my fitness tracker?',
      answer:
        'Yes! Calkilo integrates with Apple Health, Google Fit, Fitbit, Samsung Health, Garmin, and more to sync your activity data automatically.',
    },
    {
      question: 'Is there a free trial for premium features?',
      answer:
        'Yes! We offer a 7-day free trial of Premium features. No credit card required. You can upgrade anytime from the free version.',
    },
  ]

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Got questions? We&apos;ve got answers</p>
        </div>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h4>{faq.question}</h4>
                <i className="bi bi-chevron-down"></i>
              </div>
              {openIndex === index && (
                <div className="faq-answer active">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="faq-more">
          <p>Have more questions?</p>
          <Link href="/faq" className="btn btn-outline">
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQ
