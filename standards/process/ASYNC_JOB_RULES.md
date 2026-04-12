# ASYNC_JOB_RULES

## 目的
非同期ジョブを安全に扱い、二重実行・状態不明・再試行事故を防ぎます。

## 適用対象
- 生成処理
- バックフィル
- 外部API連携
- 重い集計
- 後追い通知や同期

## 推奨モデル
ジョブ系では、少なくとも次の概念を分けることを推奨します。

- request / parent entity
- job
- job event

request が user 起点の意図、job が実行単位、event が履歴です。

## 推奨 status
- `queued`
- `running`
- `succeeded`
- `failed`
- `canceled`

必要なら `retrying`, `timed_out` を加えてよいが、意味を docs に書く。

## enqueue ルール
- enqueue 前に重複実行可否を確認する
- 同一 request の多重 job 作成を防ぐ
- 入口で idempotency を考慮する

## execute ルール
- start 時刻を記録する
- running へ遷移する
- 重要節目で job event を記録する
- 外部API呼び出しは timeout を持つ
- 完了時に終端 status へ遷移する

## retry ルール
- retryable error と permanent failure を分ける
- retry 回数上限を持つ
- backoff を持つ
- retry 前提なら job payload を再実行可能に保つ

## timeout / heartbeat
長いジョブは、次を検討する。

- heartbeat / touched_at
- lease の期限
- timeout 後の status
- 途中失敗の event 記録

## cancel
- cancel 可能な status を限定する
- cancel 後の後続副作用を明示する
- 外部処理を止められないなら、UI にもその前提を出す

## event 記録
event には次を推奨する。

- job_id
- event_type
- message
- payload summary
- created_at

message は人間が復旧判断できる粒度を目指す。  
ただし secret や raw prompt 全文は慎重に扱う。

## 監査観点
- 二重起動しないか
- 失敗時に原因が追えるか
- 中断 / timeout の見え方があるか
- UI の status 表示と整合しているか
