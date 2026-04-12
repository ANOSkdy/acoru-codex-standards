# Foundation refresh prompt for an existing repo

```text
You are updating an existing Next.js App Router + TypeScript repo to align its foundation with the shared bootstrap standards.

Read these files first:
1. standards/bootstrap/BOOTSTRAP_OVERVIEW.md
2. standards/bootstrap/REPRODUCIBLE_BUILD_RULES.md
3. standards/bootstrap/BUILD_SAFE_BASELINE_RULES.md
4. standards/bootstrap/ENV_BASELINE_RULES.md
5. standards/bootstrap/NEXT_ROUTE_TYPE_SAFETY_RULES.md
6. standards/bootstrap/PG_IMPLEMENTATION_RULES.md
7. standards/bootstrap/MIGRATION_RUNNER_BASELINE.md
8. standards/bootstrap/BOOTSTRAP_ACCEPTANCE_CRITERIA.md

Task:
- audit the existing repo foundation,
- align it to the shared bootstrap baseline with the smallest safe diff,
- preserve existing product behavior wherever possible.

Audit first:
- package manager / lockfile policy
- Node pinning
- required fileset presence
- build-safe homepage
- self-fetch risks
- DB module lazy initialization
- route typing safety
- migration runner shape
- env / secret hygiene

Constraints:
- minimal diff only
- do not replace working business logic unless foundation safety requires it
- do not introduce heavy new dependencies
- keep DB access on Node runtime
- use parameterized SQL
- do not expose secrets in client code or logs

Acceptance:
- foundation mismatches fixed or explicitly listed
- `pnpm typecheck` passes or is preserved
- `pnpm build` passes or is preserved
- if lint exists, it remains green
- package manager / Node / lockfile policy aligned
- no build-time DB dependency on homepage

Output:
- first, list the foundation mismatches you found
- then one fenced code block with git unified diff only
- include only changed files
```
