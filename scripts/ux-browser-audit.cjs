/* Run with CALKILO_QA_RUNTIME=/tmp/calkilo-qa/node_modules node scripts/ux-browser-audit.cjs.
   Runtime dependencies: playwright and @axe-core/playwright. No production analytics is sent. */
const { createRequire } = require('node:module')
const fs = require('node:fs')
const assert = require('node:assert/strict')
const runtime = createRequire(`${process.env.CALKILO_QA_RUNTIME || process.cwd() + '/node_modules'}/package.json`)
const { chromium } = runtime('playwright')
const { default: AxeBuilder } = runtime('@axe-core/playwright')
const base = process.env.CALKILO_QA_URL || 'http://localhost:4173'
const output = 'reports/ux-2026-09-11'
const article = '/fa/blog/healthy-snacks-for-busy-days-quick-portable-and-satisfying/'
const routes = ['/fa/', '/fa/photo-calorie-calculator/', '/fa/calories/hamburger/', '/fa/blog/', article, '/fa/contact/', '/fa/#pricing']
;(async () => {
 const browser = await chromium.launch({ channel: 'chrome', headless: true })
 const context = await browser.newContext()
 await context.route(/google-analytics|googletagmanager/, route => route.abort())
 const page = await context.newPage()
 const result = { matrix: [], checks: [], errors: [] }
 page.on('pageerror', error => result.errors.push(error.message))
 const check = (name, condition, detail) => { result.checks.push({ name, passed: Boolean(condition), detail }); if (!condition) console.error('FAIL',name,detail) }
 for (const colorScheme of ['light', 'dark']) for (const width of [360, 390, 768, 1440]) for (const route of routes) {
   await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
   await page.setViewportSize({width, height: width < 768 ? 844 : 900})
   await page.goto(base + route)
   await page.waitForFunction(() => Boolean(window.gtag))
   await page.evaluate(() => document.fonts.ready)
   const layout = await page.evaluate(() => ({ title:document.title,h1:document.querySelector('h1')?.textContent, canonical:document.querySelector('[rel=canonical]')?.href, lang:document.documentElement.lang,dir:document.documentElement.dir, overflow:document.documentElement.scrollWidth > innerWidth, clipped:[...document.querySelectorAll('main a, main h1, main h2, header button')].filter(el=>{const r=el.getBoundingClientRect();return r.width && (r.right > innerWidth+1 || r.left < -1)}).map(el=>el.textContent) }))
   const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
   result.matrix.push({route,width,colorScheme,...layout,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))})
   fs.writeFileSync(`${output}/browser-audit.json`,JSON.stringify(result,null,2))
   if (width===390 || width===1440) await page.screenshot({path:`${output}/after/${route.replace(/[^a-z]+/g,'-')}${width}-${colorScheme}.png`,fullPage:true})
 }
 await page.emulateMedia({colorScheme:'light',reducedMotion:'reduce'})
 await page.setViewportSize({width:390,height:844})
 const anchorState = async id => { await page.locator(id).waitFor({state:'visible',timeout:5000}); await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))); return page.evaluate(id=>{const r=document.querySelector(id).getBoundingClientRect(); const h=document.querySelector('.lp-topbar').getBoundingClientRect(); return {top:r.top,bottom:r.bottom,headerBottom:h.bottom,visible:r.top>=h.bottom-2&&r.top<innerHeight-100}},id) }
 for(const id of ['#download','#pricing']) {
   await page.goto(base+'/fa/')
   await page.waitForFunction(()=>Boolean(window.gtag))
   if(id==='#download') await page.locator('.lp-topbar a[href$="#download"]').click()
   else {await page.locator('.lp-menu-toggle').click();await page.locator('#mobile-navigation a[href$="#pricing"]').click()}
   check('first click '+id,(await anchorState(id)).visible,await anchorState(id))
   await page.goto(base+'/fa/'+id)
   check('direct '+id,(await anchorState(id)).visible,await anchorState(id))
   await page.goto(base+'/fa/contact/')
   if(id==='#download') await page.locator('.lp-topbar a[href$="#download"]').click()
   else {await page.locator('.lp-menu-toggle').click();await page.locator('#mobile-navigation a[href$="#pricing"]').click()}
   check('cross-page '+id,(await anchorState(id)).visible,await anchorState(id))
   await page.locator('.lp-logo').first().click()
   await page.waitForURL(base+'/fa/')
   await page.waitForLoadState('networkidle')
   await page.goBack()
   check('back '+id,(await anchorState(id)).visible,await anchorState(id))
 }
 await page.goto(base+'/fa/')
 const menu=page.locator('.lp-menu-toggle')
 await menu.click();check('menu opens',await menu.getAttribute('aria-expanded')==='true')
 await page.keyboard.press('Tab');await page.keyboard.press('Escape');check('Escape returns focus',await menu.evaluate(el=>document.activeElement===el)&&await menu.getAttribute('aria-expanded')==='false')
 await menu.click();await page.locator('#mobile-navigation a').first().click();check('menu selection closes',await menu.getAttribute('aria-expanded')==='false')
 await page.locator('#faq summary').first().focus();await page.keyboard.press('Enter');check('FAQ keyboard toggles',await page.locator('#faq details').first().evaluate(el=>el.open))
 await page.goto(base+'/fa/')
 await page.locator('.fa-review-button').click();check('sample expands',await page.locator('#sample-review').isVisible())
 await page.locator('a[href="#sample"]').click()
 await page.waitForFunction(()=>window.dataLayer.some(x=>x[1]==='sample_view'))
 const before=await page.evaluate(()=>window.dataLayer.filter(x=>x[1]==='sample_view').length)
 await page.locator('a[href="#sample"]').click();const after=await page.evaluate(()=>window.dataLayer.filter(x=>x[1]==='sample_view').length)
 check('hash does not repeat sample view',after===before,{before,after})
 // Test real clicks with navigation default preserved, while aborting store traffic before it leaves this test context.
 await context.route(/cafebazaar\.ir|myket\.ir|apps\.apple\.com/,route=>route.abort())
 for(const route of ['/fa/', '/fa/photo-calorie-calculator/', '/fa/calories/hamburger/']) {
   await page.goto(base+route)
   await page.waitForFunction(()=>Boolean(window.gtag))
   await page.evaluate(()=>{window.dataLayer=[]})
   const link=page.locator('a[href="https://cafebazaar.ir/app/com.calkilo.mobile"]').first()
   const popupPromise=page.waitForEvent('popup')
   await link.click();const popup=await popupPromise;await popup.close()
   const events=await page.evaluate(()=>window.dataLayer.filter(x=>x[1]==='store_click').map(x=>x[2]))
   check('single store event '+route,events.length===1&&events[0].store==='cafe_bazaar'&&Boolean(events[0].page_type)&&Boolean(events[0].cta_location),events)
 }
 await page.goto(base+'/fa/contact/')
 await context.grantPermissions(['clipboard-read','clipboard-write'])
 await page.getByRole('button',{name:'کپی آدرس ایمیل'}).click();check('copy address',await page.evaluate(()=>navigator.clipboard.readText())==='support@calkilo.com')
 await page.locator('input[name=fullName]').fill('QA Example');await page.locator('input[name=email]').fill('qa@example.invalid');await page.locator('textarea').fill('QA test only — not sent')
 await page.getByRole('button',{name:'کپی متن پیام'}).click();check('copy composed message',(await page.evaluate(()=>navigator.clipboard.readText())).includes('QA test only'))
 check('form values absent from analytics',!(await page.evaluate(()=>JSON.stringify(window.dataLayer))).includes('qa@example.invalid'))
 for (const food of ['pizza','hamburger','rice','falafel','kebab']) {
   await page.goto(base+`/fa/calories/${food}/`)
   const body=await page.locator('main').innerText()
   check('food evidence '+food, !body.includes('undefined') && !body.includes('NaN') && (food==='kebab' ? !await page.locator('.lp-food-stat-grid').count() : await page.locator('.lp-food-source a').count()>0))
 }
 // Protected metadata and no-JS store access.
 const baseline=JSON.parse(fs.readFileSync(`${output}/baseline.json`)).find(x=>x.route==='/fa/photo-calorie-calculator/')
 await page.goto(base+'/fa/photo-calorie-calculator/')
 const meta=await page.evaluate(()=>({title:document.title,h1:document.querySelector('h1').textContent,canonical:document.querySelector('[rel=canonical]').href}))
 check('protected photo metadata',meta.title===baseline.title&&meta.h1===baseline.h1&&meta.canonical===baseline.canonical,meta)
 const nojs=await browser.newContext({javaScriptEnabled:false});const staticPage=await nojs.newPage();await staticPage.goto(base+'/fa/');check('stores without JavaScript',await staticPage.locator('a[href="https://cafebazaar.ir/app/com.calkilo.mobile"]').count()>=2);await nojs.close()
 fs.writeFileSync(`${output}/browser-audit.json`,JSON.stringify(result,null,2))
 console.log(JSON.stringify({matrix:result.matrix.length,checks:result.checks.length,failed:result.checks.filter(x=>!x.passed),overflow:result.matrix.filter(x=>x.overflow||x.clipped.length).map(x=>({route:x.route,width:x.width,colorScheme:x.colorScheme,clipped:x.clipped})),axe:result.matrix.filter(x=>x.violations.length).map(x=>({route:x.route,width:x.width,colorScheme:x.colorScheme,issues:x.violations.map(v=>v.id)})),errors:result.errors},null,2))
 await browser.close()
 assert(result.checks.every(x=>x.passed),'Browser behavior checks failed')
})().catch(error=>{console.error(error);process.exitCode=1})
