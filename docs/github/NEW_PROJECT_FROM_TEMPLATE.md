# NEW_PROJECT_FROM_TEMPLATE

新しい開発PJを **ローカル経由なし** で始める手順です。  
推奨前提は、**thin app-template repo** を用意済みであることです。

---

## 0. 前提

- foundation の正本 repo がある
  - 例: `ANOSkdy/acoru-codex-standards`
- 新規repo生成用の template repo がある
  - 例: `acoru-nextjs-app-template`
- template repo には `Foundation Verify` workflow が入っている
- `foundation-verify` の check 名が安定している

---

## 1. GitHub で template から新規repoを作る

1. template repo を開く
2. **Use this template**
3. **Create a new repository**
4. Owner を選ぶ
5. repo 名を入れる
6. visibility を決める
7. 必要なら description を入れる
8. **Create repository from template**

> ここでは **空repoを先に作らない** のがルールです。

---

## 2. repo 作成直後にやること

### 2-1. Actions が有効か確認
- **Settings** → **Actions** → **General**
- policy で止められていないか確認

### 2-2. `Foundation Verify` を手動実行
1. **Actions**
2. 左の workflow 一覧から **Foundation Verify**
3. **Run workflow**
4. default branch を選択
5. 実行

成功したら、次に進みます。

> `workflow_dispatch` を手動実行するには workflow が default branch にあり、通常 write 権限が必要です。

---

## 3. 最初の project 固有更新

次だけは初回に直してください。

- `package.json` の package name
- `PROJECT_RULES.md`
- `AGENT.md`
- `docs/db/SCHEMA.md`
- `docs/db/ENUMS_AND_STATUSES.md`
- `docs/ui/DESIGN.md`
- `docs/process/PROCESS_RULES.md`
- 必要なら repo description

---

## 4. lockfile の扱い

この foundation 方針では、template repo に `pnpm-lock.yaml` を固定同梱しないことがあります。  
その場合、生成先 repo で lockfile を作る最初の更新が必要です。

推奨方法は次のどちらかです。

### 方法A: 最初の Codex Cloud PR で生成させる
- lockfile 生成
- package name 調整
- docs の PJ固有埋め
を1本の小PRでやる

### 方法B: 生成専用 workflow を別途用意する
将来、完全 GitHub-native に寄せたいなら `lockfile bootstrap PR` workflow を追加してください。

> 現時点の修正パックは **foundation verify の標準化** までを含みます。  
> lockfile 自動コミット workflow は含めていません。

---

## 5. Vercel と env を設定

1. Vercel に repo を接続
2. `DATABASE_URL` または `NEON_DATABASE_URL` を server-side env として登録
3. AI 機能を使う時だけ AI key を server-side env で登録
4. `NEXT_PUBLIC_*` に秘密情報を置かない

---

## 6. main を保護する

`Foundation Verify` が成功したら、branch protection または ruleset を設定します。

最低限:
- main 直push禁止
- PR必須
- 1 approval
- required check: `foundation-verify`

追加で app CI が入ったら:
- `typecheck-build`
- `lint`（導入済み repo のみ）
を required checks に足します。

---

## 7. 以後の開発フロー

ここから先は、基盤生成ではなく差分実装だけを進めます。

1. GitHub Issue を作る
2. Codex Cloud に対象repoを読ませる
3. `AGENT.md` → `PROJECT_RULES.md` → project docs の順で読ませる
4. feature branch で PR 作成
5. CI 成功
6. 人間レビュー
7. merge

---

## 8. やってはいけないこと

- 新規PJで空repoから毎回作り直す
- 初回から main 直push で始める
- `Foundation Verify` を飛ばす
- docs を整える前に大きな機能実装へ入る
- DB / AI の秘密情報を client 側に出す
