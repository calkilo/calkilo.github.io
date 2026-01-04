const MealPlanning = () => {
  const mealFeatures = [
    {
      icon: 'bi-graph-up-arrow',
      title: 'Analysis and AI suggestions',
      description: 'Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.',
    },
    {
      icon: 'bi-chat-dots',
      title: 'Chat & AI Agent',
      description: 'Chat with support at any time, make changes to meals, receive recipes for different foods & any help with your diet.',
    },
    {
      icon: 'bi-bullseye',
      title: 'Personalized Goals',
      description: 'Set and track personalized health goals with AI-powered recommendations based on your features and preferences.',
    },
    {
      icon: 'bi-camera',
      title: 'Instant Photo Analysis',
      description: 'Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.',
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
                      <span className="chat-name">CalKilo AI</span>
                      <span className="chat-status">Online</span>
                    </div>
                  </div>
                  <div className="chat-messages">
                    <div className="chat-message bot">
                      <p>Hey! I can help you create personalized meal plans based on your goals and preferences. What would you like to focus on today?</p>
                    </div>
                    <div className="chat-message user">
                      <p>I want to lose weight and build muscle</p>
                    </div>
                    <div className="chat-message bot">
                      <p>Great! I&apos;ll create a meal plan with high protein, moderate carbs, and healthy fats. Let me suggest some options...</p>
                    </div>
                  </div>
                  <div className="chat-input-area">
                    <input type="text" placeholder="Type your message..." className="chat-input" />
                    <button className="chat-send">
                      <i className="bi bi-send"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Green circular labels */}
            <div className="feature-label ai-chat-label">
              <span>AI Chat</span>
            </div>
            <div className="feature-label recipes-label">
              <span>Recipes</span>
            </div>
            <div className="feature-label support-label">
              <span>Support & Report</span>
            </div>
          </div>
          <div className="meal-planning-text">
            <h2>CalKilo-AI: Powered Agent, Meal Planning & Recipes</h2>
            <p className="meal-planning-subtitle">Hey, What&apos;s Up? Get personalized meal plans, tailored to your goals, preferences, and dietary restrictions.</p>
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
