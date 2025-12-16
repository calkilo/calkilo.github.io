const Trust = () => {
  const trustFeatures = [
    { icon: 'bi-shield-check', title: 'End-to-End Encryption', description: 'All your data is encrypted using AES-256 encryption' },
    { icon: 'bi-lock', title: 'GDPR Compliant', description: 'Fully compliant with international data protection regulations' },
    { icon: 'bi-eye-slash', title: 'We Never Sell Your Data', description: 'Your information stays private. No third-party data sharing' },
    { icon: 'bi-trash', title: 'Auto-Delete Photos', description: 'Photos are deleted immediately after processing' },
    { icon: 'bi-hospital', title: 'HIPAA Compliant', description: 'Meets healthcare data security standards' },
    { icon: 'bi-person-check', title: "You're In Control", description: 'Export or delete your data anytime with one click' },
  ]

  return (
    <section id="trust" className="trust">
      <div className="container">
        <div className="section-header">
          <h2>Your Privacy & Security Matters</h2>
          <p>We take data protection seriously with industry-leading security measures</p>
        </div>
        <div className="trust-grid">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="trust-card">
              <div className="trust-badge">
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

export default Trust
