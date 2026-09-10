import PersianHomeContent from './PersianHomeContent'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState, type CSSProperties, type ImgHTMLAttributes } from 'react'
import { APP_STORE_URL, getAndroidStoreLinks, getStoreSameAs, GOOGLE_PLAY_URL } from '../lib/app-links'
import { type BlogListStatus, type BlogPost } from '../lib/blog'
import { getLocalizedResourceLinks } from '../lib/resource-pages'
import { SITE_URL } from '../lib/seo'
import { CORE_SITE_LINKS, ENGLISH_POPULAR_PAGE_LINKS, type SitePageLink } from '../lib/site-pages'
import { CALKILO_PRICING, getUsdPricingDisplay, PRICING_FAQ_ANSWER } from '../lib/pricing'
import { PREFERENCE_UPDATE_ANSWER_EN, PREFERENCE_UPDATE_ANSWERS } from '../lib/product-facts'
import {
  buildAlternateLanguagePaths,
  isRtlLanguage,
  LANGUAGE_DISPLAY_FONT_FAMILIES,
  LANGUAGE_FONT_FAMILIES,
  normalizeSiteLanguage,
  type SiteLanguage,
  switchLanguagePath,
  toLocalizedPath,
} from '../lib/site-language'
import BlogLatestSection from './BlogLatestSection'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import SeoHead from './SeoHead'

type LandingVariant = 'light' | 'dark'

interface LandingPageProps {
  initialBlogPosts?: BlogPost[]
  initialBlogStatus?: BlogListStatus
  lang?: string
  variant: LandingVariant
}

interface HeroSlide {
  height: number
  sizes?: string
  src: string
  srcSet?: string
  width: number
}

const EMPTY_BLOG_POSTS: BlogPost[] = []

const FIGMA_ASSETS = {
  heroSlideOne: '/assets/figma/9d9b9498b6a18bddd5bf8497bbfeac1152b019f0.webp',
  heroSlideOne520: '/assets/figma/9d9b9498b6a18bddd5bf8497bbfeac1152b019f0-520.webp',
  heroSlideOne700: '/assets/figma/9d9b9498b6a18bddd5bf8497bbfeac1152b019f0-700.webp',
  heroSlideOne960: '/assets/figma/9d9b9498b6a18bddd5bf8497bbfeac1152b019f0-960.webp',
  heroSlideTwoLight: '/assets/figma/65a641bda519c280d8c60b43b9194d73157d5c50.webp',
  heroSlideTwoLight520: '/assets/figma/65a641bda519c280d8c60b43b9194d73157d5c50-520.webp',
  heroSlideTwoLight760: '/assets/figma/65a641bda519c280d8c60b43b9194d73157d5c50-760.webp',
  heroSlideTwoDark: '/assets/figma/e868a161326472def96e2a09561e5c328725ad68.webp',
  aiScreenMain: '/assets/analysis.png',
  aiScreenAltOne: '/assets/chatAi.png',
  aiScreenAltTwo: '/assets/goal.png',
  aiScreenAltThree: '/assets/food.png',
  nutrientFood: '/assets/figma/f9fc5d99c2586a8ad4c69f78e400402215b3cf0d.webp',
  mealCheese: '/assets/figma/a07ad49e36ea032dcf3464dcfc4e3947ec6d4108.webp',
  mealKebab: '/assets/figma/4d70d5ddd422f6daae0ab9012dfccd118bf8760f.webp',
  howScan: '/assets/figma/91a03867120f1176a96de7c963594542dd9020cd.webp',
  howAnalyze: '/assets/figma/ff8765a9d5715fe86accc36535380ac908919f6a.webp',
  howTrack: '/assets/figma/ca251d12fbd0aabf9fa0a93e9bdd0f13035d3f4a.webp',
  showcasePhoneLight: '/assets/figma/144fdc5e8efb509c6633f560c1d992b7caeda48b.webp',
  showcasePhoneDark: '/assets/figma/cf534efed9f33231adce8d4bb20068f596e7e5ed.webp',
  testimonialPatternLight: '/assets/figma/799db71e4d01dc53b148041ca9ffe475417e18ae.webp',
  testimonialPatternDark: '/assets/figma/c4062c2c99c33073ea782580edb076695f3d2ff4.webp',
  avocadoAccent: '/assets/figma/d2a83b3b0cfab62434f69e2ccf8149cb68e9e9f7.webp',
  communityPattern: '/assets/figma/d0483e2a4aef637594c6708a5e625afd025940da.webp',
  communityChallenge: '/assets/challenge.png',
  communityShare: '/assets/share.png',
  communityLeaderboard: '/assets/leaderboard.png',
  communityInvite: '/assets/invite.png',
  downloadDecor: '/assets/figma/a405a82c1cca495479595832e0875e50bf678341.png',
  downloadPhone: '/assets/figma/e9df2fa0d3353ddb99e689cfcc597568be38a5ad.webp',
  downloadTrophy: '/assets/figma/ed0552cf31e3cc332040cf675af1604cbb45cb4d.webp',
  downloadObjects: '/assets/download.png',
  integrationAppleHealth: '/assets/Apple%20Health.png',
  integrationGoogleFit: '/assets/Google-fit.png',
  integrationFitbit: '/assets/Fitbit.png',
  integrationSamsungHealth: '/assets/Samsung%20Health.png',
  headetLogo: '/assets/header-logo.png',
  AppStore:'/assets/appstore.png',
  GooglePlay: '/assets/google-play.png',
} as const

const HERO_IMAGE_SIZES = '(max-width: 760px) calc(100vw - 28px), (max-width: 1160px) calc(100vw - 48px), 690px'
const HERO_SLIDE_ONE_SRC_SET = [
  `${FIGMA_ASSETS.heroSlideOne520} 520w`,
  `${FIGMA_ASSETS.heroSlideOne700} 700w`,
  `${FIGMA_ASSETS.heroSlideOne960} 960w`,
  `${FIGMA_ASSETS.heroSlideOne} 1400w`,
].join(', ')
const HERO_SLIDE_TWO_LIGHT_SRC_SET = [
  `${FIGMA_ASSETS.heroSlideTwoLight520} 520w`,
  `${FIGMA_ASSETS.heroSlideTwoLight760} 760w`,
  `${FIGMA_ASSETS.heroSlideTwoLight} 950w`,
].join(', ')

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string
  src: string
}

function getWebpSource(src: string): string | undefined {
  return src.endsWith('.png') ? src.replace(/\.png$/u, '.webp') : undefined
}

function OptimizedImage({ alt, src, ...props }: OptimizedImageProps) {
  const webpSource = getWebpSource(src)
  // eslint-disable-next-line @next/next/no-img-element
  const image = <img {...props} src={src} alt={alt} />

  if (!webpSource) {
    return image
  }

  return (
    <picture className="lp-optimized-picture">
      <source srcSet={webpSource} type="image/webp" />
      {image}
    </picture>
  )
}

const NAV_ITEMS = ['home', 'features', 'pricing', 'blog', 'contact'] as const

const LANDING_PAGE_KEYWORDS: Record<SiteLanguage, ReadonlyArray<string>> = {
  en: ['free ai calorie tracker', 'photo calorie calculator', 'macro tracker app', 'nutrition tracking app', 'calkilo'],
  nl: ['ai calorietracker', 'foto calorie calculator', 'macro tracker app', 'voeding app', 'calkilo'],
  zh: ['ai 卡路里追踪', '拍照计算卡路里', '营养追踪应用', '宏量营养追踪', 'calkilo'],
  ru: ['ai трекер калорий', 'подсчет калорий по фото', 'приложение для макросов', 'трекер питания', 'calkilo'],
  ar: ['متتبع السعرات بالذكاء الاصطناعي', 'حاسبة سعرات من الصورة', 'تطبيق تتبع الماكروز', 'تتبع التغذية', 'calkilo'],
  fa: ['کالری شمار', 'کالری شمار آنلاین', 'کالری شمار رایگان', 'کالری شمار غذا آنلاین', 'کالکیلو'],
  it: ['calcolo calorie ai', 'calorie da foto', 'contacalorie con foto', 'app calorie e macro', 'calkilo'],
}

const POPULAR_PAGES_INTRO =
  'Explore the most important Calkilo pages for features, pricing, support, and calorie-tracking guides.'

const TRANSLATIONS: Record<
  SiteLanguage,
  {
    pageDescription: string
    pageTitle: string
    darkThemeLabel: string
    nav: Record<(typeof NAV_ITEMS)[number], string>
    tryFree: string
    heroTitleA: string
    heroTitleB: string
    heroDescription: string
    availableOn: string
    aiTitle: string
    aiSubtitle: string
    nutrientTitle: string
    howTitleA: string
    howTitleB: string
    howSubtitle: string
    styleTitle: string
    styleDescription: string
    light: string
    dark: string
    integrationsTitle: string
    integrationsSubtitle: string
    testimonialsTitleA: string
    testimonialsTitleB: string
    pricingKicker: string
    pricingTitle: string
    communityTitle: string
    communitySubtitle: string
    downloadTitleA: string
    downloadTitleB: string
    downloadDescription: string
    scanLabel: string
    faqKicker: string
    faqTitleA: string
    faqTitleB: string
    faqSubtitle: string
    faqSupportTitle: string
    faqSupportText: string
    faqSupportButton: string
    footerDescription: string
    storeGoogleSmall: string
    storeGoogleLarge: string
    storeAppleSmall: string
    storeAppleLarge: string
  }
> = {
  en: {
    pageDescription:
      'Download Calkilo free with in-app purchases to estimate calories from food photos, track macros, and plan meals on iPhone and Android.',
    pageTitle: 'AI Calorie Tracker & Photo Food Calorie Counter | Calkilo',
    darkThemeLabel: 'Dark Theme',
    nav: { home: 'Home', features: 'Features', pricing: 'Choose Plan', blog: 'Blog', contact: 'Contact' },
    tryFree: 'Try for free',
    heroTitleA: 'AI Calorie Tracker',
    heroTitleB: 'for Food Photos',
    heroDescription:
      'Calkilo is an AI calorie counter and nutrition assistant. Snap a meal photo to estimate calories and macros, review the result, keep a daily log, and plan meals with less manual entry.',
    availableOn: 'Available on:',
    aiTitle: 'CalKilo-AI: Powered Agent, Meal Planning & Recipes',
    aiSubtitle:
      "Hey, What's Up? Get personalized meal plans tailored to your goals, preferences, and dietary restrictions.",
    nutrientTitle: "Don't forget to replenish the nutrients you need in a day.",
    howTitleA: 'How it',
    howTitleB: 'Works?',
    howSubtitle: 'Three simple steps to smarter calorie tracking',
    styleTitle: 'Dark mode for a sleek tracking experience!',
    styleDescription:
      'Choose the look that feels right for you. Switch between light and dark mode for a more comfortable tracking experience.',
    light: 'Light',
    dark: 'Dark',
    integrationsTitle: 'Seamlessly Integrates with Your Devices',
    integrationsSubtitle:
      'Sync with your favorite health and fitness apps for a complete wellness picture.',
    testimonialsTitleA: 'What Are People Saying',
    testimonialsTitleB: 'About Us',
    pricingKicker: 'Simple pricing',
    pricingTitle: 'Choose monthly or yearly premium access',
    communityTitle: 'Join a Thriving Community',
    communitySubtitle: 'Invite friends, share progress, and build healthier routines together',
    downloadTitleA: 'Ready to Transform Your Nutrition?',
    downloadTitleB: 'Get Calkilo for free.',
    downloadDescription: 'Download the app to track calories and crush your health goals.',
    scanLabel: 'Scan to download',
    faqKicker: 'FAQ',
    faqTitleA: 'Frequently Asked',
    faqTitleB: 'Questions',
    faqSubtitle: "Got questions? We've got answers",
    faqSupportTitle: 'Still have questions?',
    faqSupportText:
      "Can't find the answer you're looking for? Our friendly support team is ready to help you get the most out of Calkilo.",
    faqSupportButton: 'Get in touch',
    footerDescription: 'Simplifying nutrition tracking with editable AI-assisted calorie estimates.',
    storeGoogleSmall: 'GET IT ON',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'Download on the',
    storeAppleLarge: 'App Store',
  },
  nl: {
    pageDescription:
      'Schat calorieen met AI, ontvang persoonlijke maaltijdplannen en volg je voeding op al je apparaten.',
    pageTitle: 'Calkilo | AI-calorietracker en voedingsapp',
    darkThemeLabel: 'Donkere modus',
    nav: { home: 'Thuis', features: 'Functies', pricing: 'Kies plan', blog: 'Blog', contact: 'Contact' },
    tryFree: 'Probeer gratis',
    heroTitleA: 'Schat calorieen met',
    heroTitleB: 'AI',
    heroDescription: 'Maak een foto van je maaltijd en krijg een bewerkbare schatting van calorieen en voedingswaarden.',
    availableOn: 'Beschikbaar op:',
    aiTitle: 'CalKilo-AI: Slimme agent, maaltijdplanning en recepten',
    aiSubtitle: 'Ontvang persoonlijke maaltijdplannen op basis van je doelen en voorkeuren.',
    nutrientTitle: 'Vergeet niet om je dagelijkse voedingsstoffen aan te vullen.',
    howTitleA: 'Hoe het',
    howTitleB: 'werkt',
    howSubtitle: 'Drie eenvoudige stappen voor slimmer calorieen bijhouden',
    styleTitle: 'Donkere modus voor een strak trackinggevoel!',
    styleDescription: 'Kies de stijl die bij je past en wissel tussen lichte en donkere modus.',
    light: 'Licht',
    dark: 'Donker',
    integrationsTitle: 'Naadloze integratie met je apparaten',
    integrationsSubtitle: 'Synchroniseer met je favoriete gezondheids- en fitnessapps.',
    testimonialsTitleA: 'Wat mensen zeggen',
    testimonialsTitleB: 'over ons',
    pricingKicker: 'Eenvoudige prijzen',
    pricingTitle: 'Kies maandelijkse of jaarlijkse premium toegang',
    communityTitle: 'Word deel van een actieve community',
    communitySubtitle: 'Nodig vrienden uit, deel je voortgang en bouw samen gezondere routines op',
    downloadTitleA: 'Klaar om je voeding te verbeteren?',
    downloadTitleB: 'Download Calkilo gratis.',
    downloadDescription: 'Download de app en haal je gezondheidsdoelen sneller.',
    scanLabel: 'Scan om te downloaden',
    faqKicker: 'FAQ',
    faqTitleA: 'Veelgestelde',
    faqTitleB: 'vragen',
    faqSubtitle: 'Vragen? Wij hebben antwoorden',
    faqSupportTitle: 'Nog vragen?',
    faqSupportText: 'Ons supportteam helpt je graag om het meeste uit Calkilo te halen.',
    faqSupportButton: 'Neem contact op',
    footerDescription: 'Voeding bijhouden wordt eenvoudiger met bewerkbare, door AI ondersteunde calorieschattingen.',
    storeGoogleSmall: 'GET IT ON',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'Download on the',
    storeAppleLarge: 'App Store',
  },
  zh: {
    pageDescription: '用 AI 估算卡路里，获取个性化餐食计划，并在所有设备上追踪营养。',
    pageTitle: 'Calkilo | AI 卡路里追踪与营养应用',
    darkThemeLabel: '深色主题',
    nav: { home: '首页', features: '功能', pricing: '选择计划', blog: '博客', contact: '联系我们' },
    tryFree: '免费试用',
    heroTitleA: '使用 AI',
    heroTitleB: '估算卡路里',
    heroDescription: '拍一张食物照片，获得可检查和修改的热量及营养估算。',
    availableOn: '可在以下平台下载：',
    aiTitle: 'CalKilo-AI：智能助手、餐食规划与食谱',
    aiSubtitle: '根据你的目标、偏好和饮食限制，生成个性化餐食计划。',
    nutrientTitle: '别忘了补充你每天所需的营养。',
    howTitleA: '如何',
    howTitleB: '运作？',
    howSubtitle: '三个简单步骤，更聪明地记录卡路里',
    styleTitle: '深色模式，带来更顺滑的追踪体验！',
    styleDescription: '选择你喜欢的外观，在浅色和深色模式间切换。',
    light: '浅色',
    dark: '深色',
    integrationsTitle: '与你的设备无缝集成',
    integrationsSubtitle: '与常用健康与健身应用同步，获得完整健康视图。',
    testimonialsTitleA: '用户如何评价',
    testimonialsTitleB: '我们',
    pricingKicker: '简单定价',
    pricingTitle: '选择月度或年度高级版',
    communityTitle: '加入活跃社区',
    communitySubtitle: '邀请朋友、分享进展，一起养成更健康的习惯',
    downloadTitleA: '准备好改变你的营养习惯了吗？',
    downloadTitleB: '免费获取 Calkilo。',
    downloadDescription: '下载应用，追踪热量并达成健康目标。',
    scanLabel: '扫码下载',
    faqKicker: '常见问题',
    faqTitleA: '常见',
    faqTitleB: '问题',
    faqSubtitle: '有问题？我们有答案',
    faqSupportTitle: '还有问题？',
    faqSupportText: '找不到答案？我们的支持团队随时帮助你更好使用 Calkilo。',
    faqSupportButton: '联系我们',
    footerDescription: '通过可编辑的 AI 辅助热量估算，让营养追踪更简单。',
    storeGoogleSmall: '立即获取',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: '下载于',
    storeAppleLarge: 'App Store',
  },
  ru: {
    pageDescription:
      'Оценивайте калории с помощью AI, получайте персональные планы питания и отслеживайте рацион на всех устройствах.',
    pageTitle: 'Calkilo | AI-трекер калорий и питания',
    darkThemeLabel: 'Темная тема',
    nav: { home: 'Главная', features: 'Функции', pricing: 'Тарифы', blog: 'Блог', contact: 'Контакты' },
    tryFree: 'Попробовать бесплатно',
    heroTitleA: 'Оценивайте калории с',
    heroTitleB: 'помощью AI',
    heroDescription: 'Сфотографируйте еду и получите редактируемую оценку калорий и пищевой ценности.',
    availableOn: 'Доступно в:',
    aiTitle: 'CalKilo-AI: Умный агент, план питания и рецепты',
    aiSubtitle: 'Получайте персональные планы питания под ваши цели и предпочтения.',
    nutrientTitle: 'Не забывайте восполнять нужные питательные вещества каждый день.',
    howTitleA: 'Как это',
    howTitleB: 'работает?',
    howSubtitle: 'Три простых шага для умного подсчета калорий',
    styleTitle: 'Темная тема для стильного трекинга!',
    styleDescription: 'Выберите удобный стиль и переключайтесь между светлой и темной темой.',
    light: 'Светлая',
    dark: 'Темная',
    integrationsTitle: 'Бесшовная интеграция с вашими устройствами',
    integrationsSubtitle: 'Синхронизируйте любимые приложения здоровья и фитнеса.',
    testimonialsTitleA: 'Что говорят',
    testimonialsTitleB: 'о нас',
    pricingKicker: 'Простые цены',
    pricingTitle: 'Выберите месячный или годовой премиум-доступ',
    communityTitle: 'Присоединяйтесь к активному сообществу',
    communitySubtitle: 'Приглашайте, делитесь и мотивируйте друг друга',
    downloadTitleA: 'Готовы изменить свое питание?',
    downloadTitleB: 'Получите Calkilo бесплатно.',
    downloadDescription: 'Скачайте приложение и достигайте своих целей по здоровью.',
    scanLabel: 'Сканируйте для загрузки',
    faqKicker: 'Частые вопросы',
    faqTitleA: 'Часто задаваемые',
    faqTitleB: 'вопросы',
    faqSubtitle: 'Есть вопросы? У нас есть ответы',
    faqSupportTitle: 'Остались вопросы?',
    faqSupportText: 'Наша поддержка поможет получить максимум от Calkilo.',
    faqSupportButton: 'Связаться',
    footerDescription: 'Упрощаем контроль питания с помощью редактируемых оценок калорий на базе ИИ.',
    storeGoogleSmall: 'СКАЧАТЬ В',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'Загрузить в',
    storeAppleLarge: 'App Store',
  },
  ar: {
    pageDescription:
      'قدّر السعرات بمساعدة الذكاء الاصطناعي، واحصل على خطط وجبات مخصصة، وتابع تغذيتك على جميع أجهزتك.',
    pageTitle: 'Calkilo | تطبيق تتبع السعرات والتغذية بالذكاء الاصطناعي',
    darkThemeLabel: 'الوضع الداكن',
    nav: { home: 'الرئيسية', features: 'الميزات', pricing: 'الخطط', blog: 'المدونة', contact: 'تواصل' },
    tryFree: 'جرب مجاناً',
    heroTitleA: 'قدّر السعرات بـ',
    heroTitleB: 'الذكاء الاصطناعي',
    heroDescription: 'التقط صورة لوجبتك واحصل على تقدير قابل للمراجعة للسعرات والمعلومات الغذائية.',
    availableOn: 'متاح على:',
    aiTitle: 'CalKilo-AI: وكيل ذكي، تخطيط وجبات ووصفات',
    aiSubtitle: 'احصل على خطط وجبات مخصصة حسب أهدافك وتفضيلاتك وقيودك الغذائية.',
    nutrientTitle: 'لا تنسَ تعويض العناصر الغذائية التي تحتاجها يومياً.',
    howTitleA: 'كيف',
    howTitleB: 'يعمل؟',
    howSubtitle: 'ثلاث خطوات بسيطة لتتبع أذكى للسعرات',
    styleTitle: 'الوضع الداكن لتجربة تتبع أنيقة!',
    styleDescription: 'اختر المظهر المناسب لك وبدّل بين الوضع الفاتح والداكن.',
    light: 'فاتح',
    dark: 'داكن',
    integrationsTitle: 'تكامل سلس مع أجهزتك',
    integrationsSubtitle: 'قم بالمزامنة مع تطبيقات الصحة واللياقة المفضلة لديك.',
    testimonialsTitleA: 'ماذا يقول',
    testimonialsTitleB: 'المستخدمون',
    pricingKicker: 'أسعار بسيطة',
    pricingTitle: 'اختر اشتراك بريميوم شهرياً أو سنوياً',
    communityTitle: 'انضم إلى مجتمع مزدهر',
    communitySubtitle: 'ادعُ أصدقاءك وشارك تقدمك وابنوا عادات صحية معاً',
    downloadTitleA: 'جاهز لتحسين تغذيتك؟',
    downloadTitleB: 'احصل على Calkilo مجاناً.',
    downloadDescription: 'حمّل التطبيق لتتبع السعرات وتحقيق أهدافك الصحية.',
    scanLabel: 'امسح للتنزيل',
    faqKicker: 'الأسئلة الشائعة',
    faqTitleA: 'الأسئلة',
    faqTitleB: 'الشائعة',
    faqSubtitle: 'لديك أسئلة؟ لدينا الإجابات',
    faqSupportTitle: 'ما زلت تبحث عن إجابة؟',
    faqSupportText: 'فريق الدعم لدينا جاهز لمساعدتك لتحقيق أفضل استفادة من Calkilo.',
    faqSupportButton: 'تواصل معنا',
    footerDescription: 'نبسّط تتبع التغذية بتقديرات سعرات قابلة للتعديل ومدعومة بالذكاء الاصطناعي.',
    storeGoogleSmall: 'حمّل من',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'تنزيل من',
    storeAppleLarge: 'App Store',
  },
  fa: {
    pageDescription:
      'دانلود Calkilo رایگان است و خرید درون‌برنامه‌ای دارد؛ غذا را ثبت کنید، کالری و ماکروها را ببینید و از تحلیل عکس کمک بگیرید.',
    pageTitle: 'کالری شمار آنلاین غذا با دانلود رایگان | کالکیلو',
    darkThemeLabel: 'حالت تیره',
    nav: { home: 'خانه', features: 'امکانات', pricing: 'اشتراک', blog: 'راهنماها', contact: 'پشتیبانی' },
    tryFree: 'رایگان شروع کنید',
    heroTitleA: 'کالری شمار آنلاین',
    heroTitleB: 'برای غذای روزانه',
    heroDescription:
      'غذا و میان‌وعده‌های روزانه را سریع ثبت کنید، کالری، پروتئین، کربوهیدرات و چربی را ببینید و روند رژیم خود را دنبال کنید. برای ثبت سریع‌تر می‌توانید از عکس غذا و تحلیل هوش مصنوعی هم استفاده کنید.',
    availableOn: 'در دسترس در:',
    aiTitle: 'CalKilo-AI: عامل هوشمند، برنامه‌ریزی وعده غذایی و دستور غذا',
    aiSubtitle: 'برنامه‌های غذایی شخصی‌سازی‌شده متناسب با اهداف، ترجیحات و محدودیت‌های غذایی شما.',
    nutrientTitle: 'فراموش نکنید مواد مغذی مورد نیاز روزانه‌تان را تامین کنید.',
    howTitleA: 'چگونه',
    howTitleB: 'کار می‌کند؟',
    howSubtitle: 'سه گام ساده برای پیگیری هوشمندتر کالری',
    styleTitle: 'حالت تیره برای تجربه‌ای شیک در پیگیری!',
    styleDescription: 'ظاهر دلخواهتان را انتخاب کنید و بین حالت روشن و تیره جابه‌جا شوید.',
    light: 'روشن',
    dark: 'تیره',
    integrationsTitle: 'یکپارچه با دستگاه‌های شما',
    integrationsSubtitle: 'با برنامه‌های سلامت و تناسب اندام محبوبتان همگام‌سازی می‌شود.',
    testimonialsTitleA: 'کاربران چه',
    testimonialsTitleB: 'می‌گویند',
    pricingKicker: 'قیمت‌گذاری ساده',
    pricingTitle: 'دسترسی پریمیوم ماهانه یا سالانه را انتخاب کنید',
    communityTitle: 'به یک جامعه پویا بپیوندید',
    communitySubtitle: 'دوستانتان را دعوت کنید، پیشرفت را به اشتراک بگذارید و با هم عادت‌های سالم‌تری بسازید.',
    downloadTitleA: 'آماده تغییر تغذیه خود هستید؟',
    downloadTitleB: 'اپ را رایگان دانلود کنید',
    downloadDescription: 'اپ را دانلود کنید تا کالری را دنبال کنید و به اهداف سلامتی برسید.',
    scanLabel: 'برای دانلود اسکن کنید',
    faqKicker: 'سوالات متداول',
    faqTitleA: 'سوالات',
    faqTitleB: 'متداول',
    faqSubtitle: 'سوالی دارید؟ ما اینجا هستیم تا راهنمایی‌تان کنیم',
    faqSupportTitle: 'همچنان سوالی در ذهن دارید؟',
    faqSupportText: 'تیم پشتیبانی ما آماده است تا به شما کمک کند بهترین تجربه را در استفاده از Calkilo داشته باشید.',
    faqSupportButton: 'تماس با ما',
    footerDescription: 'ردیابی تغذیه را با تخمین کالری مبتنی بر هوش مصنوعی ساده‌تر می‌کنیم.',
    storeGoogleSmall: 'دریافت از',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'دانلود از',
    storeAppleLarge: 'App Store',
  },
  it: {
    pageDescription:
      'Scatta una foto del pasto e calcola calorie, macro e nutrizione con AI. Calkilo ti aiuta a registrare il diario alimentare su iPhone e Android.',
    pageTitle: 'Calcolo calorie AI da foto | Calkilo',
    darkThemeLabel: 'Tema scuro',
    nav: { home: 'Home', features: 'Funzioni', pricing: 'Scegli piano', blog: 'Blog', contact: 'Contatto' },
    tryFree: 'Provalo gratis',
    heroTitleA: 'Calcolo calorie AI',
    heroTitleB: 'da foto',
    heroDescription:
      'Scatta una foto del tuo pasto e ottieni una stima di calorie, proteine, carboidrati e grassi. Rivedi il risultato, salva il pasto e mantieni il diario alimentare senza inserimenti manuali lunghi.',
    availableOn: 'Disponibile su:',
    aiTitle: 'CalKilo-AI: Agente smart, piano pasti e ricette',
    aiSubtitle: 'Piani alimentari personalizzati in base a obiettivi e preferenze.',
    nutrientTitle: 'Non dimenticare di reintegrare i nutrienti giornalieri necessari.',
    howTitleA: 'Come',
    howTitleB: 'funziona',
    howSubtitle: 'Tre semplici passaggi per monitorare meglio le calorie',
    styleTitle: 'Modalita scura per un tracking elegante!',
    styleDescription: 'Scegli lo stile che preferisci e passa tra tema chiaro e scuro.',
    light: 'Chiaro',
    dark: 'Scuro',
    integrationsTitle: 'Integrazione perfetta con i tuoi dispositivi',
    integrationsSubtitle: 'Sincronizza le tue app salute e fitness preferite.',
    testimonialsTitleA: 'Cosa dicono',
    testimonialsTitleB: 'di noi',
    pricingKicker: 'Prezzi semplici',
    pricingTitle: 'Scegli accesso premium mensile o annuale',
    communityTitle: 'Unisciti a una community attiva',
    communitySubtitle: 'Invita gli amici, condividi i progressi e costruite insieme abitudini più sane',
    downloadTitleA: 'Pronto a migliorare la tua nutrizione?',
    downloadTitleB: 'Scarica Calkilo gratis.',
    downloadDescription: "Scarica l'app per tracciare calorie e raggiungere i tuoi obiettivi.",
    scanLabel: 'Scansiona per scaricare',
    faqKicker: 'FAQ',
    faqTitleA: 'Domande',
    faqTitleB: 'frequenti',
    faqSubtitle: 'Hai domande? Abbiamo le risposte',
    faqSupportTitle: 'Hai ancora domande?',
    faqSupportText: 'Il nostro team di supporto e pronto ad aiutarti con Calkilo.',
    faqSupportButton: 'Contattaci',
    footerDescription: 'Semplifichiamo il monitoraggio nutrizionale con stime caloriche modificabili assistite dall’AI.',
    storeGoogleSmall: 'GET IT ON',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'Download on the',
    storeAppleLarge: 'App Store',
  },
}

type TranslationCopy = (typeof TRANSLATIONS)[SiteLanguage]

const FEATURE_ITEMS = [
  {
    title: 'Analysis and AI suggestions',
    description:
      'Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.',
    icon: 'analytics',
    screen: FIGMA_ASSETS.aiScreenMain,
  },
  {
    title: 'Chat & AI Agent',
    description:
      'Chat with support at any time, make changes to meals, receive recipes for different foods and get fast help with your diet.',
    icon: 'chat',
    screen: FIGMA_ASSETS.aiScreenAltOne,
  },
  {
    title: 'Personalized Goals',
    description:
      'Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.',
    icon: 'goals',
    screen: FIGMA_ASSETS.aiScreenAltTwo,
  },
  {
    title: 'Instant Photo Analysis',
    description:
      'Snap a photo of your meal and get an editable calorie and macro estimate powered by computer vision AI.',
    icon: 'camera',
    screen: FIGMA_ASSETS.aiScreenAltThree,
  },
] as const

type FeatureIconKind = (typeof FEATURE_ITEMS)[number]['icon']

function FeatureListIcon({ kind }: { kind: FeatureIconKind }) {
  switch (kind) {
    case 'analytics':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="24" height="24" rx="7" stroke="currentColor" strokeWidth="2" />
          <path d="M10 21V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 21V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'chat':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.1667 23.5L6.5 26V9.5C6.5 7.84315 7.84315 6.5 9.5 6.5H20.5C22.1569 6.5 23.5 7.84315 23.5 9.5V17.5C23.5 19.1569 22.1569 20.5 20.5 20.5H14.1667L11.1667 23.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.5 20.5V22.5C18.5 24.1569 19.8431 25.5 21.5 25.5H22.8333L25.5 28V17.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'goals':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="2" />
          <path d="M16 16L24.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M21.5 7.5H24.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'camera':
    default:
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.66667 10.6667H11.2L13 8H19L20.8 10.6667H23.3333C25.1743 10.6667 26.6667 12.1591 26.6667 14V22C26.6667 23.8409 25.1743 25.3333 23.3333 25.3333H8.66667C6.82572 25.3333 5.33334 23.8409 5.33334 22V14C5.33334 12.1591 6.82572 10.6667 8.66667 10.6667Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="17.3333" r="4.33333" stroke="currentColor" strokeWidth="2" />
          <path d="M22.6667 14H22.68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
  }
}

const HOW_STEPS = [
  {
    title: 'Scan Your Meal',
    description: 'Take a photo of your food.',
    image: FIGMA_ASSETS.howScan,
  },
  {
    title: 'AI Analyzes',
    description:
      'Our AI analyzes visible ingredients and portions to create an initial nutrition estimate for you to review.',
    image: FIGMA_ASSETS.howAnalyze,
  },
  {
    title: 'Track Progress',
    description: 'View detailed nutrition breakdown, track your goals, and watch your progress over time.',
    image: FIGMA_ASSETS.howTrack,
  },
] as const

const NUTRIENT_PROGRESS_ITEMS = [
  { label: 'Calories', value: '1100/2000', progress: 55 },
  { label: 'Carbohydrates', value: '300/325', progress: 92 },
  { label: 'Proteins', value: '10/75', progress: 13 },
  { label: 'Fat', value: '25/50', progress: 50 },
] as const

const INTEGRATIONS = [
  {
    name: 'Apple Health',
    description: 'Sync calories, workouts, and health metrics',
    icon: FIGMA_ASSETS.integrationAppleHealth,
  },
  {
    name: 'Google Fit',
    description: 'Connect activities and track your daily movement',
    icon: FIGMA_ASSETS.integrationGoogleFit,
  },
  {
    name: 'Fitbit',
    description: 'Automatic activity and exercise tracking',
    icon: FIGMA_ASSETS.integrationFitbit,
  },
  {
    name: 'Samsung Health',
    description: 'Complete health data synchronization',
    icon: FIGMA_ASSETS.integrationSamsungHealth,
  },
] as const

const PRICING_PLANS = [
  {
    title: 'Monthly',
    subtitle: 'Flexible month-to-month access',
    oldPrice: '',
    price: getUsdPricingDisplay('Monthly'),
    cta: 'Choose Monthly',
    highlight: false,
    badge: '',
  },
  {
    title: 'Yearly',
    subtitle: 'Best value for the full year',
    oldPrice: '',
    price: getUsdPricingDisplay('Yearly'),
    cta: 'Choose Yearly',
    highlight: true,
    badge: 'Best Value',
  },
] as const

function getPricingDisplayPrice(plan: (typeof PRICING_PLANS)[number], language: SiteLanguage) {
  if (language === 'fa') {
    return CALKILO_PRICING[plan.title].persianDisplay
  }

  return plan.price
}

function getPricingSchemaOffer(plan: (typeof PRICING_PLANS)[number], language: SiteLanguage, url: string) {
  if (language === 'fa') {
    return {
      '@type': 'Offer',
      name: plan.title,
      priceCurrency: 'IRR',
      price: CALKILO_PRICING[plan.title].irr,
      availability: 'https://schema.org/InStock',
      url,
    }
  }

  return {
    '@type': 'Offer',
    name: plan.title,
    priceCurrency: 'USD',
    price: plan.price.replace('$', ''),
    availability: 'https://schema.org/InStock',
    url,
  }
}

const COMMUNITY_ITEMS = [
  {
    title: 'Challenges',
    description: 'Join challenges to stay motivated and earn rewards',
    icon: FIGMA_ASSETS.communityChallenge,
  },
  {
    title: 'Share',
    description: 'Share your achievements and inspire others',
    icon: FIGMA_ASSETS.communityShare,
  },
  {
    title: 'LeaderBoard',
    description: 'Compete with friends and climb the rankings',
    icon: FIGMA_ASSETS.communityLeaderboard,
  },
  {
    title: 'Invite your Friends',
    description: 'Empower your friends and keep progress together',
    icon: FIGMA_ASSETS.communityInvite,
  },
] as const

const FAQ_ITEMS = [
  {
    topic: 'Pricing',
    question: 'How much does Calkilo cost?',
    answer: PRICING_FAQ_ANSWER,
  },
  {
    topic: 'Meal Planning',
    question: 'How does the AI meal planning work?',
    answer:
      'The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.',
  },
  {
    topic: 'Preferences',
    question: 'Can I change my preferences after onboarding?',
    answer: PREFERENCE_UPDATE_ANSWER_EN,
  },
  {
    topic: 'Security',
    question: 'Is my food photo data private and secure?',
    answer: 'Photos are sent to Calkilo for analysis. Read the privacy policy for data use and deletion requests.',
  },
  {
    topic: 'AI Privacy',
    question: 'What data does Calkilo send for AI features?',
    answer:
      'Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.',
  },
  {
    topic: 'System Preference',
    question: 'Do I need internet connection to use the app?',
    answer: 'Photo analysis needs internet, but you can still review previous data and basic logs while offline.',
  },
  {
    topic: 'Nutrition',
    question: 'Do recipes include nutritional information?',
    answer: 'Each suggested meal includes calories, protein, carbs, fats, and portion guidance.',
  },
  {
    topic: 'Device & App',
    question: 'Does it work with my fitness tracker?',
    answer: 'Apple Health is supported on iOS in version 1.3.3. Check the app for the options available on your device.',
  },
] as const

const STATIC_TEXT_TRANSLATIONS: Record<SiteLanguage, Record<string, string>> = {
  en: {},
  nl: {
    "Analysis and AI suggestions": "Analyse en AI-suggesties",
    "Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.": "Volg je gewicht, metingen en voedingsdoelen. Ontvang persoonlijke AI-suggesties om op koers te blijven.",
    "Chat & AI Agent": "Chat en AI-agent",
    "Chat with support at any time, make changes to meals, receive recipes for different foods and get fast help with your diet.": "Chat op elk moment met support, pas maaltijden aan en ontvang recepten en snelle hulp.",
    "Personalized Goals": "Persoonlijke doelen",
    "Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.": "Stel persoonlijke gezondheidsdoelen in en volg ze met AI-aanbevelingen die passen bij je leefstijl.",
    "Instant Photo Analysis": "Directe fotoanalyse",
    "Snap a photo of your meal and get an editable calorie and macro estimate powered by computer vision AI.": "Maak een foto van je maaltijd en krijg een bewerkbare schatting van calorieen en macro's met AI.",
    "Scan Your Meal": "Scan je maaltijd",
    "Take a photo of your food.": "Maak een foto van je eten.",
    "AI Analyzes": "AI analyseert",
    "Our AI analyzes visible ingredients and portions to create an initial nutrition estimate for you to review.": "Onze AI analyseert zichtbare ingredienten en porties en maakt een eerste voedingsschatting die je kunt controleren.",
    "Track Progress": "Volg voortgang",
    "View detailed nutrition breakdown, track your goals, and watch your progress over time.": "Bekijk voedingsdetails, volg je doelen en zie je voortgang in de tijd.",
    "Sync calories, workouts, and health metrics": "Synchroniseer calorieen, workouts en gezondheidsgegevens",
    "Connect activities and track your daily movement": "Koppel activiteiten en volg je dagelijkse beweging",
    "Automatic activity and exercise tracking": "Automatische activiteiten- en workouttracking",
    "Complete health data synchronization": "Volledige synchronisatie van gezondheidsdata",
    "Love this app": "Geweldige app",
    "Very helpful": "Erg behulpzaam",
    "Works great for me": "Werkt uitstekend",
    "Saves my time": "Bespaart me tijd",
    "Really simple app": "Heel eenvoudige app",
    "Super easy to use": "Super makkelijk te gebruiken",
    "Calkilo makes tracking food fast and stress-free. It helped me improve my eating habits without feeling restricted.": "Calkilo maakt voeding bijhouden snel en zonder stress. Het hielp me betere eetgewoontes op te bouwen.",
    "As someone trying to lose weight, Calkilo helped me understand portions better and make smarter food choices.": "Als ik probeer af te vallen helpt Calkilo me porties beter te begrijpen en slimmer te kiezen.",
    "The AI suggestions are genuinely useful and the app design is clear and fast to use every day.": "De AI-suggesties zijn echt nuttig en de app is duidelijk en snel voor dagelijks gebruik.",
    "Photo analysis is quick, and I can stay consistent with meal tracking even on busy days.": "Fotoanalyse is snel en ik blijf consequent tracken, zelfs op drukke dagen.",
    "The structure is clean, and all key nutrition data is easy to read. Exactly what I needed.": "De opbouw is overzichtelijk en alle belangrijke voedingsdata zijn makkelijk te lezen.",
    "I started monthly and moved to yearly quickly. Great value for daily nutrition planning.": "Ik begon maandelijks en stapte snel over naar jaarlijks. Veel waarde voor dagelijkse planning.",
    "Monthly": "Maandelijks",
    "Flexible month-to-month access": "Flexibele maandelijkse toegang",
    "Choose Monthly": "Kies maandelijks",
    "Yearly": "Jaarlijks",
    "Best value for the full year": "Beste waarde voor een heel jaar",
    "Choose Yearly": "Kies jaarlijks",
    "Best Value": "Beste waarde",
    "Personalized meal plans": "Persoonlijke maaltijdplannen",
    "Smart grocery shopping lists": "Slimme boodschappenlijsten",
    "Nutritional insights": "Voedingsinzichten",
    "Dietary preference settings": "Instellingen voor voedingsvoorkeuren",
    "Mobile-friendly interface": "Mobielvriendelijke interface",
    "Customer support": "Klantenservice",
    "Challenges": "Uitdagingen",
    "Join challenges to stay motivated and earn rewards": "Doe mee aan uitdagingen om gemotiveerd te blijven en beloningen te verdienen",
    "Share": "Delen",
    "Share your achievements and inspire others": "Deel je resultaten en inspireer anderen",
    "LeaderBoard": "Ranglijst",
    "Compete with friends and climb the rankings": "Vergelijk met vrienden en stijg in de ranglijst",
    "Invite your Friends": "Nodig je vrienden uit",
    "Empower your friends and keep progress together": "Motiveer je vrienden en boek samen vooruitgang",
    "Pricing": "Prijs",
    "Meal Planning": "Maaltijdplanning",
    "Preferences": "Voorkeuren",
    "Security": "Beveiliging",
    "AI Privacy": "AI-privacy",
    "System Preference": "Systeem",
    "Nutrition": "Voeding",
    "Device & App": "Apparaten en app",
    "How much does Calkilo cost?": "Hoeveel kost Calkilo?",
    "How does the AI meal planning work?": "Hoe werkt AI-maaltijdplanning?",
    "Can I change my preferences after onboarding?": "Kan ik mijn voorkeuren later aanpassen?",
    "Is my food photo data private and secure?": "Zijn mijn voedselfoto-gegevens prive en veilig?",
    "What data does Calkilo send for AI features?": "Welke gegevens stuurt Calkilo voor AI-functies?",
    "Do I need internet connection to use the app?": "Heb ik internet nodig om de app te gebruiken?",
    "Do recipes include nutritional information?": "Bevatten recepten voedingsinformatie?",
    "Does it work with my fitness tracker?": "Werkt het met mijn fitness tracker?",
    "Calkilo premium is available monthly for $4.99 or yearly for $14.99. Both plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Calkilo premium is maandelijks beschikbaar voor $4.99 of jaarlijks voor $14.99. Beide plannen ontgrendelen persoonlijke plannen, diepere analyses en AI-coaching.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "De app combineert je doelen, voedingsgeschiedenis en voorkeuren om maaltijdsuggesties te maken die zich aanpassen.",
    [PREFERENCE_UPDATE_ANSWER_EN]: PREFERENCE_UPDATE_ANSWERS.nl,
    "Photos are sent to Calkilo for analysis. Read the privacy policy for data use and deletion requests.": "Foto’s worden naar Calkilo gestuurd voor analyse. Lees het privacybeleid voor gegevensgebruik en verwijdering.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "Voordat Calkilo een nieuwe AI-voedingsscan, maaltijdbewerking of AI-chatverzoek verstuurt, vraagt de app om jouw toestemming. Als je AI-functies toestaat, kan Calkilo voedselfoto's, maaltijdgegevens, chatberichten en de account- of aanvraag-ID's versturen die nodig zijn om je resultaat via api.calkilo.com terug te sturen.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "Fotoanalyse vereist internet, maar je kunt eerdere gegevens en basislogs ook offline bekijken.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "Elke voorgestelde maaltijd bevat calorieen, eiwitten, koolhydraten, vetten en portierichtlijnen.",
    "Apple Health is supported on iOS in version 1.3.3. Check the app for the options available on your device.": "Apple Health wordt ondersteund op iOS vanaf versie 1.3.3. Bekijk de beschikbare opties in de app.",
    "Feature": "Functies",
    "Download": "Downloaden",
    "How it Works?": "Hoe werkt het?",
    "Support": "Ondersteuning",
    "Privacy Policy": "Privacybeleid",
    "Terms of Service": "Servicevoorwaarden",
    "Delete Account & Data": "Account en gegevens verwijderen",
    "Terms & Conditions": "Algemene voorwaarden",
    "FAQ": "Veelgestelde vragen",
    "Get in Touch": "Neem contact op",
    "Contact": "Contact",
    "About Us": "Over ons",
    "Our Team": "Ons team",
    "Nutrients required": "Benodigde voedingsstoffen",
    "nutrients needed in a day": "voedingsstoffen die je per dag nodig hebt",
    "Calories": "Calorieen",
    "Carbohydrates": "Koolhydraten",
    "Proteins": "Eiwitten",
    "Fat": "Vet",
    "Cheese, Bread": "Kaas, brood en groente",
    "Kebab, Tomato & Basil": "Kebab, tomaat en basilicum",
    "270 Cal": "270 kcal",
    "480 Cal": "480 kcal",
    "CalKilo AI screen": "CalKilo AI-scherm",
    "All rights reserved.": "Alle rechten voorbehouden.",
    "Theme toggle": "Thema wisselen",
    "Language": "Taal",
    "Store links": "App stores",
  },
  ru: {
    "Analysis and AI suggestions": "Аналитика и AI-подсказки",
    "Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.": "Следите за весом, замерами и целями питания. Получайте персональные AI-рекомендации.",
    "Chat & AI Agent": "Чат и AI-ассистент",
    "Chat with support at any time, make changes to meals, receive recipes for different foods and get fast help with your diet.": "Общайтесь с поддержкой в любое время, меняйте приемы пищи и получайте рецепты.",
    "Personalized Goals": "Персональные цели",
    "Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.": "Ставьте и отслеживайте цели здоровья с AI-рекомендациями под ваш образ жизни.",
    "Instant Photo Analysis": "Мгновенный анализ фото",
    "Snap a photo of your meal and get an editable calorie and macro estimate powered by computer vision AI.": "Сфотографируйте блюдо и получите редактируемую оценку калорий и макронутриентов с помощью AI.",
    "Scan Your Meal": "Сканируйте блюдо",
    "Take a photo of your food.": "Сделайте фото еды.",
    "AI Analyzes": "AI анализирует",
    "Our AI analyzes visible ingredients and portions to create an initial nutrition estimate for you to review.": "AI анализирует видимые ингредиенты и порции и создает первоначальную оценку питания для проверки.",
    "Track Progress": "Отслеживайте прогресс",
    "View detailed nutrition breakdown, track your goals, and watch your progress over time.": "Смотрите детали питания, отслеживайте цели и прогресс со временем.",
    "Sync calories, workouts, and health metrics": "Синхронизация калорий, тренировок и показателей здоровья",
    "Connect activities and track your daily movement": "Подключайте активности и следите за дневной активностью",
    "Automatic activity and exercise tracking": "Автоматическое отслеживание активности и тренировок",
    "Complete health data synchronization": "Полная синхронизация данных здоровья",
    "Love this app": "Обожаю это приложение",
    "Very helpful": "Очень полезно",
    "Works great for me": "Отлично подходит мне",
    "Saves my time": "Экономит время",
    "Really simple app": "Очень простое приложение",
    "Super easy to use": "Супер просто пользоваться",
    "Calkilo makes tracking food fast and stress-free. It helped me improve my eating habits without feeling restricted.": "Calkilo делает учет питания быстрым и без стресса. Это помогло мне улучшить привычки в еде.",
    "As someone trying to lose weight, Calkilo helped me understand portions better and make smarter food choices.": "Когда я пытался похудеть, Calkilo помог лучше понимать порции и выбирать еду умнее.",
    "The AI suggestions are genuinely useful and the app design is clear and fast to use every day.": "AI-подсказки действительно полезные, а интерфейс понятный и быстрый для ежедневного использования.",
    "Photo analysis is quick, and I can stay consistent with meal tracking even on busy days.": "Анализ фото быстрый, и я могу стабильно вести учет даже в загруженные дни.",
    "The structure is clean, and all key nutrition data is easy to read. Exactly what I needed.": "Структура чистая, ключевые данные питания легко читать. Именно то, что мне нужно.",
    "I started monthly and moved to yearly quickly. Great value for daily nutrition planning.": "Я начал с месячного плана и быстро перешел на годовой. Отличная ценность для ежедневного планирования.",
    "Monthly": "Ежемесячно",
    "Flexible month-to-month access": "Гибкий помесячный доступ",
    "Choose Monthly": "Выбрать месяц",
    "Yearly": "Ежегодно",
    "Best value for the full year": "Лучшая цена на полный год",
    "Choose Yearly": "Выбрать год",
    "Best Value": "Лучшая цена",
    "Personalized meal plans": "Персональные планы питания",
    "Smart grocery shopping lists": "Умные списки покупок",
    "Nutritional insights": "Аналитика питания",
    "Dietary preference settings": "Настройки пищевых предпочтений",
    "Mobile-friendly interface": "Удобный мобильный интерфейс",
    "Customer support": "Поддержка клиентов",
    "Challenges": "Челленджи",
    "Join challenges to stay motivated and earn rewards": "Участвуйте в челленджах, чтобы сохранять мотивацию и получать награды",
    "Share": "Поделиться",
    "Share your achievements and inspire others": "Делитесь достижениями и вдохновляйте других",
    "LeaderBoard": "Таблица лидеров",
    "Compete with friends and climb the rankings": "Соревнуйтесь с друзьями и поднимайтесь в рейтинге",
    "Invite your Friends": "Пригласите друзей",
    "Empower your friends and keep progress together": "Мотивируйте друзей и прогрессируйте вместе",
    "Pricing": "Тарифы",
    "Meal Planning": "План питания",
    "Preferences": "Настройки",
    "Security": "Безопасность",
    "AI Privacy": "AI-конфиденциальность",
    "System Preference": "Системные настройки",
    "Nutrition": "Питание",
    "Device & App": "Устройства и приложение",
    "How much does Calkilo cost?": "Сколько стоит Calkilo?",
    "How does the AI meal planning work?": "Как работает AI-планирование питания?",
    "Can I change my preferences after onboarding?": "Можно ли изменить настройки после старта?",
    "Is my food photo data private and secure?": "Мои фото еды защищены и приватны?",
    "What data does Calkilo send for AI features?": "Какие данные Calkilo отправляет для AI-функций?",
    "Do I need internet connection to use the app?": "Нужен ли интернет для работы приложения?",
    "Do recipes include nutritional information?": "Есть ли в рецептах информация о питательности?",
    "Does it work with my fitness tracker?": "Работает ли это с моим фитнес-трекером?",
    "Calkilo premium is available monthly for $4.99 or yearly for $14.99. Both plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Calkilo Premium доступен ежемесячно за $4.99 или ежегодно за $14.99. Оба плана открывают персональные планы питания, глубокую аналитику и AI-коучинг.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "Приложение объединяет ваши цели, историю питания и предпочтения, чтобы формировать персональные рекомендации.",
    [PREFERENCE_UPDATE_ANSWER_EN]: PREFERENCE_UPDATE_ANSWERS.ru,
    "Photos are sent to Calkilo for analysis. Read the privacy policy for data use and deletion requests.": "Фотографии отправляются в Calkilo для анализа. Использование и удаление данных описаны в политике конфиденциальности.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "Перед отправкой нового AI-сканирования еды, редактирования приема пищи или AI-чата приложение запрашивает ваше разрешение. Если вы разрешите AI-функции, Calkilo может отправлять фотографии еды, записи о приемах пищи, сообщения чата, а также идентификаторы аккаунта или запроса, необходимые для возврата результата через api.calkilo.com.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "Для анализа фото нужен интернет, но прошлые данные и базовые записи доступны офлайн.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "Каждая рекомендация включает калории, белки, углеводы, жиры и рекомендации по порциям.",
    "Apple Health is supported on iOS in version 1.3.3. Check the app for the options available on your device.": "Apple Health поддерживается в iOS версии 1.3.3. Доступные настройки смотрите в приложении.",
    "Feature": "Функции",
    "Download": "Скачать",
    "How it Works?": "Как это работает?",
    "Blog": "Блог",
    "Support": "Поддержка",
    "Privacy Policy": "Политика конфиденциальности",
    "Terms of Service": "Условия использования",
    "Delete Account & Data": "Удалить аккаунт и данные",
    "Terms & Conditions": "Правила и условия",
    "FAQ": "Частые вопросы",
    "Get in Touch": "Связаться",
    "Contact": "Контакты",
    "About Us": "О нас",
    "Our Team": "Наша команда",
    "Nutrients required": "Необходимые нутриенты",
    "nutrients needed in a day": "нутриенты, необходимые в день",
    "Calories": "Калории",
    "Carbohydrates": "Углеводы",
    "Proteins": "Белки",
    "Fat": "Жиры",
    "Cheese, Bread": "Сыр, хлеб и овощи",
    "Kebab, Tomato & Basil": "Кебаб, томат и базилик",
    "270 Cal": "270 ккал",
    "480 Cal": "480 ккал",
    "CalKilo AI screen": "Экран CalKilo AI",
    "All rights reserved.": "Все права защищены.",
    "Theme toggle": "Переключение темы",
    "Language": "Язык",
    "Store links": "Ссылки магазинов",
  },
  zh: {
    "Analysis and AI suggestions": "AI 分析与建议",
    "Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.": "跟踪体重、围度和营养目标，获取个性化 AI 建议，持续优化饮食。",
    "Chat & AI Agent": "聊天与 AI 助手",
    "Chat with support at any time, make changes to meals, receive recipes for different foods and get fast help with your diet.": "随时联系客服，调整餐食，获取食谱与饮食帮助。",
    "Personalized Goals": "个性化目标",
    "Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.": "根据你的生活方式设置并跟踪健康目标，获得 AI 推荐。",
    "Instant Photo Analysis": "即时照片分析",
    "Snap a photo of your meal and get an editable calorie and macro estimate powered by computer vision AI.": "拍一张餐食照片，获得可编辑的热量和宏量营养估算。",
    "Scan Your Meal": "扫描你的餐食",
    "Take a photo of your food.": "拍下你的食物。",
    "AI Analyzes": "AI 分析",
    "Our AI analyzes visible ingredients and portions to create an initial nutrition estimate for you to review.": "AI 会分析可见食材和份量，生成可供你检查的初步营养估算。",
    "Track Progress": "追踪进度",
    "View detailed nutrition breakdown, track your goals, and watch your progress over time.": "查看营养明细，跟踪目标并观察长期进展。",
    "Sync calories, workouts, and health metrics": "同步热量、训练和健康指标",
    "Connect activities and track your daily movement": "连接运动数据并跟踪每日活动",
    "Automatic activity and exercise tracking": "自动跟踪活动与运动",
    "Complete health data synchronization": "完整健康数据同步",
    "Love this app": "我很喜欢这个应用",
    "Very helpful": "非常有帮助",
    "Works great for me": "对我很有效",
    "Saves my time": "节省我的时间",
    "Really simple app": "非常简单易用",
    "Super easy to use": "超级好用",
    "Calkilo makes tracking food fast and stress-free. It helped me improve my eating habits without feeling restricted.": "Calkilo 让饮食记录更快更轻松，帮助我改善饮食习惯而不感到束缚。",
    "As someone trying to lose weight, Calkilo helped me understand portions better and make smarter food choices.": "作为减脂用户，Calkilo 帮我更好理解份量并做出更聪明的饮食选择。",
    "The AI suggestions are genuinely useful and the app design is clear and fast to use every day.": "AI 建议非常实用，应用界面清晰，日常使用很顺手。",
    "Photo analysis is quick, and I can stay consistent with meal tracking even on busy days.": "照片分析很快，即使忙碌时我也能坚持记录饮食。",
    "The structure is clean, and all key nutrition data is easy to read. Exactly what I needed.": "界面结构清爽，关键营养数据一目了然，正是我需要的。",
    "I started monthly and moved to yearly quickly. Great value for daily nutrition planning.": "我从月度开始，很快转到年度。对日常营养规划非常划算。",
    "Monthly": "月度",
    "Flexible month-to-month access": "灵活的按月访问",
    "Choose Monthly": "选择月度",
    "Yearly": "年度",
    "Best value for the full year": "全年最佳性价比",
    "Choose Yearly": "选择年度",
    "Best Value": "最佳性价比",
    "Personalized meal plans": "个性化餐食计划",
    "Smart grocery shopping lists": "智能购物清单",
    "Nutritional insights": "营养洞察",
    "Dietary preference settings": "饮食偏好设置",
    "Mobile-friendly interface": "移动端友好界面",
    "Customer support": "客户支持",
    "Challenges": "挑战",
    "Join challenges to stay motivated and earn rewards": "参与挑战，保持动力并获得奖励",
    "Share": "分享",
    "Share your achievements and inspire others": "分享你的成果并激励他人",
    "LeaderBoard": "排行榜",
    "Compete with friends and climb the rankings": "和朋友比拼并提升排名",
    "Invite your Friends": "邀请好友",
    "Empower your friends and keep progress together": "和朋友一起进步，互相激励",
    "Pricing": "定价",
    "Meal Planning": "餐食规划",
    "Preferences": "偏好设置",
    "Security": "安全",
    "AI Privacy": "AI 隐私",
    "System Preference": "系统设置",
    "Nutrition": "营养",
    "Device & App": "设备与应用",
    "How much does Calkilo cost?": "Calkilo 费用是多少？",
    "How does the AI meal planning work?": "AI 餐食规划如何工作？",
    "Can I change my preferences after onboarding?": "完成引导后可以修改偏好吗？",
    "Is my food photo data private and secure?": "我的食物照片数据是否私密安全？",
    "What data does Calkilo send for AI features?": "Calkilo 会为 AI 功能发送哪些数据？",
    "Do I need internet connection to use the app?": "使用应用需要联网吗？",
    "Do recipes include nutritional information?": "食谱是否包含营养信息？",
    "Does it work with my fitness tracker?": "是否支持我的健身追踪器？",
    "Calkilo premium is available monthly for $4.99 or yearly for $14.99. Both plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Calkilo 高级版可按月 $4.99 或按年 $14.99 使用。两个计划都解锁个性化餐食计划、深度分析和 AI 教练。",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "应用会结合你的目标、饮食历史和偏好，生成会随数据变化而调整的餐食建议。",
    [PREFERENCE_UPDATE_ANSWER_EN]: PREFERENCE_UPDATE_ANSWERS.zh,
    "Photos are sent to Calkilo for analysis. Read the privacy policy for data use and deletion requests.": "照片会发送至 Calkilo 进行分析。数据使用和删除请求请参阅隐私政策。",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "在 Calkilo 发送新的 AI 食物扫描、餐食编辑或 AI 聊天请求之前，应用会先征求你的许可。如果你允许 AI 功能，Calkilo 可能会通过 api.calkilo.com 发送食物照片、餐食记录、聊天消息，以及返回结果所需的账户或请求标识符。",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "照片分析需要联网，但离线时仍可查看历史数据和基础记录。",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "每个推荐餐食都包含热量、蛋白质、碳水、脂肪和份量建议。",
    "Apple Health is supported on iOS in version 1.3.3. Check the app for the options available on your device.": "iOS 1.3.3 版支持 Apple Health。请在应用中查看设备上可用的选项。",
    "Feature": "功能",
    "Download": "下载",
    "How it Works?": "如何工作？",
    "Blog": "博客",
    "Support": "支持",
    "Privacy Policy": "隐私政策",
    "Terms of Service": "服务条款",
    "Delete Account & Data": "删除账户和数据",
    "Terms & Conditions": "条款与条件",
    "FAQ": "常见问题",
    "Get in Touch": "联系我们",
    "Contact": "联系",
    "About Us": "关于我们",
    "Our Team": "我们的团队",
    "Nutrients required": "所需营养",
    "nutrients needed in a day": "每日所需营养",
    "Calories": "热量",
    "Carbohydrates": "碳水化合物",
    "Proteins": "蛋白质",
    "Fat": "脂肪",
    "Cheese, Bread": "奶酪、面包和蔬菜",
    "Kebab, Tomato & Basil": "烤肉、番茄和罗勒",
    "270 Cal": "270 千卡",
    "480 Cal": "480 千卡",
    "CalKilo AI screen": "CalKilo AI 界面",
    "All rights reserved.": "版权所有。",
    "Theme toggle": "主题切换",
    "Language": "语言",
    "Store links": "商店链接",
  },
  ar: {
    "Analysis and AI suggestions": "تحليل واقتراحات الذكاء الاصطناعي",
    "Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.": "تابع وزنك وقياساتك وأهدافك الغذائية واحصل على اقتراحات مخصصة بالذكاء الاصطناعي.",
    "Chat & AI Agent": "الدردشة والوكيل الذكي",
    "Chat with support at any time, make changes to meals, receive recipes for different foods and get fast help with your diet.": "تحدث مع الدعم في أي وقت وعدل وجباتك واحصل على وصفات ومساعدة سريعة.",
    "Personalized Goals": "أهداف مخصصة",
    "Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.": "حدد وتتبع أهدافك الصحية مع توصيات ذكية تناسب نمط حياتك.",
    "Instant Photo Analysis": "تحليل فوري للصور",
    "Snap a photo of your meal and get an editable calorie and macro estimate powered by computer vision AI.": "التقط صورة لوجبتك واحصل على تقدير قابل للتعديل للسعرات والماكروز بمساعدة الذكاء الاصطناعي.",
    "Scan Your Meal": "امسح وجبتك",
    "Take a photo of your food.": "التقط صورة لطعامك.",
    "AI Analyzes": "الذكاء الاصطناعي يحلل",
    "Our AI analyzes visible ingredients and portions to create an initial nutrition estimate for you to review.": "يحلل الذكاء الاصطناعي المكونات والحصص الظاهرة ليقدم تقديراً أولياً للتغذية يمكنك مراجعته.",
    "Track Progress": "تتبع التقدم",
    "View detailed nutrition breakdown, track your goals, and watch your progress over time.": "اعرض تفاصيل التغذية وتابع أهدافك وراقب تقدمك مع الوقت.",
    "Sync calories, workouts, and health metrics": "مزامنة السعرات والتمارين والمؤشرات الصحية",
    "Connect activities and track your daily movement": "اربط الأنشطة وتابع حركتك اليومية",
    "Automatic activity and exercise tracking": "تتبع تلقائي للأنشطة والتمارين",
    "Complete health data synchronization": "مزامنة كاملة لبيانات الصحة",
    "Love this app": "أحب هذا التطبيق",
    "Very helpful": "مفيد جداً",
    "Works great for me": "يعمل بشكل رائع",
    "Saves my time": "يوفر وقتي",
    "Really simple app": "تطبيق بسيط جداً",
    "Super easy to use": "سهل الاستخدام جداً",
    "Calkilo makes tracking food fast and stress-free. It helped me improve my eating habits without feeling restricted.": "يجعل Calkilo تتبع الطعام سريعاً وبدون ضغط، وساعدني على تحسين عاداتي الغذائية.",
    "As someone trying to lose weight, Calkilo helped me understand portions better and make smarter food choices.": "بصفتي أحاول خسارة الوزن، ساعدني Calkilo على فهم الحصص واتخاذ خيارات أذكى.",
    "The AI suggestions are genuinely useful and the app design is clear and fast to use every day.": "اقتراحات الذكاء الاصطناعي مفيدة فعلاً وتصميم التطبيق واضح وسريع يومياً.",
    "Photo analysis is quick, and I can stay consistent with meal tracking even on busy days.": "تحليل الصور سريع ويمكنني الاستمرار في تتبع الوجبات حتى في الأيام المزدحمة.",
    "The structure is clean, and all key nutrition data is easy to read. Exactly what I needed.": "الواجهة نظيفة وكل بيانات التغذية الأساسية سهلة القراءة. هذا ما أحتاجه تماماً.",
    "I started monthly and moved to yearly quickly. Great value for daily nutrition planning.": "بدأت بالخطة الشهرية ثم انتقلت سريعاً إلى السنوية. قيمة ممتازة للتخطيط الغذائي اليومي.",
    "Monthly": "شهري",
    "Flexible month-to-month access": "وصول شهري مرن",
    "Choose Monthly": "اختر الشهري",
    "Yearly": "سنوي",
    "Best value for the full year": "أفضل قيمة للعام الكامل",
    "Choose Yearly": "اختر السنوي",
    "Best Value": "أفضل قيمة",
    "Personalized meal plans": "خطط وجبات مخصصة",
    "Smart grocery shopping lists": "قوائم تسوق ذكية",
    "Nutritional insights": "تحليلات غذائية",
    "Dietary preference settings": "إعدادات التفضيلات الغذائية",
    "Mobile-friendly interface": "واجهة مناسبة للجوال",
    "Customer support": "دعم العملاء",
    "Challenges": "التحديات",
    "Join challenges to stay motivated and earn rewards": "انضم للتحديات لتحافظ على الحافز وتكسب المكافآت",
    "Share": "مشاركة",
    "Share your achievements and inspire others": "شارك إنجازاتك وألهم الآخرين",
    "LeaderBoard": "لوحة المتصدرين",
    "Compete with friends and climb the rankings": "تنافس مع أصدقائك وارتقِ في الترتيب",
    "Invite your Friends": "ادعُ أصدقاءك",
    "Empower your friends and keep progress together": "حفّز أصدقاءك وتقدموا معاً",
    "Pricing": "الأسعار",
    "Meal Planning": "تخطيط الوجبات",
    "Preferences": "التفضيلات",
    "Security": "الأمان",
    "AI Privacy": "خصوصية الذكاء الاصطناعي",
    "System Preference": "إعدادات النظام",
    "Nutrition": "التغذية",
    "Device & App": "الجهاز والتطبيق",
    "How much does Calkilo cost?": "كم تكلفة Calkilo؟",
    "How does the AI meal planning work?": "كيف يعمل تخطيط الوجبات بالذكاء الاصطناعي؟",
    "Can I change my preferences after onboarding?": "هل يمكنني تغيير التفضيلات بعد البدء؟",
    "Is my food photo data private and secure?": "هل بيانات صور الطعام خاصة وآمنة؟",
    "What data does Calkilo send for AI features?": "ما البيانات التي يرسلها Calkilo لميزات الذكاء الاصطناعي؟",
    "Do I need internet connection to use the app?": "هل أحتاج اتصال إنترنت لاستخدام التطبيق؟",
    "Do recipes include nutritional information?": "هل تشمل الوصفات معلومات غذائية؟",
    "Does it work with my fitness tracker?": "هل يعمل مع جهاز تتبع اللياقة الخاص بي؟",
    "Calkilo premium is available monthly for $4.99 or yearly for $14.99. Both plans unlock personalized meal plans, deeper analytics, and AI coaching.": "يتوفر Calkilo Premium شهرياً مقابل $4.99 أو سنوياً مقابل $14.99. يفتح كلا الخيارين خطط وجبات مخصصة وتحليلات أعمق وتدريباً بالذكاء الاصطناعي.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "يجمع التطبيق أهدافك وسجل التغذية وتفضيلاتك ليولد اقتراحات وجبات تتكيف مع تغير بياناتك.",
    [PREFERENCE_UPDATE_ANSWER_EN]: PREFERENCE_UPDATE_ANSWERS.ar,
    "Photos are sent to Calkilo for analysis. Read the privacy policy for data use and deletion requests.": "تُرسل الصور إلى Calkilo لتحليلها. راجع سياسة الخصوصية لاستخدام البيانات وطلبات حذفها.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "قبل أن يرسل Calkilo فحص طعام جديداً بالذكاء الاصطناعي أو تعديل وجبة أو طلب دردشة بالذكاء الاصطناعي، يطلب التطبيق إذنك. إذا سمحت بميزات الذكاء الاصطناعي، فقد يرسل Calkilo صور الطعام وسجلات الوجبات ورسائل الدردشة ومعرّفات الحساب أو الطلب اللازمة لإرجاع النتيجة عبر api.calkilo.com.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "تحليل الصور يحتاج إلى الإنترنت، لكن يمكنك مراجعة البيانات السابقة والسجلات الأساسية دون اتصال.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "كل وجبة مقترحة تتضمن السعرات والبروتين والكربوهيدرات والدهون وإرشادات الحصص.",
    "Apple Health is supported on iOS in version 1.3.3. Check the app for the options available on your device.": "يتوفر Apple Health على iOS في الإصدار 1.3.3. راجع الخيارات المتاحة في التطبيق.",
    "Feature": "الميزات",
    "Download": "تحميل",
    "How it Works?": "كيف يعمل؟",
    "Blog": "المدونة",
    "Support": "الدعم",
    "Privacy Policy": "سياسة الخصوصية",
    "Terms of Service": "شروط الخدمة",
    "Delete Account & Data": "حذف الحساب والبيانات",
    "Terms & Conditions": "الشروط والأحكام",
    "FAQ": "الأسئلة الشائعة",
    "Get in Touch": "تواصل معنا",
    "Contact": "اتصل بنا",
    "About Us": "من نحن",
    "Our Team": "فريقنا",
    "Nutrients required": "العناصر الغذائية المطلوبة",
    "nutrients needed in a day": "العناصر الغذائية اللازمة يومياً",
    "Calories": "السعرات",
    "Carbohydrates": "الكربوهيدرات",
    "Proteins": "البروتينات",
    "Fat": "الدهون",
    "Cheese, Bread": "جبن وخبز وخضار",
    "Kebab, Tomato & Basil": "كباب وطماطم وريحان",
    "270 Cal": "270 سعرة",
    "480 Cal": "480 سعرة",
    "CalKilo AI screen": "شاشة CalKilo AI",
    "All rights reserved.": "جميع الحقوق محفوظة.",
    "Theme toggle": "تبديل المظهر",
    "Language": "اللغة",
    "Store links": "روابط المتاجر",
  },
  fa: {
    "Analysis and AI suggestions": "تحلیل و پیشنهادهای هوش مصنوعی",
    "Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.": "وزن، اندازه‌ها و اهداف تغذیه‌ای خود را دنبال کنید و پیشنهادهای شخصی‌سازی‌شده دریافت کنید.",
    "Chat & AI Agent": "چت و عامل هوش مصنوعی",
    "Chat with support at any time, make changes to meals, receive recipes for different foods and get fast help with your diet.": "هر زمان با پشتیبانی چت کنید، وعده‌ها را تغییر دهید و دستور غذا بگیرید.",
    "Personalized Goals": "اهداف شخصی‌سازی‌شده",
    "Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.": "اهداف سلامتی خود را با توصیه‌های هوش مصنوعی تنظیم و پیگیری کنید.",
    "Instant Photo Analysis": "تحلیل فوری عکس",
    "Snap a photo of your meal and get an editable calorie and macro estimate powered by computer vision AI.": "از وعده غذایی عکس بگیرید و یک تخمین قابل ویرایش از کالری و ماکروها دریافت کنید.",
    "Scan Your Meal": "وعده غذایی خود را اسکن کنید",
    "Take a photo of your food.": "از غذای خود عکس بگیرید.",
    "AI Analyzes": "تحلیل توسط هوش مصنوعی",
    "Our AI analyzes visible ingredients and portions to create an initial nutrition estimate for you to review.": "هوش مصنوعی مواد و اندازه بخش‌های قابل مشاهده را تحلیل می‌کند و یک تخمین اولیه برای بررسی شما می‌سازد.",
    "Track Progress": "پیگیری پیشرفت",
    "View detailed nutrition breakdown, track your goals, and watch your progress over time.": "جزئیات تغذیه را ببینید، اهداف را پیگیری کنید و پیشرفت را در طول زمان بررسی کنید.",
    "Sync calories, workouts, and health metrics": "همگام‌سازی کالری، تمرین و شاخص‌های سلامت",
    "Connect activities and track your daily movement": "اتصال فعالیت‌ها و پیگیری حرکت روزانه",
    "Automatic activity and exercise tracking": "پیگیری خودکار فعالیت و ورزش",
    "Complete health data synchronization": "همگام‌سازی کامل داده‌های سلامت",
    "Love this app": "این برنامه عالی است",
    "Very helpful": "خیلی مفید",
    "Works great for me": "برای من عالی کار می‌کند",
    "Saves my time": "در زمان من صرفه‌جویی می‌کند",
    "Really simple app": "برنامه خیلی ساده",
    "Super easy to use": "خیلی آسان برای استفاده",
    "Calkilo makes tracking food fast and stress-free. It helped me improve my eating habits without feeling restricted.": "Calkilo ثبت غذا را سریع و بدون استرس می‌کند و به من کمک کرد عادت غذایی بهتری داشته باشم.",
    "As someone trying to lose weight, Calkilo helped me understand portions better and make smarter food choices.": "به عنوان کسی که می‌خواست وزن کم کند، Calkilo به من کمک کرد اندازه وعده‌ها را بهتر بفهمم.",
    "The AI suggestions are genuinely useful and the app design is clear and fast to use every day.": "پیشنهادهای هوش مصنوعی واقعاً مفید هستند و طراحی برنامه واضح و سریع است.",
    "Photo analysis is quick, and I can stay consistent with meal tracking even on busy days.": "تحلیل عکس سریع است و حتی در روزهای شلوغ هم می‌توانم منظم بمانم.",
    "The structure is clean, and all key nutrition data is easy to read. Exactly what I needed.": "ساختار برنامه تمیز است و داده‌های مهم تغذیه‌ای به‌راحتی خوانده می‌شوند.",
    "I started monthly and moved to yearly quickly. Great value for daily nutrition planning.": "با طرح ماهانه شروع کردم و خیلی زود به سالانه رفتم. برای برنامه‌ریزی روزانه ارزش بالایی دارد.",
    "Monthly": "ماهانه",
    "Flexible month-to-month access": "دسترسی منعطف ماه‌به‌ماه",
    "Choose Monthly": "انتخاب ماهانه",
    "Yearly": "سالانه",
    "Best value for the full year": "بهترین ارزش برای یک سال کامل",
    "Choose Yearly": "انتخاب سالانه",
    "Best Value": "بهترین ارزش",
    "Personalized meal plans": "برنامه‌های غذایی شخصی‌سازی‌شده",
    "Smart grocery shopping lists": "لیست خرید هوشمند",
    "Nutritional insights": "بینش تغذیه‌ای",
    "Dietary preference settings": "تنظیمات ترجیحات غذایی",
    "Mobile-friendly interface": "رابط کاربری مناسب موبایل",
    "Customer support": "پشتیبانی مشتری",
    "Challenges": "چالش‌ها",
    "Join challenges to stay motivated and earn rewards": "در چالش‌های متنوع شرکت کنید، پرقدرت ادامه دهید و جایزه بگیرید!",
    "Share": "اشتراک‌گذاری",
    "Share your achievements and inspire others": "دستاوردهای خود را ثبت کنید و با اشتراک‌گذاری آن‌ها، به دیگران هم انگیزه بدهید.",
    "LeaderBoard": "رتبه‌بندی",
    "Compete with friends and climb the rankings": "با دوستانتان رقابت کنید، امتیاز بگیرید و صدرنشین جدول شوید!",
    "Invite your Friends": "دوستانتان را هم دعوت کنید",
    "Empower your friends and keep progress together": "دوستان خود را به این مسیر دعوت کنید و در کنار هم به اهداف سلامتی‌تان برسید.",
    "Pricing": "اشتراک",
    "Meal Planning": "برنامه‌ریزی",
    "Preferences": "تنظیمات",
    "Security": "حریم خصوصی",
    "AI Privacy": "حریم خصوصی هوش مصنوعی",
    "System Preference": "اتصال",
    "Nutrition": "تغذیه",
    "Device & App": "دستگاه‌ها",
    "How much does Calkilo cost?": "هزینه استفاده از Calkilo چقدر است؟",
    "How does the AI meal planning work?": "هوش مصنوعی چطور برای من برنامه‌ریزی می‌کند؟",
    "Can I change my preferences after onboarding?": "آیا امکان تغییر تنظیمات بعد از شروع برنامه وجود دارد؟",
    "Is my food photo data private and secure?": "آیا امنیت و حریم خصوصی عکس‌های من حفظ می‌شود؟",
    "What data does Calkilo send for AI features?": "Calkilo برای قابلیت‌های هوش مصنوعی چه داده‌هایی ارسال می‌کند؟",
    "Do I need internet connection to use the app?": "آیا کار با اپلیکیشن نیاز به اینترنت دائمی دارد؟",
    "Do recipes include nutritional information?": "آیا دستورها شامل اطلاعات تغذیه‌ای هستند؟",
    "Does it work with my fitness tracker?": "آیا اپلیکیشن با ساعت‌های هوشمند و مچ‌بندهای سلامتی همگام می‌شود؟",
    [PRICING_FAQ_ANSWER]: `اشتراک پریمیوم Calkilo به‌صورت ماهانه با قیمت ${CALKILO_PRICING.Monthly.persianDisplay} یا سالانه با قیمت ${CALKILO_PRICING.Yearly.persianDisplay} ارائه می‌شود. هر دو طرح برنامه غذایی شخصی‌سازی‌شده، تحلیل‌های دقیق‌تر و مربی هوش مصنوعی را فعال می‌کنند.`,
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "سیستم ما با ترکیب اهداف، ذائقه و سوابق تغذیه‌ای شما، هوشمندانه‌ترین پیشنهادها را که دقیقاً با سبک زندگی‌تان سازگار است، طراحی می‌کند.",
    [PREFERENCE_UPDATE_ANSWER_EN]: PREFERENCE_UPDATE_ANSWERS.fa,
    "Photos are sent to Calkilo for analysis. Read the privacy policy for data use and deletion requests.": "عکس‌ها برای تحلیل به کالکیلو ارسال می‌شوند. جزئیات استفاده و درخواست حذف داده‌ها در سیاست حریم خصوصی آمده است.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "پیش از آن‌که Calkilo اسکن غذایی جدید، ویرایش وعده یا درخواست چت هوش مصنوعی را ارسال کند، اپ از شما اجازه می‌گیرد. اگر قابلیت‌های هوش مصنوعی را فعال کنید، Calkilo ممکن است عکس غذا، سوابق وعده‌ها، پیام‌های چت و شناسه‌های حساب یا درخواست لازم برای برگرداندن نتیجه را از طریق api.calkilo.com ارسال کند.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "برای تحلیل تصاویر به اینترنت نیاز است؛ اما می‌توانید اطلاعات ثبت‌شده قبلی را در حالت آفلاین مشاهده کنید.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "هر وعده پیشنهادی شامل کالری، پروتئین، کربوهیدرات، چربی و راهنمای مقدار است.",
    "Apple Health is supported on iOS in version 1.3.3. Check the app for the options available on your device.": "اتصال Apple Health در نسخه ۱٫۳٫۳ iOS در دسترس است. گزینه‌های دستگاه خود را در اپ بررسی کنید.",
    "Features": "ویژگی‌ها",
    "See photo calorie tracking, macro goals, AI meal plans, and health app integrations.": "قابلیت‌های ثبت کالری با عکس، هدف‌های ماکرو، برنامه غذایی هوش مصنوعی و اتصال به اپ‌های سلامت را ببینید.",
    "Compare monthly and yearly premium plans and what each subscription unlocks.": "طرح‌های ماهانه و سالانه پریمیوم و امکانات هر اشتراک را مقایسه کنید.",
    "Answers about subscriptions, privacy, device sync, and AI food logging.": "پاسخ پرسش‌های رایج درباره اشتراک، حریم خصوصی، همگام‌سازی و ثبت غذا با هوش مصنوعی.",
    "Reach Calkilo support for product, billing, and privacy requests.": "برای سوال‌های محصول، پرداخت و حریم خصوصی با پشتیبانی کالکیلو تماس بگیرید.",
    "Feature": "ویژگی‌ها",
    "Download": "دانلود",
    "How it Works?": "چگونه کار می‌کند؟",
    "Blog": "وبلاگ",
    "Support": "پشتیبانی",
    "Privacy Policy": "سیاست حریم خصوصی",
    "Terms of Service": "شرایط خدمات",
    "Delete Account & Data": "حذف حساب و داده‌ها",
    "Terms & Conditions": "شرایط و قوانین",
    "FAQ": "سوالات متداول",
    "Get in Touch": "ارتباط با ما",
    "Contact": "تماس",
    "About Us": "درباره ما",
    "Our Team": "تیم ما",
    "Nutrients required": "مواد مغذی مورد نیاز",
    "nutrients needed in a day": "مواد مغذی مورد نیاز در روز",
    "Calories": "کالری",
    "Carbohydrates": "کربوهیدرات",
    "Proteins": "پروتئین",
    "Fat": "چربی",
    "Cheese, Bread": "پنیر، نان و سبزیجات",
    "Kebab, Tomato & Basil": "کباب، گوجه و ریحان",
    "270 Cal": "270 کالری",
    "480 Cal": "480 کالری",
    "CalKilo AI screen": "صفحه CalKilo AI",
    "All rights reserved.": "تمامی حقوق محفوظ است.",
    "Theme toggle": "تغییر تم",
    "Language": "زبان",
    "Store links": "لینک فروشگاه‌ها",
  },
  it: {
    "Analysis and AI suggestions": "Analisi e suggerimenti AI",
    "Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.": "Monitora peso, misure e obiettivi nutrizionali con suggerimenti AI personalizzati.",
    "Chat & AI Agent": "Chat e Agente AI",
    "Chat with support at any time, make changes to meals, receive recipes for different foods and get fast help with your diet.": "Chatta con il supporto, modifica i pasti e ricevi ricette in modo rapido.",
    "Personalized Goals": "Obiettivi personalizzati",
    "Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.": "Imposta e monitora obiettivi salute con raccomandazioni AI su misura.",
    "Instant Photo Analysis": "Analisi foto istantanea",
    "Snap a photo of your meal and get an editable calorie and macro estimate powered by computer vision AI.": "Scatta una foto del pasto e ottieni una stima modificabile di calorie e macro con l'AI.",
    "Scan Your Meal": "Scansiona il tuo pasto",
    "Take a photo of your food.": "Scatta una foto del tuo cibo.",
    "AI Analyzes": "L'AI analizza",
    "Our AI analyzes visible ingredients and portions to create an initial nutrition estimate for you to review.": "L'AI analizza ingredienti e porzioni visibili e crea una stima nutrizionale iniziale da controllare.",
    "Track Progress": "Monitora i progressi",
    "View detailed nutrition breakdown, track your goals, and watch your progress over time.": "Visualizza i dettagli nutrizionali e monitora i progressi nel tempo.",
    "Sync calories, workouts, and health metrics": "Sincronizza calorie, allenamenti e metriche salute",
    "Connect activities and track your daily movement": "Collega le attivita e monitora il movimento quotidiano",
    "Automatic activity and exercise tracking": "Monitoraggio automatico di attivita ed esercizio",
    "Complete health data synchronization": "Sincronizzazione completa dei dati salute",
    "Love this app": "Adoro questa app",
    "Very helpful": "Molto utile",
    "Works great for me": "Funziona benissimo per me",
    "Saves my time": "Mi fa risparmiare tempo",
    "Really simple app": "App davvero semplice",
    "Super easy to use": "Super facile da usare",
    "Calkilo makes tracking food fast and stress-free. It helped me improve my eating habits without feeling restricted.": "Calkilo rende il tracciamento del cibo veloce e senza stress. Mi ha aiutato a migliorare le abitudini alimentari.",
    "As someone trying to lose weight, Calkilo helped me understand portions better and make smarter food choices.": "Per perdere peso, Calkilo mi ha aiutato a capire meglio le porzioni e a scegliere in modo piu intelligente.",
    "The AI suggestions are genuinely useful and the app design is clear and fast to use every day.": "I suggerimenti AI sono davvero utili e l'app e chiara e veloce ogni giorno.",
    "Photo analysis is quick, and I can stay consistent with meal tracking even on busy days.": "L'analisi foto e rapida e riesco a restare costante anche nei giorni impegnati.",
    "The structure is clean, and all key nutrition data is easy to read. Exactly what I needed.": "La struttura e pulita e i dati nutrizionali principali sono facili da leggere.",
    "I started monthly and moved to yearly quickly. Great value for daily nutrition planning.": "Ho iniziato con il mensile e sono passato presto all'annuale. Ottimo valore per la pianificazione quotidiana.",
    "Monthly": "Mensile",
    "Flexible month-to-month access": "Accesso flessibile mese per mese",
    "Choose Monthly": "Scegli mensile",
    "Yearly": "Annuale",
    "Best value for the full year": "Miglior valore per tutto l'anno",
    "Choose Yearly": "Scegli annuale",
    "Best Value": "Miglior valore",
    "Personalized meal plans": "Piani pasto personalizzati",
    "Smart grocery shopping lists": "Liste della spesa intelligenti",
    "Nutritional insights": "Insight nutrizionali",
    "Dietary preference settings": "Impostazioni preferenze alimentari",
    "Mobile-friendly interface": "Interfaccia ottimizzata per mobile",
    "Customer support": "Supporto clienti",
    "Challenges": "Sfide",
    "Join challenges to stay motivated and earn rewards": "Partecipa alle sfide per restare motivato e ottenere ricompense",
    "Share": "Condividi",
    "Share your achievements and inspire others": "Condividi i tuoi risultati e ispira gli altri",
    "LeaderBoard": "Classifica",
    "Compete with friends and climb the rankings": "Competi con gli amici e sali in classifica",
    "Invite your Friends": "Invita i tuoi amici",
    "Empower your friends and keep progress together": "Coinvolgi i tuoi amici e progredite insieme",
    "Pricing": "Prezzi",
    "Meal Planning": "Pianificazione pasti",
    "Preferences": "Preferenze",
    "Security": "Sicurezza",
    "AI Privacy": "Privacy AI",
    "System Preference": "Impostazioni sistema",
    "Nutrition": "Nutrizione",
    "Device & App": "Dispositivo e app",
    "How much does Calkilo cost?": "Quanto costa Calkilo?",
    "How does the AI meal planning work?": "Come funziona la pianificazione pasti con AI?",
    "Can I change my preferences after onboarding?": "Posso cambiare le preferenze dopo l'onboarding?",
    "Is my food photo data private and secure?": "I dati delle foto del cibo sono privati e sicuri?",
    "What data does Calkilo send for AI features?": "Quali dati invia Calkilo per le funzioni AI?",
    "Do I need internet connection to use the app?": "Serve internet per usare l'app?",
    "Do recipes include nutritional information?": "Le ricette includono informazioni nutrizionali?",
    "Does it work with my fitness tracker?": "Funziona con il mio fitness tracker?",
    "Calkilo premium is available monthly for $4.99 or yearly for $14.99. Both plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Calkilo Premium e disponibile mensilmente a $4.99 o annualmente a $14.99. Entrambi i piani sbloccano piani personalizzati, analisi avanzate e coaching AI.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "L'app combina obiettivi, storico nutrizionale e preferenze per suggerire pasti che si adattano ai tuoi dati.",
    [PREFERENCE_UPDATE_ANSWER_EN]: PREFERENCE_UPDATE_ANSWERS.it,
    "Photos are sent to Calkilo for analysis. Read the privacy policy for data use and deletion requests.": "Le foto vengono inviate a Calkilo per l’analisi. Consulta l’informativa sulla privacy per uso e cancellazione dei dati.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "Prima che Calkilo invii una nuova scansione cibo AI, una modifica del pasto o una richiesta di chat AI, l'app ti chiede il permesso. Se abiliti le funzioni AI, Calkilo puo inviare foto del cibo, registri dei pasti, messaggi di chat e gli identificatori di account o richiesta necessari per restituire il risultato tramite api.calkilo.com.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "L'analisi foto richiede internet, ma puoi rivedere dati precedenti e registri base anche offline.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "Ogni pasto suggerito include calorie, proteine, carboidrati, grassi e guida porzioni.",
    "Apple Health is supported on iOS in version 1.3.3. Check the app for the options available on your device.": "Apple Health è disponibile su iOS nella versione 1.3.3. Controlla le opzioni nell’app.",
    "Features": "Funzioni",
    "See photo calorie tracking, macro goals, AI meal plans, and health app integrations.": "Scopri tracking calorie da foto, obiettivi macro, piani alimentari AI e integrazioni salute.",
    "Compare monthly and yearly premium plans and what each subscription unlocks.": "Confronta i piani premium mensili e annuali e le funzioni incluse.",
    "Answers about subscriptions, privacy, device sync, and AI food logging.": "Risposte su abbonamenti, privacy, sincronizzazione e food logging AI.",
    "Reach Calkilo support for product, billing, and privacy requests.": "Contatta il supporto Calkilo per prodotto, fatturazione e privacy.",
    "Feature": "Funzionalita",
    "Download": "Scarica",
    "How it Works?": "Come funziona?",
    "Blog": "Blog",
    "Support": "Supporto",
    "Privacy Policy": "Informativa sulla privacy",
    "Terms of Service": "Termini di servizio",
    "Delete Account & Data": "Elimina account e dati",
    "Terms & Conditions": "Termini e condizioni",
    "FAQ": "FAQ",
    "Get in Touch": "Mettiti in contatto",
    "Contact": "Contatto",
    "About Us": "Chi siamo",
    "Our Team": "Il nostro team",
    "Nutrients required": "Nutrienti richiesti",
    "nutrients needed in a day": "nutrienti necessari in un giorno",
    "Calories": "Calorie",
    "Carbohydrates": "Carboidrati",
    "Proteins": "Proteine",
    "Fat": "Grassi",
    "Cheese, Bread": "Formaggio, pane e verdure",
    "Kebab, Tomato & Basil": "Kebab, pomodoro e basilico",
    "270 Cal": "270 Cal",
    "480 Cal": "480 Cal",
    "CalKilo AI screen": "Schermata AI di CalKilo",
    "All rights reserved.": "Tutti i diritti riservati.",
    "Theme toggle": "Selettore tema",
    "Language": "Lingua",
    "Store links": "Link store",
  },
}

function translateStaticText(language: SiteLanguage, text: string): string {
  return STATIC_TEXT_TRANSLATIONS[language][text] ?? text
}

function GooglePlayIcon() {
  return (
    <OptimizedImage
      src={FIGMA_ASSETS.GooglePlay}
      alt="Get it on Google Play"
      width="120"
      height="40"
      decoding="async"
    />
  )
}

function AppleIcon() {
  return (
    <OptimizedImage
      src={FIGMA_ASSETS.AppStore}
      alt="Download on the App Store"
      width="120"
      height="40"
      decoding="async"
    />
  )
}

function StoreButtons({ language }: { language: SiteLanguage }) {
  const androidStoreLinks = getAndroidStoreLinks(language)


  return (
    <div className="lp-store-row" aria-label="Store links">
      {language === 'fa'
        ? androidStoreLinks.map((store) => (
            <a
              key={store.href}
              className="lp-store-btn lp-store-btn--text"
              href={store.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="lp-store-copy">
                <small>دریافت از</small>
                <strong>{store.label}</strong>
              </span>
            </a>
          ))
        : (
            <a
              className="lp-store-btn"
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GooglePlayIcon />
            </a>
          )}
      <a
        className="lp-store-btn"
        href={APP_STORE_URL}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
      >

          <AppleIcon />
      
       
      </a>
    </div>
  )
}

function QrCard({ label }: { label: string }) {
  return (
    <div className="lp-qr-card">
      <OptimizedImage
        className="lp-qr-image"
        src="/assets/qr-code.png"
        alt={`${label} QR code for Calkilo`}
        width="1155"
        height="1155"
        loading="lazy"
        decoding="async"
      />
      <p>{label}</p>
    </div>
  )
}

function DownloadArt({ isDark }: { isDark: boolean }) {
  if (!isDark) {
    return (
      <OptimizedImage
        src={FIGMA_ASSETS.downloadObjects}
        alt="Calkilo app download preview"
        className="lp-download-composite"
        width="518"
        height="556"
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <div className="lp-download-stage">
      <div className="lp-download-glow lp-download-glow--primary" />
      <div className="lp-download-glow lp-download-glow--secondary" />
      <OptimizedImage
        src={FIGMA_ASSETS.downloadDecor}
        alt="Floating Calkilo nutrition cards"
        className="lp-download-floaters"
        width="652"
        height="2392"
        loading="lazy"
        decoding="async"
      />
      <OptimizedImage
        src={FIGMA_ASSETS.downloadPhone}
        alt="Calkilo mobile app screen"
        className="lp-download-phone"
        width="800"
        height="1200"
        loading="lazy"
        decoding="async"
      />
      <OptimizedImage
        src={FIGMA_ASSETS.downloadTrophy}
        alt="Calkilo achievement trophy"
        className="lp-download-trophy"
        width="682"
        height="1890"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

function BoworaBadge() {
  return (
    <a
      className="lp-featured-badge"
      href="https://bowora.com/?via=txqmolhu"
      target="_blank"
      rel="noreferrer"
      aria-label="Featured on Bowora"
    >
      <svg width="35" height="35" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="translate(31.1875, 18.1874)" fill="#000">
          <path d="M87.5343464,15.4046144 C88.0800499,16.2992254 87.7980596,17.4698555 86.9050901,18.0165331 C86.0121207,18.5633415 84.8423829,18.2806539 84.2966794,17.3859122 C81.7117678,13.1474282 78.0968081,9.80172458 73.4648555,7.33755659 L73.4485366,7.32879615 C68.8772902,4.83909213 63.5398394,3.61244746 57.444409,3.61244746 L9.3017365,3.61244746 C7.67506992,3.61244746 6.3960609,3.83953898 5.49238625,4.41819874 L5.45674581,4.4405444 C4.79524344,4.84409996 4.32995935,5.45833757 4.0239476,6.27503287 C3.73947677,7.26368123 3.60644521,8.42777375 3.60644521,9.76432926 L3.60644521,103.544841 C3.60644521,104.950303 3.75631787,106.263062 4.0658545,107.495669 C4.27578065,108.239391 4.6709588,108.810258 5.28428782,109.184211 L5.31979771,109.20657 C6.22347236,109.785151 7.50248138,110.012269 9.12927851,110.012269 L59.1699028,110.012269 C63.7602097,110.012269 68.0783175,109.267239 72.1226597,107.769727 C76.1497692,106.173758 79.6895314,103.98404 82.7378993,101.19469 C83.5107618,100.487317 84.7118318,100.541579 85.4181132,101.315897 C86.1243946,102.090216 86.0708687,103.293142 85.2967007,104.000384 C81.9088999,107.100795 77.9767011,109.539466 73.4985376,111.311429 L73.4602862,111.326073 C68.9979194,112.981273 64.2351545,113.8126 59.1699028,113.8126 L9.12927851,113.8126 C6.62504751,113.8126 4.6896276,113.307371 3.2936448,112.419559 C1.8549718,111.536324 0.878319095,110.227096 0.397499432,108.466901 L0.387969203,108.430944 C0.00649891912,106.918395 -0.1875,105.289999 -0.1875,103.544841 L-0.1875,9.76432926 C-0.1875,7.97589194 0.0187707215,6.42738608 0.409379582,5.11588281 L0.444889478,5.00826015 C1.06187393,3.31376875 2.08082518,2.0552073 3.46675555,1.20522233 C4.8626078,0.317842042 6.79815825,-0.1874 9.3017365,-0.1874 L57.444409,-0.1874 C64.2296714,-0.1874 70.1626962,1.21570871 75.252361,3.98591679 C80.5093922,6.78394907 84.5995579,10.5933023 87.5343464,15.4046144 Z"></path>
          <path d="M18.1870648,100.8126 C16.6872227,100.8126 15.520287,100.518396 14.687172,99.9299894 C13.9369898,99.4256779 13.4369118,98.6692106 13.1873299,97.6604566 C12.9372256,96.567738 12.8125,95.3909238 12.8125,94.130538 L12.8125,19.2423752 C12.8125,17.9815965 12.9372256,16.8888779 13.1873299,15.9647434 C13.5207588,14.9559894 14.0622378,14.1995221 14.8124201,13.6952106 C15.6459269,13.1068035 16.8124708,12.8126 18.3128353,12.8126 L53.1886048,12.8126 C57.8554332,12.8126 61.9387285,13.8632708 65.4386213,15.9647434 C69.0219693,18.066085 71.8139951,20.9235009 73.8135234,24.537515 C75.8135741,28.1519222 76.7720677,32.1020566 76.688482,36.3885735 C76.7720677,38.5740106 76.5218328,40.7170071 75.9382997,42.8183487 C75.3548972,44.9198213 74.4798587,46.8946265 73.3134454,48.7439434 C72.2298343,50.5090336 70.8552402,51.9800514 69.188096,53.1563416 C71.438251,54.5853115 73.3548465,56.4346284 74.9381438,58.7036372 C76.5213104,60.9731699 77.729386,63.4943345 78.5626316,66.2681788 C79.3971832,69.0416301 79.8125,71.9416177 79.8125,74.9670938 C79.7302203,78.5811079 79.0628402,81.9848831 77.8129717,85.1790743 C76.5631033,88.2891699 74.771364,91.0204424 72.4380151,93.3735468 C70.1045356,95.7271752 67.3963567,97.576361 64.3126949,98.9208424 C61.2291637,100.181752 57.9374518,100.8126 54.437559,100.8126 L18.186673,100.8126 L18.1870648,100.8126 Z" fillRule="nonzero"></path>
        </g>
      </svg>
      <span className="lp-featured-badge-copy">
        <span>Featured on</span>
        <span>Bowora</span>
      </span>
    </a>
  )
}

export default function LandingPage({
  initialBlogPosts = EMPTY_BLOG_POSTS,
  initialBlogStatus,
  lang,
  variant,
}: LandingPageProps) {
  const router = useRouter()
  const initialLanguage = normalizeSiteLanguage(lang)
  const [systemVariant, setSystemVariant] = useState<LandingVariant>(variant)
  const [manualVariant, setManualVariant] = useState<LandingVariant | null>(null)
  const [heroSlide, setHeroSlide] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const [language, setLanguage] = useState<SiteLanguage>(initialLanguage)
  const [activeNav, setActiveNav] = useState<(typeof NAV_ITEMS)[number]>('home')
  const [isScrolled, setIsScrolled] = useState(false)

  const resolvedVariant: LandingVariant = manualVariant ?? systemVariant
  const isDark = resolvedVariant === 'dark'
  const copy = TRANSLATIONS[language]
  const ts = useCallback((text: string) => translateStaticText(language, text), [language])
  const aiTitleSuffix = copy.aiTitle.replace(/^CalKilo-AI[:：]\s*/u, '')
  const languageFontFamily = LANGUAGE_FONT_FAMILIES[language]
  const languageDisplayFontFamily = LANGUAGE_DISPLAY_FONT_FAMILIES[language]

  const heroSlides = useMemo<HeroSlide[]>(
    () =>
      isDark
        ? [
            {
              src: FIGMA_ASSETS.heroSlideOne,
              srcSet: HERO_SLIDE_ONE_SRC_SET,
              sizes: HERO_IMAGE_SIZES,
              width: 1400,
              height: 1090,
            },
            { src: FIGMA_ASSETS.heroSlideTwoDark, width: 1400, height: 908 },
          ]
        : [
            {
              src: FIGMA_ASSETS.heroSlideOne,
              srcSet: HERO_SLIDE_ONE_SRC_SET,
              sizes: HERO_IMAGE_SIZES,
              width: 1400,
              height: 1090,
            },
            {
              src: FIGMA_ASSETS.heroSlideTwoLight,
              srcSet: HERO_SLIDE_TWO_LIGHT_SRC_SET,
              sizes: HERO_IMAGE_SIZES,
              width: 950,
              height: 600,
            },
          ],
    [isDark],
  )
  const activeHeroSlide = heroSlides[heroSlide] ?? heroSlides[0]

  useEffect(() => {
    setLanguage(initialLanguage)
  }, [initialLanguage])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = (matches: boolean) => {
      setSystemVariant(matches ? 'dark' : 'light')
    }

    applyTheme(media.matches)
    const onThemeChange = (event: MediaQueryListEvent) => applyTheme(event.matches)
    media.addEventListener('change', onThemeChange)

    return () => {
      media.removeEventListener('change', onThemeChange)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.documentElement.lang = language
    document.documentElement.dir = isRtlLanguage(language) ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    setHeroSlide(0)
    setActiveFeature(0)
  }, [resolvedVariant, language])

  useEffect(() => {
    const syncScrollState = () => {
      setIsScrolled(window.scrollY > 24)
    }

    syncScrollState()
    window.addEventListener('scroll', syncScrollState, { passive: true })

    return () => {
      window.removeEventListener('scroll', syncScrollState)
    }
  }, [])

  useEffect(() => {
    const detectActiveSection = () => {
      const position = window.scrollY + 140
      const featuresTop = document.getElementById('features')?.offsetTop ?? Number.MAX_SAFE_INTEGER
      const pricingTop = document.getElementById('pricing')?.offsetTop ?? Number.MAX_SAFE_INTEGER
      const contactTop = document.getElementById('contact')?.offsetTop ?? Number.MAX_SAFE_INTEGER

      let nextActive: (typeof NAV_ITEMS)[number] = 'home'
      if (position >= contactTop) {
        nextActive = 'contact'
      } else if (position >= pricingTop) {
        nextActive = 'pricing'
      } else if (position >= featuresTop) {
        nextActive = 'features'
      }

      setActiveNav(nextActive)
    }

    detectActiveSection()
    window.addEventListener('scroll', detectActiveSection, { passive: true })
    window.addEventListener('resize', detectActiveSection)

    return () => {
      window.removeEventListener('scroll', detectActiveSection)
      window.removeEventListener('resize', detectActiveSection)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('.lp-reveal'))
    if (revealNodes.length === 0) {
      return
    }

    const revealAll = () => {
      revealNodes.forEach((node) => node.classList.add('is-visible'))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
      revealAll()
      return
    }

    document.documentElement.classList.add('lp-motion-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    )

    revealNodes.forEach((node) => observer.observe(node))

    return () => {
      document.documentElement.classList.remove('lp-motion-ready')
      observer.disconnect()
    }
  }, [])

  const isDarkVariantPage = variant === 'dark'
  const baseSeoPath = isDarkVariantPage ? '/dark' : '/'
  const seoPath = toLocalizedPath(baseSeoPath, language)
  const seoCanonicalPath = isDarkVariantPage ? toLocalizedPath('/', language) : seoPath
  const seoTitle = isDarkVariantPage ? `${copy.pageTitle} | ${copy.darkThemeLabel}` : copy.pageTitle
  const landingAlternateLanguages = buildAlternateLanguagePaths(baseSeoPath)
  const landingKeywords = LANDING_PAGE_KEYWORDS[language] ?? LANDING_PAGE_KEYWORDS.en
  const featuresHref = language === 'en' ? '/features/' : '#features'
  const pricingHref = language === 'en' ? '/pricing/' : '#pricing'
  const blogHref = toLocalizedPath('/blog', language)
  const contactHref = toLocalizedPath('/contact', language)
  const pricingOfferUrl = pricingHref.startsWith('#') ? `${SITE_URL}${seoPath}${pricingHref}` : `${SITE_URL}${pricingHref}`

  const localizedResourceLinks = getLocalizedResourceLinks(language)
  const localizedCorePageLinks: SitePageLink[] = CORE_SITE_LINKS.map((link) => {
    if (link.href === '/features/') {
      return {
        href: featuresHref,
        label: ts(link.label),
        description: ts(link.description),
      }
    }

    if (link.href === '/pricing/') {
      return {
        href: pricingHref,
        label: ts(link.label),
        description: ts(link.description),
      }
    }

    if (link.href === '/contact/') {
      return {
        href: contactHref,
        label: ts(link.label),
        description: ts(link.description),
      }
    }

    return {
      href: link.href,
      label: ts(link.label),
      description: ts(link.description),
    }
  })
  const popularPageLinks =
    language === 'en'
      ? ENGLISH_POPULAR_PAGE_LINKS
      : Array.from(
          new Map([...localizedCorePageLinks, ...localizedResourceLinks].map((link) => [link.href, link])).values(),
        )
  const showPopularPages = language === 'en' || language === 'fa' || language === 'it'
  const popularPagesKicker =
    language === 'fa' ? 'صفحه‌های مهم' : language === 'it' ? 'Pagine utili' : 'Popular Pages'
  const popularPagesTitle =
    language === 'fa'
      ? 'راهنماهای پرجست‌وجوی کالکیلو'
      : language === 'it'
        ? 'Guide cercate dagli utenti'
        : 'Explore the pages people'
  const popularPagesTitleAccent =
    language === 'fa' ? 'برای کالری و ماکرو' : language === 'it' ? 'per calorie e AI' : 'look for most'
  const popularPagesIntro =
    language === 'fa'
      ? 'راهنماهای مرتبط با کالری شمار هوش مصنوعی، کالری شمار با عکس، ماکروها و پشتیبانی کالکیلو.'
      : language === 'it'
        ? 'Pagine dedicate a calcolo calorie AI, foto del cibo, macro, prezzi e supporto Calkilo.'
        : POPULAR_PAGES_INTRO
  const popularPagesLinkLabel = language === 'fa' ? 'خواندن راهنما' : language === 'it' ? 'Leggi guida' : 'Read guide'
  const landingHeaderItems = NAV_ITEMS.map((item) => {
    if (item === 'home') {
      return {
        key: item,
        href: seoPath,
        isActive: activeNav === item,
        label: copy.nav[item],
        onClick: () => setActiveNav(item),
      }
    }

    if (item === 'features') {
      return {
        key: item,
        href: featuresHref,
        isActive: activeNav === item,
        label: copy.nav[item],
        onClick: language === 'en' ? undefined : () => setActiveNav(item),
      }
    }

    if (item === 'pricing') {
      return {
        key: item,
        href: pricingHref,
        isActive: activeNav === item,
        label: copy.nav[item],
        onClick: language === 'en' ? undefined : () => setActiveNav(item),
      }
    }

    if (item === 'blog') {
      return {
        key: item,
        href: blogHref,
        isActive: false,
        label: copy.nav[item],
      }
    }

    return {
      key: item,
      href: contactHref,
      isActive: false,
      label: copy.nav[item],
    }
  })
  const landingFooterSections = [
    {
      title: ts('Feature'),
      links: [
        { label: copy.nav.features, href: featuresHref },
        { label: copy.nav.pricing, href: pricingHref },
        { label: copy.nav.blog, href: blogHref },
        { label: localizedResourceLinks[0]?.label ?? 'AI Calorie Tracker', href: localizedResourceLinks[0]?.href ?? '/ai-calorie-tracker/' },
      ],
    },
    {
      title: ts('Support'),
      links: [
        { label: ts('Privacy Policy'), href: toLocalizedPath('/privacy-policy', language) },
        { label: ts('Terms of Service'), href: toLocalizedPath('/terms-of-service', language) },
        { label: ts('Delete Account & Data'), href: toLocalizedPath('/account-deletion', language) },
        { label: ts('Terms & Conditions'), href: toLocalizedPath('/terms-and-conditions', language) },
        { label: ts('FAQ'), href: language === 'fa' ? '/fa/#faq' : '/faq/' },
      ],
    },
    {
      title: ts('Get in Touch'),
      links: [
        { label: ts('Contact'), href: contactHref },
        {
          label: localizedResourceLinks[1]?.label ?? 'Photo Calorie Calculator',
          href: localizedResourceLinks[1]?.href ?? '/photo-calorie-calculator/',
        },
        { label: localizedResourceLinks[2]?.label ?? 'Macro Tracker', href: localizedResourceLinks[2]?.href ?? '/macro-tracker/' },
      ],
    },
  ] as const

  const handleLanguageChange = (nextLanguage: SiteLanguage) => {
    if (nextLanguage === language) {
      return
    }

    setLanguage(nextLanguage)
    void router.push(switchLanguagePath(router.asPath || seoPath, nextLanguage))
  }

  const landingJsonLd = useMemo<Array<Record<string, unknown>>>(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Calkilo',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/logo.png`,
        sameAs: getStoreSameAs(language),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@calkilo.com',
            url: `${SITE_URL}${toLocalizedPath('/contact', language)}`,
            availableLanguage: [language],
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Calkilo',
        url: SITE_URL,
        inLanguage: language,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seoTitle,
        description: copy.pageDescription,
        url: `${SITE_URL}${seoPath}`,
        inLanguage: language,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#app`,
        name: 'Calkilo',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'iOS, Android',
        description: copy.pageDescription,
        url: SITE_URL,
        inLanguage: language,
        isAccessibleForFree: true,
        sameAs: getStoreSameAs(language),
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        featureList: language === 'fa' ? ['تخمین کالری و درشت‌مغذی‌ها از عکس', 'ثبت روزانه غذا'] : FEATURE_ITEMS.map((item) => ts(item.title)),
        offers: language === 'fa' ? undefined : PRICING_PLANS.map((plan) => ({
          ...getPricingSchemaOffer(plan, language, pricingOfferUrl),
          name: ts(plan.title),
        })),
      },
    ],
    [copy.pageDescription, language, pricingOfferUrl, seoPath, seoTitle, ts],
  )

  return (
    <div
      className={`lp-page lp-page--${resolvedVariant}`}
      dir={isRtlLanguage(language) ? 'rtl' : 'ltr'}
      lang={language}
      style={
        {
          '--lp-language-font': languageFontFamily,
          '--lp-display-font': languageDisplayFontFamily,
        } as CSSProperties
      }
    >
      <SeoHead
        title={seoTitle}
        description={copy.pageDescription}
        path={seoPath}
        canonicalPath={seoCanonicalPath}
        keywords={landingKeywords}
        noindex={isDarkVariantPage}
        imagePath="/assets/hero-main.png"
        imageAlt="Calkilo AI calorie tracking dashboard"
        preloadImagePaths={language === 'fa' ? [] : [
          {
            src: heroSlides[0].src,
            srcSet: heroSlides[0].srcSet,
            sizes: heroSlides[0].sizes,
            type: 'image/webp',
          },
        ]}
        jsonLd={landingJsonLd}
        language={language}
        alternateLanguages={landingAlternateLanguages}
      />

      <SiteHeader
        ctaHref="#download"
        ctaLabel={copy.tryFree}
        homeAriaLabel="Calkilo home"
        homeHref={seoPath}
        isScrolled={isScrolled}
        language={language}
        languageLabel={ts('Language')}
        navAriaLabel="Main navigation"
        navItems={landingHeaderItems}
        onLanguageChange={handleLanguageChange}
      />

      {language === 'fa' ? <PersianHomeContent titleA={copy.heroTitleA} titleB={copy.heroTitleB} /> : <main id="home">
        <section className="lp-hero">
          <div className="lp-container lp-hero-grid">
            <div className="lp-hero-copy lp-reveal lp-reveal--left is-visible">
              <h1>
                {copy.heroTitleA}
                {' '}<span>{copy.heroTitleB}</span>
              </h1>
              <p>{copy.heroDescription}</p>
              <div className="lp-store-label">{copy.availableOn}</div>
              <StoreButtons language={language} />
            </div>

            <div className="lp-hero-media lp-reveal lp-reveal--right is-visible" aria-hidden="true">
              <div className="lp-hero-glow" />
              <div className="lp-hero-orbit lp-hero-orbit--one" />
              <div className="lp-hero-orbit lp-hero-orbit--two" />
              <OptimizedImage
                key={activeHeroSlide.src}
                src={activeHeroSlide.src}
                srcSet={activeHeroSlide.srcSet}
                sizes={activeHeroSlide.sizes}
                alt={heroSlide === 0 ? 'Calkilo AI calorie tracking dashboard' : 'Calkilo nutrition summary app screen'}
                width={activeHeroSlide.width}
                height={activeHeroSlide.height}
                loading={heroSlide === 0 ? 'eager' : 'lazy'}
                fetchPriority={heroSlide === 0 ? 'high' : 'low'}
                decoding={heroSlide === 0 ? 'sync' : 'async'}
                className="lp-hero-slide is-active"
              />
            </div>
          </div>
        </section>

        <section className="lp-section lp-ai" id="features">
          <div className="lp-container lp-ai-grid">
            <div className="lp-ai-screen-wrap lp-reveal lp-reveal--left" aria-hidden="true">
              <div className="lp-ai-screen-glow" />
              <div className="lp-ai-screen-stage">
                {FEATURE_ITEMS.map((item, index) => (
                  <OptimizedImage
                    key={item.title}
                    src={item.screen}
                    alt={`${ts(item.title)} Calkilo app screen`}
                    className={`lp-ai-screen${activeFeature === index ? ' is-active' : ''}`}
                    width={index === 0 ? '399' : index === 1 ? '544' : index === 2 ? '491' : '509'}
                    height={index === 3 ? '572' : '576'}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>

            <div className="lp-ai-content lp-reveal lp-reveal--right">
              <h2>
                <span>CalKilo-AI</span>: {aiTitleSuffix}
              </h2>
              <p>{copy.aiSubtitle}</p>

              <div className="lp-feature-list lp-reveal lp-reveal--pop">
                {FEATURE_ITEMS.map((item, index) => (
                  <button
                    key={item.title}
                    className={`lp-feature-card${activeFeature === index ? ' is-active' : ''}`}
                    onClick={() => setActiveFeature(index)}
                    type="button"
                  >
                    <div className="lp-feature-icon" aria-hidden="true">
                      <span className="lp-feature-icon-badge">
                        <FeatureListIcon kind={item.icon} />
                      </span>
                    </div>
                    <div>
                      <h3>{ts(item.title)}</h3>
                      <p>{ts(item.description)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-nutrients">
          <div className="lp-container">
            <div className="lp-nutrients-grid">
              <div className="lp-nutrients-copy lp-reveal lp-reveal--left">
                <h2>{copy.nutrientTitle}</h2>
                <div className="lp-time-row" aria-label="Meal schedule">
                  <span className="is-active">07:00</span>
                  <span>10:00</span>
                  <span>13:00</span>
                  <span>18:00</span>
                </div>
                <div className="lp-chip-row">
                  <span>{ts('Calories')}</span>
                  <span>{ts('Carbohydrates')}</span>
                  <span>{ts('Proteins')}</span>
                  <span>{ts('Fat')}</span>
                </div>
              </div>

              <div className="lp-nutrients-panel lp-reveal lp-reveal--right">
                <div className="lp-tilted-food" aria-hidden="true">
                  <OptimizedImage
                    src={FIGMA_ASSETS.nutrientFood}
                    alt="Balanced meal plate in Calkilo"
                    width="4096"
                    height="2731"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <article className="lp-requirement-card">
                  <h3>{ts('Nutrients required')}</h3>
                  <p>{ts('nutrients needed in a day')}</p>
                  <ul className="lp-macro-list">
                    {NUTRIENT_PROGRESS_ITEMS.map((item) => (
                      <li key={item.label}>
                        <div className="lp-macro-top">
                          <strong>{ts(item.label)}</strong>
                          <span>{item.value}</span>
                        </div>
                        <div className="lp-macro-bar" aria-hidden="true">
                          <span style={{ width: `${item.progress}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>

            <div className="lp-meal-lane">
              <article className="lp-meal-item lp-reveal">
                <OptimizedImage
                  src={FIGMA_ASSETS.mealCheese}
                  alt={ts('Cheese, Bread')}
                  width="600"
                  height="450"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3>{ts('Cheese, Bread')}</h3>
                  <p>{ts('270 Cal')}</p>
                  <small>08:10 am</small>
                </div>
              </article>

              <article
                className="lp-meal-item lp-meal-item--shift lp-reveal lp-reveal--right"
                style={{ '--stagger-index': 1 } as CSSProperties}
              >
                <OptimizedImage
                  src={FIGMA_ASSETS.mealKebab}
                  alt={ts('Kebab, Tomato & Basil')}
                  width="1200"
                  height="743"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3>{ts('Kebab, Tomato & Basil')}</h3>
                  <p>{ts('480 Cal')}</p>
                  <small>12:30 pm</small>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="lp-section lp-how" id="how-it-works">
          <div className="lp-container">
            <header className="lp-section-head lp-reveal">
              <h2>
                {copy.howTitleA} <span>{copy.howTitleB}</span>
              </h2>
              <p>{copy.howSubtitle}</p>
            </header>

            <div className="lp-how-grid">
              {HOW_STEPS.map((step, index) => (
                <article
                  key={step.title}
                  className="lp-how-card lp-reveal lp-reveal--pop"
                  style={{ '--stagger-index': index } as CSSProperties}
                >
                  <div className="lp-how-image-wrap">
                    <OptimizedImage
                      src={step.image}
                      alt={`${ts(step.title)} in Calkilo`}
                      width={index === 0 ? '1206' : '1254'}
                      height={index === 0 ? '1299' : '1347'}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                 
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-style">
          <div className="lp-container lp-style-grid">
            <div className="lp-style-copy lp-reveal lp-reveal--left">
              <h2>{copy.styleTitle}</h2>
              <p>{copy.styleDescription}</p>
              <div className="lp-style-toggle" role="group" aria-label={ts('Theme toggle')}>
                <button
                  className={`lp-style-pill${isDark ? '' : ' is-active'}`}
                  onClick={() => setManualVariant('light')}
                  type="button"
                >
                  {copy.light}
                </button>
                <button
                  className={`lp-style-pill${isDark ? ' is-active' : ''}`}
                  onClick={() => setManualVariant('dark')}
                  type="button"
                >
                  {copy.dark}
                </button>
              </div>
            </div>

            <div className="lp-style-phones lp-reveal lp-reveal--right" aria-hidden="true">
              <OptimizedImage
                src={FIGMA_ASSETS.showcasePhoneDark}
                alt="Calkilo dark mode phone preview"
                className="lp-style-phone back"
                width="1494"
                height="2994"
                loading="lazy"
                decoding="async"
              />
              <OptimizedImage
                src={FIGMA_ASSETS.showcasePhoneLight}
                alt="Calkilo light mode phone preview"
                className="lp-style-phone front"
                width="1494"
                height="2994"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="lp-section lp-integrations">
          <div className="lp-container">
            <header className="lp-section-head lp-reveal">
              <h2>{copy.integrationsTitle}</h2>
              <p>{copy.integrationsSubtitle}</p>
            </header>

            <div className="lp-integrations-grid">
              {INTEGRATIONS.filter(integration => integration.name === 'Apple Health').map((integration, index) => (
                <article
                  key={integration.name}
                  className="lp-integration-card lp-reveal lp-reveal--pop"
                  style={{ '--stagger-index': index } as CSSProperties}
                >
                  <div className="lp-integration-mark" aria-hidden="true">
                    <OptimizedImage
                      src={integration.icon}
                      alt={`${ts(integration.name)} integration icon`}
                      className="lp-integration-icon"
                      width={
                        integration.name === 'Apple Health'
                          ? '37'
                          : integration.name === 'Google Fit'
                            ? '52'
                            : integration.name === 'Samsung Health'
                              ? '48'
                              : '44'
                      }
                      height={integration.name === 'Samsung Health' ? '51' : '44'}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3>{ts(integration.name)}</h3>
                  <p>{ts(integration.description)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-pricing" id="pricing">
          <div className="lp-container">
            <header className="lp-section-head lp-reveal">
              <p className="lp-kicker">{copy.pricingKicker}</p>
              <h2>{ts('Pricing')}</h2>
              <p>{copy.pricingTitle}</p>
            </header>

            <div className="lp-pricing-grid">
              {PRICING_PLANS.map((plan, index) => (
                <article
                  key={plan.title}
                  className={`lp-pricing-card lp-reveal lp-reveal--pop${plan.highlight ? ' is-highlight' : ''}`}
                  style={{ '--stagger-index': index } as CSSProperties}
                >
                  {plan.badge ? <div className="lp-price-badge">{ts(plan.badge)}</div> : null}
                  <h3>{ts(plan.title)}</h3>
                  <p className="lp-price-subtitle">{ts(plan.subtitle)}</p>
                  <div className="lp-price-row">
                    <span>{getPricingDisplayPrice(plan, language)}</span>
                    {plan.oldPrice ? <small>{plan.oldPrice}</small> : null}
                  </div>
                  <ul>
                    <li>{ts('Personalized meal plans')}</li>
                    <li>{ts('Smart grocery shopping lists')}</li>
                    <li>{ts('Nutritional insights')}</li>
                    <li>{ts('Dietary preference settings')}</li>
                    <li>{ts('Mobile-friendly interface')}</li>
                    <li>{ts('Customer support')}</li>
                  </ul>
                  <a href="#download">
                    {ts(plan.cta)}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-community">
          <div
            className="lp-community-bg"
            aria-hidden="true"
            style={isDark ? { backgroundImage: `url(${FIGMA_ASSETS.communityPattern})` } : undefined}
          />
          <div className="lp-container">
            <header className="lp-section-head lp-reveal">
              <h2>{copy.communityTitle}</h2>
              <p>{copy.communitySubtitle}</p>
            </header>

            <div className="lp-community-grid">
              {COMMUNITY_ITEMS.map((item, index) => (
                <article
                  key={item.title}
                  className="lp-community-card lp-reveal lp-reveal--pop"
                  style={{ '--stagger-index': index } as CSSProperties}
                >
                  <OptimizedImage
                    src={item.icon}
                    alt={`${ts(item.title)} community feature icon`}
                    className="lp-community-icon"
                    width="50"
                    height="50"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{ts(item.title)}</h3>
                  <p>{ts(item.description)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {showPopularPages ? (
          <section className="lp-section lp-guides" aria-labelledby="search-guides-title">
            <div className="lp-container lp-guides-wrap">
              <header className="lp-section-head lp-guides-head lp-reveal">
                <p className="lp-kicker">{popularPagesKicker}</p>
                <h2 id="search-guides-title">
                  {popularPagesTitle} <span>{popularPagesTitleAccent}</span>
                </h2>
                <p>{popularPagesIntro}</p>
              </header>

              <div className="lp-guides-grid">
                {popularPageLinks.map((resource, index) => (
                  <article
                    key={resource.href}
                    className="lp-guide-card lp-reveal lp-reveal--pop"
                    style={{ '--stagger-index': index } as CSSProperties}
                  >
                    <h3>
                      <Link href={resource.href}>{resource.label}</Link>
                    </h3>
                    <p>{resource.description}</p>
                    <Link className="lp-guide-link" href={resource.href}>
                      {popularPagesLinkLabel}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <BlogLatestSection
          initialPosts={initialBlogPosts}
          initialStatus={language === initialLanguage ? initialBlogStatus : 'loading'}
          language={language}
          postsLanguage={initialLanguage}
        />

        <section className="lp-section lp-download" id="download">
          <div className="lp-container lp-download-grid">
            <div className="lp-download-art lp-reveal lp-reveal--left" aria-hidden="true">
              <DownloadArt isDark={isDark} />
            </div>

            <div className="lp-download-copy lp-reveal lp-reveal--right">
              <h2>
                {copy.downloadTitleA}
                <span> {copy.downloadTitleB}</span>
              </h2>
              <p>{copy.downloadDescription}</p>
              <StoreButtons language={language} />
            </div>

            <div className="lp-download-scan lp-reveal">
              <QrCard label={copy.scanLabel} />
            </div>
          </div>
        </section>

        <section className="lp-section lp-faq" id="faq">
          <div className="lp-container lp-faq-wrap">
            <header className="lp-section-head lp-reveal">
              <p className="lp-kicker">{copy.faqKicker}</p>
              <h2>
                {copy.faqTitleA} <span>{copy.faqTitleB}</span>
              </h2>
              <p>{copy.faqSubtitle}</p>
            </header>

            <div className="lp-faq-list">
              {FAQ_ITEMS.map((item, index) => (
                <details
                  key={item.question}
                  className="lp-faq-item lp-reveal"
                  open={index === 0}
                  style={{ '--stagger-index': index } as CSSProperties}
                >
                  <summary>
                    <span>{ts(item.question)}</span>
                    <span className="lp-faq-topic">{ts(item.topic)}</span>
                  </summary>
                  <p>{ts(item.answer)}</p>
                </details>
              ))}
            </div>

            <aside className="lp-faq-support lp-reveal lp-reveal--pop">
              <h3>{copy.faqSupportTitle}</h3>
              <p>{copy.faqSupportText}</p>
              <Link href={contactHref}>{copy.faqSupportButton}</Link>
            </aside>
          </div>
        </section>
      </main>}

      <SiteFooter
        copyright={`© ${new Date().getFullYear()} Calkilo. ${ts('All rights reserved.')}`}
        description={copy.footerDescription}
        featuredContent={language === 'fa' ? undefined : <BoworaBadge />}
        homeAriaLabel="Calkilo home"
        homeHref={seoPath}
        id="contact"
        sections={landingFooterSections}
        socialLinksLabel="Social links"
      />
    </div>
  )
}
