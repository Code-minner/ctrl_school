import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { neon } from "@neondatabase/serverless";

// Local Windows SSL inspection often breaks Neon; allow override after env load.
function allowInsecureTlsIfNeeded() {
  if (process.env.ALLOW_INSECURE_TLS === "1") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.warn("ALLOW_INSECURE_TLS=1 — TLS verification disabled for this run.");
  }
}

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnvLocal();
  allowInsecureTlsIfNeeded();
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("Missing DATABASE_URL. Copy .env.example → .env.local and paste your Neon connection string.");
    process.exit(1);
  }

  const sql = neon(url);

  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name     TEXT NOT NULL,
      email         TEXT NOT NULL,
      program       TEXT,
      plan          TEXT NOT NULL,
      billing       TEXT NOT NULL CHECK (billing IN ('monthly', 'yearly')),
      price_monthly INTEGER NOT NULL,
      goals         TEXT,
      status        TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'accepted', 'rejected')),
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log("OK: applications table");

  await sql`CREATE INDEX IF NOT EXISTS applications_created_at_idx ON applications (created_at DESC)`;
  console.log("OK: applications indexes");

  // Enforce one application per email (safe if constraint already exists)
  try {
    await sql`
      ALTER TABLE applications
      ADD CONSTRAINT applications_email_unique UNIQUE (email)
    `;
    console.log("OK: unique email constraint");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/already exists|duplicate key/i.test(msg)) {
      console.log("OK: unique email constraint (already present or cleanup needed)");
    } else if (/duplicate key value/i.test(msg)) {
      console.error("Cannot add unique email: duplicate emails already exist. Delete extras in Neon, then re-run.");
      throw err;
    } else {
      console.log("Note:", msg);
    }
  }

  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email      TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log("OK: subscribers table");
  console.log("Schema applied successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
