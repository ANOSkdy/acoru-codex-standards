# Bugfix prompt

## 使い方
既存機能の不具合修正に使う。  
DB や enum の不一致が疑われるなら、先に `db-audit.md` を使う。

## Prompt
```text
You are fixing a bug in a Next.js App Router + TypeScript project deployed via GitHub → Vercel.

Read these files first:
1. AGENT.md
2. PROJECT_RULES.md
3. docs/db/SCHEMA.md
4. docs/db/ENUMS_AND_STATUSES.md
5. docs/ui/DESIGN.md
6. docs/process/PROCESS_RULES.md

Task:
- Fix: <bug summary>
- Keep the diff as small as possible.
- Reuse existing repository / service / UI patterns.
- Do not guess column names, enum values, or statuses.
- Use parameterized SQL only.
- Keep secrets out of client code and logs.

Before coding:
- identify the exact failing path
- list affected tables / columns if DB is involved
- report any schema mismatch before changing code

Acceptance:
- bug fixed
- pnpm typecheck passes
- pnpm build passes
- if lint is configured, pnpm lint passes
- no unrelated cleanup
- schema / docs / code stay aligned

Output:
- first, a concise diagnosis
- then one fenced code block with git unified diff only
```
