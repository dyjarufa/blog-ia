import { createPostDraft } from '../services/create-post-draft.js'
import { findAllPosts, findById, insertPost } from '../repositories/post-repository.js'
import { readJSONBody } from '../utils/read-json-body.js'

export async function registerPostRoutes(router) {
  router.get('/posts', async (req, res) => {
    try {
      const posts = await findAllPosts()
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
}
