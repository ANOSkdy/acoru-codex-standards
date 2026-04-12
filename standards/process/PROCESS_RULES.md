# PROCESS_RULES

## 目的
業務処理を「なんとなくの分岐」ではなく、状態遷移・制約・失敗時挙動まで含めて明文化します。

## 基本原則
- 業務処理は state machine として考える
- UI値 / AI値 / DB保存値を分ける
- 保存前に validate → normalize → persist
- 再実行可能性と冪等性を最初に決める
- 部分失敗時の扱いを先に決める

## すべての主要プロセスで定義すること
- 入口
- 入力
- 前提条件
- state
- 遷移
- 成功条件
- 失敗条件
- retry 可否
- timeout
- cancel 可否
- audit / event 記録

## 状態遷移
- 初期状態を決める
- 終端状態を決める
- 許可される遷移のみを定義する
- UI表示ラベルと DB値を分ける
- 手動介入可能な遷移は明記する

## validate / normalize
保存前に次を行う。

- 型整合
- 必須値確認
- enum 正規化
- 文字列 trim / 空値整理
- AI出力の揺れ吸収
- 禁止状態の排除

## transaction
同一業務単位で整合が必要なら transaction を使う。  
例:

- request 生成 + job 生成
- status 更新 + event 記録
- entity 更新 + audit log 追加

## timeout / retry
- retry するエラーとしないエラーを分ける
- timeout 時の最終状態を決める
- retry 回数と backoff 方針を固定する
- retry で二重作成が起きないようにする

## cancel / delete
- cancel は state ごとに可否を決める
- delete は物理 / 論理の方針を決める
- 副作用がある処理は取消不能かを明記する

## 観測可能性
最低限、次が分かる状態を目指す。

- いつ開始したか
- 誰が起点か
- どの状態にいるか
- どこで失敗したか
- 再実行可能か

## 禁止事項
- 状態遷移を docs なしでコードだけに埋め込む
- 失敗時の扱いを決めないまま非同期化する
- UIラベルをそのまま状態値として使う
- 手動復旧手順が見えないジョブを作る
