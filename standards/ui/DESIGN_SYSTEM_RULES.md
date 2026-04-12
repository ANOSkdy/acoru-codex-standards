# DESIGN_SYSTEM_RULES

## 目的
AIが画面ごとに雰囲気で組まず、同じ情報構造に同じ見た目と操作感を与えるための共通ルールです。

## デザイン原則
1. 新規性より一貫性
2. 派手さより可読性
3. 装飾より情報密度の整理
4. 1画面1主目的
5. 既存コンポーネント優先

## トークン原則
具体値は各PJの `docs/ui/DESIGN.md` に書くが、概念は共通にする。

- spacing: 4px 系のスケールを推奨
- radius: 小 / 中 / 大 を固定
- color: semantic token で管理
- typography: 見出し / 本文 / 注釈 / 数値 を分ける
- border: neutral token で統一
- shadow: 段階を絞る

## semantic color
画面ごとの独自色ではなく、意味で使い分ける。

- neutral
- primary
- success
- warning
- error
- info

status badge, toast, alert, inline message はこの意味づけに従う。

## レイアウト原則
- 画面幅は PJ で固定する
- ヘッダ、主操作、補助操作、本文の順序を一定にする
- 主要CTAは1つに絞る
- 関連情報は card / section でまとまりを明示する
- 余白は「意図のある区切り」にだけ使う

## コンポーネント原則
### Button
- primary は1領域に1つ
- destructive は明確に区別
- loading state を持つ
- disabled の理由がある場合は説明できる状態にする

### Input
- label を省略しない
- placeholder は説明文の代替にしない
- error message は field 直下
- helper text は短く、判断に必要なものだけ

### Card
- 類似情報のまとまりに使う
- 入れ子を深くしすぎない
- box-shadow だけで hierarchy を作らない

### Badge / Status chip
- 意味が不安定な色使いをしない
- 同じ status はどこでも同じ表現にする

## ページ原則
- index page: 検索 / フィルタ / 一覧 / 詳細導線を優先
- detail page: サマリー → 本文 → 関連操作
- form page: 主入力 → 補足 → 送信操作
- settings page: カテゴリ別 section で分ける

## アクセシビリティ
- 色だけで意味を表さない
- フォーカス可能要素に明確な focus state を持たせる
- エラーは field と page 両方で分かるようにする
- テーブルやフォームはキーボード操作を壊さない

## 禁止事項
- 画面ごとに button 高さや corner radius を変える
- table, form, toast の見た目を feature 単位で独自化する
- icon のみで意味を完結させる
- dense な管理画面で巨大 hero を置く
