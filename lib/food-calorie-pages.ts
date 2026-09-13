import persianFoodEstimates from '../data/persian-food-estimates.json'

export interface FoodCaloriePageData {
  slug: string
  nameFa: string
  category?: string
  estimate?: { caloriesPer100g: number; preparation: string; sourceUrl: string; sourceLabel: string }
  nutrition?: {
    caloriesPer100g: number
    servingGrams: number
    servingCalories: number
    protein: number
    fat: number
    carbs: number
    preparation: string
    sourceLabel: string
    sourceUrl: string
    mirrorUrl?: string
    basisNote: string
  }
  intro: string
  notes: string[]
  tips: string[]
}

export const FOOD_CALORIE_PAGES: FoodCaloriePageData[] = [
  {
    slug: 'pizza',
    nameFa: 'پیتزا',
    nutrition: {
      caloriesPer100g: 266,
      servingGrams: 100,
      servingCalories: 266,
      protein: 11.4,
      fat: 9.7,
      carbs: 33.3,
      preparation: 'پیتزای پنیر با خمیر معمولی، پخته و آماده مصرف؛ نمونه پیتزای زنجیره‌ای ۱۴ اینچی. بدون گوشت و تاپینگ اضافه.',
      sourceLabel: 'USDA SR Legacy، شناسه 173292',
      sourceUrl: 'https://fdc.nal.usda.gov/food-details/173292/nutrients',
      mirrorUrl: 'https://tools.myfooddata.com/nutrition-facts/173292/100g',
      basisNote: 'تمام اعداد برای ۱۰۰ گرم از همان پیتزای مرجع هستند؛ اندازه یک برش در رستوران‌های مختلف یکسان نیست.'
    },
    intro:
      'کالری پیتزا به نوع خمیر، مقدار پنیر، گوشت، سس و اندازه برش بستگی دارد. پیتزای پنیر ساده معمولاً کالری کمتری از پیتزای گوشت، پپرونی یا پیتزای پر از پنیر اضافه دارد.',
    notes: [
      'اگر پیتزا خمیر ضخیم، پنیر اضافه یا سس چرب داشته باشد، کالری هر برش می‌تواند به شکل محسوسی بالاتر برود.',
      'برای تخمین دقیق‌تر، بهتر است از کل بشقاب یا تعداد برش‌هایی که می‌خورید عکس بگیرید تا اندازه وعده واضح‌تر باشد.',
    ],
    tips: [
      'برش‌های کوچک‌تر یا خمیر نازک‌تر معمولاً کالری کمتری دارند.',
      'پنیر، پپرونی، سوسیس و روغن روی پیتزا بیشترین اثر را روی کالری دارند.',
      'اگر کنار پیتزا نوشابه یا سس مصرف می‌کنید، آن را جداگانه در نظر بگیرید.',
    ],
  },
  {
    slug: 'hamburger',
    nameFa: 'همبرگر',
    nutrition: {
      caloriesPer100g: 306,
      servingGrams: 90,
      servingCalories: 275,
      protein: 12,
      fat: 12,
      carbs: 31,
      preparation: 'ساندویچ همبرگر ساده با یک پَتی پخته و نان؛ نمونه مرجع ۹۰ گرمی، بدون پنیر و مخلفات اضافه. این وزن، وزن گوشت تنها نیست.',
      sourceLabel: 'Health Canada، جدول ۲۰۰۸؛ Hamburger, single patty, plain',
      sourceUrl: 'https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/nutrient-data/nutrient-value-some-common-foods-2008.html',
      basisNote: 'مقادیر وعده عین جدول برای ۹۰ گرم‌اند. مقدار ۱۰۰ گرم فقط با تبدیل وزن همین ردیف محاسبه و گرد شده است؛ به برگر ۲۵۰ گرمی با دستور متفاوت تعمیم داده نمی‌شود.'
    },
    intro:
      'کالری همبرگر با توجه به وزن گوشت، نوع نان، پنیر، سس و مخلفات تغییر می‌کند. یک همبرگر ساده با گوشت کم‌چرب کالری متفاوتی نسبت به چیزبرگر یا برگر رستورانی با سس زیاد دارد.',
    notes: [
      'سس مایونز، پنیر، نان بزرگ و گوشت پرچرب می‌توانند کالری ساندویچ را خیلی بالا ببرند.',
      'اگر سیب‌زمینی یا نوشیدنی همراه برگر دارید، آن‌ها بخشی از کالری وعده هستند و باید جداگانه محاسبه شوند.',
    ],
    tips: [
      'برای کاهش کالری، سس را کمتر کنید یا جداگانه سفارش دهید.',
      'وزن گوشت اصلی‌ترین عامل در پروتئین و کالری برگر است.',
      'چیزبرگر معمولاً از همبرگر ساده کالری و چربی بیشتری دارد.',
    ],
  },
  {
    slug: 'kebab',
    nameFa: 'کباب',
    category: 'کباب و پروتئین',
    estimate: { caloriesPer100g: 268, preparation: 'نمونه کباب کوبیده؛ بدون نان و برنج. این عدد برای همه انواع کباب نیست.', sourceUrl: 'https://mealscook.net/blog/calories-in-persian-food/', sourceLabel: 'Meals Cook؛ تخمین آشپزی برای کوبیده' },
    intro:
      'کالری کباب به نوع گوشت، درصد چربی، روش پخت و همراه‌هایی مثل برنج، نان، کره و گوجه بستگی دارد. کباب کوبیده معمولاً چربی بیشتری از جوجه کباب ساده دارد.',
    notes: [
      'اگر کباب با برنج کره‌ای خورده شود، کالری وعده می‌تواند چند برابر کالری خود کباب باشد.',
      'برای تخمین دقیق‌تر، عکس باید کل بشقاب شامل برنج، نان، کره، گوجه و کنارغذا را نشان دهد.',
    ],
    tips: [
      'جوجه کباب بدون پوست معمولاً چربی کمتری از کوبیده دارد.',
      'برنج و کره کنار کباب را جداگانه در نظر بگیرید.',
      'اندازه سیخ و درصد چربی گوشت روی کالری اثر زیادی دارد.',
    ],
  },
  {
    slug: 'rice',
    nameFa: 'برنج',
    nutrition: {
      caloriesPer100g: 130,
      servingGrams: 158,
      servingCalories: 205,
      protein: 4.3,
      fat: 0.44,
      carbs: 44.5,
      preparation: 'برنج سفید دانه‌بلند غنی‌شده، پخته؛ یک پیمانه مرجع. روغن، کره، ته‌دیگ و خورشت در این ردیف نیستند.',
      sourceLabel: 'USDA SR Legacy، شناسه 168878',
      sourceUrl: 'https://fdc.nal.usda.gov/food-details/168878/nutrients',
      mirrorUrl: 'https://tools.myfooddata.com/nutrition-facts/168878/wt1',
      basisNote: 'وزن پیمانه منبع ۱۵۸ گرم است. مقادیر وعده و ۱۰۰ گرم از همان ردیف‌اند؛ کالری به عدد صحیح گرد شده است.'
    },
    intro:
      'کالری برنج پخته به نوع برنج، مقدار روغن یا کره، حجم پیمانه و روش پخت بستگی دارد. برنج ساده آبکش یا کته بدون روغن کالری کمتری از برنج کره‌ای یا ته‌دیگ دارد.',
    notes: [
      'برنج خام و پخته وزن و کالری متفاوتی در هر 100 گرم دارند؛ این صفحه بر اساس برنج سفید پخته نوشته شده است.',
      'اگر برنج همراه خورشت، کباب یا روغن اضافه مصرف شود، کالری کل وعده باید با همه اجزا محاسبه شود.',
    ],
    tips: [
      'اندازه پیمانه یا قاشق را ثابت نگه دارید تا تخمین روزانه قابل مقایسه شود.',
      'کره، روغن و ته‌دیگ کالری وعده برنج را بالا می‌برند.',
      'برای رژیم لاغری، مقدار برنج کنار پروتئین و سبزیجات بهتر کنترل می‌شود.',
    ],
  },
  {
    slug: 'falafel',
    nameFa: 'فلافل',
    nutrition: {
      caloriesPer100g: 333,
      servingGrams: 100,
      servingCalories: 333,
      protein: 13.3,
      fat: 17.8,
      carbs: 31.8,
      preparation: 'فلافل خانگی آماده مصرف طبق ردیف مرجع؛ بدون نان، سس یا مخلفات ساندویچ. مقدار روغن جذب‌شده در دستورهای دیگر متفاوت است.',
      sourceLabel: 'USDA SR Legacy، شناسه 172455',
      sourceUrl: 'https://fdc.nal.usda.gov/food-details/172455/nutrients',
      mirrorUrl: 'https://datanutri.com/foods/172455/falafel-home-prepared',
      basisNote: 'همه اعداد برای ۱۰۰ گرم فلافل مرجع هستند. تعداد قطعه ثابت نیست؛ فلافل‌ها را وزن کنید.'
    },
    intro:
      'کالری فلافل به اندازه هر عدد، مقدار روغن جذب‌شده در سرخ کردن و مواد داخل ساندویچ بستگی دارد. فلافل تنها با ساندویچ فلافل همراه نان، سس و مخلفات کالری یکسانی ندارد.',
    notes: [
      'فلافل سرخ‌شده معمولاً چربی و کالری بیشتری از نسخه پخته یا کم‌روغن دارد.',
      'نان، ترشی، سیب‌زمینی، سس و مخلفات ساندویچ باید در کالری کل وعده حساب شوند.',
    ],
    tips: [
      'اندازه فلافل‌ها می‌تواند کالری هر عدد را تغییر دهد.',
      'سس‌های چرب کالری ساندویچ فلافل را بالا می‌برند.',
      'برای تخمین دقیق‌تر، از کل ساندویچ یا بشقاب فلافل عکس بگیرید.',
    ],
  },
  ...persianFoodEstimates.map((food): FoodCaloriePageData => ({
    slug: food.slug, nameFa: food.nameFa, category: food.category,
    estimate: { caloriesPer100g: food.caloriesPer100g, preparation: food.preparation, sourceLabel: 'Meals Cook؛ جدول تخمینی غذاهای ایرانی', sourceUrl: 'https://mealscook.net/blog/calories-in-persian-food/' },
    intro: `کالری ${food.nameFa} با مقدار روغن، ترکیب مواد و وزن غذای آماده تغییر می‌کند. عدد این صفحه یک تخمین منتشرشده در منبع آشپزی است؛ اندازه‌گیری آزمایشگاهی یا مقدار دقیق غذای شما نیست.`,
    notes: [food.preparation, 'مبنای محاسبه ۱۰۰ گرم غذای آماده مصرف است. وزن مواد خام را جایگزین وزن غذای پخته نکنید.'],
    tips: ['وعده خود را پس از پخت وزن کنید.', 'نان، نوشیدنی، سس و کنارغذاهایی را که در توضیح نمونه نیستند جدا حساب کنید.', 'روغن و مقدار آب باقی‌مانده پس از پخت، کالری در هر ۱۰۰ گرم را تغییر می‌دهند.'],
  })),
]

export function getFoodCaloriePage(slug: string): FoodCaloriePageData | undefined {
  return FOOD_CALORIE_PAGES.find((food) => food.slug === slug)
}
