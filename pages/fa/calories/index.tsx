import Link from 'next/link'
import { useState } from 'react'
import StaticPageLayout from '../../../components/StaticPageLayout'
import { FOOD_CALORIE_PAGES } from '../../../lib/food-calorie-pages'

const categories = ['همه', ...Array.from(new Set(FOOD_CALORIE_PAGES.map(food => food.category || 'سایر غذاها')))]
const normalize = (text: string) => text.normalize('NFKC').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\s\u200c\u064B-\u065F]/g, '').toLowerCase()
const formatter = new Intl.NumberFormat('fa-IR')

export default function PersianFoodDirectory() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('همه')
  const [sort, setSort] = useState('name')
  const foods = FOOD_CALORIE_PAGES.filter(food => (category === 'همه' || (food.category || 'سایر غذاها') === category) && normalize(`${food.nameFa} ${food.slug}`).includes(normalize(query)))
    .sort((a, b) => sort === 'calories' ? (a.nutrition?.caloriesPer100g || a.estimate?.caloriesPer100g || 0) - (b.nutrition?.caloriesPer100g || b.estimate?.caloriesPer100g || 0) : a.nameFa.localeCompare(b.nameFa, 'fa'))
  return <StaticPageLayout lang="fa" path="/calories/" hasLocalizedVersions={false} title="جدول کالری غذاهای ایرانی | جست‌وجو و محاسبه وعده | کالکیلو" description="کالری غذاهای ایرانی را در هر ۱۰۰ گرم مقایسه کنید. خورشت، پلو، کباب و آش را جست‌وجو کنید و کالری وزن دلخواه را ببینید." heading="کالری غذاهای ایرانی" intro="غذایتان را پیدا کنید، کالری در ۱۰۰ گرم را مقایسه کنید و در صفحه هر غذا، وزن وعده خود را وارد کنید.">
    <section className="lp-static-card food-directory" aria-label="جست‌وجوی کالری غذا">
      <div className="food-filters">
        <label htmlFor="food-search">نام غذا<input id="food-search" type="search" placeholder="مثلاً قورمه سبزی، جوجه یا عدس پلو" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <label htmlFor="food-category">گروه غذایی<select id="food-category" value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
        <label htmlFor="food-sort">مرتب‌سازی<select id="food-sort" value={sort} onChange={event => setSort(event.target.value)}><option value="name">نام غذا</option><option value="calories">کالری کمتر</option></select></label>
      </div>
      <p role="status">{formatter.format(foods.length)} غذا · کیلوکالری در ۱۰۰ گرم</p>
      <div className="food-directory-grid">{foods.map(food => <Link className="food-directory-card" key={food.slug} href={`/fa/calories/${food.slug}/`}>
        <span className="food-category">{food.category || 'سایر غذاها'}</span><h2>{food.nameFa}</h2>
        <p><strong>{formatter.format(food.nutrition?.caloriesPer100g || food.estimate?.caloriesPer100g || 0)}</strong> کیلوکالری</p>
        <small>{food.nutrition ? 'نمونه مرجع با منبع تغذیه‌ای' : 'تخمین آشپزی؛ وابسته به دستور'}</small><span className="food-card-link">محاسبه وعده و جزئیات ←</span>
      </Link>)}</div>
      {!foods.length && <div className="food-empty"><h2>غذایی پیدا نشد</h2><p>نام کوتاه‌تر یا گروه دیگری را امتحان کنید.</p><button className="lp-btn lp-btn--solid" onClick={() => { setQuery(''); setCategory('همه') }}>نمایش همه غذاها</button></div>}
    </section>
    <section className="lp-static-card"><h2>این اعداد چگونه به دست آمده‌اند؟</h2><p>برای غذاهای دارای جدول مرجع، منبع تغذیه‌ای در صفحه غذا آمده است. اعداد غذاهای ترکیبی ایرانی از <a href="https://mealscook.net/blog/calories-in-persian-food/" target="_blank" rel="noreferrer">جدول تخمینی Meals Cook</a> نقل شده‌اند؛ این منبع آشپزی است و مقدارها تأیید آزمایشگاهی نشده‌اند. روغن، آب و نسبت مواد می‌توانند نتیجه واقعی را تغییر دهند.</p><p>محاسبه وعده: کالری در ۱۰۰ گرم × وزن وعده ÷ ۱۰۰. این فهرست شامل غذاهای رایج است و همه دستورهای محلی را پوشش نمی‌دهد.</p></section>
  </StaticPageLayout>
}
