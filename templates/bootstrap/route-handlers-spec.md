# Route handlers spec

## 必須 route
- `GET /api/health/db`
- `GET /api/todos`
- `POST /api/todos`
- `PATCH /api/todos/[id]`
- `DELETE /api/todos/[id]`

## 共通要件
- DB route は `runtime = 'nodejs'`
- DB-backed GET route は `dynamic = 'force-dynamic'`
- `zod` で validate
- parameterized SQL only
- structured JSON errors
- missing env / invalid input / not found を graceful に返す

## path params
dynamic route second argument:
`{ params: Promise<{ id: string }> }`

## `rowCount`
更新 / 削除成功判定は:
`(result.rowCount ?? 0) > 0`
