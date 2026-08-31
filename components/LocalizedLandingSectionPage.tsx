import { normalizeSiteLanguage, toLocalizedPath } from '../lib/site-language'
import LegacyRedirectPage from './LegacyRedirectPage'

interface LocalizedLandingSectionPageProps {
  lang?: string
  section: 'features' | 'pricing'
}

export default function LocalizedLandingSectionPage({ lang, section }: LocalizedLandingSectionPageProps) {
  const language = normalizeSiteLanguage(lang)
  const localizedHome = toLocalizedPath('/', language)

  return (
    <LegacyRedirectPage
      title={`${section === 'features' ? 'Features' : 'Pricing'} moved`}
      toPath={`${localizedHome}#${section}`}
    />
  )
}
