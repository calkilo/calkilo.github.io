const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      icon: 'bi-camera-fill',
      title: 'Scan Your Meal',
      description: 'Take a photo of your food.',
    },
    {
      number: '2',
      icon: 'bi-robot',
      title: 'Get Instant Analysis',
      description: 'AI instantly recognizes your meal and calculates nutrition.',
    },
    {
      number: '3',
      icon: 'bi-clipboard-data',
      title: 'Track Your Progress',
      description: 'Monitor your daily progress and achieve your goals.',
    },
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How it Works?</h2>
          <p>Three simple steps to smarter calorie tracking.</p>
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
