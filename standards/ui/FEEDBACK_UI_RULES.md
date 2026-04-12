# FEEDBACK_UI_RULES

## 目的
loading / empty / success / error / confirm の表現を揃え、AI実装で状態表現が散るのを防ぎます。

## loading
- 画面全体は skeleton を優先
- 短い操作は inline spinner でもよい
- レイアウトジャンプを避ける
- submit 中は action 単位で loading を出す

## empty
empty state は次のどれかを明示する。

- まだ何も作成されていない
- フィルタ条件に一致しない
- 権限上見えるデータがない
- 接続先や前提設定が不足している

empty には次の要素を推奨する。

- 状態名
- 短い説明
- 次に取れる1アクション

## success
- 成功は toast だけに頼りすぎない
- 重要な操作は画面上の状態変化でも伝える
- 文言は具体的にする  
  例: 「保存しました」より「デッキ設定を保存しました」

## error
- user が直せる error と system error を分ける
- system error でも retry 可否を示す
- 内部スタックや secret を見せない
- 同じ error code は同じ文言方針にする

## confirmation
次のときは confirm を入れる。

- 破壊的操作
- 長時間処理の開始
- 外部通知が飛ぶ操作
- 復元不能な変更

confirm では次を明示する。

- 何が起きるか
- 何が失われるか
- 取り消し可能か

## toast の使い方
- 軽い成功通知に使う
- 重要な失敗は inline / page error を優先
- 同じ toast を連打しない
- 自動消滅の秒数をPJで揃える

## 反パターン
- loading が無く押したか分からない
- empty に説明も導線もない
- error が「失敗しました」だけ
- confirm が毎回冗長で判断材料がない
