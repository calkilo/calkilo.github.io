# SEO Issues - Quick Fix Guide

## 🚨 TOP 4 CRITICAL FIXES (Do These First!)

### 1. Fix Domain Inconsistency ⚠️ CRITICAL
**Problem:** Mixed use of `calkilo.com` and `calkilo.app`  
**Files to Fix:**
- `contact.html` - Change `calkilo.app` → `calkilo.com`
- `faq.html` - Change `calkilo.app` → `calkilo.com`
- `privacy-policy.html` - Change `calkilo.app` → `calkilo.com`
- `terms-of-service.html` - Change `calkilo.app` → `calkilo.com`
- `terms-and-conditions.html` - Change `calkilo.app` → `calkilo.com`

**Find & Replace:**
```
https://calkilo.app → https://calkilo.com
```

---

### 2. Add hreflang Tags ⚠️ CRITICAL
**Problem:** No hreflang tags for 10 supported languages  
**Files to Fix:** All HTML files (`index.html`, `contact.html`, `faq.html`, etc.)

**Add to `<head>` section:**
```html
<link rel="alternate" hreflang="en" href="https://calkilo.com/en/" />
<link rel="alternate" hreflang="fa" href="https://calkilo.com/fa/" />
<link rel="alternate" hreflang="zh" href="https://calkilo.com/zh/" />
<link rel="alternate" hreflang="ru" href="https://calkilo.com/ru/" />
<link rel="alternate" hreflang="it" href="https://calkilo.com/it/" />
<link rel="alternate" hreflang="fr" href="https://calkilo.com/fr/" />
<link rel="alternate" hreflang="de" href="https://calkilo.com/de/" />
<link rel="alternate" hreflang="ar" href="https://calkilo.com/ar/" />
<link rel="alternate" hreflang="es" href="https://calkilo.com/es/" />
<link rel="alternate" hreflang="nl" href="https://calkilo.com/nl/" />
<link rel="alternate" hreflang="x-default" href="https://calkilo.com/en/" />
```

---

### 3. Add FAQ Structured Data ⚠️ CRITICAL
**Problem:** FAQ page missing FAQPage schema (missed rich snippet opportunity)  
**File to Fix:** `faq.html`

**Add before closing `</head>` tag:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How accurate is Calkilo's AI calorie calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calkilo's AI achieves 99.2% accuracy in calorie calculation through advanced computer vision and machine learning trained on millions of food images."
      }
    },
    {
      "@type": "Question",
      "name": "Is my food photo data private and secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Your photos are processed with end-to-end encryption and automatically deleted after analysis. We never share or sell your data."
      }
    }
    // Add all other FAQ questions/answers
  ]
}
</script>
```

---

### 4. Add Missing Page to Sitemap ⚠️ HIGH
**Problem:** `terms-and-conditions.html` not in sitemap  
**File to Fix:** `sitemap.xml`

**Add after terms-of-service entry:**
```xml
<url>
    <loc>https://calkilo.com/terms-and-conditions.html</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <mobile:mobile/>
</url>
```

---

## 📋 QUICK CHECKLIST

- [ ] Fix all `calkilo.app` → `calkilo.com` in subpages
- [ ] Add hreflang tags to all HTML files
- [ ] Add FAQPage structured data to `faq.html`
- [ ] Add `terms-and-conditions.html` to sitemap
- [ ] Create OG images (1200x630px) for all pages
- [ ] Add lazy loading to images (`loading="lazy"`)
- [ ] Add breadcrumb navigation to subpages
- [ ] Update sitemap lastmod dates

---

## 🔍 VALIDATION TOOLS

After fixes, test with:
1. **Google Rich Results Test:** https://search.google.com/test/rich-results
2. **hreflang Checker:** https://technicalseo.com/tools/hreflang/
3. **Google Search Console:** Check for crawl errors
4. **Facebook Debugger:** Test OG tags - https://developers.facebook.com/tools/debug/
5. **Twitter Card Validator:** https://cards-dev.twitter.com/validator

---

**See `SEO-ISSUES-ANALYSIS.md` for complete detailed analysis.**

