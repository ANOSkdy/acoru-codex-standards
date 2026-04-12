# tsconfig / next-env spec

## `tsconfig.json`
- `strict: true`
- `noImplicitAny: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `noEmit: true`
- `moduleResolution: "Bundler"`
- `jsx: "preserve"`
- `plugins: [{ "name": "next" }]`
- `include` に `.next/types/**/*.ts` を含める
- `next-env.d.ts` を include する

## `next-env.d.ts`
- auto-generated に任せず明示配置してよい
- standard Next.js references を置く
