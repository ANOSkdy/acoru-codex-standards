# acoru-codex-standards

Next.js App Router + TypeScript + Neon Postgres を前提に、**GitHub → Vercel の基盤を毎回ぶらさずに揃えるための共通標準repo**です。  
目的は次の3つです。

1. **基盤の真実源を Git で固定する**
2. **新規PJ開始時の bootstrap / foundation refresh を標準化する**
3. **画面・機能実装は Codex Cloud の PR 作成へ寄せる**

---

## この repo の役割

この repo は **アプリ本体の1件ごとの開発repo** ではなく、次の内容を管理するための **共通foundation / standards repo** です。

- 共通ルール
- bootstrap / foundation refresh ルール
- Codex の作業規範
- baseline 実装スナップショット
- GitHub 運用手順
- reusable workflow

つまり、**「何を正として開発を始めるか」** を固定する repo です。

---

## 含まれるもの

### `standards/`
全PJ共通で揺らしたくない開発ルールです。

- `standards/engineering/`
- `standards/db/`
- `standards/ui/`
- `standards/api/`
- `standards/process/`
- `standards/codex/`
- `standards/bootstrap/`

### `baselines/nextjs-neon-node-minimal/`
空repo bootstrap 用の最小 baseline 実装です。

- build-safe homepage
- server-only lazy DB module
- safe migration runner
- `todos` schema
- DB health route
- validated CRUD route
- mobile-first minimal CSS

### `templates/`
各PJ docs や Codex prompt の雛形・実用テンプレです。

### `tools/`
手元または CI で使う補助スクリプトです。

### `.github/workflows/`
GitHub 上だけで foundation 検査を回すための workflow です。

---

## 推奨する運用モード

この repo は次の2モードで使えます。

### モードA: 共有標準repoとして使う
この repo を **共通標準の正本** として使い、各PJ repo から次を参照します。

- docs
- reusable workflow
- baseline 方針
- Codex working rules

既存PJを揃え直す用途では、このモードが基本です。

### モードB: project template の元ネタとして使う
新規アプリrepoを毎回同じ土台で始めたい場合は、次のどちらかを推奨します。

1. **この repo とは別に、薄い app-template repo を持つ**
   - root にアプリ baseline を置く
   - この repo の reusable workflow を呼ぶ
2. **この repo の特定 branch を template 専用 root にする**
   - 例: `template-root` branch
   - root に baseline アプリを配置する

> 現在の `main` は standards repo 構成です。  
> そのまま template 化すると、生成先 repo に `standards/`, `baselines/`, `templates/` まで含まれます。  
> その構成で問題ない場合だけ直接 template 化してください。

---

## 新規PJ開始の推奨フロー

1. foundation / template repo から新規repoを作成
2. `Foundation Verify` を GitHub Actions から手動実行
3. branch protection または ruleset を適用
4. Vercel 連携と env 登録
5. 以後の画面・機能開発は Codex Cloud の PR で進める

詳細は次を参照してください。

- `docs/github/TEMPLATE_REPO_SETUP.md`
- `docs/github/WORKFLOW_MANUAL_SETUP.md`
- `docs/github/NEW_PROJECT_FROM_TEMPLATE.md`
- `docs/github/BRANCH_PROTECTION_AND_RULESETS.md`
- `docs/github/ACTIONS_POLICY.md`

### PJ固有資料の初期整備（最短フロー）

共通標準repoに含まれない PJ 固有情報は、`templates/prompts/` の次の3本を順に使って整備します。

1. `project-inventory.md`（事実抽出）
2. `product-doc-draft.md`（product docs 初稿化）
3. `schema-confirmed-vs-provisional.md`（schema / enum / status の確定度整理）

---

## なぜ `pnpm-lock.yaml` を同梱していないか

この repo の baseline は **固定スナップショット** ですが、lockfile は target repo 側で pinned pnpm により生成する前提です。  
標準repo側で手書きや疑似 lockfile を持つと、かえって再現性を壊しやすいためです。

推奨手順:

```bash
corepack enable
corepack prepare pnpm@10.28.2 --activate
pnpm install --no-frozen-lockfile
pnpm typecheck
pnpm build
```

---

## GitHub 上だけで回す時に使うもの

### reusable workflow
- `.github/workflows/reusable-foundation-verify.yml`

共有foundation検査ロジックです。  
他repoから `OWNER/REPO/.github/workflows/reusable-foundation-verify.yml@REF` で呼び出せます。

### wrapper workflow
- `.github/workflows/foundation-verify.yml`

この repo 自身で baseline を検査するための wrapper です。  
`workflow_dispatch` 付きなので、GitHub UI の Actions タブから手動実行できます。

---

## Codex Cloud に任せる範囲

Codex Cloud には **基盤生成そのもの** ではなく、**基盤が揃った後の差分実装** を担当させるのが基本です。

- 画面追加
- API追加
- server action 追加
- UI改善
- バグ修正
- 既存schemaに沿った機能拡張

一方で、次は foundation repo 側で固定します。

- Node / pnpm / lockfile policy
- tsconfig baseline
- env / secret policy
- DB module pattern
- migration runner pattern
- Foundation Verify
- branch protection / ruleset の基本方針

---

## まず読む順番

1. `standards/codex/CODEX_WORKING_RULES.md`
2. `standards/bootstrap/BOOTSTRAP_OVERVIEW.md`
3. `MANIFEST.md`
4. `docs/github/WORKFLOW_MANUAL_SETUP.md`

---

## 補足

- lint は bootstrap phase では任意です
- build reliability を最優先します
- DB は Neon Postgres を server-only env で扱います
- DBアクセスは Node runtime 前提です
- `Edge` は明示許可時のみ使います
