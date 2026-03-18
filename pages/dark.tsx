import LandingPage from '../components/LandingPage'

interface DarkPageProps {
  lang?: string
}

export default function DarkPage({ lang }: DarkPageProps) {
  return <LandingPage lang={lang} variant="dark" />
}
