import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '../../hooks/useTranslation'

const Hero = () => {
  const { t } = useTranslation('common')
  
  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('download')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="hero" role="banner">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span>{t('hero.title')}</span>
            <span className="gradient-text">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="hero-description">
            {t('hero.description')}
          </p>
          <div className="hero-download-section">
            <p className="available-on-text">{t('hero.availableOn')}</p>
            <div className="hero-buttons">
              <Link href="#download" className="btn btn-primary" aria-label={t('hero.downloadIOS')} onClick={handleDownloadClick}>
                <i className="bi bi-apple" aria-hidden="true"></i>
                <span>{t('hero.appStore')}</span>
              </Link>
              <Link href="#download" className="btn btn-secondary" aria-label={t('hero.downloadAndroid')} onClick={handleDownloadClick}>
                <i className="bi bi-google-play" aria-hidden="true"></i>
                <span>{t('hero.googlePlay')}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="phone-mockup" role="img" aria-label="Calkilo app interface showing nutrition tracking">
            <div className="phone-screen">
              <Image
                src="/assest/Startup-1.png"
                alt="Calkilo Nutrition Tracking App"
                width={390}
                height={844}
                className="hero-phone-image"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
