import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const FAQ = () => {
  const { t } = useTranslation('common')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: t('faq.questions.cost.question'),
      answer: t('faq.questions.cost.answer'),
    },
    {
      question: t('faq.questions.aiMealPlanning.question'),
      answer: t('faq.questions.aiMealPlanning.answer'),
    },
    {
      question: t('faq.questions.changePreferences.question'),
      answer: t('faq.questions.changePreferences.answer'),
    },
    {
      question: t('faq.questions.privacy.question'),
      answer: t('faq.questions.privacy.answer'),
    },
    {
      question: t('faq.questions.internet.question'),
      answer: t('faq.questions.internet.answer'),
    },
    {
      question: t('faq.questions.nutritionInfo.question'),
      answer: t('faq.questions.nutritionInfo.answer'),
    },
  ]

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2>
            {t('faq.title')} <span className="highlight-text">{t('faq.titleHighlight')}</span>
          </h2>
          <p>{t('faq.subtitle')}</p>
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
          <div className="faq-contact-box">
            <p>{t('faq.contactText')}</p>
            <Link href="/contact" className="btn btn-primary">
              {t('faq.contactButton')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
