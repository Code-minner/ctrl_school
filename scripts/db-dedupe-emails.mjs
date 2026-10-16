import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { neon } from "@neondatabase/serverless";

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
  if (process.env.ALLOW_INSECURE_TLS === "1") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("Missing DATABASE_URL");
    process.exit(1);
  }

  const sql = neon(url);

  // Keep the earliest application per email, delete later duplicates
  const deleted = await sql`
    DELETE FROM applications a
    USING applications b
    WHERE lower(a.email) = lower(b.email)
      AND a.created_at > b.created_at
    RETURNING a.id
  `;
  console.log(`Removed ${deleted.length} duplicate application(s).`);

  // Also catch same timestamp duplicates by id
  const deletedSameTime = await sql`
    DELETE FROM applications a
    USING applications b
    WHERE lower(a.email) = lower(b.email)
      AND a.id > b.id
    RETURNING a.id
  `;
  console.log(`Removed ${deletedSameTime.length} extra same-time duplicate(s).`);

  try {
    await sql`
      ALTER TABLE applications
      ADD CONSTRAINT applications_email_unique UNIQUE (email)
    `;
    console.log("OK: unique email constraint added.");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/already exists/i.test(msg)) {
      console.log("OK: unique email constraint already exists.");
    } else {
      throw err;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
