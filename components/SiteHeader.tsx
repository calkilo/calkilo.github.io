import Link from 'next/link'
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
  return (
    <header className={`lp-topbar${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="lp-container lp-topbar-inner">
        <Link className="lp-logo" href={homeHref} aria-label={homeAriaLabel}>
          <BrandLogo />
        </Link>

        <nav className="lp-nav" aria-label={navAriaLabel}>
          {navItems.map((item) => (
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
          <Link className="lp-btn lp-btn--solid" href={ctaHref}>
            {ctaLabel}
          </Link>
          <label className="lp-lang" aria-label={languageLabel}>
            <span className="sr-only">{languageLabel}</span>
            <select
              title={LANGUAGE_LABELS[language]}
              value={language}
              onChange={(event) => onLanguageChange(event.target.value as SiteLanguage)}
              style={{ fontFamily: LANGUAGE_FONT_FAMILIES[language] }}
            >
              {SUPPORTED_LANGUAGES.map((option) => (
                <option
                  key={option}
                  value={option}
                  style={{ fontFamily: LANGUAGE_FONT_FAMILIES[option] }}
                >
                  {LANGUAGE_SHORT_LABELS[option]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </header>
  )
}
