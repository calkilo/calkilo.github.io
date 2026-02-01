const Download = () => {
  return (
    <section id="download" className="download">
      <div className="container">
        <div className="download-content">
          <h2>Ready to Transform Your Nutrition?</h2>
          <p>Download Calkilo today and experience the future of calorie counting</p>
          <div className="download-buttons">
            <button type="button" className="download-btn" disabled aria-disabled="true" title="Download coming soon">
              <div className="download-icon">
                <i className="bi bi-apple"></i>
              </div>
              <div className="download-text">
                <span className="download-label">Download on the</span>
                <span className="download-platform">App Store</span>
              </div>
            </button>
            <button type="button" className="download-btn" disabled aria-disabled="true" title="Download coming soon">
              <div className="download-icon">
                <i className="bi bi-google-play"></i>
              </div>
              <div className="download-text">
                <span className="download-label">Get it on</span>
                <span className="download-platform">Google Play</span>
              </div>
            </button>
          </div>
          <div className="download-features">
            <div className="download-feature">
              <i className="bi bi-check-lg"></i>
              <span>Free to download</span>
            </div>
            <div className="download-feature">
              <i className="bi bi-check-lg"></i>
              <span>No subscription required</span>
            </div>
            <div className="download-feature">
              <i className="bi bi-check-lg"></i>
              <span>Works offline</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download
