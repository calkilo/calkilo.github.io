import Link from 'next/link'

const Hero = () => {
  return (
    <section className="hero" role="banner">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Calculate Calories with</span>
            <span className="gradient-text">AI Precision</span>
          </h1>
          <p className="hero-description">
            Simply take a photo of your food and let Calkilo&apos;s advanced AI instantly calculate accurate calories
            and nutritional information. No more guessing or manual logging.
          </p>
          <div className="hero-buttons">
            <Link href="#download" className="btn btn-primary" aria-label="Download Calkilo for iOS">
              <i className="bi bi-apple" aria-hidden="true"></i>
              <span>Download for iOS</span>
            </Link>
            <Link href="#download" className="btn btn-secondary" aria-label="Download Calkilo for Android">
              <i className="bi bi-google-play" aria-hidden="true"></i>
              <span>Download for Android</span>
            </Link>
          </div>
          <div className="hero-stats" role="region" aria-label="App statistics">
            <div className="stat">
              <span className="stat-number" aria-label="500 thousand">
                500K+
              </span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat">
              <span className="stat-number" aria-label="99.2 percent">
                99.2%
              </span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-number" aria-label="1 million">
                1M+
              </span>
              <span className="stat-label">Photos Analyzed</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="phone-mockup" role="img" aria-label="Calkilo app interface showing food scanning and calorie calculation">
            <div className="phone-screen">
              <div className="app-interface">
                <div className="app-header">
                  <div className="app-logo">
                    <div className="logo-icon">C</div>
                    <span className="logo-text">Calkilo AI</span>
                  </div>
                  <div className="rewards">
                    <div className="reward-item">
                      <span className="reward-icon">🪙</span>
                      <span className="reward-count">x1</span>
                    </div>
                    <div className="reward-item">
                      <span className="reward-icon">🍃</span>
                      <span className="reward-count">x1</span>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="diet-status">
                    <h3>
                      Balanced Diet: <span className="calories-text">0 Cal</span>
                    </h3>
                  </div>

                  <div className="calorie-summary">
                    <div className="calorie-item">
                      <div className="calorie-icon">🍴</div>
                      <div className="calorie-info">
                        <span className="calorie-label">Eaten</span>
                        <span className="calorie-value">270 Cal</span>
                      </div>
                    </div>
                    <div className="calorie-item">
                      <div className="calorie-icon">🔥</div>
                      <div className="calorie-info">
                        <span className="calorie-label">Burned</span>
                        <span className="calorie-value">60 Cal</span>
                      </div>
                    </div>
                  </div>

                  <div className="calorie-gauge">
                    <div className="gauge-circle">
                      <div className="gauge-fill"></div>
                      <div className="gauge-center">
                        <span className="gauge-text">210 Cal Left</span>
                        <div className="gauge-help">?</div>
                      </div>
                    </div>
                  </div>

                  <div className="macros">
                    <div className="macro-item">
                      <div className="macro-icon">🍗</div>
                      <div className="macro-info">
                        <span className="macro-label">Protein</span>
                        <div className="macro-bar">
                          <div className="macro-fill protein" style={{ width: '87%' }}></div>
                        </div>
                        <span className="macro-value">78/90g</span>
                      </div>
                    </div>
                    <div className="macro-item">
                      <div className="macro-icon">🧀</div>
                      <div className="macro-info">
                        <span className="macro-label">Fats</span>
                        <div className="macro-bar">
                          <div className="macro-fill fat" style={{ width: '64%' }}></div>
                        </div>
                        <span className="macro-value">45/70g</span>
                      </div>
                    </div>
                    <div className="macro-item">
                      <div className="macro-icon">🍞</div>
                      <div className="macro-info">
                        <span className="macro-label">Carbs</span>
                        <div className="macro-bar">
                          <div className="macro-fill carb" style={{ width: '86%' }}></div>
                        </div>
                        <span className="macro-value">95/110g</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ai-badge">
                  <i className="bi bi-cpu" aria-hidden="true"></i>
                  <span>AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
