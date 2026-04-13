# TEMPLATE_REPO_SETUP

GitHub 上だけで毎回同じ基盤から始めるための template 設定手順です。

---

## 先に結論

この repo は **shared standards / foundation source repo** としてはそのまま使えます。  
ただし **新規アプリrepoを one-click で作る template** としては、次のどちらかを推奨します。

### 推奨A: 薄い app-template repo を別で持つ
もっとも運用しやすい方法です。

- この repo: ルール・baseline・workflow の正本
- app-template repo: root にアプリ baseline を置いた生成専用 repo

app-template repo には、少なくとも次を入れます。

- baseline アプリ本体
- `AGENT.md`
- `PROJECT_RULES.md`
- `.github/workflows/foundation-verify.yml`

そして foundation 検査は、この repo の reusable workflow を呼びます。

### 許容B: この repo 自体を template 化する
次の場合だけ許容です。

- 生成先repoにも `standards/`, `templates/`, `baselines/`, `tools/` を残したい
- repo がアプリ本体というより foundation bundle に近い
- 生成後に root 構成を整える工程を受け入れられる

> アプリrepoを root 即実行可能にしたいなら、A を推奨します。

---

## この repo 自体を template 化する手順

1. GitHub で `ANOSkdy/acoru-codex-standards` を開く
2. **Settings**
3. **General**
4. **Template repository** を有効化

これで **Use this template** が使えるようになります。

---

## 推奨: thin app-template repo の作り方

### 1. 新しい repo を1つ用意する
例:
- `acoru-nextjs-app-template`
- `acoru-vercel-template`

### 2. root に置くもの
この repo の `baselines/nextjs-neon-node-minimal/` を app-template repo の root に配置します。

最低限必要:
- `package.json`
- `.env.example`
- `.nvmrc`
- `tsconfig.json`
- `next-env.d.ts`
- `app/**`
- `lib/**`
- `scripts/migrate.mjs`
- `migrations/**`

さらに追加推奨:
- `AGENT.md`
- `PROJECT_RULES.md`
- `docs/db/SCHEMA.md`
- `docs/db/ENUMS_AND_STATUSES.md`
- `docs/ui/DESIGN.md`
- `docs/process/PROCESS_RULES.md`
- `.github/workflows/foundation-verify.yml`

### 3. foundation verify workflow は shared repo を呼ぶ
app-template repo 側では、local reusable workflow ではなく shared foundation repo を呼びます。

```yaml
jobs:
  foundation_verify:
    name: foundation-verify
    uses: ANOSkdy/acoru-codex-standards/.github/workflows/reusable-foundation-verify.yml@main
    with:
      target-path: .
      node-version: "20"
      pnpm-version: "10.28.2"
      install-dependencies: true
      require-lockfile: false
      foundation-repo: ANOSkdy/acoru-codex-standards
      foundation-ref: main
```

> 安定運用では `@main` ではなく release tag を推奨します。

### 4. app-template repo を template 化する
1. app-template repo を開く
2. **Settings**
3. **General**
4. **Template repository** を有効化

---

## template repo を作った後にやること

1. `Foundation Verify` を手動実行
2. branch protection / ruleset を適用
3. `foundation-verify` を required check に入れる
4. Vercel 連携
5. env 登録
6. 以後は Codex Cloud で差分PRを作る

---

## 避けるべきこと

- 空repoを毎回作ってから手で基盤を足す
- project ごとに別の tsconfig / Node / pnpm 方針を採用する
- foundation verify を入れずに main 直push で始める
- 初回構築から Codex に基盤設計まで丸投げする

---

## 使い分けの結論

- **shared standard の正本**: `ANOSkdy/acoru-codex-standards`
- **新規app生成専用の template**: 別の thin app-template repo

この2段構えが一番ぶれません。
