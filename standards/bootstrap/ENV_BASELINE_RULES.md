# ENV_BASELINE_RULES

## 目的
env / secret の扱いを初回基盤から固定し、client 漏洩や build failure を防ぎます。

## DB env
- primary: `DATABASE_URL`
- fallback: `NEON_DATABASE_URL`
- DB code は server-only に限定する
- client component から DB env を参照しない

## 必須ファイル
- `.env.example` を commit する
- `.gitignore` で real env files を除外する
- `.env.example` は除外しない

## 禁止事項
- `NEXT_PUBLIC_*` で DB や AI secret を渡す
- `next.config` の `env` に secret を注入する
- client props に secret を流す
- logs に secret を出す
- missing env で import time に throw する

## standalone scripts
`next dev` や `next build` と違って、standalone scripts は自動で `.env*` を読まないことがあります。  
そのため、`scripts/migrate.mjs` などの standalone script では `@next/env` で明示ロードする。

## error message
- expected failure は concise に返す
- secret / raw connection string / internal SQL detail を含めない
- missing DB env は `MISSING_DATABASE_URL` のような機械可読 code で返す
