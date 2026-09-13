import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import StaticPageLayout from '../../../../components/StaticPageLayout'
import FoodBreadcrumbs from '../../../../components/FoodBreadcrumbs'
import { getCategoryPages, getCategoryFoods, referenceCategories } from '../../../../lib/food-reference-server'
import { FOOD_CATEGORY_PAGE_SIZE, foodCategoryPath, referenceFoodPath } from '../../../../lib/food-reference-routes.mjs'
import { foodDisplayName, foodBreadcrumbSchema, formatFoodNumber as format } from '../../../../lib/food-seo'
import type { ReferenceFood } from '../../../../lib/food-reference'
import { SITE_URL } from '../../../../lib/seo'

interface Props { category:{ slug:string; name:string; title:string; description:string; count:number }; page:number; foods:ReferenceFood[] }
export const getStaticPaths: GetStaticPaths = async () => ({ paths:getCategoryPages().map(({category,page})=>({ params:{ categoryPath:page===1 ? [category.slug] : [category.slug,'page',String(page)] } })), fallback:false })
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const parts = params?.categoryPath
  if (!Array.isArray(parts) || !(parts.length===1 || (parts.length===3 && parts[1]==='page' && /^[2-9]\d*$|^1\d+$/.test(parts[2])))) return { notFound:true }
  const category = referenceCategories.find(c=>c.slug===parts[0])
  const page = parts.length===1 ? 1 : Number(parts[2])
  if (!category || !Number.isSafeInteger(page) || page>Math.ceil(category.count/FOOD_CATEGORY_PAGE_SIZE)) return { notFound:true }
  return { props:{ category,page,foods:getCategoryFoods(category.slug).slice((page-1)*FOOD_CATEGORY_PAGE_SIZE,page*FOOD_CATEGORY_PAGE_SIZE) } }
}
export default function FoodCategoryPage({ category,page,foods }: Props) {
  const path = foodCategoryPath(category.slug,page)
  const pages = Math.ceil(category.count/FOOD_CATEGORY_PAGE_SIZE)
  const heading = `${category.title}${page>1 ? `؛ صفحه ${format(page)}` : ''}`
  const description = `${format(category.count)} نمونه در گروه ${category.name}؛ صفحه ${format(page)} از ${format(pages)}. کالری و پروتئین در ۱۰۰ گرم، جدول ارزش غذایی و محاسبه وزن هر غذا با منبع USDA.`
  const breadcrumbs = [{name:'خانه',path:'/fa/'},{name:'بانک کالری غذا',path:'/fa/calories/'},{name:category.name,path:foodCategoryPath(category.slug)},...(page>1 ? [{name:`صفحه ${format(page)}`,path}] : [])]
  const pageNumbers = Array.from({ length:pages },(_,i)=>i+1)
  return <StaticPageLayout lang="fa" hasLocalizedVersions={false} path={path.slice(3)} title={`${heading} | کالکیلو`} heading={heading} description={description} intro={description} jsonLd={[
    foodBreadcrumbSchema(breadcrumbs),
    { '@context':'https://schema.org', '@type':'CollectionPage', name:heading, url:`${SITE_URL}${path}`, inLanguage:'fa', mainEntity:{ '@type':'ItemList', numberOfItems:foods.length, itemListElement:foods.map((food,i)=>({ '@type':'ListItem', position:(page-1)*FOOD_CATEGORY_PAGE_SIZE+i+1, name:foodDisplayName(food), url:`${SITE_URL}${referenceFoodPath(food)}` })) } },
  ]}>
    <FoodBreadcrumbs items={breadcrumbs}/>
    <section className="lp-static-card"><h2>مقایسه نمونه‌های {category.name}</h2><p>{category.description}</p><p>اعداد از مجموعه تاریخی USDA SR Legacy آوریل ۲۰۱۸ آمده‌اند. نام اصلی برای تشخیص دقیق نوع نمونه حفظ شده است.</p><Link href="/fa/calories/sources/">منابع و روش محاسبه</Link></section>
    <section className="lp-static-card"><h2>جدول کالری {category.name}</h2><p>نمایش {format((page-1)*FOOD_CATEGORY_PAGE_SIZE+1)} تا {format(Math.min(page*FOOD_CATEGORY_PAGE_SIZE,category.count))} از {format(category.count)} نمونه · در ۱۰۰ گرم</p><div className="food-directory-grid">{foods.map(food=><Link className="food-directory-card" key={food.id} href={referenceFoodPath(food)} prefetch={false}><h3><bdi>{foodDisplayName(food)}</bdi></h3><p><strong>{format(food.calories)}</strong> کیلوکالری</p><p>پروتئین: {food.protein===null ? 'ثبت نشده' : `${format(food.protein)} گرم`}</p><span className="food-card-link">جدول کامل و محاسبه وعده ←</span></Link>)}</div>
      <nav className="food-seo-pagination" aria-label="صفحه‌های گروه غذایی">{page>1 && <Link rel="prev" href={foodCategoryPath(category.slug,page-1)}>صفحه قبل</Link>}{pageNumbers.map(n=><Link key={n} href={foodCategoryPath(category.slug,n)} aria-current={n===page ? 'page' : undefined}>{format(n)}</Link>)}{page<pages && <Link rel="next" href={foodCategoryPath(category.slug,page+1)}>صفحه بعد</Link>}</nav>
    </section>
    <section className="lp-static-card"><h2>جست‌وجوی غذاهای دیگر</h2><p>برای جست‌وجوی فارسی و انگلیسی، مقایسه گروه‌های دیگر یا پیدا کردن غذاهای ایرانی به بانک غذا برگردید.</p><Link href="/fa/calories/">بانک کالری و ارزش غذایی ←</Link></section>
  </StaticPageLayout>
}
