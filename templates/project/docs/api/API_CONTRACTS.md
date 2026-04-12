# API_CONTRACTS

## 目的
このPJの route / server action / internal API の契約を一覧管理します。

## Contract format
各APIについて次を記載する。

- route
- method
- purpose
- auth
- input
- output
- errors
- side effects
- touched tables

---

## Example: Create generation request

### Route
`POST /api/generation-requests`

### Purpose
新しい generation request を作成し、必要なら job を enqueue する。

### Auth
- required: yes
- scope: authenticated user within current project/org

### Input
```json
{
  "title": "Quarterly review deck",
  "audienceType": "executive",
  "contentType": "summary"
}
```

### Output
```json
{
  "ok": true,
  "data": {
    "requestId": "req_123",
    "status": "queued"
  }
}
```

### Errors
- `validation_error`
- `forbidden`
- `conflict`
- `internal_error`

### Side effects
- insert request row
- optionally insert job row
- audit log on success

### Touched tables
- `generation_requests`
- `generation_jobs`
- `audit_logs`

## Project APIs
この形式で API を追記する。
