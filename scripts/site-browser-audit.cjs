/* Reproducible browser audit: CALKILO_QA_RUNTIME points to playwright and @axe-core/playwright. */
const fs = require('node:fs')
const { createRequire } = require('node:module')
const runtime = createRequire(`${process.env.CALKILO_QA_RUNTIME}/package.json`)
const { chromium } = runtime('playwright')
const { default: AxeBuilder } = runtime('@axe-core/playwright')
const base = process.env.CALKILO_QA_URL || 'http://localhost:4173'
const output = 'reports/ux-2026-09-13'
function files(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e=>e.isDirectory()?files(`${dir}/${e.name}`):[`${dir}/${e.name}`]) }
const routes = files('out').filter(p=>p.endsWith('/index.html')).map(p=>p.slice(3,-10))
;(async()=>{
fs.mkdirSync(output,{recursive:true})
const browser=await chromium.launch({channel:'chrome',headless:true})
const context=await browser.newContext({reducedMotion:'reduce'})
await context.route(/google-analytics|googletagmanager/,r=>r.abort())
const page=await context.newPage()
const results=process.env.CALKILO_QA_A11Y_ONLY ? {...JSON.parse(fs.readFileSync(`${output}/routes.json`)),checks:[]} : {base,routes:[],errors:[],checks:[]}
page.on('pageerror',e=>results.errors.push({url:page.url(),message:e.message}))
for(const route of (process.env.CALKILO_QA_A11Y_ONLY ? [] : routes)){
 await page.setViewportSize({width:390,height:844})
 const response=await page.goto(base+route,{waitUntil:'domcontentloaded'})
 if (/\/(features|pricing)\/$/.test(route) && route.split('/').length > 3) await page.waitForURL(url => url.hash.length > 0)
 await page.waitForFunction(() => [...document.querySelectorAll('link[rel=stylesheet]')].every(link => link.sheet))
 await page.waitForFunction(() => typeof window.gtag === 'function')
 await page.waitForLoadState('domcontentloaded'); await page.evaluate(()=>document.fonts.ready).catch(()=>{})
 const state=await page.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,lang:document.documentElement.lang,dir:document.documentElement.dir,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),font:document.querySelector('h1')&&getComputedStyle(document.querySelector('h1')).fontFamily}))
 results.routes.push({route,status:response.status(),...state})
 fs.writeFileSync(`${output}/routes.json`,JSON.stringify(results,null,2))
}
for(const route of ['/', '/fa/','/fa/calories/','/fa/calories/ghormeh-sabzi/','/fa/contact/','/calorie-calculator/','/bmi-calculator/','/fa/blog/','/features/','/pricing/','/food-page-analyze/','/dark/','/fa/dark/'])for(const width of [390,1440]){
 await page.setViewportSize({width,height:900});await page.goto(base+route,{waitUntil:'domcontentloaded'});await page.waitForLoadState('domcontentloaded'); await page.evaluate(()=>document.fonts.ready).catch(()=>{})
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()
 results.checks.push({route,width,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))})
}
fs.writeFileSync(`${output}/routes.json`,JSON.stringify(results,null,2))
console.log(JSON.stringify({routes:results.routes.length,issues:results.routes.filter(r=>r.status!==200||r.h1!==1||r.overflow||r.brokenImages.length),errors:results.errors,a11y:results.checks.filter(c=>c.violations.length)},null,2))
await browser.close()
})().catch(e=>{console.error(e);process.exit(1)})
