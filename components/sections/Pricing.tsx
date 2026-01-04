const Pricing = () => {
  const plans = [
    {
      name: 'Premium 1 Month',
      price: '$7.99',
      originalPrice: '$9.99',
      period: '/ month',
      features: [
        'Personalized meal plans',
        'Smart grocery shopping lists',
        'AI-based insights',
        'Dietary preferences settings',
        'Mobile & tablet order logs',
        'Customer support',
      ],
      buttonText: 'Start for 1 Month',
      featured: false,
    },
    {
      name: 'Premium 3 Month',
      price: '$21.99',
      originalPrice: '$27.99',
      period: '/ 3 months',
      features: [
        'Personalized meal plans',
        'Smart grocery shopping lists',
        'AI-based insights',
        'Dietary preferences settings',
        'Mobile & tablet order logs',
        'Customer support',
        '24/7 personalized AI chat',
      ],
      buttonText: 'Try it Now',
      featured: true,
    },
    {
      name: 'Premium 6 Month',
      price: '$59.99',
      originalPrice: '$69.99',
      period: '/ 6 months',
      features: [
        'Personalized meal plans',
        'Smart grocery shopping lists',
        'AI-based insights',
        'Dietary preferences settings',
        'Mobile & tablet order logs',
        'Customer support',
        '24/7 personalized AI chat',
      ],
      buttonText: 'Get Premium',
      featured: false,
    },
  ]

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-header">
          <p className="pricing-intro">Choose the perfect plan for your family&apos;s meal planning needs.</p>
        </div>
        <div className="pricing-cta">
          <div className="pricing-banner">
            <p className="pricing-banner-text">Start For Free With Gamification & Unlock More Features Anytime</p>
            <button className="pricing-go-premium-btn">Go premium now</button>
          </div>
          <p className="pricing-security">My credit card is secure</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="popular-badge">Best Value</div>}
              {index === 2 && <div className="sale-badge">New Sale</div>}
              <div className="pricing-header">
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
                <div className="price-note">
                  <span className="original-price">{plan.originalPrice}</span>
                </div>
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={`pricing-btn ${plan.featured ? 'btn-primary' : 'btn-outline'}`}>
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing

