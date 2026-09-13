import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import BrandLogo from './BrandLogo'
import {
  LANGUAGE_FONT_FAMILIES,
  LANGUAGE_LABELS,
  LANGUAGE_SHORT_LABELS,
  type SiteLanguage,
  SUPPORTED_LANGUAGES,
} from '../lib/site-language'

interface SiteHeaderNavItem {
  key: string
  href: string
  label: string
  isActive?: boolean
  onClick?: () => void
}

interface SiteHeaderProps {
  ctaHref: string
  ctaLabel: string
  homeAriaLabel: string
  homeHref: string
  isScrolled?: boolean
  language: SiteLanguage
  languageLabel: string
  navAriaLabel: string
  navItems: ReadonlyArray<SiteHeaderNavItem>
  onLanguageChange: (language: SiteLanguage) => void
}

export default function SiteHeader({
  ctaHref,
  ctaLabel,
  homeAriaLabel,
  homeHref,
  isScrolled = false,
  language,
  languageLabel,
  navAriaLabel,
  navItems,
  onLanguageChange,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const closeMenu = () => { setMenuOpen(false); menuButton.current?.focus() }
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() }
    }
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer) }
  }, [menuOpen])
  const navigationItems = language === 'fa' && !navItems.some(item => item.key === 'foods')
    ? [...navItems, { key: 'foods', href: '/fa/calories/', label: 'کالری غذاها' }]
    : navItems

  return (
    <header ref={header} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) setMenuOpen(false)
    }} className={`lp-topbar${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="lp-container lp-topbar-inner">
        <Link className="lp-logo" href={homeHref} aria-label={homeAriaLabel}>
          <BrandLogo />
        </Link>

        <nav className="lp-nav" aria-label={navAriaLabel}>
          {navigationItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={item.isActive ? 'is-active' : undefined}
              onClick={item.onClick}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="lp-topbar-actions">
          <button ref={menuButton} className="lp-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {language === 'fa' ? (menuOpen ? 'بستن' : 'منو') : (menuOpen ? 'Close' : 'Menu')}
          </button>
          <Link className="lp-btn lp-btn--solid" href={ctaHref}>
            {language === 'fa' ? 'دانلود کالکیلو' : ctaLabel}
          </Link>
          <label className="lp-lang" aria-label={languageLabel}>
            <span className="sr-only">{languageLabel}</span>
            <span
              aria-hidden="true"
              className="lp-lang-display"
              style={{ fontFamily: LANGUAGE_FONT_FAMILIES[language] }}
            >
              {LANGUAGE_SHORT_LABELS[language]}
            </span>
            <select
              title={LANGUAGE_LABELS[language]}
              value={language}
              onChange={(event) => onLanguageChange(event.target.value as SiteLanguage)}
            >
              {SUPPORTED_LANGUAGES.map((option) => (
                <option
                  key={option}
                  value={option}
                  style={{ fontFamily: LANGUAGE_FONT_FAMILIES[option] }}
                >
                  {LANGUAGE_LABELS[option]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <nav id="mobile-navigation" className="lp-mobile-nav" hidden={!menuOpen} aria-label={language === 'fa' ? 'ناوبری موبایل' : navAriaLabel}>
        {navigationItems.map(item => <Link key={item.key} href={item.href} onClick={closeMenu}>{item.label}</Link>)}
      </nav>
    </header>
  )
}
