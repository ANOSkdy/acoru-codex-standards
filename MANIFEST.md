# MANIFEST

## Root
- `README.md`: この標準repoの目的、導入方法、運用方針
- `MANIFEST.md`: 収録物の全体一覧

## standards/engineering
- `ENGINEERING_RULES.md`: 全PJ共通の開発原則
- `NAMING_RULES.md`: 命名規則
- `REPO_STRUCTURE_RULES.md`: repo構造と責務配置
- `PR_RULES.md`: PR作成・レビュー基準

## standards/db
- `DB_RULES.md`: DBアクセスと schema 真実源の扱い
- `MIGRATION_RULES.md`: migration運用
- `SCHEMA_SYNC_RULES.md`: schema change 時の同期ルール
- `ENUM_STATUS_RULES.md`: enum / status の共通ルール

## standards/ui
- `DESIGN_SYSTEM_RULES.md`: 共通UI原則
- `TABLE_UI_RULES.md`: テーブルUIの共通ルール
- `FORM_UI_RULES.md`: フォームUIの共通ルール
- `FEEDBACK_UI_RULES.md`: loading / empty / error / success の共通ルール

## standards/api
- `API_RULES.md`: route / action / response ルール
- `ERROR_RESPONSE_RULES.md`: エラーの返し方
- `AUTHORIZATION_RULES.md`: 認可の考え方

## standards/process
- `PROCESS_RULES.md`: 業務処理の共通ルール
- `ASYNC_JOB_RULES.md`: 非同期ジョブルール
- `IDEMPOTENCY_RULES.md`: 冪等性ルール
- `AUDIT_LOG_RULES.md`: 監査ログルール

## standards/codex
- `CODEX_WORKING_RULES.md`: Codex の作業規範
- `IMPLEMENTATION_CHECKLIST.md`: 実装チェックリスト
- `DB_ALIGNMENT_CHECKLIST.md`: DB整合監査チェックリスト
- `UI_ALIGNMENT_CHECKLIST.md`: UI整合監査チェックリスト

## standards/bootstrap
- `BOOTSTRAP_OVERVIEW.md`: bootstrap phase の全体像と適用順
- `REPRODUCIBLE_BUILD_RULES.md`: package manager / lockfile / exact pin ルール
- `NODE_AND_PNPM_POLICY.md`: Node major と pnpm 固定方針
- `DEPENDENCY_BASELINE_POLICY.md`: 最小依存・追加依存の方針
- `INITIAL_FILESET_RULES.md`: 空repo時に必須のファイル一覧
- `BUILD_SAFE_BASELINE_RULES.md`: build-safe homepage / self-fetch 禁止 / mobile-first ルール
- `ENV_BASELINE_RULES.md`: env / secret / next.config 禁止事項
- `NEXT_ROUTE_TYPE_SAFETY_RULES.md`: App Router の型安全ルール
- `PG_IMPLEMENTATION_RULES.md`: `lib/db.ts` と query helper の標準形
- `MIGRATION_RUNNER_BASELINE.md`: `scripts/migrate.mjs` の標準形
- `BOOTSTRAP_ACCEPTANCE_CRITERIA.md`: 初回基盤の完了条件

## templates/project
- `AGENT.md`: 各PJの起点ファイル
- `PROJECT_RULES.md`: 各PJの差分ルール
- `docs/db/SCHEMA.md`: PJ固有schema台帳テンプレ
- `docs/db/ENUMS_AND_STATUSES.md`: PJ固有enum/status台帳テンプレ
- `docs/ui/DESIGN.md`: PJ固有デザイン差分テンプレ
- `docs/ui/TABLE_SPECS.md`: PJ固有テーブル仕様テンプレ
- `docs/api/API_CONTRACTS.md`: PJ固有API契約テンプレ
- `docs/process/PROCESS_RULES.md`: PJ固有プロセス仕様テンプレ

## templates/prompts
- `new-feature.md`: 新機能実装 prompt
- `bugfix.md`: バグ修正 prompt
- `db-audit.md`: DB整合監査 prompt
- `schema-sync.md`: schema 同期 prompt
- `ui-adjustment.md`: UI寄せ / 微調整 prompt
- `pre-implementation-audit.md`: 実装前の総合監査 prompt
- `project-inventory.md`: PJ固有情報の事実抽出と inventory 初稿化 prompt
- `product-doc-draft.md`: product docs の初稿化 prompt
- `schema-confirmed-vs-provisional.md`: schema / status の確定度整理 prompt

## templates/bootstrap
- `README.md`: bootstrap prompt と starter の使い分け
- `bootstrap-empty-repo-strict.md`: 空repo向け厳格 bootstrap prompt
- `bootstrap-foundation-refresh.md`: 既存repo基盤更新 prompt
- `baseline-checklist.md`: 初回基盤の手順チェックリスト
- `package-json-spec.md`: `package.json` の標準仕様
- `tsconfig-spec.md`: `tsconfig.json` と `next-env.d.ts` の標準仕様
- `env-and-gitignore-spec.md`: `.env.example` と `.gitignore` の標準仕様
- `db-module-spec.md`: `lib/db.ts` の実装仕様
- `route-handlers-spec.md`: API route baseline の実装仕様
- `migration-runner-spec.md`: `scripts/migrate.mjs` と migrations の実装仕様
- `ui-baseline-spec.md`: 最小 mobile-first UI baseline 仕様

## baselines/nextjs-neon-node-minimal
- `README.md`: この baseline の使い方
- `.gitignore`: env / build output / local files の除外
- `.env.example`: server-only DB env の例
- `.nvmrc`: Node major の固定
- `package.json`: 最小依存・exact pin の baseline
- `tsconfig.json`: Vercel-safe TypeScript baseline
- `next-env.d.ts`: Next.js 型定義
- `app/layout.tsx`: 安全なルートレイアウト
- `app/page.tsx`: build-safe homepage
- `app/globals.css`: mobile-first minimal style
- `app/api/health/db/route.ts`: DB health route
- `app/api/todos/route.ts`: validated CRUD list/create route
- `app/api/todos/[id]/route.ts`: validated CRUD patch/delete route
- `lib/db.ts`: lazy `pg.Pool` と query helper
- `lib/http.ts`: JSON response helper
- `lib/validators/todos.ts`: Zod validators
- `scripts/migrate.mjs`: safe migration runner
- `migrations/0001_init_todos.sql`: 初期schema

## tools
- `apply-baseline.sh`: baseline を target repo にコピーする補助スクリプト
- `verify-bootstrap.sh`: target repo の基盤差分を検査する補助スクリプト
