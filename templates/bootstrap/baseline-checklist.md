# Baseline checklist

## 空repo bootstrap
- [ ] target repo が空である
- [ ] `standards/bootstrap/` を読み終えた
- [ ] `packageManager` を `pnpm@10.28.2` に固定した
- [ ] `.nvmrc` と `engines.node` を揃えた
- [ ] `package-lock.json` / `yarn.lock` がない
- [ ] required fileset を作成した
- [ ] `app/page.tsx` が DB不要で build-safe
- [ ] `lib/db.ts` が lazy / server-only / graceful
- [ ] `scripts/migrate.mjs` が explicit / idempotent / transactional
- [ ] DB health route がある
- [ ] validated CRUD baseline route がある
- [ ] `pnpm-lock.yaml` を target repo で生成した
- [ ] `pnpm typecheck`
- [ ] `pnpm build`

## foundation refresh
- [ ] package manager / lockfile drift がない
- [ ] Node major pin が明記されている
- [ ] self-fetch がない
- [ ] import-time DB throw がない
- [ ] dynamic route params typing が current-safe
- [ ] `rowCount ?? 0` を使っている
- [ ] missing env を graceful に返す
- [ ] `next.config` `env` に secret がない
