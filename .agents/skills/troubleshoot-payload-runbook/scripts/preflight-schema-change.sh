#!/usr/bin/env bash
# Fail closed before opening/updating a Payload schema PR.
# Usage: bash .agents/skills/troubleshoot-payload-runbook/scripts/preflight-schema-change.sh
#    or: pnpm preflight:schema
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${ROOT}" ]]; then
  echo "ERROR: not inside a git repo"
  exit 1
fi
cd "${ROOT}"

FAIL=0
warn() { echo "WARN: $*"; }
fail() { echo "FAIL: $*"; FAIL=1; }
ok() { echo "OK: $*"; }

BRANCH="$(git branch --show-current)"
case "${BRANCH}" in
  dev|main|master)
    fail "on '${BRANCH}' — cut a feat/* branch before schema commits"
    ;;
  feat/*|fix/*|chore/*)
    ok "branch '${BRANCH}'"
    ;;
  *)
    warn "branch '${BRANCH}' is unusual; prefer feat/<name>"
    ;;
esac

check_env_file() {
  local f="$1"
  [[ -f "$f" ]] || return 0
  if grep -qE '^POSTGRES_URL=.+' "$f" 2>/dev/null; then
    fail "${f} sets POSTGRES_URL — remove it before local seed/dev (Neon = live)"
  else
    ok "${f} has no POSTGRES_URL"
  fi
}
check_env_file .env
check_env_file .env.local

if [[ -f migrations/index.ts ]]; then
  ok "migrations/index.ts present"
  while IFS= read -r -d '' file; do
    base="$(basename "${file}" .ts)"
    [[ "${base}" == "index" ]] && continue
    if ! grep -q "${base}" migrations/index.ts; then
      fail "migration '${base}' not registered in migrations/index.ts"
    fi
  done < <(find migrations -maxdepth 1 -name '*.ts' -print0)
else
  fail "missing migrations/index.ts"
fi

while IFS= read -r -d '' file; do
  [[ "$(basename "${file}")" == "index.ts" ]] && continue
  if grep -qE 'payload\.(create|update|delete|find)\(' "${file}"; then
    if ! grep -qE '\breq\b' "${file}"; then
      fail "${file}: payload Local API without obvious req — pass req or use db.execute only"
    else
      ok "${file}: Local API appears to reference req"
    fi
  fi
done < <(find migrations -maxdepth 1 -name '*.ts' -print0)

if [[ "${SKIP_VERIFY:-}" == "1" ]]; then
  warn "SKIP_VERIFY=1 — not running pnpm verify"
else
  echo "Running pnpm verify…"
  pnpm verify
  ok "pnpm verify"
fi

if [[ "${FAIL}" -ne 0 ]]; then
  echo ""
  echo "Preflight FAILED. Fix items above, or run /troubleshoot-payload-runbook"
  exit 1
fi

echo ""
echo "Preflight PASSED. PR base must be: dev"
exit 0
