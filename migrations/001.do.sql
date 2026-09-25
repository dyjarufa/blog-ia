CREATE TABLE IF NOT EXISTS posts (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMP,
  approved_at TIMESTAMP,
  rejected_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
