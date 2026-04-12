#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASELINE_DIR="$ROOT_DIR/baselines/nextjs-neon-node-minimal"
TARGET_DIR="${1:-}"

if [[ -z "$TARGET_DIR" ]]; then
  echo "Usage: ./tools/apply-baseline.sh /path/to/target-repo"
  exit 1
fi

mkdir -p "$TARGET_DIR"

if [[ -n "$(find "$TARGET_DIR" -mindepth 1 -maxdepth 1 2>/dev/null)" ]]; then
  echo "Target directory is not empty: $TARGET_DIR"
  echo "Copy aborted to avoid overwriting files."
  echo "Use a clean repo or copy files manually."
  exit 1
fi

cp -R "$BASELINE_DIR"/. "$TARGET_DIR"/

cat <<'EOF'
Baseline copied.

Next steps in the target repo:
1. Rename package name in package.json.
2. Generate pnpm-lock.yaml:
   corepack enable
   corepack prepare pnpm@10.28.2 --activate
   pnpm install --no-frozen-lockfile
3. Configure DATABASE_URL or NEON_DATABASE_URL.
4. Run:
   pnpm typecheck
   pnpm build
EOF
