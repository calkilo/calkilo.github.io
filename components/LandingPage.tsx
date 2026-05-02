import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../lib/app-links'
import { RESOURCE_LINKS } from '../lib/resource-pages'
import { SITE_URL } from '../lib/seo'
import { ENGLISH_POPULAR_PAGE_LINKS } from '../lib/site-pages'
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
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import SeoHead from './SeoHead'

type LandingVariant = 'light' | 'dark'

interface LandingPageProps {
  lang?: string
  variant: LandingVariant
}

const FIGMA_ASSETS = {
  heroSlideOne: '/assets/figma/9d9b9498b6a18bddd5bf8497bbfeac1152b019f0.webp',
  heroSlideTwoLight: '/assets/figma/65a641bda519c280d8c60b43b9194d73157d5c50.webp',
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

const NAV_ITEMS = ['home', 'features', 'pricing', 'contact'] as const

const LANDING_PAGE_KEYWORDS: Record<SiteLanguage, ReadonlyArray<string>> = {
  en: ['free ai calorie tracker', 'photo calorie calculator', 'macro tracker app', 'nutrition tracking app', 'calkilo'],
  nl: ['ai calorietracker', 'foto calorie calculator', 'macro tracker app', 'voeding app', 'calkilo'],
  zh: ['ai 卡路里追踪', '拍照计算卡路里', '营养追踪应用', '宏量营养追踪', 'calkilo'],
  ru: ['ai трекер калорий', 'подсчет калорий по фото', 'приложение для макросов', 'трекер питания', 'calkilo'],
  ar: ['متتبع السعرات بالذكاء الاصطناعي', 'حاسبة سعرات من الصورة', 'تطبيق تتبع الماكروز', 'تتبع التغذية', 'calkilo'],
  fa: ['کالری شمار رایگان', 'کالری شمار هوش مصنوعی', 'محاسبه کالری با عکس', 'اپ شمارش کالری', 'کالکیلو'],
  it: ['calcolo calorie ai', 'calorie da foto', 'macro tracker app', 'app nutrizione', 'calkilo'],
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
      'Free AI calorie tracker that estimates food calories from photos, tracks macros, and creates meal plans on iPhone and Android.',
    pageTitle: 'Free AI Calorie Tracker & Photo Food Calorie Counter | Calkilo',
    darkThemeLabel: 'Dark Theme',
    nav: { home: 'Home', features: 'Features', pricing: 'Choose Plan', contact: 'Contact' },
    tryFree: 'Try for free',
    heroTitleA: 'Free AI Calorie Tracker',
    heroTitleB: 'for Food Photos',
    heroDescription:
      'Snap a meal photo and let Calkilo estimate calories, macros, and nutrition instantly. Review each result, keep your daily log, and stay on track without manual entry.',
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
    pricingKicker: 'No credit card required',
    pricingTitle: 'Start for free with gamification and unlock more features anytime',
    communityTitle: 'Join a Thriving Community',
    communitySubtitle: 'Invite, share, and get motivated with thousands of health-conscious users',
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
    footerDescription: 'Revolutionizing nutrition tracking with AI-powered calorie calculation.',
    storeGoogleSmall: 'GET IT ON',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'Download on the',
    storeAppleLarge: 'App Store',
  },
  nl: {
    pageDescription:
      'Bereken calorieen met AI-nauwkeurigheid, ontvang persoonlijke maaltijdplannen en volg je voeding op al je apparaten.',
    pageTitle: 'Calkilo | AI-calorietracker en voedingsapp',
    darkThemeLabel: 'Donkere modus',
    nav: { home: 'Thuis', features: 'Functies', pricing: 'Kies plan', contact: 'Contact' },
    tryFree: 'Probeer gratis',
    heroTitleA: 'Bereken calorieen met',
    heroTitleB: 'AI-precisie',
    heroDescription: 'Maak een foto van je maaltijd en krijg direct calorieen en voedingswaarden.',
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
    pricingKicker: 'Geen creditcard nodig',
    pricingTitle: 'Start gratis en ontgrendel op elk moment meer functies',
    communityTitle: 'Word deel van een actieve community',
    communitySubtitle: 'Nodig uit, deel en blijf gemotiveerd met duizenden gebruikers',
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
    footerDescription: 'Voedingstracking vernieuwd met AI-gestuurde calorieberekening.',
    storeGoogleSmall: 'GET IT ON',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'Download on the',
    storeAppleLarge: 'App Store',
  },
  zh: {
    pageDescription: '用 AI 精准计算卡路里，获取个性化餐食计划，并在所有设备上追踪营养。',
    pageTitle: 'Calkilo | AI 卡路里追踪与营养应用',
    darkThemeLabel: '深色主题',
    nav: { home: '首页', features: '功能', pricing: '选择计划', contact: '联系我们' },
    tryFree: '免费试用',
    heroTitleA: '使用',
    heroTitleB: 'AI 精准计算卡路里',
    heroDescription: '拍一张食物照片，Calkilo 的 AI 会立即计算准确热量和营养信息。',
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
    pricingKicker: '无需信用卡',
    pricingTitle: '免费开始，随时解锁更多功能',
    communityTitle: '加入活跃社区',
    communitySubtitle: '邀请、分享，与成千上万注重健康的用户一起获得动力',
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
    footerDescription: '用 AI 热量计算革新营养追踪。',
    storeGoogleSmall: '立即获取',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: '下载于',
    storeAppleLarge: 'App Store',
  },
  ru: {
    pageDescription:
      'Считайте калории с точностью AI, получайте персональные планы питания и отслеживайте рацион на всех устройствах.',
    pageTitle: 'Calkilo | AI-трекер калорий и питания',
    darkThemeLabel: 'Темная тема',
    nav: { home: 'Главная', features: 'Функции', pricing: 'Тарифы', contact: 'Контакты' },
    tryFree: 'Попробовать бесплатно',
    heroTitleA: 'Считайте калории с',
    heroTitleB: 'точностью AI',
    heroDescription: 'Сфотографируйте еду и мгновенно получите калории и данные по питанию.',
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
    pricingKicker: 'Кредитная карта не требуется',
    pricingTitle: 'Начните бесплатно и открывайте больше функций в любой момент',
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
    footerDescription: 'Революция в трекинге питания с AI-анализом калорий.',
    storeGoogleSmall: 'СКАЧАТЬ В',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'Загрузить в',
    storeAppleLarge: 'App Store',
  },
  ar: {
    pageDescription:
      'احسب السعرات بدقة الذكاء الاصطناعي، واحصل على خطط وجبات مخصصة، وتابع تغذيتك على جميع أجهزتك.',
    pageTitle: 'Calkilo | تطبيق تتبع السعرات والتغذية بالذكاء الاصطناعي',
    darkThemeLabel: 'الوضع الداكن',
    nav: { home: 'الرئيسية', features: 'الميزات', pricing: 'الخطط', contact: 'تواصل' },
    tryFree: 'جرب مجاناً',
    heroTitleA: 'احسب السعرات بـ',
    heroTitleB: 'دقة الذكاء الاصطناعي',
    heroDescription: 'التقط صورة لوجبتك واحصل فوراً على السعرات والمعلومات الغذائية الدقيقة.',
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
    pricingKicker: 'لا حاجة لبطاقة ائتمان',
    pricingTitle: 'ابدأ مجاناً وافتح مزايا أكثر في أي وقت',
    communityTitle: 'انضم إلى مجتمع مزدهر',
    communitySubtitle: 'ادعُ وشارك وتحفّز مع آلاف المستخدمين المهتمين بالصحة',
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
    footerDescription: 'نُحدث ثورة في تتبع التغذية بحساب السعرات المدعوم بالذكاء الاصطناعي.',
    storeGoogleSmall: 'حمّل من',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'تنزيل من',
    storeAppleLarge: 'App Store',
  },
  fa: {
    pageDescription:
      'کالری غذا را از روی عکس با هوش مصنوعی محاسبه کنید. کالری شمار رایگان کالکیلو برای پیگیری کالری، درشت‌مغذی‌ها و برنامه غذایی.',
    pageTitle: 'کالری شمار رایگان با هوش مصنوعی و تشخیص غذا | کالکیلو',
    darkThemeLabel: 'حالت تیره',
    nav: { home: 'خانه', features: 'ویژگی‌ها', pricing: 'انتخاب طرح', contact: 'تماس' },
    tryFree: 'رایگان شروع کنید',
    heroTitleA: 'کالری شمار رایگان',
    heroTitleB: 'با هوش مصنوعی',
    heroDescription:
      'از غذای خود عکس بگیرید تا کالکیلو با هوش مصنوعی، کالری، درشت‌مغذی‌ها و اطلاعات تغذیه‌ای را سریع محاسبه کند. نتیجه را بررسی کنید، وعده‌ها را ثبت کنید و بدون ورود دستی پیگیر رژیم بمانید.',
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
    pricingKicker: 'بدون نیاز به کارت اعتباری',
    pricingTitle: 'رایگان شروع کنید و هر زمان خواستید ویژگی‌های بیشتری باز کنید',
    communityTitle: 'به یک جامعه پویا بپیوندید',
    communitySubtitle: 'دوستانتان را دعوت کنید، تجربیاتتان را به اشتراک بگذارید و در کنار هزاران کاربر دیگر، انگیزه‌تان را برای سلامتی حفظ کنید.',
    downloadTitleA: 'آماده تغییر تغذیه خود هستید؟',
    downloadTitleB: 'همین حالا رایگان شروع کنید',
    downloadDescription: 'اپ را دانلود کنید تا کالری را دنبال کنید و به اهداف سلامتی برسید.',
    scanLabel: 'برای دانلود اسکن کنید',
    faqKicker: 'سوالات متداول',
    faqTitleA: 'سوالات',
    faqTitleB: 'متداول',
    faqSubtitle: 'سوالی دارید؟ ما اینجا هستیم تا راهنمایی‌تان کنیم',
    faqSupportTitle: 'همچنان سوالی در ذهن دارید؟',
    faqSupportText: 'تیم پشتیبانی ما آماده است تا به شما کمک کند بهترین تجربه را در استفاده از Calkilo داشته باشید.',
    faqSupportButton: 'تماس با ما',
    footerDescription: 'ردیابی تغذیه را با کالری‌شماری دقیق مبتنی بر هوش مصنوعی متحول می‌کنیم.',
    storeGoogleSmall: 'دریافت از',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'دانلود از',
    storeAppleLarge: 'App Store',
  },
  it: {
    pageDescription:
      'Calcola le calorie con precisione AI, ricevi piani alimentari personalizzati e monitora la nutrizione su tutti i tuoi dispositivi.',
    pageTitle: 'Calkilo | App AI per calorie e nutrizione',
    darkThemeLabel: 'Tema scuro',
    nav: { home: 'Home', features: 'Funzioni', pricing: 'Scegli piano', contact: 'Contatto' },
    tryFree: 'Provalo gratis',
    heroTitleA: 'Calcola le calorie con',
    heroTitleB: 'precisione AI',
    heroDescription:
      'Scatta una foto del tuo pasto e ottieni subito calorie e informazioni nutrizionali.',
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
    pricingKicker: 'Nessuna carta richiesta',
    pricingTitle: 'Inizia gratis e sblocca piu funzionalita quando vuoi',
    communityTitle: 'Unisciti a una community attiva',
    communitySubtitle: 'Invita, condividi e resta motivato con migliaia di utenti',
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
    footerDescription: 'Tracking nutrizionale rivoluzionato dal calcolo calorie con AI.',
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
      'Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.',
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
      'Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutrition data.',
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

const TESTIMONIALS = [
  {
    title: 'Love this app',
    author: 'Omar Taham',
    body: 'Calkilo makes tracking food fast and stress-free. It helped me improve my eating habits without feeling restricted.',
  },
  {
    title: 'Very helpful',
    author: 'Maria Santa',
    body: 'As someone trying to lose weight, Calkilo helped me understand portions better and make smarter food choices.',
  },
  {
    title: 'Works great for me',
    author: 'Kevin Lovatho',
    body: 'The AI suggestions are genuinely useful and the app design is clear and fast to use every day.',
  },
  {
    title: 'Saves my time',
    author: 'Aisha Kardashian',
    body: 'Photo analysis is quick, and I can stay consistent with meal tracking even on busy days.',
  },
  {
    title: 'Really simple app',
    author: 'David Ralph',
    body: 'The structure is clean, and all key nutrition data is easy to read. Exactly what I needed.',
  },
  {
    title: 'Super easy to use',
    author: 'Sarah Morgan',
    body: 'I started with the free plan and upgraded quickly. Great value for daily nutrition planning.',
  },
] as const

const PRICING_PLANS = [
  {
    title: 'Premium 1 Month',
    subtitle: 'Perfect for trying out',
    oldPrice: '$9.99',
    price: '$7.99',
    cta: 'Start for a Month',
    highlight: false,
    badge: '',
  },
  {
    title: 'Premium 3 Months',
    subtitle: 'Most chosen by athletes',
    oldPrice: '$27.96',
    price: '$21.99',
    cta: 'Try it now',
    highlight: true,
    badge: 'Most Popular - Save 25%',
  },
  {
    title: 'Premium 6 Months',
    subtitle: 'Best value for meal planners',
    oldPrice: '$99.90',
    price: '$59.99',
    cta: 'Get premium',
    highlight: false,
    badge: 'Save 33%',
  },
] as const

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
    answer:
      'Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.',
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
    answer:
      'Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.',
  },
  {
    topic: 'Security',
    question: 'Is my food photo data private and secure?',
    answer: 'Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.',
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
    answer: 'Yes. You can connect supported platforms like Apple Health, Google Fit, Fitbit, and Samsung Health.',
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
    "Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.": "Maak een foto van je maaltijd en krijg direct nauwkeurige calorieberekeningen met AI.",
    "Scan Your Meal": "Scan je maaltijd",
    "Take a photo of your food.": "Maak een foto van je eten.",
    "AI Analyzes": "AI analyseert",
    "Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutrition data.": "Onze geavanceerde AI herkent ingredienten, porties en berekent nauwkeurige voedingswaarden.",
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
    "I started with the free plan and upgraded quickly. Great value for daily nutrition planning.": "Ik begon met het gratis plan en ben snel geupgrade. Veel waarde voor dagelijkse planning.",
    "Premium 1 Month": "Premium 1 maand",
    "Perfect for trying out": "Perfect om te proberen",
    "Start for a Month": "Start voor 1 maand",
    "Premium 3 Months": "Premium 3 maanden",
    "Most chosen by athletes": "Meest gekozen door sporters",
    "Try it now": "Probeer nu",
    "Most Popular - Save 25%": "Populairst - Bespaar 25%",
    "Premium 6 Months": "Premium 6 maanden",
    "Best value for meal planners": "Beste waarde voor meal planners",
    "Get premium": "Neem premium",
    "Save 33%": "Bespaar 33%",
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
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Begin gratis met basis tracking en gamification. Premium geeft persoonlijke plannen, diepere analyses en AI-coaching.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "De app combineert je doelen, voedingsgeschiedenis en voorkeuren om maaltijdsuggesties te maken die zich aanpassen.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "Ja. Je kunt dieetbeperkingen, smaakvoorkeuren en macrodoelen op elk moment aanpassen in je profiel.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "Uploads zijn versleuteld en worden alleen gebruikt voor je analyse en betere aanbevelingen.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "Voordat Calkilo een nieuwe AI-voedingsscan, maaltijdbewerking of AI-chatverzoek verstuurt, vraagt de app om jouw toestemming. Als je AI-functies toestaat, kan Calkilo voedselfoto's, maaltijdgegevens, chatberichten en de account- of aanvraag-ID's versturen die nodig zijn om je resultaat via api.calkilo.com terug te sturen.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "Fotoanalyse vereist internet, maar je kunt eerdere gegevens en basislogs ook offline bekijken.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "Elke voorgestelde maaltijd bevat calorieen, eiwitten, koolhydraten, vetten en portierichtlijnen.",
    "Yes. You can connect supported platforms like Apple Health, Google Fit, Fitbit, and Samsung Health.": "Ja. Je kunt ondersteunde platforms verbinden zoals Apple Health, Google Fit, Fitbit en Samsung Health.",
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
    "Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.": "Сфотографируйте блюдо и сразу получите точный расчет калорий с помощью AI.",
    "Scan Your Meal": "Сканируйте блюдо",
    "Take a photo of your food.": "Сделайте фото еды.",
    "AI Analyzes": "AI анализирует",
    "Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutrition data.": "AI распознает ингредиенты, порции и рассчитывает точные данные по питанию.",
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
    "I started with the free plan and upgraded quickly. Great value for daily nutrition planning.": "Я начал с бесплатного плана и быстро перешел на премиум. Отличная ценность для ежедневного планирования.",
    "Premium 1 Month": "Премиум 1 месяц",
    "Perfect for trying out": "Отлично для знакомства",
    "Start for a Month": "Начать на 1 месяц",
    "Premium 3 Months": "Премиум 3 месяца",
    "Most chosen by athletes": "Чаще всего выбирают спортсмены",
    "Try it now": "Попробовать сейчас",
    "Most Popular - Save 25%": "Самый популярный - экономия 25%",
    "Premium 6 Months": "Премиум 6 месяцев",
    "Best value for meal planners": "Лучшая цена для планирования питания",
    "Get premium": "Подключить премиум",
    "Save 33%": "Экономия 33%",
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
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Начните бесплатно с базового трекинга и геймификации. Премиум открывает персональные планы, глубокую аналитику и AI-коучинг.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "Приложение объединяет ваши цели, историю питания и предпочтения, чтобы формировать персональные рекомендации.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "Да. Вы можете менять ограничения, вкусовые предпочтения и цели по макроэлементам в настройках профиля.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "Загрузки шифруются и используются только для анализа и улучшения персональных рекомендаций.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "Перед отправкой нового AI-сканирования еды, редактирования приема пищи или AI-чата приложение запрашивает ваше разрешение. Если вы разрешите AI-функции, Calkilo может отправлять фотографии еды, записи о приемах пищи, сообщения чата, а также идентификаторы аккаунта или запроса, необходимые для возврата результата через api.calkilo.com.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "Для анализа фото нужен интернет, но прошлые данные и базовые записи доступны офлайн.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "Каждая рекомендация включает калории, белки, углеводы, жиры и рекомендации по порциям.",
    "Yes. You can connect supported platforms like Apple Health, Google Fit, Fitbit, and Samsung Health.": "Да. Можно подключить Apple Health, Google Fit, Fitbit и Samsung Health.",
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
    "Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.": "拍一张餐食照片，即刻获得准确热量计算。",
    "Scan Your Meal": "扫描你的餐食",
    "Take a photo of your food.": "拍下你的食物。",
    "AI Analyzes": "AI 分析",
    "Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutrition data.": "AI 可识别食材和份量，并计算精确营养数据。",
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
    "I started with the free plan and upgraded quickly. Great value for daily nutrition planning.": "我从免费版开始，很快升级了。对日常营养规划非常划算。",
    "Premium 1 Month": "高级版 1 个月",
    "Perfect for trying out": "非常适合体验",
    "Start for a Month": "先试 1 个月",
    "Premium 3 Months": "高级版 3 个月",
    "Most chosen by athletes": "运动人群最常选择",
    "Try it now": "立即试用",
    "Most Popular - Save 25%": "最受欢迎 - 省 25%",
    "Premium 6 Months": "高级版 6 个月",
    "Best value for meal planners": "餐食规划最佳性价比",
    "Get premium": "开通高级版",
    "Save 33%": "省 33%",
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
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "可免费开始使用核心记录和游戏化功能。高级版解锁个性化餐单、深度分析和 AI 教练。",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "应用会结合你的目标、饮食历史和偏好，生成会随数据变化而调整的餐食建议。",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "可以。你可随时在个人设置中更新饮食限制、口味偏好和宏量目标。",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "上传内容会加密，仅用于提供分析结果并优化个性化推荐。",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "在 Calkilo 发送新的 AI 食物扫描、餐食编辑或 AI 聊天请求之前，应用会先征求你的许可。如果你允许 AI 功能，Calkilo 可能会通过 api.calkilo.com 发送食物照片、餐食记录、聊天消息，以及返回结果所需的账户或请求标识符。",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "照片分析需要联网，但离线时仍可查看历史数据和基础记录。",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "每个推荐餐食都包含热量、蛋白质、碳水、脂肪和份量建议。",
    "Yes. You can connect supported platforms like Apple Health, Google Fit, Fitbit, and Samsung Health.": "可以。你可以连接 Apple Health、Google Fit、Fitbit 和 Samsung Health。",
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
    "Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.": "التقط صورة لوجبتك واحصل فوراً على حساب دقيق للسعرات.",
    "Scan Your Meal": "امسح وجبتك",
    "Take a photo of your food.": "التقط صورة لطعامك.",
    "AI Analyzes": "الذكاء الاصطناعي يحلل",
    "Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutrition data.": "يتعرف الذكاء الاصطناعي على المكونات وحجم الحصص ويحسب القيم الغذائية بدقة.",
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
    "I started with the free plan and upgraded quickly. Great value for daily nutrition planning.": "بدأت بالخطة المجانية ثم قمت بالترقية بسرعة. قيمة ممتازة للتخطيط الغذائي اليومي.",
    "Premium 1 Month": "بريميوم شهر واحد",
    "Perfect for trying out": "مثالي للتجربة",
    "Start for a Month": "ابدأ لشهر",
    "Premium 3 Months": "بريميوم 3 أشهر",
    "Most chosen by athletes": "الأكثر اختياراً بين الرياضيين",
    "Try it now": "جرّبه الآن",
    "Most Popular - Save 25%": "الأكثر شيوعاً - وفر 25%",
    "Premium 6 Months": "بريميوم 6 أشهر",
    "Best value for meal planners": "أفضل قيمة لمخططي الوجبات",
    "Get premium": "احصل على بريميوم",
    "Save 33%": "وفر 33%",
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
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "ابدأ مجاناً مع التتبع الأساسي واللعب التحفيزي. خطط بريميوم تفتح خطط وجبات مخصصة وتحليلات أعمق وتدريباً بالذكاء الاصطناعي.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "يجمع التطبيق أهدافك وسجل التغذية وتفضيلاتك ليولد اقتراحات وجبات تتكيف مع تغير بياناتك.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "نعم. يمكنك تحديث القيود الغذائية وتفضيلات الذوق وأهداف الماكروز في أي وقت من إعدادات الملف الشخصي.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "يتم تشفير الملفات المرفوعة وتستخدم فقط لتقديم التحليل وتحسين توصياتك الشخصية.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "قبل أن يرسل Calkilo فحص طعام جديداً بالذكاء الاصطناعي أو تعديل وجبة أو طلب دردشة بالذكاء الاصطناعي، يطلب التطبيق إذنك. إذا سمحت بميزات الذكاء الاصطناعي، فقد يرسل Calkilo صور الطعام وسجلات الوجبات ورسائل الدردشة ومعرّفات الحساب أو الطلب اللازمة لإرجاع النتيجة عبر api.calkilo.com.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "تحليل الصور يحتاج إلى الإنترنت، لكن يمكنك مراجعة البيانات السابقة والسجلات الأساسية دون اتصال.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "كل وجبة مقترحة تتضمن السعرات والبروتين والكربوهيدرات والدهون وإرشادات الحصص.",
    "Yes. You can connect supported platforms like Apple Health, Google Fit, Fitbit, and Samsung Health.": "نعم. يمكنك ربط المنصات المدعومة مثل Apple Health وGoogle Fit وFitbit وSamsung Health.",
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
    "Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.": "از وعده غذایی عکس بگیرید و فوراً محاسبه دقیق کالری دریافت کنید.",
    "Scan Your Meal": "وعده غذایی خود را اسکن کنید",
    "Take a photo of your food.": "از غذای خود عکس بگیرید.",
    "AI Analyzes": "تحلیل توسط هوش مصنوعی",
    "Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutrition data.": "هوش مصنوعی مواد اولیه و حجم وعده را تشخیص می‌دهد و داده تغذیه‌ای دقیق محاسبه می‌کند.",
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
    "I started with the free plan and upgraded quickly. Great value for daily nutrition planning.": "با طرح رایگان شروع کردم و خیلی زود ارتقا دادم. برای برنامه‌ریزی روزانه ارزش بالایی دارد.",
    "Premium 1 Month": "پریمیوم ۱ ماهه",
    "Perfect for trying out": "مناسب برای شروع",
    "Start for a Month": "شروع برای ۱ ماه",
    "Premium 3 Months": "پریمیوم ۳ ماهه",
    "Most chosen by athletes": "بیشترین انتخاب ورزشکاران",
    "Try it now": "همین حالا امتحان کنید",
    "Most Popular - Save 25%": "محبوب‌ترین - 25٪ تخفیف",
    "Premium 6 Months": "پریمیوم ۶ ماهه",
    "Best value for meal planners": "بهترین ارزش برای برنامه‌ریزی وعده",
    "Get premium": "دریافت پریمیوم",
    "Save 33%": "33٪ صرفه‌جویی",
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
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "شروع کار رایگان است! می‌توانید از امکانات پایه و قابلیت‌های جذاب ردیابی غذا استفاده کنید. با تهیه اشتراک ویژه (Premium)، به برنامه‌های غذایی اختصاصی، تحلیل‌های دقیق و مربی هوشمند دسترسی خواهید داشت.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "سیستم ما با ترکیب اهداف، ذائقه و سوابق تغذیه‌ای شما، هوشمندانه‌ترین پیشنهادها را که دقیقاً با سبک زندگی‌تان سازگار است، طراحی می‌کند.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "بله، بعد از شروع برنامه می‌توانید اطلاعاتی مثل قد و وزن هدف را در پروفایل خود به‌روزرسانی کنید. در حال حاضر امکان تنظیم دستی ماکروها وجود ندارد.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "بله، تمام تصاویر ارسالی به‌صورت رمزگذاری‌شده ذخیره می‌شوند. این داده‌ها صرفاً برای تحلیل دقیق‌تر و شخصی‌سازی بهتر پیشنهادها برای خود شما استفاده می‌شوند.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "پیش از آن‌که Calkilo اسکن غذایی جدید، ویرایش وعده یا درخواست چت هوش مصنوعی را ارسال کند، اپ از شما اجازه می‌گیرد. اگر قابلیت‌های هوش مصنوعی را فعال کنید، Calkilo ممکن است عکس غذا، سوابق وعده‌ها، پیام‌های چت و شناسه‌های حساب یا درخواست لازم برای برگرداندن نتیجه را از طریق api.calkilo.com ارسال کند.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "برای تحلیل تصاویر به اینترنت نیاز است؛ اما می‌توانید اطلاعات ثبت‌شده قبلی را در حالت آفلاین مشاهده کنید.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "هر وعده پیشنهادی شامل کالری، پروتئین، کربوهیدرات، چربی و راهنمای مقدار است.",
    "Yes. You can connect supported platforms like Apple Health, Google Fit, Fitbit, and Samsung Health.": "بله، می‌توانید سرویس‌های محبوبی مثل Apple Health، Google Fit، Samsung Health و Fitbit را به برنامه متصل کنید.",
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
    "Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.": "Scatta una foto del pasto e ottieni subito un calcolo calorie accurato.",
    "Scan Your Meal": "Scansiona il tuo pasto",
    "Take a photo of your food.": "Scatta una foto del tuo cibo.",
    "AI Analyzes": "L'AI analizza",
    "Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutrition data.": "La nostra AI riconosce ingredienti e porzioni e calcola dati nutrizionali precisi.",
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
    "I started with the free plan and upgraded quickly. Great value for daily nutrition planning.": "Ho iniziato con il piano gratuito e ho fatto subito l'upgrade. Ottimo valore per la pianificazione quotidiana.",
    "Premium 1 Month": "Premium 1 mese",
    "Perfect for trying out": "Perfetto per iniziare",
    "Start for a Month": "Inizia per 1 mese",
    "Premium 3 Months": "Premium 3 mesi",
    "Most chosen by athletes": "Il piu scelto dagli sportivi",
    "Try it now": "Provalo ora",
    "Most Popular - Save 25%": "Piu popolare - Risparmia 25%",
    "Premium 6 Months": "Premium 6 mesi",
    "Best value for meal planners": "Miglior valore per pianificare i pasti",
    "Get premium": "Passa a premium",
    "Save 33%": "Risparmia 33%",
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
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Inizia gratis con tracciamento base e gamification. I piani premium sbloccano piani personalizzati, analisi avanzate e coaching AI.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "L'app combina obiettivi, storico nutrizionale e preferenze per suggerire pasti che si adattano ai tuoi dati.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "Si. Puoi aggiornare restrizioni alimentari, gusti e obiettivi macro in qualsiasi momento dalle impostazioni profilo.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "I caricamenti sono crittografati e usati solo per l'analisi e per migliorare i suggerimenti personali.",
    "Before Calkilo sends a new AI food scan, meal edit, or AI chat request, the app asks for your permission. If you allow AI features, Calkilo may send food photos, meal records, chat messages, and the account or request identifiers needed to return your result through api.calkilo.com.": "Prima che Calkilo invii una nuova scansione cibo AI, una modifica del pasto o una richiesta di chat AI, l'app ti chiede il permesso. Se abiliti le funzioni AI, Calkilo puo inviare foto del cibo, registri dei pasti, messaggi di chat e gli identificatori di account o richiesta necessari per restituire il risultato tramite api.calkilo.com.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "L'analisi foto richiede internet, ma puoi rivedere dati precedenti e registri base anche offline.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "Ogni pasto suggerito include calorie, proteine, carboidrati, grassi e guida porzioni.",
    "Yes. You can connect supported platforms like Apple Health, Google Fit, Fitbit, and Samsung Health.": "Si. Puoi collegare piattaforme supportate come Apple Health, Google Fit, Fitbit e Samsung Health.",
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
    <img   src={FIGMA_ASSETS.GooglePlay} alt="" />
  )
}

function AppleIcon() {
  return (
    <img src={FIGMA_ASSETS.AppStore} alt="" />
  )
}

function StoreButtons({ copy }: { copy: TranslationCopy }) {
  return (
    <div className="lp-store-row" aria-label="Store links">
      <a className="lp-store-btn" href={GOOGLE_PLAY_URL} role="button" target="_blank" rel="noopener noreferrer">
        
          <GooglePlayIcon />
      
        {/* <span className="lp-store-copy">
          <small>{copy.storeGoogleSmall}</small>
          <strong>{copy.storeGoogleLarge}</strong>
        </span> */}
      </a>
      <a className="lp-store-btn" href={APP_STORE_URL} role="button" target="_blank" rel="noopener noreferrer">

          <AppleIcon />
      
       
      </a>
    </div>
  )
}

function QrCard({ label }: { label: string }) {
  return (
    <div className="lp-qr-card">
      <img className="lp-qr-image" src="/assets/qr-code.png" alt={label} />
      <p>{label}</p>
    </div>
  )
}

function DownloadArt({ isDark }: { isDark: boolean }) {
  if (!isDark) {
    return <img src={FIGMA_ASSETS.downloadObjects} alt="" className="lp-download-composite" loading="lazy" decoding="async" />
  }

  return (
    <div className="lp-download-stage">
      <div className="lp-download-glow lp-download-glow--primary" />
      <div className="lp-download-glow lp-download-glow--secondary" />
      <img src={FIGMA_ASSETS.downloadDecor} alt="" className="lp-download-floaters" loading="lazy" decoding="async" />
      <img src={FIGMA_ASSETS.downloadPhone} alt="" className="lp-download-phone" loading="lazy" decoding="async" />
      <img src={FIGMA_ASSETS.downloadTrophy} alt="" className="lp-download-trophy" loading="lazy" decoding="async" />
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

export default function LandingPage({ lang, variant }: LandingPageProps) {
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
  const ts = (text: string) => translateStaticText(language, text)
  const aiTitleSuffix = copy.aiTitle.replace(/^CalKilo-AI[:：]\s*/u, '')
  const languageFontFamily = LANGUAGE_FONT_FAMILIES[language]
  const languageDisplayFontFamily = LANGUAGE_DISPLAY_FONT_FAMILIES[language]

  const heroSlides = useMemo(
    () =>
      isDark
        ? [FIGMA_ASSETS.heroSlideOne, FIGMA_ASSETS.heroSlideTwoDark]
        : [FIGMA_ASSETS.heroSlideOne, FIGMA_ASSETS.heroSlideTwoLight],
    [isDark],
  )

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
    const interval = window.setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [heroSlides.length])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % FEATURE_ITEMS.length)
    }, 5200)

    return () => window.clearInterval(interval)
  }, [])

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
  const contactHref = toLocalizedPath('/contact', language)
  const pricingOfferUrl = pricingHref.startsWith('#') ? `${SITE_URL}${seoPath}${pricingHref}` : `${SITE_URL}${pricingHref}`
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
        { label: 'AI Calorie Tracker', href: RESOURCE_LINKS[0].href },
      ],
    },
    {
      title: ts('Support'),
      links: [
        { label: ts('Privacy Policy'), href: toLocalizedPath('/privacy-policy', language) },
        { label: ts('Terms of Service'), href: toLocalizedPath('/terms-of-service', language) },
        { label: ts('Delete Account & Data'), href: toLocalizedPath('/account-deletion', language) },
        { label: ts('Terms & Conditions'), href: toLocalizedPath('/terms-and-conditions', language) },
        { label: ts('FAQ'), href: '/faq/' },
      ],
    },
    {
      title: ts('Get in Touch'),
      links: [
        { label: ts('Contact'), href: contactHref },
        { label: 'Photo Calorie Calculator', href: RESOURCE_LINKS[1].href },
        { label: 'Macro Tracker', href: RESOURCE_LINKS[2].href },
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
        name: 'Calkilo',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/logo.png`,
        sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@calkilo.app',
            url: `${SITE_URL}${toLocalizedPath('/contact', language)}`,
            availableLanguage: [language],
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
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
          '@type': 'WebSite',
          name: 'Calkilo',
          url: SITE_URL,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Calkilo',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'iOS, Android',
        description: copy.pageDescription,
        url: `${SITE_URL}${seoPath}`,
        inLanguage: language,
        isAccessibleForFree: true,
        sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
        featureList: FEATURE_ITEMS.map((item) => ts(item.title)),
        offers: [
          {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: '0',
            availability: 'https://schema.org/InStock',
            url: pricingOfferUrl,
          },
          ...PRICING_PLANS.map((plan) => ({
            '@type': 'Offer',
            name: ts(plan.title),
            priceCurrency: 'USD',
            price: plan.price.replace('$', ''),
            availability: 'https://schema.org/InStock',
            url: pricingOfferUrl,
          })),
        ],
      },
      ...(!isDarkVariantPage
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              inLanguage: language,
              mainEntity: FAQ_ITEMS.map((item) => ({
                '@type': 'Question',
                name: ts(item.question),
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: ts(item.answer),
                },
              })),
            },
          ]
        : []),
    ],
    [copy.pageDescription, isDarkVariantPage, language, pricingOfferUrl, seoPath, seoTitle],
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

      <main id="home">
        <section className="lp-hero">
          <div className="lp-container lp-hero-grid">
            <div className="lp-hero-copy lp-reveal lp-reveal--left">
              <h1>
                {copy.heroTitleA}
                <span>{copy.heroTitleB}</span>
              </h1>
              <p>{copy.heroDescription}</p>
              <div className="lp-store-label">{copy.availableOn}</div>
              <StoreButtons copy={copy} />
            </div>

            <div className="lp-hero-media lp-reveal lp-reveal--right" aria-hidden="true">
              <div className="lp-hero-glow" />
              <div className="lp-hero-orbit lp-hero-orbit--one" />
              <div className="lp-hero-orbit lp-hero-orbit--two" />
              {heroSlides.map((slide, index) => (
                <img
                  key={slide}
                  src={slide}
                  alt=""
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  className={`lp-hero-slide${index === heroSlide ? ' is-active' : ''}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-ai" id="features">
          <div className="lp-container lp-ai-grid">
            <div className="lp-ai-screen-wrap lp-reveal lp-reveal--left" aria-hidden="true">
              <div className="lp-ai-screen-glow" />
              <div className="lp-ai-screen-stage">
                {FEATURE_ITEMS.map((item, index) => (
                  <img
                    key={item.title}
                    src={item.screen}
                    alt=""
                    className={`lp-ai-screen${activeFeature === index ? ' is-active' : ''}`}
                    loading="eager"
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'low'}
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
                  <img src={FIGMA_ASSETS.nutrientFood} alt="" loading="lazy" decoding="async" />
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
                <img src={FIGMA_ASSETS.mealCheese} alt={ts('Cheese, Bread')} loading="lazy" decoding="async" />
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
                <img src={FIGMA_ASSETS.mealKebab} alt={ts('Kebab, Tomato & Basil')} loading="lazy" decoding="async" />
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
                    <img src={step.image} alt={ts(step.title)} loading="lazy" decoding="async" />
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
              <img src={FIGMA_ASSETS.showcasePhoneDark} alt="" className="lp-style-phone back" loading="lazy" decoding="async" />
              <img src={FIGMA_ASSETS.showcasePhoneLight} alt="" className="lp-style-phone front" loading="lazy" decoding="async" />
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
              {INTEGRATIONS.map((integration, index) => (
                <article
                  key={integration.name}
                  className="lp-integration-card lp-reveal lp-reveal--pop"
                  style={{ '--stagger-index': index } as CSSProperties}
                >
                  <div className="lp-integration-mark" aria-hidden="true">
                    <img src={integration.icon} alt="" className="lp-integration-icon" loading="lazy" />
                  </div>
                  <h3>{ts(integration.name)}</h3>
                  <p>{ts(integration.description)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-testimonials">
          <div
            className="lp-testimonials-bg"
            aria-hidden="true"
            style={{
              backgroundImage: `url(${isDark ? FIGMA_ASSETS.testimonialPatternDark : FIGMA_ASSETS.testimonialPatternLight})`,
            }}
          />

          <div className="lp-container">
            <header className="lp-section-head lp-reveal">
              <h2>
                {copy.testimonialsTitleA} <span>{copy.testimonialsTitleB}</span>
              </h2>
            </header>

            <div className="lp-testimonial-stage">
              <img
                src={FIGMA_ASSETS.avocadoAccent}
                alt=""
                className="lp-testimonial-avocado lp-reveal lp-reveal--pop"
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
              <div className="lp-testimonial-grid">
                {TESTIMONIALS.map((review, index) => (
                  <article
                    key={review.author}
                    className="lp-testimonial-card lp-reveal"
                    style={{ '--stagger-index': index } as CSSProperties}
                  >
                    <h3>{ts(review.title)}</h3>
                    <p>{ts(review.body)}</p>
                    <footer>{review.author}</footer>
                  </article>
                ))}
              </div>
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
                    <span>{plan.price}</span>
                    <small>{plan.oldPrice}</small>
                  </div>
                  <ul>
                    <li>{ts('Personalized meal plans')}</li>
                    <li>{ts('Smart grocery shopping lists')}</li>
                    <li>{ts('Nutritional insights')}</li>
                    <li>{ts('Dietary preference settings')}</li>
                    <li>{ts('Mobile-friendly interface')}</li>
                    <li>{ts('Customer support')}</li>
                  </ul>
                  <button type="button">{ts(plan.cta)}</button>
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
                  <img src={item.icon} alt="" className="lp-community-icon" loading="lazy" />
                  <h3>{ts(item.title)}</h3>
                  <p>{ts(item.description)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {language === 'en' ? (
          <section className="lp-section lp-guides" aria-labelledby="search-guides-title">
            <div className="lp-container lp-guides-wrap">
              <header className="lp-section-head lp-guides-head lp-reveal">
                <p className="lp-kicker">Popular Pages</p>
                <h2 id="search-guides-title">
                  Explore the pages people <span>look for most</span>
                </h2>
                <p>{POPULAR_PAGES_INTRO}</p>
              </header>

              <div className="lp-guides-grid">
                {ENGLISH_POPULAR_PAGE_LINKS.map((resource, index) => (
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
                      Read guide
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
              <StoreButtons copy={copy} />
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
      </main>

      <SiteFooter
        copyright={`© ${new Date().getFullYear()} Calkilo. ${ts('All rights reserved.')}`}
        description={copy.footerDescription}
        featuredContent={<BoworaBadge />}
        homeAriaLabel="Calkilo home"
        homeHref={seoPath}
        id="contact"
        sections={landingFooterSections}
        socialLinksLabel="Social links"
      />
    </div>
  )
}
