import { useState } from 'react'
import { trackUiEvent } from '../lib/analytics'

/** An explicitly illustrative workflow, never a screenshot or live AI result. */
export default function PersianSample() {
  const [reviewing, setReviewing] = useState(false)
  return <figure className="fa-sample" id="sample" data-sample data-cta-location="sample">
    <figcaption><span className="fa-eyebrow">نمونه نمایشی فرایند</span><span>عکس ← بررسی ← ثبت در اپ</span></figcaption>
    <div className="fa-sample-body">
      <div className="fa-plate-scene" role="img" aria-label="تصویرسازی نمایشی یک بشقاب برنج؛ عکس واقعی غذا نیست">
        <div className="fa-plate"><div className="fa-rice" /><span className="fa-herb">✦</span></div>
        <span className="fa-scene-label">تصویرسازی غذا</span>
      </div>
      <div className="fa-sample-result">
        <span className="fa-eyebrow">بررسی نتیجه</span>
        <h2>برنج سفید پخته</h2>
        <p>یک پیمانه، ۱۵۸ گرم • بدون روغن افزوده</p>
        <div className="fa-energy"><strong>۲۰۵</strong><span>کیلوکالری</span></div>
        <dl className="fa-macros"><div><dt>پروتئین</dt><dd>۴٫۳ گرم</dd></div><div><dt>کربوهیدرات</dt><dd>۴۴٫۵ گرم</dd></div><div><dt>چربی</dt><dd>۰٫۴۴ گرم</dd></div></dl>
        <button className="fa-review-button" type="button" aria-expanded={reviewing} aria-controls="sample-review" onClick={() => {
          setReviewing(!reviewing); trackUiEvent('sample_interaction', 'sample', { action: reviewing ? 'close_review' : 'open_review' })
        }}>چه چیزی را بررسی کنم؟ <span aria-hidden="true">{reviewing ? '−' : '+'}</span></button>
        <p id="sample-review" hidden={!reviewing}>وزن برنج را با مقدار مصرفی تطبیق بده. اگر روغن، کره یا خورشت اضافه شده، آن را هم در نتیجه در نظر بگیر؛ سپس وعده را در اپ ثبت کن.</p>
      </div>
    </div>
    <p className="fa-sample-note">این نمایش، اسکرین‌شات اپ یا تحلیل زنده نیست. اعداد نمونه از <a href="https://tools.myfooddata.com/nutrition-facts/168878/wt1" target="_blank" rel="noreferrer">داده USDA برای برنج پخته</a> هستند؛ نتیجه غذای شما می‌تواند متفاوت باشد.</p>
  </figure>
}
