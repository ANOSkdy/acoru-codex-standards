# PROJECT_RULES

## 目的
この文書は、共通標準ではなくこのPJだけに適用する差分ルールをまとめる場所です。  
共通ルールと衝突する場合は、ここで例外を明示します。

## Project summary
- Name: `<PROJECT_NAME>`
- Goal: `<このPJの主目的>`
- Users: `<主な利用者>`
- Primary flows:
  - `<flow 1>`
  - `<flow 2>`
  - `<flow 3>`

## Tech stack
- Framework: Next.js App Router
- Language: TypeScript
- Package manager: pnpm
- Deploy: Vercel
- Database: Neon Postgres
- Runtime: Node by default for DB work
- State / form libraries: `<採用しているもの>`
- UI system: `<shadcn/ui / custom / etc>`

## Architecture decisions
- DB access lives in: `<例: src/lib/repositories>`
- Business services live in: `<例: src/lib/services>`
- Validation lives in: `<例: src/lib/validation>`
- Auth / permissions live in: `<例: src/lib/auth>`

## Project-specific truth sources
- real schema: `<migration directory / managed DB / etc>`
- typed schema: `<path>`
- enum registry: `<path>`
- process docs: `<path>`

## Runtime rules
- DB routes/actions must run on Node: `yes / no`
- Edge allowed only for: `<具体例>`
- Long-running jobs handled by: `<queue / cron / external worker>`

## Non-negotiables for this project
- `<例: tenant isolation is mandatory>`
- `<例: generated content must keep audit history>`
- `<例: requests are idempotent by request_id>`

## Allowed exceptions to common standards
- `<例外があれば記載。なければ "none">`

## Delivery gates
- typecheck, lint, build must pass
- schema / docs / code must be aligned
- UI must follow shared table/form/feedback rules
- secrets must remain server-only
