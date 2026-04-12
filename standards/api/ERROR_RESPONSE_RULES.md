# ERROR_RESPONSE_RULES

## 目的
エラーの返し方を統一し、UI・ログ・監査・再試行判断を安定させます。

## 標準フォーマット
```json
{
  "ok": false,
  "error": {
    "code": "validation_error",
    "message": "入力内容を確認してください。",
    "details": {}
  }
}
```

`details` は必要なときだけ返し、内部情報を含めない。

## 共通 error code
- `validation_error`
- `unauthenticated`
- `forbidden`
- `not_found`
- `conflict`
- `rate_limited`
- `precondition_failed`
- `retryable_error`
- `internal_error`

PJ固有コードはこれに追加してよいが、意味を docs に記録する。

## HTTP status の基本
- 400: validation_error
- 401: unauthenticated
- 403: forbidden
- 404: not_found
- 409: conflict
- 412: precondition_failed
- 429: rate_limited
- 500: internal_error
- 503: retryable_error / 一時的障害

## user 向け message
- 曖昧すぎない
- 内部実装を漏らさない
- 次の行動が分かるなら短く示す
- 英語例外文をそのまま見せない

## field error
フォームでは field error を form-level error と分ける。  
field error は field ごとに返せる構造を持ってよい。

例:
```json
{
  "ok": false,
  "error": {
    "code": "validation_error",
    "message": "入力内容を確認してください。",
    "details": {
      "fieldErrors": {
        "title": ["タイトルは必須です。"]
      }
    }
  }
}
```

## ログと user 表示の分離
- ログには root cause を残す
- user には安全な抽象化メッセージを返す
- trace id / request id を持てるならログ側に残す

## retryable / non-retryable
- 再試行可能かどうかを、内部運用では識別可能にする
- UIには必要なときだけ retry 導線を出す
- validation error を retryable にしない

## 禁止事項
- secret を error に含める
- SQL全文を error message に入れる
- internal stack trace を client に返す
- すべて 500 で返して終わる
