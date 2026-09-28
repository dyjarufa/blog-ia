import { Pool } from 'pg'

let pool = null

export async function setupTestDB() {
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'blog',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  })

  return pool
}

export async function teardownTestDB() {
  if (pool) {
    await pool.end()
    pool = null
  }
}

export async function cleanupPosts() {
  if (!pool) return
  try {
    await pool.query('DELETE FROM posts')
  } catch (error) {
    if (error.code !== '42P01') {
      throw error
    }
  }
}

export function getPool() {
  if (!pool) {
    throw new Error('Database not initialized. Call setupTestDB first.')
  }
  return pool
}

export function createMockRequest(options = {}) {
  return {
    url: options.url || '/',
    method: options.method || 'GET',
    headers: options.headers || {},
    on: () => {},
    once: () => {},
    ...options,
  }
}

export function createMockResponse() {
  const response = {
    statusCode: 200,
    headers: {},
    body: '',
    writeHead: function (status, headers) {
      this.statusCode = status
      this.headers = headers
      return this
    },
    end: function (data) {
      this.body = data
      return this
    },
    write: function (data) {
      this.body += data
      return this
    },
  }
  return response
}
