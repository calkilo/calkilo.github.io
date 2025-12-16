const Features = () => {
  const features = [
    {
      icon: 'bi-camera',
      title: 'Instant Photo Analysis',
      description:
        'Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.',
    },
    {
      icon: 'bi-cpu',
      title: 'Advanced AI Technology',
      description:
        'Our proprietary AI model recognizes thousands of foods and ingredients with 99.2% accuracy, learning from millions of food images.',
    },
    {
      icon: 'bi-graph-up',
      title: 'Detailed Nutrition Tracking',
      description:
        'Track not just calories, but also macronutrients, vitamins, and minerals to get a complete picture of your nutrition.',
    },
    {
      icon: 'bi-bullseye',
      title: 'Personalized Goals',
      description:
        'Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.',
    },
    {
      icon: 'bi-clock-history',
      title: 'Smart History',
      description:
        'View your eating patterns, track progress over time, and get insights to help you make better food choices.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Privacy First',
      description:
        'Your photos and data are processed securely with end-to-end encryption. Your privacy is our top priority.',
    },
  ]

  return (
    <section id="features" className="features" role="region" aria-labelledby="features-heading">
      <div className="container">
        <header className="section-header">
          <h2 id="features-heading">Why Choose Calkilo?</h2>
          <p>Revolutionary AI technology that makes calorie counting effortless and accurate</p>
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
