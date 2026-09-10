# اندازه‌گیری و تنظیمات میزبان

## قرارداد رویدادها

تمام لینک‌های فروشگاه در صفحات، از یک listener مشترک در `_app.tsx` و تطبیق URL در `lib/analytics.ts` عبور می‌کنند. handlerهای تکراری LandingPage و ResourcePage حذف شده‌اند. لینک واقعی است؛ `preventDefault`، انتظار analytics، callback دانلود یا ارسال فرم وجود ندارد. صف gtag از شروع hydration آماده است، حتی اگر اسکریپت شبکه مسدود باشد. اولین کلیک بعد از hydration و قبل از بارگیری analytics قابل صف‌شدن است؛ پیش از JavaScript، لینک کار می‌کند ولی ثبت analytics تضمین ندارد.

| نام | زمان | پارامتر افزوده |
|---|---|---|
| `store_click` | هر کلیک روی URL دقیق فروشگاه | `store`: `cafe_bazaar`, `myket`, `app_store`, `google_play` |
| `download_cta_click` | لینک داخلی مقصد دانلود، بیرون بخش قیمت | — |
| `pricing_click` | لینک مقصد بخش اشتراک | — |
| `pricing_plan_click` | CTA دریافت اپ در بخش اشتراک | طرح انتخاب یا خرید نشده؛ بدون پارامتر طرح ساختگی |
| `sample_view` | حداقل ۵۰٪ نمونه در viewport، یک بار در هر بازدید مسیر | — |
| `sample_interaction` | لینک دیدن نمونه یا باز/بسته‌کردن توضیح مرور | `action` فقط برای کنترل: `open_review` / `close_review` |
| `page_view` | تغییر pathname | query و hash در page_location دستی نیستند |

پارامترهای مشترک تعامل‌ها: `language`, `landing_page` (pathname صفحه فعلی), `page_type`, `cta_location`. محل‌ها: `header`, `hero`, `pricing`, `sample`, `download`, `content`, `footer`. `variant` فقط در آزمایش واقعی اضافه شود؛ اکنون آزمایشی راه نیفتاده است. مقدار `landing_page` مطابق قرارداد قبلی مسیر صفحه رخداد است، نه ادعای اتصال به نصب.

نام، ایمیل، متن فرم، عکس، وزن یا مقادیر غذایی ارسال نمی‌شوند. رویداد نمونه فقط نوع تعامل را می‌فرستد. listener با تغییر صفحه پاک و یک بار نصب می‌شود؛ hash به‌تنهایی page_view یا sample_view جدید نمی‌سازد. در GA4، تنظیمات Enhanced Measurement برای page_view history را پیش از انتشار کنترل کنید تا با page_view دستی تکراری نشود؛ تنظیم خصوصی GA در این اجرا بررسی/تغییر نشده است. تغییر نام‌های قبلی فروشگاه (مثل Cafe Bazaar) به مقادیر ثابت جدید باید در گزارش‌های GA لحاظ شود.

آزمون محلی فقط وجود یک رویداد در صف، پارامترها و بازشدن پنجره مقصد را تأیید می‌کند. analytics در آزمون‌ها عمداً مسدود است؛ **رسیدن رویداد به GA و داشبورد تأیید نشده است**. تنظیمات GA خارج از مخزن باید DebugView و گزارش‌های دریافت را بررسی کنند. اگر رهگیری/بلوک‌کننده غیرفعال یا مسدود باشد، دانلود مستقل کار می‌کند.

## KPI و پایش

KPI وب = نشست‌های دارای حداقل یک کلیک فروشگاه / نشست‌های واجد شرایط همان صفحه، کانال و دستگاه. چند کلیک یک نشست در صورت کسر یک بار شمرده شوند. این شاخص، نرخ نصب/فعال‌سازی/خرید نیست؛ اتصال قابل اعتماد وب به اپ **نامعلوم** است. consent، ad-blocking و از دست‌رفتن رخداد پیش از hydration پوشش اندازه‌گیری را محدود می‌کنند.

پس از انتشار مجاز، ۲۸ روز قبل و بعد با query×page، کشور، دستگاه و کانال مقایسه شود. صفحه عکس (۷۷۷ کلیک و ۶۴٫۳٪ سهم جدول تاریخی ژوئیه) جدا پایش شود. اعداد تاریخی امروزسازی نشوند. داده query×page کنونی در دسترس نبود؛ هیچ ادغام/redirect جدیدی انجام نشد. با ترافیک کم یک آزمایش در هر نوبت، همراه تعداد واقعی و عدم قطعیت.

## میزبان — آماده اجرا در مأموریت جدا، انجام نشده

شاهد فعلی `evidence/http.json`: HTTP دامنه اصلی ۲۰۰ است، HTTPS اصلی ۲۰۰، www خطای تطبیق گواهی curl 60 دارد. GitHub Actions این پروژه Pages را مستقر می‌کند و دامنه اصلی پشت Cloudflare پاسخ می‌دهد. `_redirects` و `_headers` به‌تنهایی در GitHub Pages اعمال نمی‌شوند. هیچ DNS/CDN/تولید تغییر نکرده است.

ترتیب پیشنهادی برای مدیر Cloudflare/GitHub:

1. رکورد و وضعیت پروکسی `www`، custom domain در Pages و وضعیت Edge Certificate را بررسی کند. اگر Cloudflare مالک TLS است، پوشش `www.calkilo.com` در گواهی فعال و رکورد proxied لازم است؛ در حالت DNS-only گواهی origin/Pages باید همان hostname را پوشش دهد. تست `curl -I https://www.calkilo.com/fa/` باید بدون `-k` از TLS عبور کند.
2. **پس از HTTPS معتبر www**، یک Cloudflare Single Redirect با شرط `(http.host in {"calkilo.com" "www.calkilo.com"}) and (http.request.scheme eq "http" or http.host eq "www.calkilo.com")` و مقصد پویا `concat("https://calkilo.com", http.request.uri.path)`، status 301 و Preserve query string فعال ایجاد کند. این ترکیب HTTP/www را در یک hop به apex HTTPS می‌برد.
3. چهار ترکیب scheme/host و مسیر عمیق `/fa/photo-calorie-calculator/?utm_source=qa` را بدون عبور از اعتبارسنجی TLS بررسی کند: مقصد canonical درست، مسیر و query محفوظ، بدون loop و فقط یک redirect. HTTPS اصلی باید مستقیم ۲۰۰ بماند.
4. پیش از هر HSTS طولانی یا includeSubDomains، تمام زیر‌دامنه‌های واقعی و مسیر بازگشت بررسی شوند. این تحویل HSTS preload یا تغییر امنیتی کور انجام نداده است.

## منابع معیارها؛ بازبینی ۲۰۲۶-۰۹-۱۱

- [تغییرات رسمی گوگل](https://developers.google.com/search/updates): توقف نمایش FAQ rich result از ۷ مه ۲۰۲۶ و حذف مستندات در ۱۵ ژوئن؛ FAQ نمایشی حفظ شد، FAQPage برنگشت. llms.txt تضمین رتبه/حضور AI نیست.
- [نسخه‌های زبانی](https://developers.google.com/search/docs/specialty/international/localized-versions): روابط واقعی حفظ شده و audit خروجی آن‌ها را کنترل می‌کند.
- [Web Vitals](https://web.dev/articles/vitals): هدف field در صدک ۷۵ LCP≤2.5s، INP≤200ms، CLS≤0.1؛ نتیجه محلی جای field نیست.
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/): کنتراست متن معمولی ۴٫۵:۱؛ هدف لمس این پروژه ۴۴×۴۴ برای کنترل‌هاست. آزمون axe به معنی تأیید جامع WCAG نیست.
