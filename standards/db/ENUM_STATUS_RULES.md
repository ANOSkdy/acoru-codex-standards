# ENUM_STATUS_RULES

## 目的
status, type, kind, mode などの定義を一元管理し、UI値・AI値・DB保存値の混線を防ぎます。

## 基本原則
- DB保存値を正とする
- UI表示名は別管理する
- AIや外部入力は normalize してから保存する
- status 遷移は明示する
- 自由入力の文字列をそのまま保存しない

## どこに置くか
各PJでは `docs/db/ENUMS_AND_STATUSES.md` を正規の台帳にする。  
実装では typed enum または string literal union を持ち、docs と一致させる。

## 推奨定義フォーマット
各項目について次を記載する。

- name
- scope
- DB保存値
- UI表示名
- 入力元
- normalize ルール
- 初期値
- 遷移可能値
- 廃止値

## status の基本方針
### 状態は意味ごとに分ける
- request status
- job status
- deck status
- slide status

`status` という同名でも、意味が違うなら docs で scope を分ける。

### 保存値の命名
- snake_case
- 英小文字
- 過去形 / 現在進行形の揺れを減らす

推奨例:
- `queued`
- `running`
- `succeeded`
- `failed`
- `canceled`

## normalize の考え方
AIやUIから以下のような揺れが来ても、保存前に正規化する。

例:
- `done` → `succeeded`
- `cancelled` → `canceled`
- `in_progress` → `running`

normalize 層を経由せず直接 DBへ入れない。

## `type` の扱い
`type` 単独は原則禁止。  
意味を明示した列名にする。

- `request_type`
- `content_type`
- `audience_type`
- `chart_type`

## 変更ルール
enum / status の追加変更時は次を同時更新する。

- typed enum / union
- docs registry
- normalize
- validation
- UIラベル
- filters / badge / table 表示

## 反パターン
- UIラベルを DB保存値として使う
- 画面ごとに label を変える
- 遷移制約なしに status を書き換える
- 同じ意味の値が複数存在する
