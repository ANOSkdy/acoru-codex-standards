# SCHEMA

## 目的
この文書は、このPJで実装に使う table / column / 制約を人間向けに整理するための台帳です。  
正本は migration / 実DB / typed schema ですが、実装前の確認とレビュー効率を上げるために必須とします。

## 使い方
- table を追加・変更したら更新する
- migration と同じPRで更新する
- 「何を保存する列か」「どこから来る値か」まで書く
- UI値やAI値とDB値が違う場合は、その差も書く

## Table catalog
| Table | Purpose | Primary key | Notes |
|---|---|---|---|
| `<table_name>` | `<役割>` | `<id>` | `<補足>` |

## Table spec template
以下の形式で table ごとに記載します。

---

## `<table_name>`

### Purpose
`<このtableの責務>`

### Keys and constraints
- Primary key: `<id>`
- Foreign keys:
  - `<column>` → `<target_table.column>`
- Unique:
  - `<constraint>`
- Important indexes:
  - `<index>`

### Columns
| Column | Type | Null | Default | Allowed values | Source | Notes |
|---|---|---:|---|---|---|---|
| `id` | `uuid` | no | generated | - | system | primary key |
| `<status_column>` | `text` | no | `'queued'` | `queued/running/succeeded/failed/canceled` | system | see enum registry |
| `<payload_json>` | `jsonb` | yes | `null` | schema in docs | server | normalized before save |

### Write rules
- Inserted by: `<route/service/job>`
- Updated by: `<route/service/job>`
- Never update directly: `<columns>`
- Normalize before save: `<yes/no and how>`

### State notes
- Related process: `<process name>`
- State transitions: `<簡潔に>`

### Query notes
- Main reads: `<list page / detail page / job worker>`
- Main writes: `<create / update status / delete>`
- Performance considerations: `<index, pagination, join notes>`

## Example
以下は記入例です。

### `generation_jobs`
- Purpose: generation request を非同期実行する単位
- Columns:
  - `request_id`: parent request
  - `status`: job lifecycle status
  - `attempt_count`: retry count
  - `started_at` / `finished_at`: execution timeline
- Write rules:
  - create on enqueue
  - update status only through service / worker
  - record job events on important transitions
