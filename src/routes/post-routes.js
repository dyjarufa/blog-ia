import { URLSearchParams } from 'node:url'
import { createPostDraft } from '../services/create-post-draft.js'
import {
  findAll,
  findAllPublishedAndApprovedPosts,
  findById,
  insertPost,
  approvePostById,
  rejectPostById,
} from '../repositories/post-repository.js'
import { readJSONBody } from '../utils/read-json-body.js'
import { isValidAPIKey } from '../utils/auth.js'

export async function registerPostRoutes(router) {
  router.get('/posts', async (req, res) => {
    try {
      const searchParams = new URLSearchParams(req.url.split('?')[1] || '')
      const includeAll = searchParams.get('include') === 'all'

      if (includeAll) {
        if (!isValidAPIKey(req)) {
          res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' })
          return res.end(JSON.stringify({ message: 'Forbidden' }))
        }

        const posts = await findAll()
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        return res.end(JSON.stringify({ data: posts }))
      }

      const posts = await findAllPublishedAndApprovedPosts()
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ data: posts }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ message: error.message }))
    }
  })

  router.get('/posts/:id', async (req, res, params) => {
    try {
      const post = await findById(params.id)

      if (!post || !post.publishedAt || post.rejectedAt) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
        return res.end(JSON.stringify({ message: 'Not found' }))
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ data: post }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ message: error.message }))
    }
  })

  router.post('/posts/draft', async (req, res) => {
    try {
      const body = await readJSONBody(req)
      const post = await createPostDraft(body.idea)

      await insertPost(post)

      res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ data: post }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ message: error.message }))
    }
  })

  router.patch('/posts/:id/approve', async (req, res, params) => {
    try {
      const post = await approvePostById(params.id)
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ data: post }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ message: error.message }))
    }
  })

  router.delete('/posts/:id/reject', async (req, res, params) => {
    try {
      const post = await rejectPostById(params.id)
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ data: post }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify({ message: error.message }))
    }
  })
}
