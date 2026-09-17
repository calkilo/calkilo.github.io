import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import LazyReferenceDetails from './LazyReferenceDetails'
import delivery from '../data/food-delivery.json'
import { referenceFoodPath } from '../lib/food-reference-routes.mjs'
import { createFoodSearchEntry, scoreFoodSearch, normalizeFoodSearch, type ReferenceFood } from '../lib/food-reference'

const format = (n: number) => new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 }).format(n)
const PAGE_SIZE = 24
type Summary = Pick<ReferenceFood, 'id' | 'name' | 'category' | 'calories' | 'protein'> & { detailUrl: string }
type SearchIndex = { categories: string[]; details: string[]; rows: [number, string, number, number, number | null][] }


export default function FoodReferenceDirectory() {
  const [records, setRecords] = useState<Summary[]>([])
  const [status, setStatus] = useState<'loading'|'ready'|'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  const [query,setQuery] = useState('')
  const [category,setCategory] = useState('همه')
  const [sort,setSort] = useState('name')
  const [page,setPage] = useState(1)
  const [opened, setOpened] = useState<Record<number, boolean>>({})
  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    fetch(delivery.index, { signal: controller.signal }).then(r => { if (!r.ok) throw new Error('load'); return r.json() }).then((data: SearchIndex) => {
      if (!Array.isArray(data.rows) || !Array.isArray(data.categories) || !Array.isArray(data.details)) throw new Error('invalid catalogue')
      setRecords(data.rows.map(([id,name,group,calories,protein]) => ({id,name,category:data.categories[group],calories,protein,detailUrl:data.details[group]}))); setStatus('ready')
    }).catch(() => { if (!controller.signal.aborted) setStatus('error') })
    return () => controller.abort()
  },[attempt])
  const index = useMemo(() => records.map(food => ({food, entry:createFoodSearchEntry(food)})),[records])
  const categories = useMemo(() => ['همه', ...Array.from(new Set(records.map(f => f.category))).sort((a,b) => a.localeCompare(b,'fa'))],[records])
  const filtered = useMemo(() => {
    const terms = normalizeFoodSearch(query).split(' ').filter(Boolean)
    return index.filter(({food}) => category === 'همه' || food.category === category)
      .map(({food,entry}) => ({ food, score: scoreFoodSearch(entry, terms) }))
      .filter(item => item.score >= 0)
      .sort((a,b) => sort === 'calories' ? a.food.calories-b.food.calories : sort === 'protein' ? (b.food.protein ?? -1)-(a.food.protein ?? -1) : b.score-a.score || a.food.name.localeCompare(b.food.name))
      .map(item => item.food)
  },[index,query,category,sort])
  const pages = Math.max(1,Math.ceil(filtered.length/PAGE_SIZE))
  const changePage = (next: number) => { setPage(next); document.getElementById('reference-top')?.scrollIntoView({ block:'start' }) }
  return <section className="lp-static-card food-directory" id="reference-top" aria-label="بانک مرجع غذا">
    <h2>بانک مرجع جهانی غذا</h2>
    <p>۷٬۷۹۳ نمونه غذایی از مجموعه USDA SR Legacy، در کنار فهرست غذاهای ایرانی. نام دقیق نمونه‌ها به زبان اصلی حفظ شده؛ نام مواد رایج را فارسی یا انگلیسی جست‌وجو کنید، مثل «برنج پخته» یا «عدس».</p>
    <p><a href="https://fdc.nal.usda.gov/download-datasets/" target="_blank" rel="noreferrer">منبع: USDA، نسخه نهایی SR Legacy آوریل ۲۰۱۸</a> · مقدار ثبت‌نشده به معنی صفر نیست.</p>
    {status === 'loading' ? <p role="status">در حال بارگذاری بانک غذا…</p> : status === 'error' ? <div role="alert"><p>بارگذاری بانک غذا انجام نشد. دوباره تلاش کنید.</p><button className="lp-btn lp-btn--solid" onClick={() => setAttempt(a=>a+1)}>تلاش دوباره</button></div> : <>
      <div className="food-filters">
        <label htmlFor="reference-search">نام غذا یا شناسه منبع<input id="reference-search" type="search" placeholder="مثلاً سیب، مرغ، شیر یا rice" value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} /></label>
        <label htmlFor="reference-category">گروه غذایی<select id="reference-category" value={category} onChange={e=>{setCategory(e.target.value);setPage(1)}}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
        <label htmlFor="reference-sort">مرتب‌سازی<select id="reference-sort" value={sort} onChange={e=>{setSort(e.target.value);setPage(1)}}><option value="name">نام اصلی</option><option value="calories">کالری کمتر</option><option value="protein">پروتئین بیشتر</option></select></label>
      </div>
      <p role="status">{format(filtered.length)} نتیجه · کالری در ۱۰۰ گرم · صفحه {format(page)} از {format(pages)}</p>
      <div className="food-directory-grid reference-grid">{filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE).map(food=><details className="food-directory-card reference-card" key={food.id} onToggle={event => { const open = event.currentTarget.open; setOpened(value => ({...value,[food.id]:open})) }}><summary><span className="food-category">{food.category}</span><h3 dir="ltr" lang="en">{food.name}</h3><p><strong>{format(food.calories)}</strong> کیلوکالری</p><span className="food-card-link">ارزش غذایی و محاسبه وعده</span></summary><p><Link href={referenceFoodPath(food)} prefetch={false}>صفحه کامل کالری و ارزش غذایی ←</Link></p>{opened[food.id] && <LazyReferenceDetails id={food.id} url={food.detailUrl} />}</details>)}</div>
      {!filtered.length && <div className="food-empty"><p>غذایی پیدا نشد. نام کوتاه‌تر یا نام انگلیسی را امتحان کنید.</p><button className="lp-btn lp-btn--solid" onClick={()=>{setQuery('');setCategory('همه');setPage(1)}}>نمایش همه غذاها</button></div>}
      {pages > 1 && <nav className="reference-pagination" aria-label="صفحه‌های غذا"><button className="lp-btn fa-secondary" disabled={page===1} onClick={()=>changePage(page-1)}>صفحه قبل</button><span>{format(page)} / {format(pages)}</span><button className="lp-btn fa-secondary" disabled={page===pages} onClick={()=>changePage(page+1)}>صفحه بعد</button></nav>}
    </>}
  </section>
}
