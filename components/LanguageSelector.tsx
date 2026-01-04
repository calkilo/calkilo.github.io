import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

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

const validLocales = ['en', 'fa', 'zh', 'ru', 'it', 'fr', 'de', 'ar', 'es', 'nl']

const LanguageSelector = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(languages[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Get language from URL first, then localStorage, then default to English
      const pathname = router.asPath || window.location.pathname
      let savedLang = 'en'
      
      // Check if URL has a locale prefix
      const pathSegments = pathname.split('/').filter(Boolean)
      if (pathSegments.length > 0 && validLocales.includes(pathSegments[0])) {
        savedLang = pathSegments[0]
      } else {
        savedLang = localStorage.getItem('preferred-language') || 'en'
      }
      
      const lang = languages.find((l) => l.code === savedLang) || languages[0]
      setCurrentLang(lang)
      
      // Set language and RTL for Arabic and Persian
      document.documentElement.setAttribute('lang', lang.code)
      if (lang.code === 'ar' || lang.code === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl')
      } else {
        document.documentElement.setAttribute('dir', 'ltr')
      }
    }
  }, [router.asPath])

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
      
      // Set language and RTL for Arabic and Persian
      document.documentElement.setAttribute('lang', langCode)
      if (langCode === 'ar' || langCode === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl')
      } else {
        document.documentElement.setAttribute('dir', 'ltr')
      }
      
      setIsOpen(false)
      
      // Get current pathname
      const pathname = router.asPath || window.location.pathname
      const pathSegments = pathname.split('/').filter(Boolean)
      
      // Remove existing locale if present
      let pagePath = ''
      if (pathSegments.length > 0 && validLocales.includes(pathSegments[0])) {
        // Remove the locale from the path
        pagePath = '/' + pathSegments.slice(1).join('/')
      } else {
        // No locale in path, use current path
        pagePath = pathname === '/' ? '/' : pathname
      }
      
      // Remove trailing slash for consistency (except root)
      if (pagePath !== '/' && pagePath.endsWith('/')) {
        pagePath = pagePath.slice(0, -1)
      }
      
      // Build new URL with locale
      let newPath = ''
      if (langCode === 'en') {
        // English: no locale prefix
        newPath = pagePath === '/' ? '/' : pagePath + '/'
      } else {
        // Other languages: add locale prefix
        newPath = pagePath === '/' ? `/${langCode}/` : `/${langCode}${pagePath}/`
      }
      
      // Navigate to new URL
      router.push(newPath)
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
