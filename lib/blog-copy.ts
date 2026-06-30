import { normalizeBlogLanguage } from './blog'
import { type SiteLanguage } from './site-language'

interface BlogCopy {
  archiveHeading: string
  archiveIntro: string
  archiveSeoDescription: string
  archiveSeoTitle: string
  backToBlog: string
  contentUnavailable: string
  detailErrorText: string
  detailErrorTitle: string
  detailLoadingIntro: string
  detailLoadingTitle: string
  emptyText: string
  emptyTitle: string
  errorText: string
  errorTitle: string
  fallbackImageAlt: string
  featured: string
  latestIntro: string
  latestKicker: string
  latestTitleA: string
  latestTitleB: string
  loading: string
  navLabel: string
  published: string
  readArticle: string
  retry: string
  viewAll: string
}

const BLOG_COPY: Record<SiteLanguage, BlogCopy> = {
  en: {
    archiveHeading: 'Calkilo blog',
    archiveIntro: 'Latest practical guides for calorie tracking, meal planning, macros, and nutrition habits.',
    archiveSeoDescription:
      'Read Calkilo blog posts about meal planning, macro tracking, food photos, and practical nutrition habits.',
    archiveSeoTitle: 'Calkilo Blog | Nutrition and AI Calorie Tracking Guides',
    backToBlog: 'Back to blog',
    contentUnavailable: 'Article content is not available yet.',
    detailErrorText: 'This article could not be loaded right now.',
    detailErrorTitle: 'Article unavailable',
    detailLoadingIntro: 'Fetching the latest localized post from Calkilo.',
    detailLoadingTitle: 'Loading article',
    emptyText: 'Published blog posts will appear here when they are available.',
    emptyTitle: 'No posts yet',
    errorText: 'Please try again in a moment.',
    errorTitle: 'Unable to load posts',
    fallbackImageAlt: 'Calkilo blog article',
    featured: 'Featured',
    latestIntro:
      'Read practical Calkilo posts about food logging, macros, meal planning, and sustainable nutrition habits.',
    latestKicker: 'Blog',
    latestTitleA: 'Latest nutrition',
    latestTitleB: 'guides',
    loading: 'Loading posts...',
    navLabel: 'Blog',
    published: 'Published',
    readArticle: 'Read article',
    retry: 'Retry',
    viewAll: 'View all posts',
  },
  nl: {
    archiveHeading: 'Calkilo blog',
    archiveIntro: 'Praktische gidsen over calorieen, maaltijdplanning, macro’s en voedingsgewoonten.',
    archiveSeoDescription:
      'Lees Calkilo blogposts over maaltijdplanning, macrotracking, voedselfoto’s en praktische voeding.',
    archiveSeoTitle: 'Calkilo Blog | Gidsen voor voeding en AI calorie tracking',
    backToBlog: 'Terug naar blog',
    contentUnavailable: 'De artikelinhoud is nog niet beschikbaar.',
    detailErrorText: 'Dit artikel kan nu niet worden geladen.',
    detailErrorTitle: 'Artikel niet beschikbaar',
    detailLoadingIntro: 'De nieuwste gelokaliseerde Calkilo post wordt opgehaald.',
    detailLoadingTitle: 'Artikel laden',
    emptyText: 'Gepubliceerde blogposts verschijnen hier zodra ze beschikbaar zijn.',
    emptyTitle: 'Nog geen posts',
    errorText: 'Probeer het over een moment opnieuw.',
    errorTitle: 'Posts kunnen niet worden geladen',
    fallbackImageAlt: 'Calkilo blogartikel',
    featured: 'Uitgelicht',
    latestIntro: 'Lees praktische Calkilo posts over loggen, macro’s, maaltijdplanning en gezonde gewoonten.',
    latestKicker: 'Blog',
    latestTitleA: 'Nieuwste voedings',
    latestTitleB: 'gidsen',
    loading: 'Posts laden...',
    navLabel: 'Blog',
    published: 'Gepubliceerd',
    readArticle: 'Lees artikel',
    retry: 'Opnieuw',
    viewAll: 'Alle posts',
  },
  ru: {
    archiveHeading: 'Блог Calkilo',
    archiveIntro: 'Практические материалы о калориях, планировании питания, макросах и привычках.',
    archiveSeoDescription:
      'Читайте статьи Calkilo о планировании питания, отслеживании макросов, фото еды и полезных привычках.',
    archiveSeoTitle: 'Блог Calkilo | Гиды по питанию и AI трекингу калорий',
    backToBlog: 'Назад в блог',
    contentUnavailable: 'Содержимое статьи пока недоступно.',
    detailErrorText: 'Не удалось загрузить эту статью сейчас.',
    detailErrorTitle: 'Статья недоступна',
    detailLoadingIntro: 'Загружаем локализованную статью Calkilo.',
    detailLoadingTitle: 'Загрузка статьи',
    emptyText: 'Опубликованные статьи появятся здесь, когда будут доступны.',
    emptyTitle: 'Пока нет статей',
    errorText: 'Повторите попытку через несколько минут.',
    errorTitle: 'Не удалось загрузить статьи',
    fallbackImageAlt: 'Статья блога Calkilo',
    featured: 'Избранное',
    latestIntro: 'Читайте практические статьи Calkilo о дневнике питания, макросах, планировании и привычках.',
    latestKicker: 'Блог',
    latestTitleA: 'Новые гиды',
    latestTitleB: 'по питанию',
    loading: 'Загрузка статей...',
    navLabel: 'Блог',
    published: 'Опубликовано',
    readArticle: 'Читать статью',
    retry: 'Повторить',
    viewAll: 'Все статьи',
  },
  zh: {
    archiveHeading: 'Calkilo 博客',
    archiveIntro: '关于热量追踪、膳食计划、宏量营养和饮食习惯的实用指南。',
    archiveSeoDescription: '阅读 Calkilo 关于膳食计划、宏量营养追踪、食物照片和实用营养习惯的文章。',
    archiveSeoTitle: 'Calkilo 博客 | 营养和 AI 热量追踪指南',
    backToBlog: '返回博客',
    contentUnavailable: '文章内容暂不可用。',
    detailErrorText: '目前无法加载这篇文章。',
    detailErrorTitle: '文章不可用',
    detailLoadingIntro: '正在获取最新的 Calkilo 本地化文章。',
    detailLoadingTitle: '正在加载文章',
    emptyText: '已发布的博客文章将在可用时显示在这里。',
    emptyTitle: '暂无文章',
    errorText: '请稍后再试。',
    errorTitle: '无法加载文章',
    fallbackImageAlt: 'Calkilo 博客文章',
    featured: '精选',
    latestIntro: '阅读 Calkilo 关于食物记录、宏量营养、膳食计划和可持续饮食习惯的实用文章。',
    latestKicker: '博客',
    latestTitleA: '最新营养',
    latestTitleB: '指南',
    loading: '正在加载文章...',
    navLabel: '博客',
    published: '发布于',
    readArticle: '阅读文章',
    retry: '重试',
    viewAll: '查看全部',
  },
  ar: {
    archiveHeading: 'مدونة Calkilo',
    archiveIntro: 'أدلة عملية لتتبع السعرات، تخطيط الوجبات، الماكروز، وعادات التغذية.',
    archiveSeoDescription:
      'اقرأ مقالات Calkilo عن تخطيط الوجبات، تتبع الماكروز، صور الطعام، وعادات التغذية العملية.',
    archiveSeoTitle: 'مدونة Calkilo | أدلة التغذية وتتبع السعرات بالذكاء الاصطناعي',
    backToBlog: 'العودة إلى المدونة',
    contentUnavailable: 'محتوى المقال غير متاح بعد.',
    detailErrorText: 'تعذر تحميل هذا المقال الآن.',
    detailErrorTitle: 'المقال غير متاح',
    detailLoadingIntro: 'يتم جلب أحدث مقال مترجم من Calkilo.',
    detailLoadingTitle: 'جار تحميل المقال',
    emptyText: 'ستظهر المقالات المنشورة هنا عندما تكون متاحة.',
    emptyTitle: 'لا توجد مقالات بعد',
    errorText: 'حاول مرة أخرى بعد قليل.',
    errorTitle: 'تعذر تحميل المقالات',
    fallbackImageAlt: 'مقال من مدونة Calkilo',
    featured: 'مميز',
    latestIntro: 'اقرأ مقالات Calkilo العملية عن تسجيل الطعام، الماكروز، تخطيط الوجبات، وعادات التغذية.',
    latestKicker: 'المدونة',
    latestTitleA: 'أحدث أدلة',
    latestTitleB: 'التغذية',
    loading: 'جار تحميل المقالات...',
    navLabel: 'المدونة',
    published: 'نشر في',
    readArticle: 'قراءة المقال',
    retry: 'إعادة المحاولة',
    viewAll: 'عرض كل المقالات',
  },
  fa: {
    archiveHeading: 'بلاگ Calkilo',
    archiveIntro: 'راهنماهای کاربردی برای کالری، برنامه غذایی، ماکروها و عادت‌های تغذیه.',
    archiveSeoDescription:
      'مقاله‌های Calkilo درباره برنامه غذایی، پیگیری ماکروها، عکس غذا و عادت‌های کاربردی تغذیه را بخوانید.',
    archiveSeoTitle: 'بلاگ Calkilo | راهنماهای تغذیه و کالری شماری هوش مصنوعی',
    backToBlog: 'بازگشت به بلاگ',
    contentUnavailable: 'محتوای مقاله هنوز در دسترس نیست.',
    detailErrorText: 'این مقاله فعلا بارگذاری نشد.',
    detailErrorTitle: 'مقاله در دسترس نیست',
    detailLoadingIntro: 'در حال دریافت تازه‌ترین مقاله محلی سازی شده Calkilo.',
    detailLoadingTitle: 'در حال بارگذاری مقاله',
    emptyText: 'مقاله‌های منتشر شده وقتی آماده باشند اینجا نمایش داده می‌شوند.',
    emptyTitle: 'هنوز مقاله‌ای نیست',
    errorText: 'لطفا کمی بعد دوباره تلاش کنید.',
    errorTitle: 'مقاله‌ها بارگذاری نشدند',
    fallbackImageAlt: 'مقاله بلاگ Calkilo',
    featured: 'ویژه',
    latestIntro: 'مقاله‌های کاربردی Calkilo درباره ثبت غذا، ماکروها، برنامه غذایی و عادت‌های پایدار تغذیه.',
    latestKicker: 'بلاگ',
    latestTitleA: 'تازه‌ترین راهنماهای',
    latestTitleB: 'تغذیه',
    loading: 'در حال بارگذاری مقاله‌ها...',
    navLabel: 'بلاگ',
    published: 'منتشر شده',
    readArticle: 'خواندن مقاله',
    retry: 'تلاش دوباره',
    viewAll: 'همه مقاله‌ها',
  },
  it: {
    archiveHeading: 'Blog Calkilo',
    archiveIntro: 'Guide pratiche per calorie, pianificazione pasti, macro e abitudini nutrizionali.',
    archiveSeoDescription:
      'Leggi articoli Calkilo su pianificazione pasti, macro, foto del cibo e abitudini nutrizionali pratiche.',
    archiveSeoTitle: 'Blog Calkilo | Guide nutrizione e tracking calorie AI',
    backToBlog: 'Torna al blog',
    contentUnavailable: 'Il contenuto dell’articolo non è ancora disponibile.',
    detailErrorText: 'Questo articolo non può essere caricato ora.',
    detailErrorTitle: 'Articolo non disponibile',
    detailLoadingIntro: 'Caricamento dell’articolo localizzato più recente da Calkilo.',
    detailLoadingTitle: 'Caricamento articolo',
    emptyText: 'Gli articoli pubblicati appariranno qui appena disponibili.',
    emptyTitle: 'Nessun articolo',
    errorText: 'Riprova tra poco.',
    errorTitle: 'Impossibile caricare gli articoli',
    fallbackImageAlt: 'Articolo del blog Calkilo',
    featured: 'In evidenza',
    latestIntro: 'Leggi articoli pratici Calkilo su diario alimentare, macro, pianificazione pasti e abitudini.',
    latestKicker: 'Blog',
    latestTitleA: 'Nuove guide',
    latestTitleB: 'nutrizionali',
    loading: 'Caricamento articoli...',
    navLabel: 'Blog',
    published: 'Pubblicato',
    readArticle: 'Leggi articolo',
    retry: 'Riprova',
    viewAll: 'Tutti gli articoli',
  },
}

export function getBlogCopy(language: SiteLanguage): BlogCopy {
  return BLOG_COPY[normalizeBlogLanguage(language)]
}
