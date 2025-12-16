import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import LanguageSelector from './LanguageSelector'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

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

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

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

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <Image src="/assest/CalKilo-logo.svg" alt="Calkilo Logo" width={40} height={40} className="logo-img" />
            <span>Calkilo</span>
          </Link>
        </div>
        {isMenuOpen && <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)}></div>}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          <Link href="/#features" className="nav-link" onClick={handleLinkClick}>
            Features
          </Link>
          <Link href="/#screenshots" className="nav-link" onClick={handleLinkClick}>
            Screenshots
          </Link>
          <Link href="/faq" className="nav-link" onClick={handleLinkClick}>
            FAQ
          </Link>
          <Link href="/contact" className="nav-link" onClick={handleLinkClick}>
            Contact
          </Link>
          <LanguageSelector />
          <Link href="/#download" className="nav-link download-btn" onClick={handleLinkClick}>
            Download
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
