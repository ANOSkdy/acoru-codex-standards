# env / gitignore spec

## `.env.example`
- `DATABASE_URL`
- `NEON_DATABASE_URL`
- 必要ならコメントで usage を補足
- real secret は書かない

## `.gitignore`
- `.env`
- `.env.local`
- `.env.*.local`
- `.next`
- `node_modules`
- log / cache 類
- `.env.example` は commit 対象のままにする

## 禁止
- secret を `NEXT_PUBLIC_*` に置く
- `next.config` `env` に secret を置く
- client side code で DB env を読む
