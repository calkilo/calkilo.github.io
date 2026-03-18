import { type SiteLanguage } from './site-language'

type LocalizedLanguage = Exclude<SiteLanguage, 'en'>
type TranslationTable = Record<LocalizedLanguage, Record<string, string>>

const COMMON_TRANSLATIONS: TranslationTable = {
  nl: {
    Home: 'Thuis',
    Features: 'Functies',
    'Choose Plan': 'Kies plan',
    Contact: 'Contact',
    'Contact Us': 'Neem contact op',
    'Try for free': 'Probeer gratis',
    Feature: 'Functies',
    Download: 'Downloaden',
    'How it Works?': 'Hoe werkt het?',
    Blog: 'Blog',
    Support: 'Ondersteuning',
    'Privacy Policy': 'Privacybeleid',
    'Terms of Service': 'Servicevoorwaarden',
    'Delete Account & Data': 'Account en gegevens verwijderen',
    'Terms & Conditions': 'Algemene voorwaarden',
    'Terms and Conditions': 'Algemene voorwaarden',
    FAQ: 'Veelgestelde vragen',
    'Get in Touch': 'Neem contact op',
    'About Us': 'Over ons',
    'Our Team': 'Ons team',
    Language: 'Taal',
    Summary: 'Samenvatting',
    'Effective date:': 'Ingangsdatum:',
    'February 25, 2026': '25 februari 2026',
    'Account Deletion': 'Accountverwijdering',
    or: 'of',
    'Revolutionizing nutrition tracking with AI-powered calorie calculation.':
      'Voedingstracking vernieuwd met AI-gestuurde calorieberekening.',
    'All rights reserved.': 'Alle rechten voorbehouden.',
  },
  ru: {
    Home: 'Главная',
    Features: 'Функции',
    'Choose Plan': 'Тарифы',
    Contact: 'Контакты',
    'Contact Us': 'Связаться с нами',
    'Try for free': 'Попробовать бесплатно',
    Feature: 'Функции',
    Download: 'Скачать',
    'How it Works?': 'Как это работает?',
    Blog: 'Блог',
    Support: 'Поддержка',
    'Privacy Policy': 'Политика конфиденциальности',
    'Terms of Service': 'Условия использования',
    'Delete Account & Data': 'Удалить аккаунт и данные',
    'Terms & Conditions': 'Положения и условия',
    'Terms and Conditions': 'Положения и условия',
    FAQ: 'Частые вопросы',
    'Get in Touch': 'Связаться',
    'About Us': 'О нас',
    'Our Team': 'Наша команда',
    Language: 'Язык',
    Summary: 'Кратко',
    'Effective date:': 'Дата вступления в силу:',
    'February 25, 2026': '25 февраля 2026',
    'Account Deletion': 'Удаление аккаунта',
    or: 'или',
    'Revolutionizing nutrition tracking with AI-powered calorie calculation.':
      'Революция в трекинге питания с AI-анализом калорий.',
    'All rights reserved.': 'Все права защищены.',
  },
  zh: {
    Home: '首页',
    Features: '功能',
    'Choose Plan': '选择计划',
    Contact: '联系我们',
    'Contact Us': '联系我们',
    'Try for free': '免费试用',
    Feature: '功能',
    Download: '下载',
    'How it Works?': '如何运作？',
    Blog: '博客',
    Support: '支持',
    'Privacy Policy': '隐私政策',
    'Terms of Service': '服务条款',
    'Delete Account & Data': '删除账户和数据',
    'Terms & Conditions': '条款与条件',
    'Terms and Conditions': '条款与条件',
    FAQ: '常见问题',
    'Get in Touch': '联系我们',
    'About Us': '关于我们',
    'Our Team': '我们的团队',
    Language: '语言',
    Summary: '摘要',
    'Effective date:': '生效日期：',
    'February 25, 2026': '2026年2月25日',
    'Account Deletion': '账户删除',
    or: '或',
    'Revolutionizing nutrition tracking with AI-powered calorie calculation.': '用 AI 热量计算革新营养追踪。',
    'All rights reserved.': '保留所有权利。',
  },
  ar: {
    Home: 'الرئيسية',
    Features: 'الميزات',
    'Choose Plan': 'الخطط',
    Contact: 'تواصل',
    'Contact Us': 'تواصل معنا',
    'Try for free': 'جرب مجاناً',
    Feature: 'الميزات',
    Download: 'تنزيل',
    'How it Works?': 'كيف يعمل؟',
    Blog: 'المدونة',
    Support: 'الدعم',
    'Privacy Policy': 'سياسة الخصوصية',
    'Terms of Service': 'شروط الخدمة',
    'Delete Account & Data': 'حذف الحساب والبيانات',
    'Terms & Conditions': 'الأحكام والشروط',
    'Terms and Conditions': 'الأحكام والشروط',
    FAQ: 'الأسئلة الشائعة',
    'Get in Touch': 'تواصل معنا',
    'About Us': 'من نحن',
    'Our Team': 'فريقنا',
    Language: 'اللغة',
    Summary: 'الملخص',
    'Effective date:': 'تاريخ السريان:',
    'February 25, 2026': '25 فبراير 2026',
    'Account Deletion': 'حذف الحساب',
    or: 'أو',
    'Revolutionizing nutrition tracking with AI-powered calorie calculation.':
      'نُحدث ثورة في تتبع التغذية بحساب السعرات المدعوم بالذكاء الاصطناعي.',
    'All rights reserved.': 'جميع الحقوق محفوظة.',
  },
  fa: {
    Home: 'خانه',
    Features: 'ویژگی‌ها',
    'Choose Plan': 'انتخاب طرح',
    Contact: 'تماس',
    'Contact Us': 'تماس با ما',
    'Try for free': 'رایگان امتحان کنید',
    Feature: 'ویژگی‌ها',
    Download: 'دانلود',
    'How it Works?': 'چگونه کار می‌کند؟',
    Blog: 'وبلاگ',
    Support: 'پشتیبانی',
    'Privacy Policy': 'سیاست حریم خصوصی',
    'Terms of Service': 'شرایط استفاده',
    'Delete Account & Data': 'حذف حساب و داده‌ها',
    'Terms & Conditions': 'قوانین و شرایط',
    'Terms and Conditions': 'قوانین و شرایط',
    FAQ: 'سوالات متداول',
    'Get in Touch': 'تماس بگیرید',
    'About Us': 'درباره ما',
    'Our Team': 'تیم ما',
    Language: 'زبان',
    Summary: 'خلاصه',
    'Effective date:': 'تاریخ اجرا:',
    'February 25, 2026': '25 فوریه 2026',
    'Account Deletion': 'حذف حساب',
    or: 'یا',
    'Revolutionizing nutrition tracking with AI-powered calorie calculation.':
      'انقلابی در پیگیری تغذیه با محاسبه کالری مبتنی بر هوش مصنوعی.',
    'All rights reserved.': 'تمام حقوق محفوظ است.',
  },
  it: {
    Home: 'Home',
    Features: 'Funzioni',
    'Choose Plan': 'Scegli piano',
    Contact: 'Contatto',
    'Contact Us': 'Contattaci',
    'Try for free': 'Provalo gratis',
    Feature: 'Funzionalita',
    Download: 'Scarica',
    'How it Works?': 'Come funziona?',
    Blog: 'Blog',
    Support: 'Supporto',
    'Privacy Policy': 'Informativa sulla privacy',
    'Terms of Service': 'Termini di servizio',
    'Delete Account & Data': 'Elimina account e dati',
    'Terms & Conditions': 'Termini e condizioni',
    'Terms and Conditions': 'Termini e condizioni',
    FAQ: 'FAQ',
    'Get in Touch': 'Mettiti in contatto',
    'About Us': 'Chi siamo',
    'Our Team': 'Il nostro team',
    Language: 'Lingua',
    Summary: 'Riepilogo',
    'Effective date:': 'Data di entrata in vigore:',
    'February 25, 2026': '25 febbraio 2026',
    'Account Deletion': 'Eliminazione account',
    or: 'o',
    'Revolutionizing nutrition tracking with AI-powered calorie calculation.':
      'Tracking nutrizionale rivoluzionato dal calcolo calorie con AI.',
    'All rights reserved.': 'Tutti i diritti riservati.',
  },
}

const PRIVACY_TRANSLATIONS: TranslationTable = {
  nl: {
    'Calkilo Privacy Policy': 'Calkilo Privacybeleid',
    "Read Calkilo's privacy policy and learn how we collect, use, and protect your data.":
      'Lees het privacybeleid van Calkilo en ontdek hoe we jouw gegevens verzamelen, gebruiken en beschermen.',
    'Your privacy matters to us. This page explains what data we collect, why we collect it, and how you can control your information.':
      'Je privacy is belangrijk voor ons. Op deze pagina leggen we uit welke gegevens we verzamelen, waarom we dat doen en hoe je controle houdt over jouw informatie.',
    'Calkilo uses account, nutrition, and technical data to provide AI-powered calorie tracking and improve the product. We do not sell personal data, and you can request access or deletion of your information at any time.':
      'Calkilo gebruikt account-, voedings- en technische gegevens om AI-gestuurde calorietracking te bieden en het product te verbeteren. We verkopen geen persoonsgegevens en je kunt op elk moment toegang of verwijdering van je informatie aanvragen.',
    '1. Information We Collect': '1. Welke informatie we verzamelen',
    'We collect information you provide directly to us, including account details such as your name, email address, and profile settings.':
      'We verzamelen informatie die je rechtstreeks aan ons verstrekt, waaronder accountgegevens zoals je naam, e-mailadres en profielinstellingen.',
    'When you use nutrition tracking features, we may process food photos, meal logs, body metrics, and activity information to provide calorie analysis and personalized recommendations.':
      'Wanneer je functies voor voedingstracking gebruikt, kunnen we voedselfoto’s, maaltijdoverzichten, lichaamsmetingen en activiteitsinformatie verwerken om calorieanalyses en gepersonaliseerde aanbevelingen te leveren.',
    'Account information: name, email, login credentials, language preference':
      'Accountinformatie: naam, e-mail, inloggegevens, taalvoorkeur',
    'Nutrition data: meal photos, food entries, calorie and macro logs':
      'Voedingsgegevens: maaltijdfoto’s, voedingsinvoer, calorie- en macrologs',
    'Technical data: device type, browser details, IP address, app usage analytics':
      'Technische gegevens: apparaattype, browserdetails, IP-adres, gebruiksanalyses van de app',
    'Support data: messages and attachments sent through contact or support channels':
      'Supportgegevens: berichten en bijlagen die via contact- of supportkanalen zijn verzonden',
    '2. How We Use Your Information': '2. Hoe we jouw informatie gebruiken',
    'We use your information to operate the Calkilo platform, deliver features, improve model accuracy, and provide customer support.':
      'We gebruiken jouw informatie om het Calkilo-platform te beheren, functies te leveren, de nauwkeurigheid van modellen te verbeteren en ondersteuning te bieden.',
    'We also use aggregated and de-identified data to analyze feature performance and improve the overall product experience.':
      'We gebruiken ook geaggregeerde en geanonimiseerde gegevens om de prestaties van functies te analyseren en de totale productervaring te verbeteren.',
    'Deliver AI-powered calorie and nutrition insights': 'AI-gestuurde calorie- en voedingsinzichten leveren',
    'Personalize meal planning and in-app recommendations': 'Maaltijdplanning en aanbevelingen in de app personaliseren',
    'Respond to support requests and maintain service reliability': 'Reageren op supportverzoeken en de betrouwbaarheid van de dienst behouden',
    'Detect abuse, secure accounts, and prevent fraud': 'Misbruik detecteren, accounts beveiligen en fraude voorkomen',
    '3. Sharing and Disclosure': '3. Delen en openbaarmaking',
    'We do not sell your personal information. We only share data with trusted service providers that help us operate the platform, such as hosting, analytics, payment, and support tools.':
      'We verkopen jouw persoonsgegevens niet. We delen gegevens alleen met vertrouwde dienstverleners die ons helpen het platform te beheren, zoals hosting-, analyse-, betaal- en supporttools.',
    'We may disclose information when required by law, to enforce our terms, or to protect the rights, safety, and security of Calkilo and its users.':
      'We kunnen informatie openbaar maken wanneer de wet dit vereist, om onze voorwaarden af te dwingen, of om de rechten, veiligheid en beveiliging van Calkilo en zijn gebruikers te beschermen.',
    '4. Data Retention': '4. Bewaartermijnen van gegevens',
    'We retain personal information for as long as your account is active or as needed to provide services, resolve disputes, and comply with legal obligations.':
      'We bewaren persoonsgegevens zolang je account actief is of zolang dit nodig is om diensten te leveren, geschillen op te lossen en te voldoen aan wettelijke verplichtingen.',
    'You can request deletion of your account and associated data on our account deletion page at /account-deletion or by emailing privacy@calkilo.app.':
      'Je kunt verwijdering van je account en bijbehorende gegevens aanvragen via onze pagina voor accountverwijdering op /account-deletion of door te mailen naar privacy@calkilo.app.',
    '5. Your Privacy Rights': '5. Jouw privacyrechten',
    'Depending on your location, you may have rights to access, correct, delete, or export your personal data, and to object to certain processing activities.':
      'Afhankelijk van je locatie heb je mogelijk rechten om jouw persoonsgegevens in te zien, te corrigeren, te verwijderen of te exporteren, en om bezwaar te maken tegen bepaalde verwerkingen.',
    'To submit a privacy request, email support@calkilo.app with the subject line "Privacy Request". We will verify your identity before processing your request.':
      'Om een privacyverzoek in te dienen, mail je naar support@calkilo.app met als onderwerp "Privacyverzoek". We verifiëren je identiteit voordat we jouw verzoek verwerken.',
    "6. Children's Privacy": '6. Privacy van kinderen',
    'Calkilo is not directed to children under 13, and we do not knowingly collect personal information from children under 13 without appropriate consent.':
      'Calkilo is niet gericht op kinderen jonger dan 13 jaar en we verzamelen niet bewust persoonsgegevens van kinderen onder de 13 zonder passende toestemming.',
    'If you believe a child has provided personal information to us, contact support@calkilo.app so we can take appropriate action.':
      'Als je denkt dat een kind persoonsgegevens aan ons heeft verstrekt, neem dan contact op via support@calkilo.app zodat we passende maatregelen kunnen nemen.',
    '7. Policy Updates': '7. Updates van het beleid',
    'We may update this Privacy Policy periodically to reflect product, legal, or operational changes. When we make material updates, we will revise the effective date and provide notice where required.':
      'We kunnen dit privacybeleid periodiek bijwerken om product-, juridische of operationele wijzigingen te weerspiegelen. Bij belangrijke updates passen we de ingangsdatum aan en geven we waar nodig een kennisgeving.',
    'The current version of this policy became effective on February 25, 2026.':
      'De huidige versie van dit beleid is van kracht sinds 25 februari 2026.',
  },
  ru: {
    'Calkilo Privacy Policy': 'Политика конфиденциальности Calkilo',
    "Read Calkilo's privacy policy and learn how we collect, use, and protect your data.":
      'Прочитайте политику конфиденциальности Calkilo и узнайте, как мы собираем, используем и защищаем ваши данные.',
    'Your privacy matters to us. This page explains what data we collect, why we collect it, and how you can control your information.':
      'Ваша конфиденциальность важна для нас. На этой странице объясняется, какие данные мы собираем, зачем мы это делаем и как вы можете управлять своей информацией.',
    'Calkilo uses account, nutrition, and technical data to provide AI-powered calorie tracking and improve the product. We do not sell personal data, and you can request access or deletion of your information at any time.':
      'Calkilo использует данные аккаунта, питания и технические данные, чтобы предоставлять AI-трекинг калорий и улучшать продукт. Мы не продаем персональные данные, и вы можете в любой момент запросить доступ к своей информации или ее удаление.',
    '1. Information We Collect': '1. Какие данные мы собираем',
    'We collect information you provide directly to us, including account details such as your name, email address, and profile settings.':
      'Мы собираем информацию, которую вы предоставляете нам напрямую, включая данные аккаунта, такие как имя, адрес электронной почты и настройки профиля.',
    'When you use nutrition tracking features, we may process food photos, meal logs, body metrics, and activity information to provide calorie analysis and personalized recommendations.':
      'Когда вы используете функции трекинга питания, мы можем обрабатывать фотографии еды, журналы приемов пищи, показатели тела и данные об активности, чтобы предоставлять анализ калорий и персональные рекомендации.',
    'Account information: name, email, login credentials, language preference':
      'Информация аккаунта: имя, email, данные для входа, языковые предпочтения',
    'Nutrition data: meal photos, food entries, calorie and macro logs':
      'Данные о питании: фото блюд, записи о еде, журналы калорий и макроэлементов',
    'Technical data: device type, browser details, IP address, app usage analytics':
      'Технические данные: тип устройства, сведения о браузере, IP-адрес, аналитика использования приложения',
    'Support data: messages and attachments sent through contact or support channels':
      'Данные поддержки: сообщения и вложения, отправленные через контактные или support-каналы',
    '2. How We Use Your Information': '2. Как мы используем ваши данные',
    'We use your information to operate the Calkilo platform, deliver features, improve model accuracy, and provide customer support.':
      'Мы используем ваши данные для работы платформы Calkilo, предоставления функций, повышения точности моделей и поддержки пользователей.',
    'We also use aggregated and de-identified data to analyze feature performance and improve the overall product experience.':
      'Мы также используем агрегированные и обезличенные данные для анализа работы функций и улучшения общего пользовательского опыта.',
    'Deliver AI-powered calorie and nutrition insights': 'Предоставлять AI-аналитику по калориям и питанию',
    'Personalize meal planning and in-app recommendations': 'Персонализировать планы питания и рекомендации в приложении',
    'Respond to support requests and maintain service reliability': 'Отвечать на запросы в поддержку и поддерживать надежность сервиса',
    'Detect abuse, secure accounts, and prevent fraud': 'Выявлять злоупотребления, защищать аккаунты и предотвращать мошенничество',
    '3. Sharing and Disclosure': '3. Передача и раскрытие данных',
    'We do not sell your personal information. We only share data with trusted service providers that help us operate the platform, such as hosting, analytics, payment, and support tools.':
      'Мы не продаем вашу персональную информацию. Мы делимся данными только с доверенными поставщиками услуг, которые помогают нам поддерживать платформу, например с инструментами хостинга, аналитики, оплаты и поддержки.',
    'We may disclose information when required by law, to enforce our terms, or to protect the rights, safety, and security of Calkilo and its users.':
      'Мы можем раскрывать информацию, если этого требует закон, для соблюдения наших условий или для защиты прав, безопасности и интересов Calkilo и его пользователей.',
    '4. Data Retention': '4. Хранение данных',
    'We retain personal information for as long as your account is active or as needed to provide services, resolve disputes, and comply with legal obligations.':
      'Мы храним персональную информацию, пока ваш аккаунт активен, либо столько, сколько требуется для предоставления услуг, урегулирования споров и соблюдения юридических обязанностей.',
    'You can request deletion of your account and associated data on our account deletion page at /account-deletion or by emailing privacy@calkilo.app.':
      'Вы можете запросить удаление аккаунта и связанных данных на странице удаления аккаунта по адресу /account-deletion или написав на privacy@calkilo.app.',
    '5. Your Privacy Rights': '5. Ваши права на конфиденциальность',
    'Depending on your location, you may have rights to access, correct, delete, or export your personal data, and to object to certain processing activities.':
      'В зависимости от вашего местоположения вы можете иметь право на доступ, исправление, удаление или экспорт персональных данных, а также на возражение против определенной обработки.',
    'To submit a privacy request, email support@calkilo.app with the subject line "Privacy Request". We will verify your identity before processing your request.':
      'Чтобы отправить запрос по конфиденциальности, напишите на support@calkilo.app с темой "Запрос о конфиденциальности". Перед обработкой запроса мы проверим вашу личность.',
    "6. Children's Privacy": '6. Конфиденциальность детей',
    'Calkilo is not directed to children under 13, and we do not knowingly collect personal information from children under 13 without appropriate consent.':
      'Calkilo не предназначен для детей младше 13 лет, и мы сознательно не собираем персональные данные детей младше 13 лет без соответствующего согласия.',
    'If you believe a child has provided personal information to us, contact support@calkilo.app so we can take appropriate action.':
      'Если вы считаете, что ребенок предоставил нам персональные данные, свяжитесь с нами по адресу support@calkilo.app, чтобы мы могли принять соответствующие меры.',
    '7. Policy Updates': '7. Обновления политики',
    'We may update this Privacy Policy periodically to reflect product, legal, or operational changes. When we make material updates, we will revise the effective date and provide notice where required.':
      'Мы можем периодически обновлять эту Политику конфиденциальности, чтобы отражать изменения продукта, правовые или операционные изменения. При существенных обновлениях мы изменим дату вступления в силу и уведомим пользователей, когда это требуется.',
    'The current version of this policy became effective on February 25, 2026.':
      'Текущая версия этой политики вступила в силу 25 февраля 2026 года.',
  },
  zh: {
    'Calkilo Privacy Policy': 'Calkilo 隐私政策',
    "Read Calkilo's privacy policy and learn how we collect, use, and protect your data.":
      '阅读 Calkilo 的隐私政策，了解我们如何收集、使用和保护你的数据。',
    'Your privacy matters to us. This page explains what data we collect, why we collect it, and how you can control your information.':
      '你的隐私对我们很重要。本页说明我们收集哪些数据、为什么收集这些数据，以及你如何控制自己的信息。',
    'Calkilo uses account, nutrition, and technical data to provide AI-powered calorie tracking and improve the product. We do not sell personal data, and you can request access or deletion of your information at any time.':
      'Calkilo 使用账户、营养和技术数据来提供 AI 驱动的卡路里追踪并改进产品。我们不会出售个人数据，你可以随时请求访问或删除你的信息。',
    '1. Information We Collect': '1. 我们收集的信息',
    'We collect information you provide directly to us, including account details such as your name, email address, and profile settings.':
      '我们会收集你直接提供给我们的信息，包括姓名、电子邮箱地址和个人资料设置等账户详情。',
    'When you use nutrition tracking features, we may process food photos, meal logs, body metrics, and activity information to provide calorie analysis and personalized recommendations.':
      '当你使用营养追踪功能时，我们可能会处理食物照片、用餐记录、身体指标和活动信息，以提供热量分析和个性化建议。',
    'Account information: name, email, login credentials, language preference':
      '账户信息：姓名、电子邮箱、登录凭据、语言偏好',
    'Nutrition data: meal photos, food entries, calorie and macro logs':
      '营养数据：餐食照片、食物记录、热量和宏量营养素日志',
    'Technical data: device type, browser details, IP address, app usage analytics':
      '技术数据：设备类型、浏览器信息、IP 地址、应用使用分析',
    'Support data: messages and attachments sent through contact or support channels':
      '支持数据：通过联系或支持渠道发送的消息和附件',
    '2. How We Use Your Information': '2. 我们如何使用你的信息',
    'We use your information to operate the Calkilo platform, deliver features, improve model accuracy, and provide customer support.':
      '我们使用你的信息来运营 Calkilo 平台、提供功能、提升模型准确性并提供客户支持。',
    'We also use aggregated and de-identified data to analyze feature performance and improve the overall product experience.':
      '我们还会使用聚合和去标识化的数据来分析功能表现并改善整体产品体验。',
    'Deliver AI-powered calorie and nutrition insights': '提供 AI 驱动的热量与营养洞察',
    'Personalize meal planning and in-app recommendations': '个性化餐食规划和应用内推荐',
    'Respond to support requests and maintain service reliability': '响应支持请求并保持服务稳定性',
    'Detect abuse, secure accounts, and prevent fraud': '检测滥用行为、保护账户安全并防止欺诈',
    '3. Sharing and Disclosure': '3. 数据共享与披露',
    'We do not sell your personal information. We only share data with trusted service providers that help us operate the platform, such as hosting, analytics, payment, and support tools.':
      '我们不会出售你的个人信息。我们只会与帮助我们运营平台的可信服务提供商共享数据，例如托管、分析、支付和支持工具。',
    'We may disclose information when required by law, to enforce our terms, or to protect the rights, safety, and security of Calkilo and its users.':
      '在法律要求、执行我们的条款或保护 Calkilo 及其用户的权利、安全与保障时，我们可能会披露相关信息。',
    '4. Data Retention': '4. 数据保留',
    'We retain personal information for as long as your account is active or as needed to provide services, resolve disputes, and comply with legal obligations.':
      '只要你的账户处于活动状态，或在提供服务、解决争议及履行法律义务所需期间，我们都会保留个人信息。',
    'You can request deletion of your account and associated data on our account deletion page at /account-deletion or by emailing privacy@calkilo.app.':
      '你可以在我们的账户删除页面 /account-deletion 提交删除账户及相关数据的请求，或发送邮件至 privacy@calkilo.app。',
    '5. Your Privacy Rights': '5. 你的隐私权利',
    'Depending on your location, you may have rights to access, correct, delete, or export your personal data, and to object to certain processing activities.':
      '根据你所在的地区，你可能享有访问、更正、删除或导出个人数据的权利，并有权反对某些处理活动。',
    'To submit a privacy request, email support@calkilo.app with the subject line "Privacy Request". We will verify your identity before processing your request.':
      '如需提交隐私请求，请发送电子邮件至 support@calkilo.app，并在主题中写明“隐私请求”。我们会在处理请求前验证你的身份。',
    "6. Children's Privacy": '6. 儿童隐私',
    'Calkilo is not directed to children under 13, and we do not knowingly collect personal information from children under 13 without appropriate consent.':
      'Calkilo 不面向 13 岁以下儿童，未经适当同意，我们不会故意收集 13 岁以下儿童的个人信息。',
    'If you believe a child has provided personal information to us, contact support@calkilo.app so we can take appropriate action.':
      '如果你认为有儿童向我们提供了个人信息，请通过 support@calkilo.app 联系我们，以便我们采取适当措施。',
    '7. Policy Updates': '7. 政策更新',
    'We may update this Privacy Policy periodically to reflect product, legal, or operational changes. When we make material updates, we will revise the effective date and provide notice where required.':
      '我们可能会定期更新本隐私政策，以反映产品、法律或运营方面的变化。当出现重大更新时，我们会修改生效日期，并在必要时提供通知。',
    'The current version of this policy became effective on February 25, 2026.':
      '本政策当前版本自 2026 年 2 月 25 日起生效。',
  },
  ar: {
    'Calkilo Privacy Policy': 'سياسة خصوصية Calkilo',
    "Read Calkilo's privacy policy and learn how we collect, use, and protect your data.":
      'اقرأ سياسة خصوصية Calkilo وتعرّف على كيفية جمع بياناتك واستخدامها وحمايتها.',
    'Your privacy matters to us. This page explains what data we collect, why we collect it, and how you can control your information.':
      'خصوصيتك مهمة بالنسبة لنا. تشرح هذه الصفحة البيانات التي نجمعها، ولماذا نجمعها، وكيف يمكنك التحكم في معلوماتك.',
    'Calkilo uses account, nutrition, and technical data to provide AI-powered calorie tracking and improve the product. We do not sell personal data, and you can request access or deletion of your information at any time.':
      'يستخدم Calkilo بيانات الحساب والتغذية والبيانات التقنية لتقديم تتبع السعرات المدعوم بالذكاء الاصطناعي وتحسين المنتج. نحن لا نبيع البيانات الشخصية، ويمكنك طلب الوصول إلى معلوماتك أو حذفها في أي وقت.',
    '1. Information We Collect': '1. المعلومات التي نجمعها',
    'We collect information you provide directly to us, including account details such as your name, email address, and profile settings.':
      'نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك تفاصيل الحساب مثل اسمك وعنوان بريدك الإلكتروني وإعدادات ملفك الشخصي.',
    'When you use nutrition tracking features, we may process food photos, meal logs, body metrics, and activity information to provide calorie analysis and personalized recommendations.':
      'عند استخدام ميزات تتبع التغذية، قد نعالج صور الطعام وسجلات الوجبات ومقاييس الجسم ومعلومات النشاط لتقديم تحليل للسعرات وتوصيات مخصصة.',
    'Account information: name, email, login credentials, language preference':
      'معلومات الحساب: الاسم، البريد الإلكتروني، بيانات تسجيل الدخول، تفضيل اللغة',
    'Nutrition data: meal photos, food entries, calorie and macro logs':
      'بيانات التغذية: صور الوجبات، إدخالات الطعام، سجلات السعرات والمغذيات الكبرى',
    'Technical data: device type, browser details, IP address, app usage analytics':
      'بيانات تقنية: نوع الجهاز، تفاصيل المتصفح، عنوان IP، تحليلات استخدام التطبيق',
    'Support data: messages and attachments sent through contact or support channels':
      'بيانات الدعم: الرسائل والمرفقات المرسلة عبر قنوات الاتصال أو الدعم',
    '2. How We Use Your Information': '2. كيف نستخدم معلوماتك',
    'We use your information to operate the Calkilo platform, deliver features, improve model accuracy, and provide customer support.':
      'نستخدم معلوماتك لتشغيل منصة Calkilo وتقديم الميزات وتحسين دقة النماذج وتقديم دعم العملاء.',
    'We also use aggregated and de-identified data to analyze feature performance and improve the overall product experience.':
      'نستخدم أيضا البيانات المجمعة وغير المحددة الهوية لتحليل أداء الميزات وتحسين التجربة العامة للمنتج.',
    'Deliver AI-powered calorie and nutrition insights': 'تقديم رؤى السعرات والتغذية المدعومة بالذكاء الاصطناعي',
    'Personalize meal planning and in-app recommendations': 'تخصيص تخطيط الوجبات والتوصيات داخل التطبيق',
    'Respond to support requests and maintain service reliability': 'الرد على طلبات الدعم والحفاظ على موثوقية الخدمة',
    'Detect abuse, secure accounts, and prevent fraud': 'اكتشاف إساءة الاستخدام وتأمين الحسابات ومنع الاحتيال',
    '3. Sharing and Disclosure': '3. المشاركة والإفصاح',
    'We do not sell your personal information. We only share data with trusted service providers that help us operate the platform, such as hosting, analytics, payment, and support tools.':
      'نحن لا نبيع معلوماتك الشخصية. نشارك البيانات فقط مع مزودي خدمات موثوقين يساعدوننا في تشغيل المنصة، مثل أدوات الاستضافة والتحليلات والدفع والدعم.',
    'We may disclose information when required by law, to enforce our terms, or to protect the rights, safety, and security of Calkilo and its users.':
      'قد نفصح عن المعلومات عندما يقتضي القانون ذلك، أو لتطبيق شروطنا، أو لحماية حقوق وسلامة وأمن Calkilo ومستخدميه.',
    '4. Data Retention': '4. الاحتفاظ بالبيانات',
    'We retain personal information for as long as your account is active or as needed to provide services, resolve disputes, and comply with legal obligations.':
      'نحتفظ بالمعلومات الشخصية طالما كان حسابك نشطا أو طالما كان ذلك ضروريا لتقديم الخدمات وحل النزاعات والامتثال للالتزامات القانونية.',
    'You can request deletion of your account and associated data on our account deletion page at /account-deletion or by emailing privacy@calkilo.app.':
      'يمكنك طلب حذف حسابك والبيانات المرتبطة به من خلال صفحة حذف الحساب على /account-deletion أو عبر البريد privacy@calkilo.app.',
    '5. Your Privacy Rights': '5. حقوق الخصوصية الخاصة بك',
    'Depending on your location, you may have rights to access, correct, delete, or export your personal data, and to object to certain processing activities.':
      'بحسب موقعك، قد تكون لك حقوق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها أو تصديرها، والاعتراض على بعض أنشطة المعالجة.',
    'To submit a privacy request, email support@calkilo.app with the subject line "Privacy Request". We will verify your identity before processing your request.':
      'لتقديم طلب خصوصية، أرسل بريدا إلى support@calkilo.app مع عنوان "طلب خصوصية". سنقوم بالتحقق من هويتك قبل معالجة الطلب.',
    "6. Children's Privacy": '6. خصوصية الأطفال',
    'Calkilo is not directed to children under 13, and we do not knowingly collect personal information from children under 13 without appropriate consent.':
      'Calkilo غير موجه للأطفال دون سن 13 عاما، ولا نجمع عن قصد معلومات شخصية من أطفال دون 13 عاما من دون موافقة مناسبة.',
    'If you believe a child has provided personal information to us, contact support@calkilo.app so we can take appropriate action.':
      'إذا كنت تعتقد أن طفلا قد زودنا بمعلومات شخصية، فتواصل معنا عبر support@calkilo.app حتى نتخذ الإجراء المناسب.',
    '7. Policy Updates': '7. تحديثات السياسة',
    'We may update this Privacy Policy periodically to reflect product, legal, or operational changes. When we make material updates, we will revise the effective date and provide notice where required.':
      'قد نقوم بتحديث سياسة الخصوصية هذه بشكل دوري لتعكس التغييرات في المنتج أو الجوانب القانونية أو التشغيلية. وعندما نجري تحديثات جوهرية، سنعدل تاريخ السريان ونقدم إشعارا عند الحاجة.',
    'The current version of this policy became effective on February 25, 2026.':
      'أصبحت النسخة الحالية من هذه السياسة سارية اعتبارا من 25 فبراير 2026.',
  },
  fa: {
    'Calkilo Privacy Policy': 'سیاست حریم خصوصی Calkilo',
    "Read Calkilo's privacy policy and learn how we collect, use, and protect your data.":
      'سیاست حریم خصوصی Calkilo را بخوانید و ببینید چگونه داده‌های شما را جمع‌آوری، استفاده و محافظت می‌کنیم.',
    'Your privacy matters to us. This page explains what data we collect, why we collect it, and how you can control your information.':
      'حریم خصوصی شما برای ما مهم است. این صفحه توضیح می‌دهد چه داده‌هایی جمع‌آوری می‌کنیم، چرا آن‌ها را جمع می‌کنیم و چگونه می‌توانید اطلاعات خود را کنترل کنید.',
    'Calkilo uses account, nutrition, and technical data to provide AI-powered calorie tracking and improve the product. We do not sell personal data, and you can request access or deletion of your information at any time.':
      'Calkilo از داده‌های حساب، تغذیه و داده‌های فنی برای ارائه پیگیری کالری مبتنی بر هوش مصنوعی و بهبود محصول استفاده می‌کند. ما داده‌های شخصی را نمی‌فروشیم و شما می‌توانید هر زمان درخواست دسترسی یا حذف اطلاعات خود را ثبت کنید.',
    '1. Information We Collect': '1. اطلاعاتی که جمع‌آوری می‌کنیم',
    'We collect information you provide directly to us, including account details such as your name, email address, and profile settings.':
      'ما اطلاعاتی را که مستقیما در اختیار ما قرار می‌دهید جمع‌آوری می‌کنیم؛ از جمله جزئیات حساب مانند نام، ایمیل و تنظیمات پروفایل.',
    'When you use nutrition tracking features, we may process food photos, meal logs, body metrics, and activity information to provide calorie analysis and personalized recommendations.':
      'وقتی از قابلیت‌های پیگیری تغذیه استفاده می‌کنید، ممکن است برای ارائه تحلیل کالری و پیشنهادهای شخصی‌سازی‌شده، عکس غذا، ثبت وعده‌ها، شاخص‌های بدنی و اطلاعات فعالیت شما را پردازش کنیم.',
    'Account information: name, email, login credentials, language preference':
      'اطلاعات حساب: نام، ایمیل، اطلاعات ورود، ترجیح زبان',
    'Nutrition data: meal photos, food entries, calorie and macro logs':
      'داده‌های تغذیه: عکس وعده‌ها، ثبت غذا، گزارش کالری و درشت‌مغذی‌ها',
    'Technical data: device type, browser details, IP address, app usage analytics':
      'داده‌های فنی: نوع دستگاه، جزئیات مرورگر، آدرس IP، تحلیل استفاده از اپ',
    'Support data: messages and attachments sent through contact or support channels':
      'داده‌های پشتیبانی: پیام‌ها و فایل‌های ارسالی از طریق کانال‌های تماس یا پشتیبانی',
    '2. How We Use Your Information': '2. چگونه از اطلاعات شما استفاده می‌کنیم',
    'We use your information to operate the Calkilo platform, deliver features, improve model accuracy, and provide customer support.':
      'ما از اطلاعات شما برای راه‌اندازی پلتفرم Calkilo، ارائه قابلیت‌ها، بهبود دقت مدل و ارائه پشتیبانی استفاده می‌کنیم.',
    'We also use aggregated and de-identified data to analyze feature performance and improve the overall product experience.':
      'همچنین از داده‌های تجمیع‌شده و ناشناس برای تحلیل عملکرد قابلیت‌ها و بهبود تجربه کلی محصول استفاده می‌کنیم.',
    'Deliver AI-powered calorie and nutrition insights': 'ارائه بینش‌های کالری و تغذیه مبتنی بر هوش مصنوعی',
    'Personalize meal planning and in-app recommendations': 'شخصی‌سازی برنامه غذایی و پیشنهادهای داخل اپ',
    'Respond to support requests and maintain service reliability': 'پاسخ به درخواست‌های پشتیبانی و حفظ پایداری سرویس',
    'Detect abuse, secure accounts, and prevent fraud': 'تشخیص سوءاستفاده، امن‌سازی حساب‌ها و جلوگیری از تقلب',
    '3. Sharing and Disclosure': '3. اشتراک‌گذاری و افشا',
    'We do not sell your personal information. We only share data with trusted service providers that help us operate the platform, such as hosting, analytics, payment, and support tools.':
      'ما اطلاعات شخصی شما را نمی‌فروشیم. فقط داده‌ها را با ارائه‌دهندگان خدمات قابل اعتماد که به ما در اجرای پلتفرم کمک می‌کنند، مانند ابزارهای میزبانی، تحلیل، پرداخت و پشتیبانی، به اشتراک می‌گذاریم.',
    'We may disclose information when required by law, to enforce our terms, or to protect the rights, safety, and security of Calkilo and its users.':
      'ممکن است در صورت الزام قانونی، برای اجرای شرایط ما، یا برای حفاظت از حقوق، ایمنی و امنیت Calkilo و کاربرانش، اطلاعات را افشا کنیم.',
    '4. Data Retention': '4. نگهداری داده‌ها',
    'We retain personal information for as long as your account is active or as needed to provide services, resolve disputes, and comply with legal obligations.':
      'ما اطلاعات شخصی را تا زمانی که حساب شما فعال است یا برای ارائه خدمات، حل اختلاف‌ها و رعایت تعهدات قانونی لازم باشد نگهداری می‌کنیم.',
    'You can request deletion of your account and associated data on our account deletion page at /account-deletion or by emailing privacy@calkilo.app.':
      'شما می‌توانید حذف حساب و داده‌های مرتبط را از طریق صفحه حذف حساب در /account-deletion یا با ایمیل به privacy@calkilo.app درخواست کنید.',
    '5. Your Privacy Rights': '5. حقوق حریم خصوصی شما',
    'Depending on your location, you may have rights to access, correct, delete, or export your personal data, and to object to certain processing activities.':
      'بسته به محل زندگی شما، ممکن است حق دسترسی، اصلاح، حذف یا خروجی گرفتن از داده‌های شخصی خود و نیز اعتراض به برخی فعالیت‌های پردازش را داشته باشید.',
    'To submit a privacy request, email support@calkilo.app with the subject line "Privacy Request". We will verify your identity before processing your request.':
      'برای ثبت درخواست حریم خصوصی، به support@calkilo.app ایمیل بزنید و در عنوان بنویسید "درخواست حریم خصوصی". پیش از رسیدگی به درخواست، هویت شما را بررسی می‌کنیم.',
    "6. Children's Privacy": '6. حریم خصوصی کودکان',
    'Calkilo is not directed to children under 13, and we do not knowingly collect personal information from children under 13 without appropriate consent.':
      'Calkilo برای کودکان زیر 13 سال طراحی نشده است و ما بدون رضایت مناسب، آگاهانه اطلاعات شخصی کودکان زیر 13 سال را جمع‌آوری نمی‌کنیم.',
    'If you believe a child has provided personal information to us, contact support@calkilo.app so we can take appropriate action.':
      'اگر فکر می‌کنید کودکی اطلاعات شخصی خود را در اختیار ما گذاشته است، با support@calkilo.app تماس بگیرید تا اقدامات لازم را انجام دهیم.',
    '7. Policy Updates': '7. به‌روزرسانی‌های سیاست',
    'We may update this Privacy Policy periodically to reflect product, legal, or operational changes. When we make material updates, we will revise the effective date and provide notice where required.':
      'ممکن است این سیاست حریم خصوصی را به‌طور دوره‌ای برای بازتاب تغییرات محصول، قانونی یا عملیاتی به‌روزرسانی کنیم. در صورت ایجاد تغییرات مهم، تاریخ اجرا را به‌روزرسانی کرده و در صورت نیاز اطلاع‌رسانی می‌کنیم.',
    'The current version of this policy became effective on February 25, 2026.':
      'نسخه فعلی این سیاست از 25 فوریه 2026 اجرایی شده است.',
  },
  it: {
    'Calkilo Privacy Policy': 'Informativa sulla privacy di Calkilo',
    "Read Calkilo's privacy policy and learn how we collect, use, and protect your data.":
      "Leggi l'informativa sulla privacy di Calkilo e scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati.",
    'Your privacy matters to us. This page explains what data we collect, why we collect it, and how you can control your information.':
      'La tua privacy conta per noi. Questa pagina spiega quali dati raccogliamo, perche li raccogliamo e come puoi controllare le tue informazioni.',
    'Calkilo uses account, nutrition, and technical data to provide AI-powered calorie tracking and improve the product. We do not sell personal data, and you can request access or deletion of your information at any time.':
      'Calkilo utilizza dati di account, nutrizione e dati tecnici per offrire il monitoraggio calorie con AI e migliorare il prodotto. Non vendiamo dati personali e puoi richiedere in qualsiasi momento accesso o cancellazione delle tue informazioni.',
    '1. Information We Collect': '1. Informazioni che raccogliamo',
    'We collect information you provide directly to us, including account details such as your name, email address, and profile settings.':
      "Raccogliamo le informazioni che ci fornisci direttamente, inclusi i dettagli dell'account come nome, indirizzo email e impostazioni del profilo.",
    'When you use nutrition tracking features, we may process food photos, meal logs, body metrics, and activity information to provide calorie analysis and personalized recommendations.':
      'Quando usi le funzioni di monitoraggio nutrizionale, possiamo elaborare foto del cibo, registri dei pasti, metriche corporee e informazioni sulle attivita per fornire analisi calorie e consigli personalizzati.',
    'Account information: name, email, login credentials, language preference':
      'Informazioni account: nome, email, credenziali di accesso, preferenza lingua',
    'Nutrition data: meal photos, food entries, calorie and macro logs':
      'Dati nutrizionali: foto dei pasti, registrazioni del cibo, log di calorie e macro',
    'Technical data: device type, browser details, IP address, app usage analytics':
      'Dati tecnici: tipo di dispositivo, dettagli del browser, indirizzo IP, analisi di utilizzo dell app',
    'Support data: messages and attachments sent through contact or support channels':
      'Dati di supporto: messaggi e allegati inviati tramite i canali di contatto o supporto',
    '2. How We Use Your Information': '2. Come utilizziamo le tue informazioni',
    'We use your information to operate the Calkilo platform, deliver features, improve model accuracy, and provide customer support.':
      'Usiamo le tue informazioni per gestire la piattaforma Calkilo, offrire funzionalita, migliorare la precisione dei modelli e fornire supporto clienti.',
    'We also use aggregated and de-identified data to analyze feature performance and improve the overall product experience.':
      "Utilizziamo anche dati aggregati e anonimizzati per analizzare le prestazioni delle funzionalita e migliorare l'esperienza complessiva del prodotto.",
    'Deliver AI-powered calorie and nutrition insights': 'Fornire insight su calorie e nutrizione basati su AI',
    'Personalize meal planning and in-app recommendations': 'Personalizzare i piani pasto e le raccomandazioni in app',
    'Respond to support requests and maintain service reliability': 'Rispondere alle richieste di supporto e mantenere affidabile il servizio',
    'Detect abuse, secure accounts, and prevent fraud': 'Rilevare abusi, proteggere gli account e prevenire frodi',
    '3. Sharing and Disclosure': '3. Condivisione e divulgazione',
    'We do not sell your personal information. We only share data with trusted service providers that help us operate the platform, such as hosting, analytics, payment, and support tools.':
      'Non vendiamo le tue informazioni personali. Condividiamo i dati solo con fornitori affidabili che ci aiutano a gestire la piattaforma, come hosting, analytics, pagamenti e strumenti di supporto.',
    'We may disclose information when required by law, to enforce our terms, or to protect the rights, safety, and security of Calkilo and its users.':
      'Possiamo divulgare informazioni quando richiesto dalla legge, per far rispettare i nostri termini o per proteggere i diritti, la sicurezza e la tutela di Calkilo e dei suoi utenti.',
    '4. Data Retention': '4. Conservazione dei dati',
    'We retain personal information for as long as your account is active or as needed to provide services, resolve disputes, and comply with legal obligations.':
      "Conserviamo le informazioni personali finche il tuo account e attivo o per il tempo necessario a fornire servizi, risolvere controversie e rispettare gli obblighi legali.",
    'You can request deletion of your account and associated data on our account deletion page at /account-deletion or by emailing privacy@calkilo.app.':
      "Puoi richiedere la cancellazione del tuo account e dei dati associati dalla nostra pagina di eliminazione account su /account-deletion oppure scrivendo a privacy@calkilo.app.",
    '5. Your Privacy Rights': '5. I tuoi diritti sulla privacy',
    'Depending on your location, you may have rights to access, correct, delete, or export your personal data, and to object to certain processing activities.':
      'A seconda della tua posizione, potresti avere il diritto di accedere, correggere, eliminare o esportare i tuoi dati personali e di opporti ad alcune attivita di trattamento.',
    'To submit a privacy request, email support@calkilo.app with the subject line "Privacy Request". We will verify your identity before processing your request.':
      'Per inviare una richiesta privacy, scrivi a support@calkilo.app con oggetto "Richiesta privacy". Verificheremo la tua identita prima di elaborare la richiesta.',
    "6. Children's Privacy": '6. Privacy dei minori',
    'Calkilo is not directed to children under 13, and we do not knowingly collect personal information from children under 13 without appropriate consent.':
      'Calkilo non e rivolto ai minori di 13 anni e non raccogliamo consapevolmente informazioni personali da minori di 13 anni senza adeguato consenso.',
    'If you believe a child has provided personal information to us, contact support@calkilo.app so we can take appropriate action.':
      'Se ritieni che un minore ci abbia fornito dati personali, contatta support@calkilo.app cosi potremo intervenire in modo appropriato.',
    '7. Policy Updates': '7. Aggiornamenti della policy',
    'We may update this Privacy Policy periodically to reflect product, legal, or operational changes. When we make material updates, we will revise the effective date and provide notice where required.':
      'Possiamo aggiornare periodicamente questa informativa sulla privacy per riflettere cambiamenti di prodotto, legali o operativi. Quando apportiamo aggiornamenti rilevanti, aggiorneremo la data di entrata in vigore e forniremo un avviso quando necessario.',
    'The current version of this policy became effective on February 25, 2026.':
      'La versione attuale di questa informativa e entrata in vigore il 25 febbraio 2026.',
  },
}

const TERMS_TRANSLATIONS: TranslationTable = {
  nl: {
    'Calkilo Terms of Service': 'Calkilo Servicevoorwaarden',
    'Read Calkilo terms of service for account usage, subscriptions, and legal conditions.':
      'Lees de servicevoorwaarden van Calkilo voor accountgebruik, abonnementen en juridische voorwaarden.',
    'These terms explain the rules, rights, and responsibilities that apply when you use Calkilo.':
      'Deze voorwaarden leggen de regels, rechten en verantwoordelijkheden uit die gelden wanneer je Calkilo gebruikt.',
    'Calkilo Terms and Conditions': 'Calkilo Algemene voorwaarden',
    'Read Calkilo terms and conditions for account usage, subscriptions, and legal conditions.':
      'Lees de algemene voorwaarden van Calkilo voor accountgebruik, abonnementen en juridische voorwaarden.',
    'By using Calkilo, you agree to use the service lawfully, maintain accurate account information, and follow subscription and acceptable-use rules. Calkilo content is provided for informational purposes and not as medical advice.':
      'Door Calkilo te gebruiken, ga je ermee akkoord de dienst rechtmatig te gebruiken, correcte accountinformatie te behouden en de regels voor abonnementen en aanvaardbaar gebruik te volgen. Inhoud van Calkilo is uitsluitend informatief en geen medisch advies.',
    '1. Acceptance of Terms': '1. Aanvaarding van de voorwaarden',
    'By accessing or using Calkilo, you agree to these Terms of Service and our Privacy Policy.':
      'Door Calkilo te openen of te gebruiken, ga je akkoord met deze servicevoorwaarden en ons privacybeleid.',
    'By accessing or using Calkilo, you agree to these Terms and Conditions and our Privacy Policy.':
      'Door Calkilo te openen of te gebruiken, ga je akkoord met deze algemene voorwaarden en ons privacybeleid.',
    'If you do not agree to these terms, do not use the service.':
      'Als je niet akkoord gaat met deze voorwaarden, gebruik de dienst dan niet.',
    '2. Eligibility and Accounts': '2. Geschiktheid en accounts',
    'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.':
      'Je bent verantwoordelijk voor het vertrouwelijk houden van je accountgegevens en voor alle activiteiten onder je account.',
    'You must provide accurate account information and promptly update it when your details change.':
      'Je moet correcte accountinformatie verstrekken en deze direct bijwerken wanneer je gegevens veranderen.',
    'You must be at least 13 years old to use Calkilo.':
      'Je moet minimaal 13 jaar oud zijn om Calkilo te gebruiken.',
    'You may not impersonate another person or entity.':
      'Je mag je niet voordoen als een andere persoon of entiteit.',
    'You may not share account access in a way that violates these terms.':
      'Je mag accounttoegang niet delen op een manier die deze voorwaarden schendt.',
    '3. Service Description': '3. Beschrijving van de dienst',
    'Calkilo provides nutrition tracking, AI-powered food analysis, and related wellness features.':
      'Calkilo biedt voedingstracking, AI-gestuurde voedingsanalyse en gerelateerde welzijnsfuncties.',
    'Features may change over time, and some capabilities may require a paid subscription.':
      'Functies kunnen in de loop van de tijd veranderen en voor sommige mogelijkheden is een betaald abonnement nodig.',
    '4. Subscriptions and Billing': '4. Abonnementen en facturatie',
    'Paid plans are billed according to the plan selected at checkout. Unless canceled, subscriptions may auto-renew based on the applicable billing cycle.':
      'Betaalde plannen worden gefactureerd volgens het plan dat je bij het afrekenen kiest. Tenzij opgezegd, kunnen abonnementen automatisch worden verlengd volgens de toepasselijke factureringscyclus.',
    'You are responsible for all applicable taxes, fees, and payment method updates needed to keep your subscription active.':
      'Je bent verantwoordelijk voor alle toepasselijke belastingen, kosten en updates van betaalmethoden die nodig zijn om je abonnement actief te houden.',
    '5. Acceptable Use': '5. Toegestaan gebruik',
    'You agree to use Calkilo only for lawful purposes and in compliance with all applicable laws.':
      'Je gaat ermee akkoord Calkilo alleen voor rechtmatige doeleinden en in overeenstemming met alle toepasselijke wetten te gebruiken.',
    'You may not misuse the platform, interfere with service operations, or attempt unauthorized access to systems or data.':
      'Je mag het platform niet misbruiken, de werking van de dienst niet verstoren en geen ongeautoriseerde toegang tot systemen of gegevens proberen te krijgen.',
    'No reverse engineering or attempts to extract source code where prohibited by law.':
      'Geen reverse engineering of pogingen om broncode te extraheren waar dit wettelijk verboden is.',
    'No uploading malicious code, spam, or abusive content.':
      'Geen upload van schadelijke code, spam of beledigende inhoud.',
    'No use of the service to violate intellectual property or privacy rights.':
      'Geen gebruik van de dienst om intellectuele eigendomsrechten of privacyrechten te schenden.',
    '6. Intellectual Property': '6. Intellectueel eigendom',
    'All content, trademarks, and software in Calkilo are owned by Calkilo or its licensors and are protected by intellectual property laws.':
      'Alle inhoud, handelsmerken en software in Calkilo zijn eigendom van Calkilo of diens licentiegevers en worden beschermd door intellectuele-eigendomswetten.',
    'You receive a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes.':
      'Je ontvangt een beperkte, niet-exclusieve en niet-overdraagbare licentie om de dienst voor persoonlijke, niet-commerciele doeleinden te gebruiken.',
    '7. Health and Accuracy Disclaimer': '7. Gezondheids- en nauwkeurigheidsdisclaimer',
    'Calkilo provides informational and educational content only and is not a medical service. It does not replace professional medical advice, diagnosis, or treatment.':
      'Calkilo biedt uitsluitend informatieve en educatieve inhoud en is geen medische dienst. Het vervangt geen professioneel medisch advies, diagnose of behandeling.',
    'Nutritional estimates and AI outputs may vary and should be used as guidance, not guaranteed measurements.':
      'Voedingsschattingen en AI-uitvoer kunnen variëren en moeten worden gebruikt als richtlijn, niet als gegarandeerde metingen.',
    '8. Limitation of Liability': '8. Beperking van aansprakelijkheid',
    'To the fullest extent permitted by law, Calkilo is not liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.':
      'Voor zover wettelijk toegestaan, is Calkilo niet aansprakelijk voor indirecte, incidentele, bijzondere, gevolg- of bestraffende schade die voortvloeit uit jouw gebruik van de dienst.',
    'Our total liability for any claim related to the service is limited to the amount you paid to Calkilo in the 12 months before the event giving rise to the claim.':
      'Onze totale aansprakelijkheid voor enige claim met betrekking tot de dienst is beperkt tot het bedrag dat je in de 12 maanden voorafgaand aan de gebeurtenis die aanleiding gaf tot de claim aan Calkilo hebt betaald.',
    '9. Termination': '9. Beeindiging',
    'You may stop using the service at any time. We may suspend or terminate access if you violate these terms or if required for security, legal, or operational reasons.':
      'Je kunt op elk moment stoppen met het gebruik van de dienst. Wij kunnen de toegang opschorten of beeindigen als je deze voorwaarden schendt of als dit nodig is om veiligheids-, juridische of operationele redenen.',
    'Upon termination, rights granted to you under these terms will end, while provisions that should survive termination will remain in effect.':
      'Bij beeindiging eindigen de rechten die onder deze voorwaarden aan jou zijn verleend, terwijl bepalingen die van kracht moeten blijven, van kracht blijven.',
    '10. Changes to Terms': '10. Wijzigingen van de voorwaarden',
    'We may revise these Terms of Service from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'We kunnen deze servicevoorwaarden van tijd tot tijd herzien. Belangrijke updates worden weergegeven door de ingangsdatum te wijzigen en waar nodig kennis te geven.',
    'We may revise these Terms and Conditions from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'We kunnen deze algemene voorwaarden van tijd tot tijd herzien. Belangrijke updates worden weergegeven door de ingangsdatum te wijzigen en waar nodig kennis te geven.',
    'These terms are effective as of February 25, 2026.':
      'Deze voorwaarden zijn van kracht vanaf 25 februari 2026.',
    '11. Contact Information': '11. Contactinformatie',
    'If you have questions about these Terms of Service, contact us at support@calkilo.app.':
      'Als je vragen hebt over deze servicevoorwaarden, neem dan contact met ons op via support@calkilo.app.',
    'If you have questions about these Terms and Conditions, contact us at support@calkilo.app.':
      'Als je vragen hebt over deze algemene voorwaarden, neem dan contact met ons op via support@calkilo.app.',
    'For privacy-related matters, contact privacy@calkilo.app.':
      'Voor privacygerelateerde zaken kun je contact opnemen via privacy@calkilo.app.',
  },
  ru: {
    'Calkilo Terms of Service': 'Условия использования Calkilo',
    'Read Calkilo terms of service for account usage, subscriptions, and legal conditions.':
      'Прочитайте условия использования Calkilo для правил аккаунта, подписок и юридических условий.',
    'These terms explain the rules, rights, and responsibilities that apply when you use Calkilo.':
      'Эти условия объясняют правила, права и обязанности, которые действуют при использовании Calkilo.',
    'Calkilo Terms and Conditions': 'Положения и условия Calkilo',
    'Read Calkilo terms and conditions for account usage, subscriptions, and legal conditions.':
      'Прочитайте положения и условия Calkilo для правил аккаунта, подписок и юридических условий.',
    'By using Calkilo, you agree to use the service lawfully, maintain accurate account information, and follow subscription and acceptable-use rules. Calkilo content is provided for informational purposes and not as medical advice.':
      'Используя Calkilo, вы соглашаетесь пользоваться сервисом законно, поддерживать актуальность данных аккаунта и соблюдать правила подписки и допустимого использования. Контент Calkilo предоставляется только в информационных целях и не является медицинской консультацией.',
    '1. Acceptance of Terms': '1. Принятие условий',
    'By accessing or using Calkilo, you agree to these Terms of Service and our Privacy Policy.':
      'Получая доступ к Calkilo или используя его, вы соглашаетесь с этими Условиями использования и нашей Политикой конфиденциальности.',
    'By accessing or using Calkilo, you agree to these Terms and Conditions and our Privacy Policy.':
      'Получая доступ к Calkilo или используя его, вы соглашаетесь с этими Положениями и условиями и нашей Политикой конфиденциальности.',
    'If you do not agree to these terms, do not use the service.':
      'Если вы не согласны с этими условиями, не используйте сервис.',
    '2. Eligibility and Accounts': '2. Право на использование и аккаунты',
    'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.':
      'Вы несете ответственность за сохранение конфиденциальности учетных данных аккаунта и за всю активность в вашем аккаунте.',
    'You must provide accurate account information and promptly update it when your details change.':
      'Вы обязаны предоставлять точную информацию об аккаунте и своевременно обновлять ее при изменении данных.',
    'You must be at least 13 years old to use Calkilo.':
      'Для использования Calkilo вам должно быть не менее 13 лет.',
    'You may not impersonate another person or entity.':
      'Вы не можете выдавать себя за другое лицо или организацию.',
    'You may not share account access in a way that violates these terms.':
      'Вы не можете передавать доступ к аккаунту способом, нарушающим эти условия.',
    '3. Service Description': '3. Описание сервиса',
    'Calkilo provides nutrition tracking, AI-powered food analysis, and related wellness features.':
      'Calkilo предоставляет функции трекинга питания, AI-анализа еды и другие wellness-возможности.',
    'Features may change over time, and some capabilities may require a paid subscription.':
      'Функции могут меняться со временем, а для некоторых возможностей может потребоваться платная подписка.',
    '4. Subscriptions and Billing': '4. Подписки и оплата',
    'Paid plans are billed according to the plan selected at checkout. Unless canceled, subscriptions may auto-renew based on the applicable billing cycle.':
      'Платные планы оплачиваются в соответствии с выбранным тарифом при оформлении. Если подписка не отменена, она может продлеваться автоматически в зависимости от соответствующего платежного периода.',
    'You are responsible for all applicable taxes, fees, and payment method updates needed to keep your subscription active.':
      'Вы несете ответственность за все применимые налоги, сборы и обновления способа оплаты, необходимые для поддержания активной подписки.',
    '5. Acceptable Use': '5. Допустимое использование',
    'You agree to use Calkilo only for lawful purposes and in compliance with all applicable laws.':
      'Вы соглашаетесь использовать Calkilo только в законных целях и в соответствии со всеми применимыми законами.',
    'You may not misuse the platform, interfere with service operations, or attempt unauthorized access to systems or data.':
      'Вы не можете злоупотреблять платформой, вмешиваться в работу сервиса или пытаться получить несанкционированный доступ к системам или данным.',
    'No reverse engineering or attempts to extract source code where prohibited by law.':
      'Запрещены обратная разработка и попытки извлечения исходного кода, если это запрещено законом.',
    'No uploading malicious code, spam, or abusive content.':
      'Запрещена загрузка вредоносного кода, спама или оскорбительного контента.',
    'No use of the service to violate intellectual property or privacy rights.':
      'Запрещено использовать сервис для нарушения прав интеллектуальной собственности или прав на конфиденциальность.',
    '6. Intellectual Property': '6. Интеллектуальная собственность',
    'All content, trademarks, and software in Calkilo are owned by Calkilo or its licensors and are protected by intellectual property laws.':
      'Весь контент, товарные знаки и программное обеспечение в Calkilo принадлежат Calkilo или его лицензиарам и защищены законами об интеллектуальной собственности.',
    'You receive a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes.':
      'Вы получаете ограниченную, неисключительную и непередаваемую лицензию на использование сервиса в личных некоммерческих целях.',
    '7. Health and Accuracy Disclaimer': '7. Отказ от ответственности за здоровье и точность',
    'Calkilo provides informational and educational content only and is not a medical service. It does not replace professional medical advice, diagnosis, or treatment.':
      'Calkilo предоставляет только информационный и образовательный контент и не является медицинским сервисом. Он не заменяет профессиональную медицинскую консультацию, диагностику или лечение.',
    'Nutritional estimates and AI outputs may vary and should be used as guidance, not guaranteed measurements.':
      'Оценки питания и результаты AI могут отличаться и должны использоваться как ориентир, а не как гарантированные измерения.',
    '8. Limitation of Liability': '8. Ограничение ответственности',
    'To the fullest extent permitted by law, Calkilo is not liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.':
      'В максимально допустимой законом степени Calkilo не несет ответственности за косвенные, случайные, специальные, последующие или штрафные убытки, возникающие в связи с использованием вами сервиса.',
    'Our total liability for any claim related to the service is limited to the amount you paid to Calkilo in the 12 months before the event giving rise to the claim.':
      'Наша общая ответственность по любым требованиям, связанным с сервисом, ограничивается суммой, которую вы заплатили Calkilo за 12 месяцев до события, вызвавшего требование.',
    '9. Termination': '9. Прекращение действия',
    'You may stop using the service at any time. We may suspend or terminate access if you violate these terms or if required for security, legal, or operational reasons.':
      'Вы можете прекратить использование сервиса в любое время. Мы можем приостановить или прекратить доступ, если вы нарушите эти условия или если это потребуется по соображениям безопасности, закона или эксплуатации.',
    'Upon termination, rights granted to you under these terms will end, while provisions that should survive termination will remain in effect.':
      'После прекращения действия все права, предоставленные вам по этим условиям, прекращаются, а положения, которые должны сохранять силу, продолжают действовать.',
    '10. Changes to Terms': '10. Изменения условий',
    'We may revise these Terms of Service from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'Мы можем время от времени пересматривать эти Условия использования. Существенные изменения будут отражены обновлением даты вступления в силу и, при необходимости, уведомлением.',
    'We may revise these Terms and Conditions from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'Мы можем время от времени пересматривать эти Положения и условия. Существенные изменения будут отражены обновлением даты вступления в силу и, при необходимости, уведомлением.',
    'These terms are effective as of February 25, 2026.':
      'Эти условия действуют с 25 февраля 2026 года.',
    '11. Contact Information': '11. Контактная информация',
    'If you have questions about these Terms of Service, contact us at support@calkilo.app.':
      'Если у вас есть вопросы по этим Условиям использования, свяжитесь с нами по адресу support@calkilo.app.',
    'If you have questions about these Terms and Conditions, contact us at support@calkilo.app.':
      'Если у вас есть вопросы по этим Положениям и условиям, свяжитесь с нами по адресу support@calkilo.app.',
    'For privacy-related matters, contact privacy@calkilo.app.':
      'По вопросам конфиденциальности обращайтесь по адресу privacy@calkilo.app.',
  },
  zh: {
    'Calkilo Terms of Service': 'Calkilo 服务条款',
    'Read Calkilo terms of service for account usage, subscriptions, and legal conditions.':
      '阅读 Calkilo 服务条款，了解账户使用、订阅和法律条件。',
    'These terms explain the rules, rights, and responsibilities that apply when you use Calkilo.':
      '这些条款说明你在使用 Calkilo 时适用的规则、权利和责任。',
    'Calkilo Terms and Conditions': 'Calkilo 条款与条件',
    'Read Calkilo terms and conditions for account usage, subscriptions, and legal conditions.':
      '阅读 Calkilo 条款与条件，了解账户使用、订阅和法律条件。',
    'By using Calkilo, you agree to use the service lawfully, maintain accurate account information, and follow subscription and acceptable-use rules. Calkilo content is provided for informational purposes and not as medical advice.':
      '使用 Calkilo 即表示你同意合法使用本服务、维护准确的账户信息，并遵守订阅和可接受使用规则。Calkilo 内容仅供信息参考，并非医疗建议。',
    '1. Acceptance of Terms': '1. 接受条款',
    'By accessing or using Calkilo, you agree to these Terms of Service and our Privacy Policy.':
      '访问或使用 Calkilo 即表示你同意这些服务条款以及我们的隐私政策。',
    'By accessing or using Calkilo, you agree to these Terms and Conditions and our Privacy Policy.':
      '访问或使用 Calkilo 即表示你同意这些条款与条件以及我们的隐私政策。',
    'If you do not agree to these terms, do not use the service.':
      '如果你不同意这些条款，请不要使用本服务。',
    '2. Eligibility and Accounts': '2. 使用资格与账户',
    'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.':
      '你有责任保护账户凭据的机密性，并对你账户下的所有活动负责。',
    'You must provide accurate account information and promptly update it when your details change.':
      '你必须提供准确的账户信息，并在信息发生变化时及时更新。',
    'You must be at least 13 years old to use Calkilo.':
      '使用 Calkilo 你必须年满 13 岁。',
    'You may not impersonate another person or entity.':
      '你不得冒充其他个人或实体。',
    'You may not share account access in a way that violates these terms.':
      '你不得以违反这些条款的方式共享账户访问权限。',
    '3. Service Description': '3. 服务说明',
    'Calkilo provides nutrition tracking, AI-powered food analysis, and related wellness features.':
      'Calkilo 提供营养追踪、AI 食物分析以及相关健康功能。',
    'Features may change over time, and some capabilities may require a paid subscription.':
      '功能可能会随时间变化，某些能力可能需要付费订阅。',
    '4. Subscriptions and Billing': '4. 订阅与计费',
    'Paid plans are billed according to the plan selected at checkout. Unless canceled, subscriptions may auto-renew based on the applicable billing cycle.':
      '付费计划将根据结账时选择的方案计费。除非取消，否则订阅可能会根据适用的计费周期自动续费。',
    'You are responsible for all applicable taxes, fees, and payment method updates needed to keep your subscription active.':
      '你有责任承担维持订阅有效所需的适用税费、费用以及支付方式更新。',
    '5. Acceptable Use': '5. 可接受使用',
    'You agree to use Calkilo only for lawful purposes and in compliance with all applicable laws.':
      '你同意仅将 Calkilo 用于合法目的，并遵守所有适用法律。',
    'You may not misuse the platform, interfere with service operations, or attempt unauthorized access to systems or data.':
      '你不得滥用平台、干扰服务运行，或尝试未经授权访问系统或数据。',
    'No reverse engineering or attempts to extract source code where prohibited by law.':
      '在法律禁止的情况下，不得进行逆向工程或尝试提取源代码。',
    'No uploading malicious code, spam, or abusive content.':
      '不得上传恶意代码、垃圾信息或辱骂性内容。',
    'No use of the service to violate intellectual property or privacy rights.':
      '不得利用本服务侵犯知识产权或隐私权。',
    '6. Intellectual Property': '6. 知识产权',
    'All content, trademarks, and software in Calkilo are owned by Calkilo or its licensors and are protected by intellectual property laws.':
      'Calkilo 中的所有内容、商标和软件均归 Calkilo 或其许可方所有，并受知识产权法律保护。',
    'You receive a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes.':
      '你获得的是有限的、非独占的、不可转让的许可，仅可将本服务用于个人非商业目的。',
    '7. Health and Accuracy Disclaimer': '7. 健康与准确性免责声明',
    'Calkilo provides informational and educational content only and is not a medical service. It does not replace professional medical advice, diagnosis, or treatment.':
      'Calkilo 仅提供信息和教育内容，并非医疗服务。它不能替代专业医疗建议、诊断或治疗。',
    'Nutritional estimates and AI outputs may vary and should be used as guidance, not guaranteed measurements.':
      '营养估算和 AI 输出可能会有所差异，应仅作为参考，而非保证性的测量结果。',
    '8. Limitation of Liability': '8. 责任限制',
    'To the fullest extent permitted by law, Calkilo is not liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.':
      '在法律允许的最大范围内，Calkilo 不对因你使用本服务而产生的间接、偶发、特殊、后果性或惩罚性损害承担责任。',
    'Our total liability for any claim related to the service is limited to the amount you paid to Calkilo in the 12 months before the event giving rise to the claim.':
      '对于任何与服务相关的索赔，我们的总责任以导致该索赔事件发生前 12 个月内你向 Calkilo 支付的金额为限。',
    '9. Termination': '9. 终止',
    'You may stop using the service at any time. We may suspend or terminate access if you violate these terms or if required for security, legal, or operational reasons.':
      '你可以随时停止使用本服务。如果你违反这些条款，或出于安全、法律或运营原因需要，我们可以暂停或终止你的访问权限。',
    'Upon termination, rights granted to you under these terms will end, while provisions that should survive termination will remain in effect.':
      '终止后，根据这些条款授予你的权利将结束，而应在终止后继续有效的条款仍将继续有效。',
    '10. Changes to Terms': '10. 条款变更',
    'We may revise these Terms of Service from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      '我们可能会不时修订这些服务条款。重大更新将通过更新生效日期并在需要时提供通知来体现。',
    'We may revise these Terms and Conditions from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      '我们可能会不时修订这些条款与条件。重大更新将通过更新生效日期并在需要时提供通知来体现。',
    'These terms are effective as of February 25, 2026.':
      '这些条款自 2026 年 2 月 25 日起生效。',
    '11. Contact Information': '11. 联系信息',
    'If you have questions about these Terms of Service, contact us at support@calkilo.app.':
      '如果你对这些服务条款有任何疑问，请通过 support@calkilo.app 联系我们。',
    'If you have questions about these Terms and Conditions, contact us at support@calkilo.app.':
      '如果你对这些条款与条件有任何疑问，请通过 support@calkilo.app 联系我们。',
    'For privacy-related matters, contact privacy@calkilo.app.':
      '如涉及隐私相关事项，请联系 privacy@calkilo.app。',
  },
  ar: {
    'Calkilo Terms of Service': 'شروط خدمة Calkilo',
    'Read Calkilo terms of service for account usage, subscriptions, and legal conditions.':
      'اقرأ شروط خدمة Calkilo المتعلقة باستخدام الحساب والاشتراكات والشروط القانونية.',
    'These terms explain the rules, rights, and responsibilities that apply when you use Calkilo.':
      'توضح هذه الشروط القواعد والحقوق والمسؤوليات التي تنطبق عند استخدامك لـ Calkilo.',
    'Calkilo Terms and Conditions': 'أحكام وشروط Calkilo',
    'Read Calkilo terms and conditions for account usage, subscriptions, and legal conditions.':
      'اقرأ أحكام وشروط Calkilo المتعلقة باستخدام الحساب والاشتراكات والشروط القانونية.',
    'By using Calkilo, you agree to use the service lawfully, maintain accurate account information, and follow subscription and acceptable-use rules. Calkilo content is provided for informational purposes and not as medical advice.':
      'باستخدام Calkilo، فإنك توافق على استخدام الخدمة بشكل قانوني، والحفاظ على دقة معلومات الحساب، واتباع قواعد الاشتراك والاستخدام المقبول. يتم تقديم محتوى Calkilo لأغراض معلوماتية فقط وليس كاستشارة طبية.',
    '1. Acceptance of Terms': '1. قبول الشروط',
    'By accessing or using Calkilo, you agree to these Terms of Service and our Privacy Policy.':
      'من خلال الوصول إلى Calkilo أو استخدامه، فإنك توافق على شروط الخدمة هذه وعلى سياسة الخصوصية الخاصة بنا.',
    'By accessing or using Calkilo, you agree to these Terms and Conditions and our Privacy Policy.':
      'من خلال الوصول إلى Calkilo أو استخدامه، فإنك توافق على هذه الأحكام والشروط وعلى سياسة الخصوصية الخاصة بنا.',
    'If you do not agree to these terms, do not use the service.':
      'إذا كنت لا توافق على هذه الشروط، فلا تستخدم الخدمة.',
    '2. Eligibility and Accounts': '2. الأهلية والحسابات',
    'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.':
      'أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك وعن جميع الأنشطة التي تتم من خلال حسابك.',
    'You must provide accurate account information and promptly update it when your details change.':
      'يجب عليك تقديم معلومات حساب دقيقة وتحديثها بسرعة عند تغير بياناتك.',
    'You must be at least 13 years old to use Calkilo.':
      'يجب أن يكون عمرك 13 عاما على الأقل لاستخدام Calkilo.',
    'You may not impersonate another person or entity.':
      'لا يجوز لك انتحال شخصية شخص أو جهة أخرى.',
    'You may not share account access in a way that violates these terms.':
      'لا يجوز لك مشاركة الوصول إلى الحساب بطريقة تخالف هذه الشروط.',
    '3. Service Description': '3. وصف الخدمة',
    'Calkilo provides nutrition tracking, AI-powered food analysis, and related wellness features.':
      'يوفر Calkilo تتبع التغذية وتحليل الطعام بالذكاء الاصطناعي وميزات صحة ذات صلة.',
    'Features may change over time, and some capabilities may require a paid subscription.':
      'قد تتغير الميزات بمرور الوقت، وقد تتطلب بعض الإمكانيات اشتراكا مدفوعا.',
    '4. Subscriptions and Billing': '4. الاشتراكات والفوترة',
    'Paid plans are billed according to the plan selected at checkout. Unless canceled, subscriptions may auto-renew based on the applicable billing cycle.':
      'تتم فوترة الخطط المدفوعة وفقا للخطة التي تختارها عند الدفع. وما لم يتم الإلغاء، فقد يتم تجديد الاشتراكات تلقائيا وفقا لدورة الفوترة المعمول بها.',
    'You are responsible for all applicable taxes, fees, and payment method updates needed to keep your subscription active.':
      'أنت مسؤول عن جميع الضرائب والرسوم المطبقة وتحديثات وسيلة الدفع اللازمة للحفاظ على اشتراكك نشطا.',
    '5. Acceptable Use': '5. الاستخدام المقبول',
    'You agree to use Calkilo only for lawful purposes and in compliance with all applicable laws.':
      'أنت توافق على استخدام Calkilo فقط لأغراض قانونية وبما يتوافق مع جميع القوانين المعمول بها.',
    'You may not misuse the platform, interfere with service operations, or attempt unauthorized access to systems or data.':
      'لا يجوز لك إساءة استخدام المنصة أو التدخل في تشغيل الخدمة أو محاولة الوصول غير المصرح به إلى الأنظمة أو البيانات.',
    'No reverse engineering or attempts to extract source code where prohibited by law.':
      'يُحظر إجراء الهندسة العكسية أو محاولة استخراج الشيفرة المصدرية حيث يمنع القانون ذلك.',
    'No uploading malicious code, spam, or abusive content.':
      'يُحظر تحميل الشيفرات الخبيثة أو الرسائل المزعجة أو المحتوى المسيء.',
    'No use of the service to violate intellectual property or privacy rights.':
      'يُحظر استخدام الخدمة لانتهاك حقوق الملكية الفكرية أو حقوق الخصوصية.',
    '6. Intellectual Property': '6. الملكية الفكرية',
    'All content, trademarks, and software in Calkilo are owned by Calkilo or its licensors and are protected by intellectual property laws.':
      'جميع المحتويات والعلامات التجارية والبرامج داخل Calkilo مملوكة لـ Calkilo أو لمرخّصيها ومحمية بقوانين الملكية الفكرية.',
    'You receive a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes.':
      'تحصل على ترخيص محدود وغير حصري وغير قابل للتحويل لاستخدام الخدمة لأغراض شخصية غير تجارية.',
    '7. Health and Accuracy Disclaimer': '7. إخلاء مسؤولية الصحة والدقة',
    'Calkilo provides informational and educational content only and is not a medical service. It does not replace professional medical advice, diagnosis, or treatment.':
      'يوفر Calkilo محتوى معلوماتيا وتعليميا فقط وليس خدمة طبية. ولا يحل محل المشورة الطبية المهنية أو التشخيص أو العلاج.',
    'Nutritional estimates and AI outputs may vary and should be used as guidance, not guaranteed measurements.':
      'قد تختلف التقديرات الغذائية ومخرجات الذكاء الاصطناعي ويجب استخدامها كإرشاد لا كقياسات مضمونة.',
    '8. Limitation of Liability': '8. تحديد المسؤولية',
    'To the fullest extent permitted by law, Calkilo is not liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.':
      'إلى أقصى حد يسمح به القانون، لا تتحمل Calkilo مسؤولية الأضرار غير المباشرة أو العرضية أو الخاصة أو التبعية أو العقابية الناشئة عن استخدامك للخدمة.',
    'Our total liability for any claim related to the service is limited to the amount you paid to Calkilo in the 12 months before the event giving rise to the claim.':
      'تقتصر مسؤوليتنا الإجمالية عن أي مطالبة تتعلق بالخدمة على المبلغ الذي دفعته إلى Calkilo خلال الاثني عشر شهرا السابقة للحدث الذي أدى إلى المطالبة.',
    '9. Termination': '9. الإنهاء',
    'You may stop using the service at any time. We may suspend or terminate access if you violate these terms or if required for security, legal, or operational reasons.':
      'يمكنك التوقف عن استخدام الخدمة في أي وقت. وقد نقوم بتعليق الوصول أو إنهائه إذا خالفت هذه الشروط أو إذا كان ذلك مطلوبا لأسباب أمنية أو قانونية أو تشغيلية.',
    'Upon termination, rights granted to you under these terms will end, while provisions that should survive termination will remain in effect.':
      'عند الإنهاء، تنتهي الحقوق الممنوحة لك بموجب هذه الشروط، بينما تستمر الأحكام التي يفترض أن تبقى بعد الإنهاء سارية المفعول.',
    '10. Changes to Terms': '10. التغييرات على الشروط',
    'We may revise these Terms of Service from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'قد نقوم بمراجعة شروط الخدمة هذه من وقت لآخر. وستنعكس التحديثات الجوهرية عبر تحديث تاريخ السريان وتقديم إشعار عند الحاجة.',
    'We may revise these Terms and Conditions from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'قد نقوم بمراجعة هذه الأحكام والشروط من وقت لآخر. وستنعكس التحديثات الجوهرية عبر تحديث تاريخ السريان وتقديم إشعار عند الحاجة.',
    'These terms are effective as of February 25, 2026.':
      'تسري هذه الشروط اعتبارا من 25 فبراير 2026.',
    '11. Contact Information': '11. معلومات الاتصال',
    'If you have questions about these Terms of Service, contact us at support@calkilo.app.':
      'إذا كانت لديك أسئلة حول شروط الخدمة هذه، فتواصل معنا عبر support@calkilo.app.',
    'If you have questions about these Terms and Conditions, contact us at support@calkilo.app.':
      'إذا كانت لديك أسئلة حول هذه الأحكام والشروط، فتواصل معنا عبر support@calkilo.app.',
    'For privacy-related matters, contact privacy@calkilo.app.':
      'للمسائل المتعلقة بالخصوصية، تواصل عبر privacy@calkilo.app.',
  },
  fa: {
    'Calkilo Terms of Service': 'شرایط استفاده Calkilo',
    'Read Calkilo terms of service for account usage, subscriptions, and legal conditions.':
      'شرایط استفاده Calkilo را برای نحوه استفاده از حساب، اشتراک‌ها و شرایط حقوقی بخوانید.',
    'These terms explain the rules, rights, and responsibilities that apply when you use Calkilo.':
      'این شرایط، قوانین، حقوق و مسئولیت‌هایی را توضیح می‌دهد که هنگام استفاده از Calkilo بر شما اعمال می‌شود.',
    'Calkilo Terms and Conditions': 'قوانین و شرایط Calkilo',
    'Read Calkilo terms and conditions for account usage, subscriptions, and legal conditions.':
      'قوانین و شرایط Calkilo را برای استفاده از حساب، اشتراک‌ها و شرایط حقوقی بخوانید.',
    'By using Calkilo, you agree to use the service lawfully, maintain accurate account information, and follow subscription and acceptable-use rules. Calkilo content is provided for informational purposes and not as medical advice.':
      'با استفاده از Calkilo، موافقت می‌کنید که از سرویس به‌صورت قانونی استفاده کنید، اطلاعات حساب را دقیق نگه دارید و قوانین اشتراک و استفاده مجاز را رعایت کنید. محتوای Calkilo فقط برای اطلاع‌رسانی است و توصیه پزشکی محسوب نمی‌شود.',
    '1. Acceptance of Terms': '1. پذیرش شرایط',
    'By accessing or using Calkilo, you agree to these Terms of Service and our Privacy Policy.':
      'با دسترسی یا استفاده از Calkilo، شما با این شرایط استفاده و سیاست حریم خصوصی ما موافقت می‌کنید.',
    'By accessing or using Calkilo, you agree to these Terms and Conditions and our Privacy Policy.':
      'با دسترسی یا استفاده از Calkilo، شما با این قوانین و شرایط و سیاست حریم خصوصی ما موافقت می‌کنید.',
    'If you do not agree to these terms, do not use the service.':
      'اگر با این شرایط موافق نیستید، از سرویس استفاده نکنید.',
    '2. Eligibility and Accounts': '2. شرایط استفاده و حساب‌ها',
    'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.':
      'شما مسئول حفظ محرمانگی اطلاعات ورود حساب خود و تمام فعالیت‌هایی هستید که در حساب شما انجام می‌شود.',
    'You must provide accurate account information and promptly update it when your details change.':
      'باید اطلاعات حساب دقیق ارائه دهید و در صورت تغییر، آن‌ها را سریعا به‌روزرسانی کنید.',
    'You must be at least 13 years old to use Calkilo.':
      'برای استفاده از Calkilo باید حداقل 13 سال سن داشته باشید.',
    'You may not impersonate another person or entity.':
      'شما مجاز نیستید خود را به‌جای شخص یا نهاد دیگری معرفی کنید.',
    'You may not share account access in a way that violates these terms.':
      'شما مجاز نیستید دسترسی حساب را به شکلی به اشتراک بگذارید که این شرایط را نقض کند.',
    '3. Service Description': '3. شرح سرویس',
    'Calkilo provides nutrition tracking, AI-powered food analysis, and related wellness features.':
      'Calkilo امکانات پیگیری تغذیه، تحلیل غذا با هوش مصنوعی و قابلیت‌های مرتبط با سلامت را ارائه می‌دهد.',
    'Features may change over time, and some capabilities may require a paid subscription.':
      'قابلیت‌ها ممکن است در طول زمان تغییر کنند و برخی امکانات نیاز به اشتراک پولی داشته باشند.',
    '4. Subscriptions and Billing': '4. اشتراک‌ها و پرداخت',
    'Paid plans are billed according to the plan selected at checkout. Unless canceled, subscriptions may auto-renew based on the applicable billing cycle.':
      'طرح‌های پولی بر اساس پلنی که هنگام پرداخت انتخاب می‌کنید صورتحساب می‌شوند. مگر اینکه لغو شوند، اشتراک‌ها ممکن است بر اساس چرخه پرداخت مربوطه به‌صورت خودکار تمدید شوند.',
    'You are responsible for all applicable taxes, fees, and payment method updates needed to keep your subscription active.':
      'شما مسئول همه مالیات‌ها، هزینه‌ها و به‌روزرسانی‌های روش پرداخت لازم برای فعال نگه داشتن اشتراک خود هستید.',
    '5. Acceptable Use': '5. استفاده مجاز',
    'You agree to use Calkilo only for lawful purposes and in compliance with all applicable laws.':
      'شما موافقت می‌کنید که از Calkilo فقط برای اهداف قانونی و مطابق با همه قوانین قابل اجرا استفاده کنید.',
    'You may not misuse the platform, interfere with service operations, or attempt unauthorized access to systems or data.':
      'شما مجاز نیستید از پلتفرم سوءاستفاده کنید، در عملکرد سرویس اختلال ایجاد کنید یا برای دسترسی غیرمجاز به سیستم‌ها یا داده‌ها تلاش کنید.',
    'No reverse engineering or attempts to extract source code where prohibited by law.':
      'در جایی که قانون منع می‌کند، مهندسی معکوس یا تلاش برای استخراج کد منبع ممنوع است.',
    'No uploading malicious code, spam, or abusive content.':
      'آپلود کد مخرب، هرزنامه یا محتوای توهین‌آمیز ممنوع است.',
    'No use of the service to violate intellectual property or privacy rights.':
      'استفاده از سرویس برای نقض حقوق مالکیت فکری یا حقوق حریم خصوصی ممنوع است.',
    '6. Intellectual Property': '6. مالکیت فکری',
    'All content, trademarks, and software in Calkilo are owned by Calkilo or its licensors and are protected by intellectual property laws.':
      'تمام محتوا، علائم تجاری و نرم‌افزارهای موجود در Calkilo متعلق به Calkilo یا اعطاکنندگان مجوز آن است و توسط قوانین مالکیت فکری محافظت می‌شود.',
    'You receive a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes.':
      'شما مجوزی محدود، غیرانحصاری و غیرقابل‌انتقال برای استفاده شخصی و غیرتجاری از سرویس دریافت می‌کنید.',
    '7. Health and Accuracy Disclaimer': '7. سلب مسئولیت سلامت و دقت',
    'Calkilo provides informational and educational content only and is not a medical service. It does not replace professional medical advice, diagnosis, or treatment.':
      'Calkilo فقط محتوای آموزشی و اطلاع‌رسانی ارائه می‌دهد و سرویس پزشکی نیست. این سرویس جایگزین مشاوره، تشخیص یا درمان حرفه‌ای پزشکی نمی‌شود.',
    'Nutritional estimates and AI outputs may vary and should be used as guidance, not guaranteed measurements.':
      'برآوردهای تغذیه‌ای و خروجی‌های هوش مصنوعی ممکن است متفاوت باشند و باید به‌عنوان راهنما استفاده شوند، نه اندازه‌گیری تضمین‌شده.',
    '8. Limitation of Liability': '8. محدودیت مسئولیت',
    'To the fullest extent permitted by law, Calkilo is not liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.':
      'تا بیشترین حدی که قانون اجازه می‌دهد، Calkilo مسئول خسارت‌های غیرمستقیم، اتفاقی، ویژه، تبعی یا تنبیهی ناشی از استفاده شما از سرویس نیست.',
    'Our total liability for any claim related to the service is limited to the amount you paid to Calkilo in the 12 months before the event giving rise to the claim.':
      'مسئولیت کلی ما برای هر ادعای مرتبط با سرویس، به مبلغی محدود می‌شود که در 12 ماه پیش از رویداد منجر به ادعا به Calkilo پرداخت کرده‌اید.',
    '9. Termination': '9. خاتمه',
    'You may stop using the service at any time. We may suspend or terminate access if you violate these terms or if required for security, legal, or operational reasons.':
      'شما می‌توانید هر زمان استفاده از سرویس را متوقف کنید. اگر این شرایط را نقض کنید یا به دلایل امنیتی، قانونی یا عملیاتی لازم باشد، ممکن است دسترسی شما را تعلیق یا قطع کنیم.',
    'Upon termination, rights granted to you under these terms will end, while provisions that should survive termination will remain in effect.':
      'با خاتمه، حقوقی که تحت این شرایط به شما داده شده پایان می‌یابد، اما بندهایی که باید پس از خاتمه باقی بمانند همچنان معتبر خواهند بود.',
    '10. Changes to Terms': '10. تغییرات در شرایط',
    'We may revise these Terms of Service from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'ممکن است هر از گاهی این شرایط استفاده را بازبینی کنیم. تغییرات مهم با به‌روزرسانی تاریخ اجرا و در صورت نیاز با اطلاع‌رسانی منعکس می‌شوند.',
    'We may revise these Terms and Conditions from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'ممکن است هر از گاهی این قوانین و شرایط را بازبینی کنیم. تغییرات مهم با به‌روزرسانی تاریخ اجرا و در صورت نیاز با اطلاع‌رسانی منعکس می‌شوند.',
    'These terms are effective as of February 25, 2026.':
      'این شرایط از 25 فوریه 2026 لازم‌الاجرا هستند.',
    '11. Contact Information': '11. اطلاعات تماس',
    'If you have questions about these Terms of Service, contact us at support@calkilo.app.':
      'اگر درباره این شرایط استفاده سوالی دارید، از طریق support@calkilo.app با ما تماس بگیرید.',
    'If you have questions about these Terms and Conditions, contact us at support@calkilo.app.':
      'اگر درباره این قوانین و شرایط سوالی دارید، از طریق support@calkilo.app با ما تماس بگیرید.',
    'For privacy-related matters, contact privacy@calkilo.app.':
      'برای مسائل مرتبط با حریم خصوصی، با privacy@calkilo.app تماس بگیرید.',
  },
  it: {
    'Calkilo Terms of Service': 'Termini di servizio di Calkilo',
    'Read Calkilo terms of service for account usage, subscriptions, and legal conditions.':
      "Leggi i termini di servizio di Calkilo per l'uso dell'account, gli abbonamenti e le condizioni legali.",
    'These terms explain the rules, rights, and responsibilities that apply when you use Calkilo.':
      'Questi termini spiegano le regole, i diritti e le responsabilita che si applicano quando utilizzi Calkilo.',
    'Calkilo Terms and Conditions': 'Termini e condizioni di Calkilo',
    'Read Calkilo terms and conditions for account usage, subscriptions, and legal conditions.':
      "Leggi i termini e condizioni di Calkilo per l'uso dell'account, gli abbonamenti e le condizioni legali.",
    'By using Calkilo, you agree to use the service lawfully, maintain accurate account information, and follow subscription and acceptable-use rules. Calkilo content is provided for informational purposes and not as medical advice.':
      'Utilizzando Calkilo, accetti di usare il servizio in modo lecito, mantenere accurate le informazioni del tuo account e seguire le regole di abbonamento e di uso accettabile. I contenuti di Calkilo sono forniti a scopo informativo e non come consiglio medico.',
    '1. Acceptance of Terms': '1. Accettazione dei termini',
    'By accessing or using Calkilo, you agree to these Terms of Service and our Privacy Policy.':
      "Accedendo a Calkilo o utilizzandolo, accetti questi Termini di servizio e la nostra Informativa sulla privacy.",
    'By accessing or using Calkilo, you agree to these Terms and Conditions and our Privacy Policy.':
      "Accedendo a Calkilo o utilizzandolo, accetti questi Termini e condizioni e la nostra Informativa sulla privacy.",
    'If you do not agree to these terms, do not use the service.':
      'Se non accetti questi termini, non utilizzare il servizio.',
    '2. Eligibility and Accounts': '2. Idoneita e account',
    'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.':
      "Sei responsabile di mantenere riservate le credenziali del tuo account e di tutte le attivita svolte tramite il tuo account.",
    'You must provide accurate account information and promptly update it when your details change.':
      "Devi fornire informazioni account accurate e aggiornarle tempestivamente quando i tuoi dati cambiano.",
    'You must be at least 13 years old to use Calkilo.':
      'Per usare Calkilo devi avere almeno 13 anni.',
    'You may not impersonate another person or entity.':
      'Non puoi impersonare un altra persona o entita.',
    'You may not share account access in a way that violates these terms.':
      'Non puoi condividere l accesso all account in modo contrario a questi termini.',
    '3. Service Description': '3. Descrizione del servizio',
    'Calkilo provides nutrition tracking, AI-powered food analysis, and related wellness features.':
      'Calkilo offre monitoraggio nutrizionale, analisi del cibo con AI e funzioni benessere correlate.',
    'Features may change over time, and some capabilities may require a paid subscription.':
      'Le funzionalita possono cambiare nel tempo e alcune capacita possono richiedere un abbonamento a pagamento.',
    '4. Subscriptions and Billing': '4. Abbonamenti e fatturazione',
    'Paid plans are billed according to the plan selected at checkout. Unless canceled, subscriptions may auto-renew based on the applicable billing cycle.':
      'I piani a pagamento vengono fatturati in base al piano scelto al checkout. Salvo cancellazione, gli abbonamenti possono rinnovarsi automaticamente in base al ciclo di fatturazione applicabile.',
    'You are responsible for all applicable taxes, fees, and payment method updates needed to keep your subscription active.':
      'Sei responsabile di tutte le imposte, commissioni e degli aggiornamenti del metodo di pagamento necessari per mantenere attivo il tuo abbonamento.',
    '5. Acceptable Use': '5. Uso consentito',
    'You agree to use Calkilo only for lawful purposes and in compliance with all applicable laws.':
      'Accetti di usare Calkilo solo per scopi leciti e in conformita con tutte le leggi applicabili.',
    'You may not misuse the platform, interfere with service operations, or attempt unauthorized access to systems or data.':
      'Non puoi abusare della piattaforma, interferire con il funzionamento del servizio o tentare accessi non autorizzati a sistemi o dati.',
    'No reverse engineering or attempts to extract source code where prohibited by law.':
      'Nessuna attivita di reverse engineering o tentativi di estrazione del codice sorgente dove vietato dalla legge.',
    'No uploading malicious code, spam, or abusive content.':
      'Nessun caricamento di codice malevolo, spam o contenuti offensivi.',
    'No use of the service to violate intellectual property or privacy rights.':
      'Nessun uso del servizio per violare diritti di proprieta intellettuale o di privacy.',
    '6. Intellectual Property': '6. Proprieta intellettuale',
    'All content, trademarks, and software in Calkilo are owned by Calkilo or its licensors and are protected by intellectual property laws.':
      'Tutti i contenuti, i marchi e il software di Calkilo sono di proprieta di Calkilo o dei suoi licenzianti e sono protetti dalle leggi sulla proprieta intellettuale.',
    'You receive a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes.':
      'Ricevi una licenza limitata, non esclusiva e non trasferibile per usare il servizio per scopi personali e non commerciali.',
    '7. Health and Accuracy Disclaimer': '7. Esclusione di responsabilita su salute e accuratezza',
    'Calkilo provides informational and educational content only and is not a medical service. It does not replace professional medical advice, diagnosis, or treatment.':
      'Calkilo fornisce solo contenuti informativi ed educativi e non e un servizio medico. Non sostituisce il parere medico professionale, la diagnosi o il trattamento.',
    'Nutritional estimates and AI outputs may vary and should be used as guidance, not guaranteed measurements.':
      'Le stime nutrizionali e gli output AI possono variare e devono essere usati come guida, non come misurazioni garantite.',
    '8. Limitation of Liability': '8. Limitazione di responsabilita',
    'To the fullest extent permitted by law, Calkilo is not liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.':
      "Nella misura massima consentita dalla legge, Calkilo non e responsabile per danni indiretti, incidentali, speciali, consequenziali o punitivi derivanti dall'uso del servizio.",
    'Our total liability for any claim related to the service is limited to the amount you paid to Calkilo in the 12 months before the event giving rise to the claim.':
      'La nostra responsabilita totale per qualsiasi reclamo relativo al servizio e limitata all importo che hai pagato a Calkilo nei 12 mesi precedenti all evento che ha dato origine al reclamo.',
    '9. Termination': '9. Risoluzione',
    'You may stop using the service at any time. We may suspend or terminate access if you violate these terms or if required for security, legal, or operational reasons.':
      'Puoi smettere di usare il servizio in qualsiasi momento. Possiamo sospendere o terminare l accesso se violi questi termini o se richiesto per motivi di sicurezza, legali o operativi.',
    'Upon termination, rights granted to you under these terms will end, while provisions that should survive termination will remain in effect.':
      'Alla risoluzione, i diritti concessi a te ai sensi di questi termini termineranno, mentre le disposizioni che devono sopravvivere alla risoluzione resteranno in vigore.',
    '10. Changes to Terms': '10. Modifiche ai termini',
    'We may revise these Terms of Service from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'Possiamo rivedere questi Termini di servizio di tanto in tanto. Gli aggiornamenti rilevanti saranno riflessi aggiornando la data di entrata in vigore e, quando necessario, fornendo un avviso.',
    'We may revise these Terms and Conditions from time to time. Material updates will be reflected by updating the effective date and, where required, by providing notice.':
      'Possiamo rivedere questi Termini e condizioni di tanto in tanto. Gli aggiornamenti rilevanti saranno riflessi aggiornando la data di entrata in vigore e, quando necessario, fornendo un avviso.',
    'These terms are effective as of February 25, 2026.':
      'Questi termini sono efficaci dal 25 febbraio 2026.',
    '11. Contact Information': '11. Informazioni di contatto',
    'If you have questions about these Terms of Service, contact us at support@calkilo.app.':
      'Se hai domande su questi Termini di servizio, contattaci a support@calkilo.app.',
    'If you have questions about these Terms and Conditions, contact us at support@calkilo.app.':
      'Se hai domande su questi Termini e condizioni, contattaci a support@calkilo.app.',
    'For privacy-related matters, contact privacy@calkilo.app.':
      'Per questioni relative alla privacy, contatta privacy@calkilo.app.',
  },
}

const ACCOUNT_TRANSLATIONS: TranslationTable = {
  nl: {
    'Request Account & Data Deletion | Calkilo': 'Account- en gegevensverwijdering aanvragen | Calkilo',
    'Use this page to request deletion of your Calkilo account and associated personal data.':
      'Gebruik deze pagina om verwijdering van je Calkilo-account en bijbehorende persoonsgegevens aan te vragen.',
    'Request Account & Data Deletion': 'Account- en gegevensverwijdering aanvragen',
    'Use this page to request permanent deletion of your Calkilo account and associated personal data.':
      'Gebruik deze pagina om permanente verwijdering van je Calkilo-account en bijbehorende persoonsgegevens aan te vragen.',
    'Submit Your Request': 'Dien je verzoek in',
    'Send your request to our privacy team and we will process it after account ownership verification.':
      'Stuur je verzoek naar ons privacyteam en wij verwerken het nadat het eigendom van het account is geverifieerd.',
    'Email deletion request': 'Verwijderingsverzoek per e-mail',
    'This opens your email app with a pre-filled message to privacy@calkilo.app.':
      'Dit opent je e-mailapp met een vooraf ingevuld bericht aan privacy@calkilo.app.',
    'Information to Include': 'Informatie om mee te sturen',
    'Account email address used in Calkilo.': 'E-mailadres van het account dat in Calkilo wordt gebruikt.',
    'Optional account ID if available.': 'Optioneel account-ID indien beschikbaar.',
    'Any context needed to identify the account if you use multiple emails.':
      'Eventuele context die nodig is om het account te identificeren als je meerdere e-mailadressen gebruikt.',
    'What Happens Next': 'Wat er daarna gebeurt',
    'We will confirm your identity before deletion to protect account security.':
      'We bevestigen je identiteit voor verwijdering om de accountbeveiliging te beschermen.',
    'After verification, your account and associated personal data will be deleted.':
      'Na verificatie worden je account en bijbehorende persoonsgegevens verwijderd.',
    'Data we must retain for legal, fraud prevention, or compliance reasons may be kept as required by law.':
      'Gegevens die we om juridische redenen, fraudepreventie of naleving moeten bewaren, kunnen worden bewaard zoals wettelijk vereist.',
    'For other privacy requests, visit': 'Voor andere privacyverzoeken ga je naar',
    'Account Deletion Request': 'Verzoek tot accountverwijdering',
    'Please delete my Calkilo account and associated data.\n\nAccount email:\nOptional account ID:\nReason (optional):':
      'Verwijder alstublieft mijn Calkilo-account en bijbehorende gegevens.\n\nAccount e-mail:\nOptioneel account-ID:\nReden (optioneel):',
  },
  ru: {
    'Request Account & Data Deletion | Calkilo': 'Запрос на удаление аккаунта и данных | Calkilo',
    'Use this page to request deletion of your Calkilo account and associated personal data.':
      'Используйте эту страницу, чтобы запросить удаление вашего аккаунта Calkilo и связанных персональных данных.',
    'Request Account & Data Deletion': 'Запросить удаление аккаунта и данных',
    'Use this page to request permanent deletion of your Calkilo account and associated personal data.':
      'Используйте эту страницу, чтобы запросить постоянное удаление вашего аккаунта Calkilo и связанных персональных данных.',
    'Submit Your Request': 'Отправить запрос',
    'Send your request to our privacy team and we will process it after account ownership verification.':
      'Отправьте запрос нашей команде по конфиденциальности, и мы обработаем его после проверки владельца аккаунта.',
    'Email deletion request': 'Отправить запрос на удаление по email',
    'This opens your email app with a pre-filled message to privacy@calkilo.app.':
      'Это откроет ваше почтовое приложение с заранее заполненным сообщением на privacy@calkilo.app.',
    'Information to Include': 'Что указать в запросе',
    'Account email address used in Calkilo.': 'Адрес электронной почты аккаунта, используемого в Calkilo.',
    'Optional account ID if available.': 'Необязательный ID аккаунта, если он у вас есть.',
    'Any context needed to identify the account if you use multiple emails.':
      'Любую информацию, которая поможет определить аккаунт, если вы используете несколько email.',
    'What Happens Next': 'Что будет дальше',
    'We will confirm your identity before deletion to protect account security.':
      'Перед удалением мы подтвердим вашу личность для защиты безопасности аккаунта.',
    'After verification, your account and associated personal data will be deleted.':
      'После проверки ваш аккаунт и связанные персональные данные будут удалены.',
    'Data we must retain for legal, fraud prevention, or compliance reasons may be kept as required by law.':
      'Данные, которые мы обязаны хранить по юридическим причинам, для предотвращения мошенничества или соблюдения требований, могут сохраняться в соответствии с законом.',
    'For other privacy requests, visit': 'По другим вопросам конфиденциальности посетите',
    'Account Deletion Request': 'Запрос на удаление аккаунта',
    'Please delete my Calkilo account and associated data.\n\nAccount email:\nOptional account ID:\nReason (optional):':
      'Пожалуйста, удалите мой аккаунт Calkilo и связанные данные.\n\nEmail аккаунта:\nНеобязательный ID аккаунта:\nПричина (необязательно):',
  },
  zh: {
    'Request Account & Data Deletion | Calkilo': '请求删除账户和数据 | Calkilo',
    'Use this page to request deletion of your Calkilo account and associated personal data.':
      '使用此页面请求删除你的 Calkilo 账户及相关个人数据。',
    'Request Account & Data Deletion': '请求删除账户和数据',
    'Use this page to request permanent deletion of your Calkilo account and associated personal data.':
      '使用此页面请求永久删除你的 Calkilo 账户及相关个人数据。',
    'Submit Your Request': '提交你的请求',
    'Send your request to our privacy team and we will process it after account ownership verification.':
      '将你的请求发送给我们的隐私团队，我们会在验证账户所有权后进行处理。',
    'Email deletion request': '发送删除请求邮件',
    'This opens your email app with a pre-filled message to privacy@calkilo.app.':
      '这将打开你的邮件应用，并生成发送到 privacy@calkilo.app 的预填充邮件。',
    'Information to Include': '需要提供的信息',
    'Account email address used in Calkilo.': '在 Calkilo 中使用的账户邮箱地址。',
    'Optional account ID if available.': '如有可提供账户 ID（可选）。',
    'Any context needed to identify the account if you use multiple emails.':
      '如果你使用多个邮箱，请提供任何有助于识别账户的说明。',
    'What Happens Next': '接下来会发生什么',
    'We will confirm your identity before deletion to protect account security.':
      '在删除前，我们会确认你的身份以保护账户安全。',
    'After verification, your account and associated personal data will be deleted.':
      '验证完成后，你的账户及相关个人数据将被删除。',
    'Data we must retain for legal, fraud prevention, or compliance reasons may be kept as required by law.':
      '出于法律、反欺诈或合规原因必须保留的数据，可能会依法继续保存。',
    'For other privacy requests, visit': '如需其他隐私请求，请访问',
    'Account Deletion Request': '账户删除请求',
    'Please delete my Calkilo account and associated data.\n\nAccount email:\nOptional account ID:\nReason (optional):':
      '请删除我的 Calkilo 账户及相关数据。\n\n账户邮箱：\n账户 ID（可选）：\n原因（可选）：',
  },
  ar: {
    'Request Account & Data Deletion | Calkilo': 'طلب حذف الحساب والبيانات | Calkilo',
    'Use this page to request deletion of your Calkilo account and associated personal data.':
      'استخدم هذه الصفحة لطلب حذف حساب Calkilo الخاص بك والبيانات الشخصية المرتبطة به.',
    'Request Account & Data Deletion': 'طلب حذف الحساب والبيانات',
    'Use this page to request permanent deletion of your Calkilo account and associated personal data.':
      'استخدم هذه الصفحة لطلب الحذف الدائم لحساب Calkilo الخاص بك والبيانات الشخصية المرتبطة به.',
    'Submit Your Request': 'أرسل طلبك',
    'Send your request to our privacy team and we will process it after account ownership verification.':
      'أرسل طلبك إلى فريق الخصوصية لدينا وسنعالجه بعد التحقق من ملكية الحساب.',
    'Email deletion request': 'إرسال طلب الحذف عبر البريد',
    'This opens your email app with a pre-filled message to privacy@calkilo.app.':
      'سيؤدي هذا إلى فتح تطبيق البريد لديك مع رسالة جاهزة إلى privacy@calkilo.app.',
    'Information to Include': 'المعلومات التي يجب تضمينها',
    'Account email address used in Calkilo.': 'عنوان البريد الإلكتروني للحساب المستخدم في Calkilo.',
    'Optional account ID if available.': 'معرّف الحساب إن وجد (اختياري).',
    'Any context needed to identify the account if you use multiple emails.':
      'أي معلومات إضافية تساعد على تحديد الحساب إذا كنت تستخدم عدة عناوين بريد.',
    'What Happens Next': 'ماذا يحدث بعد ذلك',
    'We will confirm your identity before deletion to protect account security.':
      'سنؤكد هويتك قبل الحذف لحماية أمان الحساب.',
    'After verification, your account and associated personal data will be deleted.':
      'بعد التحقق، سيتم حذف حسابك والبيانات الشخصية المرتبطة به.',
    'Data we must retain for legal, fraud prevention, or compliance reasons may be kept as required by law.':
      'قد يتم الاحتفاظ بالبيانات التي يجب علينا الاحتفاظ بها لأسباب قانونية أو لمنع الاحتيال أو للامتثال كما يقتضي القانون.',
    'For other privacy requests, visit': 'للطلبات الأخرى المتعلقة بالخصوصية، زر',
    'Account Deletion Request': 'طلب حذف الحساب',
    'Please delete my Calkilo account and associated data.\n\nAccount email:\nOptional account ID:\nReason (optional):':
      'يرجى حذف حساب Calkilo الخاص بي والبيانات المرتبطة به.\n\nبريد الحساب:\nمعرّف الحساب (اختياري):\nالسبب (اختياري):',
  },
  fa: {
    'Request Account & Data Deletion | Calkilo': 'درخواست حذف حساب و داده | Calkilo',
    'Use this page to request deletion of your Calkilo account and associated personal data.':
      'از این صفحه برای درخواست حذف حساب Calkilo و داده‌های شخصی مرتبط استفاده کنید.',
    'Request Account & Data Deletion': 'درخواست حذف حساب و داده',
    'Use this page to request permanent deletion of your Calkilo account and associated personal data.':
      'از این صفحه برای درخواست حذف دائمی حساب Calkilo و داده‌های شخصی مرتبط استفاده کنید.',
    'Submit Your Request': 'درخواست خود را ارسال کنید',
    'Send your request to our privacy team and we will process it after account ownership verification.':
      'درخواست خود را برای تیم حریم خصوصی ما ارسال کنید و پس از تایید مالکیت حساب آن را پردازش می‌کنیم.',
    'Email deletion request': 'ارسال درخواست حذف با ایمیل',
    'This opens your email app with a pre-filled message to privacy@calkilo.app.':
      'این گزینه برنامه ایمیل شما را با پیام آماده برای privacy@calkilo.app باز می‌کند.',
    'Information to Include': 'اطلاعاتی که باید وارد کنید',
    'Account email address used in Calkilo.': 'آدرس ایمیل حسابی که در Calkilo استفاده می‌شود.',
    'Optional account ID if available.': 'شناسه حساب در صورت وجود (اختیاری).',
    'Any context needed to identify the account if you use multiple emails.':
      'هر توضیحی که برای شناسایی حساب لازم است، اگر از چند ایمیل استفاده می‌کنید.',
    'What Happens Next': 'بعد چه اتفاقی می‌افتد',
    'We will confirm your identity before deletion to protect account security.':
      'برای حفاظت از امنیت حساب، پیش از حذف هویت شما را تایید می‌کنیم.',
    'After verification, your account and associated personal data will be deleted.':
      'پس از تایید، حساب شما و داده‌های شخصی مرتبط حذف خواهند شد.',
    'Data we must retain for legal, fraud prevention, or compliance reasons may be kept as required by law.':
      'داده‌هایی که باید به دلایل قانونی، جلوگیری از تقلب یا رعایت الزامات نگهداری شوند، مطابق قانون حفظ می‌شوند.',
    'For other privacy requests, visit': 'برای سایر درخواست‌های حریم خصوصی، به',
    'Account Deletion Request': 'درخواست حذف حساب',
    'Please delete my Calkilo account and associated data.\n\nAccount email:\nOptional account ID:\nReason (optional):':
      'لطفا حساب Calkilo من و داده‌های مرتبط را حذف کنید.\n\nایمیل حساب:\nشناسه حساب (اختیاری):\nدلیل (اختیاری):',
  },
  it: {
    'Request Account & Data Deletion | Calkilo': 'Richiedi eliminazione account e dati | Calkilo',
    'Use this page to request deletion of your Calkilo account and associated personal data.':
      'Usa questa pagina per richiedere la cancellazione del tuo account Calkilo e dei dati personali associati.',
    'Request Account & Data Deletion': 'Richiedi eliminazione account e dati',
    'Use this page to request permanent deletion of your Calkilo account and associated personal data.':
      'Usa questa pagina per richiedere la cancellazione permanente del tuo account Calkilo e dei dati personali associati.',
    'Submit Your Request': 'Invia la tua richiesta',
    'Send your request to our privacy team and we will process it after account ownership verification.':
      'Invia la tua richiesta al nostro team privacy e la elaboreremo dopo la verifica della proprieta dell account.',
    'Email deletion request': 'Invia richiesta di eliminazione',
    'This opens your email app with a pre-filled message to privacy@calkilo.app.':
      "Questo apre la tua app email con un messaggio precompilato per privacy@calkilo.app.",
    'Information to Include': 'Informazioni da includere',
    'Account email address used in Calkilo.': 'Indirizzo email dell account usato in Calkilo.',
    'Optional account ID if available.': 'ID account opzionale se disponibile.',
    'Any context needed to identify the account if you use multiple emails.':
      'Qualsiasi informazione utile a identificare l account se usi piu email.',
    'What Happens Next': 'Cosa succede dopo',
    'We will confirm your identity before deletion to protect account security.':
      'Confermeremo la tua identita prima della cancellazione per proteggere la sicurezza dell account.',
    'After verification, your account and associated personal data will be deleted.':
      'Dopo la verifica, il tuo account e i dati personali associati saranno eliminati.',
    'Data we must retain for legal, fraud prevention, or compliance reasons may be kept as required by law.':
      'I dati che dobbiamo conservare per motivi legali, antifrode o di conformita possono essere mantenuti come richiesto dalla legge.',
    'For other privacy requests, visit': 'Per altre richieste privacy, visita',
    'Account Deletion Request': 'Richiesta eliminazione account',
    'Please delete my Calkilo account and associated data.\n\nAccount email:\nOptional account ID:\nReason (optional):':
      'Per favore elimina il mio account Calkilo e i dati associati.\n\nEmail account:\nID account opzionale:\nMotivo (opzionale):',
  },
}

const CONTACT_TRANSLATIONS: TranslationTable = {
  nl: {
    'Contact Calkilo': 'Neem contact op met Calkilo',
    'Contact Calkilo support for product, billing, and privacy requests.':
      'Neem contact op met Calkilo-support voor product-, facturerings- en privacyverzoeken.',
    'Need help with Calkilo? Send us a message and our support team will get back to you as soon as possible.':
      'Hulp nodig met Calkilo? Stuur ons een bericht en ons supportteam neemt zo snel mogelijk contact met je op.',
    'Send a Message': 'Stuur een bericht',
    'Share as much detail as possible so we can resolve your issue quickly. For urgent requests, email support@calkilo.app directly.':
      'Deel zoveel mogelijk details zodat we je probleem snel kunnen oplossen. Voor urgente verzoeken kun je direct mailen naar support@calkilo.app.',
    'Full Name': 'Volledige naam',
    'Your full name': 'Je volledige naam',
    'Email Address': 'E-mailadres',
    Topic: 'Onderwerp',
    'General question': 'Algemene vraag',
    'Technical issue': 'Technisch probleem',
    Billing: 'Facturatie',
    'Privacy request': 'Privacyverzoek',
    'Account ID (Optional)': 'Account-ID (optioneel)',
    'Example: CK-10294': 'Voorbeeld: CK-10294',
    Message: 'Bericht',
    'Describe your request, issue steps, and expected result.':
      'Beschrijf je verzoek, de stappen van het probleem en het verwachte resultaat.',
    'Send message': 'Bericht verzenden',
    'Submitting this form opens your email app with pre-filled details for support@calkilo.app.':
      'Het verzenden van dit formulier opent je e-mailapp met vooraf ingevulde gegevens voor support@calkilo.app.',
    'Email Support': 'Ondersteuning via e-mail',
    'For account, billing, and technical questions.':
      'Voor account-, facturerings- en technische vragen.',
    'Privacy Requests': 'Privacyverzoeken',
    'For data access, deletion, and policy-related inquiries.':
      'Voor verzoeken over inzage, verwijdering van gegevens en beleidsvragen.',
    'Account Deletion': 'Accountverwijdering',
    'Use the dedicated page to request account and associated data deletion.':
      'Gebruik de speciale pagina om verwijdering van je account en bijbehorende gegevens aan te vragen.',
    'Open account deletion page': 'Open pagina voor accountverwijdering',
    'Response Window': 'Reactietijd',
    'We typically respond to support inquiries within one business day.':
      'We reageren doorgaans binnen een werkdag op supportverzoeken.',
    'View Privacy Policy': 'Bekijk privacybeleid',
    'Before You Send': 'Voordat je verzendt',
    'Include screenshots for UI bugs or error messages when possible.':
      'Voeg indien mogelijk screenshots toe van UI-bugs of foutmeldingen.',
    'For billing requests, mention the subscription plan and purchase date.':
      'Vermeld bij factureringsverzoeken het abonnement en de aankoopdatum.',
    'For privacy requests, include the account email used in Calkilo.':
      'Vermeld bij privacyverzoeken het e-mailadres van het account dat in Calkilo wordt gebruikt.',
  },
  ru: {
    'Contact Calkilo': 'Связаться с Calkilo',
    'Contact Calkilo support for product, billing, and privacy requests.':
      'Свяжитесь с поддержкой Calkilo по вопросам продукта, оплаты и конфиденциальности.',
    'Need help with Calkilo? Send us a message and our support team will get back to you as soon as possible.':
      'Нужна помощь с Calkilo? Отправьте нам сообщение, и наша команда поддержки свяжется с вами как можно скорее.',
    'Send a Message': 'Отправить сообщение',
    'Share as much detail as possible so we can resolve your issue quickly. For urgent requests, email support@calkilo.app directly.':
      'Опишите как можно больше деталей, чтобы мы быстрее решили вашу проблему. Для срочных запросов пишите напрямую на support@calkilo.app.',
    'Full Name': 'Полное имя',
    'Your full name': 'Ваше полное имя',
    'Email Address': 'Адрес электронной почты',
    Topic: 'Тема',
    'General question': 'Общий вопрос',
    'Technical issue': 'Техническая проблема',
    Billing: 'Оплата',
    'Privacy request': 'Запрос по конфиденциальности',
    'Account ID (Optional)': 'ID аккаунта (необязательно)',
    'Example: CK-10294': 'Пример: CK-10294',
    Message: 'Сообщение',
    'Describe your request, issue steps, and expected result.':
      'Опишите ваш запрос, шаги воспроизведения проблемы и ожидаемый результат.',
    'Send message': 'Отправить сообщение',
    'Submitting this form opens your email app with pre-filled details for support@calkilo.app.':
      'Отправка этой формы откроет ваше почтовое приложение с заранее заполненными данными для support@calkilo.app.',
    'Email Support': 'Поддержка по email',
    'For account, billing, and technical questions.':
      'По вопросам аккаунта, оплаты и техническим вопросам.',
    'Privacy Requests': 'Запросы по конфиденциальности',
    'For data access, deletion, and policy-related inquiries.':
      'По вопросам доступа к данным, удаления и политики конфиденциальности.',
    'Account Deletion': 'Удаление аккаунта',
    'Use the dedicated page to request account and associated data deletion.':
      'Используйте специальную страницу для запроса удаления аккаунта и связанных данных.',
    'Open account deletion page': 'Открыть страницу удаления аккаунта',
    'Response Window': 'Срок ответа',
    'We typically respond to support inquiries within one business day.':
      'Обычно мы отвечаем на запросы в поддержку в течение одного рабочего дня.',
    'View Privacy Policy': 'Открыть политику конфиденциальности',
    'Before You Send': 'Перед отправкой',
    'Include screenshots for UI bugs or error messages when possible.':
      'По возможности прикладывайте скриншоты UI-багов или сообщений об ошибках.',
    'For billing requests, mention the subscription plan and purchase date.':
      'Для запросов по оплате укажите план подписки и дату покупки.',
    'For privacy requests, include the account email used in Calkilo.':
      'Для запросов по конфиденциальности укажите email аккаунта, используемого в Calkilo.',
  },
  zh: {
    'Contact Calkilo': '联系 Calkilo',
    'Contact Calkilo support for product, billing, and privacy requests.':
      '联系 Calkilo 支持团队，处理产品、计费和隐私请求。',
    'Need help with Calkilo? Send us a message and our support team will get back to you as soon as possible.':
      '需要 Calkilo 帮助吗？给我们发送消息，我们的支持团队会尽快回复你。',
    'Send a Message': '发送消息',
    'Share as much detail as possible so we can resolve your issue quickly. For urgent requests, email support@calkilo.app directly.':
      '请尽可能提供详细信息，以便我们更快解决你的问题。对于紧急请求，请直接发送邮件至 support@calkilo.app。',
    'Full Name': '姓名',
    'Your full name': '你的姓名',
    'Email Address': '电子邮箱地址',
    Topic: '主题',
    'General question': '一般问题',
    'Technical issue': '技术问题',
    Billing: '计费',
    'Privacy request': '隐私请求',
    'Account ID (Optional)': '账户 ID（可选）',
    'Example: CK-10294': '示例：CK-10294',
    Message: '消息',
    'Describe your request, issue steps, and expected result.':
      '请描述你的请求、问题步骤和预期结果。',
    'Send message': '发送消息',
    'Submitting this form opens your email app with pre-filled details for support@calkilo.app.':
      '提交此表单会打开你的邮件应用，并预填支持邮件内容到 support@calkilo.app。',
    'Email Support': '邮件支持',
    'For account, billing, and technical questions.':
      '用于账户、计费和技术问题。',
    'Privacy Requests': '隐私请求',
    'For data access, deletion, and policy-related inquiries.':
      '用于数据访问、删除和政策相关咨询。',
    'Account Deletion': '账户删除',
    'Use the dedicated page to request account and associated data deletion.':
      '使用专门页面请求删除账户及相关数据。',
    'Open account deletion page': '打开账户删除页面',
    'Response Window': '回复时间',
    'We typically respond to support inquiries within one business day.':
      '我们通常会在一个工作日内回复支持咨询。',
    'View Privacy Policy': '查看隐私政策',
    'Before You Send': '发送前请注意',
    'Include screenshots for UI bugs or error messages when possible.':
      '如有可能，请附上界面问题或错误信息的截图。',
    'For billing requests, mention the subscription plan and purchase date.':
      '对于计费请求，请说明订阅方案和购买日期。',
    'For privacy requests, include the account email used in Calkilo.':
      '对于隐私请求，请提供在 Calkilo 中使用的账户邮箱。',
  },
  ar: {
    'Contact Calkilo': 'تواصل مع Calkilo',
    'Contact Calkilo support for product, billing, and privacy requests.':
      'تواصل مع دعم Calkilo لطلبات المنتج والفوترة والخصوصية.',
    'Need help with Calkilo? Send us a message and our support team will get back to you as soon as possible.':
      'هل تحتاج إلى مساعدة مع Calkilo؟ أرسل لنا رسالة وسيعود إليك فريق الدعم لدينا في أقرب وقت ممكن.',
    'Send a Message': 'أرسل رسالة',
    'Share as much detail as possible so we can resolve your issue quickly. For urgent requests, email support@calkilo.app directly.':
      'شارك أكبر قدر ممكن من التفاصيل حتى نتمكن من حل مشكلتك بسرعة. للطلبات العاجلة، أرسل بريدا مباشرا إلى support@calkilo.app.',
    'Full Name': 'الاسم الكامل',
    'Your full name': 'اسمك الكامل',
    'Email Address': 'عنوان البريد الإلكتروني',
    Topic: 'الموضوع',
    'General question': 'سؤال عام',
    'Technical issue': 'مشكلة تقنية',
    Billing: 'الفوترة',
    'Privacy request': 'طلب خصوصية',
    'Account ID (Optional)': 'معرّف الحساب (اختياري)',
    'Example: CK-10294': 'مثال: CK-10294',
    Message: 'الرسالة',
    'Describe your request, issue steps, and expected result.':
      'اشرح طلبك وخطوات المشكلة والنتيجة المتوقعة.',
    'Send message': 'إرسال الرسالة',
    'Submitting this form opens your email app with pre-filled details for support@calkilo.app.':
      'يؤدي إرسال هذا النموذج إلى فتح تطبيق البريد لديك مع تفاصيل جاهزة لـ support@calkilo.app.',
    'Email Support': 'الدعم عبر البريد',
    'For account, billing, and technical questions.':
      'لأسئلة الحساب والفوترة والمشكلات التقنية.',
    'Privacy Requests': 'طلبات الخصوصية',
    'For data access, deletion, and policy-related inquiries.':
      'لطلبات الوصول إلى البيانات أو الحذف أو الاستفسارات المتعلقة بالسياسات.',
    'Account Deletion': 'حذف الحساب',
    'Use the dedicated page to request account and associated data deletion.':
      'استخدم الصفحة المخصصة لطلب حذف الحساب والبيانات المرتبطة به.',
    'Open account deletion page': 'افتح صفحة حذف الحساب',
    'Response Window': 'مدة الرد',
    'We typically respond to support inquiries within one business day.':
      'نقوم عادة بالرد على استفسارات الدعم خلال يوم عمل واحد.',
    'View Privacy Policy': 'عرض سياسة الخصوصية',
    'Before You Send': 'قبل الإرسال',
    'Include screenshots for UI bugs or error messages when possible.':
      'أرفق لقطات شاشة لأخطاء الواجهة أو رسائل الخطأ متى أمكن.',
    'For billing requests, mention the subscription plan and purchase date.':
      'بالنسبة لطلبات الفوترة، اذكر خطة الاشتراك وتاريخ الشراء.',
    'For privacy requests, include the account email used in Calkilo.':
      'بالنسبة لطلبات الخصوصية، اذكر بريد الحساب المستخدم في Calkilo.',
  },
  fa: {
    'Contact Calkilo': 'تماس با Calkilo',
    'Contact Calkilo support for product, billing, and privacy requests.':
      'برای درخواست‌های محصول، پرداخت و حریم خصوصی با پشتیبانی Calkilo تماس بگیرید.',
    'Need help with Calkilo? Send us a message and our support team will get back to you as soon as possible.':
      'به کمک در Calkilo نیاز دارید؟ برای ما پیام بفرستید تا تیم پشتیبانی در سریع‌ترین زمان پاسخ دهد.',
    'Send a Message': 'ارسال پیام',
    'Share as much detail as possible so we can resolve your issue quickly. For urgent requests, email support@calkilo.app directly.':
      'تا حد امکان جزئیات بیشتری ارائه کنید تا مشکل شما را سریع‌تر حل کنیم. برای درخواست‌های فوری مستقیما به support@calkilo.app ایمیل بزنید.',
    'Full Name': 'نام کامل',
    'Your full name': 'نام کامل شما',
    'Email Address': 'آدرس ایمیل',
    Topic: 'موضوع',
    'General question': 'سوال عمومی',
    'Technical issue': 'مشکل فنی',
    Billing: 'پرداخت',
    'Privacy request': 'درخواست حریم خصوصی',
    'Account ID (Optional)': 'شناسه حساب (اختیاری)',
    'Example: CK-10294': 'مثال: CK-10294',
    Message: 'پیام',
    'Describe your request, issue steps, and expected result.':
      'درخواست خود، مراحل مشکل و نتیجه مورد انتظار را توضیح دهید.',
    'Send message': 'ارسال پیام',
    'Submitting this form opens your email app with pre-filled details for support@calkilo.app.':
      'ارسال این فرم برنامه ایمیل شما را با جزئیات آماده برای support@calkilo.app باز می‌کند.',
    'Email Support': 'پشتیبانی ایمیلی',
    'For account, billing, and technical questions.':
      'برای سوالات مربوط به حساب، پرداخت و مسائل فنی.',
    'Privacy Requests': 'درخواست‌های حریم خصوصی',
    'For data access, deletion, and policy-related inquiries.':
      'برای درخواست دسترسی به داده، حذف داده و سوالات مرتبط با سیاست‌ها.',
    'Account Deletion': 'حذف حساب',
    'Use the dedicated page to request account and associated data deletion.':
      'از صفحه اختصاصی برای درخواست حذف حساب و داده‌های مرتبط استفاده کنید.',
    'Open account deletion page': 'باز کردن صفحه حذف حساب',
    'Response Window': 'زمان پاسخ',
    'We typically respond to support inquiries within one business day.':
      'ما معمولا ظرف یک روز کاری به درخواست‌های پشتیبانی پاسخ می‌دهیم.',
    'View Privacy Policy': 'مشاهده سیاست حریم خصوصی',
    'Before You Send': 'پیش از ارسال',
    'Include screenshots for UI bugs or error messages when possible.':
      'در صورت امکان، برای خطاهای رابط کاربری یا پیام‌های خطا اسکرین‌شات ارسال کنید.',
    'For billing requests, mention the subscription plan and purchase date.':
      'در درخواست‌های پرداخت، طرح اشتراک و تاریخ خرید را ذکر کنید.',
    'For privacy requests, include the account email used in Calkilo.':
      'در درخواست‌های حریم خصوصی، ایمیلی را که در Calkilo استفاده شده وارد کنید.',
  },
  it: {
    'Contact Calkilo': 'Contatta Calkilo',
    'Contact Calkilo support for product, billing, and privacy requests.':
      'Contatta il supporto Calkilo per richieste su prodotto, fatturazione e privacy.',
    'Need help with Calkilo? Send us a message and our support team will get back to you as soon as possible.':
      'Hai bisogno di aiuto con Calkilo? Inviaci un messaggio e il nostro team di supporto ti rispondera il prima possibile.',
    'Send a Message': 'Invia un messaggio',
    'Share as much detail as possible so we can resolve your issue quickly. For urgent requests, email support@calkilo.app directly.':
      'Condividi quanti piu dettagli possibile cosi potremo risolvere rapidamente il tuo problema. Per richieste urgenti, scrivi direttamente a support@calkilo.app.',
    'Full Name': 'Nome completo',
    'Your full name': 'Il tuo nome completo',
    'Email Address': 'Indirizzo email',
    Topic: 'Argomento',
    'General question': 'Domanda generale',
    'Technical issue': 'Problema tecnico',
    Billing: 'Fatturazione',
    'Privacy request': 'Richiesta privacy',
    'Account ID (Optional)': 'ID account (opzionale)',
    'Example: CK-10294': 'Esempio: CK-10294',
    Message: 'Messaggio',
    'Describe your request, issue steps, and expected result.':
      'Descrivi la tua richiesta, i passaggi del problema e il risultato atteso.',
    'Send message': 'Invia messaggio',
    'Submitting this form opens your email app with pre-filled details for support@calkilo.app.':
      "L'invio di questo modulo apre la tua app email con dettagli precompilati per support@calkilo.app.",
    'Email Support': 'Supporto via email',
    'For account, billing, and technical questions.':
      'Per domande su account, fatturazione e aspetti tecnici.',
    'Privacy Requests': 'Richieste privacy',
    'For data access, deletion, and policy-related inquiries.':
      'Per richieste di accesso ai dati, eliminazione e domande sulle policy.',
    'Account Deletion': 'Eliminazione account',
    'Use the dedicated page to request account and associated data deletion.':
      "Usa la pagina dedicata per richiedere l'eliminazione dell'account e dei dati associati.",
    'Open account deletion page': 'Apri la pagina di eliminazione account',
    'Response Window': 'Tempi di risposta',
    'We typically respond to support inquiries within one business day.':
      'Di solito rispondiamo alle richieste di supporto entro un giorno lavorativo.',
    'View Privacy Policy': 'Visualizza informativa sulla privacy',
    'Before You Send': 'Prima di inviare',
    'Include screenshots for UI bugs or error messages when possible.':
      'Includi screenshot di bug UI o messaggi di errore quando possibile.',
    'For billing requests, mention the subscription plan and purchase date.':
      'Per richieste di fatturazione, indica il piano di abbonamento e la data di acquisto.',
    'For privacy requests, include the account email used in Calkilo.':
      'Per richieste privacy, includi l email dell account usato in Calkilo.',
  },
}

const STATIC_PAGE_TRANSLATIONS: Record<SiteLanguage, Record<string, string>> = {
  en: {},
  nl: {
    ...COMMON_TRANSLATIONS.nl,
    ...PRIVACY_TRANSLATIONS.nl,
    ...TERMS_TRANSLATIONS.nl,
    ...ACCOUNT_TRANSLATIONS.nl,
    ...CONTACT_TRANSLATIONS.nl,
  },
  ru: {
    ...COMMON_TRANSLATIONS.ru,
    ...PRIVACY_TRANSLATIONS.ru,
    ...TERMS_TRANSLATIONS.ru,
    ...ACCOUNT_TRANSLATIONS.ru,
    ...CONTACT_TRANSLATIONS.ru,
  },
  zh: {
    ...COMMON_TRANSLATIONS.zh,
    ...PRIVACY_TRANSLATIONS.zh,
    ...TERMS_TRANSLATIONS.zh,
    ...ACCOUNT_TRANSLATIONS.zh,
    ...CONTACT_TRANSLATIONS.zh,
  },
  ar: {
    ...COMMON_TRANSLATIONS.ar,
    ...PRIVACY_TRANSLATIONS.ar,
    ...TERMS_TRANSLATIONS.ar,
    ...ACCOUNT_TRANSLATIONS.ar,
    ...CONTACT_TRANSLATIONS.ar,
  },
  fa: {
    ...COMMON_TRANSLATIONS.fa,
    ...PRIVACY_TRANSLATIONS.fa,
    ...TERMS_TRANSLATIONS.fa,
    ...ACCOUNT_TRANSLATIONS.fa,
    ...CONTACT_TRANSLATIONS.fa,
  },
  it: {
    ...COMMON_TRANSLATIONS.it,
    ...PRIVACY_TRANSLATIONS.it,
    ...TERMS_TRANSLATIONS.it,
    ...ACCOUNT_TRANSLATIONS.it,
    ...CONTACT_TRANSLATIONS.it,
  },
}

export function translateStaticPageText(language: SiteLanguage, text: string): string {
  return STATIC_PAGE_TRANSLATIONS[language][text] ?? text
}
