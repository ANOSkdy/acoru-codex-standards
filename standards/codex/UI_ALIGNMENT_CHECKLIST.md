# UI_ALIGNMENT_CHECKLIST

## 目的
新画面や変更画面が既存 UI 標準から逸脱しないための監査チェックリストです。

## 基本
- [ ] 画面の主目的が1つに絞られている
- [ ] 既存の類似画面を確認した
- [ ] `DESIGN.md` を参照した
- [ ] table / form / feedback ルールを参照した

## 情報設計
- [ ] 主要CTA が明確
- [ ] セクション分割が適切
- [ ] status / badge の表現が既存と一致
- [ ] 余白 / hierarchy が過剰でも不足でもない

## table
- [ ] 列順が妥当
- [ ] null 表示が揃っている
- [ ] loading / empty / error を持つ
- [ ] 行アクションが危険すぎない
- [ ] mobile 方針が決まっている

## form
- [ ] label がある
- [ ] helper text と error 表示の位置が揃っている
- [ ] submit / cancel / destructive の関係が明確
- [ ] 送信中の重複防止がある
- [ ] 成功 / 失敗の見え方がある

## accessibility
- [ ] 色だけで意味を伝えていない
- [ ] focus state がある
- [ ] キーボード操作で破綻しない
- [ ] エラー位置が分かる

## 仕上げ
- [ ] 画面ごとの独自ルールを作っていない
- [ ] 既存コンポーネント再利用を優先した
- [ ] スクリーンショットで差分説明ができる
