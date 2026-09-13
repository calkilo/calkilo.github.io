import { useState } from 'react'

export function normalizePersianInput(value: string) {
  return value.replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))).replace(/٫/g, '.')
}

export default function FoodPortionCalculator({ caloriesPer100g }: { caloriesPer100g: number }) {
  const [grams, setGrams] = useState('100')
  const weight = Number(normalizePersianInput(grams))
  const valid = grams.trim() !== '' && Number.isFinite(weight) && weight > 0 && weight <= 5000
  return <section className="food-portion" aria-labelledby="portion-title">
    <div><h2 id="portion-title">کالری وعده شما</h2><p>وزن غذای آماده را وارد کنید؛ نتیجه بر اساس نمونه همین صفحه است.</p></div>
    <label htmlFor="portion-grams">وزن وعده (گرم)
      <input id="portion-grams" type="text" inputMode="decimal" value={grams} onChange={event => setGrams(event.target.value)} aria-invalid={!valid} aria-describedby="portion-result" autoComplete="off" />
    </label>
    <output id="portion-result" htmlFor="portion-grams" aria-live="polite">{valid ? <><strong>{new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(weight * caloriesPer100g / 100)}</strong> کیلوکالری تخمینی</> : 'وزنی بیشتر از صفر و حداکثر ۵۰۰۰ گرم وارد کنید.'}</output>
  </section>
}
