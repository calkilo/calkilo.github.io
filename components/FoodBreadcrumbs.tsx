import Link from 'next/link'
export default function FoodBreadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return <nav className="food-breadcrumb" aria-label="مسیر صفحه">{items.map((item,i) => <span key={item.path}>{i > 0 && <span aria-hidden="true"> / </span>}{i === items.length-1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path}>{item.name}</Link>}</span>)}</nav>
}
