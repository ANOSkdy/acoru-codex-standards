# Project inventory prompt

## 使い方
PJ固有資料の初期整備を始める最初の prompt。  
repo から観測できる事実だけを抽出し、`docs/product/PROJECT_INVENTORY.md` の初稿を作る。

## Prompt
```text
Create an initial project inventory from the current repository.

Primary goal:
- Produce `docs/product/PROJECT_INVENTORY.md` using only evidence grounded in code, docs, migrations, and config.

Read first:
1. AGENT.md (if present)
2. PROJECT_RULES.md (if present)
3. existing docs under docs/
4. app/ , src/ , pages/ , components/ , lib/ , server/ (if present)
5. api route files and server action files
6. db / prisma / drizzle / migrations / schema files
7. env examples, deployment config, CI/workflow files

Required inventory sections:
1. Repo identity
   - framework/runtime/package manager/deploy target
   - main app directories and notable architectural choices
2. App routes / layouts
   - observed pages, route groups, layouts, dynamic segments
3. API routes
   - method + path + high-level purpose (only if grounded)
4. DB evidence
   - DB-related files
   - migrations and schema sources
   - observed tables / columns / relations (confirmed only)
5. UI evidence
   - screen/page candidates from routes
   - notable components, forms, and tables
6. Integrations and operations hints
   - external services, env usage, webhook hints, cron/async hints
7. Auth / authorization hints
   - auth providers, middleware, role/status checks, guard points
8. Unknowns / open questions
   - gaps that block implementation certainty
9. Confirmed vs inferred
   - keep explicit separation

Constraints:
- Do not invent business intent.
- Do not invent schema, columns, enums, statuses, or APIs not present in repository evidence.
- Separate facts (confirmed) from inference (provisional).
- When uncertain, write it as unknown/question.

Output expectations:
- Create or update only: `docs/product/PROJECT_INVENTORY.md`
- Keep it concise, implementation-oriented, and evidence-linked.
- Include these headings:
  - Confirmed
  - Inferred (Provisional)
  - Unknowns / Open Questions
- For each major bullet, include evidence pointers (file paths).
```
