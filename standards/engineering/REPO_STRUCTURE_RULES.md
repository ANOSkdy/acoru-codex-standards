# REPO_STRUCTURE_RULES

## 目的
機能追加のたびに責務配置が揺れないよう、repo構造と責務境界を固定します。  
また、初回基盤では「どのファイルが必須か」を判断しやすくします。

## bootstrap phase の最小構成
```text
app/
├─ api/
│  ├─ health/db/route.ts
│  └─ todos/
│     ├─ route.ts
│     └─ [id]/route.ts
├─ globals.css
├─ layout.tsx
└─ page.tsx

lib/
├─ db.ts
├─ http.ts
└─ validators/
   └─ todos.ts

migrations/
└─ 0001_init_todos.sql

scripts/
└─ migrate.mjs
```

## ongoing development の推奨構成
```text
src/
├─ app/
│  ├─ (app)/
│  ├─ api/
│  └─ actions/
├─ components/
│  ├─ ui/
│  └─ feature/
├─ lib/
│  ├─ db/
│  ├─ repositories/
│  ├─ services/
│  ├─ validation/
│  ├─ auth/
│  └─ utils/
├─ hooks/
├─ types/
└─ styles/
```

## 責務
### `app/`
- route segment
- page / layout / loading / error
- route handlers
- server actions
- 画面組み立て

### `components/`
- UI部品
- feature 固有の表示ロジック
- DBアクセスや secrets 利用は禁止

### `lib/db/` または bootstrap 時の `lib/db.ts`
- DB client
- typed schema
- SQL helper
- server-only の境界を明示

### `lib/repositories/`
- table単位または集約単位の DB 読み書き
- insert / update / select の集中管理
- column knowledge をここへ寄せる

### `lib/services/`
- repository を組み合わせた業務処理
- 状態遷移、トランザクション、ジョブ投入など
- route から直接 SQL を呼ばず、必要に応じてここを通す

### `lib/validation/`
- Zod schema
- normalize
- DTO変換前の入力整形

### `lib/auth/`
- actor解決
- permission判定
- resource scope 判定

## route handler の原則
route handler は薄くする。  
担当は次に限定する。

- input parse
- auth / authorization
- service 呼び出し
- response shaping

避けるもの:
- 長い分岐
- 直接SQL
- 画面固有の文言生成
- normalize の重複

## server component / client component
- server component を第一候補にする
- client component は state / browser API が必要な最小範囲に閉じる
- client component から DB や secret に触れない

## import 規約
- 深い相対 import を避ける
- alias を使う場合は repo 全体で統一する
- feature 内 private module を勝手に外部利用しない

## 追加してよい新規ファイル
新規ファイルは次の条件を満たす場合のみ追加する。

- 既存配置では責務が不明瞭になる
- 同種の機能が複数回出る
- テスト / validate / repository の分離が必要
- build reliability を下げない

## 避ける構成
- `utils.ts` に何でも入れる
- route ごとに DB helper を増やす
- client component 側で API response を normalize し始める
- 同一 feature の status 定義が複数ファイルに散る
