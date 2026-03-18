import LandingPage from '../components/LandingPage'

interface HomePageProps {
  lang?: string
}

export default function HomePage({ lang }: HomePageProps) {
  return <LandingPage lang={lang} variant="light" />
}
