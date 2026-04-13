# BRANCH_PROTECTION_AND_RULESETS

`main` を壊さず、Codex Cloud の PR 中心運用に寄せるための保護方針です。

---

## 先に結論

迷ったら次です。

- 個別repoで手早く始める: **Branch protection**
- 複数repoで揃える / 段階的に厳しくする: **Rulesets**

---

## 推奨の最小ルール

対象ブランチ:
- `main`

最低限これを入れます。

- Pull request required
- At least 1 approval
- Required status checks
  - `foundation-verify`
- Force push 禁止
- Branch deletion 禁止

app 側の CI が増えたら、required checks に次を追加します。

- `typecheck-build`
- `lint`（導入済み repo のみ）
- `test`（導入済み repo のみ）

---

## branch protection を使う時

### 手順
1. repo を開く
2. **Settings**
3. **Branches**
4. `Add branch protection rule`
5. pattern を `main` に設定
6. 必要ルールを有効化

### おすすめ設定
- Require a pull request before merging
- Require approvals: `1`
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Do not allow force pushes
- Do not allow deletions

---

## rulesets を使う時

複数repoでそろえたいなら rulesets の方が扱いやすいです。

### 手順
1. repo を開く
2. **Settings**
3. **Rules** → **Rulesets**
4. `New ruleset`
5. Branch ruleset を作成
6. target を `main` にする
7. enforcement を設定

### おすすめの進め方
1. 最初は **Evaluate** で様子を見る
2. 問題なければ **Active** にする

### おすすめルール
- Require a pull request before merging
- Require status checks to pass before merging
- Block force pushes
- Restrict deletions
- Require linear history（必要なら）

---

## bypass の考え方

bypass は最小にします。

基本方針:
- admin でも常用しない
- emergency 時だけ使う
- 普段は PR 経由で履歴を残す

もし ruleset を使うなら、
- admin
- 特定の GitHub App
だけに限定するのが安全です。

---

## required checks の注意

`foundation-verify` を required checks に入れる前に、先に次を済ませます。

- workflow を default branch に配置
- `Foundation Verify` を最低1回成功させる
- check 名が安定していることを確認

> 先に成功履歴がないと、required checks の選択肢として出にくいことがあります。

---

## rulesets と branch protection の関係

同じ branch に ruleset と branch protection が両方かかる場合、制約は重なります。  
違う条件が重なると、**より厳しい方**が効きます。

そのため、移行中は二重管理に注意してください。

---

## この foundation 運用での推奨

### foundation / standards repo
- `main` 保護
- required check: `foundation-verify`

### 各PJ repo
- `main` 保護
- required checks:
  - `foundation-verify`
  - `typecheck-build`
  - `lint`（あれば）
  - `test`（あれば）

---

## Codex Cloud 運用との相性

Codex Cloud による PR 作成運用では、branch protection / rulesets はほぼ必須です。  
これがないと、基盤更新と feature 実装が main へ直接混ざりやすくなります。

方針:
- すべて PR で入れる
- Foundation Verify を通す
- app CI を通す
- 人間が最終レビューする
