# NODE_AND_PNPM_POLICY

## 目的
ローカル・CI・Vercel で Node と pnpm の major がずれて起きる build drift を防ぎます。

## Node policy
- 共通 baseline の Node major は `20.x`
- `.nvmrc` を必須にする
- `package.json` の `engines.node` を必須にする
- repo内で Node major を複数書かない

## pnpm policy
- `packageManager` は `pnpm@10.28.2`
- CI でも Corepack を使って同じ pnpm を有効化する
- 依存更新時は lockfile を target repo で再生成する
- standards repo 側では `pnpm-lock.yaml` を保持しない

## なぜ exact pin を使うか
bootstrap phase では、最小依存かつ build-safe な土台を再現することが目的です。  
そのため、`^` や `~` を避け、バージョンの揺れを抑えます。

## 例外
次のような事情がある時だけ、PJ側 `PROJECT_RULES.md` に明示して例外化できます。

- 会社全体で Node major を別に固定している
- 社内 CI が別 major を要求する
- hosting 制約で別 major が必要

例外を入れる時でも、**major を1つに揃える**ことは守ります。
