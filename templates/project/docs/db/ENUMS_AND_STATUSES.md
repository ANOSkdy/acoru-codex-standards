# ENUMS_AND_STATUSES

## 目的
この文書は、このPJで使う enum / status の公式台帳です。  
DB保存値、UI表示値、AI入力の normalize 先をここに揃えます。

## 使い方
- enum / status を追加したら必ず更新する
- 保存値は英小文字 snake_case
- UI表示は別列で管理する
- AI / 外部入力の揺れは normalize ルールを書く

## Registry format
| Name | Scope | DB value | UI label | Input aliases | Initial | Transitions | Notes |
|---|---|---|---|---|---|---|---|

## Example: job_status
| Name | Scope | DB value | UI label | Input aliases | Initial | Transitions | Notes |
|---|---|---|---|---|---|---|---|
| `job_status` | `generation_jobs.status` | `queued` | 待機中 | `pending` | yes | `running`, `canceled` | initial |
| `job_status` | `generation_jobs.status` | `running` | 処理中 | `in_progress`, `processing` | no | `succeeded`, `failed`, `canceled` | active |
| `job_status` | `generation_jobs.status` | `succeeded` | 完了 | `done`, `completed` | no | - | terminal |
| `job_status` | `generation_jobs.status` | `failed` | 失敗 | `error` | no | `queued` | retryable by policy |
| `job_status` | `generation_jobs.status` | `canceled` | 中止 | `cancelled` | no | - | terminal |

## Project enums
以下をこの形式で埋めていきます。

### `<enum_or_status_name>`
- Scope:
- DB values:
- UI labels:
- Input aliases:
- Initial value:
- Allowed transitions:
- Unknown input policy:
- Notes:

## Normalize policy
- unknown value は保存しない
- normalize 可能な alias だけ吸収する
- ambiguity が高い値は validation error にする
