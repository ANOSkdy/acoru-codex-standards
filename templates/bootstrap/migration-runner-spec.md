# Migration runner spec

## `scripts/migrate.mjs`
- `@next/env` で env load
- `schema_migrations` を作成
- `migrations/` の `.sql` を lexicographic order で読む
- filename 単位で適用済みを記録
- each migration transactionally
- safe to run multiple times

## 初期 migration
- `0001_init_todos.sql`
- `todos` table:
  - `id`
  - `title`
  - `completed`
  - `created_at`

## 禁止
- install/build hook で自動実行
- migration history 不在
- `.ts` runner を追加依存なしで置くこと
