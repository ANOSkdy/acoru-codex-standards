# UI adjustment prompt

## 使い方
テーブル・フォーム・状態表示の統一、既存デザインへの寄せ、軽微なUI改善に使う。

## Prompt
```text
Adjust the UI with strict consistency to the project rules.

Project assumptions:
- Next.js App Router + TypeScript
- minimal diff
- reuse existing components
- do not introduce a new design language

Read first:
1. AGENT.md
2. PROJECT_RULES.md
3. docs/ui/DESIGN.md
4. docs/ui/TABLE_SPECS.md
5. relevant existing components
6. relevant page files

UI goal:
<describe the desired adjustment>

Rules:
- preserve existing architecture
- prefer existing UI primitives
- align table, form, and feedback states with docs
- do not redesign unrelated parts
- keep accessibility intact

Check specifically:
- loading / empty / error states
- null display
- button hierarchy
- table column order and actions
- mobile behavior

Acceptance:
- visually consistent with existing project UI
- minimal diff
- no new one-off component unless clearly necessary
- build remains stable

Output:
- concise approach
- one fenced code block with git unified diff only
```
