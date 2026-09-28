# Blog API with AI-Powered Content Generation

A modern Node.js REST API for managing blog posts with **AI-powered content generation**. Posts are generated using Mastra framework (Claude integration), then approved by editors before publication.

**Author:** Jady Rufino

---

## 🤖 AI-Powered Workflow

1. **Draft Generation**: Send an idea → Claude generates a full blog post (title + content)
2. **Editor Review**: Approve or reject before publication
3. **Public Access**: Only approved posts are visible to readers

```bash
# Generate post from idea
curl -X POST http://localhost:8080/posts/draft \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{"idea": "Docker optimization techniques"}'

# Returns: { id, title, content, timestamps }
```

---

## 🚀 Quick Start

**Prerequisites:** Node.js 22+, Docker

```bash
# 1. Install & setup
npm ci && npm run local:setup

# 2. Start server
npm run dev

# 3. Ready! 🎉
# API: http://localhost:8080
# Database: PostgreSQL running in Docker
```

---

## 📡 API Endpoints

### Public (No Auth Required)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/posts` | List all published & approved posts |
| `GET` | `/posts/:id` | Get single published post |

```bash
# List posts
curl http://localhost:8080/posts

# Get one post
curl http://localhost:8080/posts/abc123xyz
```

### Admin (Requires API Key)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/posts/draft` | Generate post with AI |
| `PATCH` | `/posts/:id/approve` | Publish approved post |
| `DELETE` | `/posts/:id/reject` | Reject post |
| `GET` | `/posts?include=all` | See all posts (drafts, approved, rejected) |

```bash
# Generate post (AI)
curl -X POST http://localhost:8080/posts/draft \
  -H "Authorization: Bearer your-api-key" \
  -d '{"idea": "Your topic here"}'

# Approve post
curl -X PATCH http://localhost:8080/posts/abc123xyz/approve \
  -H "Authorization: Bearer your-api-key"

# Reject post
curl -X DELETE http://localhost:8080/posts/abc123xyz/reject \
  -H "Authorization: Bearer your-api-key"

# View all posts (admin)
curl http://localhost:8080/posts?include=all \
  -H "Authorization: Bearer your-api-key"
```

### Response Format

**Success (200/201):**
```json
{
  "data": {
    "id": "abc123xyz",
    "title": "Blog Post Title",
    "content": "Full blog content...",
    "createdAt": "2026-09-28T10:00:00Z",
    "publishedAt": "2026-09-28T11:00:00Z",
    "approvedAt": "2026-09-28T11:00:00Z",
    "rejectedAt": null
  }
}
```

**Error (403/404/500):**
```json
{
  "message": "Error description"
}
```

---

## 📚 API Documentation (Swagger/OpenAPI)

**Interactive API documentation available at:**

- **UI**: `http://localhost:8080/api/docs` — Swagger UI with "Try it out" functionality
- **JSON Schema**: `http://localhost:8080/api/docs/json` — OpenAPI 3.0 JSON for tools/LLMs

The Swagger UI allows you to:
- ✅ Browse all endpoints with detailed descriptions
- ✅ View request/response schemas
- ✅ Test endpoints directly from the browser
- ✅ See authentication requirements
- ✅ Review error responses

The JSON schema can be used with:
- 📋 Documentation generators
- 🤖 LLMs/AI agents for API integration
- 🔧 Code generation tools
- 📱 API client generators

---

## 🔐 Authentication

All admin endpoints require an API key in the Authorization header:

```bash
Authorization: Bearer your-api-key-here
```

**Set your API key** in `.env.local`:
```
API_KEY=my-super-secret-key
```

**Responses:**
- `200/201` — Success
- `403 Forbidden` — Invalid or missing API key
- `404 Not Found` — Post doesn't exist or not accessible
- `500 Internal Server Error` — Server error

---

## 💾 Database

**Engine:** PostgreSQL 16 (Docker Compose)

**Start/Stop:**
```bash
npm run infra:up      # Start PostgreSQL
npm run infra:down    # Stop PostgreSQL

npm run migrate:up    # Apply migrations
npm run migrate:down  # Rollback migrations
```

**Post States:**
- **Draft**: Created, waiting for approval
- **Approved**: Published and visible to public
- **Rejected**: Rejected by editor, hidden from public

---

## 🐳 Docker & Deployment

**Build Docker image:**
```bash
npm run build
# Creates: blog-api (626MB uncompressed, 111MB gzipped)
```

**Run container:**
```bash
docker run -p 8080:8080 \
  -e API_KEY=your-secret-key \
  -e API_HOST=0.0.0.0 \
  -e DB_HOST=host.docker.internal \
  blog-api
```

---

## 🛠️ Development

**Code Quality:**
```bash
npm run lint          # Check code
npm run lint:fix      # Auto-fix issues
npm run format        # Format code
npm run format:check  # Check formatting
```

**Automatic Git Hooks:**
- `pre-commit`: Runs lint + format on staged files
- `commit-msg`: Validates commit message (Conventional Commits)

**All commits should follow:**
```
feat: add new feature
fix: bug fix
docs: documentation
refactor: code refactor
```

---

## 🌳 Project Structure

```
src/
├── index.js                    # Server & routing
├── routes/post-routes.js       # Endpoint handlers
├── services/create-post-draft.js  # AI generation (Mastra)
├── repositories/post-repository.js  # Database queries
├── database/pool.js            # PostgreSQL connection
└── utils/
    ├── router.js               # Custom router
    ├── read-json-body.js       # JSON parsing
    └── auth.js                 # API key validation

migrations/
├── 001.do.sql                  # Create schema
└── 001.undo.sql                # Drop schema
```

---

## 🔍 Troubleshooting

**PostgreSQL won't connect:**
```bash
docker ps | grep blog-postgres
docker compose logs postgres
docker compose restart postgres
```

**Port 8080 already in use:**
```bash
lsof -i :8080
kill -9 <PID>
```

**Migration errors:**
```bash
npm run migrate:down  # Rollback all
npm run migrate:up    # Reapply
```

**API returns 500 errors:**
- Check `.env.local` exists and has correct DB credentials
- Check PostgreSQL container is running (`docker ps`)
- Check API key is set if using admin endpoints

---

## 📦 Stack

- **Runtime:** Node.js 22 LTS
- **Framework:** Node.js `http` module (no dependencies)
- **Database:** PostgreSQL 16
- **AI:** Mastra (Claude/Anthropic)
- **Validation:** Zod
- **IDs:** Nanoid
- **Linting:** ESLint v10, Prettier
- **Git Hooks:** Lefthook, lint-staged
- **Container:** Docker

---

## 📄 License

ISC License

---

## 🔗 Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Mastra AI Framework](https://mastra.ai/)
- [Docker Documentation](https://docs.docker.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
