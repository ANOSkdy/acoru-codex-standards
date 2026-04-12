# nextjs-neon-node-minimal

Next.js App Router + TypeScript + Neon Postgres (`pg`) の最小 baseline です。  
目的は、**空repoから GitHub → Vercel に安全に載る基盤を最短で揃えること**です。

## 含まれるもの
- build-safe homepage
- server-only lazy DB module
- tiny migration runner
- initial `todos` schema
- DB health route
- validated CRUD route
- mobile-first minimal CSS

## 含めていないもの
- `pnpm-lock.yaml`
- lint tooling
- test runner
- UI component library
- ORM
- AI SDK

## lockfile について
この baseline には `pnpm-lock.yaml` を含めていません。  
target repo で次を実行して生成してください。

```bash
corepack enable
corepack prepare pnpm@10.28.2 --activate
pnpm install --no-frozen-lockfile
```

その後に次を確認します。

```bash
pnpm typecheck
pnpm build
```

## 使い方
### 1. 直接コピー
```bash
./tools/apply-baseline.sh /path/to/target-repo
```

### 2. Codex に作らせる
- `templates/bootstrap/bootstrap-empty-repo-strict.md`

### 3. 既存repoの基盤を揃え直す
- `templates/bootstrap/bootstrap-foundation-refresh.md`

## baseline snapshot について
この baseline は「最新依存」を主張するものではなく、**共通標準repoが管理する固定スナップショット**です。  
依存更新は、このrepoのPRでまとめて管理します。
