#!/usr/bin/env bash
# Detached Portfolio Next.js - survives Cursor agent shell aborts.
# Prefer systemd --user; fallback to setsid+nohup.
# Usage: bash scripts/dev-portfolio-daemon.sh {start|stop|status|restart}
# Prefer: npm run dev:daemon / npm run dev:stop
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-${PORTFOLIO_PORT:-3000}}"
STATE_DIR="${ROOT}/.local"
PID_FILE="${STATE_DIR}/portfolio-dev.pid"
LOG_FILE="${STATE_DIR}/portfolio-dev.log"
MODE_FILE="${STATE_DIR}/portfolio-dev.mode"
UNIT="portfolio-dev"
URL="http://localhost:${PORT}"

mkdir -p "$STATE_DIR"

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

pid_alive() {
  local pid="$1"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

read_pidfile() {
  if [[ -f "$PID_FILE" ]]; then
    tr -d '[:space:]' <"$PID_FILE"
  fi
}

read_mode() {
  if [[ -f "$MODE_FILE" ]]; then
    tr -d '[:space:]' <"$MODE_FILE"
  fi
}

next_bin() {
  if [[ -x "$ROOT/node_modules/.bin/next" ]]; then
    echo "$ROOT/node_modules/.bin/next"
  else
    echo ""
  fi
}

# Refresh pidfile to the Portfolio-owned listener on PORT (stable across Next respawns).
refresh_pidfile_from_listener() {
  local pid
  for pid in $(port_pids); do
    if is_portfolio_cwd "$pid"; then
      echo "$pid" >"$PID_FILE"
      return 0
    fi
  done
  return 1
}

systemd_available() {
  command -v systemctl >/dev/null 2>&1 \
    && command -v systemd-run >/dev/null 2>&1 \
    && systemctl --user show-environment >/dev/null 2>&1
}

systemd_active() {
  systemctl --user is-active --quiet "$UNIT.service" 2>/dev/null
}

# Kill only processes whose cwd is this Portfolio repo (non-systemd leftovers).
stop_portfolio_owned_procs() {
  local pid cmd
  local stopped=0

  if [[ -f "$PID_FILE" ]]; then
    pid="$(read_pidfile)"
    if pid_alive "$pid" && is_portfolio_cwd "$pid"; then
      echo "Stopping Portfolio pid=$pid"
      kill -TERM "$pid" 2>/dev/null || true
      kill -TERM -- "-$pid" 2>/dev/null || true
      stopped=1
    fi
  fi

  for pid in $(port_pids); do
    if is_portfolio_cwd "$pid"; then
      echo "Stopping Portfolio listener pid=$pid on :$PORT"
      kill -TERM "$pid" 2>/dev/null || true
      stopped=1
    else
      cmd="$(ps -p "$pid" -o args= 2>/dev/null || echo '?')"
      echo "REFUSING to kill pid=$pid (not Portfolio)."
      echo "  cwd=$(readlink -f /proc/$pid/cwd 2>/dev/null || echo '?')"
      echo "  cmd=$cmd"
      return 1
    fi
  done

  while read -r pid; do
    [[ -z "$pid" ]] && continue
    if is_portfolio_cwd "$pid"; then
      cmd="$(ps -p "$pid" -o args= 2>/dev/null || true)"
      if [[ "$cmd" == *next* || "$cmd" == *npm*run*dev* || "$cmd" == *npx*next* ]]; then
        echo "Stopping leftover Portfolio process pid=$pid"
        kill -TERM "$pid" 2>/dev/null || true
        stopped=1
      fi
    fi
  done < <(pgrep -f "next (dev|start)|node_modules/.bin/next|node_modules/next/dist" 2>/dev/null || true)

  sleep 0.6
  for pid in $(port_pids); do
    if is_portfolio_cwd "$pid"; then
      echo "Force-stopping Portfolio pid=$pid"
      kill -KILL "$pid" 2>/dev/null || true
      stopped=1
    fi
  done

  if [[ "$stopped" -eq 1 ]]; then
    echo "Portfolio processes stopped."
  fi
  return 0
}

wait_ready() {
  local i
  for i in $(seq 1 80); do
    if curl -sf -o /dev/null --max-time 1 "$URL" 2>/dev/null; then
      refresh_pidfile_from_listener || true
      return 0
    fi
    if grep -qE 'Ready in|Local:' "$LOG_FILE" 2>/dev/null && ss -tln | grep -qE ":${PORT}\\b"; then
      refresh_pidfile_from_listener || true
      return 0
    fi
    sleep 0.25
  done
  return 1
}

cmd_status() {
  local pid mode
  mode="$(read_mode)"
  if [[ "$mode" == "systemd" ]] && systemd_available; then
    if systemd_active; then
      echo "running mode=systemd unit=$UNIT.service port=$PORT url=$URL"
      refresh_pidfile_from_listener || true
      pid="$(read_pidfile)"
      [[ -n "$pid" ]] && echo "listener_pid=$pid"
      echo "log=$LOG_FILE"
      return 0
    fi
  fi

  pid="$(read_pidfile)"
  if pid_alive "$pid" && is_portfolio_cwd "$pid"; then
    echo "running mode=${mode:-setsid} pid=$pid port=$PORT url=$URL"
    echo "log=$LOG_FILE"
    return 0
  fi

  if refresh_pidfile_from_listener; then
    pid="$(read_pidfile)"
    echo "running mode=${mode:-orphan-listener} pid=$pid port=$PORT url=$URL"
    echo "log=$LOG_FILE"
    return 0
  fi

  for p in $(port_pids); do
    echo "foreign listener pid=$p cwd=$(readlink -f /proc/$p/cwd 2>/dev/null || echo '?') cmd=$(ps -p $p -o args= 2>/dev/null || echo '?')"
    return 0
  done

  echo "stopped"
  return 1
}

cmd_stop() {
  local mode
  mode="$(read_mode)"
  if [[ "$mode" == "systemd" ]] && systemd_available; then
    if systemctl --user list-units --all --no-legend "$UNIT.service" 2>/dev/null | grep -q "$UNIT"; then
      echo "Stopping systemd --user unit $UNIT.service"
      systemctl --user stop "$UNIT.service" 2>/dev/null || true
      systemctl --user reset-failed "$UNIT.service" 2>/dev/null || true
    fi
  fi
  stop_portfolio_owned_procs || return 1
  rm -f "$PID_FILE" "$MODE_FILE"
  echo "Portfolio stopped."
}

start_systemd() {
  local bin
  bin="$(next_bin)"
  [[ -n "$bin" ]] || return 1

  # Replace any previous unit of the same name.
  systemctl --user stop "$UNIT.service" 2>/dev/null || true
  systemctl --user reset-failed "$UNIT.service" 2>/dev/null || true

  : >"$LOG_FILE"
  systemd-run --user \
    --unit="$UNIT" \
    --working-directory="$ROOT" \
    --property="StandardOutput=append:${LOG_FILE}" \
    --property="StandardError=append:${LOG_FILE}" \
    --property="KillMode=control-group" \
    -- "$bin" dev -p "$PORT"

  echo "systemd" >"$MODE_FILE"
  return 0
}

start_setsid() {
  local bin pid
  bin="$(next_bin)"
  : >"$LOG_FILE"

  # Wrapper stays session leader and re-execs into next so the tree is detached
  # from Cursor agent shells (status: aborted must not SIGTERM this session).
  setsid bash -c "
    cd \"$ROOT\" || exit 1
    exec >>\"$LOG_FILE\" 2>&1
    if [[ -x \"$ROOT/node_modules/.bin/next\" ]]; then
      exec \"$ROOT/node_modules/.bin/next\" dev -p \"$PORT\"
    else
      exec npx next dev -p \"$PORT\"
    fi
  " </dev/null &
  pid=$!
  echo "$pid" >"$PID_FILE"
  echo "setsid" >"$MODE_FILE"
  disown "$pid" 2>/dev/null || true
  return 0
}

cmd_start() {
  local pid

  if [[ "$(read_mode)" == "systemd" ]] && systemd_available && systemd_active; then
    if ss -tln | grep -qE ":${PORT}\\b"; then
      refresh_pidfile_from_listener || true
      echo "Already running (systemd $UNIT.service)"
      echo "URL: $URL"
      echo "log: $LOG_FILE"
      return 0
    fi
  fi

  if refresh_pidfile_from_listener 2>/dev/null; then
    pid="$(read_pidfile)"
    if pid_alive "$pid" && is_portfolio_cwd "$pid"; then
      echo "Already running (pid=$pid)"
      echo "URL: $URL"
      echo "log: $LOG_FILE"
      return 0
    fi
  fi

  # Refuse if port held by non-Portfolio.
  for pid in $(port_pids); do
    if ! is_portfolio_cwd "$pid"; then
      echo "Port $PORT busy by non-Portfolio pid=$pid"
      echo "  cwd=$(readlink -f /proc/$pid/cwd 2>/dev/null || echo '?')"
      echo "  cmd=$(ps -p $pid -o args= 2>/dev/null || echo '?')"
      echo "Use another port: PORT=3011 npm run dev:daemon"
      return 1
    fi
  done

  cmd_stop || return 1

  if port_pids | grep -q .; then
    echo "Port $PORT still busy after Portfolio-only cleanup."
    for pid in $(port_pids); do
      echo "  pid=$pid cwd=$(readlink -f /proc/$pid/cwd 2>/dev/null || echo '?')"
    done
    return 1
  fi

  cd "$ROOT"

  if systemd_available && start_systemd; then
    echo "==> Detached via systemd --user ($UNIT.service) on :$PORT"
  else
    echo "==> Detached via setsid+nohup on :$PORT (systemd --user unavailable)"
    start_setsid
  fi
  echo "==> log: $LOG_FILE"

  if wait_ready; then
    echo "Ready: $URL"
    echo "pid=$(read_pidfile) mode=$(read_mode) log=$LOG_FILE"
    return 0
  fi

  echo "Timed out waiting for Ready on $URL"
  echo "--- last log lines ---"
  tail -n 40 "$LOG_FILE" 2>/dev/null || true
  return 1
}

usage() {
  echo "Usage: $0 {start|stop|status|restart}"
  echo "  PORT / PORTFOLIO_PORT (default 3000)"
}

ACTION="${1:-start}"
case "$ACTION" in
  start) cmd_start ;;
  stop) cmd_stop ;;
  status) cmd_status ;;
  restart) cmd_stop; cmd_start ;;
  *) usage; exit 2 ;;
esac
