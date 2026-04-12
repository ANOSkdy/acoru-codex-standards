# IDEMPOTENCY_RULES

## 目的
再送・再試行・画面連打・ジョブ再実行による二重作成を防ぎます。

## 冪等性を考えるべき操作
- 作成系 API
- 非同期ジョブ開始
- 外部サービスへの送信
- billing / quota に影響する操作
- 重い生成処理
- webhook 受信処理

## 基本原則
- 同じ意図の再送は同じ結果に収束させる
- 物理的に二重作成できないなら DB constraint も使う
- client の善意だけに依存しない

## key の考え方
idempotency key は次のいずれかで構成する。

- client からの一意キー
- actor + operation + logical target
- request hash + time window

どれを使うかは操作の意味に合わせる。

## 保存
冪等性を保証するには、少なくとも次を保存・判定できる必要がある。

- key
- operation
- actor
- logical target
- result reference
- created_at / expires_at

## duplicate の扱い
重複検出時の方針を決める。

- 既存結果を返す
- 進行中を返す
- conflict として返す

操作ごとに統一し、PJ docs に書く。

## job と組み合わせる場合
- request 作成と job 作成を別々に二重実行しない
- 同一 request から複数 running job が立たないよう制約する
- event の二重記録にも注意する

## 反パターン
- 画面の disabled button だけで二重防止した気になる
- retry で毎回新レコードを作る
- idempotency key の有効期限や再利用方針が無い
