# MIGRATION_RULES

## 目的
schema change を安全に前進させ、会話や docs ではなく migration を実装の正本にします。

## 原則
- migration は forward-only
- 1 migration 1 concern
- 既存 migration の書き換え禁止
- migration とコード変更は整合させる
- 破壊的変更は expand / contract で段階的に行う

## 命名規則
推奨形式:
`YYYYMMDDHHMM__verb_object.sql`

例:
- `202604121030__create_generation_jobs.sql`
- `202604121140__add_status_to_generated_decks.sql`
- `202604121300__rename_request_type_to_content_type.sql`

## 基本ルール
### 追加
- 新列追加はできるだけ additive に行う
- 既存データへの影響がある default は慎重に設定する
- まず nullable 追加 → backfill → constraint 強化、を基本形とする

### 変更
- rename はアプリ側への影響が大きい
- rename が必要なら、影響 query の列挙を先に行う
- 互換期間を持てるなら、新旧併存の移行期間を作る

### 削除
- いきなり drop しない
- 参照ゼロ化と移行完了を確認してから contract する

## rollout の基本順
### additive change
1. migration で追加
2. typed schema 更新
3. アプリを新列対応
4. 必要なら backfill
5. docs 同期

### breaking change
1. 新列追加または互換レイヤ追加
2. アプリを両対応
3. backfill
4. 旧参照の削除
5. 旧列 drop

## backfill
- 大きい backfill は migration に無理やり書かない
- 重い更新は別 job / script を検討する
- backfill の対象件数、再実行方針、失敗時復旧を PR に書く

## 必須同期
migration を追加したPRでは、少なくとも次を確認します。

- typed schema
- repository query
- validation / normalize
- PJ docs (`SCHEMA.md`, `ENUMS_AND_STATUSES.md` など)
- API contract
- job / audit への影響

## 禁止事項
- 会話や wiki だけ更新して migration を置かない
- column 名の変更を docs だけで済ませる
- 本番互換性を考えず not null を即時追加する
- 長時間ロックの危険が高い変更を無警戒で入れる

## PRに書くべきこと
- migration の目的
- additive か breaking か
- アプリとの適用順
- backfill の要否
- 監査対象となる query / table
