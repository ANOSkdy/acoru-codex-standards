# PR_RULES

## 目的
PRの品質を揃え、差分の意味と安全性をレビューしやすくします。

## 原則
- 1PR 1 concern
- 最小差分
- docs / schema / code の同期
- build を壊さない
- 未依頼の整理を混ぜない

## PRサイズの目安
- 小: 1つのバグ修正、1つのUI調整、1つの小機能
- 中: 1つの機能追加、1つの schema change を含む改善
- 大: 原則避ける。分割できるなら分割する

## タイトル
Conventional Commits 風を推奨します。

- `feat(deck): add request status badge`
- `fix(session): use actual column names for inputs`
- `refactor(auth): extract permission check` ※ refactor は明示依頼時のみ

## PR本文に必ず書くこと
### 1. 何をしたか
- 変更点を3〜7行で要約する

### 2. 真実源
- 参照した migration / typed schema / PJ docs を列挙する

### 3. 影響範囲
- UI
- API
- DB
- background job
- permissions
- docs

### 4. 動作確認
bootstrap / foundation refresh:
- `pnpm install --frozen-lockfile`
- `pnpm typecheck`
- `pnpm build`

ongoing development:
- `pnpm typecheck`
- `pnpm build`
- `pnpm lint`（導入済みの場合）

### 5. migration の有無
- あり / なし
- ありの場合は rollout 順序を一文で記載する

## schema change を含むPRの追加条件
- migration がある
- typed schema が更新されている
- `SCHEMA.md` が更新されている
- enum / status 変更があれば registry が更新されている
- 既存クエリの列名整合が確認済み

## UI変更を含むPRの追加条件
- 既存 design rules に従っている
- loading / empty / error state が確認済み
- テーブルやフォームの共通ルールを破っていない
- 変更が視覚差分で説明できる

## レビューで弾くもの
- 推測の列名で書かれた SQL
- route handler に入った複雑なDB処理
- status 値の重複定義
- client へ secret や内部エラー詳細を露出する変更
- build / typecheck 未確認
- lint 導入済みなのに lint 未確認
- fake lockfile

## merge 前最終確認
- 依頼外の変更がない
- rollback / fix-forward 方針が見える
- ログ出力が過剰でない
- telemetry / audit の要否が適切
