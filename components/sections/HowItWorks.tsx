import { useTranslation } from '../../hooks/useTranslation'

const HowItWorks = () => {
  const { t } = useTranslation('common')
  
  const steps = [
    {
      number: '1',
      icon: 'bi-camera-fill',
      title: t('howItWorks.steps.scan.title'),
      description: t('howItWorks.steps.scan.description'),
    },
    {
      number: '2',
      icon: 'bi-robot',
      title: t('howItWorks.steps.analysis.title'),
      description: t('howItWorks.steps.analysis.description'),
    },
    {
      number: '3',
      icon: 'bi-clipboard-data',
      title: t('howItWorks.steps.track.title'),
      description: t('howItWorks.steps.track.description'),
    },
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>{t('howItWorks.title')}</h2>
          <p>{t('howItWorks.subtitle')}</p>
        </div>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="step-item">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <i className={`bi ${step.icon}`}></i>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-arrow">
                  <i className="bi bi-arrow-right"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
