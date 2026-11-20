#!/usr/bin/env bash
# Il processo riceve il contesto su stdin e restituisce il risultato su stdout.
# Il chiamante sceglie un adattatore Python revisionato dai PM.
set -euo pipefail
if [[ $# -ne 1 || ! -f "$1" ]]; then
  echo 'Uso: bash run-isolated-role.sh adattatore.py < contesto.json' >&2
  exit 2
fi
image=python@sha256:9ef1a599f863231c3d91e941389bfdc4a2d6070557243d54df1a4e57015b960e
exec docker run --rm -i --network none --read-only --user 65534:65534 \
  --cap-drop ALL --security-opt no-new-privileges --pids-limit 32 --memory 128m \
  "$image" python -I -B -c "$(cat -- "$1")"
