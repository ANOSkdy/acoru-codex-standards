# BOOTSTRAP_ACCEPTANCE_CRITERIA

## 目的
空repo bootstrap / foundation refresh が「揃った」と判断できる条件を固定します。

## required outcomes
- required fileset がある
- `pnpm` only
- `packageManager` pin がある
- `.nvmrc` と `engines.node` がある
- `pnpm-lock.yaml` 以外の lockfile がない
- `tsconfig.json` と `next-env.d.ts` がある
- build-safe homepage がある
- DB module が server-only / lazy / graceful
- migration runner が explicit / idempotent / transactional
- validated CRUD baseline route がある
- route typing が App Router safe である

## parity checks
target repo では少なくとも次を満たす。

- `pnpm install --frozen-lockfile`
- `pnpm typecheck`
- `pnpm build`

lint は設定している場合のみ対象。

## security checks
- secret が client に出ていない
- secret が `next.config` `env` に入っていない
- `NEXT_PUBLIC_*` に DB / AI secret を置いていない
- error message が concise で safe
- raw SQL / token / full connection string をログに出さない

## UX checks
- homepage が mobile-first
- default homepage は DB不要
- hover-only interaction を前提にしていない
- tap target と spacing が極端に狭くない

## DB-specific checks
- DB route は `runtime = 'nodejs'`
- DB-backed GET route は `dynamic = 'force-dynamic'`
- missing DB env は 503 などで graceful に返る
- `rowCount` 比較は `(result.rowCount ?? 0)` で行う
