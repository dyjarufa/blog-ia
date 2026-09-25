import { pool } from '../database/pool.js'

function mapRowToPost(row) {
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    publishedAt: row.published_at,
    approvedAt: row.approved_at,
    rejectedAt: row.rejected_at,
    createdAt: row.created_at,
  }
}

export async function findAllPosts() {
  const { rows } = await pool.query(
    'SELECT id, title, content, published_at, approved_at, rejected_at, created_at FROM posts ORDER BY published_at DESC'
  )
  return rows.map(mapRowToPost)
}

export async function insertPost(post) {
  const { rows } = await pool.query(
    'INSERT INTO posts (id, title, content, published_at, approved_at, rejected_at, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [
      post.id,
      post.title,
      post.content,
      post.publishedAt,
      post.approvedAt,
      post.rejectedAt,
      post.createdAt,
    ]
  )
  return mapRowToPost(rows[0])
}
