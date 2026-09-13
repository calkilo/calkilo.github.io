import { useState } from 'react'
import { normalizePersianInput } from './FoodPortionCalculator'
import { REFERENCE_NUTRIENTS, type ReferenceFood } from '../lib/food-reference'
import { formatFoodNumber as format } from '../lib/food-seo'

export default function ReferenceDetails({ food }: { food: ReferenceFood }) {
  const [grams, setGrams] = useState('100')
  const weight = Number(normalizePersianInput(grams))
  const valid = grams.trim() !== '' && Number.isFinite(weight) && weight > 0 && weight <= 5000
  return <div className="reference-details">
    <p>اعداد برای همین نمونه و روش آماده‌سازی هستند. وزن بخش خوراکی را وارد کنید.</p>
    <label htmlFor={`grams-${food.id}`}>وزن وعده (گرم)<input id={`grams-${food.id}`} inputMode="decimal" value={grams} onChange={e => setGrams(e.target.value)} aria-invalid={!valid} aria-describedby={`nutrition-${food.id}`} /></label>
    <div id={`nutrition-${food.id}`} aria-live="polite">{valid ? <table><caption>ارزش غذایی در {format(weight)} گرم</caption><tbody>{REFERENCE_NUTRIENTS.map(([key,label,unit]) => <tr key={key}><th scope="row">{label}</th><td>{food[key] === null ? 'ثبت نشده' : `${format(food[key]! * weight / 100)} ${unit}`}</td></tr>)}</tbody></table> : <p>وزنی بیشتر از صفر و حداکثر ۵۰۰۰ گرم وارد کنید.</p>}</div>
    <a href={`https://fdc.nal.usda.gov/food-details/${food.id}/nutrients`} target="_blank" rel="noreferrer">مشاهده نمونه {format(food.id)} در USDA ↗</a>
  </div>
}

