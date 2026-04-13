# Product doc draft prompt

## 使い方
`project-inventory.md` 実行後に使う2本目の prompt。  
`docs/product/PROJECT_INVENTORY.md` と repo の事実を使って、PJ固有 product docs の初稿を作る。

## Prompt
```text
Draft project-specific product documents from repository evidence.

Primary inputs:
- `docs/product/PROJECT_INVENTORY.md`
- current repository code/docs/config evidence

Create or update:
- `docs/product/FEATURE_LIST.md`
- `docs/product/SCREEN_FLOW.md`
- `docs/product/USE_CASES.md`

Required classification in every target file:
- Confirmed
- Provisional
- TODO (project-specific)

Required content coverage:
1. Project purpose summary
   - one short paragraph, grounded in observable evidence
2. Feature list
   - confirmed features
   - provisional features (inferred from code structure/routes/docs)
   - out-of-scope candidates
3. Screen/page inventory and flow
   - observed screens/pages
   - likely primary navigation
   - key screen transitions where evidence exists
4. Actors and use cases
   - actor list
   - main actor goals
   - operational/admin use cases if visible in repository evidence

Constraints:
- Do not create fake certainty.
- Do not add product strategy that is not grounded in repo evidence or PROJECT_INVENTORY.
- Keep documents concrete enough to guide implementation and review.
- If evidence is weak, place the item under Provisional or TODO.

Output expectations:
- Update only the three target files.
- Use practical, concise language.
- Keep sections directly actionable for upcoming implementation PRs.
- Explicitly preserve separation between Confirmed / Provisional / TODO.
```
