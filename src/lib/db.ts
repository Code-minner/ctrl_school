import { neon } from "@neondatabase/serverless";

// Some Windows setups (antivirus SSL inspection) break Neon TLS locally.
if (process.env.ALLOW_INSECURE_TLS === "1") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing DATABASE_URL. Add it to .env.local (see .env.example).");
  }
  return url;
}

/** Tagged-template SQL helper for Neon. */
export function sql() {
  return neon(getDatabaseUrl());
}

export type ApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  program: string | null;
  plan: string;
  billing: string;
  price_monthly: number;
  goals: string | null;
  status: string;
  created_at: string;
};
