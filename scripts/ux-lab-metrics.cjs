const {createRequire}=require('node:module')
const fs=require('node:fs')
const runtime=createRequire(`${process.env.CALKILO_QA_RUNTIME || process.cwd()+'/node_modules'}/package.json`)
const {chromium}=runtime('playwright')
;(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true})
 const results=[]
 for(const route of ['/fa/','/fa/photo-calorie-calculator/']) for(let run=1;run<=3;run++){
  const context=await browser.newContext({viewport:{width:390,height:844},colorScheme:'light',reducedMotion:'reduce'})
  await context.route(/google-analytics|googletagmanager/,r=>r.abort())
  const page=await context.newPage();const cdp=await context.newCDPSession(page)
  await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true})
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750})
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4})
  await page.addInitScript(()=>{
   window.lab={lcp:0,cls:0,session:0,start:0,last:0,longTasks:[]}
   new PerformanceObserver(list=>{for(const e of list.getEntries())window.lab.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true})
   new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput){const m=window.lab;if(e.startTime-m.last>1000||e.startTime-m.start>5000){m.start=e.startTime;m.session=0}m.session+=e.value;m.last=e.startTime;m.cls=Math.max(m.cls,m.session)}}).observe({type:'layout-shift',buffered:true})
   new PerformanceObserver(list=>{window.lab.longTasks.push(...list.getEntries().map(e=>e.duration))}).observe({type:'longtask',buffered:true})
  })
  await page.goto((process.env.CALKILO_QA_URL||'http://localhost:4173')+route,{waitUntil:'load'})
  await page.waitForTimeout(3000)
  results.push({route,run,...await page.evaluate(()=>({lcpMs:window.lab.lcp,cls:window.lab.cls,longTasksMs:window.lab.longTasks,resources:performance.getEntriesByType('resource').map(e=>({url:e.name,type:e.initiatorType,bytes:e.transferSize,bodyBytes:e.encodedBodySize,durationMs:e.duration})),navigation:performance.getEntriesByType('navigation').map(e=>({bytes:e.transferSize,bodyBytes:e.encodedBodySize,ttfbMs:e.responseStart}))}))})
  await context.close()
 }
 const result={environment:{browser:browser.version(),viewport:'390×844',cpuSlowdown:4,latencyMs:150,downloadBytesPerSecond:200000,server:'local Python HTTP, no compression; cold cache each run; analytics blocked',field:'not measured',inp:'not measured'},runs:results}
 fs.writeFileSync('reports/ux-2026-09-11/lab-metrics.json',JSON.stringify(result,null,2));console.log(results.map(r=>({route:r.route,run:r.run,lcp:r.lcpMs,cls:r.cls})));await browser.close()
})().catch(e=>{console.error(e);process.exitCode=1})
