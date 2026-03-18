import Link from 'next/link'
import BrandLogo from './BrandLogo'

interface SiteFooterLink {
  href: string
  label: string
}

interface SiteFooterSection {
  title: string
  links: ReadonlyArray<SiteFooterLink>
}

interface SiteFooterProps {
  copyright: string
  description: string
  homeAriaLabel: string
  homeHref: string
  id?: string
  sections: ReadonlyArray<SiteFooterSection>
  socialLinksLabel: string
}

export default function SiteFooter({
  copyright,
  description,
  homeAriaLabel,
  homeHref,
  id,
  sections,
  socialLinksLabel,
}: SiteFooterProps) {
  return (
    <footer className="lp-footer" id={id}>
      <div className="lp-container lp-footer-grid">
        <section>
          <Link className="lp-logo" href={homeHref} aria-label={homeAriaLabel}>
            <BrandLogo />
          </Link>
          <p>{description}</p>
          <div className="lp-socials" aria-label={socialLinksLabel}>
            <a href="#" aria-label="X">
              X
            </a>
            <a href="#" aria-label="Telegram">
              Tg
            </a>
            <a href="#" aria-label="LinkedIn">
              In
            </a>
            <a href="#" aria-label="Instagram">
              Ig
            </a>
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="lp-copyright">{copyright}</p>
    </footer>
  )
}
