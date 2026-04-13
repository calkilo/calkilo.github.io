import Link from 'next/link'
import BrandLogo from './BrandLogo'

interface SiteFooterLink {
  href: string
  label: string
}

interface SiteFooterSocialLink {
  href: string
  label: string
  shortLabel: string
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
  socialLinks?: ReadonlyArray<SiteFooterSocialLink>
  socialLinksLabel: string
}

export default function SiteFooter({
  copyright,
  description,
  homeAriaLabel,
  homeHref,
  id,
  sections,
  socialLinks,
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
          {socialLinks && socialLinks.length > 0 ? (
            <div className="lp-socials" aria-label={socialLinksLabel}>
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noreferrer">
                  {link.shortLabel}
                </a>
              ))}
            </div>
          ) : null}
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
