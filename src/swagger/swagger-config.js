export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API with AI-Powered Content Generation',
      version: '1.0.0',
      description:
        'A Node.js REST API for managing blog posts with AI-powered content generation using Mastra framework.',
      contact: {
        name: 'Jady Rufino',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'API Key',
          description: 'Bearer token authentication with API key',
        },
      },
      schemas: {
        Post: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'abc123xyz',
              description: 'Unique post identifier (Nanoid)',
            },
            title: {
              type: 'string',
              example: 'How to Build Scalable Node.js APIs',
              description: 'Post title',
            },
            content: {
              type: 'string',
              example: 'This is a comprehensive guide...',
              description: 'Post content (HTML or plain text)',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-28T10:00:00Z',
              description: 'Creation timestamp',
            },
            publishedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              example: '2026-09-28T11:00:00Z',
              description: 'Publication timestamp (null if draft)',
            },
            approvedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              example: '2026-09-28T11:00:00Z',
              description: 'Approval timestamp (null if not approved)',
            },
            rejectedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              example: null,
              description: 'Rejection timestamp (null if not rejected)',
            },
          },
          required: ['id', 'title', 'content', 'createdAt'],
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Not found',
              description: 'Error message',
            },
          },
          required: ['message'],
        },
        PostArray: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Post',
              },
            },
          },
        },
        PostSingle: {
          type: 'object',
          properties: {
            data: {
              $ref: '#/components/schemas/Post',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/post-routes.js'],
}
