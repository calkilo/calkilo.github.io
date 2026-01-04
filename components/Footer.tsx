import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('download')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image src="/assest/CalKilo-logo.svg" alt="Calkilo Logo" width={40} height={40} className="logo-img" />
              <span>Calkilo</span>
            </div>
            <p>Revolutionizing nutrition tracking with AI-powered calorie calculation</p>
            <div className="social-links">
              <a href="#" aria-label="Follow us on Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" aria-label="Follow us on Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" aria-label="Follow us on Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="Connect with us on LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Features</h4>
              <Link href="/#download" onClick={handleDownloadClick}>Download</Link>
              <Link href="/#how-it-works">How it Works?</Link>
              <Link href="#">Blog</Link>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
              <Link href="/faq">FAQ</Link>
            </div>
            <div className="footer-column">
              <h4>Get In Touch</h4>
              <Link href="/contact">Contact</Link>
              <Link href="#">About Us</Link>
              <Link href="#">Our Team</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 CalKilo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
