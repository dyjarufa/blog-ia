import { nanoid } from 'nanoid'
import { z } from 'zod'

import { mastra } from '../mastra/index.js'
import { postWriterAgentId } from '../mastra/agents/post-writer-agent.js'

const postDraftSchema = z.object({
  title: z.string(),
  content: z.string(),
})

export async function createPostDraft(idea) {
  const agent = mastra.getAgentById(postWriterAgentId)

  const { object } = await agent.generate(
    `Create a complete blog post based on the following idea:\n\n${idea}`,
    { structuredOutput: { schema: postDraftSchema } },
  )

  return {
    id: nanoid(),
    title: object.title,
    content: object.content,
    publishedAt: null,
    approvedAt: null,
    rejectedAt: null,
    createdAt: new Date().toISOString(),
  }
}
