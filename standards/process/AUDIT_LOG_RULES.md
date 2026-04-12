# AUDIT_LOG_RULES

## 目的
重要な変更や権限操作の追跡可能性を確保し、事故時の復旧判断を容易にします。

## audit log を推奨する操作
- 重要設定変更
- 権限 / 共有範囲変更
- 削除 / 復元
- 外部連携接続・切断
- ジョブ手動再実行
- ステータス手動変更

## 記録項目
最低限、次を推奨します。

- actor_id
- action
- target_type
- target_id
- scope_id / org_id など
- before summary
- after summary
- metadata
- created_at

## before / after
フルの生データ差分ではなく、要約差分を基本にします。  
理由:

- ノイズが多くなりやすい
- PII / secret が混ざりやすい
- 読み手の復旧判断に必要な情報は限られる

## metadata に入れてよいもの
- request id
- job id
- source (`api`, `server_action`, `job`, `admin_console`)
- reason
- affected field names

## 入れてはいけないもの
- raw secrets
- access token
- DB credential
- 過剰な個人情報
- raw SQL
- 巨大 prompt / huge payload 全文

## 失敗操作
重要な失敗も audit 対象にしてよい。  
ただし application log と役割を混同しない。

- audit log: 何の操作が失敗したか
- application log: なぜ失敗したか

## 読みやすさ
- action 名は安定した verb を使う
- target_type は限定された語彙にする
- admin が読んで判断できる粒度にする
