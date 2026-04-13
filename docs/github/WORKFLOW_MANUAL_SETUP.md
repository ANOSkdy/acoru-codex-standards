# WORKFLOW_MANUAL_SETUP

`.github/workflows/` を追加したあと、GitHub UI 上で最初にやるべき設定と確認をまとめます。  
ここでは **この repo 自体** と、**この repo を参照する各PJ repo** の両方を想定しています。

---

## 目的

次を GitHub 上だけで回せる状態にします。

- `workflow_dispatch` で `Foundation Verify` を手動実行できる
- reusable workflow を他repoから呼べる
- required checks に `foundation-verify` を設定できる
- local を使わずに foundation 検査を始められる

---

## 0. 先に理解しておくこと

- `workflow_dispatch` で手動実行する workflow は **default branch 上に存在**している必要があります
- 手動実行には通常 **write 権限**が必要です
- GitHub Actions は既定で有効ですが、repo / org ポリシーで制限されている場合があります
- private repo の reusable workflow を他repoから使う場合は、**呼ばれる側 repo の Access 設定**も必要です

---

## 1. まずやること

1. この修正パックの `.github/workflows/` を default branch に入れる
2. `README.md` と `docs/github/*.md` も同時に main へ入れる
3. GitHub 上で Actions の設定を確認する

> `workflow_dispatch` は default branch 上に workflow がないと UI に出ません。  
> まず最初に main へ入れるのが必須です。

---

## 2. foundation repo 側の手動設定

対象: `ANOSkdy/acoru-codex-standards`

### 2-1. Actions を確認
1. repo を開く
2. **Settings**
3. 左サイドバー **Actions** → **General**
4. **Actions permissions** を確認

#### 推奨
まずは次のどちらかです。

- **Allow all actions and reusable workflows**  
  いちばん簡単。初期立ち上げ向け。
- もしくは  
  **Allow OWNER, and select non-OWNER, actions and reusable workflows**  
  にして必要な action / reusable workflow を許可

厳しめにする場合の許可候補:
- `actions/checkout@v4`
- `actions/setup-node@v4`
- `pnpm/action-setup@v4`
- `ANOSkdy/acoru-codex-standards/.github/workflows/reusable-foundation-verify.yml@main`

### 2-2. Workflow permissions を確認
**Workflow permissions** は、現時点では **Read repository contents permission** で十分です。

以下はまだ不要です。
- Allow GitHub Actions to create and approve pull requests

> 将来、Actions で lockfile PR や refresh PR を自動作成する時だけ有効化を検討してください。

### 2-3. private repo に変更する場合
もし将来 foundation repo を private にするなら、追加で次が必要です。

1. **Settings**
2. **Actions** → **General**
3. **Access** セクション
4. `Accessible from repositories owned by 'ANOSkdy'` を選択

> 個人アカウント配下の private repo では、同一 owner の **private repo からのみ** reusable workflow を参照できます。  
> public foundation repo のまま使うなら、この Access 設定は不要です。

---

## 3. foundation repo で最初にやる手動実行

workflow を main に入れたら、次を1回実行します。

1. repo の **Actions** タブを開く
2. 左メニューから **Foundation Verify** を選ぶ
3. **Run workflow** を押す
4. branch は `main` を選ぶ
5. 実行する

成功したら、以後 `foundation-verify` を required check 候補に使えます。

> branch protection / ruleset で required check に追加する前に、  
> **その check を最低1回は実行して成功させる**のが安全です。

---

## 4. 各PJ repo 側の手動設定

各PJ repo でも、foundation repo の reusable workflow を呼ぶ前に次を確認します。

1. **Settings**
2. **Actions** → **General**
3. **Actions permissions** を確認
4. public repo なら、foundation repo が public である限り reusable workflow を呼びやすい
5. private repo なら、plan / policy に応じて許可設定が必要

### 各PJ repo の最小構成
各PJ repo に置く wrapper workflow 例:

```yaml
name: Foundation Verify

on:
  workflow_dispatch:
  pull_request:

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

> 本番運用では `@main` より、`@v1` のような tag / release pin を推奨します。

---

## 5. required checks 設定の前提

`foundation-verify` を branch protection / ruleset の required checks に入れる前に、次を満たしてください。

- workflow が default branch にある
- Actions が無効化されていない
- その workflow を最低1回成功させている
- check 名が安定している

この修正パックでは、job 名を **`foundation-verify`** に固定しています。

---

## 6. ハマりやすい点

### `Run workflow` ボタンが出ない
次を確認してください。

- workflow に `workflow_dispatch` があるか
- workflow file が default branch にあるか
- 自分に write 権限があるか

### reusable workflow を呼べない
次を確認してください。

- caller repo の Actions permissions
- called repo 側の Access 設定（private の場合）
- 参照先の path / ref が正しいか
- `actions/checkout` や `pnpm/action-setup` が policy でブロックされていないか

### required checks に `foundation-verify` が出ない
先にその workflow を1回成功させてください。

---

## 7. 最終チェック

foundation repo 側で、次ができれば準備完了です。

- `Foundation Verify` を Actions UI から手動実行できる
- 成功ログが残る
- 各PJ repo から reusable workflow を呼べる
- `foundation-verify` を required checks に追加できる
