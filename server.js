import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const port = 8080

const mime = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json',
  '.ico': 'image/x-icon'
}

function serveFile(fp, res) {
  const ext = path.extname(fp)
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' })
  fs.createReadStream(fp).pipe(res)
}

http.createServer((req, res) => {
  let url = req.url.split('?')[0]

  // Pattern Exercise — serve from its dist folder
  if (url.startsWith('/Pattern%20Exercise/') || url.startsWith('/Pattern Exercise/')) {
    const sub = url.replace(/^\/Pattern(?:\%20| )Exercise\//, '')
    const fp = path.join(__dirname, 'Pattern Exercise', 'dist', sub || 'index.html')
    if (fs.existsSync(fp)) return serveFile(fp, res)
  }

  let file = url === '/' ? '/index.html' : url
  const fp = path.join(__dirname, file)
  if (!fs.existsSync(fp)) {
    res.writeHead(404); res.end('Not found')
    return
  }
  serveFile(fp, res)
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
