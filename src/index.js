import http from 'node:http'

import { createPostDraft } from './services/create-post-draft.js'
import { findAllPosts, insertPost } from './repositories/post-repository.js'

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT
const API_PROTOCOL = process.env.API_PROTOCOL

const server = http.createServer(async (req, res) => {
  const { url, method } = req

  const paths = url.split('/').filter(Boolean)
  const path = `/${paths.join('/')}`

  if (path === '/posts' && method === 'GET') {
    try {
      const posts = await findAllPosts()
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ data: posts }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ message: error.message }))
    }
  }

  if (path === '/posts/draft' && method === 'POST') {
    const bodyBuffer = []

    req.on('data', (chunk) => bodyBuffer.push(chunk))
    req.on('end', async () => {
      try {
        const body = JSON.parse(Buffer.concat(bodyBuffer).toString())
        const post = await createPostDraft(body.idea)

        await insertPost(post)

        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
        return res.end(JSON.stringify({ data: post }))
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
        return res.end(JSON.stringify({ message: error.message }))
      }
    })

    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify({ message: 'Not found' }))
})

server.listen(API_PORT, API_HOST, () => {
  console.log(`Server running on ${API_PROTOCOL}://${API_HOST}:${API_PORT}`)
  console.log('Press Ctrl+C to stop')
})
