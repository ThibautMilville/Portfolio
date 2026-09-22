#!/usr/bin/env bash
# Foreground Portfolio Next.js (for interactive terminals only).
# Agents MUST use scripts/dev-portfolio-daemon.sh / npm run dev:daemon instead:
# Cursor background shells get status: aborted and kill attached next processes.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-${PORTFOLIO_PORT:-3000}}"
MARKER="${ROOT}/.local/portfolio-dev.pid"

mkdir -p "${ROOT}/.local"

is_portfolio_cwd() {
  local pid="$1"
  local cwd
  cwd="$(readlink -f "/proc/${pid}/cwd" 2>/dev/null || true)"
  [[ -n "$cwd" && "$cwd" == "$ROOT"* ]]
}

port_pids() {
  ss -tlnp 2>/dev/null | awk -v p=":${PORT}" '
    $4 ~ p"$" {
      while (match($0, /pid=[0-9]+/)) {
        print substr($0, RSTART+4, RLENGTH-4)
        $0 = substr($0, RSTART+RLENGTH)
      }
    }
  ' | sort -u
}

echo "==> Portfolio root: $ROOT"
echo "==> Port: $PORT (override with PORT or PORTFOLIO_PORT)"
echo "==> Tip: agents should prefer npm run dev:daemon (survives shell abort)"

# Stop only previous Portfolio-owned listeners on this port.
for pid in $(port_pids); do
  if is_portfolio_cwd "$pid"; then
    echo "Stopping Portfolio pid=$pid on :$PORT"
    kill -TERM "$pid" 2>/dev/null || true
  else
    cmd="$(ps -p "$pid" -o args= 2>/dev/null || echo '?')"
    cwd="$(readlink -f "/proc/${pid}/cwd" 2>/dev/null || echo '?')"
    echo "REFUSING to kill pid=$pid (not Portfolio)."
    echo "  cwd=$cwd"
    echo "  cmd=$cmd"
    echo "Pick another port: PORT=3011 npm run dev:safe"
    exit 1
  fi
done

# Also stop orphan next/npm for this repo even if not bound yet.
while read -r pid; do
  [[ -z "$pid" ]] && continue
  if is_portfolio_cwd "$pid"; then
    cmd="$(ps -p "$pid" -o args= 2>/dev/null || true)"
    if [[ "$cmd" == *next* || "$cmd" == *npm*run*dev* ]]; then
      echo "Stopping leftover Portfolio process pid=$pid"
      kill -TERM "$pid" 2>/dev/null || true
    fi
  fi
done < <(pgrep -f "next (dev|start)|node_modules/.bin/next" 2>/dev/null || true)

sleep 0.4

if port_pids | grep -q .; then
  echo "Port $PORT still busy after Portfolio-only cleanup:"
  for pid in $(port_pids); do
    echo "  pid=$pid cwd=$(readlink -f /proc/$pid/cwd 2>/dev/null || echo '?') cmd=$(ps -p $pid -o args= 2>/dev/null || echo '?')"
  done
  exit 1
fi

cd "$ROOT"
echo "==> Starting (foreground): next dev -p $PORT"
echo "==> URL: http://localhost:$PORT"
echo $$ >"$MARKER"
if [[ -x "$ROOT/node_modules/.bin/next" ]]; then
  exec "$ROOT/node_modules/.bin/next" dev -p "$PORT"
fi
exec npx next dev -p "$PORT"
