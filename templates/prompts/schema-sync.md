# Schema sync prompt

## 使い方
migration を追加した後、typed schema / query / docs の同期漏れを洗うための prompt。

## Prompt
```text
Perform a schema synchronization pass for this project.

Project assumptions:
- Next.js App Router + TypeScript
- Neon Postgres via server-only env
- migration / real DB schema is the source of truth

Read first:
1. AGENT.md
2. docs/db/SCHEMA.md
3. docs/db/ENUMS_AND_STATUSES.md
4. relevant migration files
5. typed schema
6. repository / service / route files affected by the migration
7. docs/api/API_CONTRACTS.md
8. docs/process/PROCESS_RULES.md

Change introduced:
<describe migration or schema change>

Tasks:
1. identify every file that must change because of this schema change
2. verify column names, types, nullability, defaults, and statuses
3. identify stale queries or stale docs
4. prepare the minimum synchronized patch
5. update docs if required

Rules:
- do not change historical migrations
- prefer additive safe changes
- keep the patch focused
- use parameterized SQL only

Output:
- concise sync report
- one fenced code block with git unified diff only
```
