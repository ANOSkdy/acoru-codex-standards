# DEPENDENCY_BASELINE_POLICY

## 目的
初回基盤では、依存を増やしすぎず、しかし production-safe に動く最小セットを固定します。

## baseline の原則
- smallest dependency set that still gives a clean, production-safe baseline
- exact pin only
- ORMs は baseline に入れない
- DB は `pg` を直接使う
- validate は `zod`
- server-only boundary は `server-only`
- standalone script の env load には `@next/env`

## baseline 必須依存
runtime deps:
- `next`
- `react`
- `react-dom`
- `pg`
- `zod`
- `server-only`
- `@next/env`

dev deps:
- `typescript`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@types/pg`

## 依存追加のルール
- lint tooling は baseline では任意
- UI component library は baseline では追加しない
- heavy state library は baseline では追加しない
- test runner は baseline では追加しない
- ORM は baseline では追加しない
- AI dependency は AI feature を実装する時だけ追加可

## 特記事項
### Airtable
Airtable が出てきた場合でも、baseline では SDK を増やさず、server-side REST fetch + `Authorization` header を基本にする。

### AI feature
AI機能を実装する場合のみ、server-side call に限定して Gemini Flash 3.0 を使う。  
client へ AI key を出さない。  
AI feature がないのに AI deps を先に入れない。

## package 追加の判断基準
次のどれかを満たす時だけ追加する。

- build safety を上げる
- security / validation を上げる
- boilerplate が大幅に減る
- 複数機能で確実に再利用される

満たさない場合は baseline に入れない。
