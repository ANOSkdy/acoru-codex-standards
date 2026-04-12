# MIGRATION_RUNNER_BASELINE

## 目的
初回基盤で migration 実行を明示的・安全・再実行可能にします。

## 標準形
- `scripts/migrate.mjs`
- Node 実行
- `@next/env` で `.env*` をロード
- `migrations/` ディレクトリを読む
- `schema_migrations` を作る
- lexicographic order で適用する
- filename を記録する
- each migration を transaction で包む
- multiple run に安全
- install/build hook では実行しない

## `db:migrate` script
`package.json` では次を使う。

```json
{
  "scripts": {
    "db:migrate": "node scripts/migrate.mjs"
  }
}
```

TypeScript runner を使う場合は `tsx` など必要な runner を明示追加する。  
runner を入れずに `.ts` migration script を置くのは禁止。

## 初期schema
baseline の初期schemaは `todos` テーブルを含める。

- `id`
- `title`
- `completed`
- `created_at`

sensible Postgres defaults を使う。

## 禁止事項
- install / build / postinstall で migration を自動実行する
- schema change を docs だけで済ませる
- applied history を残さない
- transaction なしで複数 migration を雑に流す
