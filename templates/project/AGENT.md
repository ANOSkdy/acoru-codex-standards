# AGENT.md

## このファイルの目的
このPJで AI / Codex が最初に読む短い起点ファイルです。  
詳細は各 docs を参照しつつ、まずここで前提を揃えます。

## Priority of truth
1. migration / real DB schema
2. typed schema
3. project docs
4. existing code
5. old chat / old PR context

## Must-read order
1. `PROJECT_RULES.md`
2. `docs/db/SCHEMA.md`
3. `docs/db/ENUMS_AND_STATUSES.md`
4. `docs/ui/DESIGN.md`
5. `docs/ui/TABLE_SPECS.md`
6. `docs/api/API_CONTRACTS.md`
7. `docs/process/PROCESS_RULES.md`

## Default assumptions
- Next.js App Router
- TypeScript
- pnpm
- GitHub → Vercel
- Neon Postgres
- server-only env
- DB work runs on Node runtime by default
- Edge runtime only when explicitly approved

## Hard rules
- Do not guess column names, enum values, or statuses.
- Prefer minimal diffs.
- Reuse existing repository / service / UI patterns first.
- Keep route handlers thin.
- Use parameterized SQL only.
- Never expose secrets in client code or logs.
- Normalize UI / AI inputs before DB persistence.

## Before coding
- List affected tables and columns.
- Check existing repository / service functions.
- Confirm enum and status values from docs.
- Confirm UI consistency with design rules.
- Report mismatches before implementation.

## Completion gate
- feature complete
- `pnpm typecheck`
- `pnpm build`
- if lint is configured, `pnpm lint`
- schema / docs / code aligned
- no secret exposure

## Project-specific notes
- Replace this section with short PJ-specific exceptions only.
- Keep this file short. Put longer details in the docs folder.
