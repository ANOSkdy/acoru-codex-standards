# TABLE_SPECS

## 目的
このPJで使う一覧テーブルごとの個別仕様を定義します。  
共通ルールではなく、各 table の列順・ソート・mobile 方針をここに記録します。

## Spec format
各テーブルについて次を記載します。

- page / route
- data source
- default sort
- filters
- columns
- row action
- empty state
- mobile strategy

---

## Example: Generation requests table

### Route
`/requests`

### Data source
`GET /api/requests`

### Default sort
- `created_at desc`

### Filters
- status
- owner
- date range

### Columns
| Order | Column | Label | Align | Width hint | Null display | Notes |
|---|---|---|---|---|---|---|
| 1 | `title` | タイトル | left | wide | `—` | main identifier |
| 2 | `status` | 状態 | left | narrow | `—` | shared badge rule |
| 3 | `owner_name` | 作成者 | left | medium | `—` | |
| 4 | `created_at` | 作成日時 | left | medium | `—` | fixed format |
| 5 | `updated_at` | 更新日時 | left | medium | `—` | fixed format |
| 6 | `actions` |  | right | narrow | `—` | detail + more |

### Row action
- primary: open detail
- destructive: not shown inline

### Empty state
- no data: create first request
- filtered empty: clear filters

### Mobile strategy
- keep horizontal scroll
- collapse secondary dates if needed

## Project tables
以下の形式で各テーブルを追記する。
