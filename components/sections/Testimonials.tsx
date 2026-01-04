import { useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const Testimonials = () => {
  const { t } = useTranslation('common')
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      quote: t('testimonials.items.sarah.quote'),
      author: t('testimonials.items.sarah.author'),
      date: t('testimonials.items.sarah.date'),
      rating: 5,
    },
    {
      quote: t('testimonials.items.michael.quote'),
      author: t('testimonials.items.michael.author'),
      date: t('testimonials.items.michael.date'),
      rating: 5,
    },
    {
      quote: t('testimonials.items.emily.quote'),
      author: t('testimonials.items.emily.author'),
      date: t('testimonials.items.emily.date'),
      rating: 5,
    },
    {
      quote: t('testimonials.items.david.quote'),
      author: t('testimonials.items.david.author'),
      date: t('testimonials.items.david.date'),
      rating: 5,
    },
    {
      quote: t('testimonials.items.jessica.quote'),
      author: t('testimonials.items.jessica.author'),
      date: t('testimonials.items.jessica.date'),
      rating: 5,
    },
    {
      quote: t('testimonials.items.robert.quote'),
      author: t('testimonials.items.robert.author'),
      date: t('testimonials.items.robert.date'),
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>
            {t('testimonials.title')} <span className="highlight-text">{t('testimonials.titleHighlight')}</span>
          </h2>
        </div>
        <div className="testimonials-carousel">
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
                style={{ display: index >= currentIndex && index < currentIndex + 3 ? 'block' : 'none' }}
              >
                <div className="testimonial-content">
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <p>&quot;{testimonial.quote}&quot;</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>{testimonial.author.charAt(0)}</span>
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials-navigation">
            <button className="testimonial-nav-btn" onClick={prevTestimonial} aria-label="Previous testimonial">
              <i className="bi bi-chevron-left"></i>
            </button>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            <button className="testimonial-nav-btn" onClick={nextTestimonial} aria-label="Next testimonial">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

