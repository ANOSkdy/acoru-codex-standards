# API_RULES

## 目的
route handler / server action / internal API の設計を揃え、validate・認可・response shape のズレを防ぎます。

## 基本原則
- route handler は薄くする
- validate は入口で行う
- 認証 / 認可は早めに行う
- DB書き込みは repository / service に寄せる
- response shape を統一する
- secrets や内部エラー詳細を返さない

## 実行環境
- DBアクセスを伴う handler は Node runtime を基本とする
- Edge runtime は `[edge]` 指定かつ依存互換性確認済みの場合のみ

## HTTP メソッド
- `GET`: 読み取り
- `POST`: 作成 / 実行開始
- `PATCH`: 部分更新
- `PUT`: 全体置換が必要な場合のみ
- `DELETE`: 削除または論理削除トリガー

## 入力処理
- path param, query, body を明示的に parse する
- Zod 等で validate する
- validate 後に normalize を行う
- 不正入力は 4xx で返す

## response 形
成功:
```json
{ "ok": true, "data": {} }
```

失敗:
```json
{
  "ok": false,
  "error": {
    "code": "validation_error",
    "message": "入力内容を確認してください。"
  }
}
```

## ページング
一覧APIは次を固定する。

- sort の既定値
- page / pageSize あるいは cursor
- total が必要か
- query param 名
- filter 値の定義

## 認証・認可
- actor は server 側で解決する
- client が送る role / org_id / owner_id を鵜呑みにしない
- resource scope を確認してから取得 / 更新する

## caching
- user 固有データは無造作に cache しない
- mutation 後の再検証 / revalidate の責務を明確にする
- stale data が業務上問題になるAPIは慎重に扱う

## ログ
- request body 全文を安易に出さない
- secret, token, SQL, PII の raw 出力禁止
- error code と trace id 相当の相関情報を優先する

## 反パターン
- handler 内に長い業務ロジック
- validate なしで body を repository に渡す
- status code は 200 だが body だけで失敗を表す
- 例外メッセージをそのまま user に返す
