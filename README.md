# Blog API with AI-Powered Content Generation

A modern, scalable Node.js REST API for managing blog posts with AI-powered content generation. Built with PostgreSQL persistence, Docker containerization, and production-ready developer tooling.

**Author:** Jady Rufino

## 🎯 Project Overview

This API provides a complete workflow for creating, managing, and publishing blog posts:
1. **Draft Creation**: Generate post drafts using AI (Mastra framework)
2. **Approval Workflow**: Approve or reject posts before publication
3. **Public Access**: Serve published and approved posts to readers
4. **Secure Management**: API key authentication for admin operations

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Applications                      │
│  (Blog Readers, Admin Dashboard, Mobile Apps)                   │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                      Node.js API Server                          │
│  (http.createServer + Custom Router)                            │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Route Handlers (src/routes)                 │  │
│  │  • GET  /posts              (public/admin)              │  │
│  │  • GET  /posts/:id          (public)                    │  │
│  │  • POST /posts/draft        (admin + AI)                │  │
│  │  • PATCH /posts/:id/approve (admin)                     │  │
│  │  • DELETE /posts/:id/reject (admin)                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Service & Repository Layer                     │  │
│  │  • createPostDraft (AI generation via Mastra)           │  │
│  │  • Post Repository (CRUD operations)                    │  │
│  │  • Authentication (API Key validation)                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────┬─────────────────────────┬──────────────────────┘
                 │                         │
        ┌────────▼─────────┐      ┌────────▼──────────────┐
        │   PostgreSQL DB  │      │  Mastra AI Service   │
        │   (Docker)       │      │  (LLM Integration)   │
        │                  │      │                      │
        │ • posts table    │      │ • Claude API         │
        │ • migrations     │      │ • Prompt Engineering │
        │ • Connection     │      │                      │
        │   Pool           │      │ (currently disabled) │
        └──────────────────┘      └──────────────────────┘
```

### Directory Structure

```
blog-ia/
├── src/
│   ├── index.js                    # Server entry point
│   ├── routes/
│   │   └── post-routes.js          # API route handlers
│   ├── services/
│   │   └── create-post-draft.js    # AI content generation
│   ├── repositories/
│   │   └── post-repository.js      # Database operations
│   ├── database/
│   │   └── pool.js                 # PostgreSQL connection pool
│   └── utils/
│       ├── router.js               # Minimal router implementation
│       ├── read-json-body.js       # JSON body parser
│       └── auth.js                 # API key validation
├── migrations/
│   ├── 001.do.sql                  # Schema creation
│   └── 001.undo.sql                # Schema rollback
├── Dockerfile                      # Multi-stage Docker build
├── docker-compose.yml              # PostgreSQL + API orchestration
├── eslint.config.js                # Modern ESLint configuration
├── .prettierrc                      # Code formatting rules
├── .lefthook.yml                   # Git hooks configuration
├── .nvmrc                          # Node.js version (22)
└── package.json                    # Dependencies & scripts
```

---

## 📊 Post Workflow State Diagram

```
                    ┌─────────────┐
                    │   NEW IDEA  │
                    └──────┬──────┘
                           │
                    (POST /posts/draft)
                    Generate with AI
                           │
                           ▼
                    ┌─────────────────┐
                    │  DRAFT STATUS   │
                    │ publishedAt: ❌  │
                    │ approvedAt: ❌   │
                    │ rejectedAt: ❌   │
                    └────┬────────┬───┘
                    ┌────┴─┐  ┌──┴─────┐
                    │      │  │        │
         (PATCH approve) │  │(DELETE reject)
                    │      │  │        │
                    ▼      │  ▼        ▼
              ┌──────────┐ │ ┌──────────────┐
              │ APPROVED │ │ │   REJECTED   │
              │          │ │ │              │
              │publish:✅ │ │ │publish:❌   │
              │ approved:✅  │ approved:❌   │
              └──────────┘   └──────────────┘
                    │
              (visible in public
               GET /posts)
```

### Post Entity Schema

```sql
CREATE TABLE posts (
  id VARCHAR(21) PRIMARY KEY,           -- Nanoid
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  publishedAt TIMESTAMP,                -- Set on approval
  approvedAt TIMESTAMP,                 -- Admin approval
  rejectedAt TIMESTAMP,                 -- Admin rejection
  CONSTRAINT check_state CHECK (
    (publishedAt IS NULL AND approvedAt IS NULL AND rejectedAt IS NULL) OR  -- Draft
    (publishedAt IS NOT NULL AND approvedAt IS NOT NULL)                      -- Approved
  )
);
```

---

## 🔧 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js 22 LTS (Krypton) | JavaScript execution |
| **Framework** | Node.js `http` module | Minimal HTTP server |
| **Database** | PostgreSQL 16 | Persistent data storage |
| **Database Driver** | `pg` + `postgres` | Connection management & migrations |
| **AI Framework** | Mastra | LLM integration & prompt engineering |
| **Code Quality** | ESLint v10, Prettier | Linting & formatting |
| **Git Hooks** | Lefthook, lint-staged | Pre-commit validation |
| **Containerization** | Docker & Docker Compose | Application & infrastructure |
| **Validation** | Zod | Type-safe schema validation |
| **ID Generation** | Nanoid | Collision-resistant IDs |

---

## 📋 Prerequisites

- **Node.js**: v22 LTS or higher (checked via `.nvmrc`)
  ```bash
  node --version  # Should be >= 22.0.0
  ```
- **npm**: v10+ (comes with Node.js)
- **Docker**: For containerized database (via Colima on macOS Bayer)
  ```bash
  colima start  # Start Docker daemon (macOS)
  docker --version
  ```
- **PostgreSQL CLI**: For migrations
  ```bash
  npm run migrate:up  # Requires `postgres` in PATH
  ```

### Environment Variables

Create `.env.local` (copy from `.env.example`):

```bash
# API Server
API_HOST=localhost
API_PORT=8080
API_PROTOCOL=http

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog
DB_USER=postgres
DB_PASSWORD=postgres

# Authentication
API_KEY=your-secret-api-key-here

# AI Service (currently disabled)
# ANTHROPIC_API_KEY=sk-ant-...
```

---

## 🚀 Getting Started

### Option 1: Local Development (Recommended)

```bash
# Clone repository
git clone <repo-url>
cd blog-ia

# Install dependencies
npm ci

# One-command setup (env + docker + migrations)
npm run local:setup

# Start development server (auto-reloads on file changes)
npm run dev
# Output: Server running on http://localhost:8080
```

### Option 2: Manual Setup

```bash
# Copy environment file
cp .env.example .env.local

# Start PostgreSQL in Docker
docker compose up --detach

# Run database migrations
npm run migrate:up

# Install dependencies
npm ci

# Start server
npm run dev
```

### Option 3: Docker Container (Production-like)

```bash
# Build Docker image
npm run build

# Run container with PostgreSQL
docker run -p 8080:8080 \
  -e API_KEY=your-secret-key \
  -e API_HOST=0.0.0.0 \
  --add-host=host.docker.internal:host-gateway \
  blog-api

# API available at http://localhost:8080
```

---

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start server with auto-reload (nodemon-like)

# Database
npm run infra:up         # Start PostgreSQL in Docker
npm run infra:down       # Stop PostgreSQL container
npm run migrate:up       # Apply pending migrations
npm run migrate:down     # Rollback all migrations (zero)
npm run local:setup      # One-command: env + infra + migrations

# Code Quality
npm run lint             # Check code with ESLint
npm run lint:fix         # Auto-fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check formatting (CI mode)

# Build & Deployment
npm run build            # Build Docker image (tag: blog-api)

# Git Hooks
npm run prepare          # Install git hooks (auto-run on npm install)
```

---

## 🔌 API Endpoints

### 1. List Posts

**Public endpoint** — returns only published & approved posts.

```http
GET /posts
Content-Type: application/json
```

**Request:**
```bash
curl http://localhost:8080/posts
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "abc123xyz",
      "title": "How to Build Node.js APIs",
      "content": "This is a comprehensive guide...",
      "createdAt": "2026-09-28T10:00:00Z",
      "publishedAt": "2026-09-28T11:00:00Z",
      "approvedAt": "2026-09-28T11:00:00Z",
      "rejectedAt": null
    }
  ]
}
```

---

### 2. Get Single Post

**Public endpoint** — only published posts are accessible.

```http
GET /posts/:id
Content-Type: application/json
```

**Request:**
```bash
curl http://localhost:8080/posts/abc123xyz
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "abc123xyz",
    "title": "How to Build Node.js APIs",
    "content": "This is a comprehensive guide...",
    "createdAt": "2026-09-28T10:00:00Z",
    "publishedAt": "2026-09-28T11:00:00Z",
    "approvedAt": "2026-09-28T11:00:00Z",
    "rejectedAt": null
  }
}
```

**Response (404 Not Found):**
```json
{
  "message": "Not found"
}
```
*Triggered when: post doesn't exist, is still a draft, or is rejected.*

---

### 3. Create Post Draft (AI-Generated)

**Admin endpoint** — requires authentication. Generates content using Mastra/Claude.

```http
POST /posts/draft
Content-Type: application/json
Authorization: Bearer your-api-key

{
  "idea": "A deep dive into Docker optimization"
}
```

**Request:**
```bash
curl -X POST http://localhost:8080/posts/draft \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{"idea": "Docker optimization techniques"}'
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "new123id",
    "title": "Docker Optimization Best Practices",
    "content": "Docker containers are lightweight...",
    "createdAt": "2026-09-28T12:00:00Z",
    "publishedAt": null,
    "approvedAt": null,
    "rejectedAt": null
  }
}
```

**Response (500 Internal Server Error):**
```json
{
  "message": "API key not configured or LLM service unavailable"
}
```

---

### 4. Approve Post

**Admin endpoint** — publishes the post for public viewing.

```http
PATCH /posts/:id/approve
Content-Type: application/json
Authorization: Bearer your-api-key
```

**Request:**
```bash
curl -X PATCH http://localhost:8080/posts/abc123xyz/approve \
  -H "Authorization: Bearer your-api-key"
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "abc123xyz",
    "title": "Docker Optimization Best Practices",
    "content": "Docker containers are lightweight...",
    "createdAt": "2026-09-28T12:00:00Z",
    "publishedAt": "2026-09-28T13:00:00Z",
    "approvedAt": "2026-09-28T13:00:00Z",
    "rejectedAt": null
  }
}
```

---

### 5. Reject Post

**Admin endpoint** — marks post as rejected and removes publication status.

```http
DELETE /posts/:id/reject
Content-Type: application/json
Authorization: Bearer your-api-key
```

**Request:**
```bash
curl -X DELETE http://localhost:8080/posts/abc123xyz/reject \
  -H "Authorization: Bearer your-api-key"
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "abc123xyz",
    "title": "Docker Optimization Best Practices",
    "content": "Docker containers are lightweight...",
    "createdAt": "2026-09-28T12:00:00Z",
    "publishedAt": null,
    "approvedAt": null,
    "rejectedAt": "2026-09-28T13:05:00Z"
  }
}
```

---

### 6. List All Posts (Admin)

**Protected endpoint** — returns all posts including drafts and rejected.

```http
GET /posts?include=all
Content-Type: application/json
Authorization: Bearer your-api-key
```

**Request:**
```bash
curl http://localhost:8080/posts?include=all \
  -H "Authorization: Bearer your-api-key"
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "abc123xyz",
      "title": "Published Post",
      "content": "...",
      "createdAt": "2026-09-28T10:00:00Z",
      "publishedAt": "2026-09-28T11:00:00Z",
      "approvedAt": "2026-09-28T11:00:00Z",
      "rejectedAt": null
    },
    {
      "id": "draft456",
      "title": "Unpublished Draft",
      "content": "...",
      "createdAt": "2026-09-28T12:00:00Z",
      "publishedAt": null,
      "approvedAt": null,
      "rejectedAt": null
    }
  ]
}
```

**Response (403 Forbidden):**
```json
{
  "message": "Forbidden"
}
```
*Triggered when: `Authorization` header missing or API key invalid.*

---

## 🔐 Authentication

### API Key-Based Authentication

All admin endpoints require an API key in the `Authorization` header using Bearer token format:

```bash
Authorization: Bearer your-api-key-here
```

**Validation Logic:**
- Header must be: `Authorization: Bearer <key>`
- Key is validated using `crypto.timingSafeEqual()` (constant-time comparison)
- Prevents timing attacks on key validation
- Invalid key returns `403 Forbidden`

**Setting Your API Key:**

```bash
# In .env.local
API_KEY=my-super-secret-key-32-chars-long

# Usage
curl -H "Authorization: Bearer my-super-secret-key-32-chars-long" \
  http://localhost:8080/posts?include=all
```

### Protected Routes

| Endpoint | Method | Protection |
|----------|--------|-----------|
| `GET /posts?include=all` | GET | ✅ Requires API key |
| `POST /posts/draft` | POST | ✅ Requires API key |
| `PATCH /posts/:id/approve` | PATCH | ✅ Requires API key |
| `DELETE /posts/:id/reject` | DELETE | ✅ Requires API key |
| `GET /posts` | GET | ❌ Public (no auth) |
| `GET /posts/:id` | GET | ❌ Public (no auth) |

---

## 💾 Database

### PostgreSQL Connection

- **Engine**: PostgreSQL 16
- **Container**: Managed via Docker Compose
- **Connection Pool**: pg library with configurable pool size
- **Migrations**: SQL-based versioning via `postgres` CLI

### Migration Management

**Up (Apply migrations):**
```bash
npm run migrate:up
# Runs: postgres migrate up
# Executes: migrations/001.do.sql
```

**Down (Rollback):**
```bash
npm run migrate:down
# Runs: postgres migrate zero
# Removes all migrations
```

### Schema

```sql
-- Table: posts
CREATE TABLE posts (
  id VARCHAR(21) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  publishedAt TIMESTAMP,
  approvedAt TIMESTAMP,
  rejectedAt TIMESTAMP,
  CONSTRAINT check_state CHECK (
    -- Either draft (no timestamps) or published (both timestamps set)
    (publishedAt IS NULL AND approvedAt IS NULL AND rejectedAt IS NULL) OR
    (publishedAt IS NOT NULL AND approvedAt IS NOT NULL)
  )
);

-- Indexes for common queries
CREATE INDEX idx_posts_published ON posts(publishedAt) WHERE publishedAt IS NOT NULL;
CREATE INDEX idx_posts_approved ON posts(approvedAt) WHERE approvedAt IS NOT NULL;
```

### Database Connection Pool Configuration

```javascript
// src/database/pool.js
new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,                    // Max connections in pool
  idleTimeoutMillis: 30000,   // 30s idle before close
  connectionTimeoutMillis: 2000
})
```

---

## 🐳 Docker & Deployment

### Docker Compose (Development)

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16
    container_name: blog-postgres
    environment:
      POSTGRES_DB: blog
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### Multi-Stage Dockerfile (Production)

```dockerfile
# Stage 1: Dependencies
FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

# Stage 2: Runner
FROM node:22-alpine
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY src ./src
COPY migrations ./migrations
COPY .env.example ./.env

# Security: Don't run as root
USER app

EXPOSE 8080
CMD ["node", "--env-file=.env", "src/index.js"]
```

**Build & Run:**
```bash
# Build image
npm run build
# Creates: blog-api (626MB uncompressed, 111MB gzipped)

# Run container
docker run -p 8080:8080 \
  -e API_KEY=my-secret-key \
  -e API_HOST=0.0.0.0 \
  -e DB_HOST=host.docker.internal \
  blog-api
```

---

## ✅ Code Quality & Development Tools

### ESLint (v10 - Modern Flat Config)

```javascript
// eslint.config.js
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      semi: ['error', 'never'],
      quotes: ['error', 'single']
    }
  }
]
```

**Commands:**
```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix fixable issues
```

### Prettier (Code Formatter)

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2
}
```

**Commands:**
```bash
npm run format        # Format all files
npm run format:check  # Check formatting (CI mode)
```

### Lefthook (Git Hooks)

Automatically runs on git events:

```yaml
# .lefthook.yml
pre-commit:
  commands:
    lint-staged:
      run: npx lint-staged

commit-msg:
  commands:
    commitlint:
      run: npx commitlint --edit $1
```

**Workflow:**
```bash
git add .
# ↓ Automatically runs eslint + prettier on staged files
git commit -m "feat: add new endpoint"
# ↓ Automatically validates commit message (Conventional Commits)
# ✅ Commit succeeds
```

### Conventional Commits

Enforced via commitlint + @commitlint/config-conventional:

```bash
# Valid commit messages
git commit -m "feat: add post approval workflow"
git commit -m "fix: correct pagination logic"
git commit -m "refactor: simplify router implementation"
git commit -m "docs: update API documentation"
git commit -m "chore: upgrade dependencies"

# Invalid (will be rejected)
git commit -m "Update code"  # ❌ Missing type
git commit -m "Add stuff"    # ❌ Vague message
```

---

## 🔍 Router Implementation

### Custom Minimal Router

The API uses a lightweight, dependency-free router built in `src/utils/router.js`:

```javascript
// Register routes
const router = createRouter()

router.get('/posts', handler)
router.post('/posts/draft', handler)
router.patch('/posts/:id/approve', handler)
router.delete('/posts/:id/reject', handler)

// Dispatch requests
router.dispatch(pathname, method, req, res)
```

**Route Matching:**
- Exact path matching: `/posts`
- Parameterized paths: `/posts/:id` → extracts `params.id`
- Dynamic regex extraction for flexibility
- No external routing library (minimal dependencies)

---

## 📝 Logging & Error Handling

### Error Responses

All endpoints return consistent error format:

```json
{
  "message": "Error description"
}
```

**HTTP Status Codes:**
- `200 OK` — Successful GET, PATCH, DELETE
- `201 Created` — Successful POST
- `403 Forbidden` — Invalid API key
- `404 Not Found` — Post not found or inaccessible
- `500 Internal Server Error` — Server-side error

### Console Logging

```bash
# Development mode
npm run dev
# Output:
# Server running on http://localhost:8080
# Press Ctrl+C to stop
```

---

## 🚢 Deployment Checklist

- [ ] Set `API_KEY` environment variable (strong, random key)
- [ ] Configure `DB_*` environment variables for production database
- [ ] Build Docker image: `npm run build`
- [ ] Run migrations on production database
- [ ] Test all endpoints against production database
- [ ] Set `API_HOST=0.0.0.0` in Docker environment
- [ ] Use `host.docker.internal` for database accessed from Docker container
- [ ] Enable HTTPS/TLS at reverse proxy (nginx, CloudFlare, etc.)
- [ ] Set up log aggregation (CloudWatch, Datadog, etc.)
- [ ] Monitor database connection pool metrics

---

## 🤝 Contributing

### Code Style

All code is automatically formatted and linted before commit:

```bash
# Pre-commit hook catches issues
git add .
git commit -m "feat: implement new feature"
# ✅ Lint passes, formatting verified
```

### Git Workflow

1. Create feature branch: `git checkout -b feat/my-feature`
2. Make changes (auto-formatted by pre-commit hook)
3. Commit with conventional message: `git commit -m "feat: description"`
4. Push and create PR

---

## 📦 Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| `pg` | 8.23.0 | PostgreSQL client driver |
| `postgres` | 3.4.9 | Migration CLI tool |
| `@mastra/core` | 0.24.9 | AI framework (Claude integration) |
| `nanoid` | 5.1.16 | Unique ID generation |
| `zod` | 3.25.76 | Schema validation |

**Dev Dependencies:**
- `eslint` (v10) + `@eslint/js` — Code linting
- `prettier` (v3.9.9) — Code formatting
- `commitlint` + `@commitlint/config-conventional` — Commit validation
- `lefthook` (v2.1.14) — Git hooks manager
- `lint-staged` (v16.4.0) — Pre-commit linting

---

## 🐛 Troubleshooting

### PostgreSQL Won't Connect

```bash
# Check if container is running
docker ps | grep blog-postgres

# View logs
docker compose logs postgres

# Restart
docker compose restart postgres
npm run migrate:up
```

### Port Already in Use

```bash
# Find process using port 8080
lsof -i :8080

# Kill process (if needed)
kill -9 <PID>
```

### Migration Errors

```bash
# Rollback all
npm run migrate:down

# Check migration files
ls migrations/

# Reapply
npm run migrate:up
```

### Docker on macOS (Bayer)

```bash
# Start Colima (Docker alternative for M1/Intel Macs)
colima start

# Verify Docker is running
docker ps

# Stop when done
colima stop
```

---

## 📄 License

ISC License — See LICENSE file for details.

---

## 🔗 Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Mastra AI Framework](https://mastra.ai/)
- [Docker Documentation](https://docs.docker.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)
