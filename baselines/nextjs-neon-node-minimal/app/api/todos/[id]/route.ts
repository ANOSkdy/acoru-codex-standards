import { hasDatabaseUrl, query } from "@/lib/db";
import { jsonError, jsonOk, safeReadJson } from "@/lib/http";
import { patchTodoSchema, todoIdSchema } from "@/lib/validators/todos";

type TodoRow = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

type TodoRouteContext = {
  params: Promise<{ id: string }>;
};

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: TodoRouteContext,
) {
  if (!hasDatabaseUrl()) {
    return jsonError("MISSING_DATABASE_URL", "Database is not configured.", 503);
  }

  const { id } = await params;
  const idParse = todoIdSchema.safeParse(id);

  if (!idParse.success) {
    return jsonError("INVALID_ID", "Invalid todo id.", 400);
  }

  const body = await safeReadJson(request);

  if (!body.ok) {
    return jsonError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const parseResult = patchTodoSchema.safeParse(body.data);

  if (!parseResult.success) {
    return jsonError("INVALID_BODY", "Invalid todo update payload.", 400);
  }

  const title = parseResult.data.title ?? null;
  const completed = parseResult.data.completed ?? null;

  try {
    const result = await query<TodoRow>(
      `
        UPDATE todos
        SET
          title = COALESCE($2, title),
          completed = COALESCE($3, completed)
        WHERE id = $1
        RETURNING id, title, completed, created_at
      `,
      [idParse.data, title, completed],
    );

    if ((result.rowCount ?? 0) === 0) {
      return jsonError("NOT_FOUND", "Todo was not found.", 404);
    }

    return jsonOk(result.rows[0]);
  } catch {
    return jsonError("DATABASE_UNAVAILABLE", "Could not update todo.", 503);
  }
}

export async function DELETE(
  _request: Request,
  { params }: TodoRouteContext,
) {
  if (!hasDatabaseUrl()) {
    return jsonError("MISSING_DATABASE_URL", "Database is not configured.", 503);
  }

  const { id } = await params;
  const idParse = todoIdSchema.safeParse(id);

  if (!idParse.success) {
    return jsonError("INVALID_ID", "Invalid todo id.", 400);
  }

  try {
    const result = await query(
      `
        DELETE FROM todos
        WHERE id = $1
      `,
      [idParse.data],
    );

    if ((result.rowCount ?? 0) === 0) {
      return jsonError("NOT_FOUND", "Todo was not found.", 404);
    }

    return jsonOk({ deleted: true });
  } catch {
    return jsonError("DATABASE_UNAVAILABLE", "Could not delete todo.", 503);
  }
}
