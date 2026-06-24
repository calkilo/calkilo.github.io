export interface ScanExamplePageData {
  slug: string
  foodNameFa: string
  estimatedCalories: number
  protein: number
  fat: number
  carbs: number
  description: string
  estimateNotes: string[]
}

export const SCAN_EXAMPLE_PAGES: ScanExamplePageData[] = [
  {
    slug: 'pizza-scan',
    foodNameFa: 'پیتزا',
    estimatedCalories: 620,
    protein: 24,
    fat: 25,
    carbs: 72,
    description:
      'در این نمونه، تصویر شامل چند برش پیتزا با پنیر و تاپینگ معمولی است. نتیجه زیر یک تخمین نمونه است و مقدار واقعی با اندازه برش، نوع خمیر، پنیر، روغن و سس تغییر می‌کند.',
    estimateNotes: [
      'اگر خمیر ضخیم یا پنیر اضافه باشد، کالری می‌تواند بالاتر از این نمونه باشد.',
      'اگر فقط یک برش کوچک مصرف شود، کالری وعده کمتر از تخمین کامل صفحه خواهد بود.',
    ],
  },
  {
    slug: 'kebab-scan',
    foodNameFa: 'کباب با برنج',
    estimatedCalories: 760,
    protein: 38,
    fat: 28,
    carbs: 90,
    description:
      'این نمونه یک بشقاب کباب همراه برنج را شبیه‌سازی می‌کند. بخش زیادی از کالری وعده از برنج، کره احتمالی و چربی گوشت می‌آید، بنابراین دیدن کل بشقاب برای تخمین بهتر مهم است.',
    estimateNotes: [
      'اگر برنج کره‌ای باشد یا مقدار برنج زیادتر شود، کالری کل وعده افزایش پیدا می‌کند.',
      'نوع گوشت، اندازه سیخ و مقدار چربی روی عدد نهایی اثر زیادی دارد.',
    ],
  },
  {
    slug: 'burger-scan',
    foodNameFa: 'برگر',
    estimatedCalories: 680,
    protein: 32,
    fat: 34,
    carbs: 58,
    description:
      'این نمونه یک برگر با نان، گوشت، پنیر و سس را نشان می‌دهد. نتیجه فقط یک تخمین آموزشی است و با وزن گوشت، نوع سس، پنیر و مخلفات تغییر می‌کند.',
    estimateNotes: [
      'چیزبرگر یا برگر با سس زیاد معمولاً چربی و کالری بالاتری دارد.',
      'اگر سیب‌زمینی یا نوشیدنی همراه برگر باشد، باید جداگانه به وعده اضافه شود.',
    ],
  },
]

export function getScanExamplePage(slug: string): ScanExamplePageData | undefined {
  return SCAN_EXAMPLE_PAGES.find((example) => example.slug === slug)
}

