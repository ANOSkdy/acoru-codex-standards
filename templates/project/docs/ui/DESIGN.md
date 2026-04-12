# DESIGN

## 目的
このPJの見た目と操作感を固定するドキュメントです。  
共通標準の上に、このPJ固有のテーマ差分だけを載せます。

## Design goals
- `<例: dense but calm admin UI>`
- `<例: speed of decision over visual novelty>`
- `<例: low cognitive load for repeated operation>`

## Tokens
### Spacing
- Base step: `4px`
- Preferred gaps: `8 / 12 / 16 / 24 / 32`

### Radius
- small: `<例: 6px>`
- medium: `<例: 10px>`
- large: `<例: 14px>`

### Typography
- page title: `<size / weight>`
- section title: `<size / weight>`
- body: `<size / weight>`
- caption: `<size / weight>`
- numeric emphasis: `<size / weight>`

### Semantic colors
- primary: `<用途>`
- neutral: `<用途>`
- success: `<用途>`
- warning: `<用途>`
- error: `<用途>`
- info: `<用途>`

## Component rules
### Buttons
- Primary: main action only
- Secondary: supporting action
- Ghost: low-emphasis action
- Destructive: delete / irreversible action only

### Inputs
- fixed height family: `<例: 40 / 44>`
- label required: yes
- helper text position: below field
- field error position: below helper text

### Cards
- Use for grouped information
- Avoid deep nesting
- Keep header / body / footer structure consistent

### Badges
- status only
- semantic colors only
- no decorative one-off badges

## Page patterns
### List page
- title
- filters
- primary action
- table
- empty/loading/error handling

### Detail page
- summary section
- main body
- related activity
- side actions

### Form page
- grouped fields
- helper text only when needed
- clear submit / cancel / destructive placement

## Accessibility
- focus state required
- color alone must not encode meaning
- error states must be textually explicit
- keyboard navigation must remain usable
