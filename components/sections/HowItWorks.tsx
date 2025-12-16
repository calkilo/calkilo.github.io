const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      icon: 'bi-camera-fill',
      title: 'Snap a Photo',
      description: 'Take a clear photo of your meal, snack, or drink. Our AI works with any food from any cuisine.',
    },
    {
      number: '2',
      icon: 'bi-robot',
      title: 'AI Analyzes',
      description: 'Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutrition data.',
    },
    {
      number: '3',
      icon: 'bi-clipboard-data',
      title: 'Track Progress',
      description: 'View detailed nutrition breakdown, track your goals, and watch your progress over time.',
    },
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Track your nutrition in three simple steps</p>
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
