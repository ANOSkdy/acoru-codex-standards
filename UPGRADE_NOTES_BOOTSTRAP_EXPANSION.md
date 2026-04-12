# UPGRADE_NOTES_BOOTSTRAP_EXPANSION

## この更新で変わったこと
### 1. repo の役割が広がった
従来:
- 通常開発の共通ルール
- PJ docs のテンプレ
- feature / bugfix 用 prompt

今回:
- 初回基盤構築の共通ルール
- 既存repo基盤リフレッシュの共通ルール
- 実際にコピーできる baseline files
- baseline を適用 / 検査する tools

### 2. lint の扱いを phase で分けた
従来:
- ほぼ一律で `pnpm lint` を完了条件に含めていた

今回:
- bootstrap phase では lint は任意
- ongoing development では lint 導入済みなら必須

### 3. strict bootstrap prompt を追加した
空repoからの基盤作成時は、diff-only 出力で揺れを減らせるようにした。

### 4. actual baseline files を追加した
`baselines/nextjs-neon-node-minimal/` を追加し、会話依存ではなく固定スナップショットとして土台を持てるようにした。
