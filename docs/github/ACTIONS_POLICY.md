# ACTIONS_POLICY

foundation repo と各PJ repo で、GitHub Actions をどの粒度で許可するかの推奨方針です。

---

## 1. 基本方針

最初は **厳しすぎる allow list** から始めない方が安全です。  
まず foundation 検証が回ることを優先し、安定後に絞ります。

---

## 2. foundation repo の推奨設定

対象:
- `ANOSkdy/acoru-codex-standards`

### 推奨A: 立ち上げ優先
**Allow all actions and reusable workflows**

初回立ち上げではこれが一番ハマりにくいです。

### 推奨B: 絞る場合
**Allow OWNER, and select non-OWNER, actions and reusable workflows**

許可候補:
- `actions/checkout@v4`
- `actions/setup-node@v4`
- `pnpm/action-setup@v4`
- `ANOSkdy/acoru-codex-standards/.github/workflows/reusable-foundation-verify.yml@main`

> `Require actions to be pinned to a full-length commit SHA` は、  
> workflow 内の action 参照を SHA pin に切り替えるまでは有効化しない方が無難です。

---

## 3. 各PJ repo の推奨設定

### public repo
foundation repo が public なら、まずは次で十分です。

- **Allow all actions and reusable workflows**

public repo で stricter にするなら、foundation repo reusable workflow と GitHub 公式 actions を allow list に入れます。

### private repo
plan / owner policy の差が出やすいので、まずは **Allow all actions and reusable workflows** を推奨します。

その上で、必要なら次だけを許可する構成へ寄せます。

- `actions/checkout@v4`
- `actions/setup-node@v4`
- `pnpm/action-setup@v4`
- `ANOSkdy/acoru-codex-standards/.github/workflows/reusable-foundation-verify.yml@main`

---

## 4. private foundation repo にする場合

foundation repo を private に変更した場合は、reusable workflow を他repoから呼ぶために **呼ばれる側 repo** で Access を許可する必要があります。

手順:
1. foundation repo を開く
2. **Settings**
3. **Actions** → **General**
4. **Access**
5. `Accessible from repositories owned by 'ANOSkdy'` を選ぶ

> 個人 owner 配下では、この設定は **同じ owner の private repo からのアクセス用** です。  
> public foundation repo のままなら不要です。

---

## 5. Workflow permissions

当面の推奨は次です。

- **Read repository contents permission**

まだ有効化しないもの:
- Allow GitHub Actions to create and approve pull requests

これは次の自動化を入れる時だけオンにします。

- lockfile bootstrap PR
- refresh PR 自動作成
- comment / approve automation

---

## 6. fork PR の扱い

public repo では、workflow 実行に approval が必要な設定にしていると、外部 contributor の PR で手動承認が必要になります。  
foundation repo のような基盤repoでは、まず conservative に運用し、必要に応じて管理者が承認する形を推奨します。

---

## 7. この repo で最低限通したい workflow

- `Foundation Verify`

各PJ repo では追加で:
- `typecheck-build`
- `lint`（導入済み repo のみ）
- `test`（導入済み repo のみ）

---

## 8. 運用ルール

- 新規repoは template から作る
- repo 作成直後に `Foundation Verify` を1回手動実行する
- success 後に required checks を設定する
- main は PR 経由のみ
- 画面 / 機能実装は Codex Cloud の PR に寄せる
- foundation 変更は shared standards repo 起点で管理する
