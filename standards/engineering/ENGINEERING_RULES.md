# ENGINEERING_RULES

## 目的
この文書は、全PJでぶれさせない開発作法を定義します。  
業務仕様や画面仕様が違っても、実装の進め方はここに揃えます。

## デフォルト前提
- Next.js App Router
- TypeScript
- pnpm
- GitHub → Vercel
- Neon Postgres
- DB接続は server-only env
- DB処理は Node runtime を基本とする
- Edge runtime は互換性確認済みかつ明示フラグがある場合のみ
- server components / route handlers / server actions を優先
- 未依頼の大規模リファクタは禁止

## phase を分ける
### bootstrap phase
空repoの立ち上げ、または既存repoの基盤を揃える段階。  
ここでは次を優先します。

- package manager / Node major / lockfile policy
- build-safe homepage
- DB module の server-only / lazy / graceful 実装
- migration runner の明示実行
- minimal validated CRUD baseline
- route typing の安全性

### ongoing development phase
feature 追加・バグ修正・schema change・UI調整の段階。  
ここでは既存 docs / schema / repository パターンを優先します。

## 非交渉ルール
### 1. 最小差分
- 変更は依頼範囲に閉じる
- 関連のない命名変更や整理を混ぜない
- 既存パターンがある場合は再利用を優先する

### 2. build reliability 優先
bootstrap phase:
- `pnpm install --frozen-lockfile`
- `pnpm typecheck`
- `pnpm build`

ongoing development phase:
- `pnpm typecheck`
- `pnpm build`
- `pnpm lint`（導入済みの場合）

機能を足すより、壊さず通すことを優先する。

### 3. server-first
- 秘密情報を扱う処理は server-only に閉じる
- DBアクセスは client component に置かない
- 認証・認可・監査の起点は server 側に置く

### 4. 真実源の優先順位を守る
1. migration / 実DB schema
2. typed schema
3. PJ docs
4. 既存コード
5. 過去会話

### 5. 推測しない
- 列名を推測しない
- enum値を推測しない
- status の遷移を推測しない
- デザインを毎回独自解釈しない

## 実装の基本姿勢
- まず既存実装を探す
- 既存の責務分割に寄せる
- route handler は薄く保つ
- DB書き込みは repository / store に集約する
- 入力値は validate → normalize → persist の順で処理する
- SQL は必ず parameterized にする
- ログに secrets / tokens / raw personal data を出さない

## bootstrap phase の追加原則
- `pnpm` 以外を使わない
- `packageManager` は pinned にする
- Node major は `.nvmrc` と `engines.node` で固定する
- `pnpm-lock.yaml` 以外の lockfile を置かない
- lockfile を手書きしない
- install/build hook で migration を自動実行しない
- `app/page.tsx` は DB なしでも build-safe にする
- server component から自前 API を self-fetch しない
- DB module は import 時に env 不足で throw しない

## Next.js 固有の原則
- UI は server component を第一候補にする
- client component は必要な最小範囲に閉じる
- DBアクセスや secrets 利用がある route は Node runtime を使う
- Edge runtime は `[edge]` と互換性の明示がある場合のみ採用する
- server actions は小さく保ち、認可と検証を省略しない

## 完了条件
### bootstrap phase
- required fileset が揃っている
- route typing の既知の罠を避けている
- DB module が lazy / server-only / graceful
- `pnpm typecheck` を壊さない
- `pnpm build` を壊さない
- lint は設定した場合のみ壊さない
- secret が client / logs / next.config に露出していない

### ongoing development phase
- 依頼された仕様を満たす
- 影響範囲が最小差分に閉じている
- 型エラーがない
- production build を壊していない
- lint 導入済みなら lint を壊していない
- DBアクセスが parameterized である
- 秘密情報が client やログへ出ていない
- 必要な docs / typed schema / migration が同期している

## 禁止事項
- 口頭仕様だけで DB を更新する
- route / component に生SQLを散らす
- 同じ責務の helper を複数箇所に増やす
- UI の状態表示を画面ごとに変える
- 使われていない巨大整理を一緒に入れる
- 依頼されていない package 追加を行う
- Node 前提の DB処理を無断で Edge に載せる
- fake lockfile を置く

## 例外の扱い
例外は許可制です。  
例外を入れる場合は、PJ側の `PROJECT_RULES.md` に以下を記録します。

- 何が例外か
- なぜ例外が必要か
- どこまでが例外か
- いつ見直すか
