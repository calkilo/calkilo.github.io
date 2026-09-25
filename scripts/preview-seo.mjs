import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { gzipSync } from 'node:zlib'

// Local export preview with compression and the release's redirect rules.
const root = resolve('out')
const redirects = new Map((await readFile(resolve(root, '_redirects'), 'utf8')).trim().split('\n').map(line => line.trim().split(/\s+/)).map(([from,to]) => [from,to]))
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.xml':'application/xml', '.txt':'text/plain', '.webp':'image/webp', '.avif':'image/avif', '.png':'image/png', '.woff2':'font/woff2', '.ico':'image/x-icon' }
createServer(async (req,res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1:8081')
    const path = decodeURIComponent(url.pathname)
    if (redirects.has(path)) { res.writeHead(301,{Location:redirects.get(path)+url.search}); res.end(); return }
    let file = resolve(root, '.' + path)
    if (file !== root && !file.startsWith(root+sep)) { res.writeHead(403); res.end(); return }
    if ((await stat(file)).isDirectory()) {
      if (!path.endsWith('/')) { res.writeHead(301,{Location:path+'/'+url.search}); res.end(); return }
      file = resolve(file,'index.html')
    }
    let body = await readFile(file)
    const type = extname(file)
    const headers = {'Content-Type':mime[type] || 'application/octet-stream', 'Cache-Control':'no-cache', Vary:'Accept-Encoding'}
    if (/\bgzip\b/.test(req.headers['accept-encoding'] || '') && ['.html','.js','.css','.json','.svg','.xml'].includes(type)) { body=gzipSync(body); headers['Content-Encoding']='gzip' }
    res.writeHead(200,{...headers,'Content-Length':body.length});res.end(req.method==='HEAD' ? undefined : body)
  } catch { res.writeHead(404);res.end('Not found') }
}).listen(8081,'127.0.0.1',() => console.log('SEO preview: http://127.0.0.1:8081'))
