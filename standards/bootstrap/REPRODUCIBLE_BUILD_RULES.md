# REPRODUCIBLE_BUILD_RULES

## 目的
GitHub → Vercel の導線で、ローカル・CI・本番の依存解決と build 結果がぶれないようにします。

## ハードルール
- package manager は `pnpm` のみ
- `package.json` に `packageManager` を必ず書く
- repo に存在してよい lockfile は `pnpm-lock.yaml` のみ
- `package-lock.json` と `yarn.lock` は置かない
- `pnpm-lock.yaml` は手書きしない
- dependency / devDependency は exact pin にする
- install/build hook で migration や networked setup を自動実行しない

## baseline pin
共通 baseline は次を基準とする。

- `packageManager`: `pnpm@10.28.2`
- Node major: `20.x`
- `.nvmrc` 必須
- `engines.node` 必須

## lockfile の生成
依存追加や baseline copy 後は、target repo で次の順に行う。

```bash
corepack enable
corepack prepare pnpm@10.28.2 --activate
pnpm install --no-frozen-lockfile
```

その後、次を確認する。

- merge marker がない
- placeholder data がない
- broken / empty integrity がない
- `pnpm-lock.yaml` 以外の lockfile がない

## 禁止事項
- fake / skeleton の lockfile をコミットする
- npm / yarn を混在させる
- Vercel default の Node version に丸投げする
- dependency version を `^` や `~` にする
- install / build 時に migration を自動実行する

## bootstrap phase の必須 scripts
`package.json` には少なくとも次を置く。

- `dev`
- `build`
- `start`
- `typecheck`
- `db:migrate`

`lint` は baseline では任意。  
導入した場合は CLI ベースで運用し、以後の完了条件に含める。
