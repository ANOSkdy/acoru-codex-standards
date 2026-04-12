# CODEX_WORKING_RULES

## 目的
Codex / AI エージェントが毎回同じ順序・同じ制約で動くようにするための作業規範です。  
この版では、**bootstrap phase** と **ongoing development phase** を分けて扱います。

## 前提
- Next.js App Router
- TypeScript
- pnpm
- GitHub → Vercel
- Neon Postgres
- server-only env
- minimal diff
- build reliability first

## まず判定すること
作業開始時に、次のどちらかを先に判定します。

### A. bootstrap phase
- repo が空
- repo がほぼ空
- 初回基盤を揃えたい
- package manager / Node / lockfile / route typing / DB module を固定したい
- foundation refresh をしたい

### B. ongoing development phase
- すでに基盤がある
- feature / bugfix / migration / UI調整が主目的
- 既存の project docs が揃っている

## 必須の読み順
### bootstrap phase
1. `standards/bootstrap/BOOTSTRAP_OVERVIEW.md`
2. `standards/bootstrap/REPRODUCIBLE_BUILD_RULES.md`
3. `standards/bootstrap/BUILD_SAFE_BASELINE_RULES.md`
4. `standards/bootstrap/ENV_BASELINE_RULES.md`
5. `standards/bootstrap/NEXT_ROUTE_TYPE_SAFETY_RULES.md`
6. `standards/bootstrap/PG_IMPLEMENTATION_RULES.md`
7. `standards/bootstrap/MIGRATION_RUNNER_BASELINE.md`
8. `baselines/nextjs-neon-node-minimal/README.md`

### ongoing development phase
1. PJ repo の `AGENT.md`
2. `PROJECT_RULES.md`
3. `docs/db/SCHEMA.md`
4. `docs/db/ENUMS_AND_STATUSES.md`
5. `docs/ui/DESIGN.md`
6. `docs/process/PROCESS_RULES.md`
7. migration / typed schema / repository 実装

## ハードルール
- 列名・型・enum・status を推測しない
- 実DB / migration を正とする
- route handler を厚くしない
- DB書き込みは repository / service へ寄せる
- UI値 / AI値 / DB保存値を分ける
- secrets を client やログへ出さない
- parameterized SQL を使う
- Node runtime が必要な DB処理を勝手に Edge へ移さない
- 未依頼の大規模リファクタをしない
- bootstrap phase では package manager / lockfile / Node major を揺らさない

## 作業開始前にやること
### bootstrap phase
- target が empty repo か existing repo か判定する
- baseline copy と prompt 実行のどちらを使うか決める
- Node major / pnpm / exact pin / lockfile policy を固定する
- 必須 fileset を確認する
- build-safe homepage / lazy DB module / migration runner の有無を確認する

### ongoing development phase
- 対象機能の目的を1文で言えるようにする
- 使う table と column を列挙する
- 既存 repository / service / UI pattern を探す
- enum / status registry を確認する
- 既存 route / server action を確認する
- 差分だけで済むか確認する

## 実装中に守ること
- 既存実装を壊さない最小差分で直す
- 1つの責務を複数箇所に増やさない
- validate → normalize → persist の順を守る
- status 遷移を docs と合わせる
- empty / loading / error 表現を共通ルールへ寄せる
- bootstrap phase では build-safe baseline を崩さない
- server component から self-fetch しない
- DB module は import 時に throw しない

## 不一致が見つかった時
次の順で対応する。

1. 不一致を列挙する
2. どれを正とするか示す
3. 必要なら監査PR / 修正PR に分ける
4. migration / schema / docs / query を同期する

## 出力モード
### strict diff-only mode
次の時に使う。
- bootstrap-empty-repo prompt
- foundation refresh prompt
- ユーザーが unified diff only を要求した時

この場合:
- prose を出さない
- 1 fenced code block のみ
- git unified diff のみ

### reviewable mode
通常 feature / bugfix では、必要に応じて短い計画と差分を出してよい。

## 完了条件
### bootstrap phase
- required fileset が揃っている
- `pnpm install --frozen-lockfile` が通る状態を目標に構成されている
- `pnpm typecheck` を壊さない
- `pnpm build` を壊さない
- lint は設定した場合のみ壊さない
- DB env がなくても build-safe homepage が成立する
- DB module が server-only / lazy / graceful である
- migration runner が explicit / idempotent / transactional である

### ongoing development phase
- feature complete
- `pnpm typecheck` を壊さない
- `pnpm build` を壊さない
- lint を導入済みの repo では `pnpm lint` を壊さない
- DBスキーマ整合が取れている
- secrets が露出していない

## 禁止事項
- old PR や旧会話だけを正にする
- docs と DB がズレているのに code だけ修正する
- UI デザインを毎回作り直す
- 既存 build を壊す package 追加
- ログへ個人情報や内部詳細を出しすぎる
- package-lock.json / yarn.lock を残す
- fake `pnpm-lock.yaml` を手書きする
