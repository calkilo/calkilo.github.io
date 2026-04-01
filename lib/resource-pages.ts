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

export const GUIDE_LINKS: ReadonlyArray<ResourceLink> = [
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
]

export const RESOURCE_LINKS: ReadonlyArray<ResourceLink> = [
  ...GUIDE_LINKS,
  {
    href: '/faq/',
    label: 'FAQ',
    description: 'Answers about subscriptions, privacy, device sync, and AI food logging.',
  },
]

export const RESOURCE_PAGES: Record<'ai-calorie-tracker' | 'photo-calorie-calculator' | 'macro-tracker' | 'faq', ResourcePageDefinition> = {
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
    title: 'Photo Calorie Calculator | Calkilo',
    description:
      'Estimate meal calories from a food photo with Calkilo. Review calorie and macro data, keep a meal log, and use AI food analysis on iPhone and Android.',
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
          'Calkilo offers a free starting point, while premium plans unlock more advanced features such as deeper analytics, meal planning, and AI coaching.',
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

