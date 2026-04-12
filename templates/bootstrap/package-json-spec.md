# package.json spec

## 必須
- `private: true`
- `packageManager: "pnpm@10.28.2"`
- `engines.node`
- scripts:
  - `dev`
  - `build`
  - `start`
  - `typecheck`
  - `db:migrate`

## baseline dependency set
runtime:
- `next`
- `react`
- `react-dom`
- `pg`
- `zod`
- `server-only`
- `@next/env`

dev:
- `typescript`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@types/pg`

## baseline では入れないもの
- ORM
- test runner
- lint tooling
- large UI library
- AI SDK

ただし feature 要件がある場合は別PRで追加可。

## scripts の方針
- `db:migrate` は standalone explicit 実行
- build hook / postinstall hook で migration を走らせない
- `typecheck` は `tsc --noEmit` を基本とする
