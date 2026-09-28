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

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: List blog posts
 *     description: Get all published and approved posts, or all posts including drafts (requires API key)
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *           enum: [all]
 *         description: Include drafts and rejected posts (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostArray'
 *       403:
 *         description: Forbidden - Invalid or missing API key for include=all
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get single post
 *     description: Retrieve a published post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostSingle'
 *       404:
 *         description: Post not found or not published
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /posts/draft:
 *   post:
 *     summary: Create AI-generated post draft
 *     description: Generate a blog post draft using AI from an idea
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idea:
 *                 type: string
 *                 example: "How to optimize Docker containers"
 *             required:
 *               - idea
 *     responses:
 *       201:
 *         description: Post draft created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostSingle'
 *       403:
 *         description: Forbidden - Invalid API key
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error or AI service unavailable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /posts/{id}/approve:
 *   patch:
 *     summary: Approve and publish post
 *     description: Approve a draft post for publication
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to approve
 *     responses:
 *       200:
 *         description: Post approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostSingle'
 *       403:
 *         description: Forbidden - Invalid API key
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /posts/{id}/reject:
 *   delete:
 *     summary: Reject post
 *     description: Reject a draft post and prevent publication
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to reject
 *     responses:
 *       200:
 *         description: Post rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostSingle'
 *       403:
 *         description: Forbidden - Invalid API key
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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
