import { useTranslation } from '../../hooks/useTranslation'

const Integrations = () => {
  const { t } = useTranslation('common')
  
  const integrations = [
    { icon: 'bi-apple', title: t('integrations.appleHealth.title'), description: t('integrations.appleHealth.description') },
    { icon: 'bi-heart-pulse', title: t('integrations.googleFit.title'), description: t('integrations.googleFit.description') },
    { icon: 'bi-smartwatch', title: t('integrations.fitbit.title'), description: t('integrations.fitbit.description') },
    { icon: 'bi-watch', title: t('integrations.samsungHealth.title'), description: t('integrations.samsungHealth.description') },
    { icon: 'bi-activity', title: t('integrations.garmin.title'), description: t('integrations.garmin.description') },
    { icon: 'bi-phone', title: t('integrations.strava.title'), description: t('integrations.strava.description') },
  ]

  return (
    <section id="integrations" className="integrations">
      <div className="container">
        <div className="section-header">
          <h2>{t('integrations.title')}</h2>
          <p>{t('integrations.subtitle')}</p>
        </div>
        <div className="integrations-grid">
          {integrations.map((integration, index) => (
            <div key={index} className="integration-card">
              <div className="integration-icon">
                <i className={`bi ${integration.icon}`}></i>
              </div>
              <h3>{integration.title}</h3>
              <p>{integration.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Integrations
