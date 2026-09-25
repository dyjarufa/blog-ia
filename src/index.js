import http from 'node:http'

import { createRouter } from './utils/router.js'
import { registerPostRoutes } from './routes/post-routes.js'

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT
const API_PROTOCOL = process.env.API_PROTOCOL

const router = createRouter()

await registerPostRoutes(router)

const server = http.createServer((req, res) => {
  const { url, method } = req

  const paths = url.split('/').filter(Boolean)
  const pathname = `/${paths.join('/')}`

  router.dispatch(pathname, method, req, res)
})

server.listen(API_PORT, API_HOST, () => {
  console.log(`Server running on ${API_PROTOCOL}://${API_HOST}:${API_PORT}`)
  console.log('Press Ctrl+C to stop')
})
