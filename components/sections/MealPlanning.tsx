const MealPlanning = () => {
  const mealFeatures = [
    {
      icon: 'bi-lightning-charge',
      title: 'Smart Meal Suggestions',
      description: 'AI recommends meals based on your nutrition goals and eating patterns',
    },
    {
      icon: 'bi-calendar-week',
      title: 'Weekly Meal Plans',
      description: 'Generate complete weekly meal plans with shopping lists',
    },
    {
      icon: 'bi-heart',
      title: 'Dietary Preferences',
      description: 'Support for vegan, keto, paleo, gluten-free, and more',
    },
    {
      icon: 'bi-book',
      title: '10,000+ Recipes',
      description: 'Access thousands of healthy recipes with nutrition info',
    },
  ]

  return (
    <section id="meal-planning" className="meal-planning">
      <div className="container">
        <div className="meal-planning-content">
          <div className="meal-planning-text">
            <h2>AI-Powered Meal Planning & Recipes</h2>
            <p>Get personalized meal plans tailored to your goals, preferences, and dietary restrictions</p>
            <div className="meal-features">
              {mealFeatures.map((feature, index) => (
                <div key={index} className="meal-feature">
                  <i className={`bi ${feature.icon}`}></i>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="meal-planning-image">
            <div className="meal-card-stack">
              <div className="meal-card">
                <div className="meal-img-placeholder">🥗</div>
                <h4>Grilled Chicken Salad</h4>
                <div className="meal-macros">
                  <span>450 cal</span>
                  <span>35g protein</span>
                </div>
              </div>
              <div className="meal-card">
                <div className="meal-img-placeholder">🍳</div>
                <h4>Veggie Omelet</h4>
                <div className="meal-macros">
                  <span>320 cal</span>
                  <span>25g protein</span>
                </div>
              </div>
              <div className="meal-card">
                <div className="meal-img-placeholder">🥙</div>
                <h4>Quinoa Buddha Bowl</h4>
                <div className="meal-macros">
                  <span>520 cal</span>
                  <span>18g protein</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MealPlanning
