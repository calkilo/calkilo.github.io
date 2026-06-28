import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LandingPage from './LandingPage'
import { normalizeSiteLanguage, toLocalizedPath } from '../lib/site-language'

interface LocalizedLandingSectionPageProps {
  lang?: string
  section: 'features' | 'pricing'
}

export default function LocalizedLandingSectionPage({ lang, section }: LocalizedLandingSectionPageProps) {
  const language = normalizeSiteLanguage(lang)
  const router = useRouter()

  useEffect(() => {
    const localizedHome = toLocalizedPath('/', language)

    void router.replace(`${localizedHome}#${section}`)
  }, [language, router, section])

  return <LandingPage lang={language} variant="light" />
}
