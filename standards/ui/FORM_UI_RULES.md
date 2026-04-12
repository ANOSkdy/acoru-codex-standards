# FORM_UI_RULES

## 目的
フォームの入力体験と実装パターンを揃え、検証・送信・エラー処理のぶれを減らします。

## 基本構成
1. ページタイトル / 目的
2. 入力セクション
3. 補助説明
4. validation message
5. primary action
6. destructive / cancel action

## フィールド原則
- label を必ず付ける
- placeholder を仕様説明の代替にしない
- required / optional を明確にする
- helper text は「どう入力するか」に限定する
- エラー文は field 直下に表示する

## validation timing
- 基本は submit 時
- 文字数や形式など軽いものは blur 時も可
- server validation がある場合、client と文言を極端にズラさない

## submit 行動
- submit 中は重複送信を防ぐ
- button 文言は動詞にする
- 成功時の遷移 / stay / toast を仕様として固定する
- 失敗時に入力値を不要に失わない

## destructive action
- 保存と削除を近づけすぎない
- 確認ダイアログを使う
- 何が消えるかを明示する

## server actions / API
- 入力は Zod で validate する
- normalize 後の値だけを DB へ保存する
- server action / API は秘密情報を client に返さない
- field error と form error を分ける

## default values
- 編集フォームは既存値を正規化してから流し込む
- 空配列・空文字・null のどれを使うかを決める
- 「未設定」と「空値」を混同しない

## アクセシビリティ
- label と field の関連付けを行う
- エラー時にフォーカス移動を検討する
- キーボード操作の送信導線を壊さない

## 反パターン
- placeholder しか無い
- 保存後の結果が不明
- disabled の理由が見えない
- server error を field error のように見せる
