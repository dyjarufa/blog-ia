export const mockPost = {
  id: 'test-post-123',
  title: 'Test Post Title',
  content: 'This is a test post content.',
  createdAt: new Date('2026-09-28T10:00:00Z'),
  publishedAt: new Date('2026-09-28T11:00:00Z'),
  approvedAt: new Date('2026-09-28T11:00:00Z'),
  rejectedAt: null,
}

export const mockDraftPost = {
  id: 'draft-post-456',
  title: 'Draft Post Title',
  content: 'This is a draft post.',
  createdAt: new Date('2026-09-28T12:00:00Z'),
  publishedAt: null,
  approvedAt: null,
  rejectedAt: null,
}

export const mockRejectedPost = {
  id: 'rejected-post-789',
  title: 'Rejected Post Title',
  content: 'This post was rejected.',
  createdAt: new Date('2026-09-28T13:00:00Z'),
  publishedAt: null,
  approvedAt: null,
  rejectedAt: new Date('2026-09-28T13:30:00Z'),
}

export const validAPIKey = 'test-api-key-secret'

export const newPostIdea = {
  idea: 'How to build scalable Node.js APIs',
}
