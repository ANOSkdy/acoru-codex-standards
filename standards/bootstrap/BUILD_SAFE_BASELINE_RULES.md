# BUILD_SAFE_BASELINE_RULES

## 目的
初回基盤で、Vercel build 時に env 不足や self-fetch で壊れるのを防ぎます。

## homepage ルール
- `app/page.tsx` は DB access を要求しない
- `app/page.tsx` は env 不足でも render できる
- build / prerender を壊す fetch をしない
- semantic HTML と simple CSS で作る
- mobile-first を基本にする

## self-fetch 禁止
次は baseline で禁止する。

- server component から `/api/...` への self-fetch
- build 中の own route fetch
- homepage を DB依存にすること

もし example data を見せたいなら、次のどちらかにする。

- hydration 後の client fetch
- explicitly dynamic server route

ただし baseline の初期ホームは DB不要にしておく。

## mobile-first baseline
- fixed desktop-only width を作らない
- readable spacing
- accessible tap targets
- responsive layout
- hover-only interaction を前提にしない

## route handler ルール
- DBを触る route は `export const runtime = 'nodejs'`
- DB-backed GET route は `export const dynamic = 'force-dynamic'`
- missing DB env を expected error として安全に返す
- 例外をそのまま user に返さない

## build-safe baseline の最小要件
- static-safe homepage
- DB health route
- validated CRUD route
- graceful missing env
- no self-fetch
