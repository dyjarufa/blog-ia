import { Mastra } from '@mastra/core/mastra'

import { postWriterAgent } from './agents/post-writer-agent.js'

export const mastra = new Mastra({
  agents: { postWriterAgent },
})
