import { test, describe } from 'node:test'
import assert from 'node:assert'
import { isValidAPIKey } from '../../src/utils/auth.js'
import { validAPIKey } from '../fixtures.js'
import { createMockRequest } from '../helpers.js'

describe('Auth - isValidAPIKey', () => {
  test('should return true with valid API key', () => {
    const request = createMockRequest({
      headers: {
        authorization: `Bearer ${validAPIKey}`,
      },
    })

    process.env.API_KEY = validAPIKey
    const result = isValidAPIKey(request)

    assert.strictEqual(result, true)
  })

  test('should return false with missing Authorization header', () => {
    const request = createMockRequest({
      headers: {},
    })

    process.env.API_KEY = validAPIKey
    const result = isValidAPIKey(request)

    assert.strictEqual(result, false)
  })

  test('should return false with invalid API key', () => {
    const request = createMockRequest({
      headers: {
        authorization: 'Bearer wrong-key',
      },
    })

    process.env.API_KEY = validAPIKey
    const result = isValidAPIKey(request)

    assert.strictEqual(result, false)
  })

  test('should return false with malformed Authorization header', () => {
    const request = createMockRequest({
      headers: {
        authorization: 'InvalidFormat',
      },
    })

    process.env.API_KEY = validAPIKey
    const result = isValidAPIKey(request)

    assert.strictEqual(result, false)
  })

  test('should be case-sensitive for Bearer prefix', () => {
    const request = createMockRequest({
      headers: {
        authorization: `bearer ${validAPIKey}`,
      },
    })

    process.env.API_KEY = validAPIKey
    const result = isValidAPIKey(request)

    assert.strictEqual(result, false)
  })
})
