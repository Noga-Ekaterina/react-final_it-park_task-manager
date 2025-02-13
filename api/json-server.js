// server.js (или api/json-server.js для Vercel)
import { create, router as _router, defaults, rewriter } from 'json-server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

// Для получения пути к файлу в ES-модулях
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const server = create()

// Для записи данных (раскомментируйте при необходимости)
const filePath = join(__dirname, 'db.json')
const db = JSON.parse(readFileSync(filePath, 'utf-8'))
const router = _router(db)

// Для режима только чтение (закомментируйте если используете запись)
// const router = _router(join(__dirname, 'db.json'))

const middlewares = defaults()

server.use(middlewares)
server.use(rewriter({
   '/api/*': '/$1',
   '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)

// Для Vercel Serverless
export default (req, res) => {
   server(req, res)
}