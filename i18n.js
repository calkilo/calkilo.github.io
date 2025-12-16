// i18n: Language switcher and translations
(function() {
    const toggleBtn = document.getElementById('languageToggle');
    const dropdown = document.getElementById('languageDropdown');
    const currentFlagEl = document.getElementById('currentFlag');
    const currentLangEl = document.getElementById('currentLang');

    // proceed even if language UI is not present; guard accesses below

    const supportedLanguages = ['en', 'fa', 'zh', 'ru', 'it', 'fr', 'de', 'ar', 'es', 'nl'];
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
            how_it_works: {
                title: 'How It Works',
                subtitle: 'Track your nutrition in three simple steps',
                step1: {
                    title: 'Snap a Photo',
                    description: 'Take a clear photo of your meal, snack, or drink. Our AI works with any food from any cuisine.'
                },
                step2: {
                    title: 'AI Analyzes',
                    description: 'Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutrition data.'
                },
                step3: {
                    title: 'Track Progress',
                    description: 'View detailed nutrition breakdown, track your goals, and watch your progress over time.'
                }
            },
            integrations: {
                title: 'Seamlessly Integrates with Your Devices',
                subtitle: 'Sync with your favorite health and fitness apps for a complete wellness picture',
                apple_health: {
                    title: 'Apple Health',
                    description: 'Sync calories, workouts, and health metrics'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: 'Connect activities and track your daily movement'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: 'Automatic activity and exercise tracking'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: 'Complete health data synchronization'
                },
                garmin: {
                    title: 'Garmin',
                    description: 'Track workouts and sports activities'
                },
                strava: {
                    title: 'Strava',
                    description: 'Sync running and cycling activities'
                }
            },
            comparison: {
                title: 'Why Choose Calkilo?',
                subtitle: 'See how we compare to other calorie tracking apps',
                table: {
                    feature: 'Feature',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'AI Photo Recognition',
                row2: 'Instant Calorie Calculation',
                row3: '99.2% Accuracy',
                row4: 'Privacy-First Approach',
                row5: 'No Ads (Free Version)',
                row6: 'Wearable Integration',
                row7: 'Monthly Price'
            },
            meal_planning: {
                title: 'AI-Powered Meal Planning & Recipes',
                subtitle: 'Get personalized meal plans tailored to your goals, preferences, and dietary restrictions',
                smart_suggestions: {
                    title: 'Smart Meal Suggestions',
                    description: 'AI recommends meals based on your nutrition goals and eating patterns'
                },
                weekly_plans: {
                    title: 'Weekly Meal Plans',
                    description: 'Generate complete weekly meal plans with shopping lists'
                },
                dietary: {
                    title: 'Dietary Preferences',
                    description: 'Support for vegan, keto, paleo, gluten-free, and more'
                },
                recipes: {
                    title: '10,000+ Recipes',
                    description: 'Access thousands of healthy recipes with nutrition info'
                }
            },
            community: {
                title: 'Join a Thriving Community',
                subtitle: 'Connect, share, and get motivated with thousands of health-conscious users',
                challenges: {
                    title: 'Weekly Challenges',
                    description: 'Join community challenges to stay motivated and earn rewards'
                },
                groups: {
                    title: 'Support Groups',
                    description: 'Connect with others on similar health journeys'
                },
                share: {
                    title: 'Share Progress',
                    description: 'Share your achievements and inspire others'
                },
                leaderboards: {
                    title: 'Leaderboards',
                    description: 'Compete with friends and climb the rankings'
                }
            },
            trust: {
                title: 'Your Privacy & Security Matters',
                subtitle: 'We take data protection seriously with industry-leading security measures',
                encryption: {
                    title: 'End-to-End Encryption',
                    description: 'All your data is encrypted using AES-256 encryption'
                },
                gdpr: {
                    title: 'GDPR Compliant',
                    description: 'Fully compliant with international data protection regulations'
                },
                no_sell: {
                    title: 'We Never Sell Your Data',
                    description: 'Your information stays private. No third-party data sharing'
                },
                auto_delete: {
                    title: 'Auto-Delete Photos',
                    description: 'Photos are deleted immediately after processing'
                },
                hipaa: {
                    title: 'HIPAA Compliant',
                    description: 'Meets healthcare data security standards'
                },
                control: {
                    title: 'You\'re In Control',
                    description: 'Export or delete your data anytime with one click'
                },
                certifications: {
                    text: 'Certified by:'
                }
            },
            faq_section: {
                title: 'Frequently Asked Questions',
                subtitle: 'Got questions? We\'ve got answers',
                q1: {
                    question: 'How accurate is the AI food recognition?',
                    answer: 'Calkilo\'s AI has 99.2% accuracy, trained on millions of food images. It recognizes thousands of foods, ingredients, and dishes from various cuisines worldwide.'
                },
                q2: {
                    question: 'Is my food photo data private and secure?',
                    answer: 'Yes! Your photos are processed with end-to-end encryption and automatically deleted after analysis. We never share or sell your data, and you can delete your account anytime.'
                },
                q3: {
                    question: 'Do I need internet connection to use the app?',
                    answer: 'The app works offline for manual logging. AI photo analysis requires internet connection for the best accuracy, but you can save photos and analyze them later when connected.'
                },
                q4: {
                    question: 'Can I cancel my subscription anytime?',
                    answer: 'Absolutely! You can cancel your subscription anytime from your account settings. You\'ll continue to have access until the end of your billing period.'
                },
                q5: {
                    question: 'Does it work with my fitness tracker?',
                    answer: 'Yes! Calkilo integrates with Apple Health, Google Fit, Fitbit, Samsung Health, Garmin, and more to sync your activity data automatically.'
                },
                q6: {
                    question: 'Is there a free trial for premium features?',
                    answer: 'Yes! We offer a 7-day free trial of Premium features. No credit card required. You can upgrade anytime from the free version.'
                },
                more: 'Have more questions?',
                view_all: 'View All FAQs'
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
            how_it_works: {
                title: 'چگونه کار می‌کند',
                subtitle: 'پایش تغذیه در سه مرحله ساده',
                step1: {
                    title: 'عکس بگیرید',
                    description: 'از وعده غذایی، میان‌وعده یا نوشیدنی خود عکس واضحی بگیرید. هوش مصنوعی ما با هر غذایی از هر آشپزخانه‌ای کار می‌کند.'
                },
                step2: {
                    title: 'تحلیل هوش مصنوعی',
                    description: 'هوش مصنوعی پیشرفته ما فوراً مواد تشکیل‌دهنده، اندازه‌های سهم و داده‌های تغذیه‌ای دقیق را تشخیص می‌دهد.'
                },
                step3: {
                    title: 'پیگیری پیشرفت',
                    description: 'جزئیات تغذیه را ببینید، اهداف خود را پیگیری کنید و پیشرفت خود را در طول زمان مشاهده کنید.'
                }
            },
            integrations: {
                title: 'یکپارچه با دستگاه‌های شما',
                subtitle: 'با اپلیکیشن‌های سلامت و تناسب‌اندام موردعلاقه خود همگام‌سازی کنید',
                apple_health: {
                    title: 'Apple Health',
                    description: 'همگام‌سازی کالری، تمرینات و معیارهای سلامت'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: 'اتصال فعالیت‌ها و پیگیری حرکت روزانه شما'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: 'پیگیری خودکار فعالیت و تمرین'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: 'همگام‌سازی کامل داده‌های سلامت'
                },
                garmin: {
                    title: 'Garmin',
                    description: 'پیگیری تمرینات و فعالیت‌های ورزشی'
                },
                strava: {
                    title: 'Strava',
                    description: 'همگام‌سازی فعالیت‌های دویدن و دوچرخه‌سواری'
                }
            },
            comparison: {
                title: 'چرا کالکیلو؟',
                subtitle: 'ببینید چگونه با سایر اپلیکیشن‌های پیگیری کالری مقایسه می‌شویم',
                table: {
                    feature: 'ویژگی',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'تشخیص عکس با هوش مصنوعی',
                row2: 'محاسبه فوری کالری',
                row3: 'دقت ۹۹.۲٪',
                row4: 'رویکرد اولویت با حریم خصوصی',
                row5: 'بدون تبلیغات (نسخه رایگان)',
                row6: 'یکپارچه‌سازی پوشیدنی',
                row7: 'قیمت ماهانه'
            },
            meal_planning: {
                title: 'برنامه‌ریزی وعده‌های غذایی و دستورالعمل‌های مبتنی بر هوش مصنوعی',
                subtitle: 'برنامه‌های غذایی شخصی‌سازی‌شده متناسب با اهداف، ترجیحات و محدودیت‌های غذایی خود دریافت کنید',
                smart_suggestions: {
                    title: 'پیشنهادات هوشمند وعده غذایی',
                    description: 'هوش مصنوعی بر اساس اهداف تغذیه‌ای و الگوهای غذایی شما وعده‌ها را پیشنهاد می‌دهد'
                },
                weekly_plans: {
                    title: 'برنامه‌های هفتگی وعده غذایی',
                    description: 'ایجاد برنامه‌های هفتگی کامل با فهرست خرید'
                },
                dietary: {
                    title: 'ترجیحات غذایی',
                    description: 'پشتیبانی از وگان، کتو، پالئو، بدون گلوتن و بیشتر'
                },
                recipes: {
                    title: 'بیش از ۱۰,۰۰۰ دستورالعمل',
                    description: 'دسترسی به هزاران دستورالعمل سالم با اطلاعات تغذیه‌ای'
                }
            },
            community: {
                title: 'به یک جامعه پررونق بپیوندید',
                subtitle: 'با هزاران کاربر آگاه به سلامت ارتباط برقرار کنید، به اشتراک بگذارید و انگیزه بگیرید',
                challenges: {
                    title: 'چالش‌های هفتگی',
                    description: 'به چالش‌های جامعه بپیوندید تا انگیزه داشته باشید و پاداش دریافت کنید'
                },
                groups: {
                    title: 'گروه‌های پشتیبانی',
                    description: 'با دیگران در سفرهای مشابه سلامت ارتباط برقرار کنید'
                },
                share: {
                    title: 'اشتراک‌گذاری پیشرفت',
                    description: 'دستاوردهای خود را به اشتراک بگذارید و دیگران را الهام بخشید'
                },
                leaderboards: {
                    title: 'جدول رده‌بندی',
                    description: 'با دوستان رقابت کنید و در رتبه‌بندی صعود کنید'
                }
            },
            trust: {
                title: 'حریم خصوصی و امنیت شما مهم است',
                subtitle: 'ما حفاظت از داده را با اقدامات امنیتی پیشرو در صنعت جدی می‌گیریم',
                encryption: {
                    title: 'رمزگذاری سرتاسر',
                    description: 'همه داده‌های شما با رمزگذاری AES-256 رمزگذاری می‌شوند'
                },
                gdpr: {
                    title: 'مطابق با GDPR',
                    description: 'کاملاً مطابق با مقررات بین‌المللی حفاظت از داده'
                },
                no_sell: {
                    title: 'ما هرگز داده‌های شما را نمی‌فروشیم',
                    description: 'اطلاعات شما خصوصی می‌ماند. بدون اشتراک‌گذاری داده با شخص ثالث'
                },
                auto_delete: {
                    title: 'حذف خودکار عکس‌ها',
                    description: 'عکس‌ها بلافاصله پس از پردازش حذف می‌شوند'
                },
                hipaa: {
                    title: 'مطابق با HIPAA',
                    description: 'مطابق با استانداردهای امنیت داده‌های مراقبت‌های بهداشتی'
                },
                control: {
                    title: 'شما کنترل دارید',
                    description: 'داده‌های خود را در هر زمان با یک کلیک صادر یا حذف کنید'
                },
                certifications: {
                    text: 'تایید شده توسط:'
                }
            },
            faq_section: {
                title: 'سوالات متداول',
                subtitle: 'سوالی دارید؟ ما پاسخ داریم',
                q1: {
                    question: 'دقت تشخیص غذای هوش مصنوعی چقدر است؟',
                    answer: 'هوش مصنوعی کالکیلو دقت ۹۹.۲٪ دارد و بر روی میلیون‌ها تصویر غذا آموزش دیده است. هزاران غذا، ماده تشکیل‌دهنده و ظرف از آشپزخانه‌های مختلف در سراسر جهان را تشخیص می‌دهد.'
                },
                q2: {
                    question: 'آیا داده‌های عکس غذای من خصوصی و امن است؟',
                    answer: 'بله! عکس‌های شما با رمزگذاری سرتاسر پردازش می‌شوند و پس از تجزیه و تحلیل به‌طور خودکار حذف می‌شوند. ما هرگز داده‌های شما را به اشتراک نمی‌گذاریم یا نمی‌فروشیم و می‌توانید حساب خود را در هر زمان حذف کنید.'
                },
                q3: {
                    question: 'آیا برای استفاده از اپلیکیشن به اتصال اینترنت نیاز دارم؟',
                    answer: 'اپلیکیشن برای ثبت دستی به‌صورت آفلاین کار می‌کند. تجزیه و تحلیل عکس هوش مصنوعی برای بهترین دقت به اتصال اینترنت نیاز دارد، اما می‌توانید عکس‌ها را ذخیره کنید و بعداً هنگام اتصال تجزیه و تحلیل کنید.'
                },
                q4: {
                    question: 'آیا می‌توانم اشتراک خود را در هر زمان لغو کنم؟',
                    answer: 'قطعاً! می‌توانید اشتراک خود را در هر زمان از تنظیمات حساب خود لغو کنید. تا پایان دوره صورتحساب خود به دسترسی ادامه خواهید داد.'
                },
                q5: {
                    question: 'آیا با ردیاب تناسب‌اندام من کار می‌کند؟',
                    answer: 'بله! کالکیلو با Apple Health، Google Fit، Fitbit، Samsung Health، Garmin و بیشتر برای همگام‌سازی خودکار داده‌های فعالیت شما یکپارچه می‌شود.'
                },
                q6: {
                    question: 'آیا برای ویژگی‌های پریمیوم آزمایش رایگان وجود دارد؟',
                    answer: 'بله! ما یک آزمایش رایگان ۷ روزه از ویژگی‌های پریمیوم ارائه می‌دهیم. بدون نیاز به کارت اعتباری. می‌توانید در هر زمان از نسخه رایگان ارتقا دهید.'
                },
                more: 'سوالات بیشتری دارید؟',
                view_all: 'مشاهده همه سوالات متداول'
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
            how_it_works: {
                title: '工作原理',
                subtitle: '三个简单步骤跟踪你的营养',
                step1: {
                    title: '拍照',
                    description: '为你的餐食、零食或饮料拍一张清晰的照片。我们的 AI 适用于任何菜系的任何食物。'
                },
                step2: {
                    title: 'AI 分析',
                    description: '我们的先进 AI 即时识别成分、份量大小，并计算精确的营养数据。'
                },
                step3: {
                    title: '跟踪进度',
                    description: '查看详细的营养分解，跟踪你的目标，并观察你的长期进展。'
                }
            },
            integrations: {
                title: '与你的设备无缝集成',
                subtitle: '与你喜爱的健康和健身应用同步，获得完整的健康图景',
                apple_health: {
                    title: 'Apple Health',
                    description: '同步卡路里、锻炼和健康指标'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: '连接活动并跟踪你的日常运动'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: '自动活动和运动跟踪'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: '完整的健康数据同步'
                },
                garmin: {
                    title: 'Garmin',
                    description: '跟踪锻炼和体育活动'
                },
                strava: {
                    title: 'Strava',
                    description: '同步跑步和骑行活动'
                }
            },
            comparison: {
                title: '为什么选择 Calkilo？',
                subtitle: '看看我们与其他卡路里跟踪应用的对比',
                table: {
                    feature: '功能',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'AI 照片识别',
                row2: '即时卡路里计算',
                row3: '99.2% 准确率',
                row4: '隐私优先方法',
                row5: '无广告（免费版）',
                row6: '可穿戴设备集成',
                row7: '月费'
            },
            meal_planning: {
                title: 'AI 驱动的膳食计划和食谱',
                subtitle: '获得根据你的目标、偏好和饮食限制量身定制的个性化膳食计划',
                smart_suggestions: {
                    title: '智能膳食建议',
                    description: 'AI 根据你的营养目标和饮食模式推荐膳食'
                },
                weekly_plans: {
                    title: '每周膳食计划',
                    description: '生成完整的每周膳食计划和购物清单'
                },
                dietary: {
                    title: '饮食偏好',
                    description: '支持纯素、生酮、古法、无麸质等'
                },
                recipes: {
                    title: '10,000+ 食谱',
                    description: '访问数千个带营养信息的健康食谱'
                }
            },
            community: {
                title: '加入蓬勃发展的社区',
                subtitle: '与数千名注重健康的用户联系、分享并获得动力',
                challenges: {
                    title: '每周挑战',
                    description: '加入社区挑战以保持动力并获得奖励'
                },
                groups: {
                    title: '支持小组',
                    description: '与其他有相似健康之旅的人联系'
                },
                share: {
                    title: '分享进度',
                    description: '分享你的成就并激励他人'
                },
                leaderboards: {
                    title: '排行榜',
                    description: '与朋友竞争并攀升排名'
                }
            },
            trust: {
                title: '你的隐私和安全很重要',
                subtitle: '我们认真对待数据保护，采用行业领先的安全措施',
                encryption: {
                    title: '端到端加密',
                    description: '所有数据均使用 AES-256 加密'
                },
                gdpr: {
                    title: '符合 GDPR',
                    description: '完全符合国际数据保护法规'
                },
                no_sell: {
                    title: '我们从不出售你的数据',
                    description: '你的信息保持私密。不进行第三方数据共享'
                },
                auto_delete: {
                    title: '自动删除照片',
                    description: '照片在处理后立即删除'
                },
                hipaa: {
                    title: '符合 HIPAA',
                    description: '符合医疗数据安全标准'
                },
                control: {
                    title: '你掌控一切',
                    description: '随时一键导出或删除你的数据'
                },
                certifications: {
                    text: '认证机构：'
                }
            },
            faq_section: {
                title: '常见问题',
                subtitle: '有问题？我们有答案',
                q1: {
                    question: 'AI 食物识别的准确度如何？',
                    answer: 'Calkilo 的 AI 准确率为 99.2%，基于数百万张食物图像训练。它能识别来自世界各地各种菜系的数千种食物、成分和菜肴。'
                },
                q2: {
                    question: '我的食物照片数据是否私密和安全？',
                    answer: '是的！你的照片经过端到端加密处理，并在分析后自动删除。我们从不分享或出售你的数据，你可以随时删除账户。'
                },
                q3: {
                    question: '使用应用是否需要互联网连接？',
                    answer: '应用可离线进行手动记录。AI 照片分析需要互联网连接以获得最佳准确度，但你可以保存照片并在连接后稍后分析。'
                },
                q4: {
                    question: '我可以随时取消订阅吗？',
                    answer: '当然可以！你可以随时从账户设置中取消订阅。你将继续访问直到计费期结束。'
                },
                q5: {
                    question: '它是否与我的健身追踪器兼容？',
                    answer: '是的！Calkilo 与 Apple Health、Google Fit、Fitbit、Samsung Health、Garmin 等集成，自动同步你的活动数据。'
                },
                q6: {
                    question: '高级功能是否有免费试用？',
                    answer: '是的！我们提供 7 天高级功能免费试用。无需信用卡。你可以随时从免费版升级。'
                },
                more: '还有更多问题？',
                view_all: '查看所有常见问题'
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
            how_it_works: {
                title: 'Как это работает',
                subtitle: 'Отслеживайте питание в три простых шага',
                step1: {
                    title: 'Сделайте фото',
                    description: 'Сделайте четкое фото вашего приема пищи, перекуса или напитка. Наш ИИ работает с любой едой из любой кухни.'
                },
                step2: {
                    title: 'ИИ анализирует',
                    description: 'Наш продвинутый ИИ мгновенно распознает ингредиенты, размеры порций и вычисляет точные данные о питании.'
                },
                step3: {
                    title: 'Отслеживайте прогресс',
                    description: 'Просматривайте детальную информацию о питании, отслеживайте цели и наблюдайте за прогрессом со временем.'
                }
            },
            integrations: {
                title: 'Беспрепятственная интеграция с вашими устройствами',
                subtitle: 'Синхронизируйтесь с вашими любимыми приложениями для здоровья и фитнеса для полной картины здоровья',
                apple_health: {
                    title: 'Apple Health',
                    description: 'Синхронизация калорий, тренировок и показателей здоровья'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: 'Подключение активностей и отслеживание ежедневного движения'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: 'Автоматическое отслеживание активности и упражнений'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: 'Полная синхронизация данных о здоровье'
                },
                garmin: {
                    title: 'Garmin',
                    description: 'Отслеживание тренировок и спортивных активностей'
                },
                strava: {
                    title: 'Strava',
                    description: 'Синхронизация беговых и велосипедных активностей'
                }
            },
            comparison: {
                title: 'Почему выбрать Calkilo?',
                subtitle: 'Посмотрите, как мы сравниваемся с другими приложениями для подсчета калорий',
                table: {
                    feature: 'Функция',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'Распознавание фото ИИ',
                row2: 'Мгновенный подсчет калорий',
                row3: 'Точность 99,2%',
                row4: 'Подход с приоритетом приватности',
                row5: 'Без рекламы (бесплатная версия)',
                row6: 'Интеграция с носимыми устройствами',
                row7: 'Месячная цена'
            },
            meal_planning: {
                title: 'Планирование питания и рецепты на основе ИИ',
                subtitle: 'Получайте персонализированные планы питания, адаптированные под ваши цели, предпочтения и диетические ограничения',
                smart_suggestions: {
                    title: 'Умные предложения блюд',
                    description: 'ИИ рекомендует блюда на основе ваших целей по питанию и пищевых привычек'
                },
                weekly_plans: {
                    title: 'Еженедельные планы питания',
                    description: 'Генерируйте полные еженедельные планы питания со списками покупок'
                },
                dietary: {
                    title: 'Диетические предпочтения',
                    description: 'Поддержка веганской, кето, палео, безглютеновой диет и других'
                },
                recipes: {
                    title: '10,000+ рецептов',
                    description: 'Доступ к тысячам здоровых рецептов с информацией о питании'
                }
            },
            community: {
                title: 'Присоединяйтесь к процветающему сообществу',
                subtitle: 'Общайтесь, делитесь и мотивируйтесь с тысячами пользователей, заботящихся о здоровье',
                challenges: {
                    title: 'Еженедельные вызовы',
                    description: 'Присоединяйтесь к вызовам сообщества, чтобы оставаться мотивированными и зарабатывать награды'
                },
                groups: {
                    title: 'Группы поддержки',
                    description: 'Общайтесь с другими на похожих путях к здоровью'
                },
                share: {
                    title: 'Делитесь прогрессом',
                    description: 'Делитесь своими достижениями и вдохновляйте других'
                },
                leaderboards: {
                    title: 'Таблицы лидеров',
                    description: 'Соревнуйтесь с друзьями и поднимайтесь в рейтинге'
                }
            },
            trust: {
                title: 'Ваша приватность и безопасность важны',
                subtitle: 'Мы серьезно относимся к защите данных с передовыми мерами безопасности',
                encryption: {
                    title: 'Сквозное шифрование',
                    description: 'Все ваши данные зашифрованы с использованием шифрования AES-256'
                },
                gdpr: {
                    title: 'Соответствие GDPR',
                    description: 'Полное соответствие международным нормам защиты данных'
                },
                no_sell: {
                    title: 'Мы никогда не продаем ваши данные',
                    description: 'Ваша информация остается приватной. Без обмена данными с третьими лицами'
                },
                auto_delete: {
                    title: 'Автоматическое удаление фото',
                    description: 'Фото удаляются сразу после обработки'
                },
                hipaa: {
                    title: 'Соответствие HIPAA',
                    description: 'Соответствует стандартам безопасности данных здравоохранения'
                },
                control: {
                    title: 'Вы контролируете',
                    description: 'Экспортируйте или удаляйте свои данные в любое время одним кликом'
                },
                certifications: {
                    text: 'Сертифицировано:'
                }
            },
            faq_section: {
                title: 'Часто задаваемые вопросы',
                subtitle: 'Есть вопросы? У нас есть ответы',
                q1: {
                    question: 'Насколько точна распознавание пищи ИИ?',
                    answer: 'ИИ Calkilo имеет точность 99,2%, обучен на миллионах изображений еды. Он распознает тысячи продуктов, ингредиентов и блюд из различных кухонь по всему миру.'
                },
                q2: {
                    question: 'Приватны ли и безопасны ли данные моих фото еды?',
                    answer: 'Да! Ваши фото обрабатываются со сквозным шифрованием и автоматически удаляются после анализа. Мы никогда не делимся и не продаем ваши данные, и вы можете удалить свой аккаунт в любое время.'
                },
                q3: {
                    question: 'Нужно ли интернет-соединение для использования приложения?',
                    answer: 'Приложение работает офлайн для ручного ввода. Анализ фото ИИ требует интернет-соединения для лучшей точности, но вы можете сохранить фото и проанализировать их позже при подключении.'
                },
                q4: {
                    question: 'Могу ли я отменить подписку в любое время?',
                    answer: 'Абсолютно! Вы можете отменить подписку в любое время из настроек аккаунта. У вас будет доступ до конца расчетного периода.'
                },
                q5: {
                    question: 'Работает ли это с моим фитнес-трекером?',
                    answer: 'Да! Calkilo интегрируется с Apple Health, Google Fit, Fitbit, Samsung Health, Garmin и другими для автоматической синхронизации данных о вашей активности.'
                },
                q6: {
                    question: 'Есть ли бесплатная пробная версия премиум-функций?',
                    answer: 'Да! Мы предлагаем 7-дневную бесплатную пробную версию премиум-функций. Без кредитной карты. Вы можете обновить в любое время из бесплатной версии.'
                },
                more: 'Есть еще вопросы?',
                view_all: 'Посмотреть все FAQ'
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
            how_it_works: {
                title: 'Come funziona',
                subtitle: 'Monitora la tua nutrizione in tre semplici passaggi',
                step1: {
                    title: 'Scatta una foto',
                    description: 'Scatta una foto chiara del tuo pasto, spuntino o bevanda. La nostra AI funziona con qualsiasi cibo di qualsiasi cucina.'
                },
                step2: {
                    title: 'L\'AI analizza',
                    description: 'La nostra AI avanzata riconosce istantaneamente ingredienti, porzioni e calcola dati nutrizionali precisi.'
                },
                step3: {
                    title: 'Monitora i progressi',
                    description: 'Visualizza il dettaglio nutrizionale, monitora i tuoi obiettivi e osserva i tuoi progressi nel tempo.'
                }
            },
            integrations: {
                title: 'Si integra perfettamente con i tuoi dispositivi',
                subtitle: 'Sincronizza con le tue app preferite per salute e fitness per un quadro completo del benessere',
                apple_health: {
                    title: 'Apple Health',
                    description: 'Sincronizza calorie, allenamenti e metriche di salute'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: 'Collega attività e monitora il tuo movimento quotidiano'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: 'Monitoraggio automatico di attività ed esercizi'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: 'Sincronizzazione completa dei dati di salute'
                },
                garmin: {
                    title: 'Garmin',
                    description: 'Monitora allenamenti e attività sportive'
                },
                strava: {
                    title: 'Strava',
                    description: 'Sincronizza attività di corsa e ciclismo'
                }
            },
            comparison: {
                title: 'Perché scegliere Calkilo?',
                subtitle: 'Vedi come ci confrontiamo con altre app per il conteggio delle calorie',
                table: {
                    feature: 'Funzionalità',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'Riconoscimento foto AI',
                row2: 'Calcolo calorie istantaneo',
                row3: 'Precisione 99,2%',
                row4: 'Approccio privacy-first',
                row5: 'Nessuna pubblicità (versione gratuita)',
                row6: 'Integrazione dispositivi indossabili',
                row7: 'Prezzo mensile'
            },
            meal_planning: {
                title: 'Pianificazione pasti e ricette basata su AI',
                subtitle: 'Ottieni piani pasto personalizzati adattati ai tuoi obiettivi, preferenze e restrizioni dietetiche',
                smart_suggestions: {
                    title: 'Suggerimenti pasti intelligenti',
                    description: 'L\'AI raccomanda pasti in base ai tuoi obiettivi nutrizionali e alle tue abitudini alimentari'
                },
                weekly_plans: {
                    title: 'Piani pasto settimanali',
                    description: 'Genera piani pasto settimanali completi con liste della spesa'
                },
                dietary: {
                    title: 'Preferenze dietetiche',
                    description: 'Supporto per vegano, cheto, paleo, senza glutine e altro'
                },
                recipes: {
                    title: '10,000+ ricette',
                    description: 'Accedi a migliaia di ricette sane con informazioni nutrizionali'
                }
            },
            community: {
                title: 'Unisciti a una comunità fiorente',
                subtitle: 'Connettiti, condividi e motivati con migliaia di utenti attenti alla salute',
                challenges: {
                    title: 'Sfide settimanali',
                    description: 'Unisciti alle sfide della comunità per rimanere motivato e guadagnare ricompense'
                },
                groups: {
                    title: 'Gruppi di supporto',
                    description: 'Connettiti con altri in percorsi di salute simili'
                },
                share: {
                    title: 'Condividi i progressi',
                    description: 'Condividi i tuoi risultati e ispira gli altri'
                },
                leaderboards: {
                    title: 'Classifiche',
                    description: 'Competi con gli amici e scala le classifiche'
                }
            },
            trust: {
                title: 'La tua privacy e sicurezza contano',
                subtitle: 'Prendiamo sul serio la protezione dei dati con misure di sicurezza all\'avanguardia',
                encryption: {
                    title: 'Crittografia end-to-end',
                    description: 'Tutti i tuoi dati sono crittografati utilizzando la crittografia AES-256'
                },
                gdpr: {
                    title: 'Conforme GDPR',
                    description: 'Completamente conforme alle normative internazionali sulla protezione dei dati'
                },
                no_sell: {
                    title: 'Non vendiamo mai i tuoi dati',
                    description: 'Le tue informazioni rimangono private. Nessuna condivisione di dati con terze parti'
                },
                auto_delete: {
                    title: 'Eliminazione automatica foto',
                    description: 'Le foto vengono eliminate immediatamente dopo l\'elaborazione'
                },
                hipaa: {
                    title: 'Conforme HIPAA',
                    description: 'Risponde agli standard di sicurezza dei dati sanitari'
                },
                control: {
                    title: 'Hai il controllo',
                    description: 'Esporta o elimina i tuoi dati in qualsiasi momento con un clic'
                },
                certifications: {
                    text: 'Certificato da:'
                }
            },
            faq_section: {
                title: 'Domande frequenti',
                subtitle: 'Hai domande? Abbiamo risposte',
                q1: {
                    question: 'Quanto è accurato il riconoscimento del cibo AI?',
                    answer: 'L\'AI di Calkilo ha una precisione del 99,2%, addestrata su milioni di immagini di cibo. Riconosce migliaia di alimenti, ingredienti e piatti di varie cucine in tutto il mondo.'
                },
                q2: {
                    question: 'I dati delle mie foto di cibo sono privati e sicuri?',
                    answer: 'Sì! Le tue foto sono elaborate con crittografia end-to-end e eliminate automaticamente dopo l\'analisi. Non condividiamo mai né vendiamo i tuoi dati e puoi eliminare il tuo account in qualsiasi momento.'
                },
                q3: {
                    question: 'Ho bisogno di una connessione internet per usare l\'app?',
                    answer: 'L\'app funziona offline per la registrazione manuale. L\'analisi foto AI richiede una connessione internet per la massima precisione, ma puoi salvare le foto e analizzarle successivamente quando sei connesso.'
                },
                q4: {
                    question: 'Posso cancellare il mio abbonamento in qualsiasi momento?',
                    answer: 'Assolutamente! Puoi cancellare il tuo abbonamento in qualsiasi momento dalle impostazioni del tuo account. Continuerai ad avere accesso fino alla fine del periodo di fatturazione.'
                },
                q5: {
                    question: 'Funziona con il mio fitness tracker?',
                    answer: 'Sì! Calkilo si integra con Apple Health, Google Fit, Fitbit, Samsung Health, Garmin e altri per sincronizzare automaticamente i dati della tua attività.'
                },
                q6: {
                    question: 'C\'è una prova gratuita per le funzionalità premium?',
                    answer: 'Sì! Offriamo una prova gratuita di 7 giorni delle funzionalità Premium. Nessuna carta di credito richiesta. Puoi aggiornare in qualsiasi momento dalla versione gratuita.'
                },
                more: 'Hai altre domande?',
                view_all: 'Visualizza tutte le FAQ'
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
            how_it_works: {
                title: 'Comment ça marche',
                subtitle: 'Suivez votre nutrition en trois étapes simples',
                step1: {
                    title: 'Prenez une photo',
                    description: 'Prenez une photo claire de votre repas, collation ou boisson. Notre IA fonctionne avec n\'importe quel aliment de n\'importe quelle cuisine.'
                },
                step2: {
                    title: 'L\'IA analyse',
                    description: 'Notre IA avancée reconnaît instantanément les ingrédients, les tailles de portions et calcule des données nutritionnelles précises.'
                },
                step3: {
                    title: 'Suivez les progrès',
                    description: 'Visualisez le détail nutritionnel, suivez vos objectifs et observez vos progrès dans le temps.'
                }
            },
            integrations: {
                title: 'S\'intègre parfaitement à vos appareils',
                subtitle: 'Synchronisez avec vos applications santé et fitness préférées pour une image complète du bien-être',
                apple_health: {
                    title: 'Apple Health',
                    description: 'Synchroniser calories, entraînements et métriques de santé'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: 'Connecter les activités et suivre votre mouvement quotidien'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: 'Suivi automatique de l\'activité et de l\'exercice'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: 'Synchronisation complète des données de santé'
                },
                garmin: {
                    title: 'Garmin',
                    description: 'Suivre les entraînements et activités sportives'
                },
                strava: {
                    title: 'Strava',
                    description: 'Synchroniser les activités de course et de cyclisme'
                }
            },
            comparison: {
                title: 'Pourquoi choisir Calkilo ?',
                subtitle: 'Découvrez comment nous nous comparons aux autres applications de comptage de calories',
                table: {
                    feature: 'Fonctionnalité',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'Reconnaissance photo IA',
                row2: 'Calcul instantané des calories',
                row3: 'Précision de 99,2 %',
                row4: 'Approche axée sur la confidentialité',
                row5: 'Sans publicité (version gratuite)',
                row6: 'Intégration d\'appareils portables',
                row7: 'Prix mensuel'
            },
            meal_planning: {
                title: 'Planification des repas et recettes alimentées par l\'IA',
                subtitle: 'Obtenez des plans de repas personnalisés adaptés à vos objectifs, préférences et restrictions alimentaires',
                smart_suggestions: {
                    title: 'Suggestions de repas intelligentes',
                    description: 'L\'IA recommande des repas basés sur vos objectifs nutritionnels et vos habitudes alimentaires'
                },
                weekly_plans: {
                    title: 'Plans de repas hebdomadaires',
                    description: 'Générez des plans de repas hebdomadaires complets avec listes de courses'
                },
                dietary: {
                    title: 'Préférences alimentaires',
                    description: 'Support pour végétalien, céto, paléo, sans gluten et plus'
                },
                recipes: {
                    title: '10,000+ recettes',
                    description: 'Accédez à des milliers de recettes saines avec informations nutritionnelles'
                }
            },
            community: {
                title: 'Rejoignez une communauté florissante',
                subtitle: 'Connectez-vous, partagez et motivez-vous avec des milliers d\'utilisateurs soucieux de leur santé',
                challenges: {
                    title: 'Défis hebdomadaires',
                    description: 'Rejoignez les défis communautaires pour rester motivé et gagner des récompenses'
                },
                groups: {
                    title: 'Groupes de soutien',
                    description: 'Connectez-vous avec d\'autres sur des parcours de santé similaires'
                },
                share: {
                    title: 'Partager les progrès',
                    description: 'Partagez vos réalisations et inspirez les autres'
                },
                leaderboards: {
                    title: 'Classements',
                    description: 'Rivalisez avec vos amis et grimpez dans les classements'
                }
            },
            trust: {
                title: 'Votre confidentialité et sécurité comptent',
                subtitle: 'Nous prenons la protection des données au sérieux avec des mesures de sécurité de pointe',
                encryption: {
                    title: 'Chiffrement de bout en bout',
                    description: 'Toutes vos données sont chiffrées à l\'aide du chiffrement AES-256'
                },
                gdpr: {
                    title: 'Conforme au RGPD',
                    description: 'Entièrement conforme aux réglementations internationales sur la protection des données'
                },
                no_sell: {
                    title: 'Nous ne vendons jamais vos données',
                    description: 'Vos informations restent privées. Aucun partage de données avec des tiers'
                },
                auto_delete: {
                    title: 'Suppression automatique des photos',
                    description: 'Les photos sont supprimées immédiatement après traitement'
                },
                hipaa: {
                    title: 'Conforme HIPAA',
                    description: 'Répond aux normes de sécurité des données de santé'
                },
                control: {
                    title: 'Vous avez le contrôle',
                    description: 'Exportez ou supprimez vos données à tout moment en un clic'
                },
                certifications: {
                    text: 'Certifié par :'
                }
            },
            faq_section: {
                title: 'Questions fréquemment posées',
                subtitle: 'Des questions ? Nous avons les réponses',
                q1: {
                    question: 'Quelle est la précision de la reconnaissance alimentaire IA ?',
                    answer: 'L\'IA de Calkilo a une précision de 99,2 %, formée sur des millions d\'images d\'aliments. Elle reconnaît des milliers d\'aliments, d\'ingrédients et de plats de diverses cuisines à travers le monde.'
                },
                q2: {
                    question: 'Mes données de photos alimentaires sont-elles privées et sécurisées ?',
                    answer: 'Oui ! Vos photos sont traitées avec un chiffrement de bout en bout et supprimées automatiquement après analyse. Nous ne partageons ni ne vendons jamais vos données, et vous pouvez supprimer votre compte à tout moment.'
                },
                q3: {
                    question: 'Ai-je besoin d\'une connexion Internet pour utiliser l\'application ?',
                    answer: 'L\'application fonctionne hors ligne pour la saisie manuelle. L\'analyse photo IA nécessite une connexion Internet pour une précision optimale, mais vous pouvez enregistrer les photos et les analyser plus tard lorsque vous êtes connecté.'
                },
                q4: {
                    question: 'Puis-je annuler mon abonnement à tout moment ?',
                    answer: 'Absolument ! Vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte. Vous continuerez à avoir accès jusqu\'à la fin de votre période de facturation.'
                },
                q5: {
                    question: 'Fonctionne-t-il avec mon tracker de fitness ?',
                    answer: 'Oui ! Calkilo s\'intègre avec Apple Health, Google Fit, Fitbit, Samsung Health, Garmin et plus encore pour synchroniser automatiquement vos données d\'activité.'
                },
                q6: {
                    question: 'Y a-t-il un essai gratuit pour les fonctionnalités premium ?',
                    answer: 'Oui ! Nous offrons un essai gratuit de 7 jours des fonctionnalités Premium. Aucune carte de crédit requise. Vous pouvez mettre à niveau à tout moment depuis la version gratuite.'
                },
                more: 'D\'autres questions ?',
                view_all: 'Voir toutes les FAQ'
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
            how_it_works: {
                title: 'Wie es funktioniert',
                subtitle: 'Verfolgen Sie Ihre Ernährung in drei einfachen Schritten',
                step1: {
                    title: 'Foto machen',
                    description: 'Machen Sie ein klares Foto Ihrer Mahlzeit, Ihres Snacks oder Getränks. Unsere KI funktioniert mit jedem Essen aus jeder Küche.'
                },
                step2: {
                    title: 'KI analysiert',
                    description: 'Unsere fortschrittliche KI erkennt sofort Zutaten, Portionsgrößen und berechnet präzise Nährwertdaten.'
                },
                step3: {
                    title: 'Fortschritt verfolgen',
                    description: 'Sehen Sie detaillierte Nährwertaufschlüsselung, verfolgen Sie Ihre Ziele und beobachten Sie Ihren Fortschritt im Laufe der Zeit.'
                }
            },
            integrations: {
                title: 'Nahtlos integriert mit Ihren Geräten',
                subtitle: 'Synchronisieren Sie mit Ihren bevorzugten Gesundheits- und Fitness-Apps für ein vollständiges Wellness-Bild',
                apple_health: {
                    title: 'Apple Health',
                    description: 'Synchronisieren Sie Kalorien, Workouts und Gesundheitsmetriken'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: 'Verbinden Sie Aktivitäten und verfolgen Sie Ihre tägliche Bewegung'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: 'Automatische Aktivitäts- und Trainingsverfolgung'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: 'Vollständige Gesundheitsdatensynchronisation'
                },
                garmin: {
                    title: 'Garmin',
                    description: 'Verfolgen Sie Workouts und Sportaktivitäten'
                },
                strava: {
                    title: 'Strava',
                    description: 'Synchronisieren Sie Lauf- und Radaktivitäten'
                }
            },
            comparison: {
                title: 'Warum Calkilo wählen?',
                subtitle: 'Sehen Sie, wie wir uns mit anderen Kalorienzähl-Apps vergleichen',
                table: {
                    feature: 'Funktion',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'KI-Fotorekognition',
                row2: 'Sofortige Kalorienberechnung',
                row3: '99,2% Genauigkeit',
                row4: 'Datenschutz-First-Ansatz',
                row5: 'Keine Werbung (kostenlose Version)',
                row6: 'Wearable-Integration',
                row7: 'Monatspreis'
            },
            meal_planning: {
                title: 'KI-gestützte Mahlzeitenplanung & Rezepte',
                subtitle: 'Erhalten Sie personalisierte Mahlzeitenpläne, die auf Ihre Ziele, Vorlieben und diätetischen Einschränkungen zugeschnitten sind',
                smart_suggestions: {
                    title: 'Intelligente Mahlzeitenvorschläge',
                    description: 'KI empfiehlt Mahlzeiten basierend auf Ihren Ernährungszielen und Essgewohnheiten'
                },
                weekly_plans: {
                    title: 'Wöchentliche Mahlzeitenpläne',
                    description: 'Generieren Sie vollständige wöchentliche Mahlzeitenpläne mit Einkaufslisten'
                },
                dietary: {
                    title: 'Diätvorlieben',
                    description: 'Unterstützung für vegan, keto, paleo, glutenfrei und mehr'
                },
                recipes: {
                    title: '10,000+ Rezepte',
                    description: 'Zugriff auf Tausende gesunder Rezepte mit Nährwertinformationen'
                }
            },
            community: {
                title: 'Treten Sie einer blühenden Gemeinschaft bei',
                subtitle: 'Verbinden Sie sich, teilen Sie und motivieren Sie sich mit Tausenden gesundheitsbewusster Nutzer',
                challenges: {
                    title: 'Wöchentliche Herausforderungen',
                    description: 'Nehmen Sie an Community-Herausforderungen teil, um motiviert zu bleiben und Belohnungen zu verdienen'
                },
                groups: {
                    title: 'Unterstützungsgruppen',
                    description: 'Verbinden Sie sich mit anderen auf ähnlichen Gesundheitsreisen'
                },
                share: {
                    title: 'Fortschritt teilen',
                    description: 'Teilen Sie Ihre Erfolge und inspirieren Sie andere'
                },
                leaderboards: {
                    title: 'Bestenlisten',
                    description: 'Wettbewerben Sie mit Freunden und steigen Sie in den Rankings auf'
                }
            },
            trust: {
                title: 'Ihre Privatsphäre und Sicherheit sind wichtig',
                subtitle: 'Wir nehmen Datenschutz ernst mit branchenführenden Sicherheitsmaßnahmen',
                encryption: {
                    title: 'Ende-zu-Ende-Verschlüsselung',
                    description: 'Alle Ihre Daten werden mit AES-256-Verschlüsselung verschlüsselt'
                },
                gdpr: {
                    title: 'DSGVO-konform',
                    description: 'Vollständig konform mit internationalen Datenschutzbestimmungen'
                },
                no_sell: {
                    title: 'Wir verkaufen niemals Ihre Daten',
                    description: 'Ihre Informationen bleiben privat. Keine Weitergabe von Daten an Dritte'
                },
                auto_delete: {
                    title: 'Automatisches Löschen von Fotos',
                    description: 'Fotos werden sofort nach der Verarbeitung gelöscht'
                },
                hipaa: {
                    title: 'HIPAA-konform',
                    description: 'Erfüllt Gesundheitsdatensicherheitsstandards'
                },
                control: {
                    title: 'Sie haben die Kontrolle',
                    description: 'Exportieren oder löschen Sie Ihre Daten jederzeit mit einem Klick'
                },
                certifications: {
                    text: 'Zertifiziert von:'
                }
            },
            faq_section: {
                title: 'Häufig gestellte Fragen',
                subtitle: 'Haben Sie Fragen? Wir haben Antworten',
                q1: {
                    question: 'Wie genau ist die KI-Lebensmittelerkennung?',
                    answer: 'Die KI von Calkilo hat eine Genauigkeit von 99,2%, trainiert auf Millionen von Lebensmittelbildern. Sie erkennt Tausende von Lebensmitteln, Zutaten und Gerichten aus verschiedenen Küchen weltweit.'
                },
                q2: {
                    question: 'Sind meine Lebensmittelfotodaten privat und sicher?',
                    answer: 'Ja! Ihre Fotos werden mit Ende-zu-Ende-Verschlüsselung verarbeitet und nach der Analyse automatisch gelöscht. Wir teilen oder verkaufen niemals Ihre Daten, und Sie können Ihr Konto jederzeit löschen.'
                },
                q3: {
                    question: 'Benötige ich eine Internetverbindung, um die App zu verwenden?',
                    answer: 'Die App funktioniert offline für manuelle Eingabe. Die KI-Fotoanalyse erfordert eine Internetverbindung für die beste Genauigkeit, aber Sie können Fotos speichern und sie später analysieren, wenn Sie verbunden sind.'
                },
                q4: {
                    question: 'Kann ich mein Abonnement jederzeit kündigen?',
                    answer: 'Absolut! Sie können Ihr Abonnement jederzeit in Ihren Kontoeinstellungen kündigen. Sie haben weiterhin Zugriff bis zum Ende Ihres Abrechnungszeitraums.'
                },
                q5: {
                    question: 'Funktioniert es mit meinem Fitness-Tracker?',
                    answer: 'Ja! Calkilo integriert sich mit Apple Health, Google Fit, Fitbit, Samsung Health, Garmin und mehr, um Ihre Aktivitätsdaten automatisch zu synchronisieren.'
                },
                q6: {
                    question: 'Gibt es eine kostenlose Testversion für Premium-Funktionen?',
                    answer: 'Ja! Wir bieten eine 7-tägige kostenlose Testversion der Premium-Funktionen an. Keine Kreditkarte erforderlich. Sie können jederzeit von der kostenlosen Version upgraden.'
                },
                more: 'Haben Sie weitere Fragen?',
                view_all: 'Alle FAQs anzeigen'
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
            how_it_works: {
                title: 'كيف يعمل',
                subtitle: 'تتبع تغذيتك في ثلاث خطوات بسيطة',
                step1: {
                    title: 'التقط صورة',
                    description: 'التقط صورة واضحة لوجبتك أو وجبتك الخفيفة أو مشروبك. يعمل ذكاءنا الاصطناعي مع أي طعام من أي مطبخ.'
                },
                step2: {
                    title: 'يحلل الذكاء الاصطناعي',
                    description: 'يُعرّف ذكاءنا المتقدم فورًا المكونات وأحجام الحصص ويحسب بيانات غذائية دقيقة.'
                },
                step3: {
                    title: 'تتبع التقدم',
                    description: 'اطلع على تفاصيل التغذية، تتبع أهدافك وراقب تقدمك مع مرور الوقت.'
                }
            },
            integrations: {
                title: 'يتكامل بسلاسة مع أجهزتك',
                subtitle: 'زامن مع تطبيقات الصحة واللياقة المفضلة لديك للحصول على صورة صحية كاملة',
                apple_health: {
                    title: 'Apple Health',
                    description: 'زامن السعرات والتمارين ومقاييس الصحة'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: 'اربط الأنشطة وتتبع حركتك اليومية'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: 'تتبع تلقائي للنشاط والتمارين'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: 'مزامنة كاملة لبيانات الصحة'
                },
                garmin: {
                    title: 'Garmin',
                    description: 'تتبع التمارين والأنشطة الرياضية'
                },
                strava: {
                    title: 'Strava',
                    description: 'زامن أنشطة الجري وركوب الدراجات'
                }
            },
            comparison: {
                title: 'لماذا كالكيلو؟',
                subtitle: 'شاهد كيف نقارن أنفسنا بتطبيقات تتبع السعرات الأخرى',
                table: {
                    feature: 'الميزة',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'التعرف على الصور بالذكاء الاصطناعي',
                row2: 'حساب فوري للسعرات',
                row3: 'دقة 99.2%',
                row4: 'نهج أولوية الخصوصية',
                row5: 'بدون إعلانات (النسخة المجانية)',
                row6: 'تكامل الأجهزة القابلة للارتداء',
                row7: 'السعر الشهري'
            },
            meal_planning: {
                title: 'تخطيط الوجبات والوصفات المدعوم بالذكاء الاصطناعي',
                subtitle: 'احصل على خطط وجبات مخصصة مصممة لأهدافك وتفضيلاتك والقيود الغذائية',
                smart_suggestions: {
                    title: 'اقتراحات وجبات ذكية',
                    description: 'يوصي الذكاء الاصطناعي بالوجبات بناءً على أهدافك الغذائية وأنماط الأكل'
                },
                weekly_plans: {
                    title: 'خطط وجبات أسبوعية',
                    description: 'أنشئ خطط وجبات أسبوعية كاملة مع قوائم التسوق'
                },
                dietary: {
                    title: 'التفضيلات الغذائية',
                    description: 'دعم للنباتيين والكيتو والباليو وخالٍ من الغلوتين والمزيد'
                },
                recipes: {
                    title: 'أكثر من 10,000 وصفة',
                    description: 'الوصول إلى آلاف الوصفات الصحية مع معلومات غذائية'
                }
            },
            community: {
                title: 'انضم إلى مجتمع مزدهر',
                subtitle: 'تواصل وشارك واحصل على الدافع مع آلاف المستخدمين المهتمين بالصحة',
                challenges: {
                    title: 'تحديات أسبوعية',
                    description: 'انضم إلى تحديات المجتمع للبقاء متحمسًا وكسب المكافآت'
                },
                groups: {
                    title: 'مجموعات الدعم',
                    description: 'تواصل مع آخرين في رحلات صحية مماثلة'
                },
                share: {
                    title: 'شارك التقدم',
                    description: 'شارك إنجازاتك وألهم الآخرين'
                },
                leaderboards: {
                    title: 'لوحات المتصدرين',
                    description: 'تنافس مع الأصدقاء وتسلق الترتيب'
                }
            },
            trust: {
                title: 'خصوصيتك وأمانك مهمان',
                subtitle: 'نأخذ حماية البيانات على محمل الجد مع إجراءات أمنية رائدة في الصناعة',
                encryption: {
                    title: 'تشفير من طرف إلى طرف',
                    description: 'جميع بياناتك مشفرة باستخدام تشفير AES-256'
                },
                gdpr: {
                    title: 'متوافق مع GDPR',
                    description: 'متوافق بالكامل مع لوائح حماية البيانات الدولية'
                },
                no_sell: {
                    title: 'لا نبيع بياناتك أبدًا',
                    description: 'تبقى معلوماتك خاصة. لا توجد مشاركة بيانات مع أطراف ثالثة'
                },
                auto_delete: {
                    title: 'حذف تلقائي للصور',
                    description: 'يتم حذف الصور فورًا بعد المعالجة'
                },
                hipaa: {
                    title: 'متوافق مع HIPAA',
                    description: 'يلبي معايير أمان بيانات الرعاية الصحية'
                },
                control: {
                    title: 'أنت تتحكم',
                    description: 'صدّر أو احذف بياناتك في أي وقت بنقرة واحدة'
                },
                certifications: {
                    text: 'معتمد من:'
                }
            },
            faq_section: {
                title: 'الأسئلة الشائعة',
                subtitle: 'لديك أسئلة؟ لدينا إجابات',
                q1: {
                    question: 'ما مدى دقة التعرف على الطعام بالذكاء الاصطناعي؟',
                    answer: 'ذكاء Calkilo الاصطناعي لديه دقة 99.2%، مدرب على ملايين صور الطعام. يتعرف على آلاف الأطعمة والمكونات والأطباق من مطابخ مختلفة حول العالم.'
                },
                q2: {
                    question: 'هل بيانات صور طعامي خاصة وآمنة؟',
                    answer: 'نعم! يتم معالجة صورك بتشفير من طرف إلى طرف وحذفها تلقائيًا بعد التحليل. لا نشارك أو نبيع بياناتك أبدًا، ويمكنك حذف حسابك في أي وقت.'
                },
                q3: {
                    question: 'هل أحتاج إلى اتصال بالإنترنت لاستخدام التطبيق؟',
                    answer: 'يعمل التطبيق دون اتصال للإدخال اليدوي. يتطلب تحليل صور الذكاء الاصطناعي اتصالاً بالإنترنت للحصول على أفضل دقة، ولكن يمكنك حفظ الصور وتحليلها لاحقًا عند الاتصال.'
                },
                q4: {
                    question: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
                    answer: 'بالتأكيد! يمكنك إلغاء اشتراكك في أي وقت من إعدادات حسابك. ستستمر في الحصول على الوصول حتى نهاية فترة الفوترة الخاصة بك.'
                },
                q5: {
                    question: 'هل يعمل مع متتبع اللياقة البدنية الخاص بي؟',
                    answer: 'نعم! يتكامل Calkilo مع Apple Health وGoogle Fit وFitbit وSamsung Health وGarmin والمزيد لمزامنة بيانات نشاطك تلقائيًا.'
                },
                q6: {
                    question: 'هل هناك نسخة تجريبية مجانية للميزات المميزة؟',
                    answer: 'نعم! نقدم نسخة تجريبية مجانية لمدة 7 أيام من الميزات المميزة. لا حاجة لبطاقة ائتمان. يمكنك الترقية في أي وقت من النسخة المجانية.'
                },
                more: 'هل لديك المزيد من الأسئلة؟',
                view_all: 'عرض جميع الأسئلة الشائعة'
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
            how_it_works: {
                title: 'Cómo funciona',
                subtitle: 'Sigue tu nutrición en tres pasos simples',
                step1: {
                    title: 'Toma una foto',
                    description: 'Toma una foto clara de tu comida, snack o bebida. Nuestra IA funciona con cualquier alimento de cualquier cocina.'
                },
                step2: {
                    title: 'La IA analiza',
                    description: 'Nuestra IA avanzada reconoce instantáneamente ingredientes, tamaños de porción y calcula datos nutricionales precisos.'
                },
                step3: {
                    title: 'Sigue el progreso',
                    description: 'Visualiza el desglose nutricional detallado, sigue tus objetivos y observa tu progreso con el tiempo.'
                }
            },
            integrations: {
                title: 'Se integra perfectamente con tus dispositivos',
                subtitle: 'Sincroniza con tus aplicaciones favoritas de salud y fitness para una imagen completa de bienestar',
                apple_health: {
                    title: 'Apple Health',
                    description: 'Sincroniza calorías, entrenamientos y métricas de salud'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: 'Conecta actividades y rastrea tu movimiento diario'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: 'Seguimiento automático de actividad y ejercicio'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: 'Sincronización completa de datos de salud'
                },
                garmin: {
                    title: 'Garmin',
                    description: 'Rastrea entrenamientos y actividades deportivas'
                },
                strava: {
                    title: 'Strava',
                    description: 'Sincroniza actividades de running y ciclismo'
                }
            },
            comparison: {
                title: '¿Por qué elegir Calkilo?',
                subtitle: 'Mira cómo nos comparamos con otras aplicaciones de seguimiento de calorías',
                table: {
                    feature: 'Función',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'Reconocimiento de fotos con IA',
                row2: 'Cálculo instantáneo de calorías',
                row3: '99.2% de precisión',
                row4: 'Enfoque de privacidad primero',
                row5: 'Sin anuncios (versión gratuita)',
                row6: 'Integración con dispositivos portátiles',
                row7: 'Precio mensual'
            },
            meal_planning: {
                title: 'Planificación de comidas y recetas impulsada por IA',
                subtitle: 'Obtén planes de comidas personalizados adaptados a tus objetivos, preferencias y restricciones dietéticas',
                smart_suggestions: {
                    title: 'Sugerencias inteligentes de comidas',
                    description: 'La IA recomienda comidas basadas en tus objetivos nutricionales y patrones alimentarios'
                },
                weekly_plans: {
                    title: 'Planes de comidas semanales',
                    description: 'Genera planes de comidas semanales completos con listas de compras'
                },
                dietary: {
                    title: 'Preferencias dietéticas',
                    description: 'Soporte para vegano, keto, paleo, sin gluten y más'
                },
                recipes: {
                    title: '10,000+ recetas',
                    description: 'Accede a miles de recetas saludables con información nutricional'
                }
            },
            community: {
                title: 'Únete a una comunidad próspera',
                subtitle: 'Conéctate, comparte y motívate con miles de usuarios conscientes de la salud',
                challenges: {
                    title: 'Desafíos semanales',
                    description: 'Únete a desafíos comunitarios para mantenerte motivado y ganar recompensas'
                },
                groups: {
                    title: 'Grupos de apoyo',
                    description: 'Conéctate con otros en viajes de salud similares'
                },
                share: {
                    title: 'Comparte el progreso',
                    description: 'Comparte tus logros e inspira a otros'
                },
                leaderboards: {
                    title: 'Tablas de clasificación',
                    description: 'Compite con amigos y sube en las clasificaciones'
                }
            },
            trust: {
                title: 'Tu privacidad y seguridad importan',
                subtitle: 'Nos tomamos en serio la protección de datos con medidas de seguridad líderes en la industria',
                encryption: {
                    title: 'Cifrado de extremo a extremo',
                    description: 'Todos tus datos están cifrados usando cifrado AES-256'
                },
                gdpr: {
                    title: 'Cumple con GDPR',
                    description: 'Totalmente conforme con las regulaciones internacionales de protección de datos'
                },
                no_sell: {
                    title: 'Nunca vendemos tus datos',
                    description: 'Tu información permanece privada. Sin compartir datos con terceros'
                },
                auto_delete: {
                    title: 'Eliminación automática de fotos',
                    description: 'Las fotos se eliminan inmediatamente después del procesamiento'
                },
                hipaa: {
                    title: 'Cumple con HIPAA',
                    description: 'Cumple con los estándares de seguridad de datos de atención médica'
                },
                control: {
                    title: 'Tú tienes el control',
                    description: 'Exporta o elimina tus datos en cualquier momento con un clic'
                },
                certifications: {
                    text: 'Certificado por:'
                }
            },
            faq_section: {
                title: 'Preguntas frecuentes',
                subtitle: '¿Tienes preguntas? Tenemos respuestas',
                q1: {
                    question: '¿Qué tan precisa es el reconocimiento de alimentos con IA?',
                    answer: 'La IA de Calkilo tiene una precisión del 99.2%, entrenada en millones de imágenes de alimentos. Reconoce miles de alimentos, ingredientes y platos de varias cocinas en todo el mundo.'
                },
                q2: {
                    question: '¿Son privados y seguros mis datos de fotos de alimentos?',
                    answer: '¡Sí! Tus fotos se procesan con cifrado de extremo a extremo y se eliminan automáticamente después del análisis. Nunca compartimos ni vendemos tus datos, y puedes eliminar tu cuenta en cualquier momento.'
                },
                q3: {
                    question: '¿Necesito conexión a Internet para usar la aplicación?',
                    answer: 'La aplicación funciona sin conexión para registro manual. El análisis de fotos con IA requiere conexión a Internet para la mejor precisión, pero puedes guardar fotos y analizarlas más tarde cuando estés conectado.'
                },
                q4: {
                    question: '¿Puedo cancelar mi suscripción en cualquier momento?',
                    answer: '¡Absolutamente! Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. Continuarás teniendo acceso hasta el final de tu período de facturación.'
                },
                q5: {
                    question: '¿Funciona con mi rastreador de fitness?',
                    answer: '¡Sí! Calkilo se integra con Apple Health, Google Fit, Fitbit, Samsung Health, Garmin y más para sincronizar automáticamente tus datos de actividad.'
                },
                q6: {
                    question: '¿Hay una prueba gratuita para las funciones premium?',
                    answer: '¡Sí! Ofrecemos una prueba gratuita de 7 días de las funciones Premium. No se requiere tarjeta de crédito. Puedes actualizar en cualquier momento desde la versión gratuita.'
                },
                more: '¿Tienes más preguntas?',
                view_all: 'Ver todas las preguntas frecuentes'
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
        },
        nl: {
            nav: {
                features: 'Functies',
                screenshots: 'Screenshots',
                reviews: 'Beoordelingen',
                faq: 'FAQ',
                contact: 'Contact',
                download: 'Downloaden'
            },
            hero: {
                title1: 'Bereken calorieën met',
                title2: 'AI-precisie',
                description: 'Maak gewoon een foto van je eten en de geavanceerde AI van Calkilo berekent direct nauwkeurige calorieën en voedingsinformatie. Geen giswerk of handmatige invoer meer.',
                download_ios: 'Downloaden voor iOS',
                download_android: 'Downloaden voor Android',
                stats: {
                    users: 'Gebruikers',
                    accuracy: 'Nauwkeurigheid',
                    photos: 'Foto\'s geanalyseerd'
                }
            },
            features: {
                title: 'Waarom Calkilo kiezen?',
                subtitle: 'Revolutionaire AI-technologie die calorieën tellen moeiteloos en nauwkeurig maakt',
                photo_analysis: {
                    title: 'Directe fotoanalyse',
                    description: 'Maak gewoon een foto van je maaltijd en krijg direct een nauwkeurige calorieberekening dankzij geavanceerde computer vision AI.'
                },
                ai_tech: {
                    title: 'Geavanceerde AI-technologie',
                    description: 'Ons eigen model herkent duizenden voedingsmiddelen met 99,2% nauwkeurigheid en leert van miljoenen voedselafbeeldingen.'
                },
                nutrition: {
                    title: 'Gedetailleerde voedingswaarde-tracking',
                    description: 'Volg niet alleen calorieën, maar ook macronutriënten, vitaminen en mineralen voor een compleet beeld van je voeding.'
                },
                goals: {
                    title: 'Gepersonaliseerde doelen',
                    description: 'Stel en volg gepersonaliseerde gezondheidsdoelen met AI-aanbevelingen afgestemd op je levensstijl en voorkeuren.'
                },
                history: {
                    title: 'Slimme geschiedenis',
                    description: 'Bekijk je eetpatronen, volg voortgang in de tijd en krijg inzichten om betere voedselkeuzes te maken.'
                },
                privacy: {
                    title: 'Privacy eerst',
                    description: 'Je foto\'s en gegevens worden veilig verwerkt met end-to-end encryptie. Je privacy is onze prioriteit.'
                }
            },
            screenshots: {
                title: 'Zie Calkilo in actie',
                subtitle: 'Mooie, intuïtieve interface ontworpen voor moeiteloos calorieën tellen',
                capture: {
                    title: 'Eenvoudige fotocapture',
                    description: 'Richten, schieten en laat AI de rest doen'
                },
                results: {
                    title: 'Directe resultaten',
                    description: 'Krijg gedetailleerde voedingsinformatie in seconden'
                },
                progress: {
                    title: 'Voortgangsvolging',
                    description: 'Monitor je dagelijkse voedingsdoelen'
                }
            },
            testimonials: {
                title: 'Wat onze gebruikers zeggen',
                subtitle: 'Sluit je aan bij duizenden tevreden gebruikers die hun voedingsvolging hebben getransformeerd',
                sarah: {
                    text: '"Calkilo heeft volledig veranderd hoe ik mijn eten volg. De AI is ongelooflijk nauwkeurig en bespaart me zoveel tijd. Ik ben 7 kg afgevallen in 3 maanden!"',
                    name: 'Sarah Johnson',
                    role: 'Fitnessliefhebber'
                },
                mike: {
                    text: '"Als drukke professional had ik nooit tijd om handmatig calorieën te loggen. De AI van Calkilo maakt het moeiteloos - gewoon richten en schieten!"',
                    name: 'Mike Chen',
                    role: 'Software-ingenieur'
                },
                emily: {
                    text: '"De nauwkeurigheid is verbluffend! Het herkent zelfs complexe gerechten en geeft me gedetailleerde macro-opdelingen. Dit is de toekomst van voedingsvolging."',
                    name: 'Emily Rodriguez',
                    role: 'Diëtist'
                }
            },
            download: {
                title: 'Klaar om je voeding te transformeren?',
                subtitle: 'Download Calkilo vandaag en ervaar de toekomst van calorieën tellen',
                app_store: {
                    label: 'Downloaden in de',
                    platform: 'App Store'
                },
                google_play: {
                    label: 'Beschikbaar in',
                    platform: 'Google Play'
                },
                features: {
                    free: 'Gratis te downloaden',
                    no_subscription: 'Geen abonnement vereist',
                    offline: 'Werkt offline'
                }
            },
            how_it_works: {
                title: 'Hoe het werkt',
                subtitle: 'Volg je voeding in drie eenvoudige stappen',
                step1: {
                    title: 'Maak een foto',
                    description: 'Maak een duidelijke foto van je maaltijd, snack of drank. Onze AI werkt met elk voedsel uit elke keuken.'
                },
                step2: {
                    title: 'AI analyseert',
                    description: 'Onze geavanceerde AI herkent direct ingrediënten, portiegroottes en berekent nauwkeurige voedingsgegevens.'
                },
                step3: {
                    title: 'Volg voortgang',
                    description: 'Bekijk gedetailleerde voedingsopdeling, volg je doelen en bekijk je voortgang in de loop van de tijd.'
                }
            },
            integrations: {
                title: 'Naadloos geïntegreerd met je apparaten',
                subtitle: 'Synchroniseer met je favoriete gezondheids- en fitnessapps voor een compleet wellnessbeeld',
                apple_health: {
                    title: 'Apple Health',
                    description: 'Synchroniseer calorieën, workouts en gezondheidsmetrieken'
                },
                google_fit: {
                    title: 'Google Fit',
                    description: 'Verbind activiteiten en volg je dagelijkse beweging'
                },
                fitbit: {
                    title: 'Fitbit',
                    description: 'Automatische activiteit- en oefeningsvolging'
                },
                samsung: {
                    title: 'Samsung Health',
                    description: 'Volledige gezondheidsgegevensynchronisatie'
                },
                garmin: {
                    title: 'Garmin',
                    description: 'Volg workouts en sportactiviteiten'
                },
                strava: {
                    title: 'Strava',
                    description: 'Synchroniseer hardloop- en fietsactiviteiten'
                }
            },
            pricing: {
                title: 'Kies je plan',
                subtitle: 'Begin gratis en upgrade wanneer je maar wilt om premiumfuncties te ontgrendelen',
                free: {
                    title: 'Gratis',
                    period: '/maand',
                    feature1: 'AI-fotoanalyse (5 per dag)',
                    feature2: 'Basis calorievolging',
                    feature3: 'Macrovolging (Eiwit, Koolhydraten, Vetten)',
                    feature4: '7-daagse geschiedenis',
                    feature5: 'Handmatige voedselinvoer',
                    feature6: 'Onbeperkte AI-scans',
                    feature7: 'Geavanceerde voedingsinzichten',
                    feature8: 'Maaltijdplanning',
                    button: 'Aan de slag'
                },
                premium: {
                    title: 'Premium',
                    period: '/maand',
                    note: 'of €79,99/jaar (bespaar 33%)',
                    badge: 'Meest populair',
                    feature1: 'Onbeperkte AI-fotoanalyse',
                    feature2: 'Geavanceerde calorie- en voedingsvolging',
                    feature3: 'Gedetailleerde micronutriëntvolging',
                    feature4: 'Onbeperkte geschiedenis en inzichten',
                    feature5: 'AI-maaltijdplanning en recepten',
                    feature6: 'Draagbare apparaatintegratie',
                    feature7: 'Prioriteitsondersteuning',
                    feature8: 'Ad-vrije ervaring',
                    button: 'Start gratis proefperiode'
                },
                lifetime: {
                    title: 'Levenslang',
                    period: 'eenmalig',
                    feature1: 'Alle premiumfuncties',
                    feature2: 'Levenslange toegang',
                    feature3: 'Alle toekomstige updates',
                    feature4: 'Prioriteitsondersteuning voor altijd',
                    feature5: 'Vroege toegang tot nieuwe functies',
                    feature6: 'VIP-gemeenschapstoegang',
                    feature7: 'Geen terugkerende kosten',
                    feature8: 'Beste waarde',
                    button: 'Koop levenslang'
                }
            },
            comparison: {
                title: 'Waarom Calkilo kiezen?',
                subtitle: 'Zie hoe we ons verhouden tot andere calorievolging-apps',
                table: {
                    feature: 'Functie',
                    competitor1: 'MyFitnessPal',
                    competitor2: 'Lose It!',
                    competitor3: 'Noom'
                },
                row1: 'AI-fotorecognitie',
                row2: 'Directe calorieberekening',
                row3: '99,2% nauwkeurigheid',
                row4: 'Privacy-eerst benadering',
                row5: 'Geen advertenties (gratis versie)',
                row6: 'Draagbare integratie',
                row7: 'Maandprijs'
            },
            meal_planning: {
                title: 'AI-gestuurde maaltijdplanning & recepten',
                subtitle: 'Krijg gepersonaliseerde maaltijdplannen afgestemd op je doelen, voorkeuren en dieetbeperkingen',
                smart_suggestions: {
                    title: 'Slimme maaltijdsuggesties',
                    description: 'AI beveelt maaltijden aan op basis van je voedingsdoelen en eetpatronen'
                },
                weekly_plans: {
                    title: 'Wekelijkse maaltijdplannen',
                    description: 'Genereer complete wekelijkse maaltijdplannen met boodschappenlijsten'
                },
                dietary: {
                    title: 'Dieetvoorkeuren',
                    description: 'Ondersteuning voor veganistisch, keto, paleo, glutenvrij en meer'
                },
                recipes: {
                    title: '10,000+ recepten',
                    description: 'Toegang tot duizenden gezonde recepten met voedingsinformatie'
                }
            },
            community: {
                title: 'Word lid van een bloeiende gemeenschap',
                subtitle: 'Maak contact, deel en motiveer jezelf met duizenden gezondheidsbewuste gebruikers',
                challenges: {
                    title: 'Wekelijkse uitdagingen',
                    description: 'Doe mee aan gemeenschapsuitdagingen om gemotiveerd te blijven en beloningen te verdienen'
                },
                groups: {
                    title: 'Ondersteuningsgroepen',
                    description: 'Maak contact met anderen op vergelijkbare gezondheidsreizen'
                },
                share: {
                    title: 'Deel voortgang',
                    description: 'Deel je prestaties en inspireer anderen'
                },
                leaderboards: {
                    title: 'Ranglijsten',
                    description: 'Competeer met vrienden en klim in de rankings'
                }
            },
            trust: {
                title: 'Je privacy en veiligheid zijn belangrijk',
                subtitle: 'We nemen gegevensbescherming serieus met toonaangevende beveiligingsmaatregelen',
                encryption: {
                    title: 'End-to-end encryptie',
                    description: 'Al je gegevens zijn versleuteld met AES-256 encryptie'
                },
                gdpr: {
                    title: 'GDPR-conform',
                    description: 'Volledig conform internationale gegevensbeschermingsvoorschriften'
                },
                no_sell: {
                    title: 'We verkopen je gegevens nooit',
                    description: 'Je informatie blijft privé. Geen gegevensdeling met derden'
                },
                auto_delete: {
                    title: 'Automatisch verwijderen van foto\'s',
                    description: 'Foto\'s worden direct na verwerking verwijderd'
                },
                hipaa: {
                    title: 'HIPAA-conform',
                    description: 'Voldoet aan gezondheidsgegevensbeveiligingsstandaarden'
                },
                control: {
                    title: 'Jij hebt de controle',
                    description: 'Exporteer of verwijder je gegevens op elk moment met één klik'
                },
                certifications: {
                    text: 'Gecertificeerd door:'
                }
            },
            faq_section: {
                title: 'Veelgestelde vragen',
                subtitle: 'Vragen? We hebben antwoorden',
                q1: {
                    question: 'Hoe nauwkeurig is de AI-voedselherkenning?',
                    answer: 'De AI van Calkilo heeft een nauwkeurigheid van 99,2%, getraind op miljoenen voedselafbeeldingen. Het herkent duizenden voedingsmiddelen, ingrediënten en gerechten uit verschillende keukens over de hele wereld.'
                },
                q2: {
                    question: 'Zijn mijn voedselfotogegevens privé en veilig?',
                    answer: 'Ja! Je foto\'s worden verwerkt met end-to-end encryptie en automatisch verwijderd na analyse. We delen of verkopen je gegevens nooit, en je kunt je account op elk moment verwijderen.'
                },
                q3: {
                    question: 'Heb ik een internetverbinding nodig om de app te gebruiken?',
                    answer: 'De app werkt offline voor handmatige invoer. AI-fotoanalyse vereist een internetverbinding voor de beste nauwkeurigheid, maar je kunt foto\'s opslaan en ze later analyseren wanneer je verbonden bent.'
                },
                q4: {
                    question: 'Kan ik mijn abonnement op elk moment opzeggen?',
                    answer: 'Absoluut! Je kunt je abonnement op elk moment opzeggen vanuit je accountinstellingen. Je blijft toegang hebben tot het einde van je factureringsperiode.'
                },
                q5: {
                    question: 'Werkt het met mijn fitness tracker?',
                    answer: 'Ja! Calkilo integreert met Apple Health, Google Fit, Fitbit, Samsung Health, Garmin en meer om je activiteitsgegevens automatisch te synchroniseren.'
                },
                q6: {
                    question: 'Is er een gratis proefperiode voor premiumfuncties?',
                    answer: 'Ja! We bieden een 7-daagse gratis proefperiode van Premium-functies. Geen creditcard vereist. Je kunt op elk moment upgraden vanuit de gratis versie.'
                },
                more: 'Meer vragen?',
                view_all: 'Bekijk alle veelgestelde vragen'
            },
            footer: {
                description: 'We revolutioneren voedingsvolging met AI-gestuurde calorieberekening',
                product: {
                    title: 'Product',
                    features: 'Functies',
                    screenshots: 'Screenshots',
                    download: 'Downloaden',
                    pricing: 'Prijzen'
                },
                support: {
                    title: 'Ondersteuning',
                    faq: 'FAQ',
                    contact: 'Neem contact op',
                    privacy: 'Privacybeleid',
                    terms: 'Servicevoorwaarden'
                },
                company: {
                    title: 'Bedrijf',
                    about: 'Over ons',
                    blog: 'Blog',
                    careers: 'Carrières',
                    press: 'Pers'
                },
                copyright: 'Alle rechten voorbehouden.'
            }
        }
    };

    function getLanguageFromURL() {
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(segment => segment);
        
        // Check if first segment is a language code
        if (pathSegments.length > 0) {
            const langCode = pathSegments[0].toLowerCase();
            if (supportedLanguages.includes(langCode)) {
                return langCode;
            }
        }
        return null;
    }

    function updateURL(lang, replace = false) {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment);
        
        // Remove existing language code if present
        if (pathSegments.length > 0 && supportedLanguages.includes(pathSegments[0].toLowerCase())) {
            pathSegments.shift();
        }
        
        // Build new path with language code (always include language code for consistency)
        const newPath = '/' + lang + (pathSegments.length > 0 ? '/' + pathSegments.join('/') : '');
        
        const newURL = newPath + window.location.search + window.location.hash;
        
        if (replace) {
            window.history.replaceState({ lang }, '', newURL);
        } else {
            window.history.pushState({ lang }, '', newURL);
        }
    }

    function detectInitialLanguage() {
        // 1. Check URL first (highest priority)
        const urlLang = getLanguageFromURL();
        if (urlLang) return urlLang;
        
        // 2. Check localStorage
        const saved = localStorage.getItem('lang');
        if (saved && supportedLanguages.includes(saved)) {
            // Update URL to match saved language if not already set
            updateURL(saved, true);
            return saved;
        }
        
        // 3. Check browser language
        const browser = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
        const detectedLang = supportedLanguages.includes(browser) ? browser : 'en';
        
        // Update URL to match detected language
        updateURL(detectedLang, true);
        return detectedLang;
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

    function changeLanguage(lang, updateHistory = true) {
        if (!supportedLanguages.includes(lang)) lang = 'en';
        localStorage.setItem('lang', lang);
        setHtmlDirection(lang);
        applyTranslations(lang);
        if (dropdown) dropdown.classList.remove('active');
        if (toggleBtn) toggleBtn.classList.remove('active');
        
        // Update URL when language changes
        if (updateHistory) {
            updateURL(lang, false);
        }
        
        // notify listeners (e.g., hero typewriter) to re-run after translation
        document.dispatchEvent(new CustomEvent('calkilo:languageChanged', { detail: { lang } }));
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        const urlLang = getLanguageFromURL();
        if (urlLang) {
            changeLanguage(urlLang, false);
        } else {
            const saved = localStorage.getItem('lang');
            const lang = saved && supportedLanguages.includes(saved) ? saved : 'en';
            changeLanguage(lang, false);
        }
    });

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


