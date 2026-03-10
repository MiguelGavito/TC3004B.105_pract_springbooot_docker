#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

usage() {
  cat <<'EOF'
Uso:
  ./dev.sh front   # levanta solo frontend (Vite)
  ./dev.sh back    # levanta solo backend (Spring Boot)
  ./dev.sh all     # levanta frontend y backend
EOF
}

run_front() {
  cd "$ROOT_DIR/frontend"
  npm run dev
}

run_back() {
  cd "$ROOT_DIR/backend"
  mvn spring-boot:run
}

run_all() {
  cd "$ROOT_DIR/backend"
  mvn spring-boot:run &
  BACK_PID=$!

  cleanup() {
    if kill -0 "$BACK_PID" 2>/dev/null; then
      kill "$BACK_PID" 2>/dev/null || true
      wait "$BACK_PID" 2>/dev/null || true
    fi
  }

  trap cleanup EXIT INT TERM

  cd "$ROOT_DIR/frontend"
  npm run dev
}

MODE="${1:-all}"

case "$MODE" in
  front)
    run_front
    ;;
  back)
    run_back
    ;;
  all)
    run_all
    ;;
  -h|--help|help)
    usage
    ;;
  *)
    echo "Modo no valido: $MODE"
    usage
    exit 1
    ;;
esac
