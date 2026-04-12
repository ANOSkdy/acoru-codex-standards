import { jsonError } from "@/lib/http";
import { hasDatabaseUrl, query } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasDatabaseUrl()) {
    return jsonError("MISSING_DATABASE_URL", "Database is not configured.", 503);
  }

  try {
    await query("SELECT 1");
    return NextResponse.json({ ok: true, db: true });
  } catch {
    return jsonError("DATABASE_UNAVAILABLE", "Database is unavailable.", 503);
  }
}
