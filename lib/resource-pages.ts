import { type SiteLanguage } from './site-language'

export interface ResourceHighlight {
  title: string
  body: string
}

export interface ResourceSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface ResourceFaq {
  question: string
  answer: string
}

export interface ResourceLink {
  href: string
  label: string
  description: string
}

export interface ResourcePageDefinition {
  language?: SiteLanguage
  path: string
  title: string
  description: string
  heading: string
  intro: string
  keywords: string[]
  highlights: ResourceHighlight[]
  sections: ResourceSection[]
  faqs: ResourceFaq[]
}

export type ResourcePageKey = 'ai-calorie-tracker' | 'photo-calorie-calculator' | 'macro-tracker' | 'faq'

export const GUIDE_LINKS: ReadonlyArray<ResourceLink> = [
  {
    href: '/calorie-calculator/',
    label: 'Calorie Calculator',
    description: 'Calculate daily calories, TDEE, and a weight goal timeline from your body and activity details.',
  },
  {
    href: '/ai-calorie-tracker/',
    label: 'AI Calorie Tracker',
    description: 'How Calkilo helps people track calories faster with AI.',
  },
  {
    href: '/photo-calorie-calculator/',
    label: 'Photo Calorie Calculator',
    description: 'A plain-language guide to estimating meal calories from food photos.',
  },
  {
    href: '/macro-tracker/',
    label: 'Macro Tracker',
    description: 'How to track calories, protein, carbs, and fats in one app.',
  },
  {
    href: '/best-calorie-counter-for-persian-food/',
    label: 'Calorie Counter for Persian Food',
    description: 'What to look for when tracking Iranian meals, mixed dishes, calories, and macros.',
  },
  {
    href: '/ai-meal-planner-for-weight-loss/',
    label: 'AI Meal Planner for Weight Loss',
    description: 'How to connect calorie targets, food logging, and practical meal planning.',
  },
  {
    href: '/calkilo-vs-myfitnesspal/',
    label: 'Calkilo vs MyFitnessPal',
    description: 'Compare photo logging, macro tracking, meal planning, language fit, and workflow.',
  },
]

export const RESOURCE_LINKS: ReadonlyArray<ResourceLink> = [
  ...GUIDE_LINKS,
  {
    href: '/faq/',
    label: 'FAQ',
    description: 'Answers about subscriptions, privacy, device sync, and AI food logging.',
  },
]

export const RESOURCE_PAGES: Record<ResourcePageKey, ResourcePageDefinition> = {
  'ai-calorie-tracker': {
    path: '/ai-calorie-tracker/',
    title: 'AI Calorie Tracker App | Calkilo',
    description:
      'Track calories from food photos, meals, and macros with Calkilo. Use AI food logging, nutrition insights, and meal planning on iPhone and Android.',
    heading: 'AI Calorie Tracker App for Faster Food Logging',
    intro:
      'Calkilo is built for people who want to log meals quickly without losing the detail needed for calorie, macro, and nutrition tracking. It combines photo analysis, meal logging, goal tracking, and personalized planning in one mobile app.',
    keywords: ['ai calorie tracker', 'calorie tracker app', 'photo calorie counter', 'nutrition tracking app'],
    highlights: [
      {
        title: 'Log food faster',
        body: 'Take a photo, review the estimate, and save the meal instead of typing every ingredient from scratch.',
      },
      {
        title: 'See more than calories',
        body: 'Track protein, carbs, and fats alongside calorie totals so each meal is useful for real nutrition decisions.',
      },
      {
        title: 'Stay consistent',
        body: 'Progress tracking, meal planning, and device sync make the app easier to keep using every day.',
      },
    ],
    sections: [
      {
        title: 'Why people search for an AI calorie tracker',
        paragraphs: [
          'Most calorie trackers fail because logging takes too long. People want a faster way to estimate meals, keep a daily record, and stay consistent for more than a few days.',
          'An AI calorie tracker should reduce friction without turning every meal into a guess. That means quick capture, editable entries, and a clear record of calories and macros over time.',
        ],
        bullets: [
          'Fast meal logging for breakfast, lunch, dinner, and snacks',
          'Better estimates for mixed meals than a manual search-only workflow',
          'Clear calorie, protein, carb, and fat breakdowns',
          'Simple daily tracking on both Android and iPhone',
        ],
      },
      {
        title: 'How Calkilo fits that use case',
        paragraphs: [
          'Calkilo is designed around photo-based logging, but it does not stop at a single calorie number. After the AI estimate, you can review the result, keep a nutrition record, and use the app as an everyday tracker.',
          'The product also connects meal logging with planning and goal setting, which is usually the missing step between tracking data and actually changing behavior.',
        ],
        bullets: [
          'Photo calorie estimation for faster meal capture',
          'Daily nutrition tracking with macros and progress views',
          'AI-supported meal planning and recipe suggestions',
          'Integrations with Apple Health, Google Fit, Fitbit, and Samsung Health',
        ],
      },
      {
        title: 'Who this works best for',
        paragraphs: [
          'The app is a good fit for people who want a practical tracker instead of a spreadsheet-style food database. It is especially useful when speed matters more than perfect laboratory precision.',
          'That includes people trying to lose weight, maintain a routine, improve portion awareness, or hit macro targets without spending too much time logging.',
        ],
        bullets: [
          'People who want to log meals from photos',
          'Users tracking body composition or weight changes',
          'Anyone trying to stay consistent with calorie or macro goals',
          'Busy users who need a tracker that is easy to return to',
        ],
      },
      {
        title: 'What to compare before choosing any calorie tracker',
        paragraphs: [
          'Look for tools that make correction easy. AI estimates are helpful, but users still need a simple way to review, adjust, and learn from the result.',
          'It also matters whether the product has enough plain-language content for support, privacy, and feature explanations. Search engines and AI systems both rely on that clarity when deciding what the product does.',
        ],
        bullets: [
          'Editable entries after photo analysis',
          'Macro tracking alongside calorie totals',
          'Clear privacy and support pages',
          'Enough indexable content to explain the product outside the app stores',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can an AI calorie tracker estimate meals from a photo?',
        answer:
          'Yes. Calkilo uses photo analysis to estimate calories and nutrition from food images, then lets users review the result as part of their ongoing meal log.',
      },
      {
        question: 'Does Calkilo track macros too?',
        answer:
          'Yes. The app is positioned as both a calorie tracker and a macro tracker, with protein, carbohydrate, and fat tracking alongside calorie totals.',
      },
      {
        question: 'Is Calkilo available on Android and iPhone?',
        answer:
          'Yes. Calkilo is available through Google Play and the Apple App Store.',
      },
      {
        question: 'Who should use an AI calorie tracker instead of a manual food log?',
        answer:
          'It is useful for people who want to reduce logging time, keep a more consistent routine, and still review meals with enough detail to support weight or nutrition goals.',
      },
    ],
  },
  'photo-calorie-calculator': {
    path: '/photo-calorie-calculator/',
    title: 'Photo Calorie Calculator AI | Count Calories From Food Pictures',
    description:
      'Take a photo of your food and instantly estimate calories, protein, carbs and fat using AI.',
    heading: 'Photo Calorie Calculator for Meals and Snacks',
    intro:
      'People often search for a photo calorie calculator when manual logging feels too slow. Calkilo turns that use case into a full meal-tracking workflow, so a food photo becomes the start of a usable record instead of a one-off estimate.',
    keywords: ['photo calorie calculator', 'food photo calorie calculator', 'meal calorie estimator', 'photo calorie counter'],
    highlights: [
      {
        title: 'Start with the camera',
        body: 'Photo logging is the fastest path from a real meal to a saved calorie entry.',
      },
      {
        title: 'Keep the nutrition detail',
        body: 'The result can include calories and macro information instead of only a rough total.',
      },
      {
        title: 'Turn estimates into habits',
        body: 'Saved meals, daily logs, and progress tracking make the feature useful beyond a single scan.',
      },
    ],
    sections: [
      {
        title: 'When a photo calorie calculator is most useful',
        paragraphs: [
          'Photo-based calorie estimation is most helpful when users eat mixed meals, home-cooked food, or restaurant dishes that are painful to search manually in a database.',
          'The real benefit is not just speed. It is the reduced effort needed to keep logging after the first few days of motivation wear off.',
        ],
        bullets: [
          'Restaurant meals without easy nutrition labels',
          'Homemade dishes with multiple ingredients',
          'Quick snack logging during a busy day',
          'Daily tracking where speed matters',
        ],
      },
      {
        title: 'What happens after the photo matters',
        paragraphs: [
          'A weak calculator gives one number and stops there. A stronger product lets the user review the meal, keep a history, and connect the estimate to broader nutrition goals.',
          'Calkilo positions the feature as part of ongoing calorie and macro tracking, which makes it more useful than a simple standalone tool.',
        ],
        bullets: [
          'Estimate the meal from a photo',
          'Review the result in the app',
          'Track calories and macros across the day',
          'Use the saved data for goal-based planning',
        ],
      },
      {
        title: 'Why this is better than a one-number calculator',
        paragraphs: [
          'Users usually need context, not only a number. They want to know whether a meal fits the rest of the day and whether it matches their protein or calorie target.',
          'That is why the strongest search pages and AI answers for this topic need more than a marketing slogan. They should explain editing, macro tracking, and how estimates are used in practice.',
        ],
        bullets: [
          'Calories are more useful when paired with macros',
          'Meal history helps users spot patterns',
          'Planning features turn estimates into next actions',
          'Support and privacy information improve trust',
        ],
      },
      {
        title: 'When to review or edit a result',
        paragraphs: [
          'Photo estimation is strongest when the image is clear and the meal is visible. Users should still review portion size, hidden ingredients, or anything outside the frame.',
          'That is a product strength, not a weakness. Good AI nutrition tools let people correct the record instead of pretending the first estimate is perfect every time.',
        ],
        bullets: [
          'Adjust mixed dishes or sauces when needed',
          'Review portion sizes for dense foods',
          'Use manual context when part of the meal is hidden',
          'Keep the corrected entry as part of the daily log',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can Calkilo estimate calories from a meal photo?',
        answer:
          'Yes. Calkilo is built around photo calorie estimation and lets users turn a food photo into a calorie and nutrition entry.',
      },
      {
        question: 'Does the photo calorie calculator show macros too?',
        answer:
          'Calkilo is positioned as both a calorie and macro tracking app, so meals can be reviewed in a broader nutrition context instead of as a single calorie total.',
      },
      {
        question: 'What kinds of meals are hardest for a photo calorie calculator?',
        answer:
          'Mixed meals, hidden ingredients, and unclear portion sizes can require user review. The best workflow is to use the estimate as a fast starting point and correct it when needed.',
      },
      {
        question: 'Is a photo calorie calculator useful for daily tracking?',
        answer:
          'Yes. The main value is speed. Faster logging makes it easier to stay consistent across days and weeks, which matters more than perfect one-time estimates.',
      },
    ],
  },
  'macro-tracker': {
    path: '/macro-tracker/',
    title: 'Macro Tracker App with AI Food Logging | Calkilo',
    description:
      'Track calories, protein, carbs, and fats with Calkilo. Use AI food logging, photo calorie estimates, and nutrition planning on iPhone and Android.',
    heading: 'Macro Tracker App with AI Food Logging',
    intro:
      'A strong macro tracker has to do more than store numbers. Calkilo combines calorie tracking, macro logging, food photos, and planning features so users can stay consistent with protein, carb, fat, and calorie goals in one app.',
    keywords: ['macro tracker', 'macro tracker app', 'protein carb fat tracker', 'ai macro tracker'],
    highlights: [
      {
        title: 'Track protein, carbs, and fats',
        body: 'Macro totals are easier to use when they live next to calories and meal history.',
      },
      {
        title: 'Log meals quickly',
        body: 'Photo-first logging reduces the time needed to capture meals and stay consistent.',
      },
      {
        title: 'Plan around goals',
        body: 'Goal tracking and meal planning help users apply macro data instead of just collecting it.',
      },
    ],
    sections: [
      {
        title: 'Why macro tracking is different from simple calorie counting',
        paragraphs: [
          'Calories show overall intake, but macros explain how that intake is distributed. Many users care about protein targets, carbohydrate balance, or fat intake for performance, satiety, or body composition goals.',
          'That makes usability especially important. If macro logging takes too long, most people stop doing it even if they understand the value.',
        ],
        bullets: [
          'Protein targets for muscle retention or growth',
          'Carb awareness for training or energy planning',
          'Fat intake tracking for overall nutrition balance',
          'Calorie context so macro totals stay actionable',
        ],
      },
      {
        title: 'How Calkilo supports macro tracking',
        paragraphs: [
          'Calkilo connects photo logging with nutrition summaries, so users can move from a meal image to a saved macro entry faster than a search-only workflow.',
          'The app also ties tracking to goals and planning, which is important for people following a cut, maintenance phase, or performance-focused routine.',
        ],
        bullets: [
          'Photo calorie and meal analysis',
          'Macro-aware daily food logging',
          'Goal tracking for weight and nutrition targets',
          'Meal planning and recipe support',
        ],
      },
      {
        title: 'Who benefits most from a macro tracker',
        paragraphs: [
          'Macro tracking is useful for users with specific targets rather than only a general desire to eat better. That includes gym users, athletes, people cutting or maintaining weight, and anyone trying to structure meals more intentionally.',
          'It is also helpful for people who know they should track macros but have not stuck with database-heavy apps in the past.',
        ],
        bullets: [
          'Athletes and gym users',
          'People cutting or maintaining body weight',
          'Users aiming for higher protein intake',
          'Anyone who wants more structure than calorie tracking alone',
        ],
      },
      {
        title: 'What to compare in macro tracker apps',
        paragraphs: [
          'The best macro tracker is the one people will keep using. That usually depends on logging speed, clear meal summaries, and whether the product gives practical follow-up features like planning and progress views.',
          'Search engines and AI tools also understand products better when feature pages explain these differences in plain text instead of leaving everything inside the app interface.',
        ],
        bullets: [
          'How fast the app is to log each meal',
          'Whether macros are visible for every saved entry',
          'Whether progress is easy to review over time',
          'Whether the public website clearly explains the feature set',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Calkilo work as a macro tracker or only a calorie tracker?',
        answer:
          'Calkilo is positioned as both. It supports calorie tracking together with protein, carb, and fat tracking in the same workflow.',
      },
      {
        question: 'Can I use photo logging and still track macros?',
        answer:
          'Yes. The value of Calkilo is that photo logging feeds into a broader nutrition record instead of acting as a disconnected estimate.',
      },
      {
        question: 'Who should use a macro tracker app?',
        answer:
          'Macro trackers are most useful for people with specific nutrition targets, including weight management, higher protein goals, training plans, or body composition changes.',
      },
      {
        question: 'Why is logging speed important in a macro tracker?',
        answer:
          'Consistency is usually the biggest challenge. If entering meals takes too long, users stop tracking before the data becomes useful.',
      },
    ],
  },
  faq: {
    path: '/faq/',
    title: 'Calkilo FAQ | AI Calorie Tracker Questions Answered',
    description:
      'Find answers about calorie tracking, photo food logging, meal plans, subscriptions, privacy, and device integrations in Calkilo.',
    heading: 'Frequently Asked Questions About Calkilo',
    intro:
      'This page collects the main product, subscription, privacy, and device questions people ask about Calkilo. It is also the canonical FAQ URL for old /faq.html links that may still appear in search results.',
    keywords: ['calkilo faq', 'ai calorie tracker faq', 'photo calorie app questions', 'macro tracker faq'],
    highlights: [
      {
        title: 'Product basics',
        body: 'What the app does, how photo logging works, and which platforms are supported.',
      },
      {
        title: 'Plans and privacy',
        body: 'Questions about free access, premium features, support, and privacy requests.',
      },
      {
        title: 'Device connections',
        body: 'Answers about Apple Health, Google Fit, Fitbit, and Samsung Health support.',
      },
    ],
    sections: [
      {
        title: 'What Calkilo is',
        paragraphs: [
          'Calkilo is an AI calorie tracker and nutrition app. It is designed to help users estimate meal calories from food photos, keep a nutrition log, track macros, and follow progress over time.',
          'The app also includes meal planning and recipe-related support so tracking can connect to everyday decisions instead of stopping at raw data.',
        ],
      },
      {
        title: 'What the FAQ page is for',
        paragraphs: [
          'Support pages are useful for more than existing customers. They also help search engines and AI systems understand the product with explicit, crawlable text that is not hidden inside the app.',
          'This page is meant to be the canonical public answer hub for questions that previously surfaced through older HTML pages.',
        ],
        bullets: [
          'Product questions',
          'Subscription questions',
          'Privacy and data questions',
          'Integration questions',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much does Calkilo cost?',
        answer:
          'Calkilo premium is available monthly for $4.99 or yearly for $14.99, unlocking deeper analytics, meal planning, and AI coaching.',
      },
      {
        question: 'How does photo calorie tracking work in Calkilo?',
        answer:
          'Users take a photo of a meal, review the AI estimate, and keep the result as part of their ongoing calorie and nutrition log.',
      },
      {
        question: 'Does Calkilo include meal planning?',
        answer:
          'Yes. The product messaging includes personalized meal planning and recipe support tied to goals and preferences.',
      },
      {
        question: 'Can I change dietary preferences after onboarding?',
        answer:
          'Yes. Users can update preferences, restrictions, and nutrition targets after onboarding.',
      },
      {
        question: 'Is food photo data private?',
        answer:
          'Calkilo states that uploads are encrypted and used to deliver analysis and personal recommendations. Privacy-related questions can also be handled through the privacy and contact pages.',
      },
      {
        question: 'Do I need an internet connection to use the app?',
        answer:
          'Photo analysis needs internet access, but users can still review previous data and basic logs while offline.',
      },
      {
        question: 'Does Calkilo work with health and fitness apps?',
        answer:
          'Yes. The landing page states support for Apple Health, Google Fit, Fitbit, and Samsung Health.',
      },
      {
        question: 'Where can I contact support or request account deletion?',
        answer:
          'Support requests can be sent through the contact page, and account or data deletion requests can be submitted through the dedicated account deletion page.',
      },
    ],
  },
}

export const LOCALIZED_RESOURCE_PAGES: Partial<
  Record<SiteLanguage, Partial<Record<ResourcePageKey, ResourcePageDefinition>>>
> = {
  fa: {
    'photo-calorie-calculator': {
      language: 'fa',
      path: '/fa/photo-calorie-calculator/',
      title: 'کالری شمار با عکس رایگان | محاسبه کالری غذا با هوش مصنوعی - Calkilo',
      description:
        'کافی است از غذای خود عکس بگیرید. هوش مصنوعی Calkilo کالری، پروتئین، چربی و کربوهیدرات غذا را در چند ثانیه محاسبه می‌کند.',
      heading: 'کالری شمار با عکس رایگان',
      intro:
        'در Calkilo کافی است عکس غذای خود را آپلود کنید یا همان لحظه با دوربین بگیرید. هوش مصنوعی غذا و اجزای اصلی آن را تشخیص می‌دهد، سپس کالری، پروتئین، چربی و کربوهیدرات را به صورت تخمینی نمایش می‌دهد. این روش برای رژیم لاغری، برنامه بدنسازی، کنترل وزن و پیگیری تغذیه روزانه مناسب است، چون ثبت غذا را سریع‌تر می‌کند و در عین حال امکان بررسی و اصلاح نتیجه را به شما می‌دهد.',
      keywords: [
        'کالری شمار با عکس',
        'کالری شمار با عکس رایگان',
        'هوش مصنوعی کالری شمار',
        'هوش مصنوعی کالری شمار رایگان',
        'کالری شمار غذا آنلاین با عکس',
        'محاسبه کالری غذا با عکس',
        'اسکن کالری غذا',
        'برنامه کالری شمار با عکس',
      ],
      highlights: [
        {
          title: 'شروع با عکس غذا',
          body: 'یک تصویر واضح از وعده بگیرید تا ثبت غذا سریع‌تر از جست‌وجوی دستی انجام شود.',
        },
        {
          title: 'کالری همراه با ماکروها',
          body: 'به جای یک عدد خام، کالری، پروتئین، کربوهیدرات و چربی را در کنار هم ببینید.',
        },
        {
          title: 'قابل بررسی و اصلاح',
          body: 'تخمین هوش مصنوعی نقطه شروع است؛ می‌توانید مقدار غذا، مواد مخفی یا اندازه وعده را بررسی کنید.',
        },
      ],
      sections: [
        {
          title: 'کالری شمار با عکس چگونه به ثبت روزانه غذا کمک می‌کند؟',
          paragraphs: [
            'در روش‌های قدیمی کالری شماری، باید نام غذا را جست‌وجو کنید، مقدار هر ماده را حدس بزنید و برای غذاهای ترکیبی چند بار ورودی بسازید. وقتی وعده خانگی، رستورانی یا چندلایه باشد، همین فرایند باعث می‌شود بسیاری از کاربران بعد از چند روز پیگیری را رها کنند.',
            'Calkilo این مسیر را کوتاه‌تر می‌کند. عکس غذا به یک نقطه شروع تبدیل می‌شود؛ هوش مصنوعی نوع غذا و اجزای قابل مشاهده را بررسی می‌کند و سپس یک تخمین قابل مرور از کالری و ماکروها می‌سازد. کاربر همچنان کنترل دارد و می‌تواند اندازه وعده، مواد پنهان یا سس‌ها را در نظر بگیرد.',
          ],
          bullets: [
            'ثبت سریع صبحانه، ناهار، شام و میان‌وعده',
            'تخمین بهتر برای غذاهای خانگی و ترکیبی نسبت به ورود دستی کامل',
            'نمایش کالری و ماکروها در یک گزارش قابل استفاده',
            'مناسب برای رژیم لاغری، تناسب اندام و پیگیری تغذیه روزانه',
          ],
        },
        {
          title: 'بعد از گرفتن عکس چه اتفاقی می‌افتد؟',
          paragraphs: [
            'یک ابزار ساده ممکن است فقط یک عدد تقریبی نشان دهد و تمام شود. Calkilo تخمین را در مسیر کامل‌تری قرار می‌دهد: ابتدا عکس تحلیل می‌شود، سپس کالری و درشت‌مغذی‌ها نمایش داده می‌شوند و کاربر می‌تواند نتیجه را قبل از ذخیره کردن بررسی کند.',
            'این ساختار برای تصمیم روزانه مفیدتر است. وقتی می‌دانید یک وعده چه مقدار کالری، پروتئین، چربی و کربوهیدرات دارد، راحت‌تر می‌توانید آن را با هدف کاهش وزن، حفظ وزن، عضله‌سازی یا برنامه غذایی روزانه مقایسه کنید.',
          ],
          bullets: [
            'عکس غذا را ثبت کنید',
            'تخمین کالری و مواد مغذی را ببینید',
            'اگر اندازه وعده یا مواد غذایی متفاوت بود، نتیجه را بررسی کنید',
            'وعده را در لاگ روزانه نگه دارید',
          ],
        },
        {
          title: 'چه زمانی باید نتیجه را بررسی یا اصلاح کرد؟',
          paragraphs: [
            'هوش مصنوعی وقتی غذا در تصویر واضح باشد، نور کافی وجود داشته باشد و بخش اصلی وعده دیده شود عملکرد بهتری دارد. با این حال غذاهایی مثل خورشت، پیتزا، کباب همراه برنج، سالاد با سس یا غذاهای سرخ‌شده ممکن است مواد پنهان و کالری بیشتری داشته باشند.',
            'به همین دلیل نتیجه باید به عنوان تخمین سریع دیده شود، نه عدد آزمایشگاهی. یک کالری شمار با عکس زمانی کاربردی است که به شما اجازه بدهد نتیجه را مرور کنید، مقدار غذا را منطقی‌تر کنید و نسخه اصلاح‌شده را برای پیگیری روزانه نگه دارید.',
          ],
          bullets: [
            'غذاهای مخلوط یا چندلایه را بررسی کنید',
            'برای غذاهای پرکالری مثل روغن و سس دقت بیشتری داشته باشید',
            'اگر بخشی از غذا در تصویر نیست، مقدار آن را در نظر بگیرید',
            'از نتیجه اصلاح‌شده برای پیگیری روزانه استفاده کنید',
          ],
        },
      ],
      faqs: [
        {
          question: 'کالری شمار با عکس چیست؟',
          answer:
            'کالری شمار با عکس ابزاری است که از تصویر غذا برای تشخیص نوع غذا و تخمین کالری و ارزش غذایی استفاده می‌کند. در Calkilo عکس غذا به یک ورودی قابل بررسی برای ثبت روزانه تبدیل می‌شود.',
        },
        {
          question: 'آیا Calkilo رایگان است؟',
          answer:
            'شروع استفاده از Calkilo رایگان است. برخی امکانات پیشرفته مانند برنامه‌ریزی غذایی، تحلیل‌های عمیق‌تر یا قابلیت‌های پریمیوم ممکن است در طرح پولی ارائه شوند.',
        },
        {
          question: 'هوش مصنوعی چگونه کالری غذا را از روی عکس محاسبه می‌کند؟',
          answer:
            'هوش مصنوعی تصویر را بررسی می‌کند، غذاها و اجزای قابل مشاهده را تشخیص می‌دهد و بر اساس نوع غذا، اندازه تقریبی وعده و داده‌های تغذیه‌ای، کالری و ماکروها را تخمین می‌زند.',
        },
        {
          question: 'دقت محاسبه کالری با عکس چقدر است؟',
          answer:
            'دقت به کیفیت عکس، اندازه وعده، مواد پنهان، سس‌ها و نوع غذا بستگی دارد. نتیجه Calkilo یک تخمین سریع و قابل بررسی است و برای غذاهای پیچیده بهتر است مقدار و مواد را مرور کنید.',
        },
        {
          question: 'آیا می‌توانم برای رژیم لاغری از Calkilo استفاده کنم؟',
          answer:
            'بله. Calkilo برای کاهش وزن، حفظ وزن، برنامه بدنسازی و پیگیری تغذیه روزانه قابل استفاده است، چون ثبت وعده‌ها را سریع‌تر می‌کند و کالری و ماکروها را در کنار هم نشان می‌دهد.',
        },
        {
          question: 'آیا Calkilo پروتئین، چربی و کربوهیدرات را هم محاسبه می‌کند؟',
          answer:
            'بله. Calkilo فقط کالری را نمایش نمی‌دهد؛ پروتئین، چربی و کربوهیدرات هم به عنوان درشت‌مغذی‌های اصلی در تخمین غذا در نظر گرفته می‌شوند.',
        },
      ],
    },
    'ai-calorie-tracker': {
      language: 'fa',
      path: '/fa/ai-calorie-tracker/',
      title: 'کالری شمار هوش مصنوعی رایگان | Calkilo',
      description:
        'کالکیلو یک کالری شمار هوش مصنوعی برای ثبت غذا از روی عکس، پیگیری ماکروها و برنامه‌ریزی وعده‌ها در آیفون و اندروید است.',
      heading: 'کالری شمار هوش مصنوعی برای ثبت سریع غذا',
      intro:
        'کالکیلو برای کاربرانی ساخته شده که می‌خواهند کالری و تغذیه را سریع‌تر ثبت کنند، اما هنوز به جزئیات لازم برای تصمیم‌گیری روزانه نیاز دارند. عکس غذا، هوش مصنوعی، ماکروها و هدف‌های تغذیه‌ای در یک مسیر ساده کنار هم قرار می‌گیرند.',
      keywords: [
        'هوش مصنوعی کالری شمار رایگان',
        'کالری شمار هوش مصنوعی',
        'کالری شمار رایگان',
        'اپ کالری شمار با هوش مصنوعی',
      ],
      highlights: [
        {
          title: 'ثبت غذا با هوش مصنوعی',
          body: 'غذا را سریع‌تر از ورود دستی ثبت کنید و تخمین را قبل از ذخیره بررسی کنید.',
        },
        {
          title: 'پیگیری کالری و ماکرو',
          body: 'کالری، پروتئین، کربوهیدرات و چربی را در کنار هدف روزانه دنبال کنید.',
        },
        {
          title: 'برنامه‌ریزی بر اساس هدف',
          body: 'ردیابی غذا زمانی مفیدتر است که به برنامه غذایی، عادت روزانه و هدف وزن وصل شود.',
        },
      ],
      sections: [
        {
          title: 'چرا کاربران دنبال کالری شمار هوش مصنوعی هستند؟',
          paragraphs: [
            'بیشتر کاربران کالری شماری را به خاطر زمان‌بر بودن رها می‌کنند. هوش مصنوعی می‌تواند مرحله سخت ثبت غذا را کوتاه‌تر کند.',
            'یک کالری شمار هوش مصنوعی خوب فقط حدس نمی‌زند؛ باید نتیجه را قابل فهم، قابل اصلاح و قابل استفاده در گزارش روزانه کند.',
          ],
          bullets: [
            'کاهش زمان ثبت غذا',
            'ثبت غذاهای خانگی و رستورانی با عکس',
            'نمایش کالری و درشت‌مغذی‌ها',
            'ادامه دادن آسان‌تر در روزهای شلوغ',
          ],
        },
        {
          title: 'کالکیلو چه تفاوتی ایجاد می‌کند؟',
          paragraphs: [
            'کالکیلو عکس غذا را به یک ورودی تغذیه‌ای تبدیل می‌کند و آن را در کنار هدف‌ها، ماکروها و برنامه‌ریزی وعده‌ها قرار می‌دهد.',
            'این ساختار برای کاربرانی مناسب است که می‌خواهند سرعت داشته باشند، اما همچنان بتوانند نتیجه را مرور و اصلاح کنند.',
          ],
          bullets: [
            'تخمین غذا از روی عکس',
            'ثبت وعده در لاگ روزانه',
            'نمایش ماکروها در کنار کالری',
            'پشتیبانی از Apple Health، Google Fit، Fitbit و Samsung Health',
          ],
        },
        {
          title: 'برای چه کسانی مناسب است؟',
          paragraphs: [
            'این نوع اپ برای افرادی مناسب است که می‌خواهند وزن کم کنند، وزن خود را حفظ کنند، پروتئین بیشتری مصرف کنند یا فقط عادت غذایی واضح‌تری داشته باشند.',
            'اگر ورود دستی هر وعده باعث می‌شود پیگیری را رها کنید، ثبت مبتنی بر عکس می‌تواند اصطکاک را کمتر کند.',
          ],
          bullets: [
            'افراد در مسیر کاهش یا حفظ وزن',
            'کاربرانی که هدف پروتئین یا ماکرو دارند',
            'افراد پرمشغله که ثبت سریع می‌خواهند',
            'کسانی که اپ ساده‌تر از دفترچه یا جدول می‌خواهند',
          ],
        },
      ],
      faqs: [
        {
          question: 'کالری شمار هوش مصنوعی چگونه کار می‌کند؟',
          answer:
            'کاربر عکس غذا را ثبت می‌کند، کالکیلو تخمین کالری و مواد مغذی را آماده می‌کند و کاربر می‌تواند نتیجه را پیش از ذخیره بررسی کند.',
        },
        {
          question: 'آیا کالکیلو برای آیفون و اندروید موجود است؟',
          answer: 'بله. نسخه اندروید کالکیلو از طریق Cafe Bazaar و Myket و نسخه iOS از طریق App Store در دسترس است.',
        },
        {
          question: 'آیا می‌توانم بعداً نتیجه تخمین را اصلاح کنم؟',
          answer:
            'بله. تخمین هوش مصنوعی باید قابل بررسی باشد، مخصوصاً وقتی اندازه وعده یا مواد مخفی در عکس کاملاً مشخص نیست.',
        },
        {
          question: 'آیا کالکیلو فقط برای کاهش وزن است؟',
          answer:
            'خیر. می‌توانید از آن برای کاهش وزن، حفظ وزن، آگاهی از وعده‌ها، پیگیری ماکروها یا ساخت عادت غذایی منظم‌تر استفاده کنید.',
        },
      ],
    },
    'macro-tracker': {
      language: 'fa',
      path: '/fa/macro-tracker/',
      title: 'برنامه پیگیری ماکرو و کالری | کالکیلو',
      description:
        'با کالکیلو کالری، پروتئین، کربوهیدرات و چربی را همراه با ثبت غذا از روی عکس و برنامه‌ریزی وعده‌ها دنبال کنید.',
      heading: 'پیگیری ماکروها همراه با کالری شمار هوش مصنوعی',
      intro:
        'اگر فقط کالری را ببینید، تصویر کامل تغذیه مشخص نمی‌شود. کالکیلو کمک می‌کند کالری و ماکروها را در کنار هم ثبت کنید تا وعده‌ها برای هدف روزانه قابل تصمیم‌گیری باشند.',
      keywords: ['پیگیری ماکرو', 'ماکرو شمار', 'کالری و ماکرو', 'اپ پیگیری پروتئین'],
      highlights: [
        {
          title: 'پروتئین، کربوهیدرات و چربی',
          body: 'ماکروها را کنار کالری ببینید تا هر وعده معنی بیشتری داشته باشد.',
        },
        {
          title: 'ثبت سریع‌تر وعده‌ها',
          body: 'عکس غذا زمان ثبت را کم می‌کند و ادامه دادن پیگیری را آسان‌تر می‌کند.',
        },
        {
          title: 'هماهنگ با هدف‌های تغذیه‌ای',
          body: 'پیگیری ماکرو زمانی ارزشمندتر است که به هدف وزن، برنامه غذایی و روند روزانه وصل شود.',
        },
      ],
      sections: [
        {
          title: 'چرا پیگیری ماکرو با کالری شماری فرق دارد؟',
          paragraphs: [
            'کالری مقدار انرژی را نشان می‌دهد، اما ماکروها توضیح می‌دهند این انرژی از چه ترکیبی آمده است.',
            'برای بسیاری از کاربران، مخصوصاً کسانی که هدف پروتئین یا ترکیب بدنی دارند، دیدن ماکروها کنار کالری ضروری است.',
          ],
          bullets: [
            'هدف پروتئین برای حفظ یا افزایش عضله',
            'کنترل کربوهیدرات برای انرژی و تمرین',
            'تعادل چربی در برنامه غذایی',
            'تصمیم بهتر درباره وعده‌های بعدی روز',
          ],
        },
        {
          title: 'کالکیلو چگونه به پیگیری ماکرو کمک می‌کند؟',
          paragraphs: [
            'کالکیلو ثبت غذا را با عکس سریع‌تر می‌کند و نتیجه را در قالب کالری و ماکروهای قابل بررسی نشان می‌دهد.',
            'این مسیر برای کاربرانی طراحی شده که نمی‌خواهند هر ماده غذایی را جداگانه و زمان‌بر وارد کنند.',
          ],
          bullets: [
            'ثبت غذا از روی عکس',
            'نمایش کالری و درشت‌مغذی‌ها',
            'پیگیری هدف روزانه',
            'برنامه‌ریزی وعده و پیشنهادهای غذایی',
          ],
        },
      ],
      faqs: [
        {
          question: 'آیا کالکیلو ماکروها را هم نشان می‌دهد؟',
          answer:
            'بله. کالکیلو برای پیگیری کالری و ماکروها طراحی شده است و پروتئین، کربوهیدرات و چربی را در کنار کالری در نظر می‌گیرد.',
        },
        {
          question: 'آیا پیگیری ماکرو برای همه لازم است؟',
          answer:
            'برای همه ضروری نیست، اما برای هدف‌هایی مثل کنترل وزن، افزایش پروتئین یا برنامه تمرینی مفیدتر از دیدن کالری تنهاست.',
        },
        {
          question: 'آیا می‌توانم با عکس غذا ماکرو هم ثبت کنم؟',
          answer:
            'بله. ارزش اصلی کالکیلو این است که عکس غذا به یک رکورد تغذیه‌ای تبدیل می‌شود، نه فقط یک تخمین جداگانه.',
        },
      ],
    },
  },
  it: {
    'photo-calorie-calculator': {
      language: 'it',
      path: '/it/photo-calorie-calculator/',
      title: 'Calcolo calorie da foto con AI | Calkilo',
      description:
        'Scatta una foto di pasta, pizza o altri pasti e usa Calkilo per stimare calorie, proteine, carboidrati e grassi con l’AI.',
      heading: 'Calcolo calorie da foto con AI per pasti e snack',
      intro:
        'Calkilo aiuta a registrare i pasti più velocemente: una foto diventa il punto di partenza per stimare calorie e macronutrienti, controllare la porzione e salvare il risultato nel diario alimentare.',
      keywords: ['calcolo calorie ai', 'calcolo calorie da foto', 'contacalorie con foto', 'app calorie e macro'],
      highlights: [
        {
          title: 'Scatta una foto',
          body: 'Registra un pasto reale senza cercare ogni ingrediente manualmente.',
        },
        {
          title: 'Vedi calorie e macro',
          body: 'Usa la stima come punto di partenza per calorie, proteine, carboidrati e grassi.',
        },
        {
          title: 'Controlla il risultato',
          body: 'Rivedi porzioni, condimenti e ingredienti nascosti prima di salvare il pasto.',
        },
      ],
      sections: [
        {
          title: 'Quando serve un calcolo calorie da foto',
          paragraphs: [
            'Il calcolo da foto è utile per pasti fatti in casa, piatti misti e ristoranti, dove cercare manualmente ogni ingrediente richiede troppo tempo.',
            'Il vantaggio principale è la velocità: meno passaggi rendono più semplice mantenere un diario alimentare completo durante la settimana.',
          ],
          bullets: [
            'Pasti con più ingredienti',
            'Snack e pranzi veloci',
            'Piatti senza etichetta nutrizionale',
            'Diario alimentare quotidiano con meno inserimenti manuali',
          ],
        },
        {
          title: 'Esempi pratici con pasta, pizza e piatti misti',
          paragraphs: [
            'Con una pasta al pomodoro, fotografa l’intero piatto e controlla soprattutto quantità di pasta, olio e formaggio grattugiato. Per una pizza, includi tutta la base e gli ingredienti visibili, poi verifica dimensione, mozzarella e condimenti extra.',
            'Risotti, lasagne e piatti unici richiedono più attenzione perché burro, besciamella, formaggi o salse possono essere nascosti. La foto accelera la prima stima; la revisione rende il risultato più realistico.',
          ],
          bullets: [
            'Pasta: controlla porzione, olio e formaggio',
            'Pizza: verifica diametro, impasto e condimenti',
            'Risotto e lasagne: considera burro, salse e strati nascosti',
            'Panini e aperitivi: includi contorni, salse e bevande',
          ],
        },
        {
          title: 'Perché non basta un numero solo',
          paragraphs: [
            'Sapere le calorie è utile, ma spesso serve capire anche se il pasto aiuta a raggiungere gli obiettivi giornalieri di proteine, carboidrati e grassi.',
            'Calkilo collega la stima AI al tracking quotidiano, così il risultato resta utile anche dopo aver salvato il pasto.',
          ],
          bullets: [
            'Calorie con contesto nutrizionale',
            'Macro accanto al diario dei pasti',
            'Obiettivi e pianificazione alimentare',
            'Correzioni quando la stima va rivista',
          ],
        },
        {
          title: 'Quando controllare la stima AI',
          paragraphs: [
            'Le foto funzionano meglio quando il piatto è visibile e ben illuminato. Porzioni, salse, olio e ingredienti nascosti possono richiedere una revisione.',
            'Un buon flusso AI non pretende che la prima stima sia perfetta: permette di controllare e salvare un dato più utile.',
          ],
          bullets: [
            'Controlla piatti misti o coperti',
            'Rivedi porzioni dense di calorie',
            'Aggiungi contesto se qualcosa non si vede',
            'Usa il risultato corretto nel diario giornaliero',
          ],
        },
      ],
      faqs: [
        {
          question: 'Calkilo calcola le calorie da una foto?',
          answer:
            'Sì. Calkilo usa la foto del pasto per stimare calorie e informazioni nutrizionali, poi permette di rivedere il risultato.',
        },
        {
          question: 'Il calcolo calorie AI mostra anche le macro?',
          answer:
            'Calkilo è pensato per calorie e macro, quindi proteine, carboidrati e grassi fanno parte del contesto nutrizionale.',
        },
        {
          question: 'Il risultato è sempre preciso?',
          answer:
            'La stima AI è un punto di partenza rapido. Pasti complessi, salse e porzioni nascoste possono richiedere una correzione.',
        },
        {
          question: 'Calkilo è disponibile su iPhone e Android?',
          answer: 'Sì. Calkilo è disponibile tramite App Store e Google Play.',
        },
      ],
    },
    'ai-calorie-tracker': {
      language: 'it',
      path: '/it/ai-calorie-tracker/',
      title: 'App contacalorie AI da foto: pasti e macro | Calkilo',
      description:
        'Registra pasti da foto, controlla calorie e macro e segui il diario alimentare con l’app contacalorie AI Calkilo su iPhone e Android.',
      heading: 'App contacalorie AI per registrare i pasti più velocemente',
      intro:
        'Calkilo combina foto del cibo, stime AI, diario alimentare, macro e pianificazione dei pasti. È pensato per chi vuole tracciare meglio senza passare troppo tempo su inserimenti manuali.',
      keywords: ['app contacalorie ai', 'calcolo calorie ai', 'ai calorie tracker', 'app nutrizione ai'],
      highlights: [
        {
          title: 'Meno inserimento manuale',
          body: 'Parti da una foto e rivedi la stima prima di salvare il pasto.',
        },
        {
          title: 'Calorie e macro insieme',
          body: 'Tieni sotto controllo energia, proteine, carboidrati e grassi nello stesso flusso.',
        },
        {
          title: 'Obiettivi e pianificazione',
          body: 'Collega il diario alimentare a obiettivi, ricette e suggerimenti più pratici.',
        },
      ],
      sections: [
        {
          title: 'Perché scegliere un contacalorie AI',
          paragraphs: [
            'Molte persone smettono di tracciare perché registrare ogni pasto richiede troppo tempo. L’AI riduce l’attrito iniziale.',
            'La parte importante è mantenere il controllo: la stima deve essere chiara, modificabile e collegata al diario giornaliero.',
          ],
          bullets: [
            'Registrazione più rapida dei pasti',
            'Supporto per piatti misti e foto del cibo',
            'Macro oltre alle calorie',
            'Tracking più facile da mantenere nel tempo',
          ],
        },
        {
          title: 'Un esempio di giornata nel diario alimentare',
          paragraphs: [
            'A colazione puoi registrare cappuccino e cornetto nella stessa foto; a pranzo fotografare un piatto di pasta con il contorno; a cena controllare pizza, secondo o piatto misto. Ogni stima entra nello stesso diario, invece di restare un calcolo isolato.',
            'Gli snack e l’aperitivo contano: includere bevande, salse e piccoli assaggi aiuta a costruire un quadro giornaliero più completo.',
          ],
          bullets: [
            'Colazione: cappuccino, cornetto e aggiunte visibili',
            'Pranzo: pasta, riso o piatto unico con contorni',
            'Cena: pizza, secondo e condimenti',
            'Snack e aperitivo: bevande, salse e porzioni piccole',
          ],
        },
        {
          title: 'Come Calkilo usa l’AI nel tracking',
          paragraphs: [
            'Calkilo trasforma la foto in una stima nutrizionale e la collega al diario, agli obiettivi e alla pianificazione.',
            'Questo rende l’app utile sia per chi vuole perdere peso sia per chi vuole capire meglio porzioni e abitudini.',
          ],
          bullets: [
            'Analisi del pasto da foto',
            'Revisione del risultato',
            'Diario calorie e macro',
            'Integrazioni con Apple Health, Google Fit, Fitbit e Samsung Health',
          ],
        },
        {
          title: 'Per chi è più adatta',
          paragraphs: [
            'Un contacalorie AI è adatto a chi vuole un diario più veloce, ma non vuole rinunciare a dettagli utili per le decisioni quotidiane.',
            'È utile per perdere peso, mantenere una routine, controllare le porzioni o raggiungere obiettivi di macro.',
          ],
          bullets: [
            'Persone che tracciano pasti ogni giorno',
            'Utenti con obiettivi di peso o composizione corporea',
            'Chi vuole più proteine o macro più bilanciate',
            'Chi preferisce partire da una foto invece che da una ricerca manuale',
          ],
        },
      ],
      faqs: [
        {
          question: 'Calkilo è un’app contacalorie AI?',
          answer:
            'Sì. Calkilo usa funzioni AI per stimare pasti da foto e aiuta a registrare calorie, macro e informazioni nutrizionali.',
        },
        {
          question: 'Posso modificare una stima AI?',
          answer:
            'Sì. La stima è un punto di partenza e va rivista quando porzioni o ingredienti non sono chiari.',
        },
        {
          question: 'Serve internet per l’analisi delle foto?',
          answer:
            'L’analisi delle foto richiede una connessione internet, mentre i dati già registrati possono essere consultati anche in seguito.',
        },
        {
          question: 'Calkilo serve solo per dimagrire?',
          answer:
            'No. Può aiutare anche a mantenere una routine, migliorare la consapevolezza delle porzioni e monitorare obiettivi di macro.',
        },
      ],
    },
  },
}

const LOCALIZED_RESOURCE_LINKS: Partial<Record<SiteLanguage, ReadonlyArray<ResourceLink>>> = {
  fa: [
    {
      href: '/fa/photo-calorie-calculator/',
      label: 'محاسبه کالری غذا با عکس',
      description: 'صفحه اصلی محاسبه کالری غذا از روی عکس با هوش مصنوعی Calkilo.',
    },
    {
      href: '/fa/calorie-counter-with-photo/',
      label: 'کالری شمار با عکس',
      description: 'راهنمای کامل استفاده از عکس غذا برای ثبت کالری و درشت‌مغذی‌ها.',
    },
    {
      href: '/fa/free-photo-calorie-calculator/',
      label: 'کالری شمار با عکس رایگان',
      description: 'شروع رایگان برای تخمین کالری غذا با عکس و بررسی نتیجه.',
    },
    {
      href: '/fa/ai-calorie-calculator/',
      label: 'هوش مصنوعی کالری شمار',
      description: 'هوش مصنوعی چگونه از عکس غذا کالری، پروتئین، چربی و کربوهیدرات را تخمین می‌زند.',
    },
    {
      href: '/fa/food-calorie-scanner/',
      label: 'اسکن کالری غذا',
      description: 'اسکن غذا با دوربین برای ساخت یک تخمین سریع و قابل بررسی.',
    },
    {
      href: '/fa/ai-calorie-tracker/',
      label: 'کالری شمار هوش مصنوعی',
      description: 'چطور کالکیلو ثبت غذا، کالری و ماکروها را با هوش مصنوعی سریع‌تر می‌کند.',
    },
    {
      href: '/fa/macro-tracker/',
      label: 'پیگیری ماکرو',
      description: 'پیگیری کالری، پروتئین، کربوهیدرات و چربی در کنار ثبت غذا از روی عکس.',
    },
    {
      href: '/faq/',
      label: 'سوالات متداول',
      description: 'پاسخ پرسش‌های رایج درباره اشتراک، حریم خصوصی، همگام‌سازی و ثبت غذا با هوش مصنوعی.',
    },
  ],
  it: [
    {
      href: '/it/photo-calorie-calculator/',
      label: 'Calcolo calorie da foto con AI',
      description: 'Guida principale con esempi di pasta, pizza e piatti misti, calorie e macro.',
    },
    {
      href: '/it/ai-calorie-tracker/',
      label: 'App contacalorie AI da foto',
      description: 'Registra i pasti nel diario e monitora calorie, proteine, carboidrati e grassi.',
    },
    {
      href: '/it/calcolo-calorie-con-foto-gratis/',
      label: 'Calcolo calorie con foto gratis',
      description: 'Prova il flusso da foto e scopri cosa include l’esperienza gratuita.',
    },
    {
      href: '/it/intelligenza-artificiale-calorie/',
      label: 'Come l’AI stima le calorie',
      description: 'Capisci come funziona la stima e quando porzioni o ingredienti richiedono una revisione.',
    },
    {
      href: '/it/',
      label: 'Calkilo in italiano',
      description: 'Scopri funzioni, piani e download di Calkilo nella pagina italiana.',
    },
    {
      href: '/faq/',
      label: 'FAQ',
      description: 'Risposte su abbonamenti, privacy, sincronizzazione e food logging AI.',
    },
  ],
}

export function getResourcePage(pageKey: ResourcePageKey, language: SiteLanguage = 'en'): ResourcePageDefinition {
  return LOCALIZED_RESOURCE_PAGES[language]?.[pageKey] ?? RESOURCE_PAGES[pageKey]
}

export function getLocalizedResourceLinks(language: SiteLanguage): ReadonlyArray<ResourceLink> {
  return LOCALIZED_RESOURCE_LINKS[language] ?? RESOURCE_LINKS
}

export function getResourceLocalizedLanguages(pageKey: ResourcePageKey): SiteLanguage[] {
  return (Object.entries(LOCALIZED_RESOURCE_PAGES) as Array<[SiteLanguage, Partial<Record<ResourcePageKey, ResourcePageDefinition>>]>)
    .filter(([, pages]) => Boolean(pages[pageKey]))
    .map(([language]) => language)
}

export function getResourcePathForLanguage(pageKey: ResourcePageKey, language: SiteLanguage): string | null {
  if (language === 'en') {
    return RESOURCE_PAGES[pageKey].path
  }

  return LOCALIZED_RESOURCE_PAGES[language]?.[pageKey]?.path ?? null
}

export function getResourceAlternateLanguages(pageKey: ResourcePageKey): Array<{ lang: SiteLanguage; path: string }> {
  return [
    { lang: 'en', path: RESOURCE_PAGES[pageKey].path },
    ...getResourceLocalizedLanguages(pageKey).map((language) => ({
      lang: language,
      path: LOCALIZED_RESOURCE_PAGES[language]?.[pageKey]?.path ?? RESOURCE_PAGES[pageKey].path,
    })),
  ]
}
