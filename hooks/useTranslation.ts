import { useState, useEffect } from 'react'

type TranslationData = Record<string, any>

const translations: Record<string, TranslationData> = {}

export const useTranslation = (namespace: string = 'common') => {
  const [currentLang, setCurrentLang] = useState<string>('en')
  const [translationsLoaded, setTranslationsLoaded] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Get language from localStorage or default to English
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferred-language') || 'en'
      setCurrentLang(savedLang)
      loadTranslations(savedLang, namespace)
    } else {
      setIsLoading(false)
    }
  }, [namespace])

  const loadTranslations = async (lang: string, ns: string) => {
    setIsLoading(true)
    const cacheKey = `${lang}-${ns}`
    
    // Check if already loaded
    if (translations[cacheKey]) {
      setTranslationsLoaded(true)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`/locales/${lang}/${ns}.json`)
      if (response.ok) {
        const data = await response.json()
        translations[cacheKey] = data
        setTranslationsLoaded(true)
        setIsLoading(false)
      } else {
        // Fallback to English if translation doesn't exist
        if (lang !== 'en') {
          const enResponse = await fetch(`/locales/en/${ns}.json`)
          if (enResponse.ok) {
            const enData = await enResponse.json()
            translations[cacheKey] = enData
            setTranslationsLoaded(true)
          }
        }
        setIsLoading(false)
      }
    } catch (error) {
      console.error(`Failed to load translations for ${lang}/${ns}:`, error)
      // Fallback to English
      if (lang !== 'en') {
        try {
          const enResponse = await fetch(`/locales/en/${ns}.json`)
          if (enResponse.ok) {
            const enData = await enResponse.json()
            translations[cacheKey] = enData
            setTranslationsLoaded(true)
          }
        } catch (e) {
          console.error('Failed to load English fallback:', e)
        }
      }
      setIsLoading(false)
    }
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const cacheKey = `${currentLang}-${namespace}`
    const translation = translations[cacheKey]
    
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
  }

  return { t, currentLang, translationsLoaded, isLoading }
}

