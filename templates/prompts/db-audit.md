# DB audit prompt

## 使い方
機能実装の前段で、対象 table / column / query / enum の整合を確認する専用 prompt。

## Prompt
```text
Perform a DB alignment audit before any implementation.

Project assumptions:
- Next.js App Router + TypeScript
- pnpm
- Neon Postgres via server-only env
- migration / real DB schema is the source of truth

Read first:
1. AGENT.md
2. PROJECT_RULES.md
3. docs/db/SCHEMA.md
4. docs/db/ENUMS_AND_STATUSES.md
5. relevant migration files
6. typed schema
7. relevant repository / service / route files

Audit target:
<feature or flow>

Tasks:
1. list all affected tables
2. list the exact columns referenced by the existing implementation
3. compare docs vs migration vs typed schema vs code
4. list mismatches only
5. state which source should be treated as truth
6. recommend the minimum repair path

Rules:
- no implementation yet
- do not guess missing schema details
- be explicit about uncertainty

Output:
- tables involved
- exact mismatches
- recommended fix order
- no code unless asked
```
