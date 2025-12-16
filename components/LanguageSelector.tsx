import { useState, useEffect, useRef } from 'react'

const languages = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'zh', flag: '🇨🇳', name: 'Chinese' },
  { code: 'ru', flag: '🇷🇺', name: 'Russian' },
  { code: 'it', flag: '🇮🇹', name: 'Italian' },
  { code: 'fr', flag: '🇫🇷', name: 'French' },
  { code: 'de', flag: '🇩🇪', name: 'German' },
  { code: 'ar', flag: '🇸🇦', name: 'Arabic' },
  { code: 'es', flag: '🇪🇸', name: 'Spanish' },
  { code: 'nl', flag: '🇳🇱', name: 'Dutch' },
  { code: 'fa', flag: '🇮🇷', name: 'Persian' },
]

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(languages[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Get language from localStorage or default to English
      const savedLang = localStorage.getItem('preferred-language') || 'en'
      const lang = languages.find((l) => l.code === savedLang) || languages[0]
      setCurrentLang(lang)
      
      // Set RTL for Arabic and Persian
      if (lang.code === 'ar' || lang.code === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl')
      } else {
        document.documentElement.setAttribute('dir', 'ltr')
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Listen to both mouse and touch events for better mobile support
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', langCode)
      const lang = languages.find((l) => l.code === langCode) || languages[0]
      setCurrentLang(lang)
      
      // Set RTL for Arabic and Persian
      if (langCode === 'ar' || langCode === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl')
      } else {
        document.documentElement.setAttribute('dir', 'ltr')
      }
      
      setIsOpen(false)
      // Reload page to apply language changes (you can implement i18n later)
      window.location.reload()
    }
  }

  return (
    <div className="language-selector" ref={dropdownRef} id="languageSelector">
      <button
        className={`language-toggle ${isOpen ? 'active' : ''}`}
        id="languageToggle"
        aria-label="Select Language"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        onTouchStart={(e) => {
          e.stopPropagation()
        }}
        type="button"
      >
        <span className="current-flag" id="currentFlag">
          {currentLang.flag}
        </span>
        <span className="current-lang" id="currentLang">
          {currentLang.name}
        </span>
        <i className="bi bi-chevron-down"></i>
      </button>
      <div className={`language-dropdown ${isOpen ? 'active' : ''}`} id="languageDropdown">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`language-option ${currentLang.code === lang.code ? 'active' : ''}`}
            data-lang={lang.code}
            onClick={(e) => {
              e.stopPropagation()
              handleLanguageChange(lang.code)
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
            }}
          >
            <span className="flag">{lang.flag}</span>
            <span className="lang-name">{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector
