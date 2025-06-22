-- /migrations/001_init.sql
-- Videos table
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Schedules table
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  post_time TIMESTAMP NOT NULL
);

-- Auth tokens table
CREATE TABLE oauth_tokens (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  platform TEXT CHECK (platform IN ('youtube', 'tiktok')),
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP
);