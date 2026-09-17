import { useEffect, useState } from 'react'
import ReferenceDetails from './ReferenceFoodNutrition'
import type { ReferenceFood } from '../lib/food-reference'

const groups = new Map<string, Promise<ReferenceFood[]>>()
export default function LazyReferenceDetails({ id, url }: { id: number; url: string }) {
  const [food, setFood] = useState<ReferenceFood>()
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    setFailed(false)
    if (!groups.has(url)) groups.set(url, fetch(url).then(response => {
      if (!response.ok) throw new Error('Nutrient group unavailable')
      return response.json() as Promise<ReferenceFood[]>
    }).catch(error => { groups.delete(url); throw error }))
    groups.get(url)!.then(records => {
      const record = records.find(item => item.id === id)
      if (!record) throw new Error('Food unavailable')
      if (active) setFood(record)
    }).catch(() => { if (active) setFailed(true) })
    return () => { active = false }
  }, [id, url, attempt])
  if (food) return <ReferenceDetails food={food} />
  if (failed) return <p role="alert">بارگذاری انجام نشد. <button onClick={() => setAttempt(value => value + 1)}>تلاش دوباره</button></p>
  return <p role="status">در حال بارگذاری ارزش غذایی…</p>
}
