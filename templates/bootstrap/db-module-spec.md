# DB module spec

## `lib/db.ts`
- `import "server-only"`
- `pg.Pool` は lazy singleton
- `getDatabaseUrl()` は `DATABASE_URL ?? NEON_DATABASE_URL ?? null`
- query helper signature:
  `export async function query<T extends QueryResultRow>(text: string, params?: unknown[]): Promise<QueryResult<T>>`
- module import 時に throw しない
- helper:
  - `hasDatabaseUrl()`
  - optional `closePool()`

## route の使い方
- missing env は route handler 側で 503 を返す
- route で validate → query/repository → response shaping
- secret / raw SQL detail は返さない
