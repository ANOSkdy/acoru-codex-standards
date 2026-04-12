# IMPLEMENTATION_CHECKLIST

## 実装前
- [ ] `AGENT.md` を読んだ
- [ ] `PROJECT_RULES.md` を読んだ
- [ ] `SCHEMA.md` を読んだ
- [ ] `ENUMS_AND_STATUSES.md` を読んだ
- [ ] `DESIGN.md` を読んだ
- [ ] `PROCESS_RULES.md` を読んだ
- [ ] 対象 table / column を列挙した
- [ ] 既存 repository / service / route を確認した
- [ ] 既存 UI パターンを確認した
- [ ] migration が必要か判断した

## 実装中
- [ ] route handler を薄く保っている
- [ ] DB書き込みを repository / service に集約した
- [ ] validate → normalize → persist の順で処理している
- [ ] status / enum の保存値が docs と一致している
- [ ] client に secrets を渡していない
- [ ] SQL が parameterized である
- [ ] logging が過剰でない

## UI確認
- [ ] loading / empty / error がある
- [ ] table / form / badge が共通ルールに沿っている
- [ ] null 表示が揃っている
- [ ] destructive action に confirm がある
- [ ] mobile で破綻しない

## DB確認
- [ ] 実列名と一致している
- [ ] typed schema と一致している
- [ ] enum / status registry を更新した
- [ ] query の旧列名参照が残っていない
- [ ] migration と docs を同期した

## 仕上げ
- [ ] `pnpm typecheck`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] PR本文に真実源と影響範囲を書いた
- [ ] 依頼外の変更を含めていない
