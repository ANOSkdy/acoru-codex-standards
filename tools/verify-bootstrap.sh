#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-.}"

fail() {
  echo "FAIL: $1"
  exit 1
}

check_file() {
  local path="$1"
  [[ -f "$TARGET_DIR/$path" ]] || fail "Missing file: $path"
}

check_file "package.json"
check_file ".nvmrc"
check_file ".env.example"
check_file "tsconfig.json"
check_file "next-env.d.ts"
check_file "app/layout.tsx"
check_file "app/page.tsx"
check_file "app/globals.css"
check_file "app/api/health/db/route.ts"
check_file "app/api/todos/route.ts"
check_file "app/api/todos/[id]/route.ts"
check_file "lib/db.ts"
check_file "scripts/migrate.mjs"

[[ ! -f "$TARGET_DIR/package-lock.json" ]] || fail "package-lock.json must not exist"
[[ ! -f "$TARGET_DIR/yarn.lock" ]] || fail "yarn.lock must not exist"

grep -q '"packageManager"[[:space:]]*:[[:space:]]*"pnpm@10.28.2"' "$TARGET_DIR/package.json" || fail "packageManager pin is missing or incorrect"
grep -q '"db:migrate"' "$TARGET_DIR/package.json" || fail "db:migrate script is missing"
grep -q '"typecheck"' "$TARGET_DIR/package.json" || fail "typecheck script is missing"
grep -q '"build"' "$TARGET_DIR/package.json" || fail "build script is missing"
grep -q '"start"' "$TARGET_DIR/package.json" || fail "start script is missing"

grep -q 'import "server-only"' "$TARGET_DIR/lib/db.ts" || fail 'lib/db.ts must import "server-only"'
grep -q "runtime = \"nodejs\"" "$TARGET_DIR/app/api/health/db/route.ts" || fail "health route must use nodejs runtime"
grep -q "dynamic = \"force-dynamic\"" "$TARGET_DIR/app/api/health/db/route.ts" || fail "health GET route must force dynamic"
grep -q "Promise<{ id: string }>" "$TARGET_DIR/app/api/todos/[id]/route.ts" || fail "dynamic route params typing is not current-safe"
grep -q "rowCount ?? 0" "$TARGET_DIR/app/api/todos/[id]/route.ts" || fail "rowCount null-safe comparison is missing"

echo "Bootstrap verification passed for $TARGET_DIR"
