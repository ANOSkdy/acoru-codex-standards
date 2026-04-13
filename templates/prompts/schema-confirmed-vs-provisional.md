# Schema confirmed vs provisional prompt

## 使い方
PJ固有資料の初期整備3本目の prompt。  
schema / enum / status / process state を confirmed / provisional / TODO に分けて整理し、後続実装の迷いを減らす。

## Prompt
```text
Organize schema and state definitions into implementation-safe documentation.

Primary goal:
- Clarify what is confirmed vs provisional for DB and process/state logic.

Read first:
1. `docs/product/PROJECT_INVENTORY.md`
2. existing `docs/db/SCHEMA.md`
3. existing `docs/db/ENUMS_AND_STATUSES.md`
4. existing `docs/process/PROCESS_RULES.md` (if present)
5. migrations / schema definitions / typed schema / repository code
6. route handlers / server actions / jobs / webhook handlers

Create or update:
- `docs/db/SCHEMA.md`
- `docs/db/ENUMS_AND_STATUSES.md`
- optionally `docs/process/PROCESS_RULES.md` when process rules are clearly grounded

Required classification in each updated file:
- Confirmed
- Provisional
- TODO (project-specific)

Required content coverage:
1. Schema grounding
   - confirmed tables / columns / relations
   - observed access patterns (read/write paths)
   - provisional tables / columns (if inferred but not confirmed)
2. Enum/status grounding
   - confirmed enums/statuses and where they are used
   - saved values vs display labels (if visible)
   - naming conflicts or deprecated terms (if found)
3. Process/state grounding
   - confirmed transitions
   - provisional transitions
   - key workflows and stateful steps
   - async jobs / cron / webhook / idempotency-sensitive actions when evidence exists

Priority rules:
- Treat migrations/schema/repository code as higher-trust sources than narrative docs.
- Do not mark uncertain facts as Confirmed.
- Do not silently merge conflicting names; record conflicts explicitly.

Output expectations:
- Focus on implementation safety for subsequent feature PRs.
- Keep wording concrete and diff-friendly.
- Include unresolved decisions under TODO (project-specific).
```
