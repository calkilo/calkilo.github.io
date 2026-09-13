import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import StaticPageLayout from '../../../../components/StaticPageLayout'
import FoodBreadcrumbs from '../../../../components/FoodBreadcrumbs'
import ReferenceFoodNutrition from '../../../../components/ReferenceFoodNutrition'
import { referenceFoods, getReferenceFood, referenceCategories, relatedReferenceFoods } from '../../../../lib/food-reference-server'
import { referenceFoodPath, referenceFoodSlug, foodCategoryPath } from '../../../../lib/food-reference-routes.mjs'
import { type ReferenceFood } from '../../../../lib/food-reference'
import { foodDisplayName, foodBreadcrumbSchema, foodDatasetSchema, formatFoodNumber as format } from '../../../../lib/food-seo'
import { SITE_URL } from '../../../../lib/seo'

type Category = { slug: string; name: string; description: string }
interface Props { food: ReferenceFood; category: Category; related: ReferenceFood[] }
export const getStaticPaths: GetStaticPaths = async () => ({ paths: referenceFoods.filter(food=>referenceFoodPath(food).includes('/reference/')).map(food => ({ params:{ foodSlug:referenceFoodSlug(food) } })), fallback:false })
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const food = getReferenceFood(String(params?.foodSlug || ''))
  if (!food) return { notFound:true }
  return { props:{ food, category:referenceCategories.find(c => c.name === food.category)!, related:relatedReferenceFoods(food) } }
}
export default function ReferenceFoodPage({ food, category, related }: Props) {
  const name = foodDisplayName(food)
  const path = referenceFoodPath(food)
  const source = `https://fdc.nal.usda.gov/food-details/${food.id}/nutrients`
  const heading = `کالری و ارزش غذایی ${name}`
  const seoName = name.length > 72 ? `${name.slice(0,69).trim()}…` : name
  const description = `${seoName}: ${format(food.calories)} کیلوکالری در ۱۰۰ گرم${food.protein === null ? '' : ` و ${format(food.protein)} گرم پروتئین`}. جدول مواد مغذی، محاسبه وزن وعده و منبع USDA، شناسه ${food.id}.`
  const breadcrumbs = [{ name:'خانه', path:'/fa/' },{ name:'بانک کالری غذا', path:'/fa/calories/' },{ name:category.name, path:foodCategoryPath(category.slug) },{ name, path }]
  const dataset = foodDatasetSchema(food,name,path,description)
  return <StaticPageLayout lang="fa" hasLocalizedVersions={false} path={path.slice(3)} title={`کالری ${seoName} | USDA ${food.id}`} heading={heading} intro={description} description={description} jsonLd={[
    foodBreadcrumbSchema(breadcrumbs), dataset,
    { '@context':'https://schema.org', '@type':'WebPage', '@id':`${SITE_URL}${path}`, name:heading, url:`${SITE_URL}${path}`, inLanguage:'fa', mainEntity:{ '@id':`${SITE_URL}${path}#nutrition` } },
  ]}>
    <FoodBreadcrumbs items={breadcrumbs} />
    <section className="lp-static-card food-reference-summary">
      <h2>این جدول مربوط به کدام نمونه است؟</h2>
      <p lang="en" dir="ltr" className="food-original-name">{food.name}</p>
      <p>گروه: <Link href={foodCategoryPath(category.slug)}>{category.name}</Link> · شناسه منبع: <bdi>{food.id}</bdi></p>
      <p>هر ۱۰۰ گرم از این نمونه <strong>{format(food.calories)} کیلوکالری</strong> دارد. نام اصلی بالا نوع غذا و آماده‌سازی ثبت‌شده را مشخص می‌کند؛ نمونه‌های هم‌نام ممکن است ترکیب متفاوتی داشته باشند.</p>
      <p>{category.description}</p>
      <p>منبع: <a href={source} target="_blank" rel="noreferrer">USDA FoodData Central — SR Legacy، نمونه {format(food.id)}</a>. مجموعه نهایی آوریل ۲۰۱۸؛ گردآوری و ابزار محاسبه: کالکیلو.</p>
      <Link href="/fa/calories/sources/">روش محاسبه، منابع و محدودیت داده‌ها ←</Link>
    </section>
    <section className="lp-static-card food-nutrition-page">
      <h2>جدول ارزش غذایی و محاسبه وعده</h2>
      <p>جدول ابتدا مقادیر ۱۰۰ گرم را نشان می‌دهد. با تغییر وزن، همه مقدارهای موجود متناسب با وعده شما محاسبه می‌شوند. «ثبت نشده» به معنی صفر نیست.</p>
      <ReferenceFoodNutrition food={food} />
      <noscript><p>جدول ۱۰۰ گرم بدون جاوااسکریپت قابل مشاهده است. برای وزن دلخواه، هر مقدار را در وزن وعده ضرب و بر ۱۰۰ تقسیم کنید.</p></noscript>
    </section>
    <section className="lp-static-card">
      <h2>کالری در وزن‌های مختلف</h2>
      <div className="food-serving-grid">{[50,100,150,200].map(grams=><article key={grams}><h3>{format(grams)} گرم</h3><p><strong>{format(food.calories*grams/100)}</strong> کیلوکالری</p></article>)}</div>
      <p>این وزن‌ها برای مقایسه‌اند و اندازه استاندارد یا توصیه‌شده وعده نیستند. محاسبه بر پایه نمونه منبع است.</p>
    </section>
    <section className="lp-static-card">
      <h2>مقایسه با نمونه‌های مرتبط در {category.name}</h2>
      <p>همه اعداد زیر در ۱۰۰ گرم هستند؛ قبل از مقایسه، نوع غذا و روش آماده‌سازی را بخوانید.</p>
      <div className="food-comparison-scroll"><table className="food-comparison"><thead><tr><th scope="col">نمونه غذایی</th><th scope="col">کیلوکالری</th><th scope="col">پروتئین (گرم)</th></tr></thead><tbody>{related.map(item=><tr key={item.id}><th scope="row"><Link href={referenceFoodPath(item)} prefetch={false}><bdi>{foodDisplayName(item)}</bdi></Link></th><td>{format(item.calories)}</td><td>{item.protein === null ? 'ثبت نشده' : format(item.protein)}</td></tr>)}</tbody></table></div>
      <p><Link href={foodCategoryPath(category.slug)}>مشاهده همه نمونه‌های {category.name} ←</Link></p>
    </section>
    <section className="lp-static-card"><h2>برای غذای خانگی چه عددی را ثبت کنم؟</h2><p>اگر مواد، آب، روغن یا روش پخت غذای شما با این نمونه تفاوت دارد، حاصل محاسبه هم یک تخمین است. اجزای اضافه را جدا ثبت کنید و وزن خام و پخته را جایگزین هم نکنید.</p><Link href="/fa/photo-calorie-calculator/">راهنمای تخمین کالری غذا با عکس</Link></section>
  </StaticPageLayout>
}
