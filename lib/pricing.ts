export const CALKILO_PRICING = {
  Monthly: {
    usd: '4.99',
    persianDisplay: '۲۸۹٬۰۰۰ تومان',
    irr: '2890000',
  },
  Yearly: {
    usd: '14.99',
    persianDisplay: '۵۸۹٬۰۰۰ تومان',
    irr: '5890000',
  },
} as const

export type PricingPlanTitle = keyof typeof CALKILO_PRICING

export function getUsdPricingDisplay(title: PricingPlanTitle): string {
  return `$${CALKILO_PRICING[title].usd}`
}

export const PRICING_FAQ_ANSWER = `Calkilo premium is available monthly for ${getUsdPricingDisplay('Monthly')} or yearly for ${getUsdPricingDisplay('Yearly')}. Both plans unlock personalized meal plans, deeper analytics, and AI coaching.`
