# BOOTSTRAP_OVERVIEW

## 目的
このディレクトリは、空repoの初回ブートストラップと、既存repoの基盤リフレッシュを毎回同じルールで行うための標準です。

## このレイヤで固定したいこと
- package manager / Node major / lockfile の扱い
- minimal dependency set
- build-safe homepage
- server-only DB access
- safe migration runner
- Vercel-safe App Router route typing
- minimal validated CRUD baseline
- env / secret hygiene

## なぜ通常開発ルールと分けるのか
通常開発ルールだけでは、次のような初回基盤の揺れが残ります。

- pnpm のversionが毎回違う
- Node version が repo ごとに揺れる
- package-lock.json / yarn.lock が混ざる
- DB module が import 時に throw する
- route params typing が旧式で type error になる
- self-fetch によって build 時に壊れる
- migration が install/build hook で勝手に動く

これらは feature 実装以前の問題なので、bootstrap phase 専用に固定します。

## 対象ケース
### 空repo bootstrap
- 新規repo
- repoにソースがない
- framework すら未初期化

### foundation refresh
- 既存repoはある
- ただし package manager / Node / DB module / migrations / route typing などの基盤が揺れている
- 先に基盤の安全性を揃えたい

## 適用順
1. `REPRODUCIBLE_BUILD_RULES.md`
2. `NODE_AND_PNPM_POLICY.md`
3. `DEPENDENCY_BASELINE_POLICY.md`
4. `INITIAL_FILESET_RULES.md`
5. `BUILD_SAFE_BASELINE_RULES.md`
6. `ENV_BASELINE_RULES.md`
7. `NEXT_ROUTE_TYPE_SAFETY_RULES.md`
8. `PG_IMPLEMENTATION_RULES.md`
9. `MIGRATION_RUNNER_BASELINE.md`
10. `BOOTSTRAP_ACCEPTANCE_CRITERIA.md`

## 実際の使い方
### Prompt で作る
- `templates/bootstrap/bootstrap-empty-repo-strict.md`
- `templates/bootstrap/bootstrap-foundation-refresh.md`

### 実ファイルをコピーする
- `baselines/nextjs-neon-node-minimal/`
- `tools/apply-baseline.sh`

### 揃っているか検査する
- `tools/verify-bootstrap.sh`

## phase ごとの完了条件
### bootstrap phase
- required fileset が揃っている
- `pnpm install --frozen-lockfile` の再現性を目指している
- `pnpm typecheck`
- `pnpm build`
- lint は設定した場合のみ対象
- DB env なしでも build-safe homepage が成立する

### ongoing development phase
- feature / bugfix 単位の完了条件へ移る
- 以後は `templates/prompts/` と PJ docs を使う
