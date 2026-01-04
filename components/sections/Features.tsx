import { useTranslation } from '../../hooks/useTranslation'

const Features = () => {
  const { t } = useTranslation('common')
  
  const features = [
    {
      icon: 'bi-camera',
      title: t('features.items.photoAnalysis.title'),
      description: t('features.items.photoAnalysis.description'),
    },
    {
      icon: 'bi-cpu',
      title: t('features.items.aiTechnology.title'),
      description: t('features.items.aiTechnology.description'),
    },
    {
      icon: 'bi-graph-up',
      title: t('features.items.nutritionTracking.title'),
      description: t('features.items.nutritionTracking.description'),
    },
    {
      icon: 'bi-bullseye',
      title: t('features.items.personalizedGoals.title'),
      description: t('features.items.personalizedGoals.description'),
    },
    {
      icon: 'bi-clock-history',
      title: t('features.items.smartHistory.title'),
      description: t('features.items.smartHistory.description'),
    },
    {
      icon: 'bi-shield-check',
      title: t('features.items.privacyFirst.title'),
      description: t('features.items.privacyFirst.description'),
    },
  ]

  return (
    <section id="features" className="features" role="region" aria-labelledby="features-heading">
      <div className="container">
        <header className="section-header">
          <h2 id="features-heading">{t('features.title')}</h2>
          <p>{t('features.subtitle')}</p>
        </header>
        <div className="features-grid" role="list">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={`bi ${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
