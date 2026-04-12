import { query, hasDatabaseUrl } from "@/lib/db";
import { jsonError, jsonOk, safeReadJson } from "@/lib/http";
import {
  createTodoSchema,
  todoListQuerySchema,
} from "@/lib/validators/todos";

type TodoRow = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!hasDatabaseUrl()) {
    return jsonError("MISSING_DATABASE_URL", "Database is not configured.", 503);
  }

  const url = new URL(request.url);
  const parseResult = todoListQuerySchema.safeParse({
    limit: url.searchParams.get("limit") ?? undefined,
  });

  if (!parseResult.success) {
    return jsonError("INVALID_QUERY", "Invalid query string.", 400);
  }

  try {
    const result = await query<TodoRow>(
      `
        SELECT id, title, completed, created_at
        FROM todos
        ORDER BY created_at DESC
        LIMIT $1
      `,
      [parseResult.data.limit],
    );

    return jsonOk({ items: result.rows });
  } catch {
    return jsonError("DATABASE_UNAVAILABLE", "Could not load todos.", 503);
  }
}

export async function POST(request: Request) {
  if (!hasDatabaseUrl()) {
    return jsonError("MISSING_DATABASE_URL", "Database is not configured.", 503);
  }

  const body = await safeReadJson(request);

  if (!body.ok) {
    return jsonError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const parseResult = createTodoSchema.safeParse(body.data);

  if (!parseResult.success) {
    return jsonError("INVALID_BODY", "Title is required.", 400);
  }

  try {
    const result = await query<TodoRow>(
      `
        INSERT INTO todos (title)
        VALUES ($1)
        RETURNING id, title, completed, created_at
      `,
      [parseResult.data.title],
    );

    return jsonOk(result.rows[0], { status: 201 });
  } catch {
    return jsonError("DATABASE_UNAVAILABLE", "Could not create todo.", 503);
  }
}
