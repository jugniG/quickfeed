import { createServer } from 'node:http'
import { join } from 'node:path'
import { createReadStream, existsSync, statSync } from 'node:fs'

// Import the vercel-preset handler (has the fresh SSR build with all routes)
const handlerModule = await import('./.vercel/output/functions/__server.func/index.mjs')
const handler = handlerModule.default

const PORT = process.env.PORT || 5173
const CLIENT_DIR = join(process.cwd(), '.vercel/output/static')

const MIME = {
  js: 'application/javascript',
  css: 'text/css',
  svg: 'image/svg+xml',
  png: 'image/png',
  ico: 'image/x-icon',
  json: 'application/json',
  woff2: 'font/woff2',
  woff: 'font/woff',
  webp: 'image/webp',
  gif: 'image/gif',
}

function serveStatic(pathname, res) {
  const filePath = join(CLIENT_DIR, pathname)
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    const ext = filePath.split('.').pop()
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
    if (pathname.startsWith('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    }
    createReadStream(filePath).pipe(res)
    return true
  }
  return false
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)

  // Serve static files
  if (serveStatic(url.pathname, res)) return

  // SSR via fetch handler
  try {
    const headers = {}
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      headers[req.rawHeaders[i].toLowerCase()] = req.rawHeaders[i + 1]
    }

    let body = undefined
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await new Promise((resolve) => {
        const chunks = []
        req.on('data', c => chunks.push(c))
        req.on('end', () => resolve(Buffer.concat(chunks)))
      })
    }

    const request = new Request(`http://localhost:${PORT}${req.url}`, {
      method: req.method,
      headers,
      body: body && body.length > 0 ? body : undefined,
    })

    const response = await handler.fetch(request)

    const resHeaders = {}
    response.headers.forEach((v, k) => { resHeaders[k] = v })
    res.writeHead(response.status, resHeaders)

    if (response.body) {
      const reader = response.body.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        res.write(value)
      }
    }
    res.end()
  } catch (e) {
    console.error('SSR Error:', e)
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Internal Server Error')
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ FeedbackHook production server on http://localhost:${PORT}`)
})
