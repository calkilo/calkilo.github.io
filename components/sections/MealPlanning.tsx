import { useTranslation } from '../../hooks/useTranslation'

const MealPlanning = () => {
  const { t } = useTranslation('common')
  
  const mealFeatures = [
    {
      icon: 'bi-graph-up-arrow',
      title: t('mealPlanning.features.analysis.title'),
      description: t('mealPlanning.features.analysis.description'),
    },
    {
      icon: 'bi-chat-dots',
      title: t('mealPlanning.features.chat.title'),
      description: t('mealPlanning.features.chat.description'),
    },
    {
      icon: 'bi-bullseye',
      title: t('mealPlanning.features.goals.title'),
      description: t('mealPlanning.features.goals.description'),
    },
    {
      icon: 'bi-camera',
      title: t('mealPlanning.features.photo.title'),
      description: t('mealPlanning.features.photo.description'),
    },
  ]

  return (
    <section id="meal-planning" className="meal-planning">
      <div className="container">
        <div className="meal-planning-content">
          <div className="meal-planning-phone">
            <div className="meal-planning-mockup">
              <div className="meal-planning-screen">
                <div className="meal-planning-interface">
                  <div className="chat-header">
                    <div className="chat-avatar">🤖</div>
                    <div className="chat-info">
                      <span className="chat-name">{t('mealPlanning.chatName')}</span>
                      <span className="chat-status">{t('mealPlanning.chatStatus')}</span>
                    </div>
                  </div>
                  <div className="chat-messages">
                    <div className="chat-message bot">
                      <p>{t('mealPlanning.chatBotMessage1')}</p>
                    </div>
                    <div className="chat-message user">
                      <p>{t('mealPlanning.chatUserMessage')}</p>
                    </div>
                    <div className="chat-message bot">
                      <p>{t('mealPlanning.chatBotMessage2')}</p>
                    </div>
                  </div>
                  <div className="chat-input-area">
                    <input type="text" placeholder={t('mealPlanning.chatPlaceholder')} className="chat-input" />
                    <button className="chat-send">
                      <i className="bi bi-send"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Green circular labels */}
            <div className="feature-label ai-chat-label">
              <span>{t('mealPlanning.aiChat')}</span>
            </div>
            <div className="feature-label recipes-label">
              <span>{t('mealPlanning.recipes')}</span>
            </div>
            <div className="feature-label support-label">
              <span>{t('mealPlanning.supportReport')}</span>
            </div>
          </div>
          <div className="meal-planning-text">
            <h2>{t('mealPlanning.title')}</h2>
            <p className="meal-planning-subtitle">{t('mealPlanning.subtitle')}</p>
            <div className="meal-features">
              {mealFeatures.map((feature, index) => (
                <div key={index} className="meal-feature">
                  <div className="meal-feature-icon">
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <div className="meal-feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MealPlanning
