const Integrations = () => {
  const integrations = [
    { icon: 'bi-apple', title: 'Apple Health', description: 'Sync calories, workouts, and health metrics' },
    { icon: 'bi-heart-pulse', title: 'Google Fit', description: 'Connect activities and track your daily movement' },
    { icon: 'bi-smartwatch', title: 'Fitbit', description: 'Automatic activity and exercise tracking' },
    { icon: 'bi-watch', title: 'Samsung Health', description: 'Complete health data synchronization' },
    { icon: 'bi-activity', title: 'Garmin', description: 'Track workouts and sports activities' },
    { icon: 'bi-phone', title: 'Strava', description: 'Sync running and cycling activities' },
  ]

  return (
    <section id="integrations" className="integrations">
      <div className="container">
        <div className="section-header">
          <h2>Seamlessly Integrates with Your Devices</h2>
          <p>Sync with your favorite health and fitness apps for a complete wellness picture</p>
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
