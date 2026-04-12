# DB_RULES

## 目的
DBを唯一の実装基盤として扱い、列名・型・状態値のズレを防ぎます。

## デフォルト前提
- DB: Neon Postgres
- 接続: server-only env
- 実行: Node runtime 優先
- SQL: parameterized 必須

## 真実源
1. migration / 実DB schema
2. typed schema
3. PJ docs
4. 既存コード

重要: 既存コードと docs がずれていたら、まず migration / 実DB を確認する。  
実装時に「たぶんこの列だろう」で進めない。

## DBアクセスの責務
### 原則
- 読み書きの中心は `repository` / `store`
- route handler へ生SQLを散らさない
- component から DB client を直接呼ばない
- 書き込み系は service 経由を基本とする

### 理由
- column knowledge を一箇所へ寄せるため
- status 遷移と transaction を一元管理するため
- PRごとの差分監査を容易にするため

## SQLルール
- 文字列連結で SQL を組み立てない
- parameterized query を使う
- 動的ソートやフィルタは allowlist で制御する
- `SELECT *` は避け、必要列を明示する
- 曖昧な alias を避ける

## 型と null の扱い
- nullable は「本当に未設定が意味を持つ場合だけ」
- 空文字と null を混在させない
- timestamp は timezone の扱いを揃える
- API返却時に DB の生null表現を無秩序に露出しない

## JSON列の扱い
JSON列は最後の手段です。  
使う場合は次を満たします。

- 固定カラム化が過剰なときだけ使う
- キー定義を docs に書く
- versioning が必要なら `schema_version` を含める
- 保存前に validate / normalize する
- 「何でも入れる箱」にしない

## transaction
次のケースでは transaction を検討します。

- 親子レコードを同時作成する
- status 更新と event 記録を同時に行う
- 同じ業務単位で複数 table を更新する
- audit log を同一整合性で残したい

## index / constraint
- 一意性が仕様で必要なら DB constraint を張る
- 重複防止をアプリだけに任せない
- 外部キーが仕様上必要なら docs と schema に明記する
- 検索で多用する条件は index を検討する

## security
- secret は DBへ raw で保存しない
- ログに SQL全文や credential を残さない
- user入力をそのまま SQL に埋め込まない
- 認可前に広いデータを取得しない

## 実装前チェック
- 対象 table は何か
- 使う column は何か
- 既存 repository はあるか
- enum / status は registry にあるか
- migration の追加が必要か
- docs 同期が必要か

## 反パターン
- route ごとに別名で同じ列を扱う
- `type` や `status` の意味が table ごとにバラバラ
- UI値をそのまま DB へ保存する
- 旧カラム名と新カラム名を同時に参照する
- schema change 後に typed schema を更新しない
