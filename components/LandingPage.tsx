import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { SITE_URL } from '../lib/seo'
import SeoHead from './SeoHead'

type LandingVariant = 'light' | 'dark'

interface LandingPageProps {
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

const LANGUAGE_OPTIONS = ['en', 'nl', 'ru', 'zh', 'ar', 'fa', 'it'] as const
type SiteLanguage = (typeof LANGUAGE_OPTIONS)[number]

const LANGUAGE_LABELS: Record<SiteLanguage, string> = {
  en: 'English',
  nl: 'Nederlands',
  ru: 'Русский',
  zh: '中文',
  ar: 'العربية',
  fa: 'فارسی',
  it: 'Italiano',
}

const LANGUAGE_FONT_FAMILIES: Record<SiteLanguage, string> = {
  en: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  nl: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  it: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  ru: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  zh: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  ar: "'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif",
  fa: "'Vazirmatn', 'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif",
}

const RTL_LANGUAGES = new Set<SiteLanguage>(['ar', 'fa'])

const LANDING_PAGE_TITLE = 'Calkilo | AI Calorie Tracker & Nutrition App'
const LANDING_PAGE_DESCRIPTION =
  'Calculate calories with AI precision, get personalized meal plans, and track nutrition across all your devices.'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.calkilo.mobile&hl=fa'
const APP_STORE_URL = 'https://apps.apple.com/us/app/calkilo-ai-calorie-counter/id6755718411'
const LANDING_PAGE_KEYWORDS = [
  'ai calorie tracker',
  'nutrition tracking app',
  'meal planning app',
  'photo calorie calculator',
  'calkilo',
]
const LANGUAGE_STORAGE_KEY = 'calkilo-selected-language'

const TRANSLATIONS: Record<
  SiteLanguage,
  {
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
    nav: { home: 'Home', features: 'Features', pricing: 'Choose Plan', contact: 'Contact' },
    tryFree: 'Try for free',
    heroTitleA: 'Calculate Calories with ',
    heroTitleB: 'AI Precision',
    heroDescription:
      "Simply take a photo of your food and let Calkilo's advanced AI instantly calculate accurate calories and nutritional information. No more guessing or manual logging.",
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
    nav: { home: 'خانه', features: 'ویژگی‌ها', pricing: 'انتخاب طرح', contact: 'تماس' },
    tryFree: 'رایگان امتحان کنید',
    heroTitleA: 'محاسبه کالری با',
    heroTitleB: 'دقت هوش مصنوعی',
    heroDescription: 'به سادگی از غذای خود عکس بگیرید تا Calkilo با هوش مصنوعی پیشرفته، کالری و اطلاعات تغذیه‌ای را فوری محاسبه کند.',
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
    communitySubtitle: 'دعوت کنید، به اشتراک بگذارید و با هزاران کاربرِ سلامت‌محور باانگیزه بمانید',
    downloadTitleA: 'آماده تغییر تغذیه خود هستید؟',
    downloadTitleB: 'Calkilo را رایگان دریافت کنید.',
    downloadDescription: 'اپ را دانلود کنید تا کالری را دنبال کنید و به اهداف سلامتی برسید.',
    scanLabel: 'برای دانلود اسکن کنید',
    faqKicker: 'سوالات متداول',
    faqTitleA: 'سوالات',
    faqTitleB: 'متداول',
    faqSubtitle: 'سوالی دارید؟ ما پاسخ داریم',
    faqSupportTitle: 'هنوز سوالی دارید؟',
    faqSupportText: 'تیم پشتیبانی ما آماده است تا کمک کند بهترین نتیجه را از Calkilo بگیرید.',
    faqSupportButton: 'تماس با ما',
    footerDescription: 'انقلابی در پیگیری تغذیه با محاسبه کالری مبتنی بر هوش مصنوعی.',
    storeGoogleSmall: 'دریافت از',
    storeGoogleLarge: 'Google Play',
    storeAppleSmall: 'دانلود از',
    storeAppleLarge: 'App Store',
  },
  it: {
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
    icon: '/assets/figma/f9fc5d99c2586a8ad4c69f78e400402215b3cf0d.webp',
  },
  {
    title: 'Chat & AI Agent',
    description:
      'Chat with support at any time, make changes to meals, receive recipes for different foods and get fast help with your diet.',
  },
  {
    title: 'Personalized Goals',
    description:
      'Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.',
  },
  {
    title: 'Instant Photo Analysis',
    description:
      'Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.',
  },
] as const

function FeatureListIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.30755 24.3331C8.71182 24.3331 8.22833 23.8496 8.22833 23.2538V13.3826C8.22833 12.7869 8.71182 12.3034 9.30755 12.3034C9.90327 12.3034 10.3868 12.7869 10.3868 13.3826V23.2538C10.3868 23.8496 9.90327 24.3331 9.30755 24.3331Z"
          fill="#00D448"
        />
        <path
          d="M9.30755 24.3331C8.71182 24.3331 8.22833 23.8496 8.22833 23.2538V13.3826C8.22833 12.7869 8.71182 12.3034 9.30755 12.3034C9.90327 12.3034 10.3868 12.7869 10.3868 13.3826V23.2538C10.3868 23.8496 9.90327 24.3331 9.30755 24.3331"
          stroke="#00D448"
          strokeLinecap="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.0229 24.3311C15.4272 24.3311 14.9437 23.8476 14.9437 23.2519V8.65661C14.9437 8.06088 15.4272 7.57739 16.0229 7.57739C16.6187 7.57739 17.1022 8.06088 17.1022 8.65661V23.2519C17.1022 23.8476 16.6187 24.3311 16.0229 24.3311Z"
          fill="#00D448"
        />
        <path
          d="M16.0229 24.3311C15.4272 24.3311 14.9437 23.8476 14.9437 23.2519V8.65661C14.9437 8.06088 15.4272 7.57739 16.0229 7.57739C16.6187 7.57739 17.1022 8.06088 17.1022 8.65661V23.2519C17.1022 23.8476 16.6187 24.3311 16.0229 24.3311"
          stroke="#00D448"
          strokeLinecap="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.629 24.3306C22.0333 24.3306 21.5498 23.8471 21.5498 23.2514V18.5978C21.5498 18.0021 22.0333 17.5186 22.629 17.5186C23.2247 17.5186 23.7082 18.0021 23.7082 18.5978V23.2514C23.7082 23.8471 23.2247 24.3306 22.629 24.3306Z"
          fill="#00D448"
        />
        <path
          d="M22.629 24.3306C22.0333 24.3306 21.5498 23.8471 21.5498 23.2514V18.5978C21.5498 18.0021 22.0333 17.5186 22.629 17.5186C23.2247 17.5186 23.7082 18.0021 23.7082 18.5978V23.2514C23.7082 23.8471 23.2247 24.3306 22.629 24.3306"
          stroke="#00D448"
          strokeLinecap="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.2262 2.65881C5.23742 2.65881 2.65881 5.38851 2.65881 9.61615V22.3221C2.65881 26.5498 5.23742 29.2795 9.2262 29.2795H22.7121C26.7023 29.2795 29.2795 26.5498 29.2795 22.3221V9.61615C29.2795 5.38851 26.7023 2.65881 22.7121 2.65881H9.2262ZM22.7117 31.4375H9.22581C4.00673 31.4375 0.5 27.7739 0.5 22.3217V9.61577C0.5 4.16358 4.00673 0.5 9.22581 0.5H22.7117C27.9308 0.5 31.4375 4.16358 31.4375 9.61577V22.3217C31.4375 27.7739 27.9308 31.4375 22.7117 31.4375Z"
          fill="#00D448"
        />
        <path
          d="M9.2262 2.65881V2.15881C7.11334 2.15881 5.33323 2.88483 4.08315 4.20886C2.83582 5.52998 2.15881 7.40087 2.15881 9.61615H2.65881H3.15881C3.15881 7.6038 3.7711 5.99601 4.81027 4.89537C5.84669 3.79764 7.35028 3.15881 9.2262 3.15881V2.65881ZM2.65881 9.61615H2.15881V22.3221H2.65881H3.15881V9.61615H2.65881ZM2.65881 22.3221H2.15881C2.15881 24.5374 2.83582 26.4083 4.08315 27.7294C5.33323 29.0534 7.11334 29.7795 9.2262 29.7795V29.2795V28.7795C7.35028 28.7795 5.84669 28.1406 4.81027 27.0429C3.7711 25.9423 3.15881 24.3345 3.15881 22.3221H2.65881ZM9.2262 29.2795V29.7795H22.7121V29.2795V28.7795H9.2262V29.2795ZM22.7121 29.2795V29.7795C24.8256 29.7795 26.6058 29.0535 27.8557 27.7294C29.1028 26.4082 29.7795 24.5373 29.7795 22.3221H29.2795H28.7795C28.7795 24.3345 28.1675 25.9423 27.1285 27.0429C26.0923 28.1406 24.5888 28.7795 22.7121 28.7795V29.2795ZM29.2795 22.3221H29.7795V9.61615H29.2795H28.7795V22.3221H29.2795ZM29.2795 9.61615H29.7795C29.7795 7.40094 29.1028 5.53004 27.8557 4.20889C26.6058 2.88481 24.8256 2.15881 22.7121 2.15881V2.65881V3.15881C24.5888 3.15881 26.0923 3.79767 27.1285 4.89534C28.1675 5.99595 28.7795 7.60372 28.7795 9.61615H29.2795ZM22.7121 2.65881V2.15881H9.2262V2.65881V3.15881H22.7121V2.65881ZM22.7117 31.4375V30.9375H9.22581V31.4375V31.9375H22.7117V31.4375ZM9.22581 31.4375V30.9375C6.73766 30.9375 4.6918 30.067 3.26695 28.5784C1.84027 27.088 1 24.9396 1 22.3217H0.5H0C0 25.156 0.913097 27.5655 2.54455 29.2699C4.17784 30.9762 6.49488 31.9375 9.22581 31.9375V31.4375ZM0.5 22.3217H1V9.61577H0.5H0V22.3217H0.5ZM0.5 9.61577H1C1 6.99787 1.84027 4.84951 3.26695 3.35905C4.6918 1.87051 6.73766 1 9.22581 1V0.5V0C6.49488 0 4.17784 0.961278 2.54455 2.66757C0.913097 4.37196 0 6.78147 0 9.61577H0.5ZM9.22581 0.5V1H22.7117V0.5V0H9.22581V0.5ZM22.7117 0.5V1C25.1998 1 27.2457 1.87051 28.6706 3.35905C30.0972 4.84951 30.9375 6.99787 30.9375 9.61577H31.4375H31.9375C31.9375 6.78147 31.0244 4.37196 29.3929 2.66757C27.7597 0.961278 25.4426 0 22.7117 0V0.5ZM31.4375 9.61577H30.9375V22.3217H31.4375H31.9375V9.61577H31.4375ZM31.4375 22.3217H30.9375C30.9375 24.9396 30.0972 27.088 28.6706 28.5784C27.2457 30.067 25.1998 30.9375 22.7117 30.9375V31.4375V31.9375C25.4426 31.9375 27.7597 30.9762 29.3929 29.2699C31.0244 27.5655 31.9375 25.156 31.9375 22.3217H31.4375Z"
          fill="#00D448"
        />
      </svg>
    )
  }

  if (index === 1 || index === 2) {
    return (
      <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 21.3333C16.4909 21.3333 16.8889 21.7313 16.8889 22.2222C16.8889 22.7131 16.4909 23.1111 16 23.1111H10.6667C10.1757 23.1111 9.77778 22.7131 9.77778 22.2222C9.77778 21.7313 10.1757 21.3333 10.6667 21.3333H16Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.3333 0C14.8061 0 16 1.19391 16 2.66667C16 3.82732 15.2573 4.81155 14.2222 5.17795V8.44444H17.7778C21.9506 8.44444 25.3333 11.8272 25.3333 16V16.1198C25.4642 16.044 25.6157 16 25.7778 16C26.2687 16 26.6667 16.398 26.6667 16.8889V23.1111C26.6667 23.602 26.2687 24 25.7778 24C25.6156 24 25.4642 23.9552 25.3333 23.8793V24C25.3333 25.7182 23.9404 27.1111 22.2222 27.1111H4.44444C2.72622 27.1111 1.33333 25.7182 1.33333 24V23.8793C1.20242 23.9552 1.05111 24 0.888889 24C0.397969 24 0 23.602 0 23.1111V16.8889C0 16.398 0.397969 16 0.888889 16C1.05095 16 1.2025 16.044 1.33333 16.1198V16C1.33333 11.8272 4.71607 8.44444 8.88889 8.44444H12.4444V5.17795C11.4093 4.81155 10.6667 3.82732 10.6667 2.66667C10.6667 1.19391 11.8606 0 13.3333 0ZM8.88889 11.1111C6.18883 11.1111 4 13.2999 4 16V24C4 24.2455 4.19899 24.4444 4.44444 24.4444H22.2222C22.4677 24.4444 22.6667 24.2455 22.6667 24V16C22.6667 13.2999 20.4778 11.1111 17.7778 11.1111H8.88889Z"
          fill="currentColor"
        />
        <path
          d="M17.9123 13.2826C19.2532 13.1428 20.4444 14.1835 20.4444 15.5317V18.5707C20.4444 18.7927 20.2826 18.9807 20.0625 19.0091C18.9457 19.1533 15.6212 19.556 13.3333 19.556C11.0454 19.556 7.72092 19.1533 6.60417 19.0091C6.38405 18.9807 6.22222 18.7927 6.22222 18.5707V15.5317C6.22228 14.1835 7.41344 13.1428 8.75434 13.2826C10.18 13.4312 11.947 13.5786 13.3333 13.5786C14.7196 13.5786 16.4866 13.4312 17.9123 13.2826ZM13.0694 14.9787C12.7991 14.5695 12.1919 14.5563 11.9045 14.9536L11.8481 15.0456L11.099 16.4813H8C7.75465 16.4813 7.55573 16.6805 7.55556 16.9258C7.55569 17.1711 7.75462 17.3702 8 17.3702H11.2066C11.4713 17.3702 11.7142 17.2229 11.8368 16.9883L12.4696 15.7747L13.5885 18.1567C13.8137 18.6362 14.4659 18.71 14.7925 18.293L15.5148 17.3702H18.6667C18.912 17.3702 19.111 17.1711 19.1111 16.9258C19.1109 16.6805 18.912 16.4813 18.6667 16.4813H15.428C15.2366 16.4814 15.0546 16.5585 14.9219 16.6931L14.8681 16.7539L14.27 17.5169L13.1224 15.0725L13.0694 14.9787Z"
          fill="currentColor"
        />
      </svg>
    )
  }
   if ( index === 2) {
    return (
      <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 21.3333C16.4909 21.3333 16.8889 21.7313 16.8889 22.2222C16.8889 22.7131 16.4909 23.1111 16 23.1111H10.6667C10.1757 23.1111 9.77778 22.7131 9.77778 22.2222C9.77778 21.7313 10.1757 21.3333 10.6667 21.3333H16Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.3333 0C14.8061 0 16 1.19391 16 2.66667C16 3.82732 15.2573 4.81155 14.2222 5.17795V8.44444H17.7778C21.9506 8.44444 25.3333 11.8272 25.3333 16V16.1198C25.4642 16.044 25.6157 16 25.7778 16C26.2687 16 26.6667 16.398 26.6667 16.8889V23.1111C26.6667 23.602 26.2687 24 25.7778 24C25.6156 24 25.4642 23.9552 25.3333 23.8793V24C25.3333 25.7182 23.9404 27.1111 22.2222 27.1111H4.44444C2.72622 27.1111 1.33333 25.7182 1.33333 24V23.8793C1.20242 23.9552 1.05111 24 0.888889 24C0.397969 24 0 23.602 0 23.1111V16.8889C0 16.398 0.397969 16 0.888889 16C1.05095 16 1.2025 16.044 1.33333 16.1198V16C1.33333 11.8272 4.71607 8.44444 8.88889 8.44444H12.4444V5.17795C11.4093 4.81155 10.6667 3.82732 10.6667 2.66667C10.6667 1.19391 11.8606 0 13.3333 0ZM8.88889 11.1111C6.18883 11.1111 4 13.2999 4 16V24C4 24.2455 4.19899 24.4444 4.44444 24.4444H22.2222C22.4677 24.4444 22.6667 24.2455 22.6667 24V16C22.6667 13.2999 20.4778 11.1111 17.7778 11.1111H8.88889Z"
          fill="currentColor"
        />
        <path
          d="M17.9123 13.2826C19.2532 13.1428 20.4444 14.1835 20.4444 15.5317V18.5707C20.4444 18.7927 20.2826 18.9807 20.0625 19.0091C18.9457 19.1533 15.6212 19.556 13.3333 19.556C11.0454 19.556 7.72092 19.1533 6.60417 19.0091C6.38405 18.9807 6.22222 18.7927 6.22222 18.5707V15.5317C6.22228 14.1835 7.41344 13.1428 8.75434 13.2826C10.18 13.4312 11.947 13.5786 13.3333 13.5786C14.7196 13.5786 16.4866 13.4312 17.9123 13.2826ZM13.0694 14.9787C12.7991 14.5695 12.1919 14.5563 11.9045 14.9536L11.8481 15.0456L11.099 16.4813H8C7.75465 16.4813 7.55573 16.6805 7.55556 16.9258C7.55569 17.1711 7.75462 17.3702 8 17.3702H11.2066C11.4713 17.3702 11.7142 17.2229 11.8368 16.9883L12.4696 15.7747L13.5885 18.1567C13.8137 18.6362 14.4659 18.71 14.7925 18.293L15.5148 17.3702H18.6667C18.912 17.3702 19.111 17.1711 19.1111 16.9258C19.1109 16.6805 18.912 16.4813 18.6667 16.4813H15.428C15.2366 16.4814 15.0546 16.5585 14.9219 16.6931L14.8681 16.7539L14.27 17.5169L13.1224 15.0725L13.0694 14.9787Z"
          fill="currentColor"
        />
      </svg>
    )
  }
  if (index === 1){
    return (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 0C6.71625 0 0 6.71625 0 15C0 23.2838 6.71625 30 15 30C23.2838 30 30 23.2838 30 15C30 6.71625 23.2838 0 15 0ZM21.6667 10C22.1524 10 22.5 10.3476 22.5 10.8333V11.6667C22.5 12.1524 22.1524 12.5 21.6667 12.5H20V14C20 14.4857 19.6524 14.8333 19.1667 14.8333C18.681 14.8333 18.3333 14.4857 18.3333 14V12.5H16.6667C16.181 12.5 15.8333 12.1524 15.8333 11.6667C15.8333 11.181 16.181 10.8333 16.6667 10.8333H18V9C18 8.51429 18.3476 8.16667 18.8333 8.16667C19.3191 8.16667 19.6667 8.51429 19.6667 9V10H21.6667Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <span className="lp-feature-icon-photo">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="29.5" fill="white" stroke="white" />
      </svg>
      <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.0826 0.91394C11.8057 0.228821 17.977 0.228713 19.6989 0.91394C20.6386 1.28799 21.2722 1.99613 21.8551 3.05457L22.5104 4.3114C22.5253 4.33623 22.54 4.35803 22.5524 4.37683L22.608 4.453C22.9067 4.7781 23.4063 4.97449 23.736 4.97449C26.8543 4.97464 29.3832 7.50257 29.3834 10.62V19.0184C29.3834 22.9952 26.157 26.2206 22.1803 26.2206H7.60217C3.6245 26.2205 0.400076 22.9956 0.400024 19.0184V10.62C0.400275 7.50248 2.92904 4.97449 6.04749 4.97449C6.37605 4.97444 6.87638 4.7779 7.17542 4.453C7.18139 4.44649 7.18943 4.43654 7.19885 4.42371L7.27307 4.30945L7.92639 3.05457C8.50881 1.99604 9.14254 1.28823 10.0826 0.91394ZM18.7223 2.87683C17.2309 2.45535 12.0444 2.47472 10.8873 2.93445C10.5207 3.08039 10.1935 3.44584 9.83167 4.10339L9.27405 5.18152L9.13635 5.42957C9.02176 5.62017 8.90688 5.7811 8.776 5.92371C8.04206 6.7214 6.95642 7.14832 6.04749 7.14832L5.81018 7.1571C4.00287 7.27931 2.57385 8.78375 2.57385 10.621V19.0184C2.57385 21.7951 4.8252 24.0475 7.60217 24.0477H22.1813C24.9574 24.0476 27.2096 21.7946 27.2096 19.0184V10.621C27.2096 8.70387 25.6542 7.14832 23.736 7.14832L23.484 7.13855C22.6311 7.06837 21.6728 6.64881 21.0065 5.92273C20.8773 5.78203 20.7629 5.62244 20.649 5.43347C20.6327 5.40637 20.6128 5.37019 20.5895 5.328L20.4215 5.01257L19.9518 4.10339C19.5896 3.44571 19.262 3.08046 18.8951 2.93445L18.7223 2.87683Z"
          fill="currentColor"
        />
        <path
          d="M22.868 8.17102L23.037 8.17981C23.8686 8.26429 24.5175 8.96658 24.5175 9.82043C24.5174 10.6663 23.8808 11.3628 23.0604 11.4581L23.0487 11.4601V11.4591L22.8798 11.4689L22.868 11.4698C21.9455 11.4697 21.206 10.7323 21.2059 9.82043C21.2059 8.97464 21.8427 8.27816 22.663 8.18274L22.6757 8.18079L22.8573 8.17102H22.868Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeLinejoin="round"
        />
        <path
          d="M14.8909 9.38416C18.0357 9.38416 20.585 11.9327 20.5852 15.0775C20.5852 18.2225 18.0358 20.7719 14.8909 20.7719C11.7461 20.7717 9.19751 18.2224 9.19751 15.0775C9.19772 11.9328 11.7462 9.38434 14.8909 9.38416ZM14.8918 11.557C12.9474 11.557 11.3713 13.1331 11.3713 15.0775C11.3716 17.0218 12.9475 18.597 14.8918 18.597C16.8359 18.5968 18.4111 17.0216 18.4114 15.0775C18.4114 13.1332 16.8361 11.5573 14.8918 11.557Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
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
    question: 'How much does Eat Planner cost?',
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

const FOOTER_LINKS = [
  {
    title: 'Feature',
    links: [
      { label: 'Download', href: '#download' },
      { label: 'How it Works?', href: '#how-it-works' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Get in Touch',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'About Us', href: '#' },
      { label: 'Our Team', href: '#' },
    ],
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
    "System Preference": "Systeem",
    "Nutrition": "Voeding",
    "Device & App": "Apparaten en app",
    "How much does Eat Planner cost?": "Hoeveel kost Eat Planner?",
    "How does the AI meal planning work?": "Hoe werkt AI-maaltijdplanning?",
    "Can I change my preferences after onboarding?": "Kan ik mijn voorkeuren later aanpassen?",
    "Is my food photo data private and secure?": "Zijn mijn voedselfoto-gegevens prive en veilig?",
    "Do I need internet connection to use the app?": "Heb ik internet nodig om de app te gebruiken?",
    "Do recipes include nutritional information?": "Bevatten recepten voedingsinformatie?",
    "Does it work with my fitness tracker?": "Werkt het met mijn fitness tracker?",
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Begin gratis met basis tracking en gamification. Premium geeft persoonlijke plannen, diepere analyses en AI-coaching.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "De app combineert je doelen, voedingsgeschiedenis en voorkeuren om maaltijdsuggesties te maken die zich aanpassen.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "Ja. Je kunt dieetbeperkingen, smaakvoorkeuren en macrodoelen op elk moment aanpassen in je profiel.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "Uploads zijn versleuteld en worden alleen gebruikt voor je analyse en betere aanbevelingen.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "Fotoanalyse vereist internet, maar je kunt eerdere gegevens en basislogs ook offline bekijken.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "Elke voorgestelde maaltijd bevat calorieen, eiwitten, koolhydraten, vetten en portierichtlijnen.",
    "Yes. You can connect supported platforms like Apple Health, Google Fit, Fitbit, and Samsung Health.": "Ja. Je kunt ondersteunde platforms verbinden zoals Apple Health, Google Fit, Fitbit en Samsung Health.",
    "Feature": "Functies",
    "Download": "Downloaden",
    "How it Works?": "Hoe werkt het?",
    "Support": "Ondersteuning",
    "Privacy Policy": "Privacybeleid",
    "Terms of Service": "Servicevoorwaarden",
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
    "System Preference": "Системные настройки",
    "Nutrition": "Питание",
    "Device & App": "Устройства и приложение",
    "How much does Eat Planner cost?": "Сколько стоит Eat Planner?",
    "How does the AI meal planning work?": "Как работает AI-планирование питания?",
    "Can I change my preferences after onboarding?": "Можно ли изменить настройки после старта?",
    "Is my food photo data private and secure?": "Мои фото еды защищены и приватны?",
    "Do I need internet connection to use the app?": "Нужен ли интернет для работы приложения?",
    "Do recipes include nutritional information?": "Есть ли в рецептах информация о питательности?",
    "Does it work with my fitness tracker?": "Работает ли это с моим фитнес-трекером?",
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Начните бесплатно с базового трекинга и геймификации. Премиум открывает персональные планы, глубокую аналитику и AI-коучинг.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "Приложение объединяет ваши цели, историю питания и предпочтения, чтобы формировать персональные рекомендации.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "Да. Вы можете менять ограничения, вкусовые предпочтения и цели по макроэлементам в настройках профиля.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "Загрузки шифруются и используются только для анализа и улучшения персональных рекомендаций.",
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
    "System Preference": "系统设置",
    "Nutrition": "营养",
    "Device & App": "设备与应用",
    "How much does Eat Planner cost?": "Eat Planner 费用是多少？",
    "How does the AI meal planning work?": "AI 餐食规划如何工作？",
    "Can I change my preferences after onboarding?": "完成引导后可以修改偏好吗？",
    "Is my food photo data private and secure?": "我的食物照片数据是否私密安全？",
    "Do I need internet connection to use the app?": "使用应用需要联网吗？",
    "Do recipes include nutritional information?": "食谱是否包含营养信息？",
    "Does it work with my fitness tracker?": "是否支持我的健身追踪器？",
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "可免费开始使用核心记录和游戏化功能。高级版解锁个性化餐单、深度分析和 AI 教练。",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "应用会结合你的目标、饮食历史和偏好，生成会随数据变化而调整的餐食建议。",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "可以。你可随时在个人设置中更新饮食限制、口味偏好和宏量目标。",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "上传内容会加密，仅用于提供分析结果并优化个性化推荐。",
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
    "System Preference": "إعدادات النظام",
    "Nutrition": "التغذية",
    "Device & App": "الجهاز والتطبيق",
    "How much does Eat Planner cost?": "كم تكلفة Eat Planner؟",
    "How does the AI meal planning work?": "كيف يعمل تخطيط الوجبات بالذكاء الاصطناعي؟",
    "Can I change my preferences after onboarding?": "هل يمكنني تغيير التفضيلات بعد البدء؟",
    "Is my food photo data private and secure?": "هل بيانات صور الطعام خاصة وآمنة؟",
    "Do I need internet connection to use the app?": "هل أحتاج اتصال إنترنت لاستخدام التطبيق؟",
    "Do recipes include nutritional information?": "هل تشمل الوصفات معلومات غذائية؟",
    "Does it work with my fitness tracker?": "هل يعمل مع جهاز تتبع اللياقة الخاص بي؟",
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "ابدأ مجاناً مع التتبع الأساسي واللعب التحفيزي. خطط بريميوم تفتح خطط وجبات مخصصة وتحليلات أعمق وتدريباً بالذكاء الاصطناعي.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "يجمع التطبيق أهدافك وسجل التغذية وتفضيلاتك ليولد اقتراحات وجبات تتكيف مع تغير بياناتك.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "نعم. يمكنك تحديث القيود الغذائية وتفضيلات الذوق وأهداف الماكروز في أي وقت من إعدادات الملف الشخصي.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "يتم تشفير الملفات المرفوعة وتستخدم فقط لتقديم التحليل وتحسين توصياتك الشخصية.",
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
    "Join challenges to stay motivated and earn rewards": "به چالش‌ها بپیوندید تا باانگیزه بمانید و پاداش بگیرید",
    "Share": "اشتراک‌گذاری",
    "Share your achievements and inspire others": "دستاوردهای خود را به اشتراک بگذارید و دیگران را الهام دهید",
    "LeaderBoard": "جدول رتبه‌بندی",
    "Compete with friends and climb the rankings": "با دوستان رقابت کنید و در رتبه‌بندی بالا بروید",
    "Invite your Friends": "دوستان خود را دعوت کنید",
    "Empower your friends and keep progress together": "دوستان خود را توانمند کنید و با هم پیشرفت کنید",
    "Pricing": "قیمت‌گذاری",
    "Meal Planning": "برنامه‌ریزی وعده غذایی",
    "Preferences": "ترجیحات",
    "Security": "امنیت",
    "System Preference": "تنظیمات سیستم",
    "Nutrition": "تغذیه",
    "Device & App": "دستگاه و برنامه",
    "How much does Eat Planner cost?": "هزینه Eat Planner چقدر است؟",
    "How does the AI meal planning work?": "برنامه‌ریزی وعده غذایی با هوش مصنوعی چگونه کار می‌کند؟",
    "Can I change my preferences after onboarding?": "آیا می‌توانم بعد از شروع ترجیحاتم را تغییر دهم؟",
    "Is my food photo data private and secure?": "آیا داده‌های عکس غذای من خصوصی و امن است؟",
    "Do I need internet connection to use the app?": "آیا برای استفاده از برنامه به اینترنت نیاز دارم؟",
    "Do recipes include nutritional information?": "آیا دستورها شامل اطلاعات تغذیه‌ای هستند؟",
    "Does it work with my fitness tracker?": "آیا با دستگاه ردیاب تناسب اندام من کار می‌کند؟",
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "رایگان شروع کنید و از پیگیری پایه و بازی‌سازی استفاده کنید. طرح پریمیوم برنامه غذایی شخصی، تحلیل عمیق و مربی هوش مصنوعی می‌دهد.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "برنامه اهداف، سابقه تغذیه و ترجیحات شما را ترکیب می‌کند و پیشنهادهای غذایی سازگار ارائه می‌دهد.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "بله. می‌توانید محدودیت‌های غذایی، ترجیحات طعم و اهداف ماکرو را هر زمان در پروفایل تغییر دهید.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "آپلودها رمزگذاری می‌شوند و فقط برای تحلیل و بهبود پیشنهادهای شخصی شما استفاده می‌شوند.",
    "Photo analysis needs internet, but you can still review previous data and basic logs while offline.": "تحلیل عکس به اینترنت نیاز دارد، اما داده‌های قبلی و ثبت‌های پایه را آفلاین هم می‌توانید ببینید.",
    "Each suggested meal includes calories, protein, carbs, fats, and portion guidance.": "هر وعده پیشنهادی شامل کالری، پروتئین، کربوهیدرات، چربی و راهنمای مقدار است.",
    "Yes. You can connect supported platforms like Apple Health, Google Fit, Fitbit, and Samsung Health.": "بله. می‌توانید پلتفرم‌های پشتیبانی‌شده مانند Apple Health و Google Fit و Fitbit و Samsung Health را متصل کنید.",
    "Feature": "ویژگی‌ها",
    "Download": "دانلود",
    "How it Works?": "چگونه کار می‌کند؟",
    "Blog": "وبلاگ",
    "Support": "پشتیبانی",
    "Privacy Policy": "سیاست حریم خصوصی",
    "Terms of Service": "شرایط خدمات",
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
    "System Preference": "Impostazioni sistema",
    "Nutrition": "Nutrizione",
    "Device & App": "Dispositivo e app",
    "How much does Eat Planner cost?": "Quanto costa Eat Planner?",
    "How does the AI meal planning work?": "Come funziona la pianificazione pasti con AI?",
    "Can I change my preferences after onboarding?": "Posso cambiare le preferenze dopo l'onboarding?",
    "Is my food photo data private and secure?": "I dati delle foto del cibo sono privati e sicuri?",
    "Do I need internet connection to use the app?": "Serve internet per usare l'app?",
    "Do recipes include nutritional information?": "Le ricette includono informazioni nutrizionali?",
    "Does it work with my fitness tracker?": "Funziona con il mio fitness tracker?",
    "Start free with core tracking and gamification. Premium plans unlock personalized meal plans, deeper analytics, and AI coaching.": "Inizia gratis con tracciamento base e gamification. I piani premium sbloccano piani personalizzati, analisi avanzate e coaching AI.",
    "The app combines your goals, nutrition history, and preferences to generate meal suggestions that adjust as your data changes.": "L'app combina obiettivi, storico nutrizionale e preferenze per suggerire pasti che si adattano ai tuoi dati.",
    "Yes. You can update dietary restrictions, taste preferences, and macro targets any time from profile settings.": "Si. Puoi aggiornare restrizioni alimentari, gusti e obiettivi macro in qualsiasi momento dalle impostazioni profilo.",
    "Uploads are encrypted and used only to deliver your analysis and improve your personal recommendations.": "I caricamenti sono crittografati e usati solo per l'analisi e per migliorare i suggerimenti personali.",
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

function BrandLogo() {
  return (
    <span className="lp-brand" aria-label="CalKilo logo">
      <img src={FIGMA_ASSETS.headetLogo} alt="" aria-hidden="true" />
    </span>
  )
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

export default function LandingPage({ variant }: LandingPageProps) {
  const [systemVariant, setSystemVariant] = useState<LandingVariant>(variant)
  const [manualVariant, setManualVariant] = useState<LandingVariant | null>(null)
  const [heroSlide, setHeroSlide] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const [language, setLanguage] = useState<SiteLanguage>('en')
  const [activeNav, setActiveNav] = useState<(typeof NAV_ITEMS)[number]>('home')

  const resolvedVariant: LandingVariant = manualVariant ?? systemVariant
  const isDark = resolvedVariant === 'dark'
  const copy = TRANSLATIONS[language]
  const ts = (text: string) => translateStaticText(language, text)
  const aiTitleSuffix = copy.aiTitle.replace(/^CalKilo-AI[:：]\s*/u, '')
  const languageFontFamily = LANGUAGE_FONT_FAMILIES[language]

  const heroSlides = useMemo(
    () =>
      isDark
        ? [FIGMA_ASSETS.heroSlideOne, FIGMA_ASSETS.heroSlideTwoDark]
        : [FIGMA_ASSETS.heroSlideOne, FIGMA_ASSETS.heroSlideTwoLight],
    [isDark],
  )

  const aiScreens = useMemo(
    () =>
      isDark
        ? [
            { src: FIGMA_ASSETS.aiScreenMain, scale: 1 },
            { src: FIGMA_ASSETS.aiScreenAltOne, scale: 1 },
            { src: FIGMA_ASSETS.aiScreenAltTwo, scale: 1 },
            { src: FIGMA_ASSETS.aiScreenAltThree, scale: 1 },
          ]
        : [
            { src: FIGMA_ASSETS.aiScreenMain, scale: 1 },
            { src: FIGMA_ASSETS.aiScreenAltOne, scale: 1 },
            { src: FIGMA_ASSETS.aiScreenAltTwo, scale: 1 },
            { src: FIGMA_ASSETS.aiScreenAltThree  , scale: 1 },
          ],
    [isDark],
  )

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
    if (typeof window === 'undefined') {
      return
    }

    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (!savedLanguage) {
      return
    }

    if (LANGUAGE_OPTIONS.includes(savedLanguage as SiteLanguage)) {
      setLanguage(savedLanguage as SiteLanguage)
    }
  }, [])

  useEffect(() => {
    setHeroSlide(0)
    setActiveFeature(0)
  }, [resolvedVariant, language])

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = RTL_LANGUAGES.has(language) ? 'rtl' : 'ltr'
  }, [language])

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

  const isDarkVariantPage = variant === 'dark'
  const seoPath = isDarkVariantPage ? '/dark' : '/'
  const seoTitle = isDarkVariantPage ? `${LANDING_PAGE_TITLE} | Dark Theme` : LANDING_PAGE_TITLE

  const landingJsonLd = useMemo<Array<Record<string, unknown>>>(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Calkilo',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/logo.png`,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@calkilo.app',
            url: `${SITE_URL}/contact`,
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seoTitle,
        description: LANDING_PAGE_DESCRIPTION,
        url: `${SITE_URL}${seoPath}`,
        inLanguage: 'en',
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
        description: LANDING_PAGE_DESCRIPTION,
        url: SITE_URL,
        featureList: FEATURE_ITEMS.map((item) => item.title),
        offers: PRICING_PLANS.map((plan) => ({
          '@type': 'Offer',
          name: plan.title,
          priceCurrency: 'USD',
          price: plan.price.replace('$', ''),
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/#pricing`,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
    [seoPath, seoTitle],
  )

  return (
    <div
      className={`lp-page lp-page--${resolvedVariant}`}
      style={{ '--lp-language-font': languageFontFamily } as CSSProperties}
    >
      <SeoHead
        title={seoTitle}
        description={LANDING_PAGE_DESCRIPTION}
        path={seoPath}
        canonicalPath={isDarkVariantPage ? '/' : seoPath}
        keywords={LANDING_PAGE_KEYWORDS}
        noindex={isDarkVariantPage}
        imagePath="/assets/hero-main.png"
        imageAlt="Calkilo AI calorie tracking dashboard"
        jsonLd={landingJsonLd}
      />

      <header className="lp-topbar">
        <div className="lp-container lp-topbar-inner">
          <a className="lp-logo" href="#home" aria-label="CalKilo home">
            <BrandLogo />
          </a>

          <nav className="lp-nav" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={activeNav === item ? 'is-active' : undefined}
                onClick={() => setActiveNav(item)}
              >
                {copy.nav[item]}
              </a>
            ))}
          </nav>

          <div className="lp-topbar-actions">
            <a className="lp-btn lp-btn--solid" href="#download">
              {copy.tryFree}
            </a>
            <label className="lp-lang" aria-label="Language selector">
              <span className="sr-only">{ts('Language')}</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as SiteLanguage)}
                style={{ fontFamily: languageFontFamily }}
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang} value={lang} style={{ fontFamily: LANGUAGE_FONT_FAMILIES[lang] }}>
                    {LANGUAGE_LABELS[lang]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="lp-hero">
          <div className="lp-container lp-hero-grid">
            <div className="lp-hero-copy">
              <h1>
                {copy.heroTitleA}
                <span>{copy.heroTitleB}</span>
              </h1>
              <p>{copy.heroDescription}</p>
              <div className="lp-store-label">{copy.availableOn}</div>
              <StoreButtons copy={copy} />
            </div>

            <div className="lp-hero-media" aria-hidden="true">
              <div className="lp-hero-glow" />
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
            <div className="lp-ai-screen-wrap" aria-hidden="true">
              <div className="lp-ai-screen-glow" />
              <div className="lp-ai-screen-stage">
                <img
                  src={aiScreens[activeFeature].src}
                  alt={ts('CalKilo AI screen')}
                  className="lp-ai-screen"
                  loading="lazy"
                  decoding="async"
                  style={{ '--screen-scale': aiScreens[activeFeature].scale } as CSSProperties}
                />
              </div>
            </div>

            <div className="lp-ai-content">
              <h2>
                CalKilo-AI: {aiTitleSuffix}
              </h2>
              <p>{copy.aiSubtitle}</p>

              <div className="lp-feature-list">
                {FEATURE_ITEMS.map((item, index) => (
                  <button
                    key={item.title}
                    className={`lp-feature-card${activeFeature === index ? ' is-active' : ''}`}
                    onClick={() => setActiveFeature(index)}
                    type="button"
                  >
                    <div className="lp-feature-icon" aria-hidden="true">
                      <FeatureListIcon index={index} />
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
              <div className="lp-nutrients-copy">
                <h2>{copy.nutrientTitle}</h2>
                {/* <div className="lp-time-row">
                  <span className="is-active">07:00</span>
                  <span>10:00</span>
                  <span>13:00</span>
                  <span>18:00</span>
                </div> */}
                <div className="lp-chip-row">
                  <span>{ts('Calories')}</span>
                  <span>{ts('Carbohydrates')}</span>
                  <span>{ts('Proteins')}</span>
                  <span>{ts('Fat')}</span>
                </div>
              </div>

              <div className="lp-nutrients-panel">
                <div className="lp-tilted-food" aria-hidden="true">
                  <img src={FIGMA_ASSETS.nutrientFood} alt="" loading="lazy" decoding="async" />
                </div>
                <article className="lp-requirement-card">
                  <h3>{ts('Nutrients required')}</h3>
                  <p>{ts('nutrients needed in a day')}</p>
                  <ul className="lp-macro-list">
                    <li>
                      <strong>{ts('Calories')}</strong>
                      <span>1100/2000</span>
                    </li>
                    <li>
                      <strong>{ts('Carbohydrates')}</strong>
                      <span>300/325</span>
                    </li>
                    <li>
                      <strong>{ts('Proteins')}</strong>
                      <span>10/75</span>
                    </li>
                    <li>
                      <strong>{ts('Fat')}</strong>
                      <span>25/50</span>
                    </li>
                  </ul>
                </article>
              </div>
            </div>

            <div className="lp-meal-lane">
              <article className="lp-meal-item">
                <img src={FIGMA_ASSETS.mealCheese} alt={ts('Cheese, Bread')} loading="lazy" decoding="async" />
                <div>
                  <h3>{ts('Cheese, Bread')}</h3>
                  <p>{ts('270 Cal')}</p>
                  <small>08:10 am</small>
                </div>
              </article>

              <article className="lp-meal-item lp-meal-item--shift">
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
            <header className="lp-section-head">
              <h2>
                {copy.howTitleA} <span>{copy.howTitleB}</span>
              </h2>
              <p>{copy.howSubtitle}</p>
            </header>

            <div className="lp-how-grid">
              {HOW_STEPS.map((step, index) => (
                <article key={step.title} className="lp-how-card">
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
            <div className="lp-style-copy">
              <h2>{copy.styleTitle}</h2>
              
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

            <div className="lp-style-phones" aria-hidden="true">
              <img src={FIGMA_ASSETS.showcasePhoneDark} alt="" className="lp-style-phone back" loading="lazy" decoding="async" />
              <img src={FIGMA_ASSETS.showcasePhoneLight} alt="" className="lp-style-phone front" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        <section className="lp-section lp-integrations">
          <div className="lp-container">
            <header className="lp-section-head">
              <h2>{copy.integrationsTitle}</h2>
              <p>{copy.integrationsSubtitle}</p>
            </header>

            <div className="lp-integrations-grid">
              {INTEGRATIONS.map((integration) => (
                <article key={integration.name} className="lp-integration-card">
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
            <header className="lp-section-head">
              <h2>
                {copy.testimonialsTitleA} <span>{copy.testimonialsTitleB}</span>
              </h2>
            </header>

            <div className="lp-testimonial-stage">
              <img
                src={FIGMA_ASSETS.avocadoAccent}
                alt=""
                className="lp-testimonial-avocado"
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
              <div className="lp-testimonial-grid">
                {TESTIMONIALS.map((review) => (
                  <article key={review.author} className="lp-testimonial-card">
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
            <header className="lp-section-head">
              <p className="lp-kicker">{copy.pricingKicker}</p>
              <h2>{copy.pricingTitle}</h2>
            </header>

            <div className="lp-pricing-grid">
              {PRICING_PLANS.map((plan) => (
                <article
                  key={plan.title}
                  className={`lp-pricing-card${plan.highlight ? ' is-highlight' : ''}`}
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
            <header className="lp-section-head">
              <h2>{copy.communityTitle}</h2>
              <p>{copy.communitySubtitle}</p>
            </header>

            <div className="lp-community-grid">
              {COMMUNITY_ITEMS.map((item) => (
                <article key={item.title} className="lp-community-card">
                  <img src={item.icon} alt="" className="lp-community-icon" loading="lazy" />
                  <h3>{ts(item.title)}</h3>
                  <p>{ts(item.description)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-download" id="download">
          <div className="lp-container lp-download-grid">
            <div className="lp-download-art" aria-hidden="true">
   
              <img src={FIGMA_ASSETS.downloadObjects} alt="" className="objects" />
             
            </div>

            <div className="lp-download-copy">
              <h2>
                {copy.downloadTitleA}
                <span> {copy.downloadTitleB}</span>
              </h2>
              <p>{copy.downloadDescription}</p>
              <StoreButtons copy={copy} />
              <QrCard label={copy.scanLabel} />
            </div>
          </div>
        </section>

        <section className="lp-section lp-faq" id="faq">
          <div className="lp-container lp-faq-wrap">
            <header className="lp-section-head">
              <p className="lp-kicker">{copy.faqKicker}</p>
              <h2>
                {copy.faqTitleA} <span>{copy.faqTitleB}</span>
              </h2>
              <p>{copy.faqSubtitle}</p>
            </header>

            <div className="lp-faq-list">
              {FAQ_ITEMS.map((item, index) => (
                <details key={item.question} className="lp-faq-item" open={index === 0}>
                  <summary>
                    <span>{ts(item.question)}</span>
                    <span className="lp-faq-topic">{ts(item.topic)}</span>
                  </summary>
                  <p>{ts(item.answer)}</p>
                </details>
              ))}
            </div>

            <aside className="lp-faq-support">
              <h3>{copy.faqSupportTitle}</h3>
              <p>{copy.faqSupportText}</p>
              <button type="button">{copy.faqSupportButton}</button>
            </aside>
          </div>
        </section>
      </main>

      <footer className="lp-footer" id="contact">
        <div className="lp-container lp-footer-grid">
          <section>
            <a className="lp-logo" href="#home" aria-label="CalKilo home">
              <BrandLogo />
            </a>
            <p>
              {copy.footerDescription}
            </p>
            <div className="lp-socials" aria-label="Social links">
              <a href="#" aria-label="X">
                X
              </a>
              <a href="#" aria-label="Telegram">
                Tg
              </a>
              <a href="#" aria-label="LinkedIn">
                In
              </a>
              <a href="#" aria-label="Instagram">
                Ig
              </a>
            </div>
          </section>

          {FOOTER_LINKS.map((section) => (
            <section key={section.title}>
              <h3>{ts(section.title)}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{ts(link.label)}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="lp-copyright">
          © {new Date().getFullYear()} Calkilo. {ts('All rights reserved.')}
        </p>
      </footer>
    </div>
  )
}
