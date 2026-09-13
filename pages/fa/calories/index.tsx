import type { GetStaticProps } from 'next'
import { referenceCategories } from '../../../lib/food-reference-server'
import { foodCategoryPath } from '../../../lib/food-reference-routes.mjs'
import { foodBreadcrumbSchema } from '../../../lib/food-seo'
import { SITE_URL } from '../../../lib/seo'
import FoodReferenceDirectory from '../../../components/FoodReferenceDirectory'
import Link from 'next/link'
import { useState } from 'react'
import StaticPageLayout from '../../../components/StaticPageLayout'
import { FOOD_CALORIE_PAGES } from '../../../lib/food-calorie-pages'

const categories = ['همه', ...Array.from(new Set(FOOD_CALORIE_PAGES.map(food => food.category || 'سایر غذاها')))]
const normalize = (text: string) => text.normalize('NFKC').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\s\u200c\u064B-\u065F]/g, '').toLowerCase()
const formatter = new Intl.NumberFormat('fa-IR')

interface DirectoryProps { groups: { slug: string; name: string; title: string; count: number }[] }
export const getStaticProps: GetStaticProps<DirectoryProps> = async () => ({ props: { groups: referenceCategories.map(({slug,name,title,count}) => ({slug,name,title,count})) } })
export default function PersianFoodDirectory({ groups }: DirectoryProps) {
  const [database, setDatabase] = useState('persian')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('همه')
  const [sort, setSort] = useState('name')
  const foods = FOOD_CALORIE_PAGES.filter(food => (category === 'همه' || (food.category || 'سایر غذاها') === category) && normalize(`${food.nameFa} ${food.slug}`).includes(normalize(query)))
    .sort((a, b) => sort === 'calories' ? (a.nutrition?.caloriesPer100g || a.estimate?.caloriesPer100g || 0) - (b.nutrition?.caloriesPer100g || b.estimate?.caloriesPer100g || 0) : a.nameFa.localeCompare(b.nameFa, 'fa'))
  return <StaticPageLayout lang="fa" path="/calories/" hasLocalizedVersions={false} title="بانک کالری غذا | جدول ارزش غذایی ۷٬۷۹۳ نمونه و غذاهای ایرانی" description="جست‌وجوی کالری غذاهای ایرانی و ۷٬۷۹۳ نمونه مرجع؛ کالری، پروتئین، چربی و ریزمغذی‌ها در ۱۰۰ گرم، دسته‌بندی غذاها و محاسبه ارزش غذایی وعده با منبع." jsonLd={[foodBreadcrumbSchema([{ name:'خانه',path:'/fa/' },{ name:'بانک کالری غذا',path:'/fa/calories/' }]), { '@context':'https://schema.org', '@type':'CollectionPage', name:'بانک کالری و ارزش غذایی', url:`${SITE_URL}/fa/calories/`, inLanguage:'fa', mainEntity:{ '@type':'ItemList', numberOfItems:groups.length, itemListElement:groups.map((group,i)=>({ '@type':'ListItem', position:i+1, name:group.title, url:`${SITE_URL}${foodCategoryPath(group.slug)}` })) } }]} heading="بانک کالری و ارزش غذایی" intro="غذاهای ایرانی و هزاران نمونه مرجع را جست‌وجو کنید، ارزش غذایی را ببینید و مقدار وعده خود را حساب کنید.">
    <nav className="food-breadcrumb" aria-label="مسیر صفحه"><Link href="/fa/">خانه</Link><span> / </span><span aria-current="page">بانک کالری غذا</span></nav>
    <section className="lp-static-card food-category-hub"><h2>جدول کالری به تفکیک گروه غذایی</h2><p>هر گروه را باز کنید تا نمونه‌های مرجع، کالری در ۱۰۰ گرم و صفحه کامل هر غذا را ببینید.</p><details className="food-category-disclosure"><summary>مرور همه ۲۵ گروه غذایی</summary><div className="food-category-links">{groups.map(group=><Link key={group.slug} href={foodCategoryPath(group.slug)} prefetch={false}><strong>{group.title}</strong><span>{formatter.format(group.count)} نمونه</span></Link>)}</div></details><p><Link href="/fa/calories/sources/">منابع داده‌ها و روش محاسبه کالری</Link></p></section>
    <div className="food-database-switch" role="group" aria-label="انتخاب بانک غذا"><button className="lp-btn fa-secondary" aria-pressed={database === 'persian'} onClick={() => setDatabase('persian')}>غذاهای ایرانی</button><button className="lp-btn fa-secondary" aria-pressed={database === 'reference'} onClick={() => setDatabase('reference')}>بانک جهانی · ۷٬۷۹۳ غذا</button></div>
    {database === 'reference' ? <FoodReferenceDirectory /> : <><section className="lp-static-card food-directory" aria-label="جست‌وجوی کالری غذا">
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
    </section></>}
    <section className="lp-static-card"><h2>این اعداد چگونه به دست آمده‌اند؟</h2><p>برای غذاهای دارای جدول مرجع، منبع تغذیه‌ای در صفحه غذا آمده است. اعداد غذاهای ترکیبی ایرانی از <a href="https://mealscook.net/blog/calories-in-persian-food/" target="_blank" rel="noreferrer">جدول تخمینی Meals Cook</a> نقل شده‌اند؛ این منبع آشپزی است و مقدارها تأیید آزمایشگاهی نشده‌اند. روغن، آب و نسبت مواد می‌توانند نتیجه واقعی را تغییر دهند.</p><p>محاسبه وعده: کالری در ۱۰۰ گرم × وزن وعده ÷ ۱۰۰. این فهرست شامل غذاهای رایج است و همه دستورهای محلی را پوشش نمی‌دهد.</p></section>
  </StaticPageLayout>
}
