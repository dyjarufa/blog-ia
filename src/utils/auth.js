import { timingSafeEqual } from 'node:crypto'

export function isValidAPIKey(req) {
  const apiKey = process.env.API_KEY

  if (!apiKey) {
    return false
  }

  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }

  const token = authHeader.slice(7)

  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(apiKey))
  } catch {
    return false
  }
}
