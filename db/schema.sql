-- Run this once in Neon → SQL Editor (or: npm run db:setup)

CREATE TABLE IF NOT EXISTS applications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  program       TEXT,
  plan          TEXT NOT NULL,
  billing       TEXT NOT NULL CHECK (billing IN ('monthly', 'yearly')),
  price_monthly INTEGER NOT NULL,
  goals         TEXT,
  status        TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'accepted', 'rejected')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS applications_email_idx ON applications (email);
CREATE INDEX IF NOT EXISTS applications_created_at_idx ON applications (created_at DESC);

CREATE TABLE IF NOT EXISTS subscribers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
