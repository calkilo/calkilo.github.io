import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../hooks/useTranslation'

const DarkMode = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation('common')

  return (
    <section id="dark-mode" className="dark-mode-section">
      <div className="container">
        <div className="section-header">
          <h2>{t('darkMode.title')}</h2>
          <p>{t('darkMode.subtitle')}</p>
        </div>
        <div className="dark-mode-content">
          <div className="dark-mode-text">
            <p className="dark-mode-description">{t('darkMode.description')}</p>
            <div className="theme-toggle-container">
              <button
                className={`theme-toggle-large ${theme === 'dark' ? 'active' : ''}`}
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                <span className={`toggle-option ${theme === 'dark' ? 'active' : ''}`}>{t('darkMode.dark')}</span>
                <span className={`toggle-option ${theme === 'light' ? 'active' : ''}`}>{t('darkMode.light')}</span>
              </button>
            </div>
            <p className="dark-mode-subdescription">
              {t('darkMode.subdescription')}
            </p>
          </div>
          <div className="dark-mode-screenshots">
            <div className={`phone-mockup-dark ${theme === 'dark' ? 'active' : ''}`}>
              <div className="phone-screen-dark">
                <div className="app-interface-dark">
                  <div className="app-header-dark">
                    <div className="app-logo-dark">CalKilo</div>
                    <div className="app-stats-dark">
                      <div className="stat-item-dark">
                        <span className="stat-value-dark">240</span>
                        <span className="stat-label-dark">/ 1500 Kcal</span>
                      </div>
                    </div>
                  </div>
                  <div className="progress-rings-dark">
                    <div className="ring-dark calories-ring">
                      <div className="ring-fill-dark" style={{ '--progress': '16%' } as React.CSSProperties}></div>
                      <span className="ring-label-dark">Calories</span>
                    </div>
                    <div className="ring-dark carbs-ring">
                      <div className="ring-fill-dark" style={{ '--progress': '45%' } as React.CSSProperties}></div>
                      <span className="ring-label-dark">Carbs</span>
                    </div>
                    <div className="ring-dark protein-ring">
                      <div className="ring-fill-dark" style={{ '--progress': '60%' } as React.CSSProperties}></div>
                      <span className="ring-label-dark">Protein</span>
                    </div>
                    <div className="ring-dark fat-ring">
                      <div className="ring-fill-dark" style={{ '--progress': '30%' } as React.CSSProperties}></div>
                      <span className="ring-label-dark">Fat</span>
                    </div>
                  </div>
                  <div className="recent-meals-dark">
                    <div className="meal-item-dark">
                      <div className="meal-icon-dark">🍗</div>
                      <div className="meal-info-dark">
                        <span className="meal-name-dark">Chicken Salad</span>
                        <span className="meal-calories-dark">320 Kcal</span>
                      </div>
                    </div>
                    <div className="meal-item-dark">
                      <div className="meal-icon-dark">🥗</div>
                      <div className="meal-info-dark">
                        <span className="meal-name-dark">Green Salad</span>
                        <span className="meal-calories-dark">150 Kcal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`phone-mockup-light ${theme === 'light' ? 'active' : ''}`}>
              <div className="phone-screen-light">
                <div className="app-interface-light">
                  <div className="app-header-light">
                    <div className="app-logo-light">CalKilo</div>
                    <div className="app-stats-light">
                      <div className="stat-item-light">
                        <span className="stat-value-light">240</span>
                        <span className="stat-label-light">/ 1500 Kcal</span>
                      </div>
                    </div>
                  </div>
                  <div className="progress-rings-light">
                    <div className="ring-light calories-ring">
                      <div className="ring-fill-light" style={{ '--progress': '16%' } as React.CSSProperties}></div>
                      <span className="ring-label-light">Calories</span>
                    </div>
                    <div className="ring-light carbs-ring">
                      <div className="ring-fill-light" style={{ '--progress': '45%' } as React.CSSProperties}></div>
                      <span className="ring-label-light">Carbs</span>
                    </div>
                    <div className="ring-light protein-ring">
                      <div className="ring-fill-light" style={{ '--progress': '60%' } as React.CSSProperties}></div>
                      <span className="ring-label-light">Protein</span>
                    </div>
                    <div className="ring-light fat-ring">
                      <div className="ring-fill-light" style={{ '--progress': '30%' } as React.CSSProperties}></div>
                      <span className="ring-label-light">Fat</span>
                    </div>
                  </div>
                  <div className="recent-meals-light">
                    <div className="meal-item-light">
                      <div className="meal-icon-light">🍗</div>
                      <div className="meal-info-light">
                        <span className="meal-name-light">Chicken Salad</span>
                        <span className="meal-calories-light">320 Kcal</span>
                      </div>
                    </div>
                    <div className="meal-item-light">
                      <div className="meal-icon-light">🥗</div>
                      <div className="meal-info-light">
                        <span className="meal-name-light">Green Salad</span>
                        <span className="meal-calories-light">150 Kcal</span>
                      </div>
                    </div>
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

export default DarkMode

