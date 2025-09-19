// i18n: Language switcher and translations
(function() {
    const toggleBtn = document.getElementById('languageToggle');
    const dropdown = document.getElementById('languageDropdown');
    const currentFlagEl = document.getElementById('currentFlag');
    const currentLangEl = document.getElementById('currentLang');

    // proceed even if language UI is not present; guard accesses below

    const supportedLanguages = ['en', 'fa', 'zh', 'ru', 'it', 'fr', 'de', 'ar', 'es'];
    const rtlLanguages = new Set(['fa', 'ar']);

    const translations = {
        en: {
            nav: {
                features: 'Features',
                screenshots: 'Screenshots',
                reviews: 'Reviews',
                faq: 'FAQ',
                contact: 'Contact',
                download: 'Download'
            },
            hero: {
                title1: 'Calculate Calories with',
                title2: 'AI Precision',
                description: "Simply take a photo of your food and let Calkilo's advanced AI instantly calculate accurate calories and nutritional information. No more guessing or manual logging.",
                download_ios: 'Download for iOS',
                download_android: 'Download for Android',
                stats: {
                    users: 'Users',
                    accuracy: 'Accuracy',
                    photos: 'Photos Analyzed'
                }
            },
            features: {
                title: 'Why Choose Calkilo?',
                subtitle: 'Revolutionary AI technology that makes calorie counting effortless and accurate',
                photo_analysis: {
                    title: 'Instant Photo Analysis',
                    description: 'Simply snap a photo of your meal and get instant, accurate calorie calculations powered by advanced computer vision AI.'
                },
                ai_tech: {
                    title: 'Advanced AI Technology',
                    description: 'Our proprietary AI model recognizes thousands of foods and ingredients with 99.2% accuracy, learning from millions of food images.'
                },
                nutrition: {
                    title: 'Detailed Nutrition Tracking',
                    description: 'Track not just calories, but also macronutrients, vitamins, and minerals to get a complete picture of your nutrition.'
                },
                goals: {
                    title: 'Personalized Goals',
                    description: 'Set and track personalized health goals with AI-powered recommendations tailored to your lifestyle and preferences.'
                },
                history: {
                    title: 'Smart History',
                    description: 'View your eating patterns, track progress over time, and get insights to help you make better food choices.'
                },
                privacy: {
                    title: 'Privacy First',
                    description: 'Your photos and data are processed securely with end-to-end encryption. Your privacy is our top priority.'
                }
            },
            screenshots: {
                title: 'See Calkilo in Action',
                subtitle: 'Beautiful, intuitive interface designed for effortless calorie tracking',
                capture: {
                    title: 'Easy Photo Capture',
                    description: 'Point, shoot, and let AI do the rest'
                },
                results: {
                    title: 'Instant Results',
                    description: 'Get detailed nutrition info in seconds'
                },
                progress: {
                    title: 'Progress Tracking',
                    description: 'Monitor your daily nutrition goals'
                }
            },
            testimonials: {
                title: 'What Our Users Say',
                subtitle: "Join thousands of satisfied users who've transformed their nutrition tracking",
                sarah: {
                    text: '“Calkilo has completely changed how I track my food. The AI is incredibly accurate and saves me so much time. I\'ve lost 15 pounds in 3 months!”',
                    name: 'Sarah Johnson',
                    role: 'Fitness Enthusiast'
                },
                mike: {
                    text: '“As a busy professional, I never had time to manually log calories. Calkilo\'s AI makes it effortless - just point and shoot!”',
                    name: 'Mike Chen',
                    role: 'Software Engineer'
                },
                emily: {
                    text: '“The accuracy is mind-blowing! It even recognizes complex dishes and gives me detailed macro breakdowns. This is the future of nutrition tracking.”',
                    name: 'Emily Rodriguez',
                    role: 'Nutritionist'
                }
            },
            download: {
                title: 'Ready to Transform Your Nutrition?',
                subtitle: 'Download Calkilo today and experience the future of calorie counting',
                app_store: {
                    label: 'Download on the',
                    platform: 'App Store'
                },
                google_play: {
                    label: 'Get it on',
                    platform: 'Google Play'
                },
                features: {
                    free: 'Free to download',
                    no_subscription: 'No subscription required',
                    offline: 'Works offline'
                }
            },
            footer: {
                description: 'Revolutionizing nutrition tracking with AI-powered calorie calculation',
                product: {
                    title: 'Product',
                    features: 'Features',
                    screenshots: 'Screenshots',
                    download: 'Download',
                    pricing: 'Pricing'
                },
                support: {
                    title: 'Support',
                    faq: 'FAQ',
                    contact: 'Contact Us',
                    privacy: 'Privacy Policy',
                    terms: 'Terms of Service'
                },
                company: {
                    title: 'Company',
                    about: 'About Us',
                    blog: 'Blog',
                    careers: 'Careers',
                    press: 'Press'
                },
                copyright: 'All rights reserved.'
            }
        },
        fa: {
            nav: {
                features: 'ویژگی‌ها',
                screenshots: 'تصاویر',
                reviews: 'نظرات',
                faq: 'سوالات',
                contact: 'تماس',
                download: 'دانلود'
            },
            hero: {
                title1: 'محاسبه کالری با',
                title2: 'دقت هوش مصنوعی',
                description: 'کافیست از غذای خود عکس بگیرید تا هوش مصنوعی پیشرفته کالکیلو کالری و اطلاعات تغذیه‌ای دقیق را در لحظه محاسبه کند. بدون حدس و خطا و ثبت دستی.',
                download_ios: 'دانلود برای iOS',
                download_android: 'دانلود برای اندروید',
                stats: {
                    users: 'کاربر',
                    accuracy: 'دقت',
                    photos: 'عکس تحلیل‌شده'
                }
            },
            features: {
                title: 'چرا کالکیلو؟',
                subtitle: 'فناوری انقلابی هوش مصنوعی که شمارش کالری را آسان و دقیق می‌کند',
                photo_analysis: {
                    title: 'تحلیل فوری عکس',
                    description: 'فقط از غذای خود عکس بگیرید و محاسبه کالری دقیق را با هوش مصنوعی بینایی رایانه دریافت کنید.'
                },
                ai_tech: {
                    title: 'فناوری پیشرفته هوش مصنوعی',
                    description: 'مدل اختصاصی ما هزاران ماده غذایی را با دقت ۹۹.۲٪ تشخیص می‌دهد و از میلیون‌ها تصویر می‌آموزد.'
                },
                nutrition: {
                    title: 'پیگیری دقیق تغذیه',
                    description: 'علاوه بر کالری، درشت‌مغذی‌ها، ویتامین‌ها و مواد معدنی را پیگیری کنید تا تصویری کامل از تغذیه خود داشته باشید.'
                },
                goals: {
                    title: 'اهداف شخصی‌سازی‌شده',
                    description: 'اهداف سلامتی خود را با پیشنهادهای هوشمند متناسب با سبک زندگی‌تان تعیین و پیگیری کنید.'
                },
                history: {
                    title: 'تاریخچه هوشمند',
                    description: 'الگوهای غذایی خود را ببینید، روند پیشرفت را دنبال کنید و بینش‌های کاربردی دریافت کنید.'
                },
                privacy: {
                    title: 'اولویت با حریم خصوصی',
                    description: 'عکس‌ها و داده‌های شما به‌صورت امن و رمزگذاری‌شده پردازش می‌شوند. حریم خصوصی شما اولویت ماست.'
                }
            },
            screenshots: {
                title: 'کالکیلو را در عمل ببینید',
                subtitle: 'رابط کاربری زیبا و شهودی برای شمارش آسان کالری',
                capture: {
                    title: 'عکسبرداری آسان',
                    description: 'نشانه بگیرید و بقیه را به هوش مصنوعی بسپارید'
                },
                results: {
                    title: 'نتایج فوری',
                    description: 'اطلاعات تغذیه‌ای را در چند ثانیه دریافت کنید'
                },
                progress: {
                    title: 'پیگیری پیشرفت',
                    description: 'اهداف روزانه خود را رصد کنید'
                }
            },
            testimonials: {
                title: 'کاربران ما چه می‌گویند',
                subtitle: 'به هزاران کاربر راضی بپیوندید که پایش تغذیه خود را متحول کرده‌اند',
                sarah: {
                    text: '«کالکیلو کاملاً نحوه پایش غذای من را تغییر داده است. دقت هوش مصنوعی فوق‌العاده است و کلی در زمان صرفه‌جویی می‌کند. طی ۳ ماه ۱۵ پوند کم کردم!»',
                    name: 'سارا جانسون',
                    role: 'علاقه‌مند به تناسب‌اندام'
                },
                mike: {
                    text: '«به‌عنوان یک فرد پرمشغله، هرگز وقت ثبت دستی کالری را نداشتم. هوش مصنوعی کالکیلو همه‌چیز را بی‌دردسر می‌کند — فقط نشانه بگیر و عکس بگیر!»',
                    name: 'مایک چِن',
                    role: 'مهندس نرم‌افزار'
                },
                emily: {
                    text: '«دقت واقعاً شگفت‌انگیز است! حتی غذاهای پیچیده را هم می‌شناسد و جزئیات ماکرو را می‌دهد. آینده پایش تغذیه همین است.»',
                    name: 'امیلی رودریگز',
                    role: 'متخصص تغذیه'
                }
            },
            download: {
                title: 'آماده تحول در تغذیه‌اید؟',
                subtitle: 'امروز کالکیلو را دانلود کنید و آینده شمارش کالری را تجربه کنید',
                app_store: {
                    label: 'دانلود از',
                    platform: 'اپ‌استور'
                },
                google_play: {
                    label: 'دریافت از',
                    platform: 'گوگل‌پلی'
                },
                features: {
                    free: 'دانلود رایگان',
                    no_subscription: 'بدون نیاز به اشتراک',
                    offline: 'قابل استفاده آفلاین'
                }
            },
            footer: {
                description: 'انقلابی در پایش تغذیه با محاسبه کالری مبتنی بر هوش مصنوعی',
                product: {
                    title: 'محصول',
                    features: 'ویژگی‌ها',
                    screenshots: 'تصاویر',
                    download: 'دانلود',
                    pricing: 'قیمت‌گذاری'
                },
                support: {
                    title: 'پشتیبانی',
                    faq: 'سوالات متداول',
                    contact: 'تماس با ما',
                    privacy: 'حریم خصوصی',
                    terms: 'شرایط استفاده'
                },
                company: {
                    title: 'شرکت',
                    about: 'درباره ما',
                    blog: 'بلاگ',
                    careers: 'فرصت‌های شغلی',
                    press: 'رسانه'
                },
                copyright: 'کلیه حقوق محفوظ است.'
            }
        },
        zh: {
            nav: {
                features: '功能',
                screenshots: '截图',
                reviews: '评价',
                faq: '常见问题',
                contact: '联系我们',
                download: '下载'
            },
            hero: {
                title1: '用 AI 精准度',
                title2: '计算卡路里',
                description: '只需给食物拍照，Calkilo 的高级 AI 就能即时计算准确的卡路里和营养信息。告别猜测与手工记录。',
                download_ios: '下载 iOS 版',
                download_android: '下载 Android 版',
                stats: {
                    users: '用户',
                    accuracy: '准确率',
                    photos: '已分析照片'
                }
            },
            features: {
                title: '为什么选择 Calkilo？',
                subtitle: '革命性的 AI 技术，让计算卡路里轻松又准确',
                photo_analysis: {
                    title: '即时照片分析',
                    description: '只需拍下你的餐食，先进的计算机视觉 AI 即刻给出准确卡路里。'
                },
                ai_tech: {
                    title: '先进的 AI 技术',
                    description: '我们的专有模型以 99.2% 的准确率识别上千种食物，并从海量图片中学习。'
                },
                nutrition: {
                    title: '详细营养跟踪',
                    description: '不仅跟踪卡路里，还包括常量营养素、维生素和矿物质，全面了解你的营养。'
                },
                goals: {
                    title: '个性化目标',
                    description: '基于你的生活方式给出 AI 建议，设定并跟踪健康目标。'
                },
                history: {
                    title: '智能历史',
                    description: '查看饮食模式、跟踪长期进展，并获得更好选择的洞察。'
                },
                privacy: {
                    title: '隐私优先',
                    description: '你的照片和数据通过端到端加密安全处理。你的隐私是我们的首要任务。'
                }
            },
            screenshots: {
                title: '看看 Calkilo 如何运作',
                subtitle: '为轻松计算卡路里而设计的美观直观界面',
                capture: {
                    title: '轻松拍照',
                    description: '对准、按下，其余交给 AI'
                },
                results: {
                    title: '即时结果',
                    description: '数秒内获得详细营养信息'
                },
                progress: {
                    title: '进度跟踪',
                    description: '监控你的每日营养目标'
                }
            },
            testimonials: {
                title: '用户怎么说',
                subtitle: '加入成千上万改变了营养跟踪的满意用户',
                sarah: {
                    text: '“Calkilo 完全改变了我记录饮食的方式。AI 非常准确，为我节省了大量时间。3 个月瘦了 15 磅！”',
                    name: 'Sarah Johnson',
                    role: '健身爱好者'
                },
                mike: {
                    text: '“作为一名忙碌的职场人士，我从没有时间手动记录卡路里。Calkilo 的 AI 让一切变得毫不费力——对准拍照即可！”',
                    name: 'Mike Chen',
                    role: '软件工程师'
                },
                emily: {
                    text: '“准确度令人惊叹！甚至能识别复杂菜肴，并给出详细的宏观营养分解。这就是营养跟踪的未来。”',
                    name: 'Emily Rodriguez',
                    role: '营养师'
                }
            },
            download: {
                title: '准备好改变你的营养管理了吗？',
                subtitle: '立即下载 Calkilo，体验计算卡路里的未来',
                app_store: {
                    label: '下载自',
                    platform: 'App Store'
                },
                google_play: {
                    label: '获取于',
                    platform: 'Google Play'
                },
                features: {
                    free: '免费下载',
                    no_subscription: '无需订阅',
                    offline: '离线可用'
                }
            },
            footer: {
                description: '用 AI 驱动的卡路里计算，重塑营养跟踪',
                product: {
                    title: '产品',
                    features: '功能',
                    screenshots: '截图',
                    download: '下载',
                    pricing: '定价'
                },
                support: {
                    title: '支持',
                    faq: '常见问题',
                    contact: '联系我们',
                    privacy: '隐私政策',
                    terms: '服务条款'
                },
                company: {
                    title: '公司',
                    about: '关于我们',
                    blog: '博客',
                    careers: '招聘',
                    press: '媒体'
                },
                copyright: '版权所有。'
            }
        },
        ru: {
            nav: {
                features: 'Функции',
                screenshots: 'Скриншоты',
                reviews: 'Отзывы',
                faq: 'FAQ',
                contact: 'Контакты',
                download: 'Скачать'
            },
            hero: {
                title1: 'Рассчитывайте калории с',
                title2: 'точностью ИИ',
                description: 'Просто сделайте фото вашей еды, и продвинутый ИИ Calkilo мгновенно вычислит точные калории и питательную информацию. Никаких догадок и ручного ввода.',
                download_ios: 'Скачать для iOS',
                download_android: 'Скачать для Android',
                stats: {
                    users: 'Пользователи',
                    accuracy: 'Точность',
                    photos: 'Фото проанализировано'
                }
            },
            features: {
                title: 'Почему выбрать Calkilo?',
                subtitle: 'Революционная технология ИИ делает подсчет калорий простым и точным',
                photo_analysis: {
                    title: 'Мгновенный анализ фото',
                    description: 'Просто сфотографируйте ваш прием пищи и мгновенно получите точный подсчет калорий благодаря компьютерному зрению.'
                },
                ai_tech: {
                    title: 'Продвинутая технология ИИ',
                    description: 'Наша собственная модель распознаёт тысячи продуктов с точностью 99,2%, обучаясь на миллионах изображений.'
                },
                nutrition: {
                    title: 'Детальный учет питания',
                    description: 'Отслеживайте не только калории, но и макроэлементы, витамины и минералы, чтобы получить полную картину питания.'
                },
                goals: {
                    title: 'Персонализированные цели',
                    description: 'Устанавливайте и отслеживайте цели со смарт-рекомендациями ИИ, адаптированными под ваш образ жизни.'
                },
                history: {
                    title: 'Умная история',
                    description: 'Смотрите пищевые привычки, отслеживайте прогресс и получайте инсайты для лучших выборов.'
                },
                privacy: {
                    title: 'Приватность прежде всего',
                    description: 'Ваши фото и данные обрабатываются безопасно с использованием сквозного шифрования. Ваша приватность — наш приоритет.'
                }
            },
            screenshots: {
                title: 'Посмотрите Calkilo в деле',
                subtitle: 'Красивый и интуитивный интерфейс для легкого подсчета калорий',
                capture: {
                    title: 'Легкая съемка',
                    description: 'Наводите и снимайте — остальное сделает ИИ'
                },
                results: {
                    title: 'Мгновенные результаты',
                    description: 'Подробная информация за считанные секунды'
                },
                progress: {
                    title: 'Отслеживание прогресса',
                    description: 'Контролируйте ежедневные цели по питанию'
                }
            },
            testimonials: {
                title: 'Что говорят наши пользователи',
                subtitle: 'Присоединяйтесь к тысячам довольных пользователей, изменивших учет питания',
                sarah: {
                    text: '«Calkilo полностью изменил то, как я веду учет питания. ИИ невероятно точен и экономит кучу времени. Я сбросила 15 фунтов за 3 месяца!»',
                    name: 'Sarah Johnson',
                    role: 'Любитель фитнеса'
                },
                mike: {
                    text: '«Как занятый профессионал, я никогда не находил времени на ручной учет калорий. ИИ Calkilo делает все без усилий — просто наведи и снимай!»',
                    name: 'Mike Chen',
                    role: 'Инженер-программист'
                },
                emily: {
                    text: '«Точность поражает! Он распознает даже сложные блюда и дает подробное распределение макроэлементов. Это будущее учета питания.»',
                    name: 'Emily Rodriguez',
                    role: 'Диетолог'
                }
            },
            download: {
                title: 'Готовы изменить своё питание?',
                subtitle: 'Скачайте Calkilo сегодня и ощутите будущее подсчета калорий',
                app_store: {
                    label: 'Загрузить в',
                    platform: 'App Store'
                },
                google_play: {
                    label: 'Доступно в',
                    platform: 'Google Play'
                },
                features: {
                    free: 'Бесплатная загрузка',
                    no_subscription: 'Без подписки',
                    offline: 'Работает офлайн'
                }
            },
            footer: {
                description: 'Революция в учете питания с ИИ-подсчетом калорий',
                product: {
                    title: 'Продукт',
                    features: 'Функции',
                    screenshots: 'Скриншоты',
                    download: 'Скачать',
                    pricing: 'Цены'
                },
                support: {
                    title: 'Поддержка',
                    faq: 'FAQ',
                    contact: 'Связаться с нами',
                    privacy: 'Политика конфиденциальности',
                    terms: 'Условия использования'
                },
                company: {
                    title: 'Компания',
                    about: 'О нас',
                    blog: 'Блог',
                    careers: 'Карьера',
                    press: 'Пресса'
                },
                copyright: 'Все права защищены.'
            }
        },
        it: {
            nav: {
                features: 'Funzionalità',
                screenshots: 'Screenshot',
                reviews: 'Recensioni',
                faq: 'FAQ',
                contact: 'Contatti',
                download: 'Scarica'
            },
            hero: {
                title1: 'Calcola le calorie con',
                title2: 'precisione AI',
                description: 'Scatta una foto del tuo cibo e l’AI avanzata di Calkilo calcola all’istante calorie e informazioni nutrizionali accurate. Niente più supposizioni o registrazioni manuali.',
                download_ios: 'Scarica per iOS',
                download_android: 'Scarica per Android',
                stats: {
                    users: 'Utenti',
                    accuracy: 'Accuratezza',
                    photos: 'Foto analizzate'
                }
            },
            features: {
                title: 'Perché scegliere Calkilo?',
                subtitle: 'Tecnologia AI rivoluzionaria che rende il conteggio delle calorie semplice e preciso',
                photo_analysis: {
                    title: 'Analisi istantanea delle foto',
                    description: 'Scatta semplicemente una foto del pasto e ottieni subito un calcolo accurato delle calorie grazie alla visione artificiale.'
                },
                ai_tech: {
                    title: 'Tecnologia AI avanzata',
                    description: 'Il nostro modello proprietario riconosce migliaia di alimenti con il 99,2% di accuratezza, imparando da milioni di immagini.'
                },
                nutrition: {
                    title: 'Monitoraggio nutrizionale dettagliato',
                    description: 'Tieni traccia non solo delle calorie, ma anche dei macronutrienti, vitamine e minerali.'
                },
                goals: {
                    title: 'Obiettivi personalizzati',
                    description: 'Imposta e segui obiettivi con consigli AI adattati al tuo stile di vita.'
                },
                history: {
                    title: 'Cronologia intelligente',
                    description: 'Visualizza le abitudini alimentari, monitora i progressi e ottieni insight utili.'
                },
                privacy: {
                    title: 'Privacy prima di tutto',
                    description: 'Foto e dati vengono elaborati in modo sicuro con crittografia end‑to‑end. La tua privacy è la nostra priorità.'
                }
            },
            screenshots: {
                title: 'Guarda Calkilo in azione',
                subtitle: 'Interfaccia bella e intuitiva per un conteggio calorie senza sforzo',
                capture: {
                    title: 'Scatto facile',
                    description: 'Inquadra, scatta e lascia fare all’AI'
                },
                results: {
                    title: 'Risultati istantanei',
                    description: 'Ottieni informazioni nutrizionali dettagliate in pochi secondi'
                },
                progress: {
                    title: 'Monitoraggio dei progressi',
                    description: 'Monitora i tuoi obiettivi nutrizionali quotidiani'
                }
            },
            testimonials: {
                title: 'Cosa dicono i nostri utenti',
                subtitle: 'Unisciti a migliaia di utenti soddisfatti che hanno trasformato il monitoraggio della nutrizione',
                sarah: {
                    text: '“Calkilo ha cambiato completamente il modo in cui monitoro il cibo. L’AI è incredibilmente accurata e mi fa risparmiare un sacco di tempo. Ho perso 7 kg in 3 mesi!”',
                    name: 'Sarah Johnson',
                    role: 'Appassionata di fitness'
                },
                mike: {
                    text: '“Da professionista impegnato, non avevo mai tempo per registrare manualmente le calorie. L’AI di Calkilo lo rende facilissimo: punta e scatta!”',
                    name: 'Mike Chen',
                    role: 'Ingegnere software'
                },
                emily: {
                    text: '“L’accuratezza è pazzesca! Riconosce anche piatti complessi e fornisce dettagli sui macro. Questo è il futuro del monitoraggio nutrizionale.”',
                    name: 'Emily Rodriguez',
                    role: 'Nutrizionista'
                }
            },
            download: {
                title: 'Pronto a trasformare la tua nutrizione?',
                subtitle: 'Scarica Calkilo oggi e prova il futuro del conteggio calorie',
                app_store: {
                    label: 'Scarica su',
                    platform: 'App Store'
                },
                google_play: {
                    label: 'Disponibile su',
                    platform: 'Google Play'
                },
                features: {
                    free: 'Download gratuito',
                    no_subscription: 'Nessun abbonamento',
                    offline: 'Funziona offline'
                }
            },
            footer: {
                description: 'Rivoluzioniamo il monitoraggio nutrizionale con il calcolo calorie basato su AI',
                product: {
                    title: 'Prodotto',
                    features: 'Funzionalità',
                    screenshots: 'Screenshot',
                    download: 'Scarica',
                    pricing: 'Prezzi'
                },
                support: {
                    title: 'Supporto',
                    faq: 'FAQ',
                    contact: 'Contattaci',
                    privacy: 'Privacy',
                    terms: 'Termini di servizio'
                },
                company: {
                    title: 'Azienda',
                    about: 'Chi siamo',
                    blog: 'Blog',
                    careers: 'Carriere',
                    press: 'Stampa'
                },
                copyright: 'Tutti i diritti riservati.'
            }
        },
        fr: {
            nav: {
                features: 'Fonctionnalités',
                screenshots: 'Captures',
                reviews: 'Avis',
                faq: 'FAQ',
                contact: 'Contact',
                download: 'Télécharger'
            },
            hero: {
                title1: 'Calculez les calories avec',
                title2: 'la précision de l’IA',
                description: 'Prenez simplement une photo de votre plat et l’IA avancée de Calkilo calcule instantanément des calories et informations nutritionnelles précises. Plus de conjectures ni de saisie manuelle.',
                download_ios: 'Télécharger pour iOS',
                download_android: 'Télécharger pour Android',
                stats: {
                    users: 'Utilisateurs',
                    accuracy: 'Précision',
                    photos: 'Photos analysées'
                }
            },
            features: {
                title: 'Pourquoi choisir Calkilo ?',
                subtitle: 'Une technologie IA révolutionnaire pour un comptage des calories simple et précis',
                photo_analysis: {
                    title: 'Analyse photo instantanée',
                    description: 'Photographiez votre repas et obtenez immédiatement un calcul précis des calories grâce à la vision par ordinateur.'
                },
                ai_tech: {
                    title: 'Technologie IA avancée',
                    description: 'Notre modèle propriétaire reconnaît des milliers d’aliments avec une précision de 99,2 %, formé sur des millions d’images.'
                },
                nutrition: {
                    title: 'Suivi nutritionnel détaillé',
                    description: 'Suivez non seulement les calories, mais aussi les macronutriments, vitamines et minéraux.'
                },
                goals: {
                    title: 'Objectifs personnalisés',
                    description: 'Fixez et suivez des objectifs avec des recommandations IA adaptées à votre style de vie.'
                },
                history: {
                    title: 'Historique intelligent',
                    description: 'Visualisez vos habitudes, suivez vos progrès et obtenez des insights utiles.'
                },
                privacy: {
                    title: 'La confidentialité d’abord',
                    description: 'Vos photos et données sont traitées en toute sécurité avec un chiffrement de bout en bout.'
                }
            },
            screenshots: {
                title: 'Découvrez Calkilo en action',
                subtitle: 'Une interface belle et intuitive pour un suivi des calories sans effort',
                capture: {
                    title: 'Prise de vue facile',
                    description: 'Cadrez, déclenchez et laissez l’IA faire le reste'
                },
                results: {
                    title: 'Résultats instantanés',
                    description: 'Des infos nutritionnelles détaillées en quelques secondes'
                },
                progress: {
                    title: 'Suivi des progrès',
                    description: 'Surveillez vos objectifs nutritionnels quotidiens'
                }
            },
            testimonials: {
                title: 'Ce que disent nos utilisateurs',
                subtitle: 'Rejoignez des milliers d’utilisateurs satisfaits qui ont transformé leur suivi nutritionnel',
                sarah: {
                    text: '« Calkilo a complètement changé ma façon de suivre mon alimentation. L’IA est incroyablement précise et me fait gagner beaucoup de temps. J’ai perdu 7 kg en 3 mois ! »',
                    name: 'Sarah Johnson',
                    role: 'Passionnée de fitness'
                },
                mike: {
                    text: '« En tant que professionnel occupé, je n’avais jamais le temps d’enregistrer manuellement les calories. L’IA de Calkilo rend cela sans effort : il suffit de viser et shooter ! »',
                    name: 'Mike Chen',
                    role: 'Ingénieur logiciel'
                },
                emily: {
                    text: '« La précision est incroyable ! Elle reconnaît même des plats complexes et fournit des détails sur les macros. C’est l’avenir du suivi nutritionnel. »',
                    name: 'Emily Rodriguez',
                    role: 'Nutritionniste'
                }
            },
            download: {
                title: 'Prêt à transformer votre nutrition ?',
                subtitle: 'Téléchargez Calkilo dès aujourd’hui et vivez le futur du comptage des calories',
                app_store: {
                    label: 'Télécharger sur',
                    platform: 'App Store'
                },
                google_play: {
                    label: 'Disponible sur',
                    platform: 'Google Play'
                },
                features: {
                    free: 'Téléchargement gratuit',
                    no_subscription: 'Sans abonnement',
                    offline: 'Fonctionne hors ligne'
                }
            },
            footer: {
                description: 'Révolution du suivi nutritionnel grâce au calcul des calories par IA',
                product: {
                    title: 'Produit',
                    features: 'Fonctionnalités',
                    screenshots: 'Captures',
                    download: 'Télécharger',
                    pricing: 'Tarifs'
                },
                support: {
                    title: 'Support',
                    faq: 'FAQ',
                    contact: 'Nous contacter',
                    privacy: 'Politique de confidentialité',
                    terms: 'Conditions d’utilisation'
                },
                company: {
                    title: 'Entreprise',
                    about: 'À propos',
                    blog: 'Blog',
                    careers: 'Carrières',
                    press: 'Presse'
                },
                copyright: 'Tous droits réservés.'
            }
        },
        de: {
            nav: {
                features: 'Funktionen',
                screenshots: 'Screenshots',
                reviews: 'Bewertungen',
                faq: 'FAQ',
                contact: 'Kontakt',
                download: 'Download'
            },
            hero: {
                title1: 'Kalorien berechnen mit',
                title2: 'KI-Präzision',
                description: 'Machen Sie einfach ein Foto Ihres Essens und die fortschrittliche KI von Calkilo berechnet sofort genaue Kalorien- und Nährwertangaben. Kein Rätselraten und keine manuelle Eingabe mehr.',
                download_ios: 'Für iOS herunterladen',
                download_android: 'Für Android herunterladen',
                stats: {
                    users: 'Nutzer',
                    accuracy: 'Genauigkeit',
                    photos: 'Analysierte Fotos'
                }
            },
            features: {
                title: 'Warum Calkilo wählen?',
                subtitle: 'Revolutionäre KI-Technologie macht Kalorienzählen einfach und präzise',
                photo_analysis: {
                    title: 'Sofortige Fotoanalyse',
                    description: 'Einfach Ihr Mahl fotografieren und sofort eine genaue Kalorienberechnung erhalten – dank Computer Vision.'
                },
                ai_tech: {
                    title: 'Fortschrittliche KI-Technologie',
                    description: 'Unser proprietäres Modell erkennt Tausende von Lebensmitteln mit 99,2 % Genauigkeit und lernt aus Millionen von Bildern.'
                },
                nutrition: {
                    title: 'Detailliertes Nährwert-Tracking',
                    description: 'Verfolgen Sie nicht nur Kalorien, sondern auch Makros, Vitamine und Mineralstoffe.'
                },
                goals: {
                    title: 'Personalisierte Ziele',
                    description: 'Setzen und verfolgen Sie Ziele mit KI-Empfehlungen, die zu Ihrem Lebensstil passen.'
                },
                history: {
                    title: 'Intelligente Historie',
                    description: 'Sehen Sie Essgewohnheiten, verfolgen Sie Fortschritte und erhalten Sie hilfreiche Insights.'
                },
                privacy: {
                    title: 'Datenschutz zuerst',
                    description: 'Ihre Fotos und Daten werden sicher mit Ende-zu-Ende-Verschlüsselung verarbeitet.'
                }
            },
            screenshots: {
                title: 'Calkilo in Aktion',
                subtitle: 'Schöne, intuitive Oberfläche für müheloses Kalorienzählen',
                capture: {
                    title: 'Einfaches Fotografieren',
                    description: 'Zielen, auslösen – den Rest übernimmt die KI'
                },
                results: {
                    title: 'Sofortige Ergebnisse',
                    description: 'Detailierte Nährwertinfos in Sekunden'
                },
                progress: {
                    title: 'Fortschrittsverfolgung',
                    description: 'Tägliche Ernährungsziele im Blick behalten'
                }
            },
            testimonials: {
                title: 'Was unsere Nutzer sagen',
                subtitle: 'Schließen Sie sich Tausenden zufriedener Nutzer an, die ihr Ernährungstracking verändert haben',
                sarah: {
                    text: '„Calkilo hat meine Art, mein Essen zu tracken, komplett verändert. Die KI ist unglaublich genau und spart mir viel Zeit. Ich habe in 3 Monaten 7 kg abgenommen!“',
                    name: 'Sarah Johnson',
                    role: 'Fitness-Enthusiastin'
                },
                mike: {
                    text: '„Als vielbeschäftigter Profi hatte ich nie Zeit für manuelle Kalorienerfassung. Die KI von Calkilo macht es mühelos – einfach zielen und auslösen!“',
                    name: 'Mike Chen',
                    role: 'Softwareingenieur'
                },
                emily: {
                    text: '„Die Genauigkeit ist verblüffend! Erkennt sogar komplexe Gerichte und liefert detaillierte Macro-Aufschlüsselungen. Das ist die Zukunft des Ernährungstrackings.“',
                    name: 'Emily Rodriguez',
                    role: 'Ernährungsberaterin'
                }
            },
            download: {
                title: 'Bereit, Ihre Ernährung zu transformieren?',
                subtitle: 'Laden Sie Calkilo noch heute herunter und erleben Sie die Zukunft des Kalorienzählens',
                app_store: {
                    label: 'Laden im',
                    platform: 'App Store'
                },
                google_play: {
                    label: 'Erhältlich bei',
                    platform: 'Google Play'
                },
                features: {
                    free: 'Kostenloser Download',
                    no_subscription: 'Keine Abonnements',
                    offline: 'Funktioniert offline'
                }
            },
            footer: {
                description: 'Wir revolutionieren Ernährungstracking mit KI-gestützter Kalorienberechnung',
                product: {
                    title: 'Produkt',
                    features: 'Funktionen',
                    screenshots: 'Screenshots',
                    download: 'Download',
                    pricing: 'Preise'
                },
                support: {
                    title: 'Support',
                    faq: 'FAQ',
                    contact: 'Kontakt',
                    privacy: 'Datenschutz',
                    terms: 'Nutzungsbedingungen'
                },
                company: {
                    title: 'Unternehmen',
                    about: 'Über uns',
                    blog: 'Blog',
                    careers: 'Karriere',
                    press: 'Presse'
                },
                copyright: 'Alle Rechte vorbehalten.'
            }
        },
        ar: {
            nav: {
                features: 'الميزات',
                screenshots: 'اللقطات',
                reviews: 'المراجعات',
                faq: 'الأسئلة الشائعة',
                contact: 'اتصل بنا',
                download: 'تنزيل'
            },
            hero: {
                title1: 'احسب السعرات الحرارية بـ',
                title2: 'دقة الذكاء الاصطناعي',
                description: 'التقط صورة لوجبتك وسيحسب ذكاء Calkilo المتقدم فورًا السعرات والمعلومات الغذائية بدقة. لا مزيد من التخمين أو الإدخال اليدوي.',
                download_ios: 'تنزيل لـ iOS',
                download_android: 'تنزيل لـ Android',
                stats: {
                    users: 'المستخدمون',
                    accuracy: 'الدقة',
                    photos: 'الصور المُحلّلة'
                }
            },
            features: {
                title: 'لماذا كالكيلو؟',
                subtitle: 'تقنية ذكاء اصطناعي ثورية تجعل عدّ السعرات سهلًا ودقيقًا',
                photo_analysis: {
                    title: 'تحليل فوري للصورة',
                    description: 'التقط صورة لوجبتك واحصل فورًا على حساب دقيق للسعرات بفضل رؤية الحاسوب.'
                },
                ai_tech: {
                    title: 'تقنية ذكاء اصطناعي متقدمة',
                    description: 'نموذجنا الخاص يتعرّف على آلاف الأطعمة بدقة 99.2% ويتعلم من ملايين الصور.'
                },
                nutrition: {
                    title: 'تتبع غذائي مفصل',
                    description: 'تتبّع ليس فقط السعرات بل أيضًا الماكروز والفيتامينات والمعادن لصورة متكاملة.'
                },
                goals: {
                    title: 'أهداف مخصّصة',
                    description: 'حدّد وتتبع أهدافك مع توصيات ذكية مكيّفة مع نمط حياتك.'
                },
                history: {
                    title: 'سجل ذكي',
                    description: 'اطلع على أنماطك الغذائية وتابع التقدم واحصل على رؤى لاتخاذ قرارات أفضل.'
                },
                privacy: {
                    title: 'الخصوصية أولًا',
                    description: 'تُعالَج صورك وبياناتك بأمان مع تشفير شامل. خصوصيتك هي أولويتنا.'
                }
            },
            screenshots: {
                title: 'شاهد كالكيلو قيد العمل',
                subtitle: 'واجهة جميلة وبديهية لتتبع السعرات بسهولة',
                capture: {
                    title: 'تصوير سهل',
                    description: 'وجّه الكاميرا والتقط الصورة ودع الذكاء الاصطناعي يتولى الباقي'
                },
                results: {
                    title: 'نتائج فورية',
                    description: 'احصل على معلومات غذائية مفصلة خلال ثوانٍ'
                },
                progress: {
                    title: 'تتبع التقدم',
                    description: 'راقب أهدافك الغذائية اليومية'
                }
            },
            testimonials: {
                title: 'ماذا يقول مستخدمونا',
                subtitle: 'انضم إلى آلاف المستخدمين الراضين الذين غيّروا طريقة تتبعهم للتغذية',
                sarah: {
                    text: '«غيّر Calkilo تمامًا طريقة تتبعي للطعام. الذكاء الاصطناعي دقيق للغاية ويوفر لي الكثير من الوقت. فقدت 15 رطلًا خلال 3 أشهر!»',
                    name: 'سارة جونسون',
                    role: 'مهتمة باللياقة'
                },
                mike: {
                    text: '«بصفتي محترفًا مشغولًا، لم يكن لدي وقت للإدخال اليدوي. ذكاء Calkilo يجعل الأمر بلا مجهود — وجّه الكاميرا والتقط فقط!»',
                    name: 'مايك تشين',
                    role: 'مهندس برمجيات'
                },
                emily: {
                    text: '«الدقة مذهلة! يتعرف حتى على الأطباق المعقّدة ويعطي تفاصيل دقيقة للماكروز. هذا هو مستقبل تتبع التغذية.»',
                    name: 'إميلي رودريغيز',
                    role: 'أخصائية تغذية'
                }
            },
            download: {
                title: 'هل أنت مستعد لتحويل تغذيتك؟',
                subtitle: 'نزّل Calkilo اليوم واختبر مستقبل عدّ السعرات',
                app_store: {
                    label: 'تنزيل من',
                    platform: 'App Store'
                },
                google_play: {
                    label: 'متاح على',
                    platform: 'Google Play'
                },
                features: {
                    free: 'تنزيل مجاني',
                    no_subscription: 'بدون اشتراك',
                    offline: 'يعمل دون اتصال'
                }
            },
            footer: {
                description: 'نحدث ثورة في تتبع التغذية بحساب السعرات المعتمد على الذكاء الاصطناعي',
                product: {
                    title: 'المنتج',
                    features: 'الميزات',
                    screenshots: 'اللقطات',
                    download: 'تنزيل',
                    pricing: 'الأسعار'
                },
                support: {
                    title: 'الدعم',
                    faq: 'الأسئلة الشائعة',
                    contact: 'اتصل بنا',
                    privacy: 'الخصوصية',
                    terms: 'شروط الخدمة'
                },
                company: {
                    title: 'الشركة',
                    about: 'من نحن',
                    blog: 'المدونة',
                    careers: 'وظائف',
                    press: 'الصحافة'
                },
                copyright: 'جميع الحقوق محفوظة.'
            }
        },
        es: {
            nav: {
                features: 'Funciones',
                screenshots: 'Capturas',
                reviews: 'Reseñas',
                faq: 'FAQ',
                contact: 'Contacto',
                download: 'Descargar'
            },
            hero: {
                title1: 'Calcula calorías con',
                title2: 'precisión de IA',
                description: 'Solo toma una foto de tu comida y la IA avanzada de Calkilo calculará al instante calorías e información nutricional precisa. Sin conjeturas ni registro manual.',
                download_ios: 'Descargar para iOS',
                download_android: 'Descargar para Android',
                stats: {
                    users: 'Usuarios',
                    accuracy: 'Precisión',
                    photos: 'Fotos analizadas'
                }
            },
            features: {
                title: '¿Por qué elegir Calkilo?',
                subtitle: 'Tecnología de IA revolucionaria que hace el conteo de calorías fácil y preciso',
                photo_analysis: {
                    title: 'Análisis instantáneo de fotos',
                    description: 'Simplemente toma una foto de tu comida y obtén un cálculo preciso de calorías gracias a la visión por computadora.'
                },
                ai_tech: {
                    title: 'Tecnología de IA avanzada',
                    description: 'Nuestro modelo propietario reconoce miles de alimentos con un 99.2% de precisión, aprendiendo de millones de imágenes.'
                },
                nutrition: {
                    title: 'Seguimiento nutricional detallado',
                    description: 'Sigue no solo las calorías, sino también macronutrientes, vitaminas y minerales.'
                },
                goals: {
                    title: 'Objetivos personalizados',
                    description: 'Configura y sigue objetivos con recomendaciones de IA adaptadas a tu estilo de vida.'
                },
                history: {
                    title: 'Historial inteligente',
                    description: 'Observa tus patrones alimentarios, sigue el progreso y obtén insights útiles.'
                },
                privacy: {
                    title: 'Privacidad primero',
                    description: 'Tus fotos y datos se procesan de forma segura con cifrado de extremo a extremo.'
                }
            },
            screenshots: {
                title: 'Mira Calkilo en acción',
                subtitle: 'Interfaz hermosa e intuitiva para un conteo de calorías sin esfuerzo',
                capture: {
                    title: 'Captura fácil',
                    description: 'Apunta y dispara; la IA hace el resto'
                },
                results: {
                    title: 'Resultados instantáneos',
                    description: 'Obtén detalles nutricionales en segundos'
                },
                progress: {
                    title: 'Seguimiento del progreso',
                    description: 'Monitorea tus objetivos nutricionales diarios'
                }
            },
            testimonials: {
                title: 'Lo que dicen nuestros usuarios',
                subtitle: 'Únete a miles de usuarios satisfechos que han transformado su seguimiento nutricional',
                sarah: {
                    text: '“Calkilo ha cambiado por completo cómo registro mi comida. La IA es increíblemente precisa y me ahorra mucho tiempo. ¡Perdí 7 kg en 3 meses!”',
                    name: 'Sarah Johnson',
                    role: 'Aficionada al fitness'
                },
                mike: {
                    text: '“Como profesional ocupado, nunca tuve tiempo para registrar calorías manualmente. La IA de Calkilo lo hace sin esfuerzo: ¡apunta y dispara!”',
                    name: 'Mike Chen',
                    role: 'Ingeniero de software'
                },
                emily: {
                    text: '“¡La precisión es impresionante! Incluso reconoce platos complejos y da un desglose detallado de macros. Este es el futuro del seguimiento nutricional.”',
                    name: 'Emily Rodriguez',
                    role: 'Nutricionista'
                }
            },
            download: {
                title: '¿Listo para transformar tu nutrición?',
                subtitle: 'Descarga Calkilo hoy y experimenta el futuro del conteo de calorías',
                app_store: {
                    label: 'Descargar en',
                    platform: 'App Store'
                },
                google_play: {
                    label: 'Disponible en',
                    platform: 'Google Play'
                },
                features: {
                    free: 'Descarga gratuita',
                    no_subscription: 'Sin suscripción',
                    offline: 'Funciona sin conexión'
                }
            },
            footer: {
                description: 'Revolucionamos el seguimiento nutricional con cálculo de calorías impulsado por IA',
                product: {
                    title: 'Producto',
                    features: 'Funciones',
                    screenshots: 'Capturas',
                    download: 'Descargar',
                    pricing: 'Precios'
                },
                support: {
                    title: 'Soporte',
                    faq: 'FAQ',
                    contact: 'Contáctanos',
                    privacy: 'Política de privacidad',
                    terms: 'Términos del servicio'
                },
                company: {
                    title: 'Compañía',
                    about: 'Sobre nosotros',
                    blog: 'Blog',
                    careers: 'Empleos',
                    press: 'Prensa'
                },
                copyright: 'Todos los derechos reservados.'
            }
        }
    };

    function detectInitialLanguage() {
        const saved = localStorage.getItem('lang');
        if (saved && supportedLanguages.includes(saved)) return saved;
        const browser = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
        return supportedLanguages.includes(browser) ? browser : 'en';
    }

    function setHtmlDirection(lang) {
        const dir = rtlLanguages.has(lang) ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', lang);
    }

    function getFrom(obj, path) {
        return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
    }

    function getText(key, lang) {
        const value = getFrom(translations[lang] || {}, key);
        if (typeof value === 'string' && value.length) return value;
        const fallback = getFrom(translations.en || {}, key);
        return typeof fallback === 'string' ? fallback : null;
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            const text = getText(key, lang);
            if (text) {
                el.textContent = text;
            }
        });

        if (currentFlagEl && currentLangEl && dropdown) {
            const option = dropdown.querySelector(`.language-option[data-lang="${lang}"]`);
            const flag = option ? (option.querySelector('.flag')?.textContent || '🌐') : '🌐';
            const label = option ? (option.querySelector('.lang-name')?.textContent || lang.toUpperCase()) : lang.toUpperCase();
            currentFlagEl.textContent = flag.trim();
            currentLangEl.textContent = label.trim();

            dropdown.querySelectorAll('.language-option').forEach(opt => {
                opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
            });
        }
    }

    function changeLanguage(lang) {
        if (!supportedLanguages.includes(lang)) lang = 'en';
        localStorage.setItem('lang', lang);
        setHtmlDirection(lang);
        applyTranslations(lang);
        if (dropdown) dropdown.classList.remove('active');
        if (toggleBtn) toggleBtn.classList.remove('active');
        // notify listeners (e.g., hero typewriter) to re-run after translation
        document.dispatchEvent(new CustomEvent('calkilo:languageChanged', { detail: { lang } }));
    }

    document.addEventListener('DOMContentLoaded', () => {
        const initial = detectInitialLanguage();
        setHtmlDirection(initial);
        applyTranslations(initial);
        document.dispatchEvent(new CustomEvent('calkilo:languageChanged', { detail: { lang: initial } }));

        if (toggleBtn && dropdown) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleBtn.classList.toggle('active');
                dropdown.classList.toggle('active');
            });
        }

        if (dropdown) {
            dropdown.querySelectorAll('.language-option').forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.getAttribute('data-lang');
                    if (lang) changeLanguage(lang);
                });
            });
        }

        document.addEventListener('click', (e) => {
            if (dropdown && toggleBtn && !dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
                dropdown.classList.remove('active');
                toggleBtn.classList.remove('active');
            }
        });
    });
})();


