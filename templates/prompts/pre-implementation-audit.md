# Pre-implementation audit prompt

## 使い方
新機能・大きめ修正の前に必ず一度走らせる、最も重要な監査 prompt。

## Prompt
```text
Before implementing anything, perform a pre-implementation audit.

Project assumptions:
- Next.js App Router + TypeScript
- pnpm
- GitHub → Vercel
- Neon Postgres via server-only env
- DB work on Node runtime by default
- minimal diff and build reliability are mandatory

Read first:
1. AGENT.md
2. PROJECT_RULES.md
3. docs/db/SCHEMA.md
4. docs/db/ENUMS_AND_STATUSES.md
5. docs/ui/DESIGN.md
6. docs/ui/TABLE_SPECS.md
7. docs/api/API_CONTRACTS.md
8. docs/process/PROCESS_RULES.md
9. relevant migration files
10. typed schema
11. relevant repository / service / page files

Feature or fix target:
<target>

Audit tasks:
1. summarize the goal in one sentence
2. list affected tables and exact columns
3. list affected statuses / enums
4. list affected routes, server actions, repositories, and pages
5. identify existing patterns to reuse
6. identify mismatches or unknowns
7. propose the minimum implementation path
8. state whether a migration is required

Rules:
- no coding yet
- do not guess schema details
- highlight risks early
- keep the output concise and decision-oriented

Output:
- goal summary
- affected files/modules
- DB alignment findings
- UI alignment findings
- minimum implementation plan
- migration needed: yes/no
```
