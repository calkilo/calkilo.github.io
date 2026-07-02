import { GUIDE_LINKS } from './resource-pages'

export interface SitePageLink {
  href: string
  label: string
  description: string
}

export const CORE_SITE_LINKS: ReadonlyArray<SitePageLink> = [
  {
    href: '/features/',
    label: 'Features',
    description: 'See photo calorie tracking, macro goals, AI meal plans, and health app integrations.',
  },
  {
    href: '/pricing/',
    label: 'Pricing',
    description: 'Compare monthly and yearly premium plans and what each subscription unlocks.',
  },
  {
    href: '/faq/',
    label: 'FAQ',
    description: 'Answers about subscriptions, privacy, device sync, and AI food logging.',
  },
  {
    href: '/contact/',
    label: 'Contact',
    description: 'Reach Calkilo support for product, billing, and privacy requests.',
  },
] as const

export const ABOUT_PAGE_LINK: SitePageLink = {
  href: '/about/',
  label: 'About Calkilo',
  description: 'What Calkilo is, who it is for, and how its AI nutrition workflow is designed.',
}

export const ENGLISH_POPULAR_PAGE_LINKS: ReadonlyArray<SitePageLink> = [
  ...CORE_SITE_LINKS,
  ABOUT_PAGE_LINK,
  ...GUIDE_LINKS,
]
