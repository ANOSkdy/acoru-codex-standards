# NAMING_RULES

## 目的
名前のぶれは、実装のぶれと同義です。  
この文書では、全PJで揃える命名規則を定義します。

## 全般
- ファイル名は kebab-case
- React component 名は PascalCase
- 変数 / 関数は camelCase
- 型 / interface / enum は PascalCase
- 定数は UPPER_SNAKE_CASE
- 環境変数は UPPER_SNAKE_CASE
- DB table / column は snake_case

## React / Next.js
### ファイル
- route segment: `app/(group)/feature/page.tsx`
- UI component: `components/feature/feature-card.tsx`
- client hook: `hooks/use-feature-filter.ts`
- server action: `app/actions/create-feature.ts`
- validator: `lib/validation/feature.ts`
- repository: `lib/repositories/feature-repository.ts`

### 命名
- component は役割で名付ける  
  例: `SessionTable`, `DeckStatusBadge`
- hook は `use` で始める  
  例: `useSessionFilters`
- server action は動詞で始める  
  例: `createGenerationRequest`
- repository 関数は目的を明示する  
  例: `findDeckById`, `insertGenerationRequest`, `updateJobStatus`

## DB 命名
### テーブル
- 複数形 snake_case を基本とする  
  例: `generation_requests`, `generated_slides`

### カラム
- 外部キーは `xxx_id`
- タイムスタンプは `xxx_at`
- 日付のみなら `xxx_date`
- JSON列は意味が分かる場合のみ `_json` を付ける  
  例: `settings_json`, `payload_json`
- 真偽値は `is_`, `has_`, `can_` のいずれかで始める  
  例: `is_archived`, `has_error`

### 避ける名前
- `type` 単独
- `data` 単独
- `value` 単独
- `info` 単独
- `status` を複数意味で使うこと

`type` は曖昧なので、意味を明示した名前にする。

- 悪い例: `type`
- 良い例: `request_type`, `content_type`, `audience_type`

## status / enum 値
- 保存値は英小文字 snake_case
- 表示名は別レイヤで管理する
- UIラベルをそのまま DBへ保存しない
- 未知値を受ける可能性がある入力は normalize を通す

例:
- DB保存値: `queued`, `running`, `succeeded`, `failed`, `canceled`
- UI表示: `待機中`, `処理中`, `成功`, `失敗`, `中止`

## API / validation
- schema は `SomethingSchema`
- input type は `SomethingInput`
- parsed value は `parsedSomething`
- response mapper は `toSomethingDto`

## 環境変数
- public に出してよいものだけ `NEXT_PUBLIC_` を使う
- DB URL, API key, secret は `NEXT_PUBLIC_` 禁止
- Vercel / Neon の secrets は server-only 利用

## 命名の判断基準
迷ったら次の順で決める。

1. 役割が分かるか
2. 単独で意味が通るか
3. 既存命名と揃っているか
4. DB / API / UI で混線しないか
