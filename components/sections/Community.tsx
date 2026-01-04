import { useTranslation } from '../../hooks/useTranslation'

const Community = () => {
  const { t } = useTranslation('common')
  
  const communityFeatures = [
    { icon: 'bi-trophy', title: t('community.features.challenges.title'), description: t('community.features.challenges.description') },
    { icon: 'bi-share', title: t('community.features.share.title'), description: t('community.features.share.description') },
    { icon: 'bi-trophy', title: t('community.features.leaderboard.title'), description: t('community.features.leaderboard.description') },
    { icon: 'bi-person-plus', title: t('community.features.invite.title'), description: t('community.features.invite.description') },
  ]

  return (
    <section id="community" className="community">
      <div className="container">
        <div className="section-header">
          <h2>{t('community.title')}</h2>
          <p>{t('community.subtitle')}</p>
        </div>
        <div className="community-grid">
          {communityFeatures.map((feature, index) => (
            <div key={index} className="community-card">
              <div className="community-icon">
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

export default Community
