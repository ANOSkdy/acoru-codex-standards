# New feature prompt

## 使い方
新機能実装を Codex に依頼する前に、この prompt を PJ 固有情報で埋めて使う。  
実装前監査が未実施なら、先に `pre-implementation-audit.md` を使う。

## Prompt
```text
You are working in a Next.js App Router + TypeScript project deployed via GitHub → Vercel.
Default assumptions:
- package manager: pnpm
- database: Neon Postgres via server-only env
- DB work must stay on Node runtime unless explicitly marked [edge]
- prefer server components / route handlers / server actions
- minimal diff only
- strong build reliability is required

Read these files first and treat them as required context:
1. AGENT.md
2. PROJECT_RULES.md
3. docs/db/SCHEMA.md
4. docs/db/ENUMS_AND_STATUSES.md
5. docs/ui/DESIGN.md
6. docs/ui/TABLE_SPECS.md
7. docs/api/API_CONTRACTS.md
8. docs/process/PROCESS_RULES.md

Task:
- Implement: <feature goal>
- Constraints:
  - reuse existing repository / service / UI patterns
  - do not guess column names, enum values, or statuses
  - do not expose secrets in client code or logs
  - use parameterized SQL only
  - keep route handlers thin
  - add only the minimum files needed

Before coding:
- list affected tables and columns
- confirm existing repository / service functions to reuse
- report any schema or enum mismatch before making changes

Acceptance:
- feature complete
- pnpm typecheck passes
- pnpm build passes
- if lint is configured, pnpm lint passes
- schema / docs / code aligned
- no large refactor
- no unrelated cleanup

Output:
- first, a concise implementation plan
- then one fenced code block with git unified diff only
- include only changed files
```
