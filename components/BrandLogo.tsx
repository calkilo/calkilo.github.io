export default function BrandLogo() {
  return (
    <span className="lp-brand" aria-label="Calkilo logo" dir="ltr" lang="en" translate="no">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="lp-brand-mark-icon"
        src="/assets/logo-calkilo.svg"
        alt="Calkilo logo mark"
        width="44"
        height="48"
        aria-hidden="true"
      />
      <span className="lp-brand-text">
        <span>Cal</span>
        <span>kilo</span>
      </span>
    </span>
  )
}
