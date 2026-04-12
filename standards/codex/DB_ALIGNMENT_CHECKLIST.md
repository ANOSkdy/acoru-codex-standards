# DB_ALIGNMENT_CHECKLIST

## 目的
機能実装前に DB まわりのズレを洗い出すための監査チェックリストです。

## 対象確認
- [ ] 関係する table を列挙した
- [ ] 各 table の役割を説明できる
- [ ] 実DB / migration / typed schema を確認した

## カラム確認
- [ ] 参照する column を一覧化した
- [ ] insert 対象 column を確認した
- [ ] update 対象 column を確認した
- [ ] nullable / default / unique / FK を把握した

## 値確認
- [ ] enum 値を registry で確認した
- [ ] status 遷移を確認した
- [ ] UI値 / AI値 / DB保存値の違いを確認した
- [ ] normalize が必要な入力を特定した

## 実装確認
- [ ] repository / store の既存関数を確認した
- [ ] route や service に古い列名が残っていないか確認した
- [ ] tests / seed / mocks への影響を確認した

## 変更確認
- [ ] migration が必要か判断した
- [ ] docs 同期が必要か判断した
- [ ] backfill の要否を判断した
- [ ] 破壊的変更かどうかを判断した

## 仕上げ
- [ ] ズレがある場合は差分一覧を作った
- [ ] どれを正とするか明記した
- [ ] 修正順序を決めた
