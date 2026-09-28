import http from 'node:http'
import express from 'express'

import { createRouter } from './utils/router.js'
import { registerPostRoutes } from './routes/post-routes.js'
import { setupSwagger } from './swagger/swagger-setup.js'

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT
const API_PROTOCOL = process.env.API_PROTOCOL

const app = express()

const router = createRouter()

await registerPostRoutes(router)

setupSwagger(app)

const server = http.createServer((req, res) => {
  const { url, method } = req

  const paths = url.split('/').filter(Boolean)
  const pathname = `/${paths.join('/')}`

  if (pathname.startsWith('/api/docs')) {
    return app(req, res)
  }

  router.dispatch(pathname, method, req, res)
})

server.listen(API_PORT, API_HOST, () => {
  console.log(`Server running on ${API_PROTOCOL}://${API_HOST}:${API_PORT}`)
  console.log(`API Docs: ${API_PROTOCOL}://${API_HOST}:${API_PORT}/api/docs`)
  console.log('Press Ctrl+C to stop')
})
