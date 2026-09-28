import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import http from 'node:http'
import request from 'supertest'
import { createRouter } from '../../src/utils/router.js'
import { registerPostRoutes } from '../../src/routes/post-routes.js'
import { setupTestDB, teardownTestDB, cleanupPosts } from '../helpers.js'
import { validAPIKey } from '../fixtures.js'

let app
let server

describe('Posts E2E Tests', () => {
  before(async () => {
    await setupTestDB()
    await cleanupPosts()

    process.env.API_KEY = validAPIKey

    const router = createRouter()
    await registerPostRoutes(router)

    app = http.createServer((req, res) => {
      const { url, method } = req
      const paths = url.split('/').filter(Boolean)
      const pathname = `/${paths.join('/')}`

      router.dispatch(pathname, method, req, res)
    })

    server = app.listen(0)
  })

  after(async () => {
    server.close()
    await cleanupPosts()
    await teardownTestDB()
  })

  test('GET /posts should return published posts', async () => {
    const response = await request(app).get('/posts').expect(200)

    assert.ok(Array.isArray(response.body.data))
  })

  test('GET /posts?include=all should require API key', async () => {
    await request(app)
      .get('/posts?include=all')
      .expect(403)
      .expect((response) => {
        assert.strictEqual(response.body.message, 'Forbidden')
      })
  })

  test('GET /posts?include=all with valid API key should return all posts', async () => {
    const response = await request(app)
      .get('/posts?include=all')
      .set('Authorization', `Bearer ${validAPIKey}`)
      .expect(200)

    assert.ok(Array.isArray(response.body.data))
  })

  test('POST /posts/draft without API key should return 403', async () => {
    await request(app).post('/posts/draft').send({ idea: 'Test idea' }).expect(403)
  })

  test('GET /posts/:id with non-existent post should return 404', async () => {
    await request(app).get('/posts/non-existent-id').expect(404)
  })

  test('PATCH /posts/:id/approve without API key should return 403', async () => {
    await request(app).patch('/posts/some-id/approve').expect(403)
  })

  test('DELETE /posts/:id/reject without API key should return 403', async () => {
    await request(app).delete('/posts/some-id/reject').expect(403)
  })

  test('POST /posts/draft with valid API key should have 500 (no AI configured)', async () => {
    const response = await request(app)
      .post('/posts/draft')
      .set('Authorization', `Bearer ${validAPIKey}`)
      .set('Content-Type', 'application/json')
      .send({ idea: 'Test post idea' })

    assert.ok([500].includes(response.status))
  })
})
