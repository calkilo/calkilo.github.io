import { type ResourcePageDefinition } from './resource-pages'

export type SeoLandingPageKey =
  | 'fa-calorie-counter-with-photo'
  | 'fa-free-photo-calorie-calculator'
  | 'fa-ai-calorie-calculator'
  | 'fa-food-calorie-scanner'
  | 'it-calcolo-calorie-con-foto-gratis'
  | 'it-intelligenza-artificiale-calorie'

export const CALORIE_RELATED_LINKS_FA = [
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
    description: 'مناسب کاربرانی که دنبال شروع رایگان و سریع برای کالری شماری با عکس هستند.',
  },
  {
    href: '/fa/ai-calorie-calculator/',
    label: 'هوش مصنوعی کالری شمار',
    description: 'توضیح اینکه هوش مصنوعی چگونه از عکس غذا کالری، پروتئین، چربی و کربوهیدرات را تخمین می‌زند.',
  },
  {
    href: '/fa/food-calorie-scanner/',
    label: 'اسکن کالری غذا',
    description: 'راهنمای اسکن غذا با دوربین برای ساخت یک تخمین سریع و قابل بررسی.',
  },
] as const

export const SEO_LANDING_PAGES: Record<SeoLandingPageKey, ResourcePageDefinition> = {
  'fa-calorie-counter-with-photo': {
    language: 'fa',
    path: '/fa/calorie-counter-with-photo/',
    title: 'کالری شمار با عکس | محاسبه کالری غذا از روی تصویر - Calkilo',
    description:
      'با کالری شمار با عکس Calkilo از غذای خود عکس بگیرید و کالری، پروتئین، چربی و کربوهیدرات را با هوش مصنوعی تخمین بزنید.',
    heading: 'کالری شمار با عکس',
    intro:
      'کالری شمار با عکس برای زمانی ساخته شده که نمی‌خواهید نام هر غذا، وزن هر ماده و مقدار هر چاشنی را جداگانه وارد کنید. در Calkilo عکس وعده غذایی به یک تخمین قابل بررسی تبدیل می‌شود و شما می‌توانید کالری، پروتئین، چربی و کربوهیدرات را سریع‌تر ثبت کنید.',
    keywords: [
      'کالری شمار با عکس',
      'محاسبه کالری غذا از روی تصویر',
      'برنامه کالری شمار با عکس',
      'کالری شمار غذا آنلاین با عکس',
    ],
    highlights: [
      {
        title: 'ثبت غذا با تصویر',
        body: 'به جای جست‌وجوی دستی، عکس غذا را به نقطه شروع کالری شماری تبدیل کنید.',
      },
      {
        title: 'کالری همراه با ماکرو',
        body: 'نتیجه فقط یک عدد نیست؛ پروتئین، چربی و کربوهیدرات هم در کنار کالری دیده می‌شوند.',
      },
      {
        title: 'مناسب استفاده روزانه',
        body: 'برای رژیم، تناسب اندام، کنترل وعده‌ها و ثبت سریع غذا در روزهای شلوغ کاربرد دارد.',
      },
    ],
    sections: [
      {
        title: 'چرا کالری شمار با عکس محبوب شده است؟',
        paragraphs: [
          'بیشتر افراد مشکل اصلی خود را دانستن مفهوم کالری نمی‌دانند؛ مشکل این است که ثبت کردن هر وعده زمان می‌برد. غذاهای خانگی، غذاهای رستورانی، خوراک‌های ترکیبی و وعده‌هایی که چند ماده دارند در اپ‌های سنتی باید چند بار جست‌وجو و اصلاح شوند. همین اصطکاک باعث می‌شود حتی کاربران با انگیزه هم بعد از چند روز ثبت غذا را کنار بگذارند.',
          'کالری شمار با عکس این فرایند را کوتاه می‌کند. کاربر عکس غذا را می‌گیرد، هوش مصنوعی اجزای قابل مشاهده را تشخیص می‌دهد و یک تخمین اولیه از کالری و ماکروها می‌سازد. این تخمین جای قضاوت کاربر را نمی‌گیرد، بلکه نقطه شروع سریع‌تری برای ثبت وعده فراهم می‌کند.',
        ],
        bullets: [
          'برای غذاهای خانگی و ترکیبی مناسب است',
          'زمان ثبت وعده را کاهش می‌دهد',
          'برای پیگیری کالری و ماکرو در یک مسیر واحد کاربرد دارد',
          'امکان بررسی نتیجه برای وعده‌های پیچیده را حفظ می‌کند',
        ],
      },
      {
        title: 'Calkilo چگونه از عکس غذا استفاده می‌کند؟',
        paragraphs: [
          'در Calkilo عکس غذا به اطلاعات تغذیه‌ای قابل استفاده تبدیل می‌شود. وقتی تصویر واضح باشد و بخش اصلی وعده دیده شود، هوش مصنوعی می‌تواند نوع غذا، ترکیب احتمالی و اندازه تقریبی وعده را تحلیل کند. سپس کالری، پروتئین، چربی و کربوهیدرات به صورت تخمینی نمایش داده می‌شوند.',
          'این نتیجه برای تصمیم‌گیری روزانه طراحی شده است. اگر هدف شما کاهش وزن باشد، می‌توانید ببینید وعده چه سهمی از کالری روزانه دارد. اگر هدف شما ورزش و بدنسازی باشد، مقدار پروتئین و ترکیب ماکروها اهمیت بیشتری پیدا می‌کند. اگر فقط می‌خواهید عادت غذایی خود را بشناسید، ثبت سریع با عکس کمک می‌کند تصویر واقعی‌تری از روزهای معمول داشته باشید.',
        ],
      },
      {
        title: 'چه غذاهایی برای محاسبه با عکس مناسب‌تر هستند؟',
        paragraphs: [
          'غذاهایی که در تصویر واضح دیده می‌شوند، معمولاً برای تخمین سریع مناسب‌ترند. یک بشقاب برنج و کباب، پیتزا، همبرگر، سالاد، ساندویچ یا یک کاسه غذا اگر نور و زاویه خوبی داشته باشد، اطلاعات بیشتری به مدل می‌دهد. در مقابل، غذاهایی که مواد اصلی آن‌ها پنهان است یا مقدار روغن و سس زیادی دارند باید با دقت بیشتری بررسی شوند.',
          'Calkilo برای همین سناریوها به عنوان ابزار تخمین استفاده می‌شود، نه یک ترازو یا آزمایشگاه. کاربر می‌تواند نتیجه را با شناخت خودش از وعده اصلاح کند. مثلاً اگر می‌داند غذا روغن بیشتری داشته یا بخشی از وعده در تصویر نیست، باید آن را هنگام ثبت نهایی در نظر بگیرد.',
        ],
        bullets: [
          'برای پیتزا، برگر، کباب، برنج، سالاد و ساندویچ کاربردی است',
          'برای خورشت‌ها و غذاهای چندلایه بهتر است نتیجه مرور شود',
          'نور خوب و تصویر واضح دقت تخمین را بهتر می‌کند',
          'سس، روغن و مواد پنهان می‌توانند کالری را تغییر دهند',
        ],
      },
      {
        title: 'تفاوت کالری شمار با عکس و کالری شمار دستی',
        paragraphs: [
          'در کالری شمار دستی، کاربر باید خودش غذا را پیدا کند، مقدار را وارد کند و گاهی چند ماده غذایی را جداگانه بسازد. این روش برای افراد دقیق و منظم مناسب است، اما برای بسیاری از کاربران در زندگی روزمره سنگین می‌شود. کالری شمار با عکس هدف دیگری دارد: کاهش زمان شروع ثبت غذا و کمک به استمرار.',
          'بهترین نتیجه زمانی به دست می‌آید که این دو رویکرد با هم ترکیب شوند. عکس غذا سرعت می‌دهد و بررسی انسانی کیفیت داده را بهتر می‌کند. به همین دلیل Calkilo نتیجه را به عنوان تخمین قابل مرور نمایش می‌دهد تا کاربر بتواند آن را در مسیر واقعی رژیم یا برنامه تغذیه خود استفاده کند.',
        ],
      },
      {
        title: 'چطور از این صفحه به بهترین نتیجه برسید؟',
        paragraphs: [
          'برای استفاده بهتر از کالری شمار با عکس، غذا را از زاویه‌ای بگیرید که حجم و اجزای اصلی آن مشخص باشد. اگر نوشیدنی، دسر، نان، سس یا بخش دیگری از وعده در کنار غذا دارید، آن را هم در کادر قرار دهید یا هنگام بررسی نتیجه به یاد داشته باشید. این جزئیات می‌توانند کالری نهایی را تغییر دهند.',
          'اگر تازه شروع کرده‌اید، هدف را روی استمرار بگذارید. لازم نیست هر وعده کاملاً بی‌خطا ثبت شود. ثبت منظم و بررسی منطقی، در عمل برای کنترل وزن و شناخت عادت‌های غذایی ارزشمندتر از چند تخمین پراکنده و بسیار دقیق است.',
        ],
      },
    ],
    faqs: [
      {
        question: 'کالری شمار با عکس برای چه کسانی مناسب است؟',
        answer:
          'برای افرادی که می‌خواهند ثبت غذا را سریع‌تر کنند، وزن کم کنند، ماکروها را دنبال کنند یا فقط تصویر دقیق‌تری از تغذیه روزانه داشته باشند مناسب است.',
      },
      {
        question: 'آیا عکس غذا جای وزن کردن غذا را می‌گیرد؟',
        answer:
          'خیر. عکس غذا یک تخمین سریع می‌دهد. برای دقت بسیار بالا، مخصوصاً در رژیم‌های سخت، وزن کردن و اصلاح دستی همچنان می‌تواند مفید باشد.',
      },
      {
        question: 'آیا Calkilo برای غذاهای ایرانی هم کاربرد دارد؟',
        answer:
          'بله. برای غذاهایی مثل برنج، کباب، خورشت، فلافل، ساندویچ و غذاهای ترکیبی می‌توانید از عکس به عنوان نقطه شروع تخمین استفاده کنید.',
      },
      {
        question: 'آیا کالری شمار با عکس ماکروها را هم نشان می‌دهد؟',
        answer:
          'بله. Calkilo کالری را همراه با پروتئین، چربی و کربوهیدرات تخمین می‌زند تا وعده فقط با یک عدد خلاصه نشود.',
      },
    ],
  },
  'fa-free-photo-calorie-calculator': {
    language: 'fa',
    path: '/fa/free-photo-calorie-calculator/',
    title: 'کالری شمار با عکس رایگان | تخمین کالری غذا با هوش مصنوعی',
    description:
      'با Calkilo رایگان شروع کنید، از غذای خود عکس بگیرید و کالری و ماکروهای وعده را با هوش مصنوعی تخمین بزنید.',
    heading: 'کالری شمار با عکس رایگان',
    intro:
      'اگر دنبال کالری شمار با عکس رایگان هستید، احتمالاً می‌خواهید بدون پیچیدگی و هزینه اولیه ببینید هر وعده حدوداً چند کالری دارد. Calkilo برای همین شروع سریع طراحی شده است: عکس غذا را ثبت می‌کنید، تخمین هوش مصنوعی را می‌بینید و در صورت نیاز نتیجه را مرور می‌کنید.',
    keywords: [
      'کالری شمار با عکس رایگان',
      'محاسبه کالری غذا با عکس رایگان',
      'هوش مصنوعی کالری شمار رایگان',
      'کالری شمار رایگان با عکس',
    ],
    highlights: [
      {
        title: 'شروع رایگان',
        body: 'بدون نیاز به ساختن یک سیستم پیچیده، کالری شماری با عکس را امتحان کنید.',
      },
      {
        title: 'تخمین سریع',
        body: 'از تصویر غذا به کالری، پروتئین، چربی و کربوهیدرات تخمینی برسید.',
      },
      {
        title: 'قابل استفاده برای رژیم',
        body: 'برای کنترل وزن، شناخت وعده‌ها و کاهش اصطکاک ثبت روزانه مناسب است.',
      },
    ],
    sections: [
      {
        title: 'رایگان بودن در کالری شمار با عکس یعنی چه؟',
        paragraphs: [
          'وقتی کاربر عبارت کالری شمار با عکس رایگان را جست‌وجو می‌کند، معمولاً می‌خواهد قبل از پرداخت، اصل تجربه را امتحان کند. یعنی بتواند یک وعده واقعی را ثبت کند، ببیند هوش مصنوعی چه تخمینی می‌دهد و تصمیم بگیرد آیا این روش برای برنامه روزانه‌اش مناسب است یا نه.',
          'Calkilo با همین منطق معرفی می‌شود. شروع استفاده از اپ رایگان است و کاربر می‌تواند مسیر ثبت غذا با عکس را تجربه کند. امکانات پیشرفته‌تر مثل تحلیل عمیق‌تر، برنامه‌ریزی غذایی یا برخی قابلیت‌های پریمیوم ممکن است در طرح‌های پولی ارائه شوند، اما نقطه ورود باید ساده و قابل امتحان باشد.',
        ],
      },
      {
        title: 'چرا ابزار رایگان باید همچنان قابل اعتماد باشد؟',
        paragraphs: [
          'رایگان بودن نباید به معنی محتوای سطحی یا عددهای غیرقابل استفاده باشد. اگر ابزار فقط یک عدد بدون توضیح نشان دهد، کاربر نمی‌داند چقدر می‌تواند به آن تکیه کند. تجربه خوب باید روشن کند که نتیجه یک تخمین است، چه عواملی روی آن اثر می‌گذارند و کاربر چه زمانی باید آن را اصلاح کند.',
          'در Calkilo عکس غذا به کالری و ماکروهای تخمینی تبدیل می‌شود، اما کاربر همچنان باید اندازه وعده، سس، روغن و مواد پنهان را در نظر بگیرد. این شفافیت برای رژیم لاغری و تناسب اندام مهم است، چون تصمیم‌های روزانه بر اساس همین داده‌ها گرفته می‌شوند.',
        ],
        bullets: [
          'نتیجه باید قابل مرور باشد',
          'کالری بدون ماکرو برای بسیاری از کاربران کافی نیست',
          'غذاهای چرب، سس‌دار یا مخلوط نیاز به بررسی بیشتری دارند',
          'هدف اصلی رایگان بودن، کاهش مانع شروع است',
        ],
      },
      {
        title: 'کالری شمار رایگان برای رژیم لاغری',
        paragraphs: [
          'در رژیم لاغری، استمرار معمولاً از دقت کامل مهم‌تر است. اگر ثبت هر وعده سخت باشد، کاربر خیلی زود از برنامه خارج می‌شود. کالری شمار با عکس رایگان کمک می‌کند عادت ثبت غذا ساده‌تر شروع شود و کاربر بدون درگیر شدن با جزئیات زیاد، یک تصویر کلی از کالری روزانه داشته باشد.',
          'البته برای کاهش وزن سالم، فقط کم کردن کالری کافی نیست. کیفیت غذا، پروتئین کافی، فیبر، خواب، فعالیت بدنی و شرایط فردی هم اهمیت دارند. Calkilo با نمایش پروتئین، چربی و کربوهیدرات کمک می‌کند نگاه کاربر فقط روی عدد کالری محدود نشود.',
        ],
      },
      {
        title: 'چه زمانی ممکن است به امکانات بیشتر نیاز داشته باشید؟',
        paragraphs: [
          'بعضی کاربران فقط می‌خواهند چند وعده را سریع بررسی کنند. برای این گروه، شروع رایگان می‌تواند کافی باشد. اما اگر هر روز غذا ثبت می‌کنید، هدف وزنی مشخص دارید، برنامه غذایی می‌خواهید یا می‌خواهید روند پیشرفت را دقیق‌تر ببینید، امکانات پیشرفته‌تر ارزش بیشتری پیدا می‌کنند.',
          'به همین دلیل بهتر است ابتدا با عکس غذا شروع کنید و ببینید این روش در سبک زندگی شما جا می‌افتد یا نه. اگر ثبت غذا سریع‌تر شد و داده‌ها به تصمیم‌های بهتر کمک کردند، استفاده منظم از اپ می‌تواند به بخشی از برنامه تغذیه روزانه تبدیل شود.',
        ],
        bullets: [
          'برای شروع و تست تجربه، نسخه رایگان مفید است',
          'برای تحلیل‌های بلندمدت ممکن است ابزارهای پیشرفته لازم شوند',
          'برای هدف‌های ورزشی، ماکروها اهمیت بیشتری دارند',
          'برای رژیم جدی، بررسی و اصلاح نتیجه ضروری است',
        ],
      },
      {
        title: 'راهنمای استفاده بهتر از Calkilo رایگان',
        paragraphs: [
          'برای گرفتن تخمین بهتر، عکس را با نور مناسب بگیرید و مطمئن شوید کل وعده در تصویر دیده می‌شود. اگر چند بخش غذا جدا هستند، مثل برنج، خوراک، سالاد و نوشیدنی، بهتر است همه آن‌ها در کادر باشند. اگر چیزی بیرون از تصویر است، هنگام بررسی نتیجه آن را فراموش نکنید.',
          'از نتیجه به عنوان نقطه شروع استفاده کنید. حتی اگر تخمین دقیق آزمایشگاهی نباشد، ثبت منظم وعده‌ها می‌تواند الگوی تغذیه شما را روشن‌تر کند. همین آگاهی برای بسیاری از کاربران قدم اول در کاهش وزن، حفظ وزن یا بهبود کیفیت غذاست.',
        ],
      },
    ],
    faqs: [
      {
        question: 'آیا Calkilo کاملاً رایگان است؟',
        answer:
          'شروع استفاده رایگان است، اما برخی امکانات پیشرفته می‌توانند در طرح‌های پریمیوم ارائه شوند. صفحه قیمت‌گذاری اپ جزئیات نهایی را مشخص می‌کند.',
      },
      {
        question: 'آیا برای محاسبه کالری با عکس باید وزن غذا را بدانم؟',
        answer:
          'برای شروع لازم نیست، اما اگر وزن یا مقدار دقیق را بدانید می‌توانید نتیجه را دقیق‌تر بررسی و اصلاح کنید.',
      },
      {
        question: 'آیا نسخه رایگان برای رژیم کافی است؟',
        answer:
          'برای شروع، شناخت وعده‌ها و ثبت سریع غذا مفید است. برای رژیم دقیق‌تر، بررسی نتیجه و استفاده از امکانات تکمیلی می‌تواند کمک کند.',
      },
      {
        question: 'آیا هوش مصنوعی Calkilo مواد مغذی را هم تخمین می‌زند؟',
        answer:
          'بله. Calkilo کالری را همراه با پروتئین، چربی و کربوهیدرات به صورت تخمینی نمایش می‌دهد.',
      },
    ],
  },
  'fa-ai-calorie-calculator': {
    language: 'fa',
    path: '/fa/ai-calorie-calculator/',
    title: 'هوش مصنوعی کالری شمار | محاسبه کالری غذا با AI',
    description:
      'هوش مصنوعی کالری شمار Calkilo با عکس غذا، کالری و ماکروهای وعده را تخمین می‌زند و ثبت روزانه غذا را سریع‌تر می‌کند.',
    heading: 'هوش مصنوعی کالری شمار',
    intro:
      'هوش مصنوعی کالری شمار برای کاربرانی مناسب است که می‌خواهند ثبت غذا را سریع‌تر کنند اما همچنان به کالری و ماکروهای قابل بررسی نیاز دارند. Calkilo از عکس غذا برای ساختن یک تخمین تغذیه‌ای استفاده می‌کند و نتیجه را در مسیر پیگیری روزانه قرار می‌دهد.',
    keywords: [
      'هوش مصنوعی کالری شمار',
      'هوش مصنوعی کالری شمار رایگان',
      'محاسبه کالری غذا با AI',
      'کالری شمار هوشمند',
    ],
    highlights: [
      {
        title: 'تحلیل تصویر غذا',
        body: 'AI نوع غذا، اجزای قابل مشاهده و اندازه تقریبی وعده را بررسی می‌کند.',
      },
      {
        title: 'تخمین تغذیه‌ای',
        body: 'کالری، پروتئین، چربی و کربوهیدرات به صورت تخمینی نمایش داده می‌شوند.',
      },
      {
        title: 'کنترل در دست کاربر',
        body: 'نتیجه قابل مرور است و برای غذاهای پیچیده می‌توانید آن را اصلاح کنید.',
      },
    ],
    sections: [
      {
        title: 'هوش مصنوعی در کالری شماری چه کاری انجام می‌دهد؟',
        paragraphs: [
          'هوش مصنوعی در کالری شماری تلاش می‌کند فاصله بین عکس غذا و اطلاعات تغذیه‌ای را کوتاه کند. مدل تصویر را بررسی می‌کند، غذاها و اجزای قابل مشاهده را تشخیص می‌دهد و بر اساس داده‌های تغذیه‌ای شناخته‌شده، یک تخمین برای کالری و درشت‌مغذی‌ها می‌سازد.',
          'این فرایند با جست‌وجوی دستی فرق دارد. در جست‌وجوی دستی، کاربر باید خودش نام دقیق غذا و مقدار را انتخاب کند. در روش AI، عکس نقطه شروع است و سیستم پیشنهاد اولیه می‌دهد. کاربر بعد از دیدن نتیجه می‌تواند آن را با شناخت خود از وعده مقایسه کند.',
        ],
      },
      {
        title: 'چرا AI باید همراه با بررسی انسانی باشد؟',
        paragraphs: [
          'هیچ مدل تصویری نمی‌تواند همه چیز را از روی عکس بداند. مقدار روغن، سس زیر غذا، مواد داخل یک ساندویچ، وزن دقیق برنج یا میزان پنیر روی پیتزا ممکن است کامل مشخص نباشد. اگر یک اپ این محدودیت را پنهان کند، کاربر به عددی بیش از حد قطعی تکیه می‌کند.',
          'Calkilo نتیجه را به عنوان تخمین قابل بررسی ارائه می‌کند. این نگاه برای سلامتی و رژیم منطقی‌تر است، چون کاربر می‌تواند اطلاعاتی را که در تصویر دیده نمی‌شود وارد ذهنی کند و در صورت نیاز نتیجه را اصلاح کند. هوش مصنوعی سرعت می‌دهد، اما تصمیم نهایی باید قابل فهم باشد.',
        ],
        bullets: [
          'AI سرعت ثبت غذا را زیاد می‌کند',
          'کاربر باید مواد پنهان و اندازه وعده را مرور کند',
          'برای غذاهای ساده دقت معمولاً بهتر است',
          'برای غذاهای ترکیبی اصلاح نتیجه اهمیت بیشتری دارد',
        ],
      },
      {
        title: 'محاسبه کالری غذا با AI برای چه هدف‌هایی مناسب است؟',
        paragraphs: [
          'اگر هدف شما کاهش وزن است، AI کمک می‌کند کالری وعده‌ها را بدون صرف زمان زیاد ببینید. اگر هدف شما بدنسازی یا حفظ عضله است، مقدار پروتئین و ترکیب ماکروها کنار کالری اهمیت پیدا می‌کند. اگر هدف شما فقط آگاهی از تغذیه است، ثبت سریع‌تر می‌تواند الگوهای واقعی غذا خوردن را روشن کند.',
          'این ابزار برای کسانی که در روزهای کاری فرصت ثبت دستی ندارند هم کاربردی است. گرفتن عکس از ناهار، میان‌وعده یا غذای رستوران ساده‌تر از پیدا کردن تک‌تک مواد در بانک غذایی است. همین کاهش زمان می‌تواند استمرار را بهتر کند.',
        ],
      },
      {
        title: 'هوش مصنوعی کالری شمار و دقت نتیجه',
        paragraphs: [
          'دقت نتیجه به چند عامل بستگی دارد: کیفیت تصویر، زاویه دوربین، قابل مشاهده بودن کل غذا، نوع غذا، اندازه وعده و وجود مواد پنهان. غذاهایی مثل تخم‌مرغ، مرغ، برنج، برگر یا پیتزا اگر واضح باشند معمولاً تخمین قابل استفاده‌تری می‌دهند. خورشت‌ها، غذاهای سرخ‌شده و وعده‌های پر از سس نیاز به دقت بیشتری دارند.',
          'بهترین کاربرد AI این است که یک عدد اولیه سریع فراهم کند. سپس کاربر نتیجه را در زمینه هدف خود بررسی می‌کند. اگر برای رقابت ورزشی یا رژیم درمانی نیاز به دقت بالا دارید، بهتر است از ابزارهای تکمیلی و نظر متخصص تغذیه هم استفاده کنید.',
        ],
        bullets: [
          'تصویر واضح و نور مناسب مهم است',
          'مواد پنهان می‌توانند کالری را تغییر دهند',
          'نتیجه تخمینی است و باید قابل اصلاح باشد',
          'برای تصمیم‌های پزشکی یا درمانی کافی نیست',
        ],
      },
      {
        title: 'Calkilo چه چیزی را فراتر از AI ارائه می‌کند؟',
        paragraphs: [
          'یک قابلیت AI به تنهایی کافی نیست. کاربر به لاگ روزانه، هدف تغذیه‌ای، مرور وعده‌ها، ماکروها و مسیر ادامه‌دار نیاز دارد. Calkilo تلاش می‌کند عکس غذا را به بخشی از عادت روزانه تبدیل کند، نه فقط یک آزمایش یک‌باره برای دیدن عدد کالری.',
          'وقتی هر وعده در یک مسیر قابل پیگیری ثبت شود، کاربر می‌تواند تصمیم‌های بعدی را بهتر بگیرد. مثلاً اگر ناهار کالری بیشتری داشته، شام را سبک‌تر انتخاب کند یا اگر پروتئین روزانه کم است، وعده بعدی را آگاهانه‌تر بچیند.',
        ],
      },
    ],
    faqs: [
      {
        question: 'هوش مصنوعی کالری شمار چقدر دقیق است؟',
        answer:
          'دقت به عکس، اندازه وعده و نوع غذا بستگی دارد. نتیجه یک تخمین قابل بررسی است و برای وعده‌های پیچیده بهتر است اصلاح شود.',
      },
      {
        question: 'آیا AI می‌تواند پروتئین و چربی را هم تخمین بزند؟',
        answer:
          'بله. Calkilo علاوه بر کالری، پروتئین، چربی و کربوهیدرات را هم به صورت تخمینی نمایش می‌دهد.',
      },
      {
        question: 'آیا برای استفاده از هوش مصنوعی باید نام غذا را وارد کنم؟',
        answer:
          'نقطه شروع عکس غذاست، اما اگر اطلاعات بیشتری درباره وعده دارید، بررسی و اصلاح نتیجه می‌تواند دقت را بهتر کند.',
      },
      {
        question: 'آیا هوش مصنوعی کالری شمار برای رژیم درمانی کافی است؟',
        answer:
          'خیر. Calkilo ابزار تخمینی و آموزشی است. برای شرایط پزشکی، رژیم درمانی یا نیازهای خاص باید با متخصص مشورت شود.',
      },
    ],
  },
  'fa-food-calorie-scanner': {
    language: 'fa',
    path: '/fa/food-calorie-scanner/',
    title: 'اسکن کالری غذا | تشخیص کالری غذا با عکس',
    description:
      'با اسکن کالری غذا در Calkilo از وعده خود عکس بگیرید و کالری، پروتئین، چربی و کربوهیدرات را با هوش مصنوعی تخمین بزنید.',
    heading: 'اسکن کالری غذا',
    intro:
      'اسکن کالری غذا یعنی به جای تایپ کردن نام غذا، دوربین را به سمت وعده بگیرید و از تصویر برای ساختن تخمین تغذیه‌ای استفاده کنید. Calkilo این تجربه را برای کاربرانی طراحی کرده که می‌خواهند سریع‌تر بدانند یک وعده حدوداً چه مقدار کالری و ماکرو دارد.',
    keywords: ['اسکن کالری غذا', 'تشخیص کالری غذا با عکس', 'اسکن غذا با هوش مصنوعی', 'کالری اسکن غذا'],
    highlights: [
      {
        title: 'اسکن سریع وعده',
        body: 'از غذای خود عکس بگیرید و مسیر ثبت غذا را از همان تصویر شروع کنید.',
      },
      {
        title: 'تشخیص با هوش مصنوعی',
        body: 'AI اجزای قابل مشاهده را بررسی می‌کند و تخمین تغذیه‌ای می‌سازد.',
      },
      {
        title: 'نتیجه قابل بررسی',
        body: 'برای دقت بهتر، مقدار غذا، سس، روغن و مواد پنهان را مرور کنید.',
      },
    ],
    sections: [
      {
        title: 'اسکن کالری غذا چه تفاوتی با جست‌وجوی غذا دارد؟',
        paragraphs: [
          'در جست‌وجوی غذا، باید نام دقیق غذا را بدانید و از بین چند نتیجه مشابه یکی را انتخاب کنید. این کار برای غذاهای ساده قابل قبول است، اما برای وعده‌های واقعی که ترکیبی از چند ماده هستند، زمان‌بر و گاهی گیج‌کننده می‌شود. اسکن کالری غذا تلاش می‌کند این مرحله را با عکس کوتاه‌تر کند.',
          'در Calkilo تصویر غذا ابتدا تحلیل می‌شود و سپس یک تخمین اولیه از کالری و ماکروها ساخته می‌شود. کاربر لازم نیست از صفر شروع کند؛ فقط باید نتیجه را ببیند، آن را با اندازه واقعی وعده مقایسه کند و اگر لازم بود اصلاح کند.',
        ],
      },
      {
        title: 'چه زمانی اسکن غذا بیشترین ارزش را دارد؟',
        paragraphs: [
          'اسکن غذا برای لحظه‌هایی مفید است که ثبت دستی احتمالاً انجام نمی‌شود: ناهار کاری، غذای رستوران، میان‌وعده سریع، سفر، غذای خانگی با چند ماده یا وعده‌ای که دستور دقیق آن را ندارید. در این شرایط، داشتن یک تخمین سریع بهتر از ثبت نکردن کامل وعده است.',
          'این روش همچنین به آگاهی از اندازه وعده کمک می‌کند. بسیاری از کاربران تا زمانی که غذا را ثبت نمی‌کنند، تصور دقیقی از کالری یک بشقاب پیتزا، برگر، کباب با برنج یا فلافل ندارند. اسکن غذا می‌تواند این فاصله بین حدس ذهنی و تخمین تغذیه‌ای را کمتر کند.',
        ],
        bullets: [
          'رستوران و غذای بیرون',
          'غذاهای خانگی بدون دستور دقیق',
          'میان‌وعده‌های سریع در طول روز',
          'وعده‌هایی که چند ماده و چاشنی دارند',
        ],
      },
      {
        title: 'چطور عکس بهتری برای اسکن کالری بگیریم؟',
        paragraphs: [
          'برای نتیجه بهتر، کل وعده را در کادر قرار دهید. اگر غذا روی بشقاب است، تصویر از بالا یا زاویه‌ای نزدیک به بالا معمولاً کمک می‌کند حجم و اجزا بهتر دیده شوند. نور طبیعی یا نور روشن، تشخیص غذا را بهتر می‌کند و تاری تصویر می‌تواند نتیجه را ضعیف کند.',
          'اگر نوشیدنی، نان، دسر، سس یا بخش دیگری از وعده دارید، آن را هم در تصویر قرار دهید. اگر امکانش نیست، هنگام بررسی نتیجه به آن توجه کنید. اسکن غذا فقط چیزهایی را می‌بیند که در تصویر مشخص است و برای مواد پنهان به کمک کاربر نیاز دارد.',
        ],
        bullets: [
          'کل غذا را در کادر قرار دهید',
          'از نور کافی استفاده کنید',
          'عکس خیلی نزدیک یا تار نگیرید',
          'چاشنی‌ها و کنارغذاها را فراموش نکنید',
        ],
      },
      {
        title: 'اسکن کالری برای کاهش وزن و ورزش',
        paragraphs: [
          'برای کاهش وزن، اسکن کالری غذا به شما کمک می‌کند بفهمید وعده‌های معمول چه سهمی از کالری روزانه دارند. اگر هر وعده را سریع‌تر ثبت کنید، احتمال بیشتری دارد که روند را ادامه دهید و بر اساس داده واقعی‌تر تصمیم بگیرید.',
          'برای ورزش و بدنسازی، فقط کالری کافی نیست. مقدار پروتئین، چربی و کربوهیدرات هم مهم است. Calkilo نتیجه را با ماکروها نمایش می‌دهد تا کاربر بتواند وعده را با هدف پروتئین روزانه یا برنامه تمرینی خود مقایسه کند.',
        ],
      },
      {
        title: 'محدودیت‌های اسکن کالری غذا',
        paragraphs: [
          'اسکن کالری غذا یک ابزار تخمینی است. اگر غذای شما زیر لایه‌ای از سس یا پنیر پنهان باشد، اگر مقدار روغن مشخص نباشد یا اگر غذا در ظرف عمیق قرار داشته باشد، نتیجه باید با احتیاط بیشتری بررسی شود. هیچ ابزار تصویری نمی‌تواند همه جزئیات پنهان را کامل ببیند.',
          'بهترین استفاده از Calkilo این است که اسکن را شروع سریع بدانید. نتیجه را ببینید، اگر لازم بود اصلاح کنید و سپس از آن برای پیگیری روزانه استفاده کنید. این ترکیب سرعت و بررسی انسانی، برای بیشتر کاربران عملی‌تر از ورود دستی کامل هر وعده است.',
        ],
      },
    ],
    faqs: [
      {
        question: 'اسکن کالری غذا چیست؟',
        answer:
          'اسکن کالری غذا یعنی استفاده از عکس غذا برای تشخیص نوع وعده و تخمین کالری و مواد مغذی با کمک هوش مصنوعی.',
      },
      {
        question: 'آیا اسکن غذا کالری دقیق می‌دهد؟',
        answer:
          'نتیجه تخمینی است و به کیفیت عکس، اندازه وعده و مواد پنهان بستگی دارد. برای دقت بهتر باید نتیجه را مرور کنید.',
      },
      {
        question: 'آیا می‌توانم غذاهای ایرانی را اسکن کنم؟',
        answer:
          'بله. می‌توانید غذاهایی مثل کباب، برنج، پیتزا، فلافل، ساندویچ و غذاهای خانگی را به عنوان نقطه شروع تخمین اسکن کنید.',
      },
      {
        question: 'آیا اسکن غذا ماکروها را هم نشان می‌دهد؟',
        answer:
          'بله. Calkilo کالری را همراه با پروتئین، چربی و کربوهیدرات تخمین می‌زند.',
      },
    ],
  },
  'it-calcolo-calorie-con-foto-gratis': {
    language: 'it',
    path: '/it/calcolo-calorie-con-foto-gratis/',
    title: 'Calcolo calorie con foto gratis | Calkilo',
    description:
      'Scatta una foto del tuo piatto e stima calorie, proteine, carboidrati e grassi con l’intelligenza artificiale di Calkilo.',
    heading: 'Calcolo calorie con foto gratis',
    intro:
      'Calkilo aiuta a iniziare il tracking alimentare partendo da una foto. L’obiettivo non e sostituire il controllo dell’utente, ma ridurre il tempo necessario per stimare calorie e macro di un pasto reale.',
    keywords: ['calcolo calorie con foto gratis', 'calorie da foto', 'contacalorie con foto', 'app calorie gratis'],
    highlights: [
      {
        title: 'Parti da una foto',
        body: 'Scatta il piatto e usa la stima AI come primo passaggio del diario alimentare.',
      },
      {
        title: 'Calorie e macro',
        body: 'Proteine, carboidrati e grassi sono mostrati insieme alle calorie stimate.',
      },
      {
        title: 'Controllo semplice',
        body: 'Rivedi porzioni, condimenti e ingredienti nascosti prima di usare il dato.',
      },
    ],
    sections: [
      {
        title: 'Perche cercare un calcolo calorie con foto gratis',
        paragraphs: [
          'Molte persone conoscono l’importanza del diario alimentare, ma smettono perche inserire ogni ingrediente richiede troppo tempo. Una foto del pasto riduce il primo attrito: non bisogna partire da una ricerca manuale, ma da un’immagine reale del piatto.',
          'Calkilo rende questa esperienza piu pratica. L’AI analizza cio che si vede, crea una stima di calorie e macronutrienti e permette all’utente di valutare il risultato. La parte gratuita serve soprattutto per provare se questo flusso si adatta alla routine quotidiana.',
        ],
      },
      {
        title: 'Come usare la stima in modo corretto',
        paragraphs: [
          'Il risultato non deve essere letto come un valore di laboratorio. Foto sfocate, piatti coperti, olio, salse e ingredienti nascosti possono cambiare molto le calorie finali. Per questo una buona app deve rendere chiaro che la stima e un punto di partenza.',
          'Per ottenere un risultato migliore conviene fotografare tutto il pasto, usare buona luce e includere contorni, pane, bevande o condimenti quando fanno parte della porzione. Se qualcosa resta fuori dall’immagine, va considerato durante la revisione.',
        ],
        bullets: [
          'Fotografa il piatto intero',
          'Controlla porzioni e ingredienti nascosti',
          'Usa la stima come base, non come numero assoluto',
          'Segui calorie e macro insieme',
        ],
      },
      {
        title: 'Dimagrimento, fitness e consapevolezza alimentare',
        paragraphs: [
          'Per dimagrire, la costanza e spesso piu importante della perfezione. Se il tracking e troppo lento, diventa difficile mantenerlo. Una stima da foto puo aiutare a registrare piu pasti e capire meglio dove vanno le calorie della giornata.',
          'Per il fitness contano anche le macro. Proteine, carboidrati e grassi aiutano a valutare se un pasto e coerente con allenamento, recupero e obiettivi di composizione corporea. Calkilo mostra questi dati insieme alla stima calorica.',
        ],
      },
      {
        title: 'Quando serve una revisione manuale',
        paragraphs: [
          'Piatti misti, cibo fritto, formaggi, salse e dessert possono richiedere piu attenzione. Anche due piatti visivamente simili possono avere calorie diverse se cambiano olio, porzione o metodo di cottura.',
          'Il valore dell’AI sta nel velocizzare il primo passaggio. La revisione dell’utente rende il dato piu utile nella vita reale, soprattutto quando il pasto ha dettagli che una foto non mostra bene.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Calkilo calcola le calorie da una foto gratis?',
        answer:
          'Calkilo permette di iniziare con un flusso gratuito. Alcune funzioni avanzate possono essere disponibili in piani premium.',
      },
      {
        question: 'La stima da foto e precisa?',
        answer:
          'E una stima. La precisione dipende da foto, porzione, ingredienti visibili e condimenti nascosti.',
      },
      {
        question: 'Mostra anche le macro?',
        answer:
          'Si. Calkilo stima calorie, proteine, carboidrati e grassi per dare piu contesto al pasto.',
      },
      {
        question: 'Serve pesare il cibo?',
        answer:
          'Non per iniziare, ma conoscere il peso o la porzione puo aiutare a correggere il risultato.',
      },
    ],
  },
  'it-intelligenza-artificiale-calorie': {
    language: 'it',
    path: '/it/intelligenza-artificiale-calorie/',
    title: 'Intelligenza artificiale calorie | Stima calorie da foto',
    description:
      'Usa l’intelligenza artificiale di Calkilo per stimare calorie e macronutrienti da una foto del cibo.',
    heading: 'Intelligenza artificiale per calorie',
    intro:
      'L’intelligenza artificiale applicata alle calorie aiuta a trasformare una foto del cibo in una stima nutrizionale. Calkilo usa questo approccio per rendere piu rapido il tracking quotidiano senza togliere all’utente il controllo sul risultato.',
    keywords: ['intelligenza artificiale calorie', 'calorie ai', 'calorie da foto ai', 'app nutrizione intelligenza artificiale'],
    highlights: [
      {
        title: 'Analisi del piatto',
        body: 'L’AI interpreta gli elementi visibili e prepara una stima iniziale.',
      },
      {
        title: 'Nutrizione completa',
        body: 'La stima include calorie, proteine, carboidrati e grassi.',
      },
      {
        title: 'Diario piu veloce',
        body: 'La foto riduce il tempo di inserimento rispetto alla ricerca manuale.',
      },
    ],
    sections: [
      {
        title: 'Come l’AI puo stimare le calorie',
        paragraphs: [
          'Un sistema AI parte dall’immagine del pasto. Analizza forme, colori, contesto e alimenti visibili, poi collega queste informazioni a dati nutrizionali per costruire una stima. Il risultato non e una misurazione diretta, ma una previsione informata.',
          'Questo e utile perche molti pasti reali non hanno un’etichetta nutrizionale. Pranzi al ristorante, piatti casalinghi e ricette miste sono difficili da inserire a mano. L’intelligenza artificiale riduce il tempo necessario per arrivare a un dato utilizzabile.',
        ],
      },
      {
        title: 'Perche il controllo dell’utente resta importante',
        paragraphs: [
          'L’AI vede cio che appare nella foto, ma non puo conoscere sempre olio, burro, zucchero, salse o ingredienti nascosti. Anche la dimensione della porzione puo essere difficile da interpretare se manca un riferimento visivo.',
          'Per questo Calkilo tratta la stima come un punto di partenza. L’utente puo valutare se il numero sembra coerente con il pasto e correggere mentalmente o operativamente i dettagli che non erano visibili.',
        ],
        bullets: [
          'Le foto chiare migliorano la stima',
          'Ingredienti nascosti richiedono revisione',
          'La porzione cambia molto il risultato',
          'La stima e utile quando resta modificabile',
        ],
      },
      {
        title: 'Uso quotidiano per dieta e fitness',
        paragraphs: [
          'Chi segue una dieta ha bisogno di continuita. Se registrare il cibo richiede troppi passaggi, il diario resta incompleto. L’intelligenza artificiale puo aiutare a registrare piu pasti e creare un quadro piu realistico della giornata.',
          'Nel fitness, invece, calorie e macro vanno lette insieme. Proteine, carboidrati e grassi aiutano a capire se un pasto supporta allenamento, recupero e composizione corporea. Calkilo mette questi dati nello stesso flusso.',
        ],
      },
      {
        title: 'Limiti realistici dell’intelligenza artificiale',
        paragraphs: [
          'Un’app AI non sostituisce un nutrizionista, una bilancia da cucina o un piano medico. Serve per stimare, imparare e tracciare con meno attrito. Per condizioni cliniche, disturbi alimentari, gravidanza o obiettivi terapeutici e necessario un professionista.',
          'Usata nel modo giusto, pero, l’AI puo rendere il tracking meno pesante. Il vantaggio concreto e abbassare la soglia di ingresso: scattare una foto e piu facile che costruire ogni pasto da zero.',
        ],
      },
    ],
    faqs: [
      {
        question: 'L’intelligenza artificiale puo calcolare le calorie?',
        answer:
          'Puo stimarle da una foto e da dati nutrizionali, ma il risultato resta una stima da controllare.',
      },
      {
        question: 'Calkilo usa AI per le macro?',
        answer:
          'Si. La stima include anche proteine, carboidrati e grassi oltre alle calorie.',
      },
      {
        question: 'Quando la stima AI e meno affidabile?',
        answer:
          'Quando il pasto e coperto, molto condito, fritto, sfocato o con ingredienti nascosti.',
      },
      {
        question: 'L’AI sostituisce un nutrizionista?',
        answer:
          'No. E uno strumento di tracking e stima. Per consigli medici o diete terapeutiche serve un professionista.',
      },
    ],
  },
}
