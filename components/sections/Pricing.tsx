import { useTranslation } from '../../hooks/useTranslation'

const Pricing = () => {
  const { t } = useTranslation('common')
  
  const plans = [
    {
      name: t('pricing.plans.month1.name'),
      price: '$7.99',
      originalPrice: '$9.99',
      period: '/ month',
      features: [
        t('pricing.features.mealPlans'),
        t('pricing.features.shoppingLists'),
        t('pricing.features.aiInsights'),
        t('pricing.features.dietaryPreferences'),
        t('pricing.features.orderLogs'),
        t('pricing.features.customerSupport'),
      ],
      buttonText: t('pricing.plans.month1.buttonText'),
      featured: false,
    },
    {
      name: t('pricing.plans.month3.name'),
      price: '$21.99',
      originalPrice: '$27.99',
      period: '/ 3 months',
      features: [
        t('pricing.features.mealPlans'),
        t('pricing.features.shoppingLists'),
        t('pricing.features.aiInsights'),
        t('pricing.features.dietaryPreferences'),
        t('pricing.features.orderLogs'),
        t('pricing.features.customerSupport'),
        t('pricing.features.aiChat'),
      ],
      buttonText: t('pricing.plans.month3.buttonText'),
      featured: true,
    },
    {
      name: t('pricing.plans.month6.name'),
      price: '$59.99',
      originalPrice: '$69.99',
      period: '/ 6 months',
      features: [
        t('pricing.features.mealPlans'),
        t('pricing.features.shoppingLists'),
        t('pricing.features.aiInsights'),
        t('pricing.features.dietaryPreferences'),
        t('pricing.features.orderLogs'),
        t('pricing.features.customerSupport'),
        t('pricing.features.aiChat'),
      ],
      buttonText: t('pricing.plans.month6.buttonText'),
      featured: false,
    },
  ]

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-header">
          <p className="pricing-intro">{t('pricing.intro')}</p>
        </div>
        <div className="pricing-cta">
          <div className="pricing-banner">
            <p className="pricing-banner-text">{t('pricing.bannerText')}</p>
            <button className="pricing-go-premium-btn">{t('pricing.goPremium')}</button>
          </div>
          <p className="pricing-security">{t('pricing.security')}</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="popular-badge">{t('pricing.badges.bestValue')}</div>}
              {index === 2 && <div className="sale-badge">{t('pricing.badges.newSale')}</div>}
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

