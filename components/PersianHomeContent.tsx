import Link from 'next/link'
import { PREFERENCE_UPDATE_ANSWERS } from '../lib/product-facts'
import { APP_STORE_URL, CAFE_BAZAAR_URL, MYKET_URL } from '../lib/app-links'
import PersianSample from './PersianSample'

export function PersianStoreLinks({ location }: { location: string }) {
  return <div className="fa-stores" data-cta-location={location}>
    <a className="lp-btn lp-btn--solid" href={CAFE_BAZAAR_URL} target="_blank" rel="noreferrer">دریافت از بازار <span aria-hidden="true">↗</span></a>
    <a className="lp-btn fa-secondary" href={MYKET_URL} target="_blank" rel="noreferrer">دریافت از مایکت</a>
    <a className="fa-iphone" href={APP_STORE_URL} target="_blank" rel="noreferrer">نسخه iPhone در App Store <span aria-hidden="true">↗</span></a>
  </div>
}
const faqs = [
  ['آیا می‌توانم هدف‌های تغذیه را تغییر بدهم؟', PREFERENCE_UPDATE_ANSWERS.fa],
  ['تخمین کالری از عکس چقدر دقیق است؟', 'نتیجه تخمینی است. اندازه وعده، روغن، سس و مواد پنهان ممکن است از عکس مشخص نباشند. مقدارها را بررسی و در صورت نیاز اصلاح کنید؛ نتیجه جایگزین توصیه پزشک یا متخصص تغذیه نیست.'],
  ['آیا برای تحلیل عکس به اینترنت نیاز دارم؟', 'بله. عکس برای تحلیل به سرویس کالکیلو فرستاده می‌شود؛ برای دریافت نتیجه به اینترنت نیاز دارید. تحلیل عکس داخل اپ انجام می‌شود.'],
  ['دانلود رایگان است؟ چند اسکن می‌توانم انجام بدهم؟', 'دانلود رایگان است و اپ خرید درون‌برنامه‌ای دارد. تعداد اسکن‌های در دسترس و نیاز به اعتبار یا اشتراک را پیش از تحلیل در اپ بررسی کنید. دانلود رایگان به معنی اسکن نامحدود نیست.'],
  ['اشتراک را از کجا بخرم؟', 'پس از دانلود، بخش اشتراک اپ را باز کنید. مبلغ نهایی، مدت دسترسی و شرایط خرید را همان‌جا پیش از پرداخت بخوانید. این سایت پرداخت یا انتخاب اشتراک انجام نمی‌دهد.'],
  ['اگر خریدم در اپ نمایش داده نشد چه کنم؟', 'ابتدا بررسی کنید با همان حساب زمان خرید وارد شده‌اید. برای پیگیری، نام فروشگاه و تاریخ خرید را به support@calkilo.com بفرستید. رمز عبور یا اطلاعات کامل کارت را ارسال نکنید.'],
  ['عکس‌ها و اطلاعاتم چگونه استفاده می‌شوند؟', 'عکس برای تحلیل غذا به سرویس کالکیلو ارسال می‌شود. جزئیات استفاده از داده‌ها و درخواست حذف را در سیاست حریم خصوصی و صفحه حذف حساب بخوانید.'],
]
export default function PersianHomeContent({ titleA, titleB }: { titleA: string; titleB: string }) {
  return <main id="home" className="fa-home">
    <section className="fa-hero lp-container" data-cta-location="hero">
      <div className="fa-hero-copy">
        <p className="fa-eyebrow">کالکیلو؛ همراه ثبت غذای روزانه</p>
        <h1>{titleA} <span>{titleB}</span></h1>
        <p className="fa-lead">از غذایت عکس بگیر؛ تخمین کالری و پروتئین، کربوهیدرات و چربی را ببین، مقدارها را بررسی کن و وعده را ثبت کن.</p>
        <PersianStoreLinks location="hero" />
        <p className="fa-download-note">دانلود رایگان؛ دارای خرید درون‌برنامه‌ای</p>
        <a className="fa-text-link" href="#sample">نمونه تحلیل را ببین <span aria-hidden="true">↓</span></a>
      </div>
      <PersianSample />
    </section>
    <section id="features" className="fa-section lp-container">
      <p className="fa-eyebrow">از اولین عکس تا ثبت وعده</p><h2>سه گام برای شناخت بهتر غذایت</h2>
      <ol className="fa-steps">
        <li><span>۰۱</span><h3>عکس بگیر</h3><p>در اپ، از تمام وعده و کنارغذاها یک عکس واضح بگیر.</p></li>
        <li><span>۰۲</span><h3>بررسی و اصلاح کن</h3><p>مقدار غذا، روغن و سس را مرور کن؛ عکس همیشه همه مواد را نشان نمی‌دهد.</p></li>
        <li><span>۰۳</span><h3>ثبت کن</h3><p>وعده را در سابقه روزانه نگه دار و کالری و درشت‌مغذی‌ها را کنار هم ببین.</p></li>
      </ol>
    </section>
    <section className="fa-section fa-daily"><div className="lp-container fa-two-column">
      <div><p className="fa-eyebrow">غذای آشنا، مقدار مشخص</p><h2>یک اسم غذا،<br />چند نتیجه متفاوت</h2><p>وزن و روش آماده‌سازی مهم‌اند. برای غذای خانگی یا رستورانی، ترکیب واقعی بشقابت را بررسی کن.</p></div>
      <div className="fa-food-examples">
        <Link href="/fa/calories/rice/"><h3>برنج پخته</h3><p>نمونه مرجع: برنج سفید دانه‌بلند، یک پیمانه ۱۵۸ گرمی. روغن و خورشت جدا حساب می‌شوند.</p><span>وزن و ارزش غذایی ←</span></Link>
        <Link href="/fa/calories/falafel/"><h3>فلافل</h3><p>نمونه مرجع: فلافل خانگی آماده، بدون نان و سس؛ مبنا ۱۰۰ گرم است.</p><span>ترکیب و ارزش غذایی ←</span></Link>
        <Link href="/fa/calories/kebab/"><h3>کباب با برنج</h3><p>نوع گوشت، وزن پخته، چربی و کره را مشخص کن. یک عدد ثابت برای همه بشقاب‌ها کافی نیست.</p><span>راهنمای بررسی وعده ←</span></Link>
      </div>
    </div></section>
    <section className="fa-section lp-container fa-two-column">
      <div><p className="fa-eyebrow">بعد از اولین ثبت</p><h2>وعده‌هایت را کنار هم ببین</h2></div>
      <div><p>کالکیلو کالری، پروتئین، کربوهیدرات و چربی وعده‌ها را در مسیر ثبت روزانه نشان می‌دهد. مرور سابقه کمک می‌کند مقدارهایی را که ثبت کرده‌ای بهتر بشناسی.</p><p>عکس نقطه شروع است؛ بررسی نتیجه بخشی از ثبت غذاست.</p></div>
    </section>
    <section id="pricing" className="fa-section lp-container" data-cta-location="pricing">
      <div className="fa-pricing-panel"><div><p className="fa-eyebrow">دانلود و اشتراک</p><h2>رایگان دانلود کن؛<br />شرایط دسترسی را در اپ ببین</h2><p>تحلیل عکس ممکن است به اعتبار یا اشتراک نیاز داشته باشد. تعداد اسکن‌ها، امکانات هر طرح، مبلغ و مدت دسترسی را پیش از خرید در اپ بررسی کن.</p></div><div><p>با این دکمه به لینک‌های دانلود می‌رسی. انتخاب طرح و پرداخت در اپ انجام می‌شود.</p><a href="#download" className="lp-btn lp-btn--solid">دریافت اپ و مشاهده اشتراک</a><Link className="fa-text-link" href="/fa/contact/">سؤالی درباره خرید داری؟</Link></div></div>
    </section>
    <section id="faq" className="fa-section lp-container fa-faq">
      <p className="fa-eyebrow">پیش از شروع</p><h2>پرسش‌های رایج</h2>
      {faqs.map(([question,answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
      <p><Link href="/fa/privacy-policy/">سیاست حریم خصوصی</Link> · <Link href="/fa/account-deletion/">حذف حساب و داده‌ها</Link> · <Link href="/fa/contact/">پشتیبانی</Link></p>
    </section>
    <section id="guides" className="fa-section lp-container"><p className="fa-eyebrow">برای ثبت آگاهانه‌تر</p><h2>راهنماهای کاربردی</h2><div className="fa-guide-links"><Link href="/fa/photo-calorie-calculator/">محاسبه کالری با عکس ←</Link><Link href="/fa/food-calorie-scanner/">عکس مناسب برای تحلیل غذا ←</Link><Link href="/fa/blog/">مقاله‌های تغذیه و ثبت غذا ←</Link></div></section>
    <section id="download" className="fa-section fa-download" data-cta-location="download"><div className="lp-container"><p className="fa-eyebrow">اولین وعده‌ات را ثبت کن</p><h2>کالکیلو را دریافت کن</h2><p>اپ را باز کن، از غذا عکس بگیر و نتیجه را بررسی کن.</p><PersianStoreLinks location="download" /><p className="fa-download-note">دانلود رایگان؛ دارای خرید درون‌برنامه‌ای</p></div></section>
  </main>
}
