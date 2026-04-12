import { NextResponse } from "next/server";

type JsonErrorBody = {
  ok: false;
  error: {
    code: string;
    message: string;
  };
};

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(
    {
      ok: true,
      data,
    },
    init,
  );
}

export function jsonError(
  code: string,
  message: string,
  status: number,
  init?: ResponseInit,
) {
  const body: JsonErrorBody = {
    ok: false,
    error: {
      code,
      message,
    },
  };

  return NextResponse.json(body, {
    status,
    ...init,
  });
}

export async function safeReadJson(
  request: Request,
): Promise<{ ok: true; data: unknown } | { ok: false }> {
  try {
    const data = await request.json();
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}
