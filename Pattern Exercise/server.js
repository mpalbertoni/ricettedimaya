import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, 'dist')
const port = 8080

const mime = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json'
}

http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url
  const fp = path.join(dist, file)
  if (!fs.existsSync(fp)) {
    res.writeHead(404); res.end('Not found')
    return
  }
  const ext = path.extname(fp)
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' })
  fs.createReadStream(fp).pipe(res)
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
