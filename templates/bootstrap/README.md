# Bootstrap templates

## 目的
このディレクトリは、初回repo構築または既存repoの基盤揃えを Codex に依頼する時の prompt / spec 群です。

## 使い分け
### 空repoから作る
- `bootstrap-empty-repo-strict.md`

### 既存repoを基盤更新する
- `bootstrap-foundation-refresh.md`

### 実装仕様を人間が確認する
- `package-json-spec.md`
- `tsconfig-spec.md`
- `env-and-gitignore-spec.md`
- `db-module-spec.md`
- `route-handlers-spec.md`
- `migration-runner-spec.md`
- `ui-baseline-spec.md`

### 手順漏れを防ぐ
- `baseline-checklist.md`

## prompt の原則
- 初回構築は strict diff-only を推奨する
- まず bootstrap 標準を読ませる
- repo が空か既存かを最初に判定させる
- package manager / Node / lockfile policy を固定させる
- build-safe homepage と lazy DB module を必須にする
