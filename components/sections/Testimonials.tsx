import { useState } from 'react'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      quote: 'CalKilo has completely transformed how I track my nutrition. The AI is incredibly accurate and the interface is so intuitive!',
      author: 'Sarah Johnson',
      date: '2 weeks ago',
      rating: 5,
    },
    {
      quote: 'I love how easy it is to just take a photo and get instant calorie counts. This app has helped me reach my fitness goals faster than ever.',
      author: 'Michael Chen',
      date: '1 month ago',
      rating: 5,
    },
    {
      quote: 'The meal planning feature is a game-changer. It suggests meals based on my preferences and dietary restrictions perfectly.',
      author: 'Emily Rodriguez',
      date: '3 weeks ago',
      rating: 5,
    },
    {
      quote: 'Best calorie tracking app I\'ve ever used. The dark mode is sleek and the AI recognition is spot-on every time.',
      author: 'David Kim',
      date: '1 week ago',
      rating: 5,
    },
    {
      quote: 'CalKilo makes nutrition tracking fun with gamification. I actually look forward to logging my meals now!',
      author: 'Jessica Martinez',
      date: '2 months ago',
      rating: 5,
    },
    {
      quote: 'The integration with my fitness tracker is seamless. Everything syncs perfectly and I get a complete picture of my health.',
      author: 'Robert Taylor',
      date: '1 month ago',
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
            What Are People Saying <span className="highlight-text">About Us</span>
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

