import Link from 'next/link'
import StaticPageLayout from '../components/StaticPageLayout'

const HELPFUL_LINKS = [
  {
    href: '/',
    label: 'Home',
    description: 'Return to the main Calkilo landing page.',
  },
  {
    href: '/features/',
    label: 'Features',
    description: 'Explore AI photo calorie tracking, macros, and integrations.',
  },
  {
    href: '/pricing/',
    label: 'Pricing',
    description: 'Compare monthly and yearly Calkilo premium plans.',
  },
  {
    href: '/contact/',
    label: 'Contact support',
    description: 'Get help with product, billing, or privacy requests.',
  },
] as const

export default function NotFoundPage() {
  return (
    <StaticPageLayout
      title="Page Not Found | Calkilo"
      description="The page you requested could not be found. Use helpful Calkilo links to continue browsing."
      path="/404"
      heading="Page not found"
      intro="The page may have moved, or the link may be outdated. These pages can help you keep going."
      activeNav="none"
      noindex
    >
      <section className="lp-static-card lp-not-found-card">
        <h2>Helpful links</h2>
        <div className="lp-not-found-grid">
          {HELPFUL_LINKS.map((link) => (
            <Link key={link.href} className="lp-not-found-link" href={link.href}>
              <span>{link.label}</span>
              <small>{link.description}</small>
            </Link>
          ))}
        </div>
      </section>
    </StaticPageLayout>
  )
}
