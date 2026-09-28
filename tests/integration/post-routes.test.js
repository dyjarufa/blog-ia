import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import { setupTestDB, teardownTestDB, cleanupPosts, getPool } from '../helpers.js'
import { mockPost } from '../fixtures.js'

describe('Post Routes Integration Tests', () => {
  before(async () => {
    await setupTestDB()
    await cleanupPosts()
  })

  after(async () => {
    await cleanupPosts()
    await teardownTestDB()
  })

  test('should insert and retrieve a post', async () => {
    const pool = getPool()

    await pool.query(
      'INSERT INTO posts (id, title, content, "publishedAt", "approvedAt") VALUES ($1, $2, $3, $4, $5)',
      [mockPost.id, mockPost.title, mockPost.content, mockPost.publishedAt, mockPost.approvedAt]
    )

    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [mockPost.id])

    assert.strictEqual(result.rows.length, 1)
    assert.strictEqual(result.rows[0].id, mockPost.id)
    assert.strictEqual(result.rows[0].title, mockPost.title)
  })

  test('should find all published and approved posts', async () => {
    const pool = getPool()

    await pool.query(
      'INSERT INTO posts (id, title, content, "publishedAt", "approvedAt") VALUES ($1, $2, $3, $4, $5)',
      ['post-1', 'Published Post', 'Content', new Date(), new Date()]
    )

    const result = await pool.query(
      'SELECT * FROM posts WHERE "publishedAt" IS NOT NULL AND "approvedAt" IS NOT NULL'
    )

    assert.ok(result.rows.length > 0)
  })

  test('should not include rejected posts in published list', async () => {
    const pool = getPool()

    await pool.query(
      'INSERT INTO posts (id, title, content, "rejectedAt") VALUES ($1, $2, $3, $4)',
      ['rejected-1', 'Rejected Post', 'Content', new Date()]
    )

    const result = await pool.query(
      'SELECT * FROM posts WHERE "publishedAt" IS NOT NULL AND "approvedAt" IS NOT NULL'
    )

    const rejectedExists = result.rows.some((post) => post.id === 'rejected-1')
    assert.strictEqual(rejectedExists, false)
  })

  test('should update post status when approved', async () => {
    const pool = getPool()

    await pool.query('INSERT INTO posts (id, title, content) VALUES ($1, $2, $3)', [
      'draft-1',
      'Draft Post',
      'Content',
    ])

    await pool.query('UPDATE posts SET "publishedAt" = NOW(), "approvedAt" = NOW() WHERE id = $1', [
      'draft-1',
    ])

    const result = await pool.query('SELECT * FROM posts WHERE id = $1', ['draft-1'])

    assert.ok(result.rows[0].publishedAt !== null)
    assert.ok(result.rows[0].approvedAt !== null)
  })

  test('should reject a post by setting rejectedAt', async () => {
    const pool = getPool()

    await pool.query('INSERT INTO posts (id, title, content) VALUES ($1, $2, $3)', [
      'to-reject',
      'Post to Reject',
      'Content',
    ])

    await pool.query('UPDATE posts SET "rejectedAt" = NOW() WHERE id = $1', ['to-reject'])

    const result = await pool.query('SELECT * FROM posts WHERE id = $1', ['to-reject'])

    assert.ok(result.rows[0].rejectedAt !== null)
    assert.strictEqual(result.rows[0].publishedAt, null)
  })
})
