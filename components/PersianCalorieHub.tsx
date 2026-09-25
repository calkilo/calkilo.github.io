import { useState } from 'react'
import Link from 'next/link'
import { FOOD_CALORIE_PAGES } from '../lib/food-calorie-pages'
import { normalizePersianInput } from './FoodPortionCalculator'

const format = (value: number) => new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 }).format(value)

export default function PersianCalorieHub() {
  const [query, setQuery] = useState('')
  const [slug, setSlug] = useState('rice')
  const [grams, setGrams] = useState('100')
  const [items, setItems] = useState<{ name: string; grams: number; calories: number }[]>([])
  const food = FOOD_CALORIE_PAGES.find(item => item.slug === slug)!
  const weight = Number(normalizePersianInput(grams))
  const valid = grams.trim() !== '' && Number.isFinite(weight) && weight > 0 && weight <= 5000
  const calories = (food.nutrition?.caloriesPer100g ?? food.estimate!.caloriesPer100g) * weight / 100
  const normalized = query.replace(/ي/g, 'ی').replace(/ك/g, 'ک').trim()
  const matches = FOOD_CALORIE_PAGES.filter(item => item.nameFa.includes(normalized))
  return <section className="lp-section" id="online-calorie-counter" dir="rtl" aria-labelledby="online-counter-title">
    <div className="lp-container"><div className="lp-static-card">
      <h2 id="online-counter-title">کالری شمار آنلاین غذا؛ بدون نصب و رایگان</h2>
      <p>غذا را پیدا کنید، وزن آماده مصرف را وارد کنید و کالری وعده‌ها را جمع بزنید. این فهرست فقط تا زمان باز بودن صفحه نگه داشته می‌شود و با بارگذاری دوباره پاک می‌شود.</p>
      <div className="food-filters">
        <label htmlFor="hub-search">جست‌وجوی غذای ایرانی<input id="hub-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="برنج، فلافل، پیتزا…" /></label>
        <label htmlFor="hub-food">انتخاب غذا<select id="hub-food" value={slug} onChange={e => setSlug(e.target.value)}>
          {!matches.some(item => item.slug === slug) && <option value={slug}>{food.nameFa} (انتخاب فعلی)</option>}
          {matches.map(item => <option key={item.slug} value={item.slug}>{item.nameFa}</option>)}
        </select></label>
        <label htmlFor="hub-grams">وزن غذای آماده (گرم)<input id="hub-grams" inputMode="decimal" value={grams} onChange={e => setGrams(e.target.value)} aria-invalid={!valid} aria-describedby="hub-result" /></label>
      </div>
      {!matches.length && <p role="status">غذایی پیدا نشد؛ نام کوتاه‌تر را امتحان کنید یا بانک کامل غذا را ببینید.</p>}
      <p>{food.nutrition?.preparation ?? food.estimate?.preparation} <Link href={`/fa/calories/${slug}/`}>منبع و ارزش غذایی {food.nameFa} ←</Link></p>
      <p><output id="hub-result" aria-live="polite">{valid ? `${format(calories)} کیلوکالری تخمینی برای ${format(weight)} گرم ${food.nameFa}` : 'وزن باید بیشتر از صفر و حداکثر ۵۰۰۰ گرم باشد.'}</output></p>
      <button type="button" className="lp-btn lp-btn--solid" disabled={!valid} onClick={() => setItems(current => [...current, { name: food.nameFa, grams: weight, calories }])}>افزودن به جمع وعده‌ها</button>
      {items.length > 0 && <>
        <ul className="lp-policy-list">{items.map((item, index) => <li key={index}>{item.name}، {format(item.grams)} گرم: {format(item.calories)} کیلوکالری <button type="button" onClick={() => setItems(current => current.filter((_, i) => i !== index))} aria-label={`حذف ${item.name}، ردیف ${index + 1}`}>حذف</button></li>)}</ul>
        <p role="status"><strong>جمع: {format(items.reduce((sum, item) => sum + item.calories, 0))} کیلوکالری تخمینی</strong></p>
      </>}
      <p>دستور غذا، روغن و سس می‌توانند نتیجه را تغییر دهند. عدد مرجع را فقط برای غذای مشابه به کار ببرید و کنارغذاها را جدا اضافه کنید.</p>
      <div className="fa-guide-links">
        <Link href="/fa/calories/">بانک کامل غذا و جدول ماکروها ←</Link>
        <Link href="/calorie-calculator/">محاسبه نیاز روزانه و TDEE (انگلیسی) ←</Link>
        <Link href="/fa/photo-calorie-calculator/">تحلیل عکس غذا در اپ ←</Link>
        <Link href="/fa/ai-calorie-tracker/">ثبت سابقه روزانه و ماکروها در اپ ←</Link>
      </div>
      <noscript><p>برای محاسبه تعاملی جاوااسکریپت را فعال کنید. جدول‌های کالری و منابع در بانک غذا بدون آن هم قابل خواندن هستند.</p></noscript>
    </div></div>
  </section>
}
