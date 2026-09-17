import { assetUrl } from '../lib/assets'
import { CAFE_BAZAAR_URL, MYKET_URL } from '../lib/app-links'

export default function StoreLogo({ href }: { href: string }) {
  const store = href === CAFE_BAZAAR_URL ? '/assets/stores/bazaar.svg' : href === MYKET_URL ? '/assets/stores/myket.png' : null
  if (!store) return null
  // Decorative: the adjacent link text already names the store.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={`store-logo${href === CAFE_BAZAAR_URL ? ' store-logo--bazaar' : ''}`} src={assetUrl(store)} width={40} height={40} alt="" aria-hidden="true" />
}
