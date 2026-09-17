import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const hash = buffer => createHash('sha256').update(buffer).digest('hex').slice(0,20)
const assetRoot = 'public/assets'
await rm(`${assetRoot}/versioned`, {recursive:true,force:true})
await mkdir(`${assetRoot}/versioned`, {recursive:true})
const assets = {}
async function walk(dir) {
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    if(entry.name === 'versioned') continue
    const path=join(dir,entry.name)
    if(entry.isDirectory()){await walk(path);continue}
    if(!/\.(png|webp|svg|woff2?|avif|jpe?g)$/i.test(entry.name)) continue
    let buffer=await readFile(path)
    let width,height
    if(/\.(png|webp|avif|jpe?g)$/i.test(entry.name)) {
      const metadata=await sharp(buffer).metadata();width=metadata.width;height=metadata.height
      // Resize the oversize artwork identified by the live audit; originals stay intact.
      if(entry.name.endsWith('.webp')){
        let maxWidth=0
        if(/^(analysis|chatAi|food|goal)\.webp$/.test(entry.name)) maxWidth=400
        if(/^(91a038|ff8765|ca251d)/.test(entry.name)) maxWidth=520
        if(/^(a07ad49|4d70d5)/.test(entry.name)) maxWidth=144
        if(/^f9fc5/.test(entry.name)) maxWidth=300
        if(maxWidth || /^9d9b949/.test(entry.name)){
          const result=await sharp(buffer).resize({width:maxWidth || width,withoutEnlargement:true}).webp({quality:68,effort:5}).toBuffer({resolveWithObject:true})
          buffer=result.data;width=result.info.width;height=result.info.height
        }
      }
    }
    const file=`${hash(buffer)}${extname(path).toLowerCase()}`
    await writeFile(`${assetRoot}/versioned/${file}`,buffer)
    assets['/'+path.slice(7).replaceAll(' ','%20')]={url:`/assets/versioned/${file}`,...(width?{width,height}:{})}
  }
}
await walk(assetRoot)
await walk('public/fonts')
await writeFile('data/asset-manifest.json',JSON.stringify(assets)+'\n')
await writeFile('styles/delivery-fonts.css', [400,700].map(weight => `@font-face { font-family: Vazir; src: url('${assets[`/fonts/vazir/Vazir-${weight === 400 ? 'Regular' : 'Bold'}.woff2`].url}') format('woff2'); font-style: normal; font-weight: ${weight}; font-display: swap; }`).join('\n')+'\n')

const {foods}=JSON.parse(await readFile('public/data/usda-foods.json','utf8'))
const categories=[...new Set(foods.map(f=>f.category))]
await rm('public/data/versioned',{recursive:true,force:true})
await mkdir('public/data/versioned',{recursive:true})
async function publish(value){const buffer=Buffer.from(JSON.stringify(value));const file=`${hash(buffer)}.json`;await writeFile(`public/data/versioned/${file}`,buffer);return `/data/versioned/${file}`}
const details=[]
for(const category of categories) details.push(await publish(foods.filter(f=>f.category===category)))
const index=await publish({categories,details,rows:foods.map(f=>[f.id,f.name,categories.indexOf(f.category),f.calories,f.protein])})
await writeFile('data/food-delivery.json',JSON.stringify({index})+'\n')
console.log(`Prepared ${Object.keys(assets).length} versioned assets and compact food search with ${details.length} on-demand nutrient groups.`)
