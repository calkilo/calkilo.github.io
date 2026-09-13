// Set CALKILO_QA_RUNTIME to a node_modules directory containing playwright.
const { createRequire } = require('node:module');
const runtime = createRequire(`${process.env.CALKILO_QA_RUNTIME || process.cwd() + '/node_modules'}/package.json`);
const { chromium } = runtime('playwright');
const base = process.env.CALKILO_QA_URL || 'http://localhost:3011';
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({reducedMotion:'reduce'}); const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route(/google-analytics|googletagmanager/,r=>r.abort());
 fs.mkdirSync('reports/requested-fixes',{recursive:true});
 for(const width of [390,853,1723]) {
  await page.setViewportSize({width,height:900}); await page.goto(base + '/fa/'); await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth),false);
  await page.locator('.lp-integrations').scrollIntoViewIfNeeded();
  await page.locator('.lp-integrations').screenshot({path:`reports/requested-fixes/integrations-${width}.png`});
  const card = await page.locator('.lp-integration-card').boundingBox();
  assert(Math.abs(card.x + card.width / 2 - width / 2) < 2);
  assert.equal(await page.locator('.lp-feature-card h3').first().evaluate(e=>getComputedStyle(e).textAlign),'start');
  await page.locator('.lp-ai-content').screenshot({path:`reports/requested-fixes/features-${width}.png`});
  await page.locator('#pricing').scrollIntoViewIfNeeded();
  assert.match(await page.locator('#pricing').innerText(),/۲۸۹٬۰۰۰/); assert.match(await page.locator('#pricing').innerText(),/۵۸۹٬۰۰۰/);
  await page.locator('#pricing').screenshot({path:`reports/requested-fixes/pricing-${width}.png`});
  assert(await page.locator('img.store-logo').evaluateAll(imgs=>imgs.length>=2&&imgs.every(i=>i.complete&&i.naturalWidth>0)));
 }
 await page.goto(base + '/fa/calories/');
 await page.getByRole('button',{name:'بانک جهانی · ۷٬۷۹۳ غذا'}).click();
 await page.locator('#reference-search').waitFor();
 await page.locator('#reference-search').fill('برنج پخته');
 await page.waitForFunction(()=>document.querySelectorAll('.reference-card').length>0);
 let titles=await page.locator('.reference-card h3').allTextContents();
 assert(titles.every(t=>/rice/i.test(t)&&/cooked/i.test(t)),titles);
 await page.locator('.reference-card summary').first().click();
 let input=page.locator('.reference-details input').first();await input.fill('۲۰۰');
 assert.match(await page.locator('.reference-details table caption').first().innerText(),/۲۰۰/);
 await input.fill('-1');assert.equal(await input.getAttribute('aria-invalid'),'true');await input.fill('100');
 await page.setViewportSize({width:390,height:844});
 await page.locator('#reference-top').screenshot({path:'reports/requested-fixes/foods-mobile.png'});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth),false);
 await page.locator('#reference-search').fill('water');await page.locator('#reference-sort').selectOption('calories');
 assert.match(await page.locator('.reference-card strong').first().innerText(),/۰/);
 await page.locator('#reference-search').fill('no-such-food-xyz');assert.equal(await page.locator('.reference-card').count(),0);
 await page.getByRole('button',{name:'نمایش همه غذاها'}).click();assert.equal(await page.locator('.reference-card').count(),24);
 const first=await page.locator('.reference-card h3').first().textContent();await page.getByRole('button',{name:'صفحه بعد'}).click();assert.notEqual(await page.locator('.reference-card h3').first().textContent(),first);
 assert.deepEqual(errors,[]);console.log('PASS: responsive layout, prices, logos, Persian search, pagination, missing result, zero energy, Persian portion input, invalid portions; no browser errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
