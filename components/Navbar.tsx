import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import LanguageSelector from './LanguageSelector'
import { useTranslation } from '../hooks/useTranslation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('common')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false)
    const href = e.currentTarget.getAttribute('href')
    if (href && href.startsWith('/#')) {
      e.preventDefault()
      const targetId = href.substring(2)
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Update URL without scrolling
        window.history.pushState(null, '', href)
      }
    }
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image src="/assest/CalKilo-logo.png" alt="CalKilo Logo" width={120} height={40} className="logo-img" priority />
          </Link>
        </div>
        {isMenuOpen && <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)}></div>}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          <Link href="/" className="nav-link" onClick={handleLinkClick}>
            {t('navbar.home')}
          </Link>
          <Link href="/#features" className="nav-link" onClick={handleLinkClick}>
            {t('navbar.features')}
          </Link>
          <Link href="/#pricing" className="nav-link" onClick={handleLinkClick}>
            {t('navbar.choosePlan')}
          </Link>
          <Link href="/contact" className="nav-link" onClick={handleLinkClick}>
            {t('navbar.contact')}
          </Link>
          <LanguageSelector />
          <Link href="/#download" className="nav-link download-btn" onClick={handleLinkClick}>
            {t('navbar.tryForFree')}
          </Link>
        </div>
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
