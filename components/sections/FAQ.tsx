import Link from 'next/link'
import { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How much does Eat Planner cost?',
      answer:
        'Calkilo offers flexible pricing plans. We have a free version with basic features, and Premium plans starting at $7.99/month. All plans include a 1-day free trial. Check our pricing section for detailed information.',
    },
    {
      question: 'How does the AI meal planning work?',
      answer:
        'Our AI analyzes your dietary preferences, health goals, and eating patterns to create personalized meal plans. Simply tell the AI your preferences, and it will suggest meals, recipes, and shopping lists tailored to you.',
    },
    {
      question: 'Can I change my preferences after onboarding?',
      answer:
        'Yes! You can update your dietary preferences, goals, and restrictions anytime from your profile settings. The AI will automatically adjust your meal plans and suggestions.',
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
      question: 'Do you include nutritional information?',
      answer:
        'Yes! Every meal and recipe includes detailed nutritional information including calories, macronutrients (protein, carbs, fats), vitamins, minerals, and more.',
    },
  ]

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2>
            Frequently Asked <span className="highlight-text">Questions</span>
          </h2>
          <p>Got a question? We&apos;ve got answers.</p>
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
            <p>Still have questions? Don&apos;t hesitate to reach out to our support team...</p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
