import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
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
            <span>Calculate Calories with</span>
            <span className="gradient-text">AI Precision</span>
          </h1>
          <p className="hero-description">
            Simply take a photo of your food and let Calkilo&apos;s advanced AI instantly calculate accurate calories
            and nutritional information. No more guessing or manual logging.
          </p>
          <div className="hero-download-section">
            <p className="available-on-text">Available on:</p>
            <div className="hero-buttons">
              <Link href="#download" className="btn btn-primary" aria-label="Download Calkilo for iOS" onClick={handleDownloadClick}>
                <i className="bi bi-apple" aria-hidden="true"></i>
                <span>App Store</span>
              </Link>
              <Link href="#download" className="btn btn-secondary" aria-label="Download Calkilo for Android" onClick={handleDownloadClick}>
                <i className="bi bi-google-play" aria-hidden="true"></i>
                <span>Google Play</span>
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
