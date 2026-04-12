# PG_IMPLEMENTATION_RULES

## 目的
`pg` を使った baseline DB access を、Next.js App Router と Vercel の前提で安全に固定します。

## `lib/db.ts` の必須要件
- `server-only` を import する
- `QueryResult`, `QueryResultRow` を `pg` から import する
- query helper は generic にする
- `pg.Pool` を eager に作らない
- env 不足で module import 時に throw しない
- lazy getter / singleton で初回利用時に pool を作る

## 推奨構成
- `getDatabaseUrl()`: env を解決して string | null を返す
- `hasDatabaseUrl()`: boolean
- `getPool()`: lazily create `pg.Pool`
- `query()`: generic query helper
- `closePool()`: test / script 用の明示 close

## expected failure の扱い
DB env がない時は、route handler 側で graceful に扱えるようにする。  
例えば次のどちらか。

- `hasDatabaseUrl()` で分岐して route が 503 を返す
- `DatabaseConfigError` を投げて route が拾う

いずれにせよ、**import time failure は禁止**。

## route handler 側の原則
- validate → call query/repository → shape response
- missing env は concise JSON error
- SQL は parameterized only
- route から raw secret を返さない
