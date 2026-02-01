import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation('common')

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('download')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image src="/assest/CalKilo-logo.svg" alt="Calkilo Logo" width={40} height={40} className="logo-img" />
              <span>Calkilo</span>
            </div>
            <p>{t('footer.tagline')}</p>
            <div className="social-links">
              <button type="button" className="social-link" disabled aria-disabled="true" aria-label={t('social.followTwitter')} title="Twitter coming soon">
                <i className="bi bi-twitter"></i>
              </button>
              <button type="button" className="social-link" disabled aria-disabled="true" aria-label={t('social.followFacebook')} title="Facebook coming soon">
                <i className="bi bi-facebook"></i>
              </button>
              <button type="button" className="social-link" disabled aria-disabled="true" aria-label={t('social.followInstagram')} title="Instagram coming soon">
                <i className="bi bi-instagram"></i>
              </button>
              <button type="button" className="social-link" disabled aria-disabled="true" aria-label={t('social.connectLinkedIn')} title="LinkedIn coming soon">
                <i className="bi bi-linkedin"></i>
              </button>
            </div>
          </div>
          <div className="footer-links">
              <div className="footer-column">
              <h4>{t('footer.features')}</h4>
              <Link href="/#download" onClick={handleDownloadClick}>{t('footer.download')}</Link>
              <Link href="/#how-it-works">{t('footer.howItWorks')}</Link>
              <button type="button" className="footer-link" disabled aria-disabled="true">{t('footer.blog')}</button>
            </div>
            <div className="footer-column">
              <h4>{t('footer.support')}</h4>
              <Link href="/privacy-policy">{t('footer.privacyPolicy')}</Link>
              <Link href="/terms-of-service">{t('footer.termsOfService')}</Link>
              <Link href="/terms-and-conditions">{t('footer.termsAndConditions')}</Link>
              <Link href="/faq">{t('footer.faq')}</Link>
            </div>
            <div className="footer-column">
              <h4>{t('footer.getInTouch')}</h4>
              <Link href="/contact">{t('navbar.contact')}</Link>
              <button type="button" className="footer-link" disabled aria-disabled="true">{t('footer.aboutUs')}</button>
              <button type="button" className="footer-link" disabled aria-disabled="true">{t('footer.ourTeam')}</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} CalKilo. {t('footer.allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
