# AUTHORIZATION_RULES

## 目的
認可を UI 任せにせず、server 側で一貫して resource scope を確認するための共通ルールです。

## 原則
- 認証と認可は別物として扱う
- 認証済みでも全 resource にアクセスできるとは限らない
- actor は server 側で確定する
- client が送る role や owner 情報を信頼しない

## チェック順
1. actor を取得する
2. tenant / org / project scope を解決する
3. 対象 resource を取得または existence を確認する
4. operation ごとの permission を判定する
5. 許可後に処理を実行する

## 推奨責務
- route handler: actor 解決、入口制御
- auth helper: permission 判定
- service: 業務条件と組み合わせた最終判断
- repository: 認可そのものは持たず、必要最小限の取得に徹する

## ルール
- 自分がアクセス可能な scope だけを query する
- 更新対象が actor の scope 内かを確認する
- 管理者権限でも destructive 操作は監査対象にする
- 存在するが見えない resource は 404 相当に倒すか、PJ方針を統一する

## UI の役割
UI によるボタン非表示は補助です。  
本当の制御は server 側で行う。

## 監査
次の操作は audit log を推奨します。

- 権限変更
- 共有範囲変更
- 削除 / 復元
- 重要設定変更
- 外部連携接続・切断

## 反パターン
- hidden button だけで認可した気になる
- `userId` や `orgId` を body からそのまま採用する
- repository が scope を考慮せず広く取得してしまう
