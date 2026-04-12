# INITIAL_FILESET_RULES

## 目的
空repo bootstrap 時に、必要ファイルの抜け漏れを防ぎます。

## 必須 fileset
最低限、次を明示的に作成する。

- `package.json`
- `.gitignore`
- `.env.example`
- `.nvmrc`
- `tsconfig.json`
- `next-env.d.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `app/api/health/db/route.ts`
- `app/api/todos/route.ts`
- `app/api/todos/[id]/route.ts`
- `lib/db.ts`
- `lib/http.ts`
- `lib/validators/todos.ts`
- `migrations/0001_init_todos.sql`
- `scripts/migrate.mjs`

## 条件付き fileset
- `next.config.*`: 必要な場合のみ
- `pnpm-lock.yaml`: target repo で生成して commit する
- `README.md`: PJ側で別途追加推奨
- `AGENT.md`, `PROJECT_RULES.md`, `docs/...`: baseline copy 後に project docs として追加

## 禁止事項
- `package-lock.json` を置く
- `yarn.lock` を置く
- `pnpm-lock.yaml` を手書きする
- `lib/db.ts` なしに route へ DB接続ロジックを散らす
- `scripts/migrate.mjs` なしに migration を build hook へ埋め込む
