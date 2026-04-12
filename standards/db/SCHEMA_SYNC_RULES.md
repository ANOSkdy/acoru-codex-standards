# SCHEMA_SYNC_RULES

## 目的
schema change のたびに docs / typed schema / 実装を同期し、設計書・コード・実DBの三重ズレを防ぎます。

## いつ使うか
- migration を追加したとき
- 既存 query の列名を直すとき
- 実DBと docs の不一致を見つけたとき
- status / enum を追加・変更したとき

## 同期対象
schema change が入ったら、次を同一PRで確認します。

1. migration
2. typed schema
3. repository / store query
4. validation / normalize
5. API contracts
6. PJ docs
7. UI表示や状態ラベル
8. tests / seed / mock があればそれら

## 実装前監査
変更前に、最低限次を洗います。

- 対象 table
- 触る column
- 参照箇所
- insert / update / select の実装箇所
- enum / status の定義箇所
- UIラベルと DB保存値の対応

## 不一致を見つけた時のルール
### 1. まず正本を特定する
- migration / 実DB があるならそれを最優先
- docs をそのまま正と決めつけない

### 2. 差分を列挙する
例:
- docs は `request_type`
- code は `type`
- DB は `content_type`

この状態なら、どこを正にするかを明示した上で修正する。

### 3. fix を分ける
- schema change が必要な fix
- docs sync だけの fix
- query の参照修正
を混ぜすぎない

## 同期完了の判断基準
次を満たしたら同期済みとみなします。

- typed schema に正式列名が反映されている
- repository が正式列名を参照している
- enum / status registry が更新されている
- PJ docs に説明がある
- API 入出力と UI表示が矛盾していない

## 監査観点
- 列名
- 型
- null可否
- default
- enum 値
- state transition
- FK
- created_at / updated_at の扱い
- JSON keys

## 反パターン
- code だけ先に合わせて docs を放置
- migration 後に旧列名で query を残す
- UIラベルを DB値と混同
- `settings_json` と `payload_json` のような曖昧列を複数箇所で別解釈する
