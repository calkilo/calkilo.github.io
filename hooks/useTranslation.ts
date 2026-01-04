import { useState, useEffect, useCallback } from 'react'

type TranslationData = Record<string, any>

const translations: Record<string, TranslationData> = {}

const validLocales = ['en', 'fa', 'zh', 'ru', 'it', 'fr', 'de', 'ar', 'es', 'nl']

const getLangFromURL = (): string => {
  if (typeof window === 'undefined') return 'en'
  const pathname = window.location.pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  if (pathSegments.length > 0 && validLocales.includes(pathSegments[0])) {
    return pathSegments[0]
  }
  return localStorage.getItem('preferred-language') || 'en'
}

export const useTranslation = (namespace: string = 'common') => {
  // Initialize with language from URL first, then localStorage
  const [currentLang, setCurrentLang] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getLangFromURL()
    }
    return 'en'
  })
  const [translationsLoaded, setTranslationsLoaded] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [translationData, setTranslationData] = useState<TranslationData | null>(null)

  const loadTranslations = useCallback(async (lang: string, ns: string) => {
    setIsLoading(true)
    const cacheKey = `${lang}-${ns}`
    const enCacheKey = `en-${ns}`
    
    // Check if already loaded for this specific language
    if (translations[cacheKey]) {
      setTranslationData(translations[cacheKey])
      setTranslationsLoaded(true)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`/locales/${lang}/${ns}.json`)
      if (response.ok) {
        const data = await response.json()
        translations[cacheKey] = data
        setTranslationData(data)
        setTranslationsLoaded(true)
        setIsLoading(false)
        return
      }
      
      // If file doesn't exist (404) or other error, fallback to English
      if (lang !== 'en') {
        // Try to get English from cache first
        if (translations[enCacheKey]) {
          translations[cacheKey] = translations[enCacheKey]
          setTranslationData(translations[enCacheKey])
          setTranslationsLoaded(true)
          setIsLoading(false)
          return
        }
        
        // Load English translation as fallback
        try {
          const enResponse = await fetch(`/locales/en/${ns}.json`)
          if (enResponse.ok) {
            const enData = await enResponse.json()
            translations[cacheKey] = enData
            translations[enCacheKey] = enData // Cache English version too
            setTranslationData(enData)
            setTranslationsLoaded(true)
            setIsLoading(false)
            return
          }
        } catch (enError) {
          console.error('Failed to load English fallback:', enError)
        }
      }
      
      // If we get here, no translation was loaded
      setIsLoading(false)
    } catch (error) {
      console.error(`Failed to load translations for ${lang}/${ns}:`, error)
      // Fallback to English
      if (lang !== 'en') {
        // Try to get English from cache first
        if (translations[enCacheKey]) {
          translations[cacheKey] = translations[enCacheKey]
          setTranslationData(translations[enCacheKey])
          setTranslationsLoaded(true)
          setIsLoading(false)
          return
        }
        
        try {
          const enResponse = await fetch(`/locales/en/${ns}.json`)
          if (enResponse.ok) {
            const enData = await enResponse.json()
            translations[cacheKey] = enData
            translations[enCacheKey] = enData // Cache English version too
            setTranslationData(enData)
            setTranslationsLoaded(true)
            setIsLoading(false)
            return
          }
        } catch (e) {
          console.error('Failed to load English fallback:', e)
        }
      }
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Get language from URL first, then localStorage
    if (typeof window !== 'undefined') {
      const checkAndLoadLang = () => {
        const urlLang = getLangFromURL()
        
        // Always update currentLang if it's different
        if (urlLang !== currentLang) {
          setCurrentLang(urlLang)
          // Clear translation data when language changes
          setTranslationData(null)
          setTranslationsLoaded(false)
        }
        
        // Always load translations for the detected language
        loadTranslations(urlLang, namespace)
      }
      
      // Check immediately
      checkAndLoadLang()
      
      // Listen for pathname changes by checking periodically (simple approach)
      // This will catch Next.js router navigation
      let lastPathname = window.location.pathname
      const checkInterval = setInterval(() => {
        const currentPathname = window.location.pathname
        if (currentPathname !== lastPathname) {
          lastPathname = currentPathname
          checkAndLoadLang()
        }
      }, 200)
      
      // Listen for browser navigation (back/forward)
      const handlePopState = () => {
        checkAndLoadLang()
      }
      window.addEventListener('popstate', handlePopState)
      
      return () => {
        clearInterval(checkInterval)
        window.removeEventListener('popstate', handlePopState)
      }
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namespace, loadTranslations, currentLang])

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    // Use state data first, then fallback to cache
    const translation = translationData || translations[`${currentLang}-${namespace}`]
    
    if (!translation) {
      // Return a readable key if translation not loaded
      return key.split('.').pop() || key
    }

    // Navigate through nested keys (e.g., "contact.title")
    const keys = key.split('.')
    let value: any = translation
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Try English fallback
        if (currentLang !== 'en') {
          const enCacheKey = `en-${namespace}`
          const enTranslation = translations[enCacheKey]
          if (enTranslation) {
            let enValue: any = enTranslation
            for (const enK of keys) {
              if (enValue && typeof enValue === 'object' && enK in enValue) {
                enValue = enValue[enK]
              } else {
                return key.split('.').pop() || key
              }
            }
            value = enValue
            break
          }
        }
        return key.split('.').pop() || key
      }
    }

    if (typeof value !== 'string') {
      return key.split('.').pop() || key
    }

    // Replace parameters
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match
      })
    }

    return value
  }, [translationData, currentLang, namespace])

  return { t, currentLang, translationsLoaded, isLoading, translationData }
}

