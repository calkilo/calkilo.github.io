import React, { useEffect, useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const ReadyToTransform = () => {
  const { t } = useTranslation('common')
  const [filled, setFilled] = useState<boolean[]>([])

  useEffect(() => {
    // generate deterministic client-side QR pattern to avoid hydration mismatch
    setFilled(Array.from({ length: 25 }, () => Math.random() > 0.5))
  }, [])

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
              {t('readyToTransform.title')} <span className="highlight-text">{t('readyToTransform.titleHighlight')}</span>
            </h2>
            <p>{t('readyToTransform.subtitle')}</p>
            <div className="download-options">
              <div className="download-buttons-transform">
                <button type="button" className="download-btn-transform" disabled aria-disabled="true" title="Download coming soon" aria-label="Download on App Store">
                  <i className="bi bi-apple"></i>
                  <div className="download-btn-text">
                    <span className="download-btn-label">{t('readyToTransform.downloadOn')}</span>
                    <span className="download-btn-platform">{t('readyToTransform.appStore')}</span>
                  </div>
                </button>
                <button type="button" className="download-btn-transform" disabled aria-disabled="true" title="Download coming soon" aria-label="Get it on Google Play">
                  <i className="bi bi-google-play"></i>
                  <div className="download-btn-text">
                    <span className="download-btn-label">{t('readyToTransform.getItOn')}</span>
                    <span className="download-btn-platform">{t('readyToTransform.googlePlay')}</span>
                  </div>
                </button>
              </div>
              <p className="qr-code-intro">{t('readyToTransform.scanToDownload')}</p>
              <div className="qr-code-container">
                <div className="qr-code-placeholder">
                  <div className="qr-code-grid">
                    {filled.length === 25
                      ? filled.map((isFilled, i) => (
                          <div key={i} className={`qr-square ${isFilled ? 'filled' : ''}`}></div>
                        ))
                      : Array.from({ length: 25 }).map((_, i) => (
                          <div key={i} className="qr-square"></div>
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

