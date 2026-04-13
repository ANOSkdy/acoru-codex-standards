# CHANGES_SUMMARY

この修正パックは、前回指摘した「構想との差分として直すべき点」3件を埋めるためのものです。

## 1. `.github/workflows/` を追加
追加ファイル:
- `.github/workflows/reusable-foundation-verify.yml`
- `.github/workflows/foundation-verify.yml`

目的:
- GitHub 上だけで foundation 検査を開始できる
- `workflow_dispatch` で手動実行できる
- 各PJ repo が reusable workflow を参照できる

## 2. root README を repo 全体案内に修正
修正ファイル:
- `README.md`

目的:
- baseline 専用説明から、standards / foundation repo の説明へ寄せる
- 推奨運用モードと GitHub-native 手順を明示する

## 3. GitHub 運用手順を docs 化
追加ファイル:
- `docs/github/WORKFLOW_MANUAL_SETUP.md`
- `docs/github/TEMPLATE_REPO_SETUP.md`
- `docs/github/NEW_PROJECT_FROM_TEMPLATE.md`
- `docs/github/BRANCH_PROTECTION_AND_RULESETS.md`
- `docs/github/ACTIONS_POLICY.md`

目的:
- GitHub UI で必要な初期設定を標準化する
- template / branch protection / reusable workflow の差分を減らす

## 重要な補足
この修正パックは **現在の `ANOSkdy/acoru-codex-standards` を shared standards / foundation repo として強化**するものです。

もし「新規アプリrepoを root 直下で即 runnable な template から作りたい」場合は、
- この repo とは別に thin app-template repo を作る
- もしくは template 専用 branch を切る
のどちらかを推奨します。
