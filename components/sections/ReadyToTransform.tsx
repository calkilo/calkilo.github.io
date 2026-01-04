const ReadyToTransform = () => {
  return (
    <section id="ready-to-transform" className="ready-to-transform">
      <div className="container">
        <div className="ready-to-transform-content">
          <div className="ready-to-transform-visual">
            <div className="phone-mockup-transform">
              <div className="phone-screen-transform">
                <div className="app-interface-transform">
                  <div className="transform-header">
                    <div className="transform-logo">CalKilo</div>
                    <div className="transform-trophy">🏆</div>
                  </div>
                  <div className="transform-progress">
                    <div className="transform-ring">
                      <div className="transform-ring-fill" style={{ '--progress': '75%' } as React.CSSProperties}></div>
                      <span className="transform-ring-value">1125</span>
                      <span className="transform-ring-label">Kcal</span>
                    </div>
                  </div>
                  <div className="transform-icons">
                    <span className="transform-icon">🥑</span>
                    <span className="transform-icon">🌶️</span>
                    <span className="transform-icon">💪</span>
                    <span className="transform-icon">🥗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ready-to-transform-text">
            <h2>
              Ready to Transform Your Nutrition? <span className="highlight-text">Get CalKilo For Free</span>
            </h2>
            <p>Download the app to track, calculate & crush your health goals.</p>
            <div className="download-options">
              <div className="download-buttons-transform">
                <a href="#" className="download-btn-transform" aria-label="Download on App Store">
                  <i className="bi bi-apple"></i>
                  <div className="download-btn-text">
                    <span className="download-btn-label">Download on the</span>
                    <span className="download-btn-platform">App Store</span>
                  </div>
                </a>
                <a href="#" className="download-btn-transform" aria-label="Get it on Google Play">
                  <i className="bi bi-google-play"></i>
                  <div className="download-btn-text">
                    <span className="download-btn-label">Get it on</span>
                    <span className="download-btn-platform">Google Play</span>
                  </div>
                </a>
              </div>
              <p className="qr-code-intro">Or Scan to download!</p>
              <div className="qr-code-container">
                <div className="qr-code-placeholder">
                  <div className="qr-code-grid">
                    {[...Array(25)].map((_, i) => (
                      <div key={i} className={`qr-square ${Math.random() > 0.5 ? 'filled' : ''}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReadyToTransform

